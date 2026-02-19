import { Payment } from './payment.entity';

export interface IPaymentRepository {
    save(payment: Payment): Promise<void>;
    findByOrderId(orderId: string): Promise<Payment | null>;
    findByUserId(userId: string): Promise<Payment[]>;
}
