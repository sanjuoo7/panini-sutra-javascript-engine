/**
 * Sutra 1.3.12: अनुदात्तङित आत्मनेपदम् (anudāttaṅita ātmanepadam)
 * "Anudātta and ṅit (marked roots) take ātmanepada endings"
 * 
 * This sutra establishes that verbal roots marked with anudātta accent 
 * or the it-marker ṅ take ātmanepada (middle voice) endings rather than 
 * parasmaipada (active voice) endings. This is a fundamental rule for 
 * determining voice in Sanskrit verb conjugation.
 *
 * @fileoverview Implementation of Panini's Sutra 1.3.12 - Ātmanepada assignment
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Detects anudātta accent markings in Sanskrit text
 * @param {string} text - Sanskrit text to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Anudātta detection result
 */
export function detectAnudattaAccent(text, options = {}) {
  // Input validation
  if (!text || typeof text !== 'string') {
    return {
      success: false,
      error: 'Invalid input: text must be a non-empty string',
      text
    };
  }

  const script = detectScript(text);
  // Allow anudātta analysis even if script detection is uncertain
  if (script === 'Unknown' && !text.includes('_') && !text.includes('̫')) {
    return {
      success: false,
      error: 'Unable to detect script for anudātta analysis',
      text,
      script
    };
  }

  const { context = 'general' } = options;
  const anudattaMarkings = [];
  
  // IAST anudātta patterns - represented by underscore (_) after vowel
  const anudattaPattern = /([aeiouāīūṛḷṝ])(_)/gi;
  let match;
  
  while ((match = anudattaPattern.exec(text)) !== null) {
    anudattaMarkings.push({
      position: match.index,
      vowel: match[1],
      accent: 'anudātta',
      representation: match[0],
      type: 'explicit'
    });
  }
  
  if (script === 'Devanagari') {
    // Devanagari anudātta patterns - using combining low line or specific markers
    const devanagariAnudattaPattern = /([\u0905-\u0914\u093F-\u0944\u0962-\u0963])(\u0331|\u032B)/g;
    let devMatch;
    
    while ((devMatch = devanagariAnudattaPattern.exec(text)) !== null) {
      anudattaMarkings.push({
        position: devMatch.index,
        vowel: devMatch[1],
        accent: 'anudātta',
        representation: devMatch[0],
        type: 'combining'
      });
    }
  }

  const hasExplicitAnudatta = anudattaMarkings.length > 0;

  return {
    success: true,
    text,
    script: script === 'Unknown' ? 'IAST' : script,
    context,
    anudattaMarkings,
    hasExplicitAnudatta,
    totalAnudattaCount: anudattaMarkings.length,
    rule: '1.3.12'
  };
}

/**
 * Detects ṅit marker in Sanskrit roots
 * @param {string} root - Sanskrit root to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Ṅit detection result
 */
export function detectNgitMarker(root, options = {}) {
  // Input validation
  if (!root || typeof root !== 'string') {
    return {
      success: false,
      error: 'Invalid input: root must be a non-empty string',
      root
    };
  }

  const script = detectScript(root);
  const { context = 'general' } = options;
  
  let hasNgitMarker = false;
  const ngitMarkings = [];

  if (script === 'IAST' || script === 'Unknown') {
    // Check for ṅ marker at various positions
    const ngitPatterns = [
      /ṅ$/,           // Final ṅ
      /^ṅ/,           // Initial ṅ
      /ṅ(?=\w)/,      // Medial ṅ followed by letter
      /(?<=\w)ṅ(?=\w)/ // Medial ṅ between letters
    ];

    for (const pattern of ngitPatterns) {
      const matches = [...root.matchAll(new RegExp(pattern.source, 'g'))];
      for (const match of matches) {
        hasNgitMarker = true;
        ngitMarkings.push({
          position: match.index,
          marker: 'ṅ',
          type: 'explicit',
          representation: match[0]
        });
      }
    }
  } else if (script === 'Devanagari') {
    // Check for ङ् (nga + virama) marker
    const devanagariNgPattern = /ङ्/g;
    let match;
    
    while ((match = devanagariNgPattern.exec(root)) !== null) {
      hasNgitMarker = true;
      ngitMarkings.push({
        position: match.index,
        marker: 'ङ्',
        type: 'devanagari',
        representation: match[0]
      });
    }
  }

  return {
    success: true,
    root,
    script,
    context,
    hasNgitMarker,
    ngitMarkings,
    totalNgitCount: ngitMarkings.length,
    rule: '1.3.12'
  };
}

/**
 * Determines if a root should take ātmanepada endings based on anudātta or ṅit
 * @param {string} root - Sanskrit verbal root
 * @param {Object} options - Configuration options
 * @returns {Object} Ātmanepada determination result
 */
