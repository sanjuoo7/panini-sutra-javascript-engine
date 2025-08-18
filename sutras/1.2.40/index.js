import { 
  applySannataraSubstitution,
  findSannataraTargets 
} from '../sanskrit-utils/accent-sannatara-rules.js';
import { 
  detectScript, 
  sanitizeInput
} from '../sanskrit-utils/index.js';
import { 
  analyzeVowelAccent,
  ACCENT_TYPES 
} from '../sanskrit-utils/accent-analysis.js';

/**
 * Sutra 1.2.40: उदात्तस्वरितपरस्य सन्नतरः (udāttasvaritaparasya sannataraḥ)
 * "The accent called sannatara is substituted for an anudātta vowel which has an udātta or svarita following it."
 *
 * @fileoverview Implementation of Panini's Sutra 1.2.40
 */

/**
 * Definition data for sannatara accent rule
 */
const SANNATARA_DEFINITION = {
  sanskrit: 'उदात्तस्वरितपरस्य सन्नतरः',
  iast: 'udāttasvaritaparasya sannataraḥ',
  type: 'vidhi',
  scope: 'accent_substitution',
  description: {
    sanskrit: 'उदात्तस्वरितपरे अनुदात्ते सन्नतरो भवति',
    english: 'Sannatara accent substitutes anudātta when followed by udātta or svarita'
  },
  properties: {
    target: 'anudātta_vowel',
    condition: 'followed_by_udātta_or_svarita',
    result: 'sannatara_accent',
    scope: 'prosodic_phonology'
  }
};

/**
 * Traditional commentary references
 */
const TRADITIONAL_COMMENTARY = {
  kashika: {
    sanskrit: 'उदात्तस्वरितपरस्य अनुदात्तस्य सन्नतरः संज्ञा भवति। उदात्तस्वरितयोः परे वर्तमानस्य अनुदात्तस्य सन्नतर इति संज्ञा।',
    iast: 'udāttasvaritaparasya anudāttasya sannatāraḥ saṃjñā bhavati. udāttasvaritayoḥ pare vartamānasya anudāttasya sannatara iti saṃjñā.',
    english: 'The technical term sannatara is applied to anudātta that is followed by udātta or svarita'
  },
  mahabhashya: {
    sanskrit: 'सन्नतरसंज्ञकस्य प्रयोजनम् स्वरसाम्याधिकारे द्रष्टव्यम्',
    iast: 'sannatārasaṃjñakasya prayojanam svarasāmyādhikāre draṣṭavyam',
    english: 'The purpose of the sannatara designation is seen in the accent harmony rules'
  }
};

/**
 * Original function for backward compatibility
 */
export function applySutra1_2_40(text, context = {}, options = {}) {
  const result = applySannataraSubstitution(text, { ...options, script: context.script });
  return {
    sutra: '1.2.40',
    input: text,
    ...result
  };
}

/**
 * Analyzes sannatara accent application with comprehensive analysis
 * @param {string|Object} input - The Sanskrit text or analysis context
 * @returns {Object} Comprehensive analysis of sannatara accent application
 */
export function analyzeSannatara(input) {
  // Input validation and normalization
  const context = typeof input === 'string' ? { text: input } : (input || {});
  const rawText = context.text;
  
  if (!rawText) {
    return createEmptyAnalysis('Invalid input: text is required');
  }

  // Sanitize input
  const sanitized = sanitizeInput(rawText);
  if (!sanitized.success) {
    return createEmptyAnalysis(`Input sanitization failed: ${sanitized.error}`);
  }
  
  const text = sanitized.sanitized;

  // Script detection
  const scriptResult = detectScript(text);
  const script = scriptResult.toLowerCase();

  // Basic validation
  if (script === 'unknown') {
    return createEmptyAnalysis(`Unsupported script: ${text}`);
  }

  // Create comprehensive analysis
  const analysis = {
    input: {
      text: text,
      script: script,
      isValid: true
    },
    sannataraAnalysis: analyzeSannataraApplication(text, script),
    morphologicalAnalysis: analyzeMorphology(text, script),
    phoneticAnalysis: analyzePhonetics(text, script),
    prosodicAnalysis: analyzeProsody(text, script),
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    sutraReference: {
      number: '1.2.40',
      sanskrit: SANNATARA_DEFINITION.sanskrit,
      iast: SANNATARA_DEFINITION.iast,
      type: SANNATARA_DEFINITION.type
    },
    confidence: 0
  };

  // Calculate confidence
  analysis.confidence = calculateSannataraConfidence(analysis);

  return analysis;
}

