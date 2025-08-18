/**
 * Sutra 1.2.37: न सुब्रह्मण्यायां स्वरितस्य तूदात्तः
 * "In Subrahmaṇyā hymns, there is no monotone; svarita vowels take udātta."
 * 
 * Rule Type: Vidhi (Prescriptive rule) with Niyama (Restriction)
 * Domain: Subrahmaṇyā hymn recitation context
 * Dependencies: 1.2.29-1.2.31 (accent categories), 1.2.32 (svarita structure)
 * 
 * This sutra establishes special prosodic rules for Subrahmaṇyā hymns:
 * 1. Prohibition of monotone (ekashruti) recitation
 * 2. Mandatory conversion of svarita vowels to udātta accent
 * 3. Emphasis on distinct accentual patterns in this sacred context
 * 
 * The Subrahmaṇyā is a specific Vedic hymn addressed to Subrahmaṇya (Skanda/Karttikeya),
 * requiring precise accentual execution where the combining tone (svarita) is elevated
 * to the high tone (udātta) for proper ritual efficacy.
 * 
 * @fileoverview Implementation of Panini's Sutra 1.2.37 - Subrahmaṇyā domain rules
 */

import { 
  analyzeVowelAccent, 
  ACCENT_TYPES, 
  applyUdatta,
  isSvarita,
  isUdatta,
  isAnudatta 
} from '../sanskrit-utils/accent-analysis.js';
import { detectScript, isVowel, getAllVowels } from '../sanskrit-utils/index.js';
import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';

/**
 * Main function implementing Sutra 1.2.37
 * Analyzes text in Subrahmaṇyā hymn context for accent conversion and monotone prohibition
 * 
 * @param {string} text - The text to analyze (word, phrase, or hymn segment)
 * @param {Object} context - Recitation context
 * @param {Object} options - Analysis options
 * @returns {Object} Comprehensive analysis with accent conversions and prosody rules
 */
export function sutra1237(text, context = {}, options = {}) {
  // Input validation
  if (typeof text !== 'string') {
    throw new TypeError('text parameter must be a string');
  }

  if (!text.trim()) {
    return {
      isValid: false,
      confidence: 0,
      sutra: '1.2.37',
      errors: ['Empty input text'],
      text: text,
      script: 'unknown'
    };
  }

  const script = detectScript(text);
  
  // Check if we're in Subrahmaṇyā context
  const isSubrahmanyaContext = context.subrahmanya || context.subrahmaṇyā || 
                               context.subrahmaṇya || context.skanda || 
                               context.karttikeya || context.vedic_hymn;

  // Perform comprehensive analysis
  const analysis = performSubrahmanyaAnalysis(text, context, script, isSubrahmanyaContext);
  
  // Generate recommendations
  const recommendations = generateSubrahmanyaRecommendations(analysis, context);
  
  // Calculate confidence
  const confidence = calculateSubrahmanyaConfidence(analysis, isSubrahmanyaContext);
  
  // Generate traditional commentary
  const traditionalCommentary = generateTraditionalCommentary(text, analysis, context);
  
  // Create final result
  const result = {
    isValid: true,
    sutra: '1.2.37',
    text: text,
    script: script,
    confidence: confidence,
    primaryDecision: analysis.hasConversions ? 'conversions' : 'no-changes',
    
    // Core analysis phases
    analysis: {
      phases: {
        domainDetection: analysis.domainDetection,
        accentAnalysis: analysis.accentAnalysis,  
        conversionAnalysis: analysis.conversionAnalysis,
        monotoneProhibition: analysis.monotoneProhibition,
        prosodyAdjustment: analysis.prosodyAdjustment
      },
      technicalNotes: analysis.technicalNotes,
      summary: analysis.summary
    },
    
    // Practical outputs
    conversions: analysis.conversions,
    prohibitions: analysis.prohibitions,
    adjustedText: analysis.adjustedText,
    prosodyRules: analysis.prosodyRules,
    
    // Metadata
    appliedSutras: ['1.2.37'],
    reasoning: analysis.reasoning,
    recommendations: recommendations,
    traditionalCommentary: traditionalCommentary,
    
    // For backward compatibility
    options: analysis.prosodyOptions || [],
    hasConversions: analysis.hasConversions
  };

  return result;
}

