/**
 * Sutra 1.3.20: आङो दोऽनास्यविहरणे (āṅo do'nāsyaviharaṇe)
 * "After the verb दा 'to give', preceded by आङ्, and when not meaning 'to open the mouth', 
 * the आत्मनेपद affix is used, even when the fruit of the action does not accrue to the agent."
 * 
 * This sutra prescribes ātmanepada endings for the root दा (to give) when preceded 
 * by the prefix आङ् (ā), excluding contexts where it means "to open the mouth".
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.20
 */

import { detectScript, validateSanskritWord, tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada endings should be used for दा root with आङ् prefix
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Grammatical context
 * @param {string} context.root - The verbal root (default: auto-detect)
 * @param {string} context.prefix - The prefix (default: auto-detect)
 * @param {string} context.meaning - Semantic context
 * @param {boolean} context.mouthOpening - Whether it means opening mouth
 * @returns {Object} Analysis result with ātmanepada determination
 */
export function determineAangDoAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isAangDoAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.20'
    };
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      isAangDoAtmanepada: false,
      confidence: 0,
      analysis: 'Empty input',
      sutraApplied: '1.3.20'
    };
  }

  // Script detection and validation
  const script = detectScript(trimmedWord);
  
  // Skip strict validation for valid Sanskrit patterns - focus on morphological analysis
  const isValidInput = trimmedWord.length > 0 && (script === 'Devanagari' || script === 'IAST');
  if (!isValidInput) {
    return {
      isAangDoAtmanepada: false,
      confidence: 0.1,
      analysis: 'Invalid Sanskrit word',
      sutraApplied: '1.3.20'
    };
  }

  // Check for mouth-opening meaning exclusion first
  if (context.mouthOpening === true || 
      isMouthOpeningContext(trimmedWord, context)) {
    return {
      isAangDoAtmanepada: false,
      confidence: 0.8,
      analysis: 'Excluded: mouth-opening meaning (आस्यविहरण)',
      semanticException: true,
      sutraApplied: '1.3.20'
    };
  }

  // Check for आङ् + दा combination
  const hasAangDaCombination = checkAangDaCombination(trimmedWord, context, script);
  
  if (!hasAangDaCombination.found) {
    return {
      isAangDoAtmanepada: false,
      confidence: hasAangDaCombination.confidence,
      analysis: hasAangDaCombination.reason,
      sutraApplied: '1.3.20'
    };
  }

  // Determine confidence based on clarity of combination
  let confidence = hasAangDaCombination.confidence;
  
  // Higher confidence for clear morphological structure
  if (hasAangDaCombination.morphologyClarity) {
    confidence = Math.min(confidence + 0.15, 0.95);
  }

  // Reduce confidence if semantic context is unclear
  if (!context.meaning && !hasSemanticClarity(trimmedWord)) {
    confidence = Math.max(confidence - 0.1, 0.6);
  }

  return {
    isAangDoAtmanepada: true,
    confidence: confidence,
    analysis: `आङ् + दा combination found: ${hasAangDaCombination.details}`,
    prefix: hasAangDaCombination.prefix,
    root: 'दा',
    nonMouthOpening: true,
    sutraApplied: '1.3.20'
  };
}

/**
 * Checks if the context or word indicates mouth-opening meaning
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Additional context
 * @returns {boolean} Whether it's a mouth-opening context
 */
function isMouthOpeningContext(word, context) {
  // Explicit context indication
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    const mouthOpeningTerms = [
      'open mouth', 'mouth opening', 'आस्यविहरण', 'āsyaviharaṇa',
      'yawn', 'gape', 'speak', 'utter', 'pronounce'
    ];
    
    return mouthOpeningTerms.some(term => meaning.includes(term));
  }

  // Analyze word for mouth-opening indicators
  const lowerWord = word.toLowerCase();
  const mouthPatterns = [
    'आस्य', 'āsya', 'मुख', 'mukha', 'वदन', 'vadana'
  ];
  
  return mouthPatterns.some(pattern => lowerWord.includes(pattern.toLowerCase()));
}

/**
 * Checks if the word contains दा root with आङ् prefix
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Additional context
 * @param {string} script - Detected script
 * @returns {Object} Analysis of आङ् + दा combination
 */
