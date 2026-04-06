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
        .replace(/@\/components\//g, '@/components/senderosur/')
        .replace(/@\/lib\//g, '@/lib/senderosur/')
        .replace(/@\/hooks\//g, '@/hooks/senderosur/')
        .replace(/@\/contexts\//g, '@/contexts/senderosur/');
        
      if (filePath.endsWith('globals.css')) {
          newContent = newContent.replace(/@\/styles\//g, '@/app/(senderosur)/senderosur/');
      }

      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${filePath}`);
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
