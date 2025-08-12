import { sutra_1_2_62 } from './index.js';

describe('Sutra 1.2.62 (विशाखयोश्च)', () => {
	test('applies singular optional for Viśākhā (IAST) in chandas', () => {
		const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra', chandas: true });
		expect(res.applied).toBe(true);
		expect(res.numberOptions).toEqual(expect.arrayContaining(['singular','dual']));
	});

	test('applies for Devanagari विशाखा singular', () => {
		const res = sutra_1_2_62('विशाखा', { semanticCategory: 'nakshatra', chandas: true });
		expect(res.applied).toBe(true);
	});

	test('fails without chandas', () => {
		const res = sutra_1_2_62('viśākhā', { domain: 'nakshatra' });
		expect(res.applied).toBe(false);
	});

	test('fails non-star', () => {
		const res = sutra_1_2_62('phalgunī', { domain: 'nakshatra', chandas: true });
		expect(res.applied).toBe(false);
	});

	test('invalid input', () => {
		const res = sutra_1_2_62(null, { domain: 'nakshatra', chandas: true });
		expect(res.applied).toBe(false);
	});
});
