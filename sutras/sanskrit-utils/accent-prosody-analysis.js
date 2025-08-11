/**
 * Accent Prosody Analysis Utilities
 * 
 * Provides higher-level prosodic interpretations building on basic accent classification.
 * Implements decomposition of svarita (1.2.32) and ekashruti monotone rule (1.2.33).
 */
import { detectScript, isVowel } from './index.js';
import { analyzeVowelAccent, ACCENT_TYPES, ACCENT_MARKERS } from './accent-analysis.js';

/** Duration units mapping (based on 1.2.27 hrasva=1, dirgha=2, pluta=3) */
const VOWEL_DURATION_UNITS = {
  // IAST & Devanagari short vowels
  short: new Set(['a','i','u','ṛ','ḷ','अ','इ','उ','ऋ','ऌ']),
  long: new Set(['ā','ī','ū','ṝ','ḹ','आ','ई','ऊ','ॠ','ॡ']),
  // e, o are historically long but metrically behave as 2 units
  inherentlyLong: new Set(['e','o','ए','ओ'])
};

function getDurationUnits(vowel) {
  if (VOWEL_DURATION_UNITS.short.has(vowel)) return 1;
  if (VOWEL_DURATION_UNITS.long.has(vowel) || VOWEL_DURATION_UNITS.inherentlyLong.has(vowel)) return 2;
  // Fallback for unknown: assume 1
  return 1;
}

/**
 * Decomposes a svarita vowel into udātta-initial + anudātta-fall segments per 1.2.32.
 * First half of a hrasva (0.5 unit) is udātta; remainder is fall.
 */
export function decomposeSvarita(vowel, options = {}) {
  if (!vowel || typeof vowel !== 'string') {
    return { applies: false, error: 'Invalid input' };
  }
  const script = options.script || detectScript(vowel);
  const accent = analyzeVowelAccent(vowel, { script, strict: !!options.strict });
  if (!accent.isValid || accent.accentType !== ACCENT_TYPES.SVARITA) {
    return { applies: false, reason: 'Not svarita', input: vowel };
  }
  const base = accent.baseVowel;
  if (!isVowel(base)) {
    return { applies: false, reason: 'Base not vowel', input: vowel };
  }
  const totalUnits = getDurationUnits(base);
  const initialUdātta = 0.5; // fixed absolute measure
  const remaining = Math.max(totalUnits - 0.5, 0);
  return {
    applies: true,
    type: 'svarita-segmentation',
    input: vowel,
    script,
    baseVowel: base,
    durationUnits: totalUnits,
    segments: [
      { role: 'udātta-initial', units: initialUdātta, proportionOfTotal: initialUdātta / totalUnits },
      { role: 'anudātta-fall', units: remaining, proportionOfTotal: totalUnits ? remaining / totalUnits : 0 }
    ],
    reasoning: 'Per 1.2.32 first half-unit udātta, remainder fall'
  };
}

/**
 * Checks whether ekashruti (monotone) applies based on context for vocative at distance (1.2.33).
 */
export function classifyEkashruti(text, context = {}) {
  if (!text || typeof text !== 'string') return false;
  const isVocative = (context.case || context.vibhakti) === 'vocative';
  const distanceCategory = context.distanceCategory;
  const meters = context.distanceMeters;
  const far = distanceCategory === 'far' || (typeof meters === 'number' && meters >= (context.distanceThreshold || 10));
  return isVocative && far;
}

/** Accent flattening: strip accent marks */
function stripAccents(text, script) {
  if (!text) return text;
  // Remove known markers and combining acute/grave/circumflex
  const markers = ACCENT_MARKERS[script.toUpperCase()] || ACCENT_MARKERS.IAST;
  const pattern = new RegExp('[' + Object.values(markers).join('') + '\\u0300\\u0301\\u0302]', 'g');
  return text.normalize('NFD').replace(pattern, '').normalize('NFC');
}

/**
 * Applies ekashruti rule optionally flattening accent.
 */
export function applyEkashruti(text, context = {}, options = {}) {
  const script = detectScript(text);
  const applies = classifyEkashruti(text, context);
  if (!applies) {
    return { applies: false, ekashruti: false, original: text, transformed: text, script, reason: 'Conditions not met' };
  }
  const flatten = options.flatten !== false; // default true
  const transformed = flatten ? stripAccents(text, script) : text;
  return {
    applies: true,
    ekashruti: true,
    original: text,
    transformed,
    script,
    reason: 'Vocative at distance per 1.2.33',
    method: 'distance_vocative_rule'
  };
}
