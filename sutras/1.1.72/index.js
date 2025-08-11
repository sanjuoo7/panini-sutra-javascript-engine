import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Sutra 1.1.72: येन विधिस्तदन्तस्य
 * yena vidhis tadantasya
 * 
 * "The rule/operation (विधि) by which [something is prescribed] 
 * applies to that which ends with it (तदन्तस्य)."
 * 
 * This sutra establishes the principle of scope determination for 
 * grammatical rules - the domain of a rule extends to elements 
 * that end with the specified component.
 */

/**
 * Types of grammatical rules (विधि) and their scope patterns.
 */
const VIDHI_TYPES = {
  SUFFIX_RULE: 'suffix-rule',           // Rules applying to suffixes
  PHONETIC_RULE: 'phonetic-rule',       // Phonetic change rules
  MORPHOLOGICAL_RULE: 'morphological-rule', // Morphological operations
  CATEGORY_RULE: 'category-rule',       // Category-based rules
  ACCENT_RULE: 'accent-rule',           // Accentual rules
  SANDHI_RULE: 'sandhi-rule'            // Euphonic combination rules
};

/**
 * Scope determination patterns for different rule types.
 */
const SCOPE_PATTERNS = {
  // Suffix-based scoping
  suffixBased: {
    pattern: 'ends-with-suffix',
    examples: ['कृत्', 'तद्धित', 'स्त्री', 'तिङ्'],
    description: 'Rule applies to words ending with specified suffix'
  },
  
  // Phoneme-based scoping  
  phonemeBased: {
    pattern: 'ends-with-phoneme',
    examples: ['अच्', 'हल्', 'अम्', 'अङ्'],
    description: 'Rule applies to words ending with specified phoneme class'
  },
  
  // Morpheme-based scoping
  morphemeBased: {
    pattern: 'ends-with-morpheme',
    examples: ['धातु', 'प्रातिपदिक', 'उपसर्ग'],
    description: 'Rule applies to words ending with specified morphological unit'
  },
  
  // Category-based scoping
  categoryBased: {
    pattern: 'ends-with-category',
    examples: ['संज्ञा', 'क्रिया', 'विशेषण'],
    description: 'Rule applies to words ending with specified grammatical category'
  }
};

/**
 * Traditional examples of विधि scope application.
 */
const TRADITIONAL_VIDHI_EXAMPLES = {
  // Suffix rules with तदन्त scope
  suffixRules: [
    {
      vidhi: 'कृदन्त विधि',
      specification: 'कृत्',
      scope: 'Words ending with कृत् suffixes',
      examples: ['कृत', 'क्त', 'तव्य', 'अनीय'],
      application: 'Rule applies to all words formed with कृत् suffixes'
    },
    {
      vidhi: 'तद्धितान्त विधि', 
      specification: 'तद्धित',
      scope: 'Words ending with तद्धित suffixes',
      examples: ['मतुप्', 'वतुप्', 'इन्', 'वान्'],
      application: 'Rule applies to all words formed with तद्धित suffixes'
    }
  ],
  
  // Phonetic rules with phoneme scope
  phoneticRules: [
    {
      vidhi: 'अचः विधि',
      specification: 'अच्',
      scope: 'Words ending with vowels',
      examples: ['राम', 'गुरु', 'नदी', 'बाला'],
      application: 'Rule applies to words ending with any vowel'
    },
    {
      vidhi: 'हलन्त विधि',
      specification: 'हल्',
      scope: 'Words ending with consonants', 
      examples: ['वाक्', 'मरुत्', 'भगवन्', 'राजन्'],
      application: 'Rule applies to words ending with any consonant'
    }
  ]
};

/**
 * Determines if a word falls within the scope of a विधि (rule) 
 * according to Sutra 1.1.72.
 * 
 * @param {string} word - The word to check
 * @param {string} vidhiSpecification - The rule specification (what it targets)
 * @param {Object} [context={}] - Context for analysis
 * @returns {boolean} True if word is within rule scope
 */
function isWithinVidhiScope(word, vidhiSpecification, context = {}) {
  if (!word || !vidhiSpecification || 
      typeof word !== 'string' || typeof vidhiSpecification !== 'string') {
    return false;
  }

  const validation = validateSanskritWord(word);
  if (!validation.isValid && !context.allowTechnicalTerms) {
    return false;
  }

  // Determine the type of specification and check accordingly
  return checkSpecificationMatch(word, vidhiSpecification, context);
}

