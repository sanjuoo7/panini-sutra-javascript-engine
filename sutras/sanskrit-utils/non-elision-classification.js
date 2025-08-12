// Utility: non-elision-classification.js (aśiṣyam aggregation 1.2.53–1.2.57)

const REASON_MAP = {
  '1.2.53': 'technical-designation-authority',
  '1.2.54': 'lup-elision-noncurrency',
  '1.2.55': 'absence-of-etymological-meaning-triggers-non-visibility',
  '1.2.56': 'primary-or-affix-meaning-authority-elsewhere',
  '1.2.57': 'temporal-sequence-rule-unnecessary'
};

/** Determine aggregated non-elidable (aśiṣyam) status. */
export function classifyAshishya(item = {}, context = {}) {
  const res = {
    applied: false,
    nonElidable: false,
    logicalPresence: true,
    phoneticPresence: true,
    reasons: [],
    sutrasApplied: [],
    explanation: ''
  };
  const flags = context.ashishyaFlags || {};

  Object.entries(REASON_MAP).forEach(([sutra, reason]) => {
    const short = 's' + sutra.split('.').join('_');
    if (flags[short] || context.applyAllAshishya) {
      res.reasons.push(reason);
      res.sutrasApplied.push(sutra);
    }
  });

  if (item.technicalTerm && !res.sutrasApplied.includes('1.2.53')) {
    res.reasons.push(REASON_MAP['1.2.53']);
    res.sutrasApplied.push('1.2.53');
  }
  if (item.isPrimaryMeaningCarrier && !res.sutrasApplied.includes('1.2.56')) {
    res.reasons.push(REASON_MAP['1.2.56']);
    res.sutrasApplied.push('1.2.56');
  }
  if (item.isTemporalSubordinate && !res.sutrasApplied.includes('1.2.57')) {
    res.reasons.push(REASON_MAP['1.2.57']);
    res.sutrasApplied.push('1.2.57');
  }

  if (res.sutrasApplied.length) {
    res.applied = true;
    res.nonElidable = true;
    if (res.sutrasApplied.includes('1.2.55') && context.meaningAbsent) {
      res.phoneticPresence = false;
      res.reasons.push('logical-retention-phonetic-absence');
    }
    res.explanation = 'Aggregated aśiṣyam classification';
  } else {
    res.explanation = 'No aśiṣyam reasons detected';
  }
  return res;
}

export default { classifyAshishya };
