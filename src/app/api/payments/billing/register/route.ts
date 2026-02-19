import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { TossPaymentGateway } from '../../../../../infrastructure/payment/TossPaymentGateway';
import { SupabaseSubscriptionRepository } from '../../../../../infrastructure/payment/SupabaseSubscriptionRepository';
import { SupabasePaymentRepository } from '../../../../../infrastructure/payment/SupabasePaymentRepository';
import { ProcessScheduledPaymentUseCase } from '../../../../../application/use-cases/payment/ProcessScheduledPayment.usecase';
import { RegisterBillingMethodUseCase } from '../../../../../application/use-cases/payment/RegisterBillingMethod.usecase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { authKey, customerKey, amount } = body;

        if (!authKey || !customerKey || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const cookieStore = await cookies();

        // Check for Test User
        const isTestUser = cookieStore.get('is-test-user')?.value;

        if (isTestUser) {
            console.log(`[Mock] Processing billing registration for test user: ${isTestUser}`);
            // Simulate 1s delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return NextResponse.json({ success: true, mock: true });
        }

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
                        } catch {
                            // The `setAll` method was called from a Server Component.
                            // This can be ignored if you have middleware refreshing
                            // user sessions.
                        }
                    },
                },
            }
        );

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Initialize dependencies
        const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY!;
        const gateway = new TossPaymentGateway(secretKey);

        // Use service role client for repository operations if regular client has RLS issues with some tables?
        // But here we are inserting subscription for self, so RLS should be fine with user context.
        // However, if we need to do admin stuff, we might need service role.
        // For now, let's use the authenticated client.
        const subscriptionRepo = new SupabaseSubscriptionRepository(supabase);
        const paymentRepo = new SupabasePaymentRepository(supabase);

        const processPaymentUseCase = new ProcessScheduledPaymentUseCase(
            subscriptionRepo,
            gateway,
            paymentRepo
        );

        const registerBillingUseCase = new RegisterBillingMethodUseCase(
            subscriptionRepo,
            gateway,
            processPaymentUseCase
        );

        await registerBillingUseCase.execute(authKey, customerKey, user.id, Number(amount));

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Error registering billing method:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
