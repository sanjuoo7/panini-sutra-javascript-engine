/**
 * Shared Pragrhya Analysis Utilities
 * 
 * This module provides centralized pragrhya (प्रगृह्य) analysis functionality
 * that combines the cumulative rules from sutras 1.1.11-1.1.19.
 * 
 * प्रगृह्य refers to sounds that prevent sandhi (phonetic combination).
 * Each sutra from 1.1.11 to 1.1.19 adds specific cases where sandhi is blocked.
 * 
 * Created: August 10, 2025
 */

import { detectScript } from './script-detection.js';

/**
 * Cumulative pragrhya checker that applies all rules from sutras 1.1.11-1.1.19
 * 
 * @param {string} word - The word to check
 * @param {Object} context - Grammatical context
 * @param {string} context.number - 'dual', 'singular', 'plural'
 * @param {string} context.case - case information
 * @param {boolean} context.isParticle - whether word is a particle
 * @param {boolean} context.hasLocativeSense - whether word has locative meaning
 * @param {string[]} applicableSutras - Which sutras to include (default: all)
 * @returns {boolean} - True if the word is pragrhya
 */
export function isPragrhya(word, context = {}, applicableSutras = ['1.1.11', '1.1.12', '1.1.13', '1.1.14', '1.1.15', '1.1.16', '1.1.17', '1.1.18', '1.1.19']) {
  if (!word) {
    return false;
  }

  // Apply each sutra's rules in sequence
  const sutraResults = {};

  // 1.1.11: Dual case endings in ī, ū, e
  if (applicableSutras.includes('1.1.11')) {
    sutraResults['1.1.11'] = isPragrhyaDualEnding(word, context);
    if (sutraResults['1.1.11']) return true;
  }

  // 1.1.12: अदस् forms
  if (applicableSutras.includes('1.1.12')) {
    sutraResults['1.1.12'] = isPragrhyaAdasForm(word);
    if (sutraResults['1.1.12']) return true;
  }

  // 1.1.13: Words ending in शे affix
  if (applicableSutras.includes('1.1.13')) {
    sutraResults['1.1.13'] = isPragrhyaSheAffix(word);
    if (sutraResults['1.1.13']) return true;
  }

  // 1.1.14: Single vowel particles
  if (applicableSutras.includes('1.1.14')) {
    sutraResults['1.1.14'] = isPragrhyaSingleVowelParticle(word, context);
    if (sutraResults['1.1.14']) return true;
  }

  // 1.1.15: Particles ending in 'o'
  if (applicableSutras.includes('1.1.15')) {
    sutraResults['1.1.15'] = isPragrhyaParticleEndingInO(word, context);
    if (sutraResults['1.1.15']) return true;
  }

  // 1.1.16: Vocative 'o'
  if (applicableSutras.includes('1.1.16')) {
    sutraResults['1.1.16'] = isPragrhyaVocativeO(word, context);
    if (sutraResults['1.1.16']) return true;
  }

  // 1.1.17: उञ् (uñ) words
  if (applicableSutras.includes('1.1.17')) {
    sutraResults['1.1.17'] = isPragrhyaUnj(word, context);
    if (sutraResults['1.1.17']) return true;
  }

  // 1.1.18: ॐ (Om) particle
  if (applicableSutras.includes('1.1.18')) {
    sutraResults['1.1.18'] = isPragrhyaOm(word, context);
    if (sutraResults['1.1.18']) return true;
  }

  // 1.1.19: ī/ū with locative sense
  if (applicableSutras.includes('1.1.19')) {
    sutraResults['1.1.19'] = isPragrhyaIU(word, context);
    if (sutraResults['1.1.19']) return true;
  }

  return false;
}

/**
 * Detailed pragrhya analysis showing which rules apply
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Grammatical context
 * @returns {Object} - Analysis result with details for each sutra
 */
