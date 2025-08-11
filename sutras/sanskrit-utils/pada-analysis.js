/**
 * Pada Analysis Utility Module
 * 
 * This module provides comprehensive analysis of Sanskrit verbal pada (voice) classifications.
 * It covers Ātmanepada (आत्मनेपद) and Parasmaipada (परस्मैपद) affix identification.
 * 
 * Key Features:
 * - Ātmanepada affix identification (for Sutra 1.2.11)
 * - Parasmaipada affix identification  
 * - Pada classification for any given affix
 * - Multi-script support for Devanagari and IAST
 * - Comprehensive affix databases organized by pada
 * 
 * Created: August 11, 2025
 * For: Sutra 1.2.11 "लिङ्सिचावात्मनेपदेषु" implementation
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';

/**
 * Ātmanepada (आत्मनेपद) affixes - middle voice terminations
 * These affixes indicate that the action affects the subject
 */
export const ATMANEPADA_AFFIXES = {
  devanagari: {
    // Present tense (लट्) Ātmanepada endings
    lat: ['ते', 'एते', 'न्ते', 'से', 'आथे', 'ध्वे', 'ए', 'वहे', 'महे'],
    
    // Perfect tense (लिट्) Ātmanepada endings  
    lit: ['ए', 'आते', 'इरे', 'से', 'आथे', 'ध्वे', 'ए', 'वहे', 'महे'],
    
    // Imperative (लोट्) Ātmanepada endings
    lot: ['ताम्', 'एताम्', 'न्ताम्', 'स्व', 'आथाम्', 'ध्वम्', 'ऐ', 'आवहै', 'आमहै'],
    
    // Potential (लिङ्) Ātmanepada endings  
    ling: ['एत', 'एयाताम्', 'एरन्', 'एथाः', 'एयाथाम्', 'एध्वम्', 'एय', 'एवहि', 'एमहि'],
    
    // Aorist (लुङ्) Ātmanepada endings
    lung: ['त', 'एताम्', 'न्त', 'थाः', 'आथाम्', 'ध्वम्', 'इ', 'वहि', 'महि'],
    
    // Future (लृट्) Ātmanepada endings
    lrt: ['ते', 'एते', 'न्ते', 'से', 'एथे', 'ध्वे', 'ए', 'वहे', 'महे'],
    
    // Conditional (लृङ्) Ātmanepada endings
    lrng: ['एत', 'एयाताम्', 'एरन्', 'एथाः', 'एयाथाम्', 'एध्वम्', 'एय', 'एवहि', 'एमहि']
  },
  iast: {
    // Present tense (laṭ) Ātmanepada endings
    lat: ['te', 'ete', 'nte', 'se', 'āthe', 'dhve', 'e', 'vahe', 'mahe'],
    
    // Perfect tense (liṭ) Ātmanepada endings
    lit: ['e', 'āte', 'ire', 'se', 'āthe', 'dhve', 'e', 'vahe', 'mahe'],
    
    // Imperative (loṭ) Ātmanepada endings
    lot: ['tām', 'etām', 'ntām', 'sva', 'āthām', 'dhvam', 'ai', 'āvahai', 'āmahai'],
    
    // Potential (liṅ) Ātmanepada endings
    ling: ['eta', 'eyātām', 'eran', 'ethāḥ', 'eyāthām', 'edhvam', 'eya', 'evahi', 'emahi'],
    
    // Aorist (luṅ) Ātmanepada endings
    lung: ['ta', 'etām', 'nta', 'thāḥ', 'āthām', 'dhvam', 'i', 'vahi', 'mahi'],
    
    // Future (lṛṭ) Ātmanepada endings
    lrt: ['te', 'ete', 'nte', 'se', 'ethe', 'dhve', 'e', 'vahe', 'mahe'],
    
    // Conditional (lṛṅ) Ātmanepada endings
    lrng: ['eta', 'eyātām', 'eran', 'ethāḥ', 'eyāthām', 'edhvam', 'eya', 'evahi', 'emahi']
  }
};

/**
 * Parasmaipada (परस्मैपद) affixes - active voice terminations  
 * These affixes indicate that the action affects someone else
 */
