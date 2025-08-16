import { sutra1341 } from './index.js';

describe('Sutra 1.3.41 (veḥ pādaviharaṇe)', () => {
  test('applies for vi + kram in walking sense', () => {
    const res = sutra1341('विक्रमते', { semanticContext: 'walking placing footsteps' });
    expect(res.applies).toBe(true);
  });

  test('does not apply without vi- prefix', () => {
    const res = sutra1341('क्रमते', { semanticContext: 'walking' });
    expect(res.applies).toBe(false);
  });

  test('does not apply for non-walking sense', () => {
    const res = sutra1341('विक्रमते', { semanticContext: 'excel bravery' });
    expect(res.applies).toBe(false);
  });
});