/**
 * Checks if a word matches the specification pattern.
 * 
 * @param {string} word - The word to check
 * @param {string} specification - The rule specification
 * @param {Object} context - Context information
 * @returns {boolean} True if word matches specification
 */
function checkSpecificationMatch(word, specification, context) {
  // Check suffix-based specifications
  if (isSuffixSpecification(specification)) {
    return checkSuffixMatch(word, specification, context);
  }
  
  // Check phoneme class specifications
  if (isPhonemeClassSpecification(specification)) {
    return checkPhonemeClassMatch(word, specification, context);
  }
  
  // Check morphological specifications
  if (isMorphologicalSpecification(specification)) {
    return checkMorphologicalMatch(word, specification, context);
  }
  
  // Check category specifications
  if (isCategorySpecification(specification)) {
    return checkCategoryMatch(word, specification, context);
  }
  
  // Direct ending match
  return word.endsWith(specification) || word.endsWith(specification.replace(/्$/, ''));
}

/**
 * Checks if specification is a suffix-based rule.
 */
function isSuffixSpecification(specification) {
  const suffixMarkers = ['कृत्', 'तद्धित', 'स्त्री', 'तिङ्', 'सुप्'];
  return suffixMarkers.some(marker => 
    specification.includes(marker) || specification === marker
  );
}

/**
 * Checks if specification is a phoneme class.
 */
function isPhonemeClassSpecification(specification) {
  const phonemeClasses = ['अच्', 'हल्', 'अम्', 'अङ्', 'अक्', 'एच्', 'अत्', 'एङ्', 'यण्', 'अण्', 'इक्', 'उण्'];
  return phonemeClasses.includes(specification);
}

/**
 * Checks if specification is morphological.
 */
function isMorphologicalSpecification(specification) {
  const morphologicalTerms = ['धातु', 'प्रातिपदिक', 'उपसर्ग', 'निपात', 'तिङ्', 'सुप्'];
  return morphologicalTerms.some(term => specification.includes(term));
}

/**
 * Checks if specification is category-based.
 */
function isCategorySpecification(specification) {
  const categories = ['संज्ञा', 'क्रिया', 'विशेषण', 'सर्वनाम', 'अव्यय'];
  return categories.some(cat => specification.includes(cat));
}

/**
 * Checks suffix match for suffix-based specifications.
 */
function checkSuffixMatch(word, specification, context) {
  if (specification === 'कृत्') {
    // Check if word ends with कृत् suffixes
    const krtSuffixes = ['त', 'क्त', 'तव्य', 'अनीय', 'य', 'ण्वुल्', 'युक्'];
    return krtSuffixes.some(suffix => 
      word.endsWith(suffix) || word.includes(suffix)
    );
  }
  
  if (specification === 'तद्धित') {
    // Check if word ends with तद्धित suffixes (both full and reduced forms)
    const taddhitaSuffixes = ['मत्', 'वत्', 'इन्', 'वान्', 'मतुप्', 'वतुप्', 'इक', 'ईय', 'य', 'एय'];
    return taddhitaSuffixes.some(suffix => 
      word.endsWith(suffix) || word.includes(suffix)
    );
  }
  
  if (specification === 'स्त्री') {
    // Check if word ends with feminine markers (vowel marks and independent vowels)
    const feminineSuffixes = ['आ', 'ई', 'ऊ', 'इ', 'ा', 'ी', 'ू'];
    return feminineSuffixes.some(suffix => word.endsWith(suffix));
  }
  
  return false;
}

/**
 * Checks phoneme class match.
 */
