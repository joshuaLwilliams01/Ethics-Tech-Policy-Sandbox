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