export function determineAtmanepada(root, options = {}) {
  // Input validation
  if (!root || typeof root !== 'string') {
    return {
      success: false,
      error: 'Invalid root input',
      root
    };
  }

  const {
    context = 'general',
    explicitMarkings = true,
    traditionalClassification = true
  } = options;

  try {
    // Check for anudātta accent
    const anudattaAnalysis = detectAnudattaAccent(root, { context });
    
    if (!anudattaAnalysis.success) {
      return {
        success: false,
        error: anudattaAnalysis.error,
        root
      };
    }

    // Check for ṅit marker
    const ngitAnalysis = detectNgitMarker(root, { context });
    
    if (!ngitAnalysis.success) {
      return {
        success: false,
        error: ngitAnalysis.error,
        root
      };
    }

    // Determine ātmanepada based on markings
    const hasAnudatta = anudattaAnalysis.hasExplicitAnudatta;
    const hasNgit = ngitAnalysis.hasNgitMarker;
    
    const isAtmanepada = hasAnudatta || hasNgit;
    
    // Determine reason for ātmanepada assignment
    let reason = [];
    if (hasAnudatta) {
      reason.push('anudātta_accent');
    }
    if (hasNgit) {
      reason.push('ṅit_marker');
    }
    
    if (!isAtmanepada) {
      reason.push('no_qualifying_markers');
    }

    // Traditional classification check (if enabled)
    let traditionalClass = null;
    if (traditionalClassification) {
      traditionalClass = analyzeTraditionalClassification(root, anudattaAnalysis.script);
    }

    // Voice assignment
    const voice = isAtmanepada ? 'ātmanepada' : 'parasmaipada';
    const confidence = (hasAnudatta && hasNgit) ? 1.0 : 
                      (hasAnudatta || hasNgit) ? 0.9 : 0.0;

    return {
      success: true,
      root,
      voice,
      isAtmanepada,
      isParasmaipada: !isAtmanepada,
      hasAnudatta,
      hasNgit,
      reason,
      confidence,
      anudattaAnalysis,
      ngitAnalysis,
      traditionalClass,
      context,
      rule: '1.3.12'
    };

  } catch (error) {
    return {
      success: false,
      error: `Ātmanepada determination error: ${error.message}`,
      root,
      context
    };
  }
}

/**
 * Analyzes traditional verb class for additional classification context
 * @param {string} root - Sanskrit root
 * @param {string} script - Detected script
 * @returns {Object} Traditional classification analysis
 */
function analyzeTraditionalClassification(root, script) {
  // Common ātmanepada roots from traditional grammar
  const traditionalAtmanepadaRoots = [
    'labh',   // लभ् - to get/obtain
    'bhāṣ',   // भाष् - to speak
    'vid',    // विद् - to know (in certain forms)
    'yaj',    // यज् - to sacrifice (in certain contexts)
    'vṛt',    // वृत् - to turn/exist
    'sev',    // सेव् - to serve
    'arcch',  // अर्च्छ् - to honor/worship
  ];

  const traditionalParasmaipadaRoots = [
    'gam',    // गम् - to go
    'as',     // अस् - to be
    'bhū',    // भू - to become
    'kṛ',     // कृ - to do
    'dā',     // दा - to give
    'sthā',   // स्था - to stand
    'jñā',    // ज्ञा - to know
  ];

  let classification = 'unknown';
  let confidence = 0.0;
  
  // Normalize root for comparison
  const normalizedRoot = root.replace(/[`_]/, ''); // Remove accent marks
  
  if (traditionalAtmanepadaRoots.includes(normalizedRoot)) {
    classification = 'traditional_ātmanepada';
    confidence = 0.8;
  } else if (traditionalParasmaipadaRoots.includes(normalizedRoot)) {
    classification = 'traditional_parasmaipada';
    confidence = 0.8;
  }

  return {
    classification,
    confidence,
    normalizedRoot,
    matchedTraditional: confidence > 0
  };
}

/**
 * Applies ātmanepada endings to a verbal root
 * @param {string} root - Sanskrit verbal root
 * @param {Object} conjugationContext - Conjugation parameters
 * @returns {Object} Applied ending result
 */
export function applyAtmanepadaEndings(root, conjugationContext = {}) {
  try {
    // Validate inputs
    if (!root || typeof root !== 'string') {
      return {
        success: false,
        error: 'Invalid root input',
        root
      };
    }

    // Determine if root takes ātmanepada
    const atmanepadaResult = determineAtmanepada(root);
    
    if (!atmanepadaResult.success) {
      return {
        success: false,
        error: atmanepadaResult.error,
        root
      };
    }

    const {
      tense = 'present',
      person = 'third',
      number = 'singular',
      mood = 'indicative'
    } = conjugationContext;

    // Basic ātmanepada endings (simplified for demonstration)
    const atmanepadaEndings = {
      present: {
        first: { singular: 'e', dual: 'vahe', plural: 'mahe' },
        second: { singular: 'se', dual: 'ethe', plural: 'dhve' },
        third: { singular: 'te', dual: 'ete', plural: 'ante' }
      }
    };

    // Basic parasmaipada endings (for comparison)
    const parasmaipadaEndings = {
      present: {
        first: { singular: 'mi', dual: 'vas', plural: 'mas' },
        second: { singular: 'si', dual: 'thas', plural: 'tha' },
        third: { singular: 'ti', dual: 'tas', plural: 'anti' }
      }
    };

    const endingSet = atmanepadaResult.isAtmanepada ? atmanepadaEndings : parasmaipadaEndings;
    const selectedEnding = endingSet[tense]?.[person]?.[number] || 'UNKNOWN';

    return {
      success: true,
      root,
      voice: atmanepadaResult.voice,
      appliedEnding: selectedEnding,
      conjugatedForm: root + selectedEnding,
      conjugationContext: {
        tense,
        person,
        number,
        mood
      },
      atmanepadaAnalysis: atmanepadaResult,
      rule: '1.3.12'
    };

  } catch (error) {
    return {
      success: false,
      error: `Ending application error: ${error.message}`,
      root,
      conjugationContext
    };
  }
}

export default {
  detectAnudattaAccent,
  detectNgitMarker,
  determineAtmanepada,
  applyAtmanepadaEndings
};
