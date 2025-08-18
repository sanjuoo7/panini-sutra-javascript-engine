/**
 * Sutra 1.2.39: स्वरितात् संहितायामनुदात्तानाम्
 * From svarita: in saṃhitā, of anudātta vowels (monotone assimilation)
 * 
 * In sandhi contexts, anudātta vowels following a svarita vowel can undergo 
 * monotone assimilation, creating a continuous low-tone span. This rule applies
 * in close phonetic juncture (saṃhitā) but can be blocked by certain domain
 * restrictions (like Subrahmaṇyā contexts).
 * 
 * References:
 * - Ashtadhyayi 1.2.39: स्वरितात् संहितायामनुदात्तानाम्
 * - Mahābhāṣya commentary on sandhi assimilation
 * - Traditional Sanskrit prosody manuals for saṃhitā contexts
 */

import { 
  isAnudatta, 
  isSvarita,
  analyzeVowelAccent,
  ACCENT_TYPES 
} from '../sanskrit-utils/accent-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isVowel } from '../sanskrit-utils/classification.js';

/**
 * Main function implementing Sutra 1.2.39
 * Handles monotone assimilation of anudātta vowels following svarita in sandhi
 */
export function sutra1239(text, context = {}, options = {}) {
  // Input validation
  if (!text || typeof text !== 'string') {
    return {
      sutra: '1.2.39',
      text: text || '',
      script: 'IAST',
      confidence: 0,
      primaryDecision: 'invalid-input',
      analysis: {
        phases: {
          sandhiDetection: { hasSandhiContext: false, error: 'Invalid input' },
          accentSequencing: { hasSvaritaAnudattaPattern: false, error: 'Invalid input' },
          assimilationAnalysis: { assimilationRequired: false, error: 'Invalid input' }
        }
      },
      adjustedText: text || '',
      hasAssimilation: false,
      appliedSutras: [],
      error: 'Invalid input: text must be a non-empty string'
    };
  }

  const script = detectScript(text);
  
  // Perform comprehensive analysis
  const analysis = performSandhiAssimilationAnalysis(text, context, script);
  
  // Calculate confidence based on analysis
  const confidence = calculateConfidence(analysis, context);
  
  // Generate recommendations
  const recommendations = generateRecommendations(analysis, context);
  
  // Generate traditional commentary
  const traditionalCommentary = generateTraditionalCommentary(analysis, text, script);

  // Main result structure
  const result = {
    sutra: '1.2.39',
    text: text,
    script: script,
    confidence: confidence,
    primaryDecision: analysis.hasAssimilation ? 'monotone-assimilation' : 'no-assimilation',
    
    // Core analysis phases
    analysis: {
      phases: {
        sandhiDetection: analysis.sandhiDetection,
        accentSequencing: analysis.accentSequencing,
        assimilationAnalysis: analysis.assimilationAnalysis,
        domainRestriction: analysis.domainRestriction
      },
      technicalNotes: analysis.technicalNotes,
      summary: analysis.summary
    },
    
    // Practical outputs
    assimilations: analysis.assimilations,
    adjustedText: analysis.adjustedText,
    prosodyRules: analysis.prosodyRules,
    
    // Metadata
    appliedSutras: ['1.2.39'],
    reasoning: analysis.reasoning,
    recommendations: recommendations,
    traditionalCommentary: traditionalCommentary,
    
    // For backward compatibility
    options: analysis.prosodyOptions || [],
    hasAssimilation: analysis.hasAssimilation
  };

  return result;
}

/**
 * Performs comprehensive sandhi assimilation analysis
 */