function checkAangDaCombination(word, context, script) {
  // Define दा root patterns in different scripts
  const daPatterns = {
    devanagari: ['दा', 'द', 'दत्त', 'दद्', 'ददा', 'देय'],
    iast: ['dā', 'da', 'datta', 'dad', 'dadā', 'deya']
  };

  // Define आङ् prefix patterns
  const aangPrefixPatterns = {
    devanagari: ['आ', 'आङ्', 'आन्'],
    iast: ['ā', 'āṅ', 'ān']
  };

  const patterns = script === 'devanagari' ? 
    { da: daPatterns.devanagari, prefixes: aangPrefixPatterns.devanagari } :
    { da: daPatterns.iast, prefixes: aangPrefixPatterns.iast };

  // Check for explicit context information
  if (context.root && context.prefix) {
    const rootMatches = checkRootMatch(context.root, patterns.da);
    const prefixMatches = checkAangPrefixMatch(context.prefix, patterns.prefixes);
    
    if (rootMatches && prefixMatches) {
      return {
        found: true,
        confidence: 0.9,
        prefix: 'आङ्',
        details: `Explicit context: ${context.prefix} + ${context.root}`,
        morphologyClarity: true,
        reason: 'Context-specified आङ् + दा combination'
      };
    }
  }

  // Analyze word structure for prefix + root combination
  const combinationAnalysis = analyzeWordForAangDa(word, patterns);
  
  if (combinationAnalysis.found) {
    return combinationAnalysis;
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No आङ् + दा combination detected'
  };
}

/**
 * Analyzes word structure for आङ् + दा combinations
 * 
 * @param {string} word - Word to analyze
 * @param {Object} patterns - Script-specific patterns
 * @returns {Object} Analysis result
 */
function analyzeWordForAangDa(word, patterns) {
  const lowerWord = word.toLowerCase();
  
  // Check आङ् prefix patterns
  for (const prefixForm of patterns.prefixes) {
    const prefixLower = prefixForm.toLowerCase();
    
    if (lowerWord.startsWith(prefixLower)) {
      const remainder = lowerWord.substring(prefixForm.length);
      
      // Check if remainder contains दा root patterns
      for (const daPattern of patterns.da) {
        const daLower = daPattern.toLowerCase();
        
        if (remainder.includes(daLower)) {
          // Calculate confidence based on position and clarity
          let confidence = 0.75;
          
          // Higher confidence if दा appears early in remainder
          const daPosition = remainder.indexOf(daLower);
          if (daPosition <= 1) {
            confidence += 0.1;
          }
          
          // Check for morphological clarity
          const morphologyClarity = checkDaMorphologicalClarity(remainder, daPattern);
          
          return {
            found: true,
            confidence: confidence,
            prefix: 'आङ्',
            details: `${prefixForm} + ${daPattern} detected`,
            morphologyClarity: morphologyClarity,
            reason: `आङ् + दा combination: ${prefixForm} + दा`
          };
        }
      }
    }
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No clear आङ् + दा structure found'
  };
}

/**
 * Checks if root matches दा patterns
 * 
 * @param {string} root - Root to check
 * @param {Array} daPatterns - दा patterns for script
 * @returns {boolean} Whether root matches
 */
function checkRootMatch(root, daPatterns) {
  const rootLower = root.toLowerCase();
  return daPatterns.some(pattern => 
    rootLower === pattern.toLowerCase() || 
    rootLower.startsWith(pattern.toLowerCase())
  );
}

/**
 * Checks if prefix matches आङ् patterns
 * 
 * @param {string} prefix - Prefix to check
 * @param {Array} aangPatterns - आङ् patterns for script
 * @returns {boolean} Match result
 */
function checkAangPrefixMatch(prefix, aangPatterns) {
  const prefixLower = prefix.toLowerCase();
  
  return aangPatterns.some(pattern => 
    prefixLower === pattern.toLowerCase() || 
    prefixLower.startsWith(pattern.toLowerCase())
  );
}

/**
 * Checks morphological clarity of दा root identification
 * 
 * @param {string} remainder - Remainder after prefix removal
 * @param {string} daPattern - Identified दा pattern
 * @returns {boolean} Whether morphology is clear
 */
function checkDaMorphologicalClarity(remainder, daPattern) {
  // Clear if दा appears at the beginning of remainder
  if (remainder.toLowerCase().startsWith(daPattern.toLowerCase())) {
    return true;
  }
  
  // Check for common verbal endings after दा
  const commonEndings = ['त्', 'न्त्', 'य', 'ष्य', 'तुम्', 'ते', 'न्ते'];
  const daPosition = remainder.toLowerCase().indexOf(daPattern.toLowerCase());
  const afterDa = remainder.substring(daPosition + daPattern.length);
  
  return commonEndings.some(ending => 
    afterDa.toLowerCase().startsWith(ending.toLowerCase())
  );
}

/**
 * Determines if the word has clear semantic context beyond mouth-opening
 * 
 * @param {string} word - Word to analyze
 * @returns {boolean} Whether semantic clarity exists
 */
function hasSemanticClarity(word) {
  const lowerWord = word.toLowerCase();
  
  // Common आ + दा semantic patterns (giving, receiving)
  const semanticIndicators = [
    'दत्त', 'datta', // given
    'दाता', 'dātā', // giver
    'आदान', 'ādāna', // taking
    'प्रदान', 'pradāna' // giving
  ];
  
  return semanticIndicators.some(indicator => 
    lowerWord.includes(indicator.toLowerCase())
  );
}

// Export default function as main entry point
export default determineAangDoAtmanepada;
