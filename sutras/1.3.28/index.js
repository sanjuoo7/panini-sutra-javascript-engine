/**
 * Sutra 1.3.28: आङो यमहनः (āṅo yamahanaḥ)
 * 
 * Sanskrit Text: आङो यमहनः
 * Transliteration: āṅo yamahanaḥ  
 * Translation: From आङ् (prefix), for यम् and हन् (roots)
 * 
 * Description: This sutra prescribes ātmanepada for यम् (yam - 'to restrain/stop') 
 * and हन् (han - 'to strike/injure') roots when preceded by आङ् prefix and used intransitively.
 * The आङ् prefix appears as आ in practice.
 * 
 * Examples:
 * - आयच्छते (āyacchate) - restrains oneself, stops oneself
 * - आहन्यते (āhanyate) - strikes/injures oneself 
 * - आयम्यते (āyamyate) - restrains/controls oneself
 * 
 * Technical Analysis:
 * - Applies to roots: यम् (yam), हन् (han)
 * - Required prefix: आङ् (āṅ, realized as आ)
 * - Condition: intransitive usage (अकर्मक)
 * - Result: ātmanepada endings
 * - Voice: कर्तरि (active voice)
 */

import { 
  detectScript,
  validateSanskritWord,
  tokenizePhonemes
} from '../sanskrit-utils/index.js';

/**
 * Determines if a word follows sutra 1.3.28 for आङ् + यम्/हन् with ātmanepada
 * 
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context information
 * @param {string} context.root - The root if known ('यम्', 'हन्', 'yam', 'han')
 * @param {string} context.prefix - The prefix if known ('आ', 'ā', 'āṅ')
 * @param {string} context.transitivity - Transitivity ('transitive', 'intransitive')
 * @param {boolean} context.isIntransitive - Whether usage is intransitive
 * @param {string} context.meaning - Semantic meaning context
 * @returns {Object} Analysis result with ātmanepada determination
 */
export function determineAangYamHanAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string' || !word.trim()) {
    return {
      isAangYamHanAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.28'
    };
  }

  const trimmedWord = word.trim();
  
  // Validate Sanskrit word
  if (!validateSanskritWord(trimmedWord)) {
    return {
      isAangYamHanAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid Sanskrit word',
      sutraApplied: '1.3.28'
    };
  }

  try {
    const script = detectScript(trimmedWord);
    const analysis = analyzeWordForAangYamHan(trimmedWord, script, context);
    
    return {
      isAangYamHanAtmanepada: analysis.isValid,
      confidence: analysis.confidence,
      analysis: analysis.details,
      prefix: analysis.prefix,
      root: analysis.root,
      transitivity: analysis.transitivity,
      requiresIntransitive: analysis.requiresIntransitive,
      sutraApplied: '1.3.28',
      script: script
    };
    
  } catch (error) {
    return {
      isAangYamHanAtmanepada: false,
      confidence: 0,
      analysis: `Analysis error: ${error.message}`,
      sutraApplied: '1.3.28'
    };
  }
}

/**
 * Analyzes a word for आङ् + यम्/हन् patterns and intransitive usage
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {string} script - Detected script (Devanagari/IAST)
 * @param {Object} context - Analysis context
 * @returns {Object} Detailed analysis
 */
