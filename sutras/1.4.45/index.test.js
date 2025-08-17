/**
 * Test suite for Sutra 1.4.45: आधारोऽधिकरणम्
 * 
 * This sutra establishes that आधार (support/substratum) functions as अधिकरण कारक.
 */

import { sutra1445 } from './index.js';

describe('Sutra 1.4.45: आधारोऽधिकरणम् (ādhāro\'dhikaraṇam)', () => {
  
  describe('Physical support identification', () => {
    test('identifies surface supports', () => {
      const surfaceSupports = [
        { word: 'भूमि', action: 'स्थान', type: 'ground' },
        { word: 'मञ्च', action: 'शयन', type: 'platform' },
        { word: 'आसन', action: 'उपवेशन', type: 'seat' },
        { word: 'मेघ', action: 'वर्षण', type: 'sky_platform' }
      ];
      
      surfaceSupports.forEach(({ word, action, type }) => {
        const result = sutra1445(word, {
          action: action,
          context: `${word}े ${action}ं करोति`,
          supportType: 'surface',
          case: 'locative'
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('अधिकरण');
        expect(result.supportCategory).toBe('surface');
        expect(result.surfaceType).toBe(type);
      });
    });

    test('identifies container supports', () => {
      const containerSupports = [
        { word: 'घट', action: 'स्थापन', type: 'vessel' },
        { word: 'गृह', action: 'निवास', type: 'house' },
        { word: 'वन', action: 'वास', type: 'forest' },
        { word: 'नगर', action: 'निवास', type: 'city' }
      ];
      
      containerSupports.forEach(({ word, action, type }) => {
        const result = sutra1445(word, {
          action: action,
          context: `${word}े ${action}ं करोति`,
          supportType: 'container'
        });
        
        expect(result.applies).toBe(true);
        expect(result.supportCategory).toBe('container');
        expect(result.containerType).toBe(type);
      });
    });

    test('identifies structural supports', () => {
      const structuralSupports = [
        { word: 'स्तम्भ', action: 'आलम्बन', type: 'pillar' },
        { word: 'वृक्ष', action: 'आश्रय', type: 'tree' },
        { word: 'गिरि', action: 'स्थिति', type: 'mountain' }
      ];
      
      structuralSupports.forEach(({ word, action, type }) => {
        const result = sutra1445(word, {
          action: action,
          supportType: 'structural'
        });
        
        expect(result.applies).toBe(true);
        expect(result.supportCategory).toBe('structural');
        expect(result.structuralType).toBe(type);
      });
    });
  });

  describe('Temporal support identification', () => {
    test('identifies time periods as supports', () => {
      const temporalSupports = [
        { word: 'प्रातः', action: 'जागरण', period: 'morning' },
        { word: 'सायं', action: 'भोजन', period: 'evening' },
        { word: 'रात्रि', action: 'निद्रा', period: 'night' },
        { word: 'वर्षा', action: 'कृषि', period: 'rainy_season' }
      ];
      
      temporalSupports.forEach(({ word, action, period }) => {
        const result = sutra1445(word, {
          action: action,
          context: `${word} ${action}ं करोति`,
          supportType: 'temporal'
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('अधिकरण');
        expect(result.supportCategory).toBe('temporal');
        expect(result.timePeriod).toBe(period);
      });
    });

    test('identifies cyclical time supports', () => {
      const cyclicalSupports = [
        { word: 'सोमवार', cycle: 'weekly', type: 'weekday' },
        { word: 'चैत्र', cycle: 'monthly', type: 'month' },
        { word: 'वसन्त', cycle: 'seasonal', type: 'season' }
      ];
      
      cyclicalSupports.forEach(({ word, cycle, type }) => {
        const result = sutra1445(word, {
          action: 'उत्सव',
          supportType: 'temporal',
          cyclical: true,
          cycleType: cycle
        });
        
        expect(result.applies).toBe(true);
        expect(result.cyclicalSupport).toBe(true);
        expect(result.cycleType).toBe(cycle);
      });
    });
  });

  describe('Abstract support identification', () => {
    test('identifies mental/emotional supports', () => {
      const mentalSupports = [
        { word: 'हृदय', action: 'चिन्तन', type: 'heart_mind' },
        { word: 'मन', action: 'भावना', type: 'mind' },
        { word: 'बुद्धि', action: 'निर्णय', type: 'intellect' },
        { word: 'स्मृति', action: 'स्मरण', type: 'memory' }
      ];
      
      mentalSupports.forEach(({ word, action, type }) => {
        const result = sutra1445(word, {
          action: action,
          context: `${word}े ${action}ं करोति`,
          supportType: 'abstract',
          abstractCategory: 'mental'
        });
        
        expect(result.applies).toBe(true);
        expect(result.supportCategory).toBe('abstract');
        expect(result.abstractType).toBe('mental');
        expect(result.mentalType).toBe(type);
      });
    });

    test('identifies conceptual supports', () => {
      const conceptualSupports = [
        { word: 'धर्म', action: 'आचरण', concept: 'righteousness' },
        { word: 'शास्त्र', action: 'अध्ययन', concept: 'scripture' },
        { word: 'परम्परा', action: 'अनुष्ठान', concept: 'tradition' }
      ];
      
      conceptualSupports.forEach(({ word, action, concept }) => {
        const result = sutra1445(word, {
          action: action,
          supportType: 'abstract',
          abstractCategory: 'conceptual'
        });
        
        expect(result.applies).toBe(true);
        expect(result.abstractType).toBe('conceptual');
        expect(result.conceptualBasis).toBe(concept);
      });
    });

    test('identifies social/institutional supports', () => {
      const socialSupports = [
        { word: 'सभा', action: 'चर्चा', institution: 'assembly' },
        { word: 'गुरुकुल', action: 'शिक्षा', institution: 'school' },
        { word: 'राज्य', action: 'शासन', institution: 'state' }
      ];
      
      socialSupports.forEach(({ word, action, institution }) => {
        const result = sutra1445(word, {
          action: action,
          supportType: 'abstract',
          abstractCategory: 'social'
        });
        
        expect(result.applies).toBe(true);
        expect(result.abstractType).toBe('social');
        expect(result.institutionalType).toBe(institution);
      });
    });
  });

  describe('Locative case analysis', () => {
    test('handles standard locative case', () => {
      const result = sutra1445('गृह', {
        action: 'निवास',
        context: 'गृहे निवसति',
        case: 'locative',
        caseMarker: 'ए'
      });
      
      expect(result.applies).toBe(true);
      expect(result.grammaticalCase).toBe('locative');
      expect(result.locativeMarker).toBe('ए');
      expect(result.standardLocative).toBe(true);
    });

    test('handles compound locative expressions', () => {
      const result = sutra1445('गृहमध्य', {
        action: 'स्थिति',
        compound: true,
        parts: ['गृह', 'मध्य']
      });
      
      expect(result.applies).toBe(true);
      expect(result.compoundLocative).toBe(true);
      expect(result.locativeParts).toContain('गृह');
      expect(result.locativeParts).toContain('मध्य');
    });

    test('handles directional locatives', () => {
      const directions = [
        { word: 'उत्तर', direction: 'north' },
        { word: 'दक्षिण', direction: 'south' },
        { word: 'पूर्व', direction: 'east' },
        { word: 'पश्चिम', direction: 'west' }
      ];
      
      directions.forEach(({ word, direction }) => {
        const result = sutra1445(word, {
          action: 'गमन',
          supportType: 'directional'
        });
        
        expect(result.applies).toBe(true);
        expect(result.directionalSupport).toBe(true);
        expect(result.direction).toBe(direction);
      });
    });
  });

  describe('Support relationship types', () => {
    test('identifies containment relationships', () => {
      const result = sutra1445('घट', {
        action: 'स्थापन',
        context: 'घटे जलं स्थापयति',
        relationshipType: 'containment'
      });
      
      expect(result.applies).toBe(true);
      expect(result.relationshipType).toBe('containment');
      expect(result.container).toBe(true);
    });

    test('identifies surface contact relationships', () => {
      const result = sutra1445('मञ्च', {
        action: 'शयन',
        context: 'मञ्चे शेते',
        relationshipType: 'surface_contact'
      });
      
      expect(result.applies).toBe(true);
      expect(result.relationshipType).toBe('surface_contact');
      expect(result.surfaceContact).toBe(true);
    });

    test('identifies proximity relationships', () => {
      const result = sutra1445('वृक्ष', {
        action: 'उपवेशन',
        context: 'वृक्षे उपविशति',
        relationshipType: 'proximity'
      });
      
      expect(result.applies).toBe(true);
      expect(result.relationshipType).toBe('proximity');
      expect(result.proximitySupport).toBe(true);
    });
  });

  describe('Metaphorical and extended supports', () => {
    test('handles metaphorical supports', () => {
      const metaphoricalSupports = [
        { word: 'प्रेम', action: 'पोषण', metaphor: 'emotional_foundation' },
        { word: 'विश्वास', action: 'सम्बन्ध', metaphor: 'trust_basis' },
        { word: 'ज्ञान', action: 'विकास', metaphor: 'knowledge_ground' }
      ];
      
      metaphoricalSupports.forEach(({ word, action, metaphor }) => {
        const result = sutra1445(word, {
          action: action,
          supportType: 'metaphorical',
          metaphorType: metaphor
        });
        
        expect(result.applies).toBe(true);
        expect(result.metaphoricalSupport).toBe(true);
        expect(result.metaphorType).toBe(metaphor);
      });
    });

    test('handles literary/poetic supports', () => {
      const result = sutra1445('कविता', {
        action: 'अभिव्यक्ति',
        context: 'कवितायां भावं व्यक्त करोति',
        literary: true,
        genre: 'poetry'
      });
      
      expect(result.applies).toBe(true);
      expect(result.literarySupport).toBe(true);
      expect(result.literaryGenre).toBe('poetry');
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1445('गृह', {
        action: 'निवास',
        script: 'Devanagari'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1445('gṛha', {
        action: 'nivāsa',
        script: 'IAST'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1445('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles non-support words', () => {
      const result = sutra1445('कुठार', {
        action: 'छेदन',
        supportType: 'none'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_support_relationship');
    });

    test('handles missing context', () => {
      const result = sutra1445('गृह', {
        // missing action and context
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('insufficient_context');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1445('xyz123', {
        action: 'test'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with other कारक systems', () => {
    test('distinguishes from करण (instrument)', () => {
      const result = sutra1445('मञ्च', {
        action: 'शयन',
        context: 'मञ्चे शेते',
        notKarana: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अधिकरण');
      expect(result.notKarana).toBe(true);
    });

    test('distinguishes from कर्म (object)', () => {
      const result = sutra1445('गृह', {
        action: 'निवास',
        context: 'गृहे निवसति',
        notKarma: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.karaka).toBe('अधिकरण');
      expect(result.notKarma).toBe(true);
    });

    test('handles overlapping locative relationships', () => {
      const result = sutra1445('पथ', {
        action: 'गमन',
        context: 'पथि गच्छति',
        overlappingKarakas: ['अधिकरण', 'अपादान'],
        resolution: 'contextual'
      });
      
      expect(result.applies).toBe(true);
      expect(result.conflictResolution).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    test('handles nested supports', () => {
      const result = sutra1445('गृहकक्ष', {
        action: 'अध्ययन',
        nestedSupport: true,
        outerSupport: 'गृह',
        innerSupport: 'कक्ष'
      });
      
      expect(result.applies).toBe(true);
      expect(result.nestedSupport).toBe(true);
      expect(result.supportHierarchy).toBeDefined();
    });

    test('handles mobile supports', () => {
      const result = sutra1445('रथ', {
        action: 'यात्रा',
        mobileSupport: true,
        movement: 'vehicle'
      });
      
      expect(result.applies).toBe(true);
      expect(result.mobileSupport).toBe(true);
    });

    test('handles conditional supports', () => {
      const result = sutra1445('सभा', {
        action: 'भाषण',
        conditionalSupport: true,
        condition: 'assembled_audience'
      });
      
      expect(result.applies).toBe(true);
      expect(result.conditionalSupport).toBe(true);
    });

    test('handles temporal-spatial combinations', () => {
      const result = sutra1445('प्रातःकाल_उद्यान', {
        action: 'भ्रमण',
        combinedSupport: true,
        temporal: 'प्रातःकाल',
        spatial: 'उद्यान'
      });
      
      expect(result.applies).toBe(true);
      expect(result.combinedSupport).toBe(true);
    });
  });
});
