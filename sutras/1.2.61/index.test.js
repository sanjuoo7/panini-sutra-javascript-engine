import { sutra_1_2_61 } from './index.js';

describe('Sutra 1.2.61 (छन्दसि पुनर्वस्वोरेकवचनम्)', () => {
	test('applies singular optional for Punarvasu (IAST) in chandas nakshatra', () => {
		const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra', chandas: true });
		expect(res.applied).toBe(true);
		expect(res.numberOptions).toEqual(expect.arrayContaining(['singular','dual']));
		expect(res.optionalSingular).toBe(true);
	});

	test('applies for Devanagari पुनर्वसू singular', () => {
		const res = sutra_1_2_61('पुनर्वसू', { semanticCategory: 'nakshatra', chandas: true });
		expect(res.applied).toBe(true);
	});

	test('fails without chandas flag', () => {
		const res = sutra_1_2_61('punarvasu', { domain: 'nakshatra' });
		expect(res.applied).toBe(false);
	});

	test('fails outside nakshatra domain', () => {
		const res = sutra_1_2_61('punarvasu', { chandas: true });
		expect(res.applied).toBe(false);
	});

	test('non-star singular rejected', () => {
		const res = sutra_1_2_61('rama', { domain: 'nakshatra', chandas: true });
		expect(res.applied).toBe(false);
	});

	test('invalid input handled', () => {
		const res = sutra_1_2_61('', { domain: 'nakshatra', chandas: true });
		expect(res.applied).toBe(false);
	});
});
