// 1.2.34 ओदात्त- एकश्रुति- इति सूत्रम् (ritual monotony with exceptions)
// Implements: ritual recitation defaults to monotone (ekashruti) except japa, Om variants, and sāma contexts.

import { aggregateProsodyOptions } from '../sanskrit-utils/accent-prosody-analysis.js';
import { detectScript } from '../sanskrit-utils/script-detection.js';

export function sutra1234(text, context = {}, options = {}) {
  if (typeof text !== 'string') throw new TypeError('sutra1234: text must be string');
  const script = detectScript(text);
  const result = aggregateProsodyOptions(text, { ...context, _sutra: '1.2.34' }, options);
  return {
    sutra: '1.2.34',
    script,
    ...result
  };
}

export default sutra1234;
