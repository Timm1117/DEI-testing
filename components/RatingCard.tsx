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

const translateRatingLabel = (label: string, isEn: boolean) => {
  if (!isEn) return label;
  return label
    .replace("玩家好評", "User Reviews")
    .replace("影評推薦", "Tomatometer")
    .replace("觀眾好評", "Audience Score")
    .replace("媒體評分", "Metacritic")
    .replace("一般觀眾", "IMDb User Rating")
    .replace("影迷評分", "TMDB Rating");
};

const translateRatingVerdict = (verdict: string, isEn: boolean) => {
  if (!isEn) return verdict;
  return verdict
    .replace("壓倒性好評", "Overwhelmingly Positive")
    .replace("極度好評", "Very Positive")
    .replace("大多好評", "Mostly Positive")
    .replace("普遍好評", "Mostly Positive")
    .replace("普遍好評", "Mostly Favorable")
    .replace("好評率", "Positive rate ")
    .replace("分", " pts")
    .replace("褒貶不一", "Mixed")
    .replace("普遍差評", "Mostly Negative")
    .replace("大多負評", "Mostly Negative")
    .replace("極度負評", "Very Negative")
    .replace("壓倒性負評", "Overwhelmingly Negative")
    .replace("新鮮", "Fresh")
    .replace("爛", "Rotten")
    .replace("爆米花", "Fresh (Audience)")
    .replace("倒了", "Rotten (Audience)")
    .replace("推薦", "Recommended")
    .replace("大眾推薦", "Highly Recommended")
    .replace("無特別標籤", "No Verdict");
};

export function RatingCard({
  ratings,
  type,
  lang = "zh"
}: {
  ratings: RatingSource[];
  type: WorkType;
  lang?: "zh" | "en";
}) {
  const isEn = lang === "en";
  const sources =
    type === "film" ? "TMDB / IMDb / Metacritic / Rotten Tomatoes" : "RAWG / Metacritic / Steam";

  return (
    <section className="rounded-lg border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          {isEn ? "Actual Ratings" : "實際評分"}
        </h2>
        <p className="mt-1 text-sm text-slate-300">
          {isEn 
            ? `${sources}, preserving each platform's original format.`
            : `${sources}，保留各網站原始呈現。`}
        </p>
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
                  <span className="truncate">{translateRatingLabel(rating.label, isEn)}</span>
                  <ExternalLink size={14} className="shrink-0" />
                </a>
                <p className="mt-1 text-sm text-slate-300">{translateRatingVerdict(rating.verdict, isEn)}</p>
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
