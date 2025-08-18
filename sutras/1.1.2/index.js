/**
 * Sutra 1.1.2: अदेङ् गुणः (adeṅ guṇaḥ)
 *
 * This sutra defines the term "guṇa". It states that the vowels a (अ), e (ए), and o (ओ) are called guṇa.
 * In Pāṇini's system, "aT" (अत्) refers to "a" and "eṅ" (एঙ্) is a pratyāhāra (abbreviation)
 * that includes the vowels "e" (ए) and "o" (ও).
 */

// Import shared utilities
import { SanskritVowels } from '../sanskrit-utils/constants.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { isGuna as sharedIsGuna, getVowelClassifications } from '../sanskrit-utils/classification.js';
import { analyzeVowel as sharedAnalyzeVowel } from '../sanskrit-utils/vowel-analysis.js';
import { validateVowel } from '../sanskrit-utils/validation.js';

// Re-export isGuna for backward compatibility
export { isGuna } from '../sanskrit-utils/classification.js';

/**
 * Gets all guṇa vowels in both IAST and Devanagari scripts.
 *
 * @returns {Object} Object containing IAST and Devanagari guṇa vowels.
 */
function getAllGunaVowels() {
  return {
    iast: [...SanskritVowels.guna.iast],
    devanagari: [...SanskritVowels.guna.devanagari],
    combined: [...SanskritVowels.guna.iast, ...SanskritVowels.guna.devanagari]
  };
}

/**
 * Analyzes a vowel and provides detailed information about its guṇa status.
 * Enhanced version using shared utilities for better cross-sutra compatibility.
 *
 * @param {string} vowel The vowel to analyze.
 * @returns {Object} Analysis object with detailed information.
 */
function analyzeVowel(vowel) {
  // Use shared validation first
  const validation = validateVowel(vowel);
  if (!validation.isValid) {
    return {
      vowel: null,
      isValid: false,
      isGuna: false,
      script: null,
      category: null,
      explanation: validation.error
    };
  }

  // Use shared analysis with guṇa-specific enhancements
  const sharedAnalysis = sharedAnalyzeVowel(vowel);
  const isGunaVowel = sharedIsGuna(vowel);
  
  // Determine specific guṇa category
  let category = null;
  if (vowel === 'a' || vowel === 'अ') category = 'basic-a';
  else if (vowel === 'e' || vowel === 'ए') category = 'front-mid';
  else if (vowel === 'o' || vowel === 'ও') category = 'back-mid';

  return {
    vowel: vowel,
    isValid: true,
    isGuna: isGunaVowel,
    script: sharedAnalysis.script,
    category: category,
    classifications: sharedAnalysis.classifications,
    explanation: isGunaVowel ? 
      `${vowel} is a guṇa vowel (${category})` : 
      `${vowel} is not a guṇa vowel`,
    sharedAnalysis: sharedAnalysis // Include comprehensive analysis
  };
}

/**
 * Main educational analysis function - Core sutra implementation
 * 
 * @param {string} vowel - Vowel to analyze for guṇa classification
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive educational analysis object
 */
