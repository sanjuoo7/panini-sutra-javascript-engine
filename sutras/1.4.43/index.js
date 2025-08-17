/**
 * Sutra 1.4.43: दिवः कर्म च (divaḥ karma ca)
 * "And [that which is instrumental] of दिव् [is also called] कर्म"
 * 
 * This sutra establishes that for the verbal root दिव् (to play/gamble),
 * the instrumental element can also be designated as कर्म, creating
 * a dual designation scenario.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { analyzeKarana } from '../sanskrit-utils/karaka-analysis.js';

/**
 * Main function implementing Sutra 1.4.43
 * @param {string} word - The word being analyzed for dual करण-कर्म designation
 * @param {Object} context - Contextual information for analysis
 * @returns {Object} - Analysis result with dual कारक designation details
 */
export function sutra1443(word, context = {}) {
  // Handle empty input
  if (typeof word !== 'string' || word.trim() === '') {
    return {
      applies: false,
      error: word === '' ? 'empty_input' : 'invalid_word_input',
      word: word
    };
  }

  const script = detectScript(word);
  
  // Extract key context information first
  const {
    verb = null,
    action = null,
    case: grammaticalCase = null,
    gameType = null,
    playType = null,
    contextType = null,
    tense = null,
    compound = false,
    metaphorical = false,
    collective = false,
    context: sentenceContext = null,
    ambiguityResolution = 'default',
    karanaSutra = null,
    karmaSutra = null,
    conflictingKarakas = [],
    resolution = null,
    instrumentality = null,
    desirability = null
  } = context;

  // Initialize analysis object with all required fields
  const analysis = {
    rule: '1.4.43',
    applies: false,
    karakas: [],
    primaryKaraka: null,
    secondaryKaraka: null,
    dualDesignation: false,
    confidence: 0.5,
    reasons: [],
    conditions: {},
    script: script,
    root: null,
    verbForm: null,
    instrumentType: null,
    instrumentCategory: null,
    context: null,
    contextCategory: null,
    sportTool: null,
    rationale: null,
    primaryDesignation: null,
    defaultPriority: null,
    karanaSutraIntegration: false,
    karmaSutraIntegration: false,
    conflictResolution: null,
    preferredDesignation: null,
    compoundVerb: compound,
    metaphoricalUsage: metaphorical,
    collectiveInstrument: collective,
    analysis: {
      divRootAnalysis: null,
      contextCompatibility: null
    }
  };

  // Validate Sanskrit input and script consistency - do this first
  const validationResult = validateSanskritWord(word);
  if (!validationResult.isValid) {
    analysis.applies = false;
    analysis.error = 'invalid_sanskrit_input';
    analysis.validationError = validationResult.error;
    return analysis;
  }

  // Check for missing required context fields
  if (Object.keys(context).length === 0) {
    analysis.applies = false;
    analysis.error = 'insufficient_context';
    return analysis;
  }

  // Check for missing verb context - required for दिव् analysis
  if (!verb) {
    analysis.applies = false;
    analysis.error = 'missing_verb_context';
    return analysis;
  }

  analysis.verb = verb;
  analysis.action = action;
  analysis.verbForm = tense;

  // Enhanced context parsing
  analysis.analysis.divRootAnalysis = analyzeDivRoot(verb, context);

  // Set context compatibility analysis
  analysis.analysis.contextCompatibility = {
    gameType: gameType || null,
    playType: playType || null,
    contextType: contextType || null,
    verified: false
  };

  // Step 1: Verify दिव् root
  if (checkDivRoot(verb, context)) {
    analysis.conditions.hasDivRoot = true;
    analysis.root = 'दिव्';
    analysis.confidence += 0.4;
    analysis.reasons.push('div_root_verified');
  } else {
    analysis.conditions.hasDivRoot = false;
    analysis.applies = false;
    analysis.reason = 'not_div_root';
    return analysis;
  }

  // Step 2: Validate playing/gaming context
  const contextAnalysis = validatePlayingContext(action, word, context);
  if (contextAnalysis.isValid) {
    analysis.conditions.hasValidContext = true;
    analysis.context = contextAnalysis.type;
    analysis.contextCategory = contextAnalysis.category;
    analysis.confidence += 0.3;
    analysis.reasons.push('valid_playing_context');
  } else {
    analysis.conditions.hasValidContext = false;
    analysis.applies = false;
    analysis.reason = contextAnalysis.reason;
    return analysis;
  }

  // Step 3: Analyze instrument compatibility
  const instrumentAnalysis = analyzeInstrumentCompatibility(word, action, context);
  if (instrumentAnalysis.isCompatible) {
    analysis.conditions.isCompatibleInstrument = true;
    analysis.instrumentType = instrumentAnalysis.type;
    analysis.instrumentCategory = instrumentAnalysis.category;
    analysis.sportTool = instrumentAnalysis.sportTool;
    analysis.confidence += 0.2;
    analysis.reasons.push('compatible_instrument');
  } else {
    analysis.conditions.isCompatibleInstrument = false;
    analysis.applies = false;
    analysis.reason = 'semantic_incompatibility';
    return analysis;
  }

  // Apply main sutra logic - dual designation
  const allConditionsMet = 
    analysis.conditions.hasDivRoot &&
    analysis.conditions.hasValidContext &&
    analysis.conditions.isCompatibleInstrument;

  if (allConditionsMet) {
    analysis.applies = true;
    analysis.karakas = ['करण', 'कर्म'];
    analysis.primaryKaraka = 'करण';
    analysis.secondaryKaraka = 'कर्म';
    analysis.dualDesignation = true;
    analysis.confidence = Math.min(analysis.confidence, 1.0);
    analysis.reasons.push('sutra_conditions_satisfied');

    // Set default priorities and rationale
    analysis.primaryDesignation = 'करण';
    analysis.defaultPriority = 'instrumental';
    analysis.rationale = {
      karana: 'instrumental_in_playing',
      karma: 'object_of_playing_action'
    };

    // Handle integration with other sutra rules
    if (karanaSutra) {
      analysis.karanaSutraIntegration = true;
      analysis.instrumentality = instrumentality;
    }

    if (karmaSutra) {
      analysis.karmaSutraIntegration = true;
    }

    // Handle conflicts and resolution
    if (conflictingKarakas.length > 0) {
      analysis.conflictResolution = handleKarakaConflicts(conflictingKarakas, analysis);
      analysis.preferredDesignation = analysis.karakas;
    }

  } else {
    // This shouldn't happen given our early returns, but safety check
    const missingConditions = [];
    if (!analysis.conditions.hasDivRoot) missingConditions.push('div_root');
    if (!analysis.conditions.hasValidContext) missingConditions.push('valid_context');
    if (!analysis.conditions.isCompatibleInstrument) missingConditions.push('compatible_instrument');
    
    analysis.missingConditions = missingConditions;
    analysis.reasons.push(`missing_conditions: ${missingConditions.join(', ')}`);
  }

  return analysis;
}

