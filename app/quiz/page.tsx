"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Clapperboard, Crosshair, Gamepad2, ShieldAlert } from "lucide-react";
import { questions } from "@/data/questions";
import type { WorkType, TagKey } from "@/data/works";
import { applyEffects, createEmptyProfile, normalizeProfile, type UserProfile } from "@/lib/matchWork";

const clamp = (value: number) => Math.max(0, Math.min(100, value));

type MockAlert = {
  source: "Slack" | "Media" | "Forum";
  senderOrPublication: string;
  content: string;
};

type SuddenEvent = {
  id: string;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    effects: Partial<Record<TagKey, number>>;
  }[];
};

const questionPhases: Record<string, "pre" | "prod" | "launch"> = {
  genre: "pre",
  adaptation: "pre",
  canon: "pre",
  budget: "pre",
  "film-casting": "pre",
  "game-character": "pre",
  "game-business": "pre",
  "film-franchise": "pre",
  
  representation: "prod",
  "gender-power": "prod",
  issues: "prod",
  entertainment: "prod",
  risk: "prod",
  "film-tone": "prod",
  "game-freedom": "prod",
  "game-story": "prod",
  "film-script-focus": "prod",
  "film-visual": "prod",
  "game-difficulty": "prod",
  
  press: "launch",
  audience: "launch",
  ending: "launch",
  marketing: "launch",
  "film-awards": "launch",
  "game-community": "launch",
  "film-distribution": "launch",
  "game-liveops": "launch",
};

const suddenEvents: Record<number, SuddenEvent> = {
  3: {
    id: "leak",
    title: "🚨 突發危機：開發版本美術遭內鬼外洩！",
    subtitle: "早期主角人設草圖（膚色與穿著修改）被發佈到網路論壇與 X。核心粉絲強烈質疑「政治正確毀原作」，社群輿論急劇升溫。公關團隊急需您的指示以發布回應：",
    options: [
      {
        label: "硬氣回應：堅守多元包容的創作自由",
        description: "「這是多元社會的創作自由，不接受傳統審美，不喜歡請別買。」",
        effects: { representation: 12, controversyRisk: 22, audienceAcceptance: -12 }
      },
      {
        label: "退讓道歉：發布公關聲明安撫核心粉絲",
        description: "「這只是早期概念草稿，我們非常尊重原作設定，會重新微調設計。」",
        effects: { representation: -15, controversyRisk: -15, audienceAcceptance: 10, studioRisk: 15 }
      },
      {
        label: "冷處理：關閉推文評論區並保持沉默",
        description: "冷處理是最常見的公關手段，雖然無法平息怒火，但至少不會給對立方增添口水彈藥。",
        effects: { controversyRisk: 5, studioRisk: 5 }
      }
    ]
  },
  7: {
    id: "consultant",
    title: "🚨 突發危機：顧問機構的強勢干預！",
    subtitle: "合作的外部 DEI 審查機構發出最後通牒：要求將劇中某位主要配角修改為非二元性別，否則將無法通過下一輪的 ESG 文化合規審核。一旦失去審核認證，外部風投基金的第二期融資將會被撤回。您的決定是：",
    options: [
      {
        label: "全面妥協：向資金妥協，全盤接受改動",
        description: "「劇本改一下就行，資金安全與後續的媒體評分最重要。」",
        effects: { representation: 25, controversyRisk: 20, audienceAcceptance: -15, studioRisk: -10 }
      },
      {
        label: "堅持反對：拒絕外行指導內行，保留原劇本",
        description: "「我們做的是作品，不是政令宣導手冊。拒絕向投資方的文化勒索低頭！」",
        effects: { representation: -25, controversyRisk: -10, audienceAcceptance: 15, studioRisk: 15 }
      }
    ]
  },
  10: {
    id: "journalist",
    title: "🚨 突發危機：主流媒體記者的訪談陷阱！",
    subtitle: "知名媒體主編發來私信提問，言詞中隱藏政治審查陷阱：「對於網路上反對您遊戲新設計的聲音，您是否認為那是極右翼有害玩家無理取鬧的文化反彈？」您的回答將會被作為頭條發表：",
    options: [
      {
        label: "進步正確表態：附和媒體，宣傳多元包容",
        description: "「是的，我們正在打破陳舊框架，為更包容的現代觀眾服務。」",
        effects: { mediaFriendly: 20, controversyRisk: 15, audienceAcceptance: -12 }
      },
      {
        label: "玩家立場表態：維護玩家，強調產品本體",
        description: "「我們專注於為陪伴我們多年的核心玩家服務，而非為任何政治立場服務。」",
        effects: { mediaFriendly: -18, controversyRisk: -10, audienceAcceptance: 15 }
      }
    ]
  }
};

const getAdviserOpinion = (questionId: string, isEvent: boolean) => {
  if (isEvent) {
    const eventOpinions: Record<string, { consultant: string; dev: string }> = {
      leak: {
        consultant: "「趁現在站穩進步多元的立場！這能讓主流媒體和影評人瘋狂為我們的『勇敢發聲』點讚，順便拿幾個倡議獎項！」",
        dev: "「老闆，如果直接跟玩家開戰，預購訂單會直接雪崩的！現在道歉退讓、把設定改回去還來得及！」"
      },
      consultant: {
        consultant: "「這是融資死線！如果不按照顧問的意思改，我們本季度的 ESG 評級會直接跌到 D，資金鏈會當場斷裂！」",
        dev: "「如果把鐵血配角強行改成說教角色，老粉會覺得我們背叛了原作。沒有了銷量，融資再多也是等著倒閉！」"
      },
      journalist: {
        consultant: "「記者是我們的盟友。只要順著記者的話說，我們就能在 IGN 等主流媒體上拿到好幾天的免費黃金宣傳位！」",
        dev: "「這是挖坑給我們跳！只要我們說錯一個字，就是跟幾十萬玩家公開宣戰，發售當天會直接被洗成壓倒性負評的！」"
      }
    };
    return eventOpinions[questionId] ?? {
      consultant: "「必須配合外部合規標準，這是確保專案在主流業界生存的唯一方式。」",
      dev: "「不要亂改，保持產品硬實力，玩家只在乎作品到底好不好吃、好不好玩。」"
    };
  }

  const opinions: Record<string, { consultant: string; dev: string }> = {
    genre: {
      consultant: "「建議選擇文藝與議題導向，這有利於建立高雅的作品形象，並吸引主流媒體寫專題報導。」",
      dev: "「老闆，玩家買票是來爽的，不是來上公民課的！節奏和視覺場面拉滿，先做爽片才是最保險的！」"
    },
    adaptation: {
      consultant: "「選擇知名 IP 並融入現代多元文化重新解構，這是目前擴大現代大眾影響力的最快方式。」",
      dev: "「碰知名 IP 簡直是在雷區跳舞。改編自由度太高，原作粉會直接在留言區跟我們玩命的！」"
    },
    canon: {
      consultant: "「經典原作的人設多半已經過時，我們必須大膽現代化改編，使其符合現代進步價值標準。」",
      dev: "「原作是老粉的聖經！亂改人設會被視為『毀童年』，口碑分分鐘雪崩給您看。」"
    },
    representation: {
      consultant: "「我們必須把多元代表性擺在宣傳最前面，這是拿到投資基金 ESG 評級與媒體支持的關鍵。」",
      dev: "「宣傳可以，但不要強行貼標籤。如果角色塑造得像工具人，玩家一眼就看得出來並產生反感。」"
    },
    "gender-power": {
      consultant: "「徹底翻轉性別權力結構，讓女性和邊緣族群主導故事，這在現代業界是大勢所趨。」",
      dev: "「角色有血有肉就行，刻意矮化或工具化某些經典角色形象，論壇一定會瞬間炸鍋的。」"
    },
    issues: {
      consultant: "「作品應該發揮社會責任，將環保、平等、身份認同等議題置入主角的主線衝突中。」",
      dev: "「只要說教味太濃，玩家就會覺得像是在被上課，體驗會大打折扣，直接退款退訂。」"
    },
    entertainment: {
      consultant: "「娛樂性可以適度妥協。深刻的主題思想與作者自我表達，才能在業界獲得長青的口碑。」",
      dev: "「老闆！好玩才是第一順位啊！如果核心循環無聊，根本沒人會撐到我們想表達的深度！」"
    },
    risk: {
      consultant: "「爭議也是流量。只要能引發文化戰對立，作品就能獲得巨量曝光，吸引大眾眼球。」",
      dev: "「這流量是有毒的！一旦被貼上『說教/政治正確』的標籤，核心玩家會集體抵制，得不償失。」"
    },
    press: {
      consultant: "「必須主動向主流媒體示好，提供他們喜歡的政治宣傳詞，這能保證我們的首發評分十分好看。」",
      dev: "「媒體分高有什麼用？如果玩家玩完覺得被騙，兩者評分撕裂，我們反而會成為玩家的笑柄。」"
    },
    audience: {
      consultant: "「核心粉絲保守的聲音不用理會，現代主流大眾 and 年輕一代的藍海才是我們應該開拓的市場。」",
      dev: "「核心老粉才是真金白銀支持我們幾十年的基本盤！得罪核心玩家，我們連首週銷量都沒有！」"
    },
    ending: {
      consultant: "「結局應該留有現實的殘酷與反思，揭示系統性的偏見，這才能讓作品昇華。」",
      dev: "「玩家經歷了幾十個小時，最後只得到滿嘴玻璃渣？給個爽快圓滿的收尾，大家開心回家吧！」"
    },
    marketing: {
      consultant: "「宣傳應該著重宣揚我們在創作多樣性、突破傳統以及社會責任上的業界先鋒價值。」",
      dev: "「求求您宣傳點實打實的畫質和好玩的部分吧，一味吹噓價值，論壇上的玩家都在翻白眼了！」"
    },
    budget: {
      consultant: "「大預算才能支撐起文化大事件的宣傳與龐大的開發團隊，這樣更有助於獲得國際大獎。」",
      dev: "「預算開太大，我們就必須背負極高的商業回報壓力，到時候在合規與銷量之間根本沒有退路！」"
    },
    "film-casting": {
      consultant: "「必須大膽起用少數族裔主角，打破傳統偏見，這是拿獎和媒體友善的保證。」",
      dev: "「如果原作背景不合適卻強行塞入現代人種比例，老粉血壓真的會拉滿。」"
    },
    "game-character": {
      consultant: "「主角應該擺脫傳統審美，採用更有包容性、平實的造型，避免物化女性或迎合男性凝視。」",
      dev: "「玩家在遊戲裡扮演英雄，是想獲得代入感和視覺享受的。把主角改得平庸甚至不好看，第一步就勸退玩家了。」"
    }
  };

  return opinions[questionId] ?? {
    consultant: "「建議在決策中引入多元、包容與進步的當代敘事結構，這能迎合主流評獎標準。」",
    dev: "「只要故事寫得紮實、設計好玩，比什麼包裝都有用，別搞花架子了。」"
  };
};

