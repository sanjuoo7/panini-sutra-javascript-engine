/**
 * Test Cases for Sutra 1.1.31: द्वन्द्वे च (dvandve ca)
 * "And in Collective Compound (द्वन्द्व), the words सर्व etc. are not सर्वनाम।"
 */

export const testCases = {
  // Basic dvandva detection
  dvandvaDetection: [
    {
      input: { compound: 'sarvānya', context: { compoundType: 'dvandva' } },
      expected: true,
      description: 'Explicit dvandva marking'
    },
    {
      input: { compound: 'viśvubha', context: { compoundType: 'copulative' } },
      expected: true,
      description: 'Copulative compound marking'
    },
    {
      input: { compound: 'ekadvi', context: { compoundType: 'collective' } },
      expected: true,
      description: 'Collective compound marking'
    },
    {
      input: { compound: 'compound', context: { semanticRelation: 'coordination' } },
      expected: true,
      description: 'Coordination semantic relation'
    },
    {
      input: { compound: 'sarvaca' },
      expected: true,
      description: 'Compound containing ca marker'
    },
    {
      input: { compound: 'विश्वच' },
      expected: true,
      description: 'Devanagari compound with च marker'
    },
    {
      input: { compound: 'compound', context: { hasConjunction: true } },
      expected: true,
      description: 'Explicit conjunction marker'
    }
  ],

  // Sarvaname loss in dvandva
  sarvanameLoss: [
    {
      input: { word: 'sarva', context: { compound: 'sarvānya', compoundType: 'dvandva' } },
      expected: true,
      description: 'sarva loses sarvaname status in dvandva'
    },
    {
      input: { word: 'viśva', context: { compound: 'viśvubha', compoundType: 'dvandva' } },
      expected: true,
      description: 'viśva loses sarvaname status in dvandva'
    },
    {
      input: { word: 'anya', context: { compound: 'sarvānya', compoundType: 'dvandva' } },
      expected: true,
      description: 'anya loses sarvaname status in dvandva'
    },
    {
      input: { word: 'सर्व', context: { compound: 'सर्वान्य', compoundType: 'dvandva' } },
      expected: true,
      description: 'Devanagari sarva loses sarvaname status'
    },
    {
      input: { word: 'रामा', context: { compound: 'compound', compoundType: 'dvandva' } },
      expected: false,
      description: 'Non-sarva words unaffected'
    }
  ],

  // Sarvaname classification with sutra application
  sarvanameClassification: [
    {
      input: { word: 'sarva', context: { compound: 'sarvānya', compoundType: 'dvandva' } },
      expected: false,
      description: 'sarva is not sarvaname in dvandva'
    },
    {
      input: { word: 'anya', context: { compound: 'sarvānya', compoundType: 'dvandva' } },
      expected: false,
      description: 'anya is not sarvaname in dvandva'
    },
    {
      input: { word: 'sarva', context: { compound: 'sarvaloka', compoundType: 'tatpurusha' } },
      expected: true,
      description: 'sarva remains sarvaname in other compounds'
    },
    {
      input: { word: 'रामा', context: { compoundType: 'dvandva' } },
      expected: false,
      description: 'Non-sarva words are never sarvaname'
    }
  ],

  // Dvandva analysis
  dvandvaAnalysis: [
    {
      input: { 
        compound: 'sarvānya', 
        constituents: ['sarva', 'anya'], 
        context: { compoundType: 'dvandva' } 
      },
      expected: {
        isDvandva: true,
        sutraApplied: true,
        sarvanameWords: [],
        nonSarvanameWords: ['sarva', 'anya']
      },
      description: 'Complete dvandva analysis'
    },
    {
      input: { 
        compound: 'sarvaloka', 
        constituents: ['sarva', 'loka'], 
        context: { compoundType: 'tatpurusha' } 
      },
      expected: {
        isDvandva: false,
        sutraApplied: false,
        sarvanameWords: ['sarva'],
        nonSarvanameWords: ['loka']
      },
      description: 'Non-dvandva analysis'
    }
  ],

  // Pattern analysis
  patternAnalysis: [
    {
      input: { compound: 'sarvānya', constituents: ['sarva', 'anya'] },
      expected: {
        pattern: 'simple',
        isIterative: false,
        hasAlternation: false,
        semanticGroup: 'pronouns'
      },
      description: 'Simple coordinative pattern'
    },
    {
      input: { compound: 'sarvaviśvaanya', constituents: ['sarva', 'viśva', 'anya'] },
      expected: {
        pattern: 'iterative',
        isIterative: true,
        hasAlternation: false,
        semanticGroup: 'pronouns'
      },
      description: 'Iterative collective pattern'
    },
    {
      input: { compound: 'sarva-vā-anya', constituents: ['sarva', 'anya'] },
      expected: {
        pattern: 'alternative',
        isIterative: false,
        hasAlternation: true,
        semanticGroup: 'pronouns'
      },
      description: 'Alternative pattern with vā'
    },
    {
      input: { compound: 'mātāpitā', constituents: ['mātā', 'pitā'] },
      expected: {
        semanticGroup: 'kinship'
      },
      description: 'Kinship semantic group'
    },
    {
      input: { compound: 'uttaradakṣiṇa', constituents: ['uttara', 'dakṣiṇa'] },
      expected: {
        semanticGroup: 'directions'
      },
      description: 'Directions semantic group'
    },
    {
      input: { compound: 'ekadvi', constituents: ['eka', 'dvi'] },
      expected: {
        semanticGroup: 'numbers'
      },
      description: 'Numbers semantic group'
    }
  ],

  // Examples for educational purposes
  examples: {
    iast: {
      simpleCoordinative: [
        { compound: 'sarvānya', description: 'sarva + anya = all and other' },
        { compound: 'viśvubha', description: 'viśva + ubha = universe and both' },
        { compound: 'ekadvi', description: 'eka + dvi = one and two' },
        { compound: 'pūrvapara', description: 'pūrva + para = previous and next' },
        { compound: 'uttaradakṣiṇa', description: 'uttara + dakṣiṇa = north and south' }
      ],
      iterativeCollective: [
        { compound: 'sarvaviśvānya', description: 'sarva + viśva + anya = all, universe, and other' },
        { compound: 'ekadvitri', description: 'eka + dvi + tri = one, two, and three' },
        { compound: 'pūrvaparānta', description: 'pūrva + para + anta = previous, next, and end' }
      ]
    },
    devanagari: {
      simpleCoordinative: [
        { compound: 'सर्वान्य', description: 'सर्व + अन्य = all and other' },
        { compound: 'विश्वउभ', description: 'विश्व + उभ = universe and both' },
        { compound: 'एकद्वि', description: 'एक + द्वि = one and two' },
        { compound: 'पूर्वपर', description: 'पूर्व + पर = previous and next' },
        { compound: 'उत्तरदक्षिण', description: 'उत्तर + दक्षिण = north and south' }
      ],
      iterativeCollective: [
        { compound: 'सर्वविश्वान्य', description: 'सर्व + विश्व + अन्य = all, universe, and other' },
        { compound: 'एकद्वित्रि', description: 'एक + द्वि + त्रि = one, two, and three' },
        { compound: 'पूर्वपरान्त', description: 'पूर्व + पर + अन्त = previous, next, and end' }
      ]
    }
  },

  // Combined analysis with sutra 1.1.30
  combinedAnalysis: [
    {
      input: { 
        compound: 'sarvānya', 
        constituents: ['sarva', 'anya'], 
        context: { compoundType: 'dvandva' } 
      },
      expected: {
        dvandva: { isDvandva: true, sutraApplied: true },
        tritiyasamasa: { isTritiyasamasa: false },
        exceptionsApplied: { sutra1130: false, sutra1131: true },
        recommendation: 'सर्वनाम exceptions apply due to compound type'
      },
      description: 'Dvandva compound analysis'
    },
    {
      input: { 
        compound: 'sarvakāma', 
        constituents: ['sarva', 'kāma'], 
        context: { compoundType: 'tritiyasamasa' } 
      },
      expected: {
        dvandva: { isDvandva: false },
        tritiyasamasa: { isTritiyasamasa: true },
        exceptionsApplied: { sutra1130: true, sutra1131: false },
        recommendation: 'सर्वनाम exceptions apply due to compound type'
      },
      description: 'Tritiyasamasa compound analysis'
    },
    {
      input: { 
        compound: 'sarvaloka', 
        constituents: ['sarva', 'loka'], 
        context: { compoundType: 'tatpurusha' } 
      },
      expected: {
        dvandva: { isDvandva: false },
        tritiyasamasa: { isTritiyasamasa: false },
        exceptionsApplied: { sutra1130: false, sutra1131: false },
        recommendation: 'Normal सर्वनाम classification applies'
      },
      description: 'Normal compound analysis'
    }
  ],

  // Edge cases
  edgeCases: [
    {
      input: { compound: null },
      expected: false,
      description: 'Null compound'
    },
    {
      input: { compound: '' },
      expected: false,
      description: 'Empty compound'
    },
    {
      input: { word: null, context: {} },
      expected: false,
      description: 'Null word'
    },
    {
      input: { word: 'sarva' }, // no context
      expected: true,
      description: 'Missing context defaults to normal classification'
    },
    {
      input: { compound: 'compound', constituents: null },
      expected: {
        isDvandva: false,
        sarvanameWords: [],
        nonSarvanameWords: [],
        sutraApplied: false
      },
      description: 'Null constituents array'
    }
  ]
};

