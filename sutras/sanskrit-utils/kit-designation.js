/**
 * Kit Designation Utility Module
 * 
  
  // Sutra 1.2.15: यमो गन्धने
  // यम् root in the sense of 'to divulge'
  sutra_1_2_15: {
    devanagari: ['यम्'],
    iast: ['yam'],
    affixes: ['सिच्'], // सिच् affix is कित् after यम् in specific meaning
    meaning: 'गन्धन', // meaning 'to divulge'
    description: 'Root यम् in the sense of गन्धन after which सिच् affix is कित्'
  },

  // Sutra 1.2.9: इको झल्
  // After ANY इक्-ending root, झल्-beginning affixes are कित्
  // This is a general phonological rule, not limited to specific roots
  sutra_1_2_9: [],  // Empty array since this applies to any इक्-ending root

  // Sutra 1.2.10: हलन्ताच्च  
  // After ANY हल्-ending root (consonant-ending), झल्-beginning affixes are कित्
  // This is a general phonological rule, not limited to specific roots
  sutra_1_2_10: [], // Empty array since this applies to any हल्-ending rootdule provides utilities for कित् (kit) designation of Sanskrit affixes.
 * कित् designation is crucial in Sanskrit grammar as it affects how affixes interact
 * with roots, particularly in terms of guṇa/vṛddhi operations and other transformations.
 * 
 * Key Features:
 * - Affix कित् designation analysis
 * - Root-specific कित् rules (sutras 1.2.8-1.2.15)
 * - Contextual कित् determination (ātmanepada, jhali, etc.)
 * - Multi-script support for Devanagari and IAST
 * 
 * Based on: Sutras 1.2.8-1.2.15 (कित्त्वातिदेश rules)
 * Created: December 2025
 */

import { detectScript } from './script-detection.js';
import { validateSanskritWord } from './validation.js';
import { COMMON_PRATYAHARAS } from './pratyahara-construction.js';
import { isAtmanepadaAffix } from './pada-analysis.js';
import { hasSetAugment } from './kit-analysis.js';

/**
 * Database of roots that take कित् affixes according to specific sutras
 */
export const KIT_DESIGNATION_ROOTS = {
  // Sutra 1.2.8: रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च
  // रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ् roots
  sutra_1_2_8: {
    devanagari: ['रुद्', 'विद्', 'मुष्', 'गृह्', 'स्वप्', 'प्रच्छ्'],
    iast: ['rud', 'vid', 'muṣ', 'gṛh', 'svap', 'pracch'],
    affixes: ['क्त्वा', 'सन्'], // क्त्वा and सन् affixes are कित् after these roots
    description: 'Roots after which क्त्वा and सन् affixes are कित्'
  },
  
  // Sutra 1.2.14: हनः सिच्
  // हन् root with सिच् affix  
  sutra_1_2_14: {
    devanagari: ['हन्'],
    iast: ['han'],
    affixes: ['सिच्'], // सिच् affix is कित् after हन्
    description: 'Root हन् after which सिच् affix is कित्'
  },
  
  // Sutra 1.2.15: यमो गन्धने
  // यम् root in the sense of 'to divulge'
  sutra_1_2_15: {
    devanagari: ['यम्'],
    iast: ['yam'],
    affixes: ['सिच्'], // सिच् affix is कित् after यम् in specific meaning
    meaning: 'गन्धन', // meaning 'to divulge'
    description: 'Root यम् in meaning of divulging, after which सिच् affix is कित्'
  }
};

/**
 * Root variants and alternative forms for kit designation roots
 */
