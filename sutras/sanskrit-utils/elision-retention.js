// Utility: elision-retention.js
// Supports Sutras 1.2.51–1.2.52 (lupi yuktavad vyaktivacane & viśeṣaṇānāṃ cājāteḥ)
import { detectScript } from './script-detection.js';

function normalizeFeatures(features = {}) {
  const { gender = null, number = null, person = null } = features;
  return { gender, number, person };
}

/**
 * Analyze retention of morphological features when a taddhita affix has been elided by lUP (or luk as upstream generalization).
 * @param {string} baseForm - The surface form after elision.
 * @param {Object} original - Original feature source { gender, number, person }.
 * @param {Object} context - { elisionType, script }
 * @returns {Object}
 */
export function analyzeLupRetention(baseForm, original = {}, context = {}) {
  const res = {
    sutra: '1.2.51',
    applied: false,
    script: null,
    retainedFeatures: null,
    explanation: ''
  };
  if (typeof baseForm !== 'string' || !baseForm) {
    res.explanation = 'Invalid baseForm';
    return res;
  }
  const elision = (context.elisionType || '').toLowerCase();
  if (!['lup', 'luk'].includes(elision)) {
    res.explanation = 'No lup/luk elision context';
    return res;
  }
  res.script = context.script || detectScript(baseForm);
  const feats = normalizeFeatures(original);
  res.retainedFeatures = feats;
  res.applied = true;
  res.explanation = 'Retained gender/number/person as if affix present (yuktavad)';
  return res;
}

/**
 * Propagate retained features to an adjective/qualifier per 1.2.52 when unspecified.
 * @param {string} qualifier - adjective form
 * @param {Object} retentionResult - output of analyzeLupRetention
 * @param {Object} context - { pos, semanticCategory, features }
 * @returns {Object}
 */
export function propagateRetentionToQualifier(qualifier, retentionResult, context = {}) {
  const res = {
    sutra: '1.2.52',
    applied: false,
    qualifierAgreement: null,
    explanation: ''
  };
  if (!retentionResult || !retentionResult.applied) {
    res.explanation = 'No prior retention data';
    return res;
  }
  if (typeof qualifier !== 'string' || !qualifier) {
    res.explanation = 'Invalid qualifier';
    return res;
  }
  const isAdj = context.pos === 'adj' || context.isAdjective === true;
  if (!isAdj) {
    res.explanation = 'Not an adjective';
    return res;
  }
  const qFeats = { ...normalizeFeatures(context.features) };
  const baseFeats = retentionResult.retainedFeatures || {};
  const final = { ...qFeats };
  ['gender', 'number', 'person'].forEach(f => {
    if (final[f] == null && baseFeats[f] != null) final[f] = baseFeats[f];
  });
  res.qualifierAgreement = final;
  res.applied = true;
  res.explanation = 'Adjective inherits retained features (ajāti extension)';
  return res;
}

export default {
  analyzeLupRetention,
  propagateRetentionToQualifier
};
