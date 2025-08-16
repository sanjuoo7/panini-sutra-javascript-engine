import { sutra1350 } from './index.js';

describe('Sutra 1.3.50 (vibhāṣā vipralāpe)', () => {
  test('applies optionally for contradiction sense', () => {
    const res = sutra1350('वदते', { root: 'वद्', meaning: 'they argue against each other' });
    expect(res.applies).toBe(true);
    expect(res.optional).toBe(true);
  });

  test('does not apply for plain speaking', () => {
    const res = sutra1350('vadati', { root: 'vad', meaning: 'to speak plainly' });
    expect(res.applies).toBe(false);
  });
});
