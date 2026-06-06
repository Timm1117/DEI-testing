"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, Layers3, RotateCcw, Scale, Sparkles } from "lucide-react";
import { Danmaku } from "@/components/Danmaku";
import { ControversyTimeline } from "@/components/ControversyTimeline";
import { PoliticalIndexPanel } from "@/components/PoliticalIndexPanel";
import { RatingCard } from "@/components/RatingCard";
import { formatShare, getResultStat, rarityLabel } from "@/data/resultStats";
import { matchWork, type UserProfile } from "@/lib/matchWork";
import { works, type Work } from "@/data/works";

const buildTraitTags = (work: Work) => {
  const tags = [
    work.type === "film" ? "影視作品" : "遊戲作品",
    work.tags.commercialEntertainment >= 80 ? "商業娛樂性高" : null,
    work.tags.genrePrestige >= 80 ? "評論口碑型" : null,
    work.tags.genreSpectacle >= 80 ? "奇觀導向" : null,
    work.tags.adaptation >= 70 ? "IP / 原作改編" : "原創傾向",
    work.tags.canonFaithful >= 75 ? "原作忠實" : null,
    work.tags.canonFaithful <= 40 ? "大幅改編" : null,
    work.tags.representation >= 75 ? "高 DEI 代表性" : null,
    work.tags.representation <= 35 && work.tags.issueInsertion <= 35 ? "低 DEI 對照" : null,
    work.tags.issueInsertion >= 75 ? "議題濃度高" : null,
    work.tags.controversyRisk >= 75 ? "高爭議風險" : null,
    work.tags.mediaFriendly >= 80 ? "媒體友善" : null,
    work.tags.audienceAcceptance >= 80 ? "觀眾接受度高" : null,
    work.tags.playerFreedom >= 80 ? "高玩家自由度" : null,
    work.tags.storyDriven >= 80 ? "劇情導向" : null,
    work.tags.monetizationPressure >= 50 ? "營運壓力高" : null,
  ].filter(Boolean);

  return Array.from(new Set(tags)).slice(0, 12) as string[];
};

const buildReceptionInsight = (work: Work) => {
  const pcPressure =
    (work.politicalIndex.representation +
      work.politicalIndex.adaptationFreedom +
      work.politicalIndex.issueInsertion +
      work.politicalIndex.controversyRisk +
      work.politicalIndex.audienceSplit +
      (100 - work.politicalIndex.canonFaithful)) /
    6;

  if (work.tags.audienceAcceptance >= 80 && pcPressure < 45) {
    return "這類作品通常靠完成度、類型爽感或玩家體驗取勝，政治正確因素不是主要評價戰場。";
  }

  if (work.tags.audienceAcceptance >= 80 && work.politicalIndex.representation >= 75) {
    return "這類作品的代表性沒有拖累評價，因為它同時維持了娛樂性、角色功能或玩法完成度。";
  }

  if (work.politicalIndex.audienceSplit >= 75 && work.politicalIndex.controversyRisk >= 75) {
    return "這類作品容易被放進文化戰框架。若原作忠實度或娛樂性不足，觀眾反感會快速放大。";
  }

  if (work.tags.storyDriven >= 80 && work.tags.playerFreedom <= 40) {
    return "這類作品由作者強力控制敘事，媒體可能欣賞主題，但玩家或觀眾會更在意是否被迫接受角色命運。";
  }

  if (work.tags.playerFreedom >= 80 && work.politicalIndex.issueInsertion >= 70) {
    return "這類作品即使議題濃度高，也能靠自由度讓玩家自行消化立場，因此比較不容易被單一價值標籤綁死。";
  }

  return "這類作品的評價取決於議題、娛樂性、原作處理與受眾期待是否能彼此支撐。";
};

const buildSimilarityCopy = (similarity: number) => {
  if (similarity >= 76) {
    return {
      label: "高度相似",
      body: "你的製作取向和這部作品的文化壓力、娛樂性與受眾反應高度接近。",
    };
  }

  if (similarity >= 60) {
    return {
      label: "中度相似",
      body: "這是目前資料庫中相當接近的對照樣本，但仍有幾個面向不完全重疊。",
    };
  }

  return {
    label: "最接近樣本",
    body: "這是目前資料庫裡最接近的作品，不代表高度相似；你的答案可能落在資料庫樣本仍不足的區域。",
  };
};

