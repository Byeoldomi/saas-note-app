import { cn } from "@/shared/utils/cn";
import Image from "next/image";

interface AvatarProps {
    src?: string | null;
    alt?: string;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    fallback?: string;
}

export function Avatar({ src, alt, size = "md", className, fallback }: AvatarProps) {
    const sizes = {
        sm: "w-8 h-8 text-[10px]",
        md: "w-9 h-9 text-xs",
        lg: "w-12 h-12 text-sm",
        xl: "w-16 h-16 text-base",
    };

    return (
        <div
            className={cn(
                "relative rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-700",
                sizes[size],
                className
            )}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt || "Avatar"}
                    className="w-full h-full object-cover"
                />
            ) : (
                <span className="font-medium text-slate-500 dark:text-slate-400">
                    {fallback || "?"}
                </span>
            )}
        </div>
    );
}
