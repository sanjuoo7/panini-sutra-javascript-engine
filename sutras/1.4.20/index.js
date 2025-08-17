/**
 * Sutra 1.4.20: अयस्मयादीनि च्छन्दसि (ayasmayādīni cchandasi)
 * "Words like अयस्मय etc. are valid forms in the छन्दस्।"
 * 
 * RULE TYPE: saṃjñā (technical term assignment) / अतिदेश (special permission)
 * SCOPE: भम् designation for specific words in Vedic/poetic contexts
 * CONDITIONS: Word is from अयस्मय group AND context is छन्दस् (Vedic/poetic)
 * ASSIGNMENT: Assigns भम् saṃjñा to special forms in Vedic contexts
 * 
 * @fileoverview Implementation of Panini's Sutra 1.4.20
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * अयस्मयादि group - special words that get भम् designation in छन्दस्
 */
const AYASMAYADI_WORDS = [
  'अयस्मय',    // made of iron
  'हिरण्मय',   // made of gold  
  'काष्ठमय',    // made of wood
  'मृण्मय',     // made of clay
  'लोहमय',     // made of iron/metal
  'रजतमय',     // made of silver
  'ताम्रमय',    // made of copper
  'कांस्यमय',   // made of bronze
  'स्वर्णमय',   // made of gold
  'मणिमय',     // made of gems
  'रत्नमय',     // made of jewels
  'वस्त्रमय',   // made of cloth
  'चर्ममय',     // made of leather
  'काञ्चनमय',  // made of gold
  'पार्थिवमय', // made of earth
  'वायवीयमय'   // made of air
];

/**
 * Implements Sutra 1.4.20: अयस्मयादीनि च्छन्दसि
 * Assigns भम् saṃjñā to अयस्मयादि words in Vedic/poetic contexts
 * 
 * @param {string} word - The Sanskrit word
 * @param {Object} context - Grammatical context
 * @param {boolean} [context.isChandas] - Whether context is छन्दस् (Vedic/poetic)
 * @param {string} [context.register] - Text register (vedic, classical, poetic)
 * @param {string} [context.script] - Script type override
 * @returns {Object} Analysis result with भम् designation
 */
export function sutra1420(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: word must be a non-empty string',
      confidence: 0
    };
  }

  // Detect and validate script
  const script = context.script || detectScript(word);
  const isValidWord = validateSanskritWord(word);
  
  if (!isValidWord.isValid) {
    return {
      applies: false,
      reason: `Invalid Sanskrit word: ${isValidWord.reason}`,
      confidence: 0
    };
  }

  // Check if word is from अयस्मयादि group
  const isAyasmayadi = checkAyasmayadiWord(word, script);
  
  // Check if context is छन्दस् (Vedic/poetic)
  const isChandas = checkChandasContext(context);

  // Apply the rule: अयस्मयादि word AND छन्दस् context
  const applies = isAyasmayadi && isChandas;
  
  return {
    applies,
    word,
    script,
    saṃjñā: applies ? 'भम्' : null,
    sanjna: applies ? 'bham' : null, // backward compatibility
    rule: '1.4.20',
    reason: applies 
      ? `Word "${word}" gets भम् saṃjñā as अयस्मयादि form in छन्दस् context`
      : `Word "${word}" is ${!isAyasmayadi ? 'not अयस्मयादि' : ''} ${!isChandas ? 'or context is not छन्दस्' : ''}`,
    confidence: applies ? 0.85 : 0,
    isAyasmayadi,
    isChandas,
    register: context.register,
    meta: true,
    isMeta: true // backward compatibility
  };
}

/**
 * Checks if word belongs to अयस्मयादि group
 * @param {string} word - Sanskrit word
 * @param {string} script - Script type
 * @returns {boolean} True if it's an अयस्मयादि word
 */
function checkAyasmayadiWord(word, script) {
  const normalizedWord = word.trim().toLowerCase();
  
  return AYASMAYADI_WORDS.some(ayasWord => {
    const devanagariForm = ayasWord.toLowerCase();
    const iastForm = convertToIAST(ayasWord).toLowerCase();
    
    // Check exact match only for the listed words
    return normalizedWord === devanagariForm ||
           normalizedWord === iastForm ||
           // Allow compounds only if they contain the exact अयस्मयादि word
           (normalizedWord.includes(devanagariForm) && devanagariForm.length > 3) ||
           (normalizedWord.includes(iastForm) && iastForm.length > 3);
  });
}

/**
 * Checks if context is छन्दस् (Vedic/poetic)
 * @param {Object} context - Context object
 * @returns {boolean} True if context is छन्दस्
 */
function checkChandasContext(context) {
  // Explicit छन्दस् flag
  if (context.isChandas === true) return true;
  
  // Check register
  if (context.register) {
    const vedicRegisters = ['vedic', 'chandas', 'poetic', 'mantra', 'samhita'];
    return vedicRegisters.some(reg => 
      context.register.toLowerCase().includes(reg)
    );
  }
  
  // Default: assume classical context (not छन्दस्)
  return false;
}

/**
 * Converts Devanagari to IAST for comparison
 * @param {string} text - Devanagari text
 * @returns {string} IAST equivalent
 */
function convertToIAST(text) {
  return text
    .replace(/अयस्मय/g, 'ayasmaya')
    .replace(/हिरण्मय/g, 'hiraṇmaya')
    .replace(/काष्ठमय/g, 'kāṣṭhamaya')
    .replace(/मृण्मय/g, 'mṛṇmaya')
    .replace(/लोहमय/g, 'lohamaya')
    .replace(/रजतमय/g, 'rajatamaya')
    .replace(/ताम्रमय/g, 'tāmramaya')
    .replace(/कांस्यमय/g, 'kāṃsyamaya')
    .replace(/स्वर्णमय/g, 'svarṇamaya')
    .replace(/मणिमय/g, 'maṇimaya')
    .replace(/रत्नमय/g, 'ratnamaya')
    .replace(/वस्त्रमय/g, 'vastramaya')
    .replace(/चर्ममय/g, 'carmamaya')
    .replace(/काञ्चनमय/g, 'kāñcanamaya')
    .replace(/पार्थिवमय/g, 'pārthivamaya')
    .replace(/वायवीयमय/g, 'vāyavīyamaya')
    .replace(/अ/g, 'a')
    .replace(/य/g, 'ya')
    .replace(/स्/g, 's')
    .replace(/म/g, 'ma')
    .replace(/्/g, '');
}

/**
 * Backward compatibility wrapper
 * @param {string} word - Sanskrit word
 * @param {Object} context - Context object
 * @returns {Object} Result in legacy format
 */
export function applySutra(word, context = {}) {
  const result = sutra1420(word, context);
  return {
    ...result,
    meta: result.meta || result.isMeta,
    sanjna: result.sanjna || (result.saṃjñā === 'भम्' ? 'bham' : null)
  };
}

// Export main function as default
export default sutra1420;
