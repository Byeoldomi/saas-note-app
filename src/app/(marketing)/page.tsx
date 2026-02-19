import Link from 'next/link';
import { Button } from '@/presentation/components/ui/Button';


export default function Home() {
  return (

    <main className="flex-grow">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-8 border border-primary/20">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            New: AI Assistant for summarization
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Capture thoughts, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">organize life.</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            The fastest way to sync your ideas across all devices. Experience a clutter-free workspace designed for focused thinking and seamless collaboration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <Button
              href="/signup"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-base shadow-xl shadow-primary/25"
            >
              Start Taking Notes Free
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto px-8 py-4 text-base bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-primary/50 group"
              leftIcon={<span className="material-icons-outlined group-hover:text-primary transition-colors">play_circle</span>}
            >
              Watch Demo
            </Button>
          </div>
          <div className="relative mx-auto max-w-5xl">
            <div className="relative rounded-2xl bg-slate-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10 lg:rounded-3xl lg:p-3 shadow-2xl backdrop-blur-sm">
              <div className="rounded-xl lg:rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-inner">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto text-xs font-medium text-slate-400">CloudNote — My Ideas</div>
                </div>
                {/* Using standard img for external images to avoid Next.js config complexity for now, or use unoptimized */}
                <img
                  alt="Screenshot of a clean, modern note taking application interface with a sidebar and main editor showing text and images"
                  className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwsv7WMEvJqIoCxhU6jKzFfZnG-MlEmCIwWsDIzT7ianPhBSGJPO4RL99znCc4XRdMKVzYjeqyJH8uk2PzFNkBpVHbJqHs04P59wUH6WCI9-BWRtRlQVTaa3qiXfyU-Ji7EfXBimK9opFBVo4_3UEytRz1Lo_bSPOckoT7XOMtse9iHq-OxMkHW_nWuGQxz4wznST39zlomB9XmqI5MtTU8D1Y-m93fvuGvo4bg94pM859Dq7_YzyF4QMQb3KDfILdKUcqAtRQmLM"
                />
              </div>
            </div>
            <div className="absolute -right-12 top-20 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-soft border border-slate-100 dark:border-slate-700 flex items-center gap-3 max-w-[200px]">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <span className="material-icons-outlined text-xl">check_circle</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Synced just now</p>
                </div>
              </div>
            </div>
            <div className="absolute -left-12 bottom-20 hidden lg:block animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-soft border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img alt="User avatar 1" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMm38OOFk5jXK7n5axNPdmTVjZ9DpjAJ7HAp0OW22ZcLZg9Qt_XY1cJSWXRqa1j3FwjnLmwJadC7_245US3kPcPu8o-abEbcMAhtBdJpgU0loHrDgVlI0ildIehKIi68FDtfJfsaJfIQu0_cxeyMU3lt8mBfqOwn1cTr_hLCEea_rREGTrQ-DPkMpApcTeVyEMmoFHGcbFG9xtByRNGSdP4vY6ye3AdUAQ_8f6sHBSO3G0zbQ0LIk51bT-RnJYiXG8b5za49CiJqw" />
                  <img alt="User avatar 2" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1jxhQlQjajK14o28BBJeSaR6LgHbsaCQGQBTc_TTmd-QwUtf3YOi5oiSRwrwnHDhoA0kwa2RsT2qcwxw3-_xovFdKRoFtbo4BKLBUwz0af1LtOfiqiTbAB4UgnPrLtzQl2TzJsg5Lwju6L0auuOXG3eBK32lcuqd9rT-qyZ4Uznn9hlrBH3ZDhJCAu2jdNhU8DkyfzmVV6a9AYN24Pu8m3qBIsaC7zDItnH68607uPDApKyQCPqiqS6gQsTCvzViWPacua-1fuXw" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">Team Shared</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">Trusted by creative teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><span className="material-icons-outlined text-3xl">token</span> Acme Corp</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><span className="material-icons-outlined text-3xl">diamond</span> GemStone</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><span className="material-icons-outlined text-3xl">bolt</span> FlashInc</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><span className="material-icons-outlined text-3xl">hub</span> Networkia</div>
            <div className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-slate-200"><span className="material-icons-outlined text-3xl">rocket_launch</span> StarLine</div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background-light dark:bg-background-dark relative" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">Core Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Designed for the modern mind.</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">Everything you need to capture ideas quickly and organize them effectively, without the clutter.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:shadow-soft">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="material-icons-outlined text-6xl text-primary -rotate-12 transform group-hover:rotate-0 transition-transform duration-500">sync</span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-icons-outlined text-3xl">cloud_sync</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Real-time Sync</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Never lose a thought. Your notes update instantly across your desktop, tablet, and mobile devices as soon as you type.
              </p>
            </div>
            <div className="group relative p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:shadow-soft">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="material-icons-outlined text-6xl text-primary -rotate-12 transform group-hover:rotate-0 transition-transform duration-500">lock</span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-icons-outlined text-3xl">shield</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Secure Storage</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Your privacy is our priority. End-to-end encryption ensures that only you can access and read your private thoughts.
              </p>
            </div>
            <div className="group relative p-8 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all hover:shadow-soft">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-100 transition-opacity">
                <span className="material-icons-outlined text-6xl text-primary -rotate-12 transform group-hover:rotate-0 transition-transform duration-500">auto_awesome</span>
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-icons-outlined text-3xl">sell</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Organization</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Stop sorting manually. Our AI automatically suggests tags and folders based on your content context.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
                <img alt="Close up of hands typing on a laptop showing a clean workspace environment" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiNYZ-Hbg0ZNGJW3xyhOkJCeacFltYGsfh02FDzfj2Kdk9yr2Zz0i08EdxDAJ357lVZBJE4wa2tLSwoeLfZH_05IRlHcOhvCnoYo8T3sRwXnacX0HMkqQvGRGnHHzJM5yeu3OmVln20hTraQSr1AI6x4QtGRZXalhuL5VmQG1lbGfZK5kAwXeiFk5U7Yt3OE9HnmsUrJZ9eQRZhNbEhimFXqN5B1DqQZFJj2IqrTVbT67ncpSGnKv6tD4qK9q93yzLDpSlRSsUenY" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-icons-outlined text-primary">search</span>
                    <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                    <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary text-xs font-semibold mb-6">
                <span className="material-icons-outlined text-sm">bolt</span>
                Lightning Fast Search
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Find anything, instantly.</h3>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Don't waste time scrolling. Our powerful search engine indexes not just text, but images and handwritten notes too. Retrieve that one brilliant idea from three years ago in milliseconds.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="material-icons-outlined text-primary mt-1">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">OCR technology for image search</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-icons-outlined text-primary mt-1">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">Advanced filtering by date, tag, or color</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-icons-outlined text-primary mt-1">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300">Keyboard shortcuts for power users</span>
                </li>
              </ul>
              <a className="text-primary font-bold hover:text-primary-hover inline-flex items-center gap-1 group" href="#">
                Learn more about search
                <span className="material-icons-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="material-icons-outlined text-6xl text-white/30 mb-8">format_quote</span>
          <h3 className="text-2xl md:text-4xl font-bold leading-normal mb-10">
            "CloudNote completely changed how I manage my projects. It’s the perfect balance between simplicity and power. I can't imagine my workflow without it."
          </h3>
          <div className="flex items-center justify-center gap-4">
            <img alt="Sarah Jenkins portrait" className="w-14 h-14 rounded-full border-2 border-white/50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHmOUd47msltyawhbp3y-Yi7crHUI32fvxsZ8qUunAO3gAEIzRZJ25TUh2tsGWNiYO4Bw4ZigBvyPjQID7nGfWZ-2OrvZhONa_Lb82SywhflAIqH3Os3Q9o8HQl7DyPuQLku96y_XxqACYx7zIg66JSATBzqE5g1Q9t2xz324tMLkhRgRID3-DlHPRr_jmVHgQAmzHQ8geKbos9Otm_MqW2XjyYKi1txaQ-YrN4vmL0ogjmj9pmJnetNDNfmVXZu6MZ-diQtqPMcY" />
            <div className="text-left">
              <p className="font-bold text-lg">Sarah Jenkins</p>
              <p className="text-white/80 text-sm">Product Manager at TechFlow</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Ready to clear your mind?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
            Join 100,000+ thinkers, creators, and doers. Start your free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              href="/signup"
              size="lg"
              className="px-8 py-4 text-lg shadow-xl shadow-primary/25"
            >
              Get Started for Free
            </Button>
            <Button
              href="/pricing"
              variant="secondary"
              size="lg"
              className="px-8 py-4 text-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              View Pricing
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">Free 14-day trial on Pro plans. Cancel anytime.</p>
        </div>
      </section>
    </main>


  );
}
