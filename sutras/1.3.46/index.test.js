import { sutra1346 } from './index.js';

describe('Sutra 1.3.46 (sampratibhyām anādhyāne)', () => {
  test('applies when sam- and prati- present and not regret sense', () => {
    const res = sutra1346('प्रजानाते', { prefixes: ['सम्','प्रति'], meaning: 'to recall' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('blocked when regret sense present', () => {
    const res = sutra1346('प्रजानाते', { prefixes: ['sam','prati'], meaning: 'remember with regret' });
    expect(res.applies).toBe(false);
  });
});
