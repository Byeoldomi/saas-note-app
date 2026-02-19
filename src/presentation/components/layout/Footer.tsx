import Link from 'next/link';
import { Logo } from '../ui/Logo';

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-[#0b101a] pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2 pr-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Logo size="sm" href="/" />
                        </div>
                        <p className="text-slate-500 text-sm mb-6 max-w-xs">
                            The thoughtful note-taking app designed for focus and clarity. Build your second brain today.
                        </p>
                        <div className="flex gap-4">
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">facebook</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">tag</span></a>
                            <a className="text-slate-400 hover:text-primary transition-colors" href="#"><span className="material-icons-outlined">videocam</span></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="/#features">Features</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Integrations</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/pricing">Pricing</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Changelog</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Docs</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="#">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/#blog">Blog</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Security</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">© 2023 CloudNote Inc. All rights reserved.</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        System Operational
                    </div>
                </div>
            </div>
        </footer>
    );
}
