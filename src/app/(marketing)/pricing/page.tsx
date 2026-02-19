'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/presentation/context/UserContext';

export default function PricingPage() {
    const { currentUser } = useUser();
    const [isYearly, setIsYearly] = useState(false);

    const isLoggedIn = currentUser && currentUser.id !== 'guest';
    const upgradeLink = isLoggedIn ? '/subscription' : '/signup?plan=pro';

    return (

        <main className="flex-grow">
            <section className="pt-20 pb-12 px-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 border border-primary/20">
                    <span className="material-icons-outlined text-sm">verified</span>
                    Simple pricing, powerful features
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                    Simple, transparent pricing
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Start organizing your thoughts today. Upgrade as you grow. No hidden fees, ever.
                </p>
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className={`text-sm font-semibold transition-colors ${!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Monthly</span>
                    <button
                        className="relative w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                        onClick={() => setIsYearly(!isYearly)}
                        type="button"
                    >
                        <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                    <span className={`text-sm font-semibold transition-colors ${isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        Yearly <span className="text-primary text-xs ml-1 bg-primary/10 px-2 py-0.5 rounded-full">-20%</span>
                    </span>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 relative group h-full flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">For personal organization and quick notes.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">$0</span>
                            <span className="text-slate-500 dark:text-slate-400 font-medium">/month</span>
                        </div>
                        <Link className="block w-full py-3 px-4 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-center rounded-xl transition-colors mb-8" href={isLoggedIn ? '/dashboard' : '/signup'}>
                            Get Started
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Unlimited notes</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Sync up to 1 device</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Basic formatting tools</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 opacity-50">
                                <span className="material-icons-outlined text-slate-400 text-lg mt-0.5">cancel</span>
                                <span className="line-through decoration-slate-400">AI summarization</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 opacity-50">
                                <span className="material-icons-outlined text-slate-400 text-lg mt-0.5">cancel</span>
                                <span className="line-through decoration-slate-400">Collaborative workspaces</span>
                            </li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 border-primary shadow-2xl shadow-primary/10 relative transform md:-translate-y-4 z-10 w-full flex flex-col h-full">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow-md shadow-primary/20">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-primary">Pro</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">For power users who need advanced organization.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold text-slate-900 dark:text-white">${isYearly ? '6' : '8'}</span>
                            <span className="text-slate-500 dark:text-slate-400 font-medium">/month</span>
                        </div>
                        <Link className="block w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-bold text-center rounded-xl transition-all shadow-lg shadow-primary/30 mb-8 transform active:scale-[0.98] hover:-translate-y-0.5" href={upgradeLink}>
                            Upgrade to Pro
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Everything in Free</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Unlimited devices</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>AI Summaries</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Collaboration tools (up to 5 users)</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Version history (30 days)</span>
                            </li>
                        </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 relative h-full flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Enterprise</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">For large teams requiring control and security.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">Custom</span>
                        </div>
                        <Link className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-center rounded-xl transition-colors mb-8 border border-slate-200 dark:border-slate-700" href="/contact">
                            Contact Sales
                        </Link>
                        <ul className="space-y-4 flex-1">
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Everything in Pro</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>SSO & Advanced Security</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Dedicated Success Manager</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Audit logs & Analytics</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                <span className="material-icons-outlined text-primary text-lg mt-0.5">check_circle</span>
                                <span>Unlimited Version History</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by creative teams at</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-300"><span className="material-icons-outlined text-3xl">token</span> Acme Corp</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-300"><span className="material-icons-outlined text-3xl">diamond</span> GemStone</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-300"><span className="material-icons-outlined text-3xl">rocket_launch</span> StarLine</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-300"><span className="material-icons-outlined text-3xl">bolt</span> FlashInc</div>
                        <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-300"><span className="material-icons-outlined text-3xl">forest</span> Canopy</div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/20 transition-colors">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Can I switch plans later?</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Absolutely. You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/20 transition-colors">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Is my data secure?</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Yes, we use industry-standard encryption for data in transit and at rest. Your notes are private and only accessible by you.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-primary/20 transition-colors">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Do you offer a student discount?</h3>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Yes! Students with a valid .edu email address get 50% off the Pro plan. Contact our support team to apply.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>


    );
}
