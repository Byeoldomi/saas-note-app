import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/supabase-server';
import { SupabaseSubscriptionRepository } from '@/infrastructure/payment/SupabaseSubscriptionRepository';
import { TossPaymentGateway } from '@/infrastructure/payment/TossPaymentGateway';
import { SupabaseUserRepository } from '@/infrastructure/user/SupabaseUserRepository';
import { CancelSubscriptionUseCase } from '@/application/use-cases/payment/CancelSubscription.usecase';

import { createClient as createAdminClient } from '@supabase/supabase-js';

const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY!;

export async function POST(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Initialize Admin Client to bypass RLS and triggers for internal tier/subscription updates
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
        const supabaseAdmin = createAdminClient(url, serviceKey, {
            auth: { persistSession: false }
        });

        const subscriptionRepository = new SupabaseSubscriptionRepository(supabaseAdmin as any);
        const paymentGateway = new TossPaymentGateway(secretKey);
        const userRepository = new SupabaseUserRepository(supabaseAdmin as any);
        const useCase = new CancelSubscriptionUseCase(subscriptionRepository, paymentGateway, userRepository);

        await useCase.execute(user.id);

        return NextResponse.json({ message: 'Subscription canceled successfully' });
    } catch (error: any) {
        console.error('Failed to cancel subscription:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
