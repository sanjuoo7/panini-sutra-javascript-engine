export const dhatuAffixTestCases = [
  // Cases where sutra 1.1.4 should apply (block guṇa/vṛddhi)
  { 
    dhatu: 'gam', 
    affix: 'ya', 
    expected: true, 
    description: 'गम् + य should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'han', 
    affix: 'ya', 
    expected: true, 
    description: 'हन् + य should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'jan', 
    affix: 'ya', 
    expected: true, 
    description: 'जन् + य should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'gam', 
    affix: 'tvā', 
    expected: true, 
    description: 'गम् + त्वा should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'vid', 
    affix: 'kta', 
    expected: true, 
    description: 'विद् + क्त should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'khad', 
    affix: 'ya', 
    expected: true, 
    description: 'खद् + य should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'gad', 
    affix: 'ya', 
    expected: true, 
    description: 'गद् + य should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'chad', 
    affix: 'ya', 
    expected: true, 
    description: 'छद् + य should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'han', 
    affix: 'kta', 
    expected: true, 
    description: 'हन् + क्त should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'jan', 
    affix: 'ktavat', 
    expected: true, 
    description: 'जन् + क्तवत् should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'gam', 
    affix: 'śa', 
    expected: true, 
    description: 'गम् + श should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'vid', 
    affix: 'ya', 
    expected: true, 
    description: 'विद् + य should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'khad', 
    affix: 'kta', 
    expected: true, 
    description: 'खद् + क्त should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'gad', 
    affix: 'tvā', 
    expected: true, 
    description: 'गद् + त्वा should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'chad', 
    affix: 'kta', 
    expected: true, 
    description: 'छद् + क्त should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'han', 
    affix: 'ka', 
    expected: true, 
    description: 'हन् + क should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'jan', 
    affix: 'śa', 
    expected: true, 
    description: 'जन् + श should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'gam', 
    affix: 'ka', 
    expected: true, 
    description: 'गम् + क should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'vid', 
    affix: 'tvā', 
    expected: true, 
    description: 'विद् + त्वा should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'khad', 
    affix: 'ktavat', 
    expected: true, 
    description: 'खद् + क्तवत् should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'gad', 
    affix: 'kta', 
    expected: true, 
    description: 'गद् + क्त should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'chad', 
    affix: 'tvā', 
    expected: true, 
    description: 'छद् + त्वा should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'han', 
    affix: 'śa', 
    expected: true, 
    description: 'हन् + श should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'jan', 
    affix: 'ka', 
    expected: true, 
    description: 'जन् + क should block guṇa due to dhātu lopa',
    operation: 'guna'
  },
  { 
    dhatu: 'gam', 
    affix: 'ktavat', 
    expected: true, 
    description: 'गम् + क्तवत् should block guṇa due to dhātu lopa',
    operation: 'guna'
  },

  // Cases where sutra 1.1.4 should NOT apply (allow guṇa/vṛddhi)
  { 
    dhatu: 'nī', 
    affix: 'ti', 
    expected: false, 
    description: 'नी + ति should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'bhū', 
    affix: 'ti', 
    expected: false, 
    description: 'भू + ति should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'kṛ', 
    affix: 'ti', 
    expected: false, 
    description: 'कृ + ति should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'dṛś', 
    affix: 'ti', 
    expected: false, 
    description: 'दृश् + ति should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'pac', 
    affix: 'ti', 
    expected: false, 
    description: 'पच् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'bhaj', 
    affix: 'ti', 
    expected: false, 
    description: 'भज् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'lag', 
    affix: 'ti', 
    expected: false, 
    description: 'लग् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'sic', 
    affix: 'ti', 
    expected: false, 
    description: 'सिच् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'yuj', 
    affix: 'ti', 
    expected: false, 
    description: 'युज् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'budh', 
    affix: 'ti', 
    expected: false, 
    description: 'बुध् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'śuc', 
    affix: 'ti', 
    expected: false, 
    description: 'शुच् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'tud', 
    affix: 'ti', 
    expected: false, 
    description: 'तुद् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'bhid', 
    affix: 'ti', 
    expected: false, 
    description: 'भिद् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'chid', 
    affix: 'ti', 
    expected: false, 
    description: 'छिद् + ति should allow guṇa (no dhātu lopa)',
    operation: 'guna'
  },
  { 
    dhatu: 'nī', 
    affix: 'tas', 
    expected: false, 
    description: 'नी + तस् should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'bhū', 
    affix: 'tha', 
    expected: false, 
    description: 'भू + थ should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'kṛ', 
    affix: 'si', 
    expected: false, 
    description: 'कृ + सि should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'dṛś', 
    affix: 'mi', 
    expected: false, 
    description: 'दृश् + मि should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'pac', 
    affix: 'vas', 
    expected: false, 
    description: 'पच् + वस् should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'bhaj', 
    affix: 'mas', 
    expected: false, 
    description: 'भज् + मस् should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'lag', 
    affix: 'te', 
    expected: false, 
    description: 'लग् + ते should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'sic', 
    affix: 'āte', 
    expected: false, 
    description: 'सिच् + आते should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'yuj', 
    affix: 'thi', 
    expected: false, 
    description: 'युज् + थि should allow guṇa (sārvadhātuka affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'budh', 
    affix: 'ana', 
    expected: false, 
    description: 'बुध् + अन should allow guṇa (vowel-initial affix)',
    operation: 'guna'
  },
  { 
    dhatu: 'śuc', 
    affix: 'i', 
    expected: false, 
    description: 'शुच् + इ should allow guṇa (vowel-initial affix)',
    operation: 'guna'
  }
];

