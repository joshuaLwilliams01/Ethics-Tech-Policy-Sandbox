## Phase 1 — Wire content & types
**P1.1 Types**
@workspace Create strict types in @lib/types.ts (ChoiceKey, ToolkitFlow, Scenario, LevelPack) with JSDoc.

**P1.2 Loader & zod**
Implement @lib/content.ts with zod schemas and functions:
- loadLevel(level:number)
- loadAllLevels()

**P1.3 Validate JSON**
Validate @data/levels/level1.json … level6.json against the zod schema. Do NOT change scenario prose. If toolkit_flow missing, add using our pattern. Return safe diffs.

