/**
 * Sutra 1.3.30: निसमुपविभ्यो ह्वः (nisamupavibhyaḥ hvah)
 * "After the verbs ह्वे 'to call', preceded by नि, सम्, उप and वि, 
 * the आत्मनेपद is used, even when the fruit of the action does not accrue to the agent."
 * 
 * RULE TYPE: विधि (vidhi) - Prescriptive rule for verbal pada selection
 * SCOPE: Determines Ātmanepada usage for ह्वे root with specific prefixes
 * CONDITIONS: ह्वे root + {नि, सम्, उप, वि} prefixes
 * TRANSFORMATIONS: Prescribes Ātmanepada endings
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.30 for Ātmanepada designation
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { isVowel, isConsonant } from '../sanskrit-utils/classification.js';

/**
 * Determines if ह्वे root with निसमुपवि prefixes requires Ātmanepada
 * 
 * @param {string} word - The word/root to analyze
 * @param {Object} context - Additional context
 * @param {string} context.root - Explicit root specification
 * @param {string} context.prefix - Prefix specification  
 * @param {string} context.meaning - Semantic context
 * @returns {Object} Analysis result with Ātmanepada determination
 */
export function determineNisamupavibhyaHvaAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isNisamupavibhyaHvaAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.30'
    };
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      isNisamupavibhyaHvaAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.30'
    };
  }

  // Detect script
  const script = detectScript(trimmedWord);
  
  // Check for ह्वे root presence
  const hvaAnalysis = checkHvaRootPresence(trimmedWord, context, script);
  
  if (!hvaAnalysis.found) {
    return {
      isNisamupavibhyaHvaAtmanepada: false,
      confidence: hvaAnalysis.confidence,
      analysis: hvaAnalysis.reason,
      sutraApplied: '1.3.30'
    };
  }

  // Check for required prefixes (नि, सम्, उप, वि)
  const prefixAnalysis = checkRequiredPrefixes(trimmedWord, context, script);
  
  if (!prefixAnalysis.hasValidPrefix) {
    return {
      isNisamupavibhyaHvaAtmanepada: false,
      confidence: prefixAnalysis.confidence,
      analysis: prefixAnalysis.reason,
      sutraApplied: '1.3.30'
    };
  }

  // Determine confidence based on prefix clarity and root presence
  let confidence = Math.min(hvaAnalysis.confidence + prefixAnalysis.confidence - 0.1, 0.95);
  
  // Higher confidence for explicit prefix specification
  if (prefixAnalysis.explicitPrefix) {
    confidence = Math.min(confidence + 0.15, 0.98);
  }
  
  // Extra bonus when both root and prefix are explicit
  if (context.root && context.prefix) {
    confidence = Math.min(confidence + 0.05, 0.99);
  }

  return {
    isNisamupavibhyaHvaAtmanepada: true,
    confidence: confidence,
    analysis: `ह्वे root with valid prefix: ${prefixAnalysis.details}`,
    root: 'ह्वे',
    prefix: prefixAnalysis.prefix,
    sutraApplied: '1.3.30'
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
    devanagari: ['ह्वे', 'ह्व', 'हूय', 'हुव', 'हव'],
    iast: ['hve', 'hva', 'hūya', 'huva', 'hava']
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
      if (position <= 2) {
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
 * Checks for required prefixes (नि, सम्, उप, वि)
 * 
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @param {string} script - Detected script
 * @returns {Object} Prefix analysis result
 */
function checkRequiredPrefixes(word, context, script) {
  // Define prefix patterns for both scripts
  const prefixPatterns = {
    devanagari: {
      'नि': ['नि', 'निर्', 'निस्'],
      'सम्': ['सम्', 'सं', 'सम'],
      'उप': ['उप'],
      'वि': ['वि', 'विर्', 'विस्']
    },
    iast: {
      'ni': ['ni', 'nir', 'nis'], 
      'sam': ['sam', 'saṃ'],
      'upa': ['upa'],
      'vi': ['vi', 'vir', 'vis']
    }
  };

  const patterns = script === 'Devanagari' ? prefixPatterns.devanagari : prefixPatterns.iast;

  // Check explicit prefix context
  if (context.prefix) {
    const prefixLower = context.prefix.toLowerCase();
    
    // Check all patterns from both scripts
    const allPatterns = {...prefixPatterns.devanagari, ...prefixPatterns.iast};
    
    for (const [prefixKey, variants] of Object.entries(allPatterns)) {
      const variantMatches = variants.some(variant => 
        prefixLower === variant.toLowerCase() || 
        prefixLower.startsWith(variant.toLowerCase())
      );
      
      if (variantMatches) {
        return {
          hasValidPrefix: true,
          confidence: 0.9,
          details: `Explicit ${prefixKey} prefix`,
          prefix: prefixKey,
          explicitPrefix: true,
          reason: 'Context-specified valid prefix'
        };
      }
    }
  }

  // Analyze word for prefix patterns
  const lowerWord = word.toLowerCase();
  
  for (const [prefixKey, variants] of Object.entries(patterns)) {
    for (const variant of variants) {
      const variantLower = variant.toLowerCase();
      
      // Check if word starts with prefix (primary case)
      if (lowerWord.startsWith(variantLower)) {
        // Calculate confidence based on prefix clarity
        let confidence = 0.8;
        
        // Higher confidence for complete prefix forms
        if (variant.length >= 2) {
          confidence += 0.1;
        }
        
        return {
          hasValidPrefix: true,
          confidence: confidence,
          details: `${prefixKey} prefix detected: ${variant}`,
          prefix: prefixKey,
          explicitPrefix: false,
          reason: 'Prefix pattern detected at word start'
        };
      }
      
      // Also check for prefix within compound words
      if (lowerWord.includes(variantLower + 'ह्व') || lowerWord.includes(variantLower + 'hv')) {
        // Lower confidence for compound detection
        let confidence = 0.6;
        
        return {
          hasValidPrefix: true,
          confidence: confidence,
          details: `${prefixKey} prefix detected in compound: ${variant}`,
          prefix: prefixKey,
          explicitPrefix: false,
          reason: 'Prefix pattern detected in compound word'
        };
      }
    }
  }

  return {
    hasValidPrefix: false,
    confidence: 0.1,
    reason: 'No valid prefix (नि/सम्/उप/वि) detected',
    prefix: null,
    explicitPrefix: false
  };
}

/**
 * Main export - the function name used by the test suite and other imports
 */
export { determineNisamupavibhyaHvaAtmanepada as sutra_1_3_30 };
export default determineNisamupavibhyaHvaAtmanepada;
