import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { endOfDay, startOfDay, addMonths } from 'date-fns';
import { ISubscriptionRepository } from '../../../domain/payment/subscription.repository.interface';
import { IPaymentGateway } from '../../../domain/payment/payment.gateway.interface';
import { IPaymentRepository } from '../../../domain/payment/payment.repository.interface';
import { IUserRepository } from '../../../domain/user/user.repository.interface';
import { Payment } from '../../../domain/payment/payment.entity';
import { Subscription } from '../../../domain/payment/subscription.entity';

const TIMEZONE = 'Asia/Seoul';

export class ProcessScheduledPaymentUseCase {
    constructor(
        private subscriptionRepository: ISubscriptionRepository,
        private paymentGateway: IPaymentGateway,
        private paymentRepository: IPaymentRepository,
        private userRepository: IUserRepository
    ) { }

    async execute(date?: Date): Promise<void> {
        const now = date ? new Date(date) : new Date();

        // Calculate End of Day in KST
        const kstNow = toZonedTime(now, TIMEZONE);
        const kstEndOfDay = endOfDay(kstNow);
        const utcEndOfDay = fromZonedTime(kstEndOfDay, TIMEZONE);

        const dueSubscriptions = await this.subscriptionRepository.findDueSubscriptions(utcEndOfDay);

        for (const subscription of dueSubscriptions) {
            await this.processSubscription(subscription, subscription.userEmail);
        }
    }

    async executeForSubscription(subscription: Subscription, email: string): Promise<void> {
        await this.processSubscription(subscription, email);
    }

    private async processSubscription(subscription: Subscription, email: string): Promise<void> {
        const orderId = `sub_${subscription.id}_${Date.now()}`;

        try {
            const orderName = 'Regular Subscription Payment';

            const payment = await this.paymentGateway.confirmBilling(
                subscription.billingKey,
                subscription.amount,
                orderId,
                orderName,
                email,
                subscription.customerKey
            );

            await this.paymentRepository.save(payment);

            // Update subscription next payment date (KST + 1 Month)
            const nextPaymentDate = new Date(subscription.nextPaymentDate);
            const kstNextPaymentDate = toZonedTime(nextPaymentDate, TIMEZONE);
            const kstNextMonth = addMonths(kstNextPaymentDate, 1);
            const kstStartOfNextMonth = startOfDay(kstNextMonth);
            const utcNextPaymentDate = fromZonedTime(kstStartOfNextMonth, TIMEZONE);

            const updatedSubscription = new Subscription(
                subscription.id,
                subscription.userId,
                subscription.userEmail,
                subscription.billingKey,
                subscription.customerKey,
                subscription.amount,
                nextPaymentDate,
                'ACTIVE',
                subscription.createdAt,
                new Date()
            );

            await this.subscriptionRepository.save(updatedSubscription);

            // Update user tier
            await this.userRepository.updateTier(subscription.userId, true);

        } catch (error) {
            console.error(`Failed to process subscription ${subscription.id}:`, error);
            throw error; // Re-throw to inform the caller (API route)
        }
    }
}
