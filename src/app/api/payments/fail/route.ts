import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/supabase-server';
import { FailPaymentUseCase } from '@/application/use-cases/payment/FailPayment.usecase';
import { SupabasePaymentRepository } from '@/infrastructure/payment/SupabasePaymentRepository';

export async function POST(req: NextRequest) {
    try {
        const { orderId, reason } = await req.json();

        if (!orderId || !reason) {
            return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
        }

        const supabase = await createClient();

        // Ensure user is authenticated, though strictly the failure report could come from callback.
        // But for client-side reporting, auth is good.
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const paymentRepository = new SupabasePaymentRepository(supabase);
        const failPaymentUseCase = new FailPaymentUseCase(paymentRepository);

        await failPaymentUseCase.execute(orderId, reason);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Payment fail error:', error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
