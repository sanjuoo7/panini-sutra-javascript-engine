import { applySutra1_2_51 } from './index.js';

describe('Sutra 1.2.51', () => {
  test('retains features under lup', () => {
    const r = applySutra1_2_51('base', { gender:'feminine', number:'singular', person:3 }, { taddhitaElisionType:'lup' });
    expect(r.applied).toBe(true);
    expect(r.retainedFeatures.gender).toBe('feminine');
  });
  test('no retention without elision', () => {
    const r = applySutra1_2_51('base', { gender:'feminine' }, {});
    expect(r.applied).toBe(false);
  });
});
