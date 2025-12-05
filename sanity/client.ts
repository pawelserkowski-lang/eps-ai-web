import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // Teraz korzysta ze stałej z env.ts, zamiast hardcodowanego stringa
  useCdn: true, // Włączone dla wydajności (zwraca cache'owane dane)
});