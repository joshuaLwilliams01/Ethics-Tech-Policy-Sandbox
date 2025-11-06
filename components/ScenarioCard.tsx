'use client';
import { useMemo, useState, useEffect } from 'react';
import type { Scenario, ChoiceKey } from '@/lib/types';
import ToolkitCard from './ToolkitCard';
import { describeResult } from '@/lib/results';
import Link from 'next/link';
import { saveProgress } from '@/lib/save';
import ResultsModal from './ResultsModal';
import { playButtonClick } from '@/lib/sounds';

function CheatCodeButton({ scenario }: { scenario: Scenario }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-3">
      <button
        onClick={() => {
          playButtonClick();
          setIsOpen(!isOpen);
        }}
        className="relative w-full text-left flex items-center justify-between px-6 py-4 rounded-lg font-semibold text-sm transition-all duration-300 overflow-hidden group"
        style={{
          background: isOpen 
            ? 'linear-gradient(135deg, #8C1515 0%, #C41E3A 100%)' 
            : 'linear-gradient(135deg, rgba(140,21,21,0.1) 0%, rgba(196,30,58,0.1) 100%)',
          border: '2px solid #8C1515',
          color: isOpen ? '#FFFFFF' : '#8C1515',
          animation: isOpen ? 'none' : 'shake 5s ease-in-out infinite',
          boxShadow: isOpen 
            ? '0 8px 16px rgba(140,21,21,0.4), 0 0 20px rgba(140,21,21,0.3)' 
            : '0 4px 8px rgba(140,21,21,0.2)'
        }}
      >
        <span className="relative z-10 flex items-center gap-3">
          <span className="text-2xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🎮</span>
          <div className="flex flex-col">
            <span className="font-bold">Cheat Code</span>
            <span className="text-xs opacity-90 italic">(Psssttt...Click Me)</span>
          </div>
        </span>
        <span className="text-lg relative z-10 transform transition-transform duration-300" style={{ 
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' 
        }}>
          {isOpen ? '▼' : '▶'}
        </span>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        />
      </button>
      {isOpen && (
        <div className="mt-3 text-base card border-2 border-[#8C1515] bg-gradient-to-br from-white to-[#F7F6F3] shadow-lg p-4">
          <div className="mb-4">
            <strong className="text-[#8C1515] text-base font-bold">Stanford Ethics Toolkit Cue(s):</strong>{' '}
            <span className="text-[#1F2937] font-semibold text-base">{scenario.toolkit_cues}</span>
          </div>
          {scenario.toolkit_references && (
            <div className="mt-3 p-4 bg-white/70 rounded border border-[#8C1515]/30">
              <strong className="text-[#8C1515] text-base font-bold">Stanford Ethics Toolkit Reference(s):</strong>{' '}
              <a
                href="https://ethicsinsociety.stanford.edu/tech-ethics/ethics-toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8C1515] hover:text-[#820f0f] underline text-sm font-semibold"
              >
                https://ethicsinsociety.stanford.edu/tech-ethics/ethics-toolkit
              </a>
              <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-base text-[#1F2937] font-semibold list-decimal list-inside">
                {scenario.toolkit_references.split(',').map((ref, idx) => {
                  const trimmedRef = ref.trim();
                  return (
                    <li key={idx} className="leading-relaxed">
                      {trimmedRef}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
          <div className="mt-3 p-4 bg-white/70 rounded border border-[#8C1515]/30">
            <strong className="text-[#8C1515] text-base font-bold">People + Planet + Parity Cues:</strong>{' '}
            <span className="text-[#1F2937] font-semibold text-base">{scenario.p3_cues}</span>
          </div>
        </div>
      )}
    </div>
  );
}

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
    p3Out: any;
  }) => void
}) {
  const [choice, setChoice] = useState<ChoiceKey | null>(null);
  const [toolkit, setToolkit] = useState<any>({ isComplete:false });
  const [resultBlock, setResultBlock] = useState<null | {summary:string; benefits:string[]; harms:string[]}>(null);

  // Reset all state when scenario changes (scenario_id changes)
  useEffect(() => {
    setChoice(null);
    setToolkit({ isComplete: false });
    setResultBlock(null);
  }, [scenario.scenario_id]);

  const canSubmit = useMemo(() => {
    if (!choice) return false;
    if (!toolkit || toolkit.isComplete !== true) return false;
    return true;
  }, [choice, toolkit]);

  const doSave = () => {
    playButtonClick();
    saveProgress({ level, idx:index, timestamp:Date.now(), payload:{ choice, toolkit } });
    alert("Progress saved locally for your account.");
  };

  const handleSubmit = () => {
    if (!choice) return;
    playButtonClick();
    const res = describeResult({ scenario, choice, p3: { people: false, planet: false, parity: false } });
    setResultBlock(res);
    onSubmit({ choice, toolkitOut: toolkit, p3Out: { people: false, planet: false, parity: false } });
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-3">
        <div className="flex-1 space-y-3 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1F2937] leading-tight">{scenario.title}</h3>
          <p className="text-sm sm:text-base font-medium text-[#374151] leading-relaxed pr-2 sm:pr-0">
            {scenario.prompt}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto justify-end sm:justify-start">
          <button onClick={doSave} className="btn-ghost px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold touch-manipulation">Save Your Progress</button>
          <Link href="/" className="btn-ghost px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold touch-manipulation">Back Home</Link>
        </div>
      </div>

      <CheatCodeButton scenario={scenario} />

      <fieldset className="card space-y-4 p-5 sm:p-6">
        <div className="font-bold text-sm sm:text-base text-[#1F2937] mb-3">Choose From Below:</div>
        {(['A','B','C'] as ChoiceKey[]).map(key => (
          <label key={key} className="flex items-start gap-3 sm:gap-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-3 sm:p-4 rounded-lg transition-colors touch-manipulation">
            <input 
              type="radio" 
              name={`choice-${scenario.scenario_id}`} 
              checked={choice===key} 
              onChange={()=>setChoice(key)}
              className="mt-1 sm:mt-1.5 flex-shrink-0 w-5 h-5 sm:w-4 sm:h-4"
            />
            <span className="text-sm sm:text-base font-semibold text-[#1F2937] leading-relaxed pt-0.5">
              <strong className="text-[#8C1515] font-bold">{key}:</strong> {scenario.choices[key]}
            </span>
          </label>
        ))}
      </fieldset>

      <ToolkitCard flow={scenario.toolkit_flow} choice={choice} onComplete={setToolkit} />

      <div className="flex flex-wrap gap-2 pt-2">
        <button 
          disabled={!canSubmit} 
          onClick={handleSubmit}
          className={`btn px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold touch-manipulation ${!canSubmit ? 'opacity-60 cursor-not-allowed' : ''}`} 
          aria-disabled={!canSubmit}
        >
          Submit Decision
        </button>
      </div>

      {/* Results Modal */}
      <ResultsModal 
        isOpen={resultBlock !== null} 
        onClose={() => setResultBlock(null)} 
        results={resultBlock}
      />
    </div>
  );
}
