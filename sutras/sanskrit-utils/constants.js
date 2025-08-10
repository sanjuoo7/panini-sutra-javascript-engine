/**
 * Sanskrit Constants - Core Data Definitions
 * 
 * This module contains all Sanskrit linguistic data constants used across sutras:
 * - Vowel classifications (vṛddhi, guṇa, ik)
 * - Consonant classifications by articulation
 * - Special characters and diacritics
 * 
 * Created: August 8, 2025
 */

/**
 * Sanskrit vowels categorized by Paninian classification
 */
export const SanskritVowels = {
  // Vṛddhi vowels (1.1.1)
  vrddhi: {
    iast: ['ā', 'ai', 'au'],
    devanagari: ['आ', 'ऐ', 'औ'],
    description: 'Vowels defined as vṛddhi in Sutra 1.1.1'
  },
  
  // Guṇa vowels (1.1.2)
  guna: {
    iast: ['a', 'e', 'o'],
    devanagari: ['अ', 'ए', 'ओ'],
    description: 'Vowels defined as guṇa in Sutra 1.1.2'
  },
  
  // Ik vowels (1.1.3)
  ik: {
    iast: ['i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ'],
    devanagari: ['इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ'],
    description: 'Vowels subject to guṇa/vṛddhi operations in Sutra 1.1.3'
  },
  
  // All basic vowels
  all: {
    iast: ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'ḷ', 'ḹ', 'e', 'ai', 'o', 'au'],
    devanagari: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ'],
    // Include vowel diacritics
    diacritics: ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'ॢ', 'ॣ', 'े', 'ै', 'ो', 'ौ'],
    description: 'All Sanskrit vowels in both scripts'
  }
};

/**
 * Sanskrit consonants (हल्) categorized by place of articulation
 */
export const SanskritConsonants = {
  // Stops (स्पर्श)
  stops: {
    velars: { iast: ['k', 'kh', 'g', 'gh', 'ṅ'], devanagari: ['क', 'ख', 'ग', 'घ', 'ङ'] },
    palatals: { iast: ['c', 'ch', 'j', 'jh', 'ñ'], devanagari: ['च', 'छ', 'ज', 'झ', 'ञ'] },
    retroflexes: { iast: ['ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ'], devanagari: ['ट', 'ठ', 'ड', 'ढ', 'ण'] },
    dentals: { iast: ['t', 'th', 'd', 'dh', 'n'], devanagari: ['त', 'थ', 'द', 'ध', 'न'] },
    labials: { iast: ['p', 'ph', 'b', 'bh', 'm'], devanagari: ['प', 'फ', 'ब', 'भ', 'म'] }
  },
  
  // Semivowels (अन्तःस्थ)
  semivowels: {
    iast: ['y', 'r', 'l', 'v'],
    devanagari: ['य', 'र', 'ल', 'व']
  },
  
  // Sibilants (ऊष्म)
  sibilants: {
    iast: ['ś', 'ṣ', 's', 'h'],
    devanagari: ['श', 'ष', 'स', 'ह']
  },
  
  // All consonants flattened
  all: {
    iast: [],
    devanagari: []
  },
  
  // Special characters
  special: {
    iast: ['ḥ', 'ṃ'],
    devanagari: ['ः', 'ं', '्'], // visarga, anusvara, halanta
    description: 'Special consonantal markers'
  },
  
  // Common consonant endings that affect word classification
  specialEndings: {
    iast: ['ḥ', 'ṃ'], // visarga, anusvara
    devanagari: ['ः', 'ं'], // visarga, anusvara
    description: 'Consonant-ending markers that affect grammatical classification'
  }
};

// Flatten all consonants
SanskritConsonants.all.iast = [
  ...SanskritConsonants.stops.velars.iast,
  ...SanskritConsonants.stops.palatals.iast,
  ...SanskritConsonants.stops.retroflexes.iast,
  ...SanskritConsonants.stops.dentals.iast,
  ...SanskritConsonants.stops.labials.iast,
  ...SanskritConsonants.semivowels.iast,
  ...SanskritConsonants.sibilants.iast
];

SanskritConsonants.all.devanagari = [
  ...SanskritConsonants.stops.velars.devanagari,
  ...SanskritConsonants.stops.palatals.devanagari,
  ...SanskritConsonants.stops.retroflexes.devanagari,
  ...SanskritConsonants.stops.dentals.devanagari,
  ...SanskritConsonants.stops.labials.devanagari,
  ...SanskritConsonants.semivowels.devanagari,
  ...SanskritConsonants.sibilants.devanagari
];

/**
 * Vowel gradation mappings for transformations
 */
export const VowelGradations = {
  // Guṇa transformations (1.1.2 context)
  guna: {
    iast: {
      'i': 'e', 'ī': 'e',
      'u': 'o', 'ū': 'o',
      'ṛ': 'ar', 'ṝ': 'ar',
      'ḷ': 'al', 'ḹ': 'al'
    },
    devanagari: {
      'इ': 'ए', 'ई': 'ए',
      'उ': 'ओ', 'ऊ': 'ओ',
      'ऋ': 'अर्', 'ॠ': 'अर्',
      'ऌ': 'अल्', 'ॡ': 'अल्'
    }
  },
  
  // Vṛddhi transformations (1.1.1 context)
  vrddhi: {
    iast: {
      'i': 'ai', 'ī': 'ai',
      'u': 'au', 'ū': 'au',
      'ṛ': 'ār', 'ṝ': 'ār',
      'ḷ': 'āl', 'ḹ': 'āl',
      // Additional transformations
      'a': 'ā', 'e': 'ai', 'o': 'au'
    },
    devanagari: {
      'इ': 'ऐ', 'ई': 'ऐ',
      'उ': 'औ', 'ऊ': 'औ',
      'ऋ': 'आर्', 'ॠ': 'आर्',
      'ऌ': 'आल्', 'ॡ': 'आल्',
      // Additional transformations
      'अ': 'आ', 'ए': 'ऐ', 'ओ': 'औ'
    }
  }
};

/**
 * It-marked Affix Sets (from Sutra 1.1.5)
 * These affixes have indicatory letters that block guṇa/vṛddhi operations
 * Includes both IAST and normalized forms for comprehensive matching
 */
export const ItMarkedAffixes = {
  // क् (k) it-marker affixes
  KIT_MARKED: [
    // Traditional IAST forms
    'kta', 'ktvā', 'ktva', 'kvip', 'kvan', 'ktavat', 'ktin', 'ktu',
    'kmat', 'kvi', 'kvarap', 'kvasuc', 'kt',
    // Normalized Devanagari forms
    'kup', 'kuan', 'katavat', 'katin', 'ktvt'
  ],
  
  // ग् (g) it-marker affixes  
  GIT_MARKED: [
    // Traditional IAST forms
    'gha', 'ghañ', 'ghan', 'ghaṇ', 'ghasi', 'ghāsi', 'ga',
    // Normalized Devanagari forms
    'gh', 'ghañ', 'ghan', 'g', 'ghñ', 'ghn'
  ],
  
  // ङ् (ṅ) it-marker affixes
  NGIT_MARKED: [
    // Traditional IAST forms
    'ṅa', 'ṅīp', 'ṅīn', 'ṅīṣ', 'ṅau', 'aṅ', 'iṅ', 'uṅ',
    // Normalized Devanagari forms
    'ṅ', 'ṅīp', 'ṅīn', 'aṅ'
  ]
};

/**
 * Sanskrit Word Lists - Classifications used across multiple sutras
 * Centralized to eliminate redundancy and ensure consistency
 */