export const validationCases = [
  {
    compound: 'sarvānya',
    analysis: { constituents: ['sarva', 'anya'] },
    context: { compoundType: 'dvandva' },
    expected: {
      isValid: true,
      dvandvaDetected: true,
      sutra1131Applied: true,
      pattern: 'simple',
      semanticGroup: 'pronouns',
      affectedWords: ['sarva', 'anya'],
      recommendation: 'Words like सर्व lose सर्वनाम status in this द्वन्द्व compound'
    }
  },
  {
    compound: 'sarvaloka',
    analysis: { constituents: ['sarva', 'loka'] },
    context: { compoundType: 'tatpurusha' },
    expected: {
      isValid: true,
      dvandvaDetected: false,
      sutra1131Applied: false,
      recommendation: 'Normal सर्वनाम classification applies'
    }
  },
  {
    compound: 'sarvaviśvaanya',
    analysis: { constituents: ['sarva', 'viśva', 'anya'] },
    context: { compoundType: 'dvandva' },
    expected: {
      isValid: true,
      dvandvaDetected: true,
      sutra1131Applied: true,
      pattern: 'iterative',
      semanticGroup: 'pronouns',
      affectedWords: ['sarva', 'viśva', 'anya']
    }
  }
];

export const performanceTestCases = [
  {
    name: 'Large constituent arrays',
    input: {
      compound: 'sarvaviśvaanyacompound',
      constituents: Array(100).fill('sarva'),
      context: { compoundType: 'dvandva' }
    },
    description: 'Performance with large arrays'
  },
  {
    name: 'Complex pattern analysis',
    input: {
      compound: 'sarvaviśvaanyaitaraubhayacompound',
      constituents: ['sarva', 'viśva', 'anya', 'itara', 'ubhaya'],
      context: { compoundType: 'dvandva' }
    },
    description: 'Complex iterative dvandva analysis'
  },
  {
    name: 'Repeated function calls',
    input: { word: 'sarva', context: { compoundType: 'dvandva' } },
    iterations: 1000,
    description: 'Consistency across multiple calls'
  }
];

export const integrationTestCases = [
  {
    name: 'Automatic dvandva detection',
    inputs: [
      { context: { hasConjunction: true, semanticRelation: 'coordination' } },
      { context: { compoundType: 'copulative', semanticRelation: 'collective' } }
    ],
    description: 'Multiple detection methods working together'
  },
  {
    name: 'Mixed script handling',
    inputs: [
      { word: 'sarva', context: { compoundType: 'dvandva' } }, // IAST
      { word: 'सर्व', context: { compoundType: 'dvandva' } }, // Devanagari
      { word: 'anya', context: { compoundType: 'dvandva' } }, // IAST
      { word: 'अन्य', context: { compoundType: 'dvandva' } }  // Devanagari
    ],
    description: 'Handling both IAST and Devanagari inputs'
  }
];
