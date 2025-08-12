/** Sutra 1.2.49: लुक् तद्धितलुकि */
import { isLukSluLup } from '../1.1.61/index.js';

export function applySutra1_2_49(members, context = {}) {
  const res = { sutra: '1.2.49', applies: false, elidedFeminineIndices: [], count: 0, structureUpdated: false, explanation: '' };
  if (!Array.isArray(members)) {
    res.explanation = 'Members must be array';
    return res;
  }
  if (context.taddhitaElisionType !== 'luk' || !isLukSluLup(context.taddhitaElisionType)) {
    res.explanation = 'No taddhita luk elision context';
    return res;
  }
  members.forEach((m, i) => {
    if (m && m.role === 'upasarjana' && (m.gender === 'feminine' || m.hasFeminineAffix) && !m.elided) {
      m.elided = true;
      m.elisionType = 'luk';
      res.elidedFeminineIndices.push(i);
    }
  });
  if (res.elidedFeminineIndices.length) {
    res.applies = true;
    res.count = res.elidedFeminineIndices.length;
    res.structureUpdated = true;
    res.explanation = 'Feminine upasarjana affix elided (luk)';
  } else {
    res.explanation = 'No eligible feminine upasarjana members';
  }
  return res;
}
export default applySutra1_2_49;
