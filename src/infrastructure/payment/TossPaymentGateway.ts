import { IPaymentGateway } from '../../domain/payment/payment.gateway.interface';
import { Payment } from '../../domain/payment/payment.entity';

export class TossPaymentGateway implements IPaymentGateway {
    private readonly secretKey: string;
    private readonly baseUrl = 'https://api.tosspayments.com/v1/payments';

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    async removeBillingKey(billingKey: string): Promise<void> {
        const encryptedSecretKey = Buffer.from(`${this.secretKey}:`).toString('base64');

        const response = await fetch(`https://api.tosspayments.com/v1/billing/authorizations/${billingKey}/expire`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encryptedSecretKey}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            // If already expired or deleted, we ignore the error
            if (errorData.code === 'ALREADY_EXPIRED_BILLING_KEY' || errorData.code === 'NOT_FOUND_BILLING_KEY') {
                return;
            }
            throw new Error(`Failed to expire billing key: ${errorData.message || response.statusText}`);
        }
    }

    async confirmPayment(paymentKey: string, orderId: string, amount: number): Promise<Payment> {
        const encryptedSecretKey = Buffer.from(`${this.secretKey}:`).toString('base64');

        const response = await fetch(`${this.baseUrl}/confirm`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encryptedSecretKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentKey,
                orderId,
                amount,
            }),
        });

        if (!response.ok) {
            // TODO: Handle specific error codes
            const errorData = await response.json();
            throw new Error(`Payment confirmation failed: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();

        // Map response to domain entity
        return this.mapToPayment(data);
    }

    async issueBillingKey(authKey: string, customerKey: string): Promise<{ billingKey: string }> {
        const encryptedSecretKey = Buffer.from(`${this.secretKey}:`).toString('base64');

        const response = await fetch(`https://api.tosspayments.com/v1/billing/authorizations/issue`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encryptedSecretKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                authKey,
                customerKey,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Billing key issuance failed: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return { billingKey: data.billingKey };
    }

    async confirmBilling(billingKey: string, amount: number, orderId: string, orderName: string, customerEmail: string, customerKey: string): Promise<Payment> {
        const encryptedSecretKey = Buffer.from(`${this.secretKey}:`).toString('base64');

        const response = await fetch(`https://api.tosspayments.com/v1/billing/${billingKey}`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${encryptedSecretKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                orderId,
                orderName,
                customerEmail,
                customerKey,
            }),
        });

        // Note: customerKey in confirmBilling is required but not strictly validated against the one used for billing key issuance in all cases, 
        // however valid usage requires a unique customerKey. 
        // In this implementation, I am generating a customerKey if not provided, but ideally it should be consistent.
        // The interface I defined in step 54 supports customerEmail but not customerKey explicitly passed to confirmBilling.
        // Wait, the interface I defined in step 54: confirmBilling(billingKey: string, amount: number, orderId: string, orderName: string, customerEmail: string): Promise<Payment>;
        // Toss API requires customerKey. I should probably add customerKey to the interface or derive it.
        // For now I will blindly use a derived one or I might need to update the interface to accept customerKey.
        // Let's look at previous tool output for interface... 
        // "confirmBilling(billingKey: string, amount: number, orderId: string, orderName: string, customerEmail: string): Promise<Payment>;"
        // I should probably inject customerKey.

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Billing confirmation failed: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return this.mapToPayment(data);
    }

    private mapToPayment(data: any): Payment {
        return new Payment(
            data.paymentKey,
            data.orderId,
            data.totalAmount,
            data.status,
            '', // userId not available from Toss response, will be handled by UseCase
            null, // failReason
            data.approvedAt,
            new Date(data.requestedAt), // createdAt
            new Date(data.approvedAt) // updatedAt
        );
    }
}
