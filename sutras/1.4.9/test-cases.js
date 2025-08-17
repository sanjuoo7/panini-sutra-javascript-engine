const testCases = [
  {
    input: ['pati', { inCompound: false, domain: 'chandasi', relatedToGenitive: true }],
    expected: { applies: true, optional_sanjna: 'ghi' },
    description: 'Optional ghi for "pati" in chandas with genitive'
  },
  {
    input: ['pati', { inCompound: false, domain: 'classical', relatedToGenitive: true }],
    expected: { applies: false },
    description: 'Not in chandas'
  },
  {
    input: ['pati', { inCompound: false, domain: 'chandasi', relatedToGenitive: false }],
    expected: { applies: false },
    description: 'In chandas, but not related to genitive'
  },
  {
    input: ['bhūpati', { base: 'pati', inCompound: true, domain: 'chandasi', relatedToGenitive: true }],
    expected: { applies: false },
    description: 'In a compound, so this rule does not apply'
  },
  {
    input: ['hari', { inCompound: false, domain: 'chandasi', relatedToGenitive: true }],
    expected: { applies: false },
    description: 'Not the word "pati"'
  }
];

export default testCases;
