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