const axisFromProfile = (profile: UserProfile | null) => {
  if (!profile) return { x: 50, y: 50 };

  const { tags } = normalizeProfile(profile);

  return {
    x: clamp(
      tags.representation * 0.38 +
        tags.genderPowerShift * 0.24 +
        tags.issueInsertion * 0.2 +
        tags.mediaFriendly * 0.1 +
        (100 - tags.canonFaithful) * 0.08,
    ),
    y: clamp(tags.controversyRisk * 0.58 + tags.issueInsertion * 0.27 + (100 - tags.canonFaithful) * 0.15),
  };
};

const calculateCriticScore = (profile: UserProfile | null) => {
  if (!profile) return 70;
  const { tags } = normalizeProfile(profile);
  const score =
    65 +
    tags.representation * 0.12 +
    tags.issueInsertion * 0.08 +
    tags.mediaFriendly * 0.12 +
    tags.genrePrestige * 0.08 -
    tags.studioRisk * 0.08;
  return Math.max(45, Math.min(97, Math.round(score)));
};

const calculateUserScore = (profile: UserProfile | null, selectedType: WorkType) => {
  if (!profile) return selectedType === "film" ? 7.2 : 75;
  const { tags } = normalizeProfile(profile);

  if (selectedType === "film") {
    const score =
      7.0 +
      tags.commercialEntertainment * 0.02 +
      tags.canonFaithful * 0.015 -
      tags.controversyRisk * 0.025 -
      tags.issueInsertion * 0.015 -
      tags.studioRisk * 0.01;
    return Math.max(1.5, Math.min(9.5, Math.round(score * 10) / 10));
  } else {
    const score =
      72 +
      tags.commercialEntertainment * 0.18 +
      tags.canonFaithful * 0.12 +
      tags.playerFreedom * 0.1 -
      tags.controversyRisk * 0.28 -
      tags.issueInsertion * 0.18 -
      tags.monetizationPressure * 0.15 -
      tags.studioRisk * 0.12;
    return Math.max(12, Math.min(98, Math.round(score)));
  }
};

function getDetailedContent(alert: MockAlert) {
  const publication = alert.senderOrPublication;
  const content = alert.content;
  
  if (alert.source === "Media") {
    const isMic = /interview|press|podcast|radio/i.test(publication);
    const mediaName = publication.split(" ")[0];
    
    let headline = `${publication} — 深度專題報導`;
    let paragraphs = [
      "【本報訊】針對製作團隊近日公布的關鍵決策，本報進行了深入追蹤與社群輿情調查。隨著大眾市場對於作品內容的要求日益嚴苛，每一次的設計變更或選角調整，都在網路上掀起軒然大波。",
      "根據業內資深分析師指出，現代受眾在尋求感官刺激與深度共鳴之間存在著顯著的分歧。支持派認為大膽的創新有助於推動媒介的邊界，而反對派則警告過度偏離經典可能導致核心群體的流失。",
      "本報將持續鎖定後續進度。不論這項決策最終引領作品走向何方，它無疑已經成為今年最具討論度與爭議性的行業焦點之一。"
    ];

    if (/多元|代表性|人設|種族/.test(content)) {
      headline = "【專題】進步多元與核心情懷的對立：新主角設定引發的產業思考";
      paragraphs = [
        "【本報訊】近日隨著主角造型與設定的公開，有關多元代表性（DEI）的議題再度成為社群討論的風暴中心。主流評審與部分進步派媒體對此表示高度支持，認為這是作品走向現代化、展現包容力的重要一步。",
        "然而，核心玩家社群的反應卻十分兩極。在論壇上，大量質疑「強行修改人設」與「為迎合評級而妥協」的討論串迅速被置頂，甚至發起了抵制預購的活動。分析人士指出，如何在投資人要求的 ESG 標準與核心玩家的滿意度之間取得平衡，已成為現代工作室的必修課。",
        "「這不再只是娛樂產品，它已經成為一場文化價值觀的縮影。」一位不願透露姓名的發行商主管向記者透露。"
      ];
    } else if (/爽度|視覺|奇觀|場面/.test(content)) {
      headline = "【熱點】場面拉滿！視覺特效與大螢幕奇觀引發的感官狂歡";
      paragraphs = [
        "【本報評測】令人窒息的畫面細節與頂級的音效表現，這部作品在釋出預告片的第一秒就牢牢抓住了所有人的眼球。毫無疑問，製作團隊將極大比例的預算傾注在了奇觀的塑造上。",
        "「我們希望給觀眾一個無法拒絕的感官盛宴，」製作組長在接受本報採訪時表示。影評人也紛紛給出高分，認為這代表了當前行業的最高技術水準。但與此同時，部分深度影迷也提出質疑：在華麗的外殼之下，劇本的厚度是否能撐得起這份視覺的重量？",
        "目前市場的預售數據非常樂觀，視覺派受眾的狂熱將本作的期待度推上了全新高峰。"
      ];
    } else if (/說教|教育|台詞/.test(content)) {
      headline = "【評論】角色靈魂還是硬塞標籤？談台詞「說教感」對沈浸體驗的雙刃效應";
      paragraphs = [
        "【記者專題】隨著第一批測試反饋流出，部分體驗者對於作品中直白且高頻率出現的社會議題台詞表示了憂慮。他們認為，過於硬核的說教感會打破故事的沉浸感，讓作品更像是政治宣導，而非互動娛樂。",
        "但也有議題研究學者指出，藝術創作本就肩負著反映社會現實與啟發思考的責任。將身分認同、環境保護等現代困境寫入角色動機，能賦予作品更長久的生命力與社會學價值。",
        "如何在「說教宣傳」與「自然融合」之間找到平衡點，將是影響本作發售後最終評分的重要分水嶺。"
      ];
    }

    return { headline, paragraphs };
  }

  if (alert.source === "Forum") {
    const title = `這一次的決策大家怎麼看？老實說我有點被破防了...`;
    const comments = [
      {
        user: "u/GamerAlpha_99",
        score: "2.4k",
        time: "5 hr. ago",
        text: `老實說，這決策真的讓我對這家工作室刮目相看。${content.replace(/「|」/g, "")} 至少他們聽到了我們的聲音。`,
      },
      {
        user: "u/Lvl100Paladin",
        score: "1.8k",
        time: "4 hr. ago",
        text: "樓上＋1！原本超擔心會被強塞奇怪的價值觀，現在看來原作的靈魂還是保住了，買爆支持！",
      },
      {
        user: "u/WokeSlayer_PRO",
        score: "850",
        time: "3 hr. ago",
        text: "支持！不要再讓那些外部顧問來指手畫腳了，遊戲好玩、電影好看才是硬道理，希望發售時不要翻車。",
      },
      {
        user: "u/ProgressiveGamer",
        score: "-240",
        time: "2 hr. ago",
        text: "只有我覺得這很倒退嗎？保留那些過時的設定，不願意做出一點現代化的包容性修改，簡直是向保守輿論低頭。",
      },
      {
        user: "u/MemeLord_X",
        score: "125",
        time: "1 hr. ago",
        text: "不管怎樣，我已經準備好爆米花看首發當天的 Metacritic 評分大戰了，感覺留言區會直接血流成河 🍿",
      }
    ];

    if (/魔改|面目全非|閹割|背叛|吐槽/.test(content)) {
      return {
        title: "「別買了！這根本是借殼上市的魔改垃圾，原作粉集體破防中」",
        comments: [
          {
            user: "u/CanonIsHoly",
            score: "5.2k",
            time: "6 hr. ago",
            text: "我真的氣到發抖。老粉等了這麼多年，結果給我們看這個？核心人設全部被改掉，編劇到底懂不懂原作？",
          },
          {
            user: "u/GoWokeGoBroke_2026",
            score: "3.1k",
            time: "5 hr. ago",
            text: "經典的 Go Woke, Go Broke。又一個被 DEI 毀掉的經典 IP。不退款對不起我自己的錢包。",
          },
          {
            user: "u/OptimistPrime",
            score: "510",
            time: "3 hr. ago",
            text: "大家冷靜點，也許這只是預告片剪輯的問題？等實際出來看故事邏輯怎麼樣再噴也不遲吧？",
          },
          {
            user: "u/AngryGamer_99",
            score: "1.2k",
            time: "2 hr. ago",
            text: "樓上還在洗？設定圖都洩漏了，主角連性別氣質都變了，這還有救？洗地的可以省省力氣了。",
          }
        ]
      };
    }

    return { title, comments };
  }

  return {
    channel: "#marketing-pr-channel",
    messages: [
      {
        user: "公關總監 (Director)",
        avatar: "PR",
        time: "11:34 AM",
        text: `團隊注意，最新決策影響評估已出來：${content.replace(/「|」/g, "")}`,
      },
      {
        user: "社群經理 (Community)",
        avatar: "CM",
        time: "11:36 AM",
        text: "目前 Reddit 和 X 平台上的討論度已經衝上來了，核心老粉的反應有些激烈，我們的公關稿要不要先準備？",
      },
      {
        user: "主企劃 (Lead Designer)",
        avatar: "LD",
        time: "11:39 AM",
        text: "設計組這邊認為既然路子定下了就不要隨便縮，現在如果又道歉退讓，只會被兩邊同時唾棄，堅持品質才是正解。",
      },
      {
        user: "專案經理 (Producer)",
        avatar: "PM",
        time: "11:42 AM",
        text: "同意。預算和時程都不允許我們再做大改動了，研發組長要注意成員心理壓力，公關部隨時監控輿情動態。",
      }
    ]
  };
}

