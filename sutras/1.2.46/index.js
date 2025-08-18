/** Sutra 1.2.46: कृत्तद्धितसमासाश्च */
import { getPratipadikaAnalysis } from '../sanskrit-utils/pratipadika-classification.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { sanitizeInput } from '../sanskrit-utils/validation.js';

// Enhanced traditional commentary for sutra 1.2.46
const TRADITIONAL_COMMENTARY = {
  kashika: {
    sanskrit: 'कृत् तद्धित समासाः च प्रातिपदिकम्। कृदन्ताः तद्धितान्ताः समासाः च प्रातिपदिकसंज्ञां भवन्ति।',
    iast: 'kṛt taddhita samāsāḥ ca prātipadikam. kṛdantāḥ taddhitāntāḥ samāsāḥ ca prātipadikasaṃjñāṃ bhavanti.',
    english: 'Kṛt derivatives, taddhita derivatives, and compounds also receive the designation prātipadika. Words ending in kṛt affixes, taddhita affixes, and compounds receive the prātipadika designation.'
  },
  mahabhashya: {
    sanskrit: 'कृत्तद्धितसमासाश्च इति। एतेषां अपि प्रातिपदिकसंज्ञा भवति। सुप्प्रत्ययस्य विधानार्थम्।',
    iast: 'kṛttaddhitasamāsāśca iti. eteṣāṃ api prātipadikasaṃjñā bhavati. suppratyayasya vidhānārtham.',
    english: 'Kṛt, taddhita, and compounds also receive prātipadika designation. This is for the application of nominal endings (sup).'
  }
};

// Extended prātipadika definition from sutra 1.2.46
const EXTENDED_PRATIPADIKA_DEFINITION = {
  sanskrit: 'कृत्तद्धितसमासाश्च',
  iast: 'kṛttaddhitasamāsāśca',
  type: 'adhikāra'
};

export function applySutra1_2_46(form, context={}){
  const analysis = getPratipadikaAnalysis(form, context);
  return { sutra: '1.2.46', ...analysis };
}

/**
 * Comprehensive analysis of extended prātipadika classification (kṛt, taddhita, samāsa)
 * @param {string|Object} input - Text to analyze or object with text property
 * @param {Object} options - Analysis options
 * @returns {Object} Complete extended prātipadika analysis
 */
export function analyzeExtendedPratipadika(input, options = {}) {
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
      extendedPratipadikaAnalysis: { applies: false, hasValidStructure: false, count: 0 },
      morphologicalAnalysis: {},
      phoneticAnalysis: {},
      derivationalAnalysis: {},
      traditionalCommentary: TRADITIONAL_COMMENTARY,
      sutraReference: {
        number: '1.2.46',
        sanskrit: EXTENDED_PRATIPADIKA_DEFINITION.sanskrit,
        iast: EXTENDED_PRATIPADIKA_DEFINITION.iast,
        type: EXTENDED_PRATIPADIKA_DEFINITION.type
      }
    };
  }

  const sanitizationResult = sanitizeInput(text);
  if (!sanitizationResult.success) {
    return {
      error: 'Empty or invalid text after sanitization',
      confidence: 0,
      extendedPratipadikaAnalysis: { applies: false, hasValidStructure: false, count: 0 },
      morphologicalAnalysis: {},
      phoneticAnalysis: {},
      derivationalAnalysis: {},
      traditionalCommentary: TRADITIONAL_COMMENTARY,
      sutraReference: {
        number: '1.2.46',
        sanskrit: EXTENDED_PRATIPADIKA_DEFINITION.sanskrit,
        iast: EXTENDED_PRATIPADIKA_DEFINITION.iast,
        type: EXTENDED_PRATIPADIKA_DEFINITION.type
      }
    };
  }

  const sanitizedText = sanitizationResult.sanitized;
  const script = detectScript(sanitizedText);

  // Initialize comprehensive analysis structure
  const analysis = {
    extendedPratipadikaAnalysis: analyzeExtendedClassification(sanitizedText, script),
    morphologicalAnalysis: analyzeMorphology(sanitizedText, script),
    phoneticAnalysis: analyzePhonetics(sanitizedText, script),
    derivationalAnalysis: analyzeDerivation(sanitizedText, script),
    traditionalCommentary: TRADITIONAL_COMMENTARY,
    sutraReference: {
      number: '1.2.46',
      sanskrit: EXTENDED_PRATIPADIKA_DEFINITION.sanskrit,
      iast: EXTENDED_PRATIPADIKA_DEFINITION.iast,
      type: EXTENDED_PRATIPADIKA_DEFINITION.type
    },
    confidence: 0
  };

  // Calculate confidence
  analysis.confidence = calculateExtendedPratipadikaConfidence(analysis);

  return analysis;
}

