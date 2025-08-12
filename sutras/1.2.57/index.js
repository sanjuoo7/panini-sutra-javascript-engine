/** Sutra 1.2.57: कालोपसर्जने च तुल्यम् */
import { classifyAshishya } from '../sanskrit-utils/non-elision-classification.js';
export function applySutra1_2_57(item, context={}) { return { sutra:'1.2.57', ...classifyAshishya(item, { ...context, ashishyaFlags:{ s1_2_57:true } }) }; }
export default applySutra1_2_57;
