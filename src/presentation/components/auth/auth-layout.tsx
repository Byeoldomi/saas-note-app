import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 antialiased h-screen w-full flex overflow-hidden">
            {/* Left Section - Hero (Visible on lg) */}
            <div className="hidden lg:flex w-1/2 relative bg-primary dark:bg-primary/90 flex-col justify-between p-12 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img
                        alt="Abstract blue fluid waves background pattern"
                        className="w-full h-full object-cover mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjH8t3APbhNAbqCWDvcE-L0iIwz5OSPNevPvFNrbRhySjq6dAYy93bu0-3e6Sdqd5nnxJOkTRBGqR7iwEXZRT9Pj4-SUPWvAYbEFLyQqY4EFvfcm2E-dTB9t05nO7-5bdEym4qPmdzZjKYZGavsFAy4Wy5Cz4EfjveoAseFkCZ5l2dxPOpV0w_2uDVE4mtj9zyJNJCXphcTpPjqJ-Gu5-r7YXHLIq8qpx57FUdhkOqRHK5tiG2sbXW5aVvV_8VQq1Cw7koRrxlpW8"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent z-0"></div>

                <div className="relative z-10 flex items-center gap-2 text-white">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-primary">
                        <span className="material-icons-outlined text-xl">cloud_queue</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">CloudNote</span>
                </div>

                <div className="relative z-10 mb-8 max-w-lg">
                    <div className="flex gap-1 mb-6">
                        <span className="material-icons-outlined text-yellow-300 text-xl">star</span>
                        <span className="material-icons-outlined text-yellow-300 text-xl">star</span>
                        <span className="material-icons-outlined text-yellow-300 text-xl">star</span>
                        <span className="material-icons-outlined text-yellow-300 text-xl">star</span>
                        <span className="material-icons-outlined text-yellow-300 text-xl">star</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white leading-tight mb-6">
                        "This tool completely transformed how I organize my thoughts. It's simply brilliant."
                    </h2>
                    <div className="flex items-center gap-4">
                        <img
                            alt="Sarah Jenkins"
                            className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdjz5oB2txUQ6NQcL28_S-jgKLr3Swsa4YQm21d7CyNGUqYg91JZNo9lW8pAlE8BUpPE5lJZarhXoKh-ihxWm451jE4v0mNOFXHQHo74M7OobE2l-oiX20knv000C6qEx3nfzK-f7rwKHdn8SEIMDkxujpf9lfLGxxlutQn8Q2QJPwCa7OBy1ofo2FW4Dnc1YZ7ji1YqRLB3PtiU5OXdTI1Xd3WK9rZTDPbx4Re2kr73QHACyxNgkPK0DSpcTNVIi0Gcgxg4lhLGs"
                        />
                        <div>
                            <p className="text-white font-semibold">Sarah Jenkins</p>
                            <p className="text-white/70 text-sm">Product Manager at TechFlow</p>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 -left-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
            </div>

            {/* Right Section - Form Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
                <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-primary">
                    <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">
                        <span className="material-icons-outlined text-xl">cloud_queue</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CloudNote</span>
                </div>

                {children}

                <div className="mt-12 text-xs text-center text-slate-400 dark:text-slate-500">
                    © {new Date().getFullYear()} CloudNote Inc. All rights reserved. <br />
                    <a className="hover:underline" href="#">Privacy Policy</a> • <a className="hover:underline" href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    );
};
