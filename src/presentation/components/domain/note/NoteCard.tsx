import { cn } from "@/shared/utils/cn";
import { Avatar } from "@/presentation/components/ui/Avatar";

interface NoteCardProps {
    title: string;
    content: React.ReactNode;
    date: string;
    tags?: { label: string; color?: string }[];
    image?: string;
    pinned?: boolean;
    variant?: "default" | "idea" | "pinned";
    category?: { label: string; color: string; bgColor: string };
    users?: { src?: string; alt?: string }[];
    className?: string;
    onClick?: () => void;
}

export function NoteCard({
    title,
    content,
    date,
    tags,
    image,
    pinned,
    variant = "default",
    category,
    users,
    className,
    onClick,
}: NoteCardProps) {
    const variants = {
        default:
            "bg-white dark:bg-[#151c2b] border-slate-200 dark:border-slate-800",
        idea: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-[#151c2b] dark:to-[#1a1815] border-orange-100 dark:border-orange-900/30",
        pinned: "bg-white dark:bg-[#151c2b] border-2 border-primary/20",
    };

    return (
        <div
            className={cn(
                "group rounded-xl border p-5 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-[280px] relative overflow-hidden cursor-pointer",
                variants[variant],
                className
            )}
            onClick={onClick}
        >
            {pinned && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 flex items-center justify-center rounded-bl-xl text-primary">
                    <span className="material-icons-outlined text-sm">push_pin</span>
                </div>
            )}

            <div className="flex justify-between items-start mb-3">
                {category && (
                    <span
                        className={cn(
                            "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                            category.bgColor,
                            category.color
                        )}
                    >
                        {category.label}
                    </span>
                )}
                {variant === 'idea' && (
                    <span className="material-icons-outlined text-orange-400 text-sm transform rotate-12">lightbulb</span>
                )}
                {!pinned && variant !== 'idea' && (
                    <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-primary transition-opacity">
                        <span className="material-icons-outlined text-lg">more_horiz</span>
                    </button>
                )}
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                {title}
            </h3>

            <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1 overflow-hidden">
                {content}
            </div>

            {image && (
                <div className="h-24 w-full rounded-lg bg-slate-100 dark:bg-slate-800 mb-4 overflow-hidden relative">
                    <img
                        alt="Note attachment"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        src={image}
                    />
                </div>
            )}

            {tags && tags.length > 0 && (
                <div className="flex items-center gap-2 mb-auto">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full border border-slate-200 dark:border-slate-700">
                            #{tag.label}
                        </span>
                    ))}
                </div>
            )}

            <div className={cn("flex items-center justify-between pt-3 border-t mt-auto", variant === 'idea' ? 'border-orange-100 dark:border-slate-800' : 'border-slate-100 dark:border-slate-800')}>
                <span className="text-xs text-slate-400">{date}</span>
                {users && users.length > 0 && (
                    <div className="flex -space-x-2">
                        {users.map((user, index) => (
                            <Avatar
                                key={index}
                                src={user.src}
                                alt={user.alt}
                                size="sm"
                                className="w-6 h-6 border-2 border-white dark:border-[#151c2b]"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
