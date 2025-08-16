import { sutra1379 } from './index.js';

describe('Sutra 1.3.79: अनुपराभ्यां कृञः (anuparābhyāṁ kṛñaḥ)', () => {
  test('applies Parasmaipada when kṛ has both अनु and पर upasargas, active voice', () => {
    const res = sutra1379('अनुपरकरोति', {
      root: 'कृ',
      upasarga: ['अनु', 'पर'],
      isActiveVoice: true,
      benefitsAgent: true, // even if true, rule forces Parasmaipada
      meaning: 'प्रकट करॆति' // revealing
    });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
    expect(res.blocksAtmanepada).toBe(true);
    expect(res.sutra).toBe('1.3.79');
  });

  test('IAST: applies with anu + para for kṛ', () => {
    const res = sutra1379('anuparakaroti', {
      root: 'kṛ',
      upasarga: ['anu', 'para'],
      isActiveVoice: true,
      meaning: 'to divulge'
    });
    expect(res.applies).toBe(true);
    expect(res.isParasmaipada).toBe(true);
  });

  test('does not apply if only one of the upasargas present', () => {
    const res1 = sutra1379('anukaroti', { root: 'कृ', upasarga: ['अनु'], isActiveVoice: true });
    const res2 = sutra1379('parakaroti', { root: 'कृ', upasarga: ['पर'], isActiveVoice: true });
    expect(res1.applies).toBe(false);
    expect(res2.applies).toBe(false);
    expect(res1.isParasmaipada).toBe(false);
    expect(res2.isParasmaipada).toBe(false);
  });

  test('does not apply in passive voice', () => {
    const res = sutra1379('अनुपरकृत्यते', { root: 'कृ', upasarga: ['अनु', 'पर'], isActiveVoice: false });
    expect(res.applies).toBe(false);
    expect(res.isParasmaipada).toBe(false);
  });

  test('invalid input handling', () => {
    const res = sutra1379(123, {});
    expect(res.applies).toBe(false);
    expect(res.confidence).toBe(0);
  });
});
