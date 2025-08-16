/**
 * Sutra 1.3.33: अधेः प्रसहने
 * 
 * Sanskrit: अधेः प्रसहने
 * IAST: adheḥ prasahane
 * 
 * English: After the verb कृ preceded by अधि, when the sense is that of 
 * 'overcoming or defeat', the आत्मनेपद is used, even when the fruit of 
 * the action does not accrue to the agent.
 * 
 * This sutra specifies that when the root कृ is preceded by the prefix अधि
 * and the meaning involves overpowering, defeating, or overcoming, Ātmanepada
 * endings should be used.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if a word should take Ātmanepada based on Sutra 1.3.33
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Contextual information including semantic meaning
 * @returns {Object} Analysis result with Ātmanepada determination
 */
export function determineAdhiKriPrasahaneAtmanepada(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string' || !word.trim()) {
      return {
        isSutra133Atmanepada: false,
        confidence: 0,
        analysis: 'Invalid input',
        sutraApplied: '1.3.33'
      };
    }

    const cleanWord = word.trim();
    const script = detectScript(cleanWord);
    
    // Check for कृ root presence
    const rootDetection = checkKriRootPresence(cleanWord, context);
    
    // Check for अधि prefix presence
    const prefixDetection = checkAdhiPrefixPresence(cleanWord, context);
    
    // Check for प्रसहन (overpowering/defeating) context
    const prasahanaAnalysis = checkPrasahanaContext(cleanWord, context);
    
    // Early returns for single missing elements (preserve existing behavior)
    if (!rootDetection.hasKriRoot && prefixDetection.hasAdhiPrefix && prasahanaAnalysis.hasPrasahanaContext) {
      return {
        isSutra133Atmanepada: false,
        confidence: 0,
        analysis: 'कृ root not detected',
        sutraApplied: '1.3.33',
        root: null
      };
    }
    
    if (rootDetection.hasKriRoot && !prefixDetection.hasAdhiPrefix && prasahanaAnalysis.hasPrasahanaContext) {
      return {
        isSutra133Atmanepada: false,
        confidence: 0,
        analysis: 'अधि prefix not detected',
        sutraApplied: '1.3.33',
        root: rootDetection.hasKriRoot ? 'कृ' : null,
        prefix: null
      };
    }
    
    // Combined analysis - requires all three: कृ root + अधि prefix + प्रसहन context
    let confidence = 0;
    
    if (rootDetection.hasKriRoot && prefixDetection.hasAdhiPrefix && prasahanaAnalysis.hasPrasahanaContext) {
      // Combine confidences more effectively
      confidence = Math.min(
        (rootDetection.confidence * 0.4) + 
        (prefixDetection.confidence * 0.3) + 
        (prasahanaAnalysis.confidence * 0.3),
        0.95
      );
    }

    const isApplicable = confidence > 0.5;

    return {
      isSutra133Atmanepada: isApplicable,
      confidence: confidence,
      analysis: isApplicable ? 
        `अधि + कृ in प्रसहन context (${prasahanaAnalysis.contextType})` : 
        getFailureReason(rootDetection, prefixDetection, prasahanaAnalysis),
      sutraApplied: '1.3.33',
      root: rootDetection.hasKriRoot ? 'कृ' : null,
      prefix: prefixDetection.hasAdhiPrefix ? 'अधि' : null,
      prasahanaContext: prasahanaAnalysis.contextType,
      rootDetection: rootDetection,
      prefixDetection: prefixDetection,
      prasahanaAnalysis: prasahanaAnalysis
    };

  } catch (error) {
    return {
      isSutra133Atmanepada: false,
      confidence: 0,
      analysis: `Error: ${error.message}`,
      sutraApplied: '1.3.33'
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

  // More comprehensive patterns for कृ root detection (including अधि compounds)
  const kriPatterns = {
    devanagari: [
      'अधिकृ', 'अधिकुर', 'अधिकार', 'अधिकृत', 'अधिकरण', 'अधिकर',
      'कृ', 'कर', 'कार', 'कुर', 'क्रि', 'करो', 'करण', 'कार्य', 'कृत', 'कुर्व', 'कुरु',
      'करत', 'करन', 'कर्त', 'कर्म', 'काय', 'कृष्', 'कूर्', 'कृन्'
    ],
    iast: [
      'adhikṛ', 'adhikur', 'adhikār', 'adhikṛt', 'adhikaraṇ', 'adhikar',
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
      // Higher confidence for अधि compounds since they're specific to this sutra
      confidence = (patternLower.includes('अधि') || patternLower.includes('adhi')) ? 0.9 : 0.8;
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
 * Check if अधि prefix is present
 * @param {string} word - Word to analyze
 * @param {Object} context - Additional context
 * @returns {Object} Prefix detection analysis
 */
function checkAdhiPrefixPresence(word, context = {}) {
  const script = detectScript(word);
  
  // Check explicit prefix in context
  if (context.prefix) {
    const ctxScript = detectScript(context.prefix);
    
    if ((ctxScript === 'Devanagari' && context.prefix === 'अधि') || 
        (ctxScript === 'IAST' && context.prefix === 'adhi')) {
      return {
        hasAdhiPrefix: true,
        confidence: 0.95,
        source: 'explicit_context',
        detectedForm: 'अधि'
      };
    }
  }

  // Patterns for अधि prefix detection (including compound words)
  const adhiPatterns = {
    devanagari: [
      /^अधि/, /अधि/, /अधिकार/, /अधिकृत/, /अधिकर/, /अधिकरण/,
      /अधिकृ/, /अधिकुर/, /प्रसहाधि/, /विजयाधि/, /बलाधि/
    ],
    iast: [
      /^adhi/i, /adhi/i, /adhikār/i, /adhikṛt/i, /adhikar/i, /adhikaraṇ/i,
      /adhikṛ/i, /adhikur/i, /prasahādhi/i, /vijayādhi/i, /balādhi/i
    ]
  };

  const patterns = script === 'Devanagari' ? adhiPatterns.devanagari : adhiPatterns.iast;
  
  let confidence = 0;
  let detectedForm = null;

  for (const pattern of patterns) {
    if (pattern.test(word)) {
      // Higher confidence for prefix position, good confidence for compounds
      if (pattern.source && (pattern.source.includes('^') || word.toLowerCase().startsWith('adhi') || word.startsWith('अधि'))) {
        confidence = 0.9;
      } else {
        confidence = 0.75; // Still good confidence for compound detection
      }
      detectedForm = 'अधि';
      break;
    }
  }

  return {
    hasAdhiPrefix: confidence > 0.5,
    confidence: confidence,
    source: confidence > 0 ? 'pattern_match' : 'not_detected',
    detectedForm: detectedForm
  };
}

/**
 * Check for प्रसहन (overpowering/defeating) context
 * @param {string} word - Word to analyze  
 * @param {Object} context - Contextual information
 * @returns {Object} प्रसहन context analysis
 */
function checkPrasahanaContext(word, context = {}) {
  // प्रसहन semantic contexts - overpowering, defeating, overcoming
  const prasahanaPatterns = {
    // Direct Sanskrit terms for overpowering/defeating
    overpowering: [
      /प्रसह/, /अतिक्रम/, /परिजय/, /विजय/, /पराजय/, /अभिभव/,
      /prasah/, /prasaha/, /overpower/, /overcome/, /defeat/, /conquer/, /subdue/, /vanquish/,
      /dominate/, /overrule/, /overwhelm/
    ],
    
    // Terms for forcing/compelling
    forcing: [
      /बलात्/, /सबल/, /प्रबल/, /बल/, /force/, /compel/, /coerce/, 
      /constraint/, /pressure/, /violence/
    ],
    
    // Terms for superiority/dominance  
    superiority: [
      /श्रेष्ठता/, /उत्कृष्टता/, /वर्चस्व/, /अधिकार/, /supremacy/, 
      /superiority/, /dominance/, /authority/, /control/
    ],
    
    // Terms for subjugation
    subjugation: [
      /दमन/, /नियन्त्रण/, /वश/, /subjugate/, /suppress/, /control/,
      /restrain/, /curb/
    ]
  };

  let contextType = null;
  let confidence = 0;

  // Check explicit semantic indicators in context
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    
    for (const [category, patterns] of Object.entries(prasahanaPatterns)) {
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
    'overpower', 'overcome', 'defeat', 'conquer', 'subdue', 'force', 
    'compel', 'dominate', 'control', 'subjugate'
  ];
  
  for (const flag of contextFlags) {
    if (context[flag]) {
      contextType = 'overpowering';
      confidence = Math.max(confidence, 0.85);
      break;
    }
  }

  // Check word-embedded प्रसहन patterns
  const wordAnalysis = analyzeWordForPrasahana(word, prasahanaPatterns);
  if (wordAnalysis.confidence > 0) {
    contextType = wordAnalysis.contextType || contextType;
    confidence = Math.max(confidence, wordAnalysis.confidence);
  }

  return {
    hasPrasahanaContext: confidence > 0.5,
    confidence: confidence,
    contextType: contextType,
    detectionMethod: contextType ? 'semantic_analysis' : 'none'
  };
}

/**
 * Analyze word for embedded प्रसहन patterns
 * @param {string} word - Word to analyze
 * @param {Object} prasahanaPatterns - प्रसहन patterns
 * @returns {Object} Word प्रसहन analysis
 */
function analyzeWordForPrasahana(word, prasahanaPatterns) {
  const script = detectScript(word);

  let contextType = null;
  let confidence = 0;

  // Check for compound words with प्रसहन indicators
  for (const [category, patterns] of Object.entries(prasahanaPatterns)) {
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
 * @param {Object} prasahanaAnalysis - प्रसहन analysis result
 * @returns {string} Failure reason
 */
function getFailureReason(rootDetection, prefixDetection, prasahanaAnalysis) {
  const missing = [];
  
  if (!rootDetection.hasKriRoot) {
    missing.push('कृ root');
  }
  if (!prefixDetection.hasAdhiPrefix) {
    missing.push('अधि prefix');
  }
  if (!prasahanaAnalysis.hasPrasahanaContext) {
    missing.push('प्रसहन context');
  }
  
  return `Missing: ${missing.join(', ')}`;
}

export default determineAdhiKriPrasahaneAtmanepada;
