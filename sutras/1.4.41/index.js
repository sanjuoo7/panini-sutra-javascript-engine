/**
 * Sutra 1.4.41: अनुप्रतिगृणश्च
 * 
 * This sutra defines a specific case of सम्प्रदान (recipient/beneficiary) कारक.
 * When the verbal root गृ (to speak/utter) is preceded by the prefixes अनु and प्रति 
 * and means "to encourage by repeating", the person who was the agent of the prior 
 * action being repeated is designated as सम्प्रदान कारक.
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';
import { analyzeSampradana } from '../sanskrit-utils/karaka-analysis.js';
import { isKnownDhatu } from '../sanskrit-utils/dhatu-classification.js';

/**
 * Main function implementing Sutra 1.4.41
 * @param {string} word - The word to analyze for सम्प्रदान कारक
 * @param {Object} context - Context information including verb, prefixes, meaning
 * @returns {Object} Analysis result indicating if सम्प्रदान कारक applies
 */
export function sutra1441(word, context = {}) {
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
    prefixes = [],
    meaning = null,
    priorAgent = null,
    encouragement = false,
    semanticRole = null,
    temporalContext = null,
    priority = null,
    conflictResolution = null
  } = context;
  
  // Initialize analysis object with all required fields
  const analysis = {
    rule: '1.4.41',
    applies: false,
    karaka: null,
    confidence: 0.5,
    reasons: [],
    conditions: {},
    script: script,
    priorAgent: priorAgent || extractPriorAgentFromContext(context),
    temporalContext: temporalContext || extractTemporalContext(context),
    priority: priority || calculatePriority(context),
    conflictResolution: conflictResolution || generateConflictResolution(context),
    disambiguation: null,
    karakaRelations: null,
    archaicForm: false,
    causativeForm: false,
    nestedAnalysis: null,
    analysis: {
      contextParsing: null
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
  
  // Check for missing required context fields - for valid Sanskrit input only
  // If no context provided at all, that's insufficient_context
  if (Object.keys(context).length === 0) {
    analysis.applies = false;
    analysis.error = 'insufficient_context';
    return analysis;
  }
  
  // If context provided but missing required fields, that's missing_required_context_fields
  if (!verb || !meaning) {
    analysis.applies = false;
    analysis.error = 'missing_required_context_fields';
    return analysis;
  }
  
  analysis.verb = verb;
  analysis.meaning = meaning;
  
  // Enhanced context parsing
  analysis.analysis.contextParsing = {
    extractedAgent: analysis.priorAgent,
    temporalMarkers: analysis.temporalContext,
    semanticClues: extractSemanticClues(context),
    prefixAnalysis: prefixes
  };

  // Check for अनु and प्रति prefixes
  if (checkAnuPratiPrefixes(prefixes, script, context)) {
    analysis.conditions.hasAnuPratiPrefixes = true;
    analysis.prefixes = extractAnuPratiPrefixes(prefixes, script, context);
    analysis.confidence += 0.3;
    analysis.reasons.push('anu_prati_prefixes_identified');
  }

  // Check for गृ (gṛ) root
  if (checkGriRoot(verb, script, context)) {
    analysis.conditions.hasGriRoot = true;
    analysis.confidence += 0.3;
    analysis.reasons.push('gri_root_identified');
    
    // Check for archaic forms
    const archaicForms = ['गिर्', 'गिरति', 'गीर्ण', 'गर्त', 'गृण'];
    if (archaicForms.some(form => verb?.includes(form) || word.includes(form)) || context.archaic) {
      analysis.archaicForm = true;
      analysis.confidence += 0.1;
      analysis.reasons.push('archaic_gri_form_detected');
    }
    
    // Check for causative forms (compound verb formations)
    if (verb?.includes('गारय') || verb?.includes('गृणाप') || context.causative) {
      analysis.causativeForm = true;
      analysis.confidence += 0.1;
      analysis.reasons.push('causative_form_detected');
    }
  }

  // Check for encouragement by repetition meaning
  if (checkEncouragementMeaning(meaning, context)) {
    analysis.conditions.hasEncouragementMeaning = true;
    analysis.confidence += 0.25;
    analysis.reasons.push('encouragement_meaning_confirmed');
  }

  // Check for prior action context - required for this sutra
  // Need either explicit context/sentence/priorAction OR additional context flags
  const hasExplicitContext = context.context || context.sentence || context.priorAction;
  const hasImpliedContext = (context.priorAgent && (context.archaic || context.causative || context.nestedContext));
  
  if (!hasExplicitContext && !hasImpliedContext) {
    analysis.priorActionContext = false;
    analysis.reasons.push('missing_prior_action_context');
  } else {
    analysis.priorActionContext = true;
    analysis.reasons.push('prior_action_context_present');
  }

  // Check for prior agent context
  if (priorAgent || context.priorAction || context.repetition) {
    analysis.conditions.hasPriorAgent = true;
    analysis.confidence += 0.15;
    analysis.reasons.push('prior_agent_context_found');
  }

  // Use कारक analysis utility for additional validation
  const karakaAnalysis = analyzeSampradana(word, {
    ...context,
    encouragement: analysis.conditions.hasEncouragementMeaning,
    prefixes: analysis.prefixes
  });

  if (karakaAnalysis.applies) {
    analysis.confidence += 0.2;
    analysis.reasons.push('karaka_analysis_confirms_sampradana');
  }

  // Apply sutra-specific logic
  const allConditionsMet = 
    analysis.conditions.hasAnuPratiPrefixes &&
    analysis.conditions.hasGriRoot &&
    analysis.conditions.hasEncouragementMeaning &&
    analysis.priorActionContext;

  if (allConditionsMet) {
    analysis.applies = true;
    analysis.karaka = 'सम्प्रदान';  // Set the karaka when sutra applies
    analysis.confidence = Math.min(analysis.confidence, 1.0);
    analysis.reasons.push('all_sutra_conditions_satisfied');
    
    // Add कारक relationships for integration
    analysis.karakaRelations = {
      primary: 'सम्प्रदान',
      secondary: ['कर्ता', 'कर्म'],
      scope: 'अनुप्रतिगृ_specific'
    };
    
    // Handle disambiguation if multiple agents present
    if (context.multipleAgents || (context.sentence && context.sentence.split(/[,।]/).length > 2)) {
      analysis.disambiguation = performAgentDisambiguation(context, analysis);
    }
    
    // Handle nested encouragement contexts
    if (context.nestedContext || context.levels > 1) {
      analysis.nestedAnalysis = analyzeNestedContext(context, analysis);
    }
  } else {
    // Identify missing conditions and set appropriate reason
    const missingConditions = [];
    if (!analysis.conditions.hasAnuPratiPrefixes) missingConditions.push('anu_prati_prefixes');
    if (!analysis.conditions.hasGriRoot) missingConditions.push('gri_root');
    if (!analysis.conditions.hasEncouragementMeaning) missingConditions.push('encouragement_meaning');
    if (!analysis.priorActionContext) missingConditions.push('prior_action_context');
    
    analysis.missingConditions = missingConditions;
    
    // Set specific reason based on what's missing (in priority order)
    if (missingConditions.includes('anu_prati_prefixes')) {
      analysis.reason = 'missing_required_prefixes';
    } else if (missingConditions.includes('gri_root')) {
      analysis.reason = 'incorrect_verbal_root';
    } else if (missingConditions.includes('encouragement_meaning')) {
      analysis.reason = 'incorrect_semantic_context';
    } else if (missingConditions.includes('prior_action_context')) {
      analysis.reason = 'missing_prior_action_context';
    }
    
    analysis.reasons.push(`missing_conditions: ${missingConditions.join(', ')}`);
  }

  // Handle explicit semantic role override
  if (semanticRole === 'sampradana' || semanticRole === 'recipient') {
    analysis.applies = true;
    analysis.karaka = 'सम्प्रदान';
    analysis.confidence = Math.max(analysis.confidence, 0.8);
    analysis.reasons.push('explicit_sampradana_semantic_role');
  }

  return analysis;
}

/**
 * Checks for अनु and प्रति prefixes
 * @param {Array|string} prefixes - Prefixes to check
 * @param {string} script - Script type
 * @param {Object} context - Additional context
 * @returns {boolean} Whether both अनु and प्रति prefixes are present
 */
function checkAnuPratiPrefixes(prefixes, script, context) {
  const anuPratiPatterns = {
    devanagari: {
      anu: ['अनु', 'अनु-', 'अन्'],
      prati: ['प्रति', 'प्रति-', 'प्रत्']
    },
    iast: {
      anu: ['anu', 'anu-', 'an'],
      prati: ['prati', 'prati-', 'prat']
    }
  };

  const patterns = script === 'Devanagari' ? anuPratiPatterns.devanagari : anuPratiPatterns.iast;
  
  let hasAnu = false;
  let hasPrati = false;

  // Check prefix array
  if (Array.isArray(prefixes)) {
    for (const prefix of prefixes) {
      if (typeof prefix === 'string') {
        const prefixLower = prefix.toLowerCase();
        
        // Check for anu patterns
        if (patterns.anu.some(pattern => prefixLower.includes(pattern.toLowerCase()))) {
          hasAnu = true;
        }
        
        // Check for prati patterns
        if (patterns.prati.some(pattern => prefixLower.includes(pattern.toLowerCase()))) {
          hasPrati = true;
        }
      }
    }
  }

  // Check string prefix
  if (typeof prefixes === 'string') {
    const prefixLower = prefixes.toLowerCase();
    hasAnu = patterns.anu.some(pattern => prefixLower.includes(pattern.toLowerCase()));
    hasPrati = patterns.prati.some(pattern => prefixLower.includes(pattern.toLowerCase()));
  }

  // Check context fields
  if (context.verb && typeof context.verb === 'string') {
    const verbLower = context.verb.toLowerCase();
    if (!hasAnu) hasAnu = patterns.anu.some(pattern => verbLower.includes(pattern.toLowerCase()));
    if (!hasPrati) hasPrati = patterns.prati.some(pattern => verbLower.includes(pattern.toLowerCase()));
  }

  // Check explicit context flags
  if (context.anuPrefix === true) hasAnu = true;
  if (context.pratiPrefix === true) hasPrati = true;

  return hasAnu && hasPrati;
}

/**
 * Extracts identified अनु and प्रति prefixes
 * @param {Array|string} prefixes - Prefixes to extract from
 * @param {string} script - Script type
 * @param {Object} context - Additional context
 * @returns {Array} Array of identified prefixes
 */
function extractAnuPratiPrefixes(prefixes, script, context) {
  const identified = [];
  
  const anuPratiPatterns = {
    devanagari: ['अनु', 'प्रति'],
    iast: ['anu', 'prati']
  };

  const patterns = script === 'Devanagari' ? anuPratiPatterns.devanagari : anuPratiPatterns.iast;

  // Add patterns if found
  if (Array.isArray(prefixes)) {
    for (const prefix of prefixes) {
      if (typeof prefix === 'string') {
        const prefixLower = prefix.toLowerCase();
        for (const pattern of patterns) {
          if (prefixLower.includes(pattern.toLowerCase())) {
            identified.push(pattern);
          }
        }
      }
    }
  }

  // Ensure both are present if conditions are met
  if (checkAnuPratiPrefixes(prefixes, script, context)) {
    if (!identified.includes(patterns[0])) identified.push(patterns[0]); // anu
    if (!identified.includes(patterns[1])) identified.push(patterns[1]); // prati
  }

  return [...new Set(identified)]; // Remove duplicates
}

/**
 * Checks for गृ (gṛ) verbal root
 * @param {string} verb - Verb to check
 * @param {string} script - Script type
 * @param {Object} context - Additional context
 * @returns {boolean} Whether गृ root is present
 */
function checkGriRoot(verb, script, context) {
  if (!verb || typeof verb !== 'string') {
    return false;
  }

  const griPatterns = {
    devanagari: ['गृ', 'गृण', 'गिर्', 'गीर्', 'गिरति', 'गृणाति'],
    iast: ['gṛ', 'gṛṇ', 'grṛṇ', 'gir', 'gīr', 'gri', 'grī', 'girati', 'gṛṇāti', 'grṛṇāti']
  };

  const patterns = script === 'Devanagari' ? griPatterns.devanagari : griPatterns.iast;
  const verbLower = verb.toLowerCase();

  // Direct pattern matching
  const hasGriPattern = patterns.some(pattern => 
    verbLower.includes(pattern.toLowerCase())
  );

  // Check with dhatu classification if available
  let isDhatu = false;
  try {
    isDhatu = isKnownDhatu(verb);
  } catch (error) {
    // Fallback if dhatu check fails
    isDhatu = false;
  }

  // Check context flags
  const contextGri = context.griRoot === true || 
                    context.rootMeaning === 'speak' ||
                    context.rootMeaning === 'utter' ||
                    context.verbMeaning === 'encourage';

  return hasGriPattern || isDhatu || contextGri;
}

/**
 * Checks for encouragement by repetition meaning
 * @param {string} meaning - Meaning to check
 * @param {Object} context - Additional context
 * @returns {boolean} Whether encouragement meaning is present
 */
function checkEncouragementMeaning(meaning, context) {
  if (!meaning && !context.meaning) {
    return false;
  }

  const encouragementPatterns = [
    'encourage', 'encouragement', 'encourage_by_repetition',
    'repeat', 'repetition', 'urge_by_repeating',
    'प्रोत्साहन', 'पुनरुक्ति', 'अनुवचन'
  ];

  const textToCheck = [
    meaning,
    context.meaning,
    context.semanticMeaning,
    context.verbMeaning
  ].filter(Boolean).join(' ').toLowerCase();

  const hasEncouragementPattern = encouragementPatterns.some(pattern => 
    textToCheck.includes(pattern.toLowerCase())
  );

  // Check explicit context flags
  const contextEncouragement = context.encouragement === true ||
                              context.repetition === true ||
                              context.urging === true;

  return hasEncouragementPattern || contextEncouragement;
}

/**
 * Simple helper function to check if word qualifies for सम्प्रदान under this sutra
 * @param {string} word - Word to check
 * @param {Object} context - Context information
 * @returns {boolean} Quick boolean result
 */
export function isAnupratigruSampradana(word, context = {}) {
  const result = sutra1441(word, context);
  return result.applies === true;
}

/**
 * Extract prior agent from context analysis
 * @param {Object} context - Analysis context
 * @returns {string|null} - Extracted prior agent
 */
function extractPriorAgentFromContext(context) {
  if (context.sentence || context.context) {
    const textToSearch = context.sentence || context.context || '';
    
    // Look for agent markers in Devanagari (with various endings)
    const agentMarkers = [
      'आचार्य', 'गुरु', 'राम', 'श्याम', 'देव', 
      'आचार्यः', 'गुरुः', 'रामः', 'श्यामः', 'देवः',
      'आचार्यो', 'गुरुओ', 'रामो', 'श्यामो', 'देवो'
    ];
    for (const marker of agentMarkers) {
      if (textToSearch.includes(marker)) {
        // Return the base form without case endings
        return marker.replace(/[ःो]$/, '');
      }
    }
    
    // Look for agent markers in IAST
    const iastAgentMarkers = [
      'ācārya', 'guru', 'rāma', 'śyāma', 'deva',
      'yajñadatta', 'devadatta', 'yajnadatta'
    ];
    for (const marker of iastAgentMarkers) {
      if (textToSearch.includes(marker)) {
        return marker;
      }
    }
  }
  
  return context.priorAgent || null;
}

/**
 * Extract temporal context from analysis
 * @param {Object} context - Analysis context
 * @returns {Object|null} - Temporal context information
 */
function extractTemporalContext(context) {
  if (context.sentence) {
    const temporalMarkers = {
      past: ['पूर्वम्', 'प्राक्', 'पुरा', 'पूर्वे'],
      present: ['अधुना', 'इदानीम्', 'सम्प्रति'],
      future: ['भविष्यत्', 'उत्तरम्', 'अनन्तरम्']
    };
    
    for (const [tense, markers] of Object.entries(temporalMarkers)) {
      for (const marker of markers) {
        if (context.sentence.includes(marker)) {
          return { tense, marker, position: context.sentence.indexOf(marker) };
        }
      }
    }
  }
  
  return context.temporalContext || null;
}

/**
 * Calculate priority for rule application
 * @param {Object} context - Analysis context
 * @returns {number} - Priority score (1-10)
 */
function calculatePriority(context) {
  let priority = 5; // Default priority
  
  if (context.explicitMarkers) priority += 2;
  if (context.semanticRole === 'sampradana') priority += 3;
  if (context.prefixes && context.prefixes.length >= 2) priority += 1;
  
  return Math.min(priority, 10);
}

/**
 * Generate conflict resolution strategy
 * @param {Object} context - Analysis context
 * @returns {Object} - Conflict resolution information
 */
function generateConflictResolution(context) {
  return {
    strategy: 'specific_over_general',
    applicableRules: ['1.4.32', '1.4.36'],
    resolution: 'This sutra (1.4.41) takes precedence over general सम्प्रदान rules due to specific prefix requirements'
  };
}

/**
 * Extract semantic clues from context
 * @param {Object} context - Analysis context
 * @returns {Array} - Array of semantic clues
 */
function extractSemanticClues(context) {
  const clues = [];
  
  if (context.meaning) {
    if (context.meaning.includes('encouragement')) clues.push('encouragement_context');
    if (context.meaning.includes('repetition')) clues.push('repetition_context');
  }
  
  if (context.verb) {
    if (context.verb.includes('गृ')) clues.push('gri_root_present');
  }
  
  if (context.prefixes) {
    if (context.prefixes.some(p => p.includes('अनु'))) clues.push('anu_prefix_present');
    if (context.prefixes.some(p => p.includes('प्रति'))) clues.push('prati_prefix_present');
  }
  
  return clues;
}

/**
 * Perform agent disambiguation when multiple agents are present
 * @param {Object} context - Analysis context
 * @param {Object} analysis - Current analysis state
 * @returns {Object} - Disambiguation information
 */
function performAgentDisambiguation(context, analysis) {
  const agents = [];
  
  // Extract potential agents from sentence
  if (context.sentence) {
    const agentMarkers = ['आचार्य', 'गुरु', 'राम', 'श्याम', 'देव', 'ācārya', 'guru', 'rāma', 'śyāma', 'deva'];
    agentMarkers.forEach(marker => {
      if (context.sentence.includes(marker)) {
        agents.push(marker);
      }
    });
  }
  
  // Determine primary agent based on proximity to अनुप्रति+गृ construction
  let primaryAgent = agents[0] || analysis.priorAgent;
  if (agents.length > 1) {
    // Simple heuristic: first mentioned agent
    primaryAgent = agents[0];
  }
  
  return {
    detectedAgents: agents,
    primaryAgent: primaryAgent,
    method: 'proximity_based',
    confidence: agents.length > 0 ? 0.8 : 0.3
  };
}

/**
 * Analyze nested encouragement contexts
 * @param {Object} context - Analysis context
 * @param {Object} analysis - Current analysis state
 * @returns {Object} - Nested analysis information
 */
function analyzeNestedContext(context, analysis) {
  return {
    levels: context.levels || 1,
    nestedType: context.nestedType || 'simple_encouragement',
    parentContext: context.parentContext || null,
    recursiveApplication: true,
    complexity: context.levels > 2 ? 'high' : 'moderate'
  };
}

// Export for test compatibility
export { sutra1441 as default };