const ResultArtwork = ({ work }: { work: Work }) => {
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [work.coverImage]);

  if (hasImageError) {
    return (
      <div className="flex aspect-video w-full flex-col justify-end bg-[radial-gradient(circle_at_top_left,rgba(94,234,212,0.22),transparent_34%),linear-gradient(135deg,#111827,#020617_72%)] p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-teal-100/70">Artwork unavailable</p>
        <p className="mt-3 text-3xl font-black leading-tight text-white">{work.title}</p>
        {work.originalTitle ? <p className="mt-2 text-sm text-slate-300">{work.originalTitle}</p> : null}
        <p className="mt-4 text-sm font-semibold text-teal-100">{work.year}</p>
      </div>
    );
  }

  return (
    <img
      src={work.coverImage}
      alt={`${work.title} artwork`}
      className="aspect-video w-full bg-black object-contain"
      onError={() => setHasImageError(true)}
    />
  );
};

const labelByScore = (value: number, high: string, mid: string, low: string) => {
  if (value >= 72) return high;
  if (value >= 45) return mid;
  return low;
};

function Meter({
  label,
  value,
  tone = "teal",
}: {
  label: string;
  value: number;
  tone?: "teal" | "amber" | "rose" | "sky";
}) {
  const colorClass = {
    teal: "bg-teal-300",
    amber: "bg-amber-300",
    rose: "bg-rose-300",
    sky: "bg-sky-300",
  }[tone];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono font-bold text-white">{Math.round(value)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

function ReceptionSplitCard({ work }: { work: Work }) {
  const media = work.politicalIndex.mediaFriendly;
  const audience = work.tags.audienceAcceptance;
  const split = work.politicalIndex.audienceSplit;
  const gap = Math.abs(media - audience);
  const headline =
    gap >= 28
      ? media > audience
        ? "媒體接受度高於觀眾"
        : "觀眾接受度高於媒體"
      : split >= 65
        ? "評價分裂主要來自文化戰"
        : "媒體與觀眾大致同向";

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-200 text-slate-950">
          <BarChart3 size={20} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">媒體 / 觀眾落差</h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">{headline}</p>
        </div>
      </div>
      <div className="space-y-4">
        <Meter label="影評人光環加成 (Critic Appeal)" value={media} tone="sky" />
        <Meter label="玩家/觀眾接受度" value={audience} tone="teal" />
        <Meter label="評價兩極化傾向 (Polarization)" value={split} tone={split >= 70 ? "rose" : "amber"} />
      </div>
    </section>
  );
}

