import { projectType } from './project'

// Zmieniamy nazwę eksportu na 'schema', bo tego szuka sanity.config.ts
export const schema = {
  types: [projectType],
}