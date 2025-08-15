#!/usr/bin/env node
/**
 * Normalizes corrupted "IAST" transliterations where Latin base letters have Devanagari matras appended.
 * Strategy:
 * 1. Replace patterns a + matra with the corresponding full vowel; also handles consonant+a sequences.
 * 2. Map standalone matras after other vowels (rare) to appended vowel.
 * 3. Convert anusvara/visarga/candrabindu following Latin to Sanskrit transliteration (ṃ, ḥ, ̃ or ṃ).
 * 4. Replace avagraha with apostrophe.
 * 5. Remove lingering Devanagari combining marks.
 * 6. Collapse whitespace; NFC normalize.
 */
const fs = require('fs');
const path = require('path');

const MATRA_MAP = {
  'ा': 'ā',
  'ि': 'i',
  'ी': 'ī',
  'ु': 'u',
  'ू': 'ū',
  'ृ': 'ṛ',
  'ॄ': 'ṝ',
  'ॢ': 'ḷ',
  'ॣ': 'ḹ',
  'े': 'e',
  'ै': 'ai',
  'ो': 'o',
  'ौ': 'au'
};
const SIGN_MAP = {
  'ं': 'ṃ',
  'ः': 'ḥ',
  'ँ': 'ṃ'
};

const DEVANAGARI_SIGNS = /[ािीुूृॄॢॣेैोौंःँ]/g;

function fixCorruptIAST(raw) {
  if (!raw || typeof raw !== 'string') return raw;
  let s = raw.normalize('NFC');
  s = s.replace(/ऽ/g, "'");
  s = s.replace(/([bcdfghjklmnpqrstvwxyzA-Zṃḥśṣṭḍṇṅñṛṝḷḹ]*?)a([ािीुूृॄॢॣेैोौ])/g, (_, pref, matra) => pref + MATRA_MAP[matra]);
  s = s.replace(/([aeiouṛṝḷḹ])a([ेैोौ])/g, (_, v, matra) => v + MATRA_MAP[matra]);
  s = s.replace(/([bcdfghjklmnpqrstvwxyzṛṝḷḹśṣṅñṭḍṇ]+)([ािीुूृॄॢॣेैोौ])/g, (m, cons, matra) => cons + MATRA_MAP[matra]);
  s = s.replace(/([a-zA-Zṛṝḷḹśṣṅñṭḍṇ])([ंःँ])/g, (_, base, sign) => base + SIGN_MAP[sign]);
  s = s.replace(/्/g, '');
  s = s.replace(DEVANAGARI_SIGNS, ch => MATRA_MAP[ch] || SIGN_MAP[ch] || '');
  if (/[क-ह]/.test(s)) return raw; // if still has Devanagari letters, leave untouched
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function processFile(inputPath, outputPath) {
  const json = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  let changed = 0;
  let scanned = 0;
  json.forEach(entry => {
    if (entry && typeof entry === 'object' && entry.sutra_text_iast) {
      scanned++;
      const fixed = fixCorruptIAST(entry.sutra_text_iast);
      if (fixed !== entry.sutra_text_iast) {
        entry.sutra_text_iast = fixed;
        changed++;
      }
    }
  });
  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2) + '\n');
  return { scanned, changed, outputPath };
}

if (require.main === module) {
  const repoRoot = path.resolve(__dirname, '..');
  const input = path.join(repoRoot, 'sutras', 'enhanced-panini-sutras.json');
  const output = path.join(repoRoot, 'sutras', 'enhanced-panini-sutras.normalized.json');
  if (!fs.existsSync(input)) {
    console.error('Input file not found:', input);
    process.exit(1);
  }
  const { scanned, changed, outputPath } = processFile(input, output);
  console.log(`Normalization complete. Entries scanned: ${scanned}, changed: ${changed}. Output: ${outputPath}`);
}

module.exports = { fixCorruptIAST, processFile };
