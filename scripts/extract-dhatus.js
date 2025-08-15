#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

const excelPath = path.resolve('data/raw/Panini-dhatu-index1.xlsx');
if(!fs.existsSync(excelPath)){
  console.error('Dhātu Excel file not found at', excelPath);
  process.exit(1);
}

const wb = xlsx.readFile(excelPath);
// Assumption: Sheet 2 (index 1) contains transliterated roots; Sheet 1 (index 0) Devanagari; sheet 3 ignored.
const translitSheet = wb.SheetNames[1];
const sheet = wb.Sheets[translitSheet];
const rows = xlsx.utils.sheet_to_json(sheet, { header:1, blankrows:false });

// Heuristics: collect non-empty cell values that look like Sanskrit transliteration (letters + diacritics)
const dhatuSet = new Set();
const translitPattern = /^[a-zāīūṛṝḷḹṅñṭḍṇśṣḥṃ'’ -]+$/u;
rows.forEach(row => {
  row.forEach(cell => {
    if(typeof cell === 'string'){
      const trimmed = cell.trim();
      if(trimmed && translitPattern.test(trimmed) && trimmed.length < 15){
        // Remove spaces/hyphens inside base root listings if present
        const normalized = trimmed.replace(/\s+/g,'').replace(/-/g,'');
        // Exclude obvious headers
        if(!/^(root|dhatu|verbal|panini)$/i.test(normalized)){
          dhatuSet.add(normalized);
        }
      }
    }
  });
});

const sorted = Array.from(dhatuSet).sort();
const outObj = {
  source: 'Panini-dhatu-index1.xlsx',
  sheet: translitSheet,
  count: sorted.length,
  generated: new Date().toISOString(),
  encoding: 'IAST',
  roots: sorted
};

const outPath = path.resolve('data/processed/dhatus-full.json');
fs.writeFileSync(outPath, JSON.stringify(outObj, null, 2), 'utf8');
console.log('Extracted', sorted.length, 'roots to', outPath);
