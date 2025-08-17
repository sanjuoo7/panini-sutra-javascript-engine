const testCases = [
  {
    input: ['hari', { hasNadīSaṃjñā: false }],
    expected: { applies: true, sanjna: 'ghi' },
    description: 'Masculine noun in short i'
  },
  {
    input: ['bhānu', { hasNadīSaṃjñā: false }],
    expected: { applies: true, sanjna: 'ghi' },
    description: 'Masculine noun in short u'
  },
  {
    input: ['mati', { hasNadīSaṃjñā: false }],
    expected: { applies: true, sanjna: 'ghi' },
    description: 'Feminine noun in short i, not nadī'
  },
  {
    input: ['sakhi', {}],
    expected: { applies: false },
    description: 'The word "sakhi" is excluded'
  },
  {
    input: ['mati', { hasNadīSaṃjñā: true }],
    expected: { applies: false },
    description: 'Feminine noun that is already nadī'
  },
  {
    input: ['kumārī', { hasNadīSaṃjñā: true }],
    expected: { applies: false },
    description: 'Word ending in long ī (nadī)'
  },
  {
    input: ['rāma', {}],
    expected: { applies: false },
    description: 'Word not ending in short i or u'
  }
];

export default testCases;