/**
 * Analyzes extended prātipadika classification (kṛt, taddhita, samāsa)
 */
function analyzeExtendedClassification(text, script) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const classifications = words.map(word => {
    const analysis = getPratipadikaAnalysis(word, { script });
    return {
      word,
      isPratipadika: analysis.isPratipadika,
      source: analysis.source,
      derivationType: analysis.reasons[0] || 'unknown',
      reasoning: analysis.isPratipadika ? `Extended prātipadika: ${analysis.source}` : 'Does not meet extended prātipadika criteria'
    };
  });

  const pratipadikaCount = classifications.filter(c => c.isPratipadika).length;
  const extendedCount = classifications.filter(c => c.source && c.source !== 'base').length;

  return {
    applies: pratipadikaCount > 0,
    hasValidStructure: extendedCount > 0,
    count: pratipadikaCount,
    extendedCount,
    totalWords: words.length,
    classifications,
    reasoning: extendedCount > 0 ? 'Extended prātipadika forms (kṛt/taddhita/samāsa) identified' : 'No extended prātipadika forms found',
    originalText: text
  };
}

/**
 * Analyzes morphological properties for extended prātipadika
 */
function analyzeMorphology(text, script) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  
  return {
    text: text,
    wordCount: words.length,
    morphologicalScope: 'derivational_morphology',
    grammaticalFunction: 'derived_stem_formation',
    linguisticLevel: 'word_formation',
    affectedElements: words,
    morphologicalType: 'extended_stem_classification'
  };
}

/**
 * Analyzes phonetic properties for extended prātipadika
 */
function analyzePhonetics(text, script) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  
  return {
    originalText: text,
    phoneticScope: 'derived_stem_phonology',
    wordCount: words.length,
    phoneticChanges: [],
    phoneticContext: 'derivational_morphology',
    phoneticPattern: words
  };
}

/**
 * Analyzes derivational properties for extended prātipadika
 */
function analyzeDerivation(text, script) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const derivationTypes = words.map(word => {
    const analysis = getPratipadikaAnalysis(word, { script });
    return {
      word,
      derivationType: analysis.source || 'unknown',
      affixClass: analysis.source === 'krt' ? 'primary' : analysis.source === 'taddhita' ? 'secondary' : 'compound',
      reasoning: analysis.reasons[0] || 'no_derivation'
    };
  });
  
  return {
    derivationalScope: 'word_formation',
    formationType: 'extended_stems',
    derivationTypes,
    primaryDerivatives: derivationTypes.filter(d => d.derivationType === 'krt').length,
    secondaryDerivatives: derivationTypes.filter(d => d.derivationType === 'taddhita').length,
    compounds: derivationTypes.filter(d => d.derivationType === 'compound').length
  };
}

/**
 * Calculates confidence score for extended prātipadika analysis
 */
function calculateExtendedPratipadikaConfidence(analysis) {
  let confidence = 0;
  
  // Base confidence for valid structure
  if (analysis.extendedPratipadikaAnalysis.hasValidStructure) {
    confidence += 50;
  }
  
  // Additional confidence for extended forms count
  confidence += Math.min(analysis.extendedPratipadikaAnalysis.extendedCount * 25, 40);
  
  // Morphological analysis confidence
  if (analysis.morphologicalAnalysis.wordCount > 0) {
    confidence += 10;
  }
  
  return Math.min(confidence, 100);
}

export default applySutra1_2_46;
