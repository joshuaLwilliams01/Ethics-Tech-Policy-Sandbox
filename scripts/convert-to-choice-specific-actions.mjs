import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levelsDir = path.resolve(__dirname, '../data/levels');
const levelFiles = fs.readdirSync(levelsDir).filter(f => f.endsWith('.json'));

// Quick actions for each choice based on the scenario context
// This is a template - you may need to customize actions per scenario
function getChoiceSpecificActions(originalActions, scenarioId) {
  // For now, we'll use the same actions for all choices, but structure them as choice-specific
  // You can customize this later to have different actions per choice
  return {
    A: originalActions || [],
    B: originalActions || [],
    C: originalActions || []
  };
}

async function convertToChoiceSpecific() {
  for (const file of levelFiles) {
    const filePath = path.join(levelsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(content);
    let changed = false;

    data.scenarios = data.scenarios.map((scenario) => {
      if (scenario.toolkit_flow && scenario.toolkit_flow.quick_actions) {
        // Check if it's already an object (choice-specific)
        if (Array.isArray(scenario.toolkit_flow.quick_actions)) {
          // Convert array to choice-specific object
          const originalActions = scenario.toolkit_flow.quick_actions;
          scenario.toolkit_flow.quick_actions = {
            A: originalActions,
            B: originalActions,
            C: originalActions
          };
          changed = true;
        }
      }
      return scenario;
    });

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`✓ Updated ${file} - converted to choice-specific actions`);
    } else {
      console.log(`- No changes needed for ${file}`);
    }
  }
  console.log('\nDone! All quick_actions are now choice-specific objects.');
  console.log('Note: Currently all choices (A, B, C) have the same actions.');
  console.log('You can manually edit the JSON files to differentiate actions per choice.');
}

convertToChoiceSpecific().catch(console.error);

