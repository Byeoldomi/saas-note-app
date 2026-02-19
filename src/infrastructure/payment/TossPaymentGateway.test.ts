import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TossPaymentGateway } from './TossPaymentGateway';
import { Payment } from '../../domain/payment/payment.entity';

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('TossPaymentGateway', () => {
    let gateway: TossPaymentGateway;
    const secretKey = 'test_sk_secret_key';

    beforeEach(() => {
        gateway = new TossPaymentGateway(secretKey);
        mockFetch.mockReset();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should call Toss Payments API correctly and return Payment entity', async () => {
        // Arrange
        const paymentKey = 'test_payment_key';
        const orderId = 'test_order_id';
        const amount = 50000;

        const mockResponseData = {
            paymentKey,
            orderId,
            totalAmount: amount,
            status: 'DONE',
            approvedAt: '2023-01-01T00:00:00',
        };

        mockFetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponseData,
        });

        // Act
        const result = await gateway.confirmPayment(paymentKey, orderId, amount);

        // Assert
        const expectedAuthHeader = `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`;

        expect(mockFetch).toHaveBeenCalledWith(
            'https://api.tosspayments.com/v1/payments/confirm',
            {
                method: 'POST',
                headers: {
                    Authorization: expectedAuthHeader,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentKey,
                    orderId,
                    amount,
                }),
            }
        );

        expect(result).toBeInstanceOf(Payment);
        expect(result.paymentKey).toBe(paymentKey);
        expect(result.amount).toBe(amount);
    });

    it('should throw error if API call fails', async () => {
        // Arrange
        const paymentKey = 'test_payment_key';
        const orderId = 'test_order_id';
        const amount = 50000;

        mockFetch.mockResolvedValue({
            ok: false,
            statusText: 'Bad Request',
            json: async () => ({ message: 'Invalid payment key' }),
        });

        // Act & Assert
        await expect(gateway.confirmPayment(paymentKey, orderId, amount)).rejects.toThrow('Payment confirmation failed: Invalid payment key');
    });
});
