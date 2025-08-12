// 1.2.39 स्वरितात् संहितायामनुदात्तानाम्
// Local assimilation: monotone span over anudātta vowels following a svarita in close sandhi (when domain not blocking).
import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

export function sutra1239(text, context = {}, options = {}) {
  if (typeof text !== 'string') throw new TypeError('sutra1239: text must be string');
  const script = detectScript(text);
  const result = aggregateProsodyOptions(text, { ...context, _sutra: '1.2.39' }, options);
  return { sutra: '1.2.39', script, ...result };
}
export default sutra1239;