function performSandhiAssimilationAnalysis(text, context, script) {
  const analysis = {
    sandhiDetection: analyzeSandhiContext(text, context, script),
    accentSequencing: analyzeAccentSequencing(text, script),
    assimilationAnalysis: analyzeAssimilationPatterns(text, script),
    domainRestriction: analyzeDomainRestrictions(text, context),
    technicalNotes: [],
    hasAssimilation: false,
    assimilations: [],
    adjustedText: text,
    prosodyRules: [],
    prosodyOptions: [],
    reasoning: []
  };

  // Determine if assimilation should be applied
  const shouldApplyAssimilation = 
    analysis.sandhiDetection.hasSandhiContext &&
    analysis.accentSequencing.hasSvaritaAnudattaPattern &&
    !analysis.domainRestriction.isBlocked;

  if (shouldApplyAssimilation) {
    analysis.hasAssimilation = true;
    analysis.assimilations = performMonotoneAssimilation(text, script);
    analysis.adjustedText = applyAssimilations(text, analysis.assimilations, script);
    analysis.reasoning.push('1.2.39-monotone-assimilation');
  }

  // Generate prosody rules
  analysis.prosodyRules = generateProsodyRules(analysis);
  
  // Generate prosody options
  analysis.prosodyOptions = generateProsodyOptions(analysis, context);

  // Generate technical notes
  analysis.technicalNotes = generateTechnicalNotes(analysis);
  
  // Create summary
  analysis.summary = createAnalysisSummary(analysis);

  return analysis;
}

/**
 * Analyzes sandhi context for assimilation applicability
 */
function analyzeSandhiContext(text, context, script) {
  // Check for explicit sandhi context indicators
  const explicitSandhi = !!(context.sandhi || context.saṃhitā || context.continuous_recitation);
  
  // Detect implicit sandhi markers in text structure
  const sandhiMarkers = detectSandhiMarkers(text, script);
  
  // Analyze phonetic continuity
  const phoneticContinuity = analyzePhoneticContinuity(text, script);
  
  return {
    hasSandhiContext: explicitSandhi || sandhiMarkers.length > 0 || phoneticContinuity.isContinuous,
    contextType: explicitSandhi ? 'explicit' : 
                sandhiMarkers.length > 0 ? 'implicit-markers' : 
                phoneticContinuity.isContinuous ? 'phonetic-continuity' : 'none',
    sandhiMarkers: sandhiMarkers,
    phoneticContinuity: phoneticContinuity,
    applicabilityReason: explicitSandhi ? 
      'Explicit sandhi context provided' : 
      sandhiMarkers.length > 0 ? 
        'Textual sandhi markers detected' : 
        phoneticContinuity.isContinuous ?
          'Phonetic continuity suggests sandhi' :
          'No sandhi context detected'
  };
}

/**
 * Analyzes accent sequencing for svarita-anudātta patterns
 */
function analyzeAccentSequencing(text, script) {
  const accentSequence = [];
  const svaritaAnudattaSpans = [];

  // Normalize to NFD to handle combining characters consistently
  const normalizedText = text.normalize('NFD');
  const chars = Array.from(normalizedText);
  
  // Group characters into vowel units (base + combining marks)
  let i = 0;
  while (i < chars.length) {
    const char = chars[i];
    
    // Check if current character could be a vowel base (including decomposed forms)
    if (isVowelBase(char)) {
      let vowelUnit = char;
      let combinedPosition = i;
      
      // Collect any following combining marks
      while (i + 1 < chars.length && isCombiningMark(chars[i + 1])) {
        i++;
        vowelUnit += chars[i];
      }
      
      // Normalize the vowel unit back to NFC for analysis
      const nfcVowelUnit = vowelUnit.normalize('NFC');
      
      // Analyze the complete vowel unit
      const accentAnalysis = analyzeVowelAccent(nfcVowelUnit, { script, strict: true });
      
      if (accentAnalysis.isValid) {
        accentSequence.push({
          position: combinedPosition,
          vowel: nfcVowelUnit,
          baseVowel: accentAnalysis.baseVowel,
          accentType: accentAnalysis.accentType || 'unmarked'
        });
      }
    }
    
    i++;
  }

  // Find svarita followed by anudātta sequences
  for (let i = 0; i < accentSequence.length - 1; i++) {
    if (accentSequence[i].accentType === 'svarita') {
      const span = { 
        svaritaPosition: i, 
        svaritaVowel: accentSequence[i],
        anudattaSequence: [] 
      };
      
      // Collect following anudātta vowels
      for (let j = i + 1; j < accentSequence.length; j++) {
        if (accentSequence[j].accentType === 'anudātta') {
          span.anudattaSequence.push(accentSequence[j]);
        } else {
          break; // Stop at first non-anudātta
        }
      }
      
      if (span.anudattaSequence.length > 0) {
        svaritaAnudattaSpans.push(span);
      }
    }
  }

  return {
    hasSvaritaAnudattaPattern: svaritaAnudattaSpans.length > 0,
    accentSequence: accentSequence,
    svaritaAnudattaSpans: svaritaAnudattaSpans,
    spanCount: svaritaAnudattaSpans.length,
    totalAnudattaVowels: svaritaAnudattaSpans.reduce((sum, span) => sum + span.anudattaSequence.length, 0)
  };
}

