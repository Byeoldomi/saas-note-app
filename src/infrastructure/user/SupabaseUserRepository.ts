import { createClient } from '@supabase/supabase-js';
import { IUserRepository } from '../../domain/user/user.repository.interface';
import { User } from '../../domain/user/user.entity';

export class SupabaseUserRepository implements IUserRepository {
    private client: ReturnType<typeof createClient>;

    constructor(client: ReturnType<typeof createClient>) {
        this.client = client;
    }

    async findById(id: string): Promise<User | null> {
        const { data, error } = await this.client
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        const userData = data as any; // Bypass type check as inferred type is never

        if (error || !userData) {
            return null;
        }

        return new User(
            userData.id,
            userData.email,
            userData.full_name,
            userData.avatar_url,
            userData.is_pro,
            userData.storage_usage,
            userData.storage_limit,
            new Date(userData.created_at),
            new Date(userData.updated_at)
        );
    }

    async updateTier(userId: string, isPro: boolean): Promise<void> {
        const { error } = await (this.client.from('users') as any)
            .update({
                is_pro: isPro,
                storage_limit: isPro ? 1099511627776 : 10737418240, // 1TB vs 10GB
            })
            .eq('id', userId);

        if (error) {
            throw new Error(`Failed to update user tier: ${error.message}`);
        }
    }
}
