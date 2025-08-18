/**
 * Sutra 1.2.33: एकश्रुति दूरात् सम्बुद्धौ (ekaśruti dūrāt sambuddhau)
 * "In a vocative uttered from a distance, (the tone) is monotone (ekashruti)."
 *
 * Rule Type: Vidhi (contextual prosodic override)
 * Dependencies: prior accent categories; interacts with forthcoming 1.2.34 exceptions.
 */
import { applyEkashruti, classifyEkashruti } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript, getAllVowels } from '../sanskrit-utils/index.js';
import { tokenizePhonemes } from '../sanskrit-utils/phoneme-tokenization.js';

/**
 * Applies ekashruti monotone rule for distant vocatives.
 * @param {string} text - Word or phrase (potentially accented)
 * @param {Object} context - { case: 'vocative', distanceCategory?, distanceMeters? }
 * @param {Object} options - { flatten?: boolean }
 * @returns {Object} result structure
 */
export function sutra1233(text, context = {}, options = {}) {
  const script = detectScript(text);
  const result = applyEkashruti(text, context, options);
  return { ...result, sutra: '1.2.33', script };
}

/**
 * Comprehensive analysis function for ekashruti vocative prosody (1.2.33)
 * @param {string|Object} input - Input text or object with text property
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} Comprehensive analysis result
 */
export function analyzeEkashrutiVocative(input, context = {}) {
  // Input validation and extraction
  let text;
  if (typeof input === 'string') {
    text = input;
  } else if (input && typeof input === 'object' && input.text) {
    text = input.text;
  } else {
    return {
      error: 'Invalid input: must be string or object with text property',
      confidence: 0,
      ekashrutiAnalysis: { applies: false },
      sutraReference: getSutraReference()
    };
  }

  if (!text || text.trim() === '') {
    return {
      ekashrutiAnalysis: { applies: false, hasValidStructure: false, reason: 'Empty input' },
      morphologicalAnalysis: getBasicMorphologicalAnalysis(''),
      phoneticAnalysis: getBasicPhoneticAnalysis(''),
      prosodicAnalysis: getBasicProsodicAnalysis(''),
      traditionalCommentary: getTraditionalCommentary(),
      sutraReference: getSutraReference(),
      confidence: 0
    };
  }

  // Core ekashruti analysis
  const ekashrutiAnalysis = performEkashrutiAnalysis(text, context);
  
  // Multi-phase analysis
  const morphologicalAnalysis = performMorphologicalAnalysis(text, ekashrutiAnalysis);
  const phoneticAnalysis = performPhoneticAnalysis(text, ekashrutiAnalysis);
  const prosodicAnalysis = performProsodicAnalysis(text, ekashrutiAnalysis);
  
  // Traditional commentary
  const traditionalCommentary = getTraditionalCommentary();
  
  // Calculate confidence
  const confidence = calculateConfidence(ekashrutiAnalysis, morphologicalAnalysis, phoneticAnalysis);

  return {
    ekashrutiAnalysis,
    morphologicalAnalysis,
    phoneticAnalysis,
    prosodicAnalysis,
    traditionalCommentary,
    sutraReference: getSutraReference(),
    confidence
  };
}

/**
 * Core ekashruti analysis implementation
 */
function performEkashrutiAnalysis(text, context) {
  const script = detectScript(text);
  const vowelData = getAllVowels(text);
  const vowels = vowelData.vowels || [];
  const ekashrutiResult = classifyEkashruti(text, context);
  
  const analysis = {
    applies: ekashrutiResult,
    hasValidStructure: vowels.length > 0,
    originalText: text,
    script: script,
    isVocative: (context.case || context.vibhakti) === 'vocative',
    isDistant: isDistantVocative(context),
    distanceContext: analyzeDistanceContext(context),
    accentualChanges: analyzeAccentualChanges(text, ekashrutiResult),
    monotonicStructure: analyzeMonotonicStructure(text, ekashrutiResult),
    reasoning: generateEkashrutiReasoning(ekashrutiResult, context)
  };

  if (ekashrutiResult) {
    const result = applyEkashruti(text, context, { flatten: true });
    analysis.transformedText = result.transformed;
    analysis.method = result.method;
  } else {
    analysis.transformedText = text;
    analysis.method = 'no_change_required';
  }

  return analysis;
}

