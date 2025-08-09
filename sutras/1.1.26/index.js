/**
 * Sutra 1.1.26: क्तक्तवतू निष्ठा
 * Classification: saṃjñā (technical definition)
 * 
 * This sutra establishes the technical term "निष्ठा" (niṣṭhā) for 
 * the affixes क्त (kta) and क्तवतु (ktavatu). These are past participle
 * affixes that express completed action or state.
 * 
 * निष्ठा refers to:
 * 1. क्त affix - forms past passive participles (e.g., कृत, गत, भुक्त)
 * 2. क्तवतु affix - forms past active participles (e.g., कृतवत्, गतवत्)
 * 
 * The term निष्ठा comes from √स्था (to stand) with निस् prefix,
 * indicating "completion" or "final state". These affixes are
 * crucial in Sanskrit grammar for expressing completed actions.
 */

import { detectScript } from '../shared/script-detection.js';

// निष्ठा affixes - क्त and क्तवतु
const NISHTHA_AFFIXES = {
  IAST: {
    kta: 'kta',
    ktavatu: 'ktavatu',
    examples: {
      kta: [
        'kṛta',     // done/made (√kṛ + kta)
        'gata',     // gone (√gam + kta)
        'bhukta',   // eaten (√bhuj + kta) 
        'dṛṣṭa',    // seen (√dṛś + kta)
        'śruta',    // heard (√śru + kta)
        'likhita',  // written (√likh + kta)
        'paṭhita',  // read (√paṭh + kta)
        'nīta',     // led (√nī + kta)
        'datta',    // given (√dā + kta)
        'labdha'    // obtained (√labh + kta)
      ],
      ktavatu: [
        'kṛtavat',   // having done (√kṛ + ktavatu)
        'gatavat',   // having gone (√gam + ktavatu)
        'bhuktavat', // having eaten (√bhuj + ktavatu)
        'dṛṣṭavat',  // having seen (√dṛś + ktavatu)
        'śrutavat',  // having heard (√śru + ktavatu)
        'likhitavat',// having written (√likh + ktavatu)
        'paṭhitavat',// having read (√paṭh + ktavatu)
        'nītavat',   // having led (√nī + ktavatu)
        'dattavat',  // having given (√dā + ktavatu)
        'labdhavat'  // having obtained (√labh + ktavatu)
      ]
    }
  },
  Devanagari: {
    kta: 'क्त',
    ktavatu: 'क्तवतु',
    examples: {
      kta: [
        'कृत',     // done/made
        'गत',     // gone
        'भुक्त',   // eaten
        'दृष्ट',    // seen
        'श्रुत',    // heard
        'लिखित',  // written
        'पठित',   // read
        'नीत',     // led
        'दत्त',     // given
        'लब्ध'    // obtained
      ],
      ktavatu: [
        'कृतवत्',   // having done
        'गतवत्',   // having gone
        'भुक्तवत्', // having eaten
        'दृष्टवत्',  // having seen
        'श्रुतवत्',  // having heard
        'लिखितवत्',// having written
        'पठितवत्', // having read
        'नीतवत्',   // having led
        'दत्तवत्',   // having given
        'लब्धवत्'  // having obtained
      ]
    }
  }
};

/**
 * Check if a word has निष्ठा affix (क्त or क्तवतु)
 * @param {string} word - The word to check
 * @return {boolean} True if the word has निष्ठा affix
 */
export function hasNishtha(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const examples = NISHTHA_AFFIXES[script]?.examples;
  
  if (!examples) return false;
  
  // Check both क्त and क्तवतु examples
  return Object.values(examples).some(category => 
    category.includes(word)
  );
}

/**
 * Check if a word is specifically a क्त form
 * @param {string} word - The word to check
 * @return {boolean} True if the word is a क्त form
 */
export function isKta(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const examples = NISHTHA_AFFIXES[script]?.examples?.kta || [];
  
  return examples.includes(word);
}

/**
 * Check if a word is specifically a क्तवतु form
 * @param {string} word - The word to check
 * @return {boolean} True if the word is a क्तवतु form
 */
export function isKtavatu(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const examples = NISHTHA_AFFIXES[script]?.examples?.ktavatu || [];
  
  return examples.includes(word);
}

/**
 * Get all निष्ठा affixes and examples
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} निष्ठा affixes and examples
 */
export function getNishthaAffixes(script = 'IAST') {
  return NISHTHA_AFFIXES[script] || NISHTHA_AFFIXES.IAST;
}

/**
 * Identify the type of निष्ठा affix in a word
 * @param {string} word - The word to analyze
 * @return {Object} Analysis result with निष्ठा type
 */
