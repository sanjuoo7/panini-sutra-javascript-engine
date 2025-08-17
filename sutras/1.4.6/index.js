/**
 * Sutra 1.4.6: ṅiti hrasvaśca
 * 
 * Before ṅit affixes, short vowel feminine words and words in iyaṅ/uvaṅ sthāna
 * optionally get the 'nadī' saṃjñā.
 */
import { detectScript, validateSanskritWord } from '../sanskrit-utils/index.js';

export function sutra146(word, context = {}) {
  try {
    // Input validation
    if (!word || typeof word !== 'string') {
      return { applies: false, reason: 'Invalid input', sutra: '1.4.6', confidence: 0 };
    }
    
    const validation = validateSanskritWord(word);
    if (!validation.isValid) {
      return { applies: false, reason: 'Invalid Sanskrit word', sutra: '1.4.6', confidence: 0 };
    }
    
    const script = detectScript(word);
    
    // Check if next affix is ṅit
    const nextAffixIsNit = context.nextAffixIsNit === true || 
                           context.nextAffixIsṅit === true ||
                           context.isṅit === true;
    
    if (!nextAffixIsNit) {
      return { 
        applies: false, 
        reason: 'Next affix is not ṅit', 
        sutra: '1.4.6', 
        confidence: 0.9,
        details: { detectedScript: script, nextAffix: context.nextAffix || 'unknown' }
      };
    }
    
    // Special case: 'strī' is exempt from this rule
    const isStri = (script === 'Devanagari' && word === 'स्त्री') || 
                   (script === 'IAST' && word === 'strī');
    
    if (isStri) {
      return { 
        applies: false, 
        reason: 'strī is exempt from this rule', 
        sutra: '1.4.6', 
        confidence: 0.95,
        details: { detectedScript: script, isExempt: true }
      };
    }
    
    // Check if word is feminine
    const isFeminine = context.gender === 'feminine' || context.strī === true;
    
    // Check for short vowel endings
    let isShortVowelFeminine = false;
    if (isFeminine) {
      if (script === 'Devanagari') {
        isShortVowelFeminine = word.endsWith('ि') || word.endsWith('ु');
      } else if (script === 'IAST') {
        isShortVowelFeminine = word.endsWith('i') || word.endsWith('u');
      }
    }
    
    // Check if word is in iyaṅ/uvaṅ sthāna
    const isIyanUvanSthana = context.isIyanUvanSthana === true || 
                             context.iyaṅuvaṅsthāna === true;
    
    // Check for words that are already mandatorily nadī (to avoid reapplication)
    let isMandatoryNadi = false;
    if (script === 'Devanagari') {
      isMandatoryNadi = (word.endsWith('ी') || word.endsWith('ू')) && !isIyanUvanSthana;
    } else if (script === 'IAST') {
      isMandatoryNadi = (word.endsWith('ī') || word.endsWith('ū')) && !isIyanUvanSthana;
    }
    
    if (isMandatoryNadi) {
      return { 
        applies: false, 
        reason: 'Word already has mandatory nadī saṃjñā', 
        sutra: '1.4.6', 
        confidence: 0.9,
        details: { detectedScript: script, alreadyNadī: true }
      };
    }
    
    // Apply the rule
    if (isShortVowelFeminine || isIyanUvanSthana) {
      const reason = isShortVowelFeminine 
        ? 'Short vowel feminine word before ṅit affix'
        : 'iyaṅ/uvaṅ sthāna word before ṅit affix';
        
      return { 
        applies: true, 
        optional_sanjna: 'nadī', // For backward compatibility with tests
        saṃjñā: 'nadī',
        isOptional: true,
        reason: reason,
        sutra: '1.4.6', 
        confidence: 0.85,
        details: { 
          detectedScript: script, 
          condition: isShortVowelFeminine ? 'short_vowel_feminine' : 'iyaṅuvaṅ_sthāna',
          affix: 'ṅit',
          optionality: 'vikalpena'
        }
      };
    }
    
    return { 
      applies: false, 
      reason: 'Word does not meet conditions for optional nadī saṃjñā', 
      sutra: '1.4.6', 
      confidence: 0.9,
      details: { 
        detectedScript: script, 
        isFeminine: isFeminine,
        isShortVowel: isShortVowelFeminine,
        isIyanUvanSthana: isIyanUvanSthana
      }
    };
    
  } catch (error) {
    return {
      applies: false,
      error: error.message,
      sutra: '1.4.6',
      confidence: 0
    };
  }
}

// For backward compatibility
export default function applySutra(word, context) {
  return sutra146(word, context);
}
