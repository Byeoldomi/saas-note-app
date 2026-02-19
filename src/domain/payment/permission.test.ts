import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SupabaseNoteRepository } from '../../infrastructure/note/SupabaseNoteRepository';
import { CreateNoteUseCase } from '../../application/use-cases/note/create-note.usecase';
import { ProcessPaymentSuccessUseCase } from '../../application/use-cases/payment/ProcessPaymentSuccess.usecase';
import { IPaymentRepository } from '../../domain/payment/payment.repository.interface';
import { IUserRepository } from '../../domain/user/user.repository.interface';
import { Payment } from './payment.entity';

// Mock Supabase client
// Mock Supabase client
const mockSingle = vi.fn();
const mockInsert = vi.fn();
const mockSelect = vi.fn();
const mockUpdate = vi.fn();
const mockFrom = vi.fn(() => ({
    insert: mockInsert.mockReturnThis(),
    select: mockSelect.mockReturnThis(),
    update: mockUpdate.mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: mockSingle,
}));

vi.mock('../../infrastructure/config/supabase', () => ({
    createClient: () => ({
        from: mockFrom
    })
}));

describe('Permission and Payment Flow Verification', () => {
    let noteRepository: SupabaseNoteRepository;
    let createNoteUseCase: CreateNoteUseCase;
    let processPaymentUseCase: ProcessPaymentSuccessUseCase;
    let mockPaymentRepo: IPaymentRepository;
    let mockPaymentGateway: any;
    let mockUserRepo: IUserRepository;

    beforeEach(() => {
        noteRepository = new SupabaseNoteRepository();
        createNoteUseCase = new CreateNoteUseCase(noteRepository);

        mockPaymentRepo = {
            save: vi.fn(),
            findByOrderId: vi.fn(),
        } as any;

        mockPaymentGateway = {
            confirmPayment: vi.fn(),
        };

        mockUserRepo = {
            findById: vi.fn(),
            updateTier: vi.fn(),
        } as any;

        processPaymentUseCase = new ProcessPaymentSuccessUseCase(mockPaymentRepo, mockPaymentGateway, mockUserRepo);

        vi.clearAllMocks();
    });

    it('should upgrade user tier after successful payment', async () => {
        const userId = 'user_free';
        const paymentKey = 'pk_123';
        const orderId = 'oid_123';
        const amount = 10000;

        // Mock payment confirmation success
        const mockPayment = new Payment(
            paymentKey,
            orderId,
            amount,
            'DONE',
            new Date().toISOString()
        );
        (mockPaymentGateway.confirmPayment as any).mockResolvedValue(mockPayment);

        await processPaymentUseCase.execute(paymentKey, orderId, amount, userId);

        expect(mockPaymentGateway.confirmPayment).toHaveBeenCalledWith(paymentKey, orderId, amount);
        expect(mockUserRepo.updateTier).toHaveBeenCalledWith(userId, true);
    });

    it('should allow creating a note', async () => {
        const userId = 'user_free';
        const title = 'Test Note';
        const content = 'Content';

        // Mock successful DB response
        const mockNoteData = {
            id: 'note_1',
            user_id: userId,
            title,
            content,
            is_pinned: false,
            is_favorite: false,
            in_trash: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null
        };

        mockSingle.mockResolvedValueOnce({ data: mockNoteData, error: null });

        const note = await createNoteUseCase.execute(userId, title, content);

        expect(note).toBeDefined();
        expect(note.title).toBe(title);
        expect(mockFrom).toHaveBeenCalledWith('notes');
        expect(mockInsert).toHaveBeenCalled();
    });

    it('should throw error if RLS policy violates', async () => {
        const userId = 'user_free_limit_reached';

        // Mock error response simulating RLS violation
        mockSingle.mockResolvedValueOnce({
            data: null,
            error: { message: 'new row violates row-level security policy for table "notes"' }
        });

        await expect(createNoteUseCase.execute(userId, 'Fail Note', 'Content'))
            .rejects.toThrow('new row violates row-level security policy');
    });
});