/**
 * Check if the verb is दिव् root
 * @param {string} verb - Verb to check
 * @param {Object} context - Context information
 * @returns {boolean} - Whether the verb is from दिव् root
 */
function checkDivRoot(verb, context) {
  if (!verb || typeof verb !== 'string') {
    return false;
  }

  // Common forms of दिव् root
  const divForms = {
    devanagari: [
      'दीव्यति', 'दीव्यते', // present
      'दिदेव', 'दिदिवुः', // perfect
      'देवयति', 'देवयते', // causative
      'दीव्यमान', 'दीव्यन्', // participles
      'दीव्यति', 'दिव्', 'देव'
    ],
    iast: [
      'dīvyati', 'dīvyate',
      'dideva', 'didivuḥ',
      'devayati', 'devayate',
      'dīvyamāna', 'dīvyan',
      'div', 'deva'
    ]
  };

  const script = detectScript(verb);
  const forms = script === 'Devanagari' ? divForms.devanagari : divForms.iast;
  const verbLower = verb.toLowerCase();

  // Check direct forms
  const hasDivForm = forms.some(form => 
    verbLower.includes(form.toLowerCase()) || verb.includes(form)
  );

  // Check compound forms
  if (context.compound && verb.includes('दीव्यति')) {
    return true;
  }

  return hasDivForm;
}

/**
 * Analyze the दिव् root in detail
 * @param {string} verb - Verb to analyze
 * @param {Object} context - Context information
 * @returns {Object} - Detailed analysis of दिव् root
 */
function analyzeDivRoot(verb, context) {
  const tenseMap = {
    'दीव्यति': 'present',
    'दिदेव': 'perfect',
    'देवयति': 'causative',
    'दीव्यमान': 'participle'
  };

  for (const [form, tense] of Object.entries(tenseMap)) {
    if (verb.includes(form)) {
      return { tense, form, verified: true };
    }
  }

  return { tense: 'unknown', form: verb, verified: false };
}

/**
 * Validate the playing/gaming context
 * @param {string} action - Action being performed
 * @param {string} word - Instrument word
 * @param {Object} context - Context information
 * @returns {Object} - Context validation result
 */
