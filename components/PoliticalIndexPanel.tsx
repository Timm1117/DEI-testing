import type { PoliticalIndex } from "@/data/works";

type Item = {
  label: string;
  value: number;
  help: string;
};

type PressureLevel = {
  label: string;
  range: string;
  color: string;
  dot: string;
  text: string;
};

const getItems = (index: PoliticalIndex, isEn: boolean): Item[] => isEn ? [
  {
    label: "ESG/DEI Representation",
    value: index.representation,
    help: "Measures representation in gender, race, and identity. Audited by external consultants or investors.",
  },
  {
    label: "Lore Accuracy (Canon)",
    value: index.canonFaithful,
    help: "Whether classic settings are preserved. High fidelity holds core fans but might limit creative adaptation.",
  },
  {
    label: "Creative Liberty",
    value: index.adaptationFreedom,
    help: "Measures how much the devs broke the existing framework. High values tend to trigger core fan backlash.",
  },
  {
    label: "Agenda Dominance (Preachiness)",
    value: index.issueInsertion,
    help: "Weight of social or political issues. Excessive agenda can weaken entertainment and feel like political preaching.",
  },
  {
    label: "Discourse Tension (Backlash)",
    value: index.controversyRisk,
    help: "Probability of triggering culture wars. High values risk review bombing and pre-order boycotts.",
  },
  {
    label: "Critic Appeal",
    value: index.mediaFriendly,
    help: "How friendly mainstream media and critics are. High scores guarantee praise like 'brave' or 'groundbreaking'.",
  },
  {
    label: "Polarization Index",
    value: index.audienceSplit,
    help: "Split between critics and users. High scores mean intense review wars and community division.",
  },
] : [
  {
    label: "進步價值合規度 (ESG/DEI)",
    value: index.representation,
    help: "衡量作品在性別、族群、多元身份上的合規程度，通常由外部顧問公司或投資機構審核。",
  },
  {
    label: "老粉期待契合度 (Lore Accuracy)",
    value: index.canonFaithful,
    help: "作品是否保留經典設定。高契合度能保住核心粉絲，但可能限制創作者的改編自由。",
  },
  {
    label: "創作解構自由 (Creative Liberty)",
    value: index.adaptationFreedom,
    help: "衡量製作組是否打破既有框架。數值過高時容易引起核心群體的反彈與不滿。",
  },
  {
    label: "宣傳觀點前景化 (Agenda Dominance)",
    value: index.issueInsertion,
    help: "社會或政治議題在作品與宣傳中的比重。過高會削弱娛樂性，讓作品看起來像政令宣導。",
  },
  {
    label: "社群輿論反彈率 (Discourse Tension)",
    value: index.controversyRisk,
    help: "作品引發大規模文化戰爭或社群撕裂的機率。數值過高時容易引發抵制與洗負評。",
  },
  {
    label: "影評人光環加成 (Critic Appeal)",
    value: index.mediaFriendly,
    help: "主流媒體與影評人對作品的友好程度。高分代表容易在媒體上獲得「勇敢、突破」等高度讚譽。",
  },
  {
    label: "評價兩極化傾向 (Polarization Index)",
    value: index.audienceSplit,
    help: "媒體與大眾、或不同群體之間評價撕裂的程度。高分通常伴隨嚴重的玩家抵制或意見對立。",
  },
];

const getLevels = (isEn: boolean): PressureLevel[] => isEn ? [
  {
    label: "Very Low",
    range: "1.0-2.4",
    color: "bg-emerald-300",
    dot: "bg-emerald-300",
    text: "Minimal external interference: reviews focus mostly on entertainment, gameplay, or narrative execution.",
  },
  {
    label: "Low",
    range: "2.5-4.9",
    color: "bg-lime-300",
    dot: "bg-lime-300",
    text: "Low interference: DEI factors exist but are not the main battleground of reviews.",
  },
  {
    label: "Medium",
    range: "5.0-6.9",
    color: "bg-amber-300",
    dot: "bg-amber-300",
    text: "Moderate tension: issues and representation impact discussion, but high quality can override negativity.",
  },
  {
    label: "High",
    range: "7.0-8.4",
    color: "bg-orange-300",
    dot: "bg-orange-300",
    text: "High tension: agendas and casting choices heavily impact first impressions, with potential boycotts.",
  },
  {
    label: "Very High",
    range: "8.5-10",
    color: "bg-rose-300",
    dot: "bg-rose-300",
    text: "Extreme compliance pressure: completely framed in culture wars, with investor compliance highly opposing players.",
  },
] : [
  {
    label: "極低",
    range: "1.0-2.4",
    color: "bg-emerald-300",
    dot: "bg-emerald-300",
    text: "外部干涉極低：評價多半集中在娛樂性、技術、玩法或敘事完成度本身。",
  },
  {
    label: "低",
    range: "2.5-4.9",
    color: "bg-lime-300",
    dot: "bg-lime-300",
    text: "外部干涉低：政治正確因素存在，但通常不是評價成敗的主戰場。",
  },
  {
    label: "中",
    range: "5.0-6.9",
    color: "bg-amber-300",
    dot: "bg-amber-300",
    text: "輿論撕裂中：議題、改編與代表性會影響討論，但優秀的完成度仍能扭轉玩家觀感。",
  },
  {
    label: "高",
    range: "7.0-8.4",
    color: "bg-orange-300",
    dot: "bg-orange-300",
    text: "輿論撕裂高：宣傳、選角與原作改動會顯著影響第一印象，面臨潛在的玩家抵制。",
  },
  {
    label: "極高",
    range: "8.5-10",
    color: "bg-rose-300",
    dot: "bg-rose-300",
    text: "外部合規極高：作品被深度放進文化戰框架，投資人的合規要求與玩家的抗拒心態高度對立。",
  },
];

