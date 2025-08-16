import sutra1382 from './index.js';

describe('Sutra 1.3.82 परेर्मृषः', () => {
  test('pari + mṛṣ with agent benefit → Parasmaipada (Devanagari)', () => {
    const res = sutra1382('परिमृषति', { root: 'मृष्', benefitsAgent: true });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  test('pari + mṛṣ with agent benefit → Parasmaipada (IAST)', () => {
    const res = sutra1382('parimṛṣati', { root: 'mṛṣ', benefitsAgent: true, prefix: 'pari' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  test('pari + mṛṣ with benefitsAgent false → does not apply', () => {
    const res = sutra1382('परिमृषति', { root: 'मृष्', benefitsAgent: false });
    expect(res.applies).toBe(false);
  });
  test('no pari prefix → no apply', () => {
    const res = sutra1382('मृषति', { root: 'mṛṣ' });
    expect(res.applies).toBe(false);
  });
  test('invalid input is guarded', () => {
    const res = sutra1382(null, {});
    expect(res.applies).toBe(false);
  });
});
