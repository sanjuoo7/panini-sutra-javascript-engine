/**
 * Sutra 1.2.38: देवब्रह्मणोरनुदात्तः
 * Deva and Brāhmaṇa: Anudātta
 * 
 * In Subrahmaṇyā hymns, the words 'deva' (god/deity) and 'brāhmaṇa' (priest/brahmin) 
 * undergo special lexical accent modification, becoming anudātta throughout.
 * This is a specific prosodic rule for sacred Subrahmaṇyā recitation contexts.
 * 
 * References:
 * - Ashtadhyayi 1.2.38: देवब्रह्मणोरनुदात्तः
 * - Mahābhāṣya commentary on anudātta lexical overrides
 * - Traditional Sanskrit prosody manuals for Subrahmaṇyā contexts
 */

import { 
  isAnudatta, 
  applyAnudatta, 
  analyzeVowelAccent,
  ACCENT_TYPES 
} from '../sanskrit-utils/accent-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isSvarita } from '../sanskrit-utils/index.js';

/**
 * Main function implementing Sutra 1.2.38
 * Handles anudātta lexical overrides for 'deva' and 'brāhmaṇa' in Subrahmaṇyā contexts
 */
export function sutra1238(text, context = {}, options = {}) {
  // Input validation
  if (!text || typeof text !== 'string') {
    return {
      sutra: '1.2.38',
      text: text || '',
      script: 'IAST',
      confidence: 0,
      primaryDecision: 'invalid-input',
      analysis: {
        phases: {
          domainDetection: { isSubrahmanyaContext: false, error: 'Invalid input' },
          lexicalAnalysis: { hasTargetWords: false, error: 'Invalid input' },
          anudattaOverride: { overridesRequired: false, error: 'Invalid input' }
        }
      },
      adjustedText: text || '',
      hasOverrides: false,
      appliedSutras: [],
      error: 'Invalid input: text must be a non-empty string'
    };
  }

  const script = detectScript(text);
  
  // Perform comprehensive analysis
  const analysis = performLexicalAnudattaAnalysis(text, context, script);
  
  // Calculate confidence based on analysis
  const confidence = calculateConfidence(analysis, context);
  
  // Generate recommendations
  const recommendations = generateRecommendations(analysis, context);
  
  // Generate traditional commentary
  const traditionalCommentary = generateTraditionalCommentary(analysis, text, script);

  // Main result structure
  const result = {
    sutra: '1.2.38',
    text: text,
    script: script,
    confidence: confidence,
    primaryDecision: analysis.hasOverrides ? 'lexical-overrides' : 'no-changes',
    
    // Core analysis phases
    analysis: {
      phases: {
        domainDetection: analysis.domainDetection,
        lexicalAnalysis: analysis.lexicalAnalysis,
        anudattaOverride: analysis.anudattaOverride
      },
      technicalNotes: analysis.technicalNotes,
      summary: analysis.summary
    },
    
    // Practical outputs
    overrides: analysis.overrides,
    adjustedText: analysis.adjustedText,
    prosodyRules: analysis.prosodyRules,
    
    // Metadata
    appliedSutras: ['1.2.38'],
    reasoning: analysis.reasoning,
    recommendations: recommendations,
    traditionalCommentary: traditionalCommentary,
    
    // For backward compatibility
    options: analysis.prosodyOptions || [],
    hasOverrides: analysis.hasOverrides
  };

  return result;
}

/**
 * Performs comprehensive lexical anudātta analysis
 */
