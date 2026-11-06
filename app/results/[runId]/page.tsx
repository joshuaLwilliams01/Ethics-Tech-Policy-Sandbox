'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { playButtonClick } from '@/lib/sounds';
import { loadLatestRun, getCompletedLevels, TOTAL_LEVELS } from '@/lib/run';
import { loadLevel } from '@/lib/content';
import type { Scenario, ChoiceKey } from '@/lib/types';

// Action steps for a choice: choice-specific lists, or one shared list.
function actionsFor(scenario: Scenario | undefined, choice: ChoiceKey): string[] {
  const qa = scenario?.toolkit_flow?.quick_actions;
  if (!qa) return [];
  if (Array.isArray(qa)) return qa;
  return qa[choice] ?? [];
}

export default function Results({ params }:{ params:{ runId:string } }) {
  const [run, setRun] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  useEffect(() => { setRun(loadLatestRun()); setCompleted(getCompletedLevels()); setLoaded(true); }, []);
  // Look up full choice text and action steps from the level data.
  const [scenarios, setScenarios] = useState<Record<string, Scenario>>({});
  useEffect(() => {
    if (!run?.steps?.length) return;
    const levels = new Set<number>();
    if (run.level) levels.add(Number(run.level));
    run.steps.forEach((s:any) => { const m = s?.scenario_id?.match(/^L(\d+)-/); if (m) levels.add(Number(m[1])); });
    Promise.all(Array.from(levels).map(n => loadLevel(n).catch(() => null))).then(packs => {
      const map: Record<string, Scenario> = {};
      packs.forEach(p => p?.scenarios.forEach(sc => { map[sc.scenario_id] = sc; }));
      setScenarios(map);
    });
  }, [run]);
  if (!loaded) return <div>Loading results…</div>;
  if (!run || !run.steps?.length) return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">No results yet</h2>
      <p>We couldn&apos;t find a completed level on this device. Submit at least one decision in a level, then choose &quot;See Level Results.&quot;</p>
      <Link href="/" onClick={() => playButtonClick()} className="btn px-6 py-3 text-base font-semibold">Back Home</Link>
    </div>
  );
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{run.level ? `Level ${run.level} Results` : 'Results'}{run.title ? `: ${run.title}` : ''}</h2>
      <div className="space-y-3">
        {run.steps.map((s:any, i:number)=>{
          const sc = scenarios[s.scenario_id];
          const choiceText = sc?.choices?.[s.choice as ChoiceKey];
          const actions = actionsFor(sc, s.choice);
          return (
          <div key={i} className="border rounded p-3 space-y-2">
            <div className="font-medium">{s.scenario_id}{sc?.title ? `: ${sc.title}` : ''}</div>
            <div className="text-sm"><span className="font-semibold">Choice: {s.choice}.</span>{choiceText ? ` ${choiceText}` : ''}</div>
            {actions.length > 0 && (
              <div className="text-sm">
                <div className="font-semibold">Potential Action Steps (for Choice {s.choice}):</div>
                <ol className="list-decimal pl-6 space-y-0.5">
                  {actions.map((a, j) => <li key={j}>{a}</li>)}
                </ol>
              </div>
            )}
          </div>
          );
        })}
      </div>
      {(() => {
        const allDone = completed.length >= TOTAL_LEVELS;
        const nextLevel = Array.from({ length: TOTAL_LEVELS }, (_, k) => k + 1).find(n => !completed.includes(n));
        return (
          <div className="space-y-3">
            <div className="border rounded p-3 bg-white/70 text-sm">
              {allDone
                ? <span className="font-semibold">You&apos;ve completed all {TOTAL_LEVELS} levels — your certificate is ready!</span>
                : <span><span className="font-semibold">{completed.length} of {TOTAL_LEVELS} levels completed.</span> Finish all {TOTAL_LEVELS} levels to unlock your Certificate of Completion.</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {allDone
                ? <Link href="/completion" onClick={() => playButtonClick()} className="btn px-6 py-3 text-base font-semibold">Get Your Certificate</Link>
                : nextLevel && <Link href={`/play/individual/${nextLevel}`} onClick={() => playButtonClick()} className="btn px-6 py-3 text-base font-semibold">Continue to Level {nextLevel}</Link>}
              <Link href="/" onClick={() => playButtonClick()} className="btn-ghost px-6 py-3 text-base font-semibold">Back Home</Link>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
