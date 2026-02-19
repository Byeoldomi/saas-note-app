import { createClient } from '../config/supabase';
import { IAuthRepository } from '../../domain/repositories/auth-repository.interface';
import { User } from '../../domain/entities/user';

export class SupabaseAuthRepository implements IAuthRepository {
    private supabase = createClient();

    async signIn(email: string, password: string): Promise<User> {
        // Mock Auth for Test Accounts (e.g., test@test.com)
        // EXCLUDING test1@test.com and test2@test.com which are now real users
        if (/^test.*@test\.com$/.test(email) && !['test1@test.com', 'test2@test.com'].includes(email)) {
            const mockUser: User = {
                id: `test-user-${email}`,
                email: email,
            };
            if (typeof window !== 'undefined') {
                localStorage.setItem('isTestUser', email);
                document.cookie = `is-test-user=${email}; path=/; max-age=31536000`;
            }
            return mockUser;
        }

        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw new Error(error.message);
        if (!data.user) throw new Error('User not found');

        return {
            id: data.user.id,
            email: data.user.email!,
        };
    }

    async signUp(email: string, password: string): Promise<User> {
        // Mock SignUp for Test Accounts
        // EXCLUDING test1@test.com and test2@test.com which are now real users
        if (/^test.*@test\.com$/.test(email) && !['test1@test.com', 'test2@test.com'].includes(email)) {
            const mockUser: User = {
                id: `test-user-${email}`,
                email: email,
            };
            if (typeof window !== 'undefined') {
                localStorage.setItem('isTestUser', email);
                document.cookie = `is-test-user=${email}; path=/; max-age=31536000`;
            }
            return mockUser;
        }

        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
        });

        if (error) throw new Error(error.message);
        if (!data.user) throw new Error('User creation failed');

        return {
            id: data.user.id,
            email: data.user.email!,
        };
    }

    async signOut(): Promise<void> {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('isTestUser');
            document.cookie = 'is-test-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
        const { error } = await this.supabase.auth.signOut();
        if (error) throw new Error(error.message);
    }

    async getCurrentUser(): Promise<User | null> {
        const { data, error } = await this.supabase.auth.getUser();

        if (error || !data.user) return null;

        return {
            id: data.user.id,
            email: data.user.email!,
        };
    }
}
