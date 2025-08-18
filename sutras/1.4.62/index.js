/**
 * Sutra 1.4.62: अनुकरणं चानितिपरम् (anukaraṇaṃ cānitiparama)
 * 
 * An onomatopoeic word (anukaraṇa) is also termed गति, 
 * provided it is not followed by the word 'iti'.
 * 
 * This sutra extends गति designation to onomatopoeic words that mimic sounds,
 * with the restriction that they must not be followed by 'iti'.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { analyzeGatiClassification } from '../sanskrit-utils/nipata-classifier.js';

/**
 * Main function for Sutra 1.4.62
 * Classifies onomatopoeic words as गति when not followed by 'iti'
 * 
 * @param {string} word - The word to analyze
 * @param {Object} context - Context object containing verb and following_word
 * @returns {Object} Analysis result with गति classification
 */
function sutra1462(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string' || word.trim() === '') {
      return createErrorResult('invalid_word', 'Word must be a non-empty string');
    }

    if (!context || typeof context !== 'object') {
      return createErrorResult('missing_context', 'Context must be a valid object');
    }

    const normalizedWord = word.trim();
    const script = detectScript(normalizedWord);
    
    // Validate Sanskrit input
    const validation = validateSanskritWord(normalizedWord);
    if (!validation.isValid) {
      return createErrorResult('invalid_sanskrit', `Invalid Sanskrit word: ${word}`);
    }

    // Check for verb context
    if (!context.verb) {
      return createErrorResult('missing_verb', 'गति designation requires verbal context');
    }

    // Special case: if the word itself is 'iti', don't apply
    if (isItiWord(normalizedWord)) {
      return createNonApplicableResult(normalizedWord, context, 'word_is_iti', 'Word itself is "iti" - cannot be गति');
    }

    // Check if followed by 'iti' - this blocks गति designation
    if (isFollowedByIti(context.following_word)) {
      return createItiBlockedResult(normalizedWord, context);
    }

    // Analyze onomatopoeic properties
    const onomatopoeicAnalysis = analyzeOnomatopoeicProperties(normalizedWord, context);

    // Check if word is onomatopoeic
    if (onomatopoeicAnalysis.isOnomatopoeic) {
      // Calculate confidence
      const confidence = Math.min(0.95, 0.4 + onomatopoeicAnalysis.confidence);
      
      // Get गति properties
      const gatiProperties = analyzeGatiProperties(normalizedWord, context);
      const verbCompatibility = {
        verb: context.verb,
        compatible: true,
        verbType: getVerbType(context.verb)
      };

      return {
        // Core Application
        applies: true,
        word: normalizedWord,
        term: 'gati',
        sutra: '1.4.62',
        sutraText: 'अनुकरणं चानितिपरम्',
        
        // Classification Analysis
        category: 'onomatopoeic',
        confidence: confidence,
        reasons: ['onomatopoeic_word', 'not_followed_by_iti'],
        script: script,
        
        // Morphological Analysis
        morphological: {
          category: 'sound_symbolic',
          invariant: true,
          derivation: onomatopoeicAnalysis.derivation,
          features: getOnomatopoeicFeatures(normalizedWord, onomatopoeicAnalysis),
          soundSymbolism: {
            type: onomatopoeicAnalysis.soundType,
            iconicity: onomatopoeicAnalysis.iconicity,
            reduplication: onomatopoeicAnalysis.isReduplicated
          }
        },
        
        // Semantic Analysis
        semantic: {
          function: 'sound_imitation',
          type: 'onomatopoeic_adverb',
          subcategory: onomatopoeicAnalysis.semanticCategory,
          pragmaticRole: 'experiential_marker',
          soundMeaning: onomatopoeicAnalysis.soundMeaning,
          iconicRelation: onomatopoeicAnalysis.iconicRelation
        },
        
        // Syntactic Properties
        syntactic: {
          role: 'adverbial_modifier',
          position: 'pre_verbal',
          scope: 'verbal_action',
          accentuation: 'anudātta',
          dependencies: ['verb_required', 'no_iti_following'],
          restrictions: ['blocked_by_iti']
        },
        
        // Integration Properties
        integration: {
          extendsGati: true,
          precedence: 'specific',
          gatiType: 'onomatopoeic',
          compatibleVerbs: 'any',  // Unlike 1.4.61, this accepts any verb
          phonoSyntacticUnit: true,
          affectsAccent: true,
          blocksOtherDesignations: false,
          specialRestriction: 'iti_blocking'
        },
        
        // Context Validation
        contextValidation: {
          verbRequired: true,
          verbCompatible: true,
          notFollowedByIti: !isFollowedByIti(context.following_word),
          sufficientContext: true,
          wordNotIti: !isItiWord(normalizedWord)
        },
        
        // Onomatopoeic Analysis Details
        onomatopoeicAnalysis: {
          isOnomatopoeic: true,
          confidence: onomatopoeicAnalysis.confidence,
          detectionMethod: onomatopoeicAnalysis.detectionMethod,
          soundType: onomatopoeicAnalysis.soundType,
          patterns: onomatopoeicAnalysis.patterns,
          examples: onomatopoeicAnalysis.examples,
          phoneticsProperties: onomatopoeicAnalysis.phoneticProperties
        },
        
        // Restriction Analysis
        restrictionAnalysis: {
          itiRestriction: {
            applies: true,
            followingWord: context.following_word || null,
            blocked: isFollowedByIti(context.following_word),
            reason: isFollowedByIti(context.following_word) ? 
              'Word followed by "iti" - blocks गति designation' : 
              'No "iti" following - गति designation allowed'
          }
        },
        
        // गति Framework Integration
        gatiProperties: gatiProperties,
        verbCompatibility: verbCompatibility,
        
        // Computational Properties
        processingNotes: {
          primaryCategory: 'onomatopoeic',
          alternativeAnalyses: getAlternativeOnomatopoeicAnalyses(normalizedWord, onomatopoeicAnalysis),
          confidence_breakdown: {
            onomatopoeic_detection: onomatopoeicAnalysis.confidence,
            context_validation: 0.2,
            iti_restriction_check: 0.15
          },
          linguisticComplexity: 'moderate'
        }
      };
    }

    // If not onomatopoeic
    return createNonApplicableResult(normalizedWord, context, 'not_onomatopoeic', 'Word is not onomatopoeic');

  } catch (error) {
    return createErrorResult('processing_error', `Error processing sutra: ${error.message}`);
  }
}

