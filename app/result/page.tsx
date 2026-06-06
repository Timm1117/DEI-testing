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

const getProducerTitle = (work: Work) => {
  const representation = work.politicalIndex.representation;
  const controversy = work.politicalIndex.controversyRisk;
  const entertainment = work.tags.commercialEntertainment;
  const canon = work.tags.canonFaithful;
  const media = work.politicalIndex.mediaFriendly;

  if (representation >= 75 && controversy >= 75) {
    return {
      title: "🔥 輿論核彈引爆狂魔",
      sub: "Controversy Catalyst",
      desc: "您大膽推動進步多元價值，不惜與核心粉絲正面開戰。雖然在社群上引發了毀天滅地的炎上風暴，但絕對是今年度話題度最高的產業焦點！",
      color: "from-red-500 via-rose-600 to-amber-500"
    };
  }
  if (representation >= 75 && controversy <= 45) {
    return {
      title: "🌈 多元價值水利大師",
      sub: "Diversity Diplomat",
      desc: "您將多元代表性（DEI）與核心玩法或劇情完美融合，既獲得了主流媒體與投資人的熱烈掌聲，又成功安撫了玩家大眾，達成了難得的和諧定位！",
      color: "from-teal-400 via-emerald-500 to-sky-400"
    };
  }
  if (representation <= 35 && canon >= 75) {
    return {
      title: "🛡️ 鐵血原作聖經守護騎士",
      sub: "Canon Fundamentalist",
      desc: "您堅定捍衛原作設定，拒絕任何生硬的多元解構。雖然這可能讓部分進步派媒體和影評人略感不滿，但核心老粉對您的忠誠度直接拉滿！",
      color: "from-yellow-400 via-amber-500 to-orange-500"
    };
  }
  if (entertainment >= 78 && controversy <= 45) {
    return {
      title: "💸 極致商業票房巨賈",
      sub: "Commercial Tycoon",
      desc: "對您而言，好玩和好看才是唯一的硬道理。您精準地避開了所有政治雷區，將所有預算灌注在爽感與感官刺激上，賺得盆滿缽滿！",
      color: "from-purple-500 via-indigo-600 to-blue-500"
    };
  }
  if (media >= 78 && representation >= 70) {
    return {
      title: "🏆 影評人掌聲收割機",
      sub: "Prestige Magnet",
      desc: "您的作品充滿了深沉的社會關懷與文藝美學。主流媒體在各大頭條對您極盡讚美之能事，各大頒獎季的金牌已經在向您招手！",
      color: "from-pink-500 via-purple-600 to-indigo-500"
    };
  }
  return {
    title: "⚖️ 業界端水大師",
    sub: "Balanced Pragmatist",
    desc: "您在各方利益之間小心翼翼地維持著平衡：既沒有過度招致保守群體的憤怒，也沒有在 ESG 文化合規評級上交白卷。平穩前行是您的座右銘。",
    color: "from-slate-400 via-slate-500 to-slate-400"
  };
};

