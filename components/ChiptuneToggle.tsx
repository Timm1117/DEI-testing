"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const defaultVolume = 0.5;

export function ChiptuneToggle() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolume] = useState(defaultVolume);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create the Audio object on mount (client-side only)
    const audio = new Audio("/bgm.mp3");
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    const savedMode = window.localStorage.getItem("pc-quiz-chiptune");
    const savedVolume = Number(window.localStorage.getItem("pc-quiz-chiptune-volume"));

    const isEnabled = savedMode !== "off";
    setEnabled(isEnabled);

    const initialVolume = Number.isFinite(savedVolume) && savedVolume > 0 ? savedVolume : defaultVolume;
    setVolume(initialVolume);
    audio.volume = initialVolume;

    setReady(true);

    return () => {
      audio.pause();
    };
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle play/pause based on enabled state
  useEffect(() => {
    if (!ready || !audioRef.current) return;

    if (!enabled) {
      audioRef.current.pause();
      window.localStorage.setItem("pc-quiz-chiptune", "off");
      return;
    }

    window.localStorage.setItem("pc-quiz-chiptune", "on");
    
    // Attempt to play
    audioRef.current.play().catch(() => {
      // Autoplay blocked, wait for user interaction to unlock
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [enabled, ready]);

  // User interaction listener to unlock autoplay
  useEffect(() => {
    if (!ready || !enabled || !audioRef.current) return;

    const unlockAudio = () => {
      if (audioRef.current && enabled) {
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [enabled, ready]);

  // Visibility change listener to pause BGM in background
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        audioRef.current.pause();
      } else {
        if (enabled && ready) {
          audioRef.current.play().catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, ready]);

  const updateVolume = (value: number) => {
    setVolume(value);
    window.localStorage.setItem("pc-quiz-chiptune-volume", String(value));
  };

  const toggleMusic = () => {
    setEnabled((current) => !current);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-lg border border-white/15 bg-slate-950/85 px-3 py-2 text-sm font-semibold text-white shadow-glow backdrop-blur-xl saturate-150">
      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={enabled}
        aria-label={enabled ? "關閉背景音樂" : "開啟背景音樂"}
        className="inline-flex h-9 items-center gap-2 rounded-md px-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal-200/70"
      >
        {enabled ? <Volume2 size={18} className="text-teal-200" /> : <VolumeX size={18} className="text-slate-400" />}
        <span>BGM {enabled ? "ON" : "OFF"}</span>
      </button>

      <input
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={volume}
        onChange={(event) => updateVolume(Number(event.target.value))}
        aria-label="背景音樂音量"
        className="h-2 w-24 accent-teal-300"
      />
    </div>
  );
}
