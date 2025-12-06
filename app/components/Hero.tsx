import React from "react";
import Link from "next/link";
import { ChevronRight, Database } from "lucide-react";

interface HeroProps {
  isConfigured: boolean;
}

export function Hero({ isConfigured }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 pt-20 border-b border-cyber-green">
      
      <div className="relative z-10 max-w-4xl">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-cyber-dim text-cyber-green text-xs font-mono mb-8 uppercase tracking-widest bg-black">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full bg-cyber-green opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 bg-cyber-green"></span>
          </span>
          System Online // V.2025
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-wide mb-6 uppercase text-cyber-green text-glow">
          EPS AI SOLUTIONS
        </h1>
        
        <p className="text-xl text-cyber-green mb-10 font-mono max-w-2xl mx-auto">
          Rebuilding logic in a broken world. <br/>
          {isConfigured ? "Artifacts Loaded." : "WAITING FOR CMS DATA..."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <a
             href="#projects"
             className="px-8 py-3 border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-cyber-black font-bold transition-none flex items-center justify-center gap-2"
           >
             <ChevronRight size={18} /> EXPLORE
           </a>
           <Link
             href="/studio"
             className="px-8 py-3 border border-cyber-dim text-cyber-green hover:bg-cyber-green hover:text-cyber-black transition-none flex items-center justify-center gap-2"
           >
             <Database size={18} /> CMS LOGIN
           </Link>
        </div>
      </div>
    </section>
  );
}
