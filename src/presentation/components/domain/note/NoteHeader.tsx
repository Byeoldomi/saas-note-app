import Link from 'next/link';
import { Button } from '@/presentation/components/ui/Button';
import { NavbarProfile } from '@/presentation/components/layout/NavbarProfile';

interface NoteHeaderProps {
    title: string;
    lastEdited?: string;
    onShare?: () => void;
    onPreview?: () => void;
}

export function NoteHeader({ title, lastEdited = 'Just now', onShare, onPreview }: NoteHeaderProps) {
    return (
        <header className="flex-none h-16 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-8 z-20">
            <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-slate-500 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors">Personal</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors">Projects</span>
                        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                        <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{title}</span>
                    </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase tracking-wider ml-2">Saved</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center text-slate-400 text-sm gap-4 mr-2">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                        Last edited {lastEdited}
                    </span>
                </div>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm" onClick={onPreview} className="font-bold">
                        Preview
                    </Button>
                    <Button
                        size="sm"
                        onClick={onShare}
                        className="font-bold shadow-sm shadow-blue-500/20"
                        leftIcon={<span className="material-symbols-outlined text-[18px]">share</span>}
                    >
                        Share
                    </Button>
                </div>
                <NavbarProfile />
            </div>
        </header>
    );
}