/**
 * Analyzes comprehensive onomatopoeic properties of a word
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} Detailed onomatopoeic analysis
 */
function analyzeOnomatopoeicProperties(word, context) {
  const script = detectScript(word);
  const directMatch = isOnomatopoeicDirect(word);
  const patternMatch = matchesOnomatopoeicPattern(word);
  const reduplicationAnalysis = analyzeReduplication(word);
  
  // Determine if onomatopoeic
  const isOnomatopoeic = directMatch || patternMatch || reduplicationAnalysis.isReduplicated;
  
  if (!isOnomatopoeic) {
    return {
      isOnomatopoeic: false,
      confidence: 0,
      detectionMethod: 'none',
      soundType: null,
      patterns: [],
      semanticCategory: null
    };
  }
  
  // Determine primary detection method and confidence
  let detectionMethod, confidence, soundType, semanticCategory;
  
  if (directMatch) {
    detectionMethod = 'lexical_list';
    confidence = 0.9;
    soundType = getDirectSoundType(word);
    semanticCategory = getDirectSemanticCategory(word);
  } else if (patternMatch) {
    detectionMethod = 'morphophonemic_pattern';
    confidence = 0.7;
    soundType = getPatternSoundType(word);
    semanticCategory = 'pattern_based';
  } else if (reduplicationAnalysis.isReduplicated) {
    detectionMethod = 'reduplication';
    confidence = 0.8;
    soundType = 'iterative';
    semanticCategory = 'repetitive_action';
  }
  
  return {
    isOnomatopoeic: true,
    confidence: confidence,
    detectionMethod: detectionMethod,
    soundType: soundType,
    semanticCategory: semanticCategory,
    patterns: getOnomatopoeicPatterns(word),
    isReduplicated: reduplicationAnalysis.isReduplicated,
    reduplicationPattern: reduplicationAnalysis.pattern,
    derivation: analyzeOnomatopoeicDerivation(word),
    iconicity: assessIconicity(word),
    soundMeaning: getSoundMeaning(word),
    iconicRelation: getIconicRelation(word),
    phoneticProperties: analyzePhoneticProperties(word),
    examples: getRelatedExamples(word)
  };
}

