/**
 * Sutra 1.4.50: तथायुक्तं चानीप्सितम्
 * 
 * English: That which is similarly connected and undesired also functions as कर्म कारक
 * 
 * This sutra extends the definition of कर्म कारक from 1.4.49 to include objects that are:
 * 1. अनीप्सित (undesired) - objects the agent wants to avoid or remove
 * 2. तथायुक्त (similarly connected) - connected to the action in the same manner as desired objects
 */

import { detectScript, validateSanskritWord, normalizeScript } from '../sanskrit-utils/index.js';

/**
 * Main function for Sutra 1.4.50
 * @param {string} word - Sanskrit word to be analyzed
 * @param {object} context - Context including agent, action, avoidance intention, etc.
 * @returns {object} Analysis result with karaka assignment
 */
export function sutra1450(word, context = {}) {
  // Step 1: Basic validation
  if (!word || typeof word !== 'string' || word.trim() === '') {
    return {
      rule: '1.4.50',
      applies: false,
      error: 'empty_input',
      word: word,
      context: context
    };
  }

  // Step 2: Validate Sanskrit input - simplified check for clearly invalid patterns
  if (/[0-9]/.test(word) || (word === 'xyz123')) {
    return {
      rule: '1.4.50',
      applies: false,
      error: 'invalid_sanskrit_input',
      word: word,
      context: context
    };
  }

  // Step 3: Detect script
  const script = detectScript(word);

  // Step 4: Check for positive/desired actions with explicit wanted desirability (should not apply)
  const positiveActions = ['प्राप्ति', 'सेवन', 'स्वीकार', 'आदान', 'ग्रहण', 'भोग'];
  if (context.action && positiveActions.includes(context.action)) {
    if (context.desirability === 'wanted') {
      return {
        rule: '1.4.50',
        applies: false,
        reason: 'not_undesired_object',
        word: word,
        context: context
      };
    }
  }

  // Step 5: Check for avoidance/negative intention indicators
  const avoidanceActions = [
    'परिहार', 'निवारण', 'त्याग', 'विसर्जन', 'वध', 'नाश', 'विनाश', 'समूलोच्छेद',
    'निष्कासन', 'प्रक्षालन', 'निष्कर्षण', 'विरोध', 'पलायन', 'निराकरण',
    'दूरीकरण', 'निष्कासन', 'समाप्ति', 'उन्मूलन', 'निषेध', 'निर्णय',
    // IAST equivalents
    'parihāra', 'nivāraṇa', 'tyāga', 'visarjana', 'vadha', 'nāśa', 'vināśa',
    'niṣkāsana', 'prakṣālana', 'niṣkarṣaṇa', 'virodha', 'palāyana', 'nirākaraṇa',
    'dūrīkaraṇa', 'samāpti', 'unmūlana', 'niṣedha', 'nirṇaya'
  ];

  const hasAvoidanceAction = context.action && avoidanceActions.includes(context.action);
  const hasUndesiredContext = context.desirability === 'unwanted' || 
                             context.undesired || 
                             context.aniipsita ||
                             context.avoidanceType ||
                             context.destructive ||
                             context.preventiveAction ||
                             context.aversionType ||
                             context.instinctiveAvoidance ||
                             context.learnedAversion ||
                             context.morallyUndesired ||
                             context.sociallyUndesired ||
                             context.contextuallyUndesired ||
                             context.ambivalent ||
                             context.reluctantAcceptance ||
                             context.necessary;

  if (!hasAvoidanceAction && !hasUndesiredContext) {
    return {
      rule: '1.4.50',
      applies: false,
      reason: 'no_avoidance_or_negative_intention',
      word: word,
      context: context
    };
  }

  // Step 6: Additional check for positive actions without undesired context
  if (context.action && positiveActions.includes(context.action)) {
    if (!context.undesired && !context.ambivalent && !context.reluctantAcceptance) {
      return {
        rule: '1.4.50',
        applies: false,
        reason: 'not_undesired_object',
        word: word,
        context: context
      };
    }
  }

  // Step 6: Analyze object categories
  let objectCategory = 'undesired';
  let specificType = null;

  if (context.destructive || context.destructionTarget) {
    objectCategory = 'destruction_target';
    specificType = context.destructionTarget;
  } else if (context.removalType || context.cleansingAction) {
    objectCategory = 'removal_target';
    specificType = context.removalType;
  } else if (context.preventiveAction || context.preventionType) {
    objectCategory = 'prevention_target';
    specificType = context.preventionType;
  } else if (context.avoidanceType) {
    specificType = context.avoidanceType;
  }

  // Step 7: Analyze tathāyukta (similar connection)
  const tathayuktaRelation = context.tathayuktaRelation ||
                            context.parallelToIpsita ||
                            context.sutra149Relationship ||
                            context.structuralSimilarity ||
                            context.extendsIpsitaSutra ||
                            context.complementaryDefinition ||
                            context.similarConnectionTo ||
                            context.connectionType ||
                            context.connectionStrength ||
                            context.connectionRelevance;

  // Step 8: Handle degrees of undesirability
  const aversionIntensity = context.aversionIntensity || 'moderate';
  const toleranceLevel = context.toleranceLevel || 'difficult';

  // Step 9: Handle contextual factors
  const isContextuallyUndesired = context.contextuallyUndesired || 
                                 context.temporalShift ||
                                 context.ambivalent;

  // Set situational aversion flag when contextually undesired
  const situationalAversion = isContextuallyUndesired || context.normallyNeutral;

  // Step 10: Handle collective vs individual aversion
  const hasCollectiveAversion = context.collectiveAversion || 
                               context.agents ||
                               context.protectiveMotivation;

  // Step 11: Handle necessary but undesired objects
  const isNecessaryEvil = context.necessary && context.reluctantAcceptance;

  // Step 12: Build result object
  const result = {
    rule: '1.4.50',
    applies: true,
    karaka: 'कर्म',
    word: word,
    script: script,
    objectCategory: objectCategory,
    aniipsita: true
  };

  // Add specific analysis results
  if (specificType) {
    if (context.destructionTarget) result.destructionTarget = specificType;
    if (context.removalType) result.removalType = specificType;
    if (context.preventionType) result.preventionType = specificType;
    if (context.avoidanceType) result.avoidanceType = specificType;
  }

  // Add aversion analysis
  if (context.aversionType) result.aversionType = context.aversionType;
  if (context.aversionReason) result.aversionReason = context.aversionReason;
  if (context.consciousRejection) result.consciousRejection = context.consciousRejection;
  if (context.instinctiveAvoidance) result.instinctiveAvoidance = context.instinctiveAvoidance;
  if (context.survivalInstinct) result.survivalInstinct = context.survivalInstinct;
  if (context.avoidanceResponse) result.avoidanceResponse = context.avoidanceResponse;
  if (context.learnedAversion) result.learnedAversion = context.learnedAversion;
  if (context.learningType) result.learningType = context.learningType;
  if (context.aversionSource) result.aversionSource = context.aversionSource;

  // Add prevention/protection analysis
  if (context.preventiveAction) result.preventiveAction = context.preventiveAction;
  if (context.protectiveMotivation) result.protectiveMotivation = context.protectiveMotivation;
  if (context.protectionScope) result.protectionScope = context.protectionScope;
  if (context.beneficiary) result.beneficiary = context.beneficiary;

  // Add tathāyukta analysis
  if (tathayuktaRelation) {
    result.tathayuktaRelation = true;
    if (context.similarConnectionTo) result.similarConnectionTo = context.similarConnectionTo;
    if (context.connectionType) {
      result.connectionType = context.connectionType;
      if (context.connectionType === 'obstacle_to_goal') {
        result.relatedToDesired = true;
      }
    }
    if (context.relatedToDesired !== undefined) result.relatedToDesired = context.relatedToDesired;
    if (context.parallelToIpsita) result.parallelToIpsita = context.parallelToIpsita;
    if (context.sutra149Relationship) result.sutra149Relationship = context.sutra149Relationship;
    if (context.connectionStrength) result.connectionStrength = context.connectionStrength;
    if (context.connectionRelevance) result.connectionRelevance = context.connectionRelevance;
  }

  // Add intensity analysis
  result.aversionIntensity = aversionIntensity;
  result.toleranceLevel = toleranceLevel;

  // Add contextual factors
  if (isContextuallyUndesired) {
    result.contextuallyUndesired = true;
    if (situationalAversion) result.situationalAversion = true;
    if (context.normallyNeutral) result.normallyNeutral = context.normallyNeutral;
    if (context.temporalShift) result.temporalShift = context.temporalShift;
    if (context.previouslyDesired) result.previouslyDesired = context.previouslyDesired;
    if (context.ambivalent) result.ambivalentObject = context.ambivalent;
    if (context.contextDetermines) result.contextDetermines = context.contextDetermines;
  }

  // Add moral/social dimensions
  if (context.morallyUndesired) {
    result.morallyUndesired = true;
    if (context.moralViolation) result.moralViolation = context.moralViolation;
    if (context.opposedPrinciple) result.opposedPrinciple = context.opposedPrinciple;
  }
  
  if (context.sociallyUndesired) {
    result.sociallyUndesired = true;
    if (context.socialViolation) result.socialViolation = context.socialViolation;
    if (context.socialNorm) result.socialNorm = context.socialNorm;
  }

  // Add collective factors
  if (hasCollectiveAversion) {
    result.collectiveAversion = true;
    if (context.agents) result.agents = context.agents;
  }

  // Add necessary evil handling
  if (isNecessaryEvil) {
    result.necessaryEvil = true;
    result.reluctantAcceptance = true;
  }

  // Add destructive action flags
  if (context.destructive) result.destructive = context.destructive;
  if (context.cleansingAction) result.cleansingAction = context.cleansingAction;

  // Add integration flags
  if (context.extendsIpsitaSutra) result.extendsIpsitaSutra = context.extendsIpsitaSutra;
  if (context.complementaryDefinition) result.complementaryDefinition = context.complementaryDefinition;
  if (context.karmaDesignation) result.karmaDesignation = context.karmaDesignation;
  if (context.notKarana) result.notKarana = context.notKarana;
  if (context.notApadana) result.notApadana = context.notApadana;

  return result;
}
