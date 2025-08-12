import { sutra_1_2_66 } from './index.js';

describe('Sutra 1.2.66 feminine vrddha retained & treated masculine', () => {
  test('feminine vrddha retained over yuvan counterpart', () => {
    const r = sutra_1_2_66([
      { surface:'Devadattā', base:'devadatta', category:'yuvan', gender:'f' },
      { surface:'Devadattā', base:'devadatta', category:'vrddha', gender:'f' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.retainedIndices.length).toBe(1);
    expect(r.genderOverride).toBe('masculine');
  });
  test('no application without yuvan', () => {
    const r = sutra_1_2_66([{surface:'Devadattā', base:'devadatta', category:'vrddha', gender:'f'}]);
    expect(r.applied).toBe(false);
  });
});
