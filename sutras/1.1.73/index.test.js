import { isVrddham } from './index.js';

describe('Sutra 1.1.73: वृद्धिर्यस्याचामादिस्तद् वृद्धम्', () => {
  describe('IAST Script - Words with वृद्धि as first vowel', () => {
    it("should return true for 'ātman' (first vowel is ā)", () => {
      expect(isVrddham('ātman')).toBe(true);
    });

    it("should return true for 'aiśvarya' (first vowel is ai)", () => {
      expect(isVrddham('aiśvarya')).toBe(true);
    });

    it("should return true for 'auṣadha' (first vowel is au)", () => {
      expect(isVrddham('auṣadha')).toBe(true);
    });

    it("should return true for 'ārya' (first vowel is ā)", () => {
      expect(isVrddham('ārya')).toBe(true);
    });

    it("should return true for 'aindriya' (first vowel is ai)", () => {
      expect(isVrddham('aindriya')).toBe(true);
    });

    it("should return true for 'aupaṇya' (first vowel is au)", () => {
      expect(isVrddham('aupaṇya')).toBe(true);
    });
  });

  describe('Devanagari Script - Words with वृद्धि as first vowel', () => {
    it("should return true for 'आत्मन्' (first vowel is आ)", () => {
      expect(isVrddham('आत्मन्')).toBe(true);
    });

    it("should return true for 'ऐश्वर्य' (first vowel is ऐ)", () => {
      expect(isVrddham('ऐश्वर्य')).toBe(true);
    });

    it("should return true for 'औषध' (first vowel is औ)", () => {
      expect(isVrddham('औषध')).toBe(true);
    });

    it("should return true for 'आर्य' (first vowel is आ)", () => {
      expect(isVrddham('आर्य')).toBe(true);
    });

    it("should return true for 'ऐन्द्रिय' (first vowel is ऐ)", () => {
      expect(isVrddham('ऐन्द्रिय')).toBe(true);
    });

    it("should return true for 'औपण्य' (first vowel is औ)", () => {
      expect(isVrddham('औपण्य')).toBe(true);
    });
  });

  describe('IAST Script - Words NOT वृद्धम् (first vowel is not वृद्धि)', () => {
    it("should return false for 'deva' (first vowel is e, not वृद्धि)", () => {
      expect(isVrddham('deva')).toBe(false);
    });

    it("should return false for 'indra' (first vowel is i, not वृद्धि)", () => {
      expect(isVrddham('indra')).toBe(false);
    });

    it("should return false for 'udaya' (first vowel is u, not वृद्धि)", () => {
      expect(isVrddham('udaya')).toBe(false);
    });

    it("should return false for 'agni' (first vowel is a, not वृद्धि)", () => {
      expect(isVrddham('agni')).toBe(false);
    });

    it("should return false for 'īśvara' (first vowel is ī, not वृद्धि)", () => {
      expect(isVrddham('īśvara')).toBe(false);
    });

    it("should return false for 'ūrdhva' (first vowel is ū, not वृद्धि)", () => {
      expect(isVrddham('ūrdhva')).toBe(false);
    });

    it("should return false for 'ṛṣi' (first vowel is ṛ, not वृद्धि)", () => {
      expect(isVrddham('ṛṣi')).toBe(false);
    });

    it("should return false for 'ojas' (first vowel is o, not वृद्धि)", () => {
      expect(isVrddham('ojas')).toBe(false);
    });
  });

  describe('Devanagari Script - Words NOT वृद्धम्', () => {
    it("should return false for 'देव' (first vowel is ए, not वृद्धि)", () => {
      expect(isVrddham('देव')).toBe(false);
    });

    it("should return false for 'इन्द्र' (first vowel is इ, not वृद्धि)", () => {
      expect(isVrddham('इन्द्र')).toBe(false);
    });

    it("should return false for 'उदय' (first vowel is उ, not वृद्धि)", () => {
      expect(isVrddham('उदय')).toBe(false);
    });

    it("should return false for 'अग्नि' (first vowel is अ, not वृद्धि)", () => {
      expect(isVrddham('अग्नि')).toBe(false);
    });

    it("should return false for 'ईश्वर' (first vowel is ई, not वृद्धि)", () => {
      expect(isVrddham('ईश्वर')).toBe(false);
    });

    it("should return false for 'ऊर्ध्व' (first vowel is ऊ, not वृद्धि)", () => {
      expect(isVrddham('ऊर्ध्व')).toBe(false);
    });

    it("should return false for 'ऋषि' (first vowel is ऋ, not वृद्धि)", () => {
      expect(isVrddham('ऋषि')).toBe(false);
    });

    it("should return false for 'ओजस्' (first vowel is ओ, not वृद्धि)", () => {
      expect(isVrddham('ओजस्')).toBe(false);
    });
  });

  describe('Complex Cases - Multiple vowels', () => {
    it("should return true for 'ātmāiva' (first vowel ā is वृद्धि, ignore later vowels)", () => {
      expect(isVrddham('ātmāiva')).toBe(true);
    });

    it("should return false for 'devāura' (first vowel e is not वृद्धि, ignore later वृद्धि)", () => {
      expect(isVrddham('devāura')).toBe(false);
    });

    it("should return true for 'aiśa-indra' (first vowel ai is वृद्धि)", () => {
      expect(isVrddham('aiśaindra')).toBe(true);
    });

    it("should return false for 'upaāgama' (first vowel u is not वृद्धि)", () => {
      expect(isVrddham('upaāgama')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should return false for words with no vowels', () => {
      expect(isVrddham('kṣpt')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isVrddham('')).toBe(false);
    });

    it('should return false for non-string inputs', () => {
      expect(isVrddham(null)).toBe(false);
      expect(isVrddham(undefined)).toBe(false);
      expect(isVrddham(123)).toBe(false);
      expect(isVrddham({})).toBe(false);
    });

    it('should handle single वृद्धि vowels', () => {
      expect(isVrddham('ā')).toBe(true);
      expect(isVrddham('ai')).toBe(true);
      expect(isVrddham('au')).toBe(true);
      expect(isVrddham('आ')).toBe(true);
      expect(isVrddham('ऐ')).toBe(true);
      expect(isVrddham('औ')).toBe(true);
    });

    it('should handle single non-वृद्धि vowels', () => {
      expect(isVrddham('a')).toBe(false);
      expect(isVrddham('i')).toBe(false);
      expect(isVrddham('u')).toBe(false);
      expect(isVrddham('e')).toBe(false);
      expect(isVrddham('o')).toBe(false);
    });
  });

  describe('Words starting with consonants', () => {
    it('should correctly identify वृद्धि in consonant-initial words', () => {
      expect(isVrddham('krāma')).toBe(true); // क्राम - first vowel is ā
      expect(isVrddham('grāma')).toBe(true); // ग्राम - first vowel is ā  
      expect(isVrddham('prāṇa')).toBe(true); // प्राण - first vowel is ā
      expect(isVrddham('svāmin')).toBe(true); // स्वामिन् - first vowel is ā
    });

    it('should correctly reject non-वृद्धि in consonant-initial words', () => {
      expect(isVrddham('kriti')).toBe(false); // क्रिति - first vowel is i
      expect(isVrddham('graha')).toBe(false); // ग्रह - first vowel is a
      expect(isVrddham('priya')).toBe(false); // प्रिय - first vowel is i
      expect(isVrddham('sveta')).toBe(false); // श्वेत - first vowel is e
    });
  });
});
