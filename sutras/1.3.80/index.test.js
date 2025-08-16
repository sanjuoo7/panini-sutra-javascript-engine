import sutra1380 from './index.js';

describe('Sutra 1.3.80 अभिप्रत्यतिभ्यः क्षिपः', () => {
  test('abhi + kṣip → Parasmaipada', () => {
    const res = sutra1380('अभिक्षिपति', { root: 'क्षिप्', prefix: 'अभि' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });

  test('prati + kṣip via surface detection → Parasmaipada', () => {
    const res = sutra1380('प्रतिक्षिपति', { root: 'kṣip' });
    expect(res.applies).toBe(true);
  });

  test('missing prefix → no apply', () => {
    const res = sutra1380('क्षिपति', { root: 'kṣip' });
    expect(res.applies).toBe(false);
  });
  test('IAST: prati + kṣip (context) → Parasmaipada', () => {
    const res = sutra1380('pratikṣipati', { root: 'kṣip', prefix: 'prati' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });
  test('guards invalid input', () => {
    const res = sutra1380(undefined, {});
    expect(res.applies).toBe(false);
  });
});
