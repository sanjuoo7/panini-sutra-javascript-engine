#!/usr/bin/env node

/**
 * AI-Collaborative Sutra Processor
 * Works with AI to implement high-quality sutras following workflow.yaml
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load workflow
function loadWorkflow() {
  const workflowPath = path.join(__dirname, 'workflow.yaml');
  return yaml.load(fs.readFileSync(workflowPath, 'utf8'));
}

// Load sutras data
function loadSutrasData() {
  const sutrasPath = path.join(__dirname, 'sutras', 'enhanced-panini-sutras.json');
  const data = fs.readFileSync(sutrasPath, 'utf8');
  return JSON.parse(data);
}

// Find implemented sutras
function findImplementedSutras() {
  const sutrasDir = path.join(__dirname, 'sutras');
  if (!fs.existsSync(sutrasDir)) return new Set();
  
  const implemented = new Set();
  const entries = fs.readdirSync(sutrasDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && /^\d+\.\d+\.\d+$/.test(entry.name)) {
      const indexPath = path.join(sutrasDir, entry.name, 'index.js');
      if (fs.existsSync(indexPath)) {
        implemented.add(entry.name);
      }
    }
  }
  
  return implemented;
}

// Generate AI implementation prompt
function generateAIImplementationPrompt(sutra, workflow) {
  const prompt = `# Implement Panini Sutra ${sutra.sutra_number}

## Sutra Details:
- **Number:** ${sutra.sutra_number}
- **Sanskrit:** ${sutra.sutra_text_devanagari}
- **IAST:** ${sutra.sutra_text_iast}
- **Type:** ${sutra.type}
- **Description:** ${sutra.description || 'Not provided'}
- **Adhyaya:** ${sutra.scope?.adhyaya || 'Unknown'}
- **Pada:** ${sutra.scope?.pada || 'Unknown'}
- **Topic:** ${sutra.scope?.topic || 'Unknown'}
- **Notes:** ${sutra.notes || 'None'}

## Instructions:
Please implement this sutra following the systematic workflow defined in our project. 

### Phase 1: Initial Setup
1. **Read Project Documentation** - Review all foundational documents
2. **Understand the sutra linguistically** - Analyze its grammatical scope and application

### Phase 2: Analysis & Design  
1. **Interpret the sutra** - Identify type, scope, conditions, transformations
2. **Check existing utilities** - Search sanskrit-utils for reusable functions
3. **Plan new utilities** - Identify if new utility functions are needed
4. **Design function signature** - Plan parameters and return type
5. **Plan comprehensive test cases** - Positive, negative, and edge cases

### Phase 3: Implementation
1. **Create sutra directory structure** under sutras/${sutra.sutra_number}/
2. **Implement any new utilities** in sanskrit-utils/ if needed
3. **Write main sutra function** in index.js using shared utilities
4. **Ensure multi-script support** (IAST and Devanagari)
5. **Add input validation** and error handling
6. **Write comprehensive test suite** in index.test.js

### Phase 4: Validation
1. **Run all tests** to ensure no regressions
2. **Check test coverage** (target >95%)

### Phase 5: Documentation
1. **Write sutra README** using SUTRA_README_TEMPLATE.md
2. **Update utilities documentation** if new utilities were added
3. **Update documentation index**

## Expected Output:
Please provide the complete implementation including:
1. **index.js** - Main sutra function with proper imports and logic
2. **index.test.js** - Comprehensive test suite 
3. **README.md** - Complete documentation following template
4. **Any new utility functions** if needed

Please work through each phase systematically and provide high-quality, linguistically accurate implementation like the example in sutras/1.2.27/.

Focus on understanding the grammatical rule deeply and implementing it with sophisticated logic, not just template code.`;

  return prompt;
}

// Main function
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'status') {
    const sutras = loadSutrasData();
    const implemented = findImplementedSutras();
    
    console.log('\n📊 **Sutra Implementation Status**');
    console.log(`Total sutras: ${sutras.length}`);
    console.log(`Implemented: ${implemented.size}`);
    console.log(`Remaining: ${sutras.length - implemented.size}`);
    
    // Find next unimplemented sutra
    const nextSutra = sutras.find(s => !implemented.has(s.sutra_number));
    if (nextSutra) {
      console.log(`\n🎯 **Next Sutra to Implement:**`);
      console.log(`- **${nextSutra.sutra_number}**: ${nextSutra.sutra_text_devanagari}`);
      console.log(`- **IAST**: ${nextSutra.sutra_text_iast}`);
      console.log(`- **Type**: ${nextSutra.type}`);
      console.log(`- **Description**: ${nextSutra.description || 'Not provided'}`);
    }
    
    return;
  }
  
  if (command === 'next') {
    const sutras = loadSutrasData();
    const implemented = findImplementedSutras();
    const workflow = loadWorkflow();
    
    // Find next unimplemented sutra
    const nextSutra = sutras.find(s => !implemented.has(s.sutra_number));
    
    if (!nextSutra) {
      console.log('🎉 All sutras have been implemented!');
      return;
    }
    
    console.log('\n🤖 **AI Implementation Request**');
    console.log('='.repeat(50));
    console.log(generateAIImplementationPrompt(nextSutra, workflow));
    console.log('='.repeat(50));
    console.log('\n📝 **Instructions:**');
    console.log('1. Copy the above prompt');
    console.log('2. Paste it to your AI assistant');
    console.log('3. The AI will implement the sutra following the workflow');
    console.log('4. Review and test the implementation');
    console.log('5. Run `node ai-collaborative-processor.js next` for the next sutra');
    
    return;
  }
  
  if (command === 'batch') {
    const batchSize = parseInt(args[1]) || 5;
    const sutras = loadSutrasData();
    const implemented = findImplementedSutras();
    const workflow = loadWorkflow();
    
    console.log(`\n🎯 **Batch Implementation Request (${batchSize} sutras)**`);
    console.log('='.repeat(60));
    
    let count = 0;
    for (const sutra of sutras) {
      if (!implemented.has(sutra.sutra_number) && count < batchSize) {
        console.log(`\n## Sutra ${count + 1}/${batchSize}: ${sutra.sutra_number}`);
        console.log(generateAIImplementationPrompt(sutra, workflow));
        console.log('\n' + '-'.repeat(40));
        count++;
      }
    }
    
    if (count === 0) {
      console.log('🎉 All sutras have been implemented!');
    } else {
      console.log('\n📝 **Instructions:**');
      console.log('1. Copy all the above prompts');
      console.log('2. Work with your AI assistant to implement each sutra');
      console.log('3. The AI will follow the workflow for each implementation');
      console.log('4. Review, test, and commit the implementations');
    }
    
    return;
  }
  
  console.log('\n🤖 **AI-Collaborative Sutra Processor**');
  console.log('\nUsage:');
  console.log('  node ai-collaborative-processor.js status   # Show implementation status');
  console.log('  node ai-collaborative-processor.js next     # Get AI prompt for next sutra');  
  console.log('  node ai-collaborative-processor.js batch N  # Get AI prompts for N sutras');
  console.log('\nExample:');
  console.log('  node ai-collaborative-processor.js next');
  console.log('  node ai-collaborative-processor.js batch 3');
}

main();