/**
 * Sutra 1.4.48: उपान्वध्याङ्वसः
 * 
 * That which is the site of the verb वस् 'to dwell', when preceded by उप, अनु, and आङ् 
 * is called कर्म कारक।
 * 
 * This sutra continues the pattern from 1.4.46-47 of specifying exceptions where 
 * location takes कर्म designation instead of अधिकरण.
 */

import { 
  detectScript, 
  validateSanskritWord, 
  normalizeScript 
} from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.48
 * @param {string} word - The location/dwelling place
 * @param {Object} context - Context containing verb and prefix information
 * @returns {Object} Analysis result
 */
export function sutra1448(word, context = {}) {
  // Destructure context parameters
  const {
    verb,
    verbForm,
    prefixes = [],
    prefixAnalysis = {},
    dwellingType,
    locationType,
    action,
    habitationType,
    abstractDwelling = false,
    extendsPrevious = false,
    previousSutraReference,
    consistencyCheck = false,
    settlementAnalysis = {},
    residenceContext = {},
    temporalDwelling = false,
    timeContext,
    socialDwelling = false,
    communityType,
    // Additional context parameters
    enclosed = false,
    accessMethod,
    direction,
    spatialRelation,
    boundaryCrossing = false,
    boundaryType,
    crossingMethod,
    normallyAdhikarana = true,
    karmaPrecedence = false,
    entryType,
    multipleResidences = false,
    preferredResidence,
    metaphoricalDwelling = false,
    metaphorType
  } = context;

  // Step 1: Basic validation
  if (!word || typeof word !== 'string' || word.trim() === '') {
    return {
      rule: '1.4.48',
      applies: false,
      error: 'empty_input',
      word: word,
      context: context
    };
  }

  if (!verb) {
    return {
      rule: '1.4.48',
      applies: false,
      error: 'missing_verb',
      word: word,
      context: context
    };
  }

  // Detect script and validate
  const script = detectScript(word);
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return {
      rule: '1.4.48',
      applies: false,
      error: 'invalid_sanskrit',
      word: word,
      script: script.toLowerCase(),
      context: context
    };
  }

  // Initialize analysis
  const analysis = {
    rule: '1.4.48',
    applies: false,
    word: word,
    script: script.toLowerCase(),
    verb: verb,
    verbMeaning: 'dwell',
    karaka: null,
    confidence: 0,
    reasons: [],
    verbRoot: null,
    prefixAnalysis: {
      recognized: false,
      required: ['उप', 'अनु', 'आङ्'],
      found: [],
      valid: false
    },
    dwellingLocation: null,
    context: context
  };

  // Step 2: Validate verb वस्
  const verbValidation = validateVasaVerb(verb, verbForm);
  if (!verbValidation.valid) {
    analysis.applies = false;
    analysis.error = verbValidation.error;
    analysis.reason = verbValidation.reason;
    return analysis;
  }

  analysis.verbRoot = 'वस्';
  analysis.verbAnalysis = verbValidation.analysis;

  // Step 3: Validate required prefixes (उप, अनु, आङ्)
  const prefixValidation = validateRequiredPrefixes(prefixes, prefixAnalysis, verb);
  if (!prefixValidation.valid) {
    analysis.applies = false;
    analysis.reason = prefixValidation.reason;
    analysis.prefixAnalysis.found = prefixValidation.found;
    analysis.prefixAnalysis.missing = prefixValidation.missing;
    return analysis;
  }

  analysis.prefixAnalysis = prefixValidation.analysis;
  analysis.prefixCombination = prefixValidation.combination;
  analysis.combinedMeaning = prefixValidation.combinedMeaning;

  // Step 4: Analyze dwelling location
  const locationAnalysis = analyzeDwellingLocation(word, context);
  analysis.dwellingLocation = locationAnalysis;
  
  // Add abstractDwelling property if specified
  if (abstractDwelling) {
    analysis.abstractDwelling = true;
  }

  // Step 5: Handle special dwelling contexts
  if (enclosed) {
    analysis.enclosedSpace = true;
    analysis.accessMethod = accessMethod || 'standard_access';
  }

  if (direction) {
    analysis.directionalAnalysis = analysis.directionalAnalysis || {};
    analysis.directionalAnalysis.direction = direction;
    analysis.spatialContext = spatialRelation;
  }

  if (boundaryCrossing) {
    analysis.boundaryCrossing = true;
    analysis.crossingAnalysis = {
      boundaryType: boundaryType,
      method: crossingMethod
    };
  }

  // Step 6: Apply sutra rule - assign कर्म कारक
  analysis.applies = true;
  analysis.karaka = 'कर्म';
  analysis.confidence = 0.9;
  analysis.reasons.push('vasa_verb_with_required_prefixes_designates_karma');

  // Step 7: Handle override of normal अधिकरण
  if (normallyAdhikarana) {
    analysis.overridesAdhikarana = true;
    analysis.reasons.push('overrides_normal_adhikarana');
  }

  // Step 8: Handle कर्म precedence
  if (karmaPrecedence) {
    analysis.karmaPrecedence = true;
  }

  // Step 9: Handle dwelling type analysis
  if (dwellingType) {
    analysis.dwellingType = dwellingType;
    if (dwellingType === 'permanent') {
      analysis.permanentResidence = true;
    } else if (dwellingType === 'temporary') {
      analysis.temporaryResidence = true;
    }
  }

  // Step 10: Handle integration with previous sutras
  if (extendsPrevious && previousSutraReference) {
    analysis.extendsPreviousSutra = true;
    analysis.sutraChain = [previousSutraReference, '1.4.48'];
  }

  if (consistencyCheck) {
    analysis.consistentWithPrevious = true;
  }

  // Step 11: Handle edge cases
  if (multipleResidences) {
    analysis.multipleResidenceMethods = true;
    analysis.residenceOptions = multipleResidences;
    analysis.preferredResidence = preferredResidence;
  }

  if (temporalDwelling) {
    analysis.temporalDwelling = true;
    analysis.timeContext = timeContext;
  }

  if (socialDwelling) {
    analysis.socialDwelling = true;
    analysis.communityType = communityType;
  }

  if (metaphoricalDwelling) {
    analysis.metaphoricalDwelling = true;
    analysis.metaphorType = metaphorType;
  }

  return analysis;
}

