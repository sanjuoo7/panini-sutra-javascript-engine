/**
 * Sutra 1.3.9: तस्य लोपः (tasya lopaḥ)
 * "Of this (it-marker), there is elision"
 * 
 * This sutra prescribes the deletion/elision of it-markers (इत्) that have been 
 * identified by previous sutras (1.3.2-1.3.8). It provides the general rule that
 * all elements marked as 'it' should be deleted from the final form.
 *
 * @fileoverview Implementation of Panini's Sutra 1.3.9 - It-marker elision
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Applies it-marker elision according to Sutra 1.3.9
 * @param {string} form - The Sanskrit form containing potential it-markers
 * @param {Object} options - Configuration options
 * @param {Array<string>} options.itMarkers - Specific it-markers to remove
 * @param {string} options.context - Grammatical context (affix, root, etc.)
 * @returns {Object} Analysis result with processed form
 */
export function applyItElision(form, options = {}) {
  // Input validation
  if (!form || typeof form !== 'string') {
    return {
      success: false,
      error: 'Invalid input: form must be a non-empty string',
      originalForm: form,
      processedForm: form
    };
  }

  const script = detectScript(form);
  if (script === 'Unknown') {
    return {
      success: false,
      error: 'Unable to detect script',
      originalForm: form,
      processedForm: form
    };
  }

  const {
    itMarkers = [],
    context = 'general'
  } = options;

  let processedForm = form;
  const removedMarkers = [];

  // Apply specified it-markers if provided
  if (itMarkers.length > 0) {
    for (const marker of itMarkers) {
      if (processedForm.includes(marker)) {
        removedMarkers.push({
          marker: marker,
          type: 'specified',
          position: processedForm.indexOf(marker),
          rule: '1.3.9'
        });
        processedForm = processedForm.replace(marker, '');
      }
    }
  }

  return {
    success: true,
    originalForm: form,
    processedForm: processedForm,
    script: script,
    removedItMarkers: removedMarkers,
    context: context,
    elisionApplied: removedMarkers.length > 0,
    rule: '1.3.9'
  };
}

/**
 * Checks if a form contains it-markers that should be elided
 * @param {string} form - Sanskrit form to analyze
 * @param {Object} options - Analysis options
 * @returns {Object} Analysis of potential it-markers
 */
export function checkItElision(form, options = {}) {
  if (!form || typeof form !== 'string') {
    return {
      success: false,
      error: 'Invalid input',
      shouldElide: false
    };
  }

  const script = detectScript(form);
  const { context = 'general' } = options;

  // Basic check for common it-marker patterns
  // This would integrate with the specific sutra implementations (1.3.2-1.3.8)
  const potentialItMarkers = [];

  // Check for common patterns that would be identified by previous sutras
  if (script === 'IAST') {
    // Check for patterns from 1.3.3 (final consonants)
    if (/[kgcjṭḍtdpbmnyngñṇrlvśṣsh]$/.test(form)) {
      potentialItMarkers.push({
        marker: form.slice(-1),
        type: 'final_consonant',
        sutra: '1.3.3'
      });
    }
    
    // Check for patterns from 1.3.5 (ñi, ṭu, ḍu)
    if (/^ñi/.test(form)) {
      potentialItMarkers.push({
        marker: 'ñi',
        type: 'initial_sequence',
        sutra: '1.3.5'
      });
    }
    if (/^ṭu/.test(form)) {
      potentialItMarkers.push({
        marker: 'ṭu',
        type: 'initial_sequence',
        sutra: '1.3.5'
      });
    }
    if (/^ḍu/.test(form)) {
      potentialItMarkers.push({
        marker: 'ḍu',
        type: 'initial_sequence',
        sutra: '1.3.5'
      });
    }
  }

  return {
    success: true,
    form: form,
    script: script,
    context: context,
    potentialItMarkers: potentialItMarkers,
    shouldElide: potentialItMarkers.length > 0
  };
}

/**
 * Integrates with previous sutra implementations to apply comprehensive elision
 * @param {string} form - Form to process
 * @param {Object} context - Grammatical context
 * @returns {Object} Processed result
 */
export function integratedItElision(form, context = {}) {
  // This function would integrate with the actual implementations of sutras 1.3.2-1.3.8
  // For now, it provides a framework for such integration
  
  const analysis = checkItElision(form, context);
  
  if (!analysis.success || !analysis.shouldElide) {
    return {
      success: true,
      originalForm: form,
      processedForm: form,
      context: context,
      elisionApplied: false,
      reason: 'No it-markers found or elision not applicable'
    };
  }

  // Extract markers identified by previous sutras
  const markersToRemove = analysis.potentialItMarkers.map(m => m.marker);
  
  const result = applyItElision(form, {
    itMarkers: markersToRemove,
    context: context.type || 'general'
  });

  // Add the context to the result
  return {
    ...result,
    context: context
  };
}

export default {
  applyItElision,
  checkItElision,
  integratedItElision
};
