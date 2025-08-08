/**
 * Test cases for Sutra 1.1.5: क्क्ङिति च (kakaṅiti ca)
 * 
 * This file contains comprehensive test cases with real Sanskrit words
 * for checking it-markers and their blocking effects on guṇa/vṛddhi transformations.
 * 
 * Focus: Complete Sanskrit words in Devanagari with proper transliteration
 */

export const testCases = {
    // Test cases for क् (k) it-marker affixes - Real Sanskrit formations
    kitMarkerAffixes: [
        // Past participle formations with कत्
        { affix: 'kta', hasKit: true, description: 'Past participle suffix कत्', devanagari: 'कत्' },
        { affix: 'कत्', hasKit: true, description: 'Past participle suffix (Devanagari)', devanagari: 'कत्' },
        { affix: 'ktva', hasKit: true, description: 'Absolutive suffix कत्वा', devanagari: 'कत्वा' },
        { affix: 'कत्वा', hasKit: true, description: 'Absolutive suffix (Devanagari)', devanagari: 'कत्वा' },
        { affix: 'kvip', hasKit: true, description: 'Agent noun suffix कुप्', devanagari: 'कुप्' },
        { affix: 'कुप्', hasKit: true, description: 'Agent noun suffix (Devanagari)', devanagari: 'कुप्' },
        { affix: 'kvan', hasKit: true, description: 'Possessive suffix कुअन्', devanagari: 'कुअन्' },
        { affix: 'कुअन्', hasKit: true, description: 'Possessive suffix (Devanagari)', devanagari: 'कुअन्' },
        { affix: 'ktavat', hasKit: true, description: 'Perfect participle कतवत्', devanagari: 'कतवत्' },
        { affix: 'कतवत्', hasKit: true, description: 'Perfect participle (Devanagari)', devanagari: 'कतवत्' },
        { affix: 'ktin', hasKit: true, description: 'Infinitive suffix कतिन्', devanagari: 'कतिन्' },
        { affix: 'कतिन्', hasKit: true, description: 'Infinitive suffix (Devanagari)', devanagari: 'कतिन्' }
    ],

    // Test cases for ग् (g) it-marker affixes - Real Sanskrit formations  
    gitMarkerAffixes: [
        { affix: 'gha', hasGit: true, description: 'Abstract noun suffix घ', devanagari: 'घ' },
        { affix: 'घ', hasGit: true, description: 'Abstract noun suffix (Devanagari)', devanagari: 'घ' },
        { affix: 'ghañ', hasGit: true, description: 'Action noun suffix घञ्', devanagari: 'घञ्' },
        { affix: 'घञ्', hasGit: true, description: 'Action noun suffix (Devanagari)', devanagari: 'घञ्' },
        { affix: 'ghan', hasGit: true, description: 'Instrumental suffix घन्', devanagari: 'घन्' },
        { affix: 'घन्', hasGit: true, description: 'Instrumental suffix (Devanagari)', devanagari: 'घन्' },
        { affix: 'ga', hasGit: true, description: 'Movement suffix ग', devanagari: 'ग' },
        { affix: 'ग', hasGit: true, description: 'Movement suffix (Devanagari)', devanagari: 'ग' }
    ],

    // Test cases for ङ् (ṅ) it-marker affixes - Real Sanskrit formations
    ngitMarkerAffixes: [
        { affix: 'ṅa', hasNgit: true, description: 'Quality noun suffix ङ', devanagari: 'ङ' },
        { affix: 'ङ', hasNgit: true, description: 'Quality noun suffix (Devanagari)', devanagari: 'ङ' },
        { affix: 'ṅīp', hasNgit: true, description: 'Feminine suffix ङीप्', devanagari: 'ङीप्' },
        { affix: 'ङीप्', hasNgit: true, description: 'Feminine suffix (Devanagari)', devanagari: 'ङीप्' },
        { affix: 'ṅīn', hasNgit: true, description: 'Possessive suffix ङीन्', devanagari: 'ङीन्' },
        { affix: 'ङीन्', hasNgit: true, description: 'Possessive suffix (Devanagari)', devanagari: 'ङीन्' },
        { affix: 'aṅ', hasNgit: true, description: 'Limb suffix अङ्', devanagari: 'अङ्' },
        { affix: 'अङ्', hasNgit: true, description: 'Limb suffix (Devanagari)', devanagari: 'अङ्' }
    ],

    // Test cases for affixes without it-markers - Regular Sanskrit affixes
    nonItMarkerAffixes: [
        { affix: 'ti', hasItMarkers: false, description: 'Present 3rd person ति', devanagari: 'ति' },
        { affix: 'ति', hasItMarkers: false, description: 'Present 3rd person (Devanagari)', devanagari: 'ति' },
        { affix: 'tas', hasItMarkers: false, description: 'Present 3rd dual तस्', devanagari: 'तस्' },
        { affix: 'तस्', hasItMarkers: false, description: 'Present 3rd dual (Devanagari)', devanagari: 'तस्' },
        { affix: 'ya', hasItMarkers: false, description: 'Gerundive suffix य', devanagari: 'य' },
        { affix: 'य', hasItMarkers: false, description: 'Gerundive suffix (Devanagari)', devanagari: 'य' },
        { affix: 'tvā', hasItMarkers: false, description: 'Absolutive त्वा (unmarked)', devanagari: 'त्वा' },
        { affix: 'त्वा', hasItMarkers: false, description: 'Absolutive (unmarked, Devanagari)', devanagari: 'त्वा' },
        { affix: 'ana', hasItMarkers: false, description: 'Action noun अन', devanagari: 'अन' },
        { affix: 'अन', hasItMarkers: false, description: 'Action noun (Devanagari)', devanagari: 'अन' }
    ],

    // Real Sanskrit words - Complete dhātu + प्रत्यय combinations that BLOCK guṇa/vṛddhi
    completesanskritBlockingWords: [
        // √कृ (कर्-) formations with कित् affixes
        { 
            dhatu: 'कृ', dhatuMeaning: 'to do, make', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'कृत', resultMeaning: 'done, made',
            blocked: 'केृत', description: 'कृ + कत् → कृत (not केृत)',
            analysis: 'Kit affix blocks guṇa i→e transformation'
        },
        { 
            dhatu: 'कृ', dhatuMeaning: 'to do, make', 
            affix: 'कत्वा', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'कृत्वा', resultMeaning: 'having done',
            blocked: 'केृत्वा', description: 'कृ + कत्वा → कृत्वा (not केृत्वा)',
            analysis: 'Kit affix blocks guṇa transformation in absolutive'
        },

        // √गम् (गच्छ्-) formations with कित् affixes
        { 
            dhatu: 'गम्', dhatuMeaning: 'to go', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'गत', resultMeaning: 'gone',
            blocked: 'गेमत्', description: 'गम् + कत् → गत (not गेमत्)',
            analysis: 'Kit affix prevents guṇa a→e in past participle'
        },
        { 
            dhatu: 'गम्', dhatuMeaning: 'to go', 
            affix: 'कत्वा', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'गत्वा', resultMeaning: 'having gone',
            blocked: 'गेमत्वा', description: 'गम् + कत्वा → गत्वा (not गेमत्वा)',
            analysis: 'Absolutive with kit affix blocks vowel strengthening'
        },

        // √भू (भव्-) formations with कित् affixes
        { 
            dhatu: 'भू', dhatuMeaning: 'to be, become', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'भूत', resultMeaning: 'been, become',
            blocked: 'भोत्', description: 'भू + कत् → भूत (not भोत्)',
            analysis: 'Kit affix prevents guṇa ū→o transformation'
        },

        // √स्था (तिष्ठ्-) formations with कित् affixes
        { 
            dhatu: 'स्था', dhatuMeaning: 'to stand', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'स्थित', resultMeaning: 'stood, situated',
            blocked: 'स्थात्', description: 'स्था + कत् → स्थित (not स्थात्)',
            analysis: 'Kit affix prevents guṇa ā→ā transformation'
        },

        // √दा (दद्-) formations with कित् affixes
        { 
            dhatu: 'दा', dhatuMeaning: 'to give', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'दत्त', resultMeaning: 'given',
            blocked: 'दात्', description: 'दा + कत् → दत्त (not दात्)',
            analysis: 'Kit affix with dhātu modification'
        },

        // √हन् (हन्-) formations with कित् affixes
        { 
            dhatu: 'हन्', dhatuMeaning: 'to kill, strike', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'हत', resultMeaning: 'killed, struck',
            blocked: 'हान्त्', description: 'हन् + कत् → हत (not हान्त्)',
            analysis: 'Kit affix with consonant deletion'
        },

        // √नी (नय्-) formations with कित् affixes
        { 
            dhatu: 'नी', dhatuMeaning: 'to lead, take', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'नीत', resultMeaning: 'led, taken',
            blocked: 'नेत्', description: 'नी + कत् → नीत (not नेत्)',
            analysis: 'Kit affix blocks ī→e transformation'
        },

        // √वद् (वद्-) formations with कित् affixes
        { 
            dhatu: 'वद्', dhatuMeaning: 'to speak, say', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'उदित', resultMeaning: 'spoken',
            blocked: 'वादित्', description: 'वद् + कत् → उदित (not वादित्)',
            analysis: 'Kit affix with irregular formation'
        },

        // √बुध् (बुध्-) formations with कित् affixes
        { 
            dhatu: 'बुध्', dhatuMeaning: 'to know, wake', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'बुद्ध', resultMeaning: 'awakened, known',
            blocked: 'बोधित्', description: 'बुध् + कत् → बुद्ध (not बोधित्)',
            analysis: 'Kit affix prevents u→o guṇa'
        },

        // √युज् (योग्-) formations with कित् affixes
        { 
            dhatu: 'युज्', dhatuMeaning: 'to join, unite', 
            affix: 'कत्', affixType: 'kit', 
            operation: 'guna', shouldBlock: true, 
            result: 'युक्त', resultMeaning: 'joined, united',
            blocked: 'योजित्', description: 'युज् + कत् → युक्त (not योजित्)',
            analysis: 'Kit affix preserves u vowel'
        },

        // Formations with गित् affixes
        { 
            dhatu: 'यज्', dhatuMeaning: 'to sacrifice', 
            affix: 'घञ्', affixType: 'git', 
            operation: 'guna', shouldBlock: true, 
            result: 'यागः', resultMeaning: 'sacrifice',
            blocked: 'याजः', description: 'यज् + घञ् → यागः (not याजः)',
            analysis: 'Git affix creates action noun without guṇa'
        },
        { 
            dhatu: 'त्यज्', dhatuMeaning: 'to abandon', 
            affix: 'घञ्', affixType: 'git', 
            operation: 'guna', shouldBlock: true, 
            result: 'त्यागः', resultMeaning: 'abandonment',
            blocked: 'त्याजः', description: 'त्यज् + घञ् → त्यागः (not त्याजः)',
            analysis: 'Git affix in compound formation'
        },

        // Formations with ङित् affixes
        { 
            dhatu: 'शुक्ल', dhatuMeaning: 'white', 
            affix: 'ङ', affixType: 'ṅit', 
            operation: 'guna', shouldBlock: true, 
            result: 'शुक्ल', resultMeaning: 'white (adj.)',
            blocked: 'शोक्ल', description: 'शुक्ल + ङ → शुक्ल (not शोक्ल)',
            analysis: 'Ṅit affix preserves base form'
        }
    ],

    // Real Sanskrit words - Complete dhātu + प्रत्यय combinations that ALLOW guṇa/vṛddhi
    completeSanskritAllowingWords: [
        // Present tense formations (no it-markers)
        { 
            dhatu: 'कृ', dhatuMeaning: 'to do, make', 
            affix: 'ति', affixType: 'sārvadhātuka', 
            operation: 'guna', shouldBlock: false, 
            result: 'करोति', resultMeaning: 'he/she does',
            withGuna: 'करोति', description: 'कृ + ति → करोति (with guṇa)',
            analysis: 'Regular present tense with guṇa ṛ→ar'
        },
        { 
            dhatu: 'नी', dhatuMeaning: 'to lead', 
            affix: 'ति', affixType: 'sārvadhātuka', 
            operation: 'guna', shouldBlock: false, 
            result: 'नयति', resultMeaning: 'he/she leads',
            withGuna: 'नयति', description: 'नी + ति → नयति (with guṇa)',
            analysis: 'Regular present tense with guṇa ī→ay'
        },
        { 
            dhatu: 'भू', dhatuMeaning: 'to be', 
            affix: 'ति', affixType: 'sārvadhātuka', 
            operation: 'guna', shouldBlock: false, 
            result: 'भवति', resultMeaning: 'he/she becomes',
            withGuna: 'भवति', description: 'भू + ति → भवति (with guṇa)',
            analysis: 'Regular present tense with guṇa ū→av'
        },
        { 
            dhatu: 'गम्', dhatuMeaning: 'to go', 
            affix: 'ति', affixType: 'sārvadhātuka', 
            operation: 'guna', shouldBlock: false, 
            result: 'गच्छति', resultMeaning: 'he/she goes',
            withGuna: 'गच्छति', description: 'गम् + ति → गच्छति (special form)',
            analysis: 'Special present class formation'
        },
        { 
            dhatu: 'वद्', dhatuMeaning: 'to speak', 
            affix: 'ति', affixType: 'sārvadhātuka', 
            operation: 'guna', shouldBlock: false, 
            result: 'वदति', resultMeaning: 'he/she speaks',
            withGuna: 'वदति', description: 'वद् + ति → वदति (no change needed)',
            analysis: 'Regular present tense, a vowel unchanged'
        },

        // Gerundive formations (unmarked त्वा)
        { 
            dhatu: 'कृ', dhatuMeaning: 'to do', 
            affix: 'त्वा', affixType: 'unmarked', 
            operation: 'guna', shouldBlock: false, 
            result: 'कृत्वा', resultMeaning: 'having done',
            withGuna: 'कृत्वा', description: 'कृ + त्वा → कृत्वा (unmarked absolutive)',
            analysis: 'Unmarked absolutive allows normal formation'
        },

        // Action noun formations (unmarked अन)
        { 
            dhatu: 'गम्', dhatuMeaning: 'to go', 
            affix: 'अन', affixType: 'unmarked', 
            operation: 'guna', shouldBlock: false, 
            result: 'गमन', resultMeaning: 'going',
            withGuna: 'गमन', description: 'गम् + अन → गमन',
            analysis: 'Regular action noun formation'
        },
        { 
            dhatu: 'दृश्', dhatuMeaning: 'to see', 
            affix: 'अन', affixType: 'unmarked', 
            operation: 'guna', shouldBlock: false, 
            result: 'दर्शन', resultMeaning: 'seeing, vision',
            withGuna: 'दर्शन', description: 'दृश् + अन → दर्शन (with guṇa)',
            analysis: 'Guṇa ṛ→ar in action noun'
        }
    ],

    // Agent noun formations comparing कित् vs unmarked
    agentNounComparisons: [
        {
            dhatu: 'कृ', meaning: 'to do',
            kitForm: { affix: 'कुप्', result: 'कृत्', meaning: 'doer (kit)' },
            regularForm: { affix: 'तृ', result: 'कर्तृ', meaning: 'doer (regular)' },
            analysis: 'Kit form preserves root, regular form shows guṇa'
        },
        {
            dhatu: 'गम्', meaning: 'to go', 
            kitForm: { affix: 'कुप्', result: 'गत्', meaning: 'goer (kit)' },
            regularForm: { affix: 'तृ', result: 'गन्तृ', meaning: 'goer (regular)' },
            analysis: 'Kit vs regular agent noun formation'
        }
    ],

    // Feminine formations with ङित् affixes
    feminineFormations: [
        {
            base: 'गौर', baseMeaning: 'fair, white',
            affix: 'ङीप्', affixType: 'ṅit',
            result: 'गौरी', resultMeaning: 'fair lady',
            analysis: 'Ṅit affix creates feminine without vowel change'
        },
        {
            base: 'शुक्ल', baseMeaning: 'white',
            affix: 'ङ', affixType: 'ṅit', 
            result: 'शुक्ला', resultMeaning: 'white (fem.)',
            analysis: 'Ṅit quality adjective formation'
        }
    ]
};

export default testCases;
