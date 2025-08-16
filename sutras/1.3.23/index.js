/**
 * Sutra 1.3.23: प्रकाशनस्थेयाख्ययोश्च (prakāśanastheyākhyayośca)
 * "After the verb स्था 'when meaning to indicate one's intentions to another', 
 * or 'to make an award as an arbitrator', the आत्मनेपद affix is employed."
 * 
 * This sutra prescribes ātmanepada endings for the root स्था (to stand) in specific 
 * semantic contexts: प्रकाशन (indicating intentions) and स्थेयाख्याय (arbitration/award).
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.23
 */

import { detectScript, validateSanskritWord, tokenizePhonemes } from '../sanskrit-utils/index.js';

/**
 * Determines if ātmanepada endings should be used for स्था in specific semantic contexts
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Grammatical context
 * @param {string} context.root - The verbal root (default: auto-detect)
 * @param {string} context.meaning - Semantic context indicating intention/arbitration
 * @param {boolean} context.intentionIndication - Whether indicating intentions
 * @param {boolean} context.arbitration - Whether in arbitration context
 * @returns {Object} Analysis result with ātmanepada determination
 */
export function determineSthaSemanticsAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string') {
    return {
      isSthaSemanticsAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.23'
    };
  }

  const trimmedWord = word.trim();
  if (!trimmedWord) {
    return {
      isSthaSemanticsAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.23'
    };
  }

  // Script detection and validation
  const script = detectScript(trimmedWord);
  
  // Skip strict validation for valid Sanskrit patterns - focus on morphological analysis
  const isValidInput = trimmedWord.length > 0 && (script === 'Devanagari' || script === 'IAST');
  if (!isValidInput) {
    return {
      isSthaSemanticsAtmanepada: false,
      confidence: 0.1,
      analysis: 'Invalid Sanskrit word',
      sutraApplied: '1.3.23'
    };
  }

  // Check for स्था root presence
  const hasStha = checkSthaRootPresence(trimmedWord, context, script);
  
  if (!hasStha.found) {
    return {
      isSthaSemanticsAtmanepada: false,
      confidence: hasStha.confidence,
      analysis: hasStha.reason,
      sutraApplied: '1.3.23'
    };
  }

  // Check for specific semantic contexts (प्रकाशन or स्थेयाख्याय)
  const semanticAnalysis = analyzeSemanticContext(trimmedWord, context);
  
  if (!semanticAnalysis.hasValidSemantics) {
    return {
      isSthaSemanticsAtmanepada: false,
      confidence: semanticAnalysis.confidence,
      analysis: semanticAnalysis.reason,
      sutraApplied: '1.3.23'
    };
  }

  // Determine confidence based on semantic clarity and स्था presence
  let confidence = Math.min(hasStha.confidence + semanticAnalysis.confidence - 0.1, 0.98);
  
  // Higher confidence for explicit semantic indicators
  if (semanticAnalysis.explicitSemantics) {
    confidence = Math.min(confidence + 0.02, 1.0); // Explicit context gets higher max confidence
  }

  return {
    isSthaSemanticsAtmanepada: true,
    confidence: confidence,
    analysis: `स्था with valid semantics: ${semanticAnalysis.details}`,
    root: 'स्था',
    semanticContext: semanticAnalysis.contextType,
    sutraApplied: '1.3.23'
  };
}

/**
 * Checks if the word contains स्था root
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Additional context
 * @param {string} script - Detected script
 * @returns {Object} Analysis of स्था presence
 */
function checkSthaRootPresence(word, context, script) {
  // Define स्था root patterns in different scripts
  const sthaPatterns = {
    devanagari: ['स्था', 'स्थ', 'तिष्ठ', 'स्थित', 'स्थान', 'स्थास्य'],
    iast: ['sthā', 'stha', 'tiṣṭha', 'sthita', 'sthāna', 'sthāsya']
  };

  const patterns = script === 'Devanagari' ? sthaPatterns.devanagari : sthaPatterns.iast;

  // Check for explicit root context
  if (context.root) {
    const rootLower = context.root.toLowerCase();
    
    // Check against both script patterns for cross-script compatibility
    const allPatterns = [...sthaPatterns.devanagari, ...sthaPatterns.iast];
    const rootMatches = allPatterns.some(pattern => 
      rootLower === pattern.toLowerCase() || 
      rootLower.startsWith(pattern.toLowerCase())
    );
    
    if (rootMatches) {
      return {
        found: true,
        confidence: 0.9,
        reason: 'Context-specified स्था root'
      };
    }
  }

  // Analyze word for स्था patterns
  const lowerWord = word.toLowerCase();
  
  for (const pattern of patterns) {
    const patternLower = pattern.toLowerCase();
    
    if (lowerWord.includes(patternLower)) {
      // Calculate confidence based on position and clarity
      let confidence = 0.7;
      
      // Higher confidence if स्था appears prominently
      const position = lowerWord.indexOf(patternLower);
      if (position <= 2) {
        confidence += 0.1;
      }
      
      return {
        found: true,
        confidence: confidence,
        reason: `स्था pattern detected: ${pattern}`
      };
    }
  }

  return {
    found: false,
    confidence: 0.1,
    reason: 'No स्था root pattern detected'
  };
}

/**
 * Analyzes semantic context for प्रकाशन or स्थेयाख्याय meanings
 * 
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Semantic analysis result
 */