function analyzeWordForAangYamHan(word, script, context) {
  const phonemes = tokenizePhonemes(word);
  let confidence = 0;
  let details = '';
  let prefix = '';
  let root = '';
  let transitivity = '';
  let requiresIntransitive = false;

  // Check explicit context first
  if (context.root && context.prefix) {
    const rootMatch = isYamHanRoot(context.root);
    const prefixMatch = isAangPrefix(context.prefix);
    
    if (rootMatch && prefixMatch) {
      const intransitiveCheck = analyzeIntransitiveUsage(word, context);
      if (intransitiveCheck.isIntransitive) {
        return {
          isValid: true,
          confidence: 0.95,
          details: 'Explicit context: आङ् + यम्/हन् (intransitive)',
          prefix: normalizePrefix(context.prefix, script),
          root: normalizeRoot(context.root, script),
          transitivity: 'intransitive',
          requiresIntransitive: true
        };
      } else {
        return {
          isValid: false,
          confidence: 0.2,
          details: 'आङ् + यम्/हन् requires intransitive usage',
          prefix: normalizePrefix(context.prefix, script),
          root: normalizeRoot(context.root, script),
          transitivity: intransitiveCheck.transitivity || 'unspecified',
          requiresIntransitive: true
        };
      }
    }
  }

  // Pattern recognition for आ + यम्/हन् combinations
  const patterns = script === 'Devanagari' ? 
    getDevanagariAangYamHanPatterns() : 
    getIASTAangYamHanPatterns();

  for (const pattern of patterns) {
    const match = pattern.regex.test(word);
    if (match) {
      confidence += pattern.confidence;
      prefix = pattern.prefix;
      root = pattern.root;
      details += pattern.description + '; ';
      
      // Check for intransitive usage
      const intransitiveCheck = analyzeIntransitiveUsage(word, context);
      if (intransitiveCheck.isIntransitive) {
        confidence += 0.3;
        transitivity = 'intransitive';
        details += 'intransitive usage detected; ';
        
        return {
          isValid: true,
          confidence: Math.min(confidence, 1.0),
          details: details.trim(),
          prefix: prefix,
          root: root,
          transitivity: transitivity,
          requiresIntransitive: true
        };
      } else {
        requiresIntransitive = true;
        transitivity = intransitiveCheck.transitivity || 'unspecified';
        details += 'requires intransitive usage; ';
        
        return {
          isValid: false,
          confidence: Math.min(confidence * 0.3, 0.5),
          details: details.trim(),
          prefix: prefix,
          root: root,
          transitivity: transitivity,
          requiresIntransitive: true
        };
      }
    }
  }

  return {
    isValid: false,
    confidence: 0,
    details: 'No आङ् + यम्/हन् pattern found',
    prefix: '',
    root: '',
    transitivity: '',
    requiresIntransitive: false
  };
}

/**
 * Checks if a root is यम् or हन्
 */
function isYamHanRoot(root) {
  if (!root) return false;
  const normalizedRoot = root.toLowerCase().trim();
  
  // Devanagari patterns
  if (['यम्', 'हन्'].includes(normalizedRoot)) return true;
  
  // IAST patterns
  if (['yam', 'han'].includes(normalizedRoot)) return true;
  
  return false;
}

/**
 * Checks if a prefix is आङ्/आ
 */
function isAangPrefix(prefix) {
  if (!prefix) return false;
  const normalizedPrefix = prefix.toLowerCase().trim();
  
  // Devanagari patterns
  if (['आ', 'आङ्'].includes(normalizedPrefix)) return true;
  
  // IAST patterns  
  if (['ā', 'āṅ', 'a'].includes(normalizedPrefix)) return true;
  
  return false;
}

/**
 * Gets Devanagari patterns for आ + यम्/हन् combinations
 */
function getDevanagariAangYamHanPatterns() {
  return [
    {
      regex: /आयच्छ/,
      confidence: 0.8,
      prefix: 'आ',
      root: 'यम्',
      description: 'आयच्छ- form (आ + यम्)'
    },
    {
      regex: /आयम्य/,
      confidence: 0.8,
      prefix: 'आ',
      root: 'यम्',
      description: 'आयम्य- form (आ + यम्)'
    },
    {
      regex: /आयत/,
      confidence: 0.7,
      prefix: 'आ',
      root: 'यम्',
      description: 'आयत- form (आ + यम्)'
    },
    {
      regex: /आहत/,
      confidence: 0.8,
      prefix: 'आ',
      root: 'हन्',
      description: 'आहत- form (आ + हन्)'
    },
    {
      regex: /आहन्य/,
      confidence: 0.8,
      prefix: 'आ',
      root: 'हन्',
      description: 'आहन्य- form (आ + हन्)'
    },
    {
      regex: /आघात/,
      confidence: 0.7,
      prefix: 'आ',
      root: 'हन्',
      description: 'आघात- form (आ + हन्)'
    }
  ];
}

/**
 * Gets IAST patterns for ā + yam/han combinations
 */
