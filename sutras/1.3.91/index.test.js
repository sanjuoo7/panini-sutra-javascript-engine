import sutra1391 from './index.js';

describe('Sutra 1.3.91 – Optional Parasmaipada for dyut-class with Aorist', () => {
  it('applies optionally for dyut with लुङ्', () => {
    const res = sutra1391('adyutat', { root: 'dyut', lakara: 'luṅ' });
    expect(res.applies).toBe(true);
    expect(res.isOptional).toBe(true);
  });
  it('does not apply for other lakāras', () => {
    const res = sutra1391('adyutat', { root: 'dyut', lakara: 'laṭ' });
    expect(res.applies).toBe(false);
  });
  it('does not apply for other roots', () => {
    const res = sutra1391('akarot', { root: 'kṛ', lakara: 'luṅ' });
    expect(res.applies).toBe(false);
  });
});
