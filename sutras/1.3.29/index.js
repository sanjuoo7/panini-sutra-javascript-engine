/**
 * Sutra 1.3.29: समो गम्यृच्छिप्रच्छिस्वरत्यर्तिश्रुविदिभ्यः 
 * (samo gamayṛcachiparacachisavaratayaratiśaruvidibhayaḥ)
 * 
 * Sanskrit Text: समो गम्यृच्छिप्रच्छिस्वरत्यर्तिश्रुविदिभ्यः
 * Transliteration: samo gamayṛcachiparacachisavaratayaratiśaruvidibhayaḥ
 * Translation: From सम् (prefix), for गम्, ऋच्छ्, प्रच्छ्, स्वर्, ऋ, श्रु, विद् (roots)
 * 
 * Description: This sutra prescribes ātmanepada for specific roots when preceded by सम् prefix
 * and used intransitively:
 * - गम् (gam) - to go
 * - ऋच्छ् (ṛcch) - to become hard  
 * - प्रच्छ् (pracch) - to ask
 * - स्वर् (svar) - to find fault
 * - ऋ (ṛ) - to go
 * - श्रु (śru) - to hear
 * - विद् (vid) - to know
 * 
 * Examples:
 * - संगच्छते (saṃgacchate) - comes together, meets
 * - संपृच्छते (saṃpṛcchate) - asks together, inquires
 * - संशृणोते (saṃśṛṇoti) - hears together
 * - संवेत्ति (saṃvetti) - knows together, understands
 * 
 * Technical Analysis:
 * - Applies to specific roots: गम्, ऋच्छ्, प्रच्छ्, स्वर्, ऋ, श्रु, विद्
 * - Required prefix: सम् (sam)
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
 * Determines if a word follows sutra 1.3.29 for सम् + specified roots with ātmanepada
 * 
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Optional context information
 * @param {string} context.root - The root if known (गम्, ऋच्छ्, प्रच्छ्, etc.)
 * @param {string} context.prefix - The prefix if known (सम्, sam)
 * @param {string} context.transitivity - Transitivity ('transitive', 'intransitive')
 * @param {boolean} context.isIntransitive - Whether usage is intransitive
 * @param {string} context.meaning - Semantic meaning context
 * @returns {Object} Analysis result with ātmanepada determination
 */
export function determineSamSpecificRootsAtmanepada(word, context = {}) {
  // Input validation
  if (!word || typeof word !== 'string' || !word.trim()) {
    return {
      isSamSpecificRootsAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid input',
      sutraApplied: '1.3.29'
    };
  }

  const trimmedWord = word.trim();
  
  // Validate Sanskrit word
  if (!validateSanskritWord(trimmedWord)) {
    return {
      isSamSpecificRootsAtmanepada: false,
      confidence: 0,
      analysis: 'Invalid Sanskrit word',
      sutraApplied: '1.3.29'
    };
  }

  try {
    const script = detectScript(trimmedWord);
    const analysis = analyzeWordForSamSpecificRoots(trimmedWord, script, context);
    
    return {
      isSamSpecificRootsAtmanepada: analysis.isValid,
      confidence: analysis.confidence,
      analysis: analysis.details,
      prefix: analysis.prefix,
      root: analysis.root,
      transitivity: analysis.transitivity,
      requiresIntransitive: analysis.requiresIntransitive,
      sutraApplied: '1.3.29',
      script: script
    };
    
  } catch (error) {
    return {
      isSamSpecificRootsAtmanepada: false,
      confidence: 0,
      analysis: `Analysis error: ${error.message}`,
      sutraApplied: '1.3.29'
    };
  }
}

/**
 * Analyzes a word for सम् + specific roots patterns and intransitive usage
 * 
 * @param {string} word - Sanskrit word to analyze
 * @param {string} script - Detected script (Devanagari/IAST)
 * @param {Object} context - Analysis context
 * @returns {Object} Detailed analysis
 */
