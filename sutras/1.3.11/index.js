/**
 * Sutra 1.3.11: स्वरितेनाधिकारः (svaritena adhikāraḥ)
 * "There is authority/scope by means of svarita accent"
 * 
 * This sutra establishes that elements marked with svarita accent have 
 * special authority or extended scope in grammatical operations. The svarita 
 * accent indicates that a rule or element has broader application than 
 * would otherwise be indicated.
 *
 * @fileoverview Implementation of Panini's Sutra 1.3.11 - Svarita accent authority
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Detects svarita accent markings in Sanskrit text
 * @param {string} text - Sanskrit text to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Svarita detection result
 */
export function detectSvaritaAccent(text, options = {}) {
  // Input validation
  if (!text || typeof text !== 'string') {
    return {
      success: false,
      error: 'Invalid input: text must be a non-empty string',
      text
    };
  }

  const script = detectScript(text);
  // For svarita analysis, allow texts with backticks even if script is Unknown
  if (script === 'Unknown' && !text.includes('`') && !text.includes('â') && !text.includes('ê')) {
    return {
      success: false,
      error: 'Unable to detect script',
      text,
      script
    };
  }

  const { context = 'general' } = options;
  const svaritaMarkings = [];
  
  // IAST svarita patterns - represented by grave accent (`) after vowel
  const svaritaPattern = /([aeiouāīūṛḷṝ])(`)/gi;
  let match;
  
  while ((match = svaritaPattern.exec(text)) !== null) {
    svaritaMarkings.push({
      position: match.index,
      vowel: match[1],
      accent: 'svarita',
      representation: match[0],
      type: 'explicit'
    });
  }
  
  // Check for implicit svarita indications (circumflex in some systems)
  const circumflexPattern = /([âêîôû])/gi;
  while ((match = circumflexPattern.exec(text)) !== null) {
    svaritaMarkings.push({
      position: match.index,
      vowel: match[1].charAt(0), // Get base vowel
      accent: 'svarita',
      representation: match[0],
      type: 'circumflex'
    });
  }
  
  if (script === 'Devanagari') {
    // Devanagari svarita patterns - using combining grave accent
    const devanagariSvaritaPattern = /([\u0905-\u0914\u093F-\u0944\u0962-\u0963])(\u0300)/g;
    let devMatch;
    
    while ((devMatch = devanagariSvaritaPattern.exec(text)) !== null) {
      svaritaMarkings.push({
        position: devMatch.index,
        vowel: devMatch[1],
        accent: 'svarita',
        representation: devMatch[0],
        type: 'combining'
      });
    }
  }

  // Analyze context for implicit svarita authority
  const hasExplicitSvarita = svaritaMarkings.length > 0;
  const implicitAuthority = analyzeImplicitSvaritaAuthority(text, script, context);

  return {
    success: true,
    text,
    script: script === 'Unknown' ? 'IAST' : script, // Assume IAST if contains svarita markings
    context,
    svaritaMarkings,
    hasExplicitSvarita,
    implicitAuthority,
    totalSvaritaCount: svaritaMarkings.length,
    rule: '1.3.11'
  };
}

/**
 * Analyzes implicit svarita authority based on grammatical context
 * @param {string} text - Text to analyze
 * @param {string} script - Detected script
 * @param {string} context - Grammatical context
 * @returns {Object} Implicit authority analysis
 */
function analyzeImplicitSvaritaAuthority(text, script, context) {
  const authorityIndicators = [];
  
  // Check for adhikara (authority) context indicators
  if (context === 'adhikara' || context === 'authority') {
    authorityIndicators.push({
      type: 'contextual',
      indicator: 'adhikara_context',
      authority: 'extended'
    });
  }
  
  // Check for specific grammatical patterns that imply svarita authority
  if (script === 'IAST' || script === 'Unknown') {
    // Technical terms that typically have authority
    const authorityTerms = [
      /\badhi\b/gi,      // अधि - authority prefix
      /\bpratyaya\b/gi,   // प्रत्यय - suffix (often has extended scope)
      /\bvikarana\b/gi,   // विकरण - class sign
      /\bsamjna\b/gi      // संज्ञा - technical term
    ];
    
    for (const pattern of authorityTerms) {
      const matches = [...text.matchAll(pattern)];
      for (const match of matches) {
        authorityIndicators.push({
          type: 'terminological',
          indicator: match[0],
          position: match.index,
          authority: 'technical'
        });
      }
    }
  }
  
  return {
    hasImplicitAuthority: authorityIndicators.length > 0,
    indicators: authorityIndicators,
    authorityType: authorityIndicators.length > 0 ? 'implicit' : 'none'
  };
}

/**
 * Applies svarita accent authority to grammatical operations
 * @param {string} element - Element to apply authority to
 * @param {Object} operation - Grammatical operation details
 * @param {Object} options - Application options
 * @returns {Object} Authority application result
 */
export function applySvaritaAuthority(element, operation, options = {}) {
  // Input validation
  if (!element || typeof element !== 'string') {
    return {
      success: false,
      error: 'Invalid element input',
      element
    };
  }

  if (!operation || typeof operation !== 'object') {
    return {
      success: false,
      error: 'Invalid operation input',
      operation
    };
  }

  const {
    context = 'general',
    forceAuthority = false,
    extendScope = true
  } = options;

  // Detect svarita in the element
  const svaritaAnalysis = detectSvaritaAccent(element, { context });
  
  if (!svaritaAnalysis.success) {
    return {
      success: false,
      error: svaritaAnalysis.error,
      element
    };
  }

  // Determine authority level
  let authorityLevel = 'none';
  let scopeExtension = [];
  
  if (svaritaAnalysis.hasExplicitSvarita || forceAuthority) {
    authorityLevel = 'explicit';
    
    if (extendScope) {
      // Define scope extensions based on operation type
      const baseScope = operation.scope || [];
      
      switch (operation.type) {
        case 'substitution':
          scopeExtension = [...baseScope, 'adjacent_elements', 'compound_members'];
          break;
        case 'elision':
          scopeExtension = [...baseScope, 'related_phonemes', 'contextual_environment'];
          break;
        case 'augmentation':
          scopeExtension = [...baseScope, 'stem_variants', 'derived_forms'];
          break;
        default:
          scopeExtension = [...baseScope, 'extended_context'];
      }
    } else {
      // When scope extension is disabled, use only the base scope
      scopeExtension = operation.scope || [];
    }
  } else if (svaritaAnalysis.implicitAuthority.hasImplicitAuthority) {
    authorityLevel = 'implicit';
    scopeExtension = extendScope ? ['technical_scope'] : [];
  }

  // Calculate authority metrics
  const authorityMetrics = {
    strength: authorityLevel === 'explicit' ? 1.0 : 
              authorityLevel === 'implicit' ? 0.7 : 0.0,
    scope: scopeExtension.length,
    svaritaCount: svaritaAnalysis.totalSvaritaCount
  };

  return {
    success: true,
    element,
    operation,
    authorityLevel,
    scopeExtension,
    authorityMetrics,
    svaritaAnalysis,
    hasAuthority: authorityLevel !== 'none',
    context,
    rule: '1.3.11'
  };
}

/**
 * Analyzes authority scope for grammatical rules
 * @param {Array} elements - Elements to analyze for authority
 * @param {Object} ruleContext - Rule context information
 * @returns {Object} Comprehensive authority analysis
 */
export function analyzeAuthorityScope(elements, ruleContext = {}) {
  try {
    if (!Array.isArray(elements)) {
      return {
        success: false,
        error: 'Elements must be an array',
        elements
      };
    }

    const authorityElements = [];
    const nonAuthorityElements = [];
    
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (typeof element === 'string') {
        const svaritaResult = detectSvaritaAccent(element);
        
        if (svaritaResult.success) {
          const elementAnalysis = {
            index: i,
            element,
            svaritaMarkings: svaritaResult.svaritaMarkings,
            hasExplicitSvarita: svaritaResult.hasExplicitSvarita,
            implicitAuthority: svaritaResult.implicitAuthority,
            script: svaritaResult.script
          };
          
          if (svaritaResult.hasExplicitSvarita || svaritaResult.implicitAuthority.hasImplicitAuthority) {
            authorityElements.push(elementAnalysis);
          } else {
            nonAuthorityElements.push(elementAnalysis);
          }
        }
      }
    }

    // Calculate overall authority metrics
    const totalElements = elements.length;
    const authorityRatio = totalElements > 0 ? authorityElements.length / totalElements : 0;
    const dominantAuthority = authorityRatio > 0.5;
    
    return {
      success: true,
      elements,
      ruleContext,
      authorityElements,
      nonAuthorityElements,
      totalElements,
      authorityRatio,
      dominantAuthority,
      overallAuthorityLevel: dominantAuthority ? 'dominant' : 
                            authorityElements.length > 0 ? 'partial' : 'none',
      rule: '1.3.11'
    };

  } catch (error) {
    return {
      success: false,
      error: `Authority analysis error: ${error.message}`,
      elements,
      ruleContext
    };
  }
}

export default {
  detectSvaritaAccent,
  applySvaritaAuthority,
  analyzeAuthorityScope
};
