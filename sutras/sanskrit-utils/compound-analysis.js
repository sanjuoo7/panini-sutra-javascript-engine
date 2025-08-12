/**
 * Compound Analysis Utilities (Supports Sutras 1.2.42-1.2.44)
 */

export function classifyTatpurushaSubtype(compound){
  if (!compound || compound.type !== 'tatpurusha' || !Array.isArray(compound.members)) {
    return { subtype: null, reason: 'Not tatpurusha' };
  }
  const cases = compound.members.map(m => m.case).filter(c => !!c);
  if (!cases.length) return { subtype: null, reason: 'No case data' };
  const allSame = cases.every(c => c === cases[0]);
  if (allSame) return { subtype: 'karmadharaya', reason: 'All member cases identical (1.2.42)' };
  return { subtype: null, reason: 'Member cases differ' };
}

export function identifyUpasarjana(compound, opts = {}) {
  const nominativeIndices = new Set(opts.nominativeIndices || []);
  const ekavibhakti = opts.evaluateEkavibhakti !== false;
  if (!compound || !Array.isArray(compound.members)) return { upasarjanaIndices: [], members: [], reasons: ['Invalid compound'] };
  const reasons = [];
  const members = compound.members.map((m,i) => ({ ...m }));
  const upa = new Set();
  // 1.2.43 nominative-indicated
  members.forEach((m,i)=>{ if (nominativeIndices.has(i) || m.case === 'nom-rule') { upa.add(i); reasons.push(`1.2.43-nominative-${i}`);} });
  // 1.2.44 ekavibhakti
  if (ekavibhakti){
    members.forEach((m,i)=>{ if (m.fixedCase === true){ upa.add(i); reasons.push(`1.2.44-ekavibhakti-${i}`);} });
  }
  members.forEach((m,i)=>{ m.upasarjana = upa.has(i); });
  return { upasarjanaIndices: Array.from(upa), members, reasons };
}

export default { classifyTatpurushaSubtype, identifyUpasarjana };
