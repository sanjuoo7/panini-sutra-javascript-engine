/**
 * Sutra 1.1.8: मुखनासिकावचनो'नुनासिकः
 * "A sound pronounced through both mouth and nose is called anunāsika"
 * 
 * This foundational sutra defines the technical term 'anunāsika' for nasal sounds.
 * It establishes that sounds requiring simultaneous oral and nasal airflow
 * receive the designation अनुनासिक (anunāsika).
 */

import { Phoneme } from '../sanskrit-utils/phoneme.js';
import { detectScript, normalizeScript, validateSanskritWord } from '../sanskrit-utils/index.js';

// Comprehensive anunāsika phoneme data
const ANUNASIKA_PHONEMES = {
  devanagari: ['ङ्', 'ञ्', 'ण्', 'न्', 'म्', 'ङ', 'ञ', 'ण', 'न', 'म', 'ं'],
  iast: ['ṅ', 'ñ', 'ṇ', 'n', 'm', 'ṃ']
};

// Articulatory classification data
const ARTICULATION_DATA = {
  'ङ': { place: 'कण्ठ (kaṇṭha)', manner: 'स्पर्श (sparśa)', class: 'कवर्ग (kavarga)' },
  'ञ': { place: 'तालु (tālu)', manner: 'स्पर्श (sparśa)', class: 'चवर्ग (cavarga)' },
  'ण': { place: 'मूर्धा (mūrdhā)', manner: 'स्पर्श (sparśa)', class: 'टवर्ग (ṭavarga)' },
  'न': { place: 'दन्त (danta)', manner: 'स्पर्श (sparśa)', class: 'तवर्ग (tavarga)' },
  'म': { place: 'ओष्ठ (oṣṭha)', manner: 'स्पर्श (sparśa)', class: 'पवर्ग (pavarga)' },
  'ं': { place: 'अनुस्वार (anusvāra)', manner: 'अनुनासिक (anunāsika)', class: 'विशेष (viśeṣa)' }
};

/**
 * Main educational analysis function - Core sutra implementation
 * 
 * @param {string} phoneme - The phoneme to analyze for anunāsika classification
 * @param {Object} context - Additional context for analysis
 * @returns {Object} - Comprehensive educational analysis object
 */
