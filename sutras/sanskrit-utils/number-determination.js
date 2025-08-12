// Utility: number-determination.js supports 1.2.58–1.2.59 optional number logic

const PRONOUN_ASMAD_FORMS = new Set(['asmad', 'अस्मद्']);

export function determineOptionalNumber(term, context = {}) {
  const res = {
    sutra: '1.2.58',
    applied: false,
    baseTerm: term,
    numberOptions: [],
    optionalPlural: false,
    explanation: ''
  };
  if (typeof term !== 'string' || !term) {
    res.explanation = 'Invalid term';
    return res;
  }
  const isClass = context.isClassNoun || context.semanticCategory === 'jati';
  if (!isClass) {
    res.explanation = 'Not a class noun';
    return res;
  }
  res.numberOptions = ['singular', 'plural'];
  res.optionalPlural = true;
  res.applied = true;
  res.explanation = 'Class noun allows optional plural for singular sense';
  return res;
}

export function extendOptionalNumberWithAsmad(term, priorResult, context = {}) {
  const res = {
    sutra: '1.2.59',
    applied: false,
    numberOptions: priorResult ? [...(priorResult.numberOptions || [])] : [],
    explanation: ''
  };
  if (typeof term !== 'string' || !term) {
    res.explanation = 'Invalid term';
    return res;
  }
  const normalized = term.trim();
  const isAsmad = PRONOUN_ASMAD_FORMS.has(normalized);
  if (!isAsmad) {
    res.explanation = 'Not asmad pronoun';
    return res;
  }
  if (!res.numberOptions.length) res.numberOptions = ['singular'];
  if (!res.numberOptions.includes('plural')) res.numberOptions.push('plural');
  res.applied = true;
  res.explanation = 'Asmad pronoun allows optional plural even for singular/dual sense';
  return res;
}

export default { determineOptionalNumber, extendOptionalNumberWithAsmad };
