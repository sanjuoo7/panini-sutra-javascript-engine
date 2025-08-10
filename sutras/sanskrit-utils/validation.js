/**
 * Validation and Error Handling Utilities
 * 
 * This module provides comprehensive validation functions:
 * - Word validation
 * - Phoneme sequence validation
 * - Input sanitization
 * - Error handling utilities
 * 
 * Created: August 8, 2025
 */

import { detectScript } from './script-detection.js';
import { tokenizePhonemes } from './phoneme-tokenization.js';
import { isVowel, isConsonant } from './classification.js';

// ==================== INPUT VALIDATION ====================

/**
 * Validates if input is a valid Sanskrit word
 * @param {any} input - Input to validate
 * @returns {Object} - Validation result
 */
export function validateSanskritWord(input) {
  // Basic type validation
  if (typeof input !== 'string') {
    return {
      isValid: false,
      error: 'Input must be a string',
      errorType: 'TYPE_ERROR',
      input: input
    };
  }

  // Empty string validation
  if (!input.trim()) {
    return {
      isValid: false,
      error: 'Input cannot be empty',
      errorType: 'EMPTY_INPUT',
      input: input
    };
  }

  const trimmedInput = input.trim();
  
  // Script detection
  const script = detectScript(trimmedInput);
  
  if (script === 'Unknown') {
    return {
      isValid: false,
      error: 'Input does not appear to be valid Sanskrit (IAST or Devanagari)',
      errorType: 'INVALID_SCRIPT',
      input: trimmedInput,
      script: script
    };
  }

  // Tokenization validation
  try {
    const tokenResult = tokenizePhonemes(trimmedInput);
    
    if (!tokenResult.phonemes || tokenResult.phonemes.length === 0) {
      return {
        isValid: false,
        error: 'Unable to tokenize input into valid phonemes',
        errorType: 'TOKENIZATION_ERROR',
        input: trimmedInput,
        script: script
      };
    }

    return {
      isValid: true,
      input: trimmedInput,
      script: script,
      tokenization: tokenResult,
      phonemeCount: tokenResult.phonemes.length
    };

  } catch (error) {
    return {
      isValid: false,
      error: `Tokenization failed: ${error.message}`,
      errorType: 'TOKENIZATION_EXCEPTION',
      input: trimmedInput,
      script: script,
      exception: error
    };
  }
}

/**
 * Validates a phoneme sequence
 * @param {Array<string>} phonemes - Array of phonemes to validate
 * @returns {Object} - Validation result
 */
export function validatePhonemeSequence(phonemes) {
  if (!Array.isArray(phonemes)) {
    return {
      isValid: false,
      error: 'Phonemes must be an array',
      errorType: 'TYPE_ERROR',
      input: phonemes
    };
  }

  if (phonemes.length === 0) {
    return {
      isValid: false,
      error: 'Phoneme array cannot be empty',
      errorType: 'EMPTY_ARRAY',
      input: phonemes
    };
  }

  const invalidPhonemes = [];
  const vowels = [];
  const consonants = [];
  const others = [];

  phonemes.forEach((phoneme, index) => {
    if (typeof phoneme !== 'string') {
      invalidPhonemes.push({ index, phoneme, error: 'Not a string' });
    } else if (phoneme.length === 0) {
      invalidPhonemes.push({ index, phoneme, error: 'Empty phoneme' });
    } else if (isVowel(phoneme)) {
      vowels.push({ index, phoneme });
    } else if (isConsonant(phoneme)) {
      consonants.push({ index, phoneme });
    } else {
      others.push({ index, phoneme });
    }
  });

  return {
    isValid: invalidPhonemes.length === 0,
    phonemes: phonemes,
    analysis: {
      total: phonemes.length,
      vowels: vowels,
      consonants: consonants,
      others: others,
      invalid: invalidPhonemes
    },
    vowelCount: vowels.length,
    consonantCount: consonants.length,
    hasVowels: vowels.length > 0,
    hasConsonants: consonants.length > 0,
    errors: invalidPhonemes.length > 0 ? invalidPhonemes : null
  };
}

/**
 * Validates a single vowel
 * @param {any} vowel - Vowel to validate
 * @returns {Object} - Validation result
 */
export function validateVowel(vowel) {
  if (typeof vowel !== 'string') {
    return {
      isValid: false,
      error: 'Vowel must be a string',
      errorType: 'TYPE_ERROR',
      input: vowel
    };
  }

  if (!vowel.trim()) {
    return {
      isValid: false,
      error: 'Vowel cannot be empty',
      errorType: 'EMPTY_INPUT',
      input: vowel
    };
  }

  const trimmedVowel = vowel.trim();
  
  if (!isVowel(trimmedVowel)) {
    return {
      isValid: false,
      error: `"${trimmedVowel}" is not a valid Sanskrit vowel`,
      errorType: 'INVALID_VOWEL',
      input: trimmedVowel,
      script: detectScript(trimmedVowel)
    };
  }

  return {
    isValid: true,
    vowel: trimmedVowel,
    script: detectScript(trimmedVowel)
  };
}

