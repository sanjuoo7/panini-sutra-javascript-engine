import { applySutra1_2_49 } from './index.js';

describe('Sutra 1.2.49', () => {
  test('elides feminine upasarjana with taddhita luk', () => {
    const members = [{ text: 'देवी', role: 'upasarjana', gender: 'feminine', hasFeminineAffix: true }];
    const r = applySutra1_2_49(members, { taddhitaElisionType: 'luk' });
    expect(r.applies).toBe(true);
    expect(members[0].elided).toBe(true);
  });
  test('does not elide without luk context', () => {
    const members = [{ text: 'देवी', role: 'upasarjana', gender: 'feminine', hasFeminineAffix: true }];
    const r = applySutra1_2_49(members, { taddhitaElisionType: 'lopa' });
    expect(r.applies).toBe(false);
  });
  test('ignores non-upasarjana', () => {
    const members = [{ text: 'देवी', role: 'head', gender: 'feminine', hasFeminineAffix: true }];
    const r = applySutra1_2_49(members, { taddhitaElisionType: 'luk' });
    expect(r.applies).toBe(false);
  });
  test('invalid members input', () => {
    const r = applySutra1_2_49(null, { taddhitaElisionType: 'luk' });
    expect(r.applies).toBe(false);
  });
});
