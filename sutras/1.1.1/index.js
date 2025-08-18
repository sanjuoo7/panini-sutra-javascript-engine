
/**
 * Sutra 1.1.1: वृद्धिरादैच् (vṛddhirādaic)
 *
 * This sutra defines the term "vṛddhi". It states that the vowels ā (आ), ai (ऐ), and au (औ) are called vṛddhi.
 * In Pāṇini's system, "āT" (आत्) refers to "ā" and "aiC" (ऐच्) is a pratyāhāra (abbreviation)
 * that includes the vowels "ai" (ऐ) and "au" (औ).
 * 
 * This is the foundational sutra that establishes the vowel categories used throughout Sanskrit grammar.
 * 
 * Enhanced with shared utilities integration for consistency and maintainability.
 */

// Import shared utilities for enhanced functionality
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';
import { SanskritVowels } from '../sanskrit-utils/constants.js';

// Use centralized vṛddhi vowel definitions from shared constants
const vrddhiVowels = SanskritVowels.vrddhi.iast;
const vrddhiVowelsDevanagari = SanskritVowels.vrddhi.devanagari;

// Enhanced vowel category mapping
const vowelCategoryMap = {
  'ā': 'long-a', 'आ': 'long-a',
  'ai': 'diphthong-ai', 'ऐ': 'diphthong-ai', 
  'au': 'diphthong-au', 'औ': 'diphthong-au'
};

/**
 * Checks if a given vowel is a vṛddhi vowel.
 *
 * @param {string} vowel The vowel to check (IAST or Devanagari).
 * @returns {boolean} True if the vowel is a vṛddhi vowel, false otherwise.
 */
function isVrddhi(vowel) {
  if (!vowel) return false;
  return vrddhiVowels.includes(vowel) || vrddhiVowelsDevanagari.includes(vowel);
}

/**
 * Gets all vṛddhi vowels in both IAST and Devanagari scripts.
 *
 * @returns {Object} Object containing IAST and Devanagari vṛddhi vowels.
 */
function getAllVrddhiVowels() {
  return {
    iast: [...vrddhiVowels],
    devanagari: [...vrddhiVowelsDevanagari],
    combined: [...vrddhiVowels, ...vrddhiVowelsDevanagari]
  };
}

/**
 * Analyzes a vowel and provides detailed information about its vṛddhi status.
 * Enhanced with shared script detection and improved error handling.
 *
 * @param {string} vowel The vowel to analyze.
 * @returns {Object} Analysis object with detailed information.
 */
function analyzeVowel(vowel) {
  // Enhanced input validation
  if (!vowel || typeof vowel !== 'string') {
    return {
      vowel: vowel,
      isValid: false,
      isVrddhi: false,
      script: null,
      category: null,
      explanation: 'Invalid or empty vowel input'
    };
  }

  // Use shared script detection for consistency
  const script = detectScript(vowel);
  const isVrddhiVowel = isVrddhi(vowel);
  const category = vowelCategoryMap[vowel] || null;
  
  return {
    vowel: vowel,
    isValid: true,
    isVrddhi: isVrddhiVowel,
    script: script,
    category: category,
    explanation: isVrddhiVowel ? 
      `${vowel} is a vṛddhi vowel (${category})` : 
      `${vowel} is not a vṛddhi vowel`,
    traditionalClassification: isVrddhiVowel ? 'vṛddhi' : 'non-vṛddhi'
  };
}

/**
 * Main educational analysis function - Core sutra implementation
 * 
 * @param {string} vowel - Vowel to analyze for vṛddhi classification
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive educational analysis object
 */
