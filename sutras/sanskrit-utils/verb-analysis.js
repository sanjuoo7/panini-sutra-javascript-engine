/**
 * Verb Analysis Utility Module
 * 
 * This module provides comprehensive analysis of Sanskrit verbal affixes and forms.
 * It covers various tense systems, affix classifications, and verbal morphology.
 * 
 * Key Features:
 * - Perfect tense (liṭ) affix identification
 * - Sārvādhātuka (primary) affix classification  
 * - Pit affix detection
 * - Multi-script support for Devanagari and IAST
 * - Comprehensive affix databases
 * 
 * Created: August 11, 2025
 * Extracted from: Sutras 1.2.4, 1.2.5, 1.2.6 implementations
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';

/**
 * Perfect tense (liṭ) affixes in both scripts
 * These affixes are used to form the perfect tense in Sanskrit
 */
export const LIT_AFFIXES = {
  devanagari: [
    // Parasmaipada endings
    'आ', 'अतुः', 'उः', 'थ', 'अथुः', 'अ', 'आ', 'व', 'म',
    
    // Ātmanepada endings  
    'ए', 'आते', 'इरे', 'से', 'आथे', 'ध्वे', 'ए', 'वहे', 'महे',
    
    // Additional perfect forms
    'औ', 'तुः', 'अन्', 'िथ', 'अतुः', 'अत', 'अ', 'व', 'म'
  ],
  iast: [
    // Parasmaipada endings
    'ā', 'atuḥ', 'uḥ', 'tha', 'athuḥ', 'a', 'ā', 'va', 'ma',
    
    // Ātmanepada endings
    'e', 'āte', 'ire', 'se', 'āthe', 'dhve', 'e', 'vahe', 'mahe',
    
    // Additional perfect forms
    'au', 'tuḥ', 'an', 'itha', 'atuḥ', 'ata', 'a', 'va', 'ma'
  ]
};

/**
 * Sārvādhātuka affixes - primary verbal terminations
 * These are the primary verbal endings used in present, imperative, and potential
 */
export const SARVADHATUKA_AFFIXES = {
  devanagari: [
    // Present tense (लट्) endings
    'ति', 'तः', 'न्ति', 'सि', 'थः', 'थ', 'मि', 'वः', 'मः',
    'ते', 'ताम्', 'न्ते', 'से', 'आथाम्', 'ध्वे', 'ए', 'वहे', 'महे',
    
    // Imperative (लोट्) endings  
    'तु', 'ताम्', 'न्तु', 'हि', 'तम्', 'आनि', 'आव', 'आम',
    'आम्', 'न्ताम्', 'स्व', 'आथाम्', 'ध्वम्', 'ऐ', 'आवहै', 'आमहै',
    
    // Potential (लिङ्) endings
    'एत्', 'एताम्', 'एयुः', 'एः', 'एतम्', 'एत', 'एयम्', 'एव', 'एम',
    'एयाताम्', 'एरन्', 'एथाः', 'एयाथाम्', 'एध्वम्', 'एय', 'एवहि', 'एमहि'
  ],
  iast: [
    // Present tense (laṭ) endings
    'ti', 'taḥ', 'nti', 'si', 'thaḥ', 'tha', 'mi', 'vaḥ', 'maḥ',
    'te', 'tām', 'nte', 'se', 'āthām', 'dhve', 'e', 'vahe', 'mahe',
    
    // Imperative (loṭ) endings
    'tu', 'tām', 'ntu', 'hi', 'tam', 'āni', 'āva', 'āma',
    'ām', 'ntām', 'sva', 'āthām', 'dhvam', 'ai', 'āvahai', 'āmahai',
    
    // Potential (liṅ) endings
    'et', 'etām', 'eyuḥ', 'eḥ', 'etam', 'eta', 'eyam', 'eva', 'ema',
    'eyātām', 'eran', 'ethāḥ', 'eyāthām', 'edhvam', 'eya', 'evahi', 'emahi'
  ]
};

/**
 * Affixes that have pit designation (thus excluded from sārvādhātuka)
 * These affixes carry the pit marker and follow different rules
 */
export const PIT_AFFIXES = {
  devanagari: [
    'त', 'तवत्', 'न', 'इन्', 'वत्', 'मतुप्', 'शतृ', 'शानच्'
  ],
  iast: [
    'ta', 'tavat', 'na', 'in', 'vat', 'matup', 'śatṛ', 'śānac'
  ]
};

/**
 * Checks if an affix is a perfect tense (liṭ) affix
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is a liṭ affix
 */
export function isLitAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  return LIT_AFFIXES.devanagari.includes(cleanAffix) ||
         LIT_AFFIXES.iast.includes(cleanAffix);
}

/**
 * Checks if an affix is a sārvādhātuka (primary verbal) affix
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is sārvādhātuka
 */
export function isSarvadhatuka(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  return SARVADHATUKA_AFFIXES.devanagari.includes(cleanAffix) ||
         SARVADHATUKA_AFFIXES.iast.includes(cleanAffix);
}

/**
 * Checks if an affix has pit designation
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix has pit designation
 */
export function isPitAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  if (!cleanAffix) {
    return false;
  }

  return PIT_AFFIXES.devanagari.includes(cleanAffix) ||
         PIT_AFFIXES.iast.includes(cleanAffix);
}

