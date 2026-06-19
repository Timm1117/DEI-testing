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

const getLocalizedSynopsis = (work: Work, lang?: "zh" | "en") => {
  if (lang !== "en") return work.synopsis;

  const synopsisMap: Record<string, string> = {
    "barbie": "High-concept commercial entertainment wrapping gender politics, driving media buzz and audience discussions to explode simultaneously.",
    "little-mermaid-2023": "Live-action adaptation of the classic fairy tale, where representation casting, nostalgic expectations, and canon fidelity clash intensely.",
    "joker": "Character study comic book adaptation, where social discontent and anxiety of violence lead to high-intensity polarization of word of mouth.",
    "everything-everywhere": "A fusion of immigrant family dynamics, generational conflict, and genre spectacle, capturing both awards acclaim and audience empathy.",
    "top-gun-maverick": "A highly entertaining, low-issue star sequel, achieving broad approval through technical spectacle and nostalgia.",
    "black-panther": "Combining high representation with mainstream superhero entertainment, proving cultural impact, media favorability, and box office success can coexist.",
    "ghostbusters-2016": "A classic IP rebooted with a gender-swapped cast, where the representation discourse overshadowed the work itself, dividing the audience.",
    "dune-2021": "An adaptation of the classic sci-fi novel, establishing high media appeal with its epic scale and political allegory.",
    "dune-part-two": "A massive sci-fi sequel blending authorial vision with commercial appeal, keeping issue pressure low but offering deep text interpretation space.",
    "wonder-woman": "A female hero narrative integrated into the mainstream superhero framework, balancing representation and genre entertainment.",
    "captain-marvel": "A female-led superhero blockbuster intersecting with promotional discourse, resulting in critic favorability but divided audience responses.",
    "the-marvels": "A female-ensemble superhero sequel meeting superhero fatigue, where representation no longer offsets commercial and review pressures.",
    "mulan-2020": "Live-action adaptation of the classic animation, where cultural representation, canon changes, and political controversy affect reviews.",
    "lightyear": "A Toy Story spin-off struggling to balance positioning, representative scenes, and fan expectations.",
    "star-wars-last-jedi": "A classic IP boldly rewriting its hero mythos, earning high critical praise but deeply polarizing the fan community.",
    "matrix-resurrections": "A meta-return to the classic sci-fi IP, showcasing strong authorial voice but limited commercial appeal and audience acceptance.",
    "oppenheimer": "A historical biography combined with an auteur blockbuster, with high topicality but cultural pressure concentrated on historical ethics.",
    "parasite": "A brilliant fusion of class allegory and dark genre film, with strong issue resonance but extremely high audience approval.",
    "get-out": "Blending racial allegory with the horror genre, embedding deep social issues supported by strong entertainment and auteur style.",
    "blackkklansman": "An adaptation of historical events with clear political allegory, enjoying high media favorability and distinct issue stances.",
    "crazy-rich-asians": "Combining Asian representation with romantic comedy formula, where cultural significance and mass entertainment mutually support each other.",
    "the-woman-king": "A historical action film about female warriors, where representation and historical accuracy debates coexist alongside clear action appeal.",
    "nomadland": "Social marginalization and labor struggles packaged into a poetic auteur film, highly appealing to critics but with low commercial entertainment.",
    "avatar-way-of-water": "Combining visual spectacle and environmental allegory, presenting low culture-war risk and high commercial entertainment.",
    "mad-max-fury-road": "Blending post-apocalyptic action spectacle with female rebellion narrative, proving commercial entertainment and auteur style can thrive together.",
    "bros": "An LGBTQ+ romantic comedy using representation as its core selling point, showing a stark contrast between critical praise and box office performance.",
    "promising-young-woman": "A revenge thriller tightly bound to gender issues, highly friendly to media but with moderate-to-high audience division.",
    "turning-red": "A coming-of-age story blending Asian family dynamics and female puberty experience, naturally integrating representation amidst diverse reviews.",
    "encanto": "A Disney musical merging Latin culture, family trauma, and representation with broad commercial entertainment appeal.",
    "poor-things": "A high-concept integration of female subjectivity, bizarre aesthetics, and auteur style, loved by critics but with a high entry barrier for general audiences.",
    "sound-of-freedom": "A social issue film tightly bound with political mobilization, showing an extreme gap between critic and audience ratings.",
    "spider-verse": "A grand fusion of multiverse sci-fi, ethnic representation, and animation experimentation, receiving unanimous critical and audience support.",
    "anora": "A modern romance interweaving sex work, class divide, and marital illusions, with strong awards prestige but adult theme controversy.",
    "the-whale": "An exploration of body image, shame, family trauma, and redemption, highly praised for performance but controversial in presentation.",
    "the-northman": "A Norse revenge epic centered on violence, mythology, and male power structures, displaying a strong auteur style.",
    "furiosa": "A prequel centered on a female protagonist's revenge and post-apocalyptic action spectacle, earning high acclaim but under commercial pressure.",
    "dont-look-up": "A climate allegory filled with media absurdity and political satire, highly topical but polarizing to critics.",
    "civil-war": "Combining political violence with a photojournalist perspective, utilizing near-future civil war imagination to amplify contemporary anxieties.",
    "birds-of-prey": "A female anti-hero ensemble comic book adaptation, featuring distinct style but moderate commercial acceptance.",
    "killers-of-flower-moon": "A Native American historical trauma crime epic combined with auteur filmmaking, highly praised by critics but with a high viewing threshold.",
    "wicked": "A musical adaptation retelling a classic villain story with themes of female friendship, power, and prejudice, achieving commercial and critical success.",
    "inside-out-2": "A coming-of-age exploration blending adolescent anxiety and emotional personification, packaging mental health issues into accessible family entertainment.",
    "the-batman": "A noir detective reboot of the superhero IP, repackaging the classic character with a corrupt city and somber tone.",
    "shang-chi": "An Asian superhero martial arts story entering the mainstream Marvel universe, balancing representation and commercial entertainment.",
    
    // Games
    "last-of-us-part-ii": "An emotional narrative masterpiece focusing on trauma, revenge, and perspective-shifting, causing immense discussion and community polarization.",
    "black-myth-wukong": "An action RPG based on Chinese mythology, combining spectacular boss fights and high gameplay polish, achieving global commercial and cultural success.",
    "dustborn": "A story-driven action-adventure about hope, love, and the power of words, featuring diverse representation and generating intense cultural discussions.",
    "hogwarts-legacy": "An open-world action RPG set in the Wizarding World, delivering the ultimate fan fantasy but facing external cultural debate.",
    "baldurs-gate-3": "A masterpiece of role-playing freedom, offering deep narrative choices, diverse companion relationships, and outstanding tactical combat.",
    "helldivers-2": "A high-intensity co-op shooter focused on galactic war, satirical humor, and community coordination, becoming a massive surprise hit.",
    "cyberpunk-2077": "A futuristic open-world action RPG that overcame a controversial launch through relentless technical updates and a highly praised anime expansion.",
    "starfield": "A massive space exploration RPG from Bethesda, offering extensive planetary travel but polarizing players with its pacing and navigation mechanics.",
    "dragon-age-veilguard": "A companion-focused action RPG in the classic fantasy franchise, featuring modern action combat and high DEI representation but dividing long-time series fans.",
    "assassins-creed-shadows": "An action-adventure set in feudal Japan, featuring dual protagonists and stealth gameplay, but sparking intense cultural discussions prior to release.",
    "disco-elysium": "A revolutionary narrative RPG focusing on a troubled detective, delivering peerless dialogue, political commentary, and psychological depth.",
    "elden-ring": "An epoch-making open-world action RPG combining dark fantasy mythos and challenging combat, earning universal critical and player acclaim.",
    "god-of-war": "A cinematic action-adventure reimagining the iconic Kratos in Norse mythology, focusing on fatherhood and high-impact combat.",
    "control": "A supernatural third-person action-adventure set in a shifting government facility, praised for its atmospheric design and mind-bending lore.",
    "death-stranding": "An innovative open-world adventure focusing on connection, isolation, and courier travel mechanics, presenting a unique auteur signature.",
    "tales-of-kenzera-zau": "A metroidvania inspired by Bantu mythology, exploring grief and family legacy, backed by clean combat and vibrant art design.",
    "resist-1000x": "A deeply moving narrative sci-fi adventure exploring cloning, authority, and identity, praised for its outstanding voice acting and writing."
  };

  const id = work.id;
  if (synopsisMap[id]) return synopsisMap[id];

  const isFilm = work.type === "film";
  const typeStr = isFilm ? "production" : "game";
  const representationStr = work.politicalIndex.representation >= 75 ? "significant diversity and representation" : "classic narrative elements";
  const entertainmentStr = work.tags.commercialEntertainment >= 75 ? "high commercial entertainment value" : "focused artistic design";
  const controversyStr = work.politicalIndex.controversyRisk >= 75 ? "substantial public discussion and debate" : "stable community reception";

  return `A high-quality ${typeStr} that balances ${representationStr} with ${entertainmentStr}, resulting in a ${controversyStr} across mainstream channels.`;
};

