/**
 * Sutra 1.3.36: सम्माननोत्सञ्जनाचार्यकरणज्ञानभृतिविगणनव्ययेषु नियः
 * 
 * "After the verb नी 'to lead', when used in the sense of 'to guide so as to render 
 * the person guided worthy', 'to lift up', 'make one a spiritual guide', 'to determine 
 * the true sense', 'to employ on wages', 'to pay debt' and 'to give as in charity', 
 * even when the fruit of the action does not accrue to the agent, the आत्मनेपद is used."
 * 
 * This sutra specifies that the verbal root नी (nī) takes आत्मनेपद endings when used
 * in specific semantic contexts enumerated in the sutra, even when the action's
 * benefit doesn't directly accrue to the agent.
 * 
 * Type: आत्मनेपद designation rule (Classification)
 * Returns: Boolean indicating whether आत्मनेपद should be used
 * 
 * @fileoverview Implementation of Panini's Sutra 1.3.36
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if the verb नी should take आत्मनेपद in specific semantic contexts
 * 
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context object
 * @param {string} [context.meaning] - Specific meaning context
 * @param {string} [context.semanticField] - Semantic field (sammāna, utsañjana, etc.)
 * @param {boolean} [context.benefitsAgent] - Whether action benefits the agent
 * @param {string} [context.object] - Object of the action for context
 * @returns {Object} Analysis result
 */
export function sutra1336(word, context = {}) {
  // Validate input
  if (!word || typeof word !== 'string') {
    return {
      applies: false,
      reason: 'Invalid input: word must be a non-empty string',
      isAtmanepada: false,
      confidence: 0
    };
  }

  // Sanitize and validate Sanskrit word
  const cleanWord = word.trim();
  if (!validateSanskritWord(cleanWord)) {
    return {
      applies: false,
      reason: 'Invalid Sanskrit word format',
      isAtmanepada: false,
      confidence: 0
    };
  }

  // Detect script for appropriate processing
  const script = detectScript(cleanWord);
  if (script === 'Unknown') {
    return {
      applies: false,
      reason: 'Unable to detect script (IAST or Devanagari)',
      isAtmanepada: false,
      confidence: 0
    };
  }

  // Check for नी root
  const hasNiRoot = checkNiRoot(cleanWord, script);
  if (!hasNiRoot.found) {
    return {
      applies: false,
      reason: 'Word does not contain नी root',
      isAtmanepada: false,
      confidence: 0
    };
  }

  // Check for specific semantic contexts mentioned in the sutra
  const semanticAnalysis = analyzeSemanticContext(context);
  if (!semanticAnalysis.applies) {
    return {
      applies: false,
      reason: semanticAnalysis.reason,
      isAtmanepada: false,
      confidence: hasNiRoot.confidence * 0.2 // Low confidence for wrong context
    };
  }

  // Both conditions met - sutra applies
  return {
    applies: true,
    reason: `Sutra 1.3.36: नी in ${semanticAnalysis.context} requires आत्मनेपद`,
    isAtmanepada: true,
    confidence: Math.min(hasNiRoot.confidence, semanticAnalysis.confidence),
    analysis: {
      root: 'नी',
      semanticField: semanticAnalysis.context,
      script: script,
      benefitsAgent: context.benefitsAgent || false
    }
  };
}

/**
 * Checks if the word contains नी root
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {string} script - Detected script (IAST/Devanagari)
 * @returns {Object} Analysis result with confidence
 */
function checkNiRoot(word, script) {
  if (script === 'IAST') {
    return checkNiRootIAST(word);
  } else if (script === 'Devanagari') {
    return checkNiRootDevanagari(word);
  } else if (script === 'Mixed') {
    const iastResult = checkNiRootIAST(word);
    const devaResult = checkNiRootDevanagari(word);
    
    if (iastResult.found || devaResult.found) {
      return {
        found: true,
        confidence: Math.max(iastResult.confidence, devaResult.confidence) * 0.8
      };
    }
    return { found: false, confidence: 0 };
  }
  
  return { found: false, confidence: 0 };
}