/**
 * Helper function to check if a character could be a vowel base
 * This includes both composed vowels and decomposed base characters
 */
function isVowelBase(char) {
  // Direct vowel check
  if (isVowel(char)) return true;
  
  // Decomposed vowel bases (basic Latin vowels)
  const decomposedVowelBases = ['a', 'e', 'i', 'o', 'u'];
  return decomposedVowelBases.includes(char);
}

/**
 * Helper function to check if a character is a combining mark
 */
function isCombiningMark(char) {
  const codePoint = char.codePointAt(0);
  // Unicode combining diacritical marks range (0x0300-0x036F)
  // and other common combining marks
  return (codePoint >= 0x0300 && codePoint <= 0x036F) ||
         codePoint === 0x0951 || // Devanagari udatta
         codePoint === 0x0952 || // Devanagari anudatta
         codePoint === 0x1CDA;   // Devanagari svarita
}

/**
 * Analyzes specific assimilation patterns
 */
function analyzeAssimilationPatterns(text, script) {
  const accentSequencing = analyzeAccentSequencing(text, script);
  
  if (!accentSequencing.hasSvaritaAnudattaPattern) {
    return {
      assimilationRequired: false,
      assimilationCount: 0,
      assimilationSpans: [],
      patternType: 'none'
    };
  }

  const assimilationSpans = accentSequencing.svaritaAnudattaSpans.map(span => ({
    startPosition: span.svaritaVowel.position,
    endPosition: span.anudattaSequence[span.anudattaSequence.length - 1].position,
    svaritaVowel: span.svaritaVowel,
    affectedVowels: span.anudattaSequence,
    assimilationType: 'monotone-extension',
    targetTone: 'low-monotone'
  }));

  return {
    assimilationRequired: true,
    assimilationCount: assimilationSpans.length,
    assimilationSpans: assimilationSpans,
    patternType: assimilationSpans.length === 1 ? 'single-span' : 'multiple-spans'
  };
}

/**
 * Analyzes domain restrictions that may block assimilation
 */
function analyzeDomainRestrictions(text, context) {
  // Check for Subrahmaṇyā context which blocks monotone assimilation
  const isSubrahmanyaContext = !!(context.subrahmanya || context.subrahmaṇyā || 
                                  context.subrahmaṇya || context.skanda || 
                                  context.karttikeya);

  // Check for other blocking contexts
  const isVedicHymn = !!(context.vedic_hymn || context.mantra);
  const isRitualContext = !!(context.ritual || context.ceremonial);
  
  const blockingFactors = [];
  if (isSubrahmanyaContext) blockingFactors.push('subrahmanya-domain');
  if (isVedicHymn) blockingFactors.push('vedic-hymn-context');
  if (isRitualContext) blockingFactors.push('ritual-context');

  return {
    isBlocked: blockingFactors.length > 0,
    blockingFactors: blockingFactors,
    blockingReason: blockingFactors.length > 0 ? 
      `Assimilation blocked by: ${blockingFactors.join(', ')}` : 
      'No domain restrictions detected'
  };
}

/**
 * Detects sandhi markers in text
 */
