// Sutra 1.3.5: आदिर्ञिटुडवः
import { detectScript } from '../sanskrit-utils/script-detection.js';
import { validateSanskritWord } from '../sanskrit-utils/validation.js';

/**
 * Determines if a form has initial ञि, टु, डु sequences that are it-markers
 * according to Sutra 1.3.5.
 * 
 * This sutra specifies that when the consonant sequences ञि, टु, डु appear
 * at the beginning of affixes or roots in grammatical instruction,
 * they are considered it-markers and should be deleted.
 * 
 * @param {string} form - The word or form to analyze
 * @param {object} [options] - Optional parameters
 * @param {boolean} [options.isGrammaticalInstruction] - Whether this is in a grammatical context
 * @param {string} [options.elementType] - Type of element ('affix', 'root', 'pratyaya', etc.)
 * @returns {{
 *   hasItMarkers: boolean,
 *   itSequences: Array<string>,
 *   script: string,
 *   reason: string,
 *   processedForm: string|null,
 *   elementType: string|null
 * }}
 */
function hasInitialItMarkers(form, options = {}) {
  // Input validation
  const validation = validateSanskritWord(form);
  if (!validation.isValid) {
    return {
      hasItMarkers: false,
      itSequences: [],
      script: null,
      reason: validation.errorType === 'EMPTY_INPUT' ? 'empty-input' : 'invalid-input',
      processedForm: null,
      elementType: null
    };
  }

  const script = detectScript(form);
  const trimmed = form.trim();

  // Define the initial sequences that are it-markers
  const IT_SEQUENCES = {
    iast: ['ñi', 'ṭu', 'ḍu'],
    devanagari: ['ञि', 'टु', 'डु']
  };

  const sequences = script === 'Devanagari' ? IT_SEQUENCES.devanagari : IT_SEQUENCES.iast;
  
  // Check if the form starts with any of the it-marker sequences
  const foundSequences = [];
  let processedForm = trimmed;

  for (const seq of sequences) {
    if (trimmed.startsWith(seq)) {
      foundSequences.push(seq);
      // Remove the it-marker sequence from the beginning
      processedForm = trimmed.substring(seq.length);
      break; // Only one initial sequence can match
    }
  }

  const hasItMarkers = foundSequences.length > 0;

  // Determine if this is a context where it-markers should be recognized
  const isGrammaticalContext = options.isGrammaticalInstruction === true ||
                               ['affix', 'pratyaya', 'dhatu', 'suffix'].includes(options.elementType);

  return {
    hasItMarkers: hasItMarkers && isGrammaticalContext,
    itSequences: foundSequences,
    script,
    reason: hasItMarkers ? 
      (isGrammaticalContext ? 'initial-it-sequence-found' : 'not-grammatical-context') :
      'no-initial-it-sequence',
    processedForm: hasItMarkers && isGrammaticalContext ? processedForm : null,
    elementType: options.elementType || null
  };
}

/**
 * Helper function to remove initial it-markers from a form
 * @param {string} form - The form to process
 * @param {object} options - Processing options
 * @returns {string} - The form with it-markers removed
 */
function removeInitialItMarkers(form, options = {}) {
  const analysis = hasInitialItMarkers(form, options);
  return analysis.processedForm || form;
}

/**
 * Helper function to check if a specific sequence is an initial it-marker
 * @param {string} sequence - The sequence to check
 * @param {string} script - The script (IAST or Devanagari)
 * @returns {boolean} - Whether the sequence is an it-marker
 */
function isInitialItSequence(sequence, script = 'IAST') {
  const IT_SEQUENCES = {
    iast: ['ñi', 'ṭu', 'ḍu'],
    devanagari: ['ञि', 'टु', 'डु']
  };

  const sequences = script === 'Devanagari' ? IT_SEQUENCES.devanagari : IT_SEQUENCES.iast;
  return sequences.includes(sequence);
}

export { hasInitialItMarkers, removeInitialItMarkers, isInitialItSequence };