/**
 * Analyzes sannatara accent application
 */
function analyzeSannataraApplication(text, script) {
  const detection = findSannataraTargets(text, { script });
  const application = applySannataraSubstitution(text, { script });
  
  return {
    applies: detection.applies,
    targetIndices: detection.indices,
    count: detection.count,
    reasoning: detection.reasoning,
    accentChanges: application.metadata || [],
    originalText: text,
    transformedText: application.transformed,
    hasValidTargets: detection.indices.length > 0
  };
}

/**
 * Analyzes morphological aspects
 */
function analyzeMorphology(text, script) {
  const detection = findSannataraTargets(text, { script });
  
  return {
    text: text,
    wordCount: text.split(/\s+/).length,
    affectedPositions: detection.indices,
    morphologicalScope: 'prosodic_unit',
    accentualFunction: 'stress_modification',
    linguisticLevel: 'suprasegmental'
  };
}

/**
 * Analyzes phonetic properties
 */
function analyzePhonetics(text, script) {
  const detection = findSannataraTargets(text, { script });
  const chars = Array.from(text);
  
  const phoneticChanges = detection.indices.map(index => {
    const char = chars[index];
    const accentAnalysis = analyzeVowelAccent(char, { script });
    
    return {
      position: index,
      character: char,
      originalAccent: accentAnalysis.accentType,
      newAccent: ACCENT_TYPES.SANNATARA,
      phoneticChange: 'accent_modification'
    };
  });
  
  return {
    originalText: text,
    accentedVowels: phoneticChanges.length,
    phoneticChanges: phoneticChanges,
    accentPattern: getAccentPattern(text, script),
    phoneticScope: 'vowel_accent'
  };
}

/**
 * Analyzes prosodic properties
 */
function analyzeProsody(text, script) {
  const detection = findSannataraTargets(text, { script });
  
  return {
    prosodicFunction: 'accent_harmony',
    accentualContext: 'udātta_svarita_following',
    prosodicScope: 'syllable_sequence',
    metricalImplication: 'stress_redistribution',
    applicationCount: detection.count,
    prosodicPattern: analyzePrododicPattern(text, script, detection.indices)
  };
}

/**
 * Gets accent pattern of text
 */
function getAccentPattern(text, script) {
  const chars = Array.from(text);
  const pattern = [];
  
  for (const char of chars) {
    const accentAnalysis = analyzeVowelAccent(char, { script, strict: false });
    if (accentAnalysis.isValid) {
      pattern.push(accentAnalysis.accentType);
    }
  }
  
  return pattern;
}

/**
 * Analyzes prosodic pattern
 */
function analyzePrododicPattern(text, script, targetIndices) {
  const pattern = getAccentPattern(text, script);
  
  return {
    originalPattern: pattern,
    changedPositions: targetIndices,
    prosodicRule: 'sannatara_substitution',
    rhythmicEffect: targetIndices.length > 0 ? 'modified' : 'unchanged'
  };
}

/**
 * Simple check if text contains accented content
 */
function hasAccentedContent(text) {
  // Check for Vedic accent marks
  const accentMarks = /[॒॑॓]/;
  return accentMarks.test(text);
}

/**
 * Creates empty analysis result
 */
function createEmptyAnalysis(error) {
  return {
    input: { text: '', script: 'unknown', isValid: false },
    sannataraAnalysis: { applies: false, hasValidTargets: false },
    morphologicalAnalysis: {},
    phoneticAnalysis: {},
    prosodicAnalysis: {},
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    sutraReference: {
      number: '1.2.40',
      sanskrit: SANNATARA_DEFINITION.sanskrit,
      iast: SANNATARA_DEFINITION.iast,
      type: SANNATARA_DEFINITION.type
    },
    error: error,
    confidence: 0
  };
}

/**
 * Calculates confidence score for sannatara analysis
 */
function calculateSannataraConfidence(analysis) {
  let confidence = 0;
  
  if (analysis.sannataraAnalysis.applies) {
    confidence += 40;
    
    if (analysis.sannataraAnalysis.count > 0) {
      confidence += 30;
    }
    
    if (analysis.phoneticAnalysis.phoneticChanges.length > 0) {
      confidence += 15;
    }
    
    if (analysis.prosodicAnalysis.applicationCount > 0) {
      confidence += 10;
    }
    
    if (analysis.input.isValid) {
      confidence += 5;
    }
  } else {
    // Low confidence when no sannatara application found
    confidence = 20;
  }
  
  return Math.min(confidence, 100);
}

export default applySutra1_2_40;
