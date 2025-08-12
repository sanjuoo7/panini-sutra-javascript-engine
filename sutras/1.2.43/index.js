/** Sutra 1.2.43: प्रथमानिर्दिष्टं समासे उपसर्जनम् */
import { identifyUpasarjana } from '../sanskrit-utils/compound-analysis.js';

export function applySutra1_2_43(compound, opts={}){
  const res = identifyUpasarjana(compound, { nominativeIndices: opts.nominativeIndices || [], evaluateEkavibhakti:false });
  return { sutra: '1.2.43', ...res };
}
export default applySutra1_2_43;