/**
 * Analyzes an affix and determines its type and properties
 * @param {string} affix - The affix to analyze
 * @returns {Object} - Analysis result with affix properties
 */
export function analyzeAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return {
      isValid: false,
      error: 'Invalid affix input',
      properties: {}
    };
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  const analysis = {
    isValid: true,
    affix: cleanAffix,
    script: script,
    properties: {
      isLit: isLitAffix(cleanAffix),
      isSarvadhatuka: isSarvadhatuka(cleanAffix),
      isPit: isPitAffix(cleanAffix)
    }
  };

  // Determine primary classification
  if (analysis.properties.isLit) {
    analysis.primaryType = 'lit';
    analysis.description = 'Perfect tense affix';
  } else if (analysis.properties.isSarvadhatuka) {
    analysis.primaryType = 'sarvadhatuka';
    analysis.description = 'Primary verbal affix';
  } else if (analysis.properties.isPit) {
    analysis.primaryType = 'pit';
    analysis.description = 'Pit-designated affix';
  } else {
    analysis.primaryType = 'other';
    analysis.description = 'Unclassified affix';
  }

  return analysis;
}

/**
 * Gets all affixes of a specific type
 * @param {string} type - The type of affix ('lit', 'sarvadhatuka', 'pit')
 * @param {string} [script='both'] - Script preference ('Devanagari', 'IAST', 'both')
 * @returns {Array<string>|Object} - Array for single script, object for both
 */
export function getAffixesByType(type, script = 'both') {
  const typeMap = {
    'lit': LIT_AFFIXES,
    'sarvadhatuka': SARVADHATUKA_AFFIXES,
    'pit': PIT_AFFIXES
  };

  const affixSet = typeMap[type.toLowerCase()];
  if (!affixSet) {
    return script === 'both' ? { devanagari: [], iast: [] } : [];
  }

  switch (script.toLowerCase()) {
    case 'devanagari':
      return [...affixSet.devanagari];
    case 'iast':
      return [...affixSet.iast];
    case 'both':
    default:
      return {
        devanagari: [...affixSet.devanagari],
        iast: [...affixSet.iast]
      };
  }
}

/**
 * Validates affix format and checks against known patterns
 * @param {string} affix - The affix to validate
 * @returns {Object} - Validation result with details
 */
export function validateAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return {
      isValid: false,
      errors: ['Affix is required and must be a string'],
      warnings: [],
      suggestions: []
    };
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  const errors = [];
  const warnings = [];
  const suggestions = [];

  // Basic format validation
  if (cleanAffix.length === 0) {
    errors.push('Affix cannot be empty');
    return { isValid: false, errors, warnings, suggestions };
  }

  // Check if it's a recognized affix
  const analysis = analyzeAffix(cleanAffix);
  const isRecognized = analysis.properties.isLit || 
                      analysis.properties.isSarvadhatuka || 
                      analysis.properties.isPit;

  if (!isRecognized) {
    warnings.push(`Affix '${cleanAffix}' not found in standard affix databases`);
    
    // Suggest similar affixes
    const allAffixes = [
      ...LIT_AFFIXES[script === 'Devanagari' ? 'devanagari' : 'iast'],
      ...SARVADHATUKA_AFFIXES[script === 'Devanagari' ? 'devanagari' : 'iast'],
      ...PIT_AFFIXES[script === 'Devanagari' ? 'devanagari' : 'iast']
    ];

    const similar = allAffixes.filter(a => 
      Math.abs(a.length - cleanAffix.length) <= 1 && 
      (a.startsWith(cleanAffix[0]) || cleanAffix.startsWith(a[0]))
    ).slice(0, 3);

    if (similar.length > 0) {
      suggestions.push(...similar.map(s => `Did you mean '${s}'?`));
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    warnings: warnings,
    suggestions: suggestions,
    script: script,
    isRecognized: isRecognized,
    analysis: analysis
  };
}

/**
 * Finds verbal affixes in a given text
 * @param {string} text - The text to analyze
 * @returns {Array<Object>} - Array of found affixes with positions and types
 */
export function findVerbalAffixes(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  const cleanText = text.trim();
  const script = detectScript(cleanText);
  const foundAffixes = [];

  const allAffixSets = [
    { type: 'lit', affixes: LIT_AFFIXES },
    { type: 'sarvadhatuka', affixes: SARVADHATUKA_AFFIXES },
    { type: 'pit', affixes: PIT_AFFIXES }
  ];

  for (const affixSet of allAffixSets) {
    const affixes = script === 'Devanagari' ? 
                   affixSet.affixes.devanagari : 
                   affixSet.affixes.iast;

    for (const affix of affixes) {
      let position = cleanText.indexOf(affix);
      while (position !== -1) {
        foundAffixes.push({
          affix: affix,
          type: affixSet.type,
          position: position,
          script: script
        });
        position = cleanText.indexOf(affix, position + 1);
      }
    }
  }

  // Sort by position and remove duplicates
  return foundAffixes
    .sort((a, b) => a.position - b.position)
    .filter((affix, index, array) => 
      index === 0 || 
      affix.position !== array[index - 1].position || 
      affix.affix !== array[index - 1].affix
    );
}
