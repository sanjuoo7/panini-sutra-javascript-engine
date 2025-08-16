import sutra1389 from './index.js';

describe('Sutra 1.3.89 – Exception list blocks Parasmaipada in causatives', () => {
  it('blocks for pā causative', () => {
    const res = sutra1389('pāyayati', { root: 'pā', hasCausative: true });
    expect(res.applies).toBe(true);
    expect(res.blocksParasmaipada).toBe(true);
  });
  it('blocks for वद causative', () => {
    const res = sutra1389('वदायति', { root: 'वद', hasCausative: true });
    expect(res.blocksParasmaipada).toBe(true);
  });
  it('does not apply for other roots', () => {
    const res = sutra1389('bodhayati', { root: 'budh', hasCausative: true });
    expect(res.applies).toBe(false);
  });
  it('does not apply if not causative', () => {
    const res = sutra1389('वदति', { root: 'वद', hasCausative: false });
    expect(res.applies).toBe(false);
  });
});