/**
 * Checks if a word is directly listed as onomatopoeic
 * @param {string} word - Word to analyze
 * @returns {boolean} True if in onomatopoeic word list
 */
function isOnomatopoeicDirect(word) {
  const script = detectScript(word);
  
  // Comprehensive onomatopoeic word lists
  const onomatopoeicWords = script === 'Devanagari' ? [
    // Sound words ending in त्
    'खटत्', 'पटत्', 'मरमत्', 'द्रवत्', 'चलत्', 'स्फुटत्', 'हसत्', 
    'गच्छत्', 'तदत्', 'कूजत्', 'भ्रमत्', 'नदत्', 'शब्दत्', 'गर्जत्',
    'धड़त्', 'फड़त्', 'झनत्', 'टनत्', 'डमत्', 'धमत्',
    
    // Sound words ending in न्
    'वदन्', 'पतन्', 'गमन्', 'कूजन्', 'नदन्',
    
    // Sound words ending in ति
    'झटिति', 'पटिति', 'छटिति', 'खटिति',
    
    // Reduplicative sound words
    'पटपट', 'खटखट', 'टकटक', 'डगडग', 'गड़गड़', 'छमछम',
    'धड़धड़', 'फड़फड़', 'झनझन', 'टनटन', 'चटचट', 'फटफट'
  ] : [
    // IAST equivalents
    'khaṭat', 'paṭat', 'maramat', 'dravat', 'calat', 'sphuṭat', 'hasat',
    'gacchat', 'tadat', 'kūjat', 'bhramat', 'nadat', 'śabdat', 'garjat',
    'dhaṛat', 'phaṛat', 'jhanat', 'ṭanat', 'ḍamat', 'dhamat',
    'vadan', 'patan', 'gaman', 'kūjan', 'nadan',
    'jhaṭiti', 'paṭiti', 'chaṭiti', 'khaṭiti',
    'paṭapaṭ', 'khaṭakhaṭ', 'ṭakaṭak', 'ḍagaḍag', 'gaṛagaṛ', 'chamacham',
    'dhaṛadhaṛ', 'phaṛaphaṛ', 'jhanajhan', 'ṭanaṭan', 'caṭacaṭ', 'phaṭaphaṭ'
  ];

  return onomatopoeicWords.includes(word);
}

/**
 * Checks if word matches onomatopoeic patterns
 * @param {string} word - Word to check
 * @returns {boolean} True if matches pattern
 */
function matchesOnomatopoeicPattern(word) {
  const script = detectScript(word);
  
  // Common onomatopoeic patterns
  if (script === 'Devanagari') {
    // Patterns for Devanagari
    return (
      /त्$/.test(word) ||  // ends with 't' sound
      /न्$/.test(word) ||  // ends with 'n' sound
      /ति$/.test(word) ||  // ends with 'ti'
      /ट[तन्]$/.test(word) || // specific -ṭat, -ṭan endings
      /ड[तन्]$/.test(word) || // specific -ḍat, -ḍan endings
      /फ[तड़न्]/.test(word) || // plosive + liquid combinations
      /झ[नत्]/.test(word) ||   // fricative combinations
      hasRedupliactivePattern(word) // reduplicated patterns
    );
  } else {
    // Patterns for IAST
    return (
      /at$/.test(word) ||   // ends with 'at' sound
      /an$/.test(word) ||   // ends with 'an' sound
      /iti$/.test(word) ||  // ends with 'iti'
      /[ṭḍ]at$/.test(word) ||  // specific retroflex + at endings
      /[ṭḍ]an$/.test(word) ||  // specific retroflex + an endings
      /ph[aṛn]/.test(word) ||  // plosive + liquid combinations
      /jh[ant]/.test(word) ||  // fricative combinations
      hasRedupliactivePattern(word) // reduplicated patterns
    );
  }
}

