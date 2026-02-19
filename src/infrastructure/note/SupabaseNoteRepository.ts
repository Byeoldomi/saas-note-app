import { createClient } from '../config/supabase';
import { INoteRepository } from '../../domain/note/note.repository.interface';
import { Note } from '../../domain/note/note.entity';

export class SupabaseNoteRepository implements INoteRepository {
    private supabase = createClient();

    async create(note: Note): Promise<Note> {
        const { data, error } = await this.supabase
            .from('notes')
            .insert({
                user_id: note.userId,
                title: note.title,
                content: note.content,
                is_pinned: note.isPinned,
                is_favorite: note.isFavorite,
                in_trash: note.inTrash,
            })
            .select()
            .single();

        if (error) throw new Error(error.message);

        return this.mapToEntity(data);
    }

    async update(note: Note): Promise<Note> {
        const { data, error } = await this.supabase
            .from('notes')
            .update({
                title: note.title,
                content: note.content,
                is_pinned: note.isPinned,
                is_favorite: note.isFavorite,
                in_trash: note.inTrash,
                updated_at: new Date().toISOString(),
            })
            .eq('id', note.id)
            .select()
            .single();

        if (error) throw new Error(error.message);

        return this.mapToEntity(data);
    }

    async findById(id: string): Promise<Note | null> {
        const { data, error } = await this.supabase
            .from('notes')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) return null;

        return this.mapToEntity(data);
    }

    async findAllByUserId(userId: string): Promise<Note[]> {
        const { data, error } = await this.supabase
            .from('notes')
            .select('*')
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        if (error) throw new Error(error.message);

        return data.map(this.mapToEntity);
    }

    async delete(id: string): Promise<void> {
        const { error } = await this.supabase
            .from('notes')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
    }

    private mapToEntity(data: any): Note {
        return new Note(
            data.id,
            data.user_id,
            data.title,
            data.content,
            data.is_pinned,
            data.is_favorite,
            data.in_trash,
            new Date(data.created_at),
            new Date(data.updated_at),
            data.deleted_at ? new Date(data.deleted_at) : null
        );
    }
}