const getLevel = (score: number, levels: PressureLevel[]) => {
  if (score >= 85) return levels[4];
  if (score >= 70) return levels[3];
  if (score >= 50) return levels[2];
  if (score >= 25) return levels[1];
  return levels[0];
};

const formatScore = (value: number) => (value / 10).toFixed(1);

export function PoliticalIndexPanel({ index, lang = "zh" }: { index: PoliticalIndex; lang?: "zh" | "en" }) {
  const isEn = lang === "en";
  const levels = getLevels(isEn);
  const items = getItems(index, isEn);
  
  const pressureScore = Math.round(
    (index.representation +
      index.adaptationFreedom +
      index.issueInsertion +
      index.controversyRisk +
      index.audienceSplit +
      (100 - index.canonFaithful)) /
      6,
  );
  const pressureLevel = getLevel(pressureScore, levels);
  const barColor = (value: number) => getLevel(value, levels).color;

  return (
    <section className="rounded-lg border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 shadow-glow backdrop-blur-xl saturate-150">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {isEn ? "Value Alignment & Discourse Indicators" : "文化價值與輿論影響指標"}
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            {isEn ? "Mock assessment of compliance pressure & market sentiment, scaled 1-10." : "依 mock data 模擬合規壓力與市場輿論，換算為 1-10 分。"}
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          Industry Impact
        </span>
      </div>

      <div className="mb-6 rounded-lg border border-white/10 bg-black/25 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          {isEn ? "Compliance & Discourse Tension" : "合規與輿論張力分級"}
        </p>
        <div className="mt-3 flex items-end gap-3">
          <span className={`text-6xl font-black leading-none text-transparent bg-clip-text ${pressureLevel.color.replace("bg-", "bg-")}`}>
            {pressureLevel.label}
          </span>
          <span className="pb-2 font-mono text-lg text-slate-200">{formatScore(pressureScore)} / 10</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-300">{pressureLevel.text}</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="group relative">
            <div className="mb-2 flex items-center justify-between gap-3 text-sm">
              <span className="cursor-help text-slate-200 underline decoration-white/20 underline-offset-4">
                {item.label}
              </span>
              <span className="font-mono text-slate-100">{formatScore(item.value)} / 10</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${barColor(item.value)}`}
                style={{ width: `${item.value}%` }}
              />
            </div>
            <div className="pointer-events-none absolute left-0 top-8 z-40 min-w-[16rem] max-w-sm rounded-lg border border-white/15 bg-slate-950/95 px-4 py-3 text-sm leading-6 text-slate-100 opacity-0 shadow-xl backdrop-blur transition group-hover:opacity-100">
              {item.help}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
        <div className="mb-3 flex flex-wrap gap-3 text-xs text-slate-300">
          {levels.map((level) => (
            <span key={level.label} className="inline-flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${level.dot}`} />
              {level.label} {level.range}
            </span>
          ))}
        </div>
        <p className="text-sm leading-6 text-slate-300">
          {isEn
            ? "Colors indicate the tension level of community backlash triggered by external compliance, not product quality. Greener means less culture war interference, while redder means the project is heavily stuck between compliance goals and core player boycotts."
            : "顏色代表外部合規引發社群反彈的張力程度，不代表作品好壞。越綠代表越不受文化戰干擾，越紅代表越容易陷入合規與核心玩家抵制的拉扯局面。"}
        </p>
      </div>
    </section>
  );
}
