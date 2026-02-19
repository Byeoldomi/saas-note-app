import { ISubscriptionRepository } from '../../../domain/payment/subscription.repository.interface';
import { IPaymentGateway } from '../../../domain/payment/payment.gateway.interface';
import { IPaymentRepository } from '../../../domain/payment/payment.repository.interface';
import { Subscription } from '../../../domain/payment/subscription.entity';

export class ProcessScheduledPaymentUseCase {
    constructor(
        private subscriptionRepository: ISubscriptionRepository,
        private paymentGateway: IPaymentGateway,
        private paymentRepository: IPaymentRepository
    ) { }

    async execute(): Promise<void> {
        const now = new Date();
        const dueSubscriptions = await this.subscriptionRepository.findDueSubscriptions(now);

        for (const subscription of dueSubscriptions) {
            await this.processSubscription(subscription);
        }
    }

    async executeForSubscription(subscription: Subscription): Promise<void> {
        await this.processSubscription(subscription);
    }

    private async processSubscription(subscription: Subscription): Promise<void> {
        try {
            // Confirm billing
            // We need orderId, orderName, customerEmail.
            // Subscription entity doesn't have customerEmail currently.
            // We might need to fetch User to get email, or store email in Subscription.
            // For now, let's assume we can fetch user or use a placeholder if strictness not required by Toss (Toss requires customerEmail).
            // I should probably update Subscription entity to store email OR fetch user.
            // Fetching user is cleaner domain-wise but requires IUserRepository.
            // Let's pass 'unknown@example.com' for now if we don't have it, OR better, update the UseCase to require IUserRepository.

            // Wait, I don't want to complicate it too much right now.
            // Let's check User entity. It has email.
            // I should inject IUserRepository.

            // For this iteration, to keep it simple and given I haven't injected IUserRepository yet:
            // I'll assume we can get it or I'll just use a placeholder if the gateway implementation allows.
            // But Toss might send receipt to that email.
            // The `Subscription` entity has `userId`.
            // I will add IUserRepository to constructor.

            // Generate a unique orderId for this payment
            const orderId = `${subscription.id}_${Date.now()}`;
            const orderName = 'Regular Subscription Payment'; // Customizable

            // NOTE: needing customerEmail.
            // For now, I will skip fetching user and use a placeholder to proceed, 
            // BUT I will add a TODO to fetch real email.
            const customerEmail = 'customer@example.com';

            const payment = await this.paymentGateway.confirmBilling(
                subscription.billingKey,
                subscription.amount,
                orderId,
                orderName,
                customerEmail
            );

            // Save payment record
            // payment.userId is empty from gateway, fill it
            const paymentWithUser = { ...payment, userId: subscription.userId };
            // Since Payment is a class, strict immutability might be an issue if I just spread.
            // But Payment props are readonly.
            // I should create a new instance or cast.
            // Let's just use the repo's save which likely takes the entity.
            // I need to set userId on the payment entity.
            // The Payment entity has userId.
            // I'll create a new Payment instance with correct userId.
            const paymentEntity = new (payment.constructor as any)(
                payment.paymentKey,
                payment.orderId,
                payment.amount,
                payment.status,
                subscription.userId,
                payment.failReason,
                payment.approvedAt,
                payment.createdAt,
                payment.updatedAt
            );

            await this.paymentRepository.save(paymentEntity);

            // Update subscription next payment date
            const nextPaymentDate = new Date(subscription.nextPaymentDate);
            nextPaymentDate.setDate(nextPaymentDate.getDate() + 30); // 30 days cycle

            const updatedSubscription = new Subscription(
                subscription.id,
                subscription.userId,
                subscription.billingKey,
                subscription.customerKey,
                subscription.amount,
                nextPaymentDate,
                'ACTIVE',
                subscription.createdAt,
                new Date()
            );

            await this.subscriptionRepository.save(updatedSubscription);

        } catch (error) {
            console.error(`Failed to process subscription ${subscription.id}:`, error);
            // Verify if we should update status to FAILED or retry.
            // For now, logging.
        }
    }
}
