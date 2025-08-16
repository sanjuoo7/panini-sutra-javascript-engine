/**
 * Sutra 1.3.31: स्पर्द्धायामाङः (spardhāyām āṅgaḥ)
 * "After the verbs ह्वे 'to call', when meaning 'to challenge' and preceded by आङ्, 
 * the आत्मनेपद is used, even when the fruit of the action does not accrue to the agent."
 * 
 * RULE TYPE: विधि (vidhi) - Prescriptive rule for verbal pada selection
 * SCOPE: Determines Ātmanepada usage for ह्वे root with आङ् prefix in challenging context
 * CONDITIONS: ह्वे root + आङ् prefix + challenging/competition meaning
 * TRANSFORMATIONS: Prescribes Ātmanepada endings
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.31 for Ātmanepada designation
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isVowel, isConsonant } from '../sanskrit-utils/classification.js';

/**
 * Determines if ह्वे root with आङ् prefix in challenging sense requires Ātmanepada
 * 
 * @param {string} word - The word/root to analyze
 * @param {Object} context - Additional context
 * @param {string} context.root - Explicit root specification
 * @param {string} context.prefix - Prefix specification
 * @param {string} context.meaning - Semantic context 
 * @param {boolean} context.challenge - Challenging context flag
 * @param {boolean} context.competition - Competition context flag
 * @returns {Object} Analysis result with Ātmanepada determination
 */
export function determineSpardhayamAngaAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isSpardhayamAngaAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.31'
    };
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      isSpardhayamAngaAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.31'
    };
  }

  // Detect script
  const script = detectScript(trimmedWord);
  
  // Check for ह्वे root presence
  const hvaAnalysis = checkHvaRootPresence(trimmedWord, context, script);
  
  if (!hvaAnalysis.found) {
    return {
      isSpardhayamAngaAtmanepada: false,
      confidence: hvaAnalysis.confidence,
      analysis: hvaAnalysis.reason,
      sutraApplied: '1.3.31'
    };
  }

  // Check for आङ् prefix
  const angaAnalysis = checkAngaPrefixPresence(trimmedWord, context, script);
  
  // Check for challenging/competition context (स्पर्धा meaning)
  const challengeAnalysis = checkChallengingContext(trimmedWord, context);
  
  // Allow rule to apply if either:
  // 1. Both आङ् prefix and challenging context are present
  // 2. Strong challenging context from word patterns (स्पर्धा compounds) even without explicit आङ्
  const hasRequiredElements = (angaAnalysis.hasAngaPrefix && challengeAnalysis.hasChallengingContext) ||
                              (challengeAnalysis.hasChallengingContext && 
                               challengeAnalysis.confidence >= 0.7 && 
                               !challengeAnalysis.explicitChallenge);
  
  if (!hasRequiredElements) {
    if (!angaAnalysis.hasAngaPrefix && !challengeAnalysis.hasChallengingContext) {
      return {
        isSpardhayamAngaAtmanepada: false,
        confidence: Math.max(angaAnalysis.confidence, challengeAnalysis.confidence),
        analysis: 'Missing both आङ् prefix and challenging context',
        sutraApplied: '1.3.31'
      };
    } else if (!angaAnalysis.hasAngaPrefix) {
      return {
        isSpardhayamAngaAtmanepada: false,
        confidence: angaAnalysis.confidence,
        analysis: angaAnalysis.reason,
        sutraApplied: '1.3.31'
      };
    } else {
      return {
        isSpardhayamAngaAtmanepada: false,
        confidence: challengeAnalysis.confidence,
        analysis: challengeAnalysis.reason,
        sutraApplied: '1.3.31'
      };
    }
  }

  // Determine confidence based on all factors present
  let confidence;
  
  if (angaAnalysis.hasAngaPrefix && challengeAnalysis.hasChallengingContext) {
    // Both आङ् and challenging context present
    confidence = Math.min(
      hvaAnalysis.confidence + 
      angaAnalysis.confidence + 
      challengeAnalysis.confidence - 0.2, 
      0.95
    );
  } else if (challengeAnalysis.hasChallengingContext) {
    // Only challenging context present (semantic fallback)
    confidence = Math.min(
      hvaAnalysis.confidence + 
      challengeAnalysis.confidence - 0.1, 
      0.85
    );
  }
  
  // Higher confidence for explicit semantic specification
  if (challengeAnalysis.explicitChallenge) {
    confidence = Math.min(confidence + 0.1, 0.95);
  }

  return {
    isSpardhayamAngaAtmanepada: true,
    confidence: confidence,
    analysis: `ह्वे root with आङ् prefix in challenging context: ${challengeAnalysis.details}`,
    root: 'ह्वे',
    prefix: 'आङ्',
    challengingContext: challengeAnalysis.contextType,
    sutraApplied: '1.3.31'
  };
}

/**
 * Checks if the word contains ह्वे root
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Additional context
 * @param {string} script - Detected script
 * @returns {Object} Analysis of ह्वे presence
 */
