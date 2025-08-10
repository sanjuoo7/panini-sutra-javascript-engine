/**
 * Distributional Analysis Utilities
 * 
 * This module provides distributional and historical analysis functions extracted from
 * Sutra 1.1.4's comprehensive analysis system, making them available
 * for use across all sutras that need distributional analysis.
 * 
 * Created: August 9, 2025
 */

/**
 * Determines the distributional class of an affix
 * @param {string} affix - Affix to classify
 * @returns {Object} - Distributional analysis
 */
export function determineDistributionalClass(affix) {
  if (!affix || typeof affix !== 'string') {
    return {
      isValid: false,
      affix: null,
      class: 'unknown',
      frequency: 'rare',
      confidence: 0
    };
  }

  let distributionalClass = 'unknown';
  let frequency = 'rare';
  let confidence = 0.2;

  // High-frequency verbal endings
  if (/^(ti|ta|tha|tu|te|ante|si|thas|mi|vas|mas)$/.test(affix)) {
    distributionalClass = 'highFrequencyVerbal';
    frequency = 'very_common';
    confidence = 0.95;
  }
  // Participial endings
  else if (/^(ta|na|mana|ana)$/.test(affix)) {
    distributionalClass = 'participial';
    frequency = 'common';
    confidence = 0.85;
  }
  // Derivative suffixes
  else if (/^(ya|tavya|anīya|aka|in|vant|mat)$/.test(affix)) {
    distributionalClass = 'derivative';
    frequency = 'moderate';
    confidence = 0.75;
  }
  // Rare or specialized affixes
  else if (affix.length > 3) {
    distributionalClass = 'specialized';
    frequency = 'rare';
    confidence = 0.5;
  }

  return {
    isValid: true,
    affix: affix,
    class: distributionalClass,
    frequency: frequency,
    confidence: confidence,
    isHighFrequency: frequency === 'very_common' || frequency === 'common',
    isProductive: confidence > 0.7
  };
}

/**
 * Assesses the productivity of an affix
 * @param {string} affix - Affix to assess
 * @returns {Object} - Productivity analysis
 */
export function assessProductivity(affix) {
  if (!affix || typeof affix !== 'string') {
    return {
      isValid: false,
      affix: null,
      productivity: 'unknown',
      score: 0
    };
  }

  let productivity = 'low';
  let score = 0.2;

  // Very productive affixes
  if (/^(ti|ta|ya|ana|aka)$/.test(affix)) {
    productivity = 'very_high';
    score = 0.95;
  }
  // Moderately productive
  else if (/^(tavya|anīya|in|vant|na)$/.test(affix)) {
    productivity = 'high';
    score = 0.8;
  }
  // Low productivity
  else if (/^(tṛ|uka|īya|eya)$/.test(affix)) {
    productivity = 'moderate';
    score = 0.6;
  }
  // Very rare or archaic
  else if (affix.length > 4) {
    productivity = 'low';
    score = 0.3;
  }

  return {
    isValid: true,
    affix: affix,
    productivity: productivity,
    score: score,
    isHighlyProductive: score > 0.8,
    isArchaic: score < 0.4
  };
}

/**
 * Analyzes historical patterns in affix usage
 * @param {string} affix - Affix to analyze
 * @returns {Object} - Historical pattern analysis
 */
export function analyzeHistoricalPattern(affix) {
  if (!affix || typeof affix !== 'string') {
    return {
      isValid: false,
      affix: null,
      era: 'unknown',
      pattern: 'unknown',
      confidence: 0
    };
  }

  let era = 'classical';
  let pattern = 'standard';
  let confidence = 0.7;

  // Vedic patterns
  if (/^(as|is|us|ṛs)$/.test(affix)) {
    era = 'vedic';
    pattern = 'archaic';
    confidence = 0.9;
  }
  // Classical patterns
  else if (/^(ti|ta|ya|ana|aka|tavya)$/.test(affix)) {
    era = 'classical';
    pattern = 'standard';
    confidence = 0.95;
  }
  // Post-classical patterns
  else if (/^(īya|eya|vant|mat)$/.test(affix)) {
    era = 'post_classical';
    pattern = 'innovative';
    confidence = 0.8;
  }
  // Modern/contemporary patterns
  else if (affix.length > 4) {
    era = 'modern';
    pattern = 'novel';
    confidence = 0.6;
  }

  return {
    isValid: true,
    affix: affix,
    era: era,
    pattern: pattern,
    confidence: confidence,
    isArchaic: era === 'vedic' || pattern === 'archaic',
    isInnovative: pattern === 'innovative' || pattern === 'novel'
  };
}

