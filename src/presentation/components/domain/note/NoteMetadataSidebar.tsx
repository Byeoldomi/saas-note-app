import { Input } from '@/presentation/components/ui/Input';

export function NoteMetadataSidebar() {
    return (
        <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-900/50 flex-none hidden lg:flex flex-col">
            <div className="p-6">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Document Details</h3>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-primary dark:bg-blue-900/40 dark:text-blue-300">
                            #brainstorm
                            <button className="ml-1 text-blue-400 hover:text-blue-600 dark:hover:text-blue-200 focus:outline-none">
                                <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                            #product-launch
                            <button className="ml-1 text-purple-400 hover:text-purple-600 dark:hover:text-purple-200 focus:outline-none">
                                <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                        </span>
                    </div>
                    <div className="relative">
                        <input className="w-full text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-400 outline-none" placeholder="Add a tag..." type="text" />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Information</label>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                Created
                            </span>
                            <span className="text-slate-900 dark:text-white font-medium">Oct 24, 2023</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">schedule</span>
                                Modified
                            </span>
                            <span className="text-slate-900 dark:text-white font-medium">Just now</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">person</span>
                                Author
                            </span>
                            <span className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">Y</div>
                                <span className="text-slate-900 dark:text-white font-medium">You</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Stats</label>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">1,240</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Words</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                            <div className="text-2xl font-bold text-slate-900 dark:text-white">5m</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Read time</div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex flex-col gap-2">
                        <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors group">
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-primary">lock</span>
                                Privacy
                            </span>
                            <span className="text-xs text-slate-400">Only you</span>
                        </button>
                        <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors group">
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-red-500">delete</span>
                                Move to Trash
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