function detectSandhiMarkers(text, script) {
  const markers = [];
  
  // Common sandhi indicators
  if (script === 'Devanagari') {
    if (/्[कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह]/i.test(text)) {
      markers.push('consonant-clusters');
    }
    if (/[ेैोौ]/i.test(text)) {
      markers.push('vowel-sandhi');
    }
  } else {
    // IAST markers
    if (/[kkhgghṅcchcjjhñṭṭhḍḍhṇtthddhnpphbbhmyrlvśṣsh]{2,}/i.test(text)) {
      markers.push('consonant-clusters');
    }
    if (/[eaioau][aioau]/i.test(text)) {
      markers.push('vowel-sequences');
    }
  }
  
  return markers;
}

/**
 * Analyzes phonetic continuity
 */
function analyzePhoneticContinuity(text, script) {
  const chars = Array.from(text);
  let vowelCount = 0;
  let consonantClusters = 0;
  
  chars.forEach((char, index) => {
    const accentAnalysis = analyzeVowelAccent(char, { script, strict: true });
    if (accentAnalysis.isValid) {
      vowelCount++;
    }
    
    // Check for consonant clusters suggesting sandhi
    if (index < chars.length - 1) {
      const current = analyzeVowelAccent(char, { script, strict: true });
      const next = analyzeVowelAccent(chars[index + 1], { script, strict: true });
      
      if (!current.isValid && !next.isValid) {
        consonantClusters++;
      }
    }
  });

  return {
    isContinuous: vowelCount >= 3 && consonantClusters > 0,
    vowelDensity: vowelCount / chars.length,
    consonantClusters: consonantClusters,
    continuityScore: (vowelCount * 0.3) + (consonantClusters * 0.7)
  };
}

/**
 * Performs monotone assimilation transformations
 */
function performMonotoneAssimilation(text, script) {
  const analysis = analyzeAssimilationPatterns(text, script);
  const assimilations = [];

  if (!analysis.assimilationRequired) {
    return assimilations;
  }

  analysis.assimilationSpans.forEach(span => {
    // Create assimilation for the entire span
    assimilations.push({
      startPosition: span.startPosition,
      endPosition: span.endPosition,
      assimilationType: 'monotone-extension',
      sourceVowel: span.svaritaVowel,
      affectedVowels: span.affectedVowels,
      targetTone: 'low-monotone',
      rule: '1.2.39'
    });
  });

  return assimilations;
}

/**
 * Applies assimilations to create adjusted text
 */
function applyAssimilations(text, assimilations, script) {
  if (assimilations.length === 0) return text;
  
  // For monotone assimilation, the text representation typically doesn't change
  // as it's more of a prosodic/phonetic instruction rather than orthographic
  // However, we can mark the change conceptually
  return text; // Keep original text, assimilation is prosodic
}

/**
 * Generates prosody rules based on analysis
 */
function generateProsodyRules(analysis) {
  const rules = [];
  
  if (analysis.hasAssimilation) {
    rules.push({
      type: 'monotone-assimilation',
      rule: 'svarita-anudatta-extension',
      description: 'Extend monotone from svarita through following anudātta vowels',
      mandatory: true,
      sutra: '1.2.39'
    });
    
    rules.push({
      type: 'sandhi-prosody',
      rule: 'continuous-low-tone',
      description: 'Maintain continuous low tone across assimilated span',
      mandatory: true,
      sutra: '1.2.39'
    });
  }
  
  return rules;
}

/**
 * Generates prosody options based on analysis
 */
function generateProsodyOptions(analysis, context) {
  const options = [];
  
  if (analysis.hasAssimilation) {
    options.push({
      mode: 'local-monotone',
      description: 'Local monotone assimilation from svarita',
      confidence: 0.90,
      traditional: true
    });
    
    options.push({
      mode: 'sandhi-prosody',
      description: 'Sandhi-aware accent recitation',
      confidence: 0.85,
      traditional: true
    });
  } else {
    options.push({
      mode: 'discrete-accents',
      description: 'Maintain discrete accent boundaries',
      confidence: 0.80,
      traditional: true
    });
  }
  
  return options;
}

/**
 * Generates technical notes
 */
