import { IPaymentRepository } from '../../../domain/payment/payment.repository.interface';
import { Payment } from '../../../domain/payment/payment.entity';

export class GetPaymentHistoryUseCase {
    constructor(private paymentRepository: IPaymentRepository) { }

    async execute(userId: string): Promise<Payment[]> {
        return this.paymentRepository.findByUserId(userId);
    }
}