function getIASTAangYamHanPatterns() {
  return [
    {
      regex: /āyacch/i,
      confidence: 0.8,
      prefix: 'ā',
      root: 'yam',
      description: 'āyacch- form (ā + yam)'
    },
    {
      regex: /āyamy/i,
      confidence: 0.8,
      prefix: 'ā',
      root: 'yam',
      description: 'āyamy- form (ā + yam)'
    },
    {
      regex: /āyat/i,
      confidence: 0.7,
      prefix: 'ā',
      root: 'yam',
      description: 'āyat- form (ā + yam)'
    },
    {
      regex: /āhat/i,
      confidence: 0.8,
      prefix: 'ā',
      root: 'han',
      description: 'āhat- form (ā + han)'
    },
    {
      regex: /āhany/i,
      confidence: 0.8,
      prefix: 'ā',
      root: 'han',
      description: 'āhany- form (ā + han)'
    },
    {
      regex: /āghāt/i,
      confidence: 0.7,
      prefix: 'ā',
      root: 'han',
      description: 'āghāt- form (ā + han)'
    }
  ];
}

/**
 * Analyzes for intransitive usage indicators
 */
function analyzeIntransitiveUsage(word, context) {
  // Check explicit context flags
  if (context.isIntransitive === true) {
    return { isIntransitive: true, transitivity: 'intransitive' };
  }
  
  if (context.transitivity === 'intransitive') {
    return { isIntransitive: true, transitivity: 'intransitive' };
  }
  
  if (context.transitivity === 'transitive') {
    return { isIntransitive: false, transitivity: 'transitive' };
  }

  // Check meaning context for intransitive indicators
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    
    // Self-directed actions (intransitive)
    if (meaning.includes('oneself') || 
        meaning.includes('restrains self') ||
        meaning.includes('controls self') ||
        meaning.includes('strikes self') ||
        meaning.includes('injures self')) {
      return { isIntransitive: true, transitivity: 'intransitive' };
    }
    
    // Intransitive meanings for यम्
    if (meaning.includes('to be restrained') ||
        meaning.includes('to stop') ||
        meaning.includes('becomes controlled')) {
      return { isIntransitive: true, transitivity: 'intransitive' };
    }
    
    // Intransitive meanings for हन्
    if (meaning.includes('to be struck') ||
        meaning.includes('gets injured') ||
        meaning.includes('receives blow')) {
      return { isIntransitive: true, transitivity: 'intransitive' };
    }
  }

  // Check ātmanepada endings (suggest intransitive)
  const atmanepedaPatterns = [
    /[तं]े$/, /न्ते$/, /से$/, /[तं]्$/, /[तं]े$/, /स्व$/,  // Devanagari
    /[ta]e$/i, /nte$/i, /se$/i, /[ta]$/i, /sva$/i  // IAST
  ];
  
  for (const pattern of atmanepedaPatterns) {
    if (pattern.test(word)) {
      return { isIntransitive: true, transitivity: 'intransitive' };
    }
  }

  // Default: cannot determine
  return { isIntransitive: false, transitivity: 'unspecified' };
}

/**
 * Normalizes prefix for consistent output
 */
function normalizePrefix(prefix, script) {
  if (!prefix) return '';
  
  // Return the prefix as provided in context
  return prefix;
}

/**
 * Normalizes root for consistent output
 */
function normalizeRoot(root, script) {
  if (!root) return '';
  
  // Return the root as provided in context
  return root;
}

/**
 * Quick check for आङ् + यम्/हन् combination
 * 
 * @param {string} word - Word to check
 * @returns {boolean} True if contains आङ् + यम्/हन् pattern
 */
export function checkAangYamHanCombination(word) {
  if (!word || typeof word !== 'string') return false;
  
  const devanagariPatterns = [
    /आयच्छ/, /आयम्य/, /आयत/,  // आ + यम्
    /आहत/, /आहन्य/, /आघात/    // आ + हन्
  ];
  
  const iastPatterns = [
    /āyacch/i, /āyamy/i, /āyat/i,  // ā + yam
    /āhat/i, /āhany/i, /āghāt/i    // ā + han
  ];
  
  return [...devanagariPatterns, ...iastPatterns].some(pattern => pattern.test(word));
}

export default determineAangYamHanAtmanepada;
