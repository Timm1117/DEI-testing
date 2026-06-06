import Link from "next/link";
import { Clapperboard, Gamepad2, MoveRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080a10]">
      <section className="relative isolate flex min-h-screen items-center overflow-hidden px-5 py-10">
        <div
          className="absolute inset-0 -z-40 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1603739903239-8b6e64c3b185?auto=format&fit=crop&w=1800&q=80)",
          }}
        />
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(90deg,#080a10_0%,rgba(8,10,16,0.88)_48%,rgba(8,10,16,0.64)_100%)]" />
        <div className="absolute inset-x-0 top-10 -z-20 h-16 border-y border-white/10 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_1.5rem,transparent_1.5rem_2.7rem)] opacity-35" />
        <div className="absolute bottom-0 right-0 -z-20 h-2/3 w-2/3 bg-[linear-gradient(rgba(94,234,212,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.12)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#080a10]/30 to-[#080a10]" />

        {/* Glowing background blur blobs for gorgeous glassmorphism */}
        <div className="absolute top-1/4 left-1/4 -z-20 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 -z-20 h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 -z-20 h-80 w-80 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-teal-200">
              Interactive Production Quiz
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
              政治正確對影視與遊戲產業評價的影響
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              你將扮演創作者，回答一系列製作決策。系統會把你的選擇轉成作品標籤，
              再與真實電影或遊戲的 mock data 比對，推薦最相似的一部作品。
            </p>
            <Link
              href="/quiz"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-200"
            >
              開始製作測驗
              <MoveRight size={18} />
            </Link>
          </div>

          <div className="grid gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
              <Clapperboard className="mb-4 text-teal-200" size={28} />
              <h2 className="text-xl font-semibold text-white">影視作品</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                追蹤改編忠實度、選角代表性、媒體友善度與觀眾分裂風險。
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
              <Gamepad2 className="mb-4 text-amber-200" size={28} />
              <h2 className="text-xl font-semibold text-white">遊戲作品</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                加入商業模式、玩家自由度、劇情導向與社群接受度等決策。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