function sutra111(vowel, context = {}) {
  // Input validation and normalization
  if (!vowel || typeof vowel !== 'string' || vowel.trim() === '') {
    return {
      isVrddhi: false,
      sutraApplied: '1.1.1',
      confidence: 0.0,
      analysis: {
        error: 'Invalid input',
        traditionalCommentary: 'अशुद्धे पदे',
        modernExplanation: 'Input validation failed - vowel must be a non-empty string',
        educationalNote: 'प्रविष्टि परीक्षा विफलता (Input validation failure)'
      }
    };
  }

  try {
    const script = detectScript(vowel);
    const normalizedVowel = vowel.trim();
    
    // Educational analysis object
    const analysis = {
      vowel: normalizedVowel,
      script: script,
      sutraApplied: '1.1.1',
      rule: 'वृद्धिरादैच्',
      meaning: 'The vowels आ (ā), ऐ (ai), and औ (au) are called vṛddhi',
      
      traditionalCommentary: {
        primary: 'आकारैकारौकारा वृद्धिसंज्ञा भवन्ति। आदैचित्यत्र आत्प्रत्याहारः ऐचित्यत्र ऐच्प्रत्याहारः।',
        explanation: 'The vowels ā, ai, and au receive the designation वृद्धि (vṛddhi). Here आत् is a pratyāhāra (abbreviated form) for ā, and ऐच् is a pratyāhāra for ai and au.',
        authorityReference: 'महाभाष्य व सिद्धान्तकौमुदी - Mahābhāṣya and Siddhāntakaumudī',
        technicalPrinciple: 'प्रत्याहारविधि - Pratyāhāra formation principle'
      },
      
      modernExplanation: {
        grammaticalContext: 'Foundational vowel classification for Sanskrit morphology',
        phoneticReasoning: 'Establishes the longest and most complex vowel category',
        functionalPurpose: 'Essential for vowel gradation (guṇa/vṛddhi) and morphophonemic operations',
        linguisticSignificance: 'Creates the hierarchical vowel system: simple → guṇa → vṛddhi',
        systematicImportance: 'Foundation for all derivative word formation in Sanskrit'
      },
      
      vrddhiPrinciples: {
        definition: 'वृद्धि (vṛddhi) - The highest grade of vowel strengthening',
        members: ['आ (ā)', 'ऐ (ai)', 'औ (au)'],
        systematicPosition: 'Highest level in the vowel gradation hierarchy',
        morphologicalFunction: 'Used in derivative formations and secondary suffixes'
      },
      
      vowelClassification: {
        'आ (ā)': {
          type: 'simple_vrddhi',
          position: 'गुत्तुरल् (guttural)',
          gradation: 'अ → आ (a → ā)',
          examples: ['कार (kāra)', 'नाम (nāma)', 'आकाश (ākāśa)']
        },
        'ऐ (ai)': {
          type: 'compound_vrddhi', 
          position: 'गुत्तुरल्-पलतल् (guttural-palatal)',
          gradation: 'इ → ए → ऐ (i → e → ai)',
          examples: ['वैद्य (vaidya)', 'सैन्य (sainya)', 'कैशोर (kaiśora)']
        },
        'औ (au)': {
          type: 'compound_vrddhi',
          position: 'गुत्तुरल्-ओष्ठ्य (guttural-labial)', 
          gradation: 'उ → ओ → औ (u → o → au)',
          examples: ['गौर (gaura)', 'मौन (mauna)', 'वैधव्य (vaidhavya)']
        }
      },
      
      examples: {
        derivativeFormations: [
          { base: 'कृ (kṛ)', vrddhi: 'कार (kāra)', meaning: 'action, doing' },
          { base: 'वेद (veda)', vrddhi: 'वैदिक (vaidika)', meaning: 'relating to Vedas' },
          { base: 'गो (go)', vrddhi: 'गौ (gau)', meaning: 'relating to cows' }
        ],
        morphologicalApplications: [
          { operation: 'तद्धित प्रत्यय (taddhita)', example: 'देव → दैव (deva → daiva)' },
          { operation: 'वृद्धि संधि (vṛddhi sandhi)', example: 'राम + अयन → रामायण (rāma + ayana → rāmāyaṇa)' },
          { operation: 'गुणवृद्धि (guṇavṛddhi)', example: 'इक् वर्ण का वृद्धि रूप' }
        ]
      },
      
      relatedSutras: {
        following: ['1.1.2 (गुण definition)', '1.1.3 (इको गुणवृद्धी)'],
        applications: ['Taddhita pratyayas', 'Vowel sandhi', 'Derivative word formation'],
        systematicRole: 'Foundational classification for entire vowel system'
      }
    };

    // Determine if vowel is vṛddhi
    const isVrddhiVowel = isVrddhi(normalizedVowel);
    const category = vowelCategoryMap[normalizedVowel] || null;
    let detailedReasoning, vrddhiType;
    
    if (isVrddhiVowel) {
      switch (normalizedVowel) {
        case 'आ': case 'ā':
          vrddhiType = 'simple_vrddhi';
          detailedReasoning = 'मूल वृद्धि स्वर - Primary vṛddhi vowel (गुत्तुरल् केन्द्रीय)';
          break;
        case 'ऐ': case 'ai':
          vrddhiType = 'compound_vrddhi';
          detailedReasoning = 'संयुक्त वृद्धि स्वर - Compound vṛddhi vowel (अ + इ = ऐ)';
          break;
        case 'औ': case 'au':
          vrddhiType = 'compound_vrddhi';
          detailedReasoning = 'संयुक्त वृद्धि स्वर - Compound vṛddhi vowel (अ + उ = औ)';
          break;
        default:
          vrddhiType = 'unknown';
          detailedReasoning = 'अस्पष्ट वृद्धि प्रकार - Unclear vṛddhi type';
      }
    } else {
      detailedReasoning = 'न वृद्धिः - Not a vṛddhi vowel per sūtra 1.1.1';
      vrddhiType = null;
    }

    return {
      isVrddhi: isVrddhiVowel,
      sutraApplied: '1.1.1',
      confidence: 1.0,
      analysis: {
        ...analysis,
        result: isVrddhiVowel ? 'वृद्धि स्वर (vṛddhi vowel)' : 'अवृद्धि स्वर (non-vṛddhi vowel)',
        detailedReasoning: detailedReasoning,
        vrddhiType: vrddhiType,
        category: category,
        vowelClassification: {
          grade: isVrddhiVowel ? 'vṛddhi_grade' : 'other_grade',
          systematicPosition: isVrddhiVowel ? 'Highest vowel grade' : 'Lower than vṛddhi grade',
          morphologicalImplication: isVrddhiVowel ? 'Can form derivatives with vṛddhi meaning' : 'Requires vṛddhi strengthening for derivatives'
        },
        educationalNote: isVrddhiVowel ? 
          'Vṛddhi vowels form the foundation of Sanskrit derivative morphology' :
          'Non-vṛddhi vowels may undergo guṇa/vṛddhi strengthening in morphological operations'
      }
    };
    
  } catch (error) {
    return {
      isVrddhi: false,
      sutraApplied: '1.1.1',
      confidence: 0.0,
      analysis: {
        error: error.message,
        traditionalCommentary: 'दोषः उत्पन्नः',
        modernExplanation: 'Processing error occurred during vṛddhi analysis',
        educationalNote: 'विश्लेषणे त्रुटिः (Analysis error)'
      }
    };
  }
}

