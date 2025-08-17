/**
 * अधिकार (Adhikāra) Scope Management Utility
 * 
 * Manages scope ranges and rule inheritance for sutras with governing authority
 * Used by sutras like 1.4.56 (प्राग्रीश्वरान्निपाताः) that establish範囲 rules
 */

import { detectScript } from './script-detection.js';

/**
 * Manages अधिकार scope definitions and validations
 */
export class AdhikaraManager {
  constructor() {
    this.scopes = new Map();
    this.initializeKnownScopes();
  }

  /**
   * Initialize known अधिकार scopes from Panini's grammar
   */
  initializeKnownScopes() {
    // Major अधिकार ranges
    this.scopes.set('nipata', {
      name: 'निपात',
      start: '1.4.56',
      end: '1.4.97',
      description: 'प्राग्रीश्वरान्निपाताः - निपात particle classification scope',
      type: 'classification',
      applies_to: ['particles', 'indeclinables']
    });

    this.scopes.set('vrddhi', {
      name: 'वृद्धि',
      start: '1.1.1',
      end: '1.1.3',
      description: 'वृद्धिरादैच् - वृद्धि vowel definition scope',
      type: 'definition',
      applies_to: ['vowels']
    });

    this.scopes.set('guna', {
      name: 'गुण',
      start: '1.1.2',
      end: '1.1.4',
      description: 'अदेङ् गुणः - गुण vowel definition scope',
      type: 'definition',
      applies_to: ['vowels']
    });
  }

  /**
   * Checks if a sutra number falls within a specific अधिकार scope
   * @param {string} sutraNumber - Sutra number (e.g., "1.4.60")
   * @param {string} scopeName - Name of the अधिकार scope
   * @returns {boolean} Whether sutra is within scope
   */
  isWithinScope(sutraNumber, scopeName) {
    const scope = this.scopes.get(scopeName);
    if (!scope) return false;

    return this.compareSutraNumbers(sutraNumber, scope.start) >= 0 &&
           this.compareSutraNumbers(sutraNumber, scope.end) <= 0;
  }

  /**
   * Gets all active अधिकार scopes for a given sutra
   * @param {string} sutraNumber - Sutra number to check
   * @returns {Array} Array of active scope objects
   */
  getActiveScopes(sutraNumber) {
    const activeScopes = [];
    
    for (const [name, scope] of this.scopes) {
      if (this.isWithinScope(sutraNumber, name)) {
        activeScopes.push({
          name: name,
          ...scope
        });
      }
    }
    
    return activeScopes;
  }

  /**
   * Compares two sutra numbers
   * @param {string} sutra1 - First sutra number
   * @param {string} sutra2 - Second sutra number  
   * @returns {number} -1 if sutra1 < sutra2, 0 if equal, 1 if sutra1 > sutra2
   */
  compareSutraNumbers(sutra1, sutra2) {
    const parse = (sutra) => {
      const parts = sutra.split('.').map(Number);
      return parts[0] * 10000 + parts[1] * 100 + parts[2];
    };

    const num1 = parse(sutra1);
    const num2 = parse(sutra2);

    return num1 < num2 ? -1 : num1 > num2 ? 1 : 0;
  }

  /**
   * Registers a new अधिकार scope
   * @param {string} name - Scope name
   * @param {Object} scopeDefinition - Scope definition object
   */
  registerScope(name, scopeDefinition) {
    this.scopes.set(name, scopeDefinition);
  }

  /**
   * Gets scope definition by name
   * @param {string} name - Scope name
   * @returns {Object|null} Scope definition or null if not found
   */
  getScope(name) {
    return this.scopes.get(name) || null;
  }
}

// Global instance
const adhikaraManager = new AdhikaraManager();

/**
 * Analyzes अधिकार scope for a given context
 * @param {Object} context - Context information
 * @returns {Object} Analysis result
 */
export function analyzeAdhikaraContext(context = {}) {
  const analysis = {
    currentSutra: context.sutraNumber || null,
    activeScopes: [],
    withinNipataScope: false,
    scopeValidation: {
      valid: false,
      reasons: []
    }
  };

  if (analysis.currentSutra) {
    analysis.activeScopes = adhikaraManager.getActiveScopes(analysis.currentSutra);
    analysis.withinNipataScope = adhikaraManager.isWithinScope(analysis.currentSutra, 'nipata');
    
    analysis.scopeValidation.valid = analysis.activeScopes.length > 0;
    if (analysis.scopeValidation.valid) {
      analysis.scopeValidation.reasons.push('active_adhikara_scopes_found');
    }
  }

  // Check explicit scope context
  if (context.adhikaraScope) {
    const scope = adhikaraManager.getScope(context.adhikaraScope);
    if (scope) {
      analysis.explicitScope = scope;
      analysis.scopeValidation.valid = true;
      analysis.scopeValidation.reasons.push('explicit_scope_provided');
    }
  }

  return analysis;
}