export const KIT_ROOT_VARIANTS = {
  devanagari: {
    'रुद्': ['रुद्', 'रुद', 'रुदि'],
    'विद्': ['विद्', 'विद', 'वेद्', 'वेत्ति'],
    'मुष्': ['मुष्', 'मुष', 'मोष्टु'],
    'गृह्': ['गृह्', 'गृह', 'गृहि', 'ग्रह्'],
    'स्वप्': ['स्वप्', 'स्वप', 'सुप्'],
    'प्रच्छ्': ['प्रच्छ्', 'प्रच्छ', 'पृच्छ्', 'प्रष्ट'],
    'हन्': ['हन्', 'हन', 'वध्', 'घ्न'],
    'यम्': ['यम्', 'यम', 'यच्छ्']
  },
  iast: {
    'rud': ['rud', 'ruda', 'rudi'],
    'vid': ['vid', 'vida', 'ved', 'vetti'],
    'muṣ': ['muṣ', 'muṣa', 'moṣṭu'],
    'gṛh': ['gṛh', 'gṛha', 'gṛhi', 'grah'],
    'svap': ['svap', 'svapa', 'sup'],
    'pracch': ['pracch', 'praccha', 'pṛcch', 'praṣṭa'],
    'han': ['han', 'hana', 'vadh', 'ghna'],
    'yam': ['yam', 'yama', 'yacch']
  }
};

/**
 * Common affixes that can receive कित् designation
 */
export const KIT_AFFIXES = {
  devanagari: {
    'क्त्वा': ['क्त्वा', 'क्त्व', 'त्वा'],
    'सन्': ['सन्', 'स', 'सि'],
    'सिच्': ['सिच्', 'सि', 'इष्य', 'इस्य', 'ष्य', 'स्य'],
    'लिङ्': ['लिङ्', 'लिं', 'ली', 'यात्', 'ईत्', 'य']
  },
  iast: {
    'ktvā': ['ktvā', 'ktva', 'tvā'],
    'san': ['san', 'sa', 'si', 's'],
    'sic': ['sic', 'si', 'iṣya', 'isya', 'ṣya', 'sya'],
    'liṅ': ['liṅ', 'liṃ', 'lī', 'yāt', 'īt', 'ya']
  }
};

/**
 * Checks if a root is one of the specific roots from Sutra 1.2.8
 * (रुद्, विद्, मुष्, गृह्, स्वप्, प्रच्छ्)
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is from Sutra 1.2.8
 */
export function isSutra128Root(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return KIT_DESIGNATION_ROOTS.sutra_1_2_8.devanagari.some(r => 
      KIT_ROOT_VARIANTS.devanagari[r]?.includes(cleanRoot)
    );
  } else {
    return KIT_DESIGNATION_ROOTS.sutra_1_2_8.iast.some(r => 
      KIT_ROOT_VARIANTS.iast[r]?.includes(cleanRoot)
    );
  }
}

/**
 * Checks if a root is हन् (from Sutra 1.2.14)
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is हन्
 */
export function isHanRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return KIT_ROOT_VARIANTS.devanagari['हन्']?.includes(cleanRoot) || false;
  } else {
    return KIT_ROOT_VARIANTS.iast['han']?.includes(cleanRoot) || false;
  }
}

/**
 * Checks if a root is यम् (from Sutra 1.2.15)
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is यम्
 */
export function isYamRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return KIT_ROOT_VARIANTS.devanagari['यम्']?.includes(cleanRoot) || false;
  } else {
    return KIT_ROOT_VARIANTS.iast['yam']?.includes(cleanRoot) || false;
  }
}

/**
 * Checks if a root is गम् (from Sutra 1.2.13)
 * @param {string} root - The root to check
 * @returns {boolean} - True if the root is गम्
 */
export function isGamRoot(root) {
  if (!root || typeof root !== 'string') {
    return false;
  }

  const cleanRoot = root.trim();
  const script = detectScript(cleanRoot);
  
  if (script === 'Devanagari') {
    return cleanRoot === 'गम्' || cleanRoot === 'गम' || cleanRoot === 'गच्छ्';
  } else {
    return cleanRoot === 'gam' || cleanRoot === 'gama' || cleanRoot === 'gacch';
  }
}

/**
 * Checks if an affix is क्त्वा or सन्
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is क्त्वा or सन्
 */
