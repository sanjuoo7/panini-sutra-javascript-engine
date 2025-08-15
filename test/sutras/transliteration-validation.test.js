import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate that all sutra_text_iast fields are free of Devanagari matras / signs
// and known corrected forms are present.

describe('Transliteration data integrity', () => {
  const repoRoot = path.resolve(__dirname, '../..');
  const enhancedPath = path.join(repoRoot, 'sutras', 'enhanced-panini-sutras.normalized.json');
  const primaryPath = path.join(repoRoot, 'sutras', 'enhanced-panini-sutras.json');
  const dataPath = fs.existsSync(enhancedPath) ? enhancedPath : primaryPath; // prefer normalized if present
  if(!fs.existsSync(dataPath)) {
    console.warn('Transliteration data file missing, skipping tests:', dataPath);
    return; // abort suite
  }
  const json = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  test('no Devanagari vowel signs remain in sutra_text_iast', () => {
    const forbidden = /[\u093e-\u094d\u0900-\u0915]/; // basic range including matras & some letters
    for(const e of json){
      if(!e || !e.sutra_text_iast) continue;
      expect(forbidden.test(e.sutra_text_iast)).toBe(false);
    }
  });

  test('specific known correction: laśakvataddhite present (1.3.8)', () => {
    const s = json.find(e => e && e.sutra_number === '1.3.8');
    expect(s).toBeTruthy();
    expect(s.sutra_text_iast).toBe('laśakvataddhite');
  });
});
