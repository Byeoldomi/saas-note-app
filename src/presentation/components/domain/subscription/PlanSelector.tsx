import { Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/shared/utils/cn';

export type PlanInterval = 'MONTHLY' | 'YEARLY';
export type PlanType = 'FREE' | 'PRO' | 'ENTERPRISE';

interface PlanSelectorProps {
    currentPlan: PlanType;
    selectedPlan: PlanType;
    interval: PlanInterval;
    onSelectPlan: (plan: PlanType) => void;
    onToggleInterval: (interval: PlanInterval) => void;
}

export function PlanSelector({
    currentPlan,
    selectedPlan,
    interval,
    onSelectPlan,
    onToggleInterval
}: PlanSelectorProps) {
    return (
        <div className="space-y-8">
            {/* Billing Interval Toggle */}
            <div className="flex justify-center">
                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg inline-flex relative">
                    <button
                        onClick={() => onToggleInterval('MONTHLY')}
                        className={cn(
                            "px-6 py-2 rounded-md text-sm font-medium transition-all relative z-10",
                            interval === 'MONTHLY'
                                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => onToggleInterval('YEARLY')}
                        className={cn(
                            "px-6 py-2 rounded-md text-sm font-medium transition-all relative z-10",
                            interval === 'YEARLY'
                                ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                        )}
                    >
                        Yearly
                        <span className="absolute -top-3 -right-6 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            -17%
                        </span>
                    </button>
                </div>
            </div>

            {/* Plan Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Free Plan */}
                <div
                    className={cn(
                        "border rounded-2xl p-6 relative transition-all cursor-pointer",
                        selectedPlan === 'FREE'
                            ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50 bg-blue-50/10"
                            : "border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700"
                    )}
                    onClick={() => onSelectPlan('FREE')}
                >
                    <div className="mb-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Free</h3>
                        <p className="text-sm text-slate-500">For personal use</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">$0</span>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            5 notes per day
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            Basic formatting
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            1 device sync
                        </li>
                    </ul>
                    <button
                        className={cn(
                            "w-full py-2 rounded-lg text-sm font-semibold transition-colors",
                            currentPlan === 'FREE'
                                ? "bg-slate-200 text-slate-500 cursor-default"
                                : "bg-slate-900 text-white hover:bg-slate-800"
                        )}
                        disabled={currentPlan === 'FREE'}
                    >
                        {currentPlan === 'FREE' ? 'Current Plan' : 'Downgrade'}
                    </button>
                </div>

                {/* Pro Plan */}
                <div
                    className={cn(
                        "border rounded-2xl p-6 relative transition-all cursor-pointer",
                        selectedPlan === 'PRO'
                            ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50 bg-blue-50/10"
                            : "border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700"
                    )}
                    onClick={() => onSelectPlan('PRO')}
                >
                    {selectedPlan === 'PRO' && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                            Most Popular
                        </div>
                    )}
                    <div className="mb-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Pro</h3>
                        <p className="text-sm text-slate-500">For power users</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">
                            {interval === 'MONTHLY' ? '₩10,000' : '₩100,000'}
                        </span>
                        <span className="text-slate-500 text-sm">/{interval === 'MONTHLY' ? 'mon' : 'year'}</span>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            Unlimited notes
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            AI summarization
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            Unlimited devices
                        </li>
                    </ul>
                    <button
                        className={cn(
                            "w-full py-2 rounded-lg text-sm font-semibold transition-colors",
                            currentPlan === 'PRO'
                                ? "bg-slate-200 text-slate-500 cursor-default"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        )}
                        disabled={currentPlan === 'PRO'}
                    >
                        {currentPlan === 'PRO' ? 'Current Plan' : 'Upgrade'}
                    </button>
                </div>

                {/* Enterprise Plan */}
                <div
                    className={cn(
                        "border rounded-2xl p-6 relative transition-all cursor-pointer",
                        selectedPlan === 'ENTERPRISE'
                            ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50 bg-blue-50/10"
                            : "border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700"
                    )}
                    onClick={() => onSelectPlan('ENTERPRISE')}
                >
                    <div className="mb-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Enterprise</h3>
                        <p className="text-sm text-slate-500">For teams</p>
                    </div>
                    <div className="mb-6">
                        <span className="text-3xl font-bold text-slate-900 dark:text-white">Custom</span>
                    </div>
                    <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            SSO & Advanced Security
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            Unlimited history
                        </li>
                        <li className="flex items-center gap-2">
                            <Check size={16} className="text-green-500" />
                            Dedicated support
                        </li>
                    </ul>
                    <button
                        className={cn(
                            "w-full py-2 rounded-lg text-sm font-semibold transition-colors",
                            currentPlan === 'ENTERPRISE'
                                ? "bg-slate-200 text-slate-500 cursor-default"
                                : "bg-slate-900 text-white hover:bg-slate-800"
                        )}
                        disabled={currentPlan === 'ENTERPRISE'}
                    >
                        {currentPlan === 'ENTERPRISE' ? 'Current Plan' : 'Contact Sales'}
                    </button>
                </div>
            </div>
        </div>
    );
}
