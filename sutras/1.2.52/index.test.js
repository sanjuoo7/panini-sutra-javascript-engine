import { applySutra1_2_52 } from './index.js';
import { applySutra1_2_51 } from '../1.2.51/index.js';

describe('Sutra 1.2.52', () => {
  test('inherits features for adjective', () => {
    const base = applySutra1_2_51('base', { gender:'feminine', number:'singular' }, { taddhitaElisionType:'lup' });
    const r = applySutra1_2_52('सुन्दर', base, { pos:'adj', features:{} });
    expect(r.applied).toBe(true);
    expect(r.qualifierAgreement.gender).toBe('feminine');
  });
  test('non adjective no apply', () => {
    const base = applySutra1_2_51('base', { gender:'feminine' }, { taddhitaElisionType:'lup' });
    const r = applySutra1_2_52('सुन्दर', base, { pos:'noun' });
    expect(r.applied).toBe(false);
  });
});
