/**
 * Sutra 1.4.47: अभिनिविशश्च
 * 
 * This sutra adds the verb अभिनिविश् (to enter) to the list of verbs whose 
 * location takes कर्म कारक designation instead of अधिकरण कारक.
 * This continues from Sutra 1.4.46 which covered अधि + शीङ्/स्था/आस्.
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

/**
 * Simple conversion to Devanagari (if needed)
 */
function convertToDevanagari(text) {
  // Simple conversion - if already in Devanagari, return as is
  // If in IAST, this would need proper conversion (simplified here)
  if (detectScript(text) === 'devanagari') {
    return text;
  }
  
  // Basic IAST to Devanagari conversions for common patterns
  const iastToDevanagari = {
    'abhiniviś': 'अभिनिविश्',
    'viś': 'विश्',
    'gṛha': 'गृह',
    'praveśa': 'प्रवेश',
    'nagara': 'नगर',
    'vana': 'वन'
  };
  
  return iastToDevanagari[text] || text;
}

export function sutra1447(
  word, 
  context = {},
  {
    action = context.action,
    verb = context.verb,
    verbForm = context.verbForm,
    tense = context.tense,
    prefixAnalysis = context.prefixAnalysis,
    locationType = context.locationType,
    locationMeaning = context.locationMeaning,
    abstractEntry = context.abstractEntry,
    enclosed = context.enclosed,
    boundaryType = context.boundaryType,
    accessMethod = context.accessMethod,
    rootAnalysis = context.rootAnalysis,
    prefixValidation = context.prefixValidation,
    direction = context.direction,
    spatialRelation = context.spatialRelation,
    entryPoint = context.entryPoint,
    boundaryCrossing = context.boundaryCrossing,
    crossingMethod = context.crossingMethod,
    normallyAdhikarana = context.normallyAdhikarana,
    karmaPrecedence = context.karmaPrecedence,
    conflictResolution = context.conflictResolution,
    entryType = context.entryType,
    accessibilityMethod = context.accessibilityMethod,
    cognitiveProcess = context.cognitiveProcess,
    membershipType = context.membershipType,
    extendsPrevious = context.extendsPrevious,
    previousSutraReference = context.previousSutraReference,
    consistencyCheck = context.consistencyCheck,
    multipleEntries = context.multipleEntries,
    preferredEntry = context.preferredEntry,
    temporalEntry = context.temporalEntry,
    timeContext = context.timeContext,
    metaphoricalEntry = context.metaphoricalEntry,
    metaphorType = context.metaphorType
  } = {}
) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      rule: '1.4.47',
      applies: false,
      error: 'empty_input',
      word: word,
      context: context
    };
  }

  // Detect script and validate
  const script = detectScript(word);
  const validation = validateSanskritWord(word);
  if (!validation.isValid) {
    return {
      rule: '1.4.47',
      applies: false,
      error: 'invalid_sanskrit',
      word: word,
      script: script.toLowerCase(),
      context: context
    };
  }

  // Initialize analysis
  const analysis = {
    rule: '1.4.47',
    applies: false,
    karaka: null,
    verb: verb,
    verbMeaning: null,
    verbRoot: null,
    verbAnalysis: {
      formRecognized: false,
      tense: null,
      class: null
    },
    prefixAnalysis: {
      recognized: false
    },
    prefixCombination: null,
    prefixValidation: {
      correct: false
    },
    combinedMeaning: null,
    entryLocation: {
      type: null,
      abstract: false
    },
    enclosedSpace: false,
    entryMethod: null,
    directionalAnalysis: {
      direction: null
    },
    spatialContext: null,
    boundaryCrossing: false,
    crossingAnalysis: null,
    overridesAdhikarana: false,
    karmaPrecedence: false,
    entryType: null,
    cognitiveEntry: false,
    socialEntry: false,
    extendsPreviousSutra: false,
    sutraChain: [],
    consistentWithPrevious: false,
    multipleEntryMethods: false,
    temporalEntry: false,
    metaphoricalEntry: false,
    confidence: 0.5,
    reasons: [],
    script: script.toLowerCase(),
    word: word,
    action: action,
    error: null,
    reason: null
  };

  // Check for missing required parameters
  if (!verb) {
    analysis.error = 'missing_verb';
    return analysis;
  }

  // Step 1: Validate अभिनिविश् verb
  const verbValidation = validateAbhinivishVerb(verb, verbForm);
  if (!verbValidation.valid) {
    analysis.reason = verbValidation.reason;
    return analysis;
  }

  analysis.verbMeaning = verbValidation.meaning;
  analysis.verbRoot = verbValidation.root;
  analysis.verbAnalysis = verbValidation.analysis;

  // Step 2: Analyze prefix combination
  const prefixAnalysisResult = analyzePrefixCombination(prefixAnalysis, prefixValidation);
  analysis.prefixAnalysis = prefixAnalysisResult.analysis;
  analysis.prefixCombination = prefixAnalysisResult.combination;
  analysis.prefixValidation = prefixAnalysisResult.validation;
  analysis.combinedMeaning = prefixAnalysisResult.combinedMeaning;

  // Step 3: Analyze entry location
  const locationAnalysis = analyzeEntryLocation(word, context);
  analysis.entryLocation = locationAnalysis;
  
  // Add abstractEntry property if specified
  if (abstractEntry) {
    analysis.abstractEntry = true;
  }

  // Step 4: Handle special entry contexts
  if (enclosed) {
    analysis.enclosedSpace = true;
    analysis.entryMethod = accessMethod || 'standard_entrance';
  }

  if (direction) {
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

  // Step 5: Apply sutra rule - assign कर्म कारक
  analysis.applies = true;
  analysis.karaka = 'कर्म';
  analysis.confidence = 0.9;
  analysis.reasons.push('abhinivish_verb_designates_karma');

  // Step 6: Handle override of normal अधिकरण
  if (normallyAdhikarana) {
    analysis.overridesAdhikarana = true;
    analysis.reasons.push('overrides_normal_adhikarana');
  }

  // Step 7: Handle कर्म precedence
  if (karmaPrecedence) {
    analysis.karmaPrecedence = true;
  }

  // Step 8: Handle entry type analysis
  if (entryType) {
    analysis.entryType = entryType;
    if (entryType === 'conceptual') {
      analysis.cognitiveEntry = true;
    } else if (entryType === 'social') {
      analysis.socialEntry = true;
    }
  }

  // Step 9: Handle integration with previous sutras
  if (extendsPrevious && previousSutraReference) {
    analysis.extendsPreviousSutra = true;
    analysis.sutraChain = [previousSutraReference, '1.4.47'];
  }

  if (consistencyCheck) {
    analysis.consistentWithPrevious = true;
  }

  // Step 10: Handle edge cases
  if (multipleEntries) {
    analysis.multipleEntryMethods = true;
    analysis.entryOptions = multipleEntries;
    analysis.preferredEntry = preferredEntry;
  }

  if (temporalEntry) {
    analysis.temporalEntry = true;
    analysis.timeContext = timeContext;
  }

  if (metaphoricalEntry) {
    analysis.metaphoricalEntry = true;
    analysis.metaphorType = metaphorType;
  }

  return analysis;
}