const translateComment = (comment: string, titleZh: string, titleEn: string, lang: "zh" | "en" = "zh") => {
  if (lang !== "en") return comment;

  const quoteTranslationMap: Record<string, string> = {
    "這段旅程值得親自走完。": "This journey is worth completing yourself.",
    "幸好當年沒有先被劇透。": "Glad I wasn't spoiled back then.",
    "技術與敘事都很驚人。": "Both technology and narrative are amazing.",
    "復仇很糟，但這故事很有力。": "The revenge is messy, but the story is powerful.",
    "動作玩家可以直接入手。": "Action players can buy it directly.",
    "接受猴王，享受戰鬥。": "Embrace the Monkey King and enjoy the battle.",
    "美術、Boss 與手感都做到了。": "Art, bosses, and combat feel are all top tier.",
    "打起來真的很爽快。": "The combat is truly satisfying.",
    "我原本想公平看待它。": "I originally wanted to treat it fairly.",
    "玩起來像被數位折磨。": "Playing it feels like digital torture.",
    "角色讓人感覺很情緒勒索。": "Characters feel very emotionally manipulative.",
    "政治評論太重手了。": "Political commentary is too heavy-handed.",
    "這就是哈利波特粉的夢想成真。": "This is a dream come true for Harry Potter fans.",
    "後期很快變得重複又空洞。": "The late game quickly gets repetitive and empty.",
    "這是系列改編遊戲裡最好的之一。": "This is one of the best franchise adaptation games.",
    "主線慢慢玩會更有味道。": "Playing the main story slowly makes it much better.",
    "這可能是我玩過最好的遊戲。": "This might be the best game I've ever played.",
    "世界很豐富，選擇也像無限多。": "The world is rich, and choices feel endless.",
    "每一秒都玩得很享受。": "Enjoyed every single second playing it.",
    "光是捏角我都願意再玩一次。": "I'd play it again just for the character creation.",
    "這就是我想要的合作射擊。": "This is exactly the co-op shooter I wanted.",
    "為了民主，衝就對了。": "For democracy, just dive in!",
    "大家一起完成同一個目標很有感。": "Working together towards a single goal feels great.",
    "爽是爽，但電腦也真的會燒。": "It's fun, but it will literally melt your PC.",
    "它終於變成一款好遊戲了。": "It has finally become a good game.",
    "修了很多，但還是有不少 Bug。": "Fixed a lot, but there are still quite a few bugs.",
    "有時候像在玩過場動畫模擬器。": "Sometimes it feels like playing a cutscene simulator.",
    "從笑話慢慢修成佳作。": "Slowly polished from a joke into a masterpiece.",
    "這遊戲真的很無聊。": "This game is truly boring.",
    "每個星球都像同一棟建築複製貼上。": "Every planet feels like the same building copy-pasted.",
    "他們到底在想什麼？": "What on earth were they thinking?",
    "比較像是等大型模組來救。": "Feels more like waiting for massive mods to save it.",
    "它不像一款好的闇龍紀元。": "It doesn't feel like a good Dragon Age.",
    "老粉會覺得它背叛了系列。": "Old fans will feel it betrayed the franchise.",
    "最大問題是劇本寫作。": "The biggest issue is the writing.",
    "有些對白像在聽公司簡報。": "Some dialogues feel like listening to a corporate presentation.",
    "玩法老樣子，故事也偏無聊。": "Gameplay is the same old thing, and the story is boring.",
    "第一章後就開始變無聊。": "It starts getting boring after chapter one.",
    "這是我玩過最好的遊戲之一。": "This is one of the best games I've ever played.",
    "全是對話，但我完全不覺得無聊。": "It's all dialogue, but I didn't find it boring at all.",
    "這就是神作，直接買。": "This is a masterpiece, buy it immediately.",
    "幾乎就是傑作等級。": "It's almost at the masterpiece level.",
    "最可惜的是第一次體驗只能有一次。": "The biggest pity is you can only experience it for the first time once.",
    "視覺表現就是一場超自然美術展。": "Visual presentation is like a supernatural art exhibition.",
    "槍戰手感沒有世界觀那麼驚豔。": "Gunplay feel isn't as striking as the worldbuilding.",
    "配音表現也非常出色。": "The voice acting is also outstanding.",
    "玩它是我最近最好的決定。": "Playing it is the best decision I've made recently."
  };

  if (quoteTranslationMap[comment]) {
    return quoteTranslationMap[comment];
  }

  let res = comment;
  const quotedTitleZh = `《${titleZh}》`;
  res = res.replaceAll(quotedTitleZh, titleEn);
  res = res.replaceAll(titleZh, titleEn);

  res = res
    .replaceAll("一上桌就知道留言區會開戰。", ": You just know the comments section will be a battlefield.")
    .replaceAll("喜歡的人很買單，不喜歡的人也很有話講。", ": Those who like it love it, and those who don't have a lot to say.")
    .replaceAll("吵點不多，大家比較在看作品本身硬不硬。", ": Not many arguments; people mostly focus on the raw quality of the work itself.")
    .replaceAll("完成度夠高，很多批評會被作品本身壓過去。", "'s high polish overshadows most of the criticism.")
    .replaceAll("企圖心有，但不是每個觀眾都願意買單。", " has ambition, but not every audience member is willing to buy into it.")
    .replaceAll("最怕不是沒人看，是看完直接分兩派。", "'s biggest risk isn't low views, but dividing the audience into two camps.")
    .replaceAll("評價算集中，喜不喜歡多半看個人口味。", "'s reviews are fairly consolidated; liking it mostly comes down to personal taste.")
    .replaceAll("的代表性很明顯，重點是有沒有寫進角色骨頭裡。", "'s representation is obvious; the key is whether it's written into the core of the characters.")
    .replaceAll("低 DEI 不等於沒內容，重點還是好不好玩、好不好看。", ": Low DEI doesn't mean no substance; it's still about whether it's fun or well-made.")
    .replaceAll("有代表性，但沒有完全壓過主線。", " has representation, but it doesn't completely overshadow the main plot.")
    .replaceAll("議題感很重，吃得下會覺得有深度，吃不下會覺得在上課。", " is issue-heavy; if you dig it, it has depth; if not, it feels like a lecture.")
    .replaceAll("沒有一直把議題塞到你臉上，節奏舒服很多。", " doesn't keep shoving issues in your face; the pacing is much more comfortable.")
    .replaceAll("原作粉應該比較能呼吸，至少沒有亂拆祖墳。", ": Fans of the original can breathe easy; at least it didn't desecrate the franchise.")
    .replaceAll("改很大，老粉先深呼吸，不然很容易爆血壓。", ": Massive changes; core fans should take a deep breath to avoid high blood pressure.")
    .replaceAll("改編沒有太保守，也沒有完全失控。", "'s adaptation is neither too conservative nor completely out of control.")
    .replaceAll("評分高不是沒理由，至少核心體驗撐得住。", ": There's a reason for high ratings; at least the core experience holds up.")
    .replaceAll("評分沒到神作，但討論度確實有留下來。", " isn't a masterpiece in ratings, but it definitely left a lasting discussion.")
    .replaceAll("場面跟美術有撐起記憶點。", "'s spectacle and art design carry the memorable moments.")
    .replaceAll("不是靠場面硬砸，重點比較偏體驗細節。", " doesn't rely on spectacle; the focus is more on experience details.")
    .replaceAll("自由度夠，玩家會覺得這是自己的故事。", "'s high freedom makes players feel it's their own story.")
    .replaceAll("比較吃設計師安排，玩家自由度不是主菜。", " is heavily guided by the designer's script; player freedom isn't the main dish.")
    .replaceAll("劇情導向很強，角色寫壞就全盤崩。", "'s story-driven focus is strong; if characters are poorly written, it all falls apart.")
    .replaceAll("劇情不是唯一重點，手感和循環更關鍵。", "'s story isn't the only focus; gameplay feel and loop are more critical.")
    .replaceAll("商業模式如果太貪，Steam 評論一定炸。", ": If the business model is too greedy, Steam reviews will definitely blow up.")
    .replaceAll("沒有被課金壓著打，玩家比較願意談內容。", ": Free from monetization pressure, players are more willing to discuss the content.")
    .replaceAll("最大風險是上市狀態，Bug 和最佳化會直接扣分。", "'s biggest risk is launch state; bugs and optimization issues will hurt scores.")
    .replaceAll("技術面穩住的話，討論就會回到玩法。", ": If technical issues are settled, the discussion will return to gameplay.")
    .replaceAll("夠硬派，愛的人會說神，退坑的人會說折磨。", " is hardcore; lovers call it a masterpiece, quitters call it torture.")
    .replaceAll("門檻比較友善，擴散力會比硬核作品高。", "'s barrier to entry is friendly; its reach will be wider than hardcore games.")
    .replaceAll("的玩家心聲其實很簡單：好玩就護航，不好玩就開噴。", ": The players' voice is simple: defend if it's fun, trash if it's not.")
    .replaceAll("如果核心循環成立，缺點玩家真的會忍比較久。", ": If the core loop works, players will tolerate flaws for much longer.")
    .replaceAll("能不能留住玩家，最後還是看第二輪想不想開。", ": Whether it retains players ultimately depends on replayability.")
    .replaceAll("很吃影評語境，影展和獎季會幫它加分。", " relies on critic context; film festivals and awards seasons will help it.")
    .replaceAll("比較吃觀眾爽感，不是只拍給評審看。", " leans on audience satisfaction; it's not just made for film juries.")
    .replaceAll("大銀幕有說服力，網路吵架會少一點。", " has presence on the big screen; online bickering will be a bit less.")
    .replaceAll("場面不是主菜，角色和節奏更不能掉。", ": Spectacle isn't the main course; characters and pacing are crucial.")
    .replaceAll("娛樂性夠強，觀眾其實不太在乎標籤。", " is highly entertaining; the audience doesn't really care about labels.")
    .replaceAll("娛樂性不夠時，立意再好也會被嫌悶。", ": If entertainment is lacking, no matter how noble the intent, it feels boring.")
    .replaceAll("改編最怕不是變新，是變得不像它自己。", "'s biggest risk in adapting is not novelty, but losing its own identity.")
    .replaceAll("原創題材自由，但也更吃劇本本事。", ": Original themes offer freedom, but they rely more on writing talent.")
    .replaceAll("媒體會稱讚它勇敢，但觀眾還是會問好不好看。", ": Critics praise its bravery, but audiences still ask if it's good.")
    .replaceAll("不一定討影評喜歡，但可能更接近大眾口味。", " might not please critics, but it is closer to mainstream tastes.")
    .replaceAll("角色站得住，議題才不會像貼紙。", ": Only when characters stand strong do issues not feel like pasted labels.")
    .replaceAll("節奏一拖，立意再好都會被嫌說教。", ": If the pacing drags, even the best intentions will be called preachy.")
    .replaceAll("演員有撐住，很多爭議會先被表演蓋過去。", ": If the cast holds up, many controversies will be covered by performance.")
    .replaceAll("票房觀眾要的是爽感，影評要的是餘韻。", ": Box office audiences want thrills; critics want resonance.");

  return res;
};