/**
 * Analyzes reduplication patterns in detail
 * @param {string} word - Word to analyze
 * @returns {Object} Reduplication analysis
 */
function analyzeReduplication(word) {
  const length = word.length;
  
  // Check for simple AB-AB pattern (minimum 4 characters)
  if (length >= 4) {
    const half = Math.floor(length / 2);
    const firstHalf = word.substring(0, half);
    const secondHalf = word.substring(half);
    
    if (firstHalf === secondHalf) {
      return {
        isReduplicated: true,
        pattern: 'complete_reduplication',
        base: firstHalf,
        confidence: 0.95
      };
    }
  }
  
  // Check for partial reduplication patterns
  const partialPatterns = [
    /(.{2,3})\1/,  // 2-3 character sequence repeated
    /^(.+)(\1)+/   // Any sequence repeated at the start
  ];
  
  for (const pattern of partialPatterns) {
    const match = word.match(pattern);
    if (match) {
      return {
        isReduplicated: true,
        pattern: 'partial_reduplication',
        base: match[1],
        confidence: 0.8
      };
    }
  }
  
  return {
    isReduplicated: false,
    pattern: null,
    base: null,
    confidence: 0
  };
}

/**
 * Gets sound type for directly listed words
 * @param {string} word - Onomatopoeic word
 * @returns {string} Sound type
 */
function getDirectSoundType(word) {
  const soundTypeMap = {
    // Impact sounds
    'khaṭat': 'impact', 'खटत्': 'impact',
    'paṭat': 'impact', 'पटत्': 'impact',
    'ṭakaṭak': 'impact', 'टकटक': 'impact',
    
    // Movement sounds
    'dravat': 'movement', 'द्रवत्': 'movement',
    'calat': 'movement', 'चलत्': 'movement',
    'gacchat': 'movement', 'गच्छत्': 'movement',
    
    // Voice sounds
    'hasat': 'voice', 'हसत्': 'voice',
    'kūjat': 'voice', 'कूजत्': 'voice',
    'vadan': 'voice', 'वदन्': 'voice',
    
    // Natural sounds
    'garjat': 'natural', 'गर्जत्': 'natural',
    'nadat': 'natural', 'नदत्': 'natural',
    'jhanat': 'natural', 'झनत्': 'natural'
  };
  
  return soundTypeMap[word] || 'general';
}

/**
 * Gets semantic category for directly listed words
 * @param {string} word - Onomatopoeic word
 * @returns {string} Semantic category
 */
function getDirectSemanticCategory(word) {
  const categoryMap = {
    // Action sounds
    'khaṭat': 'action_sound', 'खटत्': 'action_sound',
    'paṭat': 'action_sound', 'पटत्': 'action_sound',
    
    // Process sounds
    'dravat': 'process_sound', 'द्रवत्': 'process_sound',
    'sphuṭat': 'process_sound', 'स्फुटत्': 'process_sound',
    
    // Emotional sounds
    'hasat': 'emotional_sound', 'हसत्': 'emotional_sound',
    
    // Environmental sounds
    'garjat': 'environmental_sound', 'गर्जत्': 'environmental_sound',
    'nadat': 'environmental_sound', 'नदत्': 'environmental_sound'
  };
  
  return categoryMap[word] || 'general_sound';
}

/**
 * Gets sound type based on morphophonemic patterns
 * @param {string} word - Word with onomatopoeic pattern
 * @returns {string} Pattern-based sound type
 */
function getPatternSoundType(word) {
  if (/[ṭḍ]at$|[टड]त्$/.test(word)) return 'sharp_impact';
  if (/an$|न्$/.test(word)) return 'continuous';
  if (/iti$|ति$/.test(word)) return 'sudden_action';
  if (/jh|झ/.test(word)) return 'rushing_sound';
  if (/ph|फ/.test(word)) return 'explosive_sound';
  return 'general_pattern';
}

/**
 * Gets onomatopoeic patterns present in word
 * @param {string} word - Word to analyze
 * @returns {string[]} List of patterns
 */
