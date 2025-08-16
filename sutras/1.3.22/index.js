/**
 * Sutra 1.3.22: समवप्रविभ्यः स्थः (samavapravibhyaḥ sthaḥ)
 * "After the verb स्था 'to stand', preceded by सम्, अव, प्र, वि, 
 * the आत्मनेपद affix is used."
 * 
 * This sutra prescribes ātmanepada endings for the root स्था (to stand) when preceded 
 * by the prefixes सम् (sam), अव (ava), प्र (pra), or वि (vi).
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.22
 */

import { detectScript, validateSanskritWord, tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada endings should be used for स्था root with specified prefixes
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Grammatical context
 * @param {string} context.root - The verbal root (default: auto-detect)
 * @param {string} context.prefix - The prefix (default: auto-detect)
 * @param {string} context.meaning - Semantic context
 * @returns {Object} Analysis result with ātmanepada determination
 */
export function determineSthaPrefixAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isSthaPrefixAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.22'
    };
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      isSthaPrefixAtmanepada: false,
      confidence: 0,
      analysis: 'Empty input',
      sutraApplied: '1.3.22'
    };
  }

  // Script detection and validation
  const script = detectScript(trimmedWord);
  
  // Skip strict validation for valid Sanskrit patterns - focus on morphological analysis
  const isValidInput = trimmedWord.length > 0 && (script === 'Devanagari' || script === 'IAST');
  if (!isValidInput) {
    return {
      isSthaPrefixAtmanepada: false,
      confidence: 0.1,
      analysis: 'Invalid Sanskrit word',
      sutraApplied: '1.3.22'
    };
  }

  // Check for स्था root with specified prefixes
  const hasSthaValidPrefixCombination = checkSthaValidPrefixCombination(trimmedWord, context, script);
  
  if (!hasSthaValidPrefixCombination.found) {
    return {
      isSthaPrefixAtmanepada: false,
      confidence: hasSthaValidPrefixCombination.confidence,
      analysis: hasSthaValidPrefixCombination.reason,
      sutraApplied: '1.3.22'
    };
  }

  // Determine confidence based on clarity of combination
  let confidence = hasSthaValidPrefixCombination.confidence;
  
  // Higher confidence for clear morphological structure
  if (hasSthaValidPrefixCombination.morphologyClarity) {
    confidence = Math.min(confidence + 0.15, 0.95);
  }

  // Adjust confidence based on standing/position semantic context
  if (hasStandingSemanticContext(trimmedWord, context)) {
    confidence = Math.min(confidence + 0.1, 0.95);
  }

  return {
    isSthaPrefixAtmanepada: true,
    confidence: confidence,
    analysis: `स्था + prefix combination found: ${hasSthaValidPrefixCombination.details}`,
    prefix: hasSthaValidPrefixCombination.prefix,
    root: 'स्था',
    sutraApplied: '1.3.22'
  };
}

/**
 * Checks if the word contains स्था root with specified prefixes
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Additional context
 * @param {string} script - Detected script
 * @returns {Object} Analysis of prefix + स्था combination
 */
function checkSthaValidPrefixCombination(word, context, script) {
  // Define स्था root patterns in different scripts
  const sthaPatterns = {
    devanagari: ['स्था', 'स्थ', 'तिष्ठ', 'स्थित', 'स्थान', 'स्थास्य'],
    iast: ['sthā', 'stha', 'tiṣṭha', 'sthita', 'sthāna', 'sthāsya']
  };

  // Define valid prefix patterns for this sutra (सम्, अव, प्र, वि)
  const validPrefixPatterns = {
    devanagari: {
      'सम्': ['सम्', 'स', 'सं'],
      'अव': ['अव', 'अ'],
      'प्र': ['प्र', 'प्'],
      'वि': ['वि', 'व्य्', 'वी']
    },
    iast: {
      'sam': ['sam', 'sa', 'saṃ'],
      'ava': ['ava', 'a'],
      'pra': ['pra', 'pr'],
      'vi': ['vi', 'vy', 'vī']
    }
  };

  const patterns = script === 'devanagari' ? 
    { stha: sthaPatterns.devanagari, prefixes: validPrefixPatterns.devanagari } :
    { stha: sthaPatterns.iast, prefixes: validPrefixPatterns.iast };

  // Check for explicit context information
  if (context.root && context.prefix) {
    const rootMatches = checkSthaRootMatch(context.root, patterns.stha);
    const prefixMatches = checkSthaValidPrefixMatch(context.prefix, patterns.prefixes);
    
    if (rootMatches && prefixMatches.found) {
      return {
        found: true,
        confidence: 0.9,
        prefix: prefixMatches.matched,
        details: `Explicit context: ${context.prefix} + ${context.root}`,
        morphologyClarity: true,
        reason: 'Context-specified prefix + स्था combination'
      };
    }
  }

  // Analyze word structure for prefix + root combination
  const combinationAnalysis = analyzeWordForSthaPrefix(word, patterns);
  
  if (combinationAnalysis.found) {
    return combinationAnalysis;
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No सम्/अव/प्र/वि + स्था combination detected'
  };
}