export function isKtvaOrSanAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  if (script === 'Devanagari') {
    return KIT_AFFIXES.devanagari['क्त्वा']?.includes(cleanAffix) ||
           KIT_AFFIXES.devanagari['सन्']?.includes(cleanAffix) || false;
  } else {
    return KIT_AFFIXES.iast['ktvā']?.includes(cleanAffix) ||
           KIT_AFFIXES.iast['san']?.includes(cleanAffix) || false;
  }
}

/**
 * Checks if an affix is सिच्
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is सिच्
 */
export function isSicAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  if (script === 'Devanagari') {
    return KIT_AFFIXES.devanagari['सिच्']?.includes(cleanAffix) || false;
  } else {
    return KIT_AFFIXES.iast['sic']?.includes(cleanAffix) || false;
  }
}

/**
 * Checks if an affix is लिङ्
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is लिङ्
 */
export function isLingAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  if (script === 'Devanagari') {
    return KIT_AFFIXES.devanagari['लिङ्']?.includes(cleanAffix) || false;
  } else {
    return KIT_AFFIXES.iast['liṅ']?.includes(cleanAffix) || false;
  }
}

/**
 * Checks if an affix is सन् (desiderative)
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if the affix is सन्
 */
export function isSanAffix(affix) {
  if (!affix || typeof affix !== 'string') {
    return false;
  }

  const cleanAffix = affix.trim();
  const script = detectScript(cleanAffix);
  
  if (script === 'Devanagari') {
    return KIT_AFFIXES.devanagari['सन्']?.includes(cleanAffix) || false;
  } else {
    return KIT_AFFIXES.iast['san']?.includes(cleanAffix) || false;
  }
}

/**
 * Determines if an affix should be कित् after a specific root according to Sutra 1.2.8
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @returns {boolean} - True if the affix should be कित्
 */
export function isKitBySutra128(root, affix) {
  return isSutra128Root(root) && isKtvaOrSanAffix(affix);
}

/**
 * Determines if सिच् affix should be कित् after हन् root (Sutra 1.2.14)
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @returns {boolean} - True if the affix should be कित्
 */
export function isKitBySutra1214(root, affix) {
  return isHanRoot(root) && isSicAffix(affix);
}

/**
 * Determines if सिच् affix should be कित् after यम् root in meaning of 'to divulge' (Sutra 1.2.15)
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @param {string} meaning - The meaning context (optional)
 * @returns {boolean} - True if the affix should be कित्
 */
export function isKitBySutra1215(root, affix, meaning = null) {
  const isYamWithSic = isYamRoot(root) && isSicAffix(affix);
  
  // If no meaning provided, assume it applies (as per traditional grammar)
  if (!meaning) {
    return isYamWithSic;
  }
  
  // If meaning is provided, check if it relates to 'divulging/revealing'
  // But in practice, Sutra 1.2.15 applies to यम् + सिच् generally unless context specifically restricts
  const meaningLower = meaning.toLowerCase();
  const isRestricted = meaningLower.includes('restrain') || meaningLower.includes('control');
  
  // For गन्धन meaning (divulging), it definitely applies
  const isDivulging = meaningLower.includes('divulg') ||
                     meaningLower.includes('reveal') ||
                     meaningLower.includes('गन्धन') ||
                     meaningLower.includes('expose');
  
  // Apply unless specifically restricted to restraining meaning
  return isYamWithSic && (isDivulging || !isRestricted);
}

/**
 * Determines if झल्-beginning affix should be कित् after इक्-ending root (Sutra 1.2.9)
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @returns {boolean} - True if the affix should be कित्
 */
export function isKitBySutra129(root, affix) {
  // Sutra 1.2.9: इको झल् - specifically about सन् affix after इक्-ending roots
  return endsWithIka(root) && isSanAffix(affix);
}

/**
 * Determines if झल्-beginning affix should be कित् after हल्-ending root (Sutra 1.2.10)
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @returns {boolean} - True if the affix should be कित्
 */
