const testCases = [
  {
    input: [{ vowel: 'ā', vowelLength: 'long' }],
    expected: { applies: true, sanjna: 'guru' },
    description: 'Syllable with long "ā"'
  },
  {
    input: [{ vowel: 'ī', vowelLength: 'long' }],
    expected: { applies: true, sanjna: 'guru' },
    description: 'Syllable with long "ī"'
  },
  {
    input: [{ vowel: 'e', vowelLength: 'long' }],
    expected: { applies: true, sanjna: 'guru' },
    description: 'Syllable with long "e"'
  },
  {
    input: [{ vowel: 'au', vowelLength: 'long' }],
    expected: { applies: true, sanjna: 'guru' },
    description: 'Syllable with long "au"'
  },
  {
    input: [{ vowel: 'a', vowelLength: 'short' }],
    expected: { applies: false },
    description: 'Syllable with short "a"'
  }
];

export default testCases;
