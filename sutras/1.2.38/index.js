// 1.2.38 देवब्रह्मणोरनुदात्तः
// Lexical override inside Subrahmaṇyā: deva/brāhmaṇa become anudātta.
import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

export function sutra1238(text, context = {}, options = {}) {
  if (typeof text !== 'string') throw new TypeError('sutra1238: text must be string');
  const script = detectScript(text);
  // Ensure domain flag present
  const result = aggregateProsodyOptions(text, { ...context, subrahmanya: true, _sutra: '1.2.38' }, options);
  return { sutra: '1.2.38', script, ...result };
}
export default sutra1238;
