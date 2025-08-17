const testCases = [
  {
    input: ['pati', { inCompound: false }],
    expected: { applies: true, sanjna_prohibition: 'ghi' },
    description: 'Prohibit ghi for standalone "pati"'
  },
  {
    input: ['bhūpati', { base: 'pati', inCompound: true }],
    expected: { applies: false },
    description: 'Do not prohibit ghi for "pati" in a compound'
  },
  {
    input: ['prajāpati', { base: 'pati', inCompound: true }],
    expected: { applies: false },
    description: 'Do not prohibit ghi for "pati" in another compound'
  },
  {
    input: ['hari', { inCompound: false }],
    expected: { applies: false },
    description: 'Do not apply to other words like "hari"'
  }
];

export default testCases;
