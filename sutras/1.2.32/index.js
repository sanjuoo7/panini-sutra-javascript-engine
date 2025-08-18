/**
 * Sutra 1.2.32: तस्यादित उदात्तमर्धह्रस्वम् (tasyādita udāttam ardha-hrasvam)
 * "Of it (the svarita), the initial portion is udātta to the extent of half a short unit."
 *
 * Rule Type: Vidhi (specifying internal prosodic structure of previously defined svarita)
 * Dependencies: 1.2.29-1.2.31 (accent categories), 1.2.27 (duration units)
 *
 * This implementation provides a decomposition of a svarita-marked vowel into
 * two temporal/pitch segments for downstream prosody-aware logic.
 */
import { decomposeSvarita } from '../sanskrit-utils/accent-prosody-analysis.js';
import { analyzeVowelAccent, ACCENT_TYPES } from '../sanskrit-utils/accent-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { sanitizeInput } from '../sanskrit-utils/validation.js';

// Enhanced traditional commentary for sutra 1.2.32
const TRADITIONAL_COMMENTARY = {
  kashika: {
    sanskrit: 'तस्य स्वरितस्य आदित उदात्तम् अर्धह्रस्वम्। स्वरितस्य प्रारम्भे उदात्तत्वम् अर्धमात्राप्रमाणम्।',
    iast: 'tasya svaritasya ādita udāttam ardha-hrasvam. svaritasya prārambhe udāttatvam ardhamātrāpramāṇam.',
    english: 'Of that svarita, the initial portion is udātta to the extent of half a short unit. The udātta quality at the beginning of svarita is of half-mātrā measure.'
  },
  mahabhashya: {
    sanskrit: 'तस्यादित उदात्तमर्धह्रस्वमिति। स्वरितस्य विभागार्थम् एतत्। प्रारम्भे उदात्तत्वम् अर्धमात्राप्रमाणम्।',
    iast: 'tasyādita udāttam ardha-hrasvam iti. svaritasya vibhāgārtham etat. prārambhe udāttatvam ardhamātrāpramāṇam.',
    english: 'This rule is for the division of svarita. The udātta quality at the beginning is of half-mātrā measure.'
  }
};

// Svarita decomposition definition from sutra 1.2.32
const SVARITA_DECOMPOSITION_DEFINITION = {
  sanskrit: 'तस्यादित उदात्तमर्धह्रस्वम्',
  iast: 'tasyādita udāttam ardha-hrasvam',
  type: 'vidhi'
};

/**
 * Main decomposition function for Sutra 1.2.32
 * @param {string} vowel - Accent-bearing vowel string
 * @param {Object} context - Options { script?, strict? }
 * @returns {Object} decomposition result
 */
export function sutra1232(vowel, context = {}) {
  const script = context.script || detectScript(vowel);
  const accent = analyzeVowelAccent(vowel, { script, strict: !!context.strict });
  if (!accent.isValid || accent.accentType !== ACCENT_TYPES.SVARITA) {
    return {
      applies: false,
      reason: 'Not a svarita vowel',
      input: vowel,
      script
    };
  }
  const decomposition = decomposeSvarita(vowel, { script, strict: !!context.strict });
  return {
    ...decomposition,
    sutra: '1.2.32'
  };
}

/**
 * Comprehensive analysis of svarita decomposition according to sutra 1.2.32
 * @param {string|Object} input - Text to analyze or object with text property
 * @param {Object} options - Analysis options
 * @returns {Object} Complete svarita decomposition analysis
 */
export function analyzeSvaritaDecomposition(input, options = {}) {
  // Input validation and sanitization
  let text;
  if (typeof input === 'object' && input !== null) {
    text = input.text || '';
  } else if (typeof input === 'string') {
    text = input;
  } else {
    return {
      error: 'Invalid input: expected string or object with text property',
      confidence: 0,
      decompositionAnalysis: { applies: false, hasValidStructure: false, count: 0 },
      morphologicalAnalysis: {},
      phoneticAnalysis: {},
      prosodicAnalysis: {},
      traditionalCommentary: TRADITIONAL_COMMENTARY,
      sutraReference: {
        number: '1.2.32',
        sanskrit: SVARITA_DECOMPOSITION_DEFINITION.sanskrit,
        iast: SVARITA_DECOMPOSITION_DEFINITION.iast,
        type: SVARITA_DECOMPOSITION_DEFINITION.type
      }
    };
  }

  const sanitizationResult = sanitizeInput(text);
  if (!sanitizationResult.success) {
    return {
      error: 'Empty or invalid text after sanitization',
      confidence: 0,
      decompositionAnalysis: { applies: false, hasValidStructure: false, count: 0 },
      morphologicalAnalysis: {},
      phoneticAnalysis: {},
      prosodicAnalysis: {},
      traditionalCommentary: TRADITIONAL_COMMENTARY,
      sutraReference: {
        number: '1.2.32',
        sanskrit: SVARITA_DECOMPOSITION_DEFINITION.sanskrit,
        iast: SVARITA_DECOMPOSITION_DEFINITION.iast,
        type: SVARITA_DECOMPOSITION_DEFINITION.type
      }
    };
  }

  const sanitizedText = sanitizationResult.sanitized;
  const script = detectScript(sanitizedText);

  // Initialize comprehensive analysis structure
  const analysis = {
    decompositionAnalysis: analyzeSvaritaDecompositionStructure(sanitizedText, script),
    morphologicalAnalysis: analyzeMorphology(sanitizedText, script),
    phoneticAnalysis: analyzePhonetics(sanitizedText, script),
    prosodicAnalysis: analyzeProsody(sanitizedText, script),
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    sutraReference: {
      number: '1.2.32',
      sanskrit: SVARITA_DECOMPOSITION_DEFINITION.sanskrit,
      iast: SVARITA_DECOMPOSITION_DEFINITION.iast,
      type: SVARITA_DECOMPOSITION_DEFINITION.type
    },
    confidence: 0
  };

  // Calculate confidence
  analysis.confidence = calculateDecompositionConfidence(analysis);

  return analysis;
}

