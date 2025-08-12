/** Sutra 1.2.46: कृत्तद्धितसमासाश्च */
import { getPratipadikaAnalysis } from '../sanskrit-utils/pratipadika-classification.js';

export function applySutra1_2_46(form, context={}){
  const analysis = getPratipadikaAnalysis(form, context);
  return { sutra: '1.2.46', ...analysis };
}
export default applySutra1_2_46;
