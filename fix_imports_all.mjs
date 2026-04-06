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
  [/@\/contexts\/auth-context/g, '@/contexts/senderosur/auth-context'],
  [/@\/contexts\/language-context/g, '@/contexts/senderosur/language-context'],
  [/@\/components\/routes\//g, '@/components/senderosur/routes/'],
  [/@\/components\/accommodations\//g, '@/components/senderosur/accommodations/'],
  [/@\/components\/profile\//g, '@/components/senderosur/profile/'],
  [/@\/components\/home\//g, '@/components/senderosur/home/'],
  [/@\/hooks\/api-helper/g, '@/hooks/senderosur/api-helper'],
  [/@\/components\/auth-modal/g, '@/components/senderosur/auth-modal'],
  [/@\/components\/language-switcher/g, '@/components/senderosur/language-switcher'],
  [/@\/lib\/data/g, '@/lib/senderosur/data'],
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