function generateAlert(effects: Partial<Record<TagKey, number>>, selectedType: WorkType): MockAlert {
  const keys = Object.keys(effects) as TagKey[];
  if (keys.length === 0) {
    return {
      source: "Slack",
      senderOrPublication: "#pr-monitoring",
      content: "「決策已存檔。目前市場反應平靜，公關處於監控狀態。」"
    };
  }

  let maxKey = keys[0];
  let maxValue = effects[maxKey] ?? 0;
  for (const key of keys) {
    const val = effects[key] ?? 0;
    if (Math.abs(val) > Math.abs(maxValue)) {
      maxKey = key;
      maxValue = val;
    }
  }

  if (maxKey === "representation") {
    if (maxValue > 0) {
      return Math.random() > 0.5
        ? {
            source: "Media",
            senderOrPublication: "IGN NEWS",
            content: "「大膽的跨步！新作品承諾為多元性與代表性帶來前所未有的深度呈現，業界同聲讚譽。」"
          }
        : {
            source: "Slack",
            senderOrPublication: "社群經理 @Slack",
            content: "「Reddit 上已經有老粉發帖抗議我們『強行修改主角種族人設』，輿情警戒度上升。」"
          };
    } else {
      return {
        source: "Forum",
        senderOrPublication: "r/gaming",
        content: "「良心之作！這次沒有強加政治正確設定，主角人設經典扎實，預售準備支持！」"
      };
    }
  }

  if (maxKey === "canonFaithful") {
    if (maxValue > 0) {
      return {
        source: "Forum",
        senderOrPublication: "Reddit 原作粉板",
        content: "「看過概念設定了！原汁原味，配樂和核心人設完全保留，核心粉絲群一致大好評！」"
      };
    } else {
      return {
        source: "Forum",
        senderOrPublication: "貼吧老粉吐槽區",
        content: "「這改得面目全非了。除了保留名字借殼上市外，原作設定和精神全被閹割，這是對老粉的背叛！」"
      };
    }
  }

  if (maxKey === "issueInsertion") {
    if (maxValue > 0) {
      return Math.random() > 0.5
        ? {
            source: "Media",
            senderOrPublication: "KOTAKU COLUMN",
            content: "「這不只是一部作品，更是一面照向當代社會邊緣族群創傷的明鏡。其議題表達具高度社會意義。」"
          }
        : {
            source: "Slack",
            senderOrPublication: "公關總監 @Slack",
            content: "「行銷回報指出，大眾評測反饋台詞的『教育意味』有些過重，可能勸退注重放鬆娛樂的輕度玩家。」"
          };
    } else {
      return {
        source: "Forum",
        senderOrPublication: "Steam 評測區預測",
        content: "「終於沒有強塞說教台詞了。能安安靜靜在作品裡沉浸一個週末，這才是我們要的體驗。」"
      };
    }
  }

  if (maxKey === "commercialEntertainment") {
    if (maxValue > 0) {
      return {
        source: "Media",
        senderOrPublication: "METACRITIC PREVIEW",
        content: "「爽度拉滿！頂級的視聽饗宴與流暢的操作手感，無疑是今年最穩健的商業娛樂大作。」"
      };
    } else {
      return {
        source: "Media",
        senderOrPublication: "INDIEWIRE REVIEW",
        content: "「作品刻意避開爆米花公式，著重深沉的主題表達與角色刻畫，但在商業化考驗上面臨挑戰。」"
      };
    }
  }

  if (maxKey === "controversyRisk") {
    if (maxValue > 0) {
      return {
        source: "Slack",
        senderOrPublication: "公關經理 @Slack",
        content: "「警告：論壇上因為人設政治正確已經吵成一團，『Go Woke Go Broke』標籤開始洗版，面臨被刷負評風險。」"
      };
    } else {
      return {
        source: "Slack",
        senderOrPublication: "行銷組長 @Slack",
        content: "「目前的決策非常安全，沒有踩到任何文化戰雷區，各方討論平穩，預期口碑回報良好。」"
      };
    }
  }

  if (maxKey === "monetizationPressure") {
    if (maxValue > 0) {
      return {
        source: "Forum",
        senderOrPublication: "巴哈姆特哈啦區",
        content: "「還沒發售就狂塞商城課金要素和賽季通行證？吃相太難看了吧，又一款半成品騙錢作誕生！」"
      };
    } else {
      return {
        source: "Forum",
        senderOrPublication: "r/Steam",
        content: "「買斷制，無微交易！這年頭還有不逼氪、不搞商城打卡的完整大作，必須買爆支持！」"
      };
    }
  }

  if (maxKey === "playerFreedom") {
    if (maxValue > 0) {
      return {
        source: "Forum",
        senderOrPublication: "r/RPG_Gamers",
        content: "「開發團隊承諾極高的主動選擇自由度，可以用自己的路線探索世界，這才是RPG的精髓！」"
      };
    } else {
      return {
        source: "Slack",
        senderOrPublication: "主企劃 @Slack",
        content: "「為保證劇本推進，我們限制了多線選擇。社群內有部分偏好高自由度的玩家對此表示遺憾。」"
      };
    }
  }

  if (maxKey === "genreSpectacle") {
    if (maxValue > 0) {
      return {
        source: "Media",
        senderOrPublication: "IGN NEWS",
        content: "「爽度突破天際！令人屏息的視覺特效與史詩級大場面，本作毫無疑問是年度娛樂盛宴。」"
      };
    } else {
      return {
        source: "Media",
        senderOrPublication: "VARIETY REPORT",
        content: "「缺乏視覺奇觀，本作在場面調度上顯得保守，難以吸引大眾市場注意。」"
      };
    }
  }

  if (maxKey === "genrePrestige") {
    if (maxValue > 0) {
      return {
        source: "Media",
        senderOrPublication: "INDIEWIRE REVIEW",
        content: "「深邃的人性探索與極致的文藝美學，本作在藝術層面上達到了少見的高峰。」"
      };
    } else {
      return {
        source: "Media",
        senderOrPublication: "KOTAKU COLUMN",
        content: "「過於公式化與商業妥協，本作在議題深度與藝術探討上顯得有些心口不一。」"
      };
    }
  }

  if (maxKey === "adaptation") {
    if (maxValue > 0) {
      return {
        source: "Forum",
        senderOrPublication: "Reddit 原作改編板",
        content: "「改編消息引發熱烈討論！原作忠實派與現代改編派在討論區已經吵翻了。」"
      };
    } else {
      return {
        source: "Forum",
        senderOrPublication: "Steam 原創板",
        content: "「全新原創 IP 雖然沒有情懷包袱，但前期知名度偏低，宣傳工作將是一大挑戰。」"
      };
    }
  }

  if (maxKey === "mediaFriendly") {
    if (maxValue > 0) {
      return {
        source: "Media",
        senderOrPublication: "KOTAKU COLUMN",
        content: "「業界的良心！本作大膽擁抱多元價值，主流媒體齊聲稱讚其對當代社會的深刻關懷。」"
      };
    } else {
      return {
        source: "Media",
        senderOrPublication: "IGN NEWS",
        content: "「立場過於保守？部分影評人指出作品缺乏當代多元視角，對其老套的價值觀感到失望。」"
      };
    }
  }

  if (maxKey === "audienceAcceptance") {
    if (maxValue > 0) {
      return {
        source: "Forum",
        senderOrPublication: "r/gaming",
        content: "「好評如潮！首波測試反饋極佳，核心與輕度玩家一致讚賞，預購量正在快速攀升。」"
      };
    } else {
      return {
        source: "Forum",
        senderOrPublication: "貼吧老粉吐槽區",
        content: "「雷作警告！玩家社群痛批遊戲內容敷衍，大量要求退款的呼聲正在蔓延。」"
      };
    }
  }

  if (maxKey === "studioRisk") {
    if (maxValue > 0) {
      return {
        source: "Slack",
        senderOrPublication: "主企劃 @Slack",
        content: "「警告：頻繁的設計變更與加班壓力已讓團隊疲憊不堪，必須注意交付品質。」"
      };
    } else {
      return {
        source: "Slack",
        senderOrPublication: "專案主管 @Slack",
        content: "「好消息：開發進度完全在掌控之中，目前測試反饋穩定，沒有重大的技術或設計風險。」"
      };
    }
  }

  if (maxKey === "genderPowerShift") {
    if (maxValue > 0) {
      return {
        source: "Media",
        senderOrPublication: "VARIETY REPORT",
        content: "「大膽突破！顛覆性的性別權力結構，女性與多元族群成為敘事核心，為類型作品注入全新活力。」"
      };
    } else {
      return {
        source: "Forum",
        senderOrPublication: "Reddit 原作粉板",
        content: "「Reddit 熱帖：『強行弱化經典男性配角？』，粉絲對角色設計被刻意矮化表示強烈不滿。」"
      };
    }
  }

  if (maxKey === "storyDriven") {
    if (maxValue > 0) {
      return {
        source: "Forum",
        senderOrPublication: "r/RPG_Gamers",
        content: "「劇本殺瘋了！極具張力的故事線與令人心碎的兩難抉擇，讓愛看劇情的玩家徹底陷進去了。」"
      };
    } else {
      return {
        source: "Slack",
        senderOrPublication: "行銷組長 @Slack",
        content: "「部分社群反饋指出劇本過於平淡，缺乏情緒爆點，可能影響長線的討論度。」"
      };
    }
  }

  return {
    source: "Slack",
    senderOrPublication: "#marketing",
    content: "「決策已執行。各管道回饋數據分析中，目前輿論處於可控範圍。」"
  };
}

