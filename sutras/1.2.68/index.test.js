import { sutra_1_2_68 } from './index.js';

describe('Sutra 1.2.68 kinship retention', () => {
  test('bhrātṛ retained over svasṛ', () => {
    const r = sutra_1_2_68([
      { lemma:'भ्रातृ' },
      { lemma:'स्वसृ' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.retainedIndices.length).toBe(1);
  });
  test('putra retained over duhitṛ', () => {
    const r = sutra_1_2_68([
      { lemma:'दुहितृ' },
      { lemma:'पुत्र' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.retainedIndices.length).toBe(1);
  });
  test('no apply if only one kinship term', () => {
    const r = sutra_1_2_68([{ lemma:'पुत्र' }]);
    expect(r.applied).toBe(false);
  });
});
