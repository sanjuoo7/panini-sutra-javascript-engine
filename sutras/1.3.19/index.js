/**
 * Sutra 1.3.19: विपराभ्यां जेः (viparābhyāṃ jeḥ)
 * "After the verb जि 'to conquer', preceded by वि or परा, the आ  // Check for explicit context information
  if (context.root && context.prefix) {
    // Check for both script formats
    const allJiPatterns = [...jiPatterns.devanagari, ...jiPatterns.iast];
    const allPrefixPatterns = {
      ...prefixPatterns.devanagari,
      ...prefixPatterns.iast
    };
    
    const rootMatches = checkRootMatch(context.root, allJiPatterns);
    const prefixMatches = checkPrefixMatch(context.prefix, allPrefixPatterns);
    
    if (rootMatches && prefixMatches.found) {
      return {
        found: true,
        confidence: 0.9,
        prefix: context.prefix,
        details: `Explicit context: ${context.prefix} + ${context.root}`,
        morphologyClarity: true,
        reason: `वि/परा + जि combination via context`
      };
    }
  } employed."
 * 
 * This sutra prescribes ātmanepada endings for the root जि (to conquer/to win)
 * when preceded by the prefixes वि (vi) or परा (parā).
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.19
 */

import { detectScript, validateSanskritWord, tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada endings should be used for जि root with वि/परा prefixes
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Grammatical context
 * @param {string} context.root - The verbal root (default: auto-detect)
 * @param {string} context.prefix - The prefix (default: auto-detect)
 * @param {string} context.tense - Tense/mood information
 * @returns {Object} Analysis result with ātmanepada determination
 */
export function determineViParaJiAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isViParaJiAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.19'
    };
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      isViParaJiAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.19'
    };
  }

  // Script detection and validation
  const script = detectScript(trimmedWord);
  
  // Skip strict validation for valid Sanskrit patterns - focus on morphological analysis
  const isValidInput = trimmedWord.length > 0 && (script === 'Devanagari' || script === 'IAST');
  if (!isValidInput) {
    return {
      isViParaJiAtmanepada: false,
      confidence: 0.1,
      analysis: 'Invalid Sanskrit word',
      sutraApplied: '1.3.19'
    };
  }

  // Check for जि root with वि/परा prefixes
  const hasViParaJiCombination = checkViParaJiCombination(trimmedWord, context, script);
  
  if (!hasViParaJiCombination.found) {
    return {
      isViParaJiAtmanepada: false,
      confidence: hasViParaJiCombination.confidence,
      analysis: hasViParaJiCombination.reason,
      sutraApplied: '1.3.19'
    };
  }

  // Determine confidence based on clarity of combination
  let confidence = hasViParaJiCombination.confidence;
  
  // Higher confidence for clear morphological structure
  if (hasViParaJiCombination.morphologyClarity) {
    confidence = Math.min(confidence + 0.15, 0.95);
  }

  return {
    isViParaJiAtmanepada: true,
    confidence: confidence,
    analysis: `वि/परा + जि combination found: ${hasViParaJiCombination.details}`,
    prefix: hasViParaJiCombination.prefix,
    root: 'जि',
    sutraApplied: '1.3.19'
  };
}

/**
 * Checks if the word contains जि root with वि or परा prefix
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Additional context
 * @param {string} script - Detected script
 * @returns {Object} Analysis of वि/परा + जि combination
 */
