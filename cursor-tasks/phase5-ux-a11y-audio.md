## Phase 5 — UX, a11y, audio
**P5.1 Accessibility pass**
@workspace Audit @components/*:
- Focus rings, ARIA labels, tab order
- prefers-reduced-motion
- fix contrast using @lib/theme.ts

**P5.2 Audio toggle**
Implement @components/AudioToggle.tsx with localStorage persistence,
and wire sfx for select/submit (respect reduced audio).