function getOnomatopoeicPatterns(word) {
  const patterns = [];
  
  if (hasRedupliactivePattern(word)) patterns.push('reduplication');
  if (/[ṭḍ]at$|[टड]त्$/.test(word)) patterns.push('retroflex_ending');
  if (/iti$|ति$/.test(word)) patterns.push('action_marker');
  if (/an$|न्$/.test(word)) patterns.push('continuative');
  if (/^[kgh]|^[कघ]/.test(word)) patterns.push('velar_initial');
  if (/^[ṭḍ]|^[टड]/.test(word)) patterns.push('retroflex_initial');
  
  return patterns;
}

/**
 * Analyzes derivation of onomatopoeic word
 * @param {string} word - Word to analyze
 * @returns {Object|null} Derivation analysis
 */
function analyzeOnomatopoeicDerivation(word) {
  const reduplication = analyzeReduplication(word);
  
  if (reduplication.isReduplicated) {
    return {
      type: 'reduplicative',
      base: reduplication.base,
      process: 'sound_reduplication',
      meaning: 'iterative_intensification'
    };
  }
  
  if (/at$|त्$/.test(word)) {
    return {
      type: 'participial',
      base: word.replace(/at$|त्$/, ''),
      process: 'present_participial',
      meaning: 'ongoing_sound_action'
    };
  }
  
  return null;
}

/**
 * Assesses iconicity level of onomatopoeic word
 * @param {string} word - Word to analyze
 * @returns {string} Iconicity level
 */
function assessIconicity(word) {
  // Direct sound imitation has high iconicity
  if (isOnomatopoeicDirect(word)) return 'high';
  
  // Reduplicated forms have medium iconicity
  if (hasRedupliactivePattern(word)) return 'medium';
  
  // Pattern-based have lower iconicity
  if (matchesOnomatopoeicPattern(word)) return 'medium-low';
  
  return 'low';
}

/**
 * Gets sound meaning of onomatopoeic word
 * @param {string} word - Onomatopoeic word
 * @returns {string} Sound meaning
 */
function getSoundMeaning(word) {
  const soundMeanings = {
    'khaṭat': 'knocking_sound', 'खटत्': 'knocking_sound',
    'paṭat': 'slapping_sound', 'पटत्': 'slapping_sound',
    'dravat': 'flowing_sound', 'द्रवत्': 'flowing_sound',
    'hasat': 'laughing_sound', 'हसत्': 'laughing_sound',
    'garjat': 'roaring_sound', 'गर्जत्': 'roaring_sound',
    'jhaṭiti': 'quick_action_sound', 'झटिति': 'quick_action_sound'
  };
  
  return soundMeanings[word] || 'general_sound_imitation';
}

/**
 * Gets iconic relation type
 * @param {string} word - Onomatopoeic word
 * @returns {string} Iconic relation
 */
function getIconicRelation(word) {
  if (/[ṭḍ]|[टड]/.test(word)) return 'articulatory_mimesis';
  if (hasRedupliactivePattern(word)) return 'temporal_iconicity';
  if (/i$|ी$/.test(word)) return 'acoustic_similarity';
  return 'general_sound_symbolism';
}

/**
 * Analyzes phonetic properties relevant to onomatopoeia
 * @param {string} word - Word to analyze
 * @returns {Object} Phonetic properties
 */
function analyzePhoneticProperties(word) {
  return {
    hasRetroflexes: /[ṭḍ]|[टड]/.test(word),
    hasPlosives: /[kgṭḍpt]|[कगटडपत]/.test(word),
    hasFricatives: /[śṣsh]|[शषस]/.test(word),
    hasNasals: /[nmṅñṇ]|[नमङञण]/.test(word),
    vowelPattern: getVowelPattern(word),
    consonantClusters: getConsonantClusters(word)
  };
}

/**
 * Gets vowel pattern in word
 * @param {string} word - Word to analyze
 * @returns {string} Vowel pattern description
 */
function getVowelPattern(word) {
  if (/a.*a|अ.*अ/.test(word)) return 'a_repetition';
  if (/i.*i|इ.*इ/.test(word)) return 'i_repetition';
  if (/at$|त्$/.test(word)) return 'final_a';
  return 'mixed_vowels';
}