export function isKitBySutra1210(root, affix) {
  // Sutra 1.2.10: हलन्ताच्च - specifically about सन् affix after हल्-ending roots  
  return endsWithHal(root) && isSanAffix(affix);
}

/**
 * Checks if a root ends with इक् vowels (i, u, ṛ, ḷ)
 * @param {string} root - The root to check
 * @returns {boolean} - True if root ends with इक्
 */
export function endsWithIka(root) {
  if (!root || typeof root !== 'string') return false;
  
  const normalizedRoot = root.trim();
  if (!normalizedRoot) return false;
  
  const ikaPratyahara = COMMON_PRATYAHARAS.ik;
  
  // For Devanagari, check for vowel signs and independent vowels
  if (detectScript(root) === 'Devanagari') {
    // Check for vowel signs (matras)
    const devanagariMatras = {
      'ि': 'i',    // i-matra
      'ु': 'u',    // u-matra  
      'ृ': 'ṛ',    // ṛ-matra
      'ॢ': 'ḷ'     // ḷ-matra
    };
    
    // Check if root ends with any of these matras
    for (const [matra, iast] of Object.entries(devanagariMatras)) {
      if (normalizedRoot.endsWith(matra) && ikaPratyahara.includes(iast)) {
        return true;
      }
    }
    
    // Check for independent vowels at the end
    const devanagariVowels = {
      'इ': 'i',
      'उ': 'u', 
      'ऋ': 'ṛ',
      'ऌ': 'ḷ'
    };
    
    for (const [vowel, iast] of Object.entries(devanagariVowels)) {
      if (normalizedRoot.endsWith(vowel) && ikaPratyahara.includes(iast)) {
        return true;
      }
    }
  } else {
    // For IAST, check directly
    const lastChar = normalizedRoot[normalizedRoot.length - 1].toLowerCase();
    return ikaPratyahara.includes(lastChar);
  }
  
  return false;
}

/**
 * Checks if a root ends with हल् consonants
 * @param {string} root - The root to check
 * @returns {boolean} - True if root ends with हल्
 */
export function endsWithHal(root) {
  if (!root || typeof root !== 'string') return false;
  
  const normalizedRoot = root.trim();
  if (!normalizedRoot) return false;
  
  const halPratyahara = COMMON_PRATYAHARAS.hal;
  
  // Get the last character, handling virama
  let lastChar = normalizedRoot[normalizedRoot.length - 1];
  
  // If the last character is virama (्), get the consonant before it
  if (lastChar === '्') {
    if (normalizedRoot.length > 1) {
      lastChar = normalizedRoot[normalizedRoot.length - 2];
    } else {
      return false;
    }
  }
  
  // For Devanagari consonants, convert to IAST
  if (detectScript(root) === 'Devanagari') {
    const devanagariToIast = {
      'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
      'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
      'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
      'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
      'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
      'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
      'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h'
    };
    
    const iastEquivalent = devanagariToIast[lastChar];
    if (iastEquivalent && halPratyahara.includes(iastEquivalent)) {
      return true;
    }
  }
  
  // For IAST, check directly
  return halPratyahara.includes(lastChar.toLowerCase());
}

/**
 * Checks if an affix begins with झल् consonants
 * @param {string} affix - The affix to check
 * @returns {boolean} - True if affix begins with झल्
 */
export function beginsWithJhal(affix) {
  if (!affix || typeof affix !== 'string') return false;
  
  const normalizedAffix = affix.trim();
  if (!normalizedAffix) return false;
  
  // Get the first character
  const firstChar = normalizedAffix[0];
  
  // Use the predefined हल् pratyahara (which is equivalent to झल् in this context)
  const jhalPratyahara = COMMON_PRATYAHARAS.hal;
  
  // Check if the first character is in the झल् pratyahara
  if (jhalPratyahara.includes(firstChar.toLowerCase())) {
    return true;
  }
  
  // Convert Devanagari to IAST and check
  if (detectScript(affix) === 'Devanagari') {
    const devanagariToIast = {
      'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ṅ',
      'च': 'c', 'छ': 'ch', 'ज': 'j', 'झ': 'jh', 'ञ': 'ñ',
      'ट': 'ṭ', 'ठ': 'ṭh', 'ड': 'ḍ', 'ढ': 'ḍh', 'ण': 'ṇ',
      'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
      'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
      'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
      'श': 'ś', 'ष': 'ṣ', 'स': 's', 'ह': 'h'
    };
    
    const iastEquivalent = devanagariToIast[firstChar];
    return iastEquivalent && jhalPratyahara.includes(iastEquivalent);
  }
  
  return false;
}

