'use client';

import { useEffect, use } from 'react';
import { NoteHeader } from '@/presentation/components/domain/note/NoteHeader';
import { NoteEditorToolbar } from '@/presentation/components/domain/note/NoteEditorToolbar';
import { NoteMetadataSidebar } from '@/presentation/components/domain/note/NoteMetadataSidebar';
import { useNoteViewModel } from '@/presentation/hooks/use-note-view-model';
import { useUser } from '@/presentation/context/UserContext';
import { useRouter } from 'next/navigation';

export default function NotePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const {
        title,
        setTitle,
        content,
        setContent,
        saveNote,
        isSaving,
        lastSaved,
        error
    } = useNoteViewModel(id);
    const { currentUser } = useUser();
    const router = useRouter();

    // Auto-save or Manual Save? For now, let's use the Header or Ctrl+S
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                saveNote();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [saveNote]);

    return (
        <>
            {/* Top Navigation Bar */}
            <NoteHeader
                title={title}
                lastEdited={lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` : 'Unsaved'}
                onShare={() => console.log('Share clicked')}
                onPreview={saveNote} // Temporary: Use Preview button as Save for now if no save button exists
            />

            {/* Error Banner */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mx-8 mt-4 rounded shadow-md relative">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                    {error.includes('upgrade') && (
                        <button
                            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                            onClick={() => router.push('/subscription')}
                        >
                            Upgrade Now
                        </button>
                    )}
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor Canvas */}
                <div className="flex-1 overflow-y-auto bg-white dark:bg-background-dark relative">
                    <div className="max-w-[800px] mx-auto py-12 px-8 min-h-full flex flex-col">
                        {/* Title Input */}
                        <input
                            className="w-full bg-transparent border-none text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 focus:ring-0 p-0 mb-6 leading-tight outline-none"
                            placeholder="Untitled Note"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* Floating Toolbar (Sticky) */}
                        <NoteEditorToolbar />

                        {/* Editor Body */}
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed focus:outline-none">
                            <textarea
                                className="w-full h-auto bg-transparent border-none resize-none focus:ring-0 p-0 text-slate-600 dark:text-slate-300 leading-relaxed min-h-[500px]"
                                placeholder="Start typing your note here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {/* Spacer for bottom scrolling */}
                        <div className="h-32"></div>
                    </div>
                </div>

                {/* Right Sidebar (Metadata) */}
                <NoteMetadataSidebar />
            </div>
        </>
    );
}
