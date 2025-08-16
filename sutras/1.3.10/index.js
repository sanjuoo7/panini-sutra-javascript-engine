/**
 * Sutra 1.3.10: यथासंख्यमनुदेशः (yathāsaṅkhyamanudeśaḥ)
 * "Correspondence (rules apply) according to number"
 * 
 * This sutra establishes that when multiple elements are enumerated in rules,
 * they correspond sequentially by position/number. It provides the principle
 * for ordered correspondence in grammatical operations.
 *
 * @fileoverview Implementation of Panini's Sutra 1.3.10 - Sequential correspondence
 */

import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

/**
 * Applies sequential correspondence rule according to Sutra 1.3.10
 * @param {Array} sourceElements - Source elements to map
 * @param {Array} targetElements - Target elements to map to
 * @param {Object} options - Configuration options
 * @returns {Object} Correspondence mapping result
 */
export function applySequentialCorrespondence(sourceElements, targetElements, options = {}) {
  // Input validation
  if (!Array.isArray(sourceElements) || !Array.isArray(targetElements)) {
    return {
      success: false,
      error: 'Invalid input: both source and target must be arrays',
      sourceElements,
      targetElements
    };
  }

  if (sourceElements.length === 0 || targetElements.length === 0) {
    return {
      success: false,
      error: 'Invalid input: arrays must not be empty',
      sourceElements,
      targetElements
    };
  }

  const {
    context = 'general',
    allowPartialMapping = true,
    cyclicMapping = false
  } = options;

  const correspondences = [];
  const unmappedSource = [];
  const unmappedTarget = [];

  // Apply sequential correspondence
  const minLength = Math.min(sourceElements.length, targetElements.length);
  
  for (let i = 0; i < minLength; i++) {
    correspondences.push({
      sourceIndex: i,
      targetIndex: i,
      sourceElement: sourceElements[i],
      targetElement: targetElements[i],
      rule: '1.3.10'
    });
  }

  // Handle remaining elements
  if (sourceElements.length > targetElements.length) {
    for (let i = minLength; i < sourceElements.length; i++) {
      if (cyclicMapping) {
        const targetIndex = i % targetElements.length;
        correspondences.push({
          sourceIndex: i,
          targetIndex: targetIndex,
          sourceElement: sourceElements[i],
          targetElement: targetElements[targetIndex],
          rule: '1.3.10',
          type: 'cyclic'
        });
      } else {
        unmappedSource.push({
          index: i,
          element: sourceElements[i]
        });
      }
    }
  } else if (targetElements.length > sourceElements.length) {
    for (let i = minLength; i < targetElements.length; i++) {
      unmappedTarget.push({
        index: i,
        element: targetElements[i]
      });
    }
  }

  const isComplete = unmappedSource.length === 0 && unmappedTarget.length === 0;

  return {
    success: true,
    correspondences,
    unmappedSource,
    unmappedTarget,
    isComplete,
    mappingType: cyclicMapping ? 'cyclic' : 'sequential',
    context,
    rule: '1.3.10'
  };
}

/**
 * Analyzes correspondence requirements for given elements
 * @param {Array} elements - Elements to analyze for correspondence
 * @param {Object} options - Analysis options
 * @returns {Object} Analysis result
 */
export function analyzeCorrespondence(elements, options = {}) {
  if (!Array.isArray(elements)) {
    return {
      success: false,
      error: 'Invalid input: elements must be an array'
    };
  }

  const { context = 'general' } = options;

  // Detect if elements contain Sanskrit terms
  const sanskritElements = [];
  const otherElements = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (typeof element === 'string') {
      const script = detectScript(element);
      let isValidSanskrit = false;
      
      if (script === 'Devanagari') {
        isValidSanskrit = true;
      } else if (script === 'IAST') {
        const validation = validateSanskritWord(element);
        isValidSanskrit = validation.isValid;
      }
      
      if (isValidSanskrit) {
        sanskritElements.push({
          index: i,
          element,
          script
        });
      } else {
        otherElements.push({
          index: i,
          element,
          type: 'other'
        });
      }
    } else {
      otherElements.push({
        index: i,
        element,
        type: typeof element
      });
    }
  }

  // Analyze structure for correspondence patterns
  const hasSequentialStructure = elements.length > 1;
  const requiresCorrespondence = hasSequentialStructure && 
    (sanskritElements.length > 0 || context !== 'general');

  return {
    success: true,
    elements,
    elementCount: elements.length,
    sanskritElements,
    otherElements,
    hasSequentialStructure,
    requiresCorrespondence,
    context,
    rule: '1.3.10'
  };
}

/**
 * Creates correspondence mapping between Sanskrit elements
 * @param {Array} sourceList - Source elements (e.g., roots, stems)
 * @param {Array} targetList - Target elements (e.g., affixes, endings)
 * @param {Object} context - Grammatical context
 * @returns {Object} Mapping result with correspondence details
 */
export function createCorrespondenceMapping(sourceList, targetList, context = {}) {
  try {
    // Analyze both lists for correspondence requirements
    const sourceAnalysis = analyzeCorrespondence(sourceList, context);
    const targetAnalysis = analyzeCorrespondence(targetList, context);

    if (!sourceAnalysis.success || !targetAnalysis.success) {
      return {
        success: false,
        error: 'Failed to analyze correspondence requirements',
        sourceAnalysis,
        targetAnalysis
      };
    }

    // Apply sequential correspondence
    const correspondenceResult = applySequentialCorrespondence(
      sourceList, 
      targetList, 
      {
        context: context.type || 'general',
        allowPartialMapping: context.allowPartial !== false,
        cyclicMapping: context.cyclic === true
      }
    );

    if (!correspondenceResult.success) {
      return correspondenceResult;
    }

    // Enhance result with linguistic analysis
    const enhancedCorrespondences = correspondenceResult.correspondences.map(corr => {
      const enhanced = { ...corr };
      
      // Add linguistic properties if dealing with Sanskrit elements
      if (typeof corr.sourceElement === 'string' && typeof corr.targetElement === 'string') {
        const sourceScript = detectScript(corr.sourceElement);
        const targetScript = detectScript(corr.targetElement);
        
        enhanced.sourceScript = sourceScript;
        enhanced.targetScript = targetScript;
        enhanced.scriptMatch = sourceScript === targetScript;
      }

      return enhanced;
    });

    return {
      success: true,
      sourceList,
      targetList,
      correspondences: enhancedCorrespondences,
      unmappedSource: correspondenceResult.unmappedSource,
      unmappedTarget: correspondenceResult.unmappedTarget,
      isComplete: correspondenceResult.isComplete,
      mappingType: correspondenceResult.mappingType,
      sourceAnalysis,
      targetAnalysis,
      context,
      rule: '1.3.10'
    };

  } catch (error) {
    return {
      success: false,
      error: `Correspondence mapping error: ${error.message}`,
      sourceList,
      targetList,
      context
    };
  }
}

export default {
  applySequentialCorrespondence,
  analyzeCorrespondence,
  createCorrespondenceMapping
};
