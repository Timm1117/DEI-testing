import type { Work } from "@/data/works";

type TimelineTone = "good" | "mixed" | "bad";

type TimelineEvent = {
  date: string;
  title: string;
  summary: string;
  detail: string;
  tone: TimelineTone;
};

const toneStyle: Record<TimelineTone, string> = {
  good: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
  mixed: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  bad: "border-rose-300/35 bg-rose-300/10 text-rose-100",
};

const pointStyle: Record<TimelineTone, string> = {
  good: "bg-emerald-300",
  mixed: "bg-amber-300",
  bad: "bg-rose-300",
};

const toneLabel: Record<TimelineTone, string> = {
  good: "好評",
  mixed: "分歧",
  bad: "爭議",
};

const gameTimelines: Record<string, TimelineEvent[]> = {
  "last-of-us-part-ii": [
    {
      date: "2020-04",
      title: "劇情外流引爆預設立場",
      summary: "玩家在上市前就已經分裂，焦點集中在主要角色命運與敘事視角。",
      detail: "這讓很多人還沒玩到成品就先決定支持或抵制，上市後討論更容易變成陣營互打。",
      tone: "bad",
    },
    {
      date: "2020-06",
      title: "媒體極高評價，玩家回饋分裂",
      summary: "演出、技術、關卡細節獲得高度稱讚，但劇情與角色安排讓部分玩家強烈反彈。",
      detail: "它是典型的高製作品質、高情緒衝擊、高觀眾分裂作品。",
      tone: "mixed",
    },
    {
      date: "2025-04",
      title: "PC 版重新驗證評價",
      summary: "Steam 端仍能看到技術讚美與劇情反感並存，口碑沒有真正合流。",
      detail: "多年後討論點仍圍繞敘事選擇，而不是單純畫面或操作。",
      tone: "mixed",
    },
  ],
  "baldurs-gate-3": [
    {
      date: "2020-10",
      title: "搶先體驗累積信任",
      summary: "玩家提早參與系統、角色與劇情調整，讓正式版前已有核心支持者。",
      detail: "它的多元角色與自由選擇沒有被視為硬塞，而是被包進完整 RPG 系統。",
      tone: "good",
    },
    {
      date: "2023-08",
      title: "正式版口碑爆發",
      summary: "玩家普遍稱讚選擇自由、角色塑造、任務解法與劇情分支。",
      detail: "這是高 DEI 但低文化反彈的例子，原因是玩家覺得內容服務於玩法與角色。",
      tone: "good",
    },
    {
      date: "2023-12",
      title: "年度獎項擴大正面聲量",
      summary: "獎項與長尾討論讓它成為大型敘事 RPG 的正面樣板。",
      detail: "爭議沒有完全消失，但主流口碑明顯由作品完成度壓過文化戰討論。",
      tone: "good",
    },
  ],
  "cyberpunk-2077": [
    {
      date: "2020-12",
      title: "上市災情壓過題材討論",
      summary: "Bug、主機版效能與承諾落差成為主要負評來源。",
      detail: "它有階級、貧窮、身體改造與企業控制等議題，但口碑崩盤主要來自品質與信任問題。",
      tone: "bad",
    },
    {
      date: "2022-2023",
      title: "更新逐步修復玩家信任",
      summary: "多次更新讓玩家開始把討論重心拉回世界觀、任務與角色。",
      detail: "這類作品適合留在資料庫，因為它能區分文化議題與技術災難不是同一種爭議。",
      tone: "mixed",
    },
    {
      date: "2023-09",
      title: "2.0 與 Phantom Liberty 口碑回升",
      summary: "Steam 端出現明顯回溫，許多玩家把它視為修復成功案例。",
      detail: "它不是低爭議作品，而是從品質爭議轉成補救成功的口碑案例。",
      tone: "good",
    },
  ],
  "helldivers-2": [
    {
      date: "2024-02",
      title: "合作玩法快速爆紅",
      summary: "玩家稱讚 PvE 合作、混亂戰場、諷刺式民主敘事與低價位內容量。",
      detail: "好評主要來自玩法循環與社群共同目標，政治諷刺被視為遊戲風格的一部分。",
      tone: "good",
    },
    {
      date: "2024-05",
      title: "PSN 綁定要求引爆負評",
      summary: "帳號綁定與地區限制讓 Steam 評價短時間內被大量負評洗下來。",
      detail: "這是外部營運政策造成的口碑危機，不是 DEI 內容本身造成。",
      tone: "bad",
    },
    {
      date: "2024-05",
      title: "政策回撤後口碑止血",
      summary: "官方撤回要求後，玩家態度回穩，但信任傷口仍留下記憶點。",
      detail: "它提醒我們：爭議指標要分清楚文化內容、商業策略與平台政策。",
      tone: "mixed",
    },
  ],
  "hogwarts-legacy": [
    {
      date: "2020-09",
      title: "公布後即伴隨作者爭議",
      summary: "作品本身尚未上市，討論已被系列作者與社群立場拉高熱度。",
      detail: "玩家是否購買，常常不只是在評估遊戲品質，也是在表態。",
      tone: "bad",
    },
    {
      date: "2023-02",
      title: "上市後商業表現強勢",
      summary: "大量玩家稱讚霍格華茲場景、探索感與粉絲服務。",
      detail: "它是文化爭議很高、但商業接受度也很高的案例。",
      tone: "good",
    },
    {
      date: "2023-03",
      title: "中後期批評轉向空洞與重複",
      summary: "通關後玩家開始批評開放世界填充、後期重複與選擇影響不足。",
      detail: "後續負評更多是設計疲乏，而不是單純文化立場。",
      tone: "mixed",
    },
  ],
  starfield: [
    {
      date: "2023-06",
      title: "發售前期待值極高",
      summary: "Bethesda 太空 RPG 的招牌讓玩家期待龐大探索與自由度。",
      detail: "預期越高，後續若探索密度不足，落差也會越明顯。",
      tone: "good",
    },
    {
      date: "2023-09",
      title: "上市後評價快速分歧",
      summary: "有人喜歡太空船建造與任務線，也有人批評讀取、重複星球與節奏平淡。",
      detail: "這類作品的爭議核心是玩法密度與世界設計，不是 DEI。",
      tone: "mixed",
    },
    {
      date: "2024",
      title: "長尾口碑偏向失望",
      summary: "Steam 端常見批評集中在空洞探索、複製內容與劇情吸引力不足。",
      detail: "它適合當作低文化議題、中高口碑分裂的對照組。",
      tone: "bad",
    },
  ],
  dustborn: [
    {
      date: "2024-08",
      title: "題材先行吸引注意",
      summary: "作品主打身份、語言力量、政治壓迫與公路敘事，議題辨識度很高。",
      detail: "這讓它非常符合本測驗主題，但也讓玩家更嚴格檢查角色與劇本是否站得住。",
      tone: "mixed",
    },
    {
      date: "2024-09",
      title: "Steam 玩家負評集中",
      summary: "負評多指向角色不討喜、說教感、選擇感不足與節奏問題。",
      detail: "這是高議題置入、高文化壓力、低玩家接受度的典型案例。",
      tone: "bad",
    },
    {
      date: "2024-10",
      title: "少數玩家仍肯定概念",
      summary: "部分玩家認為它有獨特設定與敘事野心，但完成度不足讓好感難以擴散。",
      detail: "不是有 DEI 就必然失敗，而是議題需要被角色、玩法與節奏托住。",
      tone: "mixed",
    },
  ],
  "dragon-age-veilguard": [
    {
      date: "2024-10",
      title: "上市前期待與疑慮並存",
      summary: "老玩家期待系列回歸，也擔心戰鬥、隊伍控制與語氣變得太輕。",
      detail: "它的風險點不只是代表性，而是和系列原本的灰色道德與沉重語氣是否斷裂。",
      tone: "mixed",
    },
    {
      date: "2024-11",
      title: "玩家批評集中在寫作",
      summary: "Steam 負評常提到對白、角色、陣營道德與系列味道不足。",
      detail: "這是文化爭議與系列忠誠度疊在一起的案例。",
      tone: "bad",
    },
    {
      date: "2025",
      title: "口碑維持分裂",
      summary: "有人肯定畫面、動作戰鬥與易上手，也有人認為它不像 Dragon Age。",
      detail: "所以它的負評不應只被歸因於 DEI，而是改編方向、老粉預期與寫作品質一起作用。",
      tone: "mixed",
    },
  ],
  "black-myth-wukong": [
    {
      date: "2024-08",
      title: "上市後玩家好評快速集中",
      summary: "Steam 玩家多稱讚美術、戰鬥手感、Boss 與中國神話辨識度。",
      detail: "它是低 DEI、低文化議題、強美術與強動作導向的對照樣本。",
      tone: "good",
    },
    {
      date: "2024-09",
      title: "文化討論多在作品外部",
      summary: "爭議主要不是遊戲內議題，而是圍繞媒體、審查、社群立場與開發者言論。",
      detail: "因此資料庫中應把它放在低 DEI、低內容爭議，不應把外部輿論算成作品本體。",
      tone: "mixed",
    },
    {
      date: "2024-2025",
      title: "長尾口碑維持正面",
      summary: "玩家端對玩法與視覺的肯定大致延續，少數批評集中在關卡與敘事節奏。",
      detail: "它適合拿來比較：沒有明顯 DEI 也能進入量表，但應作為低端參照點。",
      tone: "good",
    },
  ],
  "assassins-creed-shadows": [
    {
      date: "2024-05",
      title: "角色公布後文化戰升溫",
      summary: "雙主角設定讓歷史再現、代表性與系列方向一起被放大檢視。",
      detail: "這是高知名 IP 加上高代表性選角，容易引發文化解讀的案例。",
      tone: "bad",
    },
    {
      date: "2025-03",
      title: "上市後評價轉向玩法與公式疲勞",
      summary: "玩家討論除了選角，也包含開放世界公式、劇情節奏與 Ubisoft 疲勞。",
      detail: "這類作品不能只看 DEI，還要看老 IP 的公式感是否已經讓玩家厭倦。",
      tone: "mixed",
    },
    {
      date: "2025",
      title: "後續 DLC 與營運再添負面聲量",
      summary: "若內容或存取問題出現，玩家會把技術與商業不滿一起算進總評。",
      detail: "口碑時間線能幫我們拆開：哪一段是文化爭議，哪一段是產品問題。",
      tone: "bad",
    },
  ],
  control: [
    {
      date: "2019-08",
      title: "媒體先看見 Remedy 的風格野心",
      summary: "首波好評集中在超自然辦公室美術、物理破壞、敘事氛圍與世界觀文件。",
      detail: "玩家和評論普遍認為它的場景、聲音、視覺與怪異文本很有辨識度，是 Remedy 風格被放大的作品。",
      tone: "good",
    },
    {
      date: "2020-08",
      title: "Ultimate Edition 登上 Steam 後口碑穩住",
      summary: "Steam 玩家多稱讚完整 DLC、視覺表現與敘事氛圍，常見短評把它稱為視覺傑作。",
      detail: "這裡的好評主要不是 DEI 或文化議題，而是藝術指導、世界觀、手感和超自然題材的完成度。",
      tone: "good",
    },
    {
      date: "2021-2024",
      title: "批評集中在地圖、戰鬥與節奏",
      summary: "負面回饋多半指向地圖難讀、戰鬥後期重複、槍戰手感或任務節奏不夠穩。",
      detail: "所以 Control 適合當作低文化爭議、偏作品完成度討論的樣本；玩家看衰的點主要是設計體驗，不是政治正確。",
      tone: "mixed",
    },
  ],
};

