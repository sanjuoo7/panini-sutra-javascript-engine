/** Sutra 1.2.44: एकविभक्ति चापूर्वनिपाते */
import { identifyUpasarjana } from '../sanskrit-utils/compound-analysis.js';

export function applySutra1_2_44(compound){
  const res = identifyUpasarjana(compound, { evaluateEkavibhakti:true });
  return { sutra: '1.2.44', ...res };
}
export default applySutra1_2_44;
