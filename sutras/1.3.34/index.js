/**
 * Sutra 1.3.34: वेः शब्दकर्म्मणः
 * 
 * Sanskrit: वेः शब्दकर्म्मणः
 * IAST: veḥ śabadakaramamaṇaḥ
 * 
 * English: After the verb कृ preceded by वि, even when the fruit of the action 
 * does not accrue to the agent, and when the sense is that of 'making sound' 
 * (literally having 'sound' for its object), the आत्मनेपद affix is used.
 * 
 * This sutra specifies that when the root कृ is preceded by the prefix वि
 * and the meaning involves making sounds or having sound as the object of action,
 * Ātmanepada endings should be used.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if a word should take Ātmanepada based on Sutra 1.3.34
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Contextual information including semantic meaning
 * @returns {Object} Analysis result with Ātmanepada determination
 */
export function determineViKriShabdakarmaAtmanepada(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string' || !word.trim()) {
      return {
        isSutra134Atmanepada: false,
        confidence: 0,
        analysis: 'Invalid input',
        sutraApplied: '1.3.34'
      };
    }

    const cleanWord = word.trim();
    const script = detectScript(cleanWord);
    
    // Check for कृ root presence
    const rootDetection = checkKriRootPresence(cleanWord, context);
    
    // Check for वि prefix presence
    const prefixDetection = checkViPrefixPresence(cleanWord, context);
    
    // Check for शब्दकर्मन् (sound-making) context
    const shabdakarmaAnalysis = checkShabdakarmaContext(cleanWord, context);
    
    // Early returns for single missing elements (preserve existing behavior)
    if (!rootDetection.hasKriRoot && prefixDetection.hasViPrefix && shabdakarmaAnalysis.hasShabdakarmaContext) {
      return {
        isSutra134Atmanepada: false,
        confidence: 0,
        analysis: 'कृ root not detected',
        sutraApplied: '1.3.34',
        root: null
      };
    }
    
    if (rootDetection.hasKriRoot && !prefixDetection.hasViPrefix && shabdakarmaAnalysis.hasShabdakarmaContext) {
      return {
        isSutra134Atmanepada: false,
        confidence: 0,
        analysis: 'वि prefix not detected',
        sutraApplied: '1.3.34',
        root: rootDetection.hasKriRoot ? 'कृ' : null,
        prefix: null
      };
    }
    
    // Combined analysis - requires all three: कृ root + वि prefix + शब्दकर्मन् context
    let confidence = 0;
    
    if (rootDetection.hasKriRoot && prefixDetection.hasViPrefix && shabdakarmaAnalysis.hasShabdakarmaContext) {
      // Check for explicit context indicators
      const hasExplicitContext = context.root || context.prefix || context.meaning || 
                                  shabdakarmaAnalysis.detectionMethod === 'explicit_context' ||
                                  // Check for context flags
                                  context.sound || context.music || context.voice || context.chant || 
                                  context.thunder || context.bell || context.drum || context.play ||
                                  context.ring || context.roar;
      
      if (hasExplicitContext) {
        // Explicit context gets higher confidence
        confidence = Math.min(
          (rootDetection.confidence * 0.4) + 
          (prefixDetection.confidence * 0.3) + 
          (shabdakarmaAnalysis.confidence * 0.3),
          0.95
        );
      } else {
        // Pattern-only matching gets conservative confidence
        confidence = Math.min(
          (rootDetection.confidence * 0.35) + 
          (prefixDetection.confidence * 0.3) + 
          (shabdakarmaAnalysis.confidence * 0.25),
          0.78  // Cap at 0.78 for pattern matching
        );
      }
    }

    const isApplicable = confidence > 0.5;

    return {
      isSutra134Atmanepada: isApplicable,
      confidence: confidence,
      analysis: isApplicable ? 
        `वि + कृ in शब्दकर्मन् context (${shabdakarmaAnalysis.contextType})` : 
        getFailureReason(rootDetection, prefixDetection, shabdakarmaAnalysis),
      sutraApplied: '1.3.34',
      root: rootDetection.hasKriRoot ? 'कृ' : null,
      prefix: prefixDetection.hasViPrefix ? 'वि' : null,
      shabdakarmaContext: shabdakarmaAnalysis.contextType,
      rootDetection: rootDetection,
      prefixDetection: prefixDetection,
      shabdakarmaAnalysis: shabdakarmaAnalysis
    };

  } catch (error) {
    return {
      isSutra134Atmanepada: false,
      confidence: 0,
      analysis: `Error: ${error.message}`,
      sutraApplied: '1.3.34'
    };
  }
}

/**
 * Check if कृ root is present in the word or context
 * @param {string} word - Word to analyze
 * @param {Object} context - Additional context
 * @returns {Object} Root detection analysis
 */
