import { IPaymentRepository } from '../../../domain/payment/payment.repository.interface';
import { Payment } from '../../../domain/payment/payment.entity';

export class FailPaymentUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(orderId: string, reason: string): Promise<void> {
        const payment = await this.paymentRepository.findByOrderId(orderId);

        if (!payment) {
            throw new Error(`Payment with orderId ${orderId} not found`);
        }

        // Create updated payment entity with FAILED status
        const updatedPayment = new Payment(
            payment.paymentKey,
            payment.orderId,
            payment.amount,
            'FAILED',
            payment.userId,
            reason,
            payment.approvedAt,
            payment.createdAt,
            new Date() // updatedAt
        );

        await this.paymentRepository.save(updatedPayment);
    }
}
