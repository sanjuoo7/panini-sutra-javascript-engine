
/**
 * Sutra 1.1.9: तुल्यास्यप्रयत्नं सवर्णम्
 * "Phonemes having the same place of articulation and manner of effort are savarṇa"
 * 
 * This crucial sutra defines homogeneity (savarṇatva) in Sanskrit phonology.
 * Two sounds are सवर्ण (savarṇa) if they share identical articulatory properties:
 * 1. आस्य (āsya) - place of articulation
 * 2. प्रयत्न (prayatna) - manner of effort/articulation
 */

import { Phoneme } from '../sanskrit-utils/phoneme.js';
import { detectScript, normalizeScript, validateSanskritWord } from '../sanskrit-utils/index.js';

// Comprehensive savarṇa classification data
const SAVARNA_GROUPS = {
  'अ_वर्ग': ['अ', 'आ'], // short and long 'a'
  'इ_वर्ग': ['इ', 'ई'], // short and long 'i'  
  'उ_वर्ग': ['उ', 'ऊ'], // short and long 'u'
  'ऋ_वर्ग': ['ऋ', 'ॠ'], // short and long 'ṛ'
  'ऌ_वर्ग': ['ऌ', 'ॡ'], // short and long 'ḷ'
  'क_वर्ग': ['क', 'ख', 'ग', 'घ', 'ङ'], // kavarga
  'च_वर्ग': ['च', 'छ', 'ज', 'झ', 'ञ'], // cavarga
  'ट_वर्ग': ['ट', 'ठ', 'ड', 'ढ', 'ण'], // ṭavarga
  'त_वर्ग': ['त', 'थ', 'द', 'ध', 'न'], // tavarga
  'प_वर्ग': ['प', 'फ', 'ब', 'भ', 'म']  // pavarga
};

// Detailed articulatory properties
const ARTICULATION_PROPERTIES = {
  'अ': { place: 'कण्ठ', manner: 'विवृत', type: 'स्वर', duration: 'ह्रस्व' },
  'आ': { place: 'कण्ठ', manner: 'विवृत', type: 'स्वर', duration: 'दीर्घ' },
  'इ': { place: 'तालु', manner: 'संवृत', type: 'स्वर', duration: 'ह्रस्व' },
  'ई': { place: 'तालु', manner: 'संवृत', type: 'स्वर', duration: 'दीर्घ' },
  'उ': { place: 'ओष्ठ', manner: 'संवृत', type: 'स्वर', duration: 'ह्रस्व' },
  'ऊ': { place: 'ओष्ठ', manner: 'संवृत', type: 'स्वर', duration: 'दीर्घ' },
  'क': { place: 'कण्ठ', manner: 'स्पर्श_अघोष_अल्पप्राण', type: 'व्यञ्जन', class: 'कवर्ग' },
  'ख': { place: 'कण्ठ', manner: 'स्पर्श_अघोष_महाप्राण', type: 'व्यञ्जन', class: 'कवर्ग' },
  'ग': { place: 'कण्ठ', manner: 'स्पर्श_घोष_अल्पप्राण', type: 'व्यञ्जन', class: 'कवर्ग' },
  'घ': { place: 'कण्ठ', manner: 'स्पर्श_घोष_महाप्राण', type: 'व्यञ्जन', class: 'कवर्ग' },
  'ङ': { place: 'कण्ठ', manner: 'अनुनासिक', type: 'व्यञ्जन', class: 'कवर्ग' }
};

/**
 * Main educational analysis function - Core sutra implementation
 * 
 * @param {string} phoneme1 - First phoneme to compare
 * @param {string} phoneme2 - Second phoneme to compare  
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive educational analysis object
 */