export function sutra118(phoneme, context = {}) {
  // Input validation and normalization
  if (!phoneme || typeof phoneme !== 'string') {
    return {
      isAnunasika: false,
      sutraApplied: '1.1.8',
      confidence: 0.0,
      analysis: {
        error: 'Invalid input',
        traditionalCommentary: 'अशुद्धं पदम्',
        modernExplanation: 'Input validation failed - phoneme must be a non-empty string',
        educationalNote: 'प्रविष्टि परीक्षा विफलता (Input validation failure)'
      }
    };
  }

  try {
    const script = detectScript(phoneme);
    const normalizedPhoneme = normalizeScript(phoneme);
    
    // Educational analysis object
    const analysis = {
      phoneme: phoneme,
      script: script,
      sutraApplied: '1.1.8',
      rule: 'मुखनासिकावचनो\'नुनासिकः',
      meaning: 'A sound pronounced through both mouth and nose is anunāsika',
      
      traditionalCommentary: {
        primary: 'मुखेन नासिकया च उच्चार्यमाणो वर्णो अनुनासिक इत्युच्यते। द्विमार्गेण प्राणवायोः निर्गमनम्।',
        explanation: 'A sound articulated through both mouth (मुख) and nose (नासिका) is termed anunāsika. This requires airflow through two channels simultaneously.',
        authorityReference: 'व्याकरणमहाभाष्यम् - Mahābhāṣya commentary on fundamental phoneme classification',
        phoneticPrinciple: 'द्विमार्गीय प्राणप्रवाह - Dual-channel airflow principle'
      },
      
      modernExplanation: {
        grammaticalContext: 'Foundational phoneme classification for Sanskrit sound system',
        phoneticReasoning: 'Defines nasality as simultaneous oral and nasal articulation',
        functionalPurpose: 'Essential for distinguishing nasal consonants and anusvāra',
        linguisticSignificance: 'Establishes basis for all nasal sound operations in Sanskrit grammar',
        articulatoryMechanism: 'Requires lowered velum allowing nasal cavity resonance'
      },
      
      phoneticAnalysis: {
        articulatoryProcess: 'Simultaneous oral and nasal airflow during sound production',
        anatomicalRequirement: 'Lowered soft palate (velum) for nasal cavity access',
        acousticProperties: 'Additional nasal resonance modifying oral sound quality',
        distinctiveFeature: '[+nasal] in phonological feature system'
      },
      
      examples: {
        devanagari: [
          { phoneme: 'ङ्', type: 'कवर्ग nasal', place: 'कण्ठ (velar)', word: 'अङ्गम्', meaning: 'limb' },
          { phoneme: 'ञ्', type: 'चवर्ग nasal', place: 'तालु (palatal)', word: 'यज्ञ', meaning: 'sacrifice' },
          { phoneme: 'ण्', type: 'टवर्ग nasal', place: 'मूर्धा (retroflex)', word: 'गुण', meaning: 'quality' },
          { phoneme: 'न्', type: 'तवर्ग nasal', place: 'दन्त (dental)', word: 'नाम', meaning: 'name' },
          { phoneme: 'म्', type: 'पवर्ग nasal', place: 'ओष्ठ (labial)', word: 'माम', meaning: 'me' },
          { phoneme: 'ं', type: 'अनुस्वार', place: 'universal', word: 'संस्कृत', meaning: 'Sanskrit' }
        ],
        iast: [
          { phoneme: 'ṅ', type: 'kavarga nasal', place: 'velar', word: 'aṅgam', meaning: 'limb' },
          { phoneme: 'ñ', type: 'cavarga nasal', place: 'palatal', word: 'yajña', meaning: 'sacrifice' },
          { phoneme: 'ṇ', type: 'ṭavarga nasal', place: 'retroflex', word: 'guṇa', meaning: 'quality' },
          { phoneme: 'n', type: 'tavarga nasal', place: 'dental', word: 'nāma', meaning: 'name' },
          { phoneme: 'm', type: 'pavarga nasal', place: 'labial', word: 'mām', meaning: 'me' },
          { phoneme: 'ṃ', type: 'anusvāra', place: 'universal', word: 'saṃskṛta', meaning: 'Sanskrit' }
        ],
        counterExamples: [
          { phoneme: 'क', reason: 'Oral stop - no nasal airflow', classification: 'अननुनासिक' },
          { phoneme: 'त', reason: 'Oral stop - no nasal airflow', classification: 'अननुनासिक' },
          { phoneme: 'प', reason: 'Oral stop - no nasal airflow', classification: 'अननुनासिक' }
        ]
      },
      
      articulationMatrix: {
        places: {
          कण्ठ: { anunasika: 'ङ्', oral: ['क्', 'ख्', 'ग्', 'घ्'] },
          तालु: { anunasika: 'ञ्', oral: ['च्', 'छ्', 'ज्', 'झ्'] },
          मूर्धा: { anunasika: 'ण्', oral: ['ट्', 'ठ्', 'ड्', 'ढ्'] },
          दन्त: { anunasika: 'न्', oral: ['त्', 'थ्', 'द्', 'ध्'] },
          ओष्ठ: { anunasika: 'म्', oral: ['प्', 'फ्', 'ब्', 'भ्'] }
        },
        systematicPattern: 'Each consonant series (वर्ग) has exactly one anunāsika member'
      },
      
      relatedSutras: {
        preceding: ['1.1.7 (संयोग definition)', '1.1.6 (IT marker rules)'],
        following: ['1.1.9 (सवर्ण definition)', '1.1.10 (अच्-हल् prohibition)'],
        crossReferences: ['8.4.58 (Anusvāra rules)', '1.3.2 (IT marker designation)'],
        integrationNote: 'Foundation for all nasal consonant operations and anusvāra placement rules'
      }
    };

    // Determine if phoneme is anunāsika
    let isAnunasika = false;
    let detailedReasoning = '';
    let articulationDetails = null;
    
    try {
      // Primary classification method using phoneme object
      const phonemeObj = new Phoneme(phoneme);
      isAnunasika = phonemeObj.isAnunasika();
    } catch (error) {
      // Fallback method: Direct lookup
      isAnunasika = ANUNASIKA_PHONEMES.devanagari.includes(phoneme) || 
                    ANUNASIKA_PHONEMES.iast.includes(phoneme) ||
                    ANUNASIKA_PHONEMES.iast.includes(normalizedPhoneme);
    }
    
    // Get articulation details
    const phonemeKey = script === 'devanagari' ? phoneme : normalizedPhoneme;
    articulationDetails = ARTICULATION_DATA[phonemeKey];
    
    if (isAnunasika) {
      detailedReasoning = 'मुखनासिकावचनः - Requires simultaneous oral and nasal airflow during articulation';
    } else {
      detailedReasoning = 'केवलमुखोच्चारणम् - Articulated only through oral cavity without nasal resonance';
    }

    return {
      isAnunasika: isAnunasika,
      sutraApplied: '1.1.8',
      confidence: 1.0,
      analysis: {
        ...analysis,
        result: isAnunasika ? 'अनुनासिक (anunāsika)' : 'अननुनासिक (not anunāsika)',
        detailedReasoning: detailedReasoning,
        phoneticClassification: {
          nasality: isAnunasika ? 'nasal' : 'oral',
          articulatoryDetails: articulationDetails || 'Not found in classification matrix',
          phoneticFeatures: isAnunasika ? '[+nasal, +consonantal]' : '[−nasal]',
          functionalRole: isAnunasika ? 'Nasal stop in consonant series' : 'Oral consonant or vowel'
        },
        educationalNote: isAnunasika ? 
          'Anunāsika phonemes form the nasal component of each consonant series (वर्ग)' :
          'Non-anunāsika sounds are articulated without nasal cavity involvement'
      }
    };
    
  } catch (error) {
    return {
      isAnunasika: false,
      sutraApplied: '1.1.8',
      confidence: 0.0,
      analysis: {
        error: error.message,
        traditionalCommentary: 'दोषः उत्पन्नः',
        modernExplanation: 'Processing error occurred during phonetic analysis',
        educationalNote: 'विश्लेषणे त्रुटिः (Analysis error)'
      }
    };
  }
}

// Maintain backward compatibility
export function isAnunasika(char) {
  const result = sutra118(char);
  return result.isAnunasika;
}

export default sutra118;