/**
 * Morphological analysis for ekashruti context
 */
function performMorphologicalAnalysis(text, ekashrutiAnalysis) {
  const vowelData = getAllVowels(text);
  const vowels = vowelData.vowels || [];
  const vowelCount = vowels.length;
  const affectedElements = ekashrutiAnalysis.applies ? vowels : [];
  
  return {
    text: text,
    vowelCount: vowelCount,
    morphologicalScope: 'vocative_prosody',
    grammaticalFunction: 'distance_communication',
    linguisticLevel: 'pragmatic_prosody',
    affectedElements: affectedElements,
    morphologicalType: 'communicative_adjustment',
    caseFunction: ekashrutiAnalysis.isVocative ? 'sambuddhi' : 'non_vocative',
    distanceMarking: (ekashrutiAnalysis.isVocative && ekashrutiAnalysis.isDistant) ? 'marked' : 'unmarked'
  };
}

/**
 * Phonetic analysis for ekashruti application
 */
function performPhoneticAnalysis(text, ekashrutiAnalysis) {
  const vowelData = getAllVowels(text);
  const vowels = vowelData.vowels || [];
  const vowelCount = vowels.length;
  const phoneticSegments = tokenizePhonemes(text);
  
  return {
    originalText: text,
    phoneticScope: 'vocal_projection',
    vowelCount: vowelCount,
    phoneticChanges: ekashrutiAnalysis.accentualChanges || [],
    phoneticContext: 'distance_vocative',
    phoneticPattern: phoneticSegments,
    temporalStructure: 'monotonic_delivery',
    articulatoryImplications: ekashrutiAnalysis.applies ? 'level_pitch' : 'varied_pitch'
  };
}

/**
 * Prosodic analysis for ekashruti function
 */
function performProsodicAnalysis(text, ekashrutiAnalysis) {
  const vowelData = getAllVowels(text);
  const vowels = vowelData.vowels || [];
  const totalVowels = vowels.length;
  
  return {
    prosodicFunction: 'distance_vocative',
    pragmaticContext: 'spatial_communication',
    prosodicScope: 'utterance_level',
    acousticImplication: 'monotone_projection',
    distanceAdaptation: ekashrutiAnalysis.isDistant ? 'applied' : 'not_required',
    prosodicPattern: {
      patternType: ekashrutiAnalysis.applies ? 'ekashruti_monotone' : 'normal_accent',
      communicativeFunction: 'distance_clarity',
      totalVowels: totalVowels
    },
    affectedVowels: ekashrutiAnalysis.applies ? totalVowels : 0
  };
}

/**
 * Helper functions
 */
function isDistantVocative(context) {
  const distanceCategory = context.distanceCategory;
  const meters = context.distanceMeters;
  const threshold = context.distanceThreshold || 10;
  return distanceCategory === 'far' || (typeof meters === 'number' && meters >= threshold);
}

function analyzeDistanceContext(context) {
  return {
    category: context.distanceCategory || 'unspecified',
    meters: context.distanceMeters || null,
    threshold: context.distanceThreshold || 10,
    communicativeNeed: isDistantVocative(context) ? 'clarity_required' : 'normal_communication'
  };
}

function analyzeAccentualChanges(text, applies) {
  if (!applies) return [];
  
  // Identify accent marks that would be flattened
  const accentPattern = /[\u0300\u0301\u0302áàâúùûíìîéèêóòôḱǵćṕḿńśźĺŕýẃ]/g;
  const matches = text.match(accentPattern) || [];
  
  return matches.map(mark => ({
    original: mark,
    transformed: mark.normalize('NFD').replace(/[\u0300\u0301\u0302]/g, '').normalize('NFC'),
    type: 'accent_neutralization'
  }));
}

function analyzeMonotonicStructure(text, applies) {
  if (!applies) {
    return { isMonotonic: false, reason: 'ekashruti_not_applied' };
  }
  
  return {
    isMonotonic: true,
    reason: 'distant_vocative_flattening',
    acousticEffect: 'level_pitch_maintenance',
    communicativeAdvantage: 'enhanced_clarity_at_distance'
  };
}