/**
 * Analyzes svarita decomposition structure
 */
function analyzeSvaritaDecompositionStructure(text, script) {
  const vowels = Array.from(text).filter(char => {
    const accent = analyzeVowelAccent(char, { script });
    return accent.isValid;
  });

  const decompositions = vowels.map(vowel => {
    const accent = analyzeVowelAccent(vowel, { script });
    if (accent.accentType === ACCENT_TYPES.SVARITA) {
      const decomposition = decomposeSvarita(vowel, { script });
      return {
        vowel,
        applies: true,
        decomposition,
        segments: decomposition.segments || [],
        reasoning: 'Svarita vowel decomposed according to 1.2.32'
      };
    } else {
      return {
        vowel,
        applies: false,
        decomposition: null,
        segments: [],
        reasoning: 'Not a svarita vowel - decomposition not applicable'
      };
    }
  });

  const applicableCount = decompositions.filter(d => d.applies).length;

  return {
    applies: applicableCount > 0,
    hasValidStructure: applicableCount > 0,
    count: applicableCount,
    totalVowels: vowels.length,
    decompositions,
    reasoning: applicableCount > 0 ? 'Svarita decomposition applicable' : 'No svarita vowels found for decomposition',
    originalText: text
  };
}

/**
 * Analyzes morphological properties for svarita decomposition
 */
function analyzeMorphology(text, script) {
  const vowels = Array.from(text).filter(char => {
    const accent = analyzeVowelAccent(char, { script });
    return accent.isValid;
  });
  
  return {
    text: text,
    vowelCount: vowels.length,
    morphologicalScope: 'prosodic_segmentation',
    grammaticalFunction: 'accent_decomposition',
    linguisticLevel: 'suprasegmental',
    affectedElements: vowels,
    morphologicalType: 'prosodic_structure'
  };
}

/**
 * Analyzes phonetic properties for svarita decomposition
 */
function analyzePhonetics(text, script) {
  const vowels = Array.from(text).filter(char => {
    const accent = analyzeVowelAccent(char, { script });
    return accent.isValid;
  });
  
  return {
    originalText: text,
    phoneticScope: 'prosodic_timing',
    vowelCount: vowels.length,
    phoneticChanges: [],
    phoneticContext: 'accent_decomposition',
    phoneticPattern: vowels,
    temporalStructure: 'segmented_prosody'
  };
}

/**
 * Analyzes prosodic properties for svarita decomposition
 */
function analyzeProsody(text, script) {
  const vowels = Array.from(text).filter(char => {
    const accent = analyzeVowelAccent(char, { script });
    return accent.isValid && accent.accentType === ACCENT_TYPES.SVARITA;
  });
  
  return {
    prosodicFunction: 'accent_segmentation',
    accentualContext: 'svarita_decomposition',
    prosodicScope: 'temporal_segments',
    metricalImplication: 'duration_division',
    decomposedVowels: vowels.length,
    prosodicPattern: {
      segmentationType: 'udatta_initial_half_matra',
      remainingStructure: 'anudatta_fall'
    }
  };
}

/**
 * Calculates confidence score for svarita decomposition analysis
 */
function calculateDecompositionConfidence(analysis) {
  let confidence = 0;
  
  // Base confidence for valid structure
  if (analysis.decompositionAnalysis.hasValidStructure) {
    confidence += 50;
  }
  
  // Additional confidence for decomposition count
  confidence += Math.min(analysis.decompositionAnalysis.count * 25, 40);
  
  // Morphological analysis confidence
  if (analysis.morphologicalAnalysis.vowelCount > 0) {
    confidence += 10;
  }
  
  return Math.min(confidence, 100);
}

export default sutra1232;