/**
 * Performs comprehensive Subrahmaṇyā hymn analysis
 */
function performSubrahmanyaAnalysis(text, context, script, isExplicitSubrahmanyaContext) {
  const analysis = {
    domainDetection: analyzeSubrahmanyaDomain(text, context),
    accentAnalysis: analyzeAccentStructure(text, script),
    conversionAnalysis: analyzeSvaritaConversions(text, script),
    monotoneProhibition: analyzeMonotoneProhibition(text, context),
    prosodyAdjustment: analyzeProsodyAdjustments(text, context, script),
    technicalNotes: [],
    hasConversions: false,
    conversions: [],
    prohibitions: [],
    adjustedText: text,
    prosodyRules: [],
    prosodyOptions: [],
    reasoning: []
  };

  // Only proceed with conversions if actually in Subrahmaṇyā context
  const actualSubrahmanyaContext = analysis.domainDetection.isSubrahmanyaContext || isExplicitSubrahmanyaContext;

  // Determine if conversions are needed
  if (actualSubrahmanyaContext && analysis.accentAnalysis.hasSvarita) {
    analysis.hasConversions = true;
    analysis.conversions = performSvaritaToUdattaConversions(text, script);
    analysis.adjustedText = applySvaritaConversions(text, analysis.conversions, script);
    analysis.reasoning.push('1.2.37-svarita-to-udaatta');
  }

  // Apply monotone prohibition
  if (actualSubrahmanyaContext) {
    analysis.prohibitions.push({
      type: 'monotone-prohibition',
      rule: 'subrahmanya-domain',
      description: 'Monotone recitation prohibited in Subrahmaṇyā hymns'
    });
    analysis.reasoning.push('1.2.37-monotone-prohibition');
  }

  // Generate prosody rules
  analysis.prosodyRules = generateProsodyRules(analysis);
  
  // Generate prosody options (excluding monotone in Subrahmaṇyā context)
  analysis.prosodyOptions = generateProsodyOptions(analysis, context);

  // Generate technical notes
  analysis.technicalNotes = generateTechnicalNotes(analysis);
  
  // Create summary
  analysis.summary = createAnalysisSummary(analysis);

  return analysis;
}

/**
 * Analyzes Subrahmaṇyā domain context
 */
function analyzeSubrahmanyaDomain(text, context) {
  const isSubrahmanyaContext = !!(context.subrahmanya || context.subrahmaṇyā || 
                                  context.subrahmaṇya || context.skanda || 
                                  context.karttikeya || context.vedic_hymn);

  const domainIndicators = [];
  if (context.subrahmanya || context.subrahmaṇyā || context.subrahmaṇya) {
    domainIndicators.push('explicit-subrahmanya-context');
  }
  if (context.skanda) domainIndicators.push('skanda-deity-context');
  if (context.karttikeya) domainIndicators.push('karttikeya-deity-context');
  if (context.vedic_hymn) domainIndicators.push('vedic-hymn-context');

  // Detect textual markers of Subrahmaṇyā hymns
  const textualMarkers = detectSubrahmanyaMarkers(text);
  domainIndicators.push(...textualMarkers);

  return {
    isSubrahmanyaContext,
    domainIndicators,
    contextStrength: isSubrahmanyaContext ? 'explicit' : 
                    textualMarkers.length > 0 ? 'implicit' : 'none',
    applicabilityReason: isSubrahmanyaContext ? 
      'Explicit Subrahmaṇyā context provided' : 
      textualMarkers.length > 0 ? 
        'Textual markers suggest Subrahmaṇyā context' : 
        'No Subrahmaṇyā context detected'
  };
}

/**
 * Analyzes accent structure of the text
 */
