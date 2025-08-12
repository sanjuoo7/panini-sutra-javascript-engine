/**
 * Vowel Length Transformation Utilities
 * Supports Sutras 1.2.47 & 1.2.48 (final long→short substitution in context)
 * Extensible for future vowel alternation rules.
 */
import { detectScript } from './script-detection.js';

// IAST long → short
const IAST_LONG_TO_SHORT = { 'ā': 'a', 'ī': 'i', 'ū': 'u', 'ṝ': 'ṛ' };
// Devanagari independent vowels long → short
const DEV_INDEP_LONG_SHORT = { 'आ': 'अ', 'ई': 'इ', 'ऊ': 'उ', 'ॠ': 'ऋ' };
// Devanagari matras (vowel signs) long → short (ā matra removed to inherent a)
const DEV_MATRA_LONG_SHORT = { 'ा': '', 'ी': 'ि', 'ू': 'ु', 'ॄ': 'ृ' };

function isString(x){ return typeof x === 'string'; }

/** Map a single vowel or vowel sign to short if long. */
export function mapLongToShortVowel(vowel, script){
  if(!isString(vowel) || !vowel) return { changed:false, original:vowel, mapped:vowel, type:null };
  if(script === 'Devanagari'){
    if(DEV_INDEP_LONG_SHORT[vowel]) return { changed:true, original:vowel, mapped:DEV_INDEP_LONG_SHORT[vowel], type:'independent' };
    if(DEV_MATRA_LONG_SHORT[vowel] !== undefined) return { changed:true, original:vowel, mapped:DEV_MATRA_LONG_SHORT[vowel], type:'matra' };
  } else {
    if(IAST_LONG_TO_SHORT[vowel]) return { changed:true, original:vowel, mapped:IAST_LONG_TO_SHORT[vowel], type:'iast' };
  }
  return { changed:false, original:vowel, mapped:vowel, type:null };
}

/** Extract the final vowel (independent or matra). */
function extractFinalVowel(word, script){
  if(script === 'Devanagari'){
    // Includes independent vowels and vowel signs (matras)
    const vowelRegex = /[अआइईउऊऋॠऌॡएऐओऔ]|[ािीुूृॄॅेोौंः]/g;
    let m, last=null, index=-1;
    while((m = vowelRegex.exec(word))){ last = m[0]; index = m.index; }
    if(last === null) return null;
    return { vowel:last, index };
  }
  const vowelRegex = /[aāiīuūṛṝeoaiu]/g; // simplified broad set
  let m, last=null, index=-1;
  while((m = vowelRegex.exec(word))){ last = m[0]; index = m.index; }
  if(last === null) return null;
  return { vowel:last, index };
}

/** Shorten final vowel if applicable. */
export function shortenFinalVowel(word, options = {}){
  const result = {
    input: word,
    valid: false,
    applies: false,
    changed: false,
    transformed: null,
    finalVowelOriginal: null,
    finalVowelNew: null,
    script: null,
    explanation: ''
  };
  if(!isString(word) || !word.trim()){
    result.explanation = 'Invalid input word';
    return result;
  }
  const script = options.script || detectScript(word) || 'IAST';
  result.script = script;
  const fv = extractFinalVowel(word, script);
  if(!fv){
    result.valid = true;
    result.explanation = 'No vowel detected';
    return result;
  }
  const map = mapLongToShortVowel(fv.vowel, script);
  result.finalVowelOriginal = fv.vowel;
  result.finalVowelNew = map.mapped;
  result.valid = true;
  if(!map.changed){
    result.explanation = 'Final vowel not long or no short mapping';
    return result;
  }
  result.applies = true;
  if(options.transform === false){
    result.explanation = 'Mapping identified (preview only)';
    return result;
  }
  // Perform replacement: if matra mapped to '', remove it; if independent replaced, simple substitution
  const before = word.slice(0, fv.index);
  const after = word.slice(fv.index + fv.vowel.length);
  const transformed = before + map.mapped + after;
  result.transformed = transformed;
  result.changed = transformed !== word;
  result.explanation = 'Final long vowel shortened';
  return result;
}

export default { shortenFinalVowel, mapLongToShortVowel };
