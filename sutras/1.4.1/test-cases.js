const testCases = [
  {
    input: [null, null],
    expected: {
      applies: false,
      meta: true,
      type: 'adhikāra',
      scopeStart: '1.4.1',
      scopeEnd: '2.2.38',
      rule: 'eka_samjna',
    },
    description: 'Meta-rule properties check'
  }
];

export default testCases;
