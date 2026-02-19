import { INoteRepository } from '../../../domain/note/note.repository.interface';
import { Note } from '../../../domain/note/note.entity';

export class GetNoteUseCase {
    constructor(private noteRepository: INoteRepository) { }

    async execute(id: string, userId: string): Promise<Note | null> {
        const note = await this.noteRepository.findById(id);
        if (!note) return null;
        if (note.userId !== userId) throw new Error('Unauthorized');
        return note;
    }
}
