/**
 * Sutra 1.1.28: विभाषा दिक्समासे बहुव्रीहौ
 * Classification: saṃjñā (technical definition)
 */

import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isSarvanama } from '../1.1.27/index.js';

// Direction-related terms for दिक्समास
const DIRECTION_TERMS = {
  IAST: {
    primary_directions: [
      'pūrva', 'paścima', 'uttara', 'dakṣiṇa',
      'prācī', 'pratīcī', 'udīcī', 'anūcī'
    ],
    intermediate_directions: [
      'īśāna', 'agneya', 'nairṛta', 'vāyavya'
    ],
    directional_indicators: [
      'diś', 'deśa', 'kṣetra', 'pradeśa', 'bhāga'
    ]
  },
  Devanagari: {
    primary_directions: [
      'पूर्व', 'पश्चिम', 'उत्तर', 'दक्षिण',
      'प्राची', 'प्रतीची', 'उदीची', 'अनूची'
    ],
    intermediate_directions: [
      'ईशान', 'आग्नेय', 'नैर्ऋत', 'वायव्य'
    ],
    directional_indicators: [
      'दिश्', 'देश', 'क्षेत्र', 'प्रदेश', 'भाग'
    ]
  }
};

// Common बहुव्रीही patterns with directional meaning
const BAHUVRIIHI_PATTERNS = {
  IAST: [
    'sarvapūrva', 'sarvadakṣiṇa', 'sarvadiś', 'sarvadeśa',
    'viśvapūrva', 'viśvadiś', 'anyapūrva', 'anyapaścima',
    'sarvottara', 'viśvakṣetra'
  ],
  Devanagari: [
    'सर्वपूर्व', 'सर्वदक्षिण', 'सर्वदिश्', 'सर्वदेश',
    'विश्वपूर्व', 'विश्वदिश्', 'अन्यपूर्व', 'अन्यपश्चिम',
    'सर्वोत्तर', 'विश्वक्षेत्र'
  ]
};

export function isDirectionRelated(word) {
  if (!word || typeof word !== 'string') return false;
  
  const script = detectScript(word);
  const directionTerms = DIRECTION_TERMS[script];
  
  if (!directionTerms) return false;
  
  return Object.values(directionTerms).some(category => 
    category.includes(word)
  );
}

export function isDirectionalBahuvriihi(compound) {
  if (!compound || typeof compound !== 'string') return false;
  
  const script = detectScript(compound);
  const patterns = BAHUVRIIHI_PATTERNS[script] || [];
  
  if (patterns.includes(compound)) return true;
  
  const directionTerms = DIRECTION_TERMS[script];
  if (!directionTerms) return false;
  
  const allDirectionTerms = Object.values(directionTerms).flat();
  
  // More restrictive matching - must contain actual direction terms
  return allDirectionTerms.some(term => compound.includes(term));
}

export function hasVibhashaInDirectionalBahuvriihi(compound, context = {}) {
  if (!compound || typeof compound !== 'string') return false;
  
  if (!isDirectionalBahuvriihi(compound)) return false;
  
  if (context.compoundType !== 'bahuvriihi' && context.compoundType !== 'बहुव्रीही') {
    return context.compound ? isDirectionalBahuvriihi(context.compound) : false;
  }
  
  return true;
}

export function checkOptionalSarvanamaInDirectionalBahuvriihi(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return { applies: false, optional: false, reason: null };
  }
  
  if (!isSarvanama(word)) {
    return { applies: false, optional: false, reason: 'not_sarvanama' };
  }
  
  if (context.compoundType !== 'bahuvriihi' && context.compoundType !== 'बहुव्रीही') {
    return { applies: false, optional: false, reason: 'not_bahuvriihi' };
  }
  
  const compoundWord = context.compound || word;
  if (!isDirectionalBahuvriihi(compoundWord)) {
    return { applies: false, optional: false, reason: 'not_directional' };
  }
  
  return {
    applies: true,
    optional: true,
    reason: 'directional_bahuvriihi',
    sutra: '1.1.28',
    explanation: 'सर्वनाम words are optionally सर्वनाम in directional बहुव्रीही compounds'
  };
}

export function analyzeSarvanamaWithDirectionalException(word, context = {}) {
  if (!word || typeof word !== 'string') {
    return { isSarvanama: false, status: null, exception: null };
  }
  
  const baseSarvanama = isSarvanama(word);
  
  if (!baseSarvanama) {
    return { isSarvanama: false, status: 'not_sarvanama', exception: null };
  }
  
  const optionalCheck = checkOptionalSarvanamaInDirectionalBahuvriihi(word, context);
  
  if (optionalCheck.applies) {
    return {
      isSarvanama: baseSarvanama,
      status: 'optional_sarvanama',
      exception: '1.1.28',
      details: optionalCheck,
      baseStatus: 'sarvanama_by_1.1.27'
    };
  }
  
  return {
    isSarvanama: baseSarvanama,
    status: 'definite_sarvanama',
    exception: null,
    baseStatus: 'sarvanama_by_1.1.27'
  };
}

export function parseDirectionalCompound(compound) {
  if (!compound || typeof compound !== 'string') {
    return { hasSarvanama: false, hasDirection: false, components: [] };
  }
  
  const script = detectScript(compound);
  const directionTerms = DIRECTION_TERMS[script];
  
  let hasSarvanama = false;
  let hasDirection = false;
  const components = [];
  
  const allDirectionTerms = directionTerms ? Object.values(directionTerms).flat() : [];
  
  if (isSarvanama(compound) || compound.includes('sarva') || compound.includes('सर्व')) {
    hasSarvanama = true;
    components.push('sarvanama_element');
  }
  
  const hasDirectionElement = allDirectionTerms.some(term => compound.includes(term));
  if (hasDirectionElement) {
    hasDirection = true;
    components.push('directional_element');
  }
  
  return {
    hasSarvanama,
    hasDirection,
    components,
    isDirectionalBahuvriihi: hasSarvanama && hasDirection,
    potentialFor1128: hasSarvanama && hasDirection
  };
}

export function getDirectionalBahuvriihiExamples(script = 'IAST') {
  return BAHUVRIIHI_PATTERNS[script] || BAHUVRIIHI_PATTERNS.IAST;
}

export function getDirectionTerms(script = 'IAST') {
  return DIRECTION_TERMS[script] || DIRECTION_TERMS.IAST;
}

export { DIRECTION_TERMS, BAHUVRIIHI_PATTERNS };