export function identifyNishthaType(word) {
  if (!word || typeof word !== 'string') {
    return { hasNishtha: false, type: null, script: null };
  }
  
  const script = detectScript(word);
  
  if (isKta(word)) {
    return {
      hasNishtha: true,
      type: 'kta',
      affix: script === 'IAST' ? 'kta' : 'क्त',
      meaning: 'past_passive_participle',
      script,
      word
    };
  }
  
  if (isKtavatu(word)) {
    return {
      hasNishtha: true,
      type: 'ktavatu', 
      affix: script === 'IAST' ? 'ktavatu' : 'क्तवतु',
      meaning: 'past_active_participle',
      script,
      word
    };
  }
  
  return { hasNishtha: false, type: null, script };
}

/**
 * Check if a word exhibits निष्ठा behavior
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @return {boolean} True if the word exhibits निष्ठा behavior
 */
export function hasNishthaBehavior(word, context = {}) {
  if (!word) return false;
  
  // Direct निष्ठा classification
  if (hasNishtha(word)) return true;
  
  // Context-based निष्ठा behavior
  if (context.morphology === 'participle' && 
      (context.tense === 'past' || context.voice === 'passive')) {
    return true;
  }
  
  if (context.affix === 'kta' || context.affix === 'ktavatu' ||
      context.affix === 'क्त' || context.affix === 'क्तवतु') {
    return true;
  }
  
  return false;
}

/**
 * Get निष्ठा examples for each affix type
 * @param {string} script - 'IAST' or 'Devanagari'
 * @return {Object} Examples organized by affix type
 */
export function getNishthaExamples(script = 'IAST') {
  const affixes = getNishthaAffixes(script);
  
  return {
    kta: affixes.examples.kta.slice(0, 5),         // First 5 क्त examples
    ktavatu: affixes.examples.ktavatu.slice(0, 5)  // First 5 क्तवतु examples
  };
}

/**
 * Check if a word is a specific type of निष्ठा
 * @param {string} word - The word to check  
 * @param {string} type - The type to check for ('kta' or 'ktavatu')
 * @return {boolean} True if the word is of the specified type
 */
export function isNishthaType(word, type) {
  if (!word || !type) return false;
  
  const analysis = identifyNishthaType(word);
  return analysis.hasNishtha && analysis.type === type;
}

/**
 * Get the root verb from a निष्ठा form (if recognizable)
 * @param {string} word - The निष्ठा form
 * @return {string|null} The root verb or null if not recognizable
 */
export function getNishthaRoot(word) {
  if (!word) return null;
  
  const script = detectScript(word);
  
  // Simple root extraction for common patterns
  const rootMappings = script === 'IAST' ? {
    'kṛta': 'kṛ',
    'gata': 'gam', 
    'bhukta': 'bhuj',
    'dṛṣṭa': 'dṛś',
    'śruta': 'śru',
    'nīta': 'nī',
    'datta': 'dā',
    'labdha': 'labh',
    'kṛtavat': 'kṛ',
    'gatavat': 'gam',
    'bhuktavat': 'bhuj',
    'dṛṣṭavat': 'dṛś',
    'śrutavat': 'śru',
    'likhitavat': 'likh',
    'paṭhitavat': 'paṭh',
    'nītavat': 'nī',
    'dattavat': 'dā',
    'labdhavat': 'labh'
  } : {
    'कृत': 'कृ',
    'गत': 'गम्',
    'भुक्त': 'भुज्',
    'दृष्ट': 'दृश्',
    'श्रुत': 'श्रु',
    'नीत': 'नी',
    'दत्त': 'दा',
    'लब्ध': 'लभ्',
    'कृतवत्': 'कृ',
    'गतवत्': 'गम्',
    'भुक्तवत्': 'भुज्',
    'दृष्टवत्': 'दृश्',
    'श्रुतवत्': 'श्रु',
    'लिखितवत्': 'लिख्',
    'पठितवत्': 'पठ्',
    'नीतवत्': 'नी',
    'दत्तवत्': 'दा',
    'लब्धवत्': 'लभ्'
  };
  
  return rootMappings[word] || null;
}

/**
 * Check if a word is a passive participle (क्त form)
 * @param {string} word - The word to check
 * @return {boolean} True if passive participle
 */
export function isPassiveParticiple(word) {
  return isKta(word);
}

/**
 * Check if a word is an active participle (क्तवतु form)
 * @param {string} word - The word to check
 * @return {boolean} True if active participle
 */
export function isActiveParticiple(word) {
  return isKtavatu(word);
}

export { NISHTHA_AFFIXES };
