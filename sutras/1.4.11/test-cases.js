const testCases = [
  {
    input: [{ vowel: 'i', vowelLength: 'short', followedByConjunct: true }],
    expected: { applies: true, sanjna: 'guru' },
    description: 'Short vowel "i" before conjunct'
  },
  {
    input: [{ vowel: 'a', vowelLength: 'short', followedByConjunct: true }],
    expected: { applies: true, sanjna: 'guru' },
    description: 'Short vowel "a" before conjunct'
  },
  {
    input: [{ vowel: 'a', vowelLength: 'short', followedByConjunct: false }],
    expected: { applies: false },
    description: 'Short vowel "a" not before conjunct'
  },
  {
    input: [{ vowel: 'ā', vowelLength: 'long', followedByConjunct: true }],
    expected: { applies: false },
    description: 'Long vowel (not covered by this rule)'
  },
  {
    input: [{ vowel: 'ā', vowelLength: 'long', followedByConjunct: false }],
    expected: { applies: false },
    description: 'Long vowel not before conjunct'
  }
];

export default testCases;
