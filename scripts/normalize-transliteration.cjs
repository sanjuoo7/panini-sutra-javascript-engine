#!/usr/bin/env node
/** Normalizes corrupted transliterations (Latin + Devanagari matras) to clean IAST. */
const fs = require('fs');
const path = require('path');

const MATRA_MAP = { 'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','ॣ':'ḹ','े':'e','ै':'ai','ो':'o','ौ':'au'};
const SIGN_MAP = { 'ं':'ṃ','ः':'ḥ','ँ':'ṃ'};
const DEVANAGARI_SIGNS = /[ािीुूृॄॢॣेैोौंःँ]/g;

// Manual corrections for edge cases the heuristic compresses
const CORRECTIONS = {
  'laśakavatadadhite': 'laśakvataddhite'
};

function fixCorruptIAST(raw){
  if(!raw||typeof raw!=='string') return raw; let s=raw.normalize('NFC');
  s=s.replace(/ऽ/g,"'");
  s=s.replace(/([bcdfghjklmnpqrstvwxyzA-Zṃḥśṣṭḍṇṅñṛṝḷḹ]*?)a([ािीुूृॄॢॣेैोौ])/g,(_,p,m)=>p+MATRA_MAP[m]);
  s=s.replace(/([aeiouṛṝḷḹ])a([ेैोौ])/g,(_,v,m)=>v+MATRA_MAP[m]);
  s=s.replace(/([bcdfghjklmnpqrstvwxyzṛṝḷḹśṣṅñṭḍṇ]+)([ािीुूृॄॢॣेैोौ])/g,(m,c,ma)=>c+MATRA_MAP[ma]);
  s=s.replace(/([a-zA-Zṛṝḷḹśṣṅñṭḍṇ])([ंःँ])/g,(_,b,sg)=>b+SIGN_MAP[sg]);
  s=s.replace(/्/g,'');
  s=s.replace(DEVANAGARI_SIGNS,ch=>MATRA_MAP[ch]||SIGN_MAP[ch]||'');
  if(/[क-ह]/.test(s)) return raw; // leave proper Devanagari untouched
  s = s.replace(/\s+/g,' ').trim();
  if (CORRECTIONS[s]) return CORRECTIONS[s];
  return s;
}
function processFile(inputPath,outputPath){
  const json=JSON.parse(fs.readFileSync(inputPath,'utf8')); let changed=0,scanned=0;
  json.forEach(e=>{ if(e&&e.sutra_text_iast){ scanned++; const f=fixCorruptIAST(e.sutra_text_iast); if(f!==e.sutra_text_iast){ e.sutra_text_iast=f; changed++; } } });
  fs.writeFileSync(outputPath, JSON.stringify(json,null,2)+'\n');
  return {changed,scanned,outputPath};
}
if(require.main===module){
  const repoRoot=path.resolve(__dirname,'..');
  const input=path.join(repoRoot,'sutras','enhanced-panini-sutras.json');
  const inPlace = process.argv.includes('--in-place');
  const output=inPlace?input:path.join(repoRoot,'sutras','enhanced-panini-sutras.normalized.json');
  if(!fs.existsSync(input)){ console.error('Input missing',input); process.exit(1);} 
  // If in-place, make a timestamped backup first
  if(inPlace){
    const backup = path.join(repoRoot,'sutras',`enhanced-panini-sutras.backup-${Date.now()}.json`);
    fs.copyFileSync(input, backup);
    console.log('Backup created at', backup);
  }
  const {changed,scanned,outputPath}=processFile(input,output);
  console.log(`Normalization complete. Scanned ${scanned}, changed ${changed}. Output: ${outputPath}${inPlace?' (in-place)':''}`);
}
module.exports={fixCorruptIAST,processFile};