const buildFallbackTimeline = (work: Work): TimelineEvent[] => {
  const highControversy = work.politicalIndex.controversyRisk >= 70;
  const highReception = work.tags.audienceAcceptance >= 75;
  const highRepresentation = work.politicalIndex.representation >= 75;
  const highPlayerFreedom = work.tags.playerFreedom >= 75;
  const highStory = work.tags.storyDriven >= 75;
  const highMonetization = work.tags.monetizationPressure >= 65;
  const highStudioRisk = work.tags.studioRisk >= 65;
  const steamRating = work.ratings.find((rating) => rating.source === "steam")?.verdict;
  const mediaRating = work.ratings.find((rating) => rating.source === "metacritic")?.value;
  const launchPraise = highReception
    ? work.type === "game"
      ? `玩家端通常會先肯定核心玩法、類型爽感或內容量；Steam 口碑可參考「${steamRating ?? "玩家評價"}」。`
      : `影評與觀眾較容易肯定完成度、表演或類型娛樂性；Metacritic 可參考 ${mediaRating ?? "媒體評分"}。`
    : work.type === "game"
      ? `玩家回饋比較分散，常見焦點會落在玩法節奏、操作手感、內容量或最佳化。`
      : `影評與觀眾回饋比較分散，常見焦點會落在節奏、角色弧線、主題表達或改編取捨。`;
  const positioning = highRepresentation
    ? "代表性、身份書寫或社會議題會成為討論入口；支持者看見企圖，反感者會檢查是否太刻意。"
    : highPlayerFreedom
      ? "作品更容易被拿來討論自由度、系統深度與玩家能不能用自己的方式完成目標。"
      : highStory
        ? "作品更容易被拿來討論劇情節奏、角色動機、結局與文本是否站得住。"
        : "文化議題不是主要焦點，評價多半回到娛樂性、技術、玩法或類型完成度。";
  const complaint = highMonetization
    ? "主要詬病點容易落在商業模式、付費設計、營運節奏或玩家是否覺得被消費。"
    : highStudioRisk
      ? "主要詬病點容易落在技術狀態、完成度、延期承諾或上市時是否像半成品。"
      : highControversy
        ? "主要詬病點容易落在立場表達、改編方向、角色處理或粉絲是否覺得被背叛。"
        : "主要批評通常比較具體，例如節奏拖、系統重複、後期疲乏或類型公式感。";

  return [
    {
      date: `${work.year}`,
      title: highReception ? "上市初期口碑偏正面" : "上市初期口碑分歧",
      summary: launchPraise,
      detail: "這一段用本地評分與作品標籤整理口碑方向；之後若補到逐條原文，會自動替換成更具體的玩家或影評內容。",
      tone: highReception ? "good" : "mixed",
    },
    {
      date: `${work.year}`,
      title: highRepresentation ? "代表性與議題成為討論入口" : "評價核心回到作品本體",
      summary: positioning,
      detail: "這裡刻意把內容中的 DEI、改編、議題表達，和純粹技術或商業問題拆開看。",
      tone: highRepresentation ? "mixed" : highReception ? "good" : "mixed",
    },
    {
      date: `${work.year + 1}`,
      title: highControversy || highMonetization || highStudioRisk ? "長尾批評仍有明確靶點" : "長尾口碑相對穩定",
      summary: complaint,
      detail: "如果這部作品之後常被測出，最值得補的是這一段的具體事件與真實短評。",
      tone: highControversy || highMonetization || highStudioRisk ? "bad" : "good",
    },
  ];
};