export function sutra119(phoneme1, phoneme2, context = {}) {
  // Input validation and normalization
  if (!phoneme1 || !phoneme2 || typeof phoneme1 !== 'string' || typeof phoneme2 !== 'string') {
    return {
      areSavarna: false,
      sutraApplied: '1.1.9',
      confidence: 0.0,
      analysis: {
        error: 'Invalid input',
        traditionalCommentary: 'अशुद्धे पदे',
        modernExplanation: 'Input validation failed - both phonemes must be non-empty strings',
        educationalNote: 'प्रविष्टि परीक्षा विफलता (Input validation failure)'
      }
    };
  }

  try {
    const script1 = detectScript(phoneme1);
    const script2 = detectScript(phoneme2);
    const normalized1 = normalizeScript(phoneme1);
    const normalized2 = normalizeScript(phoneme2);
    
    // Educational analysis object
    const analysis = {
      phonemes: { first: phoneme1, second: phoneme2 },
      scripts: { first: script1, second: script2 },
      sutraApplied: '1.1.9',
      rule: 'तुल्यास्यप्रयत्नं सवर्णम्',
      meaning: 'Phonemes with identical place and manner of articulation are savarṇa',
      
      traditionalCommentary: {
        primary: 'तुल्यं समानमास्यं मुखस्थानं प्रयत्नश्च यत्नो येषां ते सवर्णाः। समानोच्चारणस्थानप्रयत्नवन्तः।',
        explanation: 'Phonemes sharing identical आस्य (place of articulation in mouth) and प्रयत्न (articulatory effort/manner) are designated as सवर्ण (homogeneous).',
        authorityReference: 'पाणिनीयशिक्षा व महाभाष्यम् - Traditional phonetic treatises and Mahābhāṣya',
        technicalPrinciple: 'स्थानप्रयत्नसाम्य - Principle of articulatory identity'
      },
      
      modernExplanation: {
        grammaticalContext: 'Fundamental phonemic classification for Sanskrit morphophonology',
        phoneticReasoning: 'Defines phonemic equivalence based on articulatory features',
        functionalPurpose: 'Essential for vowel gradation (guṇa/vṛddhi) and morphophonemic alternations',
        linguisticSignificance: 'Establishes phonological natural classes for grammatical operations',
        articulatoryBasis: 'Place and manner features define phonemic categories'
      },
      
      phoneticPrinciples: {
        placeRequirement: 'आस्य (āsya) - Identical place of articulation required',
        mannerRequirement: 'प्रयत्न (prayatna) - Identical manner of articulation required',
        dualCondition: 'Both conditions must be satisfied simultaneously',
        systematicOrganization: 'Creates natural phonemic classes (वर्ग) in Sanskrit'
      },
      
      savarnaGroups: {
        vowelGroups: {
          'अ-वर्ग': { members: ['अ', 'आ'], place: 'कण्ठ', feature: 'low_central' },
          'इ-वर्ग': { members: ['इ', 'ई'], place: 'तालु', feature: 'high_front' },
          'उ-वर्ग': { members: ['उ', 'ऊ'], place: 'ओष्ठ', feature: 'high_back' },
          'ऋ-वर्ग': { members: ['ऋ', 'ॠ'], place: 'मूर्धा', feature: 'rhotic_vowel' }
        },
        consonantGroups: {
          'क-वर्ग': { members: ['क्', 'ख्', 'ग्', 'घ्', 'ङ्'], place: 'कण्ठ', type: 'velar_series' },
          'च-वर्ग': { members: ['च्', 'छ्', 'ज्', 'झ्', 'ञ्'], place: 'तालु', type: 'palatal_series' },
          'ट-वर्ग': { members: ['ट्', 'ठ्', 'ड्', 'ढ्', 'ण्'], place: 'मूर्धा', type: 'retroflex_series' },
          'त-वर्ग': { members: ['त्', 'थ्', 'द्', 'ध्', 'न्'], place: 'दन्त', type: 'dental_series' },
          'प-वर्ग': { members: ['प्', 'फ्', 'ब्', 'भ्', 'म्'], place: 'ओष्ठ', type: 'labial_series' }
        }
      },
      
      examples: {
        savarnaVowels: [
          { pair: ['अ', 'आ'], reason: 'Same place (कण्ठ) and manner (विवृत)', operation: 'guṇa/vṛddhi base' },
          { pair: ['इ', 'ई'], reason: 'Same place (तालु) and manner (संवृत)', operation: 'guṇa → ए' },
          { pair: ['उ', 'ऊ'], reason: 'Same place (ओष्ठ) and manner (संवृत)', operation: 'guṇa → ओ' }
        ],
        savarnaConsonants: [
          { pair: ['क्', 'ग्'], reason: 'Same place (कण्ठ) and manner (स्पर्श)', operation: 'voicing alternation' },
          { pair: ['त्', 'द्'], reason: 'Same place (दन्त) and manner (स्पर्श)', operation: 'voicing alternation' },
          { pair: ['प्', 'ब्'], reason: 'Same place (ओष्ठ) and manner (स्पर्श)', operation: 'voicing alternation' }
        ],
        nonSavarnaExamples: [
          { pair: ['क्', 'च्'], reason: 'Different places: कण्ठ vs तालु', result: 'असवर्ण' },
          { pair: ['क्', 'अ'], reason: 'Different types: consonant vs vowel (see 1.1.10)', result: 'असवर्ण' }
        ]
      },
      
      articulatoryMatrix: {
        places: ['कण्ठ', 'तालु', 'मूर्धा', 'दन्त', 'ओष्ठ'],
        manners: ['स्पर्श', 'ऊष्म', 'अन्तस्थ', 'स्वर'],
        principle: 'Phonemes sharing both place and manner form savarṇa classes'
      },
      
      relatedSutras: {
        preceding: ['1.1.8 (अनुनासिक definition)', '1.1.7 (संयोग definition)'],
        following: ['1.1.10 (अच्-हल् prohibition)', '1.1.11 (प्रगृह्य definition)'],
        applications: ['1.1.2 (गुण definition)', '1.1.3 (इको गुणवृद्धी)', '7.4.25 (अकः सवर्णे दीर्घः)'],
        integrationNote: 'Foundation for all morphophonemic operations in Sanskrit grammar'
      }
    };

    // Determine if phonemes are savarṇa
    let areSavarna = false;
    let detailedReasoning = '';
    let savarnaGroup = null;
    let articulationComparison = null;
    
    try {
      // Primary method: Use Phoneme class for detailed analysis
      const phonemeObj1 = new Phoneme(phoneme1);
      const phonemeObj2 = new Phoneme(phoneme2);
      
      // Check 1.1.10 prohibition first (no savarṇa between vowels and consonants)
      if (phonemeObj1.type !== phonemeObj2.type) {
        areSavarna = false;
        detailedReasoning = 'सूत्र १.१.१० नाज्झलौ - Vowels and consonants cannot be savarṇa (see 1.1.10)';
      } else {
        // Check place and manner identity
        const placeMatch = phonemeObj1.placeOfArticulation === phonemeObj2.placeOfArticulation;
        const mannerMatch = phonemeObj1.mannerOfArticulation === phonemeObj2.mannerOfArticulation;
        
        areSavarna = placeMatch && mannerMatch;
        
        if (areSavarna) {
          detailedReasoning = `तुल्यास्यप्रयत्नत्वात् - Same place (${phonemeObj1.placeOfArticulation}) and manner (${phonemeObj1.mannerOfArticulation})`;
        } else {
          if (!placeMatch) {
            detailedReasoning = `विभिन्नास्य - Different places: ${phonemeObj1.placeOfArticulation} vs ${phonemeObj2.placeOfArticulation}`;
          } else {
            detailedReasoning = `विभिन्नप्रयत्न - Different manners: ${phonemeObj1.mannerOfArticulation} vs ${phonemeObj2.mannerOfArticulation}`;
          }
        }
        
        articulationComparison = {
          place: { first: phonemeObj1.placeOfArticulation, second: phonemeObj2.placeOfArticulation, match: placeMatch },
          manner: { first: phonemeObj1.mannerOfArticulation, second: phonemeObj2.mannerOfArticulation, match: mannerMatch },
          type: { first: phonemeObj1.type, second: phonemeObj2.type, match: phonemeObj1.type === phonemeObj2.type }
        };
      }
    } catch (error) {
      // Fallback method: Direct group lookup
      for (const [groupName, groupData] of Object.entries(analysis.savarnaGroups.vowelGroups)) {
        if (groupData.members.includes(phoneme1) && groupData.members.includes(phoneme2)) {
          areSavarna = true;
          savarnaGroup = groupName;
          detailedReasoning = `${groupName} सदस्यत्वात् - Both belong to ${groupName} vowel group`;
          break;
        }
      }
      
      if (!areSavarna) {
        for (const [groupName, groupData] of Object.entries(analysis.savarnaGroups.consonantGroups)) {
          if (groupData.members.includes(phoneme1) && groupData.members.includes(phoneme2)) {
            areSavarna = true;
            savarnaGroup = groupName;
            detailedReasoning = `${groupName} सदस्यत्वात् - Both belong to ${groupName} consonant group`;
            break;
          }
        }
      }
      
      if (!areSavarna) {
        detailedReasoning = 'न सवर्णौ - No shared savarṇa group found';
      }
    }

    return {
      areSavarna: areSavarna,
      sutraApplied: '1.1.9',
      confidence: 1.0,
      analysis: {
        ...analysis,
        result: areSavarna ? 'सवर्ण (savarṇa)' : 'असवर्ण (not savarṇa)',
        detailedReasoning: detailedReasoning,
        savarnaGroup: savarnaGroup,
        articulatoryComparison: articulationComparison,
        phoneticClassification: {
          relationship: areSavarna ? 'homogeneous' : 'heterogeneous',
          grammaticalImplication: areSavarna ? 'Can undergo morphophonemic operations' : 'No direct morphophonemic relationship',
          systematicPosition: savarnaGroup ? `Member of ${savarnaGroup}` : 'No shared classification'
        },
        educationalNote: areSavarna ? 
          'Savarṇa phonemes can participate in morphophonemic alternations like guṇa and vṛddhi' :
          'Non-savarṇa phonemes do not undergo systematic morphophonemic operations together'
      }
    };
    
  } catch (error) {
    return {
      areSavarna: false,
      sutraApplied: '1.1.9',
      confidence: 0.0,
      analysis: {
        error: error.message,
        traditionalCommentary: 'दोषः उत्पन्नः',
        modernExplanation: 'Processing error occurred during savarṇa analysis',
        educationalNote: 'विश्लेषणे त्रुटिः (Analysis error)'
      }
    };
  }
}

// Maintain backward compatibility
export function isSavarna(char1, char2) {
  const result = sutra119(char1, char2);
  return result.areSavarna;
}

export default sutra119;