function checkPhonemeClassMatch(word, specification, context) {
  const lastChar = word.slice(-1);
  
  if (specification === 'अच्') {
    // Vowels - check for explicit vowels or vowel marks or words ending in consonant with inherent 'अ'
    const vowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ॠ', 'ए', 'ऐ', 'ओ', 'औ'];
    const vowelMarks = ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'ॄ', 'े', 'ै', 'ो', 'ौ'];
    const iastVowels = ['a', 'ā', 'i', 'ī', 'u', 'ū', 'ṛ', 'ṝ', 'e', 'ai', 'o', 'au'];
    const consonants = ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 
                       'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
                       'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'];
    
    // Check if last character is explicitly a vowel
    if (vowels.includes(lastChar) || iastVowels.includes(lastChar) || 
        iastVowels.some(v => word.endsWith(v))) {
      return true;
    }
    
    // Check if last character is a vowel mark (matra)
    if (vowelMarks.includes(lastChar)) {
      return true;
    }
    
    // Check if word ends with consonant with inherent 'अ' (no virama)
    if (consonants.includes(lastChar) && !word.endsWith('्')) {
      return true; // Sanskrit consonants have inherent 'अ' unless explicitly suppressed
    }
    
    return false;
  }
  
  if (specification === 'हल्') {
    // Consonants - only if explicitly ending with consonant and halanta
    const consonants = ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 
                       'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न',
                       'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'];
    
    // Check if word ends with halanta (्) or is a pure consonant in IAST
    if (word.endsWith('्')) {
      return true;
    }
    
    // For IAST, check if it ends with consonant pattern
    return /[kgṅcjñṭḍṇtdnpbmyrlvśṣsh]$/.test(word);
  }
  
  return false;
}

/**
 * Checks morphological match.
 */
function checkMorphologicalMatch(word, specification, context) {
  if (specification.includes('धातु')) {
    // Check if word is or contains a verbal root
    return context.isVerbalRoot || context.containsRoot || word.includes('√');
  }
  
  if (specification.includes('प्रातिपदिक')) {
    // Check if word is a nominal stem
    return context.isNominalStem || context.isProlog || !context.hasInflection;
  }
  
  return false;
}

/**
 * Checks category match.
 */
function checkCategoryMatch(word, specification, context) {
  if (specification.includes('संज्ञा')) {
    return context.isNoun || context.grammaticalCategory === 'noun';
  }
  
  if (specification.includes('क्रिया')) {
    return context.isVerb || context.grammaticalCategory === 'verb';
  }
  
  if (specification.includes('विशेषण')) {
    return context.isAdjective || context.grammaticalCategory === 'adjective';
  }
  
  return false;
}

/**
 * Analyzes the scope of a विधि (grammatical rule) according to Sutra 1.1.72.
 * 
 * @param {string} vidhiSpecification - The rule specification
 * @param {string[]} candidateWords - Words to check against the rule
 * @param {Object} [context={}] - Context for analysis
 * @returns {Object} Analysis result with scope information
 */
function analyzeVidhiScope(vidhiSpecification, candidateWords = [], context = {}) {
  const result = {
    specification: vidhiSpecification,
    script: detectScript(vidhiSpecification),
    vidhiType: '',
    scopePattern: '',
    wordsInScope: [],
    wordsOutOfScope: [],
    scopeDescription: '',
    reasoning: [],
    examples: [],
    sutraReference: '1.1.72'
  };

  if (!vidhiSpecification || typeof vidhiSpecification !== 'string') {
    result.reasoning.push('Invalid विधि specification: must be a non-empty string');
    return result;
  }

  // Determine विधि type and scope pattern
  if (isSuffixSpecification(vidhiSpecification)) {
    result.vidhiType = VIDHI_TYPES.SUFFIX_RULE;
    result.scopePattern = SCOPE_PATTERNS.suffixBased.pattern;
    result.scopeDescription = SCOPE_PATTERNS.suffixBased.description;
  } else if (isPhonemeClassSpecification(vidhiSpecification)) {
    result.vidhiType = VIDHI_TYPES.PHONETIC_RULE;
    result.scopePattern = SCOPE_PATTERNS.phonemeBased.pattern;
    result.scopeDescription = SCOPE_PATTERNS.phonemeBased.description;
  } else if (isMorphologicalSpecification(vidhiSpecification)) {
    result.vidhiType = VIDHI_TYPES.MORPHOLOGICAL_RULE;
    result.scopePattern = SCOPE_PATTERNS.morphemeBased.pattern;
    result.scopeDescription = SCOPE_PATTERNS.morphemeBased.description;
  } else if (isCategorySpecification(vidhiSpecification)) {
    result.vidhiType = VIDHI_TYPES.CATEGORY_RULE;
    result.scopePattern = SCOPE_PATTERNS.categoryBased.pattern;
    result.scopeDescription = SCOPE_PATTERNS.categoryBased.description;
  }

  // Analyze candidate words
  for (const word of candidateWords) {
    if (isWithinVidhiScope(word, vidhiSpecification, context)) {
      result.wordsInScope.push(word);
    } else {
      result.wordsOutOfScope.push(word);
    }
  }

  // Add reasoning
  result.reasoning.push('विधि specification');
  result.reasoning.push(`Pattern: "${vidhiSpecification}"`);
  result.reasoning.push(`Scope pattern: ${result.scopePattern}`);
  result.reasoning.push(`Applies to elements ending with specified component`);
  result.reasoning.push(`येन विधिस्तदन्तस्य - Rule applies to those ending with it`);
  
  if (result.wordsInScope.length > 0) {
    result.reasoning.push(`${result.wordsInScope.length} words found within scope`);
  }
  
  if (result.wordsOutOfScope.length > 0) {
    result.reasoning.push(`${result.wordsOutOfScope.length} words outside scope`);
  }

  // Add traditional examples for the specification type
  const traditionalExamples = getTraditionalExamples(vidhiSpecification);
  if (traditionalExamples.length > 0) {
    result.examples = traditionalExamples;
  }

  return result;
}

