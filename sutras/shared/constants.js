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
