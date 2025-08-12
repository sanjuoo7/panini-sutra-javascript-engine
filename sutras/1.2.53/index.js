/** Sutra 1.2.53: तदशिष्यं संज्ञाप्रमाणत्वात् */
import { classifyAshishya } from '../sanskrit-utils/non-elision-classification.js';
export function applySutra1_2_53(item, context={}) { return { sutra:'1.2.53', ...classifyAshishya(item, { ...context, ashishyaFlags:{ s1_2_53:true } }) }; }
export default applySutra1_2_53;
