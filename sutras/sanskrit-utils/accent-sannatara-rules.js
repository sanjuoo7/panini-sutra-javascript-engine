/**
 * Sannatara Accent Rules (Sutra 1.2.40)
 *
 * Provides detection and (optionally) rendering support for the "sannatara" accent
 * which substitutes an anudātta vowel immediately preceding an udātta or svarita vowel.
 *
 * Initial scaffold: detection + metadata only. Rendering is optional and can be
 * configured later; by default we keep the surface form unchanged and supply
 * accent metadata for downstream consumers (prosody aggregation, display layers).
 */
import { analyzeVowelAccent, ACCENT_TYPES } from './accent-analysis.js';
import { detectScript } from './index.js';

/** Lightweight vowel tokenization: naive split per code point (improve later if needed) */
function splitToGraphemes(text){
  if(!text) return [];
  // Combine base letter + following combining diacritics (accent marks) as one grapheme
  const regex = /(\P{M}\p{M}*)/gu; // base (non-mark) + marks
  const out = [];
  let m;
  while((m = regex.exec(text))!==null){
    out.push(m[1]);
  }
  return out.length ? out : Array.from(text);
}

/**
 * Finds indices where sannatara applies: anudātta vowel immediately followed by udātta or svarita.
 * Returns positions (index of the anudātta to be reclassified) with basic analysis.
 */
export function findSannataraTargets(text, options = {}) {
  if (!text || typeof text !== 'string') {
    return { input: text, indices: [], error: 'Invalid input', applies: false };
  }
  const script = options.script || detectScript(text);
  const chars = splitToGraphemes(text);
  const indices = [];
  for (let i = 0; i < chars.length - 1; i++) {
    const a = analyzeVowelAccent(chars[i], { script, strict: false });
    const b = analyzeVowelAccent(chars[i+1], { script, strict: false });
    if (a.isValid && b.isValid && a.accentType === ACCENT_TYPES.ANUDATTA && (b.accentType === ACCENT_TYPES.UDATTA || b.accentType === ACCENT_TYPES.SVARITA)) {
      indices.push(i);
    }
  }
  return {
    input: text,
    script,
    indices,
    applies: indices.length > 0,
    count: indices.length,
    reasoning: indices.length ? '1.2.40 conditions met for indices' : 'No anudātta followed by udātta/svarita'
  };
}

/** Optional placeholder renderer mapping (currently no visual change). */
function renderSannataraChar(baseChar, script){
  // Future: provide dedicated diacritic if decided. For now return baseChar unchanged.
  return baseChar;
}

/**
 * Applies sannatara substitution logically. By default does not alter text; supplies metadata.
 * options.render: if true, attempts to visually distinguish sannatara (currently no-op).
 */
export function applySannataraSubstitution(text, options = {}) {
  const detection = findSannataraTargets(text, options);
  if (!detection.applies || detection.indices.length === 0) {
    return { ...detection, original: text, transformed: text, metadata: [] };
  }
  const script = detection.script;
  const chars = splitToGraphemes(text);
  const metadata = [];
  detection.indices.forEach(idx => {
    const originalChar = chars[idx];
    const rendered = options.render ? renderSannataraChar(originalChar, script) : originalChar;
    chars[idx] = rendered; // currently identical
    metadata.push({ index: idx, original: originalChar, accentFrom: ACCENT_TYPES.ANUDATTA, accentTo: ACCENT_TYPES.SANNATARA });
  });
  return {
    ...detection,
    original: text,
    transformed: chars.join(''),
    metadata,
    appliedSutra: '1.2.40'
  };
}

export default {
  findSannataraTargets,
  applySannataraSubstitution
};