function analyzeWordForSamSpecificRoots(word, script, context) {
  const phonemes = tokenizePhonemes(word);
  let confidence = 0;
  let details = '';
  let prefix = '';
  let root = '';
  let transitivity = '';
  let requiresIntransitive = false;

  // Check explicit context first
  if (context.root && context.prefix) {
    const rootMatch = isSpecifiedRoot(context.root);
    const prefixMatch = isSamPrefix(context.prefix);
    
    if (rootMatch && prefixMatch) {
      const intransitiveCheck = analyzeIntransitiveUsage(word, context);
      if (intransitiveCheck.isIntransitive) {
        return {
          isValid: true,
          confidence: 0.95,
          details: 'Explicit context: सम् + specified root (intransitive)',
          prefix: normalizePrefix(context.prefix, script),
          root: normalizeRoot(context.root, script),
          transitivity: 'intransitive',
          requiresIntransitive: true
        };
      } else {
        return {
          isValid: false,
          confidence: 0.2,
          details: 'सम् + specified root requires intransitive usage',
          prefix: normalizePrefix(context.prefix, script),
          root: normalizeRoot(context.root, script),
          transitivity: intransitiveCheck.transitivity || 'unspecified',
          requiresIntransitive: true
        };
      }
    }
  }

  // Pattern recognition for सम् + specified root combinations
  const patterns = script === 'Devanagari' ? 
    getDevanagariSamRootPatterns() : 
    getIASTSamRootPatterns();

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
    details: 'No सम् + specified root pattern found',
    prefix: '',
    root: '',
    transitivity: '',
    requiresIntransitive: false
  };
}

/**
 * Checks if a root is one of the specified roots for this sutra
 */
function isSpecifiedRoot(root) {
  if (!root) return false;
  const normalizedRoot = root.toLowerCase().trim();
  
  // Devanagari patterns
  const devanagariRoots = ['गम्', 'ऋच्छ्', 'प्रच्छ्', 'स्वर्', 'ऋ', 'श्रु', 'विद्'];
  if (devanagariRoots.includes(normalizedRoot)) return true;
  
  // IAST patterns
  const iastRoots = ['gam', 'ṛcch', 'pracch', 'svar', 'ṛ', 'śru', 'vid'];
  if (iastRoots.includes(normalizedRoot)) return true;
  
  return false;
}

/**
 * Checks if a prefix is सम्
 */
function isSamPrefix(prefix) {
  if (!prefix) return false;
  const normalizedPrefix = prefix.toLowerCase().trim();
  
  // Devanagari patterns
  if (['सम्', 'सं'].includes(normalizedPrefix)) return true;
  
  // IAST patterns  
  if (['sam', 'saṃ'].includes(normalizedPrefix)) return true;
  
  return false;
}

/**
 * Gets Devanagari patterns for सम् + specified root combinations
 */
function getDevanagariSamRootPatterns() {
  return [
    // सम् + गम् combinations
    {
      regex: /संगच्छ/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'गम्',
      description: 'संगच्छ- form (सम् + गम्)'
    },
    {
      regex: /संगत/,
      confidence: 0.7,
      prefix: 'सम्',
      root: 'गम्',
      description: 'संगत- form (सम् + गम्)'
    },
    
    // सम् + ऋच्छ् combinations
    {
      regex: /संऋच्छ/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'ऋच्छ्',
      description: 'संऋच्छ- form (सम् + ऋच्छ्)'
    },
    
    // सम् + प्रच्छ् combinations
    {
      regex: /संप्रच्छ/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'प्रच्छ्',
      description: 'संप्रच्छ- form (सम् + प्रच्छ्)'
    },
    {
      regex: /संपृच्छ/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'प्रच्छ्',
      description: 'संपृच्छ- form (सम् + प्रच्छ्)'
    },
    
    // सम् + स्वर् combinations
    {
      regex: /संस्वर/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'स्वर्',
      description: 'संस्वर- form (सम् + स्वर्)'
    },
    
    // सम् + ऋ combinations
    {
      regex: /संऋ/,
      confidence: 0.7,
      prefix: 'सम्',
      root: 'ऋ',
      description: 'संऋ- form (सम् + ऋ)'
    },
    
    // सम् + श्रु combinations
    {
      regex: /संश्रु/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'श्रु',
      description: 'संश्रु- form (सम् + श्रु)'
    },
    {
      regex: /संशृण/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'श्रु',
      description: 'संशृण- form (सम् + श्रु)'
    },
    
    // सम् + विद् combinations
    {
      regex: /संविद्/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'विद्',
      description: 'संविद्- form (सम् + विद्)'
    },
    {
      regex: /संवेत्/,
      confidence: 0.8,
      prefix: 'सम्',
      root: 'विद्',
      description: 'संवेत्- form (सम् + विद्)'
    }
  ];
}

/**
 * Gets IAST patterns for sam + specified root combinations
 */
