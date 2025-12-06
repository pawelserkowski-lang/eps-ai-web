import React from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { Hero } from "@/components/modules/hero/Hero";
import { ProjectList } from "@/components/modules/projects/ProjectList";
import { type Project } from "@/types";
// IMPORT LOGGERA
import { logger, logError } from "@/lib/logger";

export default async function Home() {
  // Logowanie systemowe na starcie
  logger.info({ event: 'page_render', page: 'Home' }, 'Rendering Home Page started');

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    // Logowanie błędu krytycznego (z kontekstem)
    logger.fatal({ missingVar: 'NEXT_PUBLIC_SANITY_PROJECT_ID' }, 'Critical configuration missing');
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 font-mono">
        CRITICAL ERROR: MISSING PROJECT ID.
      </div>
    );
  }

  const query = `*[_type == "project"] | order(_createdAt asc) {
    _id, title, subtitle, description, repoLink, tags, color, iconType, image
  }`;

  let projects: Project[] = [];
  
  try {
    // Logowanie przed zewnętrznym wywołaniem (pomaga w debugowaniu timeoutów)
    logger.debug({ query }, 'Executing Sanity Query');
    
    const result = await sanityFetch({ query });
    projects = (result.data as Project[]) || [];
    
    // Logowanie sukcesu z metadanymi (nie logujemy całej tablicy, tylko liczbę!)
    logger.info({ count: projects.length }, 'Successfully fetched projects');
    
  } catch (error) {
    // Użycie naszego helpera do błędów
    logError(error, 'Home.sanityFetch');
    
    // Fallback UI jest obsłużony przez pustą tablicę, ale błąd jest w logach
  }

  // ... reszta komponentu (JSX)
}