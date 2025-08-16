/**
 * Sutra 1.3.32: गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः
 * 
 * Sanskrit: गन्धनावक्षेपणसेवनसाहसिक्यप्रतियत्नप्रकथनोपयोगेषु कृञः
 * IAST: ganadhanāvakaṣepaṇasevanasāhasikayaparatiyatanaparakathanopayogeṣu kṛñaḥ
 * 
 * English: After the verb कृ when meaning 'to divulge', 'to revile', 'to serve', 
 * 'to use violence', 'to cause change', 'to recite' and 'to do an act tending 
 * to effect a desired purpose', the आत्मनेपद is used, even when the fruit of 
 * the action does not accrue to the agent.
 * 
 * This sutra specifies that the root कृ takes Ātmanepada endings when used in 
 * specific semantic contexts involving revealing secrets, reviling, serving, 
 * violence, causing change, recitation, and purposeful action.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Determines if a word should take Ātmanepada based on Sutra 1.3.32
 * @param {string} word - The Sanskrit word to analyze
 * @param {Object} context - Contextual information including semantic meaning
 * @returns {Object} Analysis result with Ātmanepada determination
 */
export function determineSemanticKriAtmanepada(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string' || !word.trim()) {
      return {
        isSutra132Atmanepada: false,
        confidence: 0,
        analysis: 'Invalid input',
        sutraApplied: '1.3.32'
      };
    }

    const cleanWord = word.trim();
    const script = detectScript(cleanWord);
    
    // Check for कृ root presence
    const rootDetection = checkKriRootPresence(cleanWord, context);
    if (!rootDetection.hasKriRoot) {
      return {
        isSutra132Atmanepada: false,
        confidence: 0,
        analysis: 'कृ root not detected',
        sutraApplied: '1.3.32',
        root: null
      };
    }

    // Check for semantic contexts specified in the sutra
    const semanticAnalysis = checkSemanticContexts(cleanWord, context);
    
    // Combined analysis
    let confidence = 0;
    let applicableContexts = [];
    
    if (rootDetection.hasKriRoot && semanticAnalysis.hasApplicableContext) {
      // Combine confidences more effectively
      confidence = Math.min(
        (rootDetection.confidence * 0.6) + (semanticAnalysis.confidence * 0.4),
        0.95
      );
      applicableContexts = semanticAnalysis.contexts;
    }

    const isApplicable = confidence > 0.5;

    return {
      isSutra132Atmanepada: isApplicable,
      confidence: confidence,
      analysis: isApplicable ? 
        `कृ root in semantic context: ${applicableContexts.join(', ')}` : 
        'Required semantic context not found',
      sutraApplied: '1.3.32',
      root: rootDetection.hasKriRoot ? 'कृ' : null,
      semanticContexts: applicableContexts,
      rootDetection: rootDetection,
      semanticAnalysis: semanticAnalysis
    };

  } catch (error) {
    return {
      isSutra132Atmanepada: false,
      confidence: 0,
      analysis: `Error: ${error.message}`,
      sutraApplied: '1.3.32'
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

  // More comprehensive patterns for कृ root detection
  const kriPatterns = {
    devanagari: [
      'कृ', 'कर', 'कार', 'कुर', 'क्रि', 'करो', 'करण', 'कार्य', 'कृत', 'कुर्व', 'कुरु',
      'करत', 'करन', 'कर्त', 'कर्म', 'काय', 'कृष्', 'कूर्', 'कृन्'
    ],
    iast: [
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
      confidence = 0.8;
      detectedForm = pattern;
      
      // Higher confidence for exact matches or prominent positions
      if (lowerWord.startsWith(patternLower) || patternLower === 'कृ' || patternLower === 'kṛ') {
        confidence = 0.85;
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
 * Check for the specific semantic contexts mentioned in sutra 1.3.32
 * @param {string} word - Word to analyze  
 * @param {Object} context - Contextual information
 * @returns {Object} Semantic context analysis
 */
function checkSemanticContexts(word, context = {}) {
  const semanticContexts = {
    // गन्धन - divulging/revealing secrets
    gandha: {
      patterns: [
        /गुप्त/, /रहस्य/, /गोपनीय/, /secret/, /reveal/, /divulge/, /disclose/,
        /गन्ध/, /गान्धिक/, /गन्धन/
      ],
      confidence: 0.8,
      meaning: 'divulging/revealing'
    },
    
    // अवक्षेपण - reviling/abusing  
    avakshepana: {
      patterns: [
        /अवक्षेप/, /निन्दा/, /दूषण/, /गाली/, /revile/, /abuse/, /criticize/, /blame/,
        /अपमान/, /तिरस्कार/
      ],
      confidence: 0.8,
      meaning: 'reviling/abusing'
    },
    
    // सेवन - serving/attending
    sevana: {
      patterns: [
        /सेवा/, /सेवन/, /उपासना/, /serve/, /attend/, /worship/, /honor/,
        /सेवक/, /परिचर्या/
      ],
      confidence: 0.8,
      meaning: 'serving/attending'
    },
    
    // साहसिक्य - using violence/force
    sahasikya: {
      patterns: [
        /साहस/, /बल/, /हिंसा/, /violence/, /force/, /aggressive/, /assault/,
        /दण्ड/, /प्रहार/, /बलात्कार/
      ],
      confidence: 0.8,
      meaning: 'using violence'
    },
    
    // प्रतियत्न - causing change/effort
    pratiyatna: {
      patterns: [
        /प्रयत्न/, /यत्न/, /परिवर्तन/, /change/, /effort/, /attempt/, /strive/,
        /उद्यम/, /चेष्टा/, /प्रतियत्न/
      ],
      confidence: 0.8,
      meaning: 'causing change/effort'
    },
    
    // प्रकथन - reciting/telling
    prakathana: {
      patterns: [
        /कथन/, /प्रकथन/, /वर्णन/, /recite/, /narrate/, /tell/, /describe/,
        /उच्चारण/, /पाठ/, /जप/
      ],
      confidence: 0.8,
      meaning: 'reciting/telling'
    },
    
    // उपयोग - purposeful action/use
    upayoga: {
      patterns: [
        /उपयोग/, /प्रयोग/, /व्यवहार/, /use/, /employ/, /utilize/, /apply/,
        /कार्य/, /उद्देश्य/, /purpose/
      ],
      confidence: 0.8,
      meaning: 'purposeful action'
    }
  };

  let applicableContexts = [];
  let maxConfidence = 0;

  // Check explicit semantic indicators in context
  if (context.meaning) {
    const meaning = context.meaning.toLowerCase();
    
    // Check for uncertainty words that reduce confidence
    const uncertaintyWords = ['maybe', 'perhaps', 'possibly', 'somewhat', 'partially', 'kind of', 'sort of'];
    const hasUncertainty = uncertaintyWords.some(word => meaning.includes(word));
    
    for (const [contextType, contextData] of Object.entries(semanticContexts)) {
      for (const pattern of contextData.patterns) {
        if (pattern.test(meaning)) {
          applicableContexts.push(contextData.meaning);
          let confidence = contextData.confidence;
          
          // Reduce confidence for uncertain meanings
          if (hasUncertainty) {
            confidence = Math.max(confidence * 0.5, 0.3);
          }
          
          maxConfidence = Math.max(maxConfidence, confidence);
          break;
        }
      }
    }
  }

  // Check direct context flags
  const contextFlags = [
    'divulge', 'reveal', 'revile', 'abuse', 'serve', 'violence', 
    'change', 'recite', 'purpose', 'force', 'effort'
  ];
  
  for (const flag of contextFlags) {
    if (context[flag]) {
      const contextType = findContextTypeByFlag(flag, semanticContexts);
      if (contextType) {
        applicableContexts.push(semanticContexts[contextType].meaning);
        maxConfidence = Math.max(maxConfidence, 0.85);
      }
    }
  }

  // Check word-embedded semantic patterns
  const wordAnalysis = analyzeWordSemantics(word, semanticContexts);
  if (wordAnalysis.confidence > 0) {
    applicableContexts.push(...wordAnalysis.contexts);
    maxConfidence = Math.max(maxConfidence, wordAnalysis.confidence);
  }

  // Remove duplicates
  applicableContexts = [...new Set(applicableContexts)];

  return {
    hasApplicableContext: applicableContexts.length > 0,
    confidence: maxConfidence,
    contexts: applicableContexts,
    detectionMethod: applicableContexts.length > 0 ? 'semantic_analysis' : 'none'
  };
}

/**
 * Find context type by flag name
 * @param {string} flag - Context flag
 * @param {Object} semanticContexts - Semantic contexts mapping
 * @returns {string|null} Context type
 */
function findContextTypeByFlag(flag, semanticContexts) {
  const flagMappings = {
    'divulge': 'gandha',
    'reveal': 'gandha', 
    'revile': 'avakshepana',
    'abuse': 'avakshepana',
    'serve': 'sevana',
    'violence': 'sahasikya',
    'force': 'sahasikya',
    'change': 'pratiyatna',
    'effort': 'pratiyatna',
    'recite': 'prakathana',
    'purpose': 'upayoga'
  };
  
  return flagMappings[flag] || null;
}

/**
 * Analyze word for embedded semantic patterns
 * @param {string} word - Word to analyze
 * @param {Object} semanticContexts - Semantic contexts
 * @returns {Object} Word semantic analysis
 */
function analyzeWordSemantics(word, semanticContexts) {
  let contexts = [];
  let confidence = 0;

  const script = detectScript(word);

  // Check for compound words with semantic indicators
  for (const [contextType, contextData] of Object.entries(semanticContexts)) {
    for (const pattern of contextData.patterns) {
      if (pattern.test(word)) {
        contexts.push(contextData.meaning);
        confidence = Math.max(confidence, contextData.confidence * 0.7);
        break;
      }
    }
  }

  return {
    confidence: confidence,
    contexts: [...new Set(contexts)]
  };
}

export default determineSemanticKriAtmanepada;
