import { SupabaseClient } from '@supabase/supabase-js';
import { ISubscriptionRepository } from '../../domain/payment/subscription.repository.interface';
import { Subscription } from '../../domain/payment/subscription.entity';

export class SupabaseSubscriptionRepository implements ISubscriptionRepository {
    constructor(private supabase: SupabaseClient) { }

    async save(subscription: Subscription): Promise<void> {
        const data = {
            id: subscription.id,
            user_id: subscription.userId,
            billing_key: subscription.billingKey,
            customer_key: subscription.customerKey,
            amount: subscription.amount,
            next_payment_date: subscription.nextPaymentDate,
            status: subscription.status,
            created_at: subscription.createdAt,
            updated_at: subscription.updatedAt
        };

        const { error } = await this.supabase
            .from('subscriptions')
            .upsert(data);

        if (error) {
            throw new Error(`Failed to save subscription: ${error.message}`);
        }
    }

    async findByUserId(userId: string): Promise<Subscription | null> {
        const { data, error } = await this.supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'ACTIVE')
            .single();

        if (error) {
            if (error.code === 'PGRST116') return null;
            throw new Error(`Failed to find subscription: ${error.message}`);
        }

        return this.mapToEntity(data);
    }

    async findDueSubscriptions(now: Date): Promise<Subscription[]> {
        const { data, error } = await this.supabase
            .from('subscriptions')
            .select('*')
            .eq('status', 'ACTIVE')
            .lte('next_payment_date', now.toISOString());

        if (error) {
            throw new Error(`Failed to find due subscriptions: ${error.message}`);
        }

        return data.map(this.mapToEntity);
    }

    private mapToEntity(data: any): Subscription {
        return new Subscription(
            data.id,
            data.user_id,
            data.billing_key,
            data.customer_key,
            Number(data.amount),
            new Date(data.next_payment_date),
            data.status,
            new Date(data.created_at),
            new Date(data.updated_at)
        );
    }
}
