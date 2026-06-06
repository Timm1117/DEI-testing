import type { MatchTag, TagKey, WorkType } from "./works";

export type AnswerOption = {
  label: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  effects: Partial<Record<TagKey, number>>;
  matchTags?: Partial<Record<MatchTag, number>>;
};

export type Question = {
  id: string;
  title: string;
  subtitle?: string;
  appliesTo: "all" | WorkType;
  options: AnswerOption[];
};

const baseQuestions: Question[] = [
  {
    id: "genre",
    title: "你這次要端出什麼菜？",
    appliesTo: "all",
    options: [
      {
        label: "先爽再說，別跟我講大道理",
        description: "節奏拉滿、場面拉爆，觀眾買票不是來上公民課。",
        effects: { genreSpectacle: 24, commercialEntertainment: 24, mediaFriendly: 8 },
      },
      {
        label: "我要拍給影展評審看的",
        description: "角色痛苦、議題厚重、掌聲不一定多，但評論肯定有話講。",
        effects: { genrePrestige: 28, issueInsertion: 12, studioRisk: 10 },
      },
      {
        label: "老粉先坐下，我懂你們怕什麼",
        description: "把熟悉感放第一順位，先不要讓留言區直接開戰。",
        effects: { canonFaithful: 22, adaptation: 18, audienceAcceptance: 10 },
      },
    ],
  },
  {
    id: "adaptation",
    title: "這東西有沒有背一個超重 IP 包袱？",
    appliesTo: "all",
    options: [
      {
        label: "完全原創，輸了也算我自己的",
        description: "沒有老粉抓戰犯，但也沒有情懷幫你墊首週流量。",
        effects: { adaptation: -24, studioRisk: 12, canonFaithful: -10 },
      },
      {
        label: "拿知名 IP 來開刀",
        description: "自帶觀眾，也自帶逐格審判團。改一根頭髮都有人寫長文。",
        effects: { adaptation: 32, controversyRisk: 14, commercialEntertainment: 12 },
      },
      {
        label: "冷門原作翻新，趁大家記憶模糊",
        description: "有原型可以借，但改造空間比較大，罵聲也比較晚到。",
        effects: { adaptation: 18, canonFaithful: 6, studioRisk: 8 },
      },
    ],
  },
  {
    id: "canon",
    title: "原作忠實度你要守到什麼程度？",
    appliesTo: "all",
    options: [
      {
        label: "原作就是聖經，不要亂碰",
        description: "角色、世界觀、經典橋段都保住，先把老粉血壓壓下來。",
        effects: { canonFaithful: 34, audienceAcceptance: 12, controversyRisk: -8 },
      },
      {
        label: "精神有到就好，細節可以重寫",
        description: "想讓新觀眾看懂，也願意承受老粉說你不尊重原作。",
        effects: { canonFaithful: -10, issueInsertion: 14, studioRisk: 12 },
      },
      {
        label: "借殼上市，名字留下其他重做",
        description: "IP 當門票，內容直接現代化到像另一部作品。",
        effects: { canonFaithful: -28, controversyRisk: 18, mediaFriendly: 8 },
      },
    ],
  },
  {
    id: "representation",
    title: "多元代表性要推到什麼火力？",
    appliesTo: "all",
    options: [
      {
        label: "自然放進去，不要拿擴音器喊",
        description: "角色先像人，再談身份。觀眾感受到就好。",
        effects: { representation: 18, mediaFriendly: 12, audienceAcceptance: 8 },
      },
      {
        label: "直接打在海報上，這就是賣點",
        description: "宣傳、訪談、角色弧線都明講，反正討論度也是流量。",
        effects: { representation: 34, mediaFriendly: 22, controversyRisk: 18 },
      },
      {
        label: "維持經典配方，別把觀眾嚇跑",
        description: "少碰敏感改動，先保住基本盤和票房安全區。",
        effects: { representation: -16, canonFaithful: 12, mediaFriendly: -6 },
      },
    ],
  },
  {
    id: "gender-power",
    title: "角色權力結構要不要翻桌？",
    appliesTo: "all",
    options: [
      {
        label: "翻，讓以前邊緣的人坐主位",
        description: "誰以前只能當背景板，這次就讓誰推進劇情。",
        effects: { genderPowerShift: 30, issueInsertion: 14, controversyRisk: 14 },
      },
      {
        label: "群像平衡，誰都別太工具人",
        description: "每個角色都有能動性，也都有缺點，不靠口號硬撐。",
        effects: { genderPowerShift: 14, representation: 10, audienceAcceptance: 10 },
      },
      {
        label: "經典配置就好，別自找麻煩",
        description: "類型觀眾想看的東西給足，少開會少炎上。",
        effects: { genderPowerShift: -16, canonFaithful: 14, commercialEntertainment: 8 },
      },
    ],
  },
  {
    id: "issues",
    title: "社會議題要塞多滿？",
    appliesTo: "all",
    options: [
      {
        label: "像調味料，不要倒成火鍋湯底",
        description: "觀眾能感覺到，但不會被按在椅子上聽訓。",
        effects: { issueInsertion: 8, audienceAcceptance: 12, controversyRisk: -10 },
      },
      {
        label: "議題就是角色的命門",
        description: "衝突、選擇、失敗都跟價值觀綁在一起。",
        effects: { issueInsertion: 26, genrePrestige: 14, mediaFriendly: 12 },
      },
      {
        label: "我就明著講，玻璃心自己避雷",
        description: "作品直接站隊，討厭的人會很討厭，喜歡的人會很上頭。",
        effects: { issueInsertion: 38, controversyRisk: 24, mediaFriendly: 16 },
      },
    ],
  },
  {
    id: "entertainment",
    title: "娛樂性要排第幾順位？",
    appliesTo: "all",
    options: [
      {
        label: "第一順位，觀眾不是來受苦的",
        description: "笑點、戰鬥、節奏、高潮都要準時交貨。",
        effects: { commercialEntertainment: 34, audienceAcceptance: 18, genreSpectacle: 14 },
      },
      {
        label: "爽感和主題都要，成年人不做選擇",
        description: "讓議題服務體驗，而不是把體驗壓成簡報。",
        effects: { commercialEntertainment: 18, issueInsertion: 12, audienceAcceptance: 12 },
      },
      {
        label: "不懂的人可以退票，我要作者表達",
        description: "作品可以尖銳、難入口，甚至故意不討好。",
        effects: { commercialEntertainment: -10, genrePrestige: 22, studioRisk: 16 },
      },
    ],
  },
  {
    id: "risk",
    title: "你敢讓評論區燒到什麼程度？",
    appliesTo: "all",
    options: [
      {
        label: "別燒，公關部也想下班",
        description: "避開可預期的文化戰雷點，先求穩再求紅。",
        effects: { controversyRisk: -24, mediaFriendly: 4, audienceAcceptance: 14 },
      },
      {
        label: "可以吵，但不要炸到平台熱搜",
        description: "用爭議換話題，但保留能洗回來的空間。",
        effects: { controversyRisk: 12, mediaFriendly: 10, studioRisk: 8 },
      },
      {
        label: "寧願被罵爆，也不要無聊到沒人記得",
        description: "分裂本身就是辨識度，吵越兇越像宣傳。",
        effects: { controversyRisk: 34, studioRisk: 22, audienceAcceptance: -12 },
      },
    ],
  },
  {
    id: "press",
    title: "媒體友善度你要怎麼操作？",
    appliesTo: "all",
    options: [
      {
        label: "把評論關鍵字都餵到嘴邊",
        description: "讓影評、專欄和社群分析帳號都有標題可以下。",
        effects: { mediaFriendly: 30, representation: 10, issueInsertion: 12 },
      },
      {
        label: "作品自己講話，少賣價值標籤",
        description: "不主打立場，盡量降低行銷時的反感。",
        effects: { mediaFriendly: 6, audienceAcceptance: 10, controversyRisk: -6 },
      },
      {
        label: "反主流操作，越酸越有流量",
        description: "把媒體質疑也變成受眾動員的一部分。",
        effects: { mediaFriendly: -18, controversyRisk: 24, audienceAcceptance: 4 },
      },
    ],
  },
  {
    id: "audience",
    title: "你最想討好哪一群人？",
    appliesTo: "all",
    options: [
      {
        label: "核心粉絲，先別讓他們暴走",
        description: "尊重原作、傳統設定和熟悉的情緒回報。",
        effects: { canonFaithful: 22, audienceAcceptance: 12, representation: -4 },
      },
      {
        label: "新觀眾，老粉看不懂也沒差",
        description: "降低門檻，讓沒補設定的人也能直接入場。",
        effects: { adaptation: 8, mediaFriendly: 10, commercialEntertainment: 14 },
      },
      {
        label: "評論圈與社群話題仔",
        description: "讓作品可以被截圖、解讀、引用、開戰。",
        effects: { mediaFriendly: 18, issueInsertion: 16, controversyRisk: 10 },
      },
    ],
  },
  {
    id: "ending",
    title: "結局要怎麼收？",
    appliesTo: "all",
    options: [
      {
        label: "爽快收尾，大家開心回家",
        description: "希望、和解、勝利，觀眾至少不會走出場罵髒話。",
        effects: { audienceAcceptance: 22, commercialEntertainment: 12, controversyRisk: -8 },
      },
      {
        label: "苦澀反思，讓人回去吵三天",
        description: "不給廉價答案，讓討論延長到散場之後。",
        effects: { genrePrestige: 16, issueInsertion: 14, audienceAcceptance: -6 },
      },
      {
        label: "故意挑釁，期待就是拿來毀的",
        description: "破壞觀眾預期，換取強烈記憶點和兩極評價。",
        effects: { controversyRisk: 18, studioRisk: 12, audienceAcceptance: -14 },
      },
    ],
  },
  {
    id: "marketing",
    title: "宣傳主軸要怎麼喊？",
    appliesTo: "all",
    options: [
      {
        label: "明星、場面、爽片感，少廢話",
        description: "觀眾先看到值回票價，其他等進場再說。",
        effects: { genreSpectacle: 18, commercialEntertainment: 24, mediaFriendly: 6 },
      },
      {
        label: "突破、價值、時代意義，直接拉滿",
        description: "讓作品變成文化事件，而不只是週末娛樂。",
        effects: { representation: 16, issueInsertion: 18, mediaFriendly: 18 },
      },
      {
        label: "原作還原、情懷回收，老粉安心包",
        description: "先告訴大家我們沒有亂改，留言區先降溫。",
        effects: { canonFaithful: 24, adaptation: 12, controversyRisk: -4 },
      },
    ],
  },
  {
    id: "budget",
    title: "預算規格要開多大？",
    appliesTo: "all",
    options: [
      {
        label: "大製作，輸了就是大場面翻車",
        description: "每個選擇都會被放大檢視，燒錢也燒輿論。",
        effects: { genreSpectacle: 24, commercialEntertainment: 18, studioRisk: 14 },
      },
      {
        label: "中型精準打擊，不亂花錢",
        description: "把預算砸在角色、節奏和完成度上。",
        effects: { genrePrestige: 10, audienceAcceptance: 10, studioRisk: -6 },
      },
      {
        label: "低預算實驗，懂的人自然懂",
        description: "風格鮮明，但受眾更窄，出圈全靠命。",
        effects: { genrePrestige: 18, commercialEntertainment: -8, studioRisk: 10 },
      },
    ],
  },
  {
    id: "film-casting",
    title: "你希望主角是哪一種族群定位？",
    subtitle: "這不是在問誰比較高級，而是在問你想把觀眾的第一眼焦點推到哪裡。",
    appliesTo: "film",
    options: [
      {
        label: "白人主角，先保住傳統安全區",
        description: "最不容易被說是在改配方，但也最容易被嫌沒新意。",
        effects: { representation: -12, canonFaithful: 14, controversyRisk: -8, audienceAcceptance: 10 },
      },
      {
        label: "亞裔主角，讓全球市場一起看過來",
        description: "文化辨識度提高，宣傳有新角度，但不能只把人當招牌。",
        effects: { representation: 24, mediaFriendly: 12, commercialEntertainment: 8, controversyRisk: 6 },
      },
      {
        label: "黑人主角，話題和放大鏡一起上桌",
        description: "角色可以很有衝擊力，但觀眾也會立刻檢查你是不是只在換皮。",
        imageSrc: "/characters/snape-race-reference.png",
        imageAlt: "黑人角色造型參考",
        effects: { representation: 30, genderPowerShift: 10, mediaFriendly: 16, controversyRisk: 14 },
      },
      {
        label: "拉丁裔主角，把家庭、街區和跨文化都拉進來",
        description: "很適合做情感和社群連結，但如果寫得扁平會直接變刻板印象。",
        effects: { representation: 26, issueInsertion: 10, mediaFriendly: 10, audienceAcceptance: 6 },
      },
      {
        label: "美國原住民主角，別碰了又不敢講歷史",
        description: "土地、創傷和身份政治會跟著進場，深度高，寫不好也很刺眼。",
        effects: { representation: 34, issueInsertion: 24, genrePrestige: 10, controversyRisk: 16 },
      },
      {
        label: "島國原住民主角，讓世界觀不要只剩西方想像",
        description: "視覺和文化辨識度很強，但需要更多考據，不然會像觀光廣告。",
        effects: { representation: 30, genreSpectacle: 10, mediaFriendly: 12, studioRisk: 10 },
      },
      {
        label: "外星人主角，乾脆避開人類戶籍戰爭",
        description: "用非人類包裝身份寓言，議題可以很尖，但觀眾比較不會第一秒開罵。",
        effects: { representation: 12, issueInsertion: 14, genreSpectacle: 18, controversyRisk: -4, commercialEntertainment: 8 },
      },
    ],
  },
  {
    id: "film-tone",
    title: "影視作品調性要怎麼壓？",
    appliesTo: "film",
    options: [
      {
        label: "輕快喜劇，用笑點掩護議題",
        description: "觀眾笑著吞下去，事後才發現被塞了東西。",
        effects: { commercialEntertainment: 18, audienceAcceptance: 18, controversyRisk: -6 },
      },
      {
        label: "黑暗寫實，讓大家看完很沉默",
        description: "社會寓言、心理壓力、灰色選擇全部加滿。",
        effects: { genrePrestige: 18, issueInsertion: 16, controversyRisk: 10 },
      },
      {
        label: "奇觀冒險，先炸再說",
        description: "把價值討論包進類型爽感裡，觀眾不容易中途跳車。",
        effects: { genreSpectacle: 24, commercialEntertainment: 16, mediaFriendly: 6 },
      },
    ],
  },
  {
    id: "film-awards",
    title: "獎季和評論圈你要跪多少？",
    appliesTo: "film",
    options: [
      {
        label: "很在意，紅毯和得獎感先設計好",
        description: "上映節奏、訪談論述、主題深度都服務獎季。",
        effects: { genrePrestige: 26, mediaFriendly: 24, commercialEntertainment: -4 },
      },
      {
        label: "順其自然，別為了獎杯拍到變形",
        description: "口碑重要，但不讓它支配整部作品。",
        effects: { mediaFriendly: 8, audienceAcceptance: 10, commercialEntertainment: 8 },
      },
      {
        label: "獎項先旁邊，票房和討論度比較香",
        description: "評審不買單也沒差，觀眾有反應才是真的。",
        effects: { commercialEntertainment: 18, controversyRisk: 8, mediaFriendly: -8 },
      },
    ],
  },
  {
    id: "game-business",
    title: "遊戲怎麼收錢才不會被噴爛？",
    appliesTo: "game",
    options: [
      {
        label: "買斷制，給玩家一個乾淨體驗",
        description: "少一點商城味，玩家比較不會覺得自己被當提款機。",
        effects: { monetizationPressure: -26, audienceAcceptance: 18, mediaFriendly: 8 },
      },
      {
        label: "長線服務，玩家每天都要回來打卡",
        description: "更新可以救命，也可以把商業壓力放到最大。",
        effects: { monetizationPressure: 24, commercialEntertainment: 12, controversyRisk: 10 },
      },
      {
        label: "豪華版、造型、通行證，能賺就賺",
        description: "不碰核心平衡，但價格和吃相一定會被拿來講。",
        effects: { monetizationPressure: 12, controversyRisk: 6, audienceAcceptance: -4 },
      },
    ],
  },
  {
    id: "game-freedom",
    title: "玩家自由度要放多開？",
    appliesTo: "game",
    options: [
      {
        label: "自由拉滿，玩家自己負責闖禍",
        description: "讓玩家用自己的選擇消化角色、世界和價值觀。",
        effects: { playerFreedom: 34, audienceAcceptance: 18, controversyRisk: -8 },
      },
      {
        label: "半開放，別讓玩家把劇情玩壞",
        description: "保留選擇，但關鍵情節還是由作者控場。",
        effects: { playerFreedom: 18, storyDriven: 14, commercialEntertainment: 8 },
      },
      {
        label: "線性敘事，玩家坐好聽我講完",
        description: "犧牲自由度，換取強控制和情緒衝擊。",
        effects: { playerFreedom: -24, storyDriven: 30, controversyRisk: 12 },
      },
    ],
  },
  {
    id: "game-story",
    title: "劇情導向要壓過玩法嗎？",
    appliesTo: "game",
    options: [
      {
        label: "劇情才是本體，玩法服務情緒",
        description: "角色命運、主題辯論和玩家胃痛才是重點。",
        effects: { storyDriven: 34, issueInsertion: 16, mediaFriendly: 18 },
      },
      {
        label: "玩法優先，劇情別擋我操作",
        description: "敘事退到背景，系統好玩才是硬道理。",
        effects: { storyDriven: -16, playerFreedom: 18, audienceAcceptance: 12 },
      },
      {
        label: "我全都要，別逼玩家二選一",
        description: "保留敘事重量，也給玩家足夠操作空間。",
        effects: { storyDriven: 18, playerFreedom: 16, commercialEntertainment: 12 },
      },
    ],
  },
  {
    id: "game-character",
    title: "玩家主角要放哪一種族群定位？",
    subtitle: "遊戲會多一層代入問題：玩家不是只看主角，也會問自己能不能把手伸進角色裡。",
    appliesTo: "game",
    options: [
      {
        label: "白人主角，先走經典預設值",
        description: "最像傳統大片主角模板，阻力小，但新鮮感也低。",
        effects: { representation: -12, canonFaithful: 10, controversyRisk: -8, playerFreedom: -4, audienceAcceptance: 8 },
      },
      {
        label: "亞裔主角，讓動作、科幻或都會題材換張臉",
        description: "全球玩家很容易注意到，但角色不能只剩文化符號。",
        effects: { representation: 24, mediaFriendly: 10, playerFreedom: 4, commercialEntertainment: 8 },
      },
      {
        label: "黑人主角，直接把討論度拉到臉上",
        description: "角色辨識度高，社群會看得很仔細，優點和缺點都會被放大。",
        imageSrc: "/characters/snape-race-reference.png",
        imageAlt: "黑人角色造型參考",
        effects: { representation: 30, genderPowerShift: 8, mediaFriendly: 14, controversyRisk: 14 },
      },
      {
        label: "拉丁裔主角，靠家庭、語言和街區感做記憶點",
        description: "很適合開放世界或敘事 RPG，但寫歪就會像貼標籤。",
        effects: { representation: 26, issueInsertion: 10, playerFreedom: 8, audienceAcceptance: 4 },
      },
      {
        label: "美國原住民主角，讓土地和歷史不是背景貼圖",
        description: "議題重量會上升，玩家會期待你真的理解文化脈絡。",
        effects: { representation: 34, issueInsertion: 24, storyDriven: 12, controversyRisk: 16 },
      },
      {
        label: "島國原住民主角，做出少見但很有畫面的世界觀",
        description: "適合奇幻、海洋、冒險和部落政治，但需要更細的文化設計。",
        effects: { representation: 30, genreSpectacle: 12, playerFreedom: 6, studioRisk: 10 },
      },
      {
        label: "外星人主角，讓玩家先別吵人類分類",
        description: "可以把身份衝突抽象化，爭議比較低，但議題也比較容易被稀釋。",
        effects: { representation: 12, issueInsertion: 14, genreSpectacle: 18, controversyRisk: -4, playerFreedom: 10 },
      },
    ],
  },
  {
    id: "game-community",
    title: "玩家社群要怎麼管？",
    appliesTo: "game",
    options: [
      {
        label: "開放 mod 和二創，玩家自己加戲",
        description: "把控制權交出去，作品壽命也可能被玩家救回來。",
        effects: { playerFreedom: 22, audienceAcceptance: 16, mediaFriendly: 4 },
      },
      {
        label: "嚴格控管，不准亂解讀我的作品",
        description: "作者意圖保住了，但玩家反彈也可能一起保住。",
        effects: { storyDriven: 18, controversyRisk: 16, playerFreedom: -10 },
      },
      {
        label: "先上線再補救，用更新慢慢洗評價",
        description: "補丁、DLC、平衡調整全上，能救多少算多少。",
        effects: { audienceAcceptance: 12, mediaFriendly: 8, studioRisk: -4 },
      },
    ],
  },
  {
    id: "film-distribution",
    title: "影視發行策略要怎麼搞？",
    appliesTo: "film",
    options: [
      {
        label: "院線大場面，票房見真章",
        description: "敢上大銀幕就別怕被首週末票房公開處刑。",
        effects: { genreSpectacle: 20, commercialEntertainment: 22, studioRisk: 14 },
      },
      {
        label: "串流直上，先求討論量",
        description: "少一點票房壓力，多一點演算法和社群截圖命運。",
        effects: { mediaFriendly: 16, audienceAcceptance: 8, commercialEntertainment: 8 },
      },
      {
        label: "影展先洗口碑，再慢慢擴散",
        description: "先拿評論圈背書，再看普通觀眾買不買單。",
        effects: { genrePrestige: 24, mediaFriendly: 20, commercialEntertainment: -6 },
      },
    ],
  },
  {
    id: "film-script-focus",
    title: "劇本重心要壓在哪裡？",
    appliesTo: "film",
    options: [
      {
        label: "角色弧線，讓觀眾跟著崩潰",
        description: "把人物寫厚，讓爭議不是只有標籤，而是真的有戲。",
        effects: { storyDriven: 22, genrePrestige: 16, audienceAcceptance: 10 },
      },
      {
        label: "台詞金句，準備被剪成短影音",
        description: "每十分鐘都要有一句能上社群的話。",
        effects: { mediaFriendly: 18, issueInsertion: 14, controversyRisk: 8 },
      },
      {
        label: "橋段優先，劇情合理性先放旁邊",
        description: "觀眾爽到就好，細想會出事那是二刷的問題。",
        effects: { commercialEntertainment: 24, genreSpectacle: 18, genrePrestige: -8 },
      },
    ],
  },
  {
    id: "film-franchise",
    title: "如果是系列作品，你敢重啟到什麼程度？",
    appliesTo: "film",
    options: [
      {
        label: "安全續作，大家熟悉的再來一份",
        description: "不求革命，只求不要把招牌砸在自己手上。",
        effects: { canonFaithful: 24, audienceAcceptance: 16, controversyRisk: -8 },
      },
      {
        label: "重啟換血，舊粉新粉一起下注",
        description: "角色、視角、主題都更新，成功就是新生命，失敗就是大型公審。",
        effects: { adaptation: 22, representation: 18, controversyRisk: 18 },
      },
      {
        label: "解構經典，直接拆掉童年回憶",
        description: "把英雄神話拿來質疑，老粉可能當場破防。",
        effects: { canonFaithful: -24, issueInsertion: 22, audienceAcceptance: -10, mediaFriendly: 16 },
      },
    ],
  },
  {
    id: "film-visual",
    title: "影像風格要往哪裡衝？",
    appliesTo: "film",
    options: [
      {
        label: "實拍質感，少一點塑膠味",
        description: "讓觀眾覺得錢真的花在畫面上，不是全丟進後製黑洞。",
        effects: { genreSpectacle: 18, audienceAcceptance: 14, mediaFriendly: 8 },
      },
      {
        label: "流行視覺，截圖就要能當桌布",
        description: "色彩、造型、鏡頭都要有社群辨識度。",
        effects: { commercialEntertainment: 18, mediaFriendly: 18, representation: 8 },
      },
      {
        label: "作者風格，普通觀眾看不懂也正常",
        description: "構圖和節奏服務表達，不服務爆米花。",
        effects: { genrePrestige: 24, commercialEntertainment: -10, studioRisk: 12 },
      },
    ],
  },
  {
    id: "game-difficulty",
    title: "遊戲難度要怎麼折磨玩家？",
    appliesTo: "game",
    options: [
      {
        label: "硬派到底，菜就多練",
        description: "挫折感也是體驗的一部分，過不了不是系統的錯。",
        effects: { playerFreedom: 12, audienceAcceptance: -4, controversyRisk: 12, genrePrestige: 14 },
      },
      {
        label: "多難度選項，別把玩家趕走",
        description: "想挑戰的人自己開，想看故事的人也別被卡死。",
        effects: { audienceAcceptance: 18, mediaFriendly: 10, playerFreedom: 12 },
      },
      {
        label: "劇情模式開好開滿，先讓大家破關",
        description: "門檻降低，討論度提高，但硬派玩家可能嫌沒骨氣。",
        effects: { storyDriven: 18, representation: 8, controversyRisk: 8 },
      },
    ],
  },
  {
    id: "game-liveops",
    title: "上線後你要怎麼養這款遊戲？",
    appliesTo: "game",
    options: [
      {
        label: "完整成品上市，不靠補丁求原諒",
        description: "上市當天就該能玩，不要把玩家當免費 QA。",
        effects: { audienceAcceptance: 22, controversyRisk: -14, monetizationPressure: -10 },
      },
      {
        label: "賽季更新拉滿，玩家別想畢業",
        description: "內容源源不絕，但日課、通行證和疲勞感也會一起來。",
        effects: { monetizationPressure: 22, commercialEntertainment: 16, controversyRisk: 12 },
      },
      {
        label: "先上再修，口碑用更新慢慢洗",
        description: "開局可能被噴，但只要修得夠久，還有機會逆轉評價。",
        effects: { studioRisk: 18, mediaFriendly: 8, audienceAcceptance: -6, controversyRisk: 18 },
      },
    ],
  },
];

