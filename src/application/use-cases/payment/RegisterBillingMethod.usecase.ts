import { ISubscriptionRepository } from '../../../domain/payment/subscription.repository.interface';
import { IPaymentGateway } from '../../../domain/payment/payment.gateway.interface';
import { ProcessScheduledPaymentUseCase } from './ProcessScheduledPayment.usecase';
import { Subscription } from '../../../domain/payment/subscription.entity';
import { randomUUID } from 'crypto';

export class RegisterBillingMethodUseCase {
    constructor(
        private subscriptionRepository: ISubscriptionRepository,
        private paymentGateway: IPaymentGateway,
        private processScheduledPaymentUseCase: ProcessScheduledPaymentUseCase
    ) { }

    async execute(authKey: string, customerKey: string, userId: string, amount: number): Promise<void> {
        // 1. Issue Billing Key
        const { billingKey } = await this.paymentGateway.issueBillingKey(authKey, customerKey);

        // 2. Create Subscription Entity
        // Initial nextPaymentDate is NOW (to trigger immediate first payment)
        // OR we can set it to +30 days IF we process the first payment right here explicitly.
        // Let's set it to NOW, and let executeForSubscription handle it and update it to +30 days.
        const now = new Date();

        const subscription = new Subscription(
            randomUUID(), // Assume global crypto or uuid import. modifying later if needed
            userId,
            billingKey,
            customerKey,
            amount,
            now,
            'ACTIVE',
            now,
            now
        );

        // 3. Save Subscription
        await this.subscriptionRepository.save(subscription);

        // 4. Process First Payment
        await this.processScheduledPaymentUseCase.executeForSubscription(subscription);
    }
}
