export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly avatarUrl: string | null,
        public readonly isPro: boolean,
        public readonly storageUsage: number,
        public readonly storageLimit: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }

    get tier(): 'FREE' | 'PRO' | 'ENTERPRISE' {
        // Simple mapping for now, can be expanded if DB has specific tier column
        if (this.storageLimit > 107374182400) return 'ENTERPRISE'; // > 100GB
        return this.isPro ? 'PRO' : 'FREE';
    }
}
