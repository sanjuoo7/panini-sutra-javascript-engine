const testCases = [
  {
    input: ['mati', { gender: 'feminine', endsIn: 'i', nextAffixIsNit: true }],
    expected: { applies: true, optional_sanjna: 'nadī' },
    description: 'Optional nadī for short "i" feminine before ṅit'
  },
  {
    input: ['dhenu', { gender: 'feminine', endsIn: 'u', nextAffixIsNit: true }],
    expected: { applies: true, optional_sanjna: 'nadī' },
    description: 'Optional nadī for short "u" feminine before ṅit'
  },
  {
    input: ['śrī', { gender: 'feminine', isIyanUvanSthana: true, nextAffixIsNit: true }],
    expected: { applies: true, optional_sanjna: 'nadī' },
    description: 'Optional nadī for iyaṅ-sthāna before ṅit'
  },
  {
    input: ['mati', { gender: 'feminine', endsIn: 'i', nextAffixIsNit: false }],
    expected: { applies: false },
    description: 'No application if affix is not ṅit'
  },
  {
    input: ['strī', { gender: 'feminine', isIyanUvanSthana: true, nextAffixIsNit: true }],
    expected: { applies: false },
    description: 'No application to "strī"'
  },
  {
    input: ['kumārī', { gender: 'feminine', endsIn: 'ī', isIyanUvanSthana: false, nextAffixIsNit: true }],
    expected: { applies: false },
    description: 'No application to a mandatory nadī word'
  }
];

export default testCases;
