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

