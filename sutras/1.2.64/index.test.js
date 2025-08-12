import { sutra_1_2_64 } from './index.js';

describe('Sutra 1.2.64 ekaśeṣa base identical-form retention', () => {
  test('two identical string forms retains only last', () => {
    const r = sutra_1_2_64('गजः गजः');
    expect(r.applied).toBe(true);
    expect(r.retainedIndex).toBe(1);
    expect(r.droppedIndices).toEqual([0]);
  });

  test('array of identical forms', () => {
    const r = sutra_1_2_64(['gajaḥ','gajaḥ','gajaḥ']);
    expect(r.applied).toBe(true);
    expect(r.retainedIndex).toBe(2);
    expect(r.droppedIndices).toEqual([0,1]);
  });

  test('word objects with same case', () => {
    const r = sutra_1_2_64([
      {surface:'गजः', case:'nom'},
      {surface:'गजः', case:'nom'}
    ], { forceCaseCheck:true });
    expect(r.applied).toBe(true);
    expect(r.droppedIndices).toEqual([0]);
  });

  test('fails when not identical', () => {
    const r = sutra_1_2_64(['gajaḥ','gajau']);
    expect(r.applied).toBe(false);
    expect(r.reason).toBe('form-mismatch');
  });

  test('fails when case mismatch under forceCaseCheck', () => {
    const r = sutra_1_2_64([
      {surface:'गजः', case:'nom'},
      {surface:'गजम्', case:'acc'}
    ], { forceCaseCheck:true });
    expect(r.applied).toBe(false);
    expect(r.reason).toBe('case-mismatch');
  });

  test('needs at least two forms', () => {
    const r = sutra_1_2_64(['gajaḥ']);
    expect(r.applied).toBe(false);
  });
});
