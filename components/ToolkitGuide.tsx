'use client';
import { useState } from 'react';

// Guidance for each Stanford Ethics Toolkit tool, paraphrased from
// https://ethicsinsociety.stanford.edu/tech-ethics/ethics-toolkit
// Stages follow the toolkit's own grouping: Explore → Evaluate → Decide.

const TOOLKIT_URL = 'https://ethicsinsociety.stanford.edu/tech-ethics/ethics-toolkit';

type Stage = 'Explore' | 'Evaluate' | 'Decide';
type ToolGuide = { stage: Stage; action: string; steps: string[] };

const TOOL_GUIDE: Record<string, ToolGuide> = {
  'Values Explainer Cards': {
    stage: 'Explore',
    action: 'Name the 2–3 values in tension and which choice favors each.',
    steps: [
      'Pick the values at stake (for example, well-being or justice).',
      'For each choice, ask whether it promotes or degrades each value.',
      'Note which value you would trade off, and why.',
    ],
  },
  'Impacts Explorer': {
    stage: 'Explore',
    action: 'For each choice, trace the immediate effects, then the knock-on effects, then the values affected.',
    steps: [
      'Action: state the choice you are considering.',
      'Effects: list what happens right away, and to whom.',
      'Secondary effects: list what those effects lead to next.',
      'Values impacted: note which values are promoted or degraded.',
    ],
  },
  'Future Story': {
    stage: 'Explore',
    action: 'Imagine looking back after your choice: what helped, what harmed, and what would have prevented the harm?',
    steps: [
      'Problem: what need or motivation started this?',
      'Solution: what did your choice offer?',
      'Benefits and harms: who gained, and who was hurt?',
      'Subsequent impacts: what happened next?',
      'Mitigating actions: what would you do to reduce the harm?',
    ],
  },
  'Ethics Frame': {
    stage: 'Explore',
    action: 'On one page: the action, the values driving it, its benefits and harms, and who is affected.',
    steps: [
      'Define the action and the values driving it.',
      'List its main benefits and harms.',
      'Ask who is affected, and how.',
      'Check whether benefits and burdens are fairly distributed.',
    ],
  },
  'Ethics Gauge': {
    stage: 'Evaluate',
    action: 'Rate how significant each choice’s benefits and harms are, from limited to significant.',
    steps: [
      'How is it beneficial? Rate each benefit from limited to significant.',
      'How is it harmful? Rate each harm the same way.',
      'Compare the overall balance across choices.',
    ],
  },
  'Weighing Options': {
    stage: 'Decide',
    action: 'Compare your top two choices on benefits and harms to society and to the organization. Who gains, and who pays?',
    steps: [
      'Describe the current situation.',
      'For each option, list benefits and harms to society.',
      'For each option, list benefits and harms to the organization.',
      'Ask who gains and who suffers under each, then choose.',
    ],
  },
};

const STAGES: Stage[] = ['Explore', 'Evaluate', 'Decide'];

// Older content used "Impact Explorer"; the toolkit name is "Impacts Explorer".
const normalize = (name: string) => (name.trim() === 'Impact Explorer' ? 'Impacts Explorer' : name.trim());

// Bold any tool names that appear in the tip.
function renderTip(tip: string) {
  const names = Object.keys(TOOL_GUIDE);
  const re = new RegExp(`(${names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return tip.split(re).map((part, i) =>
    names.includes(part) ? <strong key={i} className="text-[#8C1515]">{part}</strong> : <span key={i}>{part}</span>
  );
}

export default function ToolkitGuide({ references, tip }: { references: string; tip?: string }) {
  const [openTool, setOpenTool] = useState<string | null>(null);
  const tools = Array.from(new Set(references.split(',').map(normalize).filter(Boolean)));

  return (
    <div className="mt-3 p-4 bg-white/70 rounded border border-[#8C1515]/30 space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <strong className="text-[#8C1515] text-base font-bold">Stanford Ethics Toolkit: How to Use It Here</strong>
        <a
          href={TOOLKIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8C1515] hover:text-[#820f0f] underline text-sm font-semibold"
        >
          Open the toolkit ↗
        </a>
      </div>

      {tip && (
        <p className="text-sm sm:text-base text-[#1F2937] bg-[#8C1515]/5 border-l-4 border-[#8C1515] rounded-r px-3 py-2 leading-relaxed">
          <span className="font-bold text-[#8C1515]">Try this: </span>
          {renderTip(tip)}
        </p>
      )}

      {STAGES.map(stage => {
        const inStage = tools.filter(t => (TOOL_GUIDE[t]?.stage ?? 'Explore') === stage);
        if (!inStage.length) return null;
        return (
          <div key={stage}>
            <div className="text-xs font-bold uppercase tracking-wide text-[#53565A] mb-1">{stage}</div>
            <ul className="space-y-2">
              {inStage.map(tool => {
                const guide = TOOL_GUIDE[tool];
                const isOpen = openTool === tool;
                return (
                  <li key={tool} className="text-sm sm:text-base text-[#1F2937] leading-relaxed">
                    <span className="font-bold">{tool}</span>
                    {guide && <>: {guide.action}{' '}
                      <button
                        type="button"
                        onClick={() => setOpenTool(isOpen ? null : tool)}
                        aria-expanded={isOpen}
                        className="text-[#8C1515] hover:text-[#820f0f] underline text-xs sm:text-sm font-semibold whitespace-nowrap"
                      >
                        {isOpen ? 'Hide steps' : 'Show steps'}
                      </button>
                    </>}
                    {guide && isOpen && (
                      <ol className="list-decimal pl-6 mt-1 space-y-0.5 text-sm text-[#374151]">
                        {guide.steps.map((s, i) => <li key={i}>{s}</li>)}
                      </ol>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
