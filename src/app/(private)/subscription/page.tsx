'use client';

import { useState, useEffect, useRef } from 'react';
import { loadTossPayments, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import { SubscriptionStatusCard } from '@/presentation/components/domain/subscription/SubscriptionStatusCard';
import { PaymentMethodCard } from '@/presentation/components/domain/subscription/PaymentMethodCard';
import { PaymentHistoryTable } from '@/presentation/components/domain/subscription/PaymentHistoryTable';
import { CancelSubscriptionModal } from '@/presentation/components/domain/subscription/CancelSubscriptionModal';
import { PlanSelector, PlanInterval, PlanType } from '@/presentation/components/domain/subscription/PlanSelector';
import { useUser } from '@/presentation/context/UserContext';
import { Button } from '@/presentation/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;

export default function SubscriptionPage() {
    const { currentUser } = useUser();
    const tospaymentsRef = useRef<any>(null);

    // -- State --
    const [isChangingPlan, setIsChangingPlan] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState<PlanInterval>('MONTHLY');
    const [selectedPlan, setSelectedPlan] = useState<PlanType>(currentUser.tier);
    const [isWidgetReady, setIsWidgetReady] = useState(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    // Subscription Data State (simulated for display)
    const [subscription, setSubscription] = useState({
        plan: currentUser.tier,
        status: currentUser.tier === 'FREE' ? 'CANCELED' : 'ACTIVE',
        renewalDate: currentUser.tier === 'FREE' ? '-' : 'Oct 24, 2023',
        amount: currentUser.tier === 'FREE' ? '$0.00' : '$8.00',
        interval: 'MONTHLY' as PlanInterval,
    });

    // Payment History & Method (mock data)
    const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
    const [paymentMethod] = useState({
        type: 'CARD' as const,
        brand: 'VISA' as const,
        last4: '4242',
        expiry: '12/24',
    });

    // Calculate price based on selection
    const price = selectedPlan === 'PRO' ? (selectedInterval === 'MONTHLY' ? 10000 : 100000) : 0;

    // -- Effects --

    // User State Sync
    useEffect(() => {
        // Sync local subscription state with user tier
        if (currentUser.tier === 'FREE') {
            setSubscription({
                plan: 'FREE',
                status: 'CANCELED',
                renewalDate: '-',
                amount: '$0.00',
                interval: 'MONTHLY'
            });
            setPaymentHistory([]);
        } else if (currentUser.tier === 'PRO') {
            setSubscription({
                plan: 'PRO',
                status: 'ACTIVE',
                renewalDate: 'Oct 24, 2023',
                amount: '$10,000',
                interval: 'MONTHLY'
            });
            setPaymentHistory([
                { id: 'inv_1', date: 'Sep 24, 2023', amount: '₩10,000', status: 'PAID', invoiceUrl: '#' },
            ]);
        }
        // Sync selection state
        setSelectedPlan(currentUser.tier);
    }, [currentUser]);

    // Initialize Toss Payments (Load SDK)
    useEffect(() => {
        if (!isChangingPlan || selectedPlan !== 'PRO') return;

        let isMounted = true;

        const initTossPayments = async () => {
            try {
                const tosspayments = await loadTossPayments(clientKey);
                if (!isMounted) return;

                tospaymentsRef.current = tosspayments;
                setIsWidgetReady(true);
            } catch (error) {
                console.error("Failed to load Toss Payments SDK:", error);
            }
        };

        initTossPayments();

        return () => {
            isMounted = false;
        };
    }, [isChangingPlan, selectedPlan]);


    // -- Handlers --

    const handlePayment = async () => {
        if (!tospaymentsRef.current) return;

        try {
            const payment = tospaymentsRef.current.payment({
                customerKey: currentUser.id,
            });

            // Request Billing Authorization (Window Popup)
            await payment.requestBillingAuth({
                method: 'CARD', // Billing Auth usually starts with Card registration
                successUrl: window.location.origin + `/payment/success?amount=${price}`,
                failUrl: window.location.origin + '/payment/fail',
                customerEmail: currentUser.email,
                customerName: currentUser.name,
            });
        } catch (error) {
            console.error('Billing auth request failed', error);
            alert('자동결제 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    const handleCancelSubscription = () => {
        setSubscription(prev => ({ ...prev, status: 'CANCELED' }));
        setIsCancelModalOpen(false);
    };

    return (
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    {isChangingPlan && (
                        <button
                            onClick={() => setIsChangingPlan(false)}
                            className="flex items-center text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors"
                        >
                            <ArrowLeft size={16} className="mr-1" />
                            Back to Overview
                        </button>
                    )}
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                        {isChangingPlan ? 'Choose a Plan' : 'Subscription & Billing'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        {isChangingPlan
                            ? 'Select the plan that fits your needs.'
                            : 'Manage your plan, payment method, and billing history.'}
                    </p>
                </div>

                {/* Content */}
                {isChangingPlan ? (
                    // CHANGE PLAN VIEW
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <PlanSelector
                            currentPlan={currentUser.tier}
                            selectedPlan={selectedPlan}
                            interval={selectedInterval}
                            onSelectPlan={setSelectedPlan}
                            onToggleInterval={setSelectedInterval}
                        />

                        {/* Payment Area (Popup Flow) */}
                        {selectedPlan === 'PRO' && currentUser.tier !== 'PRO' && (
                            <div className="bg-white dark:bg-[#151b2b] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-icons-outlined text-primary text-3xl">credit_card</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Subscribe to Pro</h3>
                                    <p className="text-slate-500 dark:text-slate-400">
                                        Click the button below to securely register your card and complete the subscription.
                                    </p>
                                </div>
                                <button
                                    className={`w-full py-4 rounded-xl font-semibold transition-all shadow-lg text-white ${isWidgetReady
                                        ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                                        : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                                        }`}
                                    onClick={handlePayment}
                                    disabled={!isWidgetReady}
                                >
                                    {isWidgetReady
                                        ? `Pay ${price.toLocaleString()} KRW`
                                        : 'Loading Payment Module...'}
                                </button>
                                <p className="mt-4 text-xs text-center text-slate-400">
                                    Secure payment powered by Toss Payments
                                </p>
                            </div>
                        )}

                        {/* Enterprise Contact Button - if selected */}
                        {selectedPlan === 'ENTERPRISE' && currentUser.tier !== 'ENTERPRISE' && (
                            <div className="flex justify-center p-8">
                                <Button size="lg" onClick={() => window.location.href = 'mailto:sales@cloudnote.com'}>
                                    Contact Sales Team
                                </Button>
                            </div>
                        )}
                    </div>
                ) : (
                    // OVERVIEW VIEW
                    <div className="grid gap-8">
                        {/* Subscription Status */}
                        <SubscriptionStatusCard
                            plan={subscription.plan as any}
                            status={subscription.status as any}
                            renewalDate={subscription.renewalDate}
                            amount={subscription.amount}
                            interval={subscription.interval}
                            onChangePlan={() => setIsChangingPlan(true)}
                            onCancel={() => setIsCancelModalOpen(true)}
                        />

                        {/* Show Payment Method & History only for Paid Users */}
                        {currentUser.tier !== 'FREE' && (
                            <>
                                <PaymentMethodCard
                                    type={paymentMethod.type}
                                    brand={paymentMethod.brand}
                                    last4={paymentMethod.last4}
                                    expiry={paymentMethod.expiry}
                                    onUpdate={() => console.log('Update Payment Method Clicked')}
                                />

                                <PaymentHistoryTable history={paymentHistory} />
                            </>
                        )}
                    </div>
                )}
            </div>

            <CancelSubscriptionModal
                isOpen={isCancelModalOpen}
                onClose={() => setIsCancelModalOpen(false)}
                onConfirm={handleCancelSubscription}
            />
        </div>
    );
}