export const PARASMAIPADA_AFFIXES = {
  devanagari: {
    // Present tense (लट्) Parasmaipada endings
    lat: ['ति', 'तः', 'न्ति', 'सि', 'थः', 'थ', 'मि', 'वः', 'मः'],
    
    // Perfect tense (लिट्) Parasmaipada endings
    lit: ['आ', 'अतुः', 'उः', 'थ', 'अथुः', 'अ', 'आ', 'व', 'म'],
    
    // Imperative (लोट्) Parasmaipada endings  
    lot: ['तु', 'ताम्', 'न्तु', 'हि', 'तम्', 'त', 'आनि', 'आव', 'आम'],
    
    // Potential (लिङ्) Parasmaipada endings
    ling: ['एत्', 'एताम्', 'एयुः', 'एः', 'एतम्', 'एत', 'एयम्', 'एव', 'एम'],
    
    // Aorist (लुङ्) Parasmaipada endings
    lung: ['त्', 'ताम्', 'न्', 'ः', 'तम्', 'त', 'अम्', 'व', 'म'],
    
    // Future (लृट्) Parasmaipada endings
    lrt: ['ति', 'तः', 'न्ति', 'सि', 'थः', 'थ', 'मि', 'वः', 'मः'],
    
    // Conditional (लृङ्) Parasmaipada endings
    lrng: ['एत्', 'एताम्', 'एयुः', 'एः', 'एतम्', 'एत', 'एयम्', 'एव', 'एम']
  },
  iast: {
    // Present tense (laṭ) Parasmaipada endings
    lat: ['ti', 'taḥ', 'nti', 'si', 'thaḥ', 'tha', 'mi', 'vaḥ', 'maḥ'],
    
    // Perfect tense (liṭ) Parasmaipada endings
    lit: ['ā', 'atuḥ', 'uḥ', 'tha', 'athuḥ', 'a', 'ā', 'va', 'ma'],
    
    // Imperative (loṭ) Parasmaipada endings
    lot: ['tu', 'tām', 'ntu', 'hi', 'tam', 'ta', 'āni', 'āva', 'āma'],
    
    // Potential (liṅ) Parasmaipada endings
    ling: ['et', 'etām', 'eyuḥ', 'eḥ', 'etam', 'eta', 'eyam', 'eva', 'ema'],
    
    // Aorist (luṅ) Parasmaipada endings
    lung: ['t', 'tām', 'n', 'ḥ', 'tam', 'ta', 'am', 'va', 'ma'],
    
    // Future (lṛṭ) Parasmaipada endings
    lrt: ['ti', 'taḥ', 'nti', 'si', 'thaḥ', 'tha', 'mi', 'vaḥ', 'maḥ'],
    
    // Conditional (lṛṅ) Parasmaipada endings
    lrng: ['et', 'etām', 'eyuḥ', 'eḥ', 'etam', 'eta', 'eyam', 'eva', 'ema']
  }
};

/**
 * Checks if an affix is Ātmanepada (आत्मनेपद)
 * @param {string} affix - The affix to check
 * @param {string} [tense] - Optional tense specification (lat, lit, lot, ling, etc.)
 * @returns {boolean} - True if the affix is Ātmanepada
 */