/**
 * Checks for नी root in IAST script
 */
function checkNiRootIAST(word) {
  // Pattern variations for नी root in IAST
  const niPatterns = [
    /nī/i,              // Basic नी
    /nay/i,             // नय् (before vowels)
    /nayat/i,           // नयत् forms
    /nayan/i,           // नयन forms
    /nayati/i,          // नयति specific form
    /nayate/i,          // नयते specific form
    /ne/i,              // ने (गुण form)
    /nai/i,             // नै (वृद्धि form)
    /nīt/i,             // नीत (past participle)
    /nīy/i,             // नीय (passive forms)
    /nayan/i,           // नयन (causing to lead)
    /netr/i,            // नेतृ (leader)
    /nāy/i              // नाय (कर्तृ form)
  ];

  // Compound and prefixed patterns
  const prefixedPatterns = [
    /(ā|vi|ni|sam|upa|pra|anu).*nī/i,
    /(ā|vi|ni|sam|upa|pra|anu).*nay/i,
    /(ā|vi|ni|sam|upa|pra|anu).*net/i,
    /sammāna.*nay/i,    // sammāna + nay compounds
    /sam.*mān.*nay/i,   // sam + mān + nay compounds
    /.*nayate/i,        // nayate endings
    /.*nayati/i         // nayati endings
  ];

  let maxConfidence = 0;
  let foundPattern = false;

  // Check basic patterns
  for (const pattern of niPatterns) {
    if (pattern.test(word)) {
      foundPattern = true;
      maxConfidence = Math.max(maxConfidence, 0.85);
    }
  }

  // Check prefixed patterns (higher confidence)
  for (const pattern of prefixedPatterns) {
    if (pattern.test(word)) {
      foundPattern = true;
      maxConfidence = Math.max(maxConfidence, 0.95);
    }
  }

  return {
    found: foundPattern,
    confidence: maxConfidence
  };
}

/**
 * Checks for नी root in Devanagari script
 */
function checkNiRootDevanagari(word) {
  // Pattern variations for नी root in Devanagari
  const niPatterns = [
    /नी/,               // Basic नी
    /नय्/,              // नय् (before vowels)
    /नयत्/,             // नयत् forms
    /नयन्/,             // नयन् forms
    /नयति/,             // नयति specific form
    /नये/,              // नये forms
    /ने/,               // ने (गुण form)
    /नै/,               // नै (वृद्धि form)
    /नीत/,              // नीत (past participle)
    /नीय/,              // नीय (passive forms)
    /नयन/,              // नयन (causing to lead)
    /नेतृ/,              // नेतृ (leader)
    /नाय/               // नाय (कर्तृ form)
  ];

  // Compound and prefixed patterns
  const prefixedPatterns = [
    /(आ|वि|नि|सम्|उप|प्र|अनु).*नी/,
    /(आ|वि|नि|सम्|उप|प्र|अनु).*नय्/,
    /(आ|वि|नि|सम्|उप|प्र|अनु).*नयत्/,
    /(आ|वि|नि|सम्|उप|प्र|अनु).*नेत्/,
    /सम्मान.*नय/,      // सम्मान + नय compounds
    /.*नयते/,          // नयते endings
    /.*नयति/           // नयति endings
  ];

  let maxConfidence = 0;
  let foundPattern = false;

  // Check basic patterns
  for (const pattern of niPatterns) {
    if (pattern.test(word)) {
      foundPattern = true;
      maxConfidence = Math.max(maxConfidence, 0.85);
    }
  }

  // Check prefixed patterns (higher confidence)
  for (const pattern of prefixedPatterns) {
    if (pattern.test(word)) {
      foundPattern = true;
      maxConfidence = Math.max(maxConfidence, 0.95);
    }
  }

  return {
    found: foundPattern,
    confidence: maxConfidence
  };
}

/**
 * Analyzes semantic context for specific meanings enumerated in the sutra
 * 
 * @param {Object} context - Context object with semantic information
 * @returns {Object} Analysis result
 */
