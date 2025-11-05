// Sound effects utility for button clicks and interactions

let clickAudioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  
  if (!clickAudioContext) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    clickAudioContext = new AudioContextClass();
  }
  
  // Resume context if suspended (required by some browsers)
  if (clickAudioContext.state === 'suspended') {
    clickAudioContext.resume();
  }
  
  return clickAudioContext;
}

/**
 * Check if sound is enabled by reading from localStorage
 */
function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('soundEnabled');
  return saved === 'true';
}

/**
 * Play a spy/detective-themed button click sound effect
 * Mirrors the suspenseful investigation theme
 * Only plays if sound is enabled
 */
export function playButtonClick() {
  // Check if sound is enabled
  if (!isSoundEnabled()) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const now = ctx.currentTime;
  
  // Spy/detective click - lower frequency for mystery
  // Main click tone (800Hz) - slightly lower for detective feel
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  
  clickOsc.type = 'sine';
  clickOsc.frequency.value = 800;
  
  clickGain.gain.setValueAtTime(0, now);
  clickGain.gain.linearRampToValueAtTime(0.15, now + 0.003); // Quick, sharp attack
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1); // Smooth decay
  
  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);
  
  clickOsc.start(now);
  clickOsc.stop(now + 0.1);
  
  // Suspense layer - descending tone (600Hz → 400Hz) for mystery
  const suspenseOsc = ctx.createOscillator();
  const suspenseGain = ctx.createGain();
  
  suspenseOsc.type = 'sine';
  suspenseOsc.frequency.setValueAtTime(600, now);
  suspenseOsc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
  
  suspenseGain.gain.setValueAtTime(0, now);
  suspenseGain.gain.linearRampToValueAtTime(0.08, now + 0.002);
  suspenseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  
  suspenseOsc.connect(suspenseGain);
  suspenseGain.connect(ctx.destination);
  
  suspenseOsc.start(now);
  suspenseOsc.stop(now + 0.08);
  
  // Low detective thud (150Hz) - adds depth and mystery
  const thudOsc = ctx.createOscillator();
  const thudGain = ctx.createGain();
  
  thudOsc.type = 'sine';
  thudOsc.frequency.value = 150;
  
  thudGain.gain.setValueAtTime(0, now);
  thudGain.gain.linearRampToValueAtTime(0.1, now + 0.005);
  thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
  
  thudOsc.connect(thudGain);
  thudGain.connect(ctx.destination);
  
  thudOsc.start(now);
  thudOsc.stop(now + 0.12);
}

/**
 * Play a success/confirmation sound
 * Only plays if sound is enabled
 */
export function playSuccess() {
  // Check if sound is enabled
  if (!isSoundEnabled()) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;
  
  const now = ctx.currentTime;
  
  // Rising tone pattern (success sound)
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, now + i * 0.1);
    gain.gain.linearRampToValueAtTime(0.12, now + i * 0.1 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.15);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now + i * 0.1);
    osc.stop(now + i * 0.1 + 0.15);
  });
}

