'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useUser } from '@/presentation/context/UserContext';
import { createClient } from '@/infrastructure/config/supabase';

function SuccessContent() {
    const searchParams = useSearchParams();
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
    const { refreshProfile } = useUser();

    // Using Supabase Auth directly to get the real User ID
    // We cannot rely on Mock UserContext for the ID if we are doing a real DB update
    const [userId, setUserId] = useState<string | null>(null);
    const [status, setStatus] = useState<'loading' | 'success' | 'fail'>('loading');
    const [errorMessage, setErrorMessage] = useState('');
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            } else {
                setStatus('fail');
                setErrorMessage('User not authenticated');
            }
        };
        getUser();
    }, [supabase]);


    const authKey = searchParams.get('authKey');
    const customerKey = searchParams.get('customerKey');

    useEffect(() => {
        if (!userId) return;

        const processPayment = async () => {
            // Handle Billing Registration (Subscription)
            if (authKey && customerKey && amount) {
                try {
                    const response = await fetch('/api/payments/billing/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            authKey,
                            customerKey,
                            amount: Number(amount),
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Billing registration failed');
                    }

                    await refreshProfile();
                    setStatus('success');
                } catch (error: any) {
                    console.error(error);
                    setStatus('fail');
                    setErrorMessage(error.message);
                }
                return;
            }

            // Handle One-time Payment (Legacy or other flows)
            if (paymentKey && orderId && amount) {
                try {
                    const response = await fetch('/api/payments/confirm', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            paymentKey,
                            orderId,
                            amount: Number(amount),
                            userId, // Pass userId for the backend to upgrade
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Payment confirmation failed');
                    }

                    await refreshProfile(); // Update local user state (tier: PRO)
                    setStatus('success');
                } catch (error: any) {
                    console.error(error);
                    setStatus('fail');
                    setErrorMessage(error.message);
                }
            }
        };

        processPayment();
    }, [paymentKey, orderId, amount, userId, authKey, customerKey]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">결제 승인 중...</h1>
                <p>잠시만 기다려주세요.</p>
            </div>
        );
    }

    if (status === 'fail') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
                <h1 className="text-2xl font-bold mb-4">결제 실패</h1>
                <p>{errorMessage}</p>
                <Link href="/subscription" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    다시 시도하기
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-green-600">
            <h1 className="text-2xl font-bold mb-4">결제 성공!</h1>
            <p>주문이 정상적으로 처리되었습니다.</p>
            <div className="mt-8 p-4 bg-gray-100 rounded text-gray-800">
                <p>주문번호: {orderId}</p>
                <p>결제금액: {Number(amount).toLocaleString()}원</p>
            </div>
            <Link href="/dashboard" className="mt-8 px-4 py-2 bg-blue-500 text-white rounded">
                대시보드로 이동
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
