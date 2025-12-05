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

  const query = `*[_type == "project"] | order(_createdAt asc) {
    _id, title, subtitle, description, repoLink, tags, color
  }`;

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
