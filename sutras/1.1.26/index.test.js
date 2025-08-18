/**
 * Test cases for Sutra 1.1.26: क्तक्तवतू निष्ठा
 * Testing the निष्ठा classification for क्त and क्तवतु affixes
 */

import { 
  hasNishtha,
  isKta,
  isKtavatu,
  getNishthaAffixes,
  identifyNishthaType,
  hasNishthaBehavior,
  getNishthaExamples,
  isNishthaType,
  getNishthaRoot,
  isPassiveParticiple,
  isActiveParticiple,
  analyzeNishtha,
  NISHTHA_AFFIXES
} from './index.js';

describe('Sutra 1.1.26: क्तक्तवतू निष्ठा', () => {
  describe('hasNishtha', () => {
    it('should identify क्त forms', () => {
      expect(hasNishtha('kṛta')).toBe(true);    // done/made
      expect(hasNishtha('gata')).toBe(true);    // gone
      expect(hasNishtha('bhukta')).toBe(true);  // eaten
      expect(hasNishtha('dṛṣṭa')).toBe(true);   // seen
      expect(hasNishtha('śruta')).toBe(true);   // heard
      
      expect(hasNishtha('कृत')).toBe(true);
      expect(hasNishtha('गत')).toBe(true);
      expect(hasNishtha('भुक्त')).toBe(true);
    });

    it('should identify क्तवतु forms', () => {
      expect(hasNishtha('kṛtavat')).toBe(true);   // having done
      expect(hasNishtha('gatavat')).toBe(true);   // having gone
      expect(hasNishtha('bhuktavat')).toBe(true); // having eaten
      expect(hasNishtha('dṛṣṭavat')).toBe(true);  // having seen
      
      expect(hasNishtha('कृतवत्')).toBe(true);
      expect(hasNishtha('गतवत्')).toBe(true);
      expect(hasNishtha('भुक्तवत्')).toBe(true);
    });

    it('should reject non-निष्ठा forms', () => {
      expect(hasNishtha('karoti')).toBe(false);  // present tense
      expect(hasNishtha('gacchati')).toBe(false); // present tense
      expect(hasNishtha('guru')).toBe(false);     // adjective
      expect(hasNishtha('नर')).toBe(false);        // noun
    });

    it('should handle edge cases', () => {
      expect(hasNishtha('')).toBe(false);
      expect(hasNishtha(null)).toBe(false);
      expect(hasNishtha(undefined)).toBe(false);
    });
  });

  describe('isKta', () => {
    it('should identify क्त forms specifically', () => {
      expect(isKta('kṛta')).toBe(true);
      expect(isKta('gata')).toBe(true);
      expect(isKta('bhukta')).toBe(true);
      expect(isKta('likhita')).toBe(true);
      
      expect(isKta('कृत')).toBe(true);
      expect(isKta('गत')).toBe(true);
      expect(isKta('लिखित')).toBe(true);
    });

    it('should reject क्तवतु forms', () => {
      expect(isKta('kṛtavat')).toBe(false);
      expect(isKta('gatavat')).toBe(false);
      expect(isKta('कृतवत्')).toBe(false);
    });

    it('should reject non-निष्ठा words', () => {
      expect(isKta('guru')).toBe(false);
      expect(isKta('नर')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isKta('')).toBe(false);
      expect(isKta(null)).toBe(false);
    });
  });

  describe('isKtavatu', () => {
    it('should identify क्तवतु forms specifically', () => {
      expect(isKtavatu('kṛtavat')).toBe(true);
      expect(isKtavatu('gatavat')).toBe(true);
      expect(isKtavatu('bhuktavat')).toBe(true);
      expect(isKtavatu('likhitavat')).toBe(true);
      
      expect(isKtavatu('कृतवत्')).toBe(true);
      expect(isKtavatu('गतवत्')).toBe(true);
      expect(isKtavatu('लिखितवत्')).toBe(true);
    });

    it('should reject क्त forms', () => {
      expect(isKtavatu('kṛta')).toBe(false);
      expect(isKtavatu('gata')).toBe(false);
      expect(isKtavatu('कृत')).toBe(false);
    });

    it('should reject non-निष्ठा words', () => {
      expect(isKtavatu('guru')).toBe(false);
      expect(isKtavatu('नर')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isKtavatu('')).toBe(false);
      expect(isKtavatu(null)).toBe(false);
    });
  });

  describe('getNishthaAffixes', () => {
    it('should return IAST affixes by default', () => {
      const affixes = getNishthaAffixes();
      expect(affixes.kta).toBe('kta');
      expect(affixes.ktavatu).toBe('ktavatu');
      expect(affixes.examples.kta).toContain('kṛta');
      expect(affixes.examples.ktavatu).toContain('kṛtavat');
    });

    it('should return IAST affixes when explicitly requested', () => {
      const affixes = getNishthaAffixes('IAST');
      expect(affixes.kta).toBe('kta');
      expect(affixes.examples.kta).toContain('gata');
      expect(affixes.examples.ktavatu).toContain('gatavat');
    });

    it('should return Devanagari affixes when requested', () => {
      const affixes = getNishthaAffixes('Devanagari');
      expect(affixes.kta).toBe('क्त');
      expect(affixes.ktavatu).toBe('क्तवतु');
      expect(affixes.examples.kta).toContain('कृत');
      expect(affixes.examples.ktavatu).toContain('कृतवत्');
    });

    it('should have consistent structure across scripts', () => {
      const iastAffixes = getNishthaAffixes('IAST');
      const devanagariAffixes = getNishthaAffixes('Devanagari');
      
      expect(Object.keys(iastAffixes)).toEqual(Object.keys(devanagariAffixes));
      expect(iastAffixes.examples.kta.length).toEqual(devanagariAffixes.examples.kta.length);
      expect(iastAffixes.examples.ktavatu.length).toEqual(devanagariAffixes.examples.ktavatu.length);
    });
  });

  describe('identifyNishthaType', () => {
    it('should identify क्त forms', () => {
      const result1 = identifyNishthaType('kṛta');
      expect(result1.hasNishtha).toBe(true);
      expect(result1.type).toBe('kta');
      expect(result1.affix).toBe('kta');
      expect(result1.meaning).toBe('past_passive_participle');
      expect(result1.script).toBe('IAST');

      const result2 = identifyNishthaType('कृत');
      expect(result2.hasNishtha).toBe(true);
      expect(result2.type).toBe('kta');
      expect(result2.affix).toBe('क्त');
      expect(result2.script).toBe('Devanagari');
    });

    it('should identify क्तवतु forms', () => {
      const result1 = identifyNishthaType('kṛtavat');
      expect(result1.hasNishtha).toBe(true);
      expect(result1.type).toBe('ktavatu');
      expect(result1.affix).toBe('ktavatu');
      expect(result1.meaning).toBe('past_active_participle');
      expect(result1.script).toBe('IAST');

      const result2 = identifyNishthaType('कृतवत्');
      expect(result2.hasNishtha).toBe(true);
      expect(result2.type).toBe('ktavatu');
      expect(result2.affix).toBe('क्तवतु');
      expect(result2.script).toBe('Devanagari');
    });

    it('should return negative results for non-निष्ठा words', () => {
      const result = identifyNishthaType('guru');
      expect(result.hasNishtha).toBe(false);
      expect(result.type).toBe(null);
    });

    it('should handle edge cases', () => {
      const result1 = identifyNishthaType('');
      expect(result1.hasNishtha).toBe(false);

      const result2 = identifyNishthaType(null);
      expect(result2.hasNishtha).toBe(false);
    });
  });

  describe('hasNishthaBehavior', () => {
    it('should return true for direct निष्ठा forms', () => {
      expect(hasNishthaBehavior('kṛta')).toBe(true);
      expect(hasNishthaBehavior('kṛtavat')).toBe(true);
      expect(hasNishthaBehavior('कृत')).toBe(true);
      expect(hasNishthaBehavior('कृतवत्')).toBe(true);
    });

    it('should consider morphological context', () => {
      const context1 = { morphology: 'participle', tense: 'past' };
      expect(hasNishthaBehavior('anyword', context1)).toBe(true);
      
      const context2 = { morphology: 'participle', voice: 'passive' };
      expect(hasNishthaBehavior('anyword', context2)).toBe(true);
    });

    it('should consider affix context', () => {
      const context1 = { affix: 'kta' };
      expect(hasNishthaBehavior('anyword', context1)).toBe(true);
      
      const context2 = { affix: 'क्तवतु' };
      expect(hasNishthaBehavior('anyword', context2)).toBe(true);
    });

    it('should return false for non-निष्ठा words without context', () => {
      expect(hasNishthaBehavior('guru')).toBe(false);
      expect(hasNishthaBehavior('karoti')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(hasNishthaBehavior('')).toBe(false);
      expect(hasNishthaBehavior(null)).toBe(false);
    });
  });

  describe('getNishthaExamples', () => {
    it('should return IAST examples by default', () => {
      const examples = getNishthaExamples();
      expect(examples.kta).toContain('kṛta');
      expect(examples.kta).toContain('gata');
      expect(examples.ktavatu).toContain('kṛtavat');
      expect(examples.ktavatu).toContain('gatavat');
    });

    it('should return Devanagari examples when requested', () => {
      const examples = getNishthaExamples('Devanagari');
      expect(examples.kta).toContain('कृत');
      expect(examples.kta).toContain('गत');
      expect(examples.ktavatu).toContain('कृतवत्');
      expect(examples.ktavatu).toContain('गतवत्');
    });

    it('should return limited examples for each category', () => {
      const examples = getNishthaExamples();
      expect(examples.kta.length).toBe(5);
      expect(examples.ktavatu.length).toBe(5);
    });
  });

  describe('isNishthaType', () => {
    it('should check for क्त type specifically', () => {
      expect(isNishthaType('kṛta', 'kta')).toBe(true);
      expect(isNishthaType('kṛtavat', 'kta')).toBe(false);
      expect(isNishthaType('कृत', 'kta')).toBe(true);
    });

    it('should check for क्तवतु type specifically', () => {
      expect(isNishthaType('kṛtavat', 'ktavatu')).toBe(true);
      expect(isNishthaType('kṛta', 'ktavatu')).toBe(false);
      expect(isNishthaType('कृतवत्', 'ktavatu')).toBe(true);
    });

    it('should return false for non-निष्ठा words', () => {
      expect(isNishthaType('guru', 'kta')).toBe(false);
      expect(isNishthaType('guru', 'ktavatu')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isNishthaType('', 'kta')).toBe(false);
      expect(isNishthaType('kṛta', '')).toBe(false);
      expect(isNishthaType(null, 'kta')).toBe(false);
    });
  });

  describe('getNishthaRoot', () => {
    it('should extract roots from क्त forms', () => {
      expect(getNishthaRoot('kṛta')).toBe('kṛ');
      expect(getNishthaRoot('gata')).toBe('gam');
      expect(getNishthaRoot('bhukta')).toBe('bhuj');
      expect(getNishthaRoot('dṛṣṭa')).toBe('dṛś');
    });

    it('should extract roots from क्तवतु forms', () => {
      expect(getNishthaRoot('kṛtavat')).toBe('kṛ');
      expect(getNishthaRoot('gatavat')).toBe('gam');
      expect(getNishthaRoot('bhuktavat')).toBe('bhuj');
    });

    it('should work with Devanagari', () => {
      expect(getNishthaRoot('कृत')).toBe('कृ');
      expect(getNishthaRoot('गत')).toBe('गम्');
      expect(getNishthaRoot('भुक्त')).toBe('भुज्');
    });

    it('should return null for unrecognized words', () => {
      expect(getNishthaRoot('unknown')).toBe(null);
      expect(getNishthaRoot('guru')).toBe(null);
    });

    it('should handle edge cases', () => {
      expect(getNishthaRoot('')).toBe(null);
      expect(getNishthaRoot(null)).toBe(null);
    });
  });

  describe('isPassiveParticiple', () => {
    it('should identify passive participles (क्त forms)', () => {
      expect(isPassiveParticiple('kṛta')).toBe(true);
      expect(isPassiveParticiple('gata')).toBe(true);
      expect(isPassiveParticiple('कृत')).toBe(true);
    });

    it('should reject active participles', () => {
      expect(isPassiveParticiple('kṛtavat')).toBe(false);
      expect(isPassiveParticiple('कृतवत्')).toBe(false);
    });
  });

  describe('isActiveParticiple', () => {
    it('should identify active participles (क्तवतु forms)', () => {
      expect(isActiveParticiple('kṛtavat')).toBe(true);
      expect(isActiveParticiple('gatavat')).toBe(true);
      expect(isActiveParticiple('कृतवत्')).toBe(true);
    });

    it('should reject passive participles', () => {
      expect(isActiveParticiple('kṛta')).toBe(false);
      expect(isActiveParticiple('कृत')).toBe(false);
    });
  });

  describe('real-world examples', () => {
    it('should work with common past participles', () => {
      // क्त forms - passive meaning
      expect(hasNishtha('dṛṣṭa')).toBe(true);   // seen
      expect(isPassiveParticiple('dṛṣṭa')).toBe(true);
      expect(getNishthaRoot('dṛṣṭa')).toBe('dṛś');
      
      expect(hasNishtha('श्रुत')).toBe(true);    // heard
      expect(isPassiveParticiple('श्रुत')).toBe(true);
    });

    it('should work with active participles', () => {
      // क्तवतु forms - active meaning
      expect(hasNishtha('dṛṣṭavat')).toBe(true);  // having seen
      expect(isActiveParticiple('dṛṣṭavat')).toBe(true);
      expect(getNishthaRoot('dṛṣṭavat')).toBe('dṛś');
      
      expect(hasNishtha('श्रुतवत्')).toBe(true);   // having heard
      expect(isActiveParticiple('श्रुतवत्')).toBe(true);
    });

    it('should support grammatical analysis', () => {
      // For rules that specifically target निष्ठा forms
      expect(hasNishtha('kṛta')).toBe(true);
      expect(identifyNishthaType('kṛta').type).toBe('kta');
      
      // But not other verb forms
      expect(hasNishtha('karoti')).toBe(false);  // present tense
      expect(hasNishtha('kariṣyati')).toBe(false); // future tense
    });

    it('should work in morphological contexts', () => {
      // क्त identification
      expect(isNishthaType('bhukta', 'kta')).toBe(true);
      expect(isPassiveParticiple('bhukta')).toBe(true);
      
      // क्तवतु identification  
      expect(isNishthaType('bhuktavat', 'ktavatu')).toBe(true);
      expect(isActiveParticiple('bhuktavat')).toBe(true);
    });

    it('should distinguish from similar forms', () => {
      // निष्ठा vs. other participial forms
      expect(hasNishtha('kṛta')).toBe(true);      // क्त (निष्ठा)
      expect(hasNishtha('kṛtavat')).toBe(true);   // क्तवतु (निष्ठा)
      expect(hasNishtha('kurvan')).toBe(false);   // शतृ (not निष्ठा)
      expect(hasNishtha('kartṛ')).toBe(false);    // तृ (not निष्ठा)
    });

    it('should support complete निष्ठा analysis', () => {
      // Comprehensive analysis
      const analysis = identifyNishthaType('likhita');
      expect(analysis.hasNishtha).toBe(true);
      expect(analysis.type).toBe('kta');
      expect(analysis.meaning).toBe('past_passive_participle');
      expect(analysis.script).toBe('IAST');
      
      // Root extraction
      expect(getNishthaRoot('likhita')).toBe(null); // not in simple mappings
      
      // Voice identification
      expect(isPassiveParticiple('likhita')).toBe(true);
      expect(isActiveParticiple('likhita')).toBe(false);
    });

    it('should work with contextual analysis', () => {
      // Morphological context
      const context = { 
        morphology: 'participle', 
        tense: 'past',
        voice: 'passive'
      };
      
      expect(hasNishthaBehavior('kṛta', context)).toBe(true);
      expect(hasNishthaBehavior('unknown', context)).toBe(true); // context-based
    });
  });

  // Comprehensive Analysis Function Tests
  describe('analyzeNishtha (comprehensive analysis)', () => {
    describe('valid niṣṭhā participle analysis', () => {
      it('should analyze kta forms comprehensively', () => {
        const result = analyzeNishtha('kṛta');
        
        expect(result.isValid).toBe(true);
        expect(result.hasNishtha).toBe(true);
        expect(result.input).toBe('kṛta');
        expect(result.confidence).toBe(0.95);
        
        // Morphological analysis
        expect(result.analysis.morphological.category).toBe('participle');
        expect(result.analysis.morphological.subcategory).toBe('past-passive-participle');
        expect(result.analysis.morphological.script).toBe('IAST');
        expect(result.analysis.morphological.morphClass).toBe('niṣṭhā');
        expect(result.analysis.morphological.affix).toBe('kta');
        expect(result.analysis.morphological.affixType).toBe('kta');
        expect(result.analysis.morphological.rootVerb).toBe('kṛ');
        
        // Semantic analysis
        expect(result.analysis.semantic.function).toBe('participial-qualification');
        expect(result.analysis.semantic.meaning).toContain('past passive participle');
        expect(result.analysis.semantic.tense).toBe('past');
        expect(result.analysis.semantic.voice).toBe('passive');
        expect(result.analysis.semantic.aspect).toBe('perfective');
        
        // Syntactic analysis
        expect(result.analysis.syntactic.classification).toBe('niṣṭhā');
        expect(result.analysis.syntactic.applicableRules).toContain('1.1.26');
        expect(result.analysis.syntactic.participleType).toBe('kta');
        
        // Metadata
        expect(result.metadata.sutraNumber).toBe('1.1.26');
        expect(result.metadata.sutraText).toBe('क्तक्तवतू निष्ठा');
      });

      it('should analyze ktavatu forms comprehensively', () => {
        const result = analyzeNishtha('कृतवत्');
        
        expect(result.isValid).toBe(true);
        expect(result.hasNishtha).toBe(true);
        expect(result.confidence).toBe(0.95);
        
        expect(result.analysis.morphological.subcategory).toBe('past-active-participle');
        expect(result.analysis.morphological.script).toBe('Devanagari');
        expect(result.analysis.morphological.affix).toBe('क्तवतु');
        expect(result.analysis.morphological.affixType).toBe('ktavatu');
        expect(result.analysis.semantic.voice).toBe('active');
      });

      it('should identify root verbs when possible', () => {
        const result = analyzeNishtha('गत');
        
        expect(result.isValid).toBe(true);
        expect(result.hasNishtha).toBe(true);
        expect(result.analysis.morphological.rootVerb).toBe('गम्');
        expect(result.analysis.semantic.meaning).toContain('√गम्');
      });

      it('should handle participles without identifiable roots', () => {
        const result = analyzeNishtha('likhita');
        
        expect(result.isValid).toBe(true);
        expect(result.hasNishtha).toBe(true);
        expect(result.analysis.morphological.rootVerb).toBe(null);
      });
    });

    describe('non-niṣṭhā analysis', () => {
      it('should analyze non-participles correctly', () => {
        const result = analyzeNishtha('गुरु');
        
        expect(result.isValid).toBe(true);
        expect(result.hasNishtha).toBe(false);
        expect(result.confidence).toBe(0.1);
        
        expect(result.analysis.morphological.category).toBe('non-participle');
        expect(result.analysis.semantic.function).toBe('non-participial');
        expect(result.analysis.syntactic.classification).toBe('non-niṣṭhā');
      });
    });

    describe('enhanced context analysis', () => {
      it('should include usage examples when requested', () => {
        const result = analyzeNishtha('bhukta', { includeUsageExamples: true });
        
        expect(result.metadata.usageExamples).toBeDefined();
        expect(result.metadata.usageExamples.length).toBeGreaterThan(0);
        expect(result.metadata.usageExamples[0]).toContain('bhukta');
      });

      it('should include related rules when requested', () => {
        const result = analyzeNishtha('dṛṣṭa', { includeRelatedRules: true });
        
        expect(result.metadata.relatedRules).toBeDefined();
        expect(result.metadata.relatedRules.length).toBeGreaterThan(0);
        expect(result.metadata.relatedRules).toContain('1.1.26 - क्तक्तवतू निष्ठा (defines niṣṭhā for kta and ktavatu affixes)');
      });

      it('should handle agreement context', () => {
        const result = analyzeNishtha('śruta', { agreement: 'neuter-singular-nominative' });
        
        expect(result.analysis.syntactic.agreement).toBe('neuter-singular-nominative');
      });
    });

    describe('error handling and validation', () => {
      it('should handle empty input', () => {
        const result = analyzeNishtha('');
        
        expect(result.isValid).toBe(false);
        expect(result.hasNishtha).toBe(false);
        expect(result.errors).toContain('Input is required');
        expect(result.confidence).toBe(0);
      });

      it('should handle null input', () => {
        const result = analyzeNishtha(null);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Input is required');
      });

      it('should handle invalid Sanskrit input', () => {
        const result = analyzeNishtha('xyz123');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit input');
      });

      it('should handle English words', () => {
        const result = analyzeNishtha('hello');
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Invalid Sanskrit input');
      });
    });

    describe('script detection and normalization', () => {
      it('should detect IAST script correctly', () => {
        const result = analyzeNishtha('nīta');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.morphological.script).toBe('IAST');
      });

      it('should detect Devanagari script correctly', () => {
        const result = analyzeNishtha('नीत');
        
        expect(result.isValid).toBe(true);
        expect(result.analysis.morphological.script).toBe('Devanagari');
      });

      it('should normalize input correctly', () => {
        const result = analyzeNishtha('  datta  ');
        
        expect(result.normalizedInput).toBe('datta');
        expect(result.isValid).toBe(true);
      });
    });

    describe('traditional commentary integration', () => {
      it('should include traditional Sanskrit explanation', () => {
        const result = analyzeNishtha('लब्ध');
        
        expect(result.metadata.traditionalExplanation).toContain('क्तप्रत्ययः');
        expect(result.metadata.traditionalExplanation).toContain('निष्ठासंज्ञकौ');
      });

      it('should include modern English explanation', () => {
        const result = analyzeNishtha('paṭhita');
        
        expect(result.metadata.modernExplanation).toContain('technical term');
        expect(result.metadata.modernExplanation).toContain('niṣṭhā');
      });

      it('should include commentary references', () => {
        const result = analyzeNishtha('दत्त');
        
        expect(result.metadata.commentaryReferences).toContain('Kāśikā');
        expect(result.metadata.commentaryReferences).toContain('Patañjali Mahābhāṣya');
      });
    });

    describe('morphological structure analysis', () => {
      it('should determine kta structure', () => {
        const result = analyzeNishtha('gata');
        
        expect(result.analysis.morphological.structure).toBe('root-kta-affix');
      });

      it('should determine ktavatu structure', () => {
        const result = analyzeNishtha('gatavat');
        
        expect(result.analysis.morphological.structure).toBe('root-ktavatu-affix');
      });
    });

    describe('semantic analysis specifics', () => {
      it('should correctly analyze passive voice semantics', () => {
        const result = analyzeNishtha('bhukta');
        
        expect(result.analysis.semantic.voice).toBe('passive');
        expect(result.analysis.semantic.semanticRole).toBe('past_passive_participle');
        expect(result.analysis.semantic.category).toBe('verbal-adjective');
      });

      it('should correctly analyze active voice semantics', () => {
        const result = analyzeNishtha('bhuktavat');
        
        expect(result.analysis.semantic.voice).toBe('active');
        expect(result.analysis.semantic.semanticRole).toBe('past_active_participle');
        expect(result.analysis.semantic.aspect).toBe('perfective');
      });
    });

    describe('syntactic behavior analysis', () => {
      it('should identify adjectival agreement pattern', () => {
        const result = analyzeNishtha('kṛta');
        
        expect(result.analysis.syntactic.syntacticBehavior).toBe('adjectival-agreement');
        expect(result.analysis.syntactic.agreement).toBe('gender-number-case');
      });

      it('should classify grammatical function correctly', () => {
        const result = analyzeNishtha('śrutavat');
        
        expect(result.analysis.syntactic.grammaticalFunction).toBe('participial-affix-designation');
        expect(result.analysis.syntactic.ruleType).toBe('saṃjñā');
      });
    });
  });
});