const getPrDiagnosis = (work: Work) => {
  const representation = work.politicalIndex.representation;
  const controversy = work.politicalIndex.controversyRisk;
  const canon = work.tags.canonFaithful;

  const auditPoints = [];

  if (representation >= 75) {
    auditPoints.push({
      status: "success",
      title: "🌿 DEI 合規度高：資金安全與媒體綠色通道已開啟",
      desc: "您的多元代表性與議題深度符合主流 ESG 文化認證標準。這能確保外部風投資金撥款順利，並使主流媒體在宣傳期給予正面推廣。"
    });
  } else {
    auditPoints.push({
      status: "warning",
      title: "⚠️ DEI 評級偏低：面臨評獎冷落與融資門檻風險",
      desc: "作品在多元包容性上較為保守，這可能導致評獎季（如 TGA、奧斯卡）或主流進步派影評人給予較低的主觀分。外部合規顧問也可能對此提出警告，影響後續 ESG 資金撥款。"
    });
  }

  if (controversy >= 70) {
    auditPoints.push({
      status: "error",
      title: "💥 輿論炎上警戒：核心受眾產生嚴重文化反彈",
      desc: "您的改編解構或人設修改幅度過大，導致核心老粉產生強烈的「背叛感」。社群論壇（如 Reddit）正在形成抵制浪潮，首週退款率與評分分歧風險極高。"
    });
  } else {
    auditPoints.push({
      status: "success",
      title: "🌿 輿情生態平穩：未踩中任何重大文化對立雷區",
      desc: "您的決策十分溫和，社群討論度平穩。玩家並未感覺到被強塞說教，輿論反彈率低。這有利於保障產品的長尾銷量，避免陷入無意義的口水戰。"
    });
  }

  if (canon >= 75) {
    auditPoints.push({
      status: "success",
      title: "📖 原作忠實度高：情懷基本盤穩固",
      desc: "您保留了原作的靈魂設定，這讓核心老粉極其受用。即使在其他地方有小瑕疵，基本盤依然會願意為您的誠意買單並發布正面口碑。"
    });
  } else if (canon <= 40) {
    auditPoints.push({
      status: "error",
      title: "❌ 原作解構過度：面臨「借殼上市」的魔改指控",
      desc: "對原作人設和世界觀的破壞過大，老粉在社交平台發起集體抗議。這使任何新加入的 DEI 元素都被放大解讀為「刻意政治正確」，直接摧毀了產品的自發傳播力。"
    });
  }

  return auditPoints;
};

