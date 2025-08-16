/**
 * Sutra 1.3.21: क्रीडोऽनुसम्परिभ्यश्च (krīḍo'nusamparibhyaśca)
 * "After the verb क्रीड 'to play', preceded by अनु, सम्, or परि as well as आङ्, 
 * the आत्मनेपद affix is used."
 * 
 * This sutra prescribes ātmanepada endings for the root क्रीड (to play) when preceded 
 * by the prefixes अनु (anu), सम् (sam), परि (pari), or आङ् (āṅ).
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.21
 */

import { detectScript, validateSanskritWord, tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada endings should be used for क्रीड root with specified prefixes
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Grammatical context
 * @param {string} context.root - The verbal root (default: auto-detect)
 * @param {string} context.prefix - The prefix (default: auto-detect)
 * @param {string} context.meaning - Semantic context
 * @returns {Object} Analysis result with ātmanepada determination
 */
export function determineKriDaPrefixAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isKriDaPrefixAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.21'
    };
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      isKriDaPrefixAtmanepada: false,
      confidence: 0,
      analysis: 'Empty input',
      sutraApplied: '1.3.21'
    };
  }

  // Script detection and validation
  const script = detectScript(trimmedWord);
  
  // Skip strict validation for valid Sanskrit patterns - focus on morphological analysis
  const isValidInput = trimmedWord.length > 0 && (script === 'Devanagari' || script === 'IAST');
  if (!isValidInput) {
    return {
      isKriDaPrefixAtmanepada: false,
      confidence: 0.1,
      analysis: 'Invalid Sanskrit word',
      sutraApplied: '1.3.21'
    };
  }

  // Check for क्रीड root with specified prefixes
  const hasKriDaPrefixCombination = checkKriDaPrefixCombination(trimmedWord, context, script);
  
  if (!hasKriDaPrefixCombination.found) {
    return {
      isKriDaPrefixAtmanepada: false,
      confidence: hasKriDaPrefixCombination.confidence,
      analysis: hasKriDaPrefixCombination.reason,
      sutraApplied: '1.3.21'
    };
  }

  // Determine confidence based on clarity of combination
  let confidence = hasKriDaPrefixCombination.confidence;
  
  // Higher confidence for clear morphological structure
  if (hasKriDaPrefixCombination.morphologyClarity) {
    confidence = Math.min(confidence + 0.15, 0.95);
  }

  // Adjust confidence based on play-related semantic context
  if (hasPlaySemanticContext(trimmedWord, context)) {
    confidence = Math.min(confidence + 0.1, 0.95);
  }

  return {
    isKriDaPrefixAtmanepada: true,
    confidence: confidence,
    analysis: `क्रीड + prefix combination found: ${hasKriDaPrefixCombination.details}`,
    prefix: hasKriDaPrefixCombination.prefix,
    root: 'क्रीड',
    sutraApplied: '1.3.21'
  };
}

/**
 * Checks if the word contains क्रीड root with specified prefixes
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Additional context
 * @param {string} script - Detected script
 * @returns {Object} Analysis of prefix + क्रीड combination
 */
function checkKriDaPrefixCombination(word, context, script) {
  // Define क्रीड root patterns in different scripts
  const kriDaPatterns = {
    devanagari: ['क्रीड', 'क्रीळ', 'क्रिड', 'क्रीळत्', 'क्रीडत्', 'क्रीडित'],
    iast: ['krīḍ', 'krīḷ', 'kriḍ', 'krīḷat', 'krīḍat', 'krīḍita']
  };

  // Define valid prefix patterns for this sutra
  const validPrefixPatterns = {
    devanagari: {
      'अनु': ['अनु', 'अन्', 'अनू'],
      'सम्': ['सम्', 'स', 'सं'],
      'परि': ['परि', 'पर', 'परी'],
      'आङ्': ['आ', 'आङ्', 'आन्']
    },
    iast: {
      'anu': ['anu', 'an', 'anū'],
      'sam': ['sam', 'sa', 'saṃ'],
      'pari': ['pari', 'par', 'parī'],
      'āṅ': ['ā', 'āṅ', 'ān']
    }
  };

  const patterns = script === 'devanagari' ? 
    { kriDa: kriDaPatterns.devanagari, prefixes: validPrefixPatterns.devanagari } :
    { kriDa: kriDaPatterns.iast, prefixes: validPrefixPatterns.iast };

  // Check for explicit context information
  if (context.root && context.prefix) {
    const rootMatches = checkKriDaRootMatch(context.root, patterns.kriDa);
    const prefixMatches = checkValidPrefixMatch(context.prefix, patterns.prefixes);
    
    if (rootMatches && prefixMatches.found) {
      return {
        found: true,
        confidence: 0.9,
        prefix: prefixMatches.matched,
        details: `Explicit context: ${context.prefix} + ${context.root}`,
        morphologyClarity: true,
        reason: 'Context-specified prefix + क्रीड combination'
      };
    }
  }

  // Analyze word structure for prefix + root combination
  const combinationAnalysis = analyzeWordForKriDaPrefix(word, patterns);
  
  if (combinationAnalysis.found) {
    return combinationAnalysis;
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No अनु/सम्/परि/आङ् + क्रीड combination detected'
  };
}