/**
 * Gets traditional examples for a given विधि specification.
 */
function getTraditionalExamples(specification) {
  const examples = [];
  
  // Find matching examples from traditional sets
  for (const ruleSet of Object.values(TRADITIONAL_VIDHI_EXAMPLES)) {
    for (const rule of ruleSet) {
      if (rule.specification === specification || 
          rule.vidhi.includes(specification) ||
          specification.includes(rule.specification)) {
        examples.push({
          vidhi: rule.vidhi,
          scope: rule.scope,
          examples: rule.examples,
          application: rule.application
        });
      }
    }
  }
  
  return examples;
}

/**
 * Determines the scope boundary for a विधि specification.
 * 
 * @param {string} specification - The विधि specification
 * @param {Object} [context={}] - Context information
 * @returns {Object} Scope boundary information
 */
function getVidhiScopeBoundary(specification, context = {}) {
  const boundary = {
    specification,
    includes: [],
    excludes: [],
    conditions: [],
    exceptions: []
  };

  if (isSuffixSpecification(specification)) {
    boundary.includes.push('Words ending with specified suffix type');
    boundary.excludes.push('Words not having the suffix');
    boundary.conditions.push('Suffix must be final element');
  }

  if (isPhonemeClassSpecification(specification)) {
    boundary.includes.push('Words ending with phonemes of specified class');
    boundary.excludes.push('Words ending with other phoneme classes');
    boundary.conditions.push('Final phoneme determines scope');
  }

  if (isMorphologicalSpecification(specification)) {
    boundary.includes.push('Words of specified morphological type');
    boundary.excludes.push('Words of different morphological types');
    boundary.conditions.push('Morphological category determines scope');
  }

  return boundary;
}

/**
 * Provides traditional examples demonstrating Sutra 1.1.72.
 * 
 * @returns {Object} Examples of विधि scope application
 */
function getVidhiScopeExamples() {
  return {
    principle: 'येन विधिस्तदन्तस्य - The rule applies to that which ends with the specified element',
    
    suffixBasedRules: {
      description: 'Rules that apply based on suffix endings',
      examples: TRADITIONAL_VIDHI_EXAMPLES.suffixRules
    },
    
    phoneticRules: {
      description: 'Rules that apply based on phonetic endings',
      examples: TRADITIONAL_VIDHI_EXAMPLES.phoneticRules
    },
    
    scopePrinciple: {
      description: 'How तदन्त (ending with that) determines rule scope',
      cases: [
        {
          specification: 'अच्',
          meaning: 'vowel class',
          scope: 'All words ending with vowels',
          principle: 'अचन्त (ending with vowel) falls under अच् rules'
        },
        {
          specification: 'कृत्', 
          meaning: 'कृत् suffix class',
          scope: 'All words ending with कृत् suffixes',
          principle: 'कृदन्त (ending with कृत्) falls under कृत् rules'
        }
      ]
    },
    
    traditionalNote: 'This sutra establishes precise scope boundaries for grammatical rules, ' +
                    'ensuring that rules apply exactly to their intended linguistic domains.'
  };
}

export {
  VIDHI_TYPES,
  SCOPE_PATTERNS,
  isWithinVidhiScope,
  analyzeVidhiScope,
  getVidhiScopeBoundary,
  checkSpecificationMatch,
  isSuffixSpecification,
  isPhonemeClassSpecification,
  isMorphologicalSpecification,
  isCategorySpecification,
  getVidhiScopeExamples
};