function validatePlayingContext(action, word, context) {
  // Valid contexts for दिव्
  const validContexts = {
    gambling: {
      actions: ['द्यूत', 'dyūta', 'जुआ', 'gambling'],
      category: 'gambling'
    },
    musical: {
      actions: ['वादन', 'vādana', 'संगीत', 'musical'],
      category: 'musical'  
    },
    sporting: {
      actions: ['क्रीडा', 'krīḍā', 'खेल', 'sport'],
      category: 'sporting'
    }
  };

  // Check action against valid contexts
  if (action) {
    for (const [type, { actions, category }] of Object.entries(validContexts)) {
      if (actions.some(validAction => action.includes(validAction))) {
        return { isValid: true, type, category };
      }
    }
  }

  // Check context type hint
  if (context.contextType && validContexts[context.contextType]) {
    return { 
      isValid: true, 
      type: context.contextType, 
      category: validContexts[context.contextType].category 
    };
  }

  // Check gameType or playType
  if (context.gameType === 'gambling' || context.playType === 'musical' || context.playType === 'sport') {
    return { 
      isValid: true, 
      type: context.gameType || context.playType, 
      category: context.gameType || context.playType 
    };
  }

  // Invalid contexts (like दिव् meaning "to shine")
  const invalidActions = ['प्रकाश', 'prakāśa', 'shine', 'illumination'];
  if (action && invalidActions.some(invalid => action.includes(invalid))) {
    return { isValid: false, reason: 'invalid_div_context' };
  }

  // Default to valid if दिव् root is confirmed
  return { isValid: true, type: 'general', category: 'playing' };
}

/**
 * Analyze instrument compatibility with playing context
 * @param {string} word - Instrument word
 * @param {string} action - Action being performed  
 * @param {Object} context - Context information
 * @returns {Object} - Compatibility analysis
 */
function analyzeInstrumentCompatibility(word, action, context) {
  // Gaming instruments
  const gamblingInstruments = {
    'अक्ष': { type: 'dice', category: 'dice' },
    'पाशक': { type: 'dice_variant', category: 'dice_variant' },
    'शर': { type: 'arrow_lots', category: 'arrow_lots' }
  };

  // Musical instruments
  const musicalInstruments = {
    'वीणा': { type: 'string', category: 'string' },
    'मृदङ्ग': { type: 'percussion', category: 'percussion' },
    'वेणु': { type: 'wind', category: 'wind' }
  };

  // Sport instruments
  const sportInstruments = {
    'दण्ड': { type: 'stick', category: 'stick', sportTool: 'stick' },
    'गेन्दुक': { type: 'ball', category: 'ball', sportTool: 'ball' }
  };

  // Check against known instrument types
  for (const [instrument, details] of Object.entries(gamblingInstruments)) {
    if (word.includes(instrument)) {
      return { isCompatible: true, ...details };
    }
  }

  for (const [instrument, details] of Object.entries(musicalInstruments)) {
    if (word.includes(instrument)) {
      return { isCompatible: true, ...details };
    }
  }

  for (const [instrument, details] of Object.entries(sportInstruments)) {
    if (word.includes(instrument)) {
      return { isCompatible: true, ...details };
    }
  }

  // Check for obviously incompatible instruments
  const incompatibleInstruments = ['पुस्तक', 'book', 'गृह', 'house'];
  for (const incompatible of incompatibleInstruments) {
    if (word.includes(incompatible)) {
      return { isCompatible: false, reason: 'semantic_incompatibility' };
    }
  }

  // Default to compatible for general instruments
  return { 
    isCompatible: true, 
    type: 'general', 
    category: 'general_instrument' 
  };
}

/**
 * Handle conflicts with other कारक assignments
 * @param {Array} conflictingKarakas - Other कारक assignments in conflict
 * @param {Object} analysis - Current analysis state
 * @returns {Object} - Conflict resolution information
 */
function handleKarakaConflicts(conflictingKarakas, analysis) {
  return {
    conflicts: conflictingKarakas,
    resolution: 'dual_designation_preferred',
    rationale: 'Sutra 1.4.43 specifically allows dual करण-कर्म designation for दिव् root',
    priority: 'high'
  };
}

/**
 * Simple helper function to check if word qualifies for dual designation under this sutra
 * @param {string} word - Word to check
 * @param {Object} context - Context information
 * @returns {boolean} Quick boolean result
 */
export function isDivKarmaKarana(word, context = {}) {
  const result = sutra1443(word, context);
  return result.applies === true;
}

// Export for test compatibility
export { sutra1443 as default };