const buildTraitTags = (work: Work, lang: "zh" | "en" = "zh") => {
  const isEn = lang === "en";
  const tags = [
    work.type === "film" 
      ? (isEn ? "Film / Series" : "影視作品") 
      : (isEn ? "Game" : "遊戲作品"),
    work.tags.commercialEntertainment >= 80 
      ? (isEn ? "High Commercial Value" : "商業娛樂性高") : null,
    work.tags.genrePrestige >= 80 
      ? (isEn ? "Prestige / Critic Appeal" : "評論口碑型") : null,
    work.tags.genreSpectacle >= 80 
      ? (isEn ? "Spectacle-Driven" : "奇觀導向") : null,
    work.tags.adaptation >= 70 
      ? (isEn ? "IP / Adaptation" : "IP / 原作改編") 
      : (isEn ? "Original IP" : "原創傾向"),
    work.tags.canonFaithful >= 75 
      ? (isEn ? "Canon Faithful" : "原作忠實") : null,
    work.tags.canonFaithful <= 40 
      ? (isEn ? "Heavy Adaptation / Deconstruction" : "大幅改編") : null,
    work.tags.representation >= 75 
      ? (isEn ? "High DEI Representation" : "高 DEI 代表性") : null,
    work.tags.representation <= 35 && work.tags.issueInsertion <= 35 
      ? (isEn ? "Low DEI Baseline" : "低 DEI 對照") : null,
    work.tags.issueInsertion >= 75 
      ? (isEn ? "Issue-Heavy Narrative" : "議題濃度高") : null,
    work.tags.controversyRisk >= 75 
      ? (isEn ? "High Controversy Risk" : "高爭議風險") : null,
    work.tags.mediaFriendly >= 80 
      ? (isEn ? "Media / Critic Friendly" : "媒體友善") : null,
    work.tags.audienceAcceptance >= 80 
      ? (isEn ? "High Audience/Player Approval" : "觀眾接受度高") : null,
    work.tags.playerFreedom >= 80 
      ? (isEn ? "High Player Freedom" : "高玩家自由度") : null,
    work.tags.storyDriven >= 80 
      ? (isEn ? "Story-Driven" : "劇情導向") : null,
    work.tags.monetizationPressure >= 50 
      ? (isEn ? "High Monetization Pressure" : "營運壓力高") : null,
  ].filter(Boolean);

  return Array.from(new Set(tags)).slice(0, 12) as string[];
};

