const testCases = [
  {
    input: [null, null],
    expected: {
      applies: false,
      meta: true,
      defines: 'pada',
      conditions: ['ends_in_sup', 'ends_in_tin'],
    },
    description: 'Definitional rule for "pada"'
  }
];

export default testCases;
