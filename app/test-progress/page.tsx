'use client';
import { useState, useEffect } from 'react';
import { loadProgress, clearProgress, saveProgress } from '@/lib/save';
import type { SaveState } from '@/lib/save';
import { getPlayerId, getPlayerName, setPlayerName } from '@/lib/player';
import Link from 'next/link';
import { playButtonClick } from '@/lib/sounds';

export default function TestProgressPage() {
  const [savedState, setSavedState] = useState<SaveState | null>(null);
  const [testMessage, setTestMessage] = useState<string>('');
  const [lastSaveTime, setLastSaveTime] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState<boolean | null>(null);
  const [playerId, setPlayerId] = useState<string>('');
  const [playerName, setPlayerNameState] = useState<string>('');

  useEffect(() => {
    // Mark as client-side to avoid hydration mismatch
    setIsClient(true);
    // Check localStorage availability
    setStorageAvailable(typeof window !== 'undefined' && 'localStorage' in window);
    // Get player info
    if (typeof window !== 'undefined') {
      setPlayerId(getPlayerId());
      setPlayerNameState(getPlayerName() || '');
    }
    // Load saved progress on mount
    const loaded = loadProgress();
    setSavedState(loaded);
    if (loaded) {
      setLastSaveTime(loaded.timestamp);
    }
  }, []);

  const handleTestSave = () => {
    playButtonClick();
    const testState: SaveState = {
      level: 1,
      idx: 2,
      timestamp: Date.now(),
      payload: {
        choice: 'A',
        toolkit: {
          prompts: ['Test prompt response'],
          actions: [true, false, true],
          isComplete: false
        }
      }
    };
    
    saveProgress(testState);
    setSavedState(testState);
    setLastSaveTime(testState.timestamp);
    setTestMessage('✓ Test progress saved successfully!');
    setTimeout(() => setTestMessage(''), 3000);
  };

  const handleClear = () => {
    playButtonClick();
    clearProgress();
    setSavedState(null);
    setLastSaveTime(0);
    setTestMessage('✓ Progress cleared successfully!');
    setTimeout(() => setTestMessage(''), 3000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#8C1515] mb-2">Progress Tracking Test Mode</h1>
          <p className="text-lg text-[#53565A]">Test and verify save/load functionality</p>
        </div>

        {/* Test Message */}
        {testMessage && (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
            <p className="text-green-700 font-semibold">{testMessage}</p>
          </div>
        )}

        {/* Player Information */}
        <div className="card p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#8C1515] border-b-2 border-[#8C1515] pb-2">
            Player Information
          </h2>
          
          <div className="space-y-3">
            <div>
              <strong className="text-[#2E2D29]">Player ID:</strong>
              <span className="ml-2 text-[#53565A] font-mono text-sm">{playerId || 'Loading...'}</span>
            </div>
            <div>
              <strong className="text-[#2E2D29]">Player Name:</strong>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerNameState(e.target.value)}
                  placeholder="Enter your name (optional)"
                  className="flex-1 border rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={() => {
                    playButtonClick();
                    setPlayerName(playerName);
                    setTestMessage('✓ Player name saved!');
                    setTimeout(() => setTestMessage(''), 3000);
                  }}
                  className="btn px-4 py-2 text-sm font-semibold"
                >
                  Save Name
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Current Saved State */}
        <div className="card p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#8C1515] border-b-2 border-[#8C1515] pb-2">
            Current Saved Progress
          </h2>
          
          {savedState ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong className="text-[#2E2D29]">Level:</strong>
                  <span className="ml-2 text-[#53565A]">{savedState.level}</span>
                </div>
                <div>
                  <strong className="text-[#2E2D29]">Scenario Index:</strong>
                  <span className="ml-2 text-[#53565A]">{savedState.idx}</span>
                </div>
                <div className="col-span-2">
                  <strong className="text-[#2E2D29]">Last Saved:</strong>
                  <span className="ml-2 text-[#53565A]">{formatDate(savedState.timestamp)}</span>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded border">
                <strong className="text-[#2E2D29] block mb-2">Saved Payload:</strong>
                <pre className="text-xs text-[#53565A] overflow-x-auto">
                  {JSON.stringify(savedState.payload, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-[#53565A]">
              <p className="text-lg">No saved progress found</p>
              <p className="text-sm mt-2">Progress will appear here after you save during gameplay</p>
            </div>
          )}
        </div>

        {/* Test Actions */}
        <div className="card p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#8C1515] border-b-2 border-[#8C1515] pb-2">
            Test Actions
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleTestSave}
              className="btn px-6 py-3 text-base font-semibold"
            >
              Save Test Progress
            </button>
            <button
              onClick={handleClear}
              className="btn-ghost px-6 py-3 text-base font-semibold border-2 border-red-500 text-red-600 hover:bg-red-50"
            >
              Clear All Progress
            </button>
            <button
              onClick={() => {
                playButtonClick();
                const loaded = loadProgress();
                setSavedState(loaded);
                if (loaded) {
                  setLastSaveTime(loaded.timestamp);
                  setTestMessage('✓ Progress reloaded!');
                } else {
                  setTestMessage('No progress found to reload.');
                }
                setTimeout(() => setTestMessage(''), 3000);
              }}
              className="btn-ghost px-6 py-3 text-base font-semibold"
            >
              Reload Progress
            </button>
          </div>
        </div>

        {/* Storage Info */}
        <div className="card p-6 space-y-4">
          <h2 className="text-2xl font-bold text-[#8C1515] border-b-2 border-[#8C1515] pb-2">
            Storage Information
          </h2>
          
          <div className="space-y-2 text-sm">
            <div>
              <strong className="text-[#2E2D29]">Storage Key:</strong>
              <span className="ml-2 text-[#53565A] font-mono text-xs break-all">
                {playerId ? `ETP_DECISIONS_SANDBOX_SAVE_${playerId}` : 'Loading...'}
              </span>
            </div>
            <div>
              <strong className="text-[#2E2D29]">Storage Type:</strong>
              <span className="ml-2 text-[#53565A]">localStorage</span>
            </div>
            <div>
              <strong className="text-[#2E2D29]">Storage Available:</strong>
              <span className="ml-2 text-[#53565A]">
                {!isClient ? 'Loading...' : storageAvailable === true ? '✓ Yes' : '✗ No'}
              </span>
            </div>
            <div>
              <strong className="text-[#2E2D29]">Storage Size:</strong>
              <span className="ml-2 text-[#53565A]">
                {savedState ? `${JSON.stringify(savedState).length} bytes` : '0 bytes'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-[#8C1515] border-b-2 border-[#8C1515] pb-2 mb-4">
            Quick Links
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="btn-ghost px-6 py-3 text-base font-semibold">
              ← Back Home
            </Link>
            <Link href="/play/individual/1" className="btn px-6 py-3 text-base font-semibold">
              Test Save During Play
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="card p-6 bg-blue-50 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-[#8C1515] mb-3">How to Test</h3>
          <ol className="list-decimal list-inside space-y-2 text-[#53565A]">
            <li>Click "Save Test Progress" to create a test save</li>
            <li>Navigate to any level and play a scenario</li>
            <li>Use "Save Your Progress" button during gameplay</li>
            <li>Return here to see your saved progress</li>
            <li>Use "Reload Progress" to refresh the display</li>
            <li>Use "Clear All Progress" to remove saved data</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

