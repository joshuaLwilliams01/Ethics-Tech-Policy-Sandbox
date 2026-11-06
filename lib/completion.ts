import { getCompletedLevels, TOTAL_LEVELS } from './run';

// Levels count as completed once their final scenario is submitted
// (recorded by markLevelCompleted in the level page).

export function checkAllLevelsCompleted(): boolean {
  return getCompletedLevels().length >= TOTAL_LEVELS;
}

export function getCompletionStats(): {
  completedLevels: number[];
  totalLevels: number;
  percentage: number;
} {
  const completedLevels = getCompletedLevels();
  return {
    completedLevels,
    totalLevels: TOTAL_LEVELS,
    percentage: Math.round((completedLevels.length / TOTAL_LEVELS) * 100),
  };
}