/**
 * Analyzes grammatical context and distribution
 * @param {string} affix - Affix to analyze
 * @returns {Object} - Grammatical context analysis
 */
export function analyzeGrammaticalContext(affix) {
  const contextMapping = {
    // Verbal endings
    'ti': { context: 'present tense 3rd person singular', traditional: 'tiṅ', category: 'verbal', era: 'classical' },
    'mi': { context: 'present tense 1st person singular', traditional: 'tiṅ', category: 'verbal', era: 'classical' },
    'si': { context: 'present tense 2nd person singular', traditional: 'tiṅ', category: 'verbal', era: 'classical' },
    
    // Participial endings
    'ta': { context: 'past participle (kṛdanta)', traditional: 'kta', category: 'participial', era: 'classical' },
    'na': { context: 'past participle alternate', traditional: 'kta', category: 'participial', era: 'classical' },
    'mana': { context: 'present participle middle', traditional: 'śāna', category: 'participial', era: 'classical' },
    
    // Gerundive endings
    'ya': { context: 'gerundive (kṛdanta)', traditional: 'kyap', category: 'gerundive', era: 'classical' },
    'tavya': { context: 'gerundive obligation', traditional: 'tavya', category: 'gerundive', era: 'classical' },
    'anīya': { context: 'gerundive respectful', traditional: 'anīya', category: 'gerundive', era: 'classical' },
    
    // Derivative endings
    'aka': { context: 'agentive derivative', traditional: 'ṇvul', category: 'kṛt', era: 'classical' },
    'tṛ': { context: 'agent noun', traditional: 'tṛc', category: 'kṛt', era: 'classical' },
    'ana': { context: 'action noun', traditional: 'lyuṭ', category: 'kṛt', era: 'classical' }
  };

  const mapping = contextMapping[affix];
  if (mapping) {
    return {
      isValid: true,
      affix: affix,
      context: mapping.context,
      traditional: mapping.traditional,
      category: mapping.category,
      era: mapping.era,
      confidence: 0.9
    };
  }

  return {
    isValid: true,
    affix: affix,
    context: 'unidentified affix',
    traditional: affix,
    category: 'unknown',
    era: 'unknown',
    confidence: 0.2
  };
}

/**
 * Comprehensive distributional analysis combining all factors
 * @param {string} affix - Affix to analyze
 * @returns {Object} - Complete distributional analysis
 */
export function comprehensiveDistributionalAnalysis(affix) {
  const distribution = determineDistributionalClass(affix);
  const productivity = assessProductivity(affix);
  const historical = analyzeHistoricalPattern(affix);
  const grammatical = analyzeGrammaticalContext(affix);

  return {
    isValid: true,
    affix: affix,
    distribution: distribution,
    productivity: productivity,
    historical: historical,
    grammatical: grammatical,
    overallConfidence: (distribution.confidence + productivity.score + 
                       historical.confidence + grammatical.confidence) / 4
  };
}

/**
 * Batch distributional analysis
 * @param {Array<string>} affixes - Affixes to analyze
 * @returns {Array<Object>} - Analysis results
 */
export function batchDistributionalAnalysis(affixes) {
  if (!Array.isArray(affixes)) {
    return [];
  }
  
  return affixes.map(affix => comprehensiveDistributionalAnalysis(affix));
}
