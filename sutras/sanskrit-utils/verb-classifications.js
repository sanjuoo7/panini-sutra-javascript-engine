/**
 * Shared Verb Classifications for Sanskrit Grammar
 * 
 * This module centralizes all verb-related constants and classifications
 * used across multiple sutras to eliminate redundancy and ensure consistency.
 */

// Krinvadi Verb Classifications (from 1.1.35)
export const KrinvadiVerbs = {
  // Primary krinvadi verbs with their characteristics
  roots: {
    'kṛ': { meaning: 'to do', class: 'krinvadi', transitivity: 'transitive' },
    'bhṛ': { meaning: 'to carry', class: 'krinvadi', transitivity: 'transitive' },
    'ji': { meaning: 'to conquer', class: 'krinvadi', transitivity: 'transitive' },
    'dhṛ': { meaning: 'to hold', class: 'krinvadi', transitivity: 'transitive' },
    'sṛ': { meaning: 'to go', class: 'krinvadi', transitivity: 'intransitive' },
    'mṛ': { meaning: 'to die', class: 'krinvadi', transitivity: 'intransitive' },
    'pṛ': { meaning: 'to fill', class: 'krinvadi', transitivity: 'transitive' },
    'tṛ': { meaning: 'to cross', class: 'krinvadi', transitivity: 'transitive' },
    'vṛ': { meaning: 'to choose', class: 'krinvadi', transitivity: 'transitive' },
    'sthā': { meaning: 'to stand', class: 'krinvadi', transitivity: 'intransitive' }
  },
  
  // Pattern-based identification
  patterns: [
    { pattern: /.*ṛ$/, description: 'Roots ending in ṛ' },
    { pattern: /.*ā$/, description: 'Roots ending in ā' },
    { pattern: /k.*$/, description: 'Roots beginning with k' },
    { pattern: /.*ī$/, description: 'Roots ending in ī' }
  ],
  
  // Transitivity contexts
  transitivityContexts: [
    'direct_object_present',
    'causative_construction', 
    'passive_transformation',
    'action_completed_on_object',
    'result_visible_on_object',
    'beneficiary_indirect_object'
  ]
};

// Avikarana Verb Classifications (from 1.1.36)
export const AvikaranaVerbs = {
  // Verbs without vikarana (connecting vowel)
  roots: {
    'as': { meaning: 'to be', class: 'avikarana', transitivity: 'intransitive' },
    'brū': { meaning: 'to speak', class: 'avikarana', transitivity: 'transitive' },
    'vid': { meaning: 'to know', class: 'avikarana', transitivity: 'transitive' },
    'rudh': { meaning: 'to obstruct', class: 'avikarana', transitivity: 'transitive' },
    'śru': { meaning: 'to hear', class: 'avikarana', transitivity: 'transitive' },
    'sru': { meaning: 'to flow', class: 'avikarana', transitivity: 'intransitive' },
    'dru': { meaning: 'to run', class: 'avikarana', transitivity: 'intransitive' },
    'plu': { meaning: 'to swim', class: 'avikarana', transitivity: 'intransitive' }
  },
  
  // Patterns for avikarana verbs
  patterns: [
    { pattern: /.*u$/, description: 'Roots ending in u' },
    { pattern: /.*ū$/, description: 'Roots ending in ū' },
    { pattern: /.*dh$/, description: 'Roots ending in dh' },
    { pattern: /.*s$/, description: 'Roots ending in s' }
  ],
  
  // Intransitivity contexts
  intransitivityContexts: [
    'action_complete_in_subject',
    'no_external_object_required',
    'subject_undergoes_change',
    'motion_or_state_change',
    'inherent_quality_expression',
    'spontaneous_action'
  ],
  
  // Vikarana indicators (what makes a verb NOT avikarana)
  vikaranaIndicators: {
    'gam': { vikarana: 'a', meaning: 'to go' },
    'pac': { vikarana: 'a', meaning: 'to cook' },
    'bhū': { vikarana: 'a', meaning: 'to become' },
    'kṛ': { vikarana: 'o', meaning: 'to do' },
    'ad': { vikarana: 'a', meaning: 'to eat' }
  }
};

// Transitive exceptions and special cases
export const VerbTransitivityExceptions = {
  // Verbs that are exceptions to normal transitivity rules
  transitiveExceptions: ['dvis', 'śās', 'hu', 'dā', 'dhā', 'mā', 'hā'],
  
  // Context-dependent transitivity
  contextDependent: {
    'gam': { 
      contexts: {
        'with_destination': 'transitive',
        'without_destination': 'intransitive'
      }
    },
    'sthā': {
      contexts: {
        'with_location': 'transitive', 
        'without_location': 'intransitive'
      }
    }
  },
  
  // Causative transformations
  causativePatterns: {
    'gam': 'gamaya', // to go -> to make go
    'sthā': 'sthāpaya', // to stand -> to make stand
    'pat': 'pātaya', // to fall -> to make fall
    'bhū': 'bhāvaya' // to be -> to make be
  }
};

// Root mappings for inflected forms
export const VerbRootMappings = {
  // Common inflected forms to root mappings
  'karoti': 'kṛ',
  'bharati': 'bhṛ',
  'jayati': 'ji',
  'dharati': 'dhṛ',
  'sarati': 'sṛ',
  'marati': 'mṛ',
  'piparti': 'pṛ',
  'tarati': 'tṛ',
  'vṛṇoti': 'vṛ',
  'tiṣṭhati': 'sthā',
  
  // Avikarana forms
  'asti': 'as',
  'brūte': 'brū',
  'vetti': 'vid',
  'ruṇaddhi': 'rudh',
  'śṛṇoti': 'śru',
  'sravati': 'sru',
  'dravati': 'dru',
  'plavate': 'plu'
};

// Helper functions for verb analysis
export function isKrinvadiVerb(verb) {
  const normalizedVerb = verb.toLowerCase();
  return KrinvadiVerbs.roots.hasOwnProperty(normalizedVerb) ||
         KrinvadiVerbs.patterns.some(p => p.pattern.test(normalizedVerb));
}

export function isAvikaranaVerb(verb) {
  const normalizedVerb = verb.toLowerCase();
  return AvikaranaVerbs.roots.hasOwnProperty(normalizedVerb) ||
         AvikaranaVerbs.patterns.some(p => p.pattern.test(normalizedVerb));
}

export function getVerbTransitivity(verb, context = {}) {
  const normalizedVerb = verb.toLowerCase();
  
  // Check exceptions first
  if (VerbTransitivityExceptions.transitiveExceptions.includes(normalizedVerb)) {
    return 'transitive';
  }
  
  // Check context-dependent cases
  if (VerbTransitivityExceptions.contextDependent[normalizedVerb]) {
    const contextRules = VerbTransitivityExceptions.contextDependent[normalizedVerb].contexts;
    for (const [contextType, transitivity] of Object.entries(contextRules)) {
      if (context[contextType]) {
        return transitivity;
      }
    }
  }
  
  // Check krinvadi verbs
  if (KrinvadiVerbs.roots[normalizedVerb]) {
    return KrinvadiVerbs.roots[normalizedVerb].transitivity;
  }
  
  // Check avikarana verbs
  if (AvikaranaVerbs.roots[normalizedVerb]) {
    return AvikaranaVerbs.roots[normalizedVerb].transitivity;
  }
  
  return 'unknown';
}

export function mapInflectedToRoot(inflectedForm) {
  const normalizedForm = inflectedForm.toLowerCase();
  return VerbRootMappings[normalizedForm] || inflectedForm;
}
