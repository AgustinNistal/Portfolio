import fs from 'fs';
import path from 'path';

const dirs = [
  'app/(senderosur)',
  'components/senderosur',
  'lib/senderosur',
  'hooks/senderosur',
  'contexts/senderosur'
];

function processFiles() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) continue;
      if (!file.name.match(/\.(ts|tsx|css)$/)) continue;
      
      const filePath = path.join(file.parentPath || file.path, file.name);
      
      let content = fs.readFileSync(filePath, 'utf-8');
      let newContent = content
        .replace(/@\/components\/senderosur\/senderosur\//g, '@/components/senderosur/')
        .replace(/@\/lib\/senderosur\/senderosur\//g, '@/lib/senderosur/')
        .replace(/@\/hooks\/senderosur\/senderosur\//g, '@/hooks/senderosur/')
        .replace(/@\/contexts\/senderosur\/senderosur\//g, '@/contexts/senderosur/')
        .replace(/@\/app\/\(senderosur\)\/senderosur\/senderosur\//g, '@/app/(senderosur)/senderosur/');

      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Fixed double replacement in ${filePath}`);
      }
    }
  }
}

try {
  processFiles();
  console.log("SUCCESS");
} catch(e) {
  console.error("ERROR:", e);
}