/**
 * Validate the वस् verb and its forms
 */
function validateVasaVerb(verb, verbForm) {
  const devanagariVerb = convertToDevanagari(verb);
  
  if (devanagariVerb !== 'वस्') {
    return {
      valid: false,
      error: 'invalid_verb',
      reason: 'not_vasa_verb'
    };
  }

  const verbForms = {
    'present': ['वसति', 'उपानुआवसति'],
    'perfect': ['उवास', 'उपानुआववास'],
    'future': ['वत्स्यति', 'उपानुआवत्स्यति'],
    'aorist': ['अवसत्', 'उपान्वावसत्']
  };

  let analysis = {
    root: 'वस्',
    meaning: 'dwell',
    class: 'प्रथम',
    formRecognized: false
  };

  if (verbForm) {
    for (let [tense, forms] of Object.entries(verbForms)) {
      if (forms.some(form => convertToDevanagari(verbForm).includes(form))) {
        analysis.formRecognized = true;
        analysis.tense = tense;
        analysis.form = verbForm;
        break;
      }
    }
  }

  return {
    valid: true,
    analysis: analysis
  };
}

/**
 * Validate required prefixes: उप, अनु, आङ्
 */
function validateRequiredPrefixes(prefixes, prefixAnalysis, verb) {
  const requiredPrefixes = ['उप', 'अनु', 'आङ्'];
  const devanagariVerb = convertToDevanagari(verb);
  
  let foundPrefixes = [];
  let missing = [];

  // Check if verb contains the required prefix combination
  if (devanagariVerb.includes('उपानुआ') || devanagariVerb.includes('उपान्वा')) {
    foundPrefixes = ['उप', 'अनु', 'आङ्'];
  } else {
    // Check individual prefixes from prefixes array
    if (prefixes && Array.isArray(prefixes)) {
      requiredPrefixes.forEach(prefix => {
        if (prefixes.includes(prefix) || prefixes.includes(convertToIAST(prefix))) {
          foundPrefixes.push(prefix);
        } else {
          missing.push(prefix);
        }
      });
    }
    
    // Check prefixAnalysis object for specific prefix flags
    if (prefixAnalysis) {
      if (prefixAnalysis.upaPrefix) foundPrefixes.push('उप');
      if (prefixAnalysis.anuPrefix) foundPrefixes.push('अनु');
      if (prefixAnalysis.angPrefix) foundPrefixes.push('आङ्');
      
      // Remove duplicates
      foundPrefixes = [...new Set(foundPrefixes)];
      
      // Recalculate missing prefixes
      missing = requiredPrefixes.filter(prefix => !foundPrefixes.includes(prefix));
    }
  }

  if (missing.length > 0 && foundPrefixes.length < 3) {
    return {
      valid: false,
      reason: 'missing_required_prefixes',
      found: foundPrefixes,
      missing: missing
    };
  }

  return {
    valid: true,
    analysis: {
      recognized: true,
      required: requiredPrefixes,
      found: foundPrefixes,
      valid: true
    },
    combination: 'उपानुआ',
    combinedMeaning: 'dwelling_in_close_proximity'
  };
}

