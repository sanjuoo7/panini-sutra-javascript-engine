const testCases = [
  {
    input: ['śrī', { isIyanUvanSthana: true, nextAffix: 'ām' }],
    expected: { applies: true, optional_sanjna: 'nadī' },
    description: 'Optionally apply nadī to "śrī" before "ām"'
  },
  {
    input: ['bhrū', { isIyanUvanSthana: true, nextAffix: 'ām' }],
    expected: { applies: true, optional_sanjna: 'nadī' },
    description: 'Optionally apply nadī to "bhrū" before "ām"'
  },
  {
    input: ['śrī', { isIyanUvanSthana: true, nextAffix: 'bhyām' }],
    expected: { applies: false },
    description: 'Do not apply when affix is not "ām"'
  },
  {
    input: ['strī', { isIyanUvanSthana: true, nextAffix: 'ām' }],
    expected: { applies: false },
    description: 'Do not apply to "strī"'
  },
  {
    input: ['kumārī', { isIyanUvanSthana: false, nextAffix: 'ām' }],
    expected: { applies: false },
    description: 'Do not apply to a regular nadī word'
  }
];

export default testCases;
