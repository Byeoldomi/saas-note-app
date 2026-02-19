'use client';

import React from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/presentation/components/auth/auth-layout';
import { useSignInViewModel } from '@/presentation/hooks/use-signin-view-model';
import { Input } from '@/presentation/components/ui/Input';
import { Button } from '@/presentation/components/ui/Button';

import { useUser } from '@/presentation/context/UserContext';

export default function LoginPage() {
    const { currentUser, signOut } = useUser();
    const {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        handleSignIn,
    } = useSignInViewModel();

    if (currentUser?.id !== 'guest') {
        return (
            <AuthLayout>
                <div className="w-full max-w-md space-y-8 text-center">
                    <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-outlined text-primary text-4xl">account_circle</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Already logged in</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        You are currently logged in as <span className="font-semibold text-slate-900 dark:text-white">{currentUser.email}</span>.
                    </p>
                    <div className="mt-8 flex flex-col gap-4">
                        <Button href="/dashboard" variant="primary" className="w-full py-3">
                            Go to Dashboard
                        </Button>
                        <Button
                            onClick={() => signOut()}
                            variant="secondary"
                            className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        >
                            Log out to switch account
                        </Button>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Enter your details to access your notes.
                    </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => { }} // Add handler if needed
                            leftIcon={
                                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M12.0003 20.45c-4.6667 0-8.45-3.7833-8.45-8.45 0-4.6667 3.7833-8.45 8.45-8.45 4.6667 0 8.45 3.7833 8.45 8.45 0 4.6667-3.7833 8.45-8.45 8.45z" fill="white" stroke="currentColor" strokeWidth="0.5"></path>
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                            }
                        >
                            Google
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => { }} // Add handler if needed
                            leftIcon={
                                <svg aria-hidden="true" className="h-5 w-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13.135 6.056c-.15.006-.304.006-.454-.006A3.42 3.42 0 0 1 14.072 2a3.4 3.4 0 0 1 2.503 2.112c.007.03.013.06.02.09a3.42 3.42 0 0 1-3.46 1.854zm2.13 1.64c.905 0 2.298-.616 2.884-1.332a6.9 6.9 0 0 0 1.66-2.934c.036-.002.072-.002.108 0 .584.053 1.17.15 1.742.29a7.6 7.6 0 0 1 3.996 2.585 7.65 7.65 0 0 1 1.764 4.992c0 4.172-3.328 7.585-7.464 7.684-1.396.033-2.738-.41-3.868-1.196-.92.64-2.03.994-3.18.994-1.68 0-3.23-.715-4.29-1.89-1.06-1.173-1.587-2.74-1.424-4.398a7.6 7.6 0 0 1 2.895-5.61c.96-.756 2.13-1.222 3.364-1.314.156.002.313.004.47.006.39.004.78.03 1.164.08.35.044.697.108 1.04.19.426.104.843.234 1.25.385.197.075.39.155.58.24z"></path>
                                </svg>
                            }
                        >
                            Apple
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-background-light dark:bg-background-dark text-slate-500">Or continue with email</span>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input
                            id="email"
                            type="email"
                            label="Email address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            leftIcon={<span className="material-icons-outlined text-lg">mail</span>}
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            leftIcon={<span className="material-icons-outlined text-lg">lock</span>}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded dark:border-slate-600 dark:bg-surface-dark"
                            />
                            <label className="ml-2 block text-sm text-slate-600 dark:text-slate-400" htmlFor="remember-me">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a className="font-medium text-primary hover:text-primary-hover transition-colors" href="#">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                </form>

                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    Don't have an account?
                    <Link href="/signup" className="font-bold text-primary hover:text-primary-hover transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
