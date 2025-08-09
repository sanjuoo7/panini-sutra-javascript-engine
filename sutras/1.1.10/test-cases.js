/**
 * Test cases for Sutra 1.1.10
 */
export const testCases = [
  {
    description: 'Vowel-Consonant restriction',
    tests: [
      { input: ['a', 'k'], expected: false, description: 'a (vowel) and k (consonant) cannot be savarṇa' },
      { input: ['i', 'c'], expected: false, description: 'i (vowel) and c (consonant) cannot be savarṇa' },
      { input: ['u', 'p'], expected: false, description: 'u (vowel) and p (consonant) cannot be savarṇa' },
      { input: ['k', 'a'], expected: false, description: 'k (consonant) and a (vowel) cannot be savarṇa' },
      { input: ['c', 'i'], expected: false, description: 'c (consonant) and i (vowel) cannot be savarṇa' },
      { input: ['p', 'u'], expected: false, description: 'p (consonant) and u (vowel) cannot be savarṇa' }
    ]
  },
  {
    description: 'Same category allowance',
    tests: [
      { input: ['a', 'ā'], expected: true, description: 'vowel-vowel comparison allowed' },
      { input: ['i', 'ī'], expected: true, description: 'vowel-vowel comparison allowed' },
      { input: ['k', 'g'], expected: true, description: 'consonant-consonant comparison allowed' },
      { input: ['c', 'j'], expected: true, description: 'consonant-consonant comparison allowed' }
    ]
  },
  {
    description: 'Devanagari script',
    tests: [
      { input: ['अ', 'क्'], expected: false, description: 'Devanagari vowel-consonant restriction' },
      { input: ['क्', 'अ'], expected: false, description: 'Devanagari consonant-vowel restriction' },
      { input: ['अ', 'आ'], expected: true, description: 'Devanagari vowel-vowel allowed' },
      { input: ['क्', 'ग्'], expected: true, description: 'Devanagari consonant-consonant allowed' }
    ]
  }
];
