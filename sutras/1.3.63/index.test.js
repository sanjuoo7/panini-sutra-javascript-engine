import { sutra1363 } from './index.js';

describe('Sutra 1.3.63 (āmpratyayavat kṛño’nuprayogasya)', () => {
  test('applies for aux kṛ with main having ām and Ātmanepada, fruit not to agent', () => {
    const res = sutra1363('करोते', { auxiliaryRoot: 'कृ', mainHasAm: true, mainAtmanepada: true, fruitToAgent: false });
    expect(res.applies).toBe(true);
    expect(res.isAtmanepada).toBe(true);
  });
  test('does not apply when auxiliary is not kṛ', () => {
    const res = sutra1363('गच्छति', { auxiliaryRoot: 'gam', mainHasAm: true, mainAtmanepada: true });
    expect(res.applies).toBe(false);
  });
});
