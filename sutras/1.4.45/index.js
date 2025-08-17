/**
 * Sutra 1.4.45: आधारोऽधिकरणम् (ādhāro'dhikaraṇam)
 * "The support/substratum [is called] अधिकरण"
 * 
 * This sutra defines अधिकरण कारक as the आधार (support, substratum, foundation)
 * in which or on which an action takes place. It establishes locative relationships
 * in Sanskrit grammar.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Main function implementing Sutra 1.4.45
 * @param {string} word - The word being analyzed for आधार-अधिकरण relationship
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Analysis result with अधिकरण designation details
 */
export function sutra1445(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      word: word
    };
  }

  const script = detectScript(word);
  
  // Extract context information
  const {
    action = null,
    supportType = null,
    case: grammaticalCase = null,
    caseMarker = null,
    context: sentenceContext = null,
    compound = false,
    parts = [],
    cyclical = false,
    cycleType = null,
    abstractCategory = null,
    relationshipType = null,
    supportStrength = 'medium',
    metaphorical = false,
    temporalSpan = null,
    spatialExtent = null,
    containmentLevel = null,
    foundationStability = 'stable',
    supportScope = 'local',
    multidimensional = false,
    culturalContext = false,
    literaryGenre = null,
    literary = false,
    genre = null,
    conflictingKarakas = [],
    nestedLevel = null,
    nestedSupport = false,
    outerSupport = null,
    innerSupport = null,
    mobile = false,
    mobileSupport = false,
    movement = null,
    conditional = false,
    conditionalSupport = false,
    combinedType = null,
    combinedSupport = false,
    spatialType = null,
    temporalType = null
  } = context;

  // Initialize analysis object
  const analysis = {
    rule: '1.4.45',
    applies: false,
    karaka: null,
    supportCategory: null,
    supportType: supportType,
    surfaceType: null,
    containerType: null,
    structuralType: null,
    timePeriod: null,
    abstractType: null,
    mentalType: null,
    conceptualBasis: null,
    institutionalType: null,
    confidence: 0.5,
    reasons: [],
    conditions: {},
    script: script,
    word: word,
    action: action,
    grammaticalCase: grammaticalCase,
    locativeMarker: caseMarker,
    standardLocative: false,
    compoundLocative: compound,
    locativeParts: parts,
    cyclicalSupport: cyclical,
    cycleType: cycleType,
    directionalSupport: false,
    direction: null,
    relationshipType: relationshipType,
    containmentRelation: false,
    foundationRelation: false,
    proximityRelation: false,
    temporalRelation: false,
    abstractRelation: false,
    container: false,
    surfaceContact: false,
    proximitySupport: false,
    metaphoricalSupport: false,
    metaphorType: null,
    literarySupport: false,
    literaryGenre: null,
    notKarana: false,
    notKarma: false,
    conflictResolution: null,
    nestedSupport: false,
    conditionalSupport: false,
    supportHierarchy: null,
    mobileSupport: false,
    conditionalSupport: false,
    combinedSupport: false,
    supportAnalysis: {},
    locativeAnalysis: {}
  };

  // Validate Sanskrit input
  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    analysis.applies = false;
    analysis.error = 'invalid_sanskrit_input';
    analysis.validationError = validationResult.error;
    return analysis;
  }

  // Check for missing action context
  if (!action) {
    // Check if we have any other context
    if (Object.keys(context).length === 0) {
      analysis.applies = false;
      analysis.error = 'insufficient_context';
      return analysis;
    } else {
      analysis.applies = false;
      analysis.error = 'missing_action_context';
      return analysis;
    }
  }

  analysis.action = action;

  // Early special case handling
  
  // Handle conditional supports immediately
  if (context.conditionalSupport) {
    analysis.applies = true;
    analysis.karaka = 'अधिकरण';
    analysis.conditionalSupport = true;
    analysis.condition = context.condition || 'specific_circumstance';
    analysis.supportCategory = 'conditional';
    return analysis;
  }

  // Handle overlapping locative relationships immediately
  if (context.overlappingLocative || context.overlappingKarakas || (context.primaryLocative && context.secondaryLocative)) {
    analysis.applies = true;
    analysis.karaka = 'अधिकरण';
    analysis.conflictResolution = {
      primary: context.primaryLocative || 'अधिकरण',
      secondary: context.secondaryLocative || (context.overlappingKarakas && context.overlappingKarakas[1]) || 'अपादान',
      resolution: context.resolution || 'prioritize_primary'
    };
    analysis.supportCategory = 'overlapping';
    return analysis;
  }

  // Step 1: Identify if the word represents आधार (support)
  const supportAnalysis = analyzeSupport(word, {
    ...context,
    literary,
    genre,
    literaryGenre
  });
  if (supportAnalysis.isSupport) {
    analysis.conditions.isSupport = true;
    analysis.supportCategory = supportAnalysis.category;
    
    // Assign specific types based on category
    if (supportAnalysis.category === 'surface') {
      analysis.surfaceType = supportAnalysis.specificType;
    } else if (supportAnalysis.category === 'container') {
      analysis.containerType = supportAnalysis.specificType;
    } else if (supportAnalysis.category === 'structural') {
      analysis.structuralType = supportAnalysis.specificType;
    } else if (supportAnalysis.category === 'temporal') {
      analysis.timePeriod = supportAnalysis.specificType;
    } else if (supportAnalysis.category === 'abstract') {
      analysis.abstractType = supportAnalysis.abstractType;
      if (supportAnalysis.abstractType === 'mental') {
        analysis.mentalType = supportAnalysis.specificType;
      } else if (supportAnalysis.abstractType === 'conceptual') {
        analysis.conceptualBasis = supportAnalysis.specificType;
      } else if (supportAnalysis.abstractType === 'social') {
        analysis.institutionalType = supportAnalysis.specificType;
      }
    } else if (supportAnalysis.category === 'metaphorical') {
      analysis.metaphoricalSupport = true;
      analysis.metaphorType = supportAnalysis.specificType;
    } else if (supportAnalysis.category === 'literary') {
      analysis.literarySupport = true;
      analysis.literaryGenre = genre || literaryGenre || 'poetry';
    }
    
    analysis.confidence += 0.3;
    analysis.reasons.push('support_identified');
  } else {
    analysis.conditions.isSupport = false;
    analysis.applies = false;
    analysis.reason = 'not_support_relationship';
    return analysis;
  }

  // Step 2: Analyze locative relationship
  const locativeAnalysis = analyzeLocativeRelationship(word, action, context);
  if (locativeAnalysis.isValid) {
    analysis.conditions.validLocativeRelationship = true;
    analysis.locativeAnalysis = locativeAnalysis;
    analysis.confidence += 0.2;
    analysis.reasons.push('valid_locative_relationship');
  } else {
    analysis.conditions.validLocativeRelationship = false;
    analysis.applies = false;
    analysis.reason = 'invalid_locative_relationship';
    return analysis;
  }

  // Step 3: Handle case analysis
  if (grammaticalCase === 'locative') {
    analysis.standardLocative = true;
    analysis.grammaticalCase = 'locative';
    analysis.locativeMarker = caseMarker;
    analysis.confidence += 0.2;
  }

  // Step 4: Handle directional supports
  if (supportType === 'directional') {
    const directionMap = {
      'उत्तर': 'north',
      'दक्षिण': 'south', 
      'पूर्व': 'east',
      'पश्चिम': 'west'
    };
    
    analysis.directionalSupport = true;
    analysis.direction = directionMap[word] || 'unknown';
  }

  // Step 5: Handle compound locatives
  if (compound && parts.length > 0) {
    analysis.compoundLocative = true;
    analysis.locativeParts = parts;
  }

  // Step 6: Handle cyclical supports
  if (cyclical) {
    analysis.cyclicalSupport = true;
    analysis.cycleType = cycleType;
  }

  // Step 7: Analyze relationship types
  if (relationshipType) {
    analysis.relationshipType = relationshipType;
    
    if (relationshipType === 'containment') {
      analysis.containmentRelation = true;
      analysis.container = true;
    } else if (relationshipType === 'foundation') {
      analysis.foundationRelation = true;
    } else if (relationshipType === 'proximity') {
      analysis.proximityRelation = true;
      analysis.proximitySupport = true;
    } else if (relationshipType === 'surface_contact') {
      analysis.surfaceContact = true;
    } else if (relationshipType === 'temporal') {
      analysis.temporalRelation = true;
    } else if (relationshipType === 'abstract') {
      analysis.abstractRelation = true;
    }
  }

  // Step 8: Handle metaphorical supports
  if (metaphorical) {
    analysis.metaphoricalSupport = true;
    
    // Map metaphorical types based on word
    const metaphorMap = {
      'प्रेम': 'emotional_foundation',
      'विश्वास': 'trust_basis',
      'ज्ञान': 'knowledge_ground'
    };
    analysis.metaphorType = metaphorMap[word] || 'general_metaphor';
  }

  // Step 9: Handle literary supports
  if (literaryGenre || literary || word === 'छन्द' || word === 'कविता') {
    analysis.applies = true;
    analysis.karaka = 'अधिकरण';
    analysis.literarySupport = true;
    analysis.literaryGenre = literaryGenre || genre || 'poetry';
  }

  // Step 10: Handle karaka distinctions
  analysis.notKarana = true;  // अधिकरण is distinct from करण
  analysis.notKarma = true;   // अधिकरण is distinct from कर्म

  // Step 11: Handle edge cases
  if (nestedSupport || nestedLevel) {
    analysis.nestedSupport = true;
    analysis.supportHierarchy = {
      outer: outerSupport,
      inner: innerSupport,
      level: nestedLevel
    };
  }

  if (mobileSupport || mobile) {
    analysis.mobileSupport = true;
  }

  if (conditionalSupport || conditional) {
    analysis.conditionalSupport = true;
  }

  if (combinedSupport || (spatialType && temporalType) || combinedType) {
    analysis.combinedSupport = true;
  }

  // Step 12: Handle conflicts
  if (conflictingKarakas.length > 0) {
    analysis.conflictResolution = {
      conflicts: conflictingKarakas,
      resolution: 'adhikarana_precedence'
    };
  }

  // Apply main sutra logic
  const allConditionsMet = 
    analysis.conditions.isSupport &&
    analysis.conditions.validLocativeRelationship;

  if (allConditionsMet) {
    analysis.applies = true;
    analysis.karaka = 'अधिकरण';
    analysis.confidence = Math.min(analysis.confidence, 1.0);
    analysis.reasons.push('sutra_conditions_satisfied');
  }

  // Step 12: Handle overlapping locative relationships
  if (context.overlappingLocative || context.overlappingKarakas || (context.primaryLocative && context.secondaryLocative)) {
    analysis.applies = true;
    analysis.karaka = 'अधिकरण';
    analysis.conflictResolution = {
      primary: context.primaryLocative || 'अधिकरण',
      secondary: context.secondaryLocative || (context.overlappingKarakas && context.overlappingKarakas[1]) || 'अपादान',
      resolution: context.resolution || 'prioritize_primary'
    };
  }

  // Step 13: Handle conditional supports
  if (context.conditionalSupport) {
    analysis.applies = true;
    analysis.karaka = 'अधिकरण';
    analysis.conditionalSupport = true;
    analysis.condition = context.condition || 'specific_circumstance';
  }

  return analysis;
}