/**
 * Comprehensive कित् designation analysis
 * @param {string} root - The root
 * @param {string} affix - The affix
 * @param {Object} context - Optional context object with meaning, pada, etc.
 * @returns {Object} - Analysis result with kit status and applicable sutras
 */
export function analyzeKitDesignation(root, affix, context = {}) {
  const result = {
    isKit: false,
    applicableSutras: [],
    reasoning: []
  };

  // Check Sutra 1.2.8 (most specific - listed roots with क्त्वा/सन्)
  if (isKitBySutra128(root, affix)) {
    result.isKit = true;
    result.applicableSutras.push('1.2.8');
    result.reasoning.push('रुदविदमुषग्रहिस्वपिप्रच्छः सँश्च - Root takes कित् क्त्वा/सन् affixes');
    return result; // Specific rule, don't check general rules
  }

  // Check Sutra 1.2.14 (specific - हन् + सिच्)
  if (isKitBySutra1214(root, affix)) {
    result.isKit = true;
    result.applicableSutras.push('1.2.14');
    result.reasoning.push('हनः सिच् - हन् root takes कित् सिच् affix');
    return result; // Specific rule, don't check general rules
  }

  // Check Sutra 1.2.15 (specific - यम् + सिच् with meaning)
  if (isKitBySutra1215(root, affix, context.meaning)) {
    result.isKit = true;
    result.applicableSutras.push('1.2.15');
    result.reasoning.push('यमो गन्धने - यम् root in divulging sense takes कित् सिच् affix');
    return result; // Specific rule, don't check general rules
  }

  // Check Sutra 1.2.9 (general - इक्-ending roots + झल्-beginning affixes)
  if (isKitBySutra129(root, affix)) {
    result.isKit = true;
    result.applicableSutras.push('1.2.9');
    result.reasoning.push('इकोऽसुरः झलः - इक्-ending roots take कित् झल्-beginning affixes');
  }

  // Check Sutra 1.2.10 (general - हल्-ending roots + झल्-beginning affixes)
  if (isKitBySutra1210(root, affix)) {
    result.isKit = true;
    result.applicableSutras.push('1.2.10');
    result.reasoning.push('हलन्ताच्च - हल्-ending roots take कित् झल्-beginning affixes');
  }

  return result;
}

/**
 * Checks if a root ends with ṛ vowel (for Sutra 1.2.12)
 * @param {string} root - The root to check
 * @returns {boolean} - True if root ends with ṛ
 */
export function endsWithR(root) {
  if (!root || typeof root !== 'string') return false;
  
  const normalizedRoot = root.trim();
  if (!normalizedRoot) return false;
  
  // Check IAST representation
  if (normalizedRoot.endsWith('ṛ')) {
    return true;
  }
  
  // Check Devanagari representation
  if (detectScript(root) === 'Devanagari') {
    // ṛ vowel in Devanagari - independent: ऋ, dependent: ृ
    if (normalizedRoot.endsWith('ऋ') || normalizedRoot.endsWith('ृ')) {
      return true;
    }
  }
  
  return false;
}

// Re-export hasSetAugment from kit-analysis for backward compatibility
export { hasSetAugment };

// Re-export additional functions from kit-analysis
export { isGhuClassRoot, isSthaRoot, isKtvAffix } from './kit-analysis.js';
