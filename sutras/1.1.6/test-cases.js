/**
 * Test cases for Sutra 1.1.6: पूर्वोऽवरः (pūrvo'varaḥ)
 * 
 * IAST test cases focusing on precedence and ordering principles
 */

export const iastTestCases = [
  // Compound precedence examples
  { elements: ['rāma', 'sītā'], expected: true, type: 'compound', meaning: 'Rama-Sita (Rama has precedence)' },
  { elements: ['agni', 'soma'], expected: true, type: 'compound', meaning: 'Fire-Soma (Agni primary)' },
  { elements: ['indra', 'varuṇa'], expected: true, type: 'compound', meaning: 'Indra-Varuna (Indra primary)' },
  { elements: ['sūrya', 'candra'], expected: true, type: 'compound', meaning: 'Sun-Moon (Surya primary)' },
  { elements: ['mitra', 'varuṇa'], expected: true, type: 'compound', meaning: 'Mitra-Varuna (Mitra primary)' },
  
  // Rule precedence examples
  { elements: ['sutra1', 'sutra2'], expected: true, type: 'rules', meaning: 'Earlier sutra precedence' },
  { elements: ['specific', 'general'], expected: true, type: 'rules', meaning: 'Specific rule precedence' },
  { elements: ['mandatory', 'optional'], expected: true, type: 'rules', meaning: 'Mandatory rule precedence' },
  
  // Phoneme sequence examples
  { elements: 'kta', expected: true, type: 'phonemes', meaning: 'क् influences त in कत्' },
  { elements: 'pta', expected: true, type: 'phonemes', meaning: 'प् influences त in पत्' },
  { elements: 'sta', expected: true, type: 'phonemes', meaning: 'स् influences त in स्त' },
  { elements: 'gna', expected: true, type: 'phonemes', meaning: 'ग् influences न in ग्न' },
  
  // Morphological precedence
  { elements: ['dhātu', 'pratyaya'], expected: true, type: 'morphology', meaning: 'Root before suffix' },
  { elements: ['prātipadika', 'vibhakti'], expected: true, type: 'morphology', meaning: 'Stem before inflection' },
  { elements: ['upasarga', 'dhātu'], expected: true, type: 'morphology', meaning: 'Prefix before root' },
  
  // Sanskrit grammatical sequences
  { elements: ['vṛddhi', 'guṇa'], expected: true, type: 'grammar', meaning: 'Vṛddhi precedes guṇa operations' },
  { elements: ['sandhi', 'morphology'], expected: true, type: 'grammar', meaning: 'Sandhi before morphology' },
  { elements: ['pratyāhāra', 'varṇa'], expected: true, type: 'grammar', meaning: 'Abbreviation before individual sounds' },
  
  // Vedic precedence examples
  { elements: ['ṛg', 'sāman'], expected: true, type: 'vedic', meaning: 'Rig before Saman Veda' },
  { elements: ['hotṛ', 'adhvaryu'], expected: true, type: 'vedic', meaning: 'Hotr before Adhvaryu priest' },
  { elements: ['agniṣṭoma', 'vājapeya'], expected: true, type: 'vedic', meaning: 'Agnishtoma before Vajapeya ritual' },
  
  // Logical ordering
  { elements: ['kāraṇa', 'kārya'], expected: true, type: 'logic', meaning: 'Cause before effect' },
  { elements: ['hetu', 'phala'], expected: true, type: 'logic', meaning: 'Reason before result' },
  { elements: ['pūrva', 'uttara'], expected: true, type: 'temporal', meaning: 'Earlier before later' }
];

/**
 * Devanagari test cases for precedence analysis
 */
export const devanagariTestCases = [
  // Compound precedence in Devanagari
  { elements: ['राम', 'सीता'], expected: true, type: 'compound', meaning: 'राम-सीता (राम की प्राथमिकता)' },
  { elements: ['अग्नि', 'सोम'], expected: true, type: 'compound', meaning: 'अग्नि-सोम (अग्नि प्राथमिक)' },
  { elements: ['इन्द्र', 'वरुण'], expected: true, type: 'compound', meaning: 'इन्द्र-वरुण (इन्द्र प्राथमिक)' },
  { elements: ['सूर्य', 'चन्द्र'], expected: true, type: 'compound', meaning: 'सूर्य-चन्द्र (सूर्य प्राथमिक)' },
  { elements: ['मित्र', 'वरुण'], expected: true, type: 'compound', meaning: 'मित्र-वरुण (मित्र प्राथमिक)' },
  
  // Phoneme sequences in Devanagari
  { elements: 'क्त', expected: true, type: 'phonemes', meaning: 'क् का त पर प्रभाव' },
  { elements: 'प्त', expected: true, type: 'phonemes', meaning: 'प् का त पर प्रभाव' },
  { elements: 'स्त', expected: true, type: 'phonemes', meaning: 'स् का त पर प्रभाव' },
  { elements: 'ग्न', expected: true, type: 'phonemes', meaning: 'ग् का न पर प्रभाव' },
  
  // Morphological elements in Devanagari
  { elements: ['धातु', 'प्रत्यय'], expected: true, type: 'morphology', meaning: 'धातु प्रत्यय से पहले' },
  { elements: ['प्रातिपदिक', 'विभक्ति'], expected: true, type: 'morphology', meaning: 'प्रातिपदिक विभक्ति से पहले' },
  { elements: ['उपसर्ग', 'धातु'], expected: true, type: 'morphology', meaning: 'उपसर्ग धातु से पहले' },
  
  // Grammatical operations in Devanagari
  { elements: ['वृद्धि', 'गुण'], expected: true, type: 'grammar', meaning: 'वृद्धि गुण से पहले' },
  { elements: ['सन्धि', 'रूप'], expected: true, type: 'grammar', meaning: 'सन्धि रूप से पहले' },
  { elements: ['प्रत्याहार', 'वर्ण'], expected: true, type: 'grammar', meaning: 'प्रत्याहार वर्ण से पहले' },
  
  // Vedic elements in Devanagari
  { elements: ['ऋक्', 'सामन्'], expected: true, type: 'vedic', meaning: 'ऋक् सामन् से पहले' },
  { elements: ['होतृ', 'अध्वर्यु'], expected: true, type: 'vedic', meaning: 'होतृ अध्वर्यु से पहले' },
  { elements: ['अग्निष्टोम', 'वाजपेय'], expected: true, type: 'vedic', meaning: 'अग्निष्टोम वाजपेय से पहले' },
  
  // Logical sequences in Devanagari
  { elements: ['कारण', 'कार्य'], expected: true, type: 'logic', meaning: 'कारण कार्य से पहले' },
  { elements: ['हेतु', 'फल'], expected: true, type: 'logic', meaning: 'हेतु फल से पहले' },
  { elements: ['पूर्व', 'उत्तर'], expected: true, type: 'temporal', meaning: 'पूर्व उत्तर से पहले' }
];
