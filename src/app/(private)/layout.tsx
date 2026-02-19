import { Sidebar } from "@/presentation/components/layout/Sidebar";

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display min-h-screen flex overflow-hidden selection:bg-primary/20 selection:text-primary">
            <Sidebar />
            <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
                {children}
            </main>
        </div>
    );
}
