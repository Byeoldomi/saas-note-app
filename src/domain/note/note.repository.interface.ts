import { Note } from './note.entity';

export interface INoteRepository {
    create(note: Note): Promise<Note>;
    update(note: Note): Promise<Note>;
    findById(id: string): Promise<Note | null>;
    findAllByUserId(userId: string): Promise<Note[]>;
    delete(id: string): Promise<void>;
}
