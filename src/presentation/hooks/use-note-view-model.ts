import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/presentation/context/UserContext';
import { SupabaseNoteRepository } from '@/infrastructure/note/SupabaseNoteRepository';
import { CreateNoteUseCase } from '@/application/use-cases/note/create-note.usecase';
import { UpdateNoteUseCase } from '@/application/use-cases/note/update-note.usecase';
import { GetNoteUseCase } from '@/application/use-cases/note/get-note.usecase';

export function useNoteViewModel(noteId: string) {
    const { currentUser } = useUser();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);

    const repository = new SupabaseNoteRepository();

    useEffect(() => {
        if (!currentUser || !noteId || noteId === 'new') return;

        const loadNote = async () => {
            try {
                const useCase = new GetNoteUseCase(repository);
                const note = await useCase.execute(noteId, currentUser.id);
                if (note) {
                    setTitle(note.title);
                    setContent(note.content);
                    setLastSaved(note.updatedAt);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load note');
            }
        };

        loadNote();
    }, [noteId, currentUser]);

    const saveNote = async () => {
        if (!currentUser) return;
        setIsSaving(true);
        setError(null);

        try {
            if (noteId === 'new') {
                const useCase = new CreateNoteUseCase(repository);
                const newNote = await useCase.execute(currentUser.id, title, content);
                router.replace(`/note/${newNote.id}`);
                setLastSaved(new Date());
            } else {
                const useCase = new UpdateNoteUseCase(repository);
                await useCase.execute(noteId, currentUser.id, title, content);
                setLastSaved(new Date());
            }
        } catch (err: any) {
            console.error(err);
            if (err.message && err.message.includes('policy')) {
                setError('일일 노트 생성 한도를 초과했습니다. Pro 플랜으로 업그레이드하세요.');
            } else {
                setError('Failed to save note: ' + err.message);
            }
        } finally {
            setIsSaving(false);
        }
    };

    // Debounced save could be added here, but simple manual/auto save logic for now

    return {
        title,
        setTitle,
        content,
        setContent,
        saveNote,
        isSaving,
        lastSaved,
        error
    };
}
