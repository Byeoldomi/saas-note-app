'use client';

import { useState, useRef, useEffect } from 'react';
import { Avatar } from "@/presentation/components/ui/Avatar";
import { cn } from "@/shared/utils/cn";
import { Check } from 'lucide-react';
import { useUser } from '@/presentation/context/UserContext';

export function UserProfileSwitcher() {
    const { currentUser, switchUser, linkedAccounts, signOut } = useUser();
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
            {/* Trigger Button */}
            <button
                ref={buttonRef}
                onClick={toggleMenu}
                className={cn(
                    "flex items-center gap-3 w-full p-2 rounded-lg transition-colors text-left outline-none",
                    isOpen ? "bg-slate-100 dark:bg-slate-800" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                )}
            >
                <Avatar
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    fallback={currentUser.initials}
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {currentUser.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{currentUser.role}</p>
                </div>
                <span className="material-icons-outlined text-slate-400">
                    unfold_more
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    ref={menuRef}
                    className="absolute bottom-full left-0 w-full mb-2 bg-white dark:bg-[#1a2333] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-[50] animate-in fade-in zoom-in-95 duration-200"
                >
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
                                        <p className="text-xs text-slate-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    {currentUser.id === user.id && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-700 p-2 bg-slate-50 dark:bg-slate-800/30">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Add account clicked');
                                // Mock adding an account - in real app this would open login modal
                                // For now we keep it as just a log or we could toggle a modal
                            }}
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors text-sm"
                        >
                            <span className="material-icons-outlined text-lg">add</span>
                            Add another account
                        </button>
                        <button
                            onClick={() => {
                                signOut();
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors text-sm"
                        >
                            <span className="material-icons-outlined text-lg">logout</span>
                            Log out all accounts
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