/**
 * Analyzes word structure for prefix + क्रीड combinations
 * 
 * @param {string} word - Word to analyze
 * @param {Object} patterns - Script-specific patterns
 * @returns {Object} Analysis result
 */
function analyzeWordForKriDaPrefix(word, patterns) {
  const lowerWord = word.toLowerCase();
  
  // Check all valid prefix combinations
  for (const [prefixKey, prefixVariants] of Object.entries(patterns.prefixes)) {
    for (const prefixForm of prefixVariants) {
      const prefixLower = prefixForm.toLowerCase();
      
      if (lowerWord.startsWith(prefixLower)) {
        const remainder = lowerWord.substring(prefixForm.length);
        
        // Check if remainder contains क्रीड root patterns
        for (const kriDaPattern of patterns.kriDa) {
          const kriDaLower = kriDaPattern.toLowerCase();
          
          if (remainder.includes(kriDaLower)) {
            // Calculate confidence based on position and clarity
            let confidence = 0.75;
            
            // Higher confidence if क्रीड appears early in remainder
            const kriDaPosition = remainder.indexOf(kriDaLower);
            if (kriDaPosition <= 2) {
              confidence += 0.1;
            }
            
            // Check for morphological clarity
            const morphologyClarity = checkKriDaMorphologicalClarity(remainder, kriDaPattern);
            
            return {
              found: true,
              confidence: confidence,
              prefix: prefixKey,
              details: `${prefixForm} + ${kriDaPattern} detected`,
              morphologyClarity: morphologyClarity,
              reason: `Valid prefix + क्रीड combination: ${prefixForm} + क्रीड`
            };
          }
        }
      }
    }
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No clear valid prefix + क्रीड structure found'
  };
}

/**
 * Checks if root matches क्रीड patterns
 * 
 * @param {string} root - Root to check
 * @param {Array} kriDaPatterns - क्रीड patterns for script
 * @returns {boolean} Whether root matches
 */
function checkKriDaRootMatch(root, kriDaPatterns) {
  const rootLower = root.toLowerCase();
  return kriDaPatterns.some(pattern => 
    rootLower === pattern.toLowerCase() || 
    rootLower.startsWith(pattern.toLowerCase())
  );
}

/**
 * Checks if prefix matches valid patterns (अनु/सम्/परि/आङ्)
 * 
 * @param {string} prefix - Prefix to check
 * @param {Object} validPrefixPatterns - Valid prefix patterns for script
 * @returns {Object} Match result
 */
function checkValidPrefixMatch(prefix, validPrefixPatterns) {
  const prefixLower = prefix.toLowerCase();
  
  for (const [prefixKey, variants] of Object.entries(validPrefixPatterns)) {
    for (const variant of variants) {
      if (prefixLower === variant.toLowerCase() || 
          prefixLower.startsWith(variant.toLowerCase())) {
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
 * Checks morphological clarity of क्रीड root identification
 * 
 * @param {string} remainder - Remainder after prefix removal
 * @param {string} kriDaPattern - Identified क्रीड pattern
 * @returns {boolean} Whether morphology is clear
 */
function checkKriDaMorphologicalClarity(remainder, kriDaPattern) {
  // Clear if क्रीड appears at the beginning of remainder
  if (remainder.toLowerCase().startsWith(kriDaPattern.toLowerCase())) {
    return true;
  }
  
  // Check for common verbal endings after क्रीड
  const commonEndings = ['त्', 'न्त्', 'य', 'ष्य', 'तुम्', 'ते', 'न्ते', 'ित'];
  const kriDaPosition = remainder.toLowerCase().indexOf(kriDaPattern.toLowerCase());
  const afterKriDa = remainder.substring(kriDaPosition + kriDaPattern.length);
  
  return commonEndings.some(ending => 
    afterKriDa.toLowerCase().startsWith(ending.toLowerCase())
  );
}

/**
 * Determines if the word has play-related semantic context
 * 
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {boolean} Whether play semantic context exists
 */
function hasPlaySemanticContext(word, context) {
  // Check explicit meaning context
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    const playTerms = [
      'play', 'sport', 'game', 'amusement', 'recreation',
      'क्रीडा', 'krīḍā', 'खेल', 'khela', 'लीला', 'līlā'
    ];
    
    return playTerms.some(term => meaning.includes(term));
  }

  // Analyze word for play-related indicators
  const lowerWord = word.toLowerCase();
  const playIndicators = [
    'क्रीडा', 'krīḍā', 'लीला', 'līlā', 'खेल', 'khela',
    'नर्तन', 'nartana', 'गीत', 'gīta'
  ];
  
  return playIndicators.some(indicator => 
    lowerWord.includes(indicator.toLowerCase())
  );
}

// Export default function as main entry point
export default determineKriDaPrefixAtmanepada;
