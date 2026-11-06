// Stores the most recent level run so the Results page can display it.
// Written to both sessionStorage and localStorage: sessionStorage keeps the
// original behaviour, localStorage survives new tabs, reloads and mobile
// browsers that discard session storage.

export const LATEST_RUN_KEY = 'LATEST_RUN';

export type RunRecord = {
  level: number;
  title?: string;
  steps: any[];
  updatedAt: number;
};

export function saveLatestRun(run: RunRecord) {
  if (typeof window === 'undefined') return;
  const raw = JSON.stringify(run);
  try { sessionStorage.setItem(LATEST_RUN_KEY, raw); } catch (e) { console.error('Could not save run to sessionStorage', e); }
  try { localStorage.setItem(LATEST_RUN_KEY, raw); } catch (e) { console.error('Could not save run to localStorage', e); }
}

export function loadLatestRun(): RunRecord | null {
  if (typeof window === 'undefined') return null;
  const sources: Array<() => string | null> = [
    () => sessionStorage.getItem(LATEST_RUN_KEY),
    () => localStorage.getItem(LATEST_RUN_KEY),
  ];
  for (const read of sources) {
    try {
      const raw = read();
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.steps)) return parsed;
    } catch {
      // Storage blocked or bad data: try the next source.
    }
  }
  return null;
}
