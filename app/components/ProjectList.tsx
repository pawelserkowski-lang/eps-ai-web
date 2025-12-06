import React from "react";
import Image from "next/image";
import { Database, Zap, BrainCircuit, Terminal } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  repoLink?: string;
  tags?: string[];
  color?: string;
  iconType?: string;
  image?: SanityImageSource & { alt?: string };
}

const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  database: Database,
  brain: BrainCircuit,
  terminal: Terminal,
};

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      {projects.map((project) => {
        const Icon = iconMap[project.iconType || "brain"] || BrainCircuit;
        
        return (
          <div key={project._id} className="group relative bg-emerald-950/20 border border-emerald-900 rounded-2xl p-8 hover:border-emerald-500/50 transition-all flex flex-col mb-8 overflow-hidden min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />
            
            {project.image && (
               <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                 <Image 
                   src={urlFor(project.image).width(800).url()} 
                   alt={project.image.alt || project.title}
                   fill
                   className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                 />
               </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-black/60 rounded-xl border border-emerald-800/30 text-emerald-400 backdrop-blur-sm">
                  <Icon size={28} />
                </div>
                <div className="font-mono text-[10px] text-emerald-600 font-bold tracking-[0.2em] uppercase border border-emerald-900/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
                  {project.subtitle || "ARTIFACT"}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 font-serif drop-shadow-lg">
                {project.title}
              </h3>
              
              <p className="text-emerald-400/80 mb-8 text-sm leading-relaxed flex-grow drop-shadow-md">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags?.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[10px] uppercase border border-emerald-800/30 rounded text-emerald-500 bg-emerald-950/50 backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>

              {project.repoLink && (
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-emerald-500 hover:text-emerald-300 flex items-center gap-2 mt-auto">
                  <Terminal size={14} /> ACCESS REPO
                </a>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
