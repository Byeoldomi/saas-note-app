export class Note {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly title: string,
        public readonly content: string,
        public readonly isPinned: boolean,
        public readonly isFavorite: boolean,
        public readonly inTrash: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date | null,
    ) { }
}
