const fs = require('fs');
const path = require('path');

console.log('🏗️  EPS-AI: INICJACJA WDROŻENIA MODUŁOWEGO...');

// Helper do zapisu
const write = (relativePath, content) => {
    const targetPath = path.join(__dirname, relativePath);
    const dir = path.dirname(targetPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Utworzono katalog: ${dir}`);
    }
    fs.writeFileSync(targetPath, content.trim(), 'utf8');
    console.log(`✅ Zapisano: ${relativePath}`);
};

// Helper do usuwania
const remove = (relativePath) => {
    const targetPath = path.join(__dirname, relativePath);
    if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
        console.log(`🗑️  Usunięto (legacy): ${relativePath}`);
    }
};

const removeDir = (relativePath) => {
    const targetPath = path.join(__dirname, relativePath);
    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
        console.log(`🗑️  Usunięto katalog (legacy): ${relativePath}`);
    }
};

// --- DEFINICJE PLIKÓW ---

const typesIndex = `
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  repoLink?: string;
  tags?: string[];
  color?: string;
  iconType?: 'zap' | 'database' | 'brain' | 'terminal';
  image?: SanityImageSource;
}
`;

const badgeComponent = `
import React from "react";

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-[10px] uppercase border border-emerald-800/30 rounded text-emerald-500 bg-emerald-950/50 backdrop-blur-md">
      {children}
    </span>
  );
}
`;

const projectCardComponent = `
import React from "react";
import Image from "next/image";
import { Database, Zap, BrainCircuit, Terminal, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { type Project } from "@/types";
import { Badge } from "@/components/ui/Badge";

const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  database: Database,
  brain: BrainCircuit,
  terminal: Terminal,
};

export function ProjectCard({ project }: { project: Project }) {
  const Icon = (project.iconType && iconMap[project.iconType]) ? iconMap[project.iconType] : BrainCircuit;

  return (
    <div className="group relative bg-emerald-950/20 border border-emerald-900 rounded-2xl p-8 hover:border-emerald-500/50 transition-all flex flex-col overflow-hidden min-h-[350px] hover:shadow-2xl hover:shadow-emerald-900/20">
      <div className={\`absolute inset-0 bg-gradient-to-br \${project.color || "from-emerald-900 to-black"} opacity-0 group-hover:opacity-10 transition-opacity duration-500\`} />

      {project.image && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none mix-blend-overlay">
          <Image
            src={urlFor(project.image).width(600).url()}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-black/60 rounded-xl border border-emerald-800/30 text-emerald-400 backdrop-blur-sm shadow-inner">
            <Icon size={24} />
          </div>
          {project.subtitle && (
            <div className="font-mono text-[10px] text-emerald-600 font-bold tracking-[0.2em] uppercase border border-emerald-900/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
              {project.subtitle}
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 font-serif drop-shadow-lg group-hover:text-emerald-300 transition-colors">
          {project.title}
        </h3>

        <p className="text-emerald-400/70 mb-8 text-sm leading-relaxed flex-grow drop-shadow-md line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags?.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-emerald-500 hover:text-white transition-colors uppercase tracking-wider group/link"
          >
            <Terminal size={14} /> 
            Access Source 
            <ArrowUpRight size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform"/>
          </a>
        )}
      </div>
    </div>
  );
}
`;

const projectListComponent = `
import React from "react";
import { type Project } from "@/types";
import { ProjectCard } from "./ProjectCard";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-emerald-900/50 pb-4">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Artifacts</h2>
        <p className="font-mono text-emerald-500/60 text-sm">/// DEPLOYED_MODULES_LIST</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
}
`;

const heroComponent = `
import React from "react";
import { ChevronRight, Database } from "lucide-react";

interface HeroProps {
  isConfigured: boolean;
}

export function Hero({ isConfigured }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#064e3b_0%,#000000_100%)] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl flex flex-col items-center">
         <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-950/30 border border-emerald-800/30 text-emerald-400 text-[10px] font-mono mb-8 backdrop-blur-md uppercase tracking-[0.2em] animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          System Online // V.2025
        </div>
        
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 font-serif text-white drop-shadow-2xl">
          EPS AI <span className="text-emerald-600">SOLUTIONS</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-emerald-100/60 mb-12 font-sans max-w-2xl mx-auto leading-relaxed">
          <span className="font-mono text-emerald-500">{'>'}</span> Rebuilding logic in a broken world.
          <br className="hidden md:block"/>
          {isConfigured ? "Artifacts successfully loaded." : "Awaiting CMS configuration..."}
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
           <a href="#projects" className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]">
             EXPLORE ARTIFACTS <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </a>
           <a href="/studio" className="group px-8 py-4 border border-emerald-800/50 bg-black/40 hover:bg-emerald-950/30 text-emerald-400 rounded-lg transition-all flex items-center justify-center gap-2 font-mono text-sm">
             <Database size={16} /> CMS_ACCESS
           </a>
        </div>
      </div>
    </section>
  );
}
`;

const pageComponent = `
import React from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { Hero } from "@/components/modules/hero/Hero";
import { ProjectList } from "@/components/modules/projects/ProjectList";
import { type Project } from "@/types";

export default async function Home() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 font-mono">
        CRITICAL ERROR: MISSING PROJECT ID.
      </div>
    );
  }

  const query = \`*[_type == "project"] | order(_createdAt asc) {
    _id, title, subtitle, description, repoLink, tags, color, iconType, image
  }\`;

  let projects: Project[] = [];
  
  try {
    const result = await sanityFetch({ query });
    projects = (result.data as Project[]) || [];
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
  }

  const isConfigured = projects.length > 0;

  return (
    <main className="min-h-screen bg-[#020617] text-emerald-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <Hero isConfigured={isConfigured} />
      
      <div className="relative z-20 bg-black">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-900 to-transparent" />
        <ProjectList projects={projects} />
      </div>
      
      <footer className="border-t border-emerald-900/30 py-12 text-center bg-black/80 backdrop-blur-md">
        <p className="font-mono text-emerald-800 text-xs tracking-widest">
          © 2025 EPS AI SOLUTIONS. SYSTEM STABLE.
        </p>
      </footer>
    </main>
  );
}
`;

// --- WYKONANIE ---

try {
    // 1. Types
    write('types/index.ts', typesIndex);

    // 2. UI Components
    write('components/ui/Badge.tsx', badgeComponent);

    // 3. Project Components
    write('components/modules/projects/ProjectCard.tsx', projectCardComponent);
    write('components/modules/projects/ProjectList.tsx', projectListComponent);

    // 4. Hero Component
    write('components/modules/hero/Hero.tsx', heroComponent);

    // 5. Page
    write('app/page.tsx', pageComponent);

    // 6. Cleanup (Legacy)
    removeDir('app/components');

    console.log('✅ Wdrożenie architektury modułowej zakończone sukcesem.');
} catch (e) {
    console.error('❌ Błąd krytyczny podczas wdrożenia:', e);
}
`;

---

### 2. 🚢 Skrypt Wdrożenia Produkcyjnego (`Dockerfile`)

Jeśli "wdrożenie" oznacza dla Ciebie deployment na serwer/kontener, oto zoptymalizowany, wieloetapowy `Dockerfile` dla Next.js 15/16.

**Utwórz plik:** `Dockerfile`

```dockerfile
# Stage 1: Base
FROM node:20-alpine AS base

# Stage 2: Deps
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build time (add SANITY keys here or via CI/CD)
ENV NEXT_TELEMETRY_DISABLED 1
# ENV NEXT_PUBLIC_SANITY_PROJECT_ID=... 

RUN npm run build

# Stage 4: Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]