/**
 * Gets consonant clusters
 * @param {string} word - Word to analyze
 * @returns {string[]} Consonant clusters
 */
function getConsonantClusters(word) {
  const clusters = [];
  const clusterPatterns = [
    /kh|ख/, /gh|घ/, /ṭh|ठ/, /dh|ध/, /ph|फ/, /bh|भ/,
    /sph|स्फ/, /śr|श्र/, /tr|त्र/
  ];
  
  clusterPatterns.forEach(pattern => {
    if (pattern.test(word)) {
      clusters.push(pattern.source);
    }
  });
  
  return clusters;
}

/**
 * Gets related onomatopoeic examples
 * @param {string} word - Word to find examples for
 * @returns {string[]} Related examples
 */
function getRelatedExamples(word) {
  const exampleMap = {
    'khaṭat': ['khaṭakhaṭ', 'khaṭkhaṭ'], 'खटत्': ['खटखट', 'खटकखटक'],
    'paṭat': ['paṭapaṭ', 'paṭpaṭ'], 'पटत्': ['पटपट', 'पटकपटक'],
    'dravat': ['dru', 'druta'], 'द्रवत्': ['द्रु', 'द्रुत']
  };
  
  return exampleMap[word] || [];
}
/**
 * Gets onomatopoeic features for morphological analysis
 * @param {string} word - Word to analyze
 * @param {Object} analysis - Onomatopoeic analysis
 * @returns {string[]} Feature list
 */
function getOnomatopoeicFeatures(word, analysis) {
  const features = ['gati_designation', 'onomatopoeic', 'sound_symbolic'];
  
  if (analysis.isReduplicated) features.push('reduplicated');
  if (analysis.detectionMethod === 'lexical_list') features.push('lexically_listed');
  if (analysis.soundType === 'impact') features.push('impact_sound');
  if (analysis.soundType === 'movement') features.push('movement_sound');
  if (analysis.soundType === 'voice') features.push('vocal_sound');
  
  return features;
}

/**
 * Analyzes गति properties using nipata classifier
 * @param {string} word - Word to analyze
 * @param {Object} context - Context object
 * @returns {Object} गति analysis
 */
function analyzeGatiProperties(word, context) {
  try {
    return analyzeGatiClassification(word, context.verb, context);
  } catch (error) {
    return {
      applies: false,
      confidence: 0,
      isGati: false,
      error: error.message
    };
  }
}

/**
 * Gets verb type for compatibility analysis
 * @param {string} verb - Verb to analyze
 * @returns {string} Verb type
 */
function getVerbType(verb) {
  const verbTypeMap = {
    'भू': 'existence',
    'कृ': 'action', 
    'अस्': 'being',
    'kṛ': 'action',
    'bhū': 'existence',
    'as': 'being'
  };
  
  return verbTypeMap[verb] || 'action';
}

/**
 * Gets alternative onomatopoeic analyses
 * @param {string} word - Word being analyzed
 * @param {Object} analysis - Primary analysis
 * @returns {Object[]} Alternative analyses
 */
function getAlternativeOnomatopoeicAnalyses(word, analysis) {
  const alternatives = [];
  
  // Check for multiple detection methods
  const detectionMethods = [];
  if (isOnomatopoeicDirect(word)) detectionMethods.push('lexical');
  if (matchesOnomatopoeicPattern(word)) detectionMethods.push('pattern');
  if (hasRedupliactivePattern(word)) detectionMethods.push('reduplication');
  
  if (detectionMethods.length > 1) {
    alternatives.push({
      type: 'multiple_detection_methods',
      methods: detectionMethods,
      note: 'Word matches multiple onomatopoeic criteria'
    });
  }
  
  // Check for sound type alternatives
  const possibleSoundTypes = [];
  if (/[ṭḍ]|[टड]/.test(word)) possibleSoundTypes.push('impact');
  if (/[lr]|[लर]/.test(word)) possibleSoundTypes.push('movement');
  if (/[mn]|[मन]/.test(word)) possibleSoundTypes.push('resonance');
  
  if (possibleSoundTypes.length > 1) {
    alternatives.push({
      type: 'sound_type_ambiguity',
      types: possibleSoundTypes,
      note: 'Word could represent multiple sound types'
    });
  }
  
  return alternatives;
}