function checkKriRootPresence(word, context = {}) {
  const script = detectScript(word);
  
  // Check explicit root in context
  if (context.root) {
    const ctxScript = detectScript(context.root);
    
    if ((ctxScript === 'Devanagari' && context.root === 'कृ') || 
        (ctxScript === 'IAST' && (context.root === 'kṛ' || context.root === 'kri'))) {
      return {
        hasKriRoot: true,
        confidence: 0.95,
        source: 'explicit_context',
        detectedForm: context.root
      };
    }
  }

  // More comprehensive patterns for कृ root detection (including वि compounds)
  const kriPatterns = {
    devanagari: [
      'विकृ', 'विकुर', 'विकार', 'विकृत', 'विकरण', 'विकर',
      'कृ', 'कर', 'कार', 'कुर', 'क्रि', 'करो', 'करण', 'कार्य', 'कृत', 'कुर्व', 'कुरु',
      'करत', 'करन', 'कर्त', 'कर्म', 'काय', 'कृष्', 'कूर्', 'कृन्'
    ],
    iast: [
      'vikṛ', 'vikur', 'vikār', 'vikṛt', 'vikaraṇ', 'vikar',
      'kṛ', 'kar', 'kār', 'kur', 'kri', 'karo', 'karaṇ', 'kārya', 'kṛt', 'kurv', 'kuru',
      'karat', 'karan', 'kart', 'karm', 'kāy', 'kṛṣ', 'kūr', 'kṛn'
    ]
  };

  const patterns = script === 'Devanagari' ? kriPatterns.devanagari : kriPatterns.iast;
  
  let confidence = 0;
  let detectedForm = null;
  const lowerWord = word.toLowerCase();

  for (const pattern of patterns) {
    const patternLower = pattern.toLowerCase();
    if (lowerWord.includes(patternLower)) {
      // Higher confidence for वि compounds since they're specific to this sutra
      confidence = (patternLower.includes('वि') || patternLower.includes('vi')) ? 0.9 : 0.8;
      detectedForm = pattern;
      
      // Higher confidence for exact matches or prominent positions
      if (lowerWord.startsWith(patternLower) || patternLower === 'कृ' || patternLower === 'kṛ') {
        confidence = Math.min(confidence + 0.05, 0.95);
      }
      break;
    }
  }

  return {
    hasKriRoot: confidence > 0.5,
    confidence: confidence,
    source: confidence > 0 ? 'pattern_match' : 'not_detected',
    detectedForm: detectedForm
  };
}

/**
 * Check if वि prefix is present
 * @param {string} word - Word to analyze
 * @param {Object} context - Additional context
 * @returns {Object} Prefix detection analysis
 */
function checkViPrefixPresence(word, context = {}) {
  const script = detectScript(word);
  
  // Check explicit prefix in context
  if (context.prefix) {
    const ctxScript = detectScript(context.prefix);
    
    if ((ctxScript === 'Devanagari' && context.prefix === 'वि') || 
        (ctxScript === 'IAST' && context.prefix === 'vi')) {
      return {
        hasViPrefix: true,
        confidence: 0.95,
        source: 'explicit_context',
        detectedForm: 'वि'
      };
    }
  }

  // Patterns for वि prefix detection
  const viPatterns = {
    devanagari: [/^वि/, /वि/],
    iast: [/^vi/i, /vi/i]
  };

  const patterns = script === 'Devanagari' ? viPatterns.devanagari : viPatterns.iast;
  
  let confidence = 0;
  let detectedForm = null;

  for (const pattern of patterns) {
    if (pattern.test(word)) {
      confidence = (pattern.source && pattern.source.includes('^')) || word.toLowerCase().startsWith('vi') || word.startsWith('वि') ? 0.9 : 0.8;
      detectedForm = 'वि';
      break;
    }
  }

  return {
    hasViPrefix: confidence > 0.5,
    confidence: confidence,
    source: confidence > 0 ? 'pattern_match' : 'not_detected',
    detectedForm: detectedForm
  };
}

/**
 * Check for शब्दकर्मन् (sound-making) context
 * @param {string} word - Word to analyze  
 * @param {Object} context - Contextual information
 * @returns {Object} शब्दकर्मन् context analysis
 */
