import { CancelSubscriptionUseCase } from './CancelSubscription.usecase';
import { ISubscriptionRepository } from '../../../domain/payment/subscription.repository.interface';
import { IPaymentGateway } from '../../../domain/payment/payment.gateway.interface';
import { Subscription } from '../../../domain/payment/subscription.entity';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { IUserRepository } from '../../../domain/user/user.repository.interface';

describe('CancelSubscriptionUseCase', () => {
    let useCase: CancelSubscriptionUseCase;
    let mockSubscriptionRepository: ISubscriptionRepository;
    let mockPaymentGateway: IPaymentGateway;
    let mockUserRepository: IUserRepository;

    const mockDate = new Date('2023-10-24T00:00:00Z');

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(mockDate);

        mockSubscriptionRepository = {
            save: vi.fn(),
            findByUserId: vi.fn(),
            findDueSubscriptions: vi.fn(),
        };

        mockPaymentGateway = {
            confirmPayment: vi.fn(),
            issueBillingKey: vi.fn(),
            confirmBilling: vi.fn(),
            removeBillingKey: vi.fn(),
        };

        mockUserRepository = {
            findById: vi.fn(),
            updateTier: vi.fn(),
        };

        useCase = new CancelSubscriptionUseCase(mockSubscriptionRepository, mockPaymentGateway, mockUserRepository);
    });

    it('should cancel active subscription successfully', async () => {
        const userId = 'user-123';
        const subscription = new Subscription(
            'sub-123',
            userId,
            'test@example.com',
            'billing-key-123',
            'customer-key-123',
            10000,
            new Date('2023-11-24'),
            'ACTIVE',
            new Date('2023-10-24'),
            new Date('2023-10-24')
        );

        vi.mocked(mockSubscriptionRepository.findByUserId).mockResolvedValue(subscription);
        vi.mocked(mockPaymentGateway.removeBillingKey).mockResolvedValue();

        await useCase.execute(userId);

        expect(mockPaymentGateway.removeBillingKey).toHaveBeenCalledWith('billing-key-123');
        expect(subscription.status).toBe('CANCELED');
        expect(mockUserRepository.updateTier).toHaveBeenCalledWith(userId, false);
        expect(mockSubscriptionRepository.save).toHaveBeenCalledWith(subscription);
    });

    it('should throw error if no active subscription found', async () => {
        const userId = 'user-123';
        vi.mocked(mockSubscriptionRepository.findByUserId).mockResolvedValue(null);

        await expect(useCase.execute(userId)).rejects.toThrow('No active subscription found');
    });

    it('should proceed with local cancellation even if billing key removal fails', async () => {
        const userId = 'user-123';
        const subscription = new Subscription(
            'sub-123',
            userId,
            'test@example.com',
            'billing-key-123',
            'customer-key-123',
            10000,
            new Date('2023-11-24'),
            'ACTIVE',
            new Date('2023-10-24'),
            new Date('2023-10-24')
        );

        vi.mocked(mockSubscriptionRepository.findByUserId).mockResolvedValue(subscription);
        vi.mocked(mockPaymentGateway.removeBillingKey).mockRejectedValue(new Error('Gateway error'));

        // Should not throw
        await useCase.execute(userId);

        // Should still proceed with local cancellation
        expect(subscription.status).toBe('CANCELED');
        expect(mockUserRepository.updateTier).toHaveBeenCalledWith(userId, false);
        expect(mockSubscriptionRepository.save).toHaveBeenCalledWith(subscription);
    });
});