export const ardhadhatikaAffixTestCases = [
  // Ārdhadhātuka affixes (should return true)
  { affix: 'ya', expected: true, description: 'य is ārdhadhātuka' },
  { affix: 'tvā', expected: true, description: 'त्वा is ārdhadhātuka' },
  { affix: 'kta', expected: true, description: 'क्त is ārdhadhātuka' },
  { affix: 'ktavat', expected: true, description: 'क्तवत् is ārdhadhātuka' },
  { affix: 'śa', expected: true, description: 'श is ārdhadhātuka' },
  { affix: 'ka', expected: true, description: 'क is ārdhadhātuka' },
  { affix: 'na', expected: true, description: 'न is ārdhadhātuka' },
  { affix: 'ta', expected: true, description: 'त is ārdhadhātuka' },
  { affix: 'tra', expected: true, description: 'त्र is ārdhadhātuka' },
  { affix: 'man', expected: true, description: 'मन् is ārdhadhātuka' },

  // Sārvadhātuka affixes (should return false)
  { affix: 'ti', expected: false, description: 'ति is sārvadhātuka' },
  { affix: 'tas', expected: false, description: 'तस् is sārvadhātuka' },
  { affix: 'thi', expected: false, description: 'थि is sārvadhātuka' },
  { affix: 'si', expected: false, description: 'सि is sārvadhātuka' },
  { affix: 'tha', expected: false, description: 'थ is sārvadhātuka' },
  { affix: 'mi', expected: false, description: 'मि is sārvadhātuka' },
  { affix: 'vas', expected: false, description: 'वस् is sārvadhātuka' },
  { affix: 'mas', expected: false, description: 'मस् is sārvadhātuka' },
  { affix: 'te', expected: false, description: 'ते is sārvadhātuka' },
  { affix: 'āte', expected: false, description: 'आते is sārvadhātuka' },

  // Vowel-initial affixes (should return false)
  { affix: 'ana', expected: false, description: 'अन is vowel-initial' },
  { affix: 'i', expected: false, description: 'इ is vowel-initial' },
  { affix: 'u', expected: false, description: 'उ is vowel-initial' },
  { affix: 'a', expected: false, description: 'अ is vowel-initial' },
  { affix: 'ā', expected: false, description: 'आ is vowel-initial' }
];
