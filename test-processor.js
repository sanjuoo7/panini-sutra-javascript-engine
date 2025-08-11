#!/usr/bin/env node

/**
 * Simple Test for Autonomous Sutra Processor
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple test
console.log("🔍 Testing autonomous processor components...");

// Test 1: Load sutras
console.log("\n1. Loading sutras...");
try {
  const sutraPath = path.join(__dirname, "sutras", "enhanced-panini-sutras.json");
  const data = fs.readFileSync(sutraPath, 'utf8');
  const sutras = JSON.parse(data);
  console.log(`✅ Loaded ${sutras.length} sutras`);
  console.log(`   First: ${sutras[0].sutra_number} - ${sutras[0].sutra_text_devanagari}`);
} catch (error) {
  console.error("❌ Failed to load sutras:", error.message);
}

// Test 2: Find implemented sutras
console.log("\n2. Scanning implemented sutras...");
try {
  const sutrasDir = path.join(__dirname, "sutras");
  const sutraDirs = fs.readdirSync(sutrasDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && /^\d+\.\d+\.\d+$/.test(dirent.name))
    .map(dirent => dirent.name);
  
  const implemented = [];
  for (const dir of sutraDirs) {
    const indexPath = path.join(sutrasDir, dir, 'index.js');
    if (fs.existsSync(indexPath)) {
      implemented.push(dir);
    }
  }
  
  console.log(`✅ Found ${implemented.length} implemented sutras`);
  console.log(`   Examples: ${implemented.slice(0, 5).join(', ')}`);
} catch (error) {
  console.error("❌ Failed to scan implementations:", error.message);
}

// Test 3: Find next sutra
console.log("\n3. Finding next unimplemented sutra...");
try {
  const sutraPath = path.join(__dirname, "sutras", "enhanced-panini-sutras.json");
  const data = fs.readFileSync(sutraPath, 'utf8');
  const sutras = JSON.parse(data);
  
  const sutrasDir = path.join(__dirname, "sutras");
  const implemented = new Set();
  
  const sutraDirs = fs.readdirSync(sutrasDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && /^\d+\.\d+\.\d+$/.test(dirent.name))
    .map(dirent => dirent.name);
  
  for (const dir of sutraDirs) {
    const indexPath = path.join(sutrasDir, dir, 'index.js');
    if (fs.existsSync(indexPath)) {
      implemented.add(dir);
    }
  }
  
  // Find first unimplemented
  for (const sutra of sutras) {
    if (!implemented.has(sutra.sutra_number)) {
      console.log(`✅ Next sutra: ${sutra.sutra_number} - ${sutra.sutra_text_devanagari}`);
      break;
    }
  }
  
} catch (error) {
  console.error("❌ Failed to find next sutra:", error.message);
}

console.log("\n✅ All tests completed!");
