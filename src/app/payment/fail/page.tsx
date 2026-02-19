'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';

function FailContent() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const message = searchParams.get('message');
    const orderId = searchParams.get('orderId');

    // Report failure to server
    // We use a simple useEffect. We don't block the UI rendering.
    // Ideally we should have a mutation or similar, but fetch in useEffect is acceptable here.
    useEffect(() => {
        if (orderId && message) {
            // Use an IIFE or separate function inside useEffect to handle async
            // We only want to run this once per mount/params
            // But React strict mode might run it twice. The server endpoint should handle idempotency or just update status (which is idempotent-ish if it stays failed).
            // Since we don't have a dedicated state for "reported", we might just call it.
            // Better: check if we already reported? Hard without state.
            // Let's just call it.
            (async () => {
                try {
                    await fetch('/api/payments/fail', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderId, reason: message }),
                    });
                } catch (e) {
                    console.error('Failed to report payment failure', e);
                }
            })();
        }
    }, [orderId, message]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-red-500">
            <h1 className="text-2xl font-bold mb-4">결제 실패</h1>
            <div className="p-4 bg-red-50 rounded mb-4">
                <p className="font-semibold text-red-700">{message}</p>
                <p className="text-sm text-red-600">Code: {code}</p>
            </div>
            <Link href="/subscription" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                다시 시도하기
            </Link>
        </div>
    );
}

export default function FailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FailContent />
        </Suspense>
    );
}
