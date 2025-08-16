/**
 * Sutra 1.3.66: भुजोऽनवने
 * Type: Ātmanepada designation (vidhi)
 * Rule: After भुज्, Ātmanepada is used, except in the sense of protecting (“avāna/avana” → protect/defend).
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1366(word, context = {}) {
  if (!word || typeof word !== 'string' || !word.trim()) return no('Invalid input');
  const clean = word.trim();
  if (!validateSanskritWord(clean)) return no('Invalid Sanskrit word');
  const script = detectScript(clean);
  if (script === 'Unknown') return no('Unknown script');

  const isBhuj = /(भुज्?|bhuj)/i.test(String(context.root||''));
  if (!isBhuj) return no('Root भुज् not detected');

  const meaning = String(context.meaning||context.semantic||'').toLowerCase();
  const protectSense = /(protect|guard|defend|rakṣ|रक्ष|अवने)/i.test(meaning);
  if (protectSense) return { applies:false, isAtmanepada:false, confidence:0.6, reason:'Excluded in protect/guard sense', sutraApplied:'1.3.66', details:{ protectSense } };

  return { applies: true, isAtmanepada: true, confidence: 0.78, reason: 'भुज् except protection sense', sutraApplied: '1.3.66', details: {} };
}

function no(reason){ return { applies:false, isAtmanepada:false, confidence:0.4, reason, sutraApplied:'1.3.66', details:{} }; }

export default sutra1366;
