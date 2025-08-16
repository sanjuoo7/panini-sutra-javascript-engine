import sutra1379 from './index.js';

describe('Sutra 1.3.79 अनुपराभ्यां कृञः', () => {
  test('anu + kṛ in divulging sense → Parasmaipada', () => {
    const res = sutra1379('अनुकरोति', { root: 'कृ', prefix: 'अनु', meaning: 'to reveal or publish' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });

  test('para + kṛ with explicit upasarga → Parasmaipada', () => {
    const res = sutra1379('परकरोति', { root: 'kṛ', upasarga: 'para', benefitsAgent: true });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });

  test('no prefix → rule does not apply', () => {
    const res = sutra1379('करोति', { root: 'कृ' });
    expect(res.applies).toBe(false);
  });

  test('invalid input handled', () => {
    const res = sutra1379(123, {});
    expect(res.applies).toBe(false);
  });
});