function analyzeAccentStructure(text, script) {
  // Use character-by-character analysis instead of getAllVowels for better accent detection
  const chars = Array.from(text);
  
  let svaritaCount = 0;
  let udattaCount = 0;
  let anudattaCount = 0;
  let unmarkedCount = 0;
  
  const accentDetails = [];

  chars.forEach((char, index) => {
    const accentAnalysis = analyzeVowelAccent(char, { script, strict: true });
    
    if (accentAnalysis.isValid) {
      const detail = {
        position: index,
        vowel: char,
        baseVowel: accentAnalysis.baseVowel,
        accentType: accentAnalysis.accentType || 'unmarked',
        hasAccentMark: accentAnalysis.accentMarks.length > 0
      };
      
      if (accentAnalysis.accentType === 'svarita') {
        svaritaCount++;
        detail.requiresConversion = true;
      } else if (accentAnalysis.accentType === 'udātta') {
        udattaCount++;
      } else if (accentAnalysis.accentType === 'anudātta') {
        anudattaCount++;
      } else {
        unmarkedCount++;
      }
      
      accentDetails.push(detail);
    }
  });

  return {
    totalVowels: accentDetails.length,
    svaritaCount,
    udattaCount,
    anudattaCount,
    unmarkedCount,
    hasSvarita: svaritaCount > 0,
    hasUdatta: udattaCount > 0,
    hasAnudatta: anudattaCount > 0,
    accentDetails,
    accentDistribution: {
      svarita: svaritaCount,
      udatta: udattaCount,
      anudatta: anudattaCount,
      unmarked: unmarkedCount
    }
  };
}

/**
 * Analyzes required svarita to udātta conversions
 */
function analyzeSvaritaConversions(text, script) {
  const chars = Array.from(text);
  
  const conversionsNeeded = [];
  const conversionMap = new Map();

  chars.forEach((char, index) => {
    if (isSvarita(char, { script, strict: true })) {
      const accentAnalysis = analyzeVowelAccent(char, { script, strict: true });
      const udattaForm = applyUdatta(accentAnalysis.baseVowel, script).normalize('NFC');
      
      const conversion = {
        position: index,
        original: char,
        baseVowel: accentAnalysis.baseVowel,
        converted: udattaForm,
        reason: 'svarita-to-udatta-subrahmaṇya-rule',
        sutraApplication: '1.2.37'
      };
      
      conversionsNeeded.push(conversion);
      conversionMap.set(index, conversion);
    }
  });

  return {
    conversionsRequired: conversionsNeeded.length > 0,
    conversionCount: conversionsNeeded.length,
    conversions: conversionsNeeded,
    conversionMap,
    affectedPositions: conversionsNeeded.map(c => c.position)
  };
}

/**
 * Analyzes monotone prohibition in Subrahmaṇyā context
 */
function analyzeMonotoneProhibition(text, context) {
  const isSubrahmanyaContext = !!(context.subrahmanya || context.subrahmaṇyā || 
                                  context.subrahmaṇya || context.skanda || 
                                  context.karttikeya);

  return {
    monotoneProhibited: isSubrahmanyaContext,
    prohibitionReason: isSubrahmanyaContext ? 
      'Subrahmaṇyā hymns require accentual distinctiveness' : 
      'Not in Subrahmaṇyā context',
    allowedProsodyModes: isSubrahmanyaContext ? 
      ['udaatta-emphasis', 'natural-accent', 'elevated-tone'] : 
      ['natural-accent', 'monotone', 'mixed-prosody'],
    prohibitedModes: isSubrahmanyaContext ? 
      ['monotone', 'ekashruti', 'flat-recitation'] : 
      [],
    accentualRequirement: isSubrahmanyaContext ? 
      'distinct-tonal-execution' : 
      'standard-prosody'
  };
}

/**
 * Analyzes prosody adjustments needed
 */
