import { sutra1349 } from './index.js';

describe('Sutra 1.3.49 (anor akarmakāt)', () => {
  test('applies for anu + vad, intransitive, articulate sense', () => {
    const res = sutra1349('अनुवदते', { root: 'वद्', prefixes: ['अनु'], transitivity: 'intransitive', meaning: 'to articulate together' });
    expect(res.applies).toBe(true);
  });

  test('does not apply without anu prefix', () => {
    const res = sutra1349('वदते', { root: 'वद्', transitivity: 'intransitive', meaning: 'to articulate together' });
    expect(res.applies).toBe(false);
  });

  test('does not apply if transitive', () => {
    const res = sutra1349('अनुवदति', { root: 'vad', prefixes: ['anu'], isTransitive: true, meaning: 'to pronounce clearly' });
    expect(res.applies).toBe(false);
  });
});
