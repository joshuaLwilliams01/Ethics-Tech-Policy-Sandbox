import { getPlayerId } from './player';

export type SaveState = {
  level:number;
  idx:number;
  timestamp:number;
  payload:any;
  playerId?: string; // Player identifier
};

function getStorageKey(): string {
  const playerId = getPlayerId();
  return `ETP_DECISIONS_SANDBOX_SAVE_${playerId}`;
}

export function saveProgress(state:SaveState){
  if (typeof window === 'undefined') return;
  const key = getStorageKey();
  const stateWithPlayer = {
    ...state,
    playerId: getPlayerId()
  };
  localStorage.setItem(key, JSON.stringify(stateWithPlayer));
}

export function loadProgress():SaveState | null{
  if (typeof window === 'undefined') return null;
  const key = getStorageKey();
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    // Verify this progress belongs to current player
    if (parsed.playerId && parsed.playerId !== getPlayerId()) {
      return null; // Progress belongs to different player
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearProgress(){
  if (typeof window !== 'undefined') {
    const key = getStorageKey();
    localStorage.removeItem(key);
  }
}

/**
 * Get all saved progress keys for current player (for debugging/testing)
 */
export function getAllPlayerProgressKeys(): string[] {
  if (typeof window === 'undefined') return [];
  const playerId = getPlayerId();
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('ETP_DECISIONS_SANDBOX_SAVE_') && key.includes(playerId)) {
      keys.push(key);
    }
  }
  return keys;
}