function analyzeProsodyAdjustments(text, context, script) {
  // Count vowels by character analysis for better accent detection
  const chars = Array.from(text);
  let syllableCount = 0;
  
  chars.forEach(char => {
    const accentAnalysis = analyzeVowelAccent(char, { script, strict: true });
    if (accentAnalysis.isValid) {
      syllableCount++;
    }
  });
  
  return {
    adjustmentType: context.subrahmanya ? 'subrahmaṇya-specific' : 'standard',
    prosodicEmphasis: context.subrahmanya ? 'accent-distinction' : 'natural-flow',
    rhythmicPattern: context.subrahmanya ? 'elevated-accentual' : 'standard-metrical',
    toneModification: context.subrahmanya ? 'svarita-elevation' : 'accent-preservation',
    syllableCount,
    prosodicComplexity: syllableCount > 6 ? 'complex' : 
                       syllableCount > 3 ? 'moderate' : 'simple',
    recitationGuidance: context.subrahmanya ? 
      'Emphasize udātta conversions and avoid monotone' : 
      'Standard accentual recitation'
  };
}

/**
 * Performs actual svarita to udātta conversions
 */
function performSvaritaToUdattaConversions(text, script) {
  const conversions = [];
  const chars = Array.from(text);

  chars.forEach((char, index) => {
    if (isSvarita(char, { script, strict: true })) {
      const accentAnalysis = analyzeVowelAccent(char, { script, strict: true });
      const udattaForm = applyUdatta(accentAnalysis.baseVowel, script).normalize('NFC');
      
      conversions.push({
        position: index,
        original: char,
        converted: udattaForm,
        baseVowel: accentAnalysis.baseVowel,
        conversionType: 'svarita-to-udatta',
        rule: '1.2.37'
      });
    }
  });

  return conversions;
}

/**
 * Applies svarita conversions to create adjusted text
 */
function applySvaritaConversions(text, conversions, script) {
  if (conversions.length === 0) return text;
  
  const chars = Array.from(text);
  
  // Sort conversions by position (descending) to maintain indices
  const sortedConversions = [...conversions].sort((a, b) => b.position - a.position);
  
  sortedConversions.forEach(conversion => {
    if (conversion.position < chars.length) {
      chars[conversion.position] = conversion.converted;
    }
  });
  
  // Normalize to precomposed form for consistent character representation
  return chars.join('').normalize('NFC');
}

/**
 * Generates prosody rules based on analysis
 */
function generateProsodyRules(analysis) {
  const rules = [];
  
  if (analysis.domainDetection.isSubrahmanyaContext) {
    rules.push({
      type: 'accent-conversion',
      rule: 'svarita-to-udatta',
      description: 'Convert all svarita vowels to udātta',
      mandatory: true,
      sutra: '1.2.37'
    });
    
    rules.push({
      type: 'recitation-prohibition',
      rule: 'no-monotone',
      description: 'Monotone recitation is prohibited',
      mandatory: true,
      sutra: '1.2.37'
    });
    
    rules.push({
      type: 'prosodic-emphasis',
      rule: 'accent-distinction',
      description: 'Emphasize accentual distinctions',
      recommended: true,
      sutra: '1.2.37'
    });
  }
  
  return rules;
}

/**
 * Generates prosody options (filtered for Subrahmaṇyā context)
 */
function generateProsodyOptions(analysis, context) {
  const options = [];
  
  if (analysis.domainDetection.isSubrahmanyaContext) {
    // No monotone options in Subrahmaṇyā context
    options.push({
      mode: 'udaatta-emphasis',
      description: 'Emphasize udātta accents (including converted svarita)',
      recommended: true,
      reason: 'Subrahmaṇyā hymn requirement'
    });
    
    options.push({
      mode: 'natural-accent',
      description: 'Natural accentual recitation with conversions',
      recommended: true,
      reason: 'Standard with Subrahmaṇyā adjustments'
    });
    
    if (analysis.accentAnalysis.hasAnudatta) {
      options.push({
        mode: 'anudaatta-contrast',
        description: 'Emphasize contrast between udātta and anudātta',
        recommended: true,
        reason: 'Accentual distinctiveness'
      });
    }
  } else {
    // Standard options for non-Subrahmaṇyā contexts
    options.push({
      mode: 'natural-accent',
      description: 'Standard accentual recitation',
      recommended: true,
      reason: 'Default prosodic mode'
    });
    
    options.push({
      mode: 'monotone',
      description: 'Monotone recitation (permitted outside Subrahmaṇyā)',
      recommended: false,
      reason: 'Alternative prosodic option'
    });
  }
  
  return options;
}

