// Check if all levels are completed
export function checkAllLevelsCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if all 7 levels have been completed
  // We'll check for completed runs in sessionStorage or localStorage
  const completedLevels = new Set<number>();
  
  // Check sessionStorage for recent runs
  try {
    const latestRun = sessionStorage.getItem('LATEST_RUN');
    if (latestRun) {
      const run = JSON.parse(latestRun);
      if (run.steps) {
        // Extract level numbers from scenario IDs (L1-S1, L2-S1, etc.)
        run.steps.forEach((step: any) => {
          const match = step.scenario_id?.match(/^L(\d+)-/);
          if (match) {
            completedLevels.add(parseInt(match[1], 10));
          }
        });
      }
    }
  } catch (e) {
    // Ignore errors
  }
  
  // Also check localStorage for saved progress
  try {
    const saved = localStorage.getItem('ETP_DECISIONS_SANDBOX_SAVE');
    if (saved) {
      const state = JSON.parse(saved);
      if (state.level) {
        completedLevels.add(state.level);
      }
    }
  } catch (e) {
    // Ignore errors
  }
  
  // For now, we'll check if at least one scenario from each of the 7 levels is completed
  // In a full implementation, you'd want to check all 5 scenarios per level
  return completedLevels.size >= 7;
}

// Get completion statistics
export function getCompletionStats(): {
  completedLevels: number[];
  totalLevels: number;
  percentage: number;
} {
  if (typeof window === 'undefined') {
    return { completedLevels: [], totalLevels: 7, percentage: 0 };
  }
  
  const completedLevels = new Set<number>();
  
  try {
    const latestRun = sessionStorage.getItem('LATEST_RUN');
    if (latestRun) {
      const run = JSON.parse(latestRun);
      if (run.steps) {
        run.steps.forEach((step: any) => {
          const match = step.scenario_id?.match(/^L(\d+)-/);
          if (match) {
            completedLevels.add(parseInt(match[1], 10));
          }
        });
      }
    }
  } catch (e) {
    // Ignore errors
  }
  
  try {
    const saved = localStorage.getItem('ETP_DECISIONS_SANDBOX_SAVE');
    if (saved) {
      const state = JSON.parse(saved);
      if (state.level) {
        completedLevels.add(state.level);
      }
    }
  } catch (e) {
    // Ignore errors
  }
  
  const completedArray = Array.from(completedLevels).sort((a, b) => a - b);
  return {
    completedLevels: completedArray,
    totalLevels: 7,
    percentage: Math.round((completedArray.length / 7) * 100)
  };
}

