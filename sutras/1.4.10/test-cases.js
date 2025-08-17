const testCases = [
  {
    input: [{ vowel: 'a', vowelLength: 'short' }],
    expected: { applies: true, sanjna: 'laghu' },
    description: 'Syllable with short "a"'
  },
  {
    input: [{ vowel: 'i', vowelLength: 'short' }],
    expected: { applies: true, sanjna: 'laghu' },
    description: 'Syllable with short "i"'
  },
  {
    input: [{ vowel: 'u', vowelLength: 'short' }],
    expected: { applies: true, sanjna: 'laghu' },
    description: 'Syllable with short "u"'
  },
  {
    input: [{ vowel: 'ṛ', vowelLength: 'short' }],
    expected: { applies: true, sanjna: 'laghu' },
    description: 'Syllable with short "ṛ"'
  },
  {
    input: [{ vowel: 'ā', vowelLength: 'long' }],
    expected: { applies: false },
    description: 'Syllable with long "ā"'
  },
  {
    input: [{ vowel: 'e', vowelLength: 'long' }],
    expected: { applies: false },
    description: 'Syllable with long "e"'
  }
];

export default testCases;