/**
 * Validates if a term should inherit अधिकार properties
 * @param {string} word - Word to validate
 * @param {Object} context - Context information
 * @returns {Object} Validation result
 */
export function validateAdhikaraInheritance(word, context = {}) {
  const script = detectScript(word);
  const analysis = analyzeAdhikaraContext(context);
  
  const result = {
    word: word,
    script: script,
    inheritsScope: false,
    applicableScopes: [],
    primaryScope: null,
    confidence: 0,
    reasons: []
  };

  // Check if word inherits any active scope properties
  for (const scope of analysis.activeScopes) {
    if (scope.applies_to && scope.applies_to.includes('particles') && 
        (context.isParticle === true || context.indeclinable === true)) {
      result.applicableScopes.push(scope);
      result.confidence += 0.4;
      result.reasons.push(`inherits_${scope.name}_scope`);
    }
  }

  // Specific निपात scope inheritance
  if (analysis.withinNipataScope && 
      (context.isParticle !== false && context.declinable !== true)) {
    result.inheritsScope = true;
    result.primaryScope = 'निपात';
    result.confidence += 0.5;
    result.reasons.push('nipata_scope_inheritance');
  }

  return result;
}

/**
 * Creates अधिकार scope establishment for governing sutras
 * @param {string} scopeName - Name of the scope being established
 * @param {Object} scopeDefinition - Definition of the scope
 * @param {Object} context - Context information
 * @returns {Object} Scope establishment result
 */
export function establishAdhikaraScope(scopeName, scopeDefinition, context = {}) {
  const result = {
    scopeName: scopeName,
    established: false,
    definition: scopeDefinition,
    startSutra: context.currentSutra || scopeDefinition.start,
    endSutra: scopeDefinition.end,
    type: scopeDefinition.type || 'general',
    confidence: 0,
    reasons: []
  };

  // Validate scope definition
  if (scopeDefinition.start && scopeDefinition.end) {
    result.established = true;
    result.confidence += 0.6;
    result.reasons.push('valid_scope_range_provided');

    // Register scope if new
    if (!adhikaraManager.getScope(scopeName)) {
      adhikaraManager.registerScope(scopeName, scopeDefinition);
      result.confidence += 0.2;
      result.reasons.push('scope_registered_successfully');
    }
  }

  // Validate current sutra as scope starter
  if (context.currentSutra === scopeDefinition.start) {
    result.confidence += 0.2;
    result.reasons.push('sutra_initiates_scope');
  }

  return result;
}

/**
 * Checks scope boundaries and transitions
 * @param {string} currentSutra - Current sutra number
 * @param {string} targetSutra - Target sutra number
 * @param {string} scopeName - Scope to check
 * @returns {Object} Boundary analysis result
 */
export function checkScopeBoundaries(currentSutra, targetSutra, scopeName) {
  const scope = adhikaraManager.getScope(scopeName);
  
  const result = {
    currentSutra: currentSutra,
    targetSutra: targetSutra,
    scopeName: scopeName,
    currentInScope: false,
    targetInScope: false,
    crossesBoundary: false,
    boundaryType: null,
    confidence: 0,
    reasons: []
  };

  if (!scope) {
    result.error = 'scope_not_found';
    return result;
  }

  result.currentInScope = adhikaraManager.isWithinScope(currentSutra, scopeName);
  result.targetInScope = adhikaraManager.isWithinScope(targetSutra, scopeName);

  // Check boundary crossing
  if (result.currentInScope !== result.targetInScope) {
    result.crossesBoundary = true;
    result.confidence += 0.5;
    
    if (result.currentInScope && !result.targetInScope) {
      result.boundaryType = 'exit';
      result.reasons.push('crosses_scope_exit_boundary');
    } else {
      result.boundaryType = 'entry';
      result.reasons.push('crosses_scope_entry_boundary');
    }
  }

  return result;
}

export { adhikaraManager };

export default {
  AdhikaraManager,
  adhikaraManager,
  analyzeAdhikaraContext,
  validateAdhikaraInheritance,
  establishAdhikaraScope,
  checkScopeBoundaries
};
