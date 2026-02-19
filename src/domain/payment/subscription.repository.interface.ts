import { Subscription } from './subscription.entity';

export interface ISubscriptionRepository {
    save(subscription: Subscription): Promise<void>;
    findByUserId(userId: string): Promise<Subscription | null>;
    findDueSubscriptions(now: Date): Promise<Subscription[]>;
}
