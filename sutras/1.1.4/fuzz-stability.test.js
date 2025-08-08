/** Fuzz/stability tests for Sutra 1.1.4 rule engine */
import { analyzeDhatuLopa, analyzeGunaVrddhinisedha, setSutra114Mode } from './index.js';

// Basic Sanskrit-ish consonant and vowel sets (IAST)
const CONSONANTS = ['k','g','c','j','t','d','p','b','m','n','y','r','l','v','s'];
const VOWELS = ['a','i','u','ā','ī','ū'];
const DERIV_AFFIXES = ['ya','tvā','tavya','kta','ktavat','śa','ka','tra','man'];

function randomInt(n){return Math.floor(Math.random()*n);} 
function randomFrom(arr){return arr[randomInt(arr.length)];}

function makeRandomDhatu(){
  // Prefer CVC or CV patterns
  const pattern = Math.random()<0.7 ? 'CVC' : 'CV';
  if (pattern==='CV') return randomFrom(CONSONANTS)+randomFrom(VOWELS);
  return randomFrom(CONSONANTS)+randomFrom(VOWELS)+randomFrom(CONSONANTS);
}

function makeRandomAffix(){
  if (Math.random()<0.6) return randomFrom(DERIV_AFFIXES);
  // Occasionally synthesize simple consonant + vowel
  return randomFrom(CONSONANTS)+ (Math.random()<0.5? 'a':'');
}

describe('Sutra 1.1.4 fuzz stability', () => {
  beforeAll(()=> setSutra114Mode('rules'));

  test('random dhatu-affix pairs do not throw & produce bounded confidence', () => {
    const trials = 150;
    for (let i=0;i<trials;i++) {
      const dhatu = makeRandomDhatu();
      const affix = makeRandomAffix();
      const lopa = analyzeDhatuLopa(dhatu, affix);
      expect(typeof lopa.confidence).toBe('number');
      expect(lopa.confidence).toBeGreaterThanOrEqual(0);
      expect(lopa.confidence).toBeLessThanOrEqual(1);
      const gv = analyzeGunaVrddhinisedha(dhatu, affix, 'guna');
      expect(gv.confidence).toBeGreaterThanOrEqual(0);
      expect(gv.confidence).toBeLessThanOrEqual(1);
    }
  });
});