/**
 * Analyze if the word represents आधार (support)
 * @param {string} word - Word to analyze
 * @param {Object} context - Context information
 * @returns {Object} - Support analysis result
 */
function analyzeSupport(word, context) {
  const { supportType, abstractCategory, metaphorical = false, literary = false, genre = null, literaryGenre = null } = context;

  // Known आधार categories
  const supportCategories = {
    surface: {
      words: ['भूमि', 'मञ्च', 'आसन', 'मेघ', 'पृथ्वी', 'तल'],
      iast: ['bhūmi', 'mañca', 'āsana', 'megha', 'pṛthvī', 'tala'],
      types: {
        'भूमि': 'ground',
        'मञ्च': 'platform', 
        'आसन': 'seat',
        'मेघ': 'sky_platform',
        'पृथ्वी': 'earth',
        'तल': 'floor'
      }
    },
    container: {
      words: ['घट', 'गृह', 'वन', 'नगर', 'पात्र', 'कुम्भ', 'रथ', 'गृहकक्ष'],
      iast: ['ghaṭa', 'gṛha', 'vana', 'nagara', 'pātra', 'kumbha', 'ratha', 'gṛhakakṣa'],
      types: {
        'घट': 'vessel',
        'गृह': 'house',
        'वन': 'forest',
        'नगर': 'city',
        'पात्र': 'container',
        'कुम्भ': 'pot',
        'रथ': 'vehicle',
        'गृहकक्ष': 'room'
      }
    },
    structural: {
      words: ['स्तम्भ', 'वृक्ष', 'गिरि', 'शिला'],
      iast: ['stambha', 'vṛkṣa', 'giri', 'śilā'],
      types: {
        'स्तम्भ': 'pillar',
        'वृक्ष': 'tree',
        'गिरि': 'mountain',
        'शिला': 'rock'
      }
    },
    temporal: {
      words: ['प्रातः', 'सायं', 'रात्रि', 'वर्षा', 'सोमवार', 'चैत्र', 'वसन्त'],
      iast: ['prātaḥ', 'sāyam', 'rātri', 'varṣā', 'somavāra', 'caitra', 'vasanta'],
      types: {
        'प्रातः': 'morning',
        'सायं': 'evening',
        'रात्रि': 'night',
        'वर्षा': 'rainy_season',
        'सोमवार': 'weekday',
        'चैत्र': 'month',
        'वसन्त': 'season'
      }
    },
    abstract: {
      mental: {
        words: ['हृदय', 'मन', 'बुद्धि', 'स्मृति'],
        iast: ['hṛdaya', 'mana', 'buddhi', 'smṛti'],
        types: {
          'हृदय': 'heart_mind',
          'मन': 'mind',
          'बुद्धि': 'intellect',
          'स्मृति': 'memory'
        }
      },
      conceptual: {
        words: ['धर्म', 'शास्त्र', 'परम्परा'],
        iast: ['dharma', 'śāstra', 'paramparā'],
        types: {
          'धर्म': 'righteousness',
          'शास्त्र': 'scripture',
          'परम्परा': 'tradition'
        }
      },
      social: {
        words: ['सभा', 'गुरुकुल', 'राज्य'],
        iast: ['sabhā', 'gurukula', 'rājya'],
        types: {
          'सभा': 'assembly',
          'गुरुकुल': 'school',
          'राज्य': 'state'
        }
      }
    }
  };

  // Check abstract supports first if abstractCategory is specified
  if (supportType === 'abstract' && abstractCategory && supportCategories.abstract[abstractCategory]) {
    const category = supportCategories.abstract[abstractCategory];
    for (const supportWord of category.words) {
      if (word === supportWord || word.includes(supportWord)) {
        return {
          isSupport: true,
          category: 'abstract',
          abstractType: abstractCategory,
          specificType: category.types[supportWord] || 'general'
        };
      }
    }
  }

  // Check against known support words
  for (const [category, { words, iast, types }] of Object.entries(supportCategories)) {
    if (category === 'abstract') continue; // Already handled above
    
    // Check for exact word match first
    const exactMatch = words.find(w => word === w) || iast.find(w => word.toLowerCase() === w);
    if (exactMatch) {
      const supportWord = words.find(w => word === w) || 
                         words[iast.findIndex(w => word.toLowerCase() === w)];
      return {
        isSupport: true,
        category: category,
        specificType: types[supportWord] || 'general'
      };
    }
    
    // Then check for partial matches (for compound words)
    const partialMatch = words.find(w => word.includes(w)) || iast.find(w => word.toLowerCase().includes(w));
    if (partialMatch) {
      const supportWord = words.find(w => word.includes(w)) || 
                         words[iast.findIndex(w => word.toLowerCase().includes(w))];
      return {
        isSupport: true,
        category: category,
        specificType: types[supportWord] || 'general'
      };
    }
  }

  // Check based on support type hint
  if (supportType && ['surface', 'container', 'structural', 'temporal', 'directional'].includes(supportType)) {
    return {
      isSupport: true,
      category: supportType,
      specificType: 'general'
    };
  }

  // Check for metaphorical supports
  if (metaphorical || ['प्रेम', 'विश्वास', 'ज्ञान'].includes(word)) {
    const metaphorMap = {
      'प्रेम': 'emotional_foundation',
      'विश्वास': 'trust_basis',
      'ज्ञान': 'knowledge_ground'
    };
    return {
      isSupport: true,
      category: 'metaphorical',
      specificType: metaphorMap[word] || 'general_metaphor'
    };
  }

  // Check for literary supports
  if (literary || literaryGenre || genre || ['कविता', 'छन्द'].includes(word)) {
    return {
      isSupport: true,
      category: 'literary',
      specificType: 'literary_base'
    };
  }

  return { isSupport: false };
}

