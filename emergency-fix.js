const fs = require('fs');
const path = require('path');

console.log('🤖 INICJACJA PROCEDURY NAPRAWCZEJ EPS-AI...');

// Helper do bezpiecznego zapisu
function safeWrite(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Naprawiono: ${filePath}`);
    } catch (e) {
        console.error(`❌ Błąd zapisu ${filePath}:`, e.message);
    }
}

// 1. NAPRAWA: app/layout.tsx
// Problem: Zepsute className z backslashami
const layoutPath = path.join('app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8');
    // Naprawiamy błędne escapowanie w className
    content = content.replace(
        /className={\\+ \\+ font-sans antialiased\\+}/g,
        'className={`${inter.variable} ${maguntia.variable} font-sans antialiased`}'
    );
    // Fallback dla innych permutacji błędów
    content = content.replace(/className={.*font-sans antialiased.*}/g, 'className={`${inter.variable} ${maguntia.variable} font-sans antialiased`}');
    
    safeWrite(layoutPath, content);
}

// 2. NAPRAWA: app/components/ProjectList.tsx
// Problem: Zepsute template literals i classy
const projectListPath = path.join('app', 'components', 'ProjectList.tsx');
if (fs.existsSync(projectListPath)) {
    let content = fs.readFileSync(projectListPath, 'utf8');
    
    // Naprawa diva z gradientem
    const fixedDiv = `
            <div className={\`absolute inset-0 bg-gradient-to-br \${project.color || "from-emerald-900 to-black"} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl\`} />`;
    
    content = content.replace(/<div className={\\ bsolute.*?rounded-2xl\\} \/>/bs, fixedDiv);
    // Regex może być trudny na zepsutym pliku, nadpiszmy fragment "na sztywno" jeśli regex nie chwyci, 
    // ale spróbujmy prostej zamiany stringów, która jest bezpieczniejsza.
    
    // Usuwanie błędnych backslashy w całym pliku (ostrożnie)
    content = content.replace(/{\\ bsolute/g, '{`absolute');
    content = content.replace(/rounded-2xl\\}/g, 'rounded-2xl`}');
    
    safeWrite(projectListPath, content);
}

// 3. NAPRAWA: app/page.tsx
// Problem: Backslashe w zapytaniu GROQ
const pagePath = path.join('app', 'page.tsx');
if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Naprawa definicji query
    content = content.replace(/const query = \\\*\[/g, 'const query = `*[');
    content = content.replace(/}\\;/g, '}`;');
    
    safeWrite(pagePath, content);
}

// 4. CZYSZCZENIE: Usunięcie zbędnego sanity/schema.ts
const badSchemaPath = path.join('sanity', 'schema.ts');
if (fs.existsSync(badSchemaPath)) {
    try {
        fs.unlinkSync(badSchemaPath);
        console.log('🗑️ Usunięto zbędny plik: sanity/schema.ts (konfliktował z sanity/schema/index.ts)');
    } catch (e) {
        console.error('Błąd usuwania pliku:', e);
    }
}

// 5. UPEWNIENIE SIĘ: sanity/schema/index.ts
// Upewniamy się, że eksportuje 'schema' a nie co innego
const schemaIndexPath = path.join('sanity', 'schema', 'index.ts');
if (fs.existsSync(schemaIndexPath)) {
    let content = fs.readFileSync(schemaIndexPath, 'utf8');
    if (!content.includes('export const schema')) {
        content = `import { projectType } from './project'

export const schema = {
  types: [projectType],
}
`;
        safeWrite(schemaIndexPath, content);
    }
}

console.log('🏁 Procedura zakończona. Spróbuj uruchomić: npm run dev');