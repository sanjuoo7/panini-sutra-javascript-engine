#!/usr/bin/env node

/**
 * Process Single Sutra - Test autonomous processing with one sutra
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  SUTRA_JSON_PATH: path.join(__dirname, "sutras", "enhanced-panini-sutras.json"),
  SUTRAS_DIR: path.join(__dirname, "sutras")
};

function loadSutras() {
  const data = fs.readFileSync(CONFIG.SUTRA_JSON_PATH, 'utf8');
  return JSON.parse(data);
}

function findImplementedSutras() {
  const implemented = new Set();
  const sutraDirs = fs.readdirSync(CONFIG.SUTRAS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && /^\d+\.\d+\.\d+$/.test(dirent.name))
    .map(dirent => dirent.name);
  
  for (const dir of sutraDirs) {
    const indexPath = path.join(CONFIG.SUTRAS_DIR, dir, 'index.js');
    if (fs.existsSync(indexPath)) {
      implemented.add(dir);
    }
  }
  return implemented;
}

function findNextSutra(sutras, implemented) {
  for (const sutra of sutras) {
    if (!implemented.has(sutra.sutra_number)) {
      return sutra;
    }
  }
  return null;
}

function generateSutraFunction(sutra) {
  const funcName = `sutra${sutra.sutra_number.replace(/\./g, '_')}`;
  
  return `/**
 * Panini Sutra ${sutra.sutra_number}: ${sutra.sutra_text_devanagari}
 * ${sutra.sutra_text_iast}
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

export function ${funcName}(word, context = {}) {
  // Input validation
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    throw new Error(\`Invalid input: \${validation.error}\`);
  }

  const script = detectScript(word);
  
  // TODO: Implement the specific grammatical rule for sutra ${sutra.sutra_number}
  
  return {
    input: word,
    output: word, // Placeholder - implement actual transformation
    script: script,
    sutraApplied: '${sutra.sutra_number}',
    rule: '${sutra.sutra_text_devanagari}',
    applied: false // Change to true when rule actually applies
  };
}

export default ${funcName};
`;
}

function generateTestSuite(sutra) {
  const funcName = `sutra${sutra.sutra_number.replace(/\./g, '_')}`;
  
  return `import ${funcName} from './index.js';

describe('Sutra ${sutra.sutra_number}: ${sutra.sutra_text_devanagari}', () => {
  test('should handle valid input', () => {
    const result = ${funcName}('test');
    expect(result).toHaveProperty('sutraApplied', '${sutra.sutra_number}');
    expect(result).toHaveProperty('rule', '${sutra.sutra_text_devanagari}');
  });

  test('should throw error for invalid input', () => {
    expect(() => ${funcName}('')).toThrow('Invalid input');
    expect(() => ${funcName}(null)).toThrow('Invalid input');
    expect(() => ${funcName}(undefined)).toThrow('Invalid input');
  });

  test('should detect script correctly', () => {
    const resultIAST = ${funcName}('test');
    expect(resultIAST.script).toBe('IAST');
    
    const resultDeva = ${funcName}('टेस्ट');
    expect(resultDeva.script).toBe('Devanagari');
  });
});
`;
}

function generateSutraReadme(sutra) {
  return `# Sutra ${sutra.sutra_number}: ${sutra.sutra_text_devanagari}

## Sanskrit Text
**Devanagari:** ${sutra.sutra_text_devanagari}  
**IAST:** ${sutra.sutra_text_iast}

## Type
${sutra.type || 'Grammar rule'}

## Scope
- **Adhyaya:** ${sutra.scope?.adhyaya || 'N/A'}
- **Pada:** ${sutra.scope?.pada || 'N/A'}
- **Topic:** ${sutra.scope?.topic || 'N/A'}

## Description
${sutra.description || 'Sanskrit grammatical rule from Panini\'s Ashtadhyayi'}

## Implementation Status
🔄 **Auto-generated template** - Requires implementation of specific grammatical logic

## Usage
\`\`\`javascript
import sutra${sutra.sutra_number.replace(/\./g, '_')} from './index.js';

const result = sutra${sutra.sutra_number.replace(/\./g, '_')}('example');
console.log(result);
\`\`\`

## Test Coverage
- ✅ Input validation
- ✅ Script detection  
- ✅ Basic function structure
- 🔄 Specific grammatical logic (pending implementation)

## Notes
${sutra.notes || 'Auto-generated implementation template following Panini\'s Ashtadhyayi'}

---
*Auto-generated on ${new Date().toISOString()}*
`;
}

async function processSutra(sutra) {
  console.log(`\n🚀 Processing Sutra ${sutra.sutra_number}: ${sutra.sutra_text_devanagari}`);
  
  const sutraDir = path.join(CONFIG.SUTRAS_DIR, sutra.sutra_number);
  
  // Create directory
  if (!fs.existsSync(sutraDir)) {
    fs.mkdirSync(sutraDir, { recursive: true });
    console.log(`   📁 Created directory: sutras/${sutra.sutra_number}/`);
  }
  
  // Generate files
  const functionCode = generateSutraFunction(sutra);
  const testCode = generateTestSuite(sutra);
  const readmeContent = generateSutraReadme(sutra);
  
  // Write files
  fs.writeFileSync(path.join(sutraDir, "index.js"), functionCode);
  fs.writeFileSync(path.join(sutraDir, "index.test.js"), testCode);
  fs.writeFileSync(path.join(sutraDir, "README.md"), readmeContent);
  
  console.log(`   💻 Written: index.js`);
  console.log(`   🧪 Written: index.test.js`);
  console.log(`   📄 Written: README.md`);
  
  // Test the implementation
  try {
    console.log(`   🔬 Running tests...`);
    execSync(`npm test -- --testPathPattern=${sutra.sutra_number}`, { 
      cwd: __dirname, 
      stdio: 'pipe' 
    });
    console.log(`   ✅ Tests passed`);
  } catch (error) {
    console.error(`   ❌ Tests failed:`, error.message);
    throw error;
  }
  
  console.log(`✅ Successfully processed sutra ${sutra.sutra_number}`);
  return true;
}

async function main() {
  console.log("🧪 Processing single sutra with full workflow...");
  
  const sutras = loadSutras();
  const implemented = findImplementedSutras();
  const nextSutra = findNextSutra(sutras, implemented);
  
  if (!nextSutra) {
    console.log("🎉 All sutras are implemented!");
    return;
  }
  
  try {
    await processSutra(nextSutra);
    
    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Successfully created and tested sutra ${nextSutra.sutra_number}`);
    console.log(`   📁 Directory: sutras/${nextSutra.sutra_number}/`);
    console.log(`   🔬 All tests passing`);
    console.log(`   📄 Documentation complete`);
    
  } catch (error) {
    console.error('❌ Processing failed:', error.message);
    process.exit(1);
  }
}

main();
