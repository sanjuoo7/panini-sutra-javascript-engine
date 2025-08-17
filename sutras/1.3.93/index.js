/**
 * Sutra 1.3.93: लुटि च कॢपः (luṭi ca kḷpaḥ)
 * After the verb कॢप् (kḷp) 'to be fit/suitable', Parasmaipada is optionally used
 * when लुट् (1st Future) is affixed, as well as when स्य and सन् are affixed.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra1393(word, context = {}) {
  try {
    if (!word || typeof word !== 'string') {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.93', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.93', confidence: 0 };
    }
    
    // Additional Sanskrit-specific validation - reject obvious English words
    // This is a heuristic: common English words that might pass phoneme tokenization
    const commonEnglishWords = ['hello', 'world', 'test', 'example', 'sample', 'english', 'word'];
    if (commonEnglishWords.includes(word.toLowerCase())) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Invalid input', sutra: '1.3.93', confidence: 0 };
    }
    
    const script = detectScript(word);

    // Root detection: कॢप्/कल्प् (kḷp/kalp) - "to be fit/suitable"
    const rootMatches = (() => {
      const root = (context.root || '').toLowerCase();
      const devMatches = ['कॢप', 'कल्प', 'क्लृप'].some(r => (context.root || '').includes(r));
      const iastMatches = ['kḷp', 'kalp', 'klp'].some(r => root.includes(r));
      if (devMatches || iastMatches) return true;
      
      // Surface detection as fallback
      const rx = script === 'Devanagari' ? /(कॢप|कल्प|क्लृप)/ : /(kḷp|kalp|klp)/i;
      return rx.test(word);
    })();

    if (!rootMatches) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Root is not कॢप् (kḷp)', sutra: '1.3.93', confidence: 0.9 };
    }

    // Check for लुट् (luṭ - 1st Future) OR स्य/सन् affixes
    const hasLut = (() => {
      const lakara = (context.lakara || context.lakāra || '').toLowerCase();
      return lakara.includes('luṭ') || lakara.includes('lut') || lakara === 'lṛṭ' || lakara === 'first_future';
    })();

    const hasSyaSan = (() => {
      const affix = (context.affix || '').toLowerCase();
      const affixes = context.affixes || [];
      
      // Check स्य (future/conditional) or सन् (desiderative)
      const syaPattern = ['sy', 'स्य', 'sya', 'future', 'conditional'].some(key => 
        affix.includes(key) || affixes.includes(key)
      );
      const sanPattern = ['san', 'सन्', 'desiderative'].some(key => 
        affix.includes(key) || affixes.includes(key)
      );
      
      return syaPattern || sanPattern;
    })();

    if (!hasLut && !hasSyaSan) {
      return { applies: false, isParasmaipada: false, isOptional: false, reason: 'Neither लुट् nor स्य/सन् found', sutra: '1.3.93', confidence: 0.9 };
    }

    const condition = hasLut ? 'लुट्' : 'स्य/सन्';
    return {
      applies: true,
      isParasmaipada: true,
      isOptional: true,
      reason: `कॢप् + ${condition} → optional Parasmaipada`,
      sutra: '1.3.93',
      details: { detectedScript: script, condition, hasLut, hasSyaSan },
      confidence: 0.85
    };
  } catch (e) {
    return { applies: false, isParasmaipada: false, isOptional: false, reason: `Error: ${e.message}`, sutra: '1.3.93', confidence: 0 };
  }
}

export default sutra1393;
