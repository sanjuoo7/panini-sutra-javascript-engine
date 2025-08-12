/** Sutra 1.2.55: योगप्रमाणे च तदभावेऽदर्शनं स्यात् */
import { classifyAshishya } from '../sanskrit-utils/non-elision-classification.js';
export function applySutra1_2_55(item, context={}) { return { sutra:'1.2.55', ...classifyAshishya(item, { ...context, ashishyaFlags:{ s1_2_55:true } }) }; }
export default applySutra1_2_55;
