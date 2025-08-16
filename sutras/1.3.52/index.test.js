import { sutra1352 } from './index.js';

describe('Sutra 1.3.52 (samah pratijñāne)', () => {
  test('applies for sam + gṝ with promising sense', () => {
    const res = sutra1352('समगृते', { root: 'गॄ', prefixes: ['सम्'], meaning: 'to promise solemnly' });
    expect(res.applies).toBe(true);
  });

  test('does not apply without sam prefix', () => {
    const res = sutra1352('गृते', { root: 'gṛ', meaning: 'to promise' });
    expect(res.applies).toBe(false);
  });
});