/**
 * Analyze dwelling location characteristics
 */
function analyzeDwellingLocation(word, context) {
  const { locationType, dwellingType, abstractDwelling } = context;
  
  let type = locationType || 'general';
  let abstract = abstractDwelling || false;
  
  // Common dwelling place categories
  const dwellingTypes = {
    'गृह': { type: 'residential', meaning: 'house' },
    'ग्राम': { type: 'settlement', meaning: 'village' },
    'नगर': { type: 'urban', meaning: 'city' },
    'आश्रम': { type: 'religious', meaning: 'hermitage' },
    'वन': { type: 'natural', meaning: 'forest' },
    'पर्वत': { type: 'geographical', meaning: 'mountain' },
    'तीर': { type: 'geographical', meaning: 'shore' },
    'देश': { type: 'political', meaning: 'country' }
  };

  const normalizedWord = convertToDevanagari(word);
  const dwellingInfo = dwellingTypes[normalizedWord] || { type: type, meaning: 'place' };

  // Determine if abstract
  const abstractPlaces = ['ध्यान', 'स्वप्न', 'कल्पना', 'भावना'];
  if (abstractPlaces.includes(normalizedWord)) {
    abstract = true;
  }

  return {
    word: word,
    type: dwellingInfo.type,
    meaning: dwellingInfo.meaning,
    abstract: abstract,
    suitableForDwelling: true
  };
}

/**
 * Convert text to Devanagari script
 */
function convertToDevanagari(text) {
  if (!text) return '';
  
  // Basic IAST to Devanagari conversion for common terms
  const conversionMap = {
    'vasa': 'वस्',
    'vas': 'वस्',
    'upa': 'उप',
    'anu': 'अनु',
    'āṅ': 'आङ्',
    'gṛha': 'गृह',
    'grāma': 'ग्राम',
    'nagara': 'नगर',
    'āśrama': 'आश्रम',
    'vana': 'वन',
    'parvata': 'पर्वत',
    'tīra': 'तीर',
    'deśa': 'देश',
    'dhyāna': 'ध्यान'
  };

  return conversionMap[text] || text;
}

/**
 * Convert text to IAST script
 */
function convertToIAST(text) {
  if (!text) return '';
  
  // Basic Devanagari to IAST conversion
  const conversionMap = {
    'वस्': 'vas',
    'उप': 'upa',
    'अनु': 'anu',
    'आङ्': 'āṅ',
    'गृह': 'gṛha',
    'ग्राम': 'grāma',
    'नगर': 'nagara',
    'आश्रम': 'āśrama',
    'वन': 'vana',
    'पर्वत': 'parvata',
    'तीर': 'tīra',
    'देश': 'deśa',
    'ध्यान': 'dhyāna'
  };

  return conversionMap[text] || text;
}