/**
 * Checks for reduplicative patterns common in onomatopoeia
 * @param {string} word - Word to check
 * @returns {boolean} True if has reduplicative pattern
 */
function hasRedupliactivePattern(word) {
  const length = word.length;
  
  // Check for simple AB-AB pattern (minimum 4 characters)
  if (length >= 4) {
    const half = Math.floor(length / 2);
    const firstHalf = word.substring(0, half);
    const secondHalf = word.substring(half, length);
    
    if (firstHalf === secondHalf) {
      return true;
    }
  }
  
  // Check for common reduplicative patterns like paṭapaṭa, khaṭakhaṭa
  const reduplicativePatterns = [
    /(.{2,4})\1/,  // Any 2-4 character sequence repeated
    /^(.+)(\1)+/   // Any sequence repeated at the start
  ];
  
  return reduplicativePatterns.some(pattern => pattern.test(word));
}

/**
 * Checks if the word is 'iti' itself
 * @param {string} word - Word to check
 * @returns {boolean} True if word is 'iti'
 */
function isItiWord(word) {
  const script = detectScript(word);
  const itiVariants = script === 'Devanagari' ? ['इति'] : ['iti'];
  return itiVariants.includes(word.toLowerCase());
}

/**
 * Checks if followed by 'iti'
 * @param {string} followingWord - The word that follows
 * @returns {boolean} True if followed by 'iti'
 */
function isFollowedByIti(followingWord) {
  if (!followingWord || typeof followingWord !== 'string') {
    return false;
  }
  
  const normalized = followingWord.trim().toLowerCase();
  
  // Check for exact 'iti' match (both scripts)
  return normalized === 'iti' || normalized === 'इति';
}

/**
 * Creates error result with comprehensive analysis
 * @param {string} errorType - Type of error
 * @param {string} reason - Reason for error
 * @returns {Object} Error result
 */
function createErrorResult(errorType, reason) {
  return {
    applies: false,
    sutra: '1.4.62',
    sutraText: 'अनुकरणं चानितिपरम्',
    error: {
      type: errorType,
      reason: reason,
      message: getDetailedErrorMessage(errorType),
      suggestions: getErrorSuggestions(errorType)
    },
    confidence: 0,
    contextValidation: {
      inputValid: errorType !== 'invalid_word' && errorType !== 'invalid_sanskrit',
      verbRequired: true,
      verbProvided: errorType !== 'missing_verb',
      contextRequired: true,
      contextProvided: errorType !== 'missing_context'
    }
  };
}

/**
 * Gets detailed error message for linguistic precision
 * @param {string} errorType - Type of error
 * @returns {string} Detailed message
 */
function getDetailedErrorMessage(errorType) {
  const messages = {
    'invalid_word': 'Input must be a non-empty Sanskrit word in valid script',
    'invalid_sanskrit': 'Word contains invalid Sanskrit characters or structure',
    'missing_verb': 'गति designation requires verbal context for onomatopoeic words',
    'missing_context': 'Context object with verb and following_word information required',
    'processing_error': 'Internal processing error during sutra application'
  };
  
  return messages[errorType] || 'Unknown error in sutra processing';
}

/**
 * Gets suggestions for error resolution
 * @param {string} errorType - Type of error
 * @returns {string[]} Suggestions array
 */
function getErrorSuggestions(errorType) {
  const suggestions = {
    'invalid_word': [
      'Provide a non-empty string',
      'Use valid Sanskrit script (IAST or Devanagari)',
      'Check for typos in transliteration'
    ],
    'invalid_sanskrit': [
      'Verify Sanskrit transliteration accuracy',
      'Check script consistency',
      'Use standard IAST or Devanagari encoding'
    ],
    'missing_verb': [
      'Add verb context: { verb: "kṛ", following_word: "word" }',
      'Provide any verb as onomatopoeia works with all verbs',
      'Ensure verbal context is specified'
    ],
    'missing_context': [
      'Provide context object with verb and following_word',
      'Example: { verb: "kṛ", following_word: "kṛtvā" }',
      'Check context object structure'
    ],
    'processing_error': [
      'Check input format and context structure',
      'Verify all required parameters',
      'Report if issue persists'
    ]
  };
  
  return suggestions[errorType] || ['Check input parameters and context'];
}