function sutra112(vowel, context = {}) {
  // Input validation and normalization
  if (!vowel || typeof vowel !== 'string' || vowel.trim() === '') {
    return {
      isGuna: false,
      sutraApplied: '1.1.2',
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
      sutraApplied: '1.1.2',
      rule: 'अदेङ् गुणः',
      meaning: 'The vowels अ (a), ए (e), and ओ (o) are called guṇa',
      
      traditionalCommentary: {
        primary: 'अकारएकारओकारा गुणसंज्ञा भवन्ति। अदेङ्गुणः इत्यत्र अत्प्रत्याहारेण अकारः, एङ्प्रत्याहारेण एकारोकारौ गृह्येते।',
        explanation: 'The vowels a, e, and o receive the designation गुण (guṇa). Here अत् is a pratyāhāra for a, and एङ् is a pratyāhāra for e and o.',
        authorityReference: 'महाभाष्य व काशिकावृत्ति - Mahābhāṣya and Kāśikāvṛtti',
        technicalPrinciple: 'गुणवृद्धिप्रक्रिया - Guṇa-vṛddhi process foundation'
      },
      
      modernExplanation: {
        grammaticalContext: 'Intermediate vowel grade in Sanskrit morphology',
        phoneticReasoning: 'Establishes the middle level of vowel strengthening',
        functionalPurpose: 'Essential for primary derivations and morphophonemic operations',
        linguisticSignificance: 'Creates systematic vowel gradation: simple → guṇa → vṛddhi',
        systematicImportance: 'Foundation for primary word formation and phonological processes'
      },
      
      gunaPrinciples: {
        definition: 'गुण (guṇa) - The middle grade of vowel strengthening',
        members: ['अ (a)', 'ए (e)', 'ओ (o)'],
        systematicPosition: 'Middle level in the vowel gradation hierarchy',
        morphologicalFunction: 'Used in primary formations and root modifications'
      },
      
      vowelClassification: {
        'अ (a)': {
          type: 'central_guna',
          position: 'केन्द्रीय (central)',
          gradation: 'zero → अ (zero → a)',
          examples: ['अग्नि (agni)', 'अर्थ (artha)', 'अक्षि (akṣi)']
        },
        'ए (e)': {
          type: 'front_guna',
          position: 'पुरोगामी (front)',
          gradation: 'इ → ए (i → e)',
          examples: ['एक (eka)', 'एव (eva)', 'एष (eṣa)']
        },
        'ओ (o)': {
          type: 'back_guna',
          position: 'पश्चगामी (back)',
          gradation: 'उ → ओ (u → o)',
          examples: ['ओजस् (ojas)', 'ओम् (om)', 'ओक (oka)']
        }
      },
      
      examples: {
        rootTransformations: [
          { base: 'कृ (kṛ)', guna: 'कर (kar)', meaning: 'root → guṇa form' },
          { base: 'भिद् (bhid)', guna: 'भेद (bhed)', meaning: 'root strengthening' },
          { base: 'युज् (yuj)', guna: 'योग (yog)', meaning: 'vowel gradation' }
        ],
        morphologicalApplications: [
          { operation: 'धातु गुण (dhātu guṇa)', example: 'दिव् → देव (div → deva)' },
          { operation: 'प्रत्यय गुण (pratyaya guṇa)', example: 'कृ + अ → कर (kṛ + a → kar)' },
          { operation: 'संधि गुण (sandhi guṇa)', example: 'राम + इति → रामेति (rāma + iti → rāmeti)' }
        ]
      },
      
      systematicRelations: {
        vowelGradation: {
          'इ/उ (i/u)': 'simple vowels',
          'ए/ओ (e/o)': 'guṇa grade (current sutra)',
          'ऐ/औ (ai/au)': 'vṛddhi grade (1.1.1)'
        },
        integrationWith111: 'गुण forms the intermediate step between simple and vṛddhi vowels',
        hierarchicalPosition: 'Second level in the three-tier vowel system'
      },
      
      relatedSutras: {
        previous: ['1.1.1 (vṛddhi definition)'],
        following: ['1.1.3 (इको गुणवृद्धी)', '7.3.84 (सार्वधातुकार्धधातुकयोः)'],
        applications: ['Primary pratyayas', 'Root modifications', 'Phonological strengthening'],
        systematicRole: 'Intermediate classification in complete vowel system'
      }
    };

    // Determine if vowel is guṇa
    const isGunaVowel = sharedIsGuna(normalizedVowel);
    const category = ['a', 'अ'].includes(normalizedVowel) ? 'central_guna' :
                    ['e', 'ए'].includes(normalizedVowel) ? 'front_guna' :
                    ['o', 'ओ'].includes(normalizedVowel) ? 'back_guna' : null;
    
    let detailedReasoning, gunaType;
    
    if (isGunaVowel) {
      switch (normalizedVowel) {
        case 'अ': case 'a':
          gunaType = 'central_guna';
          detailedReasoning = 'केन्द्रीय गुण स्वर - Central guṇa vowel (मूल स्वरूप)';
          break;
        case 'ए': case 'e':
          gunaType = 'front_guna';
          detailedReasoning = 'पुरोगामी गुण स्वर - Front guṇa vowel (इ का गुण)';
          break;
        case 'ओ': case 'o':
          gunaType = 'back_guna';
          detailedReasoning = 'पश्चगामी गुण स्वर - Back guṇa vowel (उ का गुण)';
          break;
        default:
          gunaType = 'unknown';
          detailedReasoning = 'अस्पष्ट गुण प्रकार - Unclear guṇa type';
      }
    } else {
      detailedReasoning = 'न गुणः - Not a guṇa vowel per sūtra 1.1.2';
      gunaType = null;
    }

    return {
      isGuna: isGunaVowel,
      sutraApplied: '1.1.2',
      confidence: 1.0,
      analysis: {
        ...analysis,
        result: isGunaVowel ? 'गुण स्वर (guṇa vowel)' : 'अगुण स्वर (non-guṇa vowel)',
        detailedReasoning: detailedReasoning,
        gunaType: gunaType,
        category: category,
        vowelClassification: {
          grade: isGunaVowel ? 'guna_grade' : 'other_grade',
          systematicPosition: isGunaVowel ? 'Middle vowel grade' : 'Other than guṇa grade',
          morphologicalImplication: isGunaVowel ? 
            'Can participate in primary morphological operations' : 
            'May undergo guṇa strengthening in morphological operations'
        },
        gradationContext: {
          position: isGunaVowel ? 'Intermediate strengthening level' : 'Outside guṇa system',
          relationship: isGunaVowel ? 
            'Between simple vowels and vṛddhi grade' : 
            'May require guṇa/vṛddhi strengthening'
        },
        educationalNote: isGunaVowel ? 
          'Guṇa vowels form the foundation of primary Sanskrit morphology' :
          'Non-guṇa vowels may undergo strengthening to guṇa grade in morphological operations'
      }
    };
    
  } catch (error) {
    return {
      isGuna: false,
      sutraApplied: '1.1.2',
      confidence: 0.0,
      analysis: {
        error: error.message,
        traditionalCommentary: 'दोषः उत्पन्नः',
        modernExplanation: 'Processing error occurred during guṇa analysis',
        educationalNote: 'विश्लेषणे त्रुटिः (Analysis error)'
      }
    };
  }
}

