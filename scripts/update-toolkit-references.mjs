import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const levelsDir = path.resolve(__dirname, '../data/levels');

// Mapping of scenario IDs to their toolkit references
const toolkitReferences = {
  'L1-S1': 'Values Explainer Cards, Impact Explorer, Future Story, Weighing Options, Ethics Frame',
  'L1-S2': 'Impact Explorer, Future Story, Ethics Frame',
  'L1-S3': 'Values Explainer Cards, Weighing Options',
  'L1-S4': 'Impact Explorer, Weighing Options',
  'L1-S5': 'Future Story, Ethics Frame',
  'L2-S1': 'Values Explainer Cards, Impact Explorer',
  'L2-S2': 'Future Story, Weighing Options',
  'L2-S3': 'Impact Explorer, Weighing Options',
  'L2-S4': 'Future Story, Ethics Frame',
  'L2-S5': 'Values Explainer Cards, Weighing Options',
  'L3-S1': 'Values Explainer Cards, Weighing Options',
  'L3-S2': 'Future Story, Ethics Frame',
  'L3-S3': 'Impact Explorer, Ethics Frame',
  'L3-S4': 'Values Explainer Cards, Weighing Options',
  'L3-S5': 'Impact Explorer, Ethics Frame',
  'L4-S1': 'Future Story, Weighing Options',
  'L4-S2': 'Impact Explorer, Ethics Frame',
  'L4-S3': 'Values Explainer Cards, Ethics Frame',
  'L4-S4': 'Future Story, Weighing Options',
  'L4-S5': 'Impact Explorer, Values Explainer Cards',
  'L5-S1': 'Impact Explorer, Weighing Options',
  'L5-S2': 'Values Explainer Cards, Future Story',
  'L5-S3': 'Impact Explorer, Ethics Frame',
  'L5-S4': 'Future Story, Weighing Options',
  'L5-S5': 'Values Explainer Cards, Ethics Frame',
  'L6-S1': 'Values Explainer Cards, Ethics Frame',
  'L6-S2': 'Impact Explorer, Weighing Options',
  'L6-S3': 'Future Story, Weighing Options',
  'L6-S4': 'Impact Explorer, Ethics Frame',
  'L6-S5': 'Values Explainer Cards, Weighing Options',
};

