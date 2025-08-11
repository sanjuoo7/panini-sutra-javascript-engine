// 1.2.35 वषट्कारे उदात्तः (optional raised accent for vaṣaṭ exclamation)
// Adds raised voice option for vaṣaṭ forms.

import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

export function sutra1235(text, context = {}, options = {}) {
  if (typeof text !== 'string') throw new TypeError('sutra1235: text must be string');
  const script = detectScript(text);
  const result = aggregateProsodyOptions(text, { ...context, _sutra: '1.2.35' }, options);
  return {
    sutra: '1.2.35',
    script,
    ...result
  };
}

export default sutra1235;