function checkViParaJiCombination(word, context, script) {
  // Define जि root patterns in different scripts
  const jiPatterns = {
    devanagari: ['जि', 'जय', 'जे', 'जित', 'जिन्', 'जिगी', 'जैष्य'],
    iast: ['ji', 'jay', 'je', 'jit', 'jin', 'jigī', 'jaiṣya']
  };

  // Define वि/परा prefix patterns
  const prefixPatterns = {
    devanagari: {
      'वि': ['वि', 'व्य्', 'वी'],
      'परा': ['परा', 'पराक्', 'पार']
    },
    iast: {
      'vi': ['vi', 'vy', 'vī'],
      'parā': ['parā', 'parāk', 'pār']
    }
  };

  const patterns = script === 'Devanagari' ? 
    { ji: jiPatterns.devanagari, prefixes: prefixPatterns.devanagari } :
    { ji: jiPatterns.iast, prefixes: prefixPatterns.iast };

  // Check for explicit context information - handle both scripts
  if (context.root && context.prefix) {
    // Check both Devanagari and IAST patterns for context
    const devanagariPatterns = { ji: jiPatterns.devanagari, prefixes: prefixPatterns.devanagari };
    const iastPatterns = { ji: jiPatterns.iast, prefixes: prefixPatterns.iast };
    
    const rootMatchesDevanagari = checkRootMatch(context.root, devanagariPatterns.ji);
    const prefixMatchesDevanagari = checkPrefixMatch(context.prefix, devanagariPatterns.prefixes);
    const rootMatchesIAST = checkRootMatch(context.root, iastPatterns.ji);
    const prefixMatchesIAST = checkPrefixMatch(context.prefix, iastPatterns.prefixes);
    
    if ((rootMatchesDevanagari || rootMatchesIAST) && (prefixMatchesDevanagari.found || prefixMatchesIAST.found)) {
      const matchedPrefix = prefixMatchesDevanagari.found ? prefixMatchesDevanagari.matched : prefixMatchesIAST.matched;
      return {
        found: true,
        confidence: 0.9,
        prefix: matchedPrefix,
        details: `Explicit context: ${context.prefix} + ${context.root}`,
        morphologyClarity: true,
        reason: 'Context-specified वि/परा + जि combination'
      };
    }
  }

  // Analyze word structure for prefix + root combination
  const combinationAnalysis = analyzeWordForViParaJi(word, patterns);
  
  if (combinationAnalysis.found) {
    return combinationAnalysis;
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No वि/परा + जि combination detected'
  };
}

/**
 * Analyzes word structure for वि/परा + जि combinations
 * 
 * @param {string} word - Word to analyze
 * @param {Object} patterns - Script-specific patterns
 * @returns {Object} Analysis result
 */
function analyzeWordForViParaJi(word, patterns) {
  // Check all prefix combinations
  for (const [prefixKey, prefixVariants] of Object.entries(patterns.prefixes)) {
    for (const prefixForm of prefixVariants) {
      
      if (word.startsWith(prefixForm)) {
        const remainder = word.substring(prefixForm.length);
        
        // Check if remainder contains जि root patterns
        for (const jiPattern of patterns.ji) {
          
          if (remainder.includes(jiPattern)) {
            // Calculate confidence based on position and clarity
            let confidence = 0.7;
            
            // Higher confidence if जि appears early in remainder
            const jiPosition = remainder.indexOf(jiPattern);
            if (jiPosition <= 2) {
              confidence += 0.1;
            }
            
            // Check for morphological clarity
            const morphologyClarity = checkMorphologicalClarity(remainder, jiPattern);
            
            return {
              found: true,
              confidence: confidence,
              prefix: prefixKey,
              details: `${prefixForm} + ${jiPattern} detected`,
              morphologyClarity: morphologyClarity,
              reason: `वि/परा + जि combination: ${prefixForm} + जि`
            };
          }
        }
      }
    }
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No clear वि/परा + जि structure found'
  };
}

/**
 * Checks if root matches जि patterns
 * 
 * @param {string} root - Root to check
 * @param {Array} jiPatterns - जि patterns for script
 * @returns {boolean} Whether root matches
 */
function checkRootMatch(root, jiPatterns) {
  return jiPatterns.some(pattern => 
    root === pattern || 
    root.startsWith(pattern)
  );
}

/**
 * Checks if prefix matches वि/परा patterns
 * 
 * @param {string} prefix - Prefix to check
 * @param {Object} prefixPatterns - Prefix patterns for script
 * @returns {Object} Match result
 */
function checkPrefixMatch(prefix, prefixPatterns) {
  for (const [prefixKey, variants] of Object.entries(prefixPatterns)) {
    for (const variant of variants) {
      if (prefix === variant || 
          prefix.startsWith(variant)) {
        return {
          found: true,
          matched: prefixKey
        };
      }
    }
  }
  
  return { found: false };
}

/**
 * Checks morphological clarity of जि root identification
 * 
 * @param {string} remainder - Remainder after prefix removal
 * @param {string} jiPattern - Identified जि pattern
 * @returns {boolean} Whether morphology is clear
 */
function checkMorphologicalClarity(remainder, jiPattern) {
  // Clear if जि appears at the beginning of remainder
  if (remainder.startsWith(jiPattern)) {
    return true;
  }
  
  // Check for common verbal endings after जि
  const commonEndings = ['त्', 'न्त्', 'य', 'ष्य', 'तुम्'];
  const jiPosition = remainder.indexOf(jiPattern);
  const afterJi = remainder.substring(jiPosition + jiPattern.length);
  
  return commonEndings.some(ending => 
    afterJi.startsWith(ending)
  );
}

// Export default function as main entry point
export default determineViParaJiAtmanepada;