export function analyzePragrhya(word, context = {}) {
  if (!word) {
    return {
      isPragrhya: false,
      applicableRules: [],
      analysis: {},
      script: 'Unknown'
    };
  }

  const script = detectScript(word);
  const analysis = {};
  const applicableRules = [];

  // Test each sutra individually
  const sutras = [
    { id: '1.1.11', name: 'Dual endings', checker: isPragrhyaDualEnding },
    { id: '1.1.12', name: 'Adas forms', checker: isPragrhyaAdasForm },
    { id: '1.1.13', name: 'She affix', checker: isPragrhyaSheAffix },
    { id: '1.1.14', name: 'Single vowel particles', checker: isPragrhyaSingleVowelParticle },
    { id: '1.1.15', name: 'Particles ending in o', checker: isPragrhyaParticleEndingInO },
    { id: '1.1.16', name: 'Vocative o', checker: isPragrhyaVocativeO },
    { id: '1.1.17', name: 'Unj words', checker: isPragrhyaUnj },
    { id: '1.1.18', name: 'Om particle', checker: isPragrhyaOm },
    { id: '1.1.19', name: 'IU with locative sense', checker: isPragrhyaIU }
  ];

  for (const sutra of sutras) {
    try {
      const result = sutra.checker(word, context);
      analysis[sutra.id] = {
        name: sutra.name,
        applies: result,
        explanation: result ? `${word} is pragrhya according to sutra ${sutra.id}` : `Sutra ${sutra.id} does not apply to ${word}`
      };
      
      if (result) {
        applicableRules.push(sutra.id);
      }
    } catch (error) {
      analysis[sutra.id] = {
        name: sutra.name,
        applies: false,
        error: error.message
      };
    }
  }

  return {
    isPragrhya: applicableRules.length > 0,
    applicableRules,
    analysis,
    script,
    word
  };
}

// ==================== INDIVIDUAL SUTRA IMPLEMENTATIONS ====================

/**
 * 1.1.11: Dual case endings in ī, ū, e
 */
export function isPragrhyaDualEnding(word, context = {}) {
  if (!word) return false;
  
  const script = detectScript(word);
  
  if (context.number === 'dual') {
    if (script === 'IAST') {
      return /[īūe]$/.test(word);
    } else if (script === 'Devanagari') {
      return /[ीूे]$/.test(word);
    }
  }
  
  return false;
}

/**
 * 1.1.12: अदस् forms are pragrhya
 */
export function isPragrhyaAdasForm(word) {
  if (!word) return false;
  
  const script = detectScript(word);
  
  if (script === 'Devanagari') {
    // Check for forms like अमी, अमू, अमे (exactly "अम" + vowel)
    return /^अम[ीूे]$/.test(word);
  } else {
    // IAST forms like amī, amū, ame (exactly "am" + vowel)
    return /^am[īūe]$/.test(word);
  }
  
  return false;
}

/**
 * 1.1.13: Words ending in शे affix
 */
export function isPragrhyaSheAffix(word) {
  if (!word) return false;
  
  const script = detectScript(word);
  
  if (script === 'IAST') {
    return word.endsWith('she') || word.endsWith('śe');
  } else if (script === 'Devanagari') {
    return word.endsWith('शे');
  }
  
  return false;
}

/**
 * 1.1.14: Single vowel particles
 */
export function isPragrhyaSingleVowelParticle(word, context = {}) {
  if (!word) return false;
  
  const script = detectScript(word);
  const isParticle = context.isParticle === true; // Must be explicitly true
  
  if (!isParticle) return false;
  
  if (script === 'IAST') {
    return /^[aāiīuūeoai]$/.test(word);
  } else if (script === 'Devanagari') {
    return /^[अआइईउऊएओै]$/.test(word);
  }
  
  return false;
}

/**
 * 1.1.15: Particles ending in 'o'
 */
export function isPragrhyaParticleEndingInO(word, context = {}) {
  if (!word) return false;
  
  const script = detectScript(word);
  const isParticle = context.isParticle !== false;
  
  if (!isParticle) return false;
  
  if (script === 'IAST') {
    return word.endsWith('o');
  } else if (script === 'Devanagari') {
    return word.endsWith('ो');
  }
  
  return false;
}

/**
 * 1.1.16: Vocative 'o'
 */
export function isPragrhyaVocativeO(word, context = {}) {
  if (!word) return false;
  
  const script = detectScript(word);
  const isVocative = context.case === 'vocative';
  
  if (!isVocative) return false;
  
  if (script === 'IAST') {
    return word === 'o';
  } else if (script === 'Devanagari') {
    return word === 'ओ';
  }
  
  return false;
}

/**
 * 1.1.17: उञ् (uñ) words
 */
