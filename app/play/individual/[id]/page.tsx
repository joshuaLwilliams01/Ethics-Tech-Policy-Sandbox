'use client';
import { useEffect, useMemo, useState } from 'react';
import { loadLevel } from '@/lib/content';
import type { LevelPack, ChoiceKey } from '@/lib/types';
import ScenarioCard from '@/components/ScenarioCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { playButtonClick } from '@/lib/sounds';
import { loadProgress } from '@/lib/save';
import { saveLatestRun, markLevelCompleted } from '@/lib/run';

type StepResult = {
  scenario_id: string;
  choice: ChoiceKey;
  toolkitOut: any;
  p3Out: any;
};

export default function IndividualLevel({ params }:{ params:{ id:string } }) {
  const levelIndex = Number(params.id || '1');
  const [pack, setPack] = useState<LevelPack | null>(null);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<StepResult[]>([]);
  const router = useRouter();

  useEffect(() => { 
    loadLevel(levelIndex).then(setPack).catch(console.error);
    // Try to load saved progress for this level
    const saved = loadProgress();
    if (saved && saved.level === levelIndex) {
      setIdx(saved.idx);
    }
  }, [levelIndex]);

  const scenario = useMemo(() => pack?.scenarios[idx], [pack, idx]);
  const progress = useMemo(() => pack ? `${idx+1} / ${pack.scenarios.length}` : '—', [pack, idx]);

  if (!pack) return <div>Loading level…</div>;
  if (!scenario) return <div>No scenarios found in this level.</div>;

  const onSubmit = (payload: any) => {
    const step: StepResult = { scenario_id: scenario.scenario_id, ...payload };
    const next = [...results]; next[idx] = step; setResults(next);

    // Persist the run so the Results page can read it
    saveLatestRun({ level: levelIndex, title: pack.title, steps: next.filter(Boolean), updatedAt: Date.now() });
    
    // Finishing the last scenario completes the level (counts toward the certificate)
    if (isLast) markLevelCompleted(levelIndex);
  };

  const isLast = idx === pack.scenarios.length - 1;

  return (
    <div className="space-y-4 pb-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Level {pack.level}: {pack.title}</h2>
        <div className="text-sm text-gray-600">Progress: {progress}</div>
      </div>

      <ScenarioCard scenario={scenario} level={levelIndex} index={idx} onSubmit={onSubmit} />

      <div className="flex gap-2 pt-2">
        <button onClick={()=> {
          playButtonClick();
          setIdx(i=>Math.max(0, i-1));
        }} disabled={idx===0} className="btn-ghost px-4 py-2 text-sm font-semibold disabled:opacity-50">Prev</button>
        {!isLast && <button onClick={()=> {
          playButtonClick();
          setIdx(i=>Math.min(pack.scenarios.length-1, i+1));
        }} className="btn-ghost px-4 py-2 text-sm font-semibold">Next</button>}
        {isLast && <Link href={`/results/local-${Date.now()}`} onClick={() => { playButtonClick(); saveLatestRun({ level: levelIndex, title: pack.title, steps: results.filter(Boolean), updatedAt: Date.now() }); }} className="btn px-6 py-3 text-base font-semibold">See Level Results</Link>}
        <Link href="/" onClick={() => playButtonClick()} className="ml-auto btn-ghost px-4 py-2 text-sm font-semibold">Back Home</Link>
      </div>

      {/* Disclaimer at bottom */}
      <div className="mt-8 pt-4 border-t border-gray-200 text-center text-xs text-[#53565A]">
        <p>
          This is an independent capstone project by Joshua Williams for the Ethics+Tech Public Policy Practitioner Course; not associated with the Stanford McCoy Family Center for Ethics in Society or its staff.
        </p>
      </div>
    </div>
  );
}