function checkShabdakarmaContext(word, context = {}) {
  // शब्दकर्मन् semantic contexts - making sounds, having sound as object
  const shabdakarmaPatterns = {
    // Direct sound-making terms (general sounds)
    soundMaking: [
      /शब्द/, /ध्वनि/, /नाद/, /स्वर/, /गुंजन/,
      /shabda/, /dhvani/, /nada/, /svara/, 
      /sound/, /noise/, /tone/, /echo/, /resonance/,
      /vibration/, /acoustic/, /audible/
    ],
    
    // Musical/rhythmic sounds
    musical: [
      /संगीत/, /राग/, /ताल/, /गान/, /गीत/, /वाद्य/,
      /sangita/, /raga/, /tala/, /gana/, /gita/, /vadya/,
      /music/, /melody/, /rhythm/, /song/, /tune/, /harmony/,
      /musical/, /melodic/, /rhythmic/
    ],
    
    // Natural sounds
    natural: [
      /गर्जन/, /गर्जना/, /हुंकार/, /चीत्कार/, /सिंहनाद/, /मेघगर्जन/,
      /garjana/, /garjan/, /hunkara/, /citkara/, /simhanada/, /meghagarjan/,
      /thunder/, /roar/, /howl/, /cry/, /call/, /shout/,
      /bellow/, /growl/
    ],
    
    // Instrumental sounds
    instrumental: [
      /वादन/, /बजाना/, /झंकार/, /टंकार/, /नुपुर/,
      /vadana/, /bajana/, /jhankara/, /tankara/, /nupura/,
      /play/, /strike/, /beat/, /ring/, /chime/, /bell/,
      /drum/, /instrument/
    ],
    
    // Vocal sounds (most specific, checked first)
    vocal: [
      /उच्चारण/, /पठन/, /जप/, /कीर्तन/, /मन्त्र/,
      /uccarana/, /pathana/, /japa/, /kirtana/, /mantra/,
      /recite/, /chant/, /pronounce/, /utter/, /speak/,
      /vocal/, /oral/, /verbal/, /voice/
    ]
  };

  let contextType = null;
  let confidence = 0;

  // Check explicit semantic indicators in context
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    
    // Check in order of specificity - more specific categories first
    const categoryOrder = ['vocal', 'musical', 'instrumental', 'natural', 'soundMaking'];
    
    for (const category of categoryOrder) {
      const patterns = shabdakarmaPatterns[category];
      for (const pattern of patterns) {
        if (pattern.test(meaning)) {
          contextType = category;
          confidence = Math.max(confidence, 0.8);
          break;
        }
      }
      if (contextType) break;
    }
  }

  // Check direct context flags
  const contextFlags = [
    'sound', 'noise', 'voice', 'music', 'song', 'chant', 'recite', 
    'thunder', 'roar', 'ring', 'bell', 'drum', 'play'
  ];
  
  for (const flag of contextFlags) {
    if (context[flag]) {
      contextType = findShabdaContextTypeByFlag(flag, shabdakarmaPatterns);
      confidence = Math.max(confidence, 0.85);
      break;
    }
  }

  // Check word-embedded शब्दकर्मन् patterns
  const wordAnalysis = analyzeWordForShabdakarma(word, shabdakarmaPatterns);
  if (wordAnalysis.confidence > 0) {
    contextType = wordAnalysis.contextType || contextType;
    confidence = Math.max(confidence, wordAnalysis.confidence);
  }

  return {
    hasShabdakarmaContext: confidence > 0.5,
    confidence: confidence,
    contextType: contextType,
    detectionMethod: contextType ? 'semantic_analysis' : 'none'
  };
}

/**
 * Find shabda context type by flag name
 * @param {string} flag - Context flag
 * @param {Object} shabdakarmaPatterns - शब्दकर्मन् patterns
 * @returns {string|null} Context type
 */
function findShabdaContextTypeByFlag(flag, shabdakarmaPatterns) {
  const flagMappings = {
    'sound': 'soundMaking',
    'noise': 'soundMaking',
    'voice': 'vocal',
    'music': 'musical',
    'song': 'musical',
    'chant': 'vocal',
    'recite': 'vocal',
    'thunder': 'natural',
    'roar': 'natural',
    'ring': 'instrumental',
    'bell': 'instrumental',
    'drum': 'instrumental',
    'play': 'instrumental'
  };
  
  return flagMappings[flag] || 'soundMaking';
}

/**
 * Analyze word for embedded शब्दकर्मन् patterns
 * @param {string} word - Word to analyze
 * @param {Object} shabdakarmaPatterns - शब्दकर्मन् patterns
 * @returns {Object} Word शब्दकर्मन् analysis
 */
function analyzeWordForShabdakarma(word, shabdakarmaPatterns) {
  const script = detectScript(word);

  let contextType = null;
  let confidence = 0;

  // Check for compound words with शब्दकर्मन् indicators
  for (const [category, patterns] of Object.entries(shabdakarmaPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(word)) {
        contextType = category;
        confidence = Math.max(confidence, 0.7);
        break;
      }
    }
    if (contextType) break;
  }

  return {
    confidence: confidence,
    contextType: contextType
  };
}

/**
 * Get failure reason when conditions are not met
 * @param {Object} rootDetection - Root detection result
 * @param {Object} prefixDetection - Prefix detection result  
 * @param {Object} shabdakarmaAnalysis - शब्दकर्मन् analysis result
 * @returns {string} Failure reason
 */
function getFailureReason(rootDetection, prefixDetection, shabdakarmaAnalysis) {
  const missing = [];
  
  if (!rootDetection.hasKriRoot) {
    missing.push('कृ root');
  }
  if (!prefixDetection.hasViPrefix) {
    missing.push('वि prefix');
  }
  if (!shabdakarmaAnalysis.hasShabdakarmaContext) {
    missing.push('शब्दकर्मन् context');
  }
  
  return `Missing: ${missing.join(', ')}`;
}

export default determineViKriShabdakarmaAtmanepada;