export function isPragrhyaUnj(word, context = {}) {
  if (!word) return false;
  
  const script = detectScript(word);
  
  // Words formed with उञ् affix
  const unjWords = {
    iast: ['uñ', 'hu', 'nu'],
    devanagari: ['उञ्', 'हु', 'नु']
  };
  
  if (script === 'IAST') {
    return unjWords.iast.some(base => word.includes(base));
  } else if (script === 'Devanagari') {
    return unjWords.devanagari.some(base => word.includes(base));
  }
  
  return false;
}

/**
 * 1.1.18: ॐ (Om) particle
 */
export function isPragrhyaOm(word, context = {}) {
  if (!word) return false;
  
  const script = detectScript(word);
  
  if (script === 'IAST') {
    return ['om', 'oṃ', 'auṃ'].includes(word.toLowerCase());
  } else if (script === 'Devanagari') {
    return ['ॐ', 'ओम्', 'ओं', 'औं'].includes(word);
  }
  
  return false;
}

/**
 * 1.1.19: ī/ū with locative sense
 */
export function isPragrhyaIU(word, context = {}) {
  if (!word) return false;
  
  const script = detectScript(word);
  const hasLocativeSense = context.hasLocativeSense || hasLocativeMeaning(word);
  
  if (!hasLocativeSense) return false;
  
  if (script === 'IAST') {
    return /[īū]$/.test(word);
  } else if (script === 'Devanagari') {
    return /[ीू]$/.test(word);
  }
  
  return false;
}

/**
 * Helper function to detect locative meaning
 */
export function hasLocativeMeaning(word) {
  if (!word) return false;
  
  const script = detectScript(word);
  
  // Common words with locative sense
  const locativeWords = {
    iast: ['addhī', 'parī', 'prabhṛtī', 'kutra', 'tatra', 'yatra', 'atra'],
    devanagari: ['अद्धी', 'परी', 'प्रभृती', 'कुत्र', 'तत्र', 'यत्र', 'अत्र']
  };
  
  if (script === 'IAST') {
    return locativeWords.iast.includes(word.toLowerCase());
  } else if (script === 'Devanagari') {
    return locativeWords.devanagari.includes(word);
  }
  
  return false;
}

/**
 * Checks if sandhi should be prevented due to pragrhya status
 * 
 * @param {string} firstWord - First word in potential sandhi
 * @param {string} secondWord - Second word in potential sandhi  
 * @param {Object} context - Grammatical context
 * @returns {boolean} - True if sandhi should be prevented
 */
export function preventsSandhi(firstWord, secondWord, context = {}) {
  if (!firstWord || !secondWord) {
    return false;
  }

  return isPragrhya(firstWord, context);
}

/**
 * Gets examples of pragrhya words for educational purposes
 * 
 * @param {string} script - 'IAST' or 'Devanagari'
 * @param {string} sutraId - Specific sutra to get examples for (optional)
 * @returns {Object} - Examples organized by sutra
 */
export function getPragrhyaExamples(script = 'IAST', sutraId = null) {
  const examples = {
    '1.1.11': {
      iast: ['devau', 'nadyau', 'rāme'], 
      devanagari: ['देवौ', 'नद्यौ', 'राम']
    },
    '1.1.12': {
      iast: ['adas', 'ado', 'amuṣmāt'],
      devanagari: ['अदस्', 'अदो', 'अमुष्मात्']
    },
    '1.1.13': {
      iast: ['gacchśe', 'kuru śe'],
      devanagari: ['गच्छशे', 'कुरु शे']
    },
    '1.1.14': {
      iast: ['i', 'u', 'e'],
      devanagari: ['इ', 'उ', 'ए']
    },
    '1.1.15': {
      iast: ['aho', 'bho'],
      devanagari: ['अहो', 'भो']
    },
    '1.1.16': {
      iast: ['o'],
      devanagari: ['ओ']
    },
    '1.1.17': {
      iast: ['hu', 'nu'],
      devanagari: ['हु', 'नु']
    },
    '1.1.18': {
      iast: ['om', 'oṃ'],
      devanagari: ['ॐ', 'ओं']
    },
    '1.1.19': {
      iast: ['addhī', 'parī', 'prabhṛtī'],
      devanagari: ['अद्धी', 'परी', 'प्रभृती']
    }
  };
  
  if (sutraId) {
    return examples[sutraId] ? examples[sutraId][script.toLowerCase()] || [] : [];
  }
  
  const result = {};
  for (const [id, data] of Object.entries(examples)) {
    result[id] = data[script.toLowerCase()] || [];
  }
  
  return result;
}
