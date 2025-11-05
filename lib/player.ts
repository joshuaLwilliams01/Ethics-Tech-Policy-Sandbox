// Player identification and management

const PLAYER_ID_KEY = 'ETP_PLAYER_ID';
const PLAYER_NAME_KEY = 'ETP_PLAYER_NAME';

/**
 * Get or create a unique player ID
 */
export function getPlayerId(): string {
  if (typeof window === 'undefined') return '';
  
  let playerId = localStorage.getItem(PLAYER_ID_KEY);
  if (!playerId) {
    // Generate a unique ID (timestamp + random)
    playerId = `player_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem(PLAYER_ID_KEY, playerId);
  }
  return playerId;
}

/**
 * Get player name (if set)
 */
export function getPlayerName(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(PLAYER_NAME_KEY);
}

/**
 * Set player name
 */
export function setPlayerName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PLAYER_NAME_KEY, name.trim());
}

/**
 * Clear player data (for testing or reset)
 */
export function clearPlayerData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PLAYER_ID_KEY);
  localStorage.removeItem(PLAYER_NAME_KEY);
}

