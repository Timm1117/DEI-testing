"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clapperboard, Gamepad2, MoveRight, Sparkles } from "lucide-react";

const translations = {
  zh: {
    badge: "Interactive Production Tycoon Project",
    title: "政確巨擎：DEI or Not?",
    tagline: "伴隨著無數工作室的倒閉與市場惡評，DEI 彷彿已成為娛樂產業的敏感詞彙。然而，究竟是什麼推力，讓創作者們頂著輿論風暴依然推陳出新？",
    desc: "這一次，換你扮演決策者——親身體驗創作與輿論拉扯的重重難關，看看你最終會做出名留青史的傑作，還是引發公關災難？",
    btnStart: "開始製作測驗",
    btnTip: "⏱️ 限時突發危機考驗已連線",
    filmTitle: "🎬 影視作品製作人",
    filmSub: "大片與影集項目",
    filmDesc: "追蹤原作設定改編忠實度、少數族裔與多元性別主角選角，以及主流媒體好評率與核心粉絲之間的衝突。",
    gameTitle: "🕹️ 遊戲開發負責人",
    gameSub: "3A 與獨立遊戲項目",
    gameDesc: "處理商城氪金與變現壓力、玩家探索開放自由度、非二元主角美學造型，以及社群口碑崩潰退款的自救對策。",
  },
  en: {
    badge: "Interactive Production Tycoon Project",
    title: "DEI Tycoon: DEI or Not?",
    tagline: "With countless studio closures and negative reviews, DEI seems to have become a sensitive word in the entertainment industry. Yet, what force drives creators to keep pushing forward amidst the discourse storm?",
    desc: "This time, you are the decision-maker—experience first-hand the constant tug-of-war between creation and public opinion. Will you create a legendary masterpiece, or trigger a public relations disaster?",
    btnStart: "Start Production Quiz",
    btnTip: "⏱️ Timed Sudden Crisis Challenges Connected",
    filmTitle: "🎬 Film Producer",
    filmSub: "Blockbuster & Series Projects",
    filmDesc: "Track adaptation fidelity, minority/diverse lead casting, and the clash between media approval and core fan sentiment.",
    gameTitle: "🕹️ Game Director",
    gameSub: "AAA & Indie Game Projects",
    gameDesc: "Manage microtransactions, monetization pressure, player freedom, non-binary character aesthetics, and community backlash refund mitigation.",
  }
};

export default function HomePage() {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem("pc-quiz-lang");
    if (saved === "en" || saved === "zh") {
      setLang(saved);
    }
  }, []);

  const toggleLang = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    window.localStorage.setItem("pc-quiz-lang", next);
  };

  const t = translations[lang];

  return (
    <main className="min-h-screen bg-[#06080e] relative overflow-hidden select-none">
      {/* Language Toggle Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] px-3.5 py-2 text-xs font-bold text-white shadow-glow backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span>🌐</span>
          <span>{lang === "zh" ? "EN" : "繁中"}</span>
        </button>
      </div>

      {/* Background Visual Grid & Pattern */}
      <div
        className="absolute inset-0 -z-40 bg-cover bg-center opacity-20 saturate-50 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?auto=format&fit=crop&w=1800&q=80)",
        }}
      />
      <div className="absolute inset-0 -z-30 bg-gradient-to-tr from-[#06080e] via-[#090d16] to-[#04060a]" />
      <div className="absolute inset-x-0 top-12 -z-20 h-20 border-y border-white/5 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.08)_0_2rem,transparent_2rem_4rem)] opacity-20" />
      <div className="absolute bottom-0 right-0 -z-20 h-full w-full bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.04)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-60" />
      
      {/* Radiant Glow Blobs for premium ambiance */}
      <div className="absolute top-1/4 left-1/4 -z-20 h-[32rem] w-[32rem] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 -z-20 h-[36rem] w-[36rem] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none animate-pulse duration-[10000ms]" />
      <div className="absolute top-1/2 right-10 -z-20 h-96 w-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <section className="relative min-h-screen flex items-center px-6 py-12 sm:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          
          {/* Left Hero Content */}
          <div className="flex flex-col items-start text-left">
            {/* Project Tagline Badge */}
            <div className="mb-6 flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-950/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
              <Sparkles size={14} className="animate-spin duration-3000 text-teal-300" />
              <span>{t.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-white to-purple-300">
                {t.title}
              </span>
            </h1>

            {/* Subtitle & Description */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-8 text-amber-200/95 font-semibold drop-shadow-sm">
              {t.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-8 text-slate-300/90 font-medium">
              {t.desc}
            </p>

            {/* Call To Action Buttons */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link
                href="/quiz"
                className="group relative inline-flex items-center gap-2 rounded-lg bg-teal-300 hover:bg-teal-200 px-7 py-4 font-bold text-slate-950 transition-all duration-300 shadow-[0_0_30px_rgba(94,234,212,0.3)] hover:shadow-[0_0_40px_rgba(94,234,212,0.5)] active:scale-[0.98]"
              >
                {t.btnStart}
                <MoveRight size={18} className="transition group-hover:translate-x-1 duration-300" />
              </Link>
              
              <span className="text-xs text-slate-400 font-mono tracking-wider pl-1">
                {t.btnTip}
              </span>
            </div>
          </div>

          {/* Right Cards showing Medium details */}
          <div className="grid gap-4">
            
            {/* Film Card */}
            <div className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl saturate-150 shadow-glow transition duration-300 hover:border-teal-400/40 hover:shadow-[0_0_25px_rgba(45,212,191,0.1)]">
              {/* Left subtle indicator bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-teal-400 opacity-0 group-hover:opacity-100 transition duration-300" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-teal-950/50 border border-teal-500/20 text-teal-300">
                  <Clapperboard size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">{t.filmTitle}</h2>
                  <span className="text-[10px] uppercase font-mono text-teal-300 font-bold bg-teal-950/30 px-2 py-0.5 rounded border border-teal-500/20">
                    {t.filmSub}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-6 pl-1">
                {t.filmDesc}
              </p>
            </div>

            {/* Game Card */}
            <div className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl saturate-150 shadow-glow transition duration-300 hover:border-amber-400/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)]">
              {/* Left subtle indicator bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-amber-400 opacity-0 group-hover:opacity-100 transition duration-300" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-amber-950/50 border border-amber-500/20 text-amber-300">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">{t.gameTitle}</h2>
                  <span className="text-[10px] uppercase font-mono text-amber-300 font-bold bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
                    {t.gameSub}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-6 pl-1">
                {t.gameDesc}
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