function analyzeSemanticContext(word, context) {
  // Check explicit semantic flags
  if (context.intentionIndication === true || context.arbitration === true) {
    const contextType = context.intentionIndication ? 'प्रकाशन' : 'स्थेयाख्याय';
    return {
      hasValidSemantics: true,
      confidence: 0.9,
      details: `Explicit ${contextType} context`,
      contextType: contextType,
      explicitSemantics: true,
      reason: 'Context-specified semantic meaning'
    };
  }

  // Check meaning field for semantic indicators
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    
    // प्रकाशन (intention indication) terms
    const intentionTerms = [
      'intention', 'indicate', 'reveal', 'announce', 'declare', 'manifest',
      'प्रकाशन', 'prakāśana', 'प्रकाश', 'prakāśa', 'आख्या', 'ākhyā'
    ];
    
    // स्थेयाख्याय (arbitration) terms
    const arbitrationTerms = [
      'arbitrate', 'award', 'judge', 'decide', 'settle', 'mediate',
      'स्थेय', 'stheya', 'न्याय', 'nyāya', 'निर्णय', 'nirṇaya'
    ];
    
    const hasIntentionMeaning = intentionTerms.some(term => meaning.includes(term));
    const hasArbitrationMeaning = arbitrationTerms.some(term => meaning.includes(term));
    
    if (hasIntentionMeaning || hasArbitrationMeaning) {
      const contextType = hasIntentionMeaning ? 'प्रकाशन' : 'स्थेयाख्याय';
      return {
        hasValidSemantics: true,
        confidence: 0.8,
        details: `${contextType} meaning detected in context`,
        contextType: contextType,
        explicitSemantics: true,
        reason: 'Semantic meaning found in context'
      };
    }
  }

  // Analyze word for semantic indicators
  const semanticAnalysis = analyzeWordSemanticIndicators(word);
  
  if (semanticAnalysis.hasValidSemantics) {
    return semanticAnalysis;
  }

  return {
    hasValidSemantics: false,
    confidence: 0.2,
    reason: 'No प्रकाशन or स्थेयाख्याय semantic context detected'
  };
}

/**
 * Analyzes word for semantic indicators
 * 
 * @param {string} word - Word to analyze
 * @returns {Object} Semantic analysis result
 */
function analyzeWordSemanticIndicators(word) {
  const lowerWord = word.toLowerCase();
  
  // प्रकाशन (intention/indication) semantic patterns
  const intentionPatterns = [
    'प्रकाश', 'prakāśa', 'प्रकाशन', 'prakāśana',
    'आख्या', 'ākhyā', 'उक्त', 'ukta', 'कथन', 'kathana'
  ];
  
  // स्थेयाख्याय (arbitration/award) semantic patterns  
  const arbitrationPatterns = [
    'स्थेय', 'stheya', 'न्याय', 'nyāya', 'निर्णय', 'nirṇaya',
    'फल', 'phala', 'दान', 'dāna', 'पुरस्कार', 'puraskāra'
  ];
  
  // Check for intention patterns
  for (const pattern of intentionPatterns) {
    if (lowerWord.includes(pattern.toLowerCase())) {
      return {
        hasValidSemantics: true,
        confidence: 0.7,
        details: `प्रकाशन pattern detected: ${pattern}`,
        contextType: 'प्रकाशन',
        explicitSemantics: false,
        reason: 'Intention-related semantic pattern found'
      };
    }
  }
  
  // Check for arbitration patterns
  for (const pattern of arbitrationPatterns) {
    if (lowerWord.includes(pattern.toLowerCase())) {
      return {
        hasValidSemantics: true,
        confidence: 0.7,
        details: `स्थेयाख्याय pattern detected: ${pattern}`,
        contextType: 'स्थेयाख्याय',
        explicitSemantics: false,
        reason: 'Arbitration-related semantic pattern found'
      };
    }
  }

  // Check for compound semantic indicators
  const compoundAnalysis = analyzeCompoundSemantics(lowerWord);
  if (compoundAnalysis.hasValidSemantics) {
    return compoundAnalysis;
  }

  return {
    hasValidSemantics: false,
    confidence: 0.1,
    reason: 'No valid semantic patterns detected'
  };
}

/**
 * Analyzes compound words for semantic context
 * 
 * @param {string} lowerWord - Lowercase word to analyze
 * @returns {Object} Compound semantic analysis
 */
function analyzeCompoundSemantics(lowerWord) {
  // Look for compound patterns that suggest intention or arbitration
  const intentionCompounds = [
    'मनःस्था', 'manaḥsthā', // intention standing
    'बुद्धिस्था', 'buddhisthā', // wisdom standing
    'विचारस्था', 'vicārasthā' // thought standing
  ];
  
  const arbitrationCompounds = [
    'न्यायस्था', 'nyāyasthā', // justice standing
    'धर्मस्था', 'dharmasthā', // dharma standing
    'फलस्था', 'phalasthā' // award standing
  ];
  
  for (const compound of intentionCompounds) {
    if (lowerWord.includes(compound.toLowerCase())) {
      return {
        hasValidSemantics: true,
        confidence: 0.6,
        details: `Intention compound detected: ${compound}`,
        contextType: 'प्रकाशन',
        explicitSemantics: false,
        reason: 'Compound word indicates intention context'
      };
    }
  }
  
  for (const compound of arbitrationCompounds) {
    if (lowerWord.includes(compound.toLowerCase())) {
      return {
        hasValidSemantics: true,
        confidence: 0.6,
        details: `Arbitration compound detected: ${compound}`,
        contextType: 'स्थेयाख्याय',
        explicitSemantics: false,
        reason: 'Compound word indicates arbitration context'
      };
    }
  }

  return {
    hasValidSemantics: false,
    confidence: 0.1,
    reason: 'No valid compound semantic patterns'
  };
}

// Export default function as main entry point
export default determineSthaSemanticsAtmanepada;
