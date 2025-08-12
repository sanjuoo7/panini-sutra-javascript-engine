/** Sutra 1.2.45: अर्थवदधातुरप्रत्ययः प्रातिपदिकम् */
import { isPratipadikaBase } from '../sanskrit-utils/pratipadika-classification.js';

export function applySutra1_2_45(form, context={}){
  const base = isPratipadikaBase(form, context);
  return { sutra: '1.2.45', form, applies: base, isPratipadikaBase: base };
}
export default applySutra1_2_45;
