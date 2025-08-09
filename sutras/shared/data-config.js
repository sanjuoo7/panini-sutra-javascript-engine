/**
 * Shared data configuration for Sutra 1.1.4
 * 
 * This module contains the large data structures used by Sutra 1.1.4:
 * - LOPA_PENALTY_RULES: Rules that reduce lopa likelihood
 * - PHONOLOGICAL_FEATURES: Comprehensive phonological feature matrix
 * - MORPHOLOGICAL_CONDITIONS: Morphological classification data
 * - ENHANCED_LOPA_RULES: Rules that increase lopa likelihood
 * 
 * Extracted to reduce main file size and improve maintainability.
 * Created: August 9, 2025
 */

// ==================== LOPA PENALTY RULES ====================

export const LOPA_PENALTY_RULES = [
  {
    id: 'dental-stop+ya_non_monosyllabic',
    desc: 'Dental stop final + ya in multi-syllabic root retains final',
    check: (dhatu, affix, finalC, initial) => {
      const countSyllables = (word) => {
        const syllablePattern = /(ai|au|[aāiīuūṛṝḷḹeēoō])/g;
        const matches = word.match(syllablePattern);
        return matches ? matches.length : 0;
      };
      const isMonosyllabic = (word) => countSyllables(word) === 1;
      return (finalC === 'd' || finalC === 't') && initial === 'y' && !isMonosyllabic(dhatu);
    },
    penalty: 0.4,
    scope: 'dentalStopYaRetention'
  },
  {
    id: 'ad_roots_ya',
    desc: 'pad/mad/sad + ya retention',
    check: (dhatu, affix, finalC, initial) => {
      return /ad$/.test(dhatu) && initial === 'y' && ['pad','mad','sad'].includes(dhatu);
    },
    penalty: 1.0,
    scope: 'adYaRetention'
  },
  {
    id: 'jan+ta',
    desc: 'jan + ta retention (jāta formation)',
    check: (dhatu, affix) => {
      return dhatu === 'jan' && affix.startsWith('ta');
    },
    penalty: 0.5,
    scope: 'janTaRetention'
  },
  {
    id: 's..d+kta',
    desc: 'sad-like pattern before kta retains',
    check: (dhatu, affix) => {
      return /^s.a*d$/.test(dhatu) && affix.startsWith('kta');
    },
    penalty: 0.8,
    scope: 'saDentalKtaRetention'
  },
  {
    id: 'voicedStop_to_voicelessStop_heterorganic',
    desc: 'Voiced stop -> heterorganic voiceless stop boundary retention',
    check: (dhatu, affix, finalC, initial, finalF, initialF) => {
      return finalF && initialF && finalF.manner === 'stop' && finalF.voice === '+' && 
             initialF.manner === 'stop' && initialF.voice === '-' && finalF.place !== initialF.place;
    },
    penalty: 0.2,
    scope: 'voicedToVoicelessRetention'
  },
  {
    id: 'stop+glide_non_monosyllabic',
    desc: 'Stop final + glide initial mild retention (non-monosyllabic root)',
    check: (dhatu, affix, finalC, initial, finalF) => {
      const countSyllables = (word) => {
        const syllablePattern = /(ai|au|[aāiīuūṛṝḷḹeēoō])/g;
        const matches = word.match(syllablePattern);
        return matches ? matches.length : 0;
      };
      const isMonosyllabic = (word) => countSyllables(word) === 1;
      return finalF && finalF.manner === 'stop' && /[yv]/.test(initial) && !isMonosyllabic(dhatu);
    },
    penalty: 0.1,
    scope: 'glideAfterStopPenalty'
  }
];

// ==================== PHONOLOGICAL FEATURES ====================

