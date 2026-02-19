'use client';

import React from 'react';
import Link from 'next/link';
import { AuthLayout } from '@/presentation/components/auth/auth-layout';
import { useSignUpViewModel } from '@/presentation/hooks/use-signup-view-model';
import { Input } from '@/presentation/components/ui/Input';
import { Button } from '@/presentation/components/ui/Button';

import { useUser } from '@/presentation/context/UserContext';

export default function SignUpPage() {
    const { currentUser, signOut } = useUser();
    const {
        email,
        setEmail,
        password,
        setPassword,
        isLoading,
        error,
        success,
        handleSignUp,
    } = useSignUpViewModel();

    if (currentUser?.id !== 'guest' && !success) {
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
                            Log out to create new account
                        </Button>
                    </div>
                </div>
            </AuthLayout>
        );
    }

    if (success) {
        return (
            <AuthLayout>
                <div className="w-full max-w-md space-y-8 text-center">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-icons-outlined text-green-600 dark:text-green-400 text-4xl">check_circle</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Verify your email</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">
                        We've sent a verification link to <span className="font-semibold text-slate-900 dark:text-white">{email}</span>.
                        Please check your inbox to complete your registration.
                    </p>
                    <div className="mt-8">
                        <Button href="/login" variant="primary" className="px-6 py-3">
                            Back to Login
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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Create an account</h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Start your journey with CloudNote today.
                    </p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-6">
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
                        <div>
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
                            <p className="mt-1 text-xs text-slate-500 uppercase tracking-wider">Minimum 8 characters</p>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full"
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </div>
                </form>

                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    Already have an account?
                    <Link href="/login" className="font-bold text-primary hover:text-primary-hover transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
