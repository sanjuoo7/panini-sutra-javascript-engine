import { sutra1361 } from './index.js';

describe('Sutra 1.3.61 (mriyater luṅ liṅoś ca)', () => {
  test('applies for mṛ with śit', () => {
    const res = sutra1361('म्रियते', { root: 'मृ', isShitAffix: true });
    expect(res.applies).toBe(true);
  });
  test('applies for mṛ with luṅ', () => {
    const res = sutra1361('amriyata', { root: 'mr̥', tenseMood: 'luṅ' });
    expect(res.applies).toBe(true);
  });
  test('applies for mṛ with liṅ', () => {
    const res = sutra1361('mriyatām', { root: 'mṛ', tenseMood: 'liṅ' });
    expect(res.applies).toBe(true);
  });
  test('does not apply for other roots without śit/luṅ/liṅ', () => {
    const res = sutra1361('gacchati', { root: 'gam' });
    expect(res.applies).toBe(false);
  });
});
