Write-Host "🚀 INICJACJA PROCEDURY NAPRAWCZEJ 'THE SIXTH AGENT'..." -ForegroundColor Cyan

# --- 1. CZYSZCZENIE ZALEŻNOŚCI (Architect & Security) ---
Write-Host "1/5 Usuwanie bloatware (styled-components)..." -ForegroundColor Yellow
npm uninstall styled-components
# Opcjonalnie: upewniamy się, że nie ma śmieci w package.json ręcznie, ale npm uninstall powinno wystarczyć.

# --- 2. KONFIGURACJA SANITY LIVE (Speedster) ---
# Nadpisujemy app/page.tsx, aby używał sanityFetch (Live Content)
Write-Host "2/5 Wdrażanie Sanity Live w app/page.tsx..." -ForegroundColor Green
$pageContent = @'
import React from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { Database, Zap, BrainCircuit, Terminal, ChevronRight } from "lucide-react";

// Definicja typu (Dla świętego spokoju TypeScripta)
interface Project {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  repoLink?: string;
  tags?: string[];
  color?: string;
}

// Funkcja pomocnicza do ikon
const getIcon = (title: string) => {
  const t = title?.toUpperCase() || "";
  if (t.includes("LITE")) return Zap;
  if (t.includes("REGIS")) return Database;
  return BrainCircuit;
};

export default async function Home() {
  // Sprawdzenie zmiennych środowiskowych (Security approved)
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 font-mono">
        CRITICAL ERROR: MISSING PROJECT ID
      </div>
    );
  }

  // Pobieranie danych z Live API
  const query = `*[_type == "project"] | order(_createdAt asc) {
    _id, title, subtitle, description, repoLink, tags, color
  }`;

  // Domyślna pusta tablica w razie błędu
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
            {isConfigured ? "Artifacts Loaded." : "WAITING FOR CMS DATA..."}
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
        {projects.map((project) => {
          const Icon = getIcon(project.title);
          return (
            <div key={project._id} className="group relative bg-emerald-950/20 border border-emerald-900 rounded-2xl p-8 hover:border-emerald-500/50 transition-all flex flex-col mb-8">
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
                  {project.tags?.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-[10px] uppercase border border-emerald-800/30 rounded text-emerald-500 bg-emerald-950/30">
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

      <footer className="border-t border-emerald-900/30 py-12 text-center bg-black/80 backdrop-blur-md mt-20">
        <p className="font-mono text-emerald-800 text-xs">© 2025 EPS AI SOLUTIONS. SYSTEM STABLE.</p>
      </footer>
    </main>
  );
}
'@
Set-Content -Path "app\page.tsx" -Value $pageContent -Encoding UTF8

# --- 3. AKTUALIZACJA LAYOUTU (Speedster) ---
# Dodajemy <SanityLive /> do layoutu
Write-Host "3/5 Wstrzykiwanie SanityLive do app/layout.tsx..." -ForegroundColor Green
$layoutContent = @'
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
        <SanityLive />
      </body>
    </html>
  );
}
'@
Set-Content -Path "app\layout.tsx" -Value $layoutContent -Encoding UTF8

# --- 4. NAPRAWA STYLÓW (Architekt) ---
# Czysty Tailwind 4 w globals.css
Write-Host "4/5 Standaryzacja app/globals.css (Tailwind v4)..." -ForegroundColor Green
$cssContent = @'
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-serif);
  
  --color-background: #020617;
  --color-foreground: #ecfdf5;
  
  --animate-pulse-slow: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Scrollbar Hack */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #022c22; }
::-webkit-scrollbar-thumb { background: #10b981; border-radius: 4px; }

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  overflow-x: hidden;
}
'@
Set-Content -Path "app\globals.css" -Value $cssContent -Encoding UTF8

# --- 5. NAPRAWA FAVICON (Jester) ---
# Generujemy prosty zielony kwadrat w Base64 jako PNG, bo tamten plik tekstowy to była zbrodnia.
Write-Host "5/5 Generowanie nowej favicony (Jester approved)..." -ForegroundColor Magenta
$base64Icon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkElEQVR42mNkQAPb12/+z8gABUwM6AALiBQDQ0F26v/CjBT/48qT/s8vT2KAgq3rN/0vzkz9X5KR8j+uLPF/XFkCAxRkJv8vy0r7H1+e/D+2LIFBTE8ZSHNwQcz/wQUx/31zIv97Zkf8d08P/++WEfbfITXkv3VyyH+rpJD/Fokh/w0Tg/8bJAT9148L+q8bE/hfKyrob4Wg338Ff7//cn5+/2W8ff9LeHv/F/Dw/M/v6fWf193rP4eb5392F7f/LC6u/xmcXP/ZnF3+WZ1d/lmcnP9ZnJz/WZxD/lucnP9ZnJz/WZxc/1mcXP9ZnV3+WZ1d/tmcXf7ZXVz/c7h5/ed19/rP7+n1X8DD87+Et/d/GW/f/3J+fv8V/P3+axUE/taMCvxvEB/03zAxiEFO2H+7lJD/LukR/90ywv57Zkf8982J/B9cEPO/IDPlf0FGyv+CjJT/BRkp/wsyUv4XZKT8L8hI+V+QkfK/ICP1f0FG6v/CzNT/xZmp/0syUv6XZKT8L8lI/V+Skfo/vzzpf3550v/48iSgYQCtmk7q8X3OowAAAABJRU5ErkJggg=="
$iconBytes = [Convert]::FromBase64String($base64Icon)
[IO.File]::WriteAllBytes("$PWD\app\favicon.ico", $iconBytes)

Write-Host "------------------------------------------------" -ForegroundColor Cyan
Write-Host "✅ SYSTEM STABLE. AGENTS STANDING DOWN." -ForegroundColor Green
Write-Host "👉 Uruchom 'npm run dev', aby zobaczyć zmiany w czasie rzeczywistym." -ForegroundColor Yellow