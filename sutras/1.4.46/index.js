/**
 * Sutra 1.4.46: अधिशीङ्स्थाऽऽसां कर्म
 * 
 * When verbs शीङ् (lie down), स्था (stand), and आस् (sit) are preceded by 
 * the preposition अधि, the location takes कर्म कारक designation instead of अधिकरण.
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
    'adhi': 'अधि',
    'śī': 'शी',
    'sthā': 'स्था',
    'ās': 'आस्',
    'paryaṅka': 'पर्यङ्क',
    'śayana': 'शयन',
    'sthāna': 'स्थान',
    'upavedana': 'उपवेशन'
  };
  
  return iastToDevanagari[text] || text;
}

export function sutra1446(
  word, 
  context = {},
  {
    action = context.action,
    preposition = context.preposition,
    verb = context.verb,
    verbForm = context.verbForm,
    person = context.person,
    number = context.number,
    prepositionAnalysis = context.prepositionAnalysis,
    locationMeaning = context.locationMeaning,
    elevation = context.elevation,
    locationType = context.locationType,
    compound = context.compound,
    compoundType = context.compoundType,
    verbalPrefix = context.verbalPrefix,
    prefixAttached = context.prefixAttached,
    normallyAdhikarana = context.normallyAdhikarana,
    karmaPrecedence = context.karmaPrecedence,
    ambiguous = context.ambiguous,
    primaryMeaning = context.primaryMeaning,
    temporalContext = context.temporalContext,
    duration = context.duration
  } = {}
) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      rule: '1.4.46',
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
      rule: '1.4.46',
      applies: false,
      error: 'invalid_sanskrit',
      word: word,
      script: script.toLowerCase(),
      context: context
    };
  }

  // Initialize analysis
  const analysis = {
    rule: '1.4.46',
    applies: false,
    karaka: null,
    preposition: preposition,
    verb: verb,
    verbRoot: null,
    verbAnalysis: {
      recognized: false,
      category: null
    },
    prepositionValid: false,
    prepositionMeaning: null,
    locationType: null,
    elevatedLocation: false,
    compoundAnalysis: false,
    prefixAnalysis: {
      correct: false
    },
    overridesAdhikarana: false,
    karmaPrecedence: false,
    ambiguityResolved: false,
    temporalSupport: false,
    confidence: 0.5,
    reasons: [],
    script: script.toLowerCase(),
    word: word,
    action: action,
    error: null,
    reason: null
  };

  // Check for missing required parameters
  if (!preposition) {
    analysis.error = 'missing_preposition';
    analysis.reason = 'no_adhi_preposition';
    return analysis;
  }

  if (!verb) {
    analysis.error = 'missing_verb';
    return analysis;
  }

  // Step 1: Validate अधि preposition
  const prepositionValidation = validatePreposition(preposition, prepositionAnalysis);
  if (!prepositionValidation.valid) {
    analysis.error = 'invalid_preposition';
    return analysis;
  }

  analysis.prepositionValid = true;
  analysis.prepositionMeaning = prepositionValidation.meaning;

  // Step 2: Validate verb root (शीङ्, स्था, आस्)
  const verbValidation = validateVerbRoot(verb, verbForm);
  if (!verbValidation.valid) {
    analysis.reason = 'invalid_verb_combination';
    return analysis;
  }

  analysis.verbRoot = verbValidation.root;
  analysis.verbAnalysis = verbValidation.analysis;

  // Step 3: Analyze location
  const locationAnalysis = analyzeLocation(word, context);
  analysis.locationType = locationAnalysis.type;
  analysis.elevatedLocation = locationAnalysis.elevated;

  // Step 4: Handle compound analysis
  if (compound) {
    analysis.compoundAnalysis = true;
    analysis.compoundType = compoundType;
  }

  // Step 5: Handle prefix analysis
  if (verbalPrefix && prefixAttached) {
    analysis.prefixAnalysis = {
      correct: verbalPrefix === 'अधि',
      prefix: verbalPrefix
    };
  }

  // Step 6: Apply sutra rule - assign कर्म कारक
  analysis.applies = true;
  analysis.karaka = 'कर्म';
  analysis.confidence = 0.9;
  analysis.reasons.push('adhi_prefix_with_valid_verb');

  // Step 7: Handle override of normal अधिकरण
  if (normallyAdhikarana) {
    analysis.overridesAdhikarana = true;
    analysis.reasons.push('overrides_normal_adhikarana');
  }

  // Step 8: Handle कर्म precedence
  if (karmaPrecedence) {
    analysis.karmaPrecedence = true;
  }

  // Step 9: Handle ambiguity resolution
  if (ambiguous && primaryMeaning) {
    analysis.ambiguityResolved = true;
    analysis.primaryMeaning = primaryMeaning;
  }

  // Step 10: Handle temporal contexts
  if (temporalContext) {
    analysis.temporalSupport = true;
    analysis.temporalContext = temporalContext;
    analysis.duration = duration;
  }

  return analysis;
}

/**
 * Validate the preposition अधि
 */
