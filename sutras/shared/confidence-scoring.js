/**
 * Confidence scoring utilities for Sanskrit grammatical analysis
 * 
 * This module provides mathematical functions for confidence calculation
 * and scoring that can be used across multiple sutras.
 */

/**
 * Calculate confidence using logistic function
 * Maps raw scores to confidence percentages with proper floor/ceiling behavior
 * 
 * @param {number} score - Raw feature score
 * @param {Object} params - Logistic function parameters
 * @returns {number} Confidence between 0 and 1
 */
export function logisticConfidence(score, params = {}) {
  // Default parameters optimized for Sanskrit grammar analysis
  const {
    slope = 6,           // Steepness of transition
    midpoint = 0.65,     // Center point of sigmoid
    floorNonLopa = 0.71, // Minimum confidence for negative cases
    floorLopa = 0.85,    // Minimum confidence for positive cases  
    cap = 0.97,          // Maximum confidence
    mappingMargin = 0.05 // Buffer margin
  } = params;

  // Logistic function: 1 / (1 + e^(-slope * (score - midpoint)))
  const raw = 1 / (1 + Math.exp(-slope * (score - midpoint)));
  
  // Apply floors and ceiling based on score
  if (score >= midpoint) {
    // Positive case: apply lopa floor and cap
    return Math.min(Math.max(raw, floorLopa), cap);
  } else {
    // Negative case: apply non-lopa floor
    return Math.min(Math.max(raw, floorNonLopa), cap);
  }
}

/**
 * Calculate linear confidence score
 * Simple linear mapping for cases where logistic curve isn't needed
 * 
 * @param {number} score - Raw score
 * @param {number} max - Maximum possible score
 * @param {number} min - Minimum confidence
 * @param {number} cap - Maximum confidence
 * @returns {number} Linear confidence between min and cap
 */
export function linearConfidence(score, max = 1.0, min = 0.1, cap = 0.95) {
  const normalized = Math.max(0, Math.min(score / max, 1));
  return min + (normalized * (cap - min));
}

/**
 * Weight-based confidence calculation
 * Calculates confidence based on weighted feature evidence
 * 
 * @param {Object} evidence - Object with boolean feature flags
 * @param {Object} weights - Object with feature weights
 * @param {Object} params - Scoring parameters
 * @returns {Object} Confidence analysis with score and breakdown
 */
export function weightedConfidence(evidence, weights, params = {}) {
  const { threshold = 0.65, logisticParams = {} } = params;
  
  let totalScore = 0;
  let maxPossible = 0;
  const activeFeatures = [];
  
  // Calculate weighted score
  for (const [feature, weight] of Object.entries(weights)) {
    maxPossible += Math.max(0, weight); // Only positive weights count toward max
    
    if (evidence[feature] === true) {
      totalScore += weight;
      activeFeatures.push(feature);
    }
  }
  
  const normalizedScore = maxPossible > 0 ? totalScore / maxPossible : 0;
  const confidence = logisticConfidence(totalScore, logisticParams);
  const eligible = totalScore >= threshold;
  
  return {
    score: totalScore,
    normalizedScore,
    confidence,
    eligible,
    activeFeatures,
    maxPossible,
    threshold
  };
}

/**
 * Bayesian confidence update
 * Updates confidence based on new evidence using Bayesian inference
 * 
 * @param {number} priorConfidence - Prior confidence (0-1)
 * @param {number} evidenceStrength - Strength of new evidence (-1 to 1)
 * @param {number} evidenceReliability - Reliability of evidence source (0-1)
 * @returns {number} Updated confidence
 */
export function bayesianUpdate(priorConfidence, evidenceStrength, evidenceReliability = 1.0) {
  // Convert confidence to odds
  const priorOdds = priorConfidence / (1 - priorConfidence);
  
  // Calculate likelihood ratio based on evidence
  const likelihoodRatio = evidenceStrength > 0 
    ? 1 + (evidenceStrength * evidenceReliability * 9) // Positive evidence
    : 1 / (1 + (Math.abs(evidenceStrength) * evidenceReliability * 9)); // Negative evidence
  
  // Update odds and convert back to confidence
  const posteriorOdds = priorOdds * likelihoodRatio;
  return posteriorOdds / (1 + posteriorOdds);
}

/**
 * Combine multiple confidence scores
 * Uses various methods to aggregate confidence from multiple sources
 * 
 * @param {number[]} confidences - Array of confidence values (0-1)
 * @param {string} method - Combination method: 'average', 'min', 'max', 'product', 'noisy-or'
 * @param {number[]} weights - Optional weights for weighted average
 * @returns {number} Combined confidence
 */
export function combineConfidences(confidences, method = 'average', weights = null) {
  if (!confidences || confidences.length === 0) return 0;
  
  const validConfidences = confidences.filter(c => typeof c === 'number' && c >= 0 && c <= 1);
  if (validConfidences.length === 0) return 0;
  
  switch (method) {
    case 'min':
      return Math.min(...validConfidences);
    
    case 'max':
      return Math.max(...validConfidences);
    
    case 'product':
      return validConfidences.reduce((product, conf) => product * conf, 1);
    
    case 'noisy-or':
      // Probability that at least one source is correct
      const failureProb = validConfidences.reduce((prob, conf) => prob * (1 - conf), 1);
      return 1 - failureProb;
    
    case 'weighted':
      if (weights && weights.length === validConfidences.length) {
        const weightedSum = validConfidences.reduce((sum, conf, i) => sum + (conf * weights[i]), 0);
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        return totalWeight > 0 ? weightedSum / totalWeight : 0;
      }
      // Fall through to average if no valid weights
      
    case 'average':
    default:
      return validConfidences.reduce((sum, conf) => sum + conf, 0) / validConfidences.length;
  }
}