export function ControversyTimeline({ work }: { work: Work }) {
  const timeline = gameTimelines[work.id] ?? buildFallbackTimeline(work);
  const title = work.type === "game" ? "遊戲口碑時間線" : "作品口碑時間線";

  return (
    <section className="rounded-lg border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-300">
          拆開玩家怎麼看好、怎麼看衰，以及哪些爭議是內容本身，哪些其實是技術、商業或營運問題。
        </p>
      </div>

      <div className="relative max-h-[34rem] space-y-4 overflow-y-auto overscroll-contain pl-5 pr-2 [scrollbar-color:rgba(94,234,212,0.55)_rgba(255,255,255,0.08)] [scrollbar-width:thin]">
        <div className="absolute bottom-2 left-[0.42rem] top-2 w-px bg-white/15" />
        {timeline.map((event) => (
          <div key={`${event.date}-${event.title}`} className="group relative">
            <span
              className={`absolute -left-5 top-1.5 h-3 w-3 cursor-help rounded-full border border-slate-950 ${pointStyle[event.tone]}`}
            />
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <div className="font-mono text-xs text-teal-200">{event.date}</div>
                  <h3 className="mt-1 text-sm font-semibold text-white">{event.title}</h3>
                </div>
                <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs ${toneStyle[event.tone]}`}>
                  {toneLabel[event.tone]}
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-300">{event.summary}</p>
            </div>
            <div className="pointer-events-none absolute left-3 top-8 z-40 max-w-sm rounded-lg border border-white/15 bg-slate-950/95 px-4 py-3 text-sm leading-6 text-slate-100 opacity-0 shadow-xl backdrop-blur transition group-hover:opacity-100">
              {event.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