// ==================== INPUT SANITIZATION ====================

/**
 * Sanitizes input for Sanskrit processing
 * @param {any} input - Input to sanitize
 * @returns {Object} - Sanitization result
 */
export function sanitizeInput(input) {
  // Convert to string if possible
  let sanitized;
  
  if (typeof input === 'string') {
    sanitized = input;
  } else if (typeof input === 'number') {
    sanitized = input.toString();
  } else if (input === null || input === undefined) {
    return {
      success: false,
      error: 'Input is null or undefined',
      original: input,
      sanitized: null
    };
  } else {
    sanitized = String(input);
  }

  // Trim whitespace
  sanitized = sanitized.trim();

  // Remove excessive whitespace
  sanitized = sanitized.replace(/\s+/g, ' ');

  // Normalize Unicode (important for diacritics)
  sanitized = sanitized.normalize('NFC');

  return {
    success: true,
    original: input,
    sanitized: sanitized,
    changes: {
      trimmed: input !== sanitized,
      normalized: true,
      typeConverted: typeof input !== 'string'
    }
  };
}

/**
 * Sanitizes an array of words
 * @param {Array<any>} words - Array of words to sanitize
 * @returns {Object} - Sanitization result
 */
export function sanitizeWordArray(words) {
  if (!Array.isArray(words)) {
    return {
      success: false,
      error: 'Input must be an array',
      original: words,
      sanitized: null
    };
  }

  const sanitized = [];
  const errors = [];
  const changes = [];

  words.forEach((word, index) => {
    const result = sanitizeInput(word);
    
    if (result.success && result.sanitized) {
      sanitized.push(result.sanitized);
      if (result.changes.trimmed || result.changes.typeConverted) {
        changes.push({ index, original: word, sanitized: result.sanitized });
      }
    } else {
      errors.push({ index, word, error: result.error });
    }
  });

  return {
    success: errors.length === 0,
    original: words,
    sanitized: sanitized,
    errors: errors.length > 0 ? errors : null,
    changes: changes.length > 0 ? changes : null,
    stats: {
      originalCount: words.length,
      sanitizedCount: sanitized.length,
      errorCount: errors.length
    }
  };
}

// ==================== ERROR HANDLING ====================

/**
 * Creates a standardized error object
 * @param {string} type - Error type
 * @param {string} message - Error message
 * @param {any} context - Additional context
 * @returns {Object} - Standardized error
 */
export function createError(type, message, context = {}) {
  return {
    error: true,
    type: type,
    message: message,
    context: context,
    timestamp: new Date().toISOString()
  };
}

/**
 * Wraps a function with error handling
 * @param {Function} fn - Function to wrap
 * @param {string} operation - Operation name for error context
 * @returns {Function} - Wrapped function
 */
export function withErrorHandling(fn, operation) {
  return function(...args) {
    try {
      const result = fn.apply(this, args);
      
      // Handle async functions
      if (result && typeof result.then === 'function') {
        return result.catch(error => 
          createError('ASYNC_ERROR', `Error in ${operation}: ${error.message}`, {
            operation,
            args,
            originalError: error
          })
        );
      }
      
      return result;
    } catch (error) {
      return createError('SYNC_ERROR', `Error in ${operation}: ${error.message}`, {
        operation,
        args,
        originalError: error
      });
    }
  };
}

/**
 * Validates multiple inputs with detailed reporting
 * @param {Array<any>} inputs - Inputs to validate
 * @param {Function} validator - Validation function
 * @returns {Object} - Validation results
 */
export function validateMultiple(inputs, validator) {
  if (!Array.isArray(inputs)) {
    return createError('INVALID_INPUT', 'Inputs must be an array', { inputs });
  }

  if (typeof validator !== 'function') {
    return createError('INVALID_VALIDATOR', 'Validator must be a function', { validator });
  }

  const results = [];
  const errors = [];
  const valid = [];

  inputs.forEach((input, index) => {
    try {
      const result = validator(input);
      results.push({ index, input, result });
      
      if (result && result.isValid) {
        valid.push({ index, input, result });
      } else {
        errors.push({ index, input, result });
      }
    } catch (error) {
      const errorResult = createError('VALIDATION_ERROR', error.message, { input, index });
      results.push({ index, input, result: errorResult });
      errors.push({ index, input, result: errorResult });
    }
  });

  return {
    success: errors.length === 0,
    total: inputs.length,
    validCount: valid.length,
    errorCount: errors.length,
    results: results,
    valid: valid,
    errors: errors.length > 0 ? errors : null
  };
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Checks if a value is empty or null-like
 * @param {any} value - Value to check
 * @returns {boolean} - True if empty
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Safe getter for nested object properties
 * @param {Object} obj - Object to access
 * @param {string} path - Dot-separated path
 * @param {any} defaultValue - Default value if not found
 * @returns {any} - Value or default
 */
export function safeGet(obj, path, defaultValue = null) {
  if (!obj || typeof obj !== 'object') return defaultValue;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current === null || current === undefined || !(key in current)) {
      return defaultValue;
    }
    current = current[key];
  }
  
  return current;
}
