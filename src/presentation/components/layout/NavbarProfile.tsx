'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Avatar } from "@/presentation/components/ui/Avatar";
import { cn } from "@/shared/utils/cn";
import { Check } from 'lucide-react';
import { useUser } from '@/presentation/context/UserContext';

export function NavbarProfile() {
    const { currentUser, switchUser, linkedAccounts } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleSwitchUser = (e: React.MouseEvent, userId: string) => {
        e.stopPropagation();
        switchUser(userId);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Trigger Button (Avatar Only) */}
            <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="relative group outline-none rounded-full"
            >
                <Avatar
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    fallback={currentUser.initials}
                    className="ring-2 ring-white dark:ring-slate-800 shadow-sm transition-transform active:scale-95"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-[#1a2333] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-[50] animate-in fade-in zoom-in-95 duration-200 origin-top-right"
                >
                    {/* Header: Current User Info */}
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700/50">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            {currentUser.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate mb-2">
                            {currentUser.email}
                        </p>
                        <Link href="/subscription" className="block mt-2 group" onClick={() => setIsOpen(false)}>
                            <span className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors group-hover:opacity-80",
                                currentUser.tier === 'PRO' ? "bg-primary/10 text-primary" :
                                    currentUser.tier === 'ENTERPRISE' ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" :
                                        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                            )}>
                                {currentUser.tier} Plan
                                <span className="material-icons-outlined text-[10px] ml-1">arrow_forward_ios</span>
                            </span>
                        </Link>
                    </div>

                    {/* Account List */}
                    <div className="p-2">
                        <p className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Switch Account
                        </p>
                        <div className="space-y-1">
                            {linkedAccounts.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={(e) => handleSwitchUser(e, user.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition-colors",
                                        currentUser.id === user.id
                                            ? "bg-slate-100 dark:bg-slate-800"
                                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    )}
                                >
                                    <Avatar
                                        src={user.avatarUrl}
                                        alt={user.name}
                                        fallback={user.initials}
                                        className="w-8 h-8 text-[10px]"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className={cn(
                                            "text-sm font-medium truncate",
                                            currentUser.id === user.id ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                                        )}>
                                            {user.name}
                                        </p>
                                    </div>
                                    {currentUser.id === user.id && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-slate-200 dark:border-slate-700 p-2 bg-slate-50 dark:bg-slate-800/30">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Add account clicked');
                            }}
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors text-sm"
                        >
                            <span className="material-icons-outlined text-lg">add</span>
                            Add another account
                        </button>
                        <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-700 transition-colors text-sm">
                            <span className="material-icons-outlined text-lg">logout</span>
                            Log out all accounts
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