/**
 * Legacy function for backward compatibility
 * Applies Sutra 1.1.1 to classify a given vowel according to vṛddhi definition.
 *
 * @param {string} vowel The vowel to classify.
 * @returns {Object} Classification result with detailed analysis.
 */
function applySutra111(vowel) {
  const analysis = analyzeVowel(vowel);
  
  return {
    input: vowel,
    sutraApplied: '1.1.1',
    sutraName: 'vṛddhirādaic',
    classification: analysis.isVrddhi ? 'vṛddhi' : 'non-vṛddhi',
    isVrddhi: analysis.isVrddhi,
    category: analysis.category,
    script: analysis.script,
    explanation: analysis.explanation,
    traditionalDefinition: 'ā, ai, au are called vṛddhi vowels',
    examples: {
      'ā': ['kāraḥ (कारः) - action', 'nāma (नाम) - name'],
      'ai': ['vaidya (वैद्य) - physician', 'saika (सैक) - collection'],
      'au': ['gaura (गौर) - fair', 'mauna (मौन) - silence']
    }[analysis.category] || []
  };
}

export {
  isVrddhi,
  vrddhiVowels,
  vrddhiVowelsDevanagari,
  getAllVrddhiVowels,
  analyzeVowel,
  applySutra111,  // Legacy function for backward compatibility
  sutra111        // New Phase 3 comprehensive function
};