const buildReceptionInsight = (work: Work, lang: "zh" | "en" = "zh") => {
  const pcPressure =
    (work.politicalIndex.representation +
      work.politicalIndex.adaptationFreedom +
      work.politicalIndex.issueInsertion +
      work.politicalIndex.controversyRisk +
      work.politicalIndex.audienceSplit +
      (100 - work.politicalIndex.canonFaithful)) /
    6;

  const isEn = lang === "en";

  if (work.tags.audienceAcceptance >= 80 && pcPressure < 45) {
    return isEn
      ? "These works usually succeed via high polish, genre satisfaction, or gameplay experience; PC elements are not the primary battlefield of reviews."
      : "這類作品通常靠完成度、類型爽感或玩家體驗取勝，政治正確因素不是主要評價戰場。";
  }

  if (work.tags.audienceAcceptance >= 80 && work.politicalIndex.representation >= 75) {
    return isEn
      ? "Representation elements did not drag down reviews, as the work successfully maintained entertainment, character roles, or gameplay completion."
      : "這類作品的代表性沒有拖累評價，因為它同時維持了娛樂性、角色功能或玩法完成度。";
  }

  if (work.politicalIndex.audienceSplit >= 75 && work.politicalIndex.controversyRisk >= 75) {
    return isEn
      ? "These works easily fall into culture war frameworks. If adaptation fidelity or entertainment value is lacking, audience backlash escalates rapidly."
      : "這類作品容易被放進文化戰框架。若原作忠實度或娛樂性不足，觀眾反感會快速放大。";
  }

  if (work.tags.storyDriven >= 80 && work.tags.playerFreedom <= 40) {
    return isEn
      ? "With strong narrative control by the creator, critics may appreciate the themes, but players/audiences care more about whether they are forced to accept characters' fates."
      : "這類作品由作者強力控制敘事，媒體可能欣賞主題，但玩家或觀眾會更在意是否被迫接受角色命運。";
  }

  if (work.tags.playerFreedom >= 80 && work.politicalIndex.issueInsertion >= 70) {
    return isEn
      ? "Even with high issue density, player freedom allows players to process perspectives on their own, making it less likely to be defined by a single value label."
      : "這類作品即使議題濃度高，也能靠自由度讓玩家自行消化立場，因此比較不容易被單一價值標籤綁死。";
  }

  return isEn
    ? "The reception of these works depends on whether issues, entertainment value, adaptation handling, and audience expectations can mutually support each other."
    : "這類作品的評價取決於議題、娛樂性、原作處理與受眾期待是否能彼此支撐。";
};

const buildSimilarityCopy = (similarity: number, lang: "zh" | "en" = "zh") => {
  const isEn = lang === "en";
  if (similarity >= 76) {
    return {
      label: isEn ? "Highly Similar" : "高度相似",
      body: isEn
        ? "Your production orientation is highly close to this work's cultural pressure, entertainment value, and audience response."
        : "你的製作取向和這部作品的文化壓力、娛樂性與受眾反應高度接近。",
    };
  }

  if (similarity >= 60) {
    return {
      label: isEn ? "Moderately Similar" : "中度相似",
      body: isEn
        ? "This is a reasonably close reference sample in the database, though a few aspects do not completely overlap."
        : "這是目前資料庫中相當接近的對照樣本，但仍有幾個面向不完全重疊。",
    };
  }

  return {
    label: isEn ? "Closest Match" : "最接近樣本",
    body: isEn
      ? "This is the closest work in the current database, which doesn't imply high similarity; your answers may fall in areas where database samples are still scarce."
      : "這是目前資料庫裡最接近的作品，不代表高度相似；你的答案可能落在資料庫樣本仍不足的區域。",
  };
};