/**
 * Creates result when blocked by 'iti'
 * @param {string} word - Word being analyzed
 * @param {Object} context - Context information
 * @returns {Object} Blocked result
 */
function createItiBlockedResult(word, context) {
  return {
    applies: false,
    sutra: '1.4.62',
    sutraText: 'अनुकरणं चानितिपरम्',
    word: word,
    script: detectScript(word),
    reason: 'blocked_by_iti',
    message: 'Onomatopoeic word followed by "iti" - गति designation blocked',
    confidence: 0,
    
    // Show that word would be onomatopoeic but is blocked
    onomatopoeicAnalysis: analyzeOnomatopoeicProperties(word, context),
    
    restrictionAnalysis: {
      itiRestriction: {
        applies: true,
        followingWord: context.following_word,
        blocked: true,
        reason: `Word followed by "${context.following_word}" (iti) - blocks गति designation per sutra 1.4.62`
      }
    },
    
    contextValidation: {
      verbRequired: true,
      verbProvided: !!context.verb,
      wordIsOnomatopoeic: analyzeOnomatopoeicProperties(word, context).isOnomatopoeic,
      blockedByIti: true
    },
    
    suggestions: [
      'Remove "iti" following to allow गति designation',
      'Use different context where word is not followed by "iti"',
      'Consider alternative grammatical analysis if "iti" is required'
    ]
  };
}

/**
 * Creates non-applicable result with analysis
 * @param {string} word - Word that doesn't apply
 * @param {Object} context - Context information
 * @param {string} specificReason - Specific reason for non-application
 * @param {string} message - Detailed message
 * @returns {Object} Non-applicable result
 */
function createNonApplicableResult(word, context, specificReason = 'not_onomatopoeic', message = 'Word is not onomatopoeic') {
  return {
    applies: false,
    sutra: '1.4.62',
    sutraText: 'अनुकरणं चानितिपरम्',
    word: word,
    script: detectScript(word),
    reason: specificReason,
    message: message,
    confidence: 0,
    
    // Analysis details showing why it failed
    onomatopoeicAnalysis: analyzeOnomatopoeicProperties(word, context),
    
    restrictionAnalysis: {
      itiRestriction: {
        applies: true,
        followingWord: context.following_word || null,
        blocked: isFollowedByIti(context.following_word),
        reason: isFollowedByIti(context.following_word) ? 
          'Word followed by "iti" would block गति even if onomatopoeic' : 
          'No "iti" restriction active'
      }
    },
    
    verbCompatibility: context.verb ? {
      verb: context.verb,
      compatible: true  // All verbs work with onomatopoeia
    } : null,
    
    contextValidation: {
      verbRequired: true,
      verbProvided: !!context.verb,
      wordIsOnomatopoeic: analyzeOnomatopoeicProperties(word, context).isOnomatopoeic,
      blockedByIti: isFollowedByIti(context.following_word),
      wordNotIti: !isItiWord(word)
    },
    
    suggestions: specificReason === 'word_is_iti' ? [
      'Word "iti" itself cannot receive गति designation',
      'Use different onomatopoeic word',
      'Check if intended word is different from "iti"'
    ] : [
      'Verify word is truly onomatopoeic (sound-imitating)',
      'Check against list of standard onomatopoeic words',
      'Consider if word has sound-symbolic properties',
      'Ensure word imitates natural sounds or actions'
    ]
  };
}

// Named exports for testing and integration
export { 
  analyzeOnomatopoeicProperties,
  isOnomatopoeicDirect,
  matchesOnomatopoeicPattern, 
  isFollowedByIti, 
  hasRedupliactivePattern,
  isItiWord,
  analyzeReduplication
};

// Export main function as default
export default sutra1462;
