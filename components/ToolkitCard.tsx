'use client';
import { useEffect, useState } from 'react';
import type { ToolkitFlow } from '@/lib/types';

export default function ToolkitCard({ flow, onComplete }:{
  flow: ToolkitFlow;
  onComplete: (out:{prompts:string[]; actions:boolean[]; metrics:string[]; isComplete:boolean;})=>void;
}) {
  const [answers, setAnswers] = useState<string[]>(() => flow.prompts.map(()=>''));
  const [checks, setChecks]   = useState<boolean[]>(() => flow.quick_actions.map(() => false));

  useEffect(() => {
    // Check if prompts are complete
    const noPrompts = flow.prompts.length === 0;
    const promptsComplete = noPrompts || 
      (answers.length === flow.prompts.length && answers.filter(a => a.trim().length >= 2).length === flow.prompts.length);
    
    // Check if actions are complete
    const noActions = flow.quick_actions.length === 0;
    const allActionsChecked = checks.length === flow.quick_actions.length && checks.every(c => c === true);
    const actionsComplete = noActions || allActionsChecked;
    
    const isComplete = promptsComplete && actionsComplete;
    
    // Debug logging
    if (process.env.NODE_ENV === 'development') {
      console.log('ToolkitCard completion check:', {
        promptsComplete,
        actionsComplete,
        isComplete,
        promptsLength: flow.prompts.length,
        actionsLength: flow.quick_actions.length,
        checksLength: checks.length,
        allChecked: checks.every(c => c === true),
        checks: checks
      });
    }
    
    // Always call onComplete to update parent state
    onComplete({ prompts:answers, actions:checks, metrics:flow.metrics ?? [], isComplete });
  }, [answers, checks, flow.prompts.length, flow.quick_actions.length, flow.metrics]);

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
      {flow.quick_actions.length > 0 && (
        <div>
          <div className="font-medium mb-2">Quick actions</div>
          {flow.quick_actions.map((a, i) => (
            <label key={i} className="flex items-center gap-2 mb-1">
              <input 
                type="checkbox" 
                checked={checks[i] || false} 
                onChange={e => { 
                  const next = checks.slice(); 
                  next[i] = e.target.checked; 
                  setChecks(next); 
                }} 
                aria-label={`Quick action ${i+1}`} 
              />
              <span>{a}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
