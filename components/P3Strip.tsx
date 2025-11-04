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
