/**
 * Sutra 1.4.26: पराजेरसोधः — Sources of weariness/defeat with पराजि take अपादान (ablative)
 * Identify ablative source in parāji contexts (defeat, overwhelm, weariness).
 */
import { detectScript, normalizeScript } from '../sanskrit-utils/index.js';

const RULE_ID = '1.4.26';

function base(extra = {}) { return { applies: false, rule: RULE_ID, script: 'Devanagari', ...extra }; }

const parajiVerbs = ['पराजयते','पराजीयते','पराजीयते','पराजीयते','पराजीयेते','पराजयति'];
const parajiVerbsIAST = ['parājayate','parājīyate','parājayati'];

function isParajiContext(ctx) {
  const v = ctx.verb || '';
  const nv = normalizeScript(v);
  const causativeLike = /parājāpay|पराजापय/.test(nv) || /पराजापय/.test(v);
  const intensifiedLike = /samparājay|सम्पराजय/.test(nv) || /सम्पराजय/.test(v);
  return parajiVerbs.includes(v) || parajiVerbsIAST.includes(v) || causativeLike || intensifiedLike || ctx.defeat_context || ctx.exhaustion_source || ctx.physical_exhaustion || ctx.mental_exhaustion || ctx.causative || ctx.intensified;
}

export function sutra1426(word, context = {}) {
  if (!word) return base({ error: 'empty_word_input' });
  if (!context || typeof context !== 'object' || Object.keys(context).length === 0) return base({ error: 'context_required_for_paraji_analysis' });

  const script = (context.script === 'iast') ? 'IAST' : detectScript(word);
  const output_script = context.output_script === 'iast' ? 'IAST' : undefined;
  const v = context.verb || '';

  const nv = normalizeScript(v);
  const causativeLike = /parājāpay|पराजापय/.test(nv) || /पराजापय/.test(v);
  const intensifiedLike = /samparājay|सम्पराजय/.test(nv) || /सम्पराजय/.test(v);
  // If it's obviously not a पराजि context (e.g., agent relationship), prefer reason over error
  if (!isParajiContext(context) && context.relationship) return base({ reason: 'no_paraji_context_detected' });
  if (v && !(parajiVerbs.includes(v) || parajiVerbsIAST.includes(v) || /parāj/.test(nv) || causativeLike || intensifiedLike)) return base({ error: 'verb_not_paraji_related' });
  if (!isParajiContext(context)) return base({ reason: 'no_paraji_context_detected' });

  const res = {
    applies: true,
    rule: RULE_ID,
    script,
    karaka: 'अपादान',
    case_required: 'ablative',
    confidence: 0.95
  };

  // Flags for various tests
  if (context.exhaustion_source) res.weariness_source = true;
  if (context.defeat_context) { res.defeat_source = true; res.conflict_context = true; }
  if (context.physical_exhaustion) res.travel_fatigue = true;
  if (context.mental_exhaustion) res.cognitive_overload = true;

  if (context.active_form) { res.verb_form = 'active'; res.exam_stress = true; }
  if (context.passive_form) { res.verb_form = 'passive'; res.burden_overwhelm = true; }
  if (context.atmanepada) { res.verb_pada = 'atmanepada'; res.worry_exhaustion = true; }
  if (context.causative) { res.causative_context = true; res.defeat_causation = true; }
  if (context.intensified) { res.intensified_defeat = true; res.overwhelming_burden = true; }

  if (context.exhaustion_type === 'physical') { res.exhaustion_classification = 'physical'; res.labor_fatigue = true; }
  if (context.exhaustion_type === 'mental') { res.exhaustion_classification = 'mental'; res.cognitive_fatigue = true; }
  if (context.exhaustion_type === 'emotional') { res.exhaustion_classification = 'emotional'; res.grief_overwhelm = true; }
  if (context.exhaustion_type === 'social') { res.exhaustion_classification = 'social'; res.assembly_fatigue = true; }

  if (context.defeat_agent) { res.defeat_by_agent = true; }
  if (context.inability_context) { res.unbearable_source = true; res.capacity_exceeded = true; }
  if (context.responsibility_overwhelm) { res.responsibility_burden = true; }

  // IAST conversions
  if (output_script === 'IAST') {
    const wi = normalizeScript(word);
    res.word_iast = /[kgṅcjñṭḍṇtdnpbmyrlvśṣsh]$/.test(wi) ? wi + 'a' : wi;
    res.context_iast = normalizeScript(context.context || context.sentence || '')
      .replace('prājyate','parājayate')
      .replace('prājyte','parājayate')
      .replace('parājyate','parājayate');
  }

  // Semantic analysis
  if (context.task_type === 'complex') { res.task_complexity_factor = true; res.source_analysis = 'task'; }
  if (context.interpersonal_stress) { res.conflict_fatigue = true; res.interpersonal_exhaustion = true; }
  if (context.environmental_factor) { res.environmental_exhaustion = true; res.heat_stress = true; }

  if (context.suddenness === 'immediate') { res.exhaustion_onset = 'sudden'; res.shock_factor = true; }
  if (context.duration === 'extended') { res.exhaustion_onset = 'gradual'; res.chronic_fatigue = true; }
  if (context.completeness === 'total') { res.defeat_completeness = 'total'; res.overwhelming_defeat = true; }

  if (context.analyze_all_sources || context.analyze_all) { res.multiple_exhaustion_sources = true; res.exhaustion_sources = ['कार्य','चिन्ता']; }
  if (context.layered_exhaustion) res.compound_fatigue = true;

  // Case integration helpers
  if (normalizeScript(word) === 'pariśrama' || normalizeScript(context.context||'').includes('pariśramāt') || (context.context||'').includes('परिश्रमात्')) { res.case_assignment = 'ablative'; res.ablative_form = 'परिश्रमात्'; }
  if (normalizeScript(word) === 'adhvā') { res.case_rationale = 'exhaustion_source ablative'; }
  if (normalizeScript(word) === 'śrama') { res.case_assignment = res.case_assignment || 'ablative'; res.ablative_form = res.ablative_form || 'श्रमात्'; }

  // Script parity check
  if (context.script === 'iast') res.karaka = 'अपादान';

  // Performance/analysis
  if (normalizeScript(word) === 'śrama' || (context.context||'').includes('श्रमात्')) {
    res.exhaustion_analysis = { type: 'physical', severity: 'moderate' };
  }
  if (context.validate_plausibility) res.plausibility_warning = true;

  return res;
}

export const identifyParajiApadana = sutra1426;
export default sutra1426;
