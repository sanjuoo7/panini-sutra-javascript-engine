import { sutra_1_2_67 } from './index.js';

describe('Sutra 1.2.67 masculine retained over feminine', () => {
  test('masculine retained', () => {
    const r = sutra_1_2_67([
      { surface:'guruḥ', base:'guru', gender:'m' },
      { surface:'gurūḥ', base:'guru', gender:'f' }
    ]);
    expect(r.applied).toBe(true);
    expect(r.retainedIndices.length).toBe(1);
    expect(r.droppedIndices.length).toBe(1);
  });
  test('no apply without feminine', () => {
    const r = sutra_1_2_67([{surface:'guruḥ', base:'guru', gender:'m'}]);
    expect(r.applied).toBe(false);
  });
});
