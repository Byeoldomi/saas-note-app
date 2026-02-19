import { Payment } from './payment.entity';

export interface IPaymentGateway {
    confirmPayment(paymentKey: string, orderId: string, amount: number): Promise<Payment>;
    issueBillingKey(authKey: string, customerKey: string): Promise<{ billingKey: string }>;
    confirmBilling(billingKey: string, amount: number, orderId: string, orderName: string, customerEmail: string): Promise<Payment>;
}
