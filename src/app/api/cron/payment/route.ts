import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { TossPaymentGateway } from '../../../../infrastructure/payment/TossPaymentGateway';
import { SupabaseSubscriptionRepository } from '../../../../infrastructure/payment/SupabaseSubscriptionRepository';
import { SupabasePaymentRepository } from '../../../../infrastructure/payment/SupabasePaymentRepository';
import { ProcessScheduledPaymentUseCase } from '../../../../application/use-cases/payment/ProcessScheduledPayment.usecase';

export async function POST(request: NextRequest) {
    try {
        // Simple authorization check for cron job
        const authHeader = request.headers.get('Authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            // Optional: allow valid local dev requests or something, 
            // but for production relying on CRON_SECRET is good practice.
            if (process.env.NODE_ENV === 'production' || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        }

        // Initialize Supabase Admin Client (Service Role) to bypass RLS for batch processing
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

        if (!supabaseServiceRoleKey) {
            throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

        const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY!;
        const gateway = new TossPaymentGateway(secretKey);

        const subscriptionRepo = new SupabaseSubscriptionRepository(supabaseAdmin);
        const paymentRepo = new SupabasePaymentRepository(supabaseAdmin);

        const useCase = new ProcessScheduledPaymentUseCase(
            subscriptionRepo,
            gateway,
            paymentRepo
        );

        await useCase.execute();

        return NextResponse.json({ success: true, message: 'Scheduled payments processed' });

    } catch (error: any) {
        console.error('Error processing scheduled payments:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
