'use client';
import { useEffect, useMemo, useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import Link from 'next/link';
import { playButtonClick } from '@/lib/sounds';
import { loadLatestRun } from '@/lib/run';
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
  useEffect(() => { setRun(loadLatestRun()); setLoaded(true); }, []);
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
  const totals = useMemo(() => {
    if (!run?.steps?.length) return { total:0, count:0 };
    const total = run.steps.reduce((acc:number, s:any)=> acc + (s?.score?.total||0), 0);
    return { total, count: run.steps.length, avg: Math.round(total/run.steps.length) };
  }, [run]);

  const generateCertificate = async () => {
    playButtonClick();
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([612, 396]);
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    page.drawText('Ethics+Tech Simulator — Certificate of Completion', { x: 40, y: 320, size: 16, font: bold, color: rgb(0.2,0.2,0.2) });
    page.drawText(`Awarded to: ${'Player'}`, { x: 40, y: 270, size: 14, font: bold });
    page.drawText(`Completed: ${new Date().toLocaleDateString()}`, { x: 40, y: 245, size: 12, font });
    page.drawText(`Average Score: ${totals.avg ?? 0}`, { x: 40, y: 225, size: 12, font });
    page.drawText('People · Planet · Parity', { x: 40, y: 200, size: 12, font: bold, color: rgb(0.55,0,0) });
    const bytes = await pdf.save();
    const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'certificate.pdf'; a.click();
  };

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
      <div className="border rounded p-3 bg-white/70">
        <div>Total steps: {totals.count}</div>
        <div>Average score: <strong>{totals.avg ?? 0}</strong></div>
      </div>
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
            <div className="text-sm text-gray-600">Total: {s.score?.total ?? 0}</div>
          </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        <button onClick={generateCertificate} className="btn px-6 py-3 text-base font-semibold">Generate Certificate</button>
        <Link href="/" onClick={() => playButtonClick()} className="btn-ghost px-6 py-3 text-base font-semibold">Back Home</Link>
      </div>
    </div>
  );
}