function RadarChart({ work }: { work: Work }) {
  const size = 260;
  const center = size / 2;
  const maxVal = 100;
  const r = 75; // maximum radius

  const values = [
    work.politicalIndex.representation,    // 0: 多元代表
    work.politicalIndex.controversyRisk,   // 1: 輿論風險
    work.tags.commercialEntertainment,     // 2: 商業娛樂
    work.tags.canonFaithful,               // 3: 原作忠實
    work.politicalIndex.mediaFriendly,     // 4: 媒體友善
  ];

  const labels = ["多元代表", "輿論風險", "商業娛樂", "原作忠實", "媒體友善"];

  // Pentagram math
  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 / 5) * index - Math.PI / 2;
    const radius = (value / maxVal) * r;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Grid polygons
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPolygons = gridLevels.map((level) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const { x, y } = getCoordinates(i, level * 100);
      return `${x},${y}`;
    }).join(" ");
  });

  // Actual data polygon
  const dataPoints = values.map((val, i) => {
    const { x, y } = getCoordinates(i, val);
    return `${x},${y}`;
  }).join(" ");

  // Axes lines
  const axesLines = Array.from({ length: 5 }).map((_, i) => {
    const { x, y } = getCoordinates(i, 100);
    return { x1: center, y1: center, x2: x, y2: y };
  });

  // Label positions
  const labelPositions = Array.from({ length: 5 }).map((_, i) => {
    const { x, y } = getCoordinates(i, 116);
    let textAnchor = "middle";
    if (i === 1 || i === 2) textAnchor = "start";
    if (i === 3 || i === 4) textAnchor = "end";
    
    let dy = "0.33em";
    if (i === 0) dy = "-0.3em";
    if (i === 2 || i === 3) dy = "0.8em";

    return { x, y, textAnchor, dy, text: labels[i], val: values[i] };
  });

  return (
    <div className="flex flex-col items-center justify-center bg-black/40 rounded-lg border border-white/5 p-4 shadow-inner">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid Levels */}
        {gridPolygons.map((pts, idx) => (
          <polygon
            key={idx}
            points={pts}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Axes Lines */}
        {axesLines.map((line, idx) => (
          <line
            key={idx}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}

        {/* Grid Center Circle */}
        <circle cx={center} cy={center} r={3} fill="rgba(94, 234, 212, 0.4)" />

        {/* Data Area */}
        <polygon
          points={dataPoints}
          fill="rgba(94, 234, 212, 0.15)"
          stroke="rgba(94, 234, 212, 0.85)"
          strokeWidth="2"
          className="drop-shadow-[0_0_6px_rgba(94,234,212,0.4)]"
        />

        {/* Data Points */}
        {values.map((val, i) => {
          const { x, y } = getCoordinates(i, val);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={3.5}
              fill="#5eead4"
              stroke="#090a0f"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Labels */}
        {labelPositions.map((pos, i) => (
          <g key={i}>
            <text
              x={pos.x}
              y={pos.y}
              textAnchor={pos.textAnchor}
              dy={pos.dy}
              fill="#94a3b8"
              className="text-[10px] font-bold font-sans"
            >
              {pos.text}
            </text>
            <text
              x={pos.x}
              y={pos.y + 11}
              textAnchor={pos.textAnchor}
              dy={pos.dy}
              fill="#5eead4"
              className="text-[9px] font-mono font-bold"
            >
              {Math.round(pos.val)}
            </text>
          </g>
        ))}
      </svg>
    </div>
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

            <div className="space-y-5">
              <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
                <h2 className="text-lg font-semibold text-white">核心觀點</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  這個測驗要呈現的不是「DEI 一定加分或扣分」，而是 DEI 如何和娛樂性、角色功能、
                  改編忠實度、玩家自由度、媒體語境與社群期待交互作用。當代表性服務角色與體驗時，
                  它可能擴大共鳴；當它和原作期待或完成度衝突時，爭議就會成為評價主軸。
                </p>
              </section>

              {/* Executive Dashboard */}
              <section className="rounded-lg border border-teal-200/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-xl saturate-150 shadow-glow relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500 opacity-60" />
                
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">EXECUTIVE DASHBOARD</p>
                    <h2 className="mt-1 text-lg font-bold text-white">執行製作人控制面板</h2>
                  </div>
                  <span className="rounded-full bg-teal-200/10 border border-teal-200/20 px-2.5 py-0.5 text-xs text-teal-200 font-mono font-bold animate-pulse">
                    LIVE DATA
                  </span>
                </div>

                {/* 1. Title Badge Card */}
                {(() => {
                  const badge = getProducerTitle(work);
                  return (
                    <div className="mb-5 rounded-lg border border-white/10 bg-black/45 p-5 relative overflow-hidden shadow-inner group">
                      <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${badge.color} opacity-50 shrink-0`} />
                      <div className="pl-3">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className={`text-base font-black bg-gradient-to-r ${badge.color} bg-clip-text text-transparent`}>
                            {badge.title}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono font-semibold uppercase">{badge.sub}</span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-slate-300">
                          {badge.desc}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* 2. Radar Chart */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3 text-center">
                    📊 專案文化與商業屬性雷達 (Cultural Alignment Radar)
                  </p>
                  <RadarChart work={work} />
                </div>

                {/* 3. PR Diagnosis Audit List */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">
                    📋 公關診斷審計報告 (PR Diagnosis Audit)
                  </p>
                  {getPrDiagnosis(work).map((item, idx) => {
                    const icon = item.status === "success" ? "🌿" : item.status === "warning" ? "⚠️" : item.status === "error" ? "💥" : "ℹ️";
                    const borderColor = item.status === "success" ? "border-emerald-500/20 bg-emerald-950/10" : item.status === "warning" ? "border-amber-500/20 bg-amber-950/10" : item.status === "error" ? "border-rose-500/20 bg-rose-950/10" : "border-white/5 bg-white/[0.02]";
                    const titleColor = item.status === "success" ? "text-emerald-200" : item.status === "warning" ? "text-amber-200" : item.status === "error" ? "text-rose-200" : "text-white";
                    return (
                      <div key={idx} className={`rounded-lg border p-4 text-[11px] leading-5 ${borderColor}`}>
                        <div className={`font-bold flex items-center gap-1.5 mb-1 ${titleColor}`}>
                          <span>{icon}</span>
                          <span>{item.title}</span>
                        </div>
                        <p className="text-slate-300 pl-5">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
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
