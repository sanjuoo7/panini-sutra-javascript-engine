const testCases = [
  {
    input: ['kalpitā', { lakara: 'luṭ', root: 'kḷp' }],
    expected: { applies: true, optional: true },
    description: 'Verb "kḷp" with "luṭ" lakāra'
  },
  {
    input: ['kalpsyati', { root: 'kḷp', affixes: ['sya'] }],
    expected: { applies: true, optional: true },
    description: 'Verb "kḷp" with "sya" affix'
  },
  {
    input: ['ciklipsati', { root: 'kḷp', affixes: ['san'] }],
    expected: { applies: true, optional: true },
    description: 'Verb "kḷp" with "san" affix'
  },
  {
    input: ['bhavitā', { lakara: 'luṭ', root: 'bhū' }],
    expected: { applies: false },
    description: 'Another verb with "luṭ" lakāra'
  },
  {
    input: ['kalpate', { lakara: 'laṭ', root: 'kḷp' }],
    expected: { applies: false },
    description: 'Verb "kḷp" with a different lakāra'
  }
];

export default testCases;
