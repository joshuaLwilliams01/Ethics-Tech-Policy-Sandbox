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