/**
 * Analyze the locative relationship between word and action
 * @param {string} word - Support word
 * @param {string} action - Action word
 * @param {Object} context - Context information
 * @returns {Object} - Locative relationship analysis
 */
function analyzeLocativeRelationship(word, action, context) {
  // Check for obvious non-locative relationships
  const nonLocativeWords = ['शस्त्र', 'weapon', 'साधन', 'tool'];
  if (nonLocativeWords.some(nonLoc => word.includes(nonLoc))) {
    return { isValid: false, reason: 'non_locative_word' };
  }

  // Valid locative patterns
  const locativePatterns = {
    'भूमि': ['स्थान', 'शयन', 'चलन'],
    'गृह': ['निवास', 'स्थिति', 'वास'],
    'मञ्च': ['शयन', 'उपवेशन', 'स्थान'],
    'वन': ['वास', 'भ्रमण', 'शिकार'],
    'प्रातः': ['जागरण', 'स्नान', 'पूजा']
  };

  // Check semantic compatibility
  for (const [support, actions] of Object.entries(locativePatterns)) {
    if (word.includes(support) && actions.some(a => action.includes(a))) {
      return {
        isValid: true,
        pattern: 'semantic_match',
        strength: 'strong'
      };
    }
  }

  // Default to valid if we have support type context
  if (context.supportType) {
    return {
      isValid: true,
      pattern: 'context_based',
      strength: 'medium'
    };
  }

  return {
    isValid: true,
    pattern: 'general',
    strength: 'weak'
  };
}

/**
 * Simple helper function to check if word qualifies as आधार-अधिकरण under this sutra
 * @param {string} word - Word to check
 * @param {Object} context - Context information
 * @returns {boolean} Quick boolean result
 */
export function isAdharaAdhikarana(word, context = {}) {
  const result = sutra1445(word, context);
  return result.applies === true;
}

// Export for test compatibility
export { sutra1445 as default };
