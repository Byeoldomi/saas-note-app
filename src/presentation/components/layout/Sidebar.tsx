'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/presentation/components/ui/Logo";
import { Avatar } from "@/presentation/components/ui/Avatar";

import { cn } from "@/shared/utils/cn";

import { useUser } from "@/presentation/context/UserContext";

export function Sidebar() {
    const pathname = usePathname();
    const { currentUser } = useUser();

    // Calculate storage percentage
    const storagePercentage = Math.min(100, Math.round((currentUser.storageUsage || 0) / (currentUser.storageLimit || 1) * 100));
    const storageUsedGB = ((currentUser.storageUsage || 0) / 1073741824).toFixed(1);
    const storageLimitGB = ((currentUser.storageLimit || 10737418240) / 1073741824).toFixed(0);

    const navItems = [
        { label: "All Notes", href: "/dashboard", icon: "description", count: 12 },
        { label: "Recent", href: "#", icon: "schedule" },
        { label: "Favorites", href: "#", icon: "star_border" },
        { label: "Trash", href: "#", icon: "delete_outline" },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-[#151c2b] border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-20 hidden md:flex">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
                <Logo showText={true} />
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                {/* Main Links */}
                <div className="space-y-1">
                    <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Menu
                    </p>
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-500 hover:text-primary hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
                            )}
                        >
                            <span className="material-icons-outlined">{item.icon}</span>
                            {item.label}
                            {item.count && (
                                <span className={cn(
                                    "ml-auto text-xs font-bold px-2 py-0.5 rounded-full",
                                    pathname === item.href ? "bg-primary text-white" : "bg-slate-100 text-slate-500"
                                )}>
                                    {item.count}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
                {/* Tags Section */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Tags
                        </p>
                        <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-icons-outlined text-sm">add</span>
                        </button>
                    </div>
                    <Link
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm"
                        href="#"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                        Personal
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm"
                        href="#"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        Work
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm"
                        href="#"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
                        Ideas
                    </Link>
                    <Link
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-sm"
                        href="#"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                        Projects
                    </Link>
                </div>
                {/* Storage Widget */}
                {currentUser.tier !== 'PRO' && currentUser.tier !== 'ENTERPRISE' && (
                    <div className="px-2">
                        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
                            <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-white font-medium text-sm">
                                <span className="material-icons-outlined text-primary text-base">
                                    cloud_queue
                                </span>
                                <span>Storage</span>
                            </div>
                            <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-1.5 mb-2 overflow-hidden">
                                <div
                                    className="bg-primary h-1.5 rounded-full"
                                    style={{ width: `${storagePercentage}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {storageUsedGB} GB of {storageLimitGB} GB used
                            </p>
                            <Link href="/subscription" className="mt-3 block text-center text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                                Upgrade Plan
                            </Link>
                        </div>
                    </div>
                )}
            </div>

        </aside>
    );
}
