/** Sutra 1.2.56: प्रधानप्रत्ययार्थवचनमर्थस्यान्यप्रमाणत्वात् */
import { classifyAshishya } from '../sanskrit-utils/non-elision-classification.js';
export function applySutra1_2_56(item, context={}) { return { sutra:'1.2.56', ...classifyAshishya(item, { ...context, ashishyaFlags:{ s1_2_56:true } }) }; }
export default applySutra1_2_56;
