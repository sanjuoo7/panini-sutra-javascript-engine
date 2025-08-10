/**
 * Configuration management utilities for Sanskrit grammar analysis
 * 
 * This module provides utilities for managing configuration, diagnostics,
 * and metrics that can be used across multiple sutras.
 */

/**
 * Default configuration template that can be extended by specific sutras
 */
export const DEFAULT_CONFIG_TEMPLATE = {
  mode: 'hybrid', // 'legacy' | 'rules' | 'hybrid'
  diagnosticsEnabled: false,
  
  // Logistic function parameters
  logistic: {
    slope: 6,
    midpoint: 0.65,
    floorNonLopa: 0.71,
    floorLopa: 0.85,
    cap: 0.97,
    mappingMargin: 0.05
  },
  
  // Confidence calibration framework
  confidenceCalibration: {
    affixClassification: {
      explicit: 0.9,
      highPattern: 0.85,
      mediumPattern: 0.75,
      lowPattern: 0.6,
      unknown: 0.2
    },
    morphologicalFunction: {
      verbal: 0.95,
      participial: 0.9,
      derivative: 0.85,
      qualitative: 0.8,
      unknown: 0.5
    },
    penaltyRules: {
      strongBlock: -0.95,
      mediumBlock: -0.9,
      weakBlock: -0.85,
      mildBlock: -0.2,
      veryWeakBlock: -0.1
    }
  }
};

/**
 * Create a configuration setter function for a specific sutra
 * @param {Object} config - Configuration object to modify
 * @param {Object} defaultValues - Default configuration values
 * @returns {Function} Configuration setter function
 */
export function createConfigSetter(config, defaultValues) {
  return function setConfig(partial) {
    if (!partial || typeof partial !== 'object') return;
    
    // Handle nested updates
    const { logistic, confidenceCalibration, ...rest } = partial;
    
    // Update top-level properties
    Object.assign(config, rest);
    
    // Handle nested logistic parameters
    if (logistic) {
      config.logistic = { ...config.logistic, ...logistic };
    }
    
    // Handle nested confidence calibration
    if (confidenceCalibration) {
      for (const [category, values] of Object.entries(confidenceCalibration)) {
        if (config.confidenceCalibration[category]) {
          config.confidenceCalibration[category] = { 
            ...config.confidenceCalibration[category], 
            ...values 
          };
        } else {
          config.confidenceCalibration[category] = values;
        }
      }
    }
  };
}

/**
 * Create a configuration reset function
 * @param {Object} config - Configuration object to reset
 * @param {Object} defaultValues - Default values to reset to
 * @returns {Function} Reset function
 */
export function createConfigReset(config, defaultValues) {
  return function resetConfig() {
    // Deep copy default values
    Object.keys(config).forEach(key => delete config[key]);
    Object.assign(config, JSON.parse(JSON.stringify(defaultValues)));
  };
}

/**
 * Create a diagnostics function
 * @param {Object} config - Configuration object
 * @param {Object} metrics - Metrics object
 * @returns {Function} Diagnostics function
 */
export function createDiagnostics(config, metrics) {
  return function getDiagnostics(options = {}) {
    const { includeConfig = true, includeMetrics = true } = options;
    
    const diagnostics = {
      timestamp: new Date().toISOString(),
      enabled: config.diagnosticsEnabled
    };
    
    if (includeConfig) {
      diagnostics.config = { ...config };
    }
    
    if (includeMetrics && metrics) {
      diagnostics.metrics = { ...metrics };
    }
    
    return diagnostics;
  };
}

/**
 * Create a metrics function
 * @param {Object} metrics - Metrics object
 * @returns {Function} Metrics function
 */
export function createMetrics(metrics) {
  return function getMetrics(options = {}) {
    const { reset = false } = options;
    
    const currentMetrics = { ...metrics };
    
    if (reset) {
      Object.keys(metrics).forEach(key => {
        if (typeof metrics[key] === 'number') {
          metrics[key] = 0;
        }
      });
    }
    
    return currentMetrics;
  };
}

/**
 * Create a configuration summary function
 * @param {Object} config - Configuration object
 * @param {Object} weights - Evidence weights object
 * @returns {Function} Summary function
 */
export function createConfigSummary(config, weights) {
  return function getConfigSummary() {
    const weightKeys = Object.keys(weights || {});
    const weightTotal = weightKeys.reduce((sum, key) => sum + (weights[key] || 0), 0);
    const theoreticalMax = weightTotal;
    
    return {
      mode: config.mode,
      threshold: config.lopaScoreThreshold || config.threshold || 0.65,
      weights: { ...weights },
      weightTotal,
      theoreticalMax,
      logistic: { ...config.logistic },
      features: {
        diagnostics: config.diagnosticsEnabled,
        advancedSyllables: config.advancedSyllableCounting,
        normalizeSemivowels: config.normalizeSemivowels
      }
    };
  };
}

/**
 * Validate configuration object
 * @param {Object} config - Configuration to validate
 * @param {Object} schema - Validation schema
 * @returns {Object} Validation result with errors
 */
export function validateConfig(config, schema = {}) {
  const errors = [];
  const warnings = [];
  
  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in config)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }
  
  // Check data types
  if (schema.types) {
    for (const [field, expectedType] of Object.entries(schema.types)) {
      if (field in config && typeof config[field] !== expectedType) {
        errors.push(`Field ${field} should be ${expectedType}, got ${typeof config[field]}`);
      }
    }
  }
  
  // Check value ranges
  if (schema.ranges) {
    for (const [field, range] of Object.entries(schema.ranges)) {
      if (field in config && typeof config[field] === 'number') {
        const { min = -Infinity, max = Infinity } = range;
        if (config[field] < min || config[field] > max) {
          warnings.push(`Field ${field} value ${config[field]} outside recommended range [${min}, ${max}]`);
        }
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Merge multiple configuration objects with precedence
 * @param {...Object} configs - Configuration objects (later ones take precedence)
 * @returns {Object} Merged configuration
 */
export function mergeConfigs(...configs) {
  const result = {};
  
  for (const config of configs) {
    if (!config || typeof config !== 'object') continue;
    
    for (const [key, value] of Object.entries(config)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Deep merge for nested objects
        result[key] = mergeConfigs(result[key] || {}, value);
      } else {
        // Direct assignment for primitives and arrays
        result[key] = value;
      }
    }
  }
  
  return result;
}
