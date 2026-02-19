import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/supabase-server';
import { SupabasePaymentRepository } from '@/infrastructure/payment/SupabasePaymentRepository';
import { GetPaymentHistoryUseCase } from '@/application/use-cases/payment/GetPaymentHistory.usecase';

export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            console.error('Unauthorized access to payment history:', error);
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const paymentRepository = new SupabasePaymentRepository(supabase);
        const useCase = new GetPaymentHistoryUseCase(paymentRepository);

        const payments = await useCase.execute(user.id);

        const formattedPayments = payments.map(payment => {
            const dateObj = payment.approvedAt ? new Date(payment.approvedAt) : (payment.createdAt || new Date());
            return {
                id: payment.orderId,
                date: dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                amount: `₩${Number(payment.amount).toLocaleString()}`,
                status: payment.status,
                invoiceUrl: '#' // Placeholder
            };
        });

        return NextResponse.json({ history: formattedPayments });
    } catch (error: any) {
        console.error('Failed to fetch payment history:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
