import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/supabase-server';
import { InitializePaymentUseCase } from '@/application/use-cases/payment/InitializePayment.usecase';
import { SupabasePaymentRepository } from '@/infrastructure/payment/SupabasePaymentRepository';

export async function POST(req: NextRequest) {
    try {
        const { orderId, amount } = await req.json();

        if (!orderId || !amount) {
            return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const paymentRepository = new SupabasePaymentRepository(supabase);
        const initializePaymentUseCase = new InitializePaymentUseCase(paymentRepository);

        const payment = await initializePaymentUseCase.execute(orderId, Number(amount), user.id);

        return NextResponse.json(payment);
    } catch (error: any) {
        console.error('Payment initialization error:', error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
