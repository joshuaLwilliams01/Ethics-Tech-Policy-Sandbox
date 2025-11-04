#!/usr/bin/env bash
set -euo pipefail

# -------- config --------
ISSUES=${ISSUES:-true}           # set to false to skip GitHub issue creation
REPO_NAME=$(basename "$PWD")     # assumes you're in repo root
# ------------------------

say(){ printf "\n\033[1;36m▶ %s\033[0m\n" "$*"; }
ok(){  printf "\033[1;32m✓ %s\033[0m\n" "$*"; }
warn(){printf "\033[1;33m! %s\033[0m\n" "$*"; }

# 0) sanity
if [ ! -f package.json ]; then
  echo "Run this in your project root (package.json not found)."; exit 1;
fi

# 1) add npm scripts used in the plan
say "Ensuring useful npm scripts"
node - <<'EOF'
const fs=require('fs'); const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
pkg.scripts ||= {};
pkg.scripts['validate:content'] ||= "node scripts/validate-content.js";
pkg.scripts['seed'] ||= "node scripts/seed.js";
pkg.scripts['dev'] ||= pkg.scripts['dev'] || "next dev";
fs.writeFileSync('package.json', JSON.stringify(pkg,null,2));
EOF
ok "npm scripts updated"

# 2) validator script using zod schema in lib/content.ts
say "Adding content validator"
mkdir -p scripts
cat > scripts/validate-content.js <<'VALIDATOR_EOF'
import { loadAllLevels } from "../lib/content.js";
(async ()=>{
  try{
    const packs = await loadAllLevels();
    let total=0;
    packs.forEach(p=> total += p.scenarios.length);
    console.log(`OK: Loaded ${packs.length} levels, ${total} scenarios.`);
    process.exit(0);
  }catch(e){
    console.error("Validation failed:\n", e?.issues || e);
    process.exit(1);
  }
})();
VALIDATOR_EOF
ok "scripts/validate-content.js created"

# 3) Cursor-ready tasks (prompts) by phase
say "Creating /cursor-tasks with copy-paste prompts"
mkdir -p cursor-tasks

cat > cursor-tasks/phase1-content-types.md <<'EOF'
## Phase 1 — Wire content & types
**P1.1 Types**
@workspace Create strict types in @lib/types.ts (ChoiceKey, ToolkitFlow, Scenario, LevelPack) with JSDoc.

**P1.2 Loader & zod**
Implement @lib/content.ts with zod schemas and functions:
- loadLevel(level:number)
- loadAllLevels()

**P1.3 Validate JSON**
Validate @data/levels/level1.json … level6.json against the zod schema. Do NOT change scenario prose. If toolkit_flow missing, add using our pattern. Return safe diffs.
EOF

cat > cursor-tasks/phase2-solo-runner.md <<'EOF'
## Phase 2 — Individual runner
**P2.1 ScenarioCard**
Create @components/ScenarioCard.tsx:
- Render prompt + A/B/C radios
- Embed @components/ToolkitCard (use scenario.toolkit_flow)
- Embed @components/P3Strip
- Reflection textarea (min 180 chars)
- Submit disabled until choice selected + quick_actions all checked

**P2.2 Runner page**
Update @app/play/individual/[id]/page.tsx to:
- load level via loadLevel()
- track scenario index
- store submissions locally (no DB yet)
- Next/Prev navigation + progress
EOF

cat > cursor-tasks/phase3-scoring-persistence.md <<'EOF'
## Phase 3 — Scoring & persistence
**P3.1 Scoring**
Implement scoreDecision(...) in @lib/scoring.ts using weights from @data/scoring-rubric.json.
Add @components/ScorePanel.tsx to visualize breakdown.

**P3.2 Supabase helpers**
Complete @supabase/schema.sql and @supabase/policies.sql (profiles, runs, run_steps).
In @lib/supabaseClient.ts add:
- createRun(mode)
- saveRunStep(runId, payload)
- finalizeRun(runId)

**P3.3 Wire persistence**
In @app/play/individual/[id]/page.tsx:
- create a run on load
- after each Submit: score, saveRunStep
- on last scenario: finalizeRun then route to /results/[runId]