function getIASTSamRootPatterns() {
  return [
    // sam + gam combinations
    {
      regex: /saṃgacch/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'gam',
      description: 'saṃgacch- form (sam + gam)'
    },
    {
      regex: /saṃgat/i,
      confidence: 0.7,
      prefix: 'sam',
      root: 'gam',
      description: 'saṃgat- form (sam + gam)'
    },
    
    // sam + ṛcch combinations
    {
      regex: /saṃṛcch/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'ṛcch',
      description: 'saṃṛcch- form (sam + ṛcch)'
    },
    
    // sam + pracch combinations
    {
      regex: /saṃpracch/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'pracch',
      description: 'saṃpracch- form (sam + pracch)'
    },
    {
      regex: /saṃpṛcch/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'pracch',
      description: 'saṃpṛcch- form (sam + pracch)'
    },
    
    // sam + svar combinations
    {
      regex: /saṃsvar/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'svar',
      description: 'saṃsvar- form (sam + svar)'
    },
    
    // sam + ṛ combinations
    {
      regex: /saṃṛ/i,
      confidence: 0.7,
      prefix: 'sam',
      root: 'ṛ',
      description: 'saṃṛ- form (sam + ṛ)'
    },
    
    // sam + śru combinations
    {
      regex: /saṃśru/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'śru',
      description: 'saṃśru- form (sam + śru)'
    },
    {
      regex: /saṃśṛṇ/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'śru',
      description: 'saṃśṛṇ- form (sam + śru)'
    },
    
    // sam + vid combinations
    {
      regex: /saṃvid/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'vid',
      description: 'saṃvid- form (sam + vid)'
    },
    {
      regex: /saṃvet/i,
      confidence: 0.8,
      prefix: 'sam',
      root: 'vid',
      description: 'saṃvet- form (sam + vid)'
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
    
    // Collective/together actions (often intransitive)
    if (meaning.includes('together') || 
        meaning.includes('comes together') ||
        meaning.includes('meets') ||
        meaning.includes('unites') ||
        meaning.includes('joins')) {
      return { isIntransitive: true, transitivity: 'intransitive' };
    }
    
    // Self-directed or state changes
    if (meaning.includes('becomes') ||
        meaning.includes('gets to know') ||
        meaning.includes('comes to understand') ||
        meaning.includes('hears') ||
        meaning.includes('listens')) {
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
  
  const normalized = prefix.toLowerCase().trim();
  
  if (script === 'Devanagari') {
    if (['sam', 'saṃ'].includes(normalized)) return 'सम्';
    return prefix;
  } else {
    if (['सम्', 'सं'].includes(normalized)) return 'sam';
    return prefix;
  }
}

/**
 * Normalizes root for consistent output
 */
function normalizeRoot(root, script) {
  if (!root) return '';
  
  const normalized = root.toLowerCase().trim();
  
  if (script === 'Devanagari') {
    const rootMap = {
      'gam': 'गम्', 'ṛcch': 'ऋच्छ्', 'pracch': 'प्रच्छ्', 
      'svar': 'स्वर्', 'ṛ': 'ऋ', 'śru': 'श्रु', 'vid': 'विद्'
    };
    return rootMap[normalized] || root;
  } else {
    const rootMap = {
      'गम्': 'gam', 'ऋच्छ्': 'ṛcch', 'प्रच्छ्': 'pracch',
      'स्वर्': 'svar', 'ऋ': 'ṛ', 'श्रु': 'śru', 'विद्': 'vid'
    };
    return rootMap[normalized] || root;
  }
}

/**
 * Quick check for सम् + specified root combination
 * 
 * @param {string} word - Word to check
 * @returns {boolean} True if contains सम् + specified root pattern
 */
export function checkSamSpecificRootCombination(word) {
  if (!word || typeof word !== 'string') return false;
  
  const devanagariPatterns = [
    /संगच्छ/, /संगत/, /संऋच्छ/, /संप्रच्छ/, /संपृच्छ/,
    /संस्वर/, /संऋ/, /संश्रु/, /संशृण/, /संविद्/, /संवेत्/
  ];
  
  const iastPatterns = [
    /saṃgacch/i, /saṃgat/i, /saṃṛcch/i, /saṃpracch/i, /saṃpṛcch/i,
    /saṃsvar/i, /saṃṛ/i, /saṃśru/i, /saṃśṛṇ/i, /saṃvid/i, /saṃvet/i
  ];
  
  return [...devanagariPatterns, ...iastPatterns].some(pattern => pattern.test(word));
}

export default determineSamSpecificRootsAtmanepada;
