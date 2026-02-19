export class Subscription {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly userEmail: string,
        public readonly billingKey: string,
        public readonly customerKey: string,
        public readonly amount: number,
        public readonly nextPaymentDate: Date,
        public status: 'ACTIVE' | 'PAUSED' | 'CANCELED' | 'FAILED',
        public readonly createdAt: Date,
        public updatedAt: Date
    ) { }

    cancel(): void {
        this.status = 'CANCELED';
        this.updatedAt = new Date();
    }
}
