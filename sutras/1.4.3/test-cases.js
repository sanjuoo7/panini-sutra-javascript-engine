const testCases = [
  {
    input: ['kumārī', { gender: 'feminine' }],
    expected: { applies: true, sanjna: 'nadī' },
    description: 'Feminine word ending in long ī'
  },
  {
    input: ['vadhū', { gender: 'feminine' }],
    expected: { applies: true, sanjna: 'nadī' },
    description: 'Feminine word ending in long ū'
  },
  {
    input: ['gaurī', { gender: 'feminine' }],
    expected: { applies: true, sanjna: 'nadī' },
    description: 'Another feminine word ending in long ī'
  },
  {
    input: ['dhenu', { gender: 'feminine' }],
    expected: { applies: false },
    description: 'Feminine word ending in short u'
  },
  {
    input: ['mati', { gender: 'feminine' }],
    expected: { applies: false },
    description: 'Feminine word ending in short i'
  },
  {
    input: ['pati', { gender: 'masculine' }],
    expected: { applies: false },
    description: 'Masculine word, does not apply'
  },
  {
    input: ['vāri', { gender: 'neuter' }],
    expected: { applies: false },
    description: 'Neuter word, does not apply'
  }
];

export default testCases;
