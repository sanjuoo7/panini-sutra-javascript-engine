const testCases = [
  {
    input: ['śrī', { gender: 'feminine', isIyanUvanSthana: true }],
    expected: { applies: true, sanjna_prohibition: 'nadī' },
    description: 'Prohibit nadī for "śrī" (iyaṅ sthāna)'
  },
  {
    input: ['bhrū', { gender: 'feminine', isIyanUvanSthana: true }],
    expected: { applies: true, sanjna_prohibition: 'nadī' },
    description: 'Prohibit nadī for "bhrū" (uvaṅ sthāna)'
  },
  {
    input: ['strī', { gender: 'feminine', isIyanUvanSthana: true }],
    expected: { applies: false },
    description: 'Do not apply to "strī"'
  },
  {
    input: ['kumārī', { gender: 'feminine', isIyanUvanSthana: false }],
    expected: { applies: false },
    description: 'Do not apply to a standard nadī word'
  },
  {
    input: ['pradhī', { gender: 'feminine', isIyanUvanSthana: true }],
    expected: { applies: true, sanjna_prohibition: 'nadī' },
    description: 'Prohibit nadī for "pradhī"'
  }
];

export default testCases;
