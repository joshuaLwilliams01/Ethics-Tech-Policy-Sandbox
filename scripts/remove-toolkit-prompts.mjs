import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levelsDir = path.join(__dirname, '../data/levels');

// Patterns to match and remove (exact matches or starts with)
const promptsToRemove = [
  "T2 Clarify Values: Are workers being treated as ends in themselves or just means?",
  "T1 Map Impacts: Who benefits from the app? Who is harmed by low wages? Who loses access if paused?",
  "T3 Anticipate Risks: What are the risks of continuing vs. pausing? Consider service disruption, worker exploitation, public trust.",
  "T4 Alternatives: Evaluate each option and identify safeguards for your chosen path.",
  "T5 Accountability: Who is responsible for ensuring fair labor practices? What review process will you establish?"
];

// Also remove any prompts that start with these patterns
const patternsToRemove = [
  /^T2 Clarify Values:/,
  /^T1 Map Impacts:/,
  /^T3 Anticipate Risks:/,
  /^T4 Alternatives:/,
  /^T5 Accountability:/
];

for (let i = 1; i <= 6; i++) {
  const filePath = path.join(levelsDir, `level${i}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;
  
  data.scenarios.forEach(scenario => {
    if (scenario.toolkit_flow && Array.isArray(scenario.toolkit_flow.prompts)) {
      const originalPrompts = scenario.toolkit_flow.prompts;
      
      // Filter out exact matches and pattern matches
      const filteredPrompts = originalPrompts.filter(prompt => {
        // Check exact matches
        if (promptsToRemove.includes(prompt)) {
          return false;
        }
        
        // Check pattern matches
        for (const pattern of patternsToRemove) {
          if (pattern.test(prompt)) {
            return false;
          }
        }
        
        return true;
      });
      
      if (filteredPrompts.length !== originalPrompts.length) {
        scenario.toolkit_flow.prompts = filteredPrompts;
        changed = true;
        console.log(`  Removed ${originalPrompts.length - filteredPrompts.length} prompt(s) from ${scenario.scenario_id}`);
      }
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✓ Updated level${i}.json\n`);
  } else {
    console.log(`- No changes needed for level${i}.json\n`);
  }
}

console.log('Done! All generic toolkit prompts removed.');

