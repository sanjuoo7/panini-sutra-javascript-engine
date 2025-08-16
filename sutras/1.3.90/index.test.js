import sutra1390 from './index.js';

describe('Sutra 1.3.90 – Optional Parasmaipada for kyaṣ denominatives', () => {
  it('applies optionally for kyaṣ denominative', () => {
    const res = sutra1390('śaṅkayate', { isDenominative: true, affix: 'kyaṣ' });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
    expect(res.isOptional).toBe(true);
  });
  it('does not apply if not kyaṣ denominative', () => {
    const res = sutra1390('śaṅkate', { isDenominative: true, affix: 'ṇic' });
    expect(res.applies).toBe(false);
  });
});
