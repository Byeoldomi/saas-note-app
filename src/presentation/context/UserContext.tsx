'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/infrastructure/config/supabase';
import { User } from '@supabase/supabase-js';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    avatarUrl: string;
    initials: string;
    tier: 'FREE' | 'PRO' | 'ENTERPRISE';
    storageUsage?: number;
    storageLimit?: number;
}

// Keep mocks for fallback or dev/test without auth
export const MOCK_USERS: UserProfile[] = [
    {
        id: 'user_1',
        name: 'Alex Morgan',
        email: 'alex@example.com',
        role: 'Pro Member',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtXT-ovtzCbaboop3dNJK2CzoUC3UzAsi2afoYPBn2ctR182I8r3x9PaXS7MQIJdHKrFRVP_TYJyGnLtMK5Q_JxiLbEpVf_0TQOTWwvAI2Xq3yOYLxRM_P_tmvQETVSDEdBlysCZnQHKCOHiLI7U0CrxDBXlVJ0bNZBbIzgzhKEf5WSQk0Ojy072z3-NnDOVyBDJ-PrD-begxVIWx4ZCugNo7WJt-1H1UY6WK_vZSq4ykv67W488wl8pbU7zUkzTlhBeDlTYSvyNA',
        initials: 'AM',
        tier: 'PRO',
        storageUsage: 3500000000,
        storageLimit: 107374182400
    },
    // ... other mocks can remain if needed for testing
];

interface UserContextType {
    currentUser: UserProfile;
    isLoading: boolean;
    linkedAccounts: UserProfile[]; // Legacy/Mock support
    switchUser: (userId: string) => void; // Legacy/Mock support
    addLinkedAccount: (user: UserProfile) => void;
    removeLinkedAccount: (userId: string) => void;
    refreshProfile: () => Promise<void>;
    signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    // Default to a safe fallback (e.g., Mock or Guest) to prevent crashes on initial render
    // Ideally this should be null, but keeping MOCK for layout consistency until fully refactored
    const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[0]);
    const [isLoading, setIsLoading] = useState(true);
    const [linkedAccounts, setLinkedAccounts] = useState<UserProfile[]>(MOCK_USERS);
    const supabase = createClient();

    const fetchUserProfile = async (authUser: User, forceFetch = false) => {
        // Prevent redundant fetching if user data is already there for the same user ID
        if (!forceFetch && currentUser && currentUser.id === authUser.id && currentUser.id !== 'guest') {
            return currentUser;
        }

        try {
            const { data: profile, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    return {
                        id: authUser.id,
                        name: authUser.email?.split('@')[0] || 'User',
                        email: authUser.email || '',
                        role: 'Member',
                        avatarUrl: '',
                        initials: (authUser.email || 'U').substring(0, 2).toUpperCase(),
                        tier: 'FREE' as const,
                        storageUsage: 0,
                        storageLimit: 10737418240,
                    };
                }
                return null;
            }

            if (profile) {
                const isEnterprise = (profile.storage_limit || 0) > 107374182400;
                const tier = isEnterprise ? 'ENTERPRISE' : (profile.is_pro ? 'PRO' : 'FREE');

                return {
                    id: profile.id,
                    name: profile.full_name || authUser.email?.split('@')[0] || 'User',
                    email: profile.email || authUser.email || '',
                    role: tier === 'PRO' ? 'Pro Member' : (tier === 'ENTERPRISE' ? 'Enterprise' : 'Free User'),
                    avatarUrl: profile.avatar_url || '',
                    initials: (profile.full_name || authUser.email || 'U').substring(0, 2).toUpperCase(),
                    tier: tier as 'FREE' | 'PRO' | 'ENTERPRISE',
                    storageUsage: profile.storage_usage || 0,
                    storageLimit: profile.storage_limit || 10737418240,
                };
            }
        } catch (err) {
            console.error('Unexpected error fetching profile:', err);
        }
        return null;
    };

    const refreshProfile = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            const profile = await fetchUserProfile(session.user, true); // Force refresh
            if (profile) setCurrentUser(profile);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const initAuth = async () => {
            // Check for test user
            const testEmail = typeof window !== 'undefined' ? localStorage.getItem('isTestUser') : null;
            if (testEmail) {
                const isTest1 = testEmail.startsWith('test1@');
                const tier = isTest1 ? 'FREE' : 'PRO';
                const role = isTest1 ? 'Member' : 'Pro Member';
                const storageLimit = isTest1 ? 10737418240 : 107374182400; // 10GB vs 100GB

                setCurrentUser({
                    id: `test-user-${testEmail}`,
                    name: testEmail.split('@')[0],
                    email: testEmail,
                    role: role,
                    avatarUrl: '',
                    initials: (testEmail || 'T').substring(0, 2).toUpperCase(),
                    tier: tier,
                    storageUsage: 0,
                    storageLimit: storageLimit,
                });
                setIsLoading(false);
                return;
            }

            // Get session from local storage/cookies if available
            const { data: { session } } = await supabase.auth.getSession();

            if (isMounted) {
                if (session?.user) {
                    const profile = await fetchUserProfile(session.user);
                    if (isMounted && profile) setCurrentUser(profile);
                } else {
                    setCurrentUser({
                        id: 'guest',
                        name: 'Guest',
                        email: '',
                        role: 'Guest',
                        avatarUrl: '',
                        initials: 'G',
                        tier: 'FREE'
                    });
                }
                setIsLoading(false);
            }
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'INITIAL_SESSION') {
                // Handled by initAuth
                return;
            }

            if (event === 'SIGNED_IN' && session?.user) {
                const profile = await fetchUserProfile(session.user);
                if (isMounted && profile) setCurrentUser(profile);
            } else if (event === 'SIGNED_OUT') {
                if (isMounted) {
                    setCurrentUser({
                        id: 'guest',
                        name: 'Guest',
                        email: '',
                        role: 'Guest',
                        avatarUrl: '',
                        initials: 'G',
                        tier: 'FREE'
                    });
                }
            }
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Methods for mocking/testing (kept for compatibility)
    const switchUser = (userId: string) => {
        // Logic to switch mock users if needed, or ignored in real auth
        const user = linkedAccounts.find(u => u.id === userId);
        if (user) setCurrentUser(user);
    };

    const addLinkedAccount = (user: UserProfile) => {
        if (!linkedAccounts.find(u => u.id === user.id)) {
            setLinkedAccounts([...linkedAccounts, user]);
        }
    };

    const removeLinkedAccount = (userId: string) => {
        setLinkedAccounts(linkedAccounts.filter(u => u.id !== userId));
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('isTestUser');
                document.cookie = 'is-test-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
            }
            await supabase.auth.signOut();
            setCurrentUser({
                id: 'guest',
                name: 'Guest',
                email: '',
                role: 'Guest',
                avatarUrl: '',
                initials: 'G',
                tier: 'FREE'
            });
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{
            currentUser,
            isLoading,
            linkedAccounts,
            switchUser,
            addLinkedAccount,
            removeLinkedAccount,
            refreshProfile,
            signOut
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
