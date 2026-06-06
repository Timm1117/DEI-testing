import { BarChart3, Clapperboard, ExternalLink, Gamepad2, Star } from "lucide-react";
import type { RatingSource, RatingSourceKey, WorkType } from "@/data/works";

const toneClass: Record<NonNullable<RatingSource["tone"]>, string> = {
  good: "border-teal-300/30 bg-teal-300/10",
  mixed: "border-amber-300/30 bg-amber-300/10",
  bad: "border-rose-300/30 bg-rose-300/10",
  neutral: "border-slate-300/20 bg-slate-300/10",
};

const iconWrapClass: Record<NonNullable<RatingSource["tone"]>, string> = {
  good: "bg-teal-200 text-slate-950",
  mixed: "bg-amber-200 text-slate-950",
  bad: "bg-rose-200 text-slate-950",
  neutral: "bg-slate-200 text-slate-950",
};

function TomatoIcon() {
  return (
    <span className="relative block h-5 w-5 rounded-full bg-red-500">
      <span className="absolute -top-1 left-1/2 h-2 w-3 -translate-x-1/2 rounded-t-full bg-emerald-400" />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-300/60" />
    </span>
  );
}

function SteamIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.95" />
      <circle cx="16.8" cy="8.1" r="2.7" fill="#0f172a" />
      <circle cx="16.8" cy="8.1" r="1.45" fill="currentColor" />
      <circle cx="8.2" cy="15.2" r="2.45" fill="#0f172a" />
      <path d="M9.9 13.5 14.6 9.8" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <path d="M3.8 13.8 7.1 15.2" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function SourceIcon({ source }: { source: RatingSourceKey }) {
  if (source === "rottenTomatoes") return <TomatoIcon />;
  if (source === "steam") return <SteamIcon />;
  if (source === "rawg") return <Gamepad2 size={20} />;
  if (source === "metacritic") return <BarChart3 size={20} />;
  if (source === "tmdb") return <Clapperboard size={20} />;
  return <Star size={20} />;
}

export function RatingCard({
  ratings,
  type,
}: {
  ratings: RatingSource[];
  type: WorkType;
}) {
  const sources =
    type === "film" ? "TMDB / IMDb / Metacritic / Rotten Tomatoes" : "RAWG / Metacritic / Steam";

  return (
    <section className="rounded-lg border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">實際評分</h2>
        <p className="mt-1 text-sm text-slate-300">{sources}，保留各網站原始呈現。</p>
      </div>

      <div className="space-y-3">
        {ratings.map((rating) => {
          const tone = rating.tone ?? "neutral";
          return (
            <div
              key={rating.label}
              className={`flex items-center gap-4 rounded-lg border p-4 text-slate-100 ${toneClass[tone]}`}
            >
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconWrapClass[tone]}`}>
                <SourceIcon source={rating.source} />
              </div>

              <div className="min-w-0 flex-1">
                <a
                  href={rating.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex max-w-full items-center gap-1 font-bold text-white underline-offset-4 hover:text-teal-200 hover:underline"
                >
                  <span className="truncate">{rating.label}</span>
                  <ExternalLink size={14} className="shrink-0" />
                </a>
                <p className="mt-1 text-sm text-slate-300">{rating.verdict}</p>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-lg font-black text-white">{rating.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
