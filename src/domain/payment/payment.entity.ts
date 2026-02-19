export class Payment {
    constructor(
        public readonly paymentKey: string | null, // paymentKey can be null initially
        public readonly orderId: string,
        public readonly amount: number,
        public readonly status: 'READY' | 'IN_PROGRESS' | 'WAITING_FOR_DEPOSIT' | 'DONE' | 'CANCELED' | 'PARTIAL_CANCELED' | 'ABORTED' | 'EXPIRED' | 'FAILED',
        public readonly userId: string,
        public readonly failReason?: string | null,
        public readonly approvedAt?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) { }
}
