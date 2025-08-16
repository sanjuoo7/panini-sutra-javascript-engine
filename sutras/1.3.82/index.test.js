import sutra1382 from './index.js';

describe('Sutra 1.3.82 परेर्मृषः', () => {
  test('pari + mṛṣ with agent benefit → Parasmaipada', () => {
    const res = sutra1382('परिमृषति', { root: 'मृष्', benefitsAgent: true });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  test('no pari prefix → no apply', () => {
    const res = sutra1382('मृषति', { root: 'mṛṣ' });
    expect(res.applies).toBe(false);
  });
});
