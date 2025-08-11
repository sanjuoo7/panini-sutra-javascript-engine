// 1.2.36 छन्दसि वा एकश्रुतिः (optional monotone in metrical recitation)
// Provides optional ekashruti in chandas contexts.

import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

export function sutra1236(text, context = {}, options = {}) {
  if (typeof text !== 'string') throw new TypeError('sutra1236: text must be string');
  const script = detectScript(text);
  const result = aggregateProsodyOptions(text, { ...context, chandas: true, _sutra: '1.2.36' }, options);
  return {
    sutra: '1.2.36',
    script,
    ...result
  };
}

export default sutra1236;
