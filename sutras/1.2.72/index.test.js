import { sutra_1_2_72 } from './index.js';

describe('Sutra 1.2.72 tyad-series mandatory retention', () => {
  test('tyad retained dropping others', () => {
    const r = sutra_1_2_72([
      { surface:'तद्', lemma:'तद्' },
      { surface:'गजः', lemma:'गज' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.mandatory).toBe(true);
    expect(r.droppedIndices.length).toBe(1);
  });
  test('no apply without tyad pronoun', () => {
    const r = sutra_1_2_72([{ lemma:'गज' }]);
    expect(r.applied).toBe(false);
  });
});
