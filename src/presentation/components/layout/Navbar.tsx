'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { useUser } from '@/presentation/context/UserContext';

export default function Navbar() {
    const { currentUser, signOut } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-background-dark/80 border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Logo />

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="/#features">Features</Link>
                        <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="/#solutions">Solutions</Link>
                        <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="/pricing">Pricing</Link>
                        <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors" href="/#blog">Blog</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {currentUser?.id !== 'guest' ? (
                            <>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
                                >
                                    Log out
                                </button>
                                <Button href="/dashboard" className="shadow-lg shadow-primary/30">Dashboard</Button>
                            </>
                        ) : (
                            <>
                                <Link className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors" href="/login">Log in</Link>
                                <Button href="/signup" className="shadow-lg shadow-primary/30">Get Started</Button>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            className="text-slate-600 dark:text-slate-300 hover:text-primary focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="material-icons-outlined text-2xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-background-dark border-b border-slate-200 dark:border-slate-800">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        <Link className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800" href="/#features" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                        <Link className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800" href="/#solutions" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
                        <Link className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800" href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                        <Link className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800" href="/#blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                        <div className="my-2 border-t border-slate-200 dark:border-slate-700"></div>
                        {currentUser?.id !== 'guest' ? (
                            <>
                                <button
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800"
                                    onClick={() => {
                                        signOut();
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Log out
                                </button>
                                <Link
                                    className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10"
                                    href="/dashboard"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800" href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                                <Link className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-primary/10" href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
