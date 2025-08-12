import { sutra_1_2_65 } from './index.js';

describe('Sutra 1.2.65 vrddha retained over yuvan', () => {
  test('vrddha retained, yuvan dropped same base', () => {
    const r = sutra_1_2_65([
      { surface:'Devadattaḥ', base:'devadatta', category:'yuvan' },
      { surface:'Devadattaḥ', base:'devadatta', category:'vrddha' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.retainedIndices.length).toBe(1);
    expect(r.droppedIndices.length).toBe(1);
  });
  test('no apply when only one category present', () => {
    const r = sutra_1_2_65([{surface:'Devadattaḥ', base:'devadatta', category:'vrddha'}]);
    expect(r.applied).toBe(false);
  });
});