function checkHvaRootPresence(word, context, script) {
  // Define ह्वे root patterns in different scripts
  const hvaPatterns = {
    devanagari: ['ह्वे', 'ह्व', 'हूय', 'हुव', 'हव', 'आह्व'],
    iast: ['hve', 'hva', 'hūya', 'huva', 'hava', 'āhva']
  };

  const patterns = script === 'Devanagari' ? hvaPatterns.devanagari : hvaPatterns.iast;

  // Check for explicit root context
  if (context.root) {
    const rootLower = context.root.toLowerCase();
    
    // Check against both script patterns for cross-script compatibility
    const allPatterns = [...hvaPatterns.devanagari, ...hvaPatterns.iast];
    const rootMatches = allPatterns.some(pattern => 
      rootLower === pattern.toLowerCase() || 
      rootLower.startsWith(pattern.toLowerCase())
    );
    
    if (rootMatches) {
      return {
        found: true,
        confidence: 0.9,
        reason: 'Context-specified ह्वे root'
      };
    }
  }

  // Analyze word for ह्वे patterns
  const lowerWord = word.toLowerCase();
  
  for (const pattern of patterns) {
    const patternLower = pattern.toLowerCase();
    
    if (lowerWord.includes(patternLower)) {
      // Calculate confidence based on position and clarity
      let confidence = 0.7;
      
      // Higher confidence if ह्वे appears prominently
      const position = lowerWord.indexOf(patternLower);
      if (position <= 3) {  // Allow for आङ् prefix
        confidence += 0.1;
      }
      
      return {
        found: true,
        confidence: confidence,
        reason: `ह्वे pattern detected: ${pattern}`
      };
    }
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No ह्वे root pattern detected'
  };
}

/**
 * Checks for आङ् prefix presence
 * 
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @param {string} script - Detected script
 * @returns {Object} आङ् prefix analysis result
 */
function checkAngaPrefixPresence(word, context, script) {
  // Define आङ् prefix patterns for both scripts
  const angaPrefixPatterns = {
    devanagari: ['आ', 'आङ्', 'आह्', 'आहू'],
    iast: ['ā', 'āṅ', 'āh', 'āhū']
  };

  const patterns = script === 'Devanagari' ? angaPrefixPatterns.devanagari : angaPrefixPatterns.iast;

  // Check explicit prefix context
  if (context.prefix) {
    const prefixLower = context.prefix.toLowerCase();
    
    // Check all patterns from both scripts
    const allPatterns = [...angaPrefixPatterns.devanagari, ...angaPrefixPatterns.iast];
    
    const prefixMatches = allPatterns.some(pattern => 
      prefixLower === pattern.toLowerCase() || 
      prefixLower.includes('āṅ') || 
      prefixLower.includes('आङ्')
    );
    
    if (prefixMatches) {
      return {
        hasAngaPrefix: true,
        confidence: 0.9,
        details: 'Explicit आङ् prefix',
        explicitPrefix: true,
        reason: 'Context-specified आङ् prefix'
      };
    }
  }

  // Analyze word for आङ् prefix patterns
  const lowerWord = word.toLowerCase();
  
  for (const pattern of patterns) {
    const patternLower = pattern.toLowerCase();
    
    if (lowerWord.startsWith(patternLower)) {
      // Calculate confidence based on prefix clarity
      let confidence = 0.7;
      
      // Higher confidence for complete आङ् forms
      if (pattern.includes('ङ') || pattern.includes('ṅ')) {
        confidence += 0.1;
      }
      
      return {
        hasAngaPrefix: true,
        confidence: confidence,
        details: `आङ् prefix detected: ${pattern}`,
        explicitPrefix: false,
        reason: 'आङ् prefix pattern detected in word'
      };
    }
  }

  return {
    hasAngaPrefix: false,
    confidence: 0.1,
    reason: 'No आङ् prefix detected',
    explicitPrefix: false
  };
}

/**
 * Checks for challenging/competition context (स्पर्धा meaning)
 * 
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Challenging context analysis result
 */
function checkChallengingContext(word, context) {
  // Check explicit semantic flags
  if (context.challenge === true || context.competition === true) {
    const contextType = context.challenge ? 'challenge' : 'competition';
    return {
      hasChallengingContext: true,
      confidence: 0.9,
      details: `Explicit ${contextType} context`,
      contextType: contextType,
      explicitChallenge: true,
      reason: 'Context-specified challenging meaning'
    };
  }

  // Check meaning field for challenging indicators
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    
    // स्पर्धा (challenging/competition) terms
    const challengeTerms = [
      'challenge', 'compete', 'rivalry', 'contest', 'duel', 'oppose',
      'स्पर्धा', 'spardhā', 'प्रतियोगिता', 'pratiyogitā', 'संघर्ष', 'saṅgharṣa'
    ];
    
    const hasChallengeTerm = challengeTerms.some(term => meaning.includes(term));
    
    if (hasChallengeTerm) {
      return {
        hasChallengingContext: true,
        confidence: 0.8,
        details: 'Challenging meaning detected in context',
        contextType: 'challenge',
        explicitChallenge: false,
        reason: 'Challenging semantic context detected'
      };
    }
  }

  // Analyze word for challenging semantic patterns
  const lowerWord = word.toLowerCase();
  
  // Look for compound words with challenging semantics
  const challengePatterns = {
    devanagari: ['स्पर्धा', 'प्रतिस्पर्धा', 'संघर्ष', 'युद्ध'],
    iast: ['spardhā', 'pratispardhā', 'saṅgharṣa', 'yuddha']
  };
  
  const allChallengePatterns = [...challengePatterns.devanagari, ...challengePatterns.iast];
  
  for (const pattern of allChallengePatterns) {
    if (lowerWord.includes(pattern.toLowerCase())) {
      return {
        hasChallengingContext: true,
        confidence: 0.7,
        details: `Challenging semantic pattern: ${pattern}`,
        contextType: 'challenge',
        explicitChallenge: false,
        reason: 'Challenging semantic pattern detected in word'
      };
    }
  }

  return {
    hasChallengingContext: false,
    confidence: 0.1,
    reason: 'No challenging/competition context detected',
    contextType: null,
    explicitChallenge: false
  };
}

/**
 * Main export - the function name used by the test suite and other imports
 */
export { determineSpardhayamAngaAtmanepada as sutra_1_3_31 };
export default determineSpardhayamAngaAtmanepada;
