import Link from "next/link";
import { Clapperboard, Gamepad2, MoveRight, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#06080e] relative overflow-hidden select-none">
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
              <span>Interactive Production Tycoon Project</span>
            </div>

            {/* Main Title & Subtitle */}
            <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-white to-purple-300">
                輿論風暴：製作人的求生指南
              </span>
              <span className="block mt-3.5 text-lg sm:text-2xl font-extrabold text-amber-300/95 tracking-wide drop-shadow-md">
                DEI 對於遊戲與影視產業的影響 —— 理想與現實的拉扯
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-sm sm:text-base leading-8 text-slate-300/90 font-medium">
              你將扮演專案製作人，面對一系列關乎預算、選角、說教意味及 ESG 文化評級的製作決策。
              本模擬測驗將即時預測市場對你的評價（媒體分 vs 玩家口碑），並在最後透過特徵向量比對，
              為你推薦最相似的真實影視或遊戲作品，揭示作品成敗背後的核心成因。
            </p>

            {/* Call To Action Buttons */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link
                href="/quiz"
                className="group relative inline-flex items-center gap-2 rounded-lg bg-teal-300 hover:bg-teal-200 px-7 py-4 font-bold text-slate-950 transition-all duration-300 shadow-[0_0_30px_rgba(94,234,212,0.3)] hover:shadow-[0_0_40px_rgba(94,234,212,0.5)] active:scale-[0.98]"
              >
                開始製作測驗
                <MoveRight size={18} className="transition group-hover:translate-x-1 duration-300" />
              </Link>
              
              <span className="text-xs text-slate-400 font-mono tracking-wider pl-1">
                ⏱️ 限時突發危機考驗已連線
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
                  <h2 className="text-lg font-bold text-white tracking-wide">🎬 影視作品製作人</h2>
                  <span className="text-[10px] uppercase font-mono text-teal-300 font-bold bg-teal-950/30 px-2 py-0.5 rounded border border-teal-500/20">
                    大片與影集項目
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-6 pl-1">
                追蹤原作設定改編忠實度、少數族裔與多元性別主角選角，以及主流媒體好評率與核心粉絲之間的衝突。
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
                  <h2 className="text-lg font-bold text-white tracking-wide">🕹️ 遊戲開發負責人</h2>
                  <span className="text-[10px] uppercase font-mono text-amber-300 font-bold bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
                    3A 與獨立遊戲項目
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-6 pl-1">
                處理商城氪金與變現壓力、玩家探索開放自由度、非二元主角美學造型，以及社群口碑崩潰退款的自救對策。
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
