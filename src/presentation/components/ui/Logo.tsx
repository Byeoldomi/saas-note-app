import { cn } from "@/shared/utils/cn";
import Link from "next/link";

interface LogoProps {
    className?: string;
    showText?: boolean;
    href?: string;
    size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, href = "/", size = "md" }: LogoProps) {
    const sizes = {
        sm: {
            container: "w-6 h-6 rounded",
            icon: "text-base",
            text: "text-lg",
        },
        md: {
            container: "w-8 h-8 rounded-lg",
            icon: "text-xl",
            text: "text-xl",
        },
        lg: {
            container: "w-10 h-10 rounded-xl",
            icon: "text-2xl",
            text: "text-2xl",
        },
    };

    const currentSize = sizes[size];

    const content = (
        <div className={cn("flex items-center gap-2 group", className)}>
            <div
                className={cn(
                    "bg-primary flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform",
                    currentSize.container
                )}
            >
                <span className={cn("material-icons-outlined", currentSize.icon)}>edit_note</span>
            </div>
            {showText && (
                <span
                    className={cn(
                        "font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors",
                        currentSize.text
                    )}
                >
                    CloudNote
                </span>
            )}
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}
