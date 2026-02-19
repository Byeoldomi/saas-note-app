interface ToolbarButtonProps {
    icon: string;
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}

function ToolbarButton({ icon, title, isActive, onClick }: ToolbarButtonProps) {
    return (
        <button
            className={`p-2 rounded transition-colors ${isActive ? 'bg-primary text-white shadow-sm' : 'hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-primary'}`}
            title={title}
            onClick={onClick}
        >
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </button>
    );
}

export function NoteEditorToolbar() {
    return (
        <div className="sticky top-0 z-10 py-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-sm mb-6 -mx-2 px-2 border-b border-transparent transition-all duration-300" id="editor-toolbar">
            <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800/50 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center border-r border-slate-200 dark:border-slate-700 pr-1 mr-1">
                    <ToolbarButton icon="format_h1" title="Heading 1" />
                    <ToolbarButton icon="format_h2" title="Heading 2" />
                </div>
                <div className="flex items-center border-r border-slate-200 dark:border-slate-700 pr-1 mr-1">
                    <ToolbarButton icon="format_bold" title="Bold" isActive />
                    <ToolbarButton icon="format_italic" title="Italic" />
                    <ToolbarButton icon="format_underlined" title="Underline" />
                </div>
                <div className="flex items-center border-r border-slate-200 dark:border-slate-700 pr-1 mr-1">
                    <ToolbarButton icon="format_list_bulleted" title="Bullet List" />
                    <ToolbarButton icon="format_list_numbered" title="Numbered List" />
                    <ToolbarButton icon="check_box" title="Checklist" />
                </div>
                <div className="flex items-center pl-1">
                    <ToolbarButton icon="image" title="Insert Image" />
                    <ToolbarButton icon="link" title="Insert Link" />
                </div>
            </div>
        </div>
    );
}
