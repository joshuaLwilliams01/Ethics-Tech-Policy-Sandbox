'use client';
import { useEffect, useState, useMemo } from 'react';
import type { ToolkitFlow, ChoiceKey } from '@/lib/types';

export default function ToolkitCard({ flow, choice, onComplete }:{
  flow: ToolkitFlow;
  choice: ChoiceKey | null;
  onComplete: (out:{prompts:string[]; actions:boolean[]; metrics:string[]; isComplete:boolean;})=>void;
}) {
  // Get actions based on choice (if choice-specific) or use static array
  const actions = useMemo(() => {
    // Check if quick_actions is an object with choice keys (A, B, C)
    if (flow.quick_actions && typeof flow.quick_actions === 'object' && !Array.isArray(flow.quick_actions)) {
      // It's a choice-specific object
      if (choice && flow.quick_actions[choice]) {
        return flow.quick_actions[choice] || []; // Return actions for the selected choice
      }
      return []; // No choice selected yet, or choice has no actions
    }
    // It's a static array - return as-is
    return Array.isArray(flow.quick_actions) ? flow.quick_actions : [];
  }, [flow.quick_actions, choice]);

  const [answers, setAnswers] = useState<string[]>(() => flow.prompts.map(()=>''));
  const [checks, setChecks] = useState<boolean[]>(() => []);

  // Reset checks when actions change (due to choice change or flow change)
  useEffect(() => {
    setChecks(actions.map(() => false));
  }, [choice, actions.length, JSON.stringify(actions)]);

  // Reset answers when prompts change
  useEffect(() => {
    const newAnswers = flow.prompts.map(() => '');
    setAnswers(newAnswers);
  }, [flow.prompts]);

  useEffect(() => {
    // Check if prompts are complete
    const noPrompts = flow.prompts.length === 0;
    const promptsComplete = noPrompts || 
      (answers.length === flow.prompts.length && answers.filter(a => a.trim().length >= 2).length === flow.prompts.length);
    
    // Check if actions are complete
    const noActions = actions.length === 0;
    const allActionsChecked = checks.length === actions.length && checks.length > 0 && checks.every(c => c === true);
    const actionsComplete = noActions || allActionsChecked;
    
    const isComplete = promptsComplete && actionsComplete;
    
    // Always call onComplete to update parent state
    onComplete({ prompts:answers, actions:checks, metrics:flow.metrics ?? [], isComplete });
  }, [answers, checks, flow.prompts, actions, flow.metrics, onComplete]);

  return (
    <div className="card space-y-5 sm:space-y-6 p-5 sm:p-6">
      {/* Title changed by parent; prompts only */}
      {flow.prompts.map((p, i) => (
        <div key={i} className="space-y-3">
          <label className="block font-semibold text-sm sm:text-base text-[#1F2937] mb-3">{p}</label>
          <textarea className="w-full border-2 rounded-lg p-4 min-h-[100px] sm:min-h-[84px] text-sm sm:text-base text-[#374151] leading-relaxed focus:ring-2 focus:ring-[#8C1515] focus:border-[#8C1515] transition-all"
            value={answers[i]}
            onChange={e => { const next = answers.slice(); next[i] = e.target.value; setAnswers(next); }}
            aria-label={`Toolkit prompt ${i+1}`} />
        </div>
      ))}
      {actions.length > 0 && (
        <div className="space-y-4">
          <div className="font-bold text-sm sm:text-base text-[#1F2937] mb-2">Potential Action Steps{choice ? ` (for choice ${choice})` : ''}</div>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 font-medium">All potential action steps must be selected to proceed.</p>
          {actions.map((a, i) => (
            <label key={i} className="flex items-start gap-3 sm:gap-4 mb-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 p-3 sm:p-4 rounded-lg transition-colors touch-manipulation">
              <input 
                type="checkbox" 
                checked={checks[i] || false} 
                onChange={e => { 
                  const next = checks.slice(); 
                  next[i] = e.target.checked; 
                  setChecks(next); 
                }} 
                aria-label={`Potential action step ${i+1}`}
                className="mt-1 sm:mt-1.5 flex-shrink-0 w-5 h-5 sm:w-4 sm:h-4"
              />
              <span className="text-sm sm:text-base font-semibold text-[#1F2937] leading-relaxed pt-0.5">{a}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