function validatePreposition(preposition, prepositionAnalysis) {
  // Convert to consistent script for comparison
  const devanagariPrep = convertToDevanagari(preposition);
  
  if (devanagariPrep !== 'अधि') {
    return { valid: false };
  }

  const meaning = prepositionAnalysis?.meaning || 'upon';
  
  return {
    valid: true,
    meaning: meaning,
    type: 'upasarga'
  };
}

/**
 * Validate verb roots (शीङ्, स्था, आस्)
 */
function validateVerbRoot(verb, verbForm) {
  const devanagariVerb = convertToDevanagari(verb);
  
  const validRoots = {
    'शी': {
      meaning: 'lie_down',
      forms: ['शेते', 'शयते', 'शयति', 'शेरे'],
      category: 'positional'
    },
    'स्था': {
      meaning: 'stand',
      forms: ['तिष्ठति', 'तिष्ठते', 'स्थास्यति', 'अस्थात्'],
      category: 'positional'
    },
    'आस्': {
      meaning: 'sit',
      forms: ['आस्ते', 'आसीत्', 'आसन्ते', 'आस्यते'],
      category: 'positional'
    }
  };

  if (!validRoots[devanagariVerb]) {
    return { valid: false };
  }

  const rootData = validRoots[devanagariVerb];
  
  return {
    valid: true,
    root: devanagariVerb,
    analysis: {
      recognized: true,
      category: rootData.category,
      meaning: rootData.meaning,
      validForms: rootData.forms,
      matchesForm: verbForm ? rootData.forms.includes(convertToDevanagari(verbForm)) : null
    }
  };
}

/**
 * Analyze the location context
 */
function analyzeLocation(word, context) {
  const { locationMeaning, elevation, locationType } = context;
  
  // Physical surfaces that commonly take अधि
  const physicalSurfaces = [
    'पर्यङ्क', 'आसन', 'भूमि', 'पर्वत', 'शैया', 'सिंहासन',
    'शिलापट्ट', 'उच्चस्थान'
  ];
  
  const devanagariWord = convertToDevanagari(word);
  
  let type = 'general_location';
  let elevated = false;
  
  if (physicalSurfaces.includes(devanagariWord)) {
    type = 'physical_surface';
  }
  
  if (locationType === 'elevated' || elevation === 'high' || 
      ['पर्वत', 'उच्चस्थान', 'सिंहासन'].includes(devanagariWord)) {
    elevated = true;
  }

  if (locationMeaning) {
    switch (locationMeaning) {
      case 'bed':
      case 'seat':
      case 'ground':
      case 'mountain':
        type = 'physical_surface';
        break;
      default:
        type = 'general_location';
    }
  }
  
  return {
    type: type,
    elevated: elevated,
    word: devanagariWord
  };
}
