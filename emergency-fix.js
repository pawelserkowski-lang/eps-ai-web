const fs = require('fs');
const path = require('path');

// 1. Fix app/layout.tsx
const layoutPath = path.join('app', 'layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = layoutContent.replace(
  /className={\\ \\ font-sans antialiased\\}/g, 
  'className={`${inter.variable} ${maguntia.variable} font-sans antialiased`}'
);
fs.writeFileSync(layoutPath, layoutContent);
console.log('Fixed app/layout.tsx');

// 2. Fix app/components/ProjectList.tsx
const projectListPath = path.join('app', 'components', 'ProjectList.tsx');
let projectListContent = fs.readFileSync(projectListPath, 'utf8');
// Fix div className
projectListContent = projectListContent.replace(
  /className={\\ bsolute inset-0 bg-gradient-to-br \\ opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl\\}/g,
  'className={`absolute inset-0 bg-gradient-to-br ${project.color || "from-emerald-900 to-black"} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}'
);
fs.writeFileSync(projectListPath, projectListContent);
console.log('Fixed app/components/ProjectList.tsx');

// 3. Delete redundant schema file
const redundantSchemaPath = path.join('sanity', 'schema.ts');
if (fs.existsSync(redundantSchemaPath)) {
    fs.unlinkSync(redundantSchemaPath);
    console.log('Deleted redundant sanity/schema.ts');
}

console.log('Jester has cleaned up the mess. You are welcome.');