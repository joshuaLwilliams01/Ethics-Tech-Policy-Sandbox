#!/usr/bin/env bash
set -euo pipefail

say(){ printf "\n\033[1;36m▶ %s\033[0m\n" "$*"; }
ok(){  printf "\033[1;32m✓ %s\033[0m\n" "$*"; }

[ -f package.json ] || { echo "Run in your repo root."; exit 1; }

# 1) Theme + globals (Stanford vibe + suspense)
say "Updating globals and theme"
cat > app/globals.css <<'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Stanford-inspired palette (Ethics Center vibe) */
:root{
  --cardinal:#8C1515;       /* primary */
  --cardinal-dark:#820f0f;
  --stone:#2E2D29;          /* ink */
  --fog:#F7F6F3;            /* paper */
  --accent:#2E6AB3;         /* links */
  --gold:#B3995D;           /* subtle highlights */
}

html,body{ background:var(--fog); color:var(--stone); }
a{ color:var(--accent); }

.suspense-bg{
  background: radial-gradient(1200px 400px at 50% -200px, rgba(140,21,21,0.18), transparent),
              radial-gradient(600px 300px at 20% 0%, rgba(179,153,93,0.15), transparent),
              linear-gradient(#ffffff, #faf8f5);
}

/* Buttons */
.btn{ @apply inline-flex items-center justify-center px-4 py-2 rounded font-medium transition;
      background: var(--stone); color:#fff; }
.btn:hover{ background: #000; }
.btn-ghost{ @apply border; background:#fff; color:var(--stone); }
.btn-ghost:hover{ background:#f3f3f3; }

/* Card */
.card{ @apply rounded border bg-white/80 backdrop-blur p-4; }

/* Small helper */
.kicker{ @apply uppercase tracking-wide text-xs text-gray-500; }
CSS
ok "globals.css"

# 2) Layout with new name + disclaimer + audio toggle
say "Updating layout with new title, disclaimer, audio toggle"
cat > app/layout.tsx <<'TSX'
import "./globals.css";
import Link from "next/link";
import AudioToggle from "@/components/AudioToggle";

export const metadata = {
  title: "Ethics-Tech-Policy Decisions Sandbox",
  description: "A web-based simulator for ethical tradeoffs in tech and policy.",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen suspense-bg">
        <header className="border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto max-w-5xl flex items-center justify-between p-3">
            <Link href="/" className="font-semibold">
              Ethics-Tech-Policy Decisions Sandbox
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/about" className="text-sm">About</Link>
              <AudioToggle />
            </div>
          </nav>
          <div className="mx-auto max-w-5xl px-3 pb-3 text-xs text-gray-600">
            <strong>Disclaimer:</strong> An independent capstone project by Joshua Williams for the Ethics+Tech Public Policy Practitioner Course; not associated with the McCoy Family Center for Ethics in Society staff.
          </div>
        </header>
        <main className="mx-auto max-w-5xl p-4">{children}</main>
      </body>
    </html>
  );
}
TSX
ok "layout.tsx"

# 3) Home: Start Your Journey + How to Play
say "Updating home with Start Your Journey and How-to-Play"
cat > app/page.tsx <<'TSX'
import Link from "next/link";
import HowToPlay from "@/components/HowToPlay";

export default function Home(){
  return (
    <section className="py-10 space-y-6">
      <h1 className="text-3xl font-bold">Ethics-Tech-Policy Decisions Sandbox</h1>
      <p className="text-lg max-w-2xl">
        Short, playable scenarios at the intersection of technology, policy, and society—guided by the Stanford Ethics Toolkit and People + Planet + Parity.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/play/individual/1" className="btn">Start Your Journey</Link>
        <a href="#how" className="btn-ghost">How to Play</a>
        <Link href="/about" className="btn-ghost">About</Link>
      </div>
      <div id="how" className="card">
        <HowToPlay />
      </div>
    </section>
  );
}
TSX
ok "page.tsx"

# 4) About page with your new copy
say "Updating About page"
cat > app/about/page.tsx <<'TSX'
export default function About(){
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">About the Project</h2>
      <p>
        The <em>Ethics-Tech-Policy Decisions Sandbox</em>, created by Joshua Williams, is a web-based simulator that presents real-world dilemmas
        at the intersection of technology, policy, and society through short, playable scenarios. Utilizing Stanford's Ethics Toolkit, created by
        Manuela Travaglianti, PhD, and Thomas Both at the McCoy Family Center for Ethics in Society at Stanford University, players explore tradeoffs,
        test options, and clearly explain their decisions. Designed with privacy, accessibility, and adaptability in mind, it serves as both a teaching tool
        and a portfolio-ready demo for responsible technology.
      </p>
      <div className="space-y-1 text-sm">
        <div><strong>Course:</strong> <a target="_blank" rel="noreferrer" href="https://online.stanford.edu/courses/soe-xetech0001-ethics-technology-public-policy-practitioners">Ethics, Technology + Public Policy for Practitioners</a></div>
        <div><strong>Stanford Ethics Toolkit:</strong> <a target="_blank" rel="noreferrer" href="https://ethicsinsociety.stanford.edu/tech-ethics/ethics-toolkit">Link</a></div>
        <div><strong>People + Planet + Parity Framework:</strong> <a target="_blank" rel="noreferrer" href="https://apartresearch.com/project/people-planet-parity-governance-framework-h3ks">Link</a></div>
      </div>
    </div>
  );
}
TSX
ok "about"

# 5) Remove modes page; make a simple fallback
say "Simplifying /play to a single CTA"
cat > app/play/page.tsx <<'TSX'
import Link from "next/link";
export default function Modes(){
  return (
    <div className="space-y-3">
      <p className="kicker">Begin</p>
      <h2 className="text-2xl font-semibold">Start Your Journey</h2>
      <p>Move through scenarios, save progress anytime, and see the result(s) of each decision.</p>
      <Link href="/play/individual/1" className="btn">Start Your Journey</Link>
    </div>
  );
}
TSX
ok "play/page.tsx"

# 6) Components: Audio toggle with suspense music (respect prefers-reduced-motion/audio)
say "Adding AudioToggle with suspense loop + mute"
mkdir -p components
cat > components/AudioToggle.tsx <<'TSX'
'use client';
import { useEffect, useRef, useState } from "react";

export default function AudioToggle(){
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(()=>{
    if (!audioRef.current) return;
    if (enabled){
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(()=>{ /* autoplay may block until user gesture */ });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [enabled]);

  return (
    <div className="flex items-center gap-2">
      <button onClick={()=>setEnabled(v=>!v)} className="btn-ghost px-3 py-1 text-sm" aria-pressed={enabled}>
        {enabled ? "Sound Off" : "Sound On"}
      </button>
      <audio ref={audioRef} src="/sfx-suspense.mp3" loop preload="none" />
    </div>
  );
}
TSX
ok "AudioToggle.tsx"

# 7) How to Play (button-style copy already embedded on Home; keep component)
say "Refreshing HowToPlay component"
cat > components/HowToPlay.tsx <<'TSX'
export default function HowToPlay() {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-semibold">How to Play</h2>
      <ol className="list-decimal ml-5 space-y-1">
        <li>Click <strong>Start Your Journey</strong>.</li>
        <li>Read a scenario and choose <strong>A / B / C</strong>.</li>
        <li>Use the <strong>Stanford Ethics Toolkit</strong> prompts.</li>
        <li>Mark <strong>People + Planet + Parity Cues</strong>.</li>
        <li>Submit to see <strong>Result(s) of your decision</strong>.</li>
        <li>Use <strong>Save Your Progress</strong> anytime; <strong>Back Home</strong> returns to start.</li>
      </ol>
    </section>
  );
}
TSX
ok "HowToPlay.tsx"

# 8) ToolkitCard: rename labels; remove order + owner/review
say "Updating ToolkitCard: rename and simplify"
cat > components/ToolkitCard.tsx <<'TSX'
'use client';
import { useMemo, useState } from 'react';
import type { ToolkitFlow } from '@/lib/types';

export default function ToolkitCard({ flow, onComplete }:{
  flow: ToolkitFlow;
  onComplete: (out:{prompts:string[]; actions:boolean[]; metrics:string[]; isComplete:boolean;})=>void;
}) {
  const [answers, setAnswers] = useState<string[]>(() => flow.prompts.map(()=>''));
  const [checks, setChecks]   = useState<boolean[]>(() => flow.quick_actions.map(() => false));

  const complete = () => {
    const isComplete = checks.every(Boolean) && answers.filter(a => a.trim().length >= 2).length === flow.prompts.length;
    onComplete({ prompts:answers, actions:checks, metrics:flow.metrics ?? [], isComplete });
  };
  useMemo(complete, [answers, checks]); // keep parent updated

  return (
    <div className="card space-y-4">
      {/* Title changed by parent; prompts only */}
      {flow.prompts.map((p, i) => (
        <div key={i}>
          <label className="block font-medium mb-1">{p}</label>
          <textarea className="w-full border rounded p-2 min-h-[84px]"
            value={answers[i]}
            onChange={e => { const next = answers.slice(); next[i] = e.target.value; setAnswers(next); }}
            aria-label={`Toolkit prompt ${i+1}`} />
        </div>
      ))}
      <div>
        <div className="font-medium mb-2">Quick actions</div>
        {flow.quick_actions.map((a, i) => (
          <label key={i} className="flex items-center gap-2 mb-1">
            <input type="checkbox" checked={checks[i]} onChange={e => { const next = checks.slice(); next[i] = e.target.checked; setChecks(next); }} aria-label={`Quick action ${i+1}`} />
            <span>{a}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
TSX
ok "ToolkitCard.tsx"

# 9) P3Strip: rename to People + Planet + Parity Cues; remove specifics
say "Updating P3Strip labels"
cat > components/P3Strip.tsx <<'TSX'
'use client';
import { useEffect, useState } from 'react';
export type P3State = { people:boolean; planet:boolean; parity:boolean; };
export default function P3Strip({ onUpdate }:{ onUpdate:(v:P3State)=>void }) {
  const [state, setState] = useState<P3State>({ people:false, planet:false, parity:false });
  useEffect(()=>onUpdate(state), [state, onUpdate]);
  return (
    <div className="card text-sm">
      <div className="font-medium mb-2">People + Planet + Parity Cues</div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2"><input type="checkbox" checked={state.people} onChange={e=>setState(s=>({...s,people:e.target.checked}))}/>People</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={state.planet} onChange={e=>setState(s=>({...s,planet:e.target.checked}))}/>Planet</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={state.parity} onChange={e=>setState(s=>({...s,parity:e.target.checked}))}/>Parity</label>
      </div>
    </div>
  );
}
TSX
ok "P3Strip.tsx"

# 10) Simple result narrative generator
say "Adding result narrative generator"
cat > lib/results.ts <<'TS'
import type { Scenario } from "./types";

export function describeResult(opts:{
  scenario: Scenario;
  choice: 'A'|'B'|'C';
  p3:{people:boolean; planet:boolean; parity:boolean};
}): { summary:string; benefits:string[]; harms:string[] }{
  const {scenario, choice, p3} = opts;
  const pick = scenario.choices[choice] || "";
  const benefits:string[] = [];
  const harms:string[] = [];

  // lightweight heuristics for live feedback
  if (pick.toLowerCase().includes("transition") || pick.toLowerCase().includes("audit")) {
    benefits.push("Introduces accountability and a path to improvement");
  }
  if (pick.toLowerCase().includes("shutdown") || pick.toLowerCase().includes("pause")) {
    harms.push("Service disruption risk increases in the short term");
    benefits.push("Halts ongoing harms while protections are built");
  }
  if (pick.toLowerCase().includes("immediate") || pick.toLowerCase().includes("restrict")) {
    benefits.push("Reduces exposure to known risks quickly");
  }
  if (p3.people){ benefits.push("Directly considers human safety and dignity"); }
  if (p3.planet){ benefits.push("Accounts for environmental impact"); }
  if (p3.parity){ benefits.push("Addresses distributional fairness and access"); }

  if (!benefits.length) benefits.push("Maintains continuity for current users");
  if (!harms.length && pick.toLowerCase().includes("keep")) harms.push("Continues existing risks and inequities");

  const summary = `As a result of your decision (${choice}), ${benefits[0]?.toLowerCase() || 'some impacts follow'}.`;

  return { summary, benefits, harms };
}
TS
ok "lib/results.ts"

# 11) Local save utility
say "Adding local save helper"
cat > lib/save.ts <<'TS'
export type SaveState = {
  level:number;
  idx:number;
  timestamp:number;
  payload:any;
};
const KEY="ETP_DECISIONS_SANDBOX_SAVE";
export function saveProgress(state:SaveState){
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(state));
}
export function loadProgress():SaveState | null{
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEY); if (!raw) return null;
  try{ return JSON.parse(raw); } catch { return null; }
}
export function clearProgress(){ if (typeof window !== 'undefined') localStorage.removeItem(KEY); }
TS
ok "lib/save.ts"

# 12) ScenarioCard: new labels, no reflection/specifics, add results panel + save/back buttons
say "Updating ScenarioCard with new labels, save/back, results"
cat > components/ScenarioCard.tsx <<'TSX'
'use client';
import { useMemo, useState } from 'react';
import type { Scenario, ChoiceKey } from '@/lib/types';
import ToolkitCard from './ToolkitCard';
import P3Strip, { P3State } from './P3Strip';
import { describeResult } from '@/lib/results';
import Link from 'next/link';
import { saveProgress } from '@/lib/save';

export default function ScenarioCard({
  scenario,
  level,
  index,
  onSubmit
}:{
  scenario: Scenario;
  level: number;
  index: number;
  onSubmit: (payload: {
    choice: ChoiceKey;
    toolkitOut: any;
    p3Out: P3State;
  }) => void
}) {
  const [choice, setChoice] = useState<ChoiceKey | null>(null);
  const [toolkit, setToolkit] = useState<any>({ isComplete:false });
  const [p3, setP3] = useState<P3State>({ people:false, planet:false, parity:false });
  const [resultBlock, setResultBlock] = useState<null | {summary:string; benefits:string[]; harms:string[]}>(null);

  const canSubmit = useMemo(() => Boolean(choice) && toolkit?.isComplete, [choice, toolkit]);

  const doSave = () => {
    saveProgress({ level, idx:index, timestamp:Date.now(), payload:{ choice, toolkit, p3 } });
    alert("Progress saved locally.");
  };

  const handleSubmit = () => {
    if (!choice) return;
    const res = describeResult({ scenario, choice, p3 });
    setResultBlock(res);
    onSubmit({ choice, toolkitOut: toolkit, p3Out: p3 });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold">{scenario.title}</h3>
          <p className="text-gray-700 mt-1">{scenario.prompt}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={doSave} className="btn-ghost">Save Your Progress</button>
          <Link href="/" className="btn-ghost">Back Home</Link>
        </div>
      </div>

      <fieldset className="card space-y-2">
        <div className="font-medium">Choose A / B / C</div>
        {(['A','B','C'] as ChoiceKey[]).map(key => (
          <label key={key} className="flex items-center gap-2">
            <input type="radio" name={`choice-${scenario.scenario_id}`} checked={choice===key} onChange={()=>setChoice(key)} />
            <span><strong>{key}:</strong> {scenario.choices[key]}</span>
          </label>
        ))}
      </fieldset>

      <div className="text-sm text-gray-700 card">
        <div><strong>Stanford Ethics Toolkit Cue(s):</strong> {scenario.toolkit_cues}</div>
        <div className="mt-1"><strong>People + Planet + Parity Cues:</strong> {scenario.p3_cues}</div>
      </div>

      <ToolkitCard flow={scenario.toolkit_flow} onComplete={setToolkit} />
      <P3Strip onUpdate={setP3} />

      <div className="flex flex-wrap gap-2">
        <button disabled={!canSubmit} onClick={handleSubmit}
          className={`btn ${!canSubmit ? 'opacity-60 cursor-not-allowed' : ''}`} aria-disabled={!canSubmit}>
          Submit Decision
        </button>
      </div>

      {resultBlock && (
        <div className="card">
          <div className="font-semibold mb-1">Result(s) of your decision</div>
          <p className="mb-2">{resultBlock.summary}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <div className="kicker mb-1">Benefits</div>
              <ul className="list-disc ml-5">{resultBlock.benefits.map((b,i)=><li key={i}>{b}</li>)}</ul>
            </div>
            <div>
              <div className="kicker mb-1">Harms</div>
              <ul className="list-disc ml-5">{resultBlock.harms.map((h,i)=><li key={i}>{h}</li>)}</ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
TSX
ok "ScenarioCard.tsx"

# 13) Update Individual runner to pass level/index and keep Save/Back
say "Updating play/individual route to work with new ScenarioCard"
cat > app/play/individual/[id]/page.tsx <<'TSX'
'use client';
import { useEffect, useMemo, useState } from 'react';
import { loadLevel } from '@/lib/content';
import type { LevelPack, ChoiceKey } from '@/lib/types';
import ScenarioCard from '@/components/ScenarioCard';
import { scoreDecision } from '@/lib/scoring';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type StepResult = {
  scenario_id: string;
  choice: ChoiceKey;
  toolkitOut: any;
  p3Out: any;
  score: ReturnType<typeof scoreDecision>;
};

export default function IndividualLevel({ params }:{ params:{ id:string } }) {
  const levelIndex = Number(params.id || '1');
  const [pack, setPack] = useState<LevelPack | null>(null);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<StepResult[]>([]);
  const router = useRouter();

  useEffect(() => { loadLevel(levelIndex).then(setPack).catch(console.error); }, [levelIndex]);

  const scenario = useMemo(() => pack?.scenarios[idx], [pack, idx]);
  const progress = useMemo(() => pack ? `${idx+1} / ${pack.scenarios.length}` : '—', [pack, idx]);

  if (!pack) return <div>Loading level…</div>;
  if (!scenario) return <div>No scenarios found in this level.</div>;

  const onSubmit = (payload: any) => {
    const score = scoreDecision({
      scenario,
      choice: payload.choice,
      toolkitFilled: {
        promptsDone: payload.toolkitOut?.prompts?.filter((p:string)=>p?.trim()).length ?? 0,
        actionsDone: payload.toolkitOut?.actions?.filter(Boolean).length ?? 0,
        totalPrompts: scenario.toolkit_flow.prompts.length,
        totalActions: scenario.toolkit_flow.quick_actions.length,
      },
      p3: {
        people: payload.p3Out?.people,
        planet: payload.p3Out?.planet,
        parity: payload.p3Out?.parity,
        specifics: 0
      },
      reflectionChars: 200, // no free-text now; give small credit
      priorVector: 0.5
    });

    const step: StepResult = { scenario_id: scenario.scenario_id, ...payload, score };
    const next = [...results]; next[idx] = step; setResults(next);
  };

  const isLast = idx === pack.scenarios.length - 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Level {pack.level}: {pack.title}</h2>
        <div className="text-sm text-gray-600">Progress: {progress}</div>
      </div>

      <ScenarioCard scenario={scenario} level={levelIndex} index={idx} onSubmit={onSubmit} />

      <div className="flex gap-2 pt-2">
        <button onClick={()=> setIdx(i=>Math.max(0, i-1))} disabled={idx===0} className="btn-ghost disabled:opacity-50">Prev</button>
        {!isLast && <button onClick={()=> setIdx(i=>Math.min(pack.scenarios.length-1, i+1))} className="btn-ghost">Next</button>}
        {isLast && <Link href={`/results/local-${Date.now()}`} className="btn">See Level Results</Link>}
        <Link href="/" className="ml-auto btn-ghost">Back Home</Link>
      </div>
    </div>
  );
}
TSX
ok "play/individual page"

# 14) Ensure results page title remains compatible (no change needed)

# 15) Provide a placeholder suspense track (devs can replace file)
say "Adding placeholder suspense audio if missing"
if [ ! -f public/sfx-suspense.mp3 ]; then
  printf '' > public/sfx-suspense.mp3
fi
ok "audio placeholder"

# 16) Done
ok "All updates written. Now:"
echo "1) npm run dev"
echo "2) Open http://localhost:3000"
echo "3) Click 'Start Your Journey' and test"

