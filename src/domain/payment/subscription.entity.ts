export class Subscription {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly billingKey: string,
        public readonly customerKey: string,
        public readonly amount: number,
        public readonly nextPaymentDate: Date,
        public readonly status: 'ACTIVE' | 'PAUSED' | 'CANCELED' | 'FAILED',
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ) { }
}