function CriticUserPredictor({ profile, selectedType }: { profile: UserProfile | null; selectedType: WorkType }) {
  const critic = calculateCriticScore(profile);
  const user = calculateUserScore(profile, selectedType);

  const criticBg = critic >= 75 ? "bg-emerald-600 text-white" : critic >= 50 ? "bg-amber-500 text-slate-950" : "bg-rose-600 text-white";
  const criticLabel = critic >= 90 ? "媒體盛讚 (Acclaim)" : critic >= 75 ? "普遍好評 (Favorable)" : critic >= 50 ? "褒貶不一 (Mixed)" : "普遍差評 (Unfavorable)";

  let userLabel = "";
  let userBg = "";
  if (selectedType === "film") {
    userBg = user >= 7.5 ? "bg-emerald-600 text-white" : user >= 5.0 ? "bg-amber-500 text-slate-950" : "bg-rose-600 text-white";
    userLabel = user >= 8.0 ? "觀眾極佳 (Great)" : user >= 6.0 ? "觀眾普通 (Mixed)" : user >= 4.0 ? "大眾反感 (Disliked)" : "群體崩潰 (Disliked)";
  } else {
    userBg = user >= 75 ? "bg-emerald-600 text-white" : user >= 50 ? "bg-amber-500 text-slate-950" : "bg-rose-600 text-white";
    userLabel = user >= 95 ? "壓倒性好評" : user >= 80 ? "極度好評" : user >= 70 ? "大多好評" : user >= 40 ? "褒貶不一" : user >= 20 ? "大多負評" : "壓倒性負評";
  }

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-inner">
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200 mb-3">市場評價預測 (Market Predictor)</h3>
      <div className="grid grid-cols-2 gap-3">
        {/* Critic Score */}
        <div className="flex flex-col items-center justify-center rounded-md border border-white/5 bg-black/40 p-3 shadow-inner">
          <span className="text-[10px] text-slate-400 font-semibold mb-1">媒體評分 (Critics)</span>
          <div className={`flex h-11 w-11 items-center justify-center rounded-lg text-lg font-black ${criticBg}`}>
            {critic}
          </div>
          <span className="mt-2 text-[11px] font-bold text-slate-300 text-center truncate w-full">{criticLabel}</span>
        </div>
        
        {/* User Score */}
        <div className="flex flex-col items-center justify-center rounded-md border border-white/5 bg-black/40 p-3 shadow-inner">
          <span className="text-[10px] text-slate-400 font-semibold mb-1">
            {selectedType === "film" ? "觀眾評分 (IMDb)" : "玩家好評 (Steam)"}
          </span>
          <div className={`flex h-11 w-11 items-center justify-center rounded-lg text-lg font-black ${userBg}`}>
            {selectedType === "film" ? user.toFixed(1) : `${user}%`}
          </div>
          <span className="mt-2 text-[11px] font-bold text-slate-300 text-center truncate w-full">{userLabel}</span>
        </div>
      </div>
      <p className="mt-3 text-[10px] leading-4 text-slate-400 text-center">
        預測值隨製作決策即時波動。ESG進步價值拉高媒體分，但過度置入或背離原作會重創玩家口碑。
      </p>
    </div>
  );
}