/**
 * Detects textual markers of Subrahmaṇyā hymns
 */
function detectSubrahmanyaMarkers(text) {
  const markers = [];
  
  // Common terms in Subrahmaṇyā hymns
  const subrahmaṇyaTerms = [
    'subrahmanya', 'subrahmaṇya', 'subrahmaṇyā',
    'skanda', 'kārttikeya', 'guha', 'kumāra',
    'सुब्रह्मण्य', 'स्कन्द', 'कार्त्तिकेय', 'गुह', 'कुमार'
  ];
  
  const lowerText = text.toLowerCase();
  subrahmaṇyaTerms.forEach(term => {
    if (lowerText.includes(term.toLowerCase())) {
      markers.push(`contains-${term.replace(/[्ं]/g, '')}`);
    }
  });
  
  // Vedic hymn indicators
  if (text.match(/ॐ|om|हरि|hari|श्री|śrī/i)) {
    markers.push('vedic-invocation');
  }
  
  // Accent pattern typical of hymns
  if (text.match(/[àáâ]/)) {
    markers.push('vedic-accented');
  }
  
  return markers;
}

/**
 * Generates technical notes for the analysis
 */
function generateTechnicalNotes(analysis) {
  const notes = [];
  
  if (analysis.domainDetection.isSubrahmanyaContext) {
    notes.push('Domain analysis: Subrahmaṇyā hymn context detected, applying specialized prosodic rules');
  }
  
  if (analysis.accentAnalysis.hasSvarita) {
    notes.push(`Accent analysis: ${analysis.accentAnalysis.svaritaCount} svarita vowel(s) identified for conversion`);
  }
  
  if (analysis.conversionAnalysis.conversionsRequired) {
    notes.push(`Conversion analysis: ${analysis.conversionAnalysis.conversionCount} svarita-to-udātta conversion(s) required`);
  }
  
  if (analysis.monotoneProhibition.monotoneProhibited) {
    notes.push('Monotone prohibition: Ekashruti recitation not permitted in this context');
  }
  
  notes.push(`Prosody adjustment: ${analysis.prosodyAdjustment.adjustmentType} prosodic framework applied`);
  
  return notes;
}

/**
 * Creates analysis summary
 */
function createAnalysisSummary(analysis) {
  const parts = [];
  
  if (analysis.domainDetection.isSubrahmanyaContext) {
    parts.push('Subrahmaṇyā hymn context confirmed');
    
    if (analysis.hasConversions) {
      parts.push(`${analysis.conversions.length} svarita-to-udātta conversion(s) applied`);
    }
    
    parts.push('Monotone recitation prohibited');
  } else {
    parts.push('Standard (non-Subrahmaṇyā) context');
    parts.push('No special accent conversions required');
  }
  
  return parts.join(', ');
}

/**
 * Calculates confidence score for Subrahmaṇyā analysis
 */
function calculateSubrahmanyaConfidence(analysis, isExplicitContext) {
  let confidence = 0.7; // Base confidence
  
  // Higher confidence for explicit context
  if (isExplicitContext) {
    confidence = 0.9;
  }
  
  // Increase confidence for textual markers
  if (analysis.domainDetection.domainIndicators.length > 0) {
    confidence += Math.min(0.15, analysis.domainDetection.domainIndicators.length * 0.05);
  }
  
  // Increase confidence for clear accent patterns
  if (analysis.accentAnalysis.hasSvarita) {
    confidence += 0.1;
  }
  
  // Increase confidence for successful conversions
  if (analysis.hasConversions) {
    confidence += 0.05;
  }
  
  return Math.min(confidence, 1.0);
}

/**
 * Generates recommendations for Subrahmaṇyā recitation
 */
