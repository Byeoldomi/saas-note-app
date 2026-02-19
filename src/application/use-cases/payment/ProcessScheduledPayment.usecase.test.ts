import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProcessScheduledPaymentUseCase } from './ProcessScheduledPayment.usecase';
import { ISubscriptionRepository } from '../../../domain/payment/subscription.repository.interface';
import { IPaymentGateway } from '../../../domain/payment/payment.gateway.interface';
import { IPaymentRepository } from '../../../domain/payment/payment.repository.interface';
import { IUserRepository } from '../../../domain/user/user.repository.interface';
import { Subscription } from '../../../domain/payment/subscription.entity';
import { Payment } from '../../../domain/payment/payment.entity';

describe('ProcessScheduledPaymentUseCase', () => {
    let useCase: ProcessScheduledPaymentUseCase;
    let mockSubscriptionRepository: ISubscriptionRepository;
    let mockPaymentGateway: IPaymentGateway;
    let mockPaymentRepository: IPaymentRepository;
    let mockUserRepository: IUserRepository;

    beforeEach(() => {
        mockSubscriptionRepository = {
            save: vi.fn(),
            findByUserId: vi.fn(),
            findDueSubscriptions: vi.fn(),
        } as unknown as ISubscriptionRepository;

        mockPaymentGateway = {
            confirmPayment: vi.fn(),
            issueBillingKey: vi.fn(),
            confirmBilling: vi.fn(),
        } as unknown as IPaymentGateway;

        mockPaymentRepository = {
            save: vi.fn(),
            findByOrderId: vi.fn(),
            findAll: vi.fn(),
        } as unknown as IPaymentRepository;

        mockUserRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findByEmail: vi.fn(),
            updateTier: vi.fn(),
        } as unknown as IUserRepository;

        useCase = new ProcessScheduledPaymentUseCase(
            mockSubscriptionRepository,
            mockPaymentGateway,
            mockPaymentRepository,
            mockUserRepository
        );
    });

    it('should process subscriptions due later today (KST) even if run earlier', async () => {
        // Given
        // KST is UTC+9.
        // If we run at 2024-01-01 10:00:00 KST, it is 2024-01-01 01:00:00 UTC.
        // "End of Today" in KST is 2024-01-01 23:59:59.999 KST -> 2024-01-01 14:59:59.999 UTC.

        const currentKST = new Date('2024-01-01T01:00:00Z'); // 10:00 KST

        // Subscription due at 23:00 KST (14:00 UTC) -> Should be processed
        const dueLaterTodayKST = new Date('2024-01-01T14:00:00Z');

        const subscription = new Subscription(
            'sub_kst_1',
            'user_kst_1',
            'test@example.com',
            'billing_key_1',
            'customer_key_1',
            1000,
            dueLaterTodayKST,
            'ACTIVE',
            new Date(),
            new Date()
        );

        (mockSubscriptionRepository.findDueSubscriptions as any).mockImplementation((queryDate: Date) => {
            // queryDate should be close to 2024-01-01 14:59:59 UTC
            // We check if the due date is before or equal to the query date
            if (dueLaterTodayKST <= queryDate) {
                return Promise.resolve([subscription]);
            }
            return Promise.resolve([]);
        });

        const mockPayment = new Payment(
            'payment_key_1',
            'order_id_1',
            1000,
            'DONE',
            'user_kst_1',
            null,
            new Date(),
            new Date(),
            new Date()
        );

        (mockPaymentGateway.confirmBilling as any).mockResolvedValue(mockPayment);

        // When
        await useCase.execute(currentKST);

        // Then
        // Check if queryDate passed to repository was correct (End of KST Today in UTC)
        const queryDate = (mockSubscriptionRepository.findDueSubscriptions as any).mock.calls[0][0] as Date;
        // Expected: 2024-01-01T14:59:59.999Z
        expect(queryDate.getUTCHours()).toBe(14);
        expect(queryDate.getUTCMinutes()).toBe(59);
        expect(queryDate.getUTCSeconds()).toBe(59);

        expect(mockPaymentGateway.confirmBilling).toHaveBeenCalledTimes(1);
    });

    it('should set next payment date to exactly one month later at 00:00:00 KST', async () => {
        // Given
        // Current Payment Date: 2024-01-15 00:00:00 KST -> 2024-01-14 15:00:00 UTC
        const currentPaymentDateKST = new Date('2024-01-14T15:00:00Z');

        const subscription = new Subscription(
            'sub_kst_2',
            'user_kst_2',
            'test@example.com',
            'billing_key_2',
            'customer_key_2',
            1000,
            currentPaymentDateKST,
            'ACTIVE',
            new Date(),
            new Date()
        );

        (mockSubscriptionRepository.findDueSubscriptions as any).mockResolvedValue([subscription]);
        const mockPayment = new Payment(
            'pk_2', 'ord_2', 1000, 'DONE', 'user_kst_2', null, new Date(), new Date(), new Date()
        );
        (mockPaymentGateway.confirmBilling as any).mockResolvedValue(mockPayment);

        // When
        await useCase.execute(currentPaymentDateKST);

        // Then
        const savedSubscription = (mockSubscriptionRepository.save as any).mock.calls[0][0];

        // Next Payment Date Goal: 2024-02-15 00:00:00 KST
        // In UTC: 2024-02-14 15:00:00 UTC

        const nextDate = savedSubscription.nextPaymentDate;
        expect(nextDate.toISOString()).toBe('2024-02-14T15:00:00.000Z');
    });
});