**P3.4 Results page**
Implement @app/results/[runId]/page.tsx with per-scenario breakdown,
aggregates, and a "Generate Certificate" button (pdf-lib).
EOF

cat > cursor-tasks/phase4-group-lecture.md <<'EOF'
## Phase 4 — Group & Lecture
**P4.1 Group host**
@app/play/group/create/page.tsx:
- create room (code)
- broadcast scenario index via Supabase Realtime

**P4.2 Group join**
@app/play/group/[roomId]/page.tsx:
- subscribe by code
- show scenario
- vote A/B/C + mini Toolkit (1 prompt)
- write to room_votes

**P4.3 Lecture dashboard**
@app/play/lecture/[roomId]/page.tsx + @components/LectureCharts.tsx:
- live A/B/C bar chart
- % Toolkit completion, % P3 coverage
- host controls (Reveal/Lock, Next)
- CSV export
EOF

cat > cursor-tasks/phase5-ux-a11y-audio.md <<'EOF'
## Phase 5 — UX, a11y, audio
**P5.1 Accessibility pass**
@workspace Audit @components/*:
- Focus rings, ARIA labels, tab order
- prefers-reduced-motion
- fix contrast using @lib/theme.ts

**P5.2 Audio toggle**
Implement @components/AudioToggle.tsx with localStorage persistence,
and wire sfx for select/submit (respect reduced audio).
EOF

cat > cursor-tasks/phase6-deploy.md <<'EOF'
## Phase 6 — Deploy
**P6.1 README & envs**
Ensure README is accurate. Vercel envs: NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY.

**P6.2 Deploy**
Push to GitHub. In Vercel: import project, set envs, deploy. Test Level 1 E2E and certificate download.
EOF

cat > cursor-tasks/quick-prompts.md <<'EOF'
## Quick prompts
**Seed toolkit flows**
For every scenario in @data/levels/level1.json … level6.json, append a concrete "toolkit_flow" using the README pattern. Keep scenario wording unchanged. Validate with zod and return diffs.

**Fix TS errors**
@workspace Fix TypeScript errors without weakening types to any. Prefer explicit props and returns.

**Realtime not firing**
Check Supabase Realtime config and RLS for rooms/room_votes. Add clear error messages for subscription failures.
EOF

ok "Cursor tasks written"

# 4) optional GitHub issues
if [ "$ISSUES" = "true" ]; then
  if command -v gh >/dev/null 2>&1; then
    say "Creating GitHub issues (Phase 1–6)"
    gh issue create -t "Phase 1 — Content & Types" -b "$(cat cursor-tasks/phase1-content-types.md)" >/dev/null && ok "Phase 1 issue"
    gh issue create -t "Phase 2 — Individual Runner" -b "$(cat cursor-tasks/phase2-solo-runner.md)" >/dev/null && ok "Phase 2 issue"
    gh issue create -t "Phase 3 — Scoring & Persistence" -b "$(cat cursor-tasks/phase3-scoring-persistence.md)" >/dev/null && ok "Phase 3 issue"
    gh issue create -t "Phase 4 — Group & Lecture" -b "$(cat cursor-tasks/phase4-group-lecture.md)" >/dev/null && ok "Phase 4 issue"
    gh issue create -t "Phase 5 — UX, A11y, Audio" -b "$(cat cursor-tasks/phase5-ux-a11y-audio.md)" >/dev/null && ok "Phase 5 issue"
    gh issue create -t "Phase 6 — Deploy" -b "$(cat cursor-tasks/phase6-deploy.md)" >/dev/null && ok "Phase 6 issue"
  else
    warn "GitHub CLI (gh) not found — skipping issue creation."
  fi
fi

# 5) run initial validator if files exist
if [ -f "data/levels/level1.json" ]; then
  say "Running content validator"
  node scripts/validate-content.js || true
else
  warn "No level files yet. Add your JSON into /data/levels/"
fi

say "All set. Open /cursor-tasks/ in Cursor and start with Phase 1."

