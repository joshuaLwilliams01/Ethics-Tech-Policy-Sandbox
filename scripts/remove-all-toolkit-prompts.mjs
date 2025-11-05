import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levelsDir = path.resolve(__dirname, '../data/levels');
const levelFiles = fs.readdirSync(levelsDir).filter(f => f.endsWith('.json'));

async function removeAllPrompts() {
  for (const file of levelFiles) {
    const filePath = path.join(levelsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);
    let changed = false;

    data.scenarios = data.scenarios.map((scenario) => {
      if (scenario.toolkit_flow && scenario.toolkit_flow.prompts) {
        if (scenario.toolkit_flow.prompts.length > 0) {
          scenario.toolkit_flow.prompts = [];
          scenario.toolkit_flow.order = [];
          changed = true;
        }
      }
      return scenario;
    });

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`✓ Updated ${file} - removed all toolkit prompts`);
    } else {
      console.log(`- No changes needed for ${file}`);
    }
  }
  console.log('\nDone!');
}

removeAllPrompts().catch(console.error);

