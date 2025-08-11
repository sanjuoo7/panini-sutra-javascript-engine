#!/usr/bin/env node

/**
 * Test Single Sutra - Process just one sutra for testing
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

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

import { detectScript, validateInput } from '../sanskrit-utils/index.js';

export function ${funcName}(word, context = {}) {
  if (!validateInput(word)) {
    throw new Error('Invalid input: word must be a non-empty string');
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
  });

  test('should detect script correctly', () => {
    const resultIAST = ${funcName}('test');
    expect(resultIAST.script).toBe('iast');
    
    const resultDeva = ${funcName}('टेस्ट');
    expect(resultDeva.script).toBe('devanagari');
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
${sutra.notes || 'Auto-generated implementation template'}

---
*Auto-generated on ${new Date().toISOString()}*
`;
}

async function processSingleSutra() {
  console.log("🧪 Testing single sutra processing...");
  
  const sutras = loadSutras();
  const implemented = findImplementedSutras();
  const nextSutra = findNextSutra(sutras, implemented);
  
  if (!nextSutra) {
    console.log("🎉 All sutras are already implemented!");
    return;
  }
  
  console.log(`🎯 Processing: ${nextSutra.sutra_number} - ${nextSutra.sutra_text_devanagari}`);
  
  const sutraDir = path.join(CONFIG.SUTRAS_DIR, nextSutra.sutra_number);
  
  // Create directory
  if (!fs.existsSync(sutraDir)) {
    fs.mkdirSync(sutraDir, { recursive: true });
    console.log(`📁 Created directory: sutras/${nextSutra.sutra_number}/`);
  }
  
  // Generate and write files
  const functionCode = generateSutraFunction(nextSutra);
  const testCode = generateTestSuite(nextSutra);
  const readmeContent = generateSutraReadme(nextSutra);
  
  fs.writeFileSync(path.join(sutraDir, "index.js"), functionCode);
  fs.writeFileSync(path.join(sutraDir, "index.test.js"), testCode);
  fs.writeFileSync(path.join(sutraDir, "README.md"), readmeContent);
  
  console.log(`💻 Written: index.js`);
  console.log(`🧪 Written: index.test.js`);
  console.log(`📄 Written: README.md`);
  
  console.log(`✅ Successfully created sutra ${nextSutra.sutra_number}`);
  
  // Show what was created
  console.log(`\n📊 Summary:`);
  console.log(`   Sutra: ${nextSutra.sutra_number}`);
  console.log(`   Sanskrit: ${nextSutra.sutra_text_devanagari}`);
  console.log(`   IAST: ${nextSutra.sutra_text_iast}`);
  console.log(`   Type: ${nextSutra.type}`);
  console.log(`   Directory: sutras/${nextSutra.sutra_number}/`);
}

processSingleSutra().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