function generateSubrahmanyaRecommendations(analysis, context) {
  const recommendations = [];
  
  if (analysis.domainDetection.isSubrahmanyaContext) {
    recommendations.push({
      type: 'accent-conversion',
      priority: 'high',
      description: 'Apply all svarita-to-udātta conversions as required by Sutra 1.2.37',
      justification: 'Mandatory accent elevation in Subrahmaṇyā hymns'
    });
    
    recommendations.push({
      type: 'monotone-avoidance',
      priority: 'high',
      description: 'Avoid monotone (ekashruti) recitation completely',
      justification: 'Explicit prohibition in Subrahmaṇyā context per Sutra 1.2.37'
    });
    
    recommendations.push({
      type: 'accentual-emphasis',
      priority: 'medium',
      description: 'Emphasize the distinction between udātta and anudātta vowels',
      justification: 'Sacred context requires precise tonal execution'
    });
    
    if (analysis.conversionAnalysis.conversionCount > 0) {
      recommendations.push({
        type: 'conversion-practice',
        priority: 'medium',
        description: `Focus on proper pronunciation of ${analysis.conversionAnalysis.conversionCount} converted vowel(s)`,
        justification: 'Ensure accurate implementation of accent conversions'
      });
    }
  } else {
    recommendations.push({
      type: 'standard-prosody',
      priority: 'medium',
      description: 'Standard accentual recitation or monotone as appropriate',
      justification: 'No special Subrahmaṇyā restrictions apply'
    });
  }
  
  return recommendations;
}

/**
 * Generates traditional commentary following classical grammatical tradition
 */
function generateTraditionalCommentary(text, analysis, context) {
  const commentary = {
    sutraText: 'न सुब्रह्मण्यायां स्वरितस्य तूदात्तः',
    meaning: 'In Subrahmaṇyā hymns, svarita vowels take udātta accent; no monotone recitation',
    context: 'Sacred hymn recitation with specialized prosodic requirements'
  };
  
  if (analysis.domainDetection.isSubrahmanyaContext) {
    commentary.traditionalInterpretation = 
      'This sutra establishes a niyama (restrictive rule) for the sacred Subrahmaṇyā hymns. ' +
      'The circumflex tone (svarita) must be elevated to high tone (udātta) to maintain ' +
      'the ritual efficacy of the recitation. Simultaneously, the flat monotone (ekashruti) ' +
      'is prohibited to ensure proper accentual distinctiveness in this sacred context. ' +
      'Traditional commentators emphasize that this rule reflects the elevated nature of ' +
      'the Subrahmaṇyā deity (Skanda/Karttikeya) requiring correspondingly elevated prosody.';
      
    commentary.scholasticNotes = [
      'Subrahmaṇyā-viśeṣa-vidhi: Special rule for Subrahmaṇyā hymn recitation',
      'Svarita-udātta-parivṛtti: Mandatory svarita-to-udātta transformation',
      'Ekashruti-niṣedha: Explicit prohibition of monotone recitation',
      'Devatā-sambandhī-ucchāraṇa: Deity-related pronunciation specifications'
    ];
    
    if (analysis.hasConversions) {
      commentary.scholasticNotes.push(
        `Vṛtti-viśeṣa: ${analysis.conversions.length} svarita vowel(s) converted to udātta as per the rule`
      );
    }
  } else {
    commentary.traditionalInterpretation = 
      'This text does not occur in the specific Subrahmaṇyā hymn context, therefore ' +
      'the special accent conversion and monotone prohibition rules of Sutra 1.2.37 ' +
      'do not apply. Standard accentual recitation principles govern this text.';
      
    commentary.scholasticNotes = [
      'Sāmānya-vidhi: Standard accent rules apply outside Subrahmaṇyā context',
      'Ekashruti-anumati: Monotone recitation permitted in non-specialized contexts'
    ];
  }
  
  commentary.practicalApplication = analysis.domainDetection.isSubrahmanyaContext ? 
    'When reciting Subrahmaṇyā hymns, carefully convert each svarita vowel to udātta ' +
    'and maintain clear tonal distinctions throughout. Avoid any tendency toward ' +
    'monotone delivery.' :
    'Standard recitation principles apply. Maintain natural accent patterns or ' +
    'apply monotone as contextually appropriate.';
  
  return commentary;
}

export default sutra1237;
