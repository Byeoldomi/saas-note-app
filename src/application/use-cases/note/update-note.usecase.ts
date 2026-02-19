import { INoteRepository } from '../../../domain/note/note.repository.interface';
import { Note } from '../../../domain/note/note.entity';

export class UpdateNoteUseCase {
    constructor(private noteRepository: INoteRepository) { }

    async execute(id: string, userId: string, title: string, content: string): Promise<Note> {
        const existingNode = await this.noteRepository.findById(id);
        if (!existingNode) throw new Error('Note not found');
        if (existingNode.userId !== userId) throw new Error('Unauthorized');

        const updatedNote = new Note(
            id,
            userId,
            title,
            content,
            existingNode.isPinned,
            existingNode.isFavorite,
            existingNode.inTrash,
            existingNode.createdAt,
            new Date(),
            existingNode.deletedAt
        );

        return this.noteRepository.update(updatedNote);
    }
}