function CausalityBreakdown({ work }: { work: Work }) {
  const factors = [
    {
      label: "進步價值合規度 (ESG/DEI)",
      value: work.politicalIndex.representation,
      body: labelByScore(work.politicalIndex.representation, "角色多元代表性被高度強調，成為外部指標重點。", "有部分代表性元素，但非核心賣點。", "代表性並未成為特別關注的重點。"),
      tone: "teal" as const,
    },
    {
      label: "創作解構自由 (Creative Liberty)",
      value: work.politicalIndex.adaptationFreedom,
      body: labelByScore(work.politicalIndex.adaptationFreedom, "解構力度大，容易挑戰老粉的經典期待。", "存在可感知的改動與改編嘗試。", "改動較小，接近既有受眾的經典期待。"),
      tone: "amber" as const,
    },
    {
      label: "宣傳觀點前景化 (Agenda Dominance)",
      value: work.politicalIndex.issueInsertion,
      body: labelByScore(work.politicalIndex.issueInsertion, "政治/社會議題在作品與宣傳中極為突出。", "議題存在但仍依附於主流敘事與體驗中。", "議題感較低，以核心玩法或敘事為主。"),
      tone: "sky" as const,
    },
    {
      label: "社群輿論反彈率 (Backlash Risk)",
      value: work.politicalIndex.controversyRisk,
      body: labelByScore(work.politicalIndex.controversyRisk, "極易引發文化戰與社群大規模炎上。", "部分核心社群會對設定產生質疑。", "輿論通常較為平穩，不會主導作品評價。"),
      tone: "rose" as const,
    },
  ];

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-200 text-slate-950">
          <Layers3 size={20} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">合規與輿論成因拆解</h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">合規政策通常不是單一變數，而是與創作解構、敘事完成度與核心老粉期待共同作用。</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {factors.map((factor) => (
          <div key={factor.label} className="rounded-lg border border-white/10 bg-black/20 p-4">
            <Meter label={factor.label} value={factor.value} tone={factor.tone} />
            <p className="mt-3 text-xs leading-5 text-slate-400">{factor.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PersonalizedInsight({ work, similarity }: { work: Work; similarity: number }) {
  const profile =
    work.politicalIndex.representation >= 72 && work.politicalIndex.controversyRisk >= 72
      ? "高代表性、高爭議壓力"
      : work.politicalIndex.representation >= 72 && work.tags.audienceAcceptance >= 75
        ? "高代表性、接受度穩定"
        : work.politicalIndex.representation <= 40 && work.tags.audienceAcceptance >= 75
          ? "低議題壓力、娛樂性主導"
          : "混合型文化壓力";
  const keyDriver =
    work.tags.playerFreedom >= 78
      ? "玩家自由度能幫助消化價值立場"
      : work.tags.storyDriven >= 80
        ? "敘事控制強，觀眾更在意角色命運是否被說服"
        : work.tags.canonFaithful <= 45
          ? "原作改動會放大 DEI 訊號"
          : "完成度與類型爽感仍是評價底盤";

  return (
    <section className="rounded-lg border border-teal-200/25 bg-teal-200/[0.08] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-200 text-slate-950">
          <Sparkles size={20} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">你的結果解讀</h2>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            你的選擇最接近「{profile}」路線，和 {work.title} 的相似度為 {similarity}%。
            這個結果的關鍵是：{keyDriver}。
          </p>
        </div>
      </div>
    </section>
  );
}

const pickCase = (type: Work["type"], predicate: (work: Work) => boolean, fallback: Work) =>
  works.find((work) => work.type === type && predicate(work)) ?? fallback;

function CaseComparison({ work }: { work: Work }) {
  const cases = [
    {
      label: "高 DEI 成功",
      work: pickCase(
        work.type,
        (candidate) =>
          candidate.tags.representation >= 80 &&
          candidate.tags.audienceAcceptance >= 80 &&
          candidate.politicalIndex.controversyRisk <= 45,
        work,
      ),
    },
    {
      label: "高 DEI 高爭議",
      work: pickCase(
        work.type,
        (candidate) => candidate.tags.representation >= 80 && candidate.politicalIndex.controversyRisk >= 70,
        work,
      ),
    },
    {
      label: "低 DEI 成功",
      work: pickCase(
        work.type,
        (candidate) => candidate.tags.representation <= 40 && candidate.tags.audienceAcceptance >= 80,
        work,
      ),
    },
    {
      label: "完成度壓過議題",
      work: pickCase(
        work.type,
        (candidate) => candidate.tags.studioRisk >= 70 || candidate.tags.audienceAcceptance <= 45,
        work,
      ),
    },
  ];

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-950">
          <Scale size={20} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">案例對照</h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">同樣談 DEI，結果會因完成度、受眾期待和改編策略而改變。</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cases.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">{item.label}</p>
            <p className="mt-3 text-base font-bold leading-6 text-white">{item.work.title}</p>
            <div className="mt-4 space-y-2 text-xs text-slate-400">
              <p>DEI {item.work.tags.representation} / 接受度 {item.work.tags.audienceAcceptance}</p>
              <p>爭議 {item.work.politicalIndex.controversyRisk} / 分裂 {item.work.politicalIndex.audienceSplit}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ResultPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem("pc-quiz-profile");
    if (!raw) return;

    try {
      setProfile(JSON.parse(raw) as UserProfile);
    } catch {
      window.localStorage.removeItem("pc-quiz-profile");
    }
  }, []);

  const result = useMemo(() => (profile ? matchWork(profile) : null), [profile]);

  if (!result) {
    return (
      <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5">
        <div
          className="absolute inset-[-2rem] -z-30 bg-cover bg-center opacity-35 blur-xl"
          style={{ backgroundImage: `url(${works[0]?.coverImage ?? ""})` }}
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#090a0f,rgba(9,10,15,0.88),#090a0f)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
        <section className="max-w-md rounded-lg border border-white/10 bg-white/[0.07] p-6 text-center backdrop-blur-xl saturate-150 shadow-glow">
          <h1 className="text-2xl font-bold text-white">還沒有測驗結果</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            先完成製作決策，系統才會推薦相似作品。
          </p>
          <Link
            href="/quiz"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-teal-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-200"
          >
            前往測驗
          </Link>
        </section>
      </main>
    );
  }

  const { work, similarity } = result;
  const traitTags = buildTraitTags(work);
  const receptionInsight = buildReceptionInsight(work);
  const similarityCopy = buildSimilarityCopy(similarity);
  const resultStat = getResultStat(work.id);
  const rarity = rarityLabel(resultStat.share);

  return (
    <main className="min-h-screen bg-[#090a0f]">
      <Danmaku comments={work.comments} />

      <section className="relative isolate min-h-screen overflow-hidden px-5 py-10">
        <div
          className="absolute inset-[-2rem] -z-50 bg-cover bg-center opacity-55 blur-xl"
          style={{ backgroundImage: `url(${work.coverImage})` }}
        />
        <div
          className="absolute inset-0 -z-40 bg-cover bg-center opacity-22 mix-blend-screen"
          style={{ backgroundImage: `url(${work.backgroundImage})` }}
        />
        <div
          className="absolute right-0 top-12 -z-30 hidden h-[76vh] w-[42vw] bg-contain bg-right-center bg-no-repeat opacity-60 drop-shadow-[0_2rem_5rem_rgba(0,0,0,0.65)] lg:block"
          style={{ backgroundImage: `url(${work.backgroundImage})` }}
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#090a0f_0%,rgba(9,10,15,0.96)_36%,rgba(9,10,15,0.78)_68%,rgba(9,10,15,0.58)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#090a0f]/20 via-[#090a0f]/58 to-[#090a0f]" />

        <div className="relative z-20 mx-auto max-w-6xl">
          <div className="grid min-h-[84vh] gap-8 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-teal-200">
                Most Similar Work
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
                {work.title}
              </h1>
              {work.originalTitle ? (
                <p className="mt-3 text-xl font-medium text-slate-300 sm:text-2xl">{work.originalTitle}</p>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white">
                  {work.year}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white">
                  {work.type === "film" ? "電影" : "遊戲"}
                </span>
              </div>
              <div className="mt-5 flex max-w-2xl flex-wrap gap-2">
                {traitTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-teal-200/20 bg-teal-200/10 px-3 py-1 text-xs font-medium text-teal-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100">{work.synopsis}</p>
              <div className="mt-5 max-w-2xl rounded-lg border border-white/10 bg-black/45 p-4 backdrop-blur-xl saturate-150">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">評價門檻推論</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{receptionInsight}</p>
              </div>
              <div className="mt-4 grid max-w-2xl grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl saturate-150">
                  <p className="text-xs text-slate-400">ESG合規</p>
                  <p className="mt-1 text-2xl font-black text-teal-200">{work.politicalIndex.representation}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl saturate-150">
                  <p className="text-xs text-slate-400">輿論反彈</p>
                  <p className="mt-1 text-2xl font-black text-rose-200">{work.politicalIndex.controversyRisk}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl saturate-150">
                  <p className="text-xs text-slate-400">市場接受</p>
                  <p className="mt-1 text-2xl font-black text-amber-200">{work.tags.audienceAcceptance}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg border border-white/15 bg-black/35 shadow-glow backdrop-blur-xl saturate-150">
                <ResultArtwork work={work} />
                <div className="border-t border-white/10 px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">作品圖像識別</p>
                  <p className="mt-1 text-xl font-semibold text-white">{work.title}</p>
                  {work.originalTitle ? (
                    <p className="mt-1 text-sm text-slate-400">{work.originalTitle}</p>
                  ) : null}
                </div>
              </div>

              <div className="rounded-lg border border-teal-200/30 bg-black/45 p-6 shadow-glow backdrop-blur-xl saturate-150">
                <div className="text-sm text-slate-300">相似度</div>
                <div className="mt-3 text-6xl font-black text-teal-200">{similarity}%</div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-teal-300" style={{ width: `${similarity}%` }} />
                </div>
                <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md">
                  <div className="text-sm font-semibold text-white">{similarityCopy.label}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{similarityCopy.body}</p>
                </div>
                <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Result Rarity</p>
                      <p className="mt-1 text-sm text-slate-200">
                        你與{" "}
                        <span className="font-mono text-lg font-bold text-teal-200">
                          {formatShare(resultStat.share)}
                        </span>{" "}
                        的人一樣
                      </p>
                    </div>
                    <span className="rounded-full border border-teal-200/30 bg-teal-200/10 px-3 py-1 text-sm font-semibold text-teal-100">
                      {rarity}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    依本地 mock 模擬 {resultStat.sampleSize.toLocaleString()} 次測驗估算。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 pb-5 lg:grid-cols-[1fr_1fr]">
            <PersonalizedInsight work={work} similarity={similarity} />
            <ReceptionSplitCard work={work} />
          </div>

          <div className="grid gap-5 pb-5 lg:grid-cols-[1fr_1fr]">
            <CausalityBreakdown work={work} />
            <PoliticalIndexPanel index={work.politicalIndex} />
          </div>

          <div className="pb-5">
            <CaseComparison work={work} />
          </div>

          <div className="grid gap-5 pb-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <RatingCard ratings={work.ratings} type={work.type} />
              <ControversyTimeline work={work} />
            </div>
            <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
              <h2 className="text-lg font-semibold text-white">核心觀點</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                這個測驗要呈現的不是「DEI 一定加分或扣分」，而是 DEI 如何和娛樂性、角色功能、
                改編忠實度、玩家自由度、媒體語境與社群期待交互作用。當代表性服務角色與體驗時，
                它可能擴大共鳴；當它和原作期待或完成度衝突時，爭議就會成為評價主軸。
              </p>
            </section>
          </div>

          <div className="pb-12">
            <Link
              href="/quiz"
              onClick={() => window.localStorage.removeItem("pc-quiz-profile")}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              <RotateCcw size={18} />
              重新測驗
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
