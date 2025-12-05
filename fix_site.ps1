Write-Host "🔧 ROZPOCZYNAM NAPRAWĘ FRONTENDU (METODA LITERALNA)..." -ForegroundColor Cyan

# --- 1. app/layout.tsx (Style + Hydration Fix) ---
Write-Host "1/4 Nadpisywanie app/layout.tsx..." -ForegroundColor Green
$layoutContent = @'
import type { Metadata } from "next";
import { Inter, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const maguntia = UnifrakturMaguntia({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-serif" 
});

export const metadata: Metadata = {
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
      <body className={`${inter.variable} ${maguntia.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
'@
Set-Content -Path "app\layout.tsx" -Value $layoutContent -Encoding UTF8


# --- 2. app/page.tsx (Logika + CMS Fetch) ---
Write-Host "2/4 Nadpisywanie app/page.tsx..." -ForegroundColor Green
$pageContent = @'
import React from "react";
import { client } from "@/sanity/client";
import { Database, Zap, BrainCircuit, Terminal, Github, ChevronRight, Shield, Cpu } from "lucide-react";

// Server Component Fetch
async function getProjects() {
  // Zabezpieczenie przed brakiem ID
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("BRAK SANITY ID!");
    return [];
  }
  
  const query = `*[_type == "project"] | order(_createdAt asc) {
    _id, title, subtitle, description, repoLink, tags, color
  }`;
  
  return await client.fetch(query, {}, { cache: 'no-store' });
}

const getIcon = (title: string) => {
  if (title?.toUpperCase().includes("LITE")) return Zap;
  if (title?.toUpperCase().includes("REGIS")) return Database;
  return BrainCircuit;
};

export default async function Home() {
  const projects = await getProjects();
  const isConfigured = projects.length > 0;

  return (
    <main className="min-h-screen bg-black text-emerald-50 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* HERO SECTION */}
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
            {isConfigured ? "Artifacts Loaded." : "WAITING FOR CMS CONFIGURATION..."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href="#projects" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold rounded transition-all flex items-center justify-center gap-2">
               <ChevronRight size={18} /> EXPLORE
             </a>
             <a href="/studio" className="px-8 py-3 border border-emerald-800 text-emerald-400 rounded hover:bg-emerald-900/20 transition-all flex items-center justify-center gap-2">
               <Database size={18} /> CMS LOGIN
             </a>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
        {!isConfigured ? (
          <div className="text-center p-10 border border-emerald-900 bg-emerald-950/20 rounded-xl">
             <h3 className="text-emerald-400 font-bold text-xl mb-2">SYSTEM GOTOWY</h3>
             <p className="text-emerald-300/70 mb-4">Połączono z bazą danych, ale jest ona pusta.</p>
             <a href="/studio" className="inline-block px-6 py-2 bg-emerald-800 hover:bg-emerald-700 rounded text-white text-sm font-bold">DODAJ PIERWSZY PROJEKT W /STUDIO</a>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold font-serif mb-16 text-center text-emerald-100">
              The Trinity Artifacts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project: any) => {
                const Icon = getIcon(project.title);
                return (
                  <div key={project._id} className="group relative bg-emerald-950/20 border border-emerald-900 rounded-2xl p-8 hover:border-emerald-500/50 transition-all flex flex-col">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color || 'from-emerald-900 to-black'} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-black/60 rounded-xl border border-emerald-800/30 text-emerald-400">
                          <Icon size={28} />
                        </div>
                        <div className="font-mono text-[10px] text-emerald-600 font-bold tracking-[0.2em] uppercase border border-emerald-900/50 px-2 py-1 rounded bg-black/40">
                          {project.subtitle || 'ARTIFACT'}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 font-serif">
                        {project.title}
                      </h3>
                      
                      <p className="text-emerald-400/60 mb-8 text-sm leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags?.map((tag: string) => (
                          <span key={tag} className="px-2 py-1 text-[10px] uppercase border border-emerald-800/30 rounded text-emerald-500 bg-emerald-950/30">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <a href={project.repoLink} target="_blank" className="text-sm font-bold text-emerald-500 hover:text-emerald-300 flex items-center gap-2 mt-auto">
                        <Terminal size={14} /> ACCESS REPO
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      <footer className="border-t border-emerald-900/30 py-12 text-center bg-black/80 backdrop-blur-md mt-20">
        <p className="font-mono text-emerald-800 text-xs">© 2025 EPS AI SOLUTIONS. SYSTEM STABLE.</p>
      </footer>
    </main>
  );
}
'@
Set-Content -Path "app\page.tsx" -Value $pageContent -Encoding UTF8


# --- 3. app/globals.css (Czyste Style) ---
Write-Host "3/4 Nadpisywanie app/globals.css..." -ForegroundColor Green
$cssContent = @'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #020617;
  --foreground: #ecfdf5;
}

body {
  background: var(--background);
  color: var(--foreground);
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #022c22; }
::-webkit-scrollbar-thumb { background: #10b981; border-radius: 4px; }
'@
Set-Content -Path "app\globals.css" -Value $cssContent -Encoding UTF8


# --- 4. tailwind.config.ts (Konfiguracja kolorów) ---
Write-Host "4/4 Nadpisywanie tailwind.config.ts..." -ForegroundColor Green
$tailwindContent = @'
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }
    },
  },
  plugins: [],
} satisfies Config;
'@
Set-Content -Path "tailwind.config.ts" -Value $tailwindContent -Encoding UTF8

Write-Host "------------------------------------------------" -ForegroundColor Cyan
Write-Host "✅ PLIKI NADPISANE POPRAWNIE." -ForegroundColor Green
Write-Host "👉 Zrestartuj serwer: Ctrl+C, a potem 'npm run dev'" -ForegroundColor Yellow
'@