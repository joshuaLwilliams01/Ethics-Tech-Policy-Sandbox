'use client';
import { useEffect, useRef, useState } from "react";

export default function AudioToggle(){
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(()=>{
    if (!audioRef.current) return;
    if (enabled){
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(()=>{ /* autoplay may block until user gesture */ });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [enabled]);

  return (
    <div className="flex items-center gap-2">
      <button onClick={()=>setEnabled(v=>!v)} className="btn-ghost px-3 py-1 text-sm" aria-pressed={enabled}>
        {enabled ? "Sound Off" : "Sound On"}
      </button>
      <audio ref={audioRef} src="/sfx-suspense.mp3" loop preload="none" />
    </div>
  );
}