// Updated toolkit_cues and p3_cues
const updatedCues = {
  'L1-S1': {
    toolkit_cues: 'Which duties are inviolable? What counts as acceptable interim harm?',
    p3_cues: 'People (coercion), Planet (datacenter energy mix), Parity (who suffers outages).'
  },
  'L1-S2': {
    toolkit_cues: 'Who is helped or hurt by pause vs. phased transition? What risks grow if we wait?',
    p3_cues: 'People (exploitation), Planet (training energy), Parity (loss of access during pause).'
  },
  'L1-S3': {
    toolkit_cues: 'What do we owe moderators? Which protections are minimally required?',
    p3_cues: 'People (mental health), Planet (AI filtering compute), Parity (who is safest online).'
  },
  'L1-S4': {
    toolkit_cues: 'Who bears outages vs. bill savings? How can harms be fairly shared?',
    p3_cues: 'People (health/safety), Planet (energy use), Parity (burden distribution).'
  },
  'L1-S5': {
    toolkit_cues: 'What environmental and health risks are likely? Who is responsible for cleanup?',
    p3_cues: 'People (worker safety), Planet (toxic waste), Parity (who pays for remediation).'
  },
  'L2-S1': {
    toolkit_cues: 'Which fairness goal are we optimizing? Who absorbs false negatives?',
    p3_cues: 'People (rejected applicants), Planet (retraining compute), Parity (opportunity gaps).'
  },
  'L2-S2': {
    toolkit_cues: 'What privacy harms could arise from location scoring? What safer pilots exist?',
    p3_cues: 'People (over-indebted), Planet (always-on scoring), Parity (data-poor applicants).'
  },
  'L2-S3': {
    toolkit_cues: 'Who is mis-flagged and with what consequences? What low-intrusion options exist?',
    p3_cues: 'People (stress/dignity), Planet (video monitoring), Parity (false positives by skin tone).'
  },
  'L2-S4': {
    toolkit_cues: 'Where is data missing and how does it bias priority? Who can override and how?',
    p3_cues: 'People (care outcomes), Planet (compute), Parity (patients with thin histories).'
  },
  'L2-S5': {
    toolkit_cues: 'Is our process fair even if outcomes improve? What alternatives reduce surveillance load?',
    p3_cues: 'People (chilling effects), Planet (patrol miles), Parity (over-policing hot spots).'
  },
  'L3-S1': {
    toolkit_cues: 'How do we balance child safety with privacy by default? What mix limits harm?',
    p3_cues: 'People (victim safety), Planet (scale inference), Parity (over-policing certain groups).'
  },
  'L3-S2': {
    toolkit_cues: 'What abuse paths and secondary-trauma risks exist? What gates and response plans are required?',
    p3_cues: 'People (reviewer well-being), Planet (retraining cycles), Parity (access for small orgs).'
  },
  'L3-S3': {
    toolkit_cues: 'Do faster reports outweigh wrongful flags? Who reviews, how fast, and with what limits?',
    p3_cues: 'People (mislabeling harm), Planet (processing load), Parity (small platform capacity).'
  },
  'L3-S4': {
    toolkit_cues: 'Is monitoring the least intrusive means for safety? What non-AI measures could replace it?',
    p3_cues: 'People (student trust), Planet (data storage), Parity (guardian consent gaps).'
  },
  'L3-S5': {
    toolkit_cues: 'How does speed vs. evidence retention affect survivors? What safe proof and appeal paths exist?',
    p3_cues: 'People (re-trauma risk), Planet (storage), Parity (legal access pathways).'
  },
  'L4-S1': {
    toolkit_cues: 'What lock-in and surveillance risks arise? What exit and audit options hedge power?',
    p3_cues: 'People (data exposure), Planet (duplicated infra), Parity (market concentration).'
  },
  'L4-S2': {
    toolkit_cues: 'Who loses access if we leave the store? How will we pursue fairer fees and report outcomes?',
    p3_cues: 'People (user access), Planet (extra builds), Parity (gatekeeper rents).'
  },
  'L4-S3': {
    toolkit_cues: 'Who should capture value from public data? What reciprocity and audit terms are needed?',
    p3_cues: 'People (public benefit), Planet (retraining), Parity (vendor advantages).'
  },
  'L4-S4': {
    toolkit_cues: 'What conflicts of interest or influence risks exist? What safeguards keep curricula independent?',
    p3_cues: 'People (opinion shaping), Planet (program footprint), Parity (voice imbalance).'
  },
  'L4-S5': {
    toolkit_cues: 'What is the privacy cost of growth features? What partnership terms preserve public value?',
    p3_cues: 'People (communication access), Planet (redundancy), Parity (barriers for new entrants).'
  },
  'L5-S1': {
    toolkit_cues: 'What benefits come from memory vs. chilling effects? What privacy-preserving defaults fit?',
    p3_cues: 'People (speech/privacy), Planet (local vs. cloud energy), Parity (opt-in exclusion).'
  },
  'L5-S2': {
    toolkit_cues: 'Is price-for-privacy coercive here? What re-identification risks follow?',
    p3_cues: 'People (movement privacy), Planet (edge compute), Parity (regressive tradeoffs).'
  },
  'L5-S3': {
    toolkit_cues: 'Who becomes newly visible or targeted? What legitimacy and usage limits are required?',
    p3_cues: 'People (expectations), Planet (storage load), Parity (visibility of vulnerable groups).'
  },
  'L5-S4': {
    toolkit_cues: 'What residual re-ID risks remain? What safer sharing options exist for research?',
    p3_cues: 'People (stigma), Planet (DP/synthetic compute), Parity (who benefits).'
  },
  'L5-S5': {
    toolkit_cues: 'Is biometric entry necessary and proportional? What oversight and opt-outs enforce trust?',
    p3_cues: 'People (biometric risk), Planet (cameras), Parity (accuracy gaps).'
  },
  'L6-S1': {
    toolkit_cues: 'What does a just transition require here? What guardrails and KPIs prove it?',
    p3_cues: 'People (dignity/autonomy), Planet (compute intensity), Parity (who gains from productivity).'
  },
  'L6-S2': {
    toolkit_cues: 'How does scheduling affect burnout vs. stability? What co-designed alternatives fit?',
    p3_cues: 'People (fatigue), Planet (energy), Parity (frontline voice).'
  },
  'L6-S3': {
    toolkit_cues: 'What surveillance and skill-loss risks exist? Where should assist be limited?',
    p3_cues: 'People (morale/agency), Planet (compute per call), Parity (advancement paths).'
  },
  'L6-S4': {
    toolkit_cues: 'How do tiers shift income and access? What transparent floors and appeals are needed?',
    p3_cues: 'People (income swings), Planet (routing), Parity (bias by rating).'
  },
  'L6-S5': {
    toolkit_cues: 'Who should share automation gains? What mix of severance, training, and shared work is fair?',
    p3_cues: 'People (stability), Planet (facility use), Parity (training access).'
  },
};

async function updateLevelFiles() {
  const files = fs.readdirSync(levelsDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const filePath = path.join(levelsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let changed = false;

    content.scenarios = content.scenarios.map(scenario => {
      const scenarioId = scenario.scenario_id;
      
      if (toolkitReferences[scenarioId]) {
        scenario.toolkit_references = toolkitReferences[scenarioId];
        changed = true;
      }
      
      if (updatedCues[scenarioId]) {
        scenario.toolkit_cues = updatedCues[scenarioId].toolkit_cues;
        scenario.p3_cues = updatedCues[scenarioId].p3_cues;
        changed = true;
      }
      
      return scenario;
    });

    if (changed) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
      console.log(`✓ Updated ${file}`);
    } else {
      console.log(`- No changes needed for ${file}`);
    }
  }
  
  console.log('\nDone!');
}

updateLevelFiles().catch(console.error);

