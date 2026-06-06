"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const melody = [
  659.25, 659.25, 783.99, 659.25, 523.25, 587.33, 659.25, 0,
  783.99, 880, 783.99, 659.25, 587.33, 523.25, 587.33, 0,
];

const bass = [130.81, 0, 196, 0, 174.61, 0, 196, 0];
const stepMs = 150;
const defaultVolume = 0.72;

const createAudioContext = () => {
  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  return AudioContextClass ? new AudioContextClass() : null;
};

export function ChiptuneToggle() {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolume] = useState(defaultVolume);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  useEffect(() => {
    const savedMode = window.localStorage.getItem("pc-quiz-chiptune");
    const savedVolume = Number(window.localStorage.getItem("pc-quiz-chiptune-volume"));

    setEnabled(savedMode !== "off");
    setVolume(Number.isFinite(savedVolume) && savedVolume > 0 ? savedVolume : defaultVolume);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    if (!enabled) {
      stopMusic();
      window.localStorage.setItem("pc-quiz-chiptune", "off");
      return;
    }

    window.localStorage.setItem("pc-quiz-chiptune", "on");
    void startMusic();

    return () => stopMusic();
  }, [enabled, ready, volume]);

  useEffect(() => {
    if (!ready || !enabled) return;

    const unlockAudio = () => {
      void startMusic();
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [enabled, ready, volume]);

  const applyMasterVolume = () => {
    const audioContext = audioContextRef.current;
    const masterGain = masterGainRef.current;
    if (!audioContext || !masterGain) return;

    masterGain.gain.cancelScheduledValues(audioContext.currentTime);
    masterGain.gain.setTargetAtTime(enabled ? volume : 0, audioContext.currentTime, 0.025);
  };

  const scheduleNote = (frequency: number, startTime: number, duration: number, noteVolume: number) => {
    const audioContext = audioContextRef.current;
    const masterGain = masterGainRef.current;
    if (!audioContext || !masterGain || frequency <= 0) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(noteVolume, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.02);
  };

  const scheduleNoise = (startTime: number, noiseVolume: number) => {
    const audioContext = audioContextRef.current;
    const masterGain = masterGainRef.current;
    if (!audioContext || !masterGain) return;

    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.04, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    for (let index = 0; index < data.length; index += 1) {
      data[index] = Math.random() * 2 - 1;
    }

    const noise = audioContext.createBufferSource();
    const gain = audioContext.createGain();

    gain.gain.setValueAtTime(noiseVolume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

    noise.buffer = buffer;
    noise.connect(gain);
    gain.connect(masterGain);
    noise.start(startTime);
    noise.stop(startTime + 0.045);
  };

  const tick = () => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const step = stepRef.current;
    const now = audioContext.currentTime;
    const leadNote = melody[step % melody.length];
    const bassNote = bass[Math.floor(step / 2) % bass.length];

    scheduleNote(leadNote, now, 0.11, 0.075);

    if (step % 2 === 0) {
      scheduleNote(bassNote, now, 0.13, 0.055);
    }

    if (step % 4 === 2) {
      scheduleNoise(now, 0.045);
    }

    stepRef.current = step + 1;
  };

  const startMusic = async () => {
    if (!audioContextRef.current) {
      const audioContext = createAudioContext();
      if (!audioContext) return;

      const masterGain = audioContext.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      masterGainRef.current = masterGain;
    }

    applyMasterVolume();

    if (audioContextRef.current.state === "suspended") {
      try {
        await audioContextRef.current.resume();
      } catch {
        return;
      }
    }

    if (timerRef.current === null) {
      tick();
      timerRef.current = window.setInterval(tick, stepMs);
    }
  };

  const stopMusic = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    const audioContext = audioContextRef.current;
    const masterGain = masterGainRef.current;
    if (masterGain && audioContext) {
      masterGain.gain.cancelScheduledValues(audioContext.currentTime);
      masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.03);
    }
  };

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
        aria-label={enabled ? "關閉 8-bit 音樂" : "開啟 8-bit 音樂"}
        className="inline-flex h-9 items-center gap-2 rounded-md px-2 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal-200/70"
      >
        {enabled ? <Volume2 size={18} className="text-teal-200" /> : <VolumeX size={18} className="text-slate-400" />}
        <span>8-bit {enabled ? "ON" : "OFF"}</span>
      </button>

      <input
        type="range"
        min="0.2"
        max="1"
        step="0.05"
        value={volume}
        onChange={(event) => updateVolume(Number(event.target.value))}
        aria-label="8-bit 音樂音量"
        className="h-2 w-24 accent-teal-300"
      />
    </div>
  );
}
