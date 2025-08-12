/**
 * Accent Domain Rules (1.2.37–1.2.39)
 * Provides domain-level and local assimilation adjustments layered atop aggregateProsodyOptions.
 */
import { analyzeVowelAccent, ACCENT_TYPES, applyUdatta, applyAnudatta } from './accent-analysis.js';
import { detectScript, tokenizePhonemes, isVowel } from './index.js';

// Lexical override sets (normalized lowercase NFC)
const LEXICAL_ANUDATTA = {
  deva: new Set(['deva','देव']),
  brahmana: new Set(['brāhmaṇa','brahmana','ब्राह्मण'])
};

function normalizeToken(t){
  return t.normalize('NFC').toLowerCase();
}

function isSubrahmanyaDomain(context){
  return !!context.subrahmanya;
}

function applySvaritaToUdattaWord(form){
  const script = detectScript(form);
  const chars = Array.from(form);
  for (let i=0;i<chars.length;i++){
    const ch = chars[i];
    const accent = analyzeVowelAccent(ch,{script});
    if (accent.isValid && accent.accentType === ACCENT_TYPES.SVARITA){
      chars[i] = applyUdatta(accent.baseVowel);
    }
  }
  return chars.join('');
}

function forceLexicalAnudattaWord(form){
  const script = detectScript(form);
  const chars = Array.from(form);
  for (let i=0;i<chars.length;i++){
    const ch = chars[i];
    const accent = analyzeVowelAccent(ch,{script});
    if (accent.isValid){
      chars[i] = applyAnudatta(accent.baseVowel);
    }
  }
  return chars.join('');
}

function detectSvaritaAnudattaRuns(form){
  const script = detectScript(form);
  const chars = Array.from(form);
  const runs = [];
  for (let i=0;i<chars.length;i++){
    const accent = analyzeVowelAccent(chars[i], {script});
    if (accent.isValid && accent.accentType === ACCENT_TYPES.SVARITA){
      let j=i+1; let any=false;
      while(j<chars.length){
        const a2 = analyzeVowelAccent(chars[j], {script});
        if (a2.isValid && a2.accentType === ACCENT_TYPES.ANUDATTA){ any=true; j++; }
        else break;
      }
      if (any) runs.push({ start: i+1, end: j-1 });
    }
  }
  return runs;
}

function applyLocalMonotone(form, run){
  const script = detectScript(form);
  const chars = Array.from(form);
  for (let k=run.start; k<=run.end; k++){
    const accent = analyzeVowelAccent(chars[k], {script});
    if (accent.isValid){
      chars[k] = accent.baseVowel; 
    }
  }
  return chars.join('');
}

export function integrateDomainProsody(aggregateResult, context = {}){
  const { input } = aggregateResult;
  const reasoning = aggregateResult.reasoning || [];
  const applied = new Set(aggregateResult.appliedSutras || []);
  const optionMap = new Map(aggregateResult.options.map(o => [o.mode+'::'+o.form, { ...o }]));

  if (isSubrahmanyaDomain(context)){
    for (const [k,v] of optionMap){
      if (v.mode.startsWith('monotone')) optionMap.delete(k);
    }
    const replaced = applySvaritaToUdattaWord(input);
    optionMap.set('udaatta-replaced::'+replaced, { form: replaced, mode: 'udaatta-replaced', sources:['1.2.37'] });
    reasoning.push('1.2.37-svarita-to-udaatta');
    reasoning.push('1.2.37-block-monotone');
    applied.add('1.2.37');

    const norm = normalizeToken(input);
    if (LEXICAL_ANUDATTA.deva.has(norm) || LEXICAL_ANUDATTA.brahmana.has(norm)){
      const lexical = forceLexicalAnudattaWord(replaced);
      optionMap.set('lexical-anudatta::'+lexical, { form: lexical, mode: 'lexical-anudatta', sources:['1.2.38'] });
      reasoning.push('1.2.38-lexical-anudatta');
      applied.add('1.2.38');
    }
  } else {
    const runs = detectSvaritaAnudattaRuns(input);
    if (runs.length){
      runs.forEach(run => {
        const local = applyLocalMonotone(input, run);
        optionMap.set('local-monotone::'+local, { form: local, mode: 'local-monotone', sources:['1.2.39'] });
      });
      reasoning.push('1.2.39-local-monotone-span');
      applied.add('1.2.39');
    }
  }

  const options = Array.from(optionMap.values());
  let primaryDecision = aggregateResult.primaryDecision;
  if (isSubrahmanyaDomain(context)) primaryDecision = 'accented';
  else if (options.some(o=>o.mode==='local-monotone')) primaryDecision = 'options';

  return {
    ...aggregateResult,
    options,
    primaryDecision,
    appliedSutras: Array.from(applied),
    reasoning
  };
}

export default integrateDomainProsody;