/**
 * Analyzes word structure for prefix + स्था combinations
 * 
 * @param {string} word - Word to analyze
 * @param {Object} patterns - Script-specific patterns
 * @returns {Object} Analysis result
 */
function analyzeWordForSthaPrefix(word, patterns) {
  const lowerWord = word.toLowerCase();
  
  // Check all valid prefix combinations
  for (const [prefixKey, prefixVariants] of Object.entries(patterns.prefixes)) {
    for (const prefixForm of prefixVariants) {
      const prefixLower = prefixForm.toLowerCase();
      
      if (lowerWord.startsWith(prefixLower)) {
        const remainder = lowerWord.substring(prefixForm.length);
        
        // Check if remainder contains स्था root patterns
        for (const sthaPattern of patterns.stha) {
          const sthaLower = sthaPattern.toLowerCase();
          
          if (remainder.includes(sthaLower)) {
            // Calculate confidence based on position and clarity
            let confidence = 0.75;
            
            // Higher confidence if स्था appears early in remainder
            const sthaPosition = remainder.indexOf(sthaLower);
            if (sthaPosition <= 2) {
              confidence += 0.1;
            }
            
            // Check for morphological clarity
            const morphologyClarity = checkSthaMorphologicalClarity(remainder, sthaPattern);
            
            return {
              found: true,
              confidence: confidence,
              prefix: prefixKey,
              details: `${prefixForm} + ${sthaPattern} detected`,
              morphologyClarity: morphologyClarity,
              reason: `Valid prefix + स्था combination: ${prefixForm} + स्था`
            };
          }
        }
      }
    }
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No clear valid prefix + स्था structure found'
  };
}

/**
 * Checks if root matches स्था patterns
 * 
 * @param {string} root - Root to check
 * @param {Array} sthaPatterns - स्था patterns for script
 * @returns {boolean} Whether root matches
 */
function checkSthaRootMatch(root, sthaPatterns) {
  const rootLower = root.toLowerCase();
  return sthaPatterns.some(pattern => 
    rootLower === pattern.toLowerCase() || 
    rootLower.startsWith(pattern.toLowerCase())
  );
}

/**
 * Checks if prefix matches valid patterns (सम्/अव/प्र/वि)
 * 
 * @param {string} prefix - Prefix to check
 * @param {Object} validPrefixPatterns - Valid prefix patterns for script
 * @returns {Object} Match result
 */
function checkSthaValidPrefixMatch(prefix, validPrefixPatterns) {
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
 * Checks morphological clarity of स्था root identification
 * 
 * @param {string} remainder - Remainder after prefix removal
 * @param {string} sthaPattern - Identified स्था pattern
 * @returns {boolean} Whether morphology is clear
 */
function checkSthaMorphologicalClarity(remainder, sthaPattern) {
  // Clear if स्था appears at the beginning of remainder
  if (remainder.toLowerCase().startsWith(sthaPattern.toLowerCase())) {
    return true;
  }
  
  // Check for common verbal endings after स्था
  const commonEndings = ['त्', 'न्त्', 'य', 'ष्य', 'तुम्', 'ते', 'न्ते', 'ान्', 'ास्य'];
  const sthaPosition = remainder.toLowerCase().indexOf(sthaPattern.toLowerCase());
  const afterStha = remainder.substring(sthaPosition + sthaPattern.length);
  
  return commonEndings.some(ending => 
    afterStha.toLowerCase().startsWith(ending.toLowerCase())
  );
}

/**
 * Determines if the word has standing/position-related semantic context
 * 
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {boolean} Whether standing semantic context exists
 */
function hasStandingSemanticContext(word, context) {
  // Check explicit meaning context
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    const standingTerms = [
      'stand', 'position', 'place', 'establish', 'remain', 'stay',
      'स्थान', 'sthāna', 'स्थिति', 'sthiti', 'अवस्था', 'avasthā'
    ];
    
    return standingTerms.some(term => meaning.includes(term));
  }

  // Analyze word for standing-related indicators
  const lowerWord = word.toLowerCase();
  const standingIndicators = [
    'स्थान', 'sthāna', 'स्थिति', 'sthiti', 'अवस्था', 'avasthā',
    'तिष्ठन्', 'tiṣṭhan', 'स्थित', 'sthita'
  ];
  
  return standingIndicators.some(indicator => 
    lowerWord.includes(indicator.toLowerCase())
  );
}

// Export default function as main entry point
export default determineSthaPrefixAtmanepada;