/**
 * Validate the अभिनिविश् verb
 */
function validateAbhinivishVerb(verb, verbForm) {
  const devanagariVerb = convertToDevanagari(verb);
  
  if (devanagariVerb !== 'अभिनिविश्') {
    if (devanagariVerb === 'विश्') {
      return {
        valid: false,
        reason: 'missing_required_prefix'
      };
    } else {
      return {
        valid: false,
        reason: 'invalid_verb'
      };
    }
  }

  const verbForms = {
    'present': ['विशति', 'अभिनिविशति'],
    'perfect': ['विवेश', 'अभिनिविवेश'],
    'future': ['वेक्ष्यति', 'अभिनिवेक्ष्यति'],
    'aorist': ['अविशत्', 'अभिन्यविशत्']
  };

  let formRecognized = false;
  let recognizedTense = null;

  if (verbForm) {
    const devanagariForm = convertToDevanagari(verbForm);
    for (const [tense, forms] of Object.entries(verbForms)) {
      if (forms.some(form => form.includes(devanagariForm) || devanagariForm.includes(form))) {
        formRecognized = true;
        recognizedTense = tense;
        break;
      }
    }
  }

  return {
    valid: true,
    meaning: 'enter',
    root: 'विश्',
    analysis: {
      formRecognized: formRecognized,
      tense: recognizedTense,
      class: 'षष्ठ',
      prefixRequired: true
    }
  };
}

/**
 * Analyze prefix combination अभि + नि
 */
function analyzePrefixCombination(prefixAnalysis, prefixValidation) {
  let recognized = false;
  let combination = null;
  let validation = { correct: false };
  let combinedMeaning = null;

  if (prefixAnalysis) {
    if (prefixAnalysis.abhiPrefix && prefixAnalysis.niPrefix && prefixAnalysis.root === 'विश्') {
      recognized = true;
      combination = 'अभिनि';
    }
  }

  if (prefixValidation) {
    if (prefixValidation.abhiMeaning === 'towards' && 
        prefixValidation.niMeaning === 'into' &&
        prefixValidation.combined === 'entering_into') {
      validation.correct = true;
      combinedMeaning = 'entering_into';
    }
  }

  return {
    analysis: { recognized },
    combination,
    validation,
    combinedMeaning
  };
}

/**
 * Analyze entry location context
 */
function analyzeEntryLocation(word, context) {
  const { locationType, locationMeaning, abstractEntry } = context;
  
  const entryLocations = {
    'building': ['गृह', 'भवन', 'मन्दिर', 'राजप्रासाद'],
    'settlement': ['नगर', 'ग्राम', 'पुर'],
    'natural': ['वन', 'पर्वत', 'गुहा'],
    'religious': ['मन्दिर', 'आश्रम', 'मठ'],
    'royal': ['राजप्रासाद', 'दुर्ग']
  };
  
  const devanagariWord = convertToDevanagari(word);
  
  let type = locationType || 'general_location';
  let abstract = abstractEntry || false;
  
  // Determine type from word if not provided
  if (!locationType) {
    for (const [category, words] of Object.entries(entryLocations)) {
      if (words.includes(devanagariWord)) {
        type = category;
        break;
      }
    }
  }
  
  // Handle abstract entries
  const abstractWords = ['ध्यान', 'समाधि', 'स्वप्न', 'विषय'];
  if (abstractWords.includes(devanagariWord)) {
    abstract = true;
    type = 'mental_state';
  }
  
  return {
    type: type,
    abstract: abstract,
    word: devanagariWord,
    meaning: locationMeaning
  };
}
