'use client';
import { useEffect, useRef, useState } from "react";
import { playButtonClick } from "@/lib/sounds";
import { useSound } from "@/contexts/SoundContext";

// Pixabay CDN URL - update with actual URL from Pixabay page
// To get the URL: visit the Pixabay track page, click Download, right-click the MP3 link, "Copy link address"
const PIXABAY_SRC = "https://cdn.pixabay.com/download/audio/2024/01/20/audio_412906.mp3?filename=spy-detective-background-suspenseful-investigation-full-412906.mp3";

export default function AudioToggle(){
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const { enabled, setEnabled } = useSound();

  // Initialize audio element
  useEffect(() => {
    const el = new Audio(PIXABAY_SRC);
    el.loop = true;
    el.preload = "auto";
    el.volume = 0.28;
    el.muted = true; // Start muted for autoplay safety
    audioRef.current = el;

    // Load saved preference
    const saved = localStorage.getItem('soundEnabled');
    if (saved === 'true') {
      setEnabled(true);
      el.muted = false;
      void el.play().catch(() => {
        // Autoplay blocked - will play when user clicks
      });
    }

    return () => {
      el.pause();
      el.src = '';
      audioRef.current = null;
    };
  }, [setEnabled]);

  // Handle enabled state changes
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (enabled) {
      el.muted = false;
      void el.play().catch(() => {
        // Autoplay may be blocked
      });
    } else {
      el.muted = true;
      el.pause();
    }
  }, [enabled]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* Speaker icon with enhanced animation */}
        <div 
          className={`text-2xl transition-all duration-300 ${
            enabled 
              ? 'animate-pulse-glow text-[#8C1515] scale-110' 
              : 'text-[#53565A] scale-100'
          }`}
          style={{
            filter: enabled ? 'drop-shadow(0 0 8px rgba(140,21,21,0.6))' : 'none',
            transform: enabled ? 'scale(1.15)' : 'scale(1)',
            animation: enabled ? 'pulse-glow 2s ease-in-out infinite' : 'none'
          }}
        >
          {enabled ? '🔊' : '🔇'}
        </div>
        {/* Pulsing ring effect when enabled */}
        {enabled && (
          <>
            <div 
              className="absolute inset-0 rounded-full border-2 border-[#8C1515] opacity-30"
              style={{
                animation: 'pulse-ring 2s ease-in-out infinite',
                transform: 'scale(1.5)',
                margin: '-8px'
              }}
            />
            <div 
              className="absolute inset-0 rounded-full border-2 border-[#8C1515] opacity-20"
              style={{
                animation: 'pulse-ring 2s ease-in-out infinite 0.3s',
                transform: 'scale(1.8)',
                margin: '-12px'
              }}
            />
          </>
        )}
      </div>
      <div className={`text-xs font-medium transition-colors duration-300 ${
        enabled ? 'text-[#8C1515]' : 'text-[#53565A]'
      }`}>
        {enabled ? 'Sound On' : 'Sound Off'}
      </div>
      <button 
        onClick={() => {
          playButtonClick();
          setEnabled(!enabled);
        }} 
        className={`text-xs transition-all duration-300 hover:scale-105 ${
          enabled 
            ? 'text-[#8C1515] hover:text-[#820f0f] font-semibold' 
            : 'text-[#53565A] hover:text-[#8C1515]'
        } cursor-pointer underline`}
        aria-pressed={enabled}
        aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      >
        (Click to {enabled ? "disable" : "enable"})
      </button>
    </div>
  );
}
