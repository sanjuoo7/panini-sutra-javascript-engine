/**
 * Affix Shape Analysis Utilities (Supports Sutra 1.2.41 - अपृक्त single-letter affix)
 */
import { detectScript } from './index.js';

// Simplified IT markers (exclude 'm' to avoid misclassifying genuine single-letter affix)
const IT_MARKERS = new Set(['ङ','ञ','ṇ','म्','य','व','ṅ','ñ','y','v']);

function graphemes(str){ return Array.from(str || ''); }

function stripItChars(chars){ return chars.filter(c => !IT_MARKERS.has(c)); }

export function classifyAffixShape(affix, options = {}) {
  const result = { affix, isValid: false, lengthGraphemes: 0, strippedLength: 0, isSingle: false, isAprkta: false, script: null };
  if (!affix || typeof affix !== 'string') return result;
  const script = options.script || detectScript(affix);
  const chars = graphemes(affix);
  const stripped = options.stripItMarkers === false ? chars : stripItChars(chars);
  result.isValid = true;
  result.script = script;
  result.lengthGraphemes = chars.length;
  result.strippedLength = stripped.length;
  result.isSingle = stripped.length === 1;
  result.isAprkta = result.isSingle; // definition per 1.2.41
  return result;
}

export function isAprktaAffix(affix, options = {}) {
  return classifyAffixShape(affix, options).isAprkta;
}

export default { classifyAffixShape, isAprktaAffix };
