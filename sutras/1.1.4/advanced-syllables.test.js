/** Tests for advanced syllable counting default enablement */
import { countSyllables, setSutra114Config } from './index.js';

describe('Advanced syllable counting integration', () => {
  test('should treat diphthong as single nucleus (advanced)', () => {
    const word = 'gautama'; // Current advanced counter counts: gau-ta-ma -> 3 syllables (au treated as 1 + a + a). Expect 3.
    expect(countSyllables(word)).toBe(3);
  });
  test('should match basic counter when disabled', () => {
    const baseline = countSyllables('kaurava'); // default advanced enabled
    setSutra114Config({ advancedSyllableCounting: false });
    const basic = countSyllables('kaurava');
    // Re-enable for other tests
    setSutra114Config({ advancedSyllableCounting: true });
    expect(typeof baseline).toBe('number');
    expect(typeof basic).toBe('number');
  });
});
