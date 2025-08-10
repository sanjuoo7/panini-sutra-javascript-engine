/**
 * Script Detection Utilities
 * 
 * This module provides script detection and validation functions:
 * - Detect IAST, Devanagari, Mixed, or Unknown scripts
 * - Script-specific validation
 * - Character set utilities
 * 
 * Created: August 8, 2025
 */

/**
 * Regular expressions for script detection
 */
const SCRIPT_PATTERNS = {
  devanagari: /[\u0900-\u097F]/,
  iastDiacritics: /[āīūṛṝḷḹṅñṭḍṇśṣḥṃ]/,
  basicLatin: /^[a-zA-Z\s]+$/
};

/**
 * Detects the script of the given text
 * @param {string} text - Text to analyze
 * @returns {'IAST'|'Devanagari'|'Mixed'|'Unknown'} - Detected script
 */
export function detectScript(text) {
  if (!text || typeof text !== 'string') return 'Unknown';
  
  const hasDevanagari = SCRIPT_PATTERNS.devanagari.test(text);
  const hasIAST = SCRIPT_PATTERNS.iastDiacritics.test(text);
  
  if (hasDevanagari && hasIAST) return 'Mixed';
  if (hasDevanagari) return 'Devanagari';
  if (hasIAST) return 'IAST';
  
  // If no special characters, assume IAST for basic Latin characters
  return SCRIPT_PATTERNS.basicLatin.test(text) ? 'IAST' : 'Unknown';
}

/**
 * Checks if text is in Devanagari script
 * @param {string} text - Text to check
 * @returns {boolean} - True if Devanagari
 */
export function isDevanagari(text) {
  return detectScript(text) === 'Devanagari';
}

/**
 * Checks if text is in IAST script
 * @param {string} text - Text to check
 * @returns {boolean} - True if IAST
 */
export function isIAST(text) {
  return detectScript(text) === 'IAST';
}

/**
 * Checks if text contains mixed scripts
 * @param {string} text - Text to check
 * @returns {boolean} - True if mixed scripts
 */
export function isMixedScript(text) {
  return detectScript(text) === 'Mixed';
}

/**
 * Gets detailed script analysis of text
 * @param {string} text - Text to analyze
 * @returns {Object} - Detailed script information
 */
export function analyzeScript(text) {
  if (!text || typeof text !== 'string') {
    return {
      script: 'Unknown',
      hasDevanagari: false,
      hasIAST: false,
      hasBasicLatin: false,
      confidence: 0
    };
  }

  const hasDevanagari = SCRIPT_PATTERNS.devanagari.test(text);
  const hasIAST = SCRIPT_PATTERNS.iastDiacritics.test(text);
  const hasBasicLatin = SCRIPT_PATTERNS.basicLatin.test(text);
  
  const script = detectScript(text);
  
  // Calculate confidence based on script-specific character density
  let confidence = 0;
  if (script === 'Devanagari') {
    const devanagariChars = (text.match(SCRIPT_PATTERNS.devanagari) || []).length;
    confidence = Math.min(devanagariChars / text.length, 1.0);
  } else if (script === 'IAST') {
    const iastChars = (text.match(SCRIPT_PATTERNS.iastDiacritics) || []).length;
    confidence = iastChars > 0 ? Math.min((iastChars + text.match(/[a-zA-Z]/)?.length || 0) / text.length, 1.0) : 0.8;
  }

  return {
    script,
    hasDevanagari,
    hasIAST,
    hasBasicLatin,
    confidence,
    length: text.length,
    analysis: `Text is primarily ${script} script with ${Math.round(confidence * 100)}% confidence`
  };
}
