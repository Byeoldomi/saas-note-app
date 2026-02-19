import { Button } from "@/presentation/components/ui/Button";
import { Input } from "@/presentation/components/ui/Input";
import { Logo } from "@/presentation/components/ui/Logo";
import { Avatar } from "@/presentation/components/ui/Avatar";
import { NoteCard } from "@/presentation/components/domain/note/NoteCard";

export default function StyleGuidePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-10 space-y-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <header>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Style Guide</h1>
                    <p className="text-slate-500">Visual verification of common UI components.</p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Logos</h2>
                    <div className="flex items-end gap-8 p-4 border rounded-lg bg-white dark:bg-slate-800">
                        <div className="space-y-2">
                            <p className="text-xs text-slate-400">Small</p>
                            <Logo size="sm" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs text-slate-400">Medium (Default)</p>
                            <Logo />
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs text-slate-400">Large</p>
                            <Logo size="lg" />
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Buttons</h2>
                    <div className="grid gap-4 p-4 border rounded-lg bg-white dark:bg-slate-800">
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button>Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                            <Button variant="danger">Danger</Button>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button isLoading>Loading</Button>
                            <Button leftIcon={<span className="material-icons-outlined">add</span>}>Left Icon</Button>
                            <Button rightIcon={<span className="material-icons-outlined">arrow_forward</span>}>Right Icon</Button>
                            <Button variant="ghost" size="icon">
                                <span className="material-icons-outlined">settings</span>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Inputs</h2>
                    <div className="grid gap-6 p-4 border rounded-lg bg-white dark:bg-slate-800 max-w-md">
                        <Input label="Default Input" placeholder="Type something..." />
                        <Input label="With Icon" placeholder="Search..." leftIcon={<span className="material-icons-outlined">search</span>} />
                        <Input label="Error State" placeholder="Invalid input" error="This field is required" />
                        <Input label="Disabled" placeholder="Cannot type here" disabled />
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Avatars</h2>
                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white dark:bg-slate-800">
                        <Avatar size="sm" fallback="SM" />
                        <Avatar size="md" fallback="MD" />
                        <Avatar size="lg" fallback="LG" />
                        <Avatar size="xl" fallback="XL" />
                        <Avatar
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtXT-ovtzCbaboop3dNJK2CzoUC3UzAsi2afoYPBn2ctR182I8r3x9PaXS7MQIJdHKrFRVP_TYJyGnLtMK5Q_JxiLbEpVf_0TQOTWwvAI2Xq3yOYLxRM_P_tmvQETVSDEdBlysCZnQHKCOHiLI7U0CrxDBXlVJ0bNZBbIzgzhKEf5WSQk0Ojy072z3-NnDOVyBDJ-PrD-begxVIWx4ZCugNo7WJt-1H1UY6WK_vZSq4ykv67W488wl8pbU7zUkzTlhBeDlTYSvyNA"
                            alt="User Avatar"
                            size="md"
                        />
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">Note Cards</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <NoteCard
                            title="Standard Note"
                            content="This is a standard note card with some text content."
                            date="2h ago"
                            category={{ label: 'Work', color: 'text-blue-500', bgColor: 'bg-blue-100' }}
                        />
                        <NoteCard
                            title="Pinned Note"
                            content="This note is pinned to the top."
                            date="Just now"
                            pinned
                            variant="pinned"
                            category={{ label: 'Important', color: 'text-red-500', bgColor: 'bg-red-100' }}
                        />
                        <NoteCard
                            title="Idea Note"
                            content="A brilliant idea popped up!"
                            date="Yesterday"
                            variant="idea"
                            category={{ label: 'Idea', color: 'text-orange-500', bgColor: 'bg-orange-100' }}
                        />
                        <NoteCard
                            title="Rich Media Note"
                            content="This note has an image attachment."
                            date="Oct 20"
                            image="https://lh3.googleusercontent.com/aida-public/AB6AXuCMz2ujY_GSCV27btYXPfjDSAKRDLpm6sTAIsQTEx_MI9lhQhPtSlcnkNmevjwJ1GF1-cKf6LTNzkVZHEDXPbt2o6Gcx59BSHDXSrNF5SU7ITYIItEJC7m3cxB-OQN-MaNs9P62IbK7BK23XOLqX9BOCt0sU4XZRZTsUooGSOQKDVF35Sq696aHGe_ytxg6DsAyHkVMIiC_4i7Cn86ytDObPHJmHfwfRhArqzqLI81eDT1w2Bx6uG8BC4xudS4YlgnkmXvIlBXwh8g"
                            category={{ label: 'Personal', color: 'text-purple-500', bgColor: 'bg-purple-100' }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