function analyzeSemanticContext(context) {
  // The sutra enumerates specific semantic contexts
  const sutraContexts = {
    sammāna: {
      keywords: ['guide', 'render worthy', 'make worthy', 'honor', 'respect', 'dignity', 'worthy'],
      confidence: 0.95
    },
    utsañjana: {
      keywords: ['lift up', 'elevate', 'raise up', 'uplift', 'exalt'],
      confidence: 0.95
    },
    ācārya: {
      keywords: ['spiritual guide', 'teacher', 'make teacher', 'guru', 'instructor', 'make one a spiritual guide'],
      confidence: 0.95
    },
    karaṇa: {
      keywords: ['determine', 'ascertain', 'establish', 'decide', 'resolve'],
      confidence: 0.9
    },
    jñāna: {
      keywords: ['true sense', 'knowledge', 'understanding', 'wisdom', 'realization'],
      confidence: 0.9
    },
    bhṛti: {
      keywords: ['employ', 'wages', 'salary', 'hire', 'employment'],
      confidence: 0.95
    },
    vigaṇana: {
      keywords: ['pay debt', 'discharge debt', 'settle debt', 'repay', 'payment', 'discharge', 'obligation'],
      confidence: 0.95
    },
    vyaya: {
      keywords: ['charity', 'give', 'donation', 'expenditure', 'spend'],
      confidence: 0.9
    }
  };

  // Check explicit semantic field
  if (context.semanticField) {
    const field = context.semanticField.toLowerCase();
    if (sutraContexts[field]) {
      return {
        applies: true,
        confidence: sutraContexts[field].confidence,
        context: field,
        reason: `Explicitly specified semantic field: ${field}`
      };
    }
  }

  // Check meaning for semantic keywords - check in order of specificity
  if (context.meaning) {
    const meaningLower = context.meaning.toLowerCase();
    
    // Sort contexts by specificity of their keywords (longest first)
    const sortedContexts = Object.entries(sutraContexts).sort((a, b) => {
      const maxLenA = Math.max(...a[1].keywords.map(k => k.length));
      const maxLenB = Math.max(...b[1].keywords.map(k => k.length));
      return maxLenB - maxLenA;
    });
    
    for (const [contextName, contextData] of sortedContexts) {
      // Sort keywords by length (longest first) to match most specific terms
      const sortedKeywords = contextData.keywords.sort((a, b) => b.length - a.length);
      
      for (const keyword of sortedKeywords) {
        if (meaningLower.includes(keyword)) {
          return {
            applies: true,
            confidence: contextData.confidence,
            context: contextName,
            reason: `Semantic meaning matches ${contextName}: ${keyword}`
          };
        }
      }
    }
  }

  // Check object for context clues
  if (context.object) {
    const objectLower = context.object.toLowerCase();
    
    // Objects that suggest specific contexts
    const objectContexts = {
      'wages': 'bhṛti',
      'salary': 'bhṛti', 
      'payment': 'bhṛti',
      'debt': 'vigaṇana',
      'loan': 'vigaṇana',
      'obligation': 'vigaṇana',
      'knowledge': 'jñāna',
      'wisdom': 'jñāna',
      'truth': 'jñāna',
      'teacher': 'ācārya',
      'guru': 'ācārya',
      'master': 'ācārya',
      'charity': 'vyaya',
      'donation': 'vyaya',
      'gift': 'vyaya'
    };

    for (const [objectWord, contextName] of Object.entries(objectContexts)) {
      if (objectLower.includes(objectWord)) {
        return {
          applies: true,
          confidence: 0.8,
          context: contextName,
          reason: `Object suggests ${contextName} context: ${objectWord}`
        };
      }
    }
  }

  // General नी meanings that don't trigger this sutra
  return {
    applies: false,
    confidence: 0,
    context: 'general',
    reason: 'नी not used in specific contexts enumerated in sutra 1.3.36'
  };
}

// Default export
export default sutra1336;
