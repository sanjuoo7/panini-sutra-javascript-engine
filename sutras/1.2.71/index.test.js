import { sutra_1_2_71 } from './index.js';

describe('Sutra 1.2.71 father-in-law optionally retained', () => {
  test('śvaśura retained over śvaśrū', () => {
    const r = sutra_1_2_71([
      { lemma:'श्वश्र्वा' },
      { lemma:'श्वशुरः' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.optional).toBe(true);
  });
  test('no apply missing pair', () => {
    const r = sutra_1_2_71([{ lemma:'श्वशुरः' }]);
    expect(r.applied).toBe(false);
  });
});
