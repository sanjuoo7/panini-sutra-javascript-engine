/**
 * Test Cases for Sutra 1.1.30: तृतीयासमासे (tṛtīyāsamāse)
 * "In the Instrumental Determinative Compounds the words सर्व etc. are not सर्वनाम।"
 */

export const testCases = {
  // Basic tritiyasamasa detection
  tritiyasamasaDetection: [
    {
      input: { compound: 'sarvakāma', context: { compoundType: 'tritiyasamasa' } },
      expected: true,
      description: 'Explicit tritiyasamasa marking'
    },
    {
      input: { compound: 'viśvakarmā', context: { compoundType: 'instrumental_determinative' } },
      expected: true,
      description: 'Alternative tritiyasamasa marking'
    },
    {
      input: { compound: 'compound', context: { semanticRelation: 'instrumental' } },
      expected: true,
      description: 'Semantic instrumental relation'
    },
    {
      input: { compound: 'compound', context: { compoundType: 'tatpurusha' } },
      expected: false,
      description: 'Non-tritiyasamasa compound'
    }
  ],

  // Sarvaname loss in tritiyasamasa
  sarvanameLoss: [
    {
      input: { word: 'sarva', context: { compound: 'sarvakāma', compoundType: 'tritiyasamasa' } },
      expected: true,
      description: 'sarva loses sarvaname status in tritiyasamasa'
    },
    {
      input: { word: 'viśva', context: { compound: 'viśvakarmā', compoundType: 'tritiyasamasa' } },
      expected: true,
      description: 'viśva loses sarvaname status in tritiyasamasa'
    },
    {
      input: { word: 'सर्व', context: { compound: 'सर्वकाम', compoundType: 'tritiyasamasa' } },
      expected: true,
      description: 'Devanagari sarva loses sarvaname status'
    },
    {
      input: { word: 'रामा', context: { compound: 'compound', compoundType: 'tritiyasamasa' } },
      expected: false,
      description: 'Non-sarva words unaffected'
    }
  ],

  // Sarvaname classification with sutra application
  sarvanameClassification: [
    {
      input: { word: 'sarva', context: { compound: 'sarvakāma', compoundType: 'tritiyasamasa' } },
      expected: false,
      description: 'sarva is not sarvaname in tritiyasamasa'
    },
    {
      input: { word: 'sarva', context: { compound: 'sarvaloka', compoundType: 'tatpurusha' } },
      expected: true,
      description: 'sarva remains sarvaname in other compounds'
    },
    {
      input: { word: 'रामा', context: { compoundType: 'tritiyasamasa' } },
      expected: false,
      description: 'Non-sarva words are never sarvaname'
    }
  ],

  // Compound analysis
  compoundAnalysis: [
    {
      input: { 
        compound: 'sarvakāma', 
        constituents: ['sarva', 'kāma'], 
        context: { compoundType: 'tritiyasamasa' } 
      },
      expected: {
        isTritiyasamasa: true,
        sutraApplied: true,
        sarvanameWords: [],
        nonSarvanameWords: ['sarva', 'kāma']
      },
      description: 'Complete tritiyasamasa analysis'
    },
    {
      input: { 
        compound: 'sarvaloka', 
        constituents: ['sarva', 'loka'], 
        context: { compoundType: 'tatpurusha' } 
      },
      expected: {
        isTritiyasamasa: false,
        sutraApplied: false,
        sarvanameWords: ['sarva'],
        nonSarvanameWords: ['loka']
      },
      description: 'Non-tritiyasamasa analysis'
    }
  ],

  // Examples for educational purposes
  examples: {
    iast: [
      { compound: 'sarvakāma', description: 'sarva + kāma = all desires' },
      { compound: 'viśvakarmā', description: 'viśva + karmā = all actions' },
      { compound: 'ubhayapakṣa', description: 'ubhaya + pakṣa = both sides' },
      { compound: 'anyagotra', description: 'anya + gotra = other lineage' },
      { compound: 'ekahasta', description: 'eka + hasta = one hand' }
    ],
    devanagari: [
      { compound: 'सर्वकाम', description: 'सर्व + काम = all desires' },
      { compound: 'विश्वकर्मा', description: 'विश्व + कर्मा = all actions' },
      { compound: 'उभयपक्ष', description: 'उभय + पक्ष = both sides' },
      { compound: 'अन्यगोत्र', description: 'अन्य + गोत्र = other lineage' },
      { compound: 'एकहस्त', description: 'एक + हस्त = one hand' }
    ]
  },

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
    }
  ],

  // Integration with other systems
  integration: [
    {
      input: { 
        context: { 
          compoundType: 'tritiyasamasa', 
          semanticRelation: 'instrumental' 
        } 
      },
      expected: true,
      description: 'Multiple detection methods'
    },
    {
      input: { word: 'sarva', script: 'IAST' },
      function: 'mixed script handling',
      description: 'IAST input handling'
    },
    {
      input: { word: 'सर्व', script: 'Devanagari' },
      function: 'mixed script handling',
      description: 'Devanagari input handling'
    }
  ]
};

export const validationCases = [
  {
    compound: 'sarvakāma',
    analysis: { constituents: ['sarva', 'kāma'] },
    context: { compoundType: 'tritiyasamasa' },
    expected: {
      isValid: true,
      tritiyasamasaDetected: true,
      sutra1130Applied: true,
      affectedWords: ['sarva'],
      recommendation: 'Words like सर्व lose सर्वनाम status in this तृतीयासमास'
    }
  },
  {
    compound: 'sarvaloka',
    analysis: { constituents: ['sarva', 'loka'] },
    context: { compoundType: 'tatpurusha' },
    expected: {
      isValid: true,
      tritiyasamasaDetected: false,
      sutra1130Applied: false,
      recommendation: 'Normal सर्वनाम classification applies'
    }
  }
];

export const performanceTestCases = [
  {
    name: 'Large constituent arrays',
    input: {
      compound: 'sarvavakarmādicompound',
      constituents: Array(100).fill('sarva'),
      context: { compoundType: 'tritiyasamasa' }
    },
    description: 'Performance with large arrays'
  },
  {
    name: 'Repeated function calls',
    input: { word: 'sarva', context: { compoundType: 'tritiyasamasa' } },
    iterations: 1000,
    description: 'Consistency across multiple calls'
  }
];
