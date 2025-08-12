// 1.2.37 न सुब्रह्मण्यायां स्वरितस्य तूदात्तः
// Domain rule: In Subrahmaṇyā hymns, no monotone; svarita vowels take udātta.
import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

export function sutra1237(text, context = {}, options = {}) {
  if (typeof text !== 'string') throw new TypeError('sutra1237: text must be string');
  const script = detectScript(text);
  const result = aggregateProsodyOptions(text, { ...context, subrahmanya: true, _sutra: '1.2.37' }, options);
  return { sutra: '1.2.37', script, ...result };
}
export default sutra1237;
