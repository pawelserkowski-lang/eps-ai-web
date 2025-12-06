import React from "react";
import Link from "next/link";
import { ChevronRight, Database } from "lucide-react";

interface HeroProps {
  isConfigured: boolean;
}

export function Hero({ isConfigured }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black opacity-60" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse-slow" />
      
      <div className="relative z-10 max-w-4xl">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-mono mb-8 backdrop-blur-md uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Online // V.2025
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-100 to-emerald-900">
          EPS AI SOLUTIONS
        </h1>
        
        <p className="text-xl text-emerald-400/70 mb-10 font-mono max-w-2xl mx-auto">
          Rebuilding logic in a broken world. <br/>
          {isConfigured ? "Artifacts Loaded." : "WAITING FOR CMS DATA..."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <a href="#projects" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded transition-all flex items-center justify-center gap-2">
             <ChevronRight size={18} /> EXPLORE
           </a>
           <Link href="/studio" className="px-8 py-3 border border-emerald-800 text-emerald-400 rounded hover:bg-emerald-900/20 transition-all flex items-center justify-center gap-2">
             <Database size={18} /> CMS LOGIN
           </Link>
        </div>
      </div>
    </section>
  );
}
