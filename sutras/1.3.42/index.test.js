import { sutra1342 } from './index.js';

describe('Sutra 1.3.42 (propābhyām samarthābhyām)', () => {
  test('applies for vi- + kram with pra sense in beginning meaning', () => {
    const res = sutra1342('विक्रमते', { prefixes: ['वि','प्र'], meaning: 'begin the action' });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });

  test('applies for vi- + kram with upa sense in beginning meaning', () => {
    const res = sutra1342('vikramate', { prefixes: ['vi','upa'], meaning: 'commencement of movement' });
    expect(res.applies).toBe(true);
  });

  test('requires vi prefix', () => {
    const res = sutra1342('प्रक्रमते', { prefixes: ['प्र'], meaning: 'begin' });
    expect(res.applies).toBe(false);
  });

  test('requires beginning semantic sense', () => {
    const res = sutra1342('vikramate', { prefixes: ['vi','pra'], meaning: 'walking leisurely' });
    expect(res.applies).toBe(false);
  });
});
