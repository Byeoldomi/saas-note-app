import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/supabase-server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { SupabaseUserRepository } from '@/infrastructure/user/SupabaseUserRepository';
import { TossPaymentGateway } from '@/infrastructure/payment/TossPaymentGateway';
import { SupabaseSubscriptionRepository } from '@/infrastructure/payment/SupabaseSubscriptionRepository';
import { SupabasePaymentRepository } from '@/infrastructure/payment/SupabasePaymentRepository';
import { ProcessScheduledPaymentUseCase } from '@/application/use-cases/payment/ProcessScheduledPayment.usecase';
import { RegisterBillingMethodUseCase } from '@/application/use-cases/payment/RegisterBillingMethod.usecase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { authKey, customerKey, amount } = body;

        if (!authKey || !customerKey || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Initialize dependencies
        const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY!;
        const gateway = new TossPaymentGateway(secretKey);

        // Initialize Admin Client to bypass RLS for internal operations (subscriptions, tier update)
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!url || !serviceKey) {
            throw new Error('Missing Supabase URL or Service Role Key in environment variables.');
        }

        const supabaseAdmin = createAdminClient(
            url,
            serviceKey,
            { auth: { persistSession: false } }
        );

        const subscriptionRepo = new SupabaseSubscriptionRepository(supabaseAdmin as any);
        const paymentRepo = new SupabasePaymentRepository(supabaseAdmin as any);
        const userRepo = new SupabaseUserRepository(supabaseAdmin as any);

        const processPaymentUseCase = new ProcessScheduledPaymentUseCase(
            subscriptionRepo,
            gateway,
            paymentRepo,
            userRepo
        );

        const registerBillingUseCase = new RegisterBillingMethodUseCase(
            subscriptionRepo,
            gateway,
            processPaymentUseCase
        );

        console.log(`[API] Registering billing for user: ${user.id}, email: ${user.email}`);
        await registerBillingUseCase.execute(authKey, customerKey, user.id, Number(amount), user.email!);
        console.log(`[API] Billing registration successful for user: ${user.id}`);

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Error registering billing method:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
