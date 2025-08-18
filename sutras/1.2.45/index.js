/** Sutra 1.2.45: अर्थवदधातुरप्रत्ययः प्रातिपदिकम् */
import { isPratipadikaBase } from '../sanskrit-utils/pratipadika-classification.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { sanitizeInput } from '../sanskrit-utils/validation.js';

// Enhanced traditional commentary for sutra 1.2.45
const TRADITIONAL_COMMENTARY = {
  kashika: {
    sanskrit: 'अर्थवत् अधातुः अप्रत्ययः प्रातिपदिकम्। यत् अर्थवत् च अधातुः च अप्रत्ययः च तत् प्रातिपदिकम् संज्ञां भवति।',
    iast: 'arthavat adhātuḥ apratyayaḥ prātipadikam. yat arthavat ca adhātuḥ ca apratyayaḥ ca tat prātipadikam saṃjñāṃ bhavati.',
    english: 'A prātipadika is something that is meaningful, is not a root, and is not an affix. Whatever is meaningful and not a root and not an affix receives the designation prātipadika.'
  },
  mahabhashya: {
    sanskrit: 'प्रातिपदिकग्रहणे किम् प्रयोजनम्? सुबाम् इति। प्रातिपदिकस्य सुप्प्रत्ययो भवति।',
    iast: 'prātipadikagrahaṇe kim prayojanam? subām iti. prātipadikasya suppratyayo bhavati.',
    english: 'What is the purpose of the term prātipadika? For the application of nominal endings (sup). Nominal endings are added to prātipadika stems.'
  }
};

// Prātipadika definition from sutra 1.2.45
const PRATIPADIKA_DEFINITION = {
  sanskrit: 'अर्थवदधातुरप्रत्ययः प्रातिपदिकम्',
  iast: 'arthavadadhāturapratyayaḥ prātipadikam',
  type: 'saṃjñā'
};

export function applySutra1_2_45(form, context={}){
  const base = isPratipadikaBase(form, context);
  return { sutra: '1.2.45', form, applies: base, isPratipadikaBase: base };
}

/**
 * Comprehensive analysis of prātipadika classification
 * @param {string|Object} input - Text to analyze or object with text property
 * @param {Object} options - Analysis options
 * @returns {Object} Complete prātipadika analysis
 */
export function analyzePratipadika(input, options = {}) {
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
      pratipadikaAnalysis: { applies: false, hasValidStructure: false, count: 0 },
      morphologicalAnalysis: {},
      phoneticAnalysis: {},
      lexicalAnalysis: {},
      traditionalCommentary: TRADITIONAL_COMMENTARY,
      sutraReference: {
        number: '1.2.45',
        sanskrit: PRATIPADIKA_DEFINITION.sanskrit,
        iast: PRATIPADIKA_DEFINITION.iast,
        type: PRATIPADIKA_DEFINITION.type
      }
    };
  }

  const sanitizationResult = sanitizeInput(text);
  if (!sanitizationResult.success) {
    return {
      error: 'Empty or invalid text after sanitization',
      confidence: 0,
      pratipadikaAnalysis: { applies: false, hasValidStructure: false, count: 0 },
      morphologicalAnalysis: {},
      phoneticAnalysis: {},
      lexicalAnalysis: {},
      traditionalCommentary: TRADITIONAL_COMMENTARY,
      sutraReference: {
        number: '1.2.45',
        sanskrit: PRATIPADIKA_DEFINITION.sanskrit,
        iast: PRATIPADIKA_DEFINITION.iast,
        type: PRATIPADIKA_DEFINITION.type
      }
    };
  }

  const sanitizedText = sanitizationResult.sanitized;
  const script = detectScript(sanitizedText);

  // Initialize comprehensive analysis structure
  const analysis = {
    pratipadikaAnalysis: analyzePratipadikaClassification(sanitizedText, script),
    morphologicalAnalysis: analyzeMorphology(sanitizedText, script),
    phoneticAnalysis: analyzePhonetics(sanitizedText, script),
    lexicalAnalysis: analyzeLexicon(sanitizedText, script),
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    sutraReference: {
      number: '1.2.45',
      sanskrit: PRATIPADIKA_DEFINITION.sanskrit,
      iast: PRATIPADIKA_DEFINITION.iast,
      type: PRATIPADIKA_DEFINITION.type
    },
    confidence: 0
  };

  // Calculate confidence
  analysis.confidence = calculatePratipadikaConfidence(analysis);

  return analysis;
}

/**
 * Analyzes prātipadika classification
 */
function analyzePratipadikaClassification(text, script) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const classifications = words.map(word => {
    const classification = isPratipadikaBase(word, { script });
    return {
      word,
      isPratipadika: classification,
      reasoning: classification ? 'Meets arthavat-adhātu-apratyaya criteria' : 'Does not meet prātipadika criteria'
    };
  });

  const pratipadikaCount = classifications.filter(c => c.isPratipadika).length;

  return {
    applies: pratipadikaCount > 0,
    hasValidStructure: pratipadikaCount > 0,
    count: pratipadikaCount,
    totalWords: words.length,
    classifications,
    reasoning: pratipadikaCount > 0 ? 'Valid prātipadika forms identified' : 'No valid prātipadika forms found',
    originalText: text
  };
}

/**
 * Analyzes morphological properties for prātipadika
 */
function analyzeMorphology(text, script) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  
  return {
    text: text,
    wordCount: words.length,
    morphologicalScope: 'nominal_stem',
    grammaticalFunction: 'stem_formation',
    linguisticLevel: 'morphological',
    affectedElements: words,
    morphologicalType: 'stem_classification'
  };
}

/**
 * Analyzes phonetic properties for prātipadika
 */
function analyzePhonetics(text, script) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  
  return {
    originalText: text,
    phoneticScope: 'stem_phonology',
    wordCount: words.length,
    phoneticChanges: [],
    phoneticContext: 'nominal_stem',
    phoneticPattern: words
  };
}

/**
 * Analyzes lexical properties for prātipadika
 */
function analyzeLexicon(text, script) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  
  return {
    lexicalScope: 'nominal_vocabulary',
    semanticFunction: 'meaning_bearing',
    lexicalCategory: 'substantive',
    meaningType: 'referential',
    lexicalElements: words,
    semanticClassification: 'prātipadika_stems'
  };
}

/**
 * Calculates confidence score for prātipadika analysis
 */
function calculatePratipadikaConfidence(analysis) {
  let confidence = 0;
  
  // Base confidence for valid structure
  if (analysis.pratipadikaAnalysis.hasValidStructure) {
    confidence += 50;
  }
  
  // Additional confidence for prātipadika count (up to 40 points)
  confidence += Math.min(analysis.pratipadikaAnalysis.count * 20, 40);
  
  // Morphological analysis confidence
  if (analysis.morphologicalAnalysis.wordCount > 0) {
    confidence += 10;
  }
  
  return Math.min(confidence, 100);
}

export default applySutra1_2_45;
