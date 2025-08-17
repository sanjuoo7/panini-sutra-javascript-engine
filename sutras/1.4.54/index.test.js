/**
 * Test suite for Sutra 1.4.54: स्वतन्त्रः कर्ता
 * 
 * This sutra defines कर्ता (agent) as the independent entity in verbal action.
 */

import { sutra1454 } from './index.js';

describe('Sutra 1.4.54: स्वतन्त्रः कर्ता (svatantraḥ kartā)', () => {
  
  describe('Basic independence analysis', () => {
    test('identifies fully independent agents', () => {
      const independentAgents = [
        { agent: 'राम', independence: 'full', autonomy: 'complete' },
        { agent: 'सीता', independence: 'full', autonomy: 'complete' },
        { agent: 'अर्जुन', independence: 'full', autonomy: 'complete' },
        { agent: 'कृष्ण', independence: 'full', autonomy: 'complete' },
        { agent: 'गुरु', independence: 'full', autonomy: 'complete' }
      ];
      
      independentAgents.forEach(({ agent, independence, autonomy }) => {
        const result = sutra1454(agent, {
          verb: 'करोति',
          action: 'क्रिया',
          context: `${agent} कार्यं करोति`,
          independence: independence,
          autonomy: autonomy,
          selfDetermined: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.karaka).toBe('कर्ता');
        expect(result.independence).toBe(independence);
        expect(result.autonomy).toBe(autonomy);
        expect(result.agentType).toBe('independent');
        expect(result.selfDetermined).toBe(true);
      });
    });

    test('identifies self-motivated agents', () => {
      const selfMotivatedAgents = [
        { agent: 'छात्र', motivation: 'internal', drive: 'self_initiated' },
        { agent: 'कलाकार', motivation: 'creative', drive: 'artistic' },
        { agent: 'योगी', motivation: 'spiritual', drive: 'transcendent' },
        { agent: 'वैज्ञानिक', motivation: 'intellectual', drive: 'discovery' }
      ];
      
      selfMotivatedAgents.forEach(({ agent, motivation, drive }) => {
        const result = sutra1454(agent, {
          verb: 'प्रवर्तते',
          action: 'प्रवृत्ति',
          motivationType: motivation,
          driveSource: drive,
          selfMotivated: true,
          externalCompulsion: false
        });
        
        expect(result.applies).toBe(true);
        expect(result.motivationType).toBe(motivation);
        expect(result.driveSource).toBe(drive);
        expect(result.selfMotivated).toBe(true);
        expect(result.externalCompulsion).toBe(false);
      });
    });

    test('identifies autonomous decision makers', () => {
      const autonomousAgents = [
        { agent: 'नृप', decisionMaking: 'sovereign', authority: 'absolute' },
        { agent: 'मुनि', decisionMaking: 'wisdom_based', authority: 'spiritual' },
        { agent: 'आचार्य', decisionMaking: 'knowledge_based', authority: 'educational' },
        { agent: 'पितामह', decisionMaking: 'experience_based', authority: 'familial' }
      ];
      
      autonomousAgents.forEach(({ agent, decisionMaking, authority }) => {
        const result = sutra1454(agent, {
          verb: 'निर्णयति',
          action: 'निर्णय',
          decisionMaking: decisionMaking,
          authorityType: authority,
          autonomousChoice: true,
          independentJudgment: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.decisionMaking).toBe(decisionMaking);
        expect(result.authorityType).toBe(authority);
        expect(result.autonomousChoice).toBe(true);
      });
    });
  });

  describe('Control and agency levels', () => {
    test('analyzes high control agents', () => {
      const highControlAgents = [
        { agent: 'स्वामी', control: 'complete', domain: 'household' },
        { agent: 'सेनापति', control: 'military', domain: 'army' },
        { agent: 'न्यायाधीश', control: 'judicial', domain: 'court' },
        { agent: 'शिक्षक', control: 'educational', domain: 'classroom' }
      ];
      
      highControlAgents.forEach(({ agent, control, domain }) => {
        const result = sutra1454(agent, {
          verb: 'नियन्त्रयति',
          action: 'नियन्त्रण',
          controlLevel: control,
          controlDomain: domain,
          authorityExercise: true,
          decisionPower: 'high'
        });
        
        expect(result.applies).toBe(true);
        expect(result.controlLevel).toBe(control);
        expect(result.controlDomain).toBe(domain);
        expect(result.authorityExercise).toBe(true);
        expect(result.decisionPower).toBe('high');
      });
    });

    test('analyzes medium control agents', () => {
      const mediumControlAgents = [
        { agent: 'मन्त्री', control: 'delegated', scope: 'administrative' },
        { agent: 'अधिकारी', control: 'institutional', scope: 'departmental' },
        { agent: 'प्रबन्धक', control: 'managerial', scope: 'operational' }
      ];
      
      mediumControlAgents.forEach(({ agent, control, scope }) => {
        const result = sutra1454(agent, {
          verb: 'संचालयति',
          action: 'संचालन',
          controlLevel: control,
          controlScope: scope,
          partialAutonomy: true,
          hierarchicalPosition: 'middle'
        });
        
        expect(result.applies).toBe(true);
        expect(result.controlLevel).toBe(control);
        expect(result.controlScope).toBe(scope);
        expect(result.partialAutonomy).toBe(true);
      });
    });

    test('analyzes initiative and proactive agency', () => {
      const proactiveAgents = [
        { agent: 'उद्यमी', initiative: 'entrepreneurial', proactivity: 'high' },
        { agent: 'अन्वेषक', initiative: 'investigative', proactivity: 'research_driven' },
        { agent: 'सुधारक', initiative: 'reformative', proactivity: 'change_oriented' }
      ];
      
      proactiveAgents.forEach(({ agent, initiative, proactivity }) => {
        const result = sutra1454(agent, {
          verb: 'प्रवर्तयति',
          action: 'प्रारम्भ',
          initiativeType: initiative,
          proactivityLevel: proactivity,
          selfStarter: true,
          awaitsDirection: false
        });
        
        expect(result.applies).toBe(true);
        expect(result.initiativeType).toBe(initiative);
        expect(result.proactivityLevel).toBe(proactivity);
        expect(result.selfStarter).toBe(true);
      });
    });
  });

  describe('Primary vs secondary agency', () => {
    test('identifies primary agents', () => {
      const primaryAgents = [
        { agent: 'मुख्यकर्ता', role: 'primary', hierarchy: 'top' },
        { agent: 'प्रधानकारी', role: 'principal', hierarchy: 'chief' },
        { agent: 'अधिनायक', role: 'supreme', hierarchy: 'commander' }
      ];
      
      primaryAgents.forEach(({ agent, role, hierarchy }) => {
        const result = sutra1454(agent, {
          verb: 'नेतृत्वं करोति',
          action: 'नेतृत्व',
          agentRole: role,
          hierarchyPosition: hierarchy,
          primaryAgent: true,
          secondaryAgent: false
        });
        
        expect(result.applies).toBe(true);
        expect(result.agentRole).toBe(role);
        expect(result.hierarchyPosition).toBe(hierarchy);
        expect(result.primaryAgent).toBe(true);
        expect(result.secondaryAgent).toBe(false);
      });
    });

    test('distinguishes from dependent agents', () => {
      const result = sutra1454('मुख्यकर्ता', {
        verb: 'आज्ञापयति',
        action: 'आदेश',
        agentType: 'independent',
        dependentAgents: ['सहायक', 'अनुचर'],
        hierarchicalIndependence: true,
        commandAuthority: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.agentType).toBe('independent');
      expect(result.hierarchicalIndependence).toBe(true);
      expect(result.commandAuthority).toBe(true);
      expect(result.dependentAgents).toContain('सहायक');
    });

    test('analyzes agent hierarchy relationships', () => {
      const hierarchyRelations = [
        { primary: 'राजा', secondary: 'मन्त्री', relation: 'sovereign_minister' },
        { primary: 'गुरु', secondary: 'शिष्य', relation: 'teacher_student' },
        { primary: 'पिता', secondary: 'पुत्र', relation: 'father_son' }
      ];
      
      hierarchyRelations.forEach(({ primary, secondary, relation }) => {
        const result = sutra1454(primary, {
          verb: 'अधिष्ठाति',
          action: 'अधिष्ठान',
          primaryAgent: primary,
          secondaryAgent: secondary,
          relationshipType: relation,
          hierarchicalSupremacy: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.primaryAgent).toBe(primary);
        expect(result.relationshipType).toBe(relation);
        expect(result.hierarchicalSupremacy).toBe(true);
      });
    });
  });

  describe('Self-determination analysis', () => {
    test('identifies fully self-determined actions', () => {
      const selfDeterminedActions = [
        { action: 'स्वेच्छया गमन', determination: 'complete', choice: 'free' },
        { action: 'स्वतन्त्र निर्णय', determination: 'autonomous', choice: 'independent' },
        { action: 'स्वयं प्रेरित कार्य', determination: 'self_motivated', choice: 'internal' }
      ];
      
      selfDeterminedActions.forEach(({ action, determination, choice }) => {
        const result = sutra1454('स्वयंकर्ता', {
          verb: 'स्वयं करोति',
          action: action,
          selfDetermination: determination,
          choiceType: choice,
          externalPressure: false,
          internalMotivation: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.selfDetermination).toBe(determination);
        expect(result.choiceType).toBe(choice);
        expect(result.externalPressure).toBe(false);
        expect(result.internalMotivation).toBe(true);
      });
    });

    test('analyzes voluntary vs involuntary agency', () => {
      const voluntaryAgents = [
        { agent: 'स्वेच्छाकारी', voluntariness: 'complete', coercion: 'none' },
        { agent: 'इच्छुक', voluntariness: 'willing', coercion: 'none' },
        { agent: 'स्वयंसेवक', voluntariness: 'self_volunteered', coercion: 'none' }
      ];
      
      voluntaryAgents.forEach(({ agent, voluntariness, coercion }) => {
        const result = sutra1454(agent, {
          verb: 'स्वेच्छया करोति',
          action: 'स्वैच्छिक कार्य',
          voluntariness: voluntariness,
          coercionLevel: coercion,
          freewill: true,
          compulsion: false
        });
        
        expect(result.applies).toBe(true);
        expect(result.voluntariness).toBe(voluntariness);
        expect(result.coercionLevel).toBe(coercion);
        expect(result.freewill).toBe(true);
        expect(result.compulsion).toBe(false);
      });
    });

    test('identifies conscious and deliberate agents', () => {
      const consciousAgents = [
        { agent: 'सचेतन', consciousness: 'full', deliberation: 'careful' },
        { agent: 'विवेकी', consciousness: 'discriminating', deliberation: 'wise' },
        { agent: 'सुविचारित', consciousness: 'thoughtful', deliberation: 'considered' }
      ];
      
      consciousAgents.forEach(({ agent, consciousness, deliberation }) => {
        const result = sutra1454(agent, {
          verb: 'विचार्य करोति',
          action: 'सविचार कार्य',
          consciousnessLevel: consciousness,
          deliberationType: deliberation,
          mindfulAction: true,
          automaticResponse: false
        });
        
        expect(result.applies).toBe(true);
        expect(result.consciousnessLevel).toBe(consciousness);
        expect(result.deliberationType).toBe(deliberation);
        expect(result.mindfulAction).toBe(true);
      });
    });
  });

  describe('Institutional and collective agency', () => {
    test('analyzes institutional agents', () => {
      const institutionalAgents = [
        { institution: 'सभा', type: 'assembly', authority: 'collective' },
        { institution: 'न्यायालय', type: 'court', authority: 'judicial' },
        { institution: 'विद्यालय', type: 'school', authority: 'educational' },
        { institution: 'मन्दिर', type: 'temple', authority: 'religious' }
      ];
      
      institutionalAgents.forEach(({ institution, type, authority }) => {
        const result = sutra1454(institution, {
          verb: 'संचालयति',
          action: 'संस्थागत कार्य',
          institutionType: type,
          institutionalAuthority: authority,
          collectiveAgent: true,
          individualAgent: false
        });
        
        expect(result.applies).toBe(true);
        expect(result.institutionType).toBe(type);
        expect(result.institutionalAuthority).toBe(authority);
        expect(result.collectiveAgent).toBe(true);
      });
    });

    test('analyzes collective decision making', () => {
      const collectiveAgents = [
        { group: 'पञ्चायत', decision: 'consensus', process: 'deliberative' },
        { group: 'समिति', decision: 'committee', process: 'consultative' },
        { group: 'मण्डल', decision: 'board', process: 'administrative' }
      ];
      
      collectiveAgents.forEach(({ group, decision, process }) => {
        const result = sutra1454(group, {
          verb: 'निर्णयं करोति',
          action: 'सामूहिक निर्णय',
          collectiveGroup: group,
          decisionType: decision,
          decisionProcess: process,
          groupAutonomy: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.collectiveGroup).toBe(group);
        expect(result.decisionType).toBe(decision);
        expect(result.decisionProcess).toBe(process);
        expect(result.groupAutonomy).toBe(true);
      });
    });

    test('handles corporate and organizational agency', () => {
      const organizationalAgents = [
        { org: 'निगम', structure: 'corporate', governance: 'board_driven' },
        { org: 'संघ', structure: 'union', governance: 'member_driven' },
        { org: 'समुदाय', structure: 'community', governance: 'consensus_driven' }
      ];
      
      organizationalAgents.forEach(({ org, structure, governance }) => {
        const result = sutra1454(org, {
          verb: 'व्यापारं करोति',
          action: 'संगठनात्मक कार्य',
          organizationType: structure,
          governanceModel: governance,
          organizationalIndependence: true,
          structuredAgency: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.organizationType).toBe(structure);
        expect(result.governanceModel).toBe(governance);
        expect(result.organizationalIndependence).toBe(true);
      });
    });
  });

  describe('Abstract and metaphorical agency', () => {
    test('identifies abstract agents', () => {
      const abstractAgents = [
        { agent: 'काल', abstraction: 'time', agency: 'temporal' },
        { agent: 'भाग्य', abstraction: 'fate', agency: 'causal' },
        { agent: 'प्रकृति', abstraction: 'nature', agency: 'natural' },
        { agent: 'नियति', abstraction: 'destiny', agency: 'predetermined' }
      ];
      
      abstractAgents.forEach(({ agent, abstraction, agency }) => {
        const result = sutra1454(agent, {
          verb: 'प्रभावितं करोति',
          action: 'प्रभाव',
          abstractionType: abstraction,
          agencyType: agency,
          metaphoricalAgent: true,
          concreteAgent: false
        });
        
        expect(result.applies).toBe(true);
        expect(result.abstractionType).toBe(abstraction);
        expect(result.agencyType).toBe(agency);
        expect(result.metaphoricalAgent).toBe(true);
      });
    });

    test('analyzes personified concepts', () => {
      const personifiedConcepts = [
        { concept: 'सरस्वती', personification: 'wisdom', domain: 'knowledge' },
        { concept: 'लक्ष्मी', personification: 'prosperity', domain: 'wealth' },
        { concept: 'दुर्गा', personification: 'power', domain: 'protection' }
      ];
      
      personifiedConcepts.forEach(({ concept, personification, domain }) => {
        const result = sutra1454(concept, {
          verb: 'प्रदाति',
          action: 'प्रदान',
          personificationType: personification,
          conceptualDomain: domain,
          divinizedAgent: true,
          anthropomorphicAgency: true
        });
        
        expect(result.applies).toBe(true);
        expect(result.personificationType).toBe(personification);
        expect(result.conceptualDomain).toBe(domain);
        expect(result.divinizedAgent).toBe(true);
      });
    });

    test('handles literary and poetic agency', () => {
      const poeticAgents = [
        { agent: 'चन्द्र', poetic: 'moon', emotion: 'romantic' },
        { agent: 'वायु', poetic: 'wind', emotion: 'dynamic' },
        { agent: 'अग्नि', poetic: 'fire', emotion: 'passionate' }
      ];
      
      poeticAgents.forEach(({ agent, poetic, emotion }) => {
        const result = sutra1454(agent, {
          verb: 'प्रेरयति',
          action: 'काव्यात्मक प्रेरणा',
          poeticElement: poetic,
          emotionalResonance: emotion,
          literaryAgent: true,
          prosaicAgent: false
        });
        
        expect(result.applies).toBe(true);
        expect(result.poeticElement).toBe(poetic);
        expect(result.emotionalResonance).toBe(emotion);
        expect(result.literaryAgent).toBe(true);
      });
    });
  });

  describe('Multi-script support', () => {
    test('handles Devanagari input', () => {
      const result = sutra1454('स्वतन्त्र', {
        verb: 'करोति',
        action: 'कार्य',
        script: 'Devanagari',
        independence: 'full'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('Devanagari');
    });

    test('handles IAST input', () => {
      const result = sutra1454('svatantra', {
        verb: 'karoti',
        action: 'kārya',
        script: 'IAST',
        independence: 'full'
      });
      
      expect(result.applies).toBe(true);
      expect(result.script).toBe('IAST');
    });
  });

  describe('Error handling', () => {
    test('handles empty input', () => {
      const result = sutra1454('');
      expect(result.applies).toBe(false);
      expect(result.error).toBe('empty_input');
    });

    test('handles non-independent agents', () => {
      const result = sutra1454('आश्रित', {
        verb: 'करोति',
        action: 'कार्य',
        independence: 'none',
        dependence: 'complete',
        autonomous: false
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('not_independent_agent');
    });

    test('handles forced or coerced agents', () => {
      const result = sutra1454('बाध्यकर्ता', {
        verb: 'करोति',
        action: 'कार्य',
        coercion: 'forced',
        voluntariness: 'none',
        independence: 'constrained'
      });
      expect(result.applies).toBe(false);
      expect(result.reason).toBe('coerced_agent_not_independent');
    });

    test('handles invalid Sanskrit input', () => {
      const result = sutra1454('xyz123agent', {
        verb: 'does',
        action: 'work'
      });
      expect(result.applies).toBe(false);
      expect(result.error).toBe('invalid_sanskrit_input');
    });
  });

  describe('Integration with कारक system', () => {
    test('establishes foundation for कारक relations', () => {
      const result = sutra1454('आधारकर्ता', {
        verb: 'आधारीकरोति',
        action: 'आधारण',
        foundationalRole: true,
        centralKaraka: true,
        otherKarakasDependent: true,
        karakaHierarchy: 'primary'
      });
      
      expect(result.applies).toBe(true);
      expect(result.foundationalRole).toBe(true);
      expect(result.centralKaraka).toBe(true);
      expect(result.karakaHierarchy).toBe('primary');
    });

    test('relates to other कारक sutras', () => {
      const result = sutra1454('संबद्धकर्ता', {
        verb: 'संबन्धयति',
        action: 'संबन्ध',
        relatedToKarana: true, // 1.4.42
        relatedToKarma: true, // 1.4.49
        relatedToSampradan: true, // 1.4.32
        karakaIntegration: 'complete'
      });
      
      expect(result.applies).toBe(true);
      expect(result.relatedToKarana).toBe(true);
      expect(result.relatedToKarma).toBe(true);
      expect(result.karakaIntegration).toBe('complete');
    });

    test('distinguishes from other कारक types', () => {
      const result = sutra1454('विशिष्टकर्ता', {
        verb: 'विशेषयति',
        action: 'विशेषण',
        notKarana: true,
        notKarma: true,
        notSampradan: true,
        notAdhikarana: true,
        uniquelyKarta: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.notKarana).toBe(true);
      expect(result.notKarma).toBe(true);
      expect(result.uniquelyKarta).toBe(true);
    });
  });

  describe('Edge cases', () => {
    test('handles delegated authority agents', () => {
      const result = sutra1454('प्रतिनिधि', {
        verb: 'प्रतिनिधित्वं करोति',
        action: 'प्रतिनिधित्व',
        delegatedAuthority: true,
        originalPrincipal: 'मूलस्वामी',
        autonomyWithinLimits: true,
        representativeAgency: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.delegatedAuthority).toBe(true);
      expect(result.autonomyWithinLimits).toBe(true);
      expect(result.representativeAgency).toBe(true);
    });

    test('handles conditional independence', () => {
      const result = sutra1454('सशर्तस्वतन्त्र', {
        verb: 'सशर्तं करोति',
        action: 'सशर्त कार्य',
        conditionalIndependence: true,
        dependencyConditions: ['समय', 'स्थान', 'परिस्थिति'],
        limitedAutonomy: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.conditionalIndependence).toBe(true);
      expect(result.limitedAutonomy).toBe(true);
      expect(result.dependencyConditions).toHaveLength(3);
    });

    test('handles emergent and situational agency', () => {
      const result = sutra1454('आकस्मिककर्ता', {
        verb: 'आपत्कालीनं करोति',
        action: 'आपातकालीन कार्य',
        emergentAgency: true,
        situationalIndependence: true,
        temporaryAutonomy: true,
        contextualAgency: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.emergentAgency).toBe(true);
      expect(result.situationalIndependence).toBe(true);
      expect(result.temporaryAutonomy).toBe(true);
    });

    test('handles recursive and self-referential agency', () => {
      const result = sutra1454('स्वयंसन्दर्भी', {
        verb: 'स्वयं स्वयंविषये करोति',
        action: 'स्वसन्दर्भ',
        selfReferential: true,
        recursiveAgency: true,
        reflexiveAction: true,
        metaAgency: true
      });
      
      expect(result.applies).toBe(true);
      expect(result.selfReferential).toBe(true);
      expect(result.recursiveAgency).toBe(true);
      expect(result.reflexiveAction).toBe(true);
      expect(result.metaAgency).toBe(true);
    });
  });
});