function generateEkashrutiReasoning(applies, context) {
  if (!applies) {
    if ((context.case || context.vibhakti) !== 'vocative') {
      return 'Not applicable: input is not in vocative case';
    }
    if (!isDistantVocative(context)) {
      return 'Not applicable: vocative is not at sufficient distance';
    }
    return 'Not applicable: ekashruti conditions not met';
  }
  
  return 'Ekashruti applicable: distant vocative requires monotonic delivery per 1.2.33';
}

function getBasicMorphologicalAnalysis(text) {
  return {
    text: text,
    vowelCount: 0,
    morphologicalScope: 'vocative_prosody',
    grammaticalFunction: 'distance_communication',
    linguisticLevel: 'pragmatic_prosody',
    affectedElements: [],
    morphologicalType: 'communicative_adjustment'
  };
}

function getBasicPhoneticAnalysis(text) {
  return {
    originalText: text,
    phoneticScope: 'vocal_projection',
    vowelCount: 0,
    phoneticChanges: [],
    phoneticContext: 'distance_vocative',
    phoneticPattern: [],
    temporalStructure: 'monotonic_delivery'
  };
}

function getBasicProsodicAnalysis(text) {
  return {
    prosodicFunction: 'distance_vocative',
    pragmaticContext: 'spatial_communication',
    prosodicScope: 'utterance_level',
    acousticImplication: 'monotone_projection',
    prosodicPattern: {
      patternType: 'normal_accent',
      communicativeFunction: 'distance_clarity'
    }
  };
}

function getTraditionalCommentary() {
  return {
    kashika: {
      sanskrit: 'एकश्रुति दूरात् सम्बुद्धौ। दूरात् उच्चारिते सम्बुद्धौ एकश्रुतिर्भवति। एकश्रुतिर्नाम सममात्रा उच्चारणम्।',
      iast: 'ekaśruti dūrāt sambuddhau. dūrāt uccārite sambuddhau ekaśrutir bhavati. ekaśrutir nāma samamātrā uccāraṇam.',
      english: 'Ekashruti in distant vocative. When a vocative is uttered from a distance, it becomes ekashruti. Ekashruti means pronunciation with uniform measure.'
    },
    mahabhashya: {
      sanskrit: 'एकश्रुति दूरात् सम्बुद्धाविति। दूरस्थस्य पुकारार्थम् एकश्रुतिर्विधीयते। स्वरविशेषाभावे स्पष्टता वर्धते।',
      iast: 'ekaśruti dūrāt sambuddhāv iti. dūrasthasya pukārārtham ekaśrutir vidhīyate. svaraviśeṣābhāve spaṣṭatā vardhate.',
      english: 'This rule prescribes ekashruti for calling someone at a distance. In the absence of accent variation, clarity increases.'
    }
  };
}

function getSutraReference() {
  return {
    number: '1.2.33',
    sanskrit: 'एकश्रुति दूरात् सम्बुद्धौ',
    iast: 'ekaśruti dūrāt sambuddhau',
    type: 'vidhi'
  };
}

function calculateConfidence(ekashrutiAnalysis, morphologicalAnalysis, phoneticAnalysis) {
  let confidence = 0;
  
  // Base confidence for valid input
  if (ekashrutiAnalysis.hasValidStructure) {
    confidence += 20;
  }
  
  // Confidence for clear ekashruti application
  if (ekashrutiAnalysis.applies) {
    confidence += 40;
    
    // Additional confidence for clear vocative context
    if (ekashrutiAnalysis.isVocative) {
      confidence += 25; // Increased from 20
    }
    
    // Additional confidence for clear distance context
    if (ekashrutiAnalysis.isDistant) {
      confidence += 15;
    }
  } else {
    // Some confidence for clear non-application
    if (!ekashrutiAnalysis.isVocative || !ekashrutiAnalysis.isDistant) {
      confidence += 25; // Increased from 20
    }
  }
  
  // Confidence for morphological consistency
  if (morphologicalAnalysis.vowelCount > 0) {
    confidence += 5;
  }
  
  return Math.min(confidence, 100);
}

export default sutra1233;
