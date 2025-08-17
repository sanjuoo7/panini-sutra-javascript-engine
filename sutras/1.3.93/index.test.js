import sutra1393 from './index.js';

describe('Sutra 1.3.93 लुटि च कॢपः (luṭi ca kḷpaḥ)', () => {
  describe('लुट् (luṭ - 1st Future) cases', () => {
    it('applies optionally to कॢप् with लुट् (Devanagari)', () => {
      const result = sutra1393('कल्पिता', { lakara: 'luṭ', root: 'कॢप्' });
      expect(result.applies).toBe(true);
      expect(result.isParasmaipada).toBe(true);
      expect(result.isOptional).toBe(true);
      expect(result.sutra).toBe('1.3.93');
    });

    it('applies optionally to kḷp with luṭ (IAST)', () => {
      const result = sutra1393('kalpitā', { lakara: 'luṭ', root: 'kḷp' });
      expect(result.applies).toBe(true);
      expect(result.isParasmaipada).toBe(true);
      expect(result.isOptional).toBe(true);
    });

    it('applies with alternative lakāra spellings', () => {
      const result = sutra1393('kalpitā', { lakāra: 'lṛṭ', root: 'kalp' });
      expect(result.applies).toBe(true);
      expect(result.isOptional).toBe(true);
    });
  });

  describe('स्य (sya - Future/Conditional) cases', () => {
    it('applies optionally to कॢप् with स्य affix', () => {
      const result = sutra1393('कल्प्स्यति', { root: 'कॢप्', affix: 'स्य' });
      expect(result.applies).toBe(true);
      expect(result.isParasmaipada).toBe(true);
      expect(result.isOptional).toBe(true);
    });

    it('applies with sya in affixes array (IAST)', () => {
      const result = sutra1393('kalpsyati', { root: 'kḷp', affixes: ['sya'] });
      expect(result.applies).toBe(true);
      expect(result.isOptional).toBe(true);
    });

    it('applies with future/conditional context', () => {
      const result = sutra1393('kalpsyate', { root: 'kalp', affix: 'future' });
      expect(result.applies).toBe(true);
      expect(result.isOptional).toBe(true);
    });
  });

  describe('सन् (san - Desiderative) cases', () => {
    it('applies optionally to कॢप् with सन् affix', () => {
      const result = sutra1393('चिकल्पिषति', { root: 'कॢप्', affix: 'सन्' });
      expect(result.applies).toBe(true);
      expect(result.isParasmaipada).toBe(true);
      expect(result.isOptional).toBe(true);
    });

    it('applies with san in affixes array (IAST)', () => {
      const result = sutra1393('ciklipsati', { root: 'kḷp', affixes: ['san'] });
      expect(result.applies).toBe(true);
      expect(result.isOptional).toBe(true);
    });

    it('applies with desiderative context', () => {
      const result = sutra1393('ciklipste', { root: 'klp', affix: 'desiderative' });
      expect(result.applies).toBe(true);
      expect(result.isOptional).toBe(true);
    });
  });

  describe('Root detection edge cases', () => {
    it('recognizes alternative spellings of the root', () => {
      const result1 = sutra1393('कल्प्स्यति', { root: 'कल्प्', affix: 'स्य' });
      expect(result1.applies).toBe(true);

      const result2 = sutra1393('क्लृप्स्यति', { root: 'क्लृप्', affix: 'स्य' });
      expect(result2.applies).toBe(true);
    });

    it('works with surface detection when context missing', () => {
      const result = sutra1393('कल्प्स्यति', { affix: 'स्य' });
      expect(result.applies).toBe(true);
    });
  });

  describe('Negative cases', () => {
    it('does not apply to other roots with लुट्', () => {
      const result = sutra1393('भविता', { lakara: 'luṭ', root: 'भू' });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Root is not कॢप्');
    });

    it('does not apply to कॢप् in other lakāras without स्य/सन्', () => {
      const result = sutra1393('कल्पते', { lakara: 'laṭ', root: 'कॢप्' });
      expect(result.applies).toBe(false);
      expect(result.reason).toContain('Neither लुट् nor स्य/सन्');
    });

    it('does not apply to कॢप् with unrelated affixes', () => {
      const result = sutra1393('कल्पित', { root: 'कॢप्', affix: 'kta' });
      expect(result.applies).toBe(false);
    });

    it('guards against invalid input', () => {
      const result = sutra1393(null, {});
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
    });

    it('guards against non-Sanskrit words', () => {
      const result = sutra1393('hello', { root: 'kḷp', lakara: 'luṭ' });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('Invalid input');
    });
  });

  describe('Return value structure', () => {
    it('returns complete result object with all required fields', () => {
      const result = sutra1393('कल्पिता', { lakara: 'luṭ', root: 'कॢप्' });
      
      expect(result).toHaveProperty('applies');
      expect(result).toHaveProperty('isParasmaipada');
      expect(result).toHaveProperty('isOptional');
      expect(result).toHaveProperty('reason');
      expect(result).toHaveProperty('sutra');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('details');
      
      expect(result.details).toHaveProperty('detectedScript');
      expect(result.details).toHaveProperty('condition');
      expect(result.details).toHaveProperty('hasLut');
      expect(result.details).toHaveProperty('hasSyaSan');
    });
  });
});