const ResultArtwork = ({ work }: { work: Work }) => {
  const searchQuery = work.originalTitle 
    ? `${work.originalTitle} Official Trailer` 
    : `${work.title} Official Trailer`;
    
  const embedUrl = work.youtubeId
    ? `https://www.youtube.com/embed/${work.youtubeId}?autoplay=1&mute=1&modestbranding=1&rel=0`
    : `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(searchQuery)}&autoplay=1&mute=1&modestbranding=1&rel=0`;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        title={`${work.originalTitle || work.title} Official Trailer`}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
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

function ReceptionSplitCard({ work, lang = "zh" }: { work: Work; lang?: "zh" | "en" }) {
  const media = work.politicalIndex.mediaFriendly;
  const audience = work.tags.audienceAcceptance;
  const split = work.politicalIndex.audienceSplit;
  const gap = Math.abs(media - audience);
  const isEn = lang === "en";

  const headline =
    gap >= 28
      ? media > audience
        ? (isEn ? "Critics embrace it much more than audiences" : "媒體接受度高於觀眾")
        : (isEn ? "Audiences embrace it much more than critics" : "觀眾接受度高於媒體")
      : split >= 65
        ? (isEn ? "Polarized reception driven by culture wars" : "評價分裂主要來自文化戰")
        : (isEn ? "Critics and audiences are generally aligned" : "媒體與觀眾大致同向");

  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-200 text-slate-950">
          <BarChart3 size={20} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">
            {isEn ? "Critic / Audience Split" : "媒體 / 觀眾落差"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">{headline}</p>
        </div>
      </div>
      <div className="space-y-4">
        <Meter label={isEn ? "Critic Appeal" : "影評人光環加成 (Critic Appeal)"} value={media} tone="sky" />
        <Meter label={isEn ? "Audience Approval" : "玩家/觀眾接受度"} value={audience} tone="teal" />
        <Meter label={isEn ? "Polarization" : "評價兩極化傾向 (Polarization)"} value={split} tone={split >= 70 ? "rose" : "amber"} />
      </div>
    </section>
  );
}

function CausalityBreakdown({ work, lang = "zh" }: { work: Work; lang?: "zh" | "en" }) {
  const isEn = lang === "en";
  const factors = [
    {
      label: isEn ? "ESG/DEI Representation" : "進步價值合規度 (ESG/DEI)",
      value: work.politicalIndex.representation,
      body: isEn
        ? labelByScore(
            work.politicalIndex.representation,
            "Diverse representation is highly emphasized, serving as a key external metric.",
            "Contains some representative elements, but they are not core selling points.",
            "Representation is not a focus of concern."
          )
        : labelByScore(
            work.politicalIndex.representation,
            "角色多元代表性被高度強調，成為外部指標重點。",
            "有部分代表性元素，但非核心賣點。",
            "代表性並未成為特別關注的重點。"
          ),
      tone: "teal" as const,
    },
    {
      label: isEn ? "Creative Liberty" : "創作解構自由 (Creative Liberty)",
      value: work.politicalIndex.adaptationFreedom,
      body: isEn
        ? labelByScore(
            work.politicalIndex.adaptationFreedom,
            "Heavy deconstruction, easily challenging the expectations of classic fans.",
            "Perceptible changes and adaptation attempts exist.",
            "Minimal changes, close to the expectations of the classic audience."
          )
        : labelByScore(
            work.politicalIndex.adaptationFreedom,
            "解構力度大，容易挑戰老粉的經典期待。",
            "存在可感知的改動與改編嘗試。",
            "改動較小，接近既有受眾的經典期待。"
          ),
      tone: "amber" as const,
    },
    {
      label: isEn ? "Agenda Dominance" : "宣傳觀點前景化 (Agenda Dominance)",
      value: work.politicalIndex.issueInsertion,
      body: isEn
        ? labelByScore(
            work.politicalIndex.issueInsertion,
            "Political or social issues are extremely prominent in the work and marketing.",
            "Issues exist but remain subservient to mainstream narrative and experience.",
            "Low agenda presence; focuses on core gameplay or narrative."
          )
        : labelByScore(
            work.politicalIndex.issueInsertion,
            "政治/社會議題在作品與宣傳中極為突出。",
            "議題存在但仍依附於主流敘事與體驗中。",
            "議題感較低，以核心玩法或敘事為主。"
          ),
      tone: "sky" as const,
    },
    {
      label: isEn ? "Backlash Risk" : "社群輿論反彈率 (Backlash Risk)",
      value: work.politicalIndex.controversyRisk,
      body: isEn
        ? labelByScore(
            work.politicalIndex.controversyRisk,
            "Highly prone to triggering culture wars and massive community backlashes.",
            "Part of the core community will question the character settings.",
            "Public opinion is generally stable and does not dominate the reception."
          )
        : labelByScore(
            work.politicalIndex.controversyRisk,
            "極易引發文化戰與社群大規模炎上。",
            "部分核心社群會對設定產生質疑。",
            "輿論通常較為平穩，不會主導作品評價。"
          ),
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
          <h2 className="text-lg font-semibold text-white">
            {isEn ? "Compliance & Public Opinion Factors" : "合規與輿論成因拆解"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            {isEn 
              ? "Compliance policies are rarely single variables; they interact with creative liberty, narrative quality, and core fan expectations."
              : "合規政策通常不是單一變數，而是與創作解構、敘事完成度與核心老粉期待共同作用。"}
          </p>
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

function PersonalizedInsight({ work, similarity, lang = "zh" }: { work: Work; similarity: number; lang?: "zh" | "en" }) {
  const isEn = lang === "en";
  
  const profile =
    work.politicalIndex.representation >= 72 && work.politicalIndex.controversyRisk >= 72
      ? (isEn ? "High Representation, High Controversy" : "高代表性、高爭議壓力")
      : work.politicalIndex.representation >= 72 && work.tags.audienceAcceptance >= 75
        ? (isEn ? "High Representation, Stable Approval" : "高代表性、接受度穩定")
        : work.politicalIndex.representation <= 40 && work.tags.audienceAcceptance >= 75
          ? (isEn ? "Low Issue Pressure, Entertainment-Driven" : "低議題壓力、娛樂性主導")
          : (isEn ? "Mixed Cultural Pressure" : "混合型文化壓力");

  const keyDriver =
    work.tags.playerFreedom >= 78
      ? (isEn ? "player freedom helps digest value stances" : "玩家自由度能幫助消化價值立場")
      : work.tags.storyDriven >= 80
        ? (isEn ? "strong narrative control makes audiences care more about character convincingness" : "敘事控制強，觀眾更在意角色命運是否被說服")
        : work.tags.canonFaithful <= 45
          ? (isEn ? "deviating from the source material magnifies DEI signals" : "原作改動會放大 DEI 訊號")
          : (isEn ? "polish and genre thrill remain the foundation of reception" : "完成度與類型爽感仍是評價底盤");

  const titleStr = isEn ? (work.originalTitle || work.title) : work.title;

  return (
    <section className="rounded-lg border border-teal-200/25 bg-teal-200/[0.08] p-5 backdrop-blur-xl saturate-150 shadow-glow">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-200 text-slate-950">
          <Sparkles size={20} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">
            {isEn ? "Your Result Breakdown" : "你的結果解讀"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            {isEn
              ? `Your choices are closest to the "${profile}" path, with a ${similarity}% similarity to ${titleStr}. The key driver for this is: ${keyDriver}.`
              : `你的選擇最接近「${profile}」路線，和 ${work.title} 的相似度為 ${similarity}%。這個結果的關鍵是：${keyDriver}。`}
          </p>
        </div>
      </div>
    </section>
  );
}

const pickCase = (type: Work["type"], predicate: (work: Work) => boolean, fallback: Work) =>
  works.find((work) => work.type === type && predicate(work)) ?? fallback;

function CaseComparison({ work, lang = "zh" }: { work: Work; lang?: "zh" | "en" }) {
  const isEn = lang === "en";
  const cases = [
    {
      label: isEn ? "High DEI Success" : "高 DEI 成功",
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
      label: isEn ? "High DEI High Controversy" : "高 DEI 高爭議",
      work: pickCase(
        work.type,
        (candidate) => candidate.tags.representation >= 80 && candidate.politicalIndex.controversyRisk >= 70,
        work,
      ),
    },
    {
      label: isEn ? "Low DEI Success" : "低 DEI 成功",
      work: pickCase(
        work.type,
        (candidate) => candidate.tags.representation <= 40 && candidate.tags.audienceAcceptance >= 80,
        work,
      ),
    },
    {
      label: isEn ? "Polish Overshadows Issues" : "完成度壓過議題",
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
          <h2 className="text-lg font-semibold text-white">
            {isEn ? "Case Contrast" : "案例對照"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            {isEn
              ? "Though all dealing with DEI, outcomes vary depending on polish, audience expectations, and adaptation strategy."
              : "同樣談 DEI，結果會因完成度、受眾期待和改編策略而改變。"}
          </p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cases.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">{item.label}</p>
            <p className="mt-3 text-base font-bold leading-6 text-white">
              {isEn ? (item.work.originalTitle || item.work.title) : item.work.title}
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-400">
              <p>
                DEI {item.work.tags.representation} / {isEn ? "Approval" : "接受度"} {item.work.tags.audienceAcceptance}
              </p>
              <p>
                {isEn ? "Controversy" : "爭議"} {item.work.politicalIndex.controversyRisk} / {isEn ? "Split" : "分裂"} {item.work.politicalIndex.audienceSplit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const getProducerTitle = (work: Work, lang: "zh" | "en" = "zh") => {
  const representation = work.politicalIndex.representation;
  const controversy = work.politicalIndex.controversyRisk;
  const entertainment = work.tags.commercialEntertainment;
  const canon = work.tags.canonFaithful;
  const media = work.politicalIndex.mediaFriendly;
  const isEn = lang === "en";

  if (representation >= 75 && controversy >= 75) {
    return {
      title: isEn ? "🔥 Controversy Catalyst" : "🔥 輿論核彈引爆狂魔",
      sub: "Controversy Catalyst",
      desc: isEn
        ? "You boldly push progressive and diverse values, not hesitating to wage open war against core fans. Although it sparked a world-ending firestorm on social media, you are absolutely the most talked-about industry focus this year!"
        : "您大膽推動進步多元價值，不惜與核心粉絲正面開戰。雖然在社群上引發了毀天滅地的炎上風暴，但絕對是今年度話題度最高的產業焦點！",
      color: "from-red-500 via-rose-600 to-amber-500"
    };
  }
  if (representation >= 75 && controversy <= 45) {
    return {
      title: isEn ? "🌈 Diversity Diplomat" : "🌈 多元價值水利大師",
      sub: "Diversity Diplomat",
      desc: isEn
        ? "You perfectly blend diversity and representation (DEI) with core gameplay or storyline. This has earned warm applause from mainstream media and investors, while successfully placating the player masses, achieving a rare and harmonious positioning!"
        : "您將多元代表性（DEI）與核心玩法或劇情完美融合，既獲得了主流媒體與投資人的熱烈掌聲，又成功安撫了玩家大眾，達成了難得的和諧定位！",
      color: "from-teal-400 via-emerald-500 to-sky-400"
    };
  }
  if (representation <= 35 && canon >= 75) {
    return {
      title: isEn ? "🛡️ Canon Fundamentalist" : "🛡️ 鐵血原作聖經守護騎士",
      sub: "Canon Fundamentalist",
      desc: isEn
        ? "You firmly defend original settings and refuse any forced diversity deconstructions. While this might slightly dissatisfy progressive media and critics, your core fans' loyalty is absolute!"
        : "您堅定捍衛原作設定，拒絕任何生硬的多元解構。雖然這可能讓部分進步派媒體和影評人略感不滿，但核心老粉對您的忠誠度直接拉滿！",
      color: "from-yellow-400 via-amber-500 to-orange-500"
    };
  }
  if (entertainment >= 78 && controversy <= 45) {
    return {
      title: isEn ? "💸 Commercial Tycoon" : "💸 極致商業票房巨賈",
      sub: "Commercial Tycoon",
      desc: isEn
        ? "To you, pure fun and spectacle are the only hard truths. You precisely steer clear of all political minefields, pouring your entire budget into sensory stimulation and sheer entertainment, laughing all the way to the bank!"
        : "對您而言，好玩和好看才是唯一的硬道理。您精準地避開了所有政治雷區，將所有預算灌注在爽感與感官刺激上，賺得盆滿缽滿！",
      color: "from-purple-500 via-indigo-600 to-blue-500"
    };
  }
  if (media >= 78 && representation >= 70) {
    return {
      title: isEn ? "🏆 Prestige Magnet" : "🏆 影評人掌聲收割機",
      sub: "Prestige Magnet",
      desc: isEn
        ? "Your work is packed with deep social commentary and artistic aesthetics. Mainstream media sing your praises across headlines, and the top awards are already beckoning you!"
        : "您的作品充滿了深沉的社會關懷與文藝美學。主流媒體在各大頭條對您極盡讚美之能事，各大頒獎季的金牌已經在向您招手！",
      color: "from-pink-500 via-purple-600 to-indigo-500"
    };
  }
  return {
    title: isEn ? "⚖️ Balanced Pragmatist" : "⚖️ 業界端水大師",
    sub: "Balanced Pragmatist",
    desc: isEn
      ? "You carefully balance the interests of all sides: neither drawing the excessive wrath of conservative communities, nor leaving a blank sheet on ESG cultural compliance ratings. Safe and steady is your motto."
      : "您在各方利益之間小心翼翼地維持著平衡：既沒有過度招致保守群體的憤怒，也沒有在 ESG 文化合規評級上交白卷。平穩前行是您的座右銘。",
    color: "from-slate-400 via-slate-500 to-slate-400"
  };
};

const getPrDiagnosis = (work: Work, lang: "zh" | "en" = "zh") => {
  const representation = work.politicalIndex.representation;
  const controversy = work.politicalIndex.controversyRisk;
  const canon = work.tags.canonFaithful;
  const isEn = lang === "en";

  const auditPoints = [];

  if (representation >= 75) {
    auditPoints.push({
      status: "success",
      title: isEn ? "🌿 High DEI Compliance: Funding Secure & Media Fast-Track Open" : "🌿 DEI 合規度高：資金安全與媒體綠色通道已開啟",
      desc: isEn
        ? "Your diversity representation and depth of issues align with mainstream ESG cultural certification standards. This ensures smooth allocation of venture capital and positive promotion from mainstream media during marketing campaigns."
        : "您的多元代表性與議題深度符合主流 ESG 文化認證標準。這能確保外部風投資金撥款順利，並使主流媒體在宣傳期給予正面推廣。"
    });
  } else {
    auditPoints.push({
      status: "warning",
      title: isEn ? "⚠️ Low DEI Rating: Facing Award Snubs & Funding Threshold Risks" : "⚠️ DEI 評級偏低：面臨評獎冷落與融資門檻風險",
      desc: isEn
        ? "The work is relatively conservative on diversity and inclusion, which may lead to lower subjective scores during awards seasons (e.g., TGA, Oscars) or from mainstream progressive critics. External compliance consultants might also flag this, affecting subsequent ESG funding disbursements."
        : "作品在多元包容性上較為保守，這可能導致評獎季（如 TGA、奧斯卡）或主流進步派影評人給予較低的主觀分。外部合規顧問也可能對此提出警告，影響後續 ESG 資金撥款。"
    });
  }

  if (controversy >= 70) {
    auditPoints.push({
      status: "error",
      title: isEn ? "💥 Backlash Alert: Severe Cultural Backlash from Core Audience" : "💥 輿論炎上警戒：核心受眾產生嚴重文化反彈",
      desc: isEn
        ? "Your adaptation, deconstruction, or character redesign was too drastic, leading to a strong sense of 'betrayal' among core fans. Community forums (e.g., Reddit) are forming boycott movements, presenting extremely high first-week refund rates and review split risks."
        : "您的改編解構或人設修改幅度過大，導致核心老粉產生強烈的「背叛感」。社群論壇（如 Reddit）正在形成抵制浪潮，首週退款率與評分分歧風險極高。"
    });
  } else {
    auditPoints.push({
      status: "success",
      title: isEn ? "🌿 Stable Public Opinion: Steered Clear of Major Cultural Conflict Minefields" : "🌿 輿情生態平穩：未踩中任何重大文化對立雷區",
      desc: isEn
        ? "Your decisions were very moderate, and community discussion remains stable. Players do not feel preachy content was forced upon them, resulting in a low backlash rate. This safeguards long-tail sales and avoids useless flame wars."
        : "您的決策十分溫和，社群討論度平穩。玩家並未感覺到被強塞說教，輿論反彈率低。這有利於保障產品的長尾銷量，避免陷入無意義的口水戰。"
    });
  }

  if (canon >= 75) {
    auditPoints.push({
      status: "success",
      title: isEn ? "📖 High Canon Fidelity: Solid Core Fan Base" : "📖 原作忠實度高：情懷基本盤穩固",
      desc: isEn
        ? "You preserved the soul of the original IP, which core fans appreciate deeply. Even with minor issues elsewhere, the core base is willing to support you and spread positive word of mouth."
        : "您保留了原作的靈魂設定，這讓核心老粉極其受用。即使在其他地方有小瑕疵，基本盤依然會願意為您的誠意買單並發布正面口碑。"
    });
  } else if (canon <= 40) {
    auditPoints.push({
      status: "error",
      title: isEn ? "❌ Excessive Canon Deconstruction: Accused of 'In-Name-Only' Distortions" : "❌ 原作解構過度：面臨「借殼上市」的魔改指控",
      desc: isEn
        ? "The alteration of characters and worldbuilding was too extreme, leading to collective protests from core fans on social platforms. This causes any new DEI elements to be magnified as 'forced political correctness', directly destroying organic word-of-mouth propagation."
        : "對原作人設和世界觀的破壞過大，老粉在社交平台發起集體抗議。這使任何新加入的 DEI 元素都被放大解讀為「刻意政治正確」，直接摧毀了產品的自發傳播力。"
    });
  }

  return auditPoints;
};

function RadarChart({ work, lang = "zh" }: { work: Work; lang?: "zh" | "en" }) {
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

  const labels = lang === "en"
    ? ["Representation", "Controversy Risk", "Commercial Value", "Canon Fidelity", "Media Appeal"]
    : ["多元代表", "輿論風險", "商業娛樂", "原作忠實", "媒體友善"];

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
      <svg viewBox="0 0 260 260" className="w-full max-w-[260px] h-auto overflow-visible">
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
  const [showDetails, setShowDetails] = useState(false);
  const [lang, setLang] = useState<"zh" | "en">("zh");

  useEffect(() => {
    const savedLang = window.localStorage.getItem("pc-quiz-lang");
    if (savedLang === "en" || savedLang === "zh") {
      setLang(savedLang);
    }
  }, []);

  const toggleLang = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    window.localStorage.setItem("pc-quiz-lang", next);
  };

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
        {/* Language Toggle Button */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] px-3.5 py-2 text-xs font-bold text-white shadow-glow backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          >
            <span>🌐</span>
            <span>{lang === "zh" ? "EN" : "繁中"}</span>
          </button>
        </div>

        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#090a0f,rgba(9,10,15,0.88),#090a0f)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
        <section className="max-w-md rounded-lg border border-white/10 bg-white/[0.07] p-6 text-center backdrop-blur-xl saturate-150 shadow-glow">
          <h1 className="text-2xl font-bold text-white">
            {lang === "en" ? "No Test Results Yet" : "還沒有測驗結果"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {lang === "en" ? "Complete the production choices first, then the system will recommend similar works." : "先完成製作決策，系統才會推薦相似作品。"}
          </p>
          <a
            href="../quiz/"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-teal-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-200"
          >
            {lang === "en" ? "Go to Quiz" : "前往測驗"}
          </a>
        </section>
      </main>
    );
  }

  const { work, similarity } = result;
  const traitTags = buildTraitTags(work, lang);
  const receptionInsight = buildReceptionInsight(work, lang);
  const similarityCopy = buildSimilarityCopy(similarity, lang);
  const resultStat = getResultStat(work.id);

  const getRarityLabel = (share: number, currentLang: "zh" | "en") => {
    if (currentLang === "en") {
      if (share <= 1) return "Rare Route";
      if (share <= 4) return "Minority Route";
      if (share <= 8) return "Popular Branch";
      return "Mainstream";
    }
    return rarityLabel(share);
  };
  const rarity = getRarityLabel(resultStat.share, lang);

  const workTitle = lang === "en" ? (work.originalTitle || work.title) : work.title;

  const translatedComments = work.comments.map(c => translateComment(c, work.title, work.originalTitle || work.title, lang));

  return (
    <main className="min-h-screen bg-[#090a0f] relative">
      <Danmaku comments={translatedComments} />

      {/* Language Toggle Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] px-3.5 py-2 text-xs font-bold text-white shadow-glow backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span>🌐</span>
          <span>{lang === "zh" ? "EN" : "繁中"}</span>
        </button>
      </div>

      <section className="relative isolate min-h-screen overflow-hidden px-5 py-10">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#090a0f_0%,rgba(9,10,15,0.96)_36%,rgba(9,10,15,0.78)_68%,rgba(9,10,15,0.58)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#090a0f]/20 via-[#090a0f]/58 to-[#090a0f]" />

        <div className="relative z-20 mx-auto max-w-6xl">
          <div className="grid min-h-[84vh] gap-8 pt-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div className="order-2 lg:order-1 text-left">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-teal-200">
                Most Similar Work
              </p>
              <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
                {workTitle}
              </h1>
              {work.originalTitle && lang !== "en" ? (
                <p className="mt-3 text-xl font-medium text-slate-300 sm:text-2xl">{work.originalTitle}</p>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white">
                  {work.year}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white">
                  {work.type === "film" ? (lang === "en" ? "Film" : "電影") : (lang === "en" ? "Game" : "遊戲")}
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
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100">{getLocalizedSynopsis(work, lang)}</p>
              <div className="mt-5 max-w-2xl rounded-lg border border-white/10 bg-black/45 p-4 backdrop-blur-xl saturate-150">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                  {lang === "en" ? "Reception Insight" : "評價門檻推論"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{receptionInsight}</p>
              </div>
              <div className="mt-4 grid max-w-2xl grid-cols-3 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl saturate-150">
                  <p className="text-xs text-slate-400">{lang === "en" ? "ESG / DEI" : "ESG合規"}</p>
                  <p className="mt-1 text-2xl font-black text-teal-200">{work.politicalIndex.representation}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl saturate-150">
                  <p className="text-xs text-slate-400">{lang === "en" ? "Backlash" : "輿論反彈"}</p>
                  <p className="mt-1 text-2xl font-black text-rose-200">{work.politicalIndex.controversyRisk}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl saturate-150">
                  <p className="text-xs text-slate-400">{lang === "en" ? "Market Approval" : "市場接受"}</p>
                  <p className="mt-1 text-2xl font-black text-amber-200">{work.tags.audienceAcceptance}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 order-1 lg:order-2">
              <div className="overflow-hidden rounded-lg border border-white/15 bg-black/35 shadow-glow backdrop-blur-xl saturate-150">
                <ResultArtwork work={work} />
                <div className="border-t border-white/10 px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-left">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {lang === "en" ? "Official Trailer" : "官方預告片"}
                      </p>
                      <p className="mt-1 text-xl font-semibold text-white">{workTitle}</p>
                      {work.originalTitle && lang !== "en" ? (
                        <p className="mt-1 text-sm text-slate-400">{work.originalTitle}</p>
                      ) : null}
                    </div>
                    {/* Fallback button to open on YouTube */}
                    <a
                      href={
                        work.youtubeId
                          ? `https://www.youtube.com/watch?v=${work.youtubeId}`
                          : `https://www.youtube.com/results?search_query=${encodeURIComponent(work.originalTitle ? `${work.originalTitle} Official Trailer` : `${work.title} Official Trailer`)}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-200 transition hover:bg-red-500/20 active:scale-95 shadow-inner"
                    >
                      <span>{lang === "en" ? "📺 Play Now" : "📺 立即播放"}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-teal-200/30 bg-black/45 p-6 shadow-glow backdrop-blur-xl saturate-150">
                <div className="text-sm text-slate-300 text-left">{lang === "en" ? "Similarity" : "相似度"}</div>
                <div className="mt-3 text-6xl font-black text-teal-200 text-left">{similarity}%</div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-teal-300" style={{ width: `${similarity}%` }} />
                </div>
                <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md text-left">
                  <div className="text-sm font-semibold text-white">{similarityCopy.label}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{similarityCopy.body}</p>
                </div>
                <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md text-left">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400 text-left">Result Rarity</p>
                      <p className="mt-1 text-sm text-slate-200 text-left">
                        {lang === "en" ? (
                          <>
                            You share this route with{" "}
                            <span className="font-mono text-lg font-bold text-teal-200">
                              {formatShare(resultStat.share)}
                            </span>{" "}
                            of players
                          </>
                        ) : (
                          <>
                            你與{" "}
                            <span className="font-mono text-lg font-bold text-teal-200">
                              {formatShare(resultStat.share)}
                            </span>{" "}
                            的人一樣
                          </>
                        )}
                      </p>
                    </div>
                    <span className="rounded-full border border-teal-200/30 bg-teal-200/10 px-3 py-1 text-sm font-semibold text-teal-100">
                      {rarity}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400 text-left">
                    {lang === "en" 
                      ? `Estimated based on ${resultStat.sampleSize.toLocaleString()} simulated trials locally.`
                      : `依本地 mock 模擬 ${resultStat.sampleSize.toLocaleString()} 次測驗估算。`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 pb-5 lg:grid-cols-[1fr_1fr]">
            <PersonalizedInsight work={work} similarity={similarity} lang={lang} />
            <ReceptionSplitCard work={work} lang={lang} />
          </div>

          {/* Mobile Collapse Toggle Button */}
          <div className="lg:hidden mb-6 flex justify-center">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full max-w-sm flex items-center justify-center gap-2.5 rounded-xl border border-teal-200/20 bg-teal-200/[0.08] hover:bg-teal-200/[0.15] px-6 py-3.5 text-sm font-bold text-teal-200 shadow-glow backdrop-blur-md transition-all active:scale-[0.98] duration-200"
            >
              <span>
                {showDetails 
                  ? (lang === "en" ? "Collapse Detailed Stats & History ▲" : "收合詳細數據與歷史案例 ▲") 
                  : (lang === "en" ? "🔍 Expand Detailed Stats & History ▼" : "🔍 展開詳細數據與歷史案例 ▼")}
              </span>
            </button>
          </div>

          <div className={showDetails ? "block" : "hidden lg:block"}>
            <div className="grid gap-5 pb-5 lg:grid-cols-[1fr_1fr]">
              <CausalityBreakdown work={work} lang={lang} />
              <PoliticalIndexPanel index={work.politicalIndex} lang={lang} />
            </div>

            <div className="pb-5">
              <CaseComparison work={work} lang={lang} />
            </div>
          </div>

          <div className="grid gap-5 pb-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              <RatingCard ratings={work.ratings} type={work.type} lang={lang} />
              <ControversyTimeline work={work} lang={lang} />
            </div>

            <div className="space-y-5 text-left">
              <section className="rounded-lg border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl saturate-150 shadow-glow">
                <h2 className="text-lg font-semibold text-white">
                  {lang === "en" ? "Core Perspective" : "核心觀點"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {lang === "en" 
                    ? "This quiz demonstrates that DEI is not a simple plus or minus. Instead, it interacts with entertainment value, character function, adaptation fidelity, player freedom, critic context, and community expectations. When representation serves characters and experience, it expands resonance; when it clashes with original expectations or execution, controversy becomes the central focus of reviews."
                    : "這個測驗要呈現的不是「DEI 一定加分或扣分」，而是 DEI 如何和娛樂性、角色功能、改編忠實度、玩家自由度、媒體語境與社群期待交互作用。當代表性服務角色與體驗時，它可能擴大共鳴；當它和原作期待或完成度衝突時，爭議就會成為評價主軸。"}
                </p>
              </section>

              {/* Executive Dashboard */}
              <section className="rounded-lg border border-teal-200/20 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 backdrop-blur-xl saturate-150 shadow-glow relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-500 opacity-60" />
                
                <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/5 pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-200 text-left">EXECUTIVE DASHBOARD</p>
                    <h2 className="mt-1 text-lg font-bold text-white text-left">
                      {lang === "en" ? "Executive Producer Dashboard" : "執行製作人控制面板"}
                    </h2>
                  </div>
                  <span className="rounded-full bg-teal-200/10 border border-teal-200/20 px-2.5 py-0.5 text-xs text-teal-200 font-mono font-bold animate-pulse">
                    LIVE DATA
                  </span>
                </div>

                {/* 1. Title Badge Card */}
                {(() => {
                  const badge = getProducerTitle(work, lang);
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
                        <p className="mt-2 text-xs leading-5 text-slate-300 text-left">
                          {badge.desc}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* 2. Radar Chart */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3 text-center">
                    {lang === "en" ? "📊 Cultural Alignment Radar" : "📊 專案文化與商業屬性雷達 (Cultural Alignment Radar)"}
                  </p>
                  <RadarChart work={work} lang={lang} />
                </div>

                {/* 3. PR Diagnosis Audit List */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2 text-left">
                    {lang === "en" ? "📋 PR Diagnosis Audit Report" : "📋 公關診斷審計報告 (PR Diagnosis Audit)"}
                  </p>
                  {getPrDiagnosis(work, lang).map((item, idx) => {
                    const icon = item.status === "success" ? "🌿" : item.status === "warning" ? "⚠️" : item.status === "error" ? "💥" : "ℹ️";
                    const borderColor = item.status === "success" ? "border-emerald-500/20 bg-emerald-950/10" : item.status === "warning" ? "border-amber-500/20 bg-amber-950/10" : item.status === "error" ? "border-rose-500/20 bg-rose-950/10" : "border-white/5 bg-white/[0.02]";
                    const titleColor = item.status === "success" ? "text-emerald-200" : item.status === "warning" ? "text-amber-200" : item.status === "error" ? "text-rose-200" : "text-white";
                    return (
                      <div key={idx} className={`rounded-lg border p-4 text-[11px] leading-5 ${borderColor} text-left`}>
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

          <div className="pb-12 flex flex-col items-center">
            <a
              href="../quiz/"
              onClick={() => window.localStorage.removeItem("pc-quiz-profile")}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 cursor-pointer"
            >
              <RotateCcw size={18} />
              {lang === "en" ? "Retake Quiz" : "重新測驗"}
            </a>

            {/* Copyright & Fair Use Disclaimer */}
            <footer className="mt-12 w-full border-t border-white/5 pt-6 text-center text-[10px] leading-5 text-slate-500 max-w-3xl">
              <p className="font-semibold text-slate-400 mb-1.5 flex items-center justify-center gap-1.5">
                <span>⚖️</span>
                <span>{lang === "en" ? "Copyright & Fair Use Disclaimer" : "著作權與合理使用聲明 (Copyright & Fair Use Disclaimer)"}</span>
              </p>
              <p className="text-center">
                {lang === "en"
                  ? "This website is a non-profit cultural community commentary and interactive simulation. All titles, trailers, and trademarks referenced herein belong to their respective copyright holders. In accordance with fair use provisions, YouTube trailers are embedded solely for educational, critical, and analytical purposes, with no intention of copyright infringement or commercial gain."
                  : "本站為非營利性質之文化社群評論與互動模擬測驗。網頁中引用之所有作品名稱、官方預告片與商標所有權均歸屬原著作權持有人或其所屬公司所有。本站依據著作權法相關合理使用（Fair Use）規定，僅出於教育、評論與學術探討目的嵌入官方公開之 YouTube 影片，絕無任何侵害版權或攀附商譽之意圖。"}
              </p>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
