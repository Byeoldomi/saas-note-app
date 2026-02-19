import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ProcessPaymentSuccessUseCase } from '@/application/use-cases/payment/ProcessPaymentSuccess.usecase';
import { TossPaymentGateway } from '@/infrastructure/payment/TossPaymentGateway';
import { SupabasePaymentRepository } from '@/infrastructure/payment/SupabasePaymentRepository';
import { SupabaseUserRepository } from '@/infrastructure/user/SupabaseUserRepository';

const getSupabaseConfig = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_DEFAULT_KEY;

    if (!url || !key) {
        throw new Error('Supabase URL or Key is missing in environment variables.');
    }

    return { url, key };
};

const tossSecretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';

export async function POST(req: NextRequest) {
    try {
        const { paymentKey, orderId, amount, userId } = await req.json();

        if (!paymentKey || !orderId || !amount || !userId) {
            return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
        }

        const { url, key } = getSupabaseConfig();

        // Initialize Admin Client to bypass RLS for updating user tier
        const supabaseAdmin = createClient(url, key, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });

        const paymentGateway = new TossPaymentGateway(tossSecretKey);
        const paymentRepository = new SupabasePaymentRepository(supabaseAdmin as any);
        const userRepository = new SupabaseUserRepository(supabaseAdmin as any);
        const processPaymentUseCase = new ProcessPaymentSuccessUseCase(paymentRepository, paymentGateway, userRepository);

        const payment = await processPaymentUseCase.execute(paymentKey, orderId, Number(amount), userId);

        return NextResponse.json(payment);
    } catch (error: any) {
        console.error('Payment processing error:', error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
