/** Sutra 1.3.1: भूवादयो धातवः */
import { isKnownDhatu, analyzeDhatu } from '../sanskrit-utils/dhatu-classification.js';

export function applySutra1_3_1(form, options = {}) {
  const analysis = analyzeDhatu(form, options);
  return analysis; // includes sutra, isDhatu, root, reason, script, normalized
}

export function isDhatu(form, options = {}) {
  return isKnownDhatu(form, options);
}

export default applySutra1_3_1;
