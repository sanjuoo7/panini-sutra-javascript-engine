/**
 * Dhātu Classification Utility (Sutra 1.3.1: भूवादयो धातवः)
 * 
 * Provides identification and lightweight analysis of verbal roots.
 * Seed list kept intentionally small; designed for future expansion.
 */
import { detectScript } from './script-detection.js';
import { normalizeScript } from './transliteration.js';
import { sanitizeInput } from './validation.js';
// Dynamic import of expanded dhātu list if present (built via scripts/extract-dhatus.js)
let expandedLoaded = false;
let loadPromise = null;
async function loadExpandedDhatusAsync(){
  if(expandedLoaded) return;
  try {
    const module = await import('../../data/processed/dhatus-full.json', { assert: { type: 'json' }});
    const dataModule = module.default || module;
    if(dataModule && Array.isArray(dataModule.roots)){
      for(const r of dataModule.roots){
        if(typeof r === 'string' && r.length < 25){
          const norm = r.normalize('NFC').trim();
          if(norm) DHATU_SET.add(norm);
        }
      }
    }
  } catch(e){ /* ignore */ }
  expandedLoaded = true;
}
function loadExpandedDhatus(){
  // Fire and forget (sync path uses possible already loaded set)
  if(!expandedLoaded){
    if(!loadPromise) loadPromise = loadExpandedDhatusAsync();
    // Schedule a sync fallback if still empty after microtask queue
    queueMicrotask(() => {
      if(!expandedLoaded && DHATU_SET.size === 0){
        try {
          // Synchronous fallback read
          const fs = require('fs');
          const path = require('path');
          const p = path.resolve('data/processed/dhatus-full.json');
            if(fs.existsSync(p)){
              const raw = JSON.parse(fs.readFileSync(p,'utf8'));
              if(raw && Array.isArray(raw.roots)){
                for(const r of raw.roots){
                  if(typeof r === 'string' && r.length < 25){
                    const norm = r.normalize('NFC').trim();
                    if(norm) DHATU_SET.add(norm);
                  }
                }
              }
              expandedLoaded = true;
            }
        } catch(e){ /* ignore */ }
      }
    });
  }
}
export function ensureDhatusLoaded(){
  loadExpandedDhatus();
  return loadPromise || Promise.resolve();
}

// Root set populated lazily from extracted JSON (no hardcoded seed now)
const DHATU_SET = new Set();
// Synchronous initialization load (primary) to avoid test timing issues
try {
  const fsInit = require('fs');
  const pathInit = require('path');
  const pInit = pathInit.resolve('data/processed/dhatus-full.json');
  if(fsInit.existsSync(pInit)){
    const rawInit = JSON.parse(fsInit.readFileSync(pInit,'utf8'));
    if(rawInit && Array.isArray(rawInit.roots)){
      for(const r of rawInit.roots){
        if(typeof r === 'string' && r.length < 25){
          const norm = r.normalize('NFC').trim();
          if(norm) DHATU_SET.add(norm);
        }
      }
    }
  }
} catch(e){ /* ignore */ }

/** Normalize candidate root to canonical IAST (strip whitespace, lowercase) */
export function normalizeDhatuInput(input){
  if(typeof input !== 'string') return '';
  const sanitizedResult = sanitizeInput ? sanitizeInput(input) : input.trim();
  const sanitized = typeof sanitizedResult === 'string' ? sanitizedResult : (sanitizedResult && sanitizedResult.sanitized) ? sanitizedResult.sanitized : '';
  const iast = normalizeScript(sanitized);
  return iast.normalize('NFC').trim();
}

/** Basic heuristic to exclude obvious non-root forms */
function failsQuickHeuristics(norm){
  if(!norm) return true;
  if(/\s|\d|[-_]/.test(norm)) return true; // spaces, digits, separators
  if(norm.length < 2) return true; // single letter rarely a root (handled separately if needed)
  // Derived / inflected endings (very light initial filter)
  if(/(ti|nti|vat|tva|aka|akaḥ|akaṃ|akaḥ)$/u.test(norm)) return true;
  return false;
}

export function isKnownDhatu(form, options = {}){
  if(options.loadExpanded !== false) loadExpandedDhatus();
  const norm = normalizeDhatuInput(form);
  if(!norm || failsQuickHeuristics(norm)) return false;
  if(DHATU_SET.has(norm)) return true;
  // Heuristic: attempt inherent 'a' restoration for consonant-final transliteration (e.g., 'gm' -> 'gam')
  if(/^[kgcjṭḍtdpbmnñṅṇśṣshvyrlfv]+$/u.test(norm) && norm.length === 2){
    const candidate = norm[0] + 'a' + norm[1];
    if(DHATU_SET.has(candidate)) return true;
  }
  if(/^[a-zṃṅñṭḍśṣḥ]+$/u.test(norm) && norm.length === 3 && !/[aeiouāīūṛṝḷḹo]/u.test(norm.slice(1))){
    // Attempt insertion before last consonant
    const candidate = norm.slice(0,1) + 'a' + norm.slice(1);
    if(DHATU_SET.has(candidate)) return true;
  }
  return false;
}

export function analyzeDhatu(form, options = {}){
  if(options.loadExpanded !== false) loadExpandedDhatus();
  const script = detectScript(form || '');
  const norm = normalizeDhatuInput(form);
  let inSet = !failsQuickHeuristics(norm) && DHATU_SET.has(norm);
  let root = inSet ? norm : null;
  if(!inSet && script === 'Devanagari'){
    // Apply same inherent 'a' restoration attempts
    if(/^[kgcjṭḍtdpbmnñṅṇśṣshvyrlfv]+$/u.test(norm) && norm.length === 2){
      const candidate = norm[0] + 'a' + norm[1];
      if(DHATU_SET.has(candidate)) { inSet = true; root = candidate; }
    } else if(/^[a-zṃṅñṭḍśṣḥ]+$/u.test(norm) && norm.length === 3 && !/[aeiouāīūṛṝḷḹo]/u.test(norm.slice(1))){
      const candidate = norm.slice(0,1) + 'a' + norm.slice(1);
      if(DHATU_SET.has(candidate)) { inSet = true; root = candidate; }
    }
  }
  return {
    sutra: '1.3.1',
    input: form,
    script,
    normalized: norm || null,
    isDhatu: inSet,
    root: root,
    reason: inSet ? 'listed-root' : (norm ? 'not-in-root-set' : 'invalid-input')
  };
}

/** Future extension point: allow registration of additional dhātus */
export function registerAdditionalDhatus(list){
  if(!Array.isArray(list)) return 0;
  let added = 0;
  for(const item of list){
    const norm = normalizeDhatuInput(item);
    if(norm && !DHATU_SET.has(norm)) { DHATU_SET.add(norm); added++; }
  }
  return added;
}

export function getDhatuCount(options = {}){
  if(options.loadExpanded !== false) loadExpandedDhatus();
  return DHATU_SET.size;
}

export default { isKnownDhatu, analyzeDhatu, normalizeDhatuInput, registerAdditionalDhatus, getDhatuCount };
