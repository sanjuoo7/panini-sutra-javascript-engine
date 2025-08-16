import { sutra1355 } from './index.js';

describe('Sutra 1.3.55 (dāṇaś ca sā cec chaturthyarthe)', () => {
  test('applies for sam + dā with instrumental having dative sense', () => {
    const res = sutra1355('समदाते', { root: 'दा', prefixes: ['सम्'], cases: [{ case: 'instrumental' }], caseRoles: [{ role: 'recipient' }] });
    expect(res.applies).toBe(true);
  });

  test('does not apply without instrumental', () => {
    const res = sutra1355('sam dāte', { root: 'dā', prefixes: ['sam'] });
    expect(res.applies).toBe(false);
  });

  test('does not apply without dative sense', () => {
    const res = sutra1355('sam dāte', { root: 'dā', prefixes: ['sam'], cases: [{ case: 'instrumental' }], semanticRole: 'instrument' });
    expect(res.applies).toBe(false);
  });
});