export function isAtmanepadaAffix(affix, tense = null) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  const script = detectScript(cleanAffix);
  const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
  
  if (tense) {
    // Check specific tense
    const tenseAffixes = ATMANEPADA_AFFIXES[scriptKey][tense.toLowerCase()];
    return tenseAffixes ? tenseAffixes.includes(cleanAffix) : false;
  }
  
  // Check all tenses
  for (const tenseGroup of Object.values(ATMANEPADA_AFFIXES[scriptKey])) {
    if (tenseGroup.includes(cleanAffix)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Checks if an affix is Parasmaipada (परस्मैपद)  
 * @param {string} affix - The affix to check
 * @param {string} [tense] - Optional tense specification (lat, lit, lot, ling, etc.)
 * @returns {boolean} - True if the affix is Parasmaipada
 */
export function isParasmaipadaAffix(affix, tense = null) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  const script = detectScript(cleanAffix);
  const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
  
  if (tense) {
    // Check specific tense
    const tenseAffixes = PARASMAIPADA_AFFIXES[scriptKey][tense.toLowerCase()];
    return tenseAffixes ? tenseAffixes.includes(cleanAffix) : false;
  }
  
  // Check all tenses
  for (const tenseGroup of Object.values(PARASMAIPADA_AFFIXES[scriptKey])) {
    if (tenseGroup.includes(cleanAffix)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Determines the pada (voice) of an affix
 * @param {string} affix - The affix to analyze
 * @param {string} [tense] - Optional tense specification
 * @returns {Object} - Analysis result with pada classification
 */
export function getAffixPada(affix, tense = null) {
  if (!affix || typeof affix !== 'string') {
    return {
      isValid: false,
      error: 'Invalid affix input',
      pada: null
    };
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  const analysis = {
    isValid: true,
    affix: cleanAffix,
    script: script,
    pada: null,
    tense: null,
    description: null
  };

  // Check Ātmanepada
  if (isAtmanepadaAffix(cleanAffix, tense)) {
    analysis.pada = 'atmanepada';
    analysis.description = 'Ātmanepada (middle voice) affix';
    
    // Find which tense it belongs to
    const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
    for (const [tenseName, affixes] of Object.entries(ATMANEPADA_AFFIXES[scriptKey])) {
      if (affixes.includes(cleanAffix)) {
        analysis.tense = tenseName;
        break;
      }
    }
    
    return analysis;
  }
  
  // Check Parasmaipada
  if (isParasmaipadaAffix(cleanAffix, tense)) {
    analysis.pada = 'parasmaipada';
    analysis.description = 'Parasmaipada (active voice) affix';
    
    // Find which tense it belongs to
    const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
    for (const [tenseName, affixes] of Object.entries(PARASMAIPADA_AFFIXES[scriptKey])) {
      if (affixes.includes(cleanAffix)) {
        analysis.tense = tenseName;
        break;
      }
    }
    
    return analysis;
  }
  
  // Unknown pada
  analysis.pada = 'unknown';
  analysis.description = 'Affix not recognized as either Ātmanepada or Parasmaipada';
  
  return analysis;
}

/**
 * Gets all affixes of a specific pada and optionally tense
 * @param {string} pada - The pada type ('atmanepada' or 'parasmaipada')
 * @param {string} [tense] - Optional tense specification
 * @param {string} [script='both'] - Script preference ('Devanagari', 'IAST', 'both')
 * @returns {Array<string>|Object} - Array for single script, object for both
 */
export function getAffixesByPada(pada, tense = null, script = 'both') {
  const padaKey = pada.toLowerCase();
  
  let affixSet;
  if (padaKey === 'atmanepada') {
    affixSet = ATMANEPADA_AFFIXES;
  } else if (padaKey === 'parasmaipada') {
    affixSet = PARASMAIPADA_AFFIXES;
  } else {
    return script === 'both' ? { devanagari: [], iast: [] } : [];
  }

  const scriptKey = script.toLowerCase();
  
  if (tense) {
    // Return specific tense affixes
    const tenseKey = tense.toLowerCase();
    switch (scriptKey) {
      case 'devanagari':
        return affixSet.devanagari[tenseKey] ? [...affixSet.devanagari[tenseKey]] : [];
      case 'iast':
        return affixSet.iast[tenseKey] ? [...affixSet.iast[tenseKey]] : [];
      case 'both':
      default:
        return {
          devanagari: affixSet.devanagari[tenseKey] ? [...affixSet.devanagari[tenseKey]] : [],
          iast: affixSet.iast[tenseKey] ? [...affixSet.iast[tenseKey]] : []
        };
    }
  }
  
  // Return all affixes for the pada
  switch (scriptKey) {
    case 'devanagari':
      return Object.values(affixSet.devanagari).flat();
    case 'iast': 
      return Object.values(affixSet.iast).flat();
    case 'both':
    default:
      return {
        devanagari: Object.values(affixSet.devanagari).flat(),
        iast: Object.values(affixSet.iast).flat()
      };
  }
}

/**
 * Validates pada analysis for a given affix
 * @param {string} affix - The affix to validate
 * @param {string} [expectedPada] - Expected pada for validation
 * @returns {Object} - Validation result with details
 */
export function validatePadaAnalysis(affix, expectedPada = null) {
  if (typeof affix !== 'string') {
    return {
      isValid: false,
      errors: ['Affix is required and must be a string'],
      warnings: [],
      suggestions: []
    };
  }

  const cleanAffix = affix.trim();
  const errors = [];
  const warnings = [];
  const suggestions = [];

  if (cleanAffix.length === 0) {
    errors.push('Affix cannot be empty');
    return { isValid: false, errors, warnings, suggestions };
  }

  const analysis = getAffixPada(cleanAffix);
  
  if (analysis.pada === 'unknown') {
    warnings.push(`Affix '${cleanAffix}' not recognized as either Ātmanepada or Parasmaipada`);
    
    // Suggest similar affixes
    const script = detectScript(cleanAffix);
    const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
    
    const allAffixes = [
      ...Object.values(ATMANEPADA_AFFIXES[scriptKey]).flat(),
      ...Object.values(PARASMAIPADA_AFFIXES[scriptKey]).flat()
    ];
    
    // Remove duplicates and filter for similar affixes
    const uniqueAffixes = [...new Set(allAffixes)];
    const similar = uniqueAffixes.filter(a => {
      const lengthDiff = Math.abs(a.length - cleanAffix.length);
      const startsWithSame = a.length > 0 && cleanAffix.length > 0 && 
                            (a[0] === cleanAffix[0] || a.includes(cleanAffix) || cleanAffix.includes(a));
      return lengthDiff <= 2 && startsWithSame;
    }).slice(0, 3);

    if (similar.length > 0) {
      suggestions.push(...similar.map(s => `Did you mean '${s}'?`));
    }
  } else {
    // For known affixes, check if they might be ambiguous
    const script = detectScript(cleanAffix);
    const scriptKey = script === 'Devanagari' ? 'devanagari' : 'iast';
    
    const atmanepadaAffixes = Object.values(ATMANEPADA_AFFIXES[scriptKey]).flat();
    const parasmaipadaAffixes = Object.values(PARASMAIPADA_AFFIXES[scriptKey]).flat();
    
    if (atmanepadaAffixes.includes(cleanAffix) && parasmaipadaAffixes.includes(cleanAffix)) {
      warnings.push(`Affix '${cleanAffix}' can be both Ātmanepada and Parasmaipada depending on context`);
    }
  }
  
  if (expectedPada && analysis.pada !== 'unknown' && analysis.pada !== expectedPada.toLowerCase()) {
    errors.push(`Expected ${expectedPada} but found ${analysis.pada}`);
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    warnings: warnings,
    suggestions: suggestions,
    analysis: analysis
  };
}
