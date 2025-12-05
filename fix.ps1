# 1. Naprawa architektury schematów (Sanity)
Write-Host "🔧 Poprawianie sanity/schema.ts..."
$schemaContent = @"
import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './schema/project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType],
}
"@
Set-Content -Path "sanity/schema.ts" -Value $schemaContent -Encoding UTF8

# 2. Ulepszenie definicji projektu (Typowanie, Ikony, Obrazy)
Write-Host "🛠️ Aktualizacja sanity/schema/project.ts..."
$projectContent = @"
import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Projekty (Artifacts)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa Projektu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
    }),
    defineField({
      name: 'repoLink',
      title: 'Link do GitHuba',
      type: 'url',
    }),
    defineField({
      name: 'tags',
      title: 'Tagi',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'color',
      title: 'Kolor Gradientu (np. from-emerald-500 to-black)',
      type: 'string',
    }),
    defineField({
      name: 'iconType',
      title: 'Ikona',
      type: 'string',
      options: {
        list: [
          { title: 'Błyskawica', value: 'zap' },
          { title: 'Baza danych', value: 'database' },
          { title: 'Mózg', value: 'brain' },
          { title: 'Terminal', value: 'terminal' }
        ],
      },
      initialValue: 'brain'
    }),
    defineField({
      name: 'image',
      title: 'Obraz Projektu',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Tekst alternatywny',
        })
      ]
    }),
  ],
})
"@
Set-Content -Path "sanity/schema/project.ts" -Value $projectContent -Encoding UTF8

# 3. Aktualizacja komponentu listy projektów
Write-Host "🎨 Aktualizacja app/components/ProjectList.tsx..."
$listContent = @"
import React from "react";
import Image from "next/image";
import { Database, Zap, BrainCircuit, Terminal } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

export interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  repoLink?: string;
  tags?: string[];
  color?: string;
  iconType?: string;
  image?: any;
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
            <div className={\`absolute inset-0 bg-gradient-to-br \${project.color || "from-emerald-900 to-black"} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl\`} />
            
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
"@
Set-Content -Path "app/components/ProjectList.tsx" -Value $listContent -Encoding UTF8

# 4. SEO Fix
Write-Host "🌍 Poprawa SEO w app/layout.tsx..."
$layoutContent = @"
import type { Metadata } from "next";
import { Inter, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const maguntia = UnifrakturMaguntia({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: "EPS AI Solutions",
  description: "Arcane Intelligence for the New Age",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={\`\${inter.variable} \${maguntia.variable} font-sans antialiased\`}>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
"@
Set-Content -Path "app/layout.tsx" -Value $layoutContent -Encoding UTF8

# 5. Aktualizacja Query w Page
Write-Host "📡 Aktualizacja zapytania w app/page.tsx..."
$pageContent = @"
import React from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { Hero } from "@/app/components/Hero";
import { ProjectList, Project } from "@/app/components/ProjectList";

export default async function Home() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 font-mono">
        CRITICAL ERROR: MISSING PROJECT ID. CHECK .ENV
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
    console.error("Sanity Live Fetch Error:", error);
  }

  const isConfigured = projects.length > 0;

  return (
    <main className="min-h-screen bg-black text-emerald-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <Hero isConfigured={isConfigured} />
      <ProjectList projects={projects} />
      
      <footer className="border-t border-emerald-900/30 py-12 text-center bg-black/80 backdrop-blur-md mt-20">
        <p className="font-mono text-emerald-800 text-xs">© 2025 EPS AI SOLUTIONS. SYSTEM STABLE.</p>
      </footer>
    </main>
  );
}
"@
Set-Content -Path "app/page.tsx" -Value $pageContent -Encoding UTF8

# 6. Dodanie Error Boundary
Write-Host "🛡️ Tworzenie app/error.tsx..."
$errorContent = @"
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-500 font-mono p-4">
      <h2 className="text-2xl mb-4 border-b border-red-900 pb-2">SYSTEM CRITICAL FAILURE</h2>
      <p className="mb-8 text-sm opacity-70 font-sans max-w-md text-center">
        {error.message || "An unexpected anomaly occurred within the neural matrix."}
      </p>
      <div className="text-xs text-red-900 mb-8 font-mono">
        CODE: {error.digest || 'UNKNOWN_ENTITY'}
      </div>
      <button
        onClick={() => reset()}
        className="px-6 py-2 border border-red-800 hover:bg-red-900/20 rounded uppercase text-sm tracking-widest transition-colors font-bold text-red-400"
      >
        INITIATE REBOOT
      </button>
    </div>
  )
}
"@
Set-Content -Path "app/error.tsx" -Value $errorContent -Encoding UTF8

Write-Host "✅ Wszystkie systemy zaktualizowane. Uruchom 'npm run dev' i sprawdź stabilność."