function DiscourseAlert({ 
  alert, 
  controversyRisk = 50,
  onOpenDetails
}: { 
  alert: MockAlert | null; 
  controversyRisk?: number;
  onOpenDetails?: (alert: MockAlert) => void;
}) {
  const currentAlert: MockAlert = alert ?? {
    source: "Slack",
    senderOrPublication: "公關主管 #pr-monitoring",
    content: "「輿論與市場監控模組已連線。正在評估首期製作決策... 請進行您的下一步選擇。」"
  };

  const [isHovered, setIsHovered] = useState(false);

  if (currentAlert.source === "Forum") {
    const isLocked = controversyRisk >= 75;
    return (
      <div 
        onClick={() => onOpenDetails?.(currentAlert)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-lg border border-orange-500/30 bg-gradient-to-br from-white/[0.08] to-white/[0.01] p-5 shadow-glow backdrop-blur-xl saturate-150 text-slate-100 transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:shadow-2xl hover:border-orange-500/50 active:scale-[0.99] group"
      >
        <div className="flex items-center justify-between gap-3 text-xs text-slate-400 mb-3 border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-[#FF4500] flex items-center justify-center text-white p-0.5 shadow-inner shrink-0">
              <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M17.16,9.15a2,2,0,0,0-3.38-1.42,10.65,10.65,0,0,0-4.32-1l.92-2.91,3,.64a1.23,1.23,0,1,0,.11-.53l-3.3-.7a.33.33,0,0,0-.4.24L8.8,6.75a10.82,10.82,0,0,0-4.43,1A2,2,0,0,0,1,9.15a2,2,0,0,0,1.06,1.75A7.83,7.83,0,0,0,2,11.8a8.21,8.21,0,0,0,.76,3.46,7.57,7.57,0,0,0,2.1,2.6,8.21,8.21,0,0,0,3.09,1.52,11,11,0,0,0,4.1,0,8.21,8.21,0,0,0,3.09-1.52,7.57,7.57,0,0,0,2.1-2.6A8.21,8.21,0,0,0,18,11.8a7.83,7.83,0,0,0-.09-.9A2,2,0,0,0,17.16,9.15ZM5.77,13a1,1,0,1,1,1,1A1,1,0,0,1,5.77,13Zm7.68,2.37a5,5,0,0,1-6.9,0,.33.33,0,1,1,.46-.47,4.35,4.35,0,0,0,6,0,.33.33,0,0,1,.46.47Zm-.91-1.37a1,1,0,1,1,1-1A1,1,0,0,1,12.54,14Z"/>
              </svg>
            </span>
            <span className="font-bold text-slate-300">r/gaming</span>
            <span>• Posted by u/CoreGamer99</span>
          </div>
          {isLocked && (
            <span className="flex items-center gap-1 text-rose-300 font-bold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/25">
              <span>已鎖帖</span>
              <span className="text-[9px]">🔒</span>
            </span>
          )}
        </div>
        <p className="text-sm font-semibold text-white mb-3 leading-6">
          " {currentAlert.content} "
        </p>
        <div className="flex items-center justify-between gap-4 text-xs font-bold text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 hover:bg-white/10 cursor-pointer">
              <span>▲</span>
              <span className="font-mono text-orange-400">{isLocked ? "24.5k" : "8.4k"}</span>
              <span>▼</span>
            </div>
            <div className="rounded-full bg-white/5 px-3 py-1 hover:bg-white/10 cursor-pointer">
              <span>💬 {isLocked ? "3.2k" : "1.1k"} Comments</span>
            </div>
          </div>
          <span className="text-[10px] text-orange-400 font-normal animate-pulse group-hover:underline">
            💬 點擊進入討論區...
          </span>
        </div>

        {/* Hover popup preview always in DOM but animated */}
        <div className={`absolute bottom-[105%] left-0 w-full z-40 bg-[#0b1416] border border-orange-500/50 rounded-lg shadow-2xl p-4 transition-all duration-300 pointer-events-none text-left ${
          isHovered 
            ? "opacity-100 translate-y-0 scale-100 visible" 
            : "opacity-0 translate-y-2 scale-95 invisible"
        }`}>
          <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/5 text-xs text-orange-400 font-bold">
            <span>💬 討論區即時熱帖預覽 (r/gaming)</span>
          </div>
          <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">{getDetailedContent(currentAlert).title}</h4>
          <div className="space-y-2.5 border-t border-white/5 pt-2 mt-1">
            {(getDetailedContent(currentAlert) as any).comments?.slice(0, 2).map((comment: any, idx: number) => (
              <div key={idx} className="border-l border-white/10 pl-2 text-[11px] mb-2">
                <div className="flex items-center gap-1.5 text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-300">{comment.user}</span>
                  <span>{comment.time}</span>
                  <span className="font-mono text-orange-400">▲ {comment.score}</span>
                </div>
                <p className="text-slate-200 line-clamp-1">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 text-[10px] text-center text-orange-400 border-t border-white/5 pt-1.5 font-semibold">
            👉 點擊卡片進入完整討論區查看更多評論
          </div>
        </div>
      </div>
    );
  }

  if (currentAlert.source === "Media") {
    const isMic = /interview|press|podcast|radio/i.test(currentAlert.senderOrPublication);
    const mediaTag = currentAlert.senderOrPublication.split(" ")[0];
    return (
      <div 
        onClick={() => onOpenDetails?.(currentAlert)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="rounded-lg border-2 border-stone-800 bg-[#FAF9F5] p-6 text-stone-900 shadow-[5px_5px_0px_0px_rgba(28,25,23,1)] transition-all duration-300 relative overflow-visible font-serif cursor-pointer hover:scale-[1.01] hover:shadow-2xl hover:brightness-[1.03] active:scale-[0.99] group"
      >
        {/* Newspaper masthead */}
        <div className="border-b-4 border-double border-stone-800 pb-3 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded bg-stone-900 flex items-center justify-center p-1 shrink-0 text-white">
                {isMic ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                    <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z" />
                  </svg>
                )}
              </span>
              <span className="text-xl font-black uppercase tracking-wider font-sans">
                {mediaTag} DAILY
              </span>
            </div>
            <div className="text-right text-[10px] text-stone-600 font-sans font-semibold">
              <div>VOL. XLVI NO. 204</div>
              <div>LATE CITY EDITION</div>
            </div>
          </div>
          <div className="flex justify-between text-[9px] uppercase tracking-widest text-stone-500 mt-2 font-sans font-bold border-t border-stone-300 pt-1">
            <span>Special Report</span>
            <span>Sunday Edition</span>
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex gap-2 items-center mb-3">
            <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded font-sans tracking-wider uppercase shrink-0">
              {isMic ? "EXCLUSIVE INTERVIEW" : "HOT NEWS"}
            </span>
            <span className="text-[10px] text-stone-500 uppercase font-sans tracking-wider font-semibold">
              {isMic ? "獨家專訪" : "輿情頭條新聞"}
            </span>
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse ml-auto" />
          </div>

          <h3 className="text-lg font-black text-stone-900 leading-snug mb-3 font-serif border-b border-stone-200 pb-2">
            {currentAlert.senderOrPublication} — {isMic ? "專訪分析報導" : "最新專題評論"}
          </h3>

          <div className="text-stone-800 leading-relaxed font-serif text-sm">
            <span className="float-left text-3xl font-black mr-2 leading-[0.8] mt-1 text-stone-950 font-sans bg-stone-950 text-white p-1 rounded-sm">
              📢
            </span>
            <span className="italic font-medium text-stone-900 bg-stone-100 p-1.5 rounded block border-l-4 border-stone-800 my-2">
              {currentAlert.content}
            </span>
            <div className="mt-3 text-xs text-stone-500 font-sans border-t border-stone-200 pt-2 flex items-center justify-between">
              <span>記者：社群輿情觀測組 報導</span>
              <span className="text-[10px] text-stone-900 font-bold animate-pulse group-hover:underline">
                👉 點擊閱讀完整報紙頭條...
              </span>
            </div>
          </div>
        </div>

        {/* Hover popup preview always in DOM but animated */}
        <div className={`absolute bottom-[105%] left-0 w-full z-45 bg-[#FAF9F5] border-2 border-stone-800 rounded-lg shadow-2xl p-4 transition-all duration-300 pointer-events-none text-left ${
          isHovered 
            ? "opacity-100 translate-y-0 scale-100 visible" 
            : "opacity-0 translate-y-2 scale-95 invisible"
        }`}>
          <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-stone-300 text-[10px] font-sans font-bold text-red-600">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
            <span>📰 報紙頭條社論預覽 ({mediaTag} DAILY)</span>
          </div>
          <h4 className="text-sm font-black text-stone-900 mb-2 font-serif leading-tight line-clamp-1">
            {(getDetailedContent(currentAlert) as any).headline}
          </h4>
          <p className="text-[11px] text-stone-700 leading-relaxed font-serif line-clamp-2 italic bg-stone-100 p-1.5 rounded border-l-2 border-stone-800 mb-2">
            「 {currentAlert.content} 」
          </p>
          <p className="text-[11px] text-stone-800 font-serif line-clamp-2">
            {(getDetailedContent(currentAlert) as any).paragraphs?.[0]}
          </p>
          <div className="mt-3 text-[10px] text-center text-stone-900 border-t border-stone-200 pt-1.5 font-sans font-bold">
            👉 點擊卡片閱讀完整報紙頭條報導
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onOpenDetails?.(currentAlert)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-lg border border-indigo-500/20 bg-gradient-to-br from-white/[0.08] to-white/[0.01] p-5 shadow-glow backdrop-blur-xl saturate-150 text-slate-100 transition-all duration-300 cursor-pointer hover:scale-[1.01] hover:shadow-2xl hover:border-indigo-500/50 active:scale-[0.99] group"
    >
      <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
        <span className="h-5 w-5 rounded bg-white/10 flex items-center justify-center p-0.5 shrink-0">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
            <g>
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.043z" fill="#36C5F0"/>
              <path d="M8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52v5.043a2.528 2.528 0 0 1-2.52 2.52H3.78a2.528 2.528 0 0 1-2.52-2.52V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043z" fill="#2EB67D"/>
              <path d="M18.958 8.824a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52V8.824zm-1.261 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043z" fill="#ECB22E"/>
              <path d="M15.177 18.958a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.261a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z" fill="#E01E5A"/>
            </g>
          </svg>
        </span>
        <span className="text-[11px] font-bold text-indigo-300 font-mono">#marketing-pr-channel</span>
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse ml-auto" />
      </div>
      <div className="flex gap-3 items-start">
        <div className="h-8 w-8 rounded-full bg-teal-300/20 border border-teal-200/30 flex items-center justify-center font-bold text-teal-300 text-xs shrink-0 animate-pulse">
          PR
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-bold text-teal-200">{currentAlert.senderOrPublication.split(" ")[0]}</span>
            <span className="text-[9px] text-slate-400 font-mono">11:34 AM</span>
          </div>
          <p className="text-sm leading-6 text-slate-200 mt-1 italic font-medium">
            {currentAlert.content}
          </p>
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-500 border-t border-white/5 pt-2 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-normal">Slack 團隊頻道</span>
        <span className="text-[10px] text-indigo-400 font-bold animate-pulse group-hover:underline">
          👉 點擊查看內部討論...
        </span>
      </div>

      {/* Slack Hover Popup Preview */}
      <div className={`absolute bottom-[105%] left-0 w-full z-40 bg-[#1e1d24] border border-indigo-500/50 rounded-lg shadow-2xl p-4 transition-all duration-300 pointer-events-none text-left ${
        isHovered 
          ? "opacity-100 translate-y-0 scale-100 visible" 
          : "opacity-0 translate-y-2 scale-95 invisible"
      }`}>
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-white/5 text-xs text-indigo-400 font-bold">
          <span>💬 團隊內部 Slack 頻道預覽 ({currentAlert.senderOrPublication.split(" ")[0]})</span>
        </div>
        <div className="space-y-2.5 mt-1">
          {(getDetailedContent(currentAlert) as any).messages?.slice(0, 2).map((msg: any, idx: number) => (
            <div key={idx} className="flex gap-2 text-[11px] mb-2 border-l border-white/5 pl-2">
              <div className="h-5 w-5 rounded bg-teal-600 flex items-center justify-center font-bold text-white text-[9px] shrink-0">
                {msg.avatar}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-1 text-[10px] text-slate-400">
                  <span className="font-bold text-slate-300">{msg.user}</span>
                  <span>{msg.time}</span>
                </div>
                <p className="text-slate-200 line-clamp-1">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-[10px] text-center text-indigo-400 border-t border-white/5 pt-1.5 font-semibold">
          👉 點擊卡片查看內部討論詳情
        </div>
      </div>
    </div>
  );
}

function AdvisoryBubbles({ questionId, isEvent }: { questionId: string; isEvent: boolean }) {
  const opinions = getAdviserOpinion(questionId, isEvent);
  return (
    <div className="grid gap-3 sm:grid-cols-2 mb-4">
      <div className="rounded-lg border border-purple-500/30 bg-white/[0.06] p-4 text-slate-200 shadow-glow backdrop-blur-xl saturate-150">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg animate-pulse">👩‍💼</span>
          <span className="text-[11px] uppercase tracking-wider text-purple-300 font-bold">ESG價值合規顧問</span>
        </div>
        <p className="text-xs leading-5 text-slate-300 italic">{opinions.consultant}</p>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-white/[0.06] p-4 text-slate-200 shadow-glow backdrop-blur-xl saturate-150">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg animate-pulse">👨‍💻</span>
          <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold">研發製作組長</span>
        </div>
        <p className="text-xs leading-5 text-slate-300 italic">{opinions.dev}</p>
      </div>
    </div>
  );
}

function AxisPanel({
  profile,
  selectedType,
}: {
  profile: UserProfile | null;
  selectedType: WorkType;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const current = axisFromProfile(profile);
  const deiLevel = current.x >= 72 ? "價值高度合規" : current.x >= 45 ? "中度合規定位" : "保守大眾傾向";
  const controversyLevel = current.y >= 72 ? "高輿論反彈" : current.y >= 45 ? "中度敏感" : "社群輿論平穩";

  return (
    <aside className="rounded-lg border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 shadow-glow backdrop-blur-xl saturate-150 flex flex-col gap-4">
      {/* Mobile Toggle Button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full lg:hidden flex items-center justify-between text-left focus:outline-none"
      >
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-teal-200">POSITIONING & PREDICTOR</p>
          <h2 className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
            📊 目前數據評估與預測 
            <span className="text-[10px] text-teal-200 bg-teal-950/40 border border-teal-500/20 px-2 py-0.5 rounded font-mono font-bold shrink-0">
              {isExpanded ? "收合 ▲" : "點擊展開 ▼"}
            </span>
          </h2>
        </div>
      </button>

      {/* Main Content (always block on lg screen, toggleable on mobile) */}
      <div className={`lg:block ${isExpanded ? "block animate-in fade-in duration-300" : "hidden"} space-y-4`}>
        <div>
          <div className="mb-4 hidden lg:flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200">POSITIONING</p>
              <h2 className="mt-1 text-lg font-bold text-white">文化價值定位儀</h2>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              {selectedType === "film" ? "影視" : "遊戲"}
            </span>
          </div>

          <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-slate-950/85">
            <div className="absolute inset-4 border-l border-b border-white/25" />
            <div className="absolute left-1/2 top-4 h-[calc(100%-2rem)] w-px bg-white/10" />
            <div className="absolute left-4 top-1/2 h-px w-[calc(100%-2rem)] bg-white/10" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:20%_20%]" />

            <div
              className="absolute z-20 flex h-6 w-6 items-center justify-center rounded-full border border-teal-100 bg-teal-300 shadow-[0_0_24px_rgba(94,234,212,0.85)] transition-all duration-500"
              style={{ left: `${current.x}%`, top: `${100 - current.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <Crosshair size={14} className="text-slate-950" />
            </div>

            <span className="absolute left-4 top-3 text-[10px] font-semibold text-slate-400">輿論反彈高 (Backlash)</span>
            <span className="absolute bottom-3 left-4 text-[10px] font-semibold text-slate-400">傳統保守</span>
            <span className="absolute bottom-3 right-4 text-[10px] font-semibold text-slate-400">價值合規 (ESG/DEI)</span>
            <span className="absolute bottom-10 left-4 text-[10px] font-semibold text-slate-500">輿論反彈低</span>
          </div>

          <div className="mt-3 rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm shadow-inner">
            <p className="font-semibold text-white">
              {deiLevel} / {controversyLevel}
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-400">每個決策都會改變你作品的價值對齊與公關壓力位置。</p>
          </div>
        </div>

        <CriticUserPredictor profile={profile} selectedType={selectedType} />
      </div>
    </aside>
  );
}

const shuffle = <T,>(array: T[]): T[] => {
  const next = [...array];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
};

export default function QuizPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<WorkType | null>(null);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [lastAlert, setLastAlert] = useState<MockAlert | null>(null);
  const [currentEvent, setCurrentEvent] = useState<SuddenEvent | null>(null);
  const [gameQuestions, setGameQuestions] = useState<typeof questions>([]);
  const [activeDetailAlert, setActiveDetailAlert] = useState<MockAlert | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState<"esg_bankruptcy" | "pr_firestorm" | "user_rating_death" | null>(null);

  const handleCrisisTimeout = () => {
    if (!currentEvent || !profile) return;
    
    let timeoutEffects: Partial<Record<TagKey, number>> = {};
    let message = "";
    
    if (currentEvent.id === "leak") {
      timeoutEffects = { controversyRisk: 25, audienceAcceptance: -15 };
      message = "「因未能及時公關，洩漏版本大範圍傳播，輿論徹底失控！」";
    } else if (currentEvent.id === "consultant") {
      timeoutEffects = { representation: -15, controversyRisk: 10, studioRisk: 25 };
      message = "「融資死線已過，未能在規定時間內提交報告，資金遭遇凍結！」";
    } else if (currentEvent.id === "journalist") {
      timeoutEffects = { mediaFriendly: -25, controversyRisk: 20 };
      message = "「由於您沉默未答，媒體頭條發布《沉默代表默認？製作組逃避輿論監督》，信任度大跌！」";
    } else {
      timeoutEffects = { controversyRisk: 15 };
      message = "「未能在時限內做出決策，公關事件持續發酵！」";
    }

    const nextProfile = applyEffects(profile, timeoutEffects, undefined);
    
    const timeoutAlert: MockAlert = {
      source: "Slack",
      senderOrPublication: "🚨 公關危機超時",
      content: message
    };
    
    setLastAlert(timeoutAlert);
    setCurrentEvent(null);
    setTimeLeft(null);
    
    const isOver = handleGameOverCheck(nextProfile, step);
    if (isOver) {
      setProfile(nextProfile);
      return;
    }

    setProfile(nextProfile);
    setStep((current) => current + 1);
  };

  useEffect(() => {
    if (!currentEvent) {
      setTimeLeft(null);
      return;
    }

    setTimeLeft(20); // 20 seconds countdown

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timer);
          handleCrisisTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentEvent]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDetailAlert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const start = (type: WorkType) => {
    setSelectedType(type);
    const initialProfile = createEmptyProfile(type);
    setProfile(initialProfile);
    setStep(0);
    setLastAlert(null);
    setCurrentEvent(null);
    setActiveDetailAlert(null);
    setTimeLeft(null);
    setIsGameOver(false);
    setGameOverReason(null);

    // Filter questions by appliesTo
    const matched = questions.filter((q) => q.appliesTo === "all" || q.appliesTo === type);

    // Group and shuffle within each phase
    const preQuestions = matched.filter((q) => questionPhases[q.id] === "pre");
    const prodQuestions = matched.filter((q) => questionPhases[q.id] === "prod");
    const launchQuestions = matched.filter((q) => questionPhases[q.id] === "launch");

    // Select 3 questions from each phase and shuffle them
    const selectedPre = shuffle(preQuestions).slice(0, 3);
    const selectedProd = shuffle(prodQuestions).slice(0, 3);
    const selectedLaunch = shuffle(launchQuestions).slice(0, 3);

    // Set game questions sequence (total of 9 questions + crisis events)
    setGameQuestions([...selectedPre, ...selectedProd, ...selectedLaunch]);
  };

  const handleGameOverCheck = (nextProfile: UserProfile, stepIndex: number) => {
    const currentAxis = axisFromProfile(nextProfile);
    const user = calculateUserScore(nextProfile, nextProfile.type);

    if (currentAxis.y >= 95) {
      setIsGameOver(true);
      setGameOverReason("pr_firestorm");
      return true;
    }

    if (currentAxis.x < 15 && stepIndex >= 2) {
      setIsGameOver(true);
      setGameOverReason("esg_bankruptcy");
      return true;
    }

    if (nextProfile.type === "film") {
      if (user <= 2.2 && stepIndex >= 3) {
        setIsGameOver(true);
        setGameOverReason("user_rating_death");
        return true;
      }
    } else {
      if (user <= 20 && stepIndex >= 3) {
        setIsGameOver(true);
        setGameOverReason("user_rating_death");
        return true;
      }
    }

    return false;
  };

  const answer = (effects: Parameters<typeof applyEffects>[1], matchTags: Parameters<typeof applyEffects>[2]) => {
    if (!profile) return;

    setTimeLeft(null);
    const nextProfile = applyEffects(profile, effects, matchTags);
    const alert = generateAlert(effects, selectedType!);
    setLastAlert(alert);

    const isOver = handleGameOverCheck(nextProfile, step);
    if (isOver) {
      setProfile(nextProfile);
      return;
    }

    if (currentEvent) {
      setCurrentEvent(null);
      setProfile(nextProfile);
      setStep((current) => current + 1);
      return;
    }

    const nextStep = step + 1;

    if (suddenEvents[nextStep]) {
      setCurrentEvent(suddenEvents[nextStep]);
      setProfile(nextProfile);
      return;
    }

    if (step >= gameQuestions.length - 1) {
      window.localStorage.setItem("pc-quiz-profile", JSON.stringify(nextProfile));
      router.push("/result");
      return;
    }

    setProfile(nextProfile);
    setStep(nextStep);
  };

  if (isGameOver) {
    const critic = calculateCriticScore(profile);
    const user = calculateUserScore(profile, selectedType!);

    return (
      <main className="relative isolate min-h-screen flex items-center justify-center overflow-hidden px-5 py-8">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.14),transparent_48%),linear-gradient(135deg,#0a0505,#110808_46%,#070202)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70 animate-pulse" />
        
        {/* Red glowing blob for failure screen */}
        <div className="absolute top-1/4 left-1/3 -z-20 h-[30rem] w-[30rem] rounded-full bg-red-600/10 blur-[130px] pointer-events-none" />

        <div className="max-w-lg w-full rounded-lg border border-red-500/40 bg-black/85 p-8 shadow-[0_0_50px_rgba(239,68,68,0.25)] backdrop-blur-xl saturate-150 text-center relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-rose-600 to-red-500 animate-pulse" />
          
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-950/60 border border-red-500/40 text-red-400 mb-5">
            <ShieldAlert size={28} />
          </div>

          <p className="text-xs uppercase tracking-[0.25em] text-red-400 font-bold">PROJECT CANCELLED</p>
          <h1 className="text-3xl font-black text-white mt-2 mb-4 leading-tight">
            {gameOverReason === "esg_bankruptcy" && "❌ ESG 融資斷鏈，專案夭折"}
            {gameOverReason === "pr_firestorm" && "💥 輿論大爆炸，製作組解散"}
            {gameOverReason === "user_rating_death" && "☠️ 玩家口碑死亡，工作室倒閉"}
          </h1>

          <p className="text-sm leading-7 text-slate-300 text-left mb-6 bg-red-950/20 border border-red-950/40 p-4 rounded-lg">
            {gameOverReason === "esg_bankruptcy" && 
              "由於您多次拒絕配合外部文化合規指標，進步價值合規度 (ESG/DEI) 低於紅線。外部顧問公司判定項目「不合規」，黑石基金等風投機構隨即撤回了第二期開發資金。在研發資金耗盡的窘境下，專案被迫取消。"}
            {gameOverReason === "pr_firestorm" && 
              "您的極端人設與高爭議決策徹底引爆了玩家社群。論壇伺服器被憤怒的玩家沖垮，Steam 討論區湧入大量退款請願。各大銷售平台因輿論壓力強制將您的作品下架，董事會決定將您開除以平息眾怒。"}
            {gameOverReason === "user_rating_death" && 
              "作品發售後，Metacritic 玩家評分慘遭洗到歷史低點（Steam 壓倒性負評）。核心玩家強烈唾棄作品中僵硬的政治說教台詞與支離破碎的魔改人設。首週退款率高達 90%，工作室面臨巨額虧損宣告破產。"}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8 bg-white/[0.03] border border-white/5 p-4 rounded-lg text-sm text-slate-400 font-mono">
            <div>
              <p>最終媒體預測</p>
              <p className="text-xl font-bold text-white mt-1">{critic} 分</p>
            </div>
            <div>
              <p>最終玩家滿意</p>
              <p className="text-xl font-bold text-white mt-1">
                {selectedType === "film" ? `${user.toFixed(1)} / 10` : `${user}%`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => start(selectedType!)}
            className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-red-600 hover:bg-red-500 text-white px-5 py-3 font-semibold transition shadow-lg hover:shadow-red-500/20"
          >
            🔁 重新開始項目
          </button>
        </div>
      </main>
    );
  }

  if (!selectedType) {
    return (
      <main className="relative isolate min-h-screen overflow-hidden px-5 py-10">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#080b12,#121019_45%,#071313)]" />
        <div className="absolute inset-x-0 top-8 -z-10 h-14 border-y border-white/10 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.16)_0_1.25rem,transparent_1.25rem_2.4rem)] opacity-30" />
        <div className="absolute bottom-0 right-0 -z-10 h-2/3 w-3/4 bg-[linear-gradient(rgba(94,234,212,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
        <div className="absolute inset-0 -z-10 opacity-55 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Colorful background glowing blobs for landing glassmorphism */}
        <div className="absolute top-12 left-1/4 -z-20 h-96 w-96 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-12 right-1/4 -z-20 h-[26rem] w-[26rem] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 -z-20 h-80 w-80 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-teal-200">Step 0</p>
          <h1 className="text-4xl font-black text-white sm:text-5xl">你要製作哪一種作品？</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            先選媒介，後續題目會依影視或遊戲切換，最後只會在同類作品中比對推薦。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => start("film")}
              className="group rounded-lg border border-white/10 bg-white/[0.05] p-6 text-left transition hover:border-teal-200/60 hover:bg-white/[0.1] backdrop-blur-xl saturate-150 shadow-glow"
            >
              <Clapperboard className="mb-8 text-teal-200" size={34} />
              <h2 className="text-2xl font-semibold text-white">影視作品</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                偏向選角、獎季、票房、原作改編與影評語境。
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-200">
                選擇影視
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => start("game")}
              className="group rounded-lg border border-white/10 bg-white/[0.05] p-6 text-left transition hover:border-amber-200/60 hover:bg-white/[0.1] backdrop-blur-xl saturate-150 shadow-glow"
            >
              <Gamepad2 className="mb-8 text-amber-200" size={34} />
              <h2 className="text-2xl font-semibold text-white">遊戲作品</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                加入商業模式、玩家自由度、劇情導向與社群反應。
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                選擇遊戲
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  const current = gameQuestions[step];
  const progress = Math.round(((step + 1) / gameQuestions.length) * 100);

  const displayTitle = current?.title;
  const displaySubtitle = current?.subtitle;
  const displayOptions = current?.options ?? [];

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-5 py-8">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,#080b12,#111827_46%,#071313)]" />
      <div className="absolute left-0 top-0 -z-10 h-full w-20 border-r border-white/10 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.14)_0_1.2rem,transparent_1.2rem_2.5rem)] opacity-25" />
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-[linear-gradient(rgba(94,234,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.08)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-60" />
      <div className="absolute inset-0 -z-10 opacity-45 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Colorful background glowing blobs for active quiz glassmorphism */}
      <div className="absolute top-[-10%] left-[-10%] -z-20 h-[30rem] w-[30rem] rounded-full bg-purple-500/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] -z-20 h-[35rem] w-[35rem] rounded-full bg-indigo-500/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-20 h-[40rem] w-[40rem] rounded-full bg-teal-500/20 blur-[150px] pointer-events-none" />

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center">
        <div className="mb-8">
          <button
            onClick={() => {
              if (step === 0) {
                setSelectedType(null);
                setProfile(null);
                setLastAlert(null);
                return;
              }
              setStep((currentStep) => currentStep - 1);
            }}
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            返回
          </button>

          <div className="mb-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-teal-300 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
            <span>
              {selectedType === "film" ? "影視作品" : "遊戲作品"}
            </span>
            <span>
              {`${step + 1} / ${gameQuestions.length}`}
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex flex-col gap-4">
            
            <AdvisoryBubbles 
              questionId={current?.id} 
              isEvent={false} 
            />

            <section className="rounded-lg border border-white/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 shadow-glow backdrop-blur-xl saturate-150 sm:p-8 transition-all duration-300">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-teal-200">
                Production Decision
              </p>
              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl">{displayTitle}</h1>
              {displaySubtitle ? <p className="mt-3 text-slate-300 leading-7">{displaySubtitle}</p> : null}

              <div className="mt-8 grid gap-3">
                {displayOptions.map((option) => {
                  return (
                    <button
                      type="button"
                      key={option.label}
                      onClick={() => answer(option.effects, (option as typeof current.options[0]).matchTags)}
                      className="border-white/10 bg-white/[0.03] hover:border-teal-200/50 hover:bg-white/[0.08] hover:shadow-glow rounded-lg border p-5 text-left transition focus:outline-none focus:ring-1 focus:ring-teal-200/50"
                    >
                      <span className="flex gap-4">
                        {(option as typeof current.options[0])?.imageSrc ? (
                          <span className="flex h-24 w-24 shrink-0 items-end justify-center overflow-hidden rounded-md border border-white/10 bg-slate-950/80">
                            <img
                              src={(option as typeof current.options[0]).imageSrc}
                              alt={(option as typeof current.options[0]).imageAlt ?? option.label}
                              className="max-h-full max-w-full object-contain"
                            />
                          </span>
                        ) : null}
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-start justify-between gap-3">
                            <span className="text-lg font-semibold text-white">{option.label}</span>
                          </span>
                          <span className="mt-2 block text-sm leading-6 text-slate-300">{option.description}</span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
            
            <DiscourseAlert 
              alert={lastAlert} 
              controversyRisk={profile ? axisFromProfile(profile).y : 50} 
              onOpenDetails={(alert) => setActiveDetailAlert(alert)}
            />
          </div>

          <AxisPanel profile={profile} selectedType={selectedType} />
        </div>
      </div>

      {/* Sudden Crisis Modal Overlay */}
      {currentEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full rounded-xl border-2 border-red-500/40 bg-gradient-to-b from-[#180a0a] to-[#0a0303] p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.35)] text-slate-100 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Pulsing red alarm border glow */}
            <div className="absolute inset-0 border border-red-500/20 rounded-xl pointer-events-none animate-pulse" />
            
            {/* Top red siren line */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 animate-pulse" />
            
            <div className="flex items-center justify-between text-red-500 font-bold text-xs uppercase tracking-widest mb-2">
              <div className="flex items-center gap-2">
                <span className="animate-ping h-2.5 w-2.5 rounded-full bg-red-500 inline-block shrink-0" />
                <span>🚨 突發公關危機 (CRISIS EVENT)</span>
              </div>
              {timeLeft !== null && (
                <div className={`px-2.5 py-1 rounded border font-mono text-[11px] flex items-center gap-1.5 ${
                  timeLeft <= 5 
                    ? "bg-red-950 border-red-500 text-red-400 animate-pulse font-black animate-bounce" 
                    : "bg-black/40 border-red-500/30 text-red-500"
                }`}>
                  <span>⏱️ 剩餘決策時間：</span>
                  <span className="text-sm font-black text-white">{timeLeft}s</span>
                </div>
              )}
            </div>

            {/* Visual timer progress bar */}
            {timeLeft !== null && (
              <div className="w-full bg-red-950/50 h-1.5 rounded-full overflow-hidden mb-5 border border-red-500/10">
                <div 
                  className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(timeLeft / 20) * 100}%` }}
                />
              </div>
            )}
            
            <h2 className="text-2xl font-black text-white leading-tight mb-3 sm:text-3xl">
              {currentEvent.title}
            </h2>
            <p className="text-sm leading-6 text-slate-300 mb-6 bg-red-950/20 border border-red-900/30 p-4 rounded-lg">
              {currentEvent.subtitle}
            </p>

            {/* Advisory in Crisis */}
            <div className="grid gap-3 sm:grid-cols-2 mb-6 text-left">
              <div className="rounded-lg border border-purple-500/20 bg-purple-950/20 p-4 text-xs text-slate-300">
                <div className="font-bold text-purple-300 mb-1">👩‍💼 ESG價值合規顧問</div>
                <div className="italic leading-5">
                  {getAdviserOpinion(currentEvent.id, true).consultant}
                </div>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-4 text-xs text-slate-300">
                <div className="font-bold text-amber-300 mb-1">👨‍💻 研發製作組長</div>
                <div className="italic leading-5">
                  {getAdviserOpinion(currentEvent.id, true).dev}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {currentEvent.options.map((option) => (
                <button
                  type="button"
                  key={option.label}
                  onClick={() => answer(option.effects, undefined)}
                  className="group rounded-lg border border-red-500/25 bg-red-950/20 p-5 text-left transition hover:border-red-400/50 hover:bg-red-950/30 hover:shadow-glow focus:outline-none"
                >
                  <div className="text-base font-bold text-white mb-1 group-hover:text-red-200 transition-colors">{option.label}</div>
                  <div className="text-xs text-slate-300 leading-6">{option.description}</div>
                  
                  {/* Projected crisis impact indicators */}
                  <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mr-1 flex items-center">📊 預估輿論衝擊：</span>
                    {Object.entries(option.effects).map(([key, val]) => {
                      const value = val as number;
                      if (value === 0) return null;
                      const isPositive = value > 0;
                      const label = {
                        representation: "DEI多元代表性",
                        controversyRisk: "輿論爭議風險",
                        audienceAcceptance: "大眾受眾接受度",
                        studioRisk: "開發與資金風險",
                        mediaFriendly: "媒體好感度",
                        commercialEntertainment: "商業娛樂價值",
                        canonFaithful: "原作忠實度",
                        genderPowerShift: "性別翻轉程度",
                        issueInsertion: "議題說教感",
                      }[key] || key;

                      // Thematic color-coding
                      let colorClass = "text-slate-300 bg-slate-950/40 border-slate-500/20";
                      if (key === "controversyRisk" || key === "studioRisk") {
                        colorClass = isPositive 
                          ? "text-red-400 bg-red-950/40 border-red-500/25" 
                          : "text-emerald-400 bg-emerald-950/40 border-emerald-500/25";
                      } else if (key === "audienceAcceptance" || key === "commercialEntertainment" || key === "canonFaithful") {
                        colorClass = isPositive 
                          ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/25" 
                          : "text-red-400 bg-red-950/40 border-red-500/25";
                      } else if (key === "representation" || key === "mediaFriendly" || key === "genderPowerShift") {
                        colorClass = isPositive
                          ? "text-purple-300 bg-purple-950/40 border-purple-500/25"
                          : "text-red-400 bg-red-950/40 border-red-500/25";
                      } else if (key === "issueInsertion") {
                        colorClass = isPositive
                          ? "text-indigo-300 bg-indigo-950/40 border-indigo-500/25"
                          : "text-emerald-400 bg-emerald-950/40 border-emerald-500/25";
                      }

                      const sign = isPositive ? "▲" : "▼";
                      return (
                        <span 
                          key={key} 
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold border backdrop-blur-sm shadow-inner transition-colors duration-200 ${colorClass}`}
                        >
                          <span>{sign === "▲" ? "📈" : "📉"}</span>
                          <span>{label}</span>
                          <span className="font-mono">{isPositive ? `+` : ``}{value}%</span>
                        </span>
                      );
                    })}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Alert Dialog Overlay */}
      {activeDetailAlert && (() => {
        const detail = getDetailedContent(activeDetailAlert);
        if (activeDetailAlert.source === "Media") {
          const isMic = /interview|press|podcast|radio/i.test(activeDetailAlert.senderOrPublication);
          const mediaTag = activeDetailAlert.senderOrPublication.split(" ")[0];
          const media = detail as { headline: string; paragraphs: string[] };
          return (
            <div 
              onClick={() => setActiveDetailAlert(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full rounded-lg border-2 border-stone-800 bg-[#FAF9F5] p-6 sm:p-8 text-stone-900 shadow-[10px_10px_0px_0px_rgba(28,25,23,1)] overflow-y-auto max-h-[90vh] font-serif animate-in zoom-in-95 duration-200 cursor-default"
              >
                {/* Close button */}
                <button
                  onClick={() => setActiveDetailAlert(null)}
                  className="absolute top-4 right-4 bg-stone-900 text-white font-sans text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded hover:bg-stone-700 transition"
                >
                  關閉本頁 [X]
                </button>

                {/* Newspaper Masthead */}
                <div className="border-b-4 border-double border-stone-800 pb-4 mb-6 mt-4 font-sans">
                  <div className="text-center mb-2">
                    <span className="text-4xl sm:text-5xl font-black uppercase tracking-widest border-b-2 border-stone-900 pb-1 px-4 inline-block">
                      {mediaTag} DAILY NEWS
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-600 font-bold border-t border-stone-300 pt-2 px-1">
                    <span>VOL. XLVI NO. 204</span>
                    <span className="uppercase">{isMic ? "EXCLUSIVE PRESS CORNER" : "LATE CITY EDITION"}</span>
                  </div>
                  <div className="text-center text-[10px] text-stone-500 uppercase tracking-widest mt-1.5 font-semibold">
                    Published in New York & San Francisco • Sunday, June 7, 2026
                  </div>
                </div>

                {/* Editorial Headline */}
                <h1 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight mb-5 border-b border-stone-200 pb-3">
                  {media.headline}
                </h1>

                {/* Multi-column layout */}
                <div className="grid gap-6 md:grid-cols-2 text-stone-800 text-sm leading-relaxed text-justify border-b border-stone-200 pb-6 mb-4">
                  <div>
                    <span className="float-left text-5xl font-black mr-2.5 leading-[0.7] mt-1.5 text-stone-950 font-sans bg-stone-950 text-white p-2 rounded">
                      📢
                    </span>
                    <p className="font-semibold text-stone-900 mb-3 italic">
                      「 {activeDetailAlert.content} 」
                    </p>
                    <p>{media.paragraphs[0]}</p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="mb-4">{media.paragraphs[1]}</p>
                    {media.paragraphs[2] ? <p className="mb-4">{media.paragraphs[2]}</p> : null}
                    
                    {/* Fake ad box for retro style */}
                    <div className="border border-stone-400 p-3 bg-stone-50/50 text-center font-sans text-xs text-stone-500 rounded border-dashed mt-auto">
                      <div className="font-bold uppercase tracking-wider text-stone-700">WANTED: CREATIVE DESIGNERS</div>
                      <div className="mt-1">Join the next-gen production studio today. Apply at info@gamingstudio.com</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-stone-500 font-sans">
                  <span>責任編輯：社群輿情專題組</span>
                  <span>© {new Date().getFullYear()} {mediaTag} Media Group. All Rights Reserved.</span>
                </div>
              </div>
            </div>
          );
        }

        if (activeDetailAlert.source === "Forum") {
          const forum = detail as { title: string; comments: { user: string; score: string; time: string; text: string }[] };
          return (
            <div 
              onClick={() => setActiveDetailAlert(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full rounded-xl border border-white/10 bg-[#0b1416]/95 p-6 sm:p-8 text-slate-100 shadow-[0_0_50px_rgba(255,69,0,0.15)] overflow-y-auto max-h-[85vh] font-sans animate-in zoom-in-95 duration-200 cursor-default"
              >
                {/* Close button */}
                <button
                  onClick={() => setActiveDetailAlert(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 text-xs px-3 py-1.5 rounded transition"
                >
                  關閉討論區 [X]
                </button>

                {/* Subreddit Header */}
                <div className="flex items-center gap-2 mb-4 mt-2 border-b border-white/5 pb-3">
                  <span className="h-6 w-6 rounded-full bg-[#FF4500] flex items-center justify-center text-white p-0.5 shrink-0 shadow-inner">
                    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-4.5 w-4.5">
                      <path d="M17.16,9.15a2,2,0,0,0-3.38-1.42,10.65,10.65,0,0,0-4.32-1l.92-2.91,3,.64a1.23,1.23,0,1,0,.11-.53l-3.3-.7a.33.33,0,0,0-.4.24L8.8,6.75a10.82,10.82,0,0,0-4.43,1A2,2,0,0,0,1,9.15a2,2,0,0,0,1.06,1.75A7.83,7.83,0,0,0,2,11.8a8.21,8.21,0,0,0,.76,3.46,7.57,7.57,0,0,0,2.1,2.6,8.21,8.21,0,0,0,3.09,1.52,11,11,0,0,0,4.1,0,8.21,8.21,0,0,0,3.09-1.52,7.57,7.57,0,0,0,2.1-2.6A8.21,8.21,0,0,0,18,11.8a7.83,7.83,0,0,0-.09-.9A2,2,0,0,0,17.16,9.15ZM5.77,13a1,1,0,1,1,1,1A1,1,0,0,1,5.77,13Zm7.68,2.37a5,5,0,0,1-6.9,0,.33.33,0,1,1,.46-.47,4.35,4.35,0,0,0,6,0,.33.33,0,0,1,.46.47Zm-.91-1.37a1,1,0,1,1,1-1A1,1,0,0,1,12.54,14Z"/>
                    </svg>
                  </span>
                  <div>
                    <span className="font-bold text-slate-200 text-sm">r/gaming</span>
                    <span className="text-slate-400 text-xs ml-2">• Posted by u/CoreGamer99 • 6 hours ago</span>
                  </div>
                </div>

                {/* Post Title & Body */}
                <h1 className="text-xl font-bold text-white mb-3 leading-snug">
                  {forum.title}
                </h1>
                <p className="text-sm text-slate-300 leading-relaxed mb-5 bg-white/[0.02] border border-white/5 p-4 rounded-lg italic">
                  " {activeDetailAlert.content} "
                </p>

                {/* Comments Section */}
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 border-b border-white/5 pb-2">
                  熱門留言討論串 (Top Comments)
                </h3>

                <div className="flex flex-col gap-4">
                  {forum.comments.map((comment, i) => (
                    <div key={i} className="flex gap-3 border-l-2 border-white/10 pl-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                          <span className="font-semibold text-slate-300">{comment.user}</span>
                          <span>{comment.time}</span>
                          <span className="font-mono text-orange-400 font-bold">▲ {comment.score}</span>
                        </div>
                        <p className="text-sm leading-6 text-slate-200">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        // Slack card detailed chat
        const slack = detail as { channel: string; messages: { user: string; avatar: string; time: string; text: string }[] };
        return (
          <div 
            onClick={() => setActiveDetailAlert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full rounded-xl border border-white/10 bg-[#1e1d24]/95 p-6 sm:p-8 text-slate-100 shadow-[0_0_50px_rgba(54,197,240,0.15)] overflow-y-auto max-h-[85vh] font-sans animate-in zoom-in-95 duration-200 cursor-default"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveDetailAlert(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 text-xs px-3 py-1.5 rounded transition"
              >
                關閉頻道 [X]
              </button>

              {/* Slack Header */}
              <div className="flex items-center gap-2 mb-4 mt-2 border-b border-white/5 pb-3">
                <span className="h-5 w-5 rounded bg-white/10 flex items-center justify-center p-0.5 shrink-0">
                  <svg viewBox="0 0 24 24" className="h-4 w-4">
                    <g>
                      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.043a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.043z" fill="#36C5F0"/>
                      <path d="M8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52v5.043a2.528 2.528 0 0 1-2.52 2.52H3.78a2.528 2.528 0 0 1-2.52-2.52V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043z" fill="#2EB67D"/>
                      <path d="M18.958 8.824a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52V8.824zm-1.261 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043z" fill="#ECB22E"/>
                      <path d="M15.177 18.958a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.261a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z" fill="#E01E5A"/>
                    </g>
                  </svg>
                </span>
                <span className="font-bold text-slate-200 text-sm">{slack.channel}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse ml-auto" />
              </div>

              {/* Chat Messages */}
              <div className="flex flex-col gap-4 mt-4 font-sans">
                {slack.messages.map((msg, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="h-8 w-8 rounded bg-teal-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-slate-300">{msg.user}</span>
                        <span className="text-[9px] text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-sm leading-6 text-slate-200 mt-1">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