export const SanskritWordLists = {
  // Sarvādi words (from 1.1.30, 1.1.31, 1.1.32 and related sutras)
  sarvaadi: {
    iast: [
      'sarva', 'viśva', 'ubha', 'ubhaya', 'itara', 'anya', 'anyatara', 
      'ka', 'yat', 'tad', 'etad', 'idam', 'adas', 'ena', 'sva', 'para',
      'apara', 'adhara', 'avara', 'dakṣiṇa', 'uttara', 'apara', 'para',
      'antara', 'sima', 'pūrva', 'eka', 'dvaya', 'dvi', 'tri', 'catur',
      'tvat', 'tva', 'nema', 'sama'
    ],
    devanagari: [
      'सर्व', 'विश्व', 'उभ', 'उभय', 'इतर', 'अन्य', 'अन्यतर',
      'क', 'यत्', 'तत्', 'एतत्', 'इदम्', 'अदस्', 'एन', 'स्व', 'पर',
      'अपर', 'अधर', 'अवर', 'दक्षिण', 'उत्तर', 'अपर', 'पर',
      'अन्तर', 'सीम', 'पूर्व', 'एक', 'द्वय', 'द्वि', 'त्रि', 'चतुर्',
      'त्वत्', 'त्व', 'नेम', 'सम'
    ],
    description: 'Pronominal words (sarvanāma) that can form compounds and take sarvanāma status in various contexts'
  },
  
  // Common exclusions for grammatical rules (from 1.1.34)
  nonNipataExclusions: {
    iast: ['deva', 'grāma', 'putra', 'karma', 'rāma', 'kṛṣṇa'],
    devanagari: ['देव', 'ग्राम', 'पुत्र', 'कर्म', 'राम', 'कृष्ण'],
    description: 'Common nouns that are typically excluded from nipāta classification'
  },
  
  // Valid grammatical contexts (from 1.1.34)
  validContexts: [
    'compound_formation',
    'case_assignment', 
    'verbal_government',
    'adjectival_agreement',
    'pronominal_reference',
    'temporal_specification',
    'spatial_specification',
    'causal_relationship'
  ],
  
  // Interrogatives used in number-related contexts (1.1.25)
  interrogatives: {
    iast: ['kati', 'kiyati'], // how many, how much
    devanagari: ['कति', 'कियति'], // how many, how much
    description: 'Interrogative numerals used with डति suffix'
  },
  
  // Default analysis contexts
  defaultContexts: ['educational', 'linguistic_analysis'],
  
  // Words for 1.1.33 (प्रथमादयः परे) - Ordinal and quantitative words
  prathmaadi: {
    iast: [
      'pratham', 'prathama',  // प्रथम - first
      'caram', 'carama',      // चरम - last
      'alp', 'alpa',          // अल्प - few/little
      'ardh', 'ardha',        // अर्ध - half
      'katipay', 'katipaya',  // कतिपय - some/several
      'nem', 'nema'           // नेम - half
    ],
    devanagari: [
      'प्रथम', 'प्रथम',       // first
      'चरम', 'चरम',          // last 
      'अल्प', 'अल्प',         // few/little
      'अर्ध', 'अर्ध',         // half
      'कतिपय', 'कतिपय',      // some/several
      'नेम', 'नेम'            // half
    ],
    description: 'Ordinal and quantitative words that take special case endings per 1.1.33'
  },
  
  // Nipāta patterns (from 1.1.34)
  nipataPatterns: [
    { pattern: /.*eva$/, description: 'Words ending in eva' },
    { pattern: /^ca$/, description: 'The conjunction ca' },
    { pattern: /^vā$/, description: 'The disjunction vā' },
    { pattern: /^hi$/, description: 'The emphatic hi' },
    { pattern: /^tu$/, description: 'The adversative tu' },
    { pattern: /^api$/, description: 'The inclusive api' }
  ],
  
  // Enhanced nipāta patterns with semantic information (from 1.1.34)
  nipataSemanticPatterns: [
    { pattern: /.*tas$/, type: 'directional', meaning: 'from/towards direction' },
    { pattern: /.*tra$/, type: 'locative', meaning: 'in that place' },
    { pattern: /.*thā$/, type: 'manner', meaning: 'in that manner' },
    { pattern: /.*dā$/, type: 'temporal', meaning: 'at that time' },
    { pattern: /.*vat$/, type: 'comparative', meaning: 'like, as' }
  ],

  // Common nipata (indeclinable particles) words with their types and meanings (from 1.1.34)
  nipataWords: {
    // Coordinating particles
    'ca': { type: 'coordinating', meaning: 'and' },
    'va': { type: 'coordinating', meaning: 'or' },
    'vā': { type: 'coordinating', meaning: 'or' },
    'api': { type: 'coordinating', meaning: 'even, also' },
    'tu': { type: 'coordinating', meaning: 'but, however' },
    'kim': { type: 'interrogative', meaning: 'what, why' },
    'kiṃ': { type: 'interrogative', meaning: 'what, why' },
    
    // Emphatic particles
    'eva': { type: 'emphatic', meaning: 'indeed, exactly' },
    'hi': { type: 'emphatic', meaning: 'indeed, for' },
    'khalu': { type: 'emphatic', meaning: 'indeed, certainly' },
    'nūnam': { type: 'emphatic', meaning: 'certainly, surely' },
    
    // Negative particles
    'na': { type: 'negative', meaning: 'not' },
    'mā': { type: 'negative', meaning: 'not, don\'t' },
    'no': { type: 'negative', meaning: 'not' },
    
    // Temporal particles
    'tadā': { type: 'temporal', meaning: 'then' },
    'yadā': { type: 'temporal', meaning: 'when' },
    'kadā': { type: 'temporal', meaning: 'when' },
    'sarvadā': { type: 'temporal', meaning: 'always' },
    
    // Locative particles
    'yatra': { type: 'locative', meaning: 'where' },
    'tatra': { type: 'locative', meaning: 'there' },
    'sarvatra': { type: 'locative', meaning: 'everywhere' },
    
    // Manner particles
    'tathā': { type: 'manner', meaning: 'thus, so' },
    'yathā': { type: 'manner', meaning: 'as, just as' },
    'kathāñcit': { type: 'manner', meaning: 'somehow' },
    
    // Quantity particles
    'bahiḥ': { type: 'quantity', meaning: 'outside' },
    'antaḥ': { type: 'quantity', meaning: 'inside' },
    'puraḥ': { type: 'quantity', meaning: 'in front' },
    'paścāt': { type: 'quantity', meaning: 'behind' },
    
    // Directional particles (specific words from tests)
    'ūrdhvatas': { type: 'directional', meaning: 'from above' },
    'adhostāt': { type: 'directional', meaning: 'from below' },
    'adhastāt': { type: 'directional', meaning: 'from below' },
    'paritas': { type: 'directional', meaning: 'around' },
    
    // Additional locative and manner particles from tests
    'anyatra': { type: 'locative', meaning: 'elsewhere' },
    'itarathā': { type: 'manner', meaning: 'otherwise' },
    'anyathā': { type: 'manner', meaning: 'otherwise' }
  },

  // Avikarana verb exceptions that can be transitive (from 1.1.36)
  avikaranaTransitiveExceptions: {
    iast: ['dvis', 'śās', 'hu', 'dā', 'dhā', 'mā', 'hā'],
    description: 'Avikaraṇa verbs that can exceptionally be transitive despite lacking vikaraṇa'
  },

  // Intransitivity context types for grammatical analysis (from 1.1.36)
  intransitivityContexts: [
    'no_object_present',       // No direct object
    'motion_verb',             // Verbs of motion (typically intransitive)
    'state_verb',              // Verbs of state/condition
    'existence_verb',          // Verbs of existence
    'intransitive_usage',      // Explicitly intransitive usage
    'syntactic_analysis'       // General syntactic analysis
  ],

  // Vikarana patterns for verb classification (from 1.1.36)
  vikaranaPatterns: [
    /.*ati$/, /.*ate$/,        // Class I, VI patterns
    /.*yati$/, /.*yate$/,      // Class IV patterns  
    /.*ayati$/, /.*ayate$/     // Class X patterns
  ],

  // Avikarana inflection patterns with extraction functions (from 1.1.36)
  avikaranaInflectionPatterns: [
    { pattern: /^.*eti$/, type: 'class_ii_active', extraction: verb => verb.replace(/eti$/, 'i') },
    { pattern: /^.*ite$/, type: 'class_ii_middle', extraction: verb => verb.replace(/ite$/, 'i') },
    { pattern: /^.*sti$/, type: 'class_ii_active_s', extraction: verb => verb.replace(/sti$/, 's') },
    { pattern: /^.*ṣṭi$/, type: 'class_ii_active_dental', extraction: verb => verb.replace(/ṣṭi$/, 's') },
    { pattern: /^.*oti$/, type: 'class_iii_active', extraction: verb => verb.replace(/oti$/, 'u') },
    { pattern: /^.*ute$/, type: 'class_iii_middle', extraction: verb => verb.replace(/ute$/, 'u') },
    { pattern: /^.*āti$/, type: 'class_iii_long', extraction: verb => verb.replace(/āti$/, 'ā') },
    { pattern: /^.*ate$/, type: 'class_iii_long_middle', extraction: verb => verb.replace(/ate$/, 'ā') }
  ],

  // Avikarana verbs dictionary - verbs without vikarana (from 1.1.36)
  avikaranaVerbs: {
    // Class II (adi-gaṇa) - typically intransitive
    'i': { 
      meaning: 'to go', 
      forms: ['eti', 'ite'],
      examples: ['gṛhaṃ eti', 'vanaṃ eti'],
      class: 'Class II (adi)',
      transitivity: 'intransitive'
    },
    'as': { 
      meaning: 'to be, exist', 
      forms: ['asti', 'āste'],
      examples: ['sūryo asti', 'rājā āste'],
      class: 'Class II (adi)',
      transitivity: 'intransitive'
    },
    'dvis': { 
      meaning: 'to hate', 
      forms: ['dveṣṭi', 'dviṣṭe'],
      examples: ['śatruṃ dveṣṭi'],
      class: 'Class II (adi)',
      transitivity: 'transitive' // Exception
    },
    'śās': { 
      meaning: 'to rule, govern', 
      forms: ['śāsti', 'śiṣṭe'],
      examples: ['rājyaṃ śāsti'],
      class: 'Class II (adi)',
      transitivity: 'transitive' // Exception
    },
    
    // Class III (hu-gaṇa) - typically intransitive
    'hu': { 
      meaning: 'to sacrifice, offer', 
      forms: ['juhoti', 'juhute'],
      examples: ['agniṃ juhoti', 'haviṣ juhoti'],
      class: 'Class III (hu)',
      transitivity: 'transitive' // Exception - takes object
    },
    'dā': { 
      meaning: 'to give', 
      forms: ['dadāti', 'datte'],
      examples: ['dānaṃ dadāti', 'dhanaṃ datte'],
      class: 'Class III (hu)',
      transitivity: 'transitive' // Exception
    },
    'dhā': { 
      meaning: 'to place, put', 
      forms: ['dadhāti', 'dhatte'],
      examples: ['bhūmau dadhāti'],
      class: 'Class III (hu)',
      transitivity: 'transitive' // Exception
    },
    'mā': { 
      meaning: 'to measure', 
      forms: ['mimāti', 'mimate'],
      examples: ['bhūmiṃ mimāti'],
      class: 'Class III (hu)',
      transitivity: 'transitive' // Exception
    },
    'hā': { 
      meaning: 'to abandon', 
      forms: ['jahāti', 'jahīte'],
      examples: ['gṛhaṃ jahāti'],
      class: 'Class III (hu)',
      transitivity: 'transitive' // Exception
    },
    
    // Truly intransitive avikaraṇa verbs
    'ās': { 
      meaning: 'to sit', 
      forms: ['āste'],
      examples: ['āsane āste', 'vṛkṣe āste'],
      class: 'Class II (adi)',
      transitivity: 'intransitive'
    },
    'śī': { 
      meaning: 'to lie down', 
      forms: ['śete'],
      examples: ['śayyāyāṃ śete'],
      class: 'Class II (adi)',
      transitivity: 'intransitive'
    },
    'sthā': { 
      meaning: 'to stand', 
      forms: ['tiṣṭhati', 'tiṣṭhate'],
      examples: ['dvāre tiṣṭhati'],
      class: 'Class I (bhū)', // Actually has vikaraṇa 'a'
      transitivity: 'intransitive'
    },
    
    // Additional inflected forms for easier recognition
    'eti': { 
      meaning: 'goes', 
      forms: ['eti'],
      examples: ['gṛhaṃ eti'],
      root: 'i',
      class: 'Class II (adi)',
      transitivity: 'intransitive',
      form_type: 'class_ii_active'
    },
    'ite': { 
      meaning: 'goes (middle)', 
      forms: ['ite'],
      examples: ['svargaṃ ite'],
      root: 'i',
      class: 'Class II (adi)',
      transitivity: 'intransitive',
      form_type: 'class_ii_middle'
    },
    'asti': { 
      meaning: 'is, exists', 
      forms: ['asti'],
      examples: ['sūryo asti'],
      root: 'as',
      class: 'Class II (adi)',
      transitivity: 'intransitive',
      form_type: 'class_ii_active_s'
    },
    'āste': { 
      meaning: 'sits', 
      forms: ['āste'],
      examples: ['āsane āste'],
      root: 'ās',
      class: 'Class II (adi)',
      transitivity: 'intransitive',
      form_type: 'class_ii_middle'
    },
    'śete': { 
      meaning: 'lies down', 
      forms: ['śete'],
      examples: ['śayyāyāṃ śete'],
      root: 'śī',
      class: 'Class II (adi)',
      transitivity: 'intransitive',
      form_type: 'class_ii_middle'
    },
    'juhoti': { 
      meaning: 'offers, sacrifices', 
      forms: ['juhoti'],
      examples: ['agniṃ juhoti'],
      root: 'hu',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_active'
    },
    'juhute': { 
      meaning: 'offers (middle)', 
      forms: ['juhute'],
      examples: ['haviṣ juhute'],
      root: 'hu',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_middle'
    },
    'dadāti': { 
      meaning: 'gives', 
      forms: ['dadāti'],
      examples: ['dānaṃ dadāti'],
      root: 'dā',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_long'
    },
    'datte': { 
      meaning: 'gives (middle)', 
      forms: ['datte'],
      examples: ['dhanaṃ datte'],
      root: 'dā',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_long_middle'
    },
    'dadhāti': { 
      meaning: 'places, puts', 
      forms: ['dadhāti'],
      examples: ['bhūmau dadhāti'],
      root: 'dhā',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_long'
    },
    'dhatte': { 
      meaning: 'places (middle)', 
      forms: ['dhatte'],
      examples: ['hṛdaye dhatte'],
      root: 'dhā',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_long_middle'
    },
    'mimāti': { 
      meaning: 'measures', 
      forms: ['mimāti'],
      examples: ['bhūmiṃ mimāti'],
      root: 'mā',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_long'
    },
    'mimate': { 
      meaning: 'measures (middle)', 
      forms: ['mimate'],
      examples: ['kṣetraṃ mimate'],
      root: 'mā',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_long_middle'
    },
    'jahāti': { 
      meaning: 'abandons', 
      forms: ['jahāti'],
      examples: ['gṛhaṃ jahāti'],
      root: 'hā',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_long'
    },
    'jahīte': { 
      meaning: 'abandons (middle)', 
      forms: ['jahīte'],
      examples: ['sarvaṃ jahīte'],
      root: 'hā',
      class: 'Class III (hu)',
      transitivity: 'transitive',
      form_type: 'class_iii_long_middle'
    }
  },

  // Vikarana indicators - verbs with vikarana suffixes (from 1.1.36)
  vikaranaIndicators: {
    // Class I (bhū-gaṇa) - vikaraṇa 'a'
    'bhū': { 
      vikarana: 'a', 
      class: 'Class I (bhū)',
      forms: ['bhavati', 'bhavate'],
      transitivity: 'intransitive'
    },
    'gam': { 
      vikarana: 'a', 
      class: 'Class I (bhū)',
      forms: ['gacchati', 'gacchate'],
      transitivity: 'intransitive'
    },
    'pat': { 
      vikarana: 'a', 
      class: 'Class I (bhū)',
      forms: ['patati', 'patate'],
      transitivity: 'intransitive'
    },
    
    // Class IV (div-gaṇa) - vikaraṇa 'ya'
    'div': { 
      vikarana: 'ya', 
      class: 'Class IV (div)',
      forms: ['dīvyati', 'dīvyate'],
      transitivity: 'intransitive'
    },
    'nṛt': { 
      vikarana: 'ya', 
      class: 'Class IV (div)',
      forms: ['nṛtyati', 'nṛtyate'],
      transitivity: 'intransitive'
    },
    
    // Class VI (tud-gaṇa) - vikaraṇa 'a'
    'tud': { 
      vikarana: 'a', 
      class: 'Class VI (tud)',
      forms: ['tudati', 'tudate'],
      transitivity: 'transitive'
    },
    'kṛṣ': { 
      vikarana: 'a', 
      class: 'Class VI (tud)',
      forms: ['kṛṣati', 'kṛṣate'],
      transitivity: 'transitive'
    },
    
    // Class X (cur-gaṇa) - vikaraṇa 'aya'
    'cur': { 
      vikarana: 'aya', 
      class: 'Class X (cur)',
      forms: ['corayati', 'corayate'],
      transitivity: 'transitive'
    },
    'cint': { 
      vikarana: 'aya', 
      class: 'Class X (cur)',
      forms: ['cintayati', 'cintayate'],
      transitivity: 'transitive'
    }
  },

  // 1.1.43: Neuter sup endings for case identification
  neuterSupEndings: {
    // Nominative/Accusative
    'am': { case: 'nominative/accusative', number: 'singular', example: 'phalam' },
    'ā': { case: 'nominative/accusative', number: 'dual', example: 'phale' },
    'e': { case: 'nominative/accusative', number: 'dual', example: 'phale' },
    'āni': { case: 'nominative/accusative', number: 'plural', example: 'phalāni' },
    'i': { case: 'nominative/accusative', number: 'plural', example: 'nāmāni' },
    
    // Instrumental
    'ena': { case: 'instrumental', number: 'singular', example: 'phalena' },
    'ābhyām': { case: 'instrumental/dative', number: 'dual', example: 'phalābhyām' },
    'aiḥ': { case: 'instrumental', number: 'plural', example: 'phalaiḥ' },
    'ais': { case: 'instrumental', number: 'plural', example: 'phalais' },
    
    // Dative
    'āya': { case: 'dative', number: 'singular', example: 'phalāya' },
    'ebhyaḥ': { case: 'dative/ablative', number: 'plural', example: 'phalebhyaḥ' },
    
    // Ablative
    'āt': { case: 'ablative', number: 'singular', example: 'phalāt' },
    
    // Genitive
    'asya': { case: 'genitive', number: 'singular', example: 'phalasya' },
    'ayoḥ': { case: 'genitive/locative', number: 'dual', example: 'phalayoḥ' },
    'ānām': { case: 'genitive', number: 'plural', example: 'phalānām' },
    
    // Locative
    'e': { case: 'locative', number: 'singular', alt_case: 'nominative/accusative dual', example: 'phale' },
    'eṣu': { case: 'locative', number: 'plural', example: 'phaleṣu' }
  },

  // 1.1.43: Neuter word patterns for recognition
  neuterPatterns: [
    { pattern: /.*am$/, ending: 'am', case: 'nom/acc', number: 'sg' },
    { pattern: /.*e$/, ending: 'e', case: 'nom/acc/loc', number: 'dual/sg' },
    { pattern: /.*āni$/, ending: 'āni', case: 'nom/acc', number: 'pl' },
    { pattern: /.*ōni$/, ending: 'ōni', case: 'nom/acc', number: 'pl' },
    { pattern: /.*ūni$/, ending: 'ūni', case: 'nom/acc', number: 'pl' },
    { pattern: /.*ena$/, ending: 'ena', case: 'instrumental', number: 'sg' },
    { pattern: /.*asya$/, ending: 'asya', case: 'genitive', number: 'sg' },
    { pattern: /.*āya$/, ending: 'āya', case: 'dative', number: 'sg' },
    { pattern: /.*āt$/, ending: 'āt', case: 'ablative', number: 'sg' },
    { pattern: /^nāma$/, ending: '', case: 'nom/acc', number: 'sg' } // Special for nāma
  ],

  // 1.1.43: Common neuter words and their stems
  neuterWords: {
    // Common neuter nouns
    'phala': { 
      meaning: 'fruit', 
      stem: 'phala',
      examples: ['phalam', 'phale', 'phalāni']
    },
    'nāma': { 
      meaning: 'name', 
      stem: 'nāman',
      examples: ['nāma', 'nāmāni', 'nāmnā']
    },
    'karma': { 
      meaning: 'action', 
      stem: 'karman',
      examples: ['karma', 'karmāṇi', 'karmaṇā']
    },
    'jala': { 
      meaning: 'water', 
      stem: 'jala',
      examples: ['jalam', 'jale', 'jalāni']
    },
    'vana': { 
      meaning: 'forest', 
      stem: 'vana',
      examples: ['vanam', 'vane', 'vanāni']
    },
    'gṛha': { 
      meaning: 'house', 
      stem: 'gṛha',
      examples: ['gṛham', 'gṛhe', 'gṛhāṇi']
    },
    'puṣpa': { 
      meaning: 'flower', 
      stem: 'puṣpa',
      examples: ['puṣpam', 'puṣpe', 'puṣpāṇi']
    },
    'yuga': { 
      meaning: 'age, yoke', 
      stem: 'yuga',
      examples: ['yugam', 'yuge', 'yugāni']
    },
    'śrī': { 
      meaning: 'prosperity', 
      stem: 'śrī',
      examples: ['śrī', 'śriyau', 'śrīs'] // Note: can also be feminine
    },
    'citta': { 
      meaning: 'mind', 
      stem: 'citta',
      examples: ['cittam', 'citte', 'cittāni']
    }
  },

  // 1.1.43: Neuter stem patterns for classification
  neuterStemPatterns: [
    { pattern: /.*a$/, type: 'a_stem' },
    { pattern: /.*i$/, type: 'i_stem' },
    { pattern: /.*u$/, type: 'u_stem' },
    { pattern: /.*man$/, type: 'man_stem' },
    { pattern: /.*as$/, type: 'as_stem' },
    { pattern: /.*is$/, type: 'is_stem' },
    { pattern: /.*us$/, type: 'us_stem' }
  ],

  // 1.1.43: Stem extraction rules for neuter words
  stemExtractionRules: [
    { pattern: /(.*)am$/, replacement: '$1a' },
    { pattern: /(.*)āni$/, replacement: '$1a' },
    { pattern: /(.*)ena$/, replacement: '$1a' },
    { pattern: /(.*)asya$/, replacement: '$1a' },
    { pattern: /(.*)āya$/, replacement: '$1a' },
    { pattern: /(.*)āt$/, replacement: '$1a' },
    { pattern: /(.*)e$/, replacement: '$1a' }, // Could also be locative
    { pattern: /(.*)ā$/, replacement: '$1a' }, // Dual forms
    { pattern: /(.*)ūni$/, replacement: '$1u' },
    { pattern: /(.*)ōni$/, replacement: '$1o' }
  ],

  // 1.1.43: Neuter indicators for 'a' stems
  neuterIndicators: [
    /.*phala$/, // fruit words
    /.*vana$/, // forest words
    /.*gṛha$/, // house words
    /.*puṣpa$/, // flower words
    /.*yuga$/, // time/yoke words
    /.*kṣetra$/, // field words
    /.*śāstra$/, // text words
    /.*rūpa$/, // form words
    /.*citta$/, // mind words
    /.*hṛdaya$/ // heart words
  ],

  // 1.1.44: Nañ (negative) prefixes
  nañPrefixes: [
    // Basic negative prefixes
    { prefix: 'na', meaning: 'not', example: 'na-kāma (not desire)' },
    { prefix: 'an', meaning: 'not/without', example: 'an-anta (endless)' },
    { prefix: 'a', meaning: 'not', example: 'a-dharma (non-dharma)' },
    { prefix: 'nir', meaning: 'without/out', example: 'nir-guṇa (without qualities)' },
    { prefix: 'niḥ', meaning: 'without/out', example: 'niḥ-śaṅka (without doubt)' },
    { prefix: 'nis', meaning: 'without/out', example: 'nis-phala (fruitless)' },
    
    // Compound negative forms
    { prefix: 'duḥ', meaning: 'bad/difficult', example: 'duḥ-kha (suffering)' },
    { prefix: 'dur', meaning: 'bad/difficult', example: 'dur-gama (difficult to reach)' },
    { prefix: 'dus', meaning: 'bad/difficult', example: 'dus-kṛta (badly done)' }
  ],

  // 1.1.44: Ñu patterns (kṛt and taddhita suffixes)
  ñuPatterns: [
    // ñu suffixes (kṛt and taddhita)
    { suffix: 'aka', type: 'kṛt', meaning: 'doer/agent', example: 'kāraka (doer)' },
    { suffix: 'ika', type: 'taddhita', meaning: 'relating to', example: 'vaidika (relating to Veda)' },
    { suffix: 'iya', type: 'taddhita', meaning: 'worthy of', example: 'pūjiya (worthy of worship)' },
    { suffix: 'ya', type: 'kṛt', meaning: 'to be done', example: 'kārya (to be done)' },
    { suffix: 'ana', type: 'kṛt', meaning: 'action/instrument', example: 'karaṇa (instrument)' },
    { suffix: 'aṇa', type: 'kṛt', meaning: 'action/instrument', example: 'karaṇa (instrument)' },
    { suffix: 'in', type: 'taddhita', meaning: 'possessing', example: 'balin (strong)' },
    { suffix: 'vat', type: 'taddhita', meaning: 'possessing', example: 'dhanavat (wealthy)' },
    { suffix: 'mat', type: 'taddhita', meaning: 'possessing', example: 'śrīmat (prosperous)' }
  ],

  // 1.1.44: Upasarga (verbal prefixes)
  upasargaList: [
    // Most common upasargas
    { prefix: 'pra', meaning: 'forth/forward', example: 'pra-gam (to go forth)' },
    { prefix: 'vi', meaning: 'apart/special', example: 'vi-car (to move about)' },
    { prefix: 'sam', meaning: 'together/complete', example: 'sam-gam (to come together)' },
    { prefix: 'upa', meaning: 'near/towards', example: 'upa-gam (to approach)' },
    { prefix: 'ni', meaning: 'down/into', example: 'ni-pat (to fall down)' },
    { prefix: 'anu', meaning: 'after/along', example: 'anu-gam (to follow)' },
    { prefix: 'ava', meaning: 'down/away', example: 'ava-gam (to understand)' },
    { prefix: 'ud', meaning: 'up/out', example: 'ud-gam (to rise)' },
    { prefix: 'adhi', meaning: 'over/above', example: 'adhi-gam (to study)' },
    { prefix: 'abhi', meaning: 'towards/against', example: 'abhi-gam (to approach)' },
    { prefix: 'pari', meaning: 'around/completely', example: 'pari-gam (to surround)' },
    { prefix: 'ā', meaning: 'towards/until', example: 'ā-gam (to come)' },
    
    // Additional upasargas
    { prefix: 'prati', meaning: 'against/back', example: 'prati-gam (to go back)' },
    { prefix: 'api', meaning: 'also/even', example: 'api-gam (to reach also)' },
    { prefix: 'ati', meaning: 'beyond/very', example: 'ati-gam (to surpass)' },
    { prefix: 'su', meaning: 'well/good', example: 'su-gam (easy to reach)' },
    { prefix: 'dus', meaning: 'bad/difficult', example: 'dus-gam (difficult to reach)' },
    { prefix: 'parā', meaning: 'away/forth', example: 'parā-gam (to go away)' }
  ],

  // 1.1.45: Verbal suffixes for root extraction
  verbalSuffixes: [
    'tvā', // Handle this first for special transformation
    'ati', 'anti', 'asi', 'ama', 'atha', 'a', // present tense
    'tum', 'ya', 'ta', // infinitive/gerund markers
    'āna', 'ant', 'at' // participle markers
  ],

  // 1.1.45: Ik vowels and their properties
  ikVowels: {
    'i': { type: 'short_i', grade: 'basic' },
    'ī': { type: 'long_i', grade: 'basic' },
    'u': { type: 'short_u', grade: 'basic' },
    'ū': { type: 'long_u', grade: 'basic' },
    'ṛ': { type: 'short_r', grade: 'basic' },
    'ṝ': { type: 'long_r', grade: 'basic' },
    'ḷ': { type: 'short_l', grade: 'basic' },
    'ḹ': { type: 'long_l', grade: 'basic' }
  },

  // 1.1.45: Guna forms of ik vowels
  gunaMap: {
    'i': 'e',
    'ī': 'e',
    'u': 'o',
    'ū': 'o',
    'ṛ': 'ar',
    'ṝ': 'ar',
    'ḷ': 'al',
    'ḹ': 'al'
  },

  // 1.1.45: Vriddhi forms of ik vowels
  vriddhiMap: {
    'i': 'ai',
    'ī': 'ai',
    'u': 'au',
    'ū': 'au',
    'ṛ': 'ār',
    'ṝ': 'ār',
    'ḷ': 'āl',
    'ḹ': 'āl'
  },

  // 1.1.45: Known dhatus (verbal roots) with ik elements
  knownDhatus: [
    'kṛ', 'bhṛ', 'smṛ', 'sṛ', 'tṛ', 'dṛ', 'pṛ', // ṛ-ending roots
    'ji', 'ci', 'śi', 'hi', 'mi', 'di', 'vi', 'ni', // i-ending roots  
    'yu', 'ru', 'śru', 'stu', 'nu', 'hu', 'ku', 'tu', // u-ending roots
    'gam', 'han', 'jan', 'man', 'tan', 'van', // roots that can have ik upadha in derived forms
    'gṛha', 'vṛdh', 'mṛd' // roots with ṛ in them
  ],

  // 1.1.46: Vowel phonetic properties for ṭakita analysis
  vowelProperties: {
    'a': { type: 'vowel', grade: 'short', quality: 'central' },
    'ā': { type: 'vowel', grade: 'long', quality: 'central' },
    'i': { type: 'vowel', grade: 'short', quality: 'front' },
    'ī': { type: 'vowel', grade: 'long', quality: 'front' },
    'u': { type: 'vowel', grade: 'short', quality: 'back' },
    'ū': { type: 'vowel', grade: 'long', quality: 'back' },
    'ṛ': { type: 'vowel', grade: 'short', quality: 'liquid' },
    'ṝ': { type: 'vowel', grade: 'long', quality: 'liquid' },
    'ḷ': { type: 'vowel', grade: 'short', quality: 'liquid' },
    'e': { type: 'vowel', grade: 'long', quality: 'compound' },
    'o': { type: 'vowel', grade: 'long', quality: 'compound' },
    'ai': { type: 'vowel', grade: 'long', quality: 'diphthong' },
    'au': { type: 'vowel', grade: 'long', quality: 'diphthong' }
  },

  // 1.1.46: Consonant phonetic properties for ṭakita analysis
  consonantProperties: {
    // Stops
    'k': { type: 'consonant', class: 'stop', voice: 'voiceless', aspiration: 'unaspirated', place: 'velar' },
    'g': { type: 'consonant', class: 'stop', voice: 'voiced', aspiration: 'unaspirated', place: 'velar' },
    'c': { type: 'consonant', class: 'stop', voice: 'voiceless', aspiration: 'unaspirated', place: 'palatal' },
    'j': { type: 'consonant', class: 'stop', voice: 'voiced', aspiration: 'unaspirated', place: 'palatal' },
    't': { type: 'consonant', class: 'stop', voice: 'voiceless', aspiration: 'unaspirated', place: 'dental' },
    'd': { type: 'consonant', class: 'stop', voice: 'voiced', aspiration: 'unaspirated', place: 'dental' },
    'p': { type: 'consonant', class: 'stop', voice: 'voiceless', aspiration: 'unaspirated', place: 'labial' },
    'b': { type: 'consonant', class: 'stop', voice: 'voiced', aspiration: 'unaspirated', place: 'labial' },
    
    // Nasals
    'n': { type: 'consonant', class: 'nasal', voice: 'voiced', place: 'dental' },
    'm': { type: 'consonant', class: 'nasal', voice: 'voiced', place: 'labial' },
    'ṅ': { type: 'consonant', class: 'nasal', voice: 'voiced', place: 'velar' },
    'ñ': { type: 'consonant', class: 'nasal', voice: 'voiced', place: 'palatal' },
    'ṇ': { type: 'consonant', class: 'nasal', voice: 'voiced', place: 'retroflex' },
    
    // Liquids
    'r': { type: 'consonant', class: 'liquid', voice: 'voiced', place: 'dental', subtype: 'trill' },
    'l': { type: 'consonant', class: 'liquid', voice: 'voiced', place: 'dental', subtype: 'lateral' },
    
    // Fricatives/Sibilants
    's': { type: 'consonant', class: 'sibilant', voice: 'voiceless', place: 'dental' },
    'ś': { type: 'consonant', class: 'sibilant', voice: 'voiceless', place: 'palatal' },
    'ṣ': { type: 'consonant', class: 'sibilant', voice: 'voiceless', place: 'retroflex' },
    'h': { type: 'consonant', class: 'fricative', voice: 'voiced', place: 'glottal' },
    
    // Semi-vowels
    'y': { type: 'consonant', class: 'semivowel', voice: 'voiced', place: 'palatal' },
    'v': { type: 'consonant', class: 'semivowel', voice: 'voiced', place: 'labial' }
  },

  // 1.1.47: Mid substitution patterns
  substitutionPatterns: {
    // Vowel substitutions
    'a': 'vowel_substitution',
    'ā': 'vowel_lengthening',
    'i': 'i_substitution',
    'ī': 'i_lengthening',
    'u': 'u_substitution',
    'ū': 'u_lengthening',
    'e': 'guna_substitution',
    'o': 'guna_substitution',
    'ar': 'vriddhi_substitution',
    'al': 'vriddhi_substitution',
    
    // Consonant substitutions
    'n': 'nasal_substitution',
    'm': 'anusvara_substitution',
    't': 'dental_substitution',
    's': 'sibilant_substitution',
    'ḥ': 'visarga_substitution',
    
    // Special substitutions
    'guṇa': 'vowel_gradation',
    'vṛddhi': 'vowel_strengthening',
    'samprasāraṇa': 'semivowel_substitution'
  },

  // 1.1.47: Declension substitution mappings
  declensionSubstitutes: {
    'a': ['as', 'āt', 'e', 'āni'],
    'ā': ['ām', 'āyāḥ', 'āsu'],
    'i': ['iḥ', 'in', 'au', 'īn'],
    'u': ['uḥ', 'un', 'ū', 'ūn'],
    'ṛ': ['ā', 'ur', 'ṝn']
  },

  // 1.1.47: Conjugation substitution mappings
  conjugationSubstitutes: {
    'a': ['ati', 'anti', 'āmi'],
    'i': ['eti', 'enti', 'emi'],
    'u': ['oti', 'enti', 'omi'],
    'ṛ': ['arti', 'anti', 'armi'],
    'm': ['ati', 'anti', 'āmi'], // For roots ending in 'm' like 'gam'
    'c': ['ati', 'anti', 'āmi'], // For roots ending in 'c' like 'pac'
    't': ['ati', 'anti', 'āmi'], // For roots ending in 't'
    'n': ['ati', 'anti', 'āmi']  // For roots ending in 'n'
  },

  // 1.1.47: Derivation substitutes (general)
  derivationSubstitutes: ['aka', 'ya', 'ana', 'ta', 'ika', 'in', 'vat'],

  // 1.1.47: Sandhi substitution mappings
  sandhiSubstitutes: {
    'a': ['o', 'e', 'ā'],
    'ā': ['e', 'o'],
    'i': ['y', 'e'],
    'ī': ['y', 'e'],
    'u': ['v', 'o'],
    'ū': ['v', 'o'],
    't': ['d', 'n', 'c'],
    'n': ['m', 'ṅ', 'ñ']
  },

  // 1.1.47: General substitutes (fallback)
  generalSubstitutes: ['a', 'i', 'u', 'e', 'o', 't', 'n', 'm', 's'],

  // 1.1.48: Ec vowels (e, o, ai, au) classification
  ecVowels: {
    'e': { type: 'simple_guna', base: 'a+i', description: 'guna of a and i' },
    'o': { type: 'simple_guna', base: 'a+u', description: 'guna of a and u' },
    'ai': { type: 'vriddhi', base: 'a+a+i', description: 'vriddhi of i' },
    'au': { type: 'vriddhi', base: 'a+a+u', description: 'vriddhi of u' },
    'ै': { type: 'vriddhi', base: 'a+a+i', description: 'vriddhi of i (Devanagari)' },
    'ौ': { type: 'vriddhi', base: 'a+a+u', description: 'vriddhi of u (Devanagari)' },
    'े': { type: 'simple_guna', base: 'a+i', description: 'guna of a and i (Devanagari)' },
    'ो': { type: 'simple_guna', base: 'a+u', description: 'guna of a and u (Devanagari)' }
  },

  // 1.1.48: Ec to Ik vowel substitution mapping
  ecToIkMapping: {
    'e': { 
      substitute: 'i', 
      type: 'simple_shortening',
      reasoning: 'e (guna) → i (original simple vowel)',
      process: 'guna_to_simple'
    },
    'o': { 
      substitute: 'u', 
      type: 'simple_shortening',
      reasoning: 'o (guna) → u (original simple vowel)',
      process: 'guna_to_simple'
    },
    'ai': { 
      substitute: 'i', 
      type: 'vriddhi_shortening',
      reasoning: 'ai (vriddhi) → i (simple vowel)',
      process: 'vriddhi_to_simple'
    },
    'au': { 
      substitute: 'u', 
      type: 'vriddhi_shortening',
      reasoning: 'au (vriddhi) → u (simple vowel)',
      process: 'vriddhi_to_simple'
    },
    'ै': { 
      substitute: 'ि', 
      type: 'vriddhi_shortening',
      reasoning: 'ै (vriddhi) → ि (simple vowel)',
      process: 'vriddhi_to_simple'
    },
    'ौ': { 
      substitute: 'ु', 
      type: 'vriddhi_shortening',
      reasoning: 'ौ (vriddhi) → ु (simple vowel)',
      process: 'vriddhi_to_simple'
    },
    'े': { 
      substitute: 'ि', 
      type: 'simple_shortening',
      reasoning: 'े (guna) → ि (simple vowel)',
      process: 'guna_to_simple'
    },
    'ो': { 
      substitute: 'ु', 
      type: 'simple_shortening',
      reasoning: 'ो (guna) → ु (simple vowel)',
      process: 'guna_to_simple'
    }
  },

  // 1.1.48: Articulatory position mapping for vowel analysis
  articulatoryPositions: {
    'e': 'front_mid', 'i': 'front_high', 'ि': 'front_high',
    'o': 'back_mid', 'u': 'back_high', 'ु': 'back_high',
    'ai': 'front_diphthong', 'ै': 'front_diphthong',
    'au': 'back_diphthong', 'ौ': 'back_diphthong',
    'े': 'front_mid', 'ो': 'back_mid'
  },

  // 1.1.49: Genitive patterns for case analysis
  genitivePatterns: [
    // Longer endings first to ensure proper matching
    { ending: 'ानाम्', gender: 'masculine', number: 'plural', declension: 'a_stem' },
    { ending: 'आनाम्', gender: 'feminine', number: 'plural', declension: 'a_stem' },
    { ending: 'आयाः', gender: 'feminine', number: 'singular', declension: 'a_stem' },
    { ending: 'आयोः', gender: 'feminine', number: 'dual', declension: 'a_stem' },
    { ending: 'योः', gender: 'masculine', number: 'dual', declension: 'a_stem' },
    { ending: 'यास्', gender: 'feminine', number: 'singular', declension: 'a_stem' },
    { ending: 'ोः', gender: 'various', number: 'dual', declension: 'consonant_stem' },
    { ending: 'स्य', gender: 'masculine', number: 'singular', declension: 'a_stem' },
    { ending: 'आम्', gender: 'various', number: 'plural', declension: 'consonant_stem' },
    { ending: 'ः', gender: 'various', number: 'singular', declension: 'consonant_stem' }
  ],

  // 1.1.49: Substitution types for grammatical analysis
  substitutionTypes: {
    phoneme: {
      process: 'phonemic_substitution',
      context: 'sound_change',
      description: 'One sound replaces another'
    },
    morpheme: {
      process: 'morphemic_substitution', 
      context: 'morphological_change',
      description: 'One morpheme replaces another'
    },
    word: {
      process: 'lexical_substitution',
      context: 'word_replacement',
      description: 'One word replaces another'
    },
    affix: {
      process: 'affixal_substitution',
      context: 'derivational_change', 
      description: 'One affix replaces another'
    }
  },

  // Krinvadi verbs (Class V) - inherently transitive verbs (from 1.1.35)
  krinvadiVerbs: {
    // Core krinvadi roots with detailed information
    'kṛ': { 
      meaning: 'to do, make', 
      forms: ['karoti', 'kurute', 'kurute'],
      examples: ['karma karoti', 'yajñam karoti'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'bhṛ': { 
      meaning: 'to bear, carry', 
      forms: ['bharati', 'bharate'],
      examples: ['bhāram bharati', 'dhanaṃ bharati'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'ji': { 
      meaning: 'to conquer, win', 
      forms: ['jayati', 'jinate'],
      examples: ['śatruṃ jayati', 'raṇaṃ jinate'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'śru': { 
      meaning: 'to hear, listen', 
      forms: ['śṛṇoti', 'śṛṇute'],
      examples: ['śabdaṃ śṛṇoti', 'vācaṃ śṛṇute'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'brū': { 
      meaning: 'to speak, say', 
      forms: ['bravīti', 'brūte'],
      examples: ['vākyaṃ bravīti', 'satyaṃ brūte'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'dhṛ': { 
      meaning: 'to hold, support', 
      forms: ['dharati', 'dhārayati'],
      examples: ['āyudhaṃ dharati', 'bhāram dhārayati'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'pṛ': { 
      meaning: 'to fill, satisfy', 
      forms: ['pṛṇoti', 'pṛṇute'],
      examples: ['ghaṭaṃ pṛṇoti', 'kāmān pṛṇute'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'tṛ': { 
      meaning: 'to cross, overcome', 
      forms: ['tarati', 'tarate'],
      examples: ['nadīṃ tarati', 'saṃkaṭaṃ tarate'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'vṛ': { 
      meaning: 'to choose, select', 
      forms: ['vṛṇoti', 'vṛṇute'],
      examples: ['mārgas vṛṇoti', 'kanyāṃ vṛṇute'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nu/nv'
    },
    'yuj': { 
      meaning: 'to join, unite', 
      forms: ['yunakti', 'yuṅkte'],
      examples: ['hayān yunakti', 'bandhuṃ yuṅkte'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'na/nk'
    },
    'bandh': { 
      meaning: 'to bind, tie', 
      forms: ['badhnāti', 'badhnīte'],
      examples: ['rajjuṃ badhnāti', 'pāśaṃ badhnīte'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nā'
    },
    'chid': { 
      meaning: 'to cut, break', 
      forms: ['chinatti', 'chinte'],
      examples: ['vṛkṣaṃ chinatti', 'rajjuṃ chinte'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'na'
    },
    'sṛj': { 
      meaning: 'to emit, create', 
      forms: ['sṛjati', 'sṛjate'],
      examples: ['jalaṃ sṛjati', 'kāvyaṃ sṛjate'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'na'
    },
    'gṛh': { 
      meaning: 'to seize, take', 
      forms: ['gṛhṇāti', 'gṛhṇīte'],
      examples: ['hastena gṛhṇāti', 'vastram gṛhṇīte'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'nā'
    },
    'bhid': { 
      meaning: 'to split, break', 
      forms: ['bhinatti', 'bhinte'],
      examples: ['śailaṃ bhinatti', 'kāṣṭhaṃ bhinte'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'na'
    },
    'rudh': { 
      meaning: 'to obstruct, block', 
      forms: ['ruṇaddhi', 'runddhe'],
      examples: ['mārgaṃ ruṇaddhi', 'gatim runddhe'],
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      nasal_infix: 'na'
    },
    
    // Inflected forms for recognition
    'karoti': { 
      meaning: 'does, makes', 
      forms: ['karoti'],
      examples: ['karma karoti'],
      root: 'kṛ',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'active_present'
    },
    'kurute': { 
      meaning: 'does (middle)', 
      forms: ['kurute'],
      examples: ['yajñaṃ kurute'],
      root: 'kṛ',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'middle_present'
    },
    'śṛṇoti': { 
      meaning: 'hears', 
      forms: ['śṛṇoti'],
      examples: ['vākyaṃ śṛṇoti'],
      root: 'śru',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'active_present'
    },
    'bravīti': { 
      meaning: 'speaks', 
      forms: ['bravīti'],
      examples: ['satyaṃ bravīti'],
      root: 'brū',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'active_present'
    },
    'yunakti': { 
      meaning: 'joins', 
      forms: ['yunakti'],
      examples: ['aśvān yunakti'],
      root: 'yuj',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'active_present'
    },
    'badhnāti': { 
      meaning: 'binds', 
      forms: ['badhnāti'],
      examples: ['pāśaṃ badhnāti'],
      root: 'bandh',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'active_present'
    },
    'chinatti': { 
      meaning: 'cuts', 
      forms: ['chinatti'],
      examples: ['śākhaṃ chinatti'],
      root: 'chid',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'active_present'
    },
    'śṛṇute': { 
      meaning: 'hears (middle)', 
      forms: ['śṛṇute'],
      examples: ['vācaṃ śṛṇute'],
      root: 'śru',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'middle_present'
    },
    'brūte': { 
      meaning: 'speaks (middle)', 
      forms: ['brūte'],
      examples: ['satyaṃ brūte'],
      root: 'brū',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'middle_present'
    },
    'gṛhṇāti': { 
      meaning: 'seizes', 
      forms: ['gṛhṇāti'],
      examples: ['hastena gṛhṇāti'],
      root: 'gṛh',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'active_present'
    },
    'bhinatti': { 
      meaning: 'splits', 
      forms: ['bhinatti'],
      examples: ['śailaṃ bhinatti'],
      root: 'bhid',
      class: 'Class V (kṛṇvādi)',
      transitivity: 'transitive',
      form_type: 'active_present'
    }
  },

  // Krinvadi transitivity contexts for analysis (from 1.1.35)
  krinvadiTransitivityContexts: [
    'object_present',          // Direct object explicitly present
    'passive_construction',    // Passive voice construction
    'causative_construction',  // Causative construction
    'compound_formation',      // Used in compound formation
    'derivational_process',    // Derivational morphology
    'syntactic_analysis',      // General syntactic analysis
    'transitive_usage'         // Explicitly transitive usage
  ],

  // Krinvadi inflection patterns with root extraction (from 1.1.35)
  krinvadiInflectionPatterns: [
    { pattern: /^(.*)oti$/, type: 'class_v_active', extraction: verb => verb.replace(/oti$/, '') },
    { pattern: /^(.*)ute$/, type: 'class_v_middle', extraction: verb => verb.replace(/ute$/, '') },
    { pattern: /^(.*)ati$/, type: 'class_v_active_alt', extraction: verb => verb.replace(/ati$/, '') },
    { pattern: /^(.*)ate$/, type: 'class_v_middle_alt', extraction: verb => verb.replace(/ate$/, '') },
    { pattern: /^(.*)noti$/, type: 'class_v_nasal_active', extraction: verb => verb.replace(/noti$/, '') },
    { pattern: /^(.*)nute$/, type: 'class_v_nasal_middle', extraction: verb => verb.replace(/nute$/, '') },
    { pattern: /^(.*)akti$/, type: 'class_v_strengthened', extraction: verb => verb.replace(/akti$/, '') },
    { pattern: /^(.*)kte$/, type: 'class_v_strengthened_middle', extraction: verb => verb.replace(/kte$/, '') }
  ],

  // Root mappings for irregular krinvadi forms (from 1.1.35)
  krinvadiRootMappings: {
    'karo': 'kṛ',
    'kuru': 'kṛ',
    'śṛṇo': 'śru',
    'śṛṇu': 'śru',
    'bravi': 'brū',
    'brūhi': 'brū',
    'yuna': 'yuj',
    'yunā': 'yuj',
    'badh': 'bandh',
    'bandha': 'bandh',
    'china': 'chid',
    'chinda': 'chid'
  },

  // Root mappings for irregular avikarana forms (from 1.1.36)
  avikaranaRootMappings: {
    'dadā': 'dā',
    'dadhā': 'dhā',
    'jahā': 'hā',
    'mimā': 'mā',
    'juho': 'hu',
    'tiṣṭha': 'sthā'
  },

  // Nipata words for avyaya classification (from 1.1.37)
  nipataWordsAvyaya: [
    // Single vowel particles (as per 1.1.14)
    'a', 'ā', 'i', 'ī', 'u', 'ū', 'e', 'o', 'ai', 'au',
    
    // Common particles
    'ca', 'vā', 'hi', 'tu', 'nu', 'kila', 'nāma', 'vai', 'sma', 'ha',
    'atha', 'atho', 'uta', 'atha vā', 'kiṃ ca', 'yathā ca',
    'iti', 'cet', 'yadi', 'ced', 'no', 'mā', 'na',
    
    // Emphatic particles
    'eva', 'tu', 'hi', 'vai', 'nūnam', 'khalu', 'kila',
    
    // Conjunctions
    'atha', 'tathā', 'yathā', 'tadvat', 'evam',
    
    // Negation particles
    'na', 'mā', 'no'
  ],

  // Svaradi words - words beginning with svar etc. (from 1.1.37)
  svaradiWords: [
    'svar',      // स्वर् - heaven
    'punar',     // पुनर् - again
    'santar',    // सन्तर् - within
    'antar',     // अन्तर् - between/within
    'prātar',    // प्रातर् - morning
    'ciraṃ',     // चिरम् - long time
    'sāyam',     // सायम् - evening
    'sadyaḥ',    // सद्यः - immediately
    'śaśvat',    // शश्वत् - always
    'sanāt',     // सनात् - from old times
    'purā',      // पुरा - formerly
    'yugapat',   // युगपत् - simultaneously
    'ekadā',     // एकदा - once
    'kadā',      // कदा - when
    'tadā',      // तदा - then
    'yadā',      // यदा - when
    'sarvadā',   // सर्वदा - always
    'kadācit',   // कदाचित् - sometimes
    'muhur',     // मुहुर् - repeatedly
    'drāk',      // द्राक् - quickly
    'śīghram',   // शीघ्रम् - quickly
    'sahasā',    // सहसा - suddenly
    'akasmat'    // अकस्मात् - suddenly
  ],

  // Svaradi prefixes for pattern matching (from 1.1.37)
  svaradiPrefixes: ['svar', 'punar', 'antar', 'santar', 'prātar'],

  // Taddhita affix patterns with types and meanings (from 1.1.38)
  taddhitaPatterns: [
    // Longer patterns first to avoid shorter matches
    { pattern: /.*ayana$/i, type: 'ayana', meaning: 'descendant of' },
    { pattern: /.*maya$/i, type: 'maya', meaning: 'made of' },
    { pattern: /.*kalpa$/i, type: 'kalpa', meaning: 'like/almost' },
    { pattern: /.*prakara$/i, type: 'prakāra', meaning: 'manner/type' },
    { pattern: /.*tana$/i, type: 'tana', meaning: 'extending to' },
    
    // Medium length patterns
    { pattern: /.*eya$/i, type: 'eya', meaning: 'descendant of' },
    { pattern: /.*ika$/i, type: 'ika', meaning: 'relating to' },
    { pattern: /.*iya$/i, type: 'iya', meaning: 'belonging to' },
    { pattern: /.*tva$/i, type: 'tva', meaning: 'abstract quality' },
    { pattern: /.*tas$/i, type: 'tas', meaning: 'from/in direction of' },
    { pattern: /.*tra$/i, type: 'tra', meaning: 'in the direction of' },
    { pattern: /.*dhā$/i, type: 'dhā', meaning: 'fold/manner' },
    { pattern: /.*dha$/i, type: 'dha', meaning: 'fold/manner' },
    { pattern: /.*sat$/i, type: 'śat', meaning: 'hundred-fold' },
    { pattern: /.*vat$/i, type: 'vat', meaning: 'like/having' },
    
    // Shorter patterns last
    { pattern: /.*ya$/i, type: 'ya', meaning: 'descendant of' },
    { pattern: /.*ta$/i, type: 'ta', meaning: 'abstract quality' }
  ],

  // Typically indeclinable taddhita affixes (from 1.1.38)
  typicallyIndeclinableAffixes: [
    'tas', 'tra', 'dha', 'dhā', 'śat', 'kalpa', 'prakāra'
  ],

  // Indeclinable affix types for validation (from 1.1.38)
  indeclinableAffixTypes: [
    'tas',      // direction/source
    'tra',      // direction  
    'dha',      // manner/fold
    'śat',      // hundred-fold
    'kalpa',    // like/almost
    'prakāra'   // manner/type
  ],

  // Krit affix patterns with types and meanings (from 1.1.39)
  kritPatterns: [
    // Infinitive patterns (ending in -um)
    { pattern: /.*tum$/, type: 'tum', ending: 'उम्', meaning: 'infinitive' },
    { pattern: /.*itum$/, type: 'itum', ending: 'उम्', meaning: 'infinitive' },
    
    // Participial patterns (ending in -ḥ, -aḥ, etc.)
    { pattern: /.*aḥ$/, type: 'aḥ', ending: 'अः', meaning: 'participle' },
    { pattern: /.*taḥ$/, type: 'taḥ', ending: 'अः', meaning: 'participle' },
    { pattern: /.*itaḥ$/, type: 'itaḥ', ending: 'अः', meaning: 'participle' },
    
    // Participles ending in qualifying letters
    { pattern: /.*am$/, type: 'am', ending: 'म्', meaning: 'absolutive' },
    { pattern: /.*tvā$/, type: 'tvā', ending: 'आ', meaning: 'absolutive' },
    
    // Words ending in ए (e)
    { pattern: /.*ne$/, type: 'ne', ending: 'ए', meaning: 'infinitive-like' },
    { pattern: /.*se$/, type: 'se', ending: 'ए', meaning: 'infinitive-like' },
    { pattern: /.*te$/, type: 'te', ending: 'ए', meaning: 'locative infinitive' },
    
    // Words ending in ओ (o)
    { pattern: /.*to$/, type: 'to', ending: 'ओ', meaning: 'adverbial' },
    { pattern: /.*no$/, type: 'no', ending: 'ओ', meaning: 'adverbial' },
    
    // Words ending in ऐ (ai) - less common
    { pattern: /.*ai$/, type: 'ai', ending: 'ऐ', meaning: 'adverbial' },
    
    // Words ending in औ (au) - less common
    { pattern: /.*au$/, type: 'au', ending: 'औ', meaning: 'adverbial' },
    
    // Gerundive and participial forms that may end in qualifying letters
    { pattern: /.*ya$/, type: 'ya', ending: 'अ', meaning: 'gerundive' }, // This doesn't qualify
    { pattern: /.*tavya$/, type: 'tavya', ending: 'अ', meaning: 'gerundive' }, // This doesn't qualify
    
    // Specific indeclinable formations
    { pattern: /.*tam$/, type: 'tam', ending: 'म्', meaning: 'superlative adverb' },
    { pattern: /.*vam$/, type: 'vam', ending: 'म्', meaning: 'adverbial' },
    { pattern: /.*vām$/, type: 'vām', ending: 'म्', meaning: 'adverbial' }
  ],

  // Qualifying endings for krit affixes (from 1.1.39)
  kritQualifyingEndings: {
    'm': 'म्',     // म्
    'e': 'ए',     // ए  
    'o': 'ओ',     // ओ
    'ai': 'ऐ',    // ऐ
    'au': 'औ'     // औ
  },

  // Qualifying affix types that create avyaya words (from 1.1.39)
  kritQualifyingAffixes: [
    'am',       // absolutive ending in म्
    'tam',      // superlative adverb ending in म्
    'vam',      // adverbial ending in म्
    'ne',       // infinitive-like ending in ए
    'se',       // infinitive-like ending in ए
    'te',       // locative infinitive ending in ए
    'to',       // adverbial ending in ओ
    'no',       // adverbial ending in ओ
    'ai',       // adverbial ending in ऐ
    'au'        // adverbial ending in औ
  ],

  // Qualifying context affixes for 1.1.40 (ktvā, tosun, kasun)
  qualifyingContextAffixes: ['ktvā', 'tosun', 'kasun', 'क्त्व', 'तोसुन्', 'कसुन्'],

  // Affix patterns for ktvā, tosun, kasun endings (from 1.1.40)
  sutra140AffixPatterns: [
    // क्त्व (ktvā) - absolutive/gerund
    {
      patterns: [
        /.*ktvā$/, /.*tvā$/, /.*ṭvā$/, /.*ttvā$/, /.*sṭvā$/, 
        /.*ya$/, /.*iya$/, /.*tya$/, /.*sya$/
      ], 
      type: 'ktvā',
      devanagari: 'क्त्व',
      meaning: 'absolutive/gerund',
      examples: ['gatvā', 'kṛtvā', 'bhuktvā', 'dṛṣṭvā']
    },
    
    // तोसुन् (tosun) - specific verbal derivative
    {
      patterns: [/.*tosun$/, /.*toṣ$/, /.*tos$/],
      type: 'tosun',
      devanagari: 'तोसुन्',
      meaning: 'verbal derivative',
      examples: ['less common in classical Sanskrit']
    },
    
    // कसुन् (kasun) - specific verbal derivative  
    {
      patterns: [/.*kasun$/, /.*kas$/, /.*kasu$/],
      type: 'kasun',
      devanagari: 'कसुन्',
      meaning: 'verbal derivative',
      examples: ['less common in classical Sanskrit']
    }
  ],

  // Ktvā patterns for detailed analysis (from 1.1.40)
  ktvaPatterns: [
    /.*tvā$/,     // most common: gatvā, kṛtvā, etc.
    /.*ṭvā$/,     // with retroflex: dṛṣṭvā, etc.
    /.*ttvā$/,    // with double consonant
    /.*sṭvā$/,    // consonant clusters
    /.*ya$/,      // alternate form: gacchya, etc.
    /.*iya$/,     // with connecting vowel
    /.*itvā$/,    // with connecting vowel
    /.*etvā$/     // with connecting vowel
  ],

  // Known avyayībhāva compounds (from 1.1.41)
  knownAvyayibhavaCompounds: [
    'adhigaṅgam', 'pratidinam', 'prativarṣam', 'anukūlam', 'pratikūlam',
    'upanagaraṃ', 'adhipatha', 'abhimukham', 'āsamudram', 'samayas'
  ],

  // Avyaya prefixes for compound formation (from 1.1.41)
  avyayaPrefixes: [
    // Spatial/directional prefixes
    { prefix: 'adhi', meaning: 'above/over', examples: ['adhigaṅgam', 'adhipatha'] },
    { prefix: 'anu', meaning: 'after/along', examples: ['anugaṅgam', 'anuvṛkṣam'] },
    { prefix: 'apa', meaning: 'away from', examples: ['apagaṅgam'] },
    { prefix: 'abhi', meaning: 'towards/against', examples: ['abhimukham'] },
    { prefix: 'ava', meaning: 'down/away', examples: ['avagaṅgam'] },
    { prefix: 'ā', meaning: 'up to/until', examples: ['āsamudram'] },
    { prefix: 'ud', meaning: 'up/out', examples: ['udbhavam'] },
    { prefix: 'upa', meaning: 'near/towards', examples: ['upagaṅgam', 'upanagaraṃ'] },
    { prefix: 'pari', meaning: 'around', examples: ['parigṛham'] },
    { prefix: 'pra', meaning: 'forth/forward', examples: ['prabhātam'] },
    { prefix: 'prati', meaning: 'towards/against', examples: ['pratidinam', 'prativarṣam'] },
    { prefix: 'vi', meaning: 'apart/away', examples: ['vigṛham'] },
    { prefix: 'sam', meaning: 'together/with', examples: ['samudram'] },
    
    // Temporal prefixes
    { prefix: 'sadā', meaning: 'always', examples: ['sadākālam'] },
    { prefix: 'kadā', meaning: 'when', examples: ['kadācit'] },
    
    // Negation
    { prefix: 'a', meaning: 'not/without', examples: ['aśubham'] },
    { prefix: 'an', meaning: 'not/without', examples: ['anarthakam'] }
  ],

  // Common avyaya elements (from 1.1.41)
  commonAvyayaElements: [
    'adhi', 'anu', 'apa', 'abhi', 'ava', 'ā', 'ud', 'upa', 'pari', 'pra', 'prati', 'vi', 'sam',
    'sadā', 'kadā', 'yāvat', 'tāvat', 'ittham', 'evam', 'kim', 'na', 'mā'
  ],

  // Common prefixes for compound analysis (from 1.1.41)
  compoundPrefixes: ['adhi', 'prati', 'anu', 'apa', 'abhi', 'ava', 'upa', 'pari', 'pra', 'vi', 'sam', 'ud'],

  // Sarvanāmasthāna affixes (from 1.1.42)
  sarvanāmasthānaAffixes: [
    // From 1.1.42
    'śi', 'शि',
    
    // From 1.1.43: सुडनपुंसकस्य (su, am, auṭ for neuter)
    'su', 'am', 'auṭ',
    'सु', 'अम्', 'औट्',
    
    // Other common sarvanāmasthāna affixes
    'au', 'औ',           // dual endings
    'jas', 'जस्',        // plural nominative
    'śas', 'शस्',        // plural accusative  
    'ṅe', 'ङे',          // singular dative
    'bhyām', 'भ्याम्',    // dual dative/ablative
    'bhis', 'भिस्',      // plural instrumental
    'ṅas', 'ङस्',        // singular ablative
    'bhyas', 'भ्यस्',    // plural dative/ablative
    'ṅi', 'ङि',          // singular locative
    'os', 'ओस्',         // dual locative
    'sup', 'सुप्'         // general term for nominal endings
  ],

  // Affix categories for grammatical classification (from 1.1.42)
  affixCategories: {
    // Nominative
    'su': 'nominative_singular',
    'au': 'nominative_dual', 
    'jas': 'nominative_plural',
    
    // Accusative
    'am': 'accusative_singular',
    'auṭ': 'accusative_dual',
    'śas': 'accusative_plural',
    
    // Instrumental
    'ṭā': 'instrumental_singular',
    'bhyām': 'instrumental_dual',
    'bhis': 'instrumental_plural',
    
    // Dative
    'ṅe': 'dative_singular',
    'bhyas': 'dative_plural',
    
    // Ablative  
    'ṅas': 'ablative_singular',
    
    // Locative
    'ṅi': 'locative_singular',
    'os': 'locative_dual',
    
    // Special
    'śi': 'locative_singular_special'
  },
  
  // Taya affix patterns (from 1.1.33)
  tayaAffixPatterns: {
    iast: ['taya', 'tīya', 'tya'],
    devanagari: ['तय', 'तीय', 'त्य'],
    description: 'Affix patterns related to तय (taya) mentioned in 1.1.33'
  },
  
  // Common case endings for base extraction (from 1.1.33)
  caseEndings: {
    iast: ['āḥ', 'ān', 'aiḥ', 'aḥ', 'e', 'au', 'am', 'ena', 'ābhyām', 'bhis'],
    devanagari: ['आः', 'आन्', 'ऐः', 'अः', 'ए', 'औ', 'अम्', 'एन', 'आभ्याम्', 'भिस्'],
    description: 'Common case endings used for extracting word bases'
  }
};

/**
 * Script Detection Patterns - Centralized regex patterns
 * Used across multiple sutras for consistent script identification
 */
export const ScriptPatterns = {
  // Single character patterns (from 1.1.21)
  singleLetter: {
    iast: /^[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ]$/,
    devanagari: /^[\u0900-\u097F]$/,
    combined: /^[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ]$|^[\u0900-\u097F]$/
  },
  
  // Consonant with halanta pattern
  consonantWithHalanta: /^[\u0915-\u0939]\u094D$/,
  
  // Complete phoneme patterns  
  singlePhoneme: /^[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ]$|^[\u0900-\u097F]$|^[\u0915-\u0939]\u094D$/,
  
  // Script detection ranges
  scriptRanges: {
    devanagari: /[\u0900-\u097F]/,
    iast: /[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ]/,
    mixed: /(?=.*[\u0900-\u097F])(?=.*[a-zA-Z])/
  }
};

/**
 * Validation Patterns - Common validation rules
 * Used across multiple sutras for input validation
 */
export const ValidationPatterns = {
  // Sanskrit word validation
  validSanskritWord: {
    iast: /^[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ\s]+$/,
    devanagari: /^[\u0900-\u097F\s]+$/
  },
  
  // Phoneme sequence validation
  validPhonemeSequence: /^[a-zA-Zāīūṛḷṅñṭḍṇśṣṃḥ]+$/,
  
  // Empty or whitespace
  emptyOrWhitespace: /^\s*$/
};
