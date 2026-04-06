import fs from 'fs';
import path from 'path';

const directories = [
  'app/(senderosur)',
  'components/senderosur',
  'lib/senderosur',
  'hooks/senderosur',
  'contexts/senderosur'
];

const replacements = [
  [/@\/components\//g, '@/components/senderosur/'],
  [/@\/lib\//g, '@/lib/senderosur/'],
  [/@\/hooks\//g, '@/hooks/senderosur/'],
  [/@\/contexts\//g, '@/contexts/senderosur/'],
];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walk(full);
    } else if (/\.(tsx?|css)$/.test(entry.name)) {
      let txt = fs.readFileSync(full, 'utf8');
      let changed = false;
      for (const [re, rep] of replacements) {
        const newTxt = txt.replace(re, rep);
        if (newTxt !== txt) { txt = newTxt; changed = true; }
      }
      if (changed) {
        fs.writeFileSync(full, txt, 'utf8');
        console.log('Updated:', full);
      }
    }
  }
}

for (const d of directories) walk(d);
console.log('Done!');
