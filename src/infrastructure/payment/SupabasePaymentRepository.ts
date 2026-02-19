import { SupabaseClient } from '@supabase/supabase-js';
import { IPaymentRepository } from '../../domain/payment/payment.repository.interface';
import { Payment } from '../../domain/payment/payment.entity';

export class SupabasePaymentRepository implements IPaymentRepository {
    constructor(private supabase: SupabaseClient) { }

    async save(payment: Payment): Promise<void> {
        // Prepare data for upsert
        const paymentData = {
            order_id: payment.orderId,
            payment_key: payment.paymentKey,
            amount: payment.amount,
            status: payment.status,
            user_id: payment.userId,
            fail_reason: payment.failReason,
            approved_at: payment.approvedAt,
            updated_at: new Date()
        };

        const { error } = await this.supabase
            .from('payments')
            .upsert(paymentData, { onConflict: 'order_id' });

        if (error) {
            throw new Error(`Failed to save payment: ${error.message}`);
        }
    }

    async findByOrderId(orderId: string): Promise<Payment | null> {
        const { data, error } = await this.supabase
            .from('payments')
            .select('*')
            .eq('order_id', orderId)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null; // Not found
            throw new Error(`Failed to find payment: ${error.message}`);
        }

        return new Payment(
            data.payment_key,
            data.order_id,
            data.amount,
            data.status,
            data.user_id,
            data.fail_reason,
            data.approved_at,
            data.created_at ? new Date(data.created_at) : undefined,
            data.updated_at ? new Date(data.updated_at) : undefined
        );
    }

    async findByUserId(userId: string): Promise<Payment[]> {
        const { data, error } = await this.supabase
            .from('payments')
            .select('*')
            .eq('user_id', userId)
            .order('approved_at', { ascending: false });

        if (error) {
            throw new Error(`Failed to find payments for user: ${error.message}`);
        }

        return data.map((item: any) => new Payment(
            item.payment_key,
            item.order_id,
            item.amount,
            item.status,
            item.user_id,
            item.fail_reason,
            item.approved_at,
            item.created_at ? new Date(item.created_at) : undefined,
            item.updated_at ? new Date(item.updated_at) : undefined
        ));
    }
}