const optionMatchTags: Record<string, Array<Partial<Record<MatchTag, number>>>> = {
  genre: [
    { spectacle: 34, mainstreamEntertainment: 30 },
    { prestige: 34, awardSeason: 26, authorDriven: 18 },
    { canonLoyal: 28, franchiseSafe: 24, famousIp: 16 },
  ],
  adaptation: [
    { originalWork: 34, authorDriven: 16 },
    { famousIp: 36, cultureWar: 12 },
    { legacyReboot: 28, canonRewrite: 16 },
  ],
  canon: [
    { canonLoyal: 38, franchiseSafe: 28, traditionalAudience: 16 },
    { canonRewrite: 28, naturalRepresentation: 14 },
    { deconstruction: 36, canonRewrite: 22, cultureWar: 12 },
  ],
  representation: [
    { naturalRepresentation: 30, mediaFriendly: 12 },
    { representationForward: 40, mediaFriendly: 18, cultureWar: 10 },
    { traditionalAudience: 34, canonLoyal: 14 },
  ],
  "gender-power": [
    { genderPowerShift: 38, representationForward: 16 },
    { naturalRepresentation: 28, crowdPleaser: 12 },
    { traditionalAudience: 28, franchiseSafe: 14 },
  ],
  issues: [
    { issueLight: 34, lowControversy: 18 },
    { issueHeavy: 30, prestige: 12 },
    { issueHeavy: 42, cultureWar: 20, mediaFriendly: 12 },
  ],
  entertainment: [
    { mainstreamEntertainment: 40, crowdPleaser: 22, spectacle: 14 },
    { mainstreamEntertainment: 24, issueHeavy: 14 },
    { authorDriven: 36, prestige: 22 },
  ],
  risk: [
    { lowControversy: 38, crowdPleaser: 18 },
    { mediaFriendly: 20, audienceSplit: 10 },
    { cultureWar: 42, audienceSplit: 26, authorDriven: 12 },
  ],
  press: [
    { mediaFriendly: 38, issueHeavy: 16 },
    { lowControversy: 22, crowdPleaser: 14 },
    { antiMedia: 32, cultureWar: 18 },
  ],
  audience: [
    { canonLoyal: 32, traditionalAudience: 20 },
    { mainstreamEntertainment: 26, crowdPleaser: 18 },
    { mediaFriendly: 28, issueHeavy: 16, audienceSplit: 10 },
  ],
  ending: [
    { crowdPleaser: 34, mainstreamEntertainment: 16 },
    { prestige: 24, issueHeavy: 18, authorDriven: 12 },
    { deconstruction: 30, audienceSplit: 22, cultureWar: 12 },
  ],
  marketing: [
    { theatricalEvent: 30, spectacle: 22, mainstreamEntertainment: 20 },
    { representationForward: 24, issueHeavy: 22, mediaFriendly: 18 },
    { canonLoyal: 32, franchiseSafe: 22 },
  ],
  budget: [
    { theatricalEvent: 26, spectacle: 24 },
    { crowdPleaser: 20, lowControversy: 16 },
    { authorDriven: 30, prestige: 20 },
  ],
  "film-casting": [
    { canonLoyal: 24, franchiseSafe: 18, traditionalAudience: 14 },
    { representationForward: 30, mediaFriendly: 14, mainstreamEntertainment: 8 },
    { representationForward: 34, cultureWar: 16, mediaFriendly: 14 },
    { representationForward: 30, crowdPleaser: 10, mediaFriendly: 10 },
    { representationForward: 36, issueHeavy: 22, prestige: 10 },
    { representationForward: 32, visualStyle: 18, spectacle: 10 },
    { spectacle: 24, issueHeavy: 12, lowControversy: 8 },
  ],
  "film-tone": [
    { crowdPleaser: 28, mainstreamEntertainment: 20 },
    { authorDriven: 28, prestige: 18, issueHeavy: 14 },
    { spectacle: 30, theatricalEvent: 18 },
  ],
  "film-awards": [
    { awardSeason: 40, prestige: 28, mediaFriendly: 18 },
    { crowdPleaser: 20, lowControversy: 12 },
    { theatricalEvent: 24, mainstreamEntertainment: 24, antiMedia: 8 },
  ],
  "film-distribution": [
    { theatricalEvent: 38, spectacle: 22 },
    { streamingFriendly: 34, mediaFriendly: 16 },
    { awardSeason: 36, prestige: 24 },
  ],
  "film-script-focus": [
    { storyDriven: 22, prestige: 18 },
    { mediaFriendly: 24, issueHeavy: 16 },
    { mainstreamEntertainment: 26, spectacle: 16 },
  ],
  "film-franchise": [
    { franchiseSafe: 34, canonLoyal: 28 },
    { legacyReboot: 36, representationForward: 14, audienceSplit: 10 },
    { deconstruction: 38, canonRewrite: 24, cultureWar: 16 },
  ],
  "film-visual": [
    { theatricalEvent: 22, spectacle: 18 },
    { visualStyle: 34, mediaFriendly: 18 },
    { authorDriven: 32, prestige: 22 },
  ],
  "game-business": [
    { premiumComplete: 40, lowControversy: 16 },
    { liveService: 38, monetizationHeavy: 24 },
    { monetizationHeavy: 34, audienceSplit: 12 },
  ],
  "game-freedom": [
    { playerFreedom: 42, communityDriven: 12 },
    { playerFreedom: 22, storyDriven: 14 },
    { linearStory: 38, storyDriven: 24 },
  ],
  "game-story": [
    { storyDriven: 40, linearStory: 18, issueHeavy: 14 },
    { playerFreedom: 26, mainstreamEntertainment: 16 },
    { storyDriven: 24, playerFreedom: 20 },
  ],
  "game-character": [
    { canonLoyal: 22, franchiseSafe: 14, traditionalAudience: 12 },
    { representationForward: 28, mediaFriendly: 12, mainstreamEntertainment: 8 },
    { representationForward: 32, cultureWar: 16, mediaFriendly: 12 },
    { representationForward: 28, playerFreedom: 10, crowdPleaser: 8 },
    { representationForward: 36, issueHeavy: 22, storyDriven: 12 },
    { representationForward: 30, visualStyle: 18, playerFreedom: 10 },
    { spectacle: 24, playerFreedom: 14, lowControversy: 8 },
  ],
  "game-community": [
    { communityDriven: 34, playerFreedom: 18 },
    { linearStory: 22, authorDriven: 16, cultureWar: 10 },
    { patchRedemption: 34, liveService: 14 },
  ],
  "game-difficulty": [
    { hardcore: 38, prestige: 14 },
    { casualFriendly: 34, crowdPleaser: 16 },
    { casualFriendly: 28, storyDriven: 18 },
  ],
  "game-liveops": [
    { premiumComplete: 38, lowControversy: 16 },
    { liveService: 40, monetizationHeavy: 22 },
    { patchRedemption: 40, audienceSplit: 14 },
  ],
};

const centerEffects = (question: Question, optionEffects: Partial<Record<TagKey, number>>) => {
  const totals = new Map<TagKey, number>();

  for (const option of question.options) {
    for (const [key, value] of Object.entries(option.effects) as [TagKey, number][]) {
      totals.set(key, (totals.get(key) ?? 0) + value);
    }
  }

  return Object.fromEntries(
    [...totals.keys()].map((key) => {
      const average = (totals.get(key) ?? 0) / question.options.length;
      const value = optionEffects[key] ?? 0;
      return [key, Math.round((value - average) * 0.9)];
    }),
  ) as Partial<Record<TagKey, number>>;
};

export const questions: Question[] = baseQuestions.map((question) => ({
  ...question,
  options: question.options.map((option, index) => ({
    ...option,
    effects: centerEffects(question, option.effects),
    matchTags: optionMatchTags[question.id]?.[index],
  })),
}));