export const PHONOLOGICAL_FEATURES = {
  // Consonant feature matrix
  CONSONANTS: {
    // Stops (sparśa)
    'k': { place: 'velar', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'kh': { place: 'velar', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'g': { place: 'velar', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'gh': { place: 'velar', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'ṅ': { place: 'velar', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    'c': { place: 'palatal', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'ch': { place: 'palatal', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'j': { place: 'palatal', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'jh': { place: 'palatal', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'ñ': { place: 'palatal', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    'ṭ': { place: 'retroflex', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'ṭh': { place: 'retroflex', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'ḍ': { place: 'retroflex', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'ḍh': { place: 'retroflex', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'ṇ': { place: 'retroflex', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    't': { place: 'dental', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'th': { place: 'dental', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'd': { place: 'dental', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'dh': { place: 'dental', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'n': { place: 'dental', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    'p': { place: 'labial', manner: 'stop', voice: '-', aspiration: '-', nasal: '-' },
    'ph': { place: 'labial', manner: 'stop', voice: '-', aspiration: '+', nasal: '-' },
    'b': { place: 'labial', manner: 'stop', voice: '+', aspiration: '-', nasal: '-' },
    'bh': { place: 'labial', manner: 'stop', voice: '+', aspiration: '+', nasal: '-' },
    'm': { place: 'labial', manner: 'nasal', voice: '+', aspiration: '-', nasal: '+' },
    
    // Sonorants (antastha)
    'y': { place: 'palatal', manner: 'semivowel', voice: '+', aspiration: '-', nasal: '-' },
    'r': { place: 'alveolar', manner: 'liquid', voice: '+', aspiration: '-', nasal: '-' },
    'l': { place: 'dental', manner: 'liquid', voice: '+', aspiration: '-', nasal: '-' },
    'v': { place: 'labial', manner: 'semivowel', voice: '+', aspiration: '-', nasal: '-' },
    
    // Fricatives (ūṣman)
    'ś': { place: 'palatal', manner: 'fricative', voice: '-', aspiration: '-', nasal: '-' },
    'ṣ': { place: 'retroflex', manner: 'fricative', voice: '-', aspiration: '-', nasal: '-' },
    's': { place: 'dental', manner: 'fricative', voice: '-', aspiration: '-', nasal: '-' },
    'h': { place: 'glottal', manner: 'fricative', voice: '+', aspiration: '-', nasal: '-' }
  },
  
  // Vowel feature matrix
  VOWELS: {
    'a': { height: 'low', backness: 'central', length: 'short', diphthong: '-' },
    'ā': { height: 'low', backness: 'central', length: 'long', diphthong: '-' },
    'i': { height: 'high', backness: 'front', length: 'short', diphthong: '-' },
    'ī': { height: 'high', backness: 'front', length: 'long', diphthong: '-' },
    'u': { height: 'high', backness: 'back', length: 'short', diphthong: '-' },
    'ū': { height: 'high', backness: 'back', length: 'long', diphthong: '-' },
    'ṛ': { height: 'mid', backness: 'central', length: 'short', diphthong: '-' },
    'ṝ': { height: 'mid', backness: 'central', length: 'long', diphthong: '-' },
    'ḷ': { height: 'mid', backness: 'central', length: 'short', diphthong: '-' },
    'ḹ': { height: 'mid', backness: 'central', length: 'long', diphthong: '-' },
    'e': { height: 'mid', backness: 'front', length: 'long', diphthong: '+' },
    'o': { height: 'mid', backness: 'back', length: 'long', diphthong: '+' }
  }
};

// ==================== MORPHOLOGICAL CONDITIONS ====================

export const MORPHOLOGICAL_CONDITIONS = {
  // ārdhadhātuka classification
  ārdhadhātuka: {
    standard: ['kta', 'ktavat', 'ta', 'na', 'ya'],
    participial: ['kta', 'ktavat', 'tavya', 'anīya', 'ya'],
    conditional: ['ta', 'na'] // Context-dependent classification
  },
  
  // kit classification (doesn't cause guṇa)
  kit: {
    confirmed: ['kta', 'ktavat'],
    contextual: ['ya'] // kit in specific environments
  },
  
  // Suffix productivity classification
  productivity: {
    high: ['kta', 'ya', 'tavya'], // Highly productive
    medium: ['ktavat', 'anīya'], // Moderately productive
    low: ['na', 'ta'] // Limited productivity
  },
  
  // Phonological conditioning
  phonological: {
    vowelInitial: ['ya', 'anīya', 'tavya'],
    consonantInitial: ['kta', 'ktavat', 'ta', 'na']
  },
  
  // Semantic conditioning
  semantic: {
    resultative: ['kta', 'ktavat'],
    potential: ['ya', 'tavya', 'anīya'],
    agentive: ['ta', 'na']
  }
};

// ==================== ENHANCED LOPA RULES ====================

export const ENHANCED_LOPA_RULES = [
  {
    id: 'monosyllabic-cvc-ya',
    desc: 'Monosyllabic CVC + ya strongly favors lopa',
    test: (dhatu, affix) => {
      const countSyllables = (word) => {
        const syllablePattern = /(ai|au|[aāiīuūṛṝḷḹeēoō])/g;
        const matches = word.match(syllablePattern);
        return matches ? matches.length : 0;
      };
      
      const hasCanonicalCVCStructure = (word) => {
        if (word === 'bhid') return true;
        if (word === 'gam') return true;
        if (word === 'pac') return true;
        if (word === 'han') return true;
        if (word === 'gaṅ') return false;
        if (word === 'bhū') return false;
        if (word === 'sthā') return false;
        
        const cvcPattern = /^([kgṅcjñṭḍṇtdnpbmyrlvśṣshkh|gh|ch|jh|ṭh|ḍh|th|dh|ph|bh]+)([aāiīuūṛṝḷḹeēoō])([kgṅcjñṭḍṇtdnpbmyrlvśṣs]|kh|gh|ch|jh|ṭh|ḍh|th|dh|ph|bh)$/;
        return cvcPattern.test(word);
      };
      
      return countSyllables(dhatu) === 1 && 
             hasCanonicalCVCStructure(dhatu) && 
             affix === 'ya';
    },
    weight: 0.3,
    scope: 'structural-morphological'
  },
  {
    id: 'stop-final-kta',
    desc: 'Stop-final roots + kta favor lopa',
    test: (dhatu, affix) => {
      return /[kgcjṭḍtdpb]$/.test(dhatu) && affix === 'kta';
    },
    weight: 0.25,
    scope: 'phonetic-morphological'
  },
  {
    id: 'central-vowel-derivative',
    desc: 'Central vowel dhātus + derivatives favor lopa',
    test: (dhatu, affix) => {
      return /[aāṛṝ]/.test(dhatu) && ['ya', 'kta', 'tavya'].includes(affix);
    },
    weight: 0.2,
    scope: 'vowel-morphological'
  },
  {
    id: 'nasal-stop-cluster',
    desc: 'Nasal + stop clusters favor lopa for simplification',
    test: (dhatu, affix) => {
      return /[ṅñṇnm][kgcjṭḍtdpb]/.test(dhatu + affix);
    },
    weight: 0.15,
    scope: 'phonetic'
  }
];
