import { IPaymentRepository } from '../../../domain/payment/payment.repository.interface';
import { Payment } from '../../../domain/payment/payment.entity';

export class InitializePaymentUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(orderId: string, amount: number, userId: string): Promise<Payment> {
        // Create initial payment record with READY status
        const payment = new Payment(
            null, // paymentKey is not available yet
            orderId,
            amount,
            'READY',
            userId
        );

        await this.paymentRepository.save(payment);
        return payment;
    }
}