/**
 * Applies Sutra 1.1.2 to classify a given vowel according to guṇa definition.
 * Legacy function for backward compatibility.
 *
 * @param {string} vowel The vowel to classify.
 * @returns {Object} Classification result with detailed analysis.
 */
function applySutra112(vowel) {
  const analysis = analyzeVowel(vowel);
  
  return {
    input: vowel,
    sutraApplied: '1.1.2',
    sutraName: 'adeṅ guṇaḥ',
    classification: analysis.isGuna ? 'guṇa' : 'non-guṇa',
    isGuna: analysis.isGuna,
    category: analysis.category,
    script: analysis.script,
    explanation: analysis.explanation,
    traditionalDefinition: 'a, e, o are called guṇa vowels',
    examples: {
      'basic-a': ['agni (अग्नि) - fire', 'artha (অর্থ) - meaning'],
      'front-mid': ['eka (एक) - one', 'eva (এব) - indeed'],
      'back-mid': ['ojas (ওজস্) - vigor', 'oṃ (ওং) - sacred syllable']
    }[analysis.category] || [],
    detailedAnalysis: analysis // Include full analysis for advanced usage
  };
}

// Export constants for backward compatibility
export const gunaVowels = SanskritVowels.guna.iast;
export const gunaVowelsDevanagari = SanskritVowels.guna.devanagari;

// Export functions
export {
  getAllGunaVowels,
  analyzeVowel,
  applySutra112,  // Legacy function for backward compatibility
  sutra112        // New Phase 3 comprehensive function
};
