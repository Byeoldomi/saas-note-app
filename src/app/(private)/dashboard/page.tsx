import Link from "next/link";
import { Sidebar } from "@/presentation/components/layout/Sidebar";
import { NoteCard } from "@/presentation/components/domain/note/NoteCard";
import { Input } from "@/presentation/components/ui/Input";
import { Button } from "@/presentation/components/ui/Button";
import { NavbarProfile } from "@/presentation/components/layout/NavbarProfile";

export default function DashboardPage() {
    return (
        <>
            {/* Top Bar */}
            <header className="h-16 px-6 md:px-8 flex items-center justify-between bg-white/80 dark:bg-[#101622]/90 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 -ml-2 text-slate-500 hover:text-primary">
                    <span className="material-icons-outlined">menu</span>
                </button>
                {/* Search */}
                <div className="flex-1 max-w-xl mx-4 hidden md:block">
                    <Input
                        placeholder="Search notes, tags..."
                        leftIcon={<span className="material-icons-outlined text-xl">search</span>}
                        className="bg-slate-100 dark:bg-slate-800/50 border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                    />
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3 md:gap-5">
                    <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-700/50 pr-4">
                        <button
                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            title="Grid View"
                        >
                            <span className="material-icons-outlined">grid_view</span>
                        </button>
                        <button
                            className="p-2 text-primary bg-primary/10 rounded-lg transition-colors"
                            title="List View"
                        >
                            <span className="material-icons-outlined">view_list</span>
                        </button>
                    </div>
                    <NavbarProfile />
                    <Button
                        href="/note/new"
                        leftIcon={<span className="material-icons-outlined text-lg">add</span>}
                        className="hidden sm:inline-flex shadow-lg shadow-primary/30"
                    >
                        New Note
                    </Button>
                    <Link href="/note/new" className="sm:hidden bg-primary hover:bg-primary/90 text-white p-2 rounded-lg text-sm font-semibold shadow-lg shadow-primary/30 flex items-center gap-2 transition-all active:scale-95">
                        <span className="material-icons-outlined text-lg">add</span>
                    </Link>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {/* Welcome / Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                            Welcome back, Alex! 👋
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400">
                            You have 3 tasks pending and 2 notes to review.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-slate-500">Sort by:</span>
                        <select className="bg-transparent font-semibold text-slate-700 dark:text-slate-200 border-none outline-none focus:ring-0 cursor-pointer pr-8 py-0">
                            <option>Last Edited</option>
                            <option>Date Created</option>
                            <option>Title (A-Z)</option>
                        </select>
                    </div>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Note Card 1 (Rich Media) */}
                    <NoteCard
                        title="Q4 Goals & Reflections"
                        content="Reflecting on the past quarter, the main focus was on skill acquisition. Moving forward to Q4, I want to prioritize health and..."
                        date="Edited 2h ago"
                        image="https://lh3.googleusercontent.com/aida-public/AB6AXuCMz2ujY_GSCV27btYXPfjDSAKRDLpm6sTAIsQTEx_MI9lhQhPtSlcnkNmevjwJ1GF1-cKf6LTNzkVZHEDXPbt2o6Gcx59BSHDXSrNF5SU7ITYIItEJC7m3cxB-OQN-MaNs9P62IbK7BK23XOLqX9BOCt0sU4XZRZTsUooGSOQKDVF35Sq696aHGe_ytxg6DsAyHkVMIiC_4i7Cn86ytDObPHJmHfwfRhArqzqLI81eDT1w2Bx6uG8BC4xudS4YlgnkmXvIlBXwh8g"
                        category={{
                            label: "Personal",
                            color: "text-purple-600 dark:text-purple-400",
                            bgColor: "bg-purple-100 dark:bg-purple-500/10",
                        }}
                        users={[
                            {
                                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBP5F2ctyv8BWshYqARr5OsbT8mndJu5nadEu6ca6gSKgHBsPSV0PCnQYOB6-xFTKalNBg15aahuwTp5kcBPvcRyJtKYDwqB8GW4nS5mGbZNdd3N2P-RomrEV9Jbz3c6iS9cMaT_n8xwy2-BWU-bf0rLQ3obsZ255vzwAGwE1jkGieqN69iWx0P-sFmivzaSWWUeJ_p30x6xl-gtWGOCdLus04Goa8881JVLfMq01P2xhZc84ZRvYSblw08UIpB1j5TN27p4lpE7gY",
                                alt: "User",
                            },
                        ]}
                    />

                    {/* Note Card 2 (Text Heavy) */}
                    <NoteCard
                        title="Project Alpha Sync"
                        content={
                            <>
                                Attendees: Sarah, Mike, John. <br />
                                <br />
                                Key Discussion Points:
                                <br />
                                - API Integration timeline needs to be shifted by 2 weeks.
                                <br />
                                - UI Mockups for the new dashboard are approved.
                                <br />
                                - Backend team needs to provide the new schema by Friday.
                                <br />
                                Action Items:
                                <br />
                                1. Schedule follow up with client.
                            </>
                        }
                        date="Yesterday"
                        category={{
                            label: "Work",
                            color: "text-emerald-600 dark:text-emerald-400",
                            bgColor: "bg-emerald-100 dark:bg-emerald-500/10",
                        }}
                        users={[
                            {
                                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxyOv2i45bMzn-rExo2jIjW7goSIAQ7CFVXvfrCGE6OkxgPUimkSVRfC2SDVS-9M23yReQS9n4JEViwNiJddAhfC5E2Cl6yAv3UBABtscSgFEOQdZIZ3HZeYoLbVdFV0lx_fZ3Du_TN3P-LUevRkxnCWV6LXdUbhe9AZSy_yl1WydLB2zPMyIKaNYhh7kyXE5FAMZZa5y3q-3hVuFcJ-N8U9v2xo_u2xsk4GeSTYQ6xwFmLRAgQya97YJ6nFNURP2XpdD4DqWidUc",
                                alt: "User",
                            },
                            {
                                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkUthfPDDoApGoonnD6iv0LJtu-x-C1aV7VA9NcCG5BGVvsryPnirj8NE8s2JWxnQui8-sqfh5zC4lplaR2Fl51otaQYgXsVkbCri5kRDsz_T_5owQh4UCSDN1BdgyMtULe_vRco3i4xxutMUXfrW9ckVDN8nfUBts8Q-AIRFYmRWT_YZGY2ijmN9mjzH5nCiLJw8jXejrizZPcW1EYs2-7a979mv0XEYQOuQTPQJKCO05JGoQxeEfHtdDDzKo8rDovrg2LBc-scs",
                                alt: "User",
                            },
                        ]}
                    />

                    {/* Note Card 3 (Idea) */}
                    <NoteCard
                        title="App Feature Brainstorm"
                        variant="idea"
                        content={
                            <>
                                <p className="mb-4">
                                    What if we added a voice-to-text feature for quick memos while
                                    driving? Could integrate with existing Siri shortcuts. Needs
                                    research on API costs.
                                </p>
                                <ul className="space-y-2 mb-4 flex-1">
                                    <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-icons-outlined text-base text-primary">
                                            check_box
                                        </span>
                                        Research APIs
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                        <span className="material-icons-outlined text-base text-slate-300">
                                            check_box_outline_blank
                                        </span>
                                        Mockup UI
                                    </li>
                                </ul>
                            </>
                        }
                        date="Oct 24, 2023"
                        category={{
                            label: "Ideas",
                            color: "text-orange-600 dark:text-orange-400",
                            bgColor: "bg-orange-100 dark:bg-orange-500/10",
                        }}
                    />

                    {/* Note Card 4 (Standard) */}
                    <NoteCard
                        title="Design System V2"
                        content="Colors are finalized. Need to work on typography scale and component library spacing rules. The new primary blue needs to pass WCAG AA contrast on light backgrounds."
                        date="Oct 20, 2023"
                        tags={[{ label: "design" }, { label: "ui/ux" }]}
                        category={{
                            label: "Projects",
                            color: "text-primary",
                            bgColor: "bg-primary/10",
                        }}
                        users={[
                            {
                                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCa0Pn4Q8-sl4zxrDMR2DBLt5OVWhlQB-v_nyuq7v9gBPty55LTIwbjd580momkRUZZZ7fiXwhHo3m_eaoPAlco9KbTktiKyWwJnrOwpBS5LFGNV8j-aH5pTj0r4PWjnt7sNCXFneBFitHd8ElSyNtNeCrgxqeOApMbuZd01WRxjIA2QzbDy6w3jiLeawyOcDnYEACWm7-H1vz-nh7CWrWbi_OxPXP6UYxzFrtwFTNPJQFPSwVIBvJsrHFmR7rpxpHmS9BjoASjjSg",
                                alt: "User",
                            },
                        ]}
                    />

                    {/* Note Card 5 (Pinned) */}
                    <NoteCard
                        title="Weekly Shopping"
                        pinned={true}
                        variant="pinned"
                        content={
                            <ul className="space-y-2 mb-4 flex-1 overflow-y-auto pr-2">
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 decoration-slate-400 line-through opacity-60">
                                    <span className="material-icons-outlined text-base text-primary">
                                        check_box
                                    </span>
                                    Milk & Eggs
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 decoration-slate-400 line-through opacity-60">
                                    <span className="material-icons-outlined text-base text-primary">
                                        check_box
                                    </span>
                                    Bread
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-icons-outlined text-base text-slate-300">
                                        check_box_outline_blank
                                    </span>
                                    Coffee Beans
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-icons-outlined text-base text-slate-300">
                                        check_box_outline_blank
                                    </span>
                                    Avocados
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="material-icons-outlined text-base text-slate-300">
                                        check_box_outline_blank
                                    </span>
                                    Pasta
                                </li>
                            </ul>
                        }
                        date="Just now"
                        category={{
                            label: "Grocery",
                            color: "text-slate-600 dark:text-slate-300",
                            bgColor: "bg-slate-100 dark:bg-slate-700",
                        }}
                    />

                    {/* Add New Placeholder */}
                    <Link
                        href="/note/new"
                        className="group h-[280px] rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary"
                    >
                        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                            <span className="material-icons-outlined text-2xl">add</span>
                        </div>
                        <span className="font-semibold">Create New Note</span>
                    </Link>
                </div>

                <div className="mt-12 text-center text-xs text-slate-400">
                    <p>© 2023 CloudNote Inc. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}