function performLexicalAnudattaAnalysis(text, context, script) {
  const analysis = {
    domainDetection: analyzeSubrahmanyaDomain(text, context),
    lexicalAnalysis: analyzeLexicalTargets(text, script),
    anudattaOverride: analyzeAnudattaOverrides(text, script),
    technicalNotes: [],
    hasOverrides: false,
    overrides: [],
    adjustedText: text,
    prosodyRules: [],
    prosodyOptions: [],
    reasoning: []
  };

  // Only proceed with overrides if in Subrahmaṇyā context
  const actualSubrahmanyaContext = analysis.domainDetection.isSubrahmanyaContext;

  // Determine if overrides are needed
  if (actualSubrahmanyaContext && analysis.lexicalAnalysis.hasTargetWords) {
    analysis.hasOverrides = true;
    analysis.overrides = performLexicalAnudattaOverrides(text, script);
    analysis.adjustedText = applyLexicalOverrides(text, analysis.overrides, script);
    analysis.reasoning.push('1.2.38-lexical-anudatta-override');
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
 * Analyzes presence of lexical target words (deva, brāhmaṇa)
 */
function analyzeLexicalTargets(text, script) {
  const targetWords = identifyTargetWords(text, script);
  
  return {
    hasTargetWords: targetWords.length > 0,
    targetWordCount: targetWords.length,
    targetWords: targetWords,
    wordPositions: targetWords.map(word => ({
      word: word.word,
      startPos: word.startPos,
      endPos: word.endPos,
      wordType: word.wordType
    }))
  };
}

/**
 * Analyzes required anudātta overrides
 */
function analyzeAnudattaOverrides(text, script) {
  const targetWords = identifyTargetWords(text, script);
  
  const overridesRequired = targetWords.filter(word => 
    requiresAnudattaOverride(word, script)
  );

  return {
    overridesRequired: overridesRequired.length > 0,
    overrideCount: overridesRequired.length,
    overrides: overridesRequired,
    affectedWords: overridesRequired.map(word => word.word)
  };
}

/**
 * Identifies target words (deva, brāhmaṇa) in text
 */
function identifyTargetWords(text, script) {
  const targetWords = [];
  const usedPositions = new Set(); // Track used character positions to avoid overlaps
  
  // Define target word patterns for both scripts
  const patterns = getTargetWordPatterns(script);
  
  // Process patterns in order (most specific first)
  patterns.forEach(pattern => {
    const regex = new RegExp(pattern.regex, 'gi');
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      const startPos = match.index;
      const endPos = match.index + match[0].length;
      
      // Check if this range overlaps with already used positions
      let hasOverlap = false;
      for (let i = startPos; i < endPos; i++) {
        if (usedPositions.has(i)) {
          hasOverlap = true;
          break;
        }
      }
      
      // Only add if no overlap with existing matches
      if (!hasOverlap) {
        targetWords.push({
          word: match[0],
          baseForm: pattern.baseForm,
          wordType: pattern.wordType,
          startPos: startPos,
          endPos: endPos,
          variant: pattern.variant || 'standard'
        });
        
        // Mark positions as used
        for (let i = startPos; i < endPos; i++) {
          usedPositions.add(i);
        }
      }
    }
  });

  return targetWords;
}

/**
 * Gets target word patterns for script
 */
function getTargetWordPatterns(script) {
  if (script === 'Devanagari') {
    return [
      // deva patterns (most specific first to avoid overlaps)
      { regex: 'देवस्य', 
        baseForm: 'deva', wordType: 'deva', variant: 'genitive' },
      { regex: 'देवता', 
        baseForm: 'deva', wordType: 'deva', variant: 'devatā' },
      { regex: 'देव', 
        baseForm: 'deva', wordType: 'deva', variant: 'base' },
      
      // brāhmaṇa patterns (most specific first)
      { regex: 'ब्राह्मणस्य', 
        baseForm: 'brāhmaṇa', wordType: 'brāhmaṇa', variant: 'genitive' },
      { regex: 'ब्राह्मण', 
        baseForm: 'brāhmaṇa', wordType: 'brāhmaṇa', variant: 'base' },
      { regex: 'ब्रह्मण', 
        baseForm: 'brāhmaṇa', wordType: 'brāhmaṇa', variant: 'short' }
    ];
  } else {
    // IAST patterns (most specific first to avoid overlaps)
    return [
      // deva patterns (longest first)
      { regex: 'devasya', 
        baseForm: 'deva', wordType: 'deva', variant: 'genitive' },
      { regex: 'devatā', 
        baseForm: 'deva', wordType: 'deva', variant: 'devatā' },
      { regex: 'deva', 
        baseForm: 'deva', wordType: 'deva', variant: 'base' },
      
      // brāhmaṇa patterns (longest first)
      { regex: 'brāhmaṇasya', 
        baseForm: 'brāhmaṇa', wordType: 'brāhmaṇa', variant: 'genitive' },
      { regex: 'brāhmaṇa', 
        baseForm: 'brāhmaṇa', wordType: 'brāhmaṇa', variant: 'base' },
      { regex: 'brahmaṇa', 
        baseForm: 'brāhmaṇa', wordType: 'brāhmaṇa', variant: 'short' }
    ];
  }
}

/**
 * Checks if a word requires anudātta override
 */
function requiresAnudattaOverride(wordData, script) {
  // Target words always require override in Subrahmaṇyā context
  return wordData.wordType === 'deva' || wordData.wordType === 'brāhmaṇa';
}

/**
 * Performs lexical anudātta overrides
 */
function performLexicalAnudattaOverrides(text, script) {
  const overrides = [];
  const targetWords = identifyTargetWords(text, script);

  targetWords.forEach(wordData => {
    if (requiresAnudattaOverride(wordData, script)) {
      const anudattaForm = convertWordToAnudatta(wordData.word, script);
      
      overrides.push({
        position: wordData.startPos,
        endPosition: wordData.endPos,
        original: wordData.word,
        converted: anudattaForm,
        wordType: wordData.wordType,
        baseForm: wordData.baseForm,
        overrideType: 'lexical-anudatta',
        rule: '1.2.38'
      });
    }
  });

  return overrides;
}

/**
 * Converts a word to anudātta form
 */
function convertWordToAnudatta(word, script) {
  const chars = Array.from(word);
  const convertedChars = [];

  chars.forEach(char => {
    const accentAnalysis = analyzeVowelAccent(char, { script, strict: true });
    
    if (accentAnalysis.isValid) {
      // Convert vowel to anudātta
      const anudattaForm = applyAnudatta(accentAnalysis.baseVowel, script).normalize('NFC');
      convertedChars.push(anudattaForm);
    } else {
      // Keep non-vowel characters as is
      convertedChars.push(char);
    }
  });

  return convertedChars.join('');
}

/**
 * Applies lexical overrides to create adjusted text
 */
function applyLexicalOverrides(text, overrides, script) {
  if (overrides.length === 0) return text;
  
  let adjustedText = text;
  
  // Sort overrides by position (descending) to maintain indices
  const sortedOverrides = [...overrides].sort((a, b) => b.position - a.position);
  
  sortedOverrides.forEach(override => {
    adjustedText = adjustedText.substring(0, override.position) + 
                   override.converted + 
                   adjustedText.substring(override.endPosition);
  });
  
  return adjustedText;
}

/**
 * Detects textual markers of Subrahmaṇyā hymns
 */
function detectSubrahmanyaMarkers(text) {
  const markers = [];
  
  // Sanskrit markers
  if (/स्कन्द|कार्त्तिकेय|षष्ठी|कुमार/i.test(text)) {
    markers.push('sanskrit-deity-reference');
  }
  
  // IAST markers  
  if (/skanda|kārttikeya|ṣaṣṭhī|kumāra/i.test(text)) {
    markers.push('iast-deity-reference');
  }
  
  if (/subrahmāṇya|subrahmaṇya/i.test(text)) {
    markers.push('explicit-subrahmanya-mention');
  }
  
  return markers;
}

/**
 * Generates prosody rules based on analysis
 */
function generateProsodyRules(analysis) {
  const rules = [];
  
  if (analysis.domainDetection.isSubrahmanyaContext && analysis.hasOverrides) {
    rules.push({
      type: 'lexical-override',
      rule: 'deva-brahmana-anudatta',
      description: 'Convert deva and brāhmaṇa to anudātta',
      mandatory: true,
      sutra: '1.2.38'
    });
    
    rules.push({
      type: 'accent-consistency',
      rule: 'maintain-anudatta',
      description: 'Maintain anudātta throughout word',
      mandatory: true,
      sutra: '1.2.38'
    });
  }
  
  return rules;
}

/**
 * Generates prosody options based on analysis
 */
function generateProsodyOptions(analysis, context) {
  const options = [];
  
  if (analysis.domainDetection.isSubrahmanyaContext) {
    if (analysis.hasOverrides) {
      options.push({
        mode: 'lexical-anudatta',
        description: 'Lexical anudātta for deva/brāhmaṇa words',
        confidence: 0.95,
        traditional: true
      });
    }
    
    options.push({
      mode: 'subrahmaṇya-prosody',
      description: 'Specialized Subrahmaṇyā recitation',
      confidence: 0.90,
      traditional: true
    });
  } else {
    options.push({
      mode: 'standard-prosody',
      description: 'Standard accent recitation',
      confidence: 0.85,
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
  
  notes.push(`Domain Analysis: ${analysis.domainDetection.contextStrength} Subrahmaṇyā context`);
  notes.push(`Lexical Targets: ${analysis.lexicalAnalysis.targetWordCount} target word(s) found`);
  notes.push(`Anudātta Overrides: ${analysis.anudattaOverride.overrideCount} override(s) required`);
  
  if (analysis.hasOverrides) {
    notes.push('Applied lexical anudātta overrides for deva/brāhmaṇa words');
  }
  
  return notes;
}

/**
 * Creates analysis summary
 */
function createAnalysisSummary(analysis) {
  return {
    domainContextDetected: analysis.domainDetection.isSubrahmanyaContext,
    targetWordsFound: analysis.lexicalAnalysis.hasTargetWords,
    overridesApplied: analysis.hasOverrides,
    applicableRule: analysis.hasOverrides ? '1.2.38-lexical-anudatta' : 'none'
  };
}

/**
 * Calculates confidence score
 */
function calculateConfidence(analysis, context) {
  let confidence = 0.7; // Base confidence
  
  // Increase confidence for explicit Subrahmaṇyā context
  if (analysis.domainDetection.isSubrahmanyaContext) {
    confidence += 0.2;
  }
  
  // Increase confidence with target words
  if (analysis.lexicalAnalysis.hasTargetWords) {
    confidence += 0.1;
  }
  
  // Increase confidence with multiple domain indicators
  if (analysis.domainDetection.domainIndicators.length > 1) {
    confidence += 0.05;
  }
  
  return Math.min(confidence, 1.0);
}

/**
 * Generates recommendations
 */
function generateRecommendations(analysis, context) {
  const recommendations = [];
  
  if (analysis.domainDetection.isSubrahmanyaContext && analysis.lexicalAnalysis.hasTargetWords) {
    recommendations.push('Apply lexical anudātta to deva and brāhmaṇa words');
    recommendations.push('Maintain consistent anudātta accent throughout target words');
    recommendations.push('Use specialized Subrahmaṇyā recitation prosody');
  } else if (analysis.lexicalAnalysis.hasTargetWords) {
    recommendations.push('Standard accent recitation for deva/brāhmaṇa outside Subrahmaṇyā context');
  } else {
    recommendations.push('Standard prosody recitation');
  }
  
  return recommendations;
}

/**
 * Generates traditional commentary
 */
function generateTraditionalCommentary(analysis, text, script) {
  return {
    sutraText: 'देवब्रह्मणोरनुदात्तः',
    meaning: 'Of deva and brāhmaṇa: anudātta',
    
    interpretation: analysis.domainDetection.isSubrahmanyaContext ?
      'In Subrahmaṇyā hymn contexts, the words "deva" (deity) and "brāhmaṇa" (priest) undergo mandatory lexical accent modification, becoming entirely anudātta. This creates prosodic uniformity and reverence appropriate to the sacred context.' :
      'Outside Subrahmaṇyā contexts, deva and brāhmaṇa words maintain their standard accentual patterns according to general rules.',
    
    scholasticNotes: analysis.lexicalAnalysis.hasTargetWords ? 
      `Target words identified: ${analysis.lexicalAnalysis.targetWords.map(w => w.word).join(', ')}. ${analysis.hasOverrides ? 'Lexical anudātta overrides applied.' : 'No overrides needed outside Subrahmaṇyā context.'}` :
      'No target words (deva/brāhmaṇa) found in input text.',
    
    practicalApplication: 'This sutra ensures proper reverent recitation of deity and priest references within sacred Subrahmaṇyā hymn contexts, creating acoustic humility through consistent low tone.'
  };
}

// Export for testing
export { 
  identifyTargetWords, 
  convertWordToAnudatta, 
  detectSubrahmanyaMarkers,
  analyzeSubrahmanyaDomain,
  analyzeLexicalTargets
};

export default sutra1238;
