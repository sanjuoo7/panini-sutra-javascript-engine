import { sutra_1_2_70 } from './index.js';

describe('Sutra 1.2.70 father optionally retained over mother', () => {
  test('pitṛ retained over mātṛ', () => {
    const r = sutra_1_2_70([
      { lemma:'पितृ' },
      { lemma:'मातृ' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.optional).toBe(true);
  });
  test('no apply missing mother', () => {
    const r = sutra_1_2_70([{ lemma:'पितृ' }]);
    expect(r.applied).toBe(false);
  });
});
