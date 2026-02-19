import { IPaymentRepository } from '../../../domain/payment/payment.repository.interface';
import { IPaymentGateway } from '../../../domain/payment/payment.gateway.interface';
import { IUserRepository } from '../../../domain/user/user.repository.interface';
import { Payment } from '../../../domain/payment/payment.entity';

export class ProcessPaymentSuccessUseCase {
    constructor(
        private paymentRepository: IPaymentRepository,
        private paymentGateway: IPaymentGateway,
        private userRepository: IUserRepository
    ) { }

    async execute(paymentKey: string, orderId: string, amount: number, userId: string): Promise<Payment> {
        // 1. Confirm payment with PG provider
        const confirmedPaymentData = await this.paymentGateway.confirmPayment(paymentKey, orderId, amount);

        // 2. Find existing payment record (created via InitializePayment)
        const existingPayment = await this.paymentRepository.findByOrderId(orderId);

        // 3. Update payment record with confirmed details
        const updatedPayment = new Payment(
            confirmedPaymentData.paymentKey,
            confirmedPaymentData.orderId,
            confirmedPaymentData.amount,
            confirmedPaymentData.status,
            existingPayment?.userId || userId,
            null, // failReason
            confirmedPaymentData.approvedAt,
            existingPayment?.createdAt,
            new Date() // updatedAt
        );

        await this.paymentRepository.save(updatedPayment);

        // 4. If payment is successful, upgrade user to PRO
        if (updatedPayment.status === 'DONE') {
            await this.userRepository.updateTier(updatedPayment.userId, true);
        }

        return updatedPayment;
    }
}