function generateTechnicalNotes(analysis) {
  const notes = [];
  
  notes.push(`Sandhi Context: ${analysis.sandhiDetection.contextType}`);
  notes.push(`Accent Sequencing: ${analysis.accentSequencing.spanCount} svarita-anudātta span(s)`);
  notes.push(`Assimilation Analysis: ${analysis.assimilationAnalysis.patternType} pattern`);
  
  if (analysis.domainRestriction.isBlocked) {
    notes.push(`Domain Restriction: ${analysis.domainRestriction.blockingReason}`);
  }
  
  if (analysis.hasAssimilation) {
    notes.push('Applied monotone assimilation across identified spans');
  }
  
  return notes;
}

/**
 * Creates analysis summary
 */
function createAnalysisSummary(analysis) {
  return {
    sandhiContextDetected: analysis.sandhiDetection.hasSandhiContext,
    accentPatternFound: analysis.accentSequencing.hasSvaritaAnudattaPattern,
    assimilationApplied: analysis.hasAssimilation,
    domainBlocked: analysis.domainRestriction.isBlocked,
    applicableRule: analysis.hasAssimilation ? '1.2.39-monotone-assimilation' : 'none'
  };
}

/**
 * Calculates confidence score
 */
function calculateConfidence(analysis, context) {
  let confidence = 0.6; // Base confidence
  
  // Increase confidence for explicit sandhi context
  if (analysis.sandhiDetection.hasSandhiContext) {
    confidence += 0.2;
  }
  
  // Increase confidence with clear accent patterns
  if (analysis.accentSequencing.hasSvaritaAnudattaPattern) {
    confidence += 0.15;
  }
  
  // Increase confidence with multiple spans
  if (analysis.accentSequencing.spanCount > 1) {
    confidence += 0.05;
  }
  
  // Decrease confidence if domain blocked
  if (analysis.domainRestriction.isBlocked) {
    confidence -= 0.1;
  }
  
  return Math.max(0, Math.min(confidence, 1.0));
}

/**
 * Generates recommendations
 */
function generateRecommendations(analysis, context) {
  const recommendations = [];
  
  if (analysis.hasAssimilation) {
    recommendations.push('Apply monotone assimilation from svarita through anudātta sequence');
    recommendations.push('Maintain continuous low tone across affected vowels');
    recommendations.push('Use sandhi-aware recitation prosody');
  } else if (analysis.accentSequencing.hasSvaritaAnudattaPattern && analysis.domainRestriction.isBlocked) {
    recommendations.push('Maintain discrete accents due to domain restrictions');
    recommendations.push('Apply standard accent rules without assimilation');
  } else {
    recommendations.push('Use standard discrete accent recitation');
  }
  
  return recommendations;
}

/**
 * Generates traditional commentary
 */
function generateTraditionalCommentary(analysis, text, script) {
  return {
    sutraText: 'स्वरितात् संहितायामनुदात्तानाम्',
    meaning: 'From svarita: in saṃhitā, of anudātta vowels (monotone extension)',
    
    interpretation: analysis.hasAssimilation ?
      'In continuous sandhi recitation, anudātta vowels immediately following a svarita vowel undergo monotone assimilation, creating a uniform low-tone span. This facilitates smooth phonetic flow in connected speech.' :
      analysis.domainRestriction.isBlocked ?
        'Monotone assimilation is blocked in this context due to domain restrictions that require maintained accent distinctiveness.' :
        'No svarita-anudātta sequence detected for assimilation application.',
    
    scholasticNotes: analysis.accentSequencing.hasSvaritaAnudattaPattern ? 
      `Svarita-anudātta patterns found: ${analysis.accentSequencing.spanCount} span(s) with ${analysis.accentSequencing.totalAnudattaVowels} affected anudātta vowel(s). ${analysis.hasAssimilation ? 'Monotone assimilation applied.' : 'Assimilation blocked or not applicable.'}` :
      'No qualifying svarita-anudātta accent sequences found in input text.',
    
    practicalApplication: 'This sutra ensures smooth prosodic flow in continuous recitation by eliminating abrupt accent changes within svarita-anudātta sequences, creating natural phonetic bridges in connected speech.'
  };
}

// Export for testing
export { 
  analyzeSandhiContext,
  analyzeAccentSequencing,
  analyzeAssimilationPatterns,
  detectSandhiMarkers,
  performMonotoneAssimilation
};

export default sutra1239;
