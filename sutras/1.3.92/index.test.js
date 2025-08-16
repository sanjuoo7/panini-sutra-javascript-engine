import sutra1392 from './index.js';

describe('Sutra 1.3.92 – Optional Parasmaipada for vṛt-class with स्य/सन्', () => {
  it('applies optionally for vṛt + स्य', () => {
    const res = sutra1392('vartsyati', { root: 'vṛt', affix: 'sy' });
    expect(res.applies).toBe(true);
    expect(res.isOptional).toBe(true);
  });
  it('applies optionally for vṛt + सन्', () => {
    const res = sutra1392('vivartisati?', { root: 'वृत', affix: 'सन्' });
    expect(res.applies).toBe(true);
  });
  it('does not apply for other roots', () => {
    const res = sutra1392('bhaviṣyati', { root: 'bhū', affix: 'sy' });
    expect(res.applies).toBe(false);
  });
});
