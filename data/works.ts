export type WorkType = "film" | "game";

export type TagKey =
  | "genreSpectacle"
  | "genrePrestige"
  | "adaptation"
  | "canonFaithful"
  | "representation"
  | "genderPowerShift"
  | "issueInsertion"
  | "commercialEntertainment"
  | "controversyRisk"
  | "mediaFriendly"
  | "audienceAcceptance"
  | "monetizationPressure"
  | "playerFreedom"
  | "storyDriven"
  | "studioRisk";

export type MatchTag =
  | "film"
  | "game"
  | "originalWork"
  | "famousIp"
  | "legacyReboot"
  | "canonLoyal"
  | "canonRewrite"
  | "deconstruction"
  | "representationForward"
  | "naturalRepresentation"
  | "traditionalAudience"
  | "genderPowerShift"
  | "issueHeavy"
  | "issueLight"
  | "prestige"
  | "spectacle"
  | "mainstreamEntertainment"
  | "authorDriven"
  | "cultureWar"
  | "lowControversy"
  | "mediaFriendly"
  | "antiMedia"
  | "crowdPleaser"
  | "audienceSplit"
  | "awardSeason"
  | "streamingFriendly"
  | "theatricalEvent"
  | "franchiseSafe"
  | "visualStyle"
  | "premiumComplete"
  | "liveService"
  | "monetizationHeavy"
  | "playerFreedom"
  | "linearStory"
  | "storyDriven"
  | "hardcore"
  | "casualFriendly"
  | "communityDriven"
  | "patchRedemption"
  | "competitive";

export const matchTagKeys: MatchTag[] = [
  "film",
  "game",
  "originalWork",
  "famousIp",
  "legacyReboot",
  "canonLoyal",
  "canonRewrite",
  "deconstruction",
  "representationForward",
  "naturalRepresentation",
  "traditionalAudience",
  "genderPowerShift",
  "issueHeavy",
  "issueLight",
  "prestige",
  "spectacle",
  "mainstreamEntertainment",
  "authorDriven",
  "cultureWar",
  "lowControversy",
  "mediaFriendly",
  "antiMedia",
  "crowdPleaser",
  "audienceSplit",
  "awardSeason",
  "streamingFriendly",
  "theatricalEvent",
  "franchiseSafe",
  "visualStyle",
  "premiumComplete",
  "liveService",
  "monetizationHeavy",
  "playerFreedom",
  "linearStory",
  "storyDriven",
  "hardcore",
  "casualFriendly",
  "communityDriven",
  "patchRedemption",
  "competitive",
];

export type PoliticalIndex = {
  representation: number;
  canonFaithful: number;
  adaptationFreedom: number;
  issueInsertion: number;
  controversyRisk: number;
  mediaFriendly: number;
  audienceSplit: number;
};

export type RatingSourceKey =
  | "tmdb"
  | "imdb"
  | "metacritic"
  | "rottenTomatoes"
  | "rawg"
  | "steam";

export type RatingSource = {
  source: RatingSourceKey;
  label: string;
  value: string;
  verdict: string;
  url: string;
  tone?: "good" | "mixed" | "bad" | "neutral";
};

export type ReviewQuote = {
  quote: string;
  source: string;
  url: string;
};

export type Work = {
  id: string;
  type: WorkType;
  title: string;
  originalTitle?: string;
  year: number;
  backgroundImage: string;
  coverImage: string;
  synopsis: string;
  tags: Record<TagKey, number>;
  matchTags: MatchTag[];
  politicalIndex: PoliticalIndex;
  ratings: RatingSource[];
  reviewQuotes: ReviewQuote[];
  comments: string[];
  youtubeId?: string;
};

type Tone = NonNullable<RatingSource["tone"]>;

type FilmSeed = {
  id: string;
  title: string;
  originalTitle: string;
  year: number;
  posterFile: string;
  synopsis: string;
  tags: Partial<Record<TagKey, number>>;
  politicalIndex: PoliticalIndex;
  ratings: {
    tmdb: string;
    imdb: string;
    metacritic: string;
    rottenTomatoes: string;
  };
  youtubeId?: string;
};

type GameSeed = {
  id: string;
  title: string;
  originalTitle: string;
  year: number;
  steamAppId: number;
  synopsis: string;
  tags: Partial<Record<TagKey, number>>;
  politicalIndex: PoliticalIndex;
  ratings: {
    rawg: string;
    metacritic: string;
    steam: string;
  };
  youtubeId?: string;
};

const baseTags: Record<TagKey, number> = {
  genreSpectacle: 0,
  genrePrestige: 0,
  adaptation: 0,
  canonFaithful: 0,
  representation: 0,
  genderPowerShift: 0,
  issueInsertion: 0,
  commercialEntertainment: 0,
  controversyRisk: 0,
  mediaFriendly: 0,
  audienceAcceptance: 0,
  monetizationPressure: 0,
  playerFreedom: 0,
  storyDriven: 0,
  studioRisk: 0,
};

// representation / issueInsertion / controversyRisk describe DEI and cultural-discourse pressure.
// Technical launches, monetization, and production trouble belong in studioRisk or monetizationPressure.
const tags = (values: Partial<Record<TagKey, number>>) => ({
  ...baseTags,
  ...values,
});

const specificMatchTags: Record<string, MatchTag[]> = {
  "barbie": ["theatricalEvent", "genderPowerShift", "issueHeavy", "mainstreamEntertainment"],
  "little-mermaid-2023": ["famousIp", "canonRewrite", "representationForward", "cultureWar"],
  "joker": ["authorDriven", "deconstruction", "audienceSplit"],
  "everything-everywhere": ["originalWork", "prestige", "representationForward", "crowdPleaser"],
  "top-gun-maverick": ["theatricalEvent", "franchiseSafe", "mainstreamEntertainment", "canonLoyal"],
  "ghostbusters-2016": ["legacyReboot", "genderPowerShift", "cultureWar", "audienceSplit"],
  "captain-marvel": ["famousIp", "genderPowerShift", "representationForward", "mediaFriendly", "cultureWar", "audienceSplit", "mainstreamEntertainment"],
  "star-wars-last-jedi": ["famousIp", "deconstruction", "cultureWar", "audienceSplit"],
  "matrix-resurrections": ["famousIp", "deconstruction", "authorDriven", "audienceSplit"],
  "sound-of-freedom": ["issueHeavy", "antiMedia", "cultureWar", "audienceSplit"],
  "dont-look-up": ["originalWork", "issueHeavy", "authorDriven", "antiMedia", "cultureWar", "audienceSplit", "streamingFriendly"],
  "eternals": ["famousIp", "representationForward", "audienceSplit"],
  "the-woman-king": ["representationForward", "genderPowerShift", "spectacle", "theatricalEvent", "mediaFriendly", "cultureWar", "mainstreamEntertainment"],
  "moonlight": ["prestige", "awardSeason", "representationForward", "issueHeavy"],
  "green-book": ["awardSeason", "crowdPleaser", "issueHeavy", "audienceSplit"],
  "knives-out": ["originalWork", "crowdPleaser", "issueHeavy"],
  "birds-of-prey": ["famousIp", "legacyReboot", "genderPowerShift", "visualStyle", "spectacle"],
  "gran-turismo": ["famousIp", "canonLoyal", "issueLight", "mainstreamEntertainment", "casualFriendly", "crowdPleaser"],
  "nimona": ["representationForward", "genderPowerShift", "issueHeavy", "streamingFriendly", "crowdPleaser"],
  "american-fiction": ["prestige", "issueHeavy", "authorDriven", "awardSeason"],
  "rustin": ["prestige", "representationForward", "issueHeavy", "awardSeason"],
  "the-whale": ["prestige", "issueHeavy", "audienceSplit", "awardSeason"],
  "strange-world": ["representationForward", "famousIp", "audienceSplit", "cultureWar"],
  "joy-ride": ["representationForward", "mainstreamEntertainment", "crowdPleaser"],
  "bottoms": ["representationForward", "genderPowerShift", "authorDriven", "crowdPleaser"],
  "last-of-us-part-ii": ["linearStory", "storyDriven", "representationForward", "cultureWar", "audienceSplit"],
  "hogwarts-legacy": ["famousIp", "cultureWar", "mainstreamEntertainment"],
  "cyberpunk-2077": ["patchRedemption", "storyDriven", "issueHeavy", "audienceSplit"],
  "no-mans-sky": ["patchRedemption", "playerFreedom", "issueLight", "lowControversy"],
  "baldurs-gate-3": ["playerFreedom", "storyDriven", "premiumComplete", "crowdPleaser"],
  "starfield": ["playerFreedom", "audienceSplit", "famousIp"],
  "helldivers-2": ["liveService", "communityDriven", "issueLight", "patchRedemption"],
  "disco-elysium": ["authorDriven", "issueHeavy", "prestige", "storyDriven"],
  "gta-v": ["playerFreedom", "mainstreamEntertainment", "cultureWar"],
  "overwatch-2": ["liveService", "monetizationHeavy", "representationForward", "audienceSplit"],
  "apex-legends": ["liveService", "competitive", "representationForward", "monetizationHeavy"],
  "suicide-squad": ["liveService", "monetizationHeavy", "famousIp", "audienceSplit"],
  "forspoken": ["representationForward", "audienceSplit", "cultureWar"],
  "stardew-valley": ["playerFreedom", "lowControversy", "communityDriven", "premiumComplete"],
  "portal-2": ["premiumComplete", "lowControversy", "crowdPleaser"],
  "counter-strike-2": ["competitive", "liveService", "communityDriven"],
  "dota-2": ["competitive", "liveService", "hardcore"],
  "death-stranding": ["authorDriven", "storyDriven", "audienceSplit"],
  "monster-hunter-world": ["premiumComplete", "communityDriven", "hardcore", "mainstreamEntertainment", "lowControversy"],
  "doom-eternal": ["premiumComplete", "hardcore", "spectacle", "issueLight", "traditionalAudience"],
  "sekiro": ["premiumComplete", "hardcore", "prestige", "canonLoyal", "traditionalAudience"],
  "ghost-of-tsushima": ["premiumComplete", "spectacle", "storyDriven", "mediaFriendly", "crowdPleaser"],
  "the-outer-worlds": ["playerFreedom", "authorDriven", "issueHeavy", "audienceSplit", "premiumComplete"],
  "warframe": ["liveService", "communityDriven", "monetizationHeavy", "patchRedemption", "playerFreedom"],
  "destiny-2": ["liveService", "communityDriven", "monetizationHeavy", "audienceSplit", "franchiseSafe"],
  "valheim": ["premiumComplete", "playerFreedom", "communityDriven", "lowControversy", "casualFriendly"],
  "nioh-2": ["premiumComplete", "hardcore", "spectacle", "canonLoyal", "traditionalAudience"],
  "wo-long-fallen-dynasty": ["premiumComplete", "hardcore", "spectacle", "visualStyle", "storyDriven"],
  "naraka-bladepoint": ["liveService", "competitive", "visualStyle", "spectacle", "monetizationHeavy"],
  "like-a-dragon-ishin": ["premiumComplete", "storyDriven", "visualStyle", "franchiseSafe", "mainstreamEntertainment"],
  "sifu": ["premiumComplete", "hardcore", "issueLight", "visualStyle", "lowControversy"],
  "trek-to-yomi": ["premiumComplete", "visualStyle", "authorDriven", "issueLight", "lowControversy"],
  "dustborn": ["representationForward", "issueHeavy", "cultureWar", "audienceSplit", "antiMedia"],
  "goodbye-volcano-high": ["representationForward", "storyDriven", "linearStory", "cultureWar", "audienceSplit"],
  "life-is-strange-2": ["storyDriven", "issueHeavy", "representationForward", "audienceSplit"],
  "gone-home": ["storyDriven", "representationForward", "issueHeavy", "authorDriven"],
  "tacoma": ["storyDriven", "representationForward", "issueHeavy", "authorDriven"],
  "dream-daddy": ["representationForward", "casualFriendly", "crowdPleaser"],
  "thirsty-suitors": ["representationForward", "genderPowerShift", "storyDriven", "visualStyle"],
  "venba": ["representationForward", "issueHeavy", "naturalRepresentation", "crowdPleaser"],
  "i-was-a-teenage-exocolonist": ["representationForward", "playerFreedom", "storyDriven", "issueHeavy"],
  "boyfriend-dungeon": ["representationForward", "playerFreedom", "audienceSplit"],
  "cosmic-wheel-sisterhood": ["representationForward", "genderPowerShift", "storyDriven", "issueHeavy"],
  "we-are-ofk": ["representationForward", "storyDriven", "linearStory", "audienceSplit"],
  "resist-1000x": ["representationForward", "issueHeavy", "prestige", "storyDriven"],
  "read-only-memories-2064": ["representationForward", "issueHeavy", "storyDriven", "authorDriven"],
  "red-strings-club": ["representationForward", "issueHeavy", "authorDriven", "audienceSplit"],
  "assassins-creed-shadows": ["famousIp", "representationForward", "cultureWar", "audienceSplit", "theatricalEvent"],
  "unknown-9-awakening": ["representationForward", "storyDriven", "audienceSplit", "patchRedemption"],
  "flintlock-siege-of-dawn": ["representationForward", "spectacle", "hardcore", "audienceSplit"],
  "tales-of-kenzera-zau": ["representationForward", "issueHeavy", "storyDriven", "naturalRepresentation"],
};

const uniqueMatchTags = (values: MatchTag[]) => Array.from(new Set(values));

const deriveMatchTags = (
  type: WorkType,
  seed: { id: string; tags: Partial<Record<TagKey, number>>; politicalIndex: PoliticalIndex },
): MatchTag[] => {
  const value = tags(seed.tags);
  const output: MatchTag[] = [type];

  if (value.adaptation >= 75) output.push("famousIp");
  if (value.adaptation <= 10) output.push("originalWork");
  if (value.canonFaithful >= 75) output.push("canonLoyal", "franchiseSafe");
  if (value.canonFaithful <= 45) output.push("canonRewrite");
  if (value.representation >= 78) output.push("representationForward");
  if (value.representation >= 45 && value.representation < 78) output.push("naturalRepresentation");
  if (value.representation <= 35 && value.canonFaithful >= 65) output.push("traditionalAudience");
  if (value.genderPowerShift >= 70) output.push("genderPowerShift");
  if (value.issueInsertion >= 72) output.push("issueHeavy");
  if (value.issueInsertion <= 28) output.push("issueLight");
  if (value.genrePrestige >= 82) output.push("prestige", "awardSeason");
  if (value.genreSpectacle >= 82) output.push("spectacle", "theatricalEvent");
  if (value.commercialEntertainment >= 84) output.push("mainstreamEntertainment");
  if (value.commercialEntertainment <= 50 && value.genrePrestige >= 70) output.push("authorDriven");
  if (value.controversyRisk >= 72) output.push("cultureWar");
  if (value.controversyRisk <= 18) output.push("lowControversy");
  if (value.mediaFriendly >= 82) output.push("mediaFriendly");
  if (value.mediaFriendly <= 45) output.push("antiMedia");
  if (value.audienceAcceptance >= 84) output.push("crowdPleaser");
  if (seed.politicalIndex.audienceSplit >= 70) output.push("audienceSplit");

  if (type === "game") {
    if (value.monetizationPressure <= 15) output.push("premiumComplete");
    if (value.monetizationPressure >= 60) output.push("liveService", "monetizationHeavy");
    if (value.playerFreedom >= 78) output.push("playerFreedom");
    if (value.playerFreedom <= 42 && value.storyDriven >= 75) output.push("linearStory");
    if (value.storyDriven >= 78) output.push("storyDriven");
    if (value.audienceAcceptance <= 40 || value.studioRisk >= 78) output.push("patchRedemption");
  }

  if (type === "film") {
    if (value.genrePrestige >= 82 && value.mediaFriendly >= 82) output.push("awardSeason");
    if (value.genreSpectacle >= 82 && value.commercialEntertainment >= 80) output.push("theatricalEvent");
    if (value.genrePrestige >= 78 && value.commercialEntertainment <= 60) output.push("authorDriven");
    if (value.adaptation >= 82 && value.canonFaithful <= 55) output.push("legacyReboot");
  }

  return uniqueMatchTags([...output, ...(specificMatchTags[seed.id] ?? [])]);
};

const normalizeWikiFileName = (file: string) => {
  try {
    return decodeURIComponent(file);
  } catch {
    return file;
  }
};

const wikiImage = (file: string) =>
  `https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(normalizeWikiFileName(file))}`;

const steamHero = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_hero.jpg`;

const steamHeader = (appId: number) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg`;

const searchUrl = (site: "tmdb" | "imdb" | "metacritic" | "rt" | "rawg", query: string) => {
  const encoded = encodeURIComponent(query);
  if (site === "tmdb") return `https://www.themoviedb.org/search?query=${encoded}`;
  if (site === "imdb") return `https://www.imdb.com/find/?q=${encoded}`;
  if (site === "metacritic") return `https://www.metacritic.com/search/${encoded}/`;
  if (site === "rt") return `https://www.rottentomatoes.com/search?search=${encoded}`;
  return `https://rawg.io/search?query=${encoded}`;
};

const toneFromValue = (value: string): Tone => {
  if (/Overwhelmingly|Very Positive|Universal|Acclaim|90|91|92|93|94|95|96|97|98|99|100|9\./i.test(value)) {
    return "good";
  }
  if (/Mixed|50|51|52|53|54|55|56|57|58|59|60|61|62|5\./i.test(value)) {
    return "mixed";
  }
  if (/Negative|Mostly Negative|4\.|3\.|2\.|1\./i.test(value)) {
    return "bad";
  }
  return "good";
};

const filmVerdict = (source: RatingSourceKey, value: string) => {
  if (source === "rottenTomatoes") return value.startsWith("9") ? "新鮮度極高" : "新鮮度參考";
  if (source === "metacritic") return value.startsWith("8") || value.startsWith("9") ? "媒體普遍好評" : "媒體評價混合";
  if (source === "imdb") return "觀眾評分參考";
  return "大眾評分參考";
};

const gameVerdict = (source: RatingSourceKey, value: string) => {
  if (source === "steam") {
    if (value === "Overwhelmingly Positive") return "壓倒性好評";
    if (value === "Very Positive") return "極度好評";
    if (value === "Mostly Positive") return "大多好評";
    if (value === "Mixed") return "褒貶不一";
    return value;
  }
  if (source === "metacritic") return value.startsWith("9") ? "媒體高度推崇" : "媒體評分參考";
  return "玩家評分參考";
};

const curatedReviewQuotes: Record<string, ReviewQuote[]> = {
  "last-of-us-part-ii": [
    {
      quote: "這段旅程值得親自走完。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/2531310/reviews/?browsefilter=toprated",
    },
    {
      quote: "幸好當年沒有先被劇透。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/2531310/reviews/?browsefilter=toprated",
    },
    {
      quote: "技術與敘事都很驚人。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/id/Bearsonal/recommended/2531310/",
    },
    {
      quote: "復仇很糟，但這故事很有力。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/2531310/reviews/",
    },
  ],
  "black-myth-wukong": [
    {
      quote: "動作玩家可以直接入手。",
      source: "Kotaku 收錄 Steam 短評",
      url: "https://kotaku.com/black-myth-wukong-steam-reviews-1851634466",
    },
    {
      quote: "接受猴王，享受戰鬥。",
      source: "Kotaku 收錄 Steam 短評",
      url: "https://kotaku.com/black-myth-wukong-steam-reviews-1851634466",
    },
    {
      quote: "美術、Boss 與手感都做到了。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/2358720/reviews/?browsefilter=toprated",
    },
    {
      quote: "打起來真的很爽快。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/2358720/reviews/?browsefilter=toprated",
    },
  ],
  dustborn: [
    {
      quote: "我原本想公平看待它。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/721180/reviews/?browsefilter=toprated",
    },
    {
      quote: "玩起來像被數位折磨。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/721180/reviews/?browsefilter=toprated",
    },
    {
      quote: "角色讓人感覺很情緒勒索。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/721180/reviews/?browsefilter=toprated",
    },
    {
      quote: "政治評論太重手了。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/721180/reviews/?browsefilter=toprated",
    },
  ],
  "hogwarts-legacy": [
    {
      quote: "這就是哈利波特粉的夢想成真。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/990080/reviews/?browsefilter=toprated&l=english",
    },
    {
      quote: "後期很快變得重複又空洞。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/990080/positivereviews/?browsefilter=toprated&l=english",
    },
    {
      quote: "這是系列改編遊戲裡最好的之一。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/990080/reviews/?browsefilter=toprated&l=english",
    },
    {
      quote: "主線慢慢玩會更有味道。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/990080/reviews/?browsefilter=toprated&l=english",
    },
  ],
  "baldurs-gate-3": [
    {
      quote: "這可能是我玩過最好的遊戲。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1086940",
    },
    {
      quote: "世界很豐富，選擇也像無限多。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1086940/reviews/%3Fl%3Denglish?l=portuguese",
    },
    {
      quote: "每一秒都玩得很享受。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1086940",
    },
    {
      quote: "光是捏角我都願意再玩一次。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1086940",
    },
  ],
  "helldivers-2": [
    {
      quote: "這就是我想要的合作射擊。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/553850/reviews?browsefilter=toprated",
    },
    {
      quote: "為了民主，衝就對了。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/553850/reviews?browsefilter=toprated",
    },
    {
      quote: "大家一起完成同一個目標很有感。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/553850/reviews?browsefilter=toprated",
    },
    {
      quote: "爽是爽，但電腦也真的會燒。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/553850/reviews?browsefilter=toprated",
    },
  ],
  "cyberpunk-2077": [
    {
      quote: "它終於變成一款好遊戲了。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1091500/negativereviews/",
    },
    {
      quote: "修了很多，但還是有不少 Bug。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1091500/negativereviews/",
    },
    {
      quote: "有時候像在玩過場動畫模擬器。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1091500/negativereviews/",
    },
    {
      quote: "從笑話慢慢修成佳作。",
      source: "Steam 玩家短評",
      url: "https://www.steamstat.ru/app/1091500",
    },
  ],
  starfield: [
    {
      quote: "這遊戲真的很無聊。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1716740/reviews/?l=english",
    },
    {
      quote: "每個星球都像同一棟建築複製貼上。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1716740/reviews/?l=english",
    },
    {
      quote: "他們到底在想什麼？",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1716740/reviews/?l=english",
    },
    {
      quote: "比較像是等大型模組來救。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1716740/reviews/?l=english",
    },
  ],
  "dragon-age-veilguard": [
    {
      quote: "它不像一款好的闇龍紀元。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1845910/reviews/?browsefilter=toprated&filterLanguage=default",
    },
    {
      quote: "老粉會覺得它背叛了系列。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1845910/reviews/?browsefilter=toprated&filterLanguage=default",
    },
    {
      quote: "最大問題是劇本寫作。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1845910/reviews/?browsefilter=toprated&filterLanguage=default",
    },
    {
      quote: "有些對白像在聽公司簡報。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1845910/reviews/?browsefilter=toprated&filterLanguage=default",
    },
  ],
  "assassins-creed-shadows": [
    {
      quote: "玩法老樣子，故事也偏無聊。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/3159330/",
    },
    {
      quote: "第一章後就開始變無聊。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/3159330/",
    },
  ],
  "disco-elysium": [
    {
      quote: "這是我玩過最好的遊戲之一。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/632470/reviews/?browsefilter=toprated",
    },
    {
      quote: "全是對話，但我完全不覺得無聊。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/632470/reviews/?browsefilter=toprated",
    },
  ],
  "elden-ring": [
    {
      quote: "這就是神作，直接買。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/id/hemutia/recommended/1245620/",
    },
  ],
  "god-of-war": [
    {
      quote: "幾乎就是傑作等級。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1593500/reviews/",
    },
  ],
  control: [
    {
      quote: "最可惜的是第一次體驗只能有一次。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/870780/reviews/?browsefilter=toprated",
    },
    {
      quote: "視覺表現就是一場超自然美術展。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/870780/reviews/?browsefilter=toprated",
    },
    {
      quote: "這是我玩過最好的遊戲之一。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/870780/reviews/?l=english",
    },
    {
      quote: "槍戰手感沒有世界觀那麼驚豔。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/870780/reviews/?l=english",
    },
  ],
  "resist-1000x": [
    {
      quote: "配音表現也非常出色。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/app/1675830/",
    },
    {
      quote: "玩它是我最近最好的決定。",
      source: "Steam 玩家短評",
      url: "https://steamcommunity.com/id/overlordofgaming/recommended/1675830",
    },
  ],
};

const commentsFor = (
  work: {
    title: string;
    originalTitle: string;
    synopsis: string;
    politicalIndex: PoliticalIndex;
    tags: Partial<Record<TagKey, number>>;
  },
  ratings: Record<string, string>,
  reviewQuotes: ReviewQuote[] = [],
  type: WorkType,
) => {
  const quoteLines = reviewQuotes.map(({ quote }) => quote);
  const isFilm = type === "film";
  const ratingValues = Object.values(ratings).join(" / ");
  const highScore = /9\d|8\.\d|9\.\d|Overwhelmingly Positive|Very Positive|9[0-9]%/.test(ratingValues);
  const name = work.title;
  const originalName = work.originalTitle === work.title ? work.title : `${work.title} / ${work.originalTitle}`;
  const pressureLine =
    work.politicalIndex.controversyRisk >= 70
      ? `《${name}》一上桌就知道留言區會開戰。`
      : work.politicalIndex.controversyRisk >= 40
        ? `《${name}》喜歡的人很買單，不喜歡的人也很有話講。`
        : `《${name}》吵點不多，大家比較在看作品本身硬不硬。`;
  const acceptanceLine =
    (work.tags.audienceAcceptance ?? 50) >= 75 || (work.tags.mediaFriendly ?? 50) >= 80
      ? `${name} 完成度夠高，很多批評會被作品本身壓過去。`
      : `${name} 企圖心有，但不是每個觀眾都願意買單。`;
  const splitLine =
    (work.politicalIndex.audienceSplit ?? 50) >= 65
      ? `${name} 最怕不是沒人看，是看完直接分兩派。`
      : `${name} 評價算集中，喜不喜歡多半看個人口味。`;
  const representationLine =
    work.politicalIndex.representation >= 75
      ? `${name} 的代表性很明顯，重點是有沒有寫進角色骨頭裡。`
      : work.politicalIndex.representation <= 35
        ? `${name} 低 DEI 不等於沒內容，重點還是好不好玩、好不好看。`
        : `${name} 有代表性，但沒有完全壓過主線。`;
  const issueLine =
    work.politicalIndex.issueInsertion >= 75
      ? `${name} 議題感很重，吃得下會覺得有深度，吃不下會覺得在上課。`
      : `${name} 沒有一直把議題塞到你臉上，節奏舒服很多。`;
  const canonLine =
    work.politicalIndex.canonFaithful >= 75
      ? `${name} 原作粉應該比較能呼吸，至少沒有亂拆祖墳。`
      : work.politicalIndex.adaptationFreedom >= 75
        ? `${name} 改很大，老粉先深呼吸，不然很容易爆血壓。`
        : `${name} 改編沒有太保守，也沒有完全失控。`;
  const scoreLine = highScore
    ? `${originalName} 評分高不是沒理由，至少核心體驗撐得住。`
    : `${originalName} 評分沒到神作，但討論度確實有留下來。`;
  const gameSpecificLines = [
    (work.tags.genreSpectacle ?? 0) >= 75 ? `${name} 場面跟美術有撐起記憶點。` : `${name} 不是靠場面硬砸，重點比較偏體驗細節。`,
    (work.tags.playerFreedom ?? 0) >= 75 ? `${name} 自由度夠，玩家會覺得這是自己的故事。` : `${name} 比較吃設計師安排，玩家自由度不是主菜。`,
    (work.tags.storyDriven ?? 0) >= 75 ? `${name} 劇情導向很強，角色寫壞就全盤崩。` : `${name} 劇情不是唯一重點，手感和循環更關鍵。`,
    (work.tags.monetizationPressure ?? 0) >= 60 ? `${name} 商業模式如果太貪，Steam 評論一定炸。` : `${name} 沒有被課金壓著打，玩家比較願意談內容。`,
    (work.tags.studioRisk ?? 0) >= 70 ? `${name} 最大風險是上市狀態，Bug 和最佳化會直接扣分。` : `${name} 技術面穩住的話，討論就會回到玩法。`,
    (work.tags.genrePrestige ?? 0) >= 75 ? `${name} 夠硬派，愛的人會說神，退坑的人會說折磨。` : `${name} 門檻比較友善，擴散力會比硬核作品高。`,
    `${name} 的玩家心聲其實很簡單：好玩就護航，不好玩就開噴。`,
    `${name} 如果核心循環成立，缺點玩家真的會忍比較久。`,
    `${name} 能不能留住玩家，最後還是看第二輪想不想開。`,
  ];
  const filmSpecificLines = [
    (work.tags.genrePrestige ?? 0) >= 75 ? `${name} 很吃影評語境，影展和獎季會幫它加分。` : `${name} 比較吃觀眾爽感，不是只拍給評審看。`,
    (work.tags.genreSpectacle ?? 0) >= 75 ? `${name} 大銀幕有說服力，網路吵架會少一點。` : `${name} 場面不是主菜，角色和節奏更不能掉。`,
    (work.tags.commercialEntertainment ?? 0) >= 75 ? `${name} 娛樂性夠強，觀眾其實不太在乎標籤。` : `${name} 娛樂性不夠時，立意再高也會被嫌悶。`,
    (work.tags.adaptation ?? 0) >= 70 ? `${name} 改編最怕不是變新，是變得不像它自己。` : `${name} 原創題材自由，但也更吃劇本本事。`,
    (work.tags.mediaFriendly ?? 0) >= 80 ? `${name} 媒體會稱讚它勇敢，但觀眾還是會問好不好看。` : `${name} 不一定討影評喜歡，但可能更接近大眾口味。`,
    `${name} 角色站得住，議題才不會像貼紙。`,
    `${name} 節奏一拖，立意再好都會被嫌說教。`,
    `${name} 演員有撐住，很多爭議會先被表演蓋過去。`,
    `${name} 票房觀眾要的是爽感，影評要的是餘韻。`,
  ];

  return Array.from(
    new Set([
      ...quoteLines,
      scoreLine,
      pressureLine,
      acceptanceLine,
      splitLine,
      representationLine,
      issueLine,
      canonLine,
      ...(isFilm ? filmSpecificLines : gameSpecificLines),
    ]),
  );
};

const makeFilm = (seed: FilmSeed): Work => ({
  id: seed.id,
  type: "film",
  title: seed.title,
  originalTitle: seed.originalTitle,
  year: seed.year,
  backgroundImage: wikiImage(seed.posterFile),
  coverImage: wikiImage(seed.posterFile),
  synopsis: seed.synopsis,
  tags: tags(seed.tags),
  matchTags: deriveMatchTags("film", seed),
  politicalIndex: seed.politicalIndex,
  ratings: [
    {
      source: "tmdb",
      label: "TMDB",
      value: seed.ratings.tmdb,
      verdict: filmVerdict("tmdb", seed.ratings.tmdb),
      url: searchUrl("tmdb", seed.originalTitle),
      tone: toneFromValue(seed.ratings.tmdb),
    },
    {
      source: "imdb",
      label: "IMDb",
      value: seed.ratings.imdb,
      verdict: filmVerdict("imdb", seed.ratings.imdb),
      url: searchUrl("imdb", seed.originalTitle),
      tone: toneFromValue(seed.ratings.imdb),
    },
    {
      source: "metacritic",
      label: "Metacritic",
      value: seed.ratings.metacritic,
      verdict: filmVerdict("metacritic", seed.ratings.metacritic),
      url: searchUrl("metacritic", seed.originalTitle),
      tone: toneFromValue(seed.ratings.metacritic),
    },
    {
      source: "rottenTomatoes",
      label: "Rotten Tomatoes",
      value: seed.ratings.rottenTomatoes,
      verdict: filmVerdict("rottenTomatoes", seed.ratings.rottenTomatoes),
      url: searchUrl("rt", seed.originalTitle),
      tone: toneFromValue(seed.ratings.rottenTomatoes),
    },
  ],
  reviewQuotes: curatedReviewQuotes[seed.id] ?? [],
  comments: commentsFor(seed, seed.ratings, curatedReviewQuotes[seed.id] ?? [], "film"),
  youtubeId: seed.youtubeId,
});

const makeGame = (seed: GameSeed): Work => ({
  id: seed.id,
  type: "game",
  title: seed.title,
  originalTitle: seed.originalTitle,
  year: seed.year,
  backgroundImage: steamHero(seed.steamAppId),
  coverImage: steamHeader(seed.steamAppId),
  synopsis: seed.synopsis,
  tags: tags(seed.tags),
  matchTags: deriveMatchTags("game", seed),
  politicalIndex: seed.politicalIndex,
  ratings: [
    {
      source: "rawg",
      label: "RAWG",
      value: seed.ratings.rawg,
      verdict: gameVerdict("rawg", seed.ratings.rawg),
      url: searchUrl("rawg", seed.originalTitle),
      tone: toneFromValue(seed.ratings.rawg),
    },
    {
      source: "metacritic",
      label: "Metacritic",
      value: seed.ratings.metacritic,
      verdict: gameVerdict("metacritic", seed.ratings.metacritic),
      url: searchUrl("metacritic", seed.originalTitle),
      tone: toneFromValue(seed.ratings.metacritic),
    },
    {
      source: "steam",
      label: "Steam",
      value: seed.ratings.steam,
      verdict: gameVerdict("steam", seed.ratings.steam),
      url: `https://store.steampowered.com/app/${seed.steamAppId}/`,
      tone: toneFromValue(seed.ratings.steam),
    },
  ],
  reviewQuotes: curatedReviewQuotes[seed.id] ?? [],
  comments: commentsFor(seed, seed.ratings, curatedReviewQuotes[seed.id] ?? [], "game"),
  youtubeId: seed.youtubeId,
});

const filmSeeds: FilmSeed[] = [
  {
    id: "barbie",
    title: "芭比",
    originalTitle: "Barbie",
    year: 2023,
    posterFile: "Barbie_2023_poster.jpg",
    synopsis: "高概念商業娛樂包裝性別政治，媒體聲量與觀眾討論同步爆炸。",
    tags: { genreSpectacle: 68, genrePrestige: 45, representation: 78, genderPowerShift: 86, issueInsertion: 82, commercialEntertainment: 84, controversyRisk: 62, mediaFriendly: 92, audienceAcceptance: 74, studioRisk: 46 },
    politicalIndex: { representation: 82, canonFaithful: 58, adaptationFreedom: 86, issueInsertion: 88, controversyRisk: 66, mediaFriendly: 94, audienceSplit: 58 },
    ratings: { tmdb: "7.0/10", imdb: "6.8/10", metacritic: "80/100", rottenTomatoes: "88%" },
    youtubeId: "p1L63vG63lY",
  },
  {
    id: "little-mermaid-2023",
    title: "小美人魚",
    originalTitle: "The Little Mermaid",
    year: 2023,
    posterFile: "The_Little_Mermaid_(2023_film).png",
    synopsis: "經典童話真人化改編，選角代表性、懷舊期待與原作忠實度高度拉扯。",
    tags: { adaptation: 94, canonFaithful: 48, representation: 82, genderPowerShift: 46, issueInsertion: 48, commercialEntertainment: 72, controversyRisk: 86, mediaFriendly: 76, audienceAcceptance: 52, studioRisk: 62 },
    politicalIndex: { representation: 86, canonFaithful: 50, adaptationFreedom: 62, issueInsertion: 46, controversyRisk: 88, mediaFriendly: 78, audienceSplit: 86 },
    ratings: { tmdb: "6.3/10", imdb: "7.2/10", metacritic: "59/100", rottenTomatoes: "67%" },
    youtubeId: "kpkiF-08s9E",
  },
  {
    id: "joker",
    title: "小丑",
    originalTitle: "Joker",
    year: 2019,
    posterFile: "Joker_(2019_film)_poster.jpg",
    synopsis: "角色研究式漫畫改編，社會不滿與暴力焦慮讓口碑呈現高強度分裂。",
    tags: { genrePrestige: 90, adaptation: 72, canonFaithful: 40, representation: 28, issueInsertion: 74, commercialEntertainment: 64, controversyRisk: 88, mediaFriendly: 58, audienceAcceptance: 78, studioRisk: 84, storyDriven: 82 },
    politicalIndex: { representation: 26, canonFaithful: 42, adaptationFreedom: 88, issueInsertion: 78, controversyRisk: 90, mediaFriendly: 56, audienceSplit: 82 },
    ratings: { tmdb: "8.1/10", imdb: "8.4/10", metacritic: "59/100", rottenTomatoes: "68%" },
    youtubeId: "zAGVQLHvwOY",
  },
  {
    id: "everything-everywhere",
    title: "媽的多重宇宙",
    originalTitle: "Everything Everywhere All at Once",
    year: 2022,
    posterFile: "Everything_Everywhere_All_at_Once.jpg",
    synopsis: "移民家庭、世代衝突與類型奇觀結合，兼具獎季友善與觀眾情感回收。",
    tags: { genreSpectacle: 74, genrePrestige: 88, representation: 92, genderPowerShift: 78, issueInsertion: 70, commercialEntertainment: 70, controversyRisk: 30, mediaFriendly: 94, audienceAcceptance: 86, studioRisk: 72, storyDriven: 82 },
    politicalIndex: { representation: 94, canonFaithful: 80, adaptationFreedom: 70, issueInsertion: 72, controversyRisk: 28, mediaFriendly: 96, audienceSplit: 30 },
    ratings: { tmdb: "7.8/10", imdb: "7.8/10", metacritic: "81/100", rottenTomatoes: "93%" },
    youtubeId: "wxN1T1uxQ2g",
  },
  {
    id: "top-gun-maverick",
    title: "捍衛戰士：獨行俠",
    originalTitle: "Top Gun: Maverick",
    year: 2022,
    posterFile: "Top_Gun_Maverick_Poster.jpg",
    synopsis: "高商業娛樂性、低議題置入的明星續集，靠技術奇觀與懷舊情緒取得廣泛接受。",
    tags: { genreSpectacle: 94, adaptation: 70, canonFaithful: 86, representation: 30, genderPowerShift: 26, issueInsertion: 12, commercialEntertainment: 98, controversyRisk: 18, mediaFriendly: 72, audienceAcceptance: 96, studioRisk: 30 },
    politicalIndex: { representation: 30, canonFaithful: 86, adaptationFreedom: 34, issueInsertion: 12, controversyRisk: 18, mediaFriendly: 72, audienceSplit: 16 },
    ratings: { tmdb: "8.2/10", imdb: "8.2/10", metacritic: "78/100", rottenTomatoes: "96%" },
    youtubeId: "giXco2jaZ_4",
  },
  {
    id: "black-panther",
    title: "黑豹",
    originalTitle: "Black Panther",
    year: 2018,
    posterFile: "Black_Panther_(film)_poster.jpg",
    synopsis: "高代表性與主流超級英雄娛樂結合，讓文化意義、媒體好感與票房能同時成立。",
    tags: { genreSpectacle: 86, adaptation: 82, canonFaithful: 72, representation: 96, genderPowerShift: 78, issueInsertion: 68, commercialEntertainment: 90, controversyRisk: 34, mediaFriendly: 96, audienceAcceptance: 88, studioRisk: 50 },
    politicalIndex: { representation: 96, canonFaithful: 72, adaptationFreedom: 58, issueInsertion: 68, controversyRisk: 34, mediaFriendly: 96, audienceSplit: 28 },
    ratings: { tmdb: "7.4/10", imdb: "7.3/10", metacritic: "88/100", rottenTomatoes: "96%" },
  },
  {
    id: "ghostbusters-2016",
    title: "魔鬼剋星",
    originalTitle: "Ghostbusters",
    year: 2016,
    posterFile: "Ghostbusters_2016_film_poster.png",
    synopsis: "經典 IP 以性別翻轉重啟，代表性討論蓋過作品本身，成為觀眾分裂案例。",
    tags: { genreSpectacle: 62, adaptation: 92, canonFaithful: 30, representation: 76, genderPowerShift: 92, issueInsertion: 56, commercialEntertainment: 58, controversyRisk: 96, mediaFriendly: 66, audienceAcceptance: 34, studioRisk: 84 },
    politicalIndex: { representation: 78, canonFaithful: 28, adaptationFreedom: 90, issueInsertion: 56, controversyRisk: 96, mediaFriendly: 66, audienceSplit: 94 },
    ratings: { tmdb: "5.4/10", imdb: "6.8/10", metacritic: "60/100", rottenTomatoes: "74%" },
  },
  {
    id: "dune-2021",
    title: "沙丘",
    originalTitle: "Dune",
    year: 2021,
    posterFile: "Dune_(2021_film).jpg",
    synopsis: "經典科幻文學改編，以史詩規格和權力寓言建立高媒體友善度。",
    tags: { genreSpectacle: 94, genrePrestige: 84, adaptation: 92, canonFaithful: 82, representation: 48, issueInsertion: 44, commercialEntertainment: 82, controversyRisk: 22, mediaFriendly: 90, audienceAcceptance: 84, studioRisk: 52 },
    politicalIndex: { representation: 48, canonFaithful: 82, adaptationFreedom: 46, issueInsertion: 44, controversyRisk: 22, mediaFriendly: 90, audienceSplit: 24 },
    ratings: { tmdb: "7.8/10", imdb: "8.0/10", metacritic: "74/100", rottenTomatoes: "83%" },
  },
  {
    id: "dune-part-two",
    title: "沙丘：第二部",
    originalTitle: "Dune: Part Two",
    year: 2024,
    posterFile: "Dune_Part_Two_poster.jpeg",
    synopsis: "大規模科幻續集兼具作者感與商業爽感，議題壓力低但文本解讀空間高。",
    tags: { genreSpectacle: 98, genrePrestige: 90, adaptation: 94, canonFaithful: 84, representation: 54, issueInsertion: 56, commercialEntertainment: 88, controversyRisk: 24, mediaFriendly: 94, audienceAcceptance: 90, studioRisk: 58 },
    politicalIndex: { representation: 54, canonFaithful: 84, adaptationFreedom: 44, issueInsertion: 56, controversyRisk: 24, mediaFriendly: 94, audienceSplit: 22 },
    ratings: { tmdb: "8.2/10", imdb: "8.5/10", metacritic: "79/100", rottenTomatoes: "92%" },
  },
  {
    id: "wonder-woman",
    title: "神力女超人",
    originalTitle: "Wonder Woman",
    year: 2017,
    posterFile: "Wonder_Woman_(2017_film)_poster.jpg",
    synopsis: "女性英雄敘事進入主流超級英雄框架，代表性與類型娛樂取得平衡。",
    tags: { genreSpectacle: 84, adaptation: 80, canonFaithful: 74, representation: 86, genderPowerShift: 94, issueInsertion: 52, commercialEntertainment: 88, controversyRisk: 28, mediaFriendly: 92, audienceAcceptance: 86, studioRisk: 42 },
    politicalIndex: { representation: 86, canonFaithful: 74, adaptationFreedom: 56, issueInsertion: 52, controversyRisk: 28, mediaFriendly: 92, audienceSplit: 24 },
    ratings: { tmdb: "7.2/10", imdb: "7.3/10", metacritic: "76/100", rottenTomatoes: "93%" },
  },
  {
    id: "captain-marvel",
    title: "驚奇隊長",
    originalTitle: "Captain Marvel",
    year: 2019,
    posterFile: "Captain_Marvel_(film)_poster.jpg",
    synopsis: "女性英雄商業大片與宣傳語言交會，媒體友善但觀眾討論較分裂。",
    tags: { genreSpectacle: 78, adaptation: 82, canonFaithful: 66, representation: 76, genderPowerShift: 88, issueInsertion: 46, commercialEntertainment: 78, controversyRisk: 66, mediaFriendly: 80, audienceAcceptance: 62, studioRisk: 54 },
    politicalIndex: { representation: 78, canonFaithful: 66, adaptationFreedom: 58, issueInsertion: 46, controversyRisk: 66, mediaFriendly: 80, audienceSplit: 70 },
    ratings: { tmdb: "6.8/10", imdb: "6.8/10", metacritic: "64/100", rottenTomatoes: "79%" },
  },
  {
    id: "the-marvels",
    title: "驚奇隊長 2",
    originalTitle: "The Marvels",
    year: 2023,
    posterFile: "The_Marvels_poster.jpg",
    synopsis: "女性群像英雄續作遇上超英疲勞，代表性不再足以抵銷商業與口碑壓力。",
    tags: { genreSpectacle: 70, adaptation: 82, canonFaithful: 58, representation: 86, genderPowerShift: 90, issueInsertion: 42, commercialEntertainment: 62, controversyRisk: 68, mediaFriendly: 62, audienceAcceptance: 44, studioRisk: 72 },
    politicalIndex: { representation: 86, canonFaithful: 58, adaptationFreedom: 64, issueInsertion: 42, controversyRisk: 68, mediaFriendly: 62, audienceSplit: 72 },
    ratings: { tmdb: "6.1/10", imdb: "5.5/10", metacritic: "50/100", rottenTomatoes: "62%" },
    youtubeId: "i9P4J2V-ZKg",
  },
  {
    id: "mulan-2020",
    title: "花木蘭",
    originalTitle: "Mulan",
    year: 2020,
    posterFile: "Mulan_(2020_film)_poster.jpg",
    synopsis: "經典動畫真人化改編，文化代表性、原作改動與政治爭議共同牽動評價。",
    tags: { genreSpectacle: 72, adaptation: 94, canonFaithful: 42, representation: 82, genderPowerShift: 72, issueInsertion: 36, commercialEntertainment: 58, controversyRisk: 86, mediaFriendly: 48, audienceAcceptance: 38, studioRisk: 82 },
    politicalIndex: { representation: 84, canonFaithful: 42, adaptationFreedom: 78, issueInsertion: 36, controversyRisk: 86, mediaFriendly: 48, audienceSplit: 82 },
    ratings: { tmdb: "6.9/10", imdb: "5.8/10", metacritic: "66/100", rottenTomatoes: "72%" },
  },
  {
    id: "lightyear",
    title: "巴斯光年",
    originalTitle: "Lightyear",
    year: 2022,
    posterFile: "Lightyear_(film)_poster.jpg",
    synopsis: "玩具總動員 IP 外傳在定位、代表性橋段與粉絲期待之間失衡。",
    tags: { genreSpectacle: 68, adaptation: 82, canonFaithful: 38, representation: 70, genderPowerShift: 58, issueInsertion: 32, commercialEntertainment: 56, controversyRisk: 70, mediaFriendly: 58, audienceAcceptance: 42, studioRisk: 66 },
    politicalIndex: { representation: 72, canonFaithful: 38, adaptationFreedom: 76, issueInsertion: 32, controversyRisk: 70, mediaFriendly: 58, audienceSplit: 70 },
    ratings: { tmdb: "7.0/10", imdb: "6.1/10", metacritic: "60/100", rottenTomatoes: "74%" },
  },
  {
    id: "star-wars-last-jedi",
    title: "星際大戰：最後的絕地武士",
    originalTitle: "Star Wars: The Last Jedi",
    year: 2017,
    posterFile: "Star_Wars_The_Last_Jedi.jpg",
    synopsis: "經典 IP 大膽重寫英雄神話，媒體高度肯定但粉絲社群強烈分裂。",
    tags: { genreSpectacle: 86, genrePrestige: 72, adaptation: 96, canonFaithful: 34, representation: 72, genderPowerShift: 78, issueInsertion: 54, commercialEntertainment: 78, controversyRisk: 92, mediaFriendly: 88, audienceAcceptance: 44, studioRisk: 86 },
    politicalIndex: { representation: 72, canonFaithful: 34, adaptationFreedom: 92, issueInsertion: 54, controversyRisk: 92, mediaFriendly: 88, audienceSplit: 96 },
    ratings: { tmdb: "6.8/10", imdb: "6.9/10", metacritic: "84/100", rottenTomatoes: "91%" },
    youtubeId: "Q0wbybIKac4",
  },
  {
    id: "matrix-resurrections",
    title: "駭客任務：復活",
    originalTitle: "The Matrix Resurrections",
    year: 2021,
    posterFile: "The_Matrix_Resurrections.jpg",
    synopsis: "經典科幻 IP 後設回歸，作者性強但商業娛樂性與觀眾接受度有限。",
    tags: { genrePrestige: 68, adaptation: 92, canonFaithful: 48, representation: 70, genderPowerShift: 64, issueInsertion: 70, commercialEntertainment: 44, controversyRisk: 72, mediaFriendly: 62, audienceAcceptance: 34, studioRisk: 78 },
    politicalIndex: { representation: 70, canonFaithful: 48, adaptationFreedom: 88, issueInsertion: 72, controversyRisk: 72, mediaFriendly: 62, audienceSplit: 78 },
    ratings: { tmdb: "6.4/10", imdb: "5.7/10", metacritic: "63/100", rottenTomatoes: "63%" },
  },
  {
    id: "oppenheimer",
    title: "奧本海默",
    originalTitle: "Oppenheimer",
    year: 2023,
    posterFile: "Oppenheimer_(film).jpg",
    synopsis: "歷史傳記與作者型大片結合，議題性高但文化壓力多集中在歷史倫理。",
    tags: { genrePrestige: 96, genreSpectacle: 72, representation: 34, genderPowerShift: 24, issueInsertion: 78, commercialEntertainment: 78, controversyRisk: 42, mediaFriendly: 96, audienceAcceptance: 88, studioRisk: 56, storyDriven: 88 },
    politicalIndex: { representation: 34, canonFaithful: 72, adaptationFreedom: 62, issueInsertion: 78, controversyRisk: 42, mediaFriendly: 96, audienceSplit: 28 },
    ratings: { tmdb: "8.1/10", imdb: "8.3/10", metacritic: "90/100", rottenTomatoes: "93%" },
    youtubeId: "uYPbbksJxIg",
  },
  {
    id: "parasite",
    title: "寄生上流",
    originalTitle: "Parasite",
    year: 2019,
    posterFile: "Parasite_(2019_film).png",
    synopsis: "階級寓言與黑色類型片高度融合，議題性強但觀眾接受度極高。",
    tags: { genrePrestige: 98, genreSpectacle: 42, representation: 66, issueInsertion: 92, commercialEntertainment: 76, controversyRisk: 28, mediaFriendly: 98, audienceAcceptance: 94, studioRisk: 52, storyDriven: 92 },
    politicalIndex: { representation: 66, canonFaithful: 74, adaptationFreedom: 68, issueInsertion: 92, controversyRisk: 28, mediaFriendly: 98, audienceSplit: 18 },
    ratings: { tmdb: "8.5/10", imdb: "8.5/10", metacritic: "97/100", rottenTomatoes: "99%" },
  },
  {
    id: "get-out",
    title: "逃出絕命鎮",
    originalTitle: "Get Out",
    year: 2017,
    posterFile: "Get_Out_poster.png",
    synopsis: "種族寓言與恐怖類型片結合，議題置入深但娛樂性與作者性支撐口碑。",
    tags: { genrePrestige: 90, representation: 78, issueInsertion: 94, commercialEntertainment: 78, controversyRisk: 38, mediaFriendly: 96, audienceAcceptance: 88, studioRisk: 58, storyDriven: 86 },
    politicalIndex: { representation: 78, canonFaithful: 76, adaptationFreedom: 72, issueInsertion: 94, controversyRisk: 38, mediaFriendly: 96, audienceSplit: 24 },
    ratings: { tmdb: "7.6/10", imdb: "7.8/10", metacritic: "85/100", rottenTomatoes: "98%" },
  },
  {
    id: "blackkklansman",
    title: "黑色黨徒",
    originalTitle: "BlacKkKlansman",
    year: 2018,
    posterFile: "BlacKkKlansman.png",
    synopsis: "明確政治寓言與歷史事件改編，媒體友善度高且議題立場鮮明。",
    tags: { genrePrestige: 90, adaptation: 72, canonFaithful: 66, representation: 82, issueInsertion: 96, commercialEntertainment: 64, controversyRisk: 48, mediaFriendly: 94, audienceAcceptance: 78, studioRisk: 58, storyDriven: 82 },
    politicalIndex: { representation: 82, canonFaithful: 66, adaptationFreedom: 70, issueInsertion: 96, controversyRisk: 48, mediaFriendly: 94, audienceSplit: 36 },
    ratings: { tmdb: "7.5/10", imdb: "7.5/10", metacritic: "83/100", rottenTomatoes: "96%" },
  },
  {
    id: "crazy-rich-asians",
    title: "瘋狂亞洲富豪",
    originalTitle: "Crazy Rich Asians",
    year: 2018,
    posterFile: "Crazy_Rich_Asians_poster.png",
    synopsis: "亞裔代表性與浪漫喜劇公式結合，文化意義與大眾娛樂性互相支撐。",
    tags: { genreSpectacle: 54, representation: 90, genderPowerShift: 62, issueInsertion: 44, commercialEntertainment: 86, controversyRisk: 24, mediaFriendly: 88, audienceAcceptance: 84, studioRisk: 36, storyDriven: 64 },
    politicalIndex: { representation: 90, canonFaithful: 72, adaptationFreedom: 58, issueInsertion: 44, controversyRisk: 24, mediaFriendly: 88, audienceSplit: 20 },
    ratings: { tmdb: "7.1/10", imdb: "6.9/10", metacritic: "74/100", rottenTomatoes: "91%" },
  },
  {
    id: "the-woman-king",
    title: "女王",
    originalTitle: "The Woman King",
    year: 2022,
    posterFile: "The_Woman_King_(film).jpg",
    synopsis: "女性戰士歷史動作片，代表性與史實爭議並存但動作娛樂性明確。",
    tags: { genreSpectacle: 76, genrePrestige: 70, representation: 88, genderPowerShift: 94, issueInsertion: 58, commercialEntertainment: 76, controversyRisk: 62, mediaFriendly: 82, audienceAcceptance: 72, studioRisk: 54 },
    politicalIndex: { representation: 88, canonFaithful: 54, adaptationFreedom: 66, issueInsertion: 58, controversyRisk: 62, mediaFriendly: 82, audienceSplit: 48 },
    ratings: { tmdb: "7.7/10", imdb: "6.9/10", metacritic: "77/100", rottenTomatoes: "94%" },
  },
  {
    id: "nomadland",
    title: "游牧人生",
    originalTitle: "Nomadland",
    year: 2020,
    posterFile: "Nomadland_poster.jpeg",
    synopsis: "社會邊緣與勞動困境被包裝成詩意作者電影，獎季友善但娛樂性低。",
    tags: { genrePrestige: 98, representation: 52, issueInsertion: 72, commercialEntertainment: 28, controversyRisk: 18, mediaFriendly: 96, audienceAcceptance: 66, studioRisk: 44, storyDriven: 74 },
    politicalIndex: { representation: 52, canonFaithful: 72, adaptationFreedom: 70, issueInsertion: 72, controversyRisk: 18, mediaFriendly: 96, audienceSplit: 38 },
    ratings: { tmdb: "7.2/10", imdb: "7.3/10", metacritic: "93/100", rottenTomatoes: "93%" },
  },
  {
    id: "avatar-way-of-water",
    title: "阿凡達：水之道",
    originalTitle: "Avatar: The Way of Water",
    year: 2022,
    posterFile: "Avatar_The_Way_of_Water_poster.jpg",
    synopsis: "視覺奇觀與環境寓言結合，低文化戰風險但高商業娛樂性。",
    tags: { genreSpectacle: 98, representation: 54, issueInsertion: 58, commercialEntertainment: 92, controversyRisk: 18, mediaFriendly: 76, audienceAcceptance: 86, studioRisk: 60, storyDriven: 58 },
    politicalIndex: { representation: 54, canonFaithful: 78, adaptationFreedom: 62, issueInsertion: 58, controversyRisk: 18, mediaFriendly: 76, audienceSplit: 22 },
    ratings: { tmdb: "7.6/10", imdb: "7.5/10", metacritic: "67/100", rottenTomatoes: "76%" },
  },
  {
    id: "mad-max-fury-road",
    title: "瘋狂麥斯：憤怒道",
    originalTitle: "Mad Max: Fury Road",
    year: 2015,
    posterFile: "Mad_Max_Fury_Road.jpg",
    synopsis: "末日動作奇觀與女性反抗敘事融合，商業娛樂與作者風格同時成立。",
    tags: { genreSpectacle: 98, genrePrestige: 86, adaptation: 74, canonFaithful: 76, representation: 74, genderPowerShift: 90, issueInsertion: 52, commercialEntertainment: 90, controversyRisk: 28, mediaFriendly: 96, audienceAcceptance: 88, studioRisk: 62 },
    politicalIndex: { representation: 74, canonFaithful: 76, adaptationFreedom: 70, issueInsertion: 52, controversyRisk: 28, mediaFriendly: 96, audienceSplit: 20 },
    ratings: { tmdb: "7.6/10", imdb: "8.1/10", metacritic: "90/100", rottenTomatoes: "97%" },
  },
  {
    id: "bros",
    title: "哥兒們",
    originalTitle: "Bros",
    year: 2022,
    posterFile: "Bros_(film).jpg",
    synopsis: "同志浪漫喜劇以代表性作為核心賣點，媒體好感與票房落差明顯。",
    tags: { genrePrestige: 58, representation: 96, genderPowerShift: 70, issueInsertion: 72, commercialEntertainment: 56, controversyRisk: 54, mediaFriendly: 84, audienceAcceptance: 42, studioRisk: 64 },
    politicalIndex: { representation: 96, canonFaithful: 70, adaptationFreedom: 70, issueInsertion: 72, controversyRisk: 54, mediaFriendly: 84, audienceSplit: 68 },
    ratings: { tmdb: "6.8/10", imdb: "6.4/10", metacritic: "72/100", rottenTomatoes: "88%" },
  },
  {
    id: "promising-young-woman",
    title: "花漾女子",
    originalTitle: "Promising Young Woman",
    year: 2020,
    posterFile: "Promising_Young_Woman_poster.jpg",
    synopsis: "復仇驚悚與性別議題高度綁定，媒體友善但觀眾分裂度中高。",
    tags: { genrePrestige: 88, representation: 76, genderPowerShift: 92, issueInsertion: 90, commercialEntertainment: 58, controversyRisk: 64, mediaFriendly: 90, audienceAcceptance: 72, studioRisk: 58, storyDriven: 84 },
    politicalIndex: { representation: 76, canonFaithful: 72, adaptationFreedom: 76, issueInsertion: 90, controversyRisk: 64, mediaFriendly: 90, audienceSplit: 58 },
    ratings: { tmdb: "7.4/10", imdb: "7.5/10", metacritic: "73/100", rottenTomatoes: "90%" },
  },
  {
    id: "turning-red",
    title: "青春養成記",
    originalTitle: "Turning Red",
    year: 2022,
    posterFile: "Turning_Red_poster.jpg",
    synopsis: "青春成長、亞裔家庭與女性身體經驗結合，代表性自然融入但受眾討論分歧。",
    tags: { genreSpectacle: 56, representation: 88, genderPowerShift: 80, issueInsertion: 58, commercialEntertainment: 78, controversyRisk: 46, mediaFriendly: 86, audienceAcceptance: 76, studioRisk: 34, storyDriven: 72 },
    politicalIndex: { representation: 88, canonFaithful: 76, adaptationFreedom: 68, issueInsertion: 58, controversyRisk: 46, mediaFriendly: 86, audienceSplit: 42 },
    ratings: { tmdb: "7.4/10", imdb: "7.0/10", metacritic: "83/100", rottenTomatoes: "95%" },
  },
  {
    id: "encanto",
    title: "魔法滿屋",
    originalTitle: "Encanto",
    year: 2021,
    posterFile: "Encanto_poster.jpg",
    synopsis: "拉丁文化、家庭創傷與迪士尼音樂類型融合，代表性與大眾娛樂性相互加分。",
    tags: { genreSpectacle: 72, representation: 90, genderPowerShift: 66, issueInsertion: 54, commercialEntertainment: 88, controversyRisk: 20, mediaFriendly: 88, audienceAcceptance: 88, studioRisk: 30, storyDriven: 70 },
    politicalIndex: { representation: 90, canonFaithful: 76, adaptationFreedom: 68, issueInsertion: 54, controversyRisk: 20, mediaFriendly: 88, audienceSplit: 20 },
    ratings: { tmdb: "7.6/10", imdb: "7.2/10", metacritic: "75/100", rottenTomatoes: "91%" },
  },
  {
    id: "poor-things",
    title: "可憐的東西",
    originalTitle: "Poor Things",
    year: 2023,
    posterFile: "Poorthings.jpg",
    synopsis: "女性主體、荒誕美學與作者風格高度結合，媒體熱愛但觀眾接受門檻較高。",
    tags: { genrePrestige: 96, representation: 74, genderPowerShift: 92, issueInsertion: 72, commercialEntertainment: 54, controversyRisk: 50, mediaFriendly: 96, audienceAcceptance: 72, studioRisk: 66, storyDriven: 84 },
    politicalIndex: { representation: 74, canonFaithful: 68, adaptationFreedom: 86, issueInsertion: 72, controversyRisk: 50, mediaFriendly: 96, audienceSplit: 46 },
    ratings: { tmdb: "7.7/10", imdb: "7.8/10", metacritic: "87/100", rottenTomatoes: "92%" },
  },
  {
    id: "sound-of-freedom",
    title: "自由之聲",
    originalTitle: "Sound of Freedom",
    year: 2023,
    posterFile: "Sound_of_Freedom_(film)_poster.jpg",
    synopsis: "社會議題與政治動員高度綁定，媒體與觀眾評價落差極大。",
    tags: { genreSpectacle: 48, genrePrestige: 32, issueInsertion: 82, commercialEntertainment: 62, controversyRisk: 88, mediaFriendly: 34, audienceAcceptance: 78, studioRisk: 70, storyDriven: 68 },
    politicalIndex: { representation: 42, canonFaithful: 66, adaptationFreedom: 58, issueInsertion: 82, controversyRisk: 88, mediaFriendly: 34, audienceSplit: 90 },
    ratings: { tmdb: "8.0/10", imdb: "7.6/10", metacritic: "36/100", rottenTomatoes: "57%" },
  },
  {
    id: "spider-verse",
    title: "蜘蛛人：穿越新宇宙",
    originalTitle: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    posterFile: "Spider-Man-_Across_the_Spider-Verse_poster.jpg",
    synopsis: "多元宇宙、族群代表與動畫實驗高度融合，媒體與觀眾同步支持。",
    tags: { genreSpectacle: 94, genrePrestige: 88, adaptation: 86, canonFaithful: 78, representation: 88, genderPowerShift: 72, issueInsertion: 54, commercialEntertainment: 92, controversyRisk: 18, mediaFriendly: 96, audienceAcceptance: 94, studioRisk: 48 },
    politicalIndex: { representation: 88, canonFaithful: 78, adaptationFreedom: 82, issueInsertion: 54, controversyRisk: 18, mediaFriendly: 96, audienceSplit: 16 },
    ratings: { tmdb: "8.4/10", imdb: "8.6/10", metacritic: "86/100", rottenTomatoes: "95%" },
  },
  {
    id: "anora",
    title: "艾諾拉",
    originalTitle: "Anora",
    year: 2024,
    posterFile: "Anora_(2024_film)_poster.jpg",
    synopsis: "性工作、階級差距與婚姻幻夢交錯，獎季聲量高但題材帶有成人爭議。",
    tags: { genrePrestige: 96, representation: 62, genderPowerShift: 74, issueInsertion: 70, commercialEntertainment: 62, controversyRisk: 44, mediaFriendly: 94, audienceAcceptance: 76, studioRisk: 58, storyDriven: 84 },
    politicalIndex: { representation: 62, canonFaithful: 72, adaptationFreedom: 80, issueInsertion: 70, controversyRisk: 44, mediaFriendly: 94, audienceSplit: 38 },
    ratings: { tmdb: "7.2/10", imdb: "7.6/10", metacritic: "91/100", rottenTomatoes: "93%" },
  },
  {
    id: "the-whale",
    title: "我的鯨魚老爸",
    originalTitle: "The Whale",
    year: 2022,
    posterFile: "TheWhalePoster.jpg",
    synopsis: "身體、羞恥、家庭創傷與救贖交織，表演受到肯定但呈現方式引發討論。",
    tags: { genrePrestige: 82, representation: 48, issueInsertion: 76, commercialEntertainment: 34, controversyRisk: 66, mediaFriendly: 68, audienceAcceptance: 68, studioRisk: 56, storyDriven: 90 },
    politicalIndex: { representation: 48, canonFaithful: 66, adaptationFreedom: 64, issueInsertion: 76, controversyRisk: 66, mediaFriendly: 68, audienceSplit: 58 },
    ratings: { tmdb: "7.8/10", imdb: "7.6/10", metacritic: "60/100", rottenTomatoes: "64%" },
  },
  {
    id: "the-northman",
    title: "北方人",
    originalTitle: "The Northman",
    year: 2022,
    posterFile: "The_Northman.png",
    synopsis: "北歐復仇史詩以暴力、神話與男性權力結構為核心，作者風格鮮明。",
    tags: { genreSpectacle: 76, genrePrestige: 86, representation: 24, issueInsertion: 28, commercialEntertainment: 58, controversyRisk: 18, mediaFriendly: 84, audienceAcceptance: 68, studioRisk: 62, storyDriven: 78 },
    politicalIndex: { representation: 24, canonFaithful: 72, adaptationFreedom: 76, issueInsertion: 28, controversyRisk: 18, mediaFriendly: 84, audienceSplit: 28 },
    ratings: { tmdb: "7.1/10", imdb: "7.0/10", metacritic: "82/100", rottenTomatoes: "90%" },
  },
  {
    id: "furiosa",
    title: "芙莉歐莎：瘋狂麥斯傳奇篇章",
    originalTitle: "Furiosa: A Mad Max Saga",
    year: 2024,
    posterFile: "Furiosa_A_Mad_Max_Saga.jpg",
    synopsis: "女性角色前傳以末世動作奇觀和權力復仇為核心，口碑高但商業表現承壓。",
    tags: { genreSpectacle: 92, genrePrestige: 76, adaptation: 78, canonFaithful: 74, representation: 72, genderPowerShift: 90, issueInsertion: 42, commercialEntertainment: 74, controversyRisk: 36, mediaFriendly: 82, audienceAcceptance: 70, studioRisk: 62 },
    politicalIndex: { representation: 72, canonFaithful: 74, adaptationFreedom: 68, issueInsertion: 42, controversyRisk: 36, mediaFriendly: 82, audienceSplit: 34 },
    ratings: { tmdb: "7.5/10", imdb: "7.5/10", metacritic: "79/100", rottenTomatoes: "90%" },
  },
  {
    id: "dont-look-up",
    title: "千萬別抬頭",
    originalTitle: "Don't Look Up",
    year: 2021,
    posterFile: "Don't_Look_Up_2021_film.jpg",
    synopsis: "氣候寓言、媒體荒謬與政治諷刺全開，話題性極強但評論分裂。",
    tags: { genrePrestige: 62, issueInsertion: 94, commercialEntertainment: 66, controversyRisk: 62, mediaFriendly: 54, audienceAcceptance: 72, studioRisk: 46, storyDriven: 64 },
    politicalIndex: { representation: 46, canonFaithful: 70, adaptationFreedom: 72, issueInsertion: 94, controversyRisk: 62, mediaFriendly: 54, audienceSplit: 60 },
    ratings: { tmdb: "7.1/10", imdb: "7.2/10", metacritic: "49/100", rottenTomatoes: "55%" },
  },
  {
    id: "civil-war",
    title: "帝國浩劫：美國內戰",
    originalTitle: "Civil War",
    year: 2024,
    posterFile: "Civil_War_2024_film_poster.jpeg",
    synopsis: "政治暴力與新聞攝影視角結合，用近未來內戰想像放大當代焦慮。",
    tags: { genreSpectacle: 76, genrePrestige: 80, representation: 58, issueInsertion: 86, commercialEntertainment: 66, controversyRisk: 70, mediaFriendly: 82, audienceAcceptance: 68, studioRisk: 64, storyDriven: 76 },
    politicalIndex: { representation: 58, canonFaithful: 70, adaptationFreedom: 76, issueInsertion: 86, controversyRisk: 70, mediaFriendly: 82, audienceSplit: 56 },
    ratings: { tmdb: "6.9/10", imdb: "7.0/10", metacritic: "75/100", rottenTomatoes: "81%" },
  },
  {
    id: "birds-of-prey",
    title: "猛禽小隊：小丑女大解放",
    originalTitle: "Birds of Prey",
    year: 2020,
    posterFile: "Birds_of_Prey_(2020_film)_poster.jpg",
    synopsis: "女性反英雄群像與漫畫改編結合，風格鮮明但商業接受度中等。",
    tags: { genreSpectacle: 74, adaptation: 82, canonFaithful: 58, representation: 78, genderPowerShift: 94, issueInsertion: 52, commercialEntertainment: 70, controversyRisk: 46, mediaFriendly: 76, audienceAcceptance: 62, studioRisk: 60 },
    politicalIndex: { representation: 78, canonFaithful: 58, adaptationFreedom: 78, issueInsertion: 52, controversyRisk: 46, mediaFriendly: 76, audienceSplit: 42 },
    ratings: { tmdb: "6.9/10", imdb: "6.1/10", metacritic: "60/100", rottenTomatoes: "78%" },
  },
  {
    id: "killers-of-flower-moon",
    title: "花月殺手",
    originalTitle: "Killers of the Flower Moon",
    year: 2023,
    posterFile: "Killers_of_the_Flower_Moon_film_poster.jpg",
    synopsis: "原住民歷史創傷、犯罪史詩與作者電影結合，評論高度肯定但觀影門檻高。",
    tags: { genrePrestige: 98, adaptation: 76, canonFaithful: 78, representation: 86, issueInsertion: 90, commercialEntertainment: 42, controversyRisk: 36, mediaFriendly: 96, audienceAcceptance: 74, studioRisk: 68, storyDriven: 92 },
    politicalIndex: { representation: 86, canonFaithful: 78, adaptationFreedom: 64, issueInsertion: 90, controversyRisk: 36, mediaFriendly: 96, audienceSplit: 34 },
    ratings: { tmdb: "7.4/10", imdb: "7.6/10", metacritic: "89/100", rottenTomatoes: "93%" },
    youtubeId: "EXi1w10sLz0",
  },
  {
    id: "wicked",
    title: "魔法壞女巫",
    originalTitle: "Wicked",
    year: 2024,
    posterFile: "Wicked_(2024_film)_poster.png",
    synopsis: "音樂劇改編以女性友誼、權力與偏見重讀經典反派形象，商業與口碑兼具。",
    tags: { genreSpectacle: 88, genrePrestige: 74, adaptation: 92, canonFaithful: 84, representation: 72, genderPowerShift: 86, issueInsertion: 58, commercialEntertainment: 90, controversyRisk: 28, mediaFriendly: 88, audienceAcceptance: 88, studioRisk: 58 },
    politicalIndex: { representation: 72, canonFaithful: 84, adaptationFreedom: 54, issueInsertion: 58, controversyRisk: 28, mediaFriendly: 88, audienceSplit: 22 },
    ratings: { tmdb: "7.6/10", imdb: "7.7/10", metacritic: "73/100", rottenTomatoes: "88%" },
  },
  {
    id: "inside-out-2",
    title: "腦筋急轉彎 2",
    originalTitle: "Inside Out 2",
    year: 2024,
    posterFile: "Inside_Out_2_poster.jpg",
    synopsis: "青春期焦慮與情緒擬人化結合，以親民娛樂包裝心理健康議題。",
    tags: { genreSpectacle: 70, genrePrestige: 70, representation: 56, genderPowerShift: 64, issueInsertion: 52, commercialEntertainment: 94, controversyRisk: 12, mediaFriendly: 84, audienceAcceptance: 94, studioRisk: 26, storyDriven: 72 },
    politicalIndex: { representation: 56, canonFaithful: 82, adaptationFreedom: 48, issueInsertion: 52, controversyRisk: 12, mediaFriendly: 84, audienceSplit: 12 },
    ratings: { tmdb: "7.6/10", imdb: "7.6/10", metacritic: "73/100", rottenTomatoes: "91%" },
  },
  {
    id: "the-batman",
    title: "蝙蝠俠",
    originalTitle: "The Batman",
    year: 2022,
    posterFile: "The_Batman_(film)_poster.jpg",
    synopsis: "黑色偵探風格重啟超級英雄 IP，以腐敗城市與陰鬱調性重新包裝經典角色。",
    tags: { genreSpectacle: 86, genrePrestige: 76, adaptation: 94, canonFaithful: 84, representation: 42, issueInsertion: 52, commercialEntertainment: 86, controversyRisk: 22, mediaFriendly: 88, audienceAcceptance: 86, studioRisk: 52, storyDriven: 80 },
    politicalIndex: { representation: 42, canonFaithful: 84, adaptationFreedom: 58, issueInsertion: 52, controversyRisk: 22, mediaFriendly: 88, audienceSplit: 24 },
    ratings: { tmdb: "7.7/10", imdb: "7.8/10", metacritic: "72/100", rottenTomatoes: "85%" },
  },
  {
    id: "shang-chi",
    title: "尚氣與十環傳奇",
    originalTitle: "Shang-Chi and the Legend of the Ten Rings",
    year: 2021,
    posterFile: "Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpeg",
    synopsis: "亞裔超級英雄與家庭武俠敘事進入漫威主流，代表性與商業娛樂性並行。",
    tags: { genreSpectacle: 88, adaptation: 82, canonFaithful: 70, representation: 92, genderPowerShift: 54, issueInsertion: 44, commercialEntertainment: 90, controversyRisk: 26, mediaFriendly: 90, audienceAcceptance: 86, studioRisk: 48 },
    politicalIndex: { representation: 92, canonFaithful: 70, adaptationFreedom: 64, issueInsertion: 44, controversyRisk: 26, mediaFriendly: 90, audienceSplit: 24 },
    ratings: { tmdb: "7.5/10", imdb: "7.4/10", metacritic: "71/100", rottenTomatoes: "91%" },
  },
  {
    id: "eternals",
    title: "永恆族",
    originalTitle: "Eternals",
    year: 2021,
    posterFile: "Eternals_(film)_poster.jpeg",
    synopsis: "漫威試圖用多元群像與神話史詩擴張宇宙，但節奏與角色負載引發分裂。",
    tags: { genreSpectacle: 84, genrePrestige: 52, adaptation: 84, canonFaithful: 54, representation: 94, genderPowerShift: 74, issueInsertion: 58, commercialEntertainment: 64, controversyRisk: 72, mediaFriendly: 58, audienceAcceptance: 48, studioRisk: 82 },
    politicalIndex: { representation: 94, canonFaithful: 54, adaptationFreedom: 78, issueInsertion: 58, controversyRisk: 72, mediaFriendly: 58, audienceSplit: 76 },
    ratings: { tmdb: "6.8/10", imdb: "6.3/10", metacritic: "52/100", rottenTomatoes: "47%" },
  },
  {
    id: "moonlight",
    title: "月光下的藍色男孩",
    originalTitle: "Moonlight",
    year: 2016,
    posterFile: "Moonlight_(2016_film).png",
    synopsis: "黑人男性、酷兒身份與成長創傷以細膩作者風格呈現，獎季影響力極高。",
    tags: { genrePrestige: 98, representation: 96, genderPowerShift: 60, issueInsertion: 92, commercialEntertainment: 28, controversyRisk: 24, mediaFriendly: 98, audienceAcceptance: 82, studioRisk: 44, storyDriven: 94 },
    politicalIndex: { representation: 96, canonFaithful: 74, adaptationFreedom: 72, issueInsertion: 92, controversyRisk: 24, mediaFriendly: 98, audienceSplit: 20 },
    ratings: { tmdb: "7.4/10", imdb: "7.4/10", metacritic: "99/100", rottenTomatoes: "98%" },
  },
  {
    id: "green-book",
    title: "幸福綠皮書",
    originalTitle: "Green Book",
    year: 2018,
    posterFile: "Green_Book_(2018_poster).png",
    synopsis: "種族和解公路片以親民敘事取得大眾支持，但也被批評過度簡化歷史壓力。",
    tags: { genrePrestige: 78, representation: 70, issueInsertion: 76, commercialEntertainment: 78, controversyRisk: 58, mediaFriendly: 72, audienceAcceptance: 88, studioRisk: 46, storyDriven: 78 },
    politicalIndex: { representation: 70, canonFaithful: 66, adaptationFreedom: 62, issueInsertion: 76, controversyRisk: 58, mediaFriendly: 72, audienceSplit: 54 },
    ratings: { tmdb: "8.2/10", imdb: "8.2/10", metacritic: "69/100", rottenTomatoes: "77%" },
  },
  {
    id: "coda",
    title: "樂動心旋律",
    originalTitle: "CODA",
    year: 2021,
    posterFile: "Coda_poster.jpeg",
    synopsis: "聽障家庭、成長與音樂夢想結合，以溫暖主流敘事降低代表性題材門檻。",
    tags: { genrePrestige: 88, representation: 92, issueInsertion: 64, commercialEntertainment: 74, controversyRisk: 12, mediaFriendly: 94, audienceAcceptance: 90, studioRisk: 34, storyDriven: 86 },
    politicalIndex: { representation: 92, canonFaithful: 76, adaptationFreedom: 60, issueInsertion: 64, controversyRisk: 12, mediaFriendly: 94, audienceSplit: 10 },
    ratings: { tmdb: "7.9/10", imdb: "8.0/10", metacritic: "74/100", rottenTomatoes: "94%" },
  },
  {
    id: "shape-of-water",
    title: "水底情深",
    originalTitle: "The Shape of Water",
    year: 2017,
    posterFile: "The_Shape_of_Water_(film).png",
    synopsis: "奇幻愛情、冷戰寓言與邊緣者同盟結合，作者風格與獎季友善度都很高。",
    tags: { genrePrestige: 96, genreSpectacle: 58, representation: 78, genderPowerShift: 74, issueInsertion: 72, commercialEntertainment: 56, controversyRisk: 36, mediaFriendly: 96, audienceAcceptance: 78, studioRisk: 54, storyDriven: 86 },
    politicalIndex: { representation: 78, canonFaithful: 70, adaptationFreedom: 82, issueInsertion: 72, controversyRisk: 36, mediaFriendly: 96, audienceSplit: 32 },
    ratings: { tmdb: "7.2/10", imdb: "7.3/10", metacritic: "87/100", rottenTomatoes: "92%" },
  },
  {
    id: "knives-out",
    title: "鋒迴路轉",
    originalTitle: "Knives Out",
    year: 2019,
    posterFile: "Knives_Out_poster.jpeg",
    synopsis: "古典推理包裝階級、移民與家族權力諷刺，娛樂性強且議題不壓戲。",
    tags: { genreSpectacle: 54, genrePrestige: 78, representation: 66, issueInsertion: 70, commercialEntertainment: 88, controversyRisk: 24, mediaFriendly: 92, audienceAcceptance: 90, studioRisk: 34, storyDriven: 82 },
    politicalIndex: { representation: 66, canonFaithful: 72, adaptationFreedom: 78, issueInsertion: 70, controversyRisk: 24, mediaFriendly: 92, audienceSplit: 18 },
    ratings: { tmdb: "7.8/10", imdb: "7.9/10", metacritic: "82/100", rottenTomatoes: "97%" },
  },
  {
    id: "john-wick-4",
    title: "捍衛任務 4",
    originalTitle: "John Wick: Chapter 4",
    year: 2023,
    posterFile: "John_Wick_-_Chapter_4_promotional_poster.jpg",
    synopsis: "動作編排與類型美學拉滿，議題壓力極低，觀眾主要用爽感與完成度評價。",
    tags: { genreSpectacle: 96, adaptation: 82, canonFaithful: 84, representation: 24, issueInsertion: 12, commercialEntertainment: 94, controversyRisk: 10, mediaFriendly: 78, audienceAcceptance: 92, studioRisk: 30, storyDriven: 42 },
    politicalIndex: { representation: 24, canonFaithful: 84, adaptationFreedom: 48, issueInsertion: 12, controversyRisk: 10, mediaFriendly: 78, audienceSplit: 10 },
    ratings: { tmdb: "7.7/10", imdb: "7.7/10", metacritic: "78/100", rottenTomatoes: "94%" },
  },
  {
    id: "mission-impossible-dead-reckoning",
    title: "不可能的任務：致命清算 第一章",
    originalTitle: "Mission: Impossible - Dead Reckoning Part One",
    year: 2023,
    posterFile: "Mission-_Impossible_–_Dead_Reckoning_Part_One_poster.jpg",
    synopsis: "明星驅動的實拍動作大片，以奇觀、追逐和系列信任感降低文化爭議干擾。",
    tags: { genreSpectacle: 96, adaptation: 86, canonFaithful: 82, representation: 30, genderPowerShift: 34, issueInsertion: 18, commercialEntertainment: 92, controversyRisk: 12, mediaFriendly: 84, audienceAcceptance: 88, studioRisk: 42, storyDriven: 52 },
    politicalIndex: { representation: 30, canonFaithful: 82, adaptationFreedom: 50, issueInsertion: 18, controversyRisk: 12, mediaFriendly: 84, audienceSplit: 12 },
    ratings: { tmdb: "7.5/10", imdb: "7.6/10", metacritic: "81/100", rottenTomatoes: "96%" },
  },
  {
    id: "super-mario-bros-movie",
    title: "超級瑪利歐兄弟電影版",
    originalTitle: "The Super Mario Bros. Movie",
    year: 2023,
    posterFile: "The_Super_Mario_Bros._Movie_poster.jpg",
    synopsis: "經典遊戲 IP 以粉絲服務和家庭娛樂取勝，評論普通但大眾接受度極高。",
    tags: { genreSpectacle: 78, adaptation: 96, canonFaithful: 88, representation: 34, issueInsertion: 8, commercialEntertainment: 98, controversyRisk: 8, mediaFriendly: 62, audienceAcceptance: 96, studioRisk: 24, storyDriven: 36 },
    politicalIndex: { representation: 34, canonFaithful: 88, adaptationFreedom: 36, issueInsertion: 8, controversyRisk: 8, mediaFriendly: 62, audienceSplit: 12 },
    ratings: { tmdb: "7.6/10", imdb: "7.0/10", metacritic: "46/100", rottenTomatoes: "59%" },
  },
  {
    id: "godzilla-minus-one",
    title: "哥吉拉 -1.0",
    originalTitle: "Godzilla Minus One",
    year: 2023,
    posterFile: "Godzilla_Minus_One_Poster.jpeg",
    synopsis: "怪獸奇觀與戰後創傷結合，議題服務角色而不壓過娛樂性，口碑與觀眾回收都強。",
    tags: { genreSpectacle: 92, genrePrestige: 82, adaptation: 84, canonFaithful: 82, representation: 58, issueInsertion: 52, commercialEntertainment: 88, controversyRisk: 8, mediaFriendly: 92, audienceAcceptance: 94, studioRisk: 34, storyDriven: 78 },
    politicalIndex: { representation: 58, canonFaithful: 82, adaptationFreedom: 52, issueInsertion: 52, controversyRisk: 8, mediaFriendly: 92, audienceSplit: 8 },
    ratings: { tmdb: "7.6/10", imdb: "7.7/10", metacritic: "81/100", rottenTomatoes: "98%" },
  },
  {
    id: "dungeons-dragons-honor-among-thieves",
    title: "龍與地下城：盜賊榮耀",
    originalTitle: "Dungeons & Dragons: Honor Among Thieves",
    year: 2023,
    posterFile: "Theatrical_poster_for_Dungeons_and_Dragons,_Honor_Among_Thieves.jpg",
    synopsis: "桌遊 IP 改編成輕快冒險喜劇，以團隊魅力和娛樂節奏降低原作門檻。",
    tags: { genreSpectacle: 82, adaptation: 88, canonFaithful: 76, representation: 62, genderPowerShift: 54, issueInsertion: 18, commercialEntertainment: 88, controversyRisk: 10, mediaFriendly: 88, audienceAcceptance: 86, studioRisk: 36, storyDriven: 56 },
    politicalIndex: { representation: 62, canonFaithful: 76, adaptationFreedom: 58, issueInsertion: 18, controversyRisk: 10, mediaFriendly: 88, audienceSplit: 10 },
    ratings: { tmdb: "7.3/10", imdb: "7.2/10", metacritic: "72/100", rottenTomatoes: "91%" },
  },
  {
    id: "ford-v-ferrari",
    title: "賽道狂人",
    originalTitle: "Ford v Ferrari",
    year: 2019,
    posterFile: "Ford_v._Ferrari_(2019_film_poster).png",
    synopsis: "賽車、工業競爭與男性友誼形成傳統商業口碑片，文化壓力低且觀眾接受度高。",
    tags: { genreSpectacle: 82, genrePrestige: 76, representation: 22, issueInsertion: 16, commercialEntertainment: 86, controversyRisk: 6, mediaFriendly: 84, audienceAcceptance: 92, studioRisk: 28, storyDriven: 72 },
    politicalIndex: { representation: 22, canonFaithful: 78, adaptationFreedom: 42, issueInsertion: 16, controversyRisk: 6, mediaFriendly: 84, audienceSplit: 8 },
    ratings: { tmdb: "8.0/10", imdb: "8.1/10", metacritic: "81/100", rottenTomatoes: "92%" },
  },
  {
    id: "gran-turismo",
    title: "跑車浪漫旅",
    originalTitle: "Gran Turismo",
    year: 2023,
    posterFile: "GranTurismoMoviePoster.jpeg",
    synopsis: "遊戲品牌、賽車運動與勵志傳記結合，是低議題、強商業、安全娛樂的樣本。",
    tags: { genreSpectacle: 78, adaptation: 82, canonFaithful: 72, representation: 28, issueInsertion: 14, commercialEntertainment: 82, controversyRisk: 8, mediaFriendly: 72, audienceAcceptance: 82, studioRisk: 30, storyDriven: 62 },
    politicalIndex: { representation: 28, canonFaithful: 72, adaptationFreedom: 48, issueInsertion: 14, controversyRisk: 8, mediaFriendly: 72, audienceSplit: 12 },
    ratings: { tmdb: "7.8/10", imdb: "7.1/10", metacritic: "48/100", rottenTomatoes: "65%" },
  },
  {
    id: "sonic-the-hedgehog",
    title: "音速小子",
    originalTitle: "Sonic the Hedgehog",
    year: 2020,
    posterFile: "Sonic_the_Hedgehog_film_poster.jpg",
    synopsis: "遊戲 IP 家庭娛樂片，經歷角色造型修正後回收觀眾信任，是低風險商業改編樣本。",
    tags: { genreSpectacle: 68, adaptation: 90, canonFaithful: 76, representation: 30, issueInsertion: 8, commercialEntertainment: 86, controversyRisk: 18, mediaFriendly: 70, audienceAcceptance: 84, studioRisk: 42, storyDriven: 36 },
    politicalIndex: { representation: 30, canonFaithful: 76, adaptationFreedom: 54, issueInsertion: 8, controversyRisk: 18, mediaFriendly: 70, audienceSplit: 20 },
    ratings: { tmdb: "7.3/10", imdb: "6.5/10", metacritic: "47/100", rottenTomatoes: "64%" },
  },
  {
    id: "nimona",
    title: "妮莫娜",
    originalTitle: "Nimona",
    year: 2023,
    posterFile: "Nimona_poster.png",
    synopsis: "酷兒寓言、怪物身份與反體制奇幻冒險結合，代表性明確但完成度讓口碑偏正面。",
    tags: { genreSpectacle: 70, genrePrestige: 78, adaptation: 76, canonFaithful: 62, representation: 94, genderPowerShift: 82, issueInsertion: 78, commercialEntertainment: 78, controversyRisk: 34, mediaFriendly: 92, audienceAcceptance: 86, studioRisk: 50, storyDriven: 84 },
    politicalIndex: { representation: 94, canonFaithful: 62, adaptationFreedom: 76, issueInsertion: 80, controversyRisk: 34, mediaFriendly: 92, audienceSplit: 28 },
    ratings: { tmdb: "7.9/10", imdb: "7.5/10", metacritic: "75/100", rottenTomatoes: "93%" },
  },
  {
    id: "american-fiction",
    title: "美國小說",
    originalTitle: "American Fiction",
    year: 2023,
    posterFile: "American_fiction_xxlg.jpg",
    synopsis: "以出版業、黑人身份商品化與菁英文化諷刺為核心，議題尖銳但靠喜劇降低距離。",
    tags: { genrePrestige: 90, representation: 86, issueInsertion: 86, commercialEntertainment: 72, controversyRisk: 36, mediaFriendly: 92, audienceAcceptance: 84, studioRisk: 42, storyDriven: 88 },
    politicalIndex: { representation: 86, canonFaithful: 70, adaptationFreedom: 72, issueInsertion: 86, controversyRisk: 36, mediaFriendly: 92, audienceSplit: 30 },
    ratings: { tmdb: "7.3/10", imdb: "7.5/10", metacritic: "81/100", rottenTomatoes: "93%" },
  },
  {
    id: "rustin",
    title: "魯斯汀",
    originalTitle: "Rustin",
    year: 2023,
    posterFile: "RUSTIN_poster.jpg",
    synopsis: "以民權運動組織者與同志身份為核心的傳記片，代表性與歷史補白是主要價值。",
    tags: { genrePrestige: 84, representation: 92, genderPowerShift: 48, issueInsertion: 90, commercialEntertainment: 52, controversyRisk: 28, mediaFriendly: 88, audienceAcceptance: 76, studioRisk: 40, storyDriven: 82 },
    politicalIndex: { representation: 92, canonFaithful: 82, adaptationFreedom: 58, issueInsertion: 90, controversyRisk: 28, mediaFriendly: 88, audienceSplit: 24 },
    ratings: { tmdb: "6.7/10", imdb: "6.6/10", metacritic: "68/100", rottenTomatoes: "84%" },
  },
  {
    id: "strange-world",
    title: "奇異冒險",
    originalTitle: "Strange World",
    year: 2022,
    posterFile: "Strange_World_poster.jpg",
    synopsis: "家庭動畫把環境寓言與酷兒青少年角色放進主流冒險框架，商業反應偏弱。",
    tags: { genreSpectacle: 70, adaptation: 18, canonFaithful: 56, representation: 88, genderPowerShift: 66, issueInsertion: 64, commercialEntertainment: 58, controversyRisk: 64, mediaFriendly: 62, audienceAcceptance: 46, studioRisk: 74, storyDriven: 64 },
    politicalIndex: { representation: 88, canonFaithful: 56, adaptationFreedom: 82, issueInsertion: 64, controversyRisk: 64, mediaFriendly: 62, audienceSplit: 66 },
    ratings: { tmdb: "6.3/10", imdb: "5.7/10", metacritic: "65/100", rottenTomatoes: "72%" },
  },
  {
    id: "joy-ride",
    title: "兜風",
    originalTitle: "Joy Ride",
    year: 2023,
    posterFile: "Joy_Ride_2023_film.jpg",
    synopsis: "亞裔女性群像、身份尋根與成人喜劇混合，代表性高但以粗口娛樂降低說教感。",
    tags: { genreSpectacle: 46, genrePrestige: 62, representation: 92, genderPowerShift: 84, issueInsertion: 58, commercialEntertainment: 82, controversyRisk: 24, mediaFriendly: 86, audienceAcceptance: 78, studioRisk: 38, storyDriven: 66 },
    politicalIndex: { representation: 92, canonFaithful: 68, adaptationFreedom: 78, issueInsertion: 58, controversyRisk: 24, mediaFriendly: 86, audienceSplit: 22 },
    ratings: { tmdb: "6.5/10", imdb: "6.4/10", metacritic: "75/100", rottenTomatoes: "90%" },
  },
  {
    id: "bottoms",
    title: "墊底俱樂部",
    originalTitle: "Bottoms",
    year: 2023,
    posterFile: "Bottoms_poster.jpeg",
    synopsis: "酷兒校園喜劇用荒謬暴力和反類型笑點處理性別權力，受眾明確且口碑集中。",
    tags: { genrePrestige: 70, representation: 90, genderPowerShift: 88, issueInsertion: 62, commercialEntertainment: 76, controversyRisk: 32, mediaFriendly: 84, audienceAcceptance: 78, studioRisk: 42, storyDriven: 62 },
    politicalIndex: { representation: 90, canonFaithful: 62, adaptationFreedom: 82, issueInsertion: 62, controversyRisk: 32, mediaFriendly: 84, audienceSplit: 28 },
    ratings: { tmdb: "6.7/10", imdb: "6.7/10", metacritic: "77/100", rottenTomatoes: "90%" },
  },
];

const gameSeeds: GameSeed[] = [
  {
    id: "last-of-us-part-ii",
    title: "最後生還者 二部曲 重製版",
    originalTitle: "The Last of Us Part II Remastered",
    year: 2024,
    steamAppId: 2531310,
    synopsis: "高預算劇情導向遊戲，以角色轉換、復仇倫理與代表性引爆玩家分裂。",
    tags: { genrePrestige: 92, adaptation: 46, canonFaithful: 34, representation: 86, genderPowerShift: 88, issueInsertion: 78, commercialEntertainment: 72, controversyRisk: 94, mediaFriendly: 96, audienceAcceptance: 48, playerFreedom: 24, storyDriven: 98, studioRisk: 86 },
    politicalIndex: { representation: 90, canonFaithful: 42, adaptationFreedom: 82, issueInsertion: 80, controversyRisk: 96, mediaFriendly: 95, audienceSplit: 96 },
    ratings: { rawg: "4.3/5", metacritic: "93/100", steam: "Very Positive" },
    youtubeId: "II5UsqP2JAk",
  },
  {
    id: "hogwarts-legacy",
    title: "霍格華茲的傳承",
    originalTitle: "Hogwarts Legacy",
    year: 2023,
    steamAppId: 990080,
    synopsis: "大型 IP 開放世界，原作情懷與作者爭議讓商業成績和輿論壓力並存。",
    tags: { genreSpectacle: 82, adaptation: 96, canonFaithful: 84, representation: 48, issueInsertion: 24, commercialEntertainment: 92, controversyRisk: 92, mediaFriendly: 42, audienceAcceptance: 82, playerFreedom: 72, storyDriven: 54, studioRisk: 66 },
    politicalIndex: { representation: 48, canonFaithful: 86, adaptationFreedom: 48, issueInsertion: 22, controversyRisk: 92, mediaFriendly: 44, audienceSplit: 74 },
    ratings: { rawg: "4.0/5", metacritic: "84/100", steam: "Very Positive" },
    youtubeId: "A_vn8J4818o",
  },
  {
    id: "cyberpunk-2077",
    title: "電馭叛客 2077",
    originalTitle: "Cyberpunk 2077",
    year: 2020,
    steamAppId: 1091500,
    synopsis: "高自由度科幻 RPG，身份、身體、階級壓迫與企業權力議題強烈；首發技術爭議另屬開發風險。",
    tags: { genreSpectacle: 90, genrePrestige: 58, adaptation: 76, canonFaithful: 70, representation: 58, genderPowerShift: 58, issueInsertion: 78, commercialEntertainment: 84, controversyRisk: 38, mediaFriendly: 62, audienceAcceptance: 66, monetizationPressure: 32, playerFreedom: 86, storyDriven: 78, studioRisk: 90 },
    politicalIndex: { representation: 58, canonFaithful: 70, adaptationFreedom: 76, issueInsertion: 78, controversyRisk: 38, mediaFriendly: 62, audienceSplit: 42 },
    ratings: { rawg: "4.1/5", metacritic: "86/100", steam: "Very Positive" },
  },
  {
    id: "baldurs-gate-3",
    title: "柏德之門 3",
    originalTitle: "Baldur's Gate 3",
    year: 2023,
    steamAppId: 1086940,
    synopsis: "CRPG 高自由度與角色多樣性並行，讓包容性選項成為玩家主導的一部分。",
    tags: { genrePrestige: 88, adaptation: 78, canonFaithful: 82, representation: 82, genderPowerShift: 72, issueInsertion: 48, commercialEntertainment: 84, controversyRisk: 28, mediaFriendly: 90, audienceAcceptance: 94, monetizationPressure: 10, playerFreedom: 98, storyDriven: 88, studioRisk: 74 },
    politicalIndex: { representation: 84, canonFaithful: 82, adaptationFreedom: 78, issueInsertion: 48, controversyRisk: 30, mediaFriendly: 90, audienceSplit: 26 },
    ratings: { rawg: "4.5/5", metacritic: "96/100", steam: "Overwhelmingly Positive" },
    youtubeId: "J69kZ96uTmc",
  },
  {
    id: "starfield",
    title: "星空",
    originalTitle: "Starfield",
    year: 2023,
    steamAppId: 1716740,
    synopsis: "大型科幻 RPG 具備角色自訂與探索自由，但設計保守使媒體與玩家評價落差。",
    tags: { genreSpectacle: 76, genrePrestige: 52, representation: 62, genderPowerShift: 48, issueInsertion: 38, commercialEntertainment: 74, controversyRisk: 54, mediaFriendly: 64, audienceAcceptance: 56, monetizationPressure: 18, playerFreedom: 76, storyDriven: 54, studioRisk: 46 },
    politicalIndex: { representation: 62, canonFaithful: 64, adaptationFreedom: 70, issueInsertion: 38, controversyRisk: 54, mediaFriendly: 64, audienceSplit: 62 },
    ratings: { rawg: "3.5/5", metacritic: "83/100", steam: "Mixed" },
  },
  {
    id: "elden-ring",
    title: "艾爾登法環",
    originalTitle: "Elden Ring",
    year: 2022,
    steamAppId: 1245620,
    synopsis: "低議題置入、高玩家自由與高完成度的開放世界動作 RPG，口碑集中在玩法與探索。",
    tags: { genreSpectacle: 84, genrePrestige: 86, adaptation: 24, canonFaithful: 70, representation: 22, genderPowerShift: 30, issueInsertion: 10, commercialEntertainment: 88, controversyRisk: 18, mediaFriendly: 92, audienceAcceptance: 94, monetizationPressure: 8, playerFreedom: 96, storyDriven: 54, studioRisk: 40 },
    politicalIndex: { representation: 22, canonFaithful: 70, adaptationFreedom: 64, issueInsertion: 10, controversyRisk: 18, mediaFriendly: 92, audienceSplit: 18 },
    ratings: { rawg: "4.6/5", metacritic: "96/100", steam: "Very Positive" },
    youtubeId: "ExkM9eaL0C0",
  },
  {
    id: "helldivers-2",
    title: "絕地戰兵 2",
    originalTitle: "Helldivers 2",
    year: 2024,
    steamAppId: 553850,
    synopsis: "合作射擊以諷刺式民主敘事包裝娛樂循環，社群事件能快速放大口碑波動。",
    tags: { genreSpectacle: 88, genrePrestige: 34, representation: 34, genderPowerShift: 30, issueInsertion: 38, commercialEntertainment: 94, controversyRisk: 28, mediaFriendly: 78, audienceAcceptance: 82, monetizationPressure: 42, playerFreedom: 76, storyDriven: 24, studioRisk: 54 },
    politicalIndex: { representation: 34, canonFaithful: 60, adaptationFreedom: 68, issueInsertion: 38, controversyRisk: 28, mediaFriendly: 78, audienceSplit: 34 },
    ratings: { rawg: "4.1/5", metacritic: "82/100", steam: "Mostly Positive" },
  },
  {
    id: "disco-elysium",
    title: "極樂迪斯科",
    originalTitle: "Disco Elysium",
    year: 2019,
    steamAppId: 632470,
    synopsis: "強政治文本與角色扮演深度結合，議題濃度高但靠寫作與自由度取得高度評價。",
    tags: { genrePrestige: 96, representation: 58, genderPowerShift: 46, issueInsertion: 96, commercialEntertainment: 42, controversyRisk: 42, mediaFriendly: 94, audienceAcceptance: 82, monetizationPressure: 6, playerFreedom: 88, storyDriven: 96, studioRisk: 70 },
    politicalIndex: { representation: 58, canonFaithful: 68, adaptationFreedom: 74, issueInsertion: 96, controversyRisk: 42, mediaFriendly: 94, audienceSplit: 36 },
    ratings: { rawg: "4.4/5", metacritic: "91/100", steam: "Very Positive" },
  },
  {
    id: "god-of-war",
    title: "戰神",
    originalTitle: "God of War",
    year: 2018,
    steamAppId: 1593500,
    synopsis: "父子敘事、神話重構與高完成度動作冒險結合，文化壓力低但情感口碑高。",
    tags: { genreSpectacle: 86, genrePrestige: 86, adaptation: 70, canonFaithful: 72, representation: 28, issueInsertion: 34, commercialEntertainment: 90, controversyRisk: 18, mediaFriendly: 92, audienceAcceptance: 94, playerFreedom: 52, storyDriven: 88, studioRisk: 38 },
    politicalIndex: { representation: 28, canonFaithful: 72, adaptationFreedom: 68, issueInsertion: 34, controversyRisk: 18, mediaFriendly: 92, audienceSplit: 16 },
    ratings: { rawg: "4.6/5", metacritic: "94/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "spider-man-remastered",
    title: "漫威蜘蛛人 重製版",
    originalTitle: "Marvel's Spider-Man Remastered",
    year: 2022,
    steamAppId: 1817070,
    synopsis: "超級英雄開放城市與大眾娛樂體驗結合，低爭議高接受度。",
    tags: { genreSpectacle: 88, adaptation: 84, canonFaithful: 86, representation: 54, issueInsertion: 26, commercialEntertainment: 92, controversyRisk: 14, mediaFriendly: 82, audienceAcceptance: 92, playerFreedom: 74, storyDriven: 72, studioRisk: 26 },
    politicalIndex: { representation: 54, canonFaithful: 86, adaptationFreedom: 50, issueInsertion: 26, controversyRisk: 14, mediaFriendly: 82, audienceSplit: 14 },
    ratings: { rawg: "4.4/5", metacritic: "87/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "horizon-zero-dawn",
    title: "地平線：期待黎明",
    originalTitle: "Horizon Zero Dawn",
    year: 2020,
    steamAppId: 1151640,
    synopsis: "女性主角科幻開放世界，代表性自然融入探索與戰鬥循環。",
    tags: { genreSpectacle: 84, genrePrestige: 66, representation: 78, genderPowerShift: 86, issueInsertion: 38, commercialEntertainment: 86, controversyRisk: 22, mediaFriendly: 82, audienceAcceptance: 84, playerFreedom: 82, storyDriven: 72, studioRisk: 44 },
    politicalIndex: { representation: 78, canonFaithful: 72, adaptationFreedom: 70, issueInsertion: 38, controversyRisk: 22, mediaFriendly: 82, audienceSplit: 20 },
    ratings: { rawg: "4.3/5", metacritic: "84/100", steam: "Very Positive" },
  },
  {
    id: "red-dead-redemption-2",
    title: "碧血狂殺 2",
    originalTitle: "Red Dead Redemption 2",
    year: 2019,
    steamAppId: 1174180,
    synopsis: "西部史詩與角色悲劇兼具高自由度和強敘事，口碑集中在世界建構。",
    tags: { genreSpectacle: 86, genrePrestige: 92, representation: 34, issueInsertion: 46, commercialEntertainment: 90, controversyRisk: 18, mediaFriendly: 94, audienceAcceptance: 94, playerFreedom: 92, storyDriven: 94, studioRisk: 48 },
    politicalIndex: { representation: 34, canonFaithful: 78, adaptationFreedom: 76, issueInsertion: 46, controversyRisk: 18, mediaFriendly: 94, audienceSplit: 14 },
    ratings: { rawg: "4.6/5", metacritic: "93/100", steam: "Very Positive" },
  },
  {
    id: "witcher-3",
    title: "巫師 3：狂獵",
    originalTitle: "The Witcher 3: Wild Hunt",
    year: 2015,
    steamAppId: 292030,
    synopsis: "小說改編奇幻 RPG，以任務寫作、道德選擇與開放世界建立長尾口碑。",
    tags: { genrePrestige: 88, genreSpectacle: 82, adaptation: 90, canonFaithful: 78, representation: 42, issueInsertion: 46, commercialEntertainment: 88, controversyRisk: 16, mediaFriendly: 92, audienceAcceptance: 96, playerFreedom: 90, storyDriven: 90, studioRisk: 38 },
    politicalIndex: { representation: 42, canonFaithful: 78, adaptationFreedom: 70, issueInsertion: 46, controversyRisk: 16, mediaFriendly: 92, audienceSplit: 12 },
    ratings: { rawg: "4.7/5", metacritic: "93/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "gta-v",
    title: "俠盜獵車手 V",
    originalTitle: "Grand Theft Auto V",
    year: 2015,
    steamAppId: 271590,
    synopsis: "高自由度犯罪沙盒以諷刺和娛樂性取勝，爭議存在但商業接受度極高。",
    tags: { genreSpectacle: 92, commercialEntertainment: 96, controversyRisk: 66, mediaFriendly: 70, audienceAcceptance: 94, playerFreedom: 96, storyDriven: 66, monetizationPressure: 58, studioRisk: 48 },
    politicalIndex: { representation: 34, canonFaithful: 78, adaptationFreedom: 88, issueInsertion: 42, controversyRisk: 66, mediaFriendly: 70, audienceSplit: 38 },
    ratings: { rawg: "4.5/5", metacritic: "96/100", steam: "Very Positive" },
  },
  {
    id: "no-mans-sky",
    title: "無人深空",
    originalTitle: "No Man's Sky",
    year: 2016,
    steamAppId: 275850,
    synopsis: "首發承諾落差後靠長期更新逆轉評價，是開發風險樣本，不是 DEI 爭議樣本。",
    tags: { genreSpectacle: 78, commercialEntertainment: 76, controversyRisk: 8, mediaFriendly: 62, audienceAcceptance: 74, playerFreedom: 92, monetizationPressure: 18, storyDriven: 28, studioRisk: 90 },
    politicalIndex: { representation: 24, canonFaithful: 58, adaptationFreedom: 86, issueInsertion: 10, controversyRisk: 8, mediaFriendly: 62, audienceSplit: 18 },
    ratings: { rawg: "3.8/5", metacritic: "61/100", steam: "Mostly Positive" },
  },
  {
    id: "persona-5-royal",
    title: "女神異聞錄 5 皇家版",
    originalTitle: "Persona 5 Royal",
    year: 2022,
    steamAppId: 1687950,
    synopsis: "日式 RPG 以青春反抗、角色關係與高度風格化美術取得全球口碑。",
    tags: { genrePrestige: 86, representation: 54, issueInsertion: 58, commercialEntertainment: 84, controversyRisk: 20, mediaFriendly: 90, audienceAcceptance: 92, playerFreedom: 62, storyDriven: 94, studioRisk: 34 },
    politicalIndex: { representation: 54, canonFaithful: 88, adaptationFreedom: 54, issueInsertion: 58, controversyRisk: 20, mediaFriendly: 90, audienceSplit: 18 },
    ratings: { rawg: "4.4/5", metacritic: "95/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "nier-automata",
    title: "尼爾：自動人形",
    originalTitle: "NieR:Automata",
    year: 2017,
    steamAppId: 524220,
    synopsis: "哲學科幻、身份議題與動作 RPG 結合，議題濃度高但靠作者性成為優點。",
    tags: { genrePrestige: 88, representation: 54, genderPowerShift: 62, issueInsertion: 82, commercialEntertainment: 78, controversyRisk: 24, mediaFriendly: 90, audienceAcceptance: 88, playerFreedom: 54, storyDriven: 92, studioRisk: 42 },
    politicalIndex: { representation: 54, canonFaithful: 76, adaptationFreedom: 82, issueInsertion: 82, controversyRisk: 24, mediaFriendly: 90, audienceSplit: 22 },
    ratings: { rawg: "4.4/5", metacritic: "84/100", steam: "Very Positive" },
  },
  {
    id: "resident-evil-4",
    title: "惡靈古堡 4 重製版",
    originalTitle: "Resident Evil 4",
    year: 2023,
    steamAppId: 2050650,
    synopsis: "經典恐怖動作重製，忠實度與現代化設計取得平衡，爭議壓力低。",
    tags: { genreSpectacle: 82, adaptation: 92, canonFaithful: 88, representation: 32, issueInsertion: 18, commercialEntertainment: 92, controversyRisk: 12, mediaFriendly: 92, audienceAcceptance: 94, playerFreedom: 46, storyDriven: 66, studioRisk: 30 },
    politicalIndex: { representation: 32, canonFaithful: 88, adaptationFreedom: 42, issueInsertion: 18, controversyRisk: 12, mediaFriendly: 92, audienceSplit: 10 },
    ratings: { rawg: "4.5/5", metacritic: "93/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "silent-hill-2",
    title: "沉默之丘 2",
    originalTitle: "SILENT HILL 2",
    year: 2024,
    steamAppId: 2124490,
    synopsis: "心理恐怖經典重製，原作忠實度和現代化改動成為粉絲檢查重點。",
    tags: { genrePrestige: 76, adaptation: 94, canonFaithful: 78, representation: 32, issueInsertion: 54, commercialEntertainment: 72, controversyRisk: 48, mediaFriendly: 78, audienceAcceptance: 80, playerFreedom: 36, storyDriven: 88, studioRisk: 62 },
    politicalIndex: { representation: 32, canonFaithful: 78, adaptationFreedom: 56, issueInsertion: 54, controversyRisk: 48, mediaFriendly: 78, audienceSplit: 46 },
    ratings: { rawg: "4.2/5", metacritic: "86/100", steam: "Very Positive" },
  },
  {
    id: "black-myth-wukong",
    title: "黑神話：悟空",
    originalTitle: "Black Myth: Wukong",
    year: 2024,
    steamAppId: 2358720,
    synopsis: "中國神話動作 RPG 以技術奇觀與文化題材打入全球市場，作為低 DEI、高商業完成度的對照樣本。",
    tags: { genreSpectacle: 96, genrePrestige: 70, adaptation: 86, canonFaithful: 82, representation: 24, issueInsertion: 12, commercialEntertainment: 92, controversyRisk: 14, mediaFriendly: 76, audienceAcceptance: 90, playerFreedom: 42, storyDriven: 72, studioRisk: 58 },
    politicalIndex: { representation: 24, canonFaithful: 82, adaptationFreedom: 54, issueInsertion: 12, controversyRisk: 14, mediaFriendly: 76, audienceSplit: 16 },
    ratings: { rawg: "4.3/5", metacritic: "81/100", steam: "Overwhelmingly Positive" },
    youtubeId: "LnxvR87-V7o",
  },
  {
    id: "palworld",
    title: "幻獸帕魯",
    originalTitle: "Palworld",
    year: 2024,
    steamAppId: 1623730,
    synopsis: "生存收集與惡搞式商業娛樂爆紅，主要爭議在相似性與長線內容，DEI 壓力很低。",
    tags: { genreSpectacle: 72, commercialEntertainment: 92, controversyRisk: 18, mediaFriendly: 70, audienceAcceptance: 86, playerFreedom: 88, monetizationPressure: 18, storyDriven: 16, studioRisk: 54 },
    politicalIndex: { representation: 28, canonFaithful: 50, adaptationFreedom: 86, issueInsertion: 12, controversyRisk: 18, mediaFriendly: 70, audienceSplit: 24 },
    ratings: { rawg: "4.0/5", metacritic: "72/100", steam: "Very Positive" },
  },
  {
    id: "stalker-2",
    title: "潛行者 2：車諾比之心",
    originalTitle: "S.T.A.L.K.E.R. 2: Heart of Chornobyl",
    year: 2024,
    steamAppId: 1643320,
    synopsis: "東歐末日射擊與開放世界沉浸體驗，文化脈絡存在，但評價壓力主要來自技術與開發狀態。",
    tags: { genreSpectacle: 82, genrePrestige: 66, adaptation: 74, canonFaithful: 76, representation: 30, issueInsertion: 34, commercialEntertainment: 76, controversyRisk: 18, mediaFriendly: 74, audienceAcceptance: 70, playerFreedom: 84, storyDriven: 58, studioRisk: 78 },
    politicalIndex: { representation: 30, canonFaithful: 76, adaptationFreedom: 62, issueInsertion: 34, controversyRisk: 18, mediaFriendly: 74, audienceSplit: 28 },
    ratings: { rawg: "3.8/5", metacritic: "73/100", steam: "Mostly Positive" },
  },
  {
    id: "mass-effect-legendary",
    title: "質量效應 傳奇版",
    originalTitle: "Mass Effect Legendary Edition",
    year: 2021,
    steamAppId: 1328670,
    synopsis: "科幻 RPG 三部曲重製，以選擇、關係與跨物種代表性維持長尾口碑。",
    tags: { genrePrestige: 84, adaptation: 72, canonFaithful: 88, representation: 74, genderPowerShift: 70, issueInsertion: 58, commercialEntertainment: 82, controversyRisk: 18, mediaFriendly: 88, audienceAcceptance: 92, playerFreedom: 86, storyDriven: 94, studioRisk: 32 },
    politicalIndex: { representation: 74, canonFaithful: 88, adaptationFreedom: 54, issueInsertion: 58, controversyRisk: 18, mediaFriendly: 88, audienceSplit: 14 },
    ratings: { rawg: "4.5/5", metacritic: "87/100", steam: "Very Positive" },
  },
  {
    id: "life-is-strange-true-colors",
    title: "奇異人生：本色",
    originalTitle: "Life is Strange: True Colors",
    year: 2021,
    steamAppId: 936790,
    synopsis: "情感能力、酷兒角色與小鎮敘事結合，代表性高且偏劇情導向。",
    tags: { genrePrestige: 66, representation: 86, genderPowerShift: 72, issueInsertion: 70, commercialEntertainment: 54, controversyRisk: 24, mediaFriendly: 78, audienceAcceptance: 78, playerFreedom: 48, storyDriven: 92, studioRisk: 36 },
    politicalIndex: { representation: 86, canonFaithful: 74, adaptationFreedom: 66, issueInsertion: 70, controversyRisk: 24, mediaFriendly: 78, audienceSplit: 24 },
    ratings: { rawg: "4.0/5", metacritic: "81/100", steam: "Very Positive" },
  },
  {
    id: "tell-me-why",
    title: "謂何",
    originalTitle: "Tell Me Why",
    year: 2020,
    steamAppId: 1180660,
    synopsis: "跨性別角色與家庭創傷作為核心敘事，媒體友善度高但商業娛樂性較低。",
    tags: { genrePrestige: 68, representation: 96, genderPowerShift: 82, issueInsertion: 82, commercialEntertainment: 36, controversyRisk: 36, mediaFriendly: 84, audienceAcceptance: 70, playerFreedom: 34, storyDriven: 94, studioRisk: 42 },
    politicalIndex: { representation: 96, canonFaithful: 74, adaptationFreedom: 70, issueInsertion: 82, controversyRisk: 36, mediaFriendly: 84, audienceSplit: 34 },
    ratings: { rawg: "3.8/5", metacritic: "78/100", steam: "Very Positive" },
  },
  {
    id: "celeste",
    title: "蔚藍",
    originalTitle: "Celeste",
    year: 2018,
    steamAppId: 504230,
    synopsis: "高難度平台跳躍與心理健康隱喻結合，小型作品以完成度建立高口碑。",
    tags: { genrePrestige: 92, representation: 58, issueInsertion: 70, commercialEntertainment: 78, controversyRisk: 10, mediaFriendly: 92, audienceAcceptance: 90, playerFreedom: 42, storyDriven: 70, studioRisk: 20 },
    politicalIndex: { representation: 58, canonFaithful: 78, adaptationFreedom: 72, issueInsertion: 70, controversyRisk: 10, mediaFriendly: 92, audienceSplit: 12 },
    ratings: { rawg: "4.4/5", metacritic: "92/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "hades",
    title: "黑帝斯",
    originalTitle: "Hades",
    year: 2020,
    steamAppId: 1145360,
    synopsis: "希臘神話重構與 roguelike 循環結合，多元角色關係自然融入系統。",
    tags: { genrePrestige: 94, genreSpectacle: 72, representation: 72, genderPowerShift: 66, issueInsertion: 42, commercialEntertainment: 90, controversyRisk: 8, mediaFriendly: 96, audienceAcceptance: 96, playerFreedom: 62, storyDriven: 82, studioRisk: 22 },
    politicalIndex: { representation: 72, canonFaithful: 70, adaptationFreedom: 84, issueInsertion: 42, controversyRisk: 8, mediaFriendly: 96, audienceSplit: 8 },
    ratings: { rawg: "4.5/5", metacritic: "93/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "suicide-squad",
    title: "自殺突擊隊：戰勝正義聯盟",
    originalTitle: "Suicide Squad: Kill the Justice League",
    year: 2024,
    steamAppId: 315210,
    synopsis: "超級英雄 IP 轉向服務型射擊，商業模式與角色處理引發強烈反彈。",
    tags: { genreSpectacle: 74, adaptation: 92, canonFaithful: 28, representation: 58, issueInsertion: 24, commercialEntertainment: 50, controversyRisk: 36, mediaFriendly: 28, audienceAcceptance: 20, monetizationPressure: 88, playerFreedom: 48, storyDriven: 52, studioRisk: 94 },
    politicalIndex: { representation: 58, canonFaithful: 28, adaptationFreedom: 88, issueInsertion: 24, controversyRisk: 36, mediaFriendly: 28, audienceSplit: 54 },
    ratings: { rawg: "2.6/5", metacritic: "60/100", steam: "Mixed" },
  },
  {
    id: "forspoken",
    title: "魔咒之地",
    originalTitle: "Forspoken",
    year: 2023,
    steamAppId: 1680880,
    synopsis: "異世界女性主角動作 RPG，行銷語言與台詞風格被社群放大檢查。",
    tags: { genreSpectacle: 72, representation: 78, genderPowerShift: 82, issueInsertion: 36, commercialEntertainment: 52, controversyRisk: 76, mediaFriendly: 44, audienceAcceptance: 26, playerFreedom: 58, storyDriven: 58, studioRisk: 86 },
    politicalIndex: { representation: 78, canonFaithful: 60, adaptationFreedom: 82, issueInsertion: 36, controversyRisk: 76, mediaFriendly: 44, audienceSplit: 78 },
    ratings: { rawg: "2.9/5", metacritic: "63/100", steam: "Mixed" },
  },
  {
    id: "overwatch-2",
    title: "鬥陣特攻 2",
    originalTitle: "Overwatch 2",
    year: 2023,
    steamAppId: 2357570,
    synopsis: "高度多元角色陣容與服務型營運壓力並存，評價核心轉向商業模式。",
    tags: { genreSpectacle: 82, representation: 92, genderPowerShift: 74, issueInsertion: 34, commercialEntertainment: 82, controversyRisk: 44, mediaFriendly: 64, audienceAcceptance: 38, monetizationPressure: 96, playerFreedom: 64, storyDriven: 18, studioRisk: 86 },
    politicalIndex: { representation: 92, canonFaithful: 58, adaptationFreedom: 66, issueInsertion: 34, controversyRisk: 44, mediaFriendly: 64, audienceSplit: 62 },
    ratings: { rawg: "3.2/5", metacritic: "79/100", steam: "Mostly Negative" },
  },
  {
    id: "dragon-age-veilguard",
    title: "闇龍紀元：紗障守護者",
    originalTitle: "Dragon Age: The Veilguard",
    year: 2024,
    steamAppId: 1845910,
    synopsis: "BioWare 奇幻 RPG 續作強調多元角色與現代敘事，粉絲期待與文化討論並存。",
    tags: { genrePrestige: 66, adaptation: 86, canonFaithful: 48, representation: 92, genderPowerShift: 82, issueInsertion: 72, commercialEntertainment: 64, controversyRisk: 86, mediaFriendly: 58, audienceAcceptance: 42, playerFreedom: 58, storyDriven: 86, studioRisk: 88 },
    politicalIndex: { representation: 92, canonFaithful: 48, adaptationFreedom: 82, issueInsertion: 72, controversyRisk: 86, mediaFriendly: 58, audienceSplit: 88 },
    ratings: { rawg: "3.2/5", metacritic: "82/100", steam: "Mixed" },
  },
  {
    id: "horizon-forbidden-west",
    title: "地平線：西域禁地",
    originalTitle: "Horizon Forbidden West Complete Edition",
    year: 2024,
    steamAppId: 2420110,
    synopsis: "女性主角科幻續作以視覺奇觀和開放世界探索維持主流接受度。",
    tags: { genreSpectacle: 90, representation: 82, genderPowerShift: 86, issueInsertion: 42, commercialEntertainment: 86, controversyRisk: 24, mediaFriendly: 84, audienceAcceptance: 82, playerFreedom: 86, storyDriven: 74, studioRisk: 50 },
    politicalIndex: { representation: 82, canonFaithful: 78, adaptationFreedom: 68, issueInsertion: 42, controversyRisk: 24, mediaFriendly: 84, audienceSplit: 22 },
    ratings: { rawg: "4.2/5", metacritic: "89/100", steam: "Very Positive" },
  },
  {
    id: "portal-2",
    title: "傳送門 2",
    originalTitle: "Portal 2",
    year: 2011,
    steamAppId: 620,
    synopsis: "高完成度解謎與黑色幽默敘事結合，幾乎沒有文化戰摩擦，是純粹設計口碑型樣本。",
    tags: { genrePrestige: 92, commercialEntertainment: 88, controversyRisk: 4, mediaFriendly: 96, audienceAcceptance: 98, playerFreedom: 48, storyDriven: 72, studioRisk: 12 },
    politicalIndex: { representation: 26, canonFaithful: 78, adaptationFreedom: 62, issueInsertion: 18, controversyRisk: 4, mediaFriendly: 96, audienceSplit: 4 },
    ratings: { rawg: "4.6/5", metacritic: "95/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "counter-strike-2",
    title: "絕對武力 2",
    originalTitle: "Counter-Strike 2",
    year: 2023,
    steamAppId: 730,
    synopsis: "競技射擊以系統手感、社群生態與更新節奏為核心，幾乎不靠敘事或議題驅動。",
    tags: { genreSpectacle: 72, commercialEntertainment: 90, controversyRisk: 12, mediaFriendly: 68, audienceAcceptance: 78, monetizationPressure: 54, playerFreedom: 72, storyDriven: 2, studioRisk: 44 },
    politicalIndex: { representation: 18, canonFaithful: 76, adaptationFreedom: 58, issueInsertion: 6, controversyRisk: 12, mediaFriendly: 68, audienceSplit: 18 },
    ratings: { rawg: "3.7/5", metacritic: "82/100", steam: "Very Positive" },
  },
  {
    id: "dota-2",
    title: "Dota 2",
    originalTitle: "Dota 2",
    year: 2013,
    steamAppId: 570,
    synopsis: "長壽競技遊戲以深度系統與電競社群維持生命，文化議題壓力低但入門門檻高。",
    tags: { genreSpectacle: 78, commercialEntertainment: 88, controversyRisk: 16, mediaFriendly: 74, audienceAcceptance: 76, monetizationPressure: 42, playerFreedom: 82, storyDriven: 8, studioRisk: 32 },
    politicalIndex: { representation: 34, canonFaithful: 78, adaptationFreedom: 70, issueInsertion: 12, controversyRisk: 16, mediaFriendly: 74, audienceSplit: 20 },
    ratings: { rawg: "3.9/5", metacritic: "90/100", steam: "Very Positive" },
  },
  {
    id: "fallout-4",
    title: "異塵餘生 4",
    originalTitle: "Fallout 4",
    year: 2015,
    steamAppId: 377160,
    synopsis: "後末日開放世界與陣營選擇並行，玩家自由度高但劇情評價長期分歧。",
    tags: { genreSpectacle: 78, adaptation: 82, canonFaithful: 62, representation: 38, issueInsertion: 46, commercialEntertainment: 82, controversyRisk: 38, mediaFriendly: 76, audienceAcceptance: 78, playerFreedom: 92, storyDriven: 58, studioRisk: 42 },
    politicalIndex: { representation: 38, canonFaithful: 62, adaptationFreedom: 82, issueInsertion: 46, controversyRisk: 38, mediaFriendly: 76, audienceSplit: 42 },
    ratings: { rawg: "4.0/5", metacritic: "84/100", steam: "Very Positive" },
  },
  {
    id: "skyrim",
    title: "上古卷軸 V：無界天際 特別版",
    originalTitle: "The Elder Scrolls V: Skyrim Special Edition",
    year: 2016,
    steamAppId: 489830,
    synopsis: "高自由度奇幻 RPG 以探索、模組與玩家自我投射延長生命週期。",
    tags: { genreSpectacle: 82, genrePrestige: 76, adaptation: 70, canonFaithful: 78, representation: 32, issueInsertion: 24, commercialEntertainment: 88, controversyRisk: 14, mediaFriendly: 88, audienceAcceptance: 94, playerFreedom: 98, storyDriven: 62, studioRisk: 28 },
    politicalIndex: { representation: 32, canonFaithful: 78, adaptationFreedom: 86, issueInsertion: 24, controversyRisk: 14, mediaFriendly: 88, audienceSplit: 12 },
    ratings: { rawg: "4.4/5", metacritic: "84/100", steam: "Very Positive" },
  },
  {
    id: "stardew-valley",
    title: "星露谷物語",
    originalTitle: "Stardew Valley",
    year: 2016,
    steamAppId: 413150,
    synopsis: "農場生活、社群關係與自由節奏形成低壓力高接受度樣本，文化爭議極低。",
    tags: { genrePrestige: 78, representation: 62, issueInsertion: 22, commercialEntertainment: 90, controversyRisk: 4, mediaFriendly: 92, audienceAcceptance: 98, playerFreedom: 96, storyDriven: 42, monetizationPressure: 2, studioRisk: 12 },
    politicalIndex: { representation: 62, canonFaithful: 80, adaptationFreedom: 78, issueInsertion: 22, controversyRisk: 4, mediaFriendly: 92, audienceSplit: 6 },
    ratings: { rawg: "4.5/5", metacritic: "89/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "gotham-knights",
    title: "高譚騎士",
    originalTitle: "Gotham Knights",
    year: 2022,
    steamAppId: 1496790,
    synopsis: "蝙蝠俠 IP 衍生作品以群像英雄接棒，但玩法、性能與角色設計評價偏分裂。",
    tags: { genreSpectacle: 70, adaptation: 90, canonFaithful: 56, representation: 62, genderPowerShift: 64, issueInsertion: 28, commercialEntertainment: 58, controversyRisk: 34, mediaFriendly: 48, audienceAcceptance: 34, playerFreedom: 58, storyDriven: 54, studioRisk: 76 },
    politicalIndex: { representation: 62, canonFaithful: 56, adaptationFreedom: 70, issueInsertion: 28, controversyRisk: 34, mediaFriendly: 48, audienceSplit: 44 },
    ratings: { rawg: "3.0/5", metacritic: "67/100", steam: "Mixed" },
  },
  {
    id: "saints-row",
    title: "黑街聖徒",
    originalTitle: "Saints Row",
    year: 2022,
    steamAppId: 742420,
    synopsis: "系列重啟試圖年輕化與改寫幫派幻想，但幽默、角色與開放世界設計受到批評。",
    tags: { genreSpectacle: 62, adaptation: 82, canonFaithful: 24, representation: 66, issueInsertion: 22, commercialEntertainment: 42, controversyRisk: 54, mediaFriendly: 30, audienceAcceptance: 24, playerFreedom: 72, storyDriven: 36, studioRisk: 88 },
    politicalIndex: { representation: 66, canonFaithful: 24, adaptationFreedom: 86, issueInsertion: 22, controversyRisk: 54, mediaFriendly: 30, audienceSplit: 62 },
    ratings: { rawg: "2.7/5", metacritic: "61/100", steam: "Mixed" },
  },
  {
    id: "apex-legends",
    title: "Apex 英雄",
    originalTitle: "Apex Legends",
    year: 2020,
    steamAppId: 1172470,
    synopsis: "英雄射擊與大逃殺結合，角色代表性高，評價更多受營運、平衡與商業模式影響。",
    tags: { genreSpectacle: 84, representation: 90, genderPowerShift: 70, commercialEntertainment: 88, controversyRisk: 24, mediaFriendly: 78, audienceAcceptance: 76, monetizationPressure: 72, playerFreedom: 58, storyDriven: 18, studioRisk: 54 },
    politicalIndex: { representation: 90, canonFaithful: 70, adaptationFreedom: 72, issueInsertion: 24, controversyRisk: 24, mediaFriendly: 78, audienceSplit: 28 },
    ratings: { rawg: "3.8/5", metacritic: "88/100", steam: "Mixed" },
  },
  {
    id: "ff7-remake",
    title: "FINAL FANTASY VII REMAKE INTERGRADE",
    originalTitle: "Final Fantasy VII Remake Intergrade",
    year: 2021,
    steamAppId: 1462040,
    synopsis: "經典 RPG 重製以高規格演出與劇情重構挑戰原作記憶，老粉接受度與改編自由並存。",
    tags: { genreSpectacle: 90, genrePrestige: 76, adaptation: 96, canonFaithful: 64, representation: 54, issueInsertion: 42, commercialEntertainment: 86, controversyRisk: 44, mediaFriendly: 84, audienceAcceptance: 82, playerFreedom: 42, storyDriven: 90, studioRisk: 62 },
    politicalIndex: { representation: 54, canonFaithful: 64, adaptationFreedom: 82, issueInsertion: 42, controversyRisk: 44, mediaFriendly: 84, audienceSplit: 46 },
    ratings: { rawg: "4.3/5", metacritic: "87/100", steam: "Very Positive" },
  },
  {
    id: "death-stranding",
    title: "死亡擱淺 導演剪輯版",
    originalTitle: "Death Stranding Director's Cut",
    year: 2022,
    steamAppId: 1850570,
    synopsis: "作者型開放世界以孤立、連結與末世物流為核心，玩法獨特也讓評價高度分歧。",
    tags: { genrePrestige: 90, genreSpectacle: 74, representation: 46, issueInsertion: 78, commercialEntertainment: 48, controversyRisk: 52, mediaFriendly: 88, audienceAcceptance: 72, playerFreedom: 82, storyDriven: 92, studioRisk: 74 },
    politicalIndex: { representation: 46, canonFaithful: 76, adaptationFreedom: 84, issueInsertion: 78, controversyRisk: 52, mediaFriendly: 88, audienceSplit: 58 },
    ratings: { rawg: "4.2/5", metacritic: "85/100", steam: "Very Positive" },
  },
  {
    id: "control",
    title: "控制 終極版",
    originalTitle: "Control Ultimate Edition",
    year: 2020,
    steamAppId: 870780,
    synopsis: "超自然機構、女性主角與新怪談美學結合，媒體評價高且文化爭議低。",
    tags: { genrePrestige: 86, genreSpectacle: 80, representation: 72, genderPowerShift: 78, issueInsertion: 48, commercialEntertainment: 72, controversyRisk: 16, mediaFriendly: 90, audienceAcceptance: 82, playerFreedom: 44, storyDriven: 82, studioRisk: 42 },
    politicalIndex: { representation: 72, canonFaithful: 74, adaptationFreedom: 76, issueInsertion: 48, controversyRisk: 16, mediaFriendly: 90, audienceSplit: 18 },
    ratings: { rawg: "4.1/5", metacritic: "85/100", steam: "Very Positive" },
  },
  {
    id: "detroit-become-human",
    title: "底特律：變人",
    originalTitle: "Detroit: Become Human",
    year: 2020,
    steamAppId: 1222140,
    synopsis: "互動電影式敘事以仿生人權利隱喻壓迫與自由，議題清楚且玩家選擇密集。",
    tags: { genrePrestige: 72, representation: 64, issueInsertion: 86, commercialEntertainment: 70, controversyRisk: 38, mediaFriendly: 78, audienceAcceptance: 84, playerFreedom: 82, storyDriven: 96, studioRisk: 48 },
    politicalIndex: { representation: 64, canonFaithful: 76, adaptationFreedom: 78, issueInsertion: 86, controversyRisk: 38, mediaFriendly: 78, audienceSplit: 34 },
    ratings: { rawg: "4.2/5", metacritic: "78/100", steam: "Very Positive" },
  },
  {
    id: "stray",
    title: "Stray",
    originalTitle: "Stray",
    year: 2022,
    steamAppId: 1332010,
    synopsis: "貓咪探索與賽博城市氛圍結合，低政治壓力、強辨識度與高社群傳播性。",
    tags: { genreSpectacle: 58, genrePrestige: 74, representation: 34, issueInsertion: 28, commercialEntertainment: 82, controversyRisk: 6, mediaFriendly: 94, audienceAcceptance: 92, playerFreedom: 38, storyDriven: 62, studioRisk: 22 },
    politicalIndex: { representation: 34, canonFaithful: 78, adaptationFreedom: 68, issueInsertion: 28, controversyRisk: 6, mediaFriendly: 94, audienceSplit: 8 },
    ratings: { rawg: "4.2/5", metacritic: "82/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "hi-fi-rush",
    title: "完美音浪",
    originalTitle: "Hi-Fi Rush",
    year: 2023,
    steamAppId: 1817230,
    synopsis: "節奏動作、卡通風格與反企業幽默結合，娛樂性高且口碑穩定。",
    tags: { genreSpectacle: 82, genrePrestige: 78, representation: 58, issueInsertion: 36, commercialEntertainment: 92, controversyRisk: 8, mediaFriendly: 94, audienceAcceptance: 94, playerFreedom: 42, storyDriven: 58, studioRisk: 26 },
    politicalIndex: { representation: 58, canonFaithful: 74, adaptationFreedom: 78, issueInsertion: 36, controversyRisk: 8, mediaFriendly: 94, audienceSplit: 8 },
    ratings: { rawg: "4.3/5", metacritic: "89/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "armored-core-vi",
    title: "機戰傭兵 VI 境界天火",
    originalTitle: "Armored Core VI: Fires of Rubicon",
    year: 2023,
    steamAppId: 1888160,
    synopsis: "硬派機甲動作重啟經典系列，以難度、機體組裝與老派設計獲得高評價。",
    tags: { genreSpectacle: 88, genrePrestige: 80, adaptation: 84, canonFaithful: 82, representation: 24, issueInsertion: 24, commercialEntertainment: 82, controversyRisk: 18, mediaFriendly: 86, audienceAcceptance: 88, playerFreedom: 74, storyDriven: 54, studioRisk: 38 },
    politicalIndex: { representation: 24, canonFaithful: 82, adaptationFreedom: 58, issueInsertion: 24, controversyRisk: 18, mediaFriendly: 86, audienceSplit: 18 },
    ratings: { rawg: "4.3/5", metacritic: "87/100", steam: "Very Positive" },
  },
  {
    id: "lies-of-p",
    title: "P 的謊言",
    originalTitle: "Lies of P",
    year: 2023,
    steamAppId: 1627720,
    synopsis: "童話改編魂系動作以黑暗美術和高難度戰鬥吸引玩家，原作改造幅度大但接受度高。",
    tags: { genreSpectacle: 78, genrePrestige: 82, adaptation: 80, canonFaithful: 38, representation: 34, issueInsertion: 42, commercialEntertainment: 78, controversyRisk: 18, mediaFriendly: 88, audienceAcceptance: 86, playerFreedom: 46, storyDriven: 78, studioRisk: 34 },
    politicalIndex: { representation: 34, canonFaithful: 38, adaptationFreedom: 86, issueInsertion: 42, controversyRisk: 18, mediaFriendly: 88, audienceSplit: 18 },
    ratings: { rawg: "4.1/5", metacritic: "80/100", steam: "Very Positive" },
  },
  {
    id: "dave-the-diver",
    title: "潛水員戴夫",
    originalTitle: "DAVE THE DIVER",
    year: 2023,
    steamAppId: 1868140,
    synopsis: "潛水探索、餐廳經營與輕鬆劇情混合，低爭議高完成度形成口碑黑馬。",
    tags: { genreSpectacle: 58, genrePrestige: 76, representation: 42, issueInsertion: 18, commercialEntertainment: 90, controversyRisk: 6, mediaFriendly: 92, audienceAcceptance: 96, playerFreedom: 76, storyDriven: 44, studioRisk: 18 },
    politicalIndex: { representation: 42, canonFaithful: 78, adaptationFreedom: 76, issueInsertion: 18, controversyRisk: 6, mediaFriendly: 92, audienceSplit: 6 },
    ratings: { rawg: "4.3/5", metacritic: "90/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "monster-hunter-world",
    title: "魔物獵人：世界",
    originalTitle: "Monster Hunter: World",
    year: 2018,
    steamAppId: 582010,
    synopsis: "共鬥狩獵、裝備循環與大型生態奇觀形成高黏著度，文化議題壓力低，評價主要看玩法深度。",
    tags: { genreSpectacle: 88, genrePrestige: 72, representation: 36, issueInsertion: 10, commercialEntertainment: 92, controversyRisk: 10, mediaFriendly: 86, audienceAcceptance: 92, monetizationPressure: 12, playerFreedom: 78, storyDriven: 30, studioRisk: 28 },
    politicalIndex: { representation: 36, canonFaithful: 80, adaptationFreedom: 64, issueInsertion: 10, controversyRisk: 10, mediaFriendly: 86, audienceSplit: 12 },
    ratings: { rawg: "4.3/5", metacritic: "88/100", steam: "Very Positive" },
  },
  {
    id: "doom-eternal",
    title: "毀滅戰士：永恆",
    originalTitle: "DOOM Eternal",
    year: 2020,
    steamAppId: 782330,
    synopsis: "高速射擊、重金屬美學與硬派戰鬥節奏拉滿，幾乎不靠社會議題推動評價。",
    tags: { genreSpectacle: 94, genrePrestige: 74, adaptation: 82, canonFaithful: 86, representation: 18, issueInsertion: 6, commercialEntertainment: 88, controversyRisk: 16, mediaFriendly: 84, audienceAcceptance: 90, monetizationPressure: 10, playerFreedom: 44, storyDriven: 34, studioRisk: 32 },
    politicalIndex: { representation: 18, canonFaithful: 86, adaptationFreedom: 46, issueInsertion: 6, controversyRisk: 16, mediaFriendly: 84, audienceSplit: 14 },
    ratings: { rawg: "4.4/5", metacritic: "88/100", steam: "Very Positive" },
  },
  {
    id: "sekiro",
    title: "隻狼：暗影雙死",
    originalTitle: "Sekiro: Shadows Die Twice",
    year: 2019,
    steamAppId: 814380,
    synopsis: "高難度動作、精準格擋與日本戰國奇幻結合，是低議題、高技術門檻的硬派樣本。",
    tags: { genreSpectacle: 78, genrePrestige: 88, adaptation: 28, canonFaithful: 76, representation: 20, issueInsertion: 8, commercialEntertainment: 84, controversyRisk: 8, mediaFriendly: 92, audienceAcceptance: 92, monetizationPressure: 6, playerFreedom: 42, storyDriven: 72, studioRisk: 46 },
    politicalIndex: { representation: 20, canonFaithful: 76, adaptationFreedom: 62, issueInsertion: 8, controversyRisk: 8, mediaFriendly: 92, audienceSplit: 10 },
    ratings: { rawg: "4.4/5", metacritic: "90/100", steam: "Very Positive" },
  },
  {
    id: "ghost-of-tsushima",
    title: "對馬戰鬼 導演剪輯版",
    originalTitle: "Ghost of Tsushima Director's Cut",
    year: 2024,
    steamAppId: 2215430,
    synopsis: "武士電影感、開放世界探索與歷史幻想結合，爭議低，主打沉浸與商業完成度。",
    tags: { genreSpectacle: 88, genrePrestige: 78, adaptation: 34, canonFaithful: 74, representation: 24, issueInsertion: 12, commercialEntertainment: 90, controversyRisk: 10, mediaFriendly: 90, audienceAcceptance: 94, monetizationPressure: 8, playerFreedom: 86, storyDriven: 76, studioRisk: 30 },
    politicalIndex: { representation: 24, canonFaithful: 74, adaptationFreedom: 76, issueInsertion: 12, controversyRisk: 10, mediaFriendly: 90, audienceSplit: 10 },
    ratings: { rawg: "4.5/5", metacritic: "87/100", steam: "Very Positive" },
  },
  {
    id: "the-outer-worlds",
    title: "天外世界",
    originalTitle: "The Outer Worlds",
    year: 2020,
    steamAppId: 578650,
    synopsis: "黑色幽默科幻 RPG 用企業諷刺與玩家選擇推動劇情，議題明顯但包在類型娛樂裡。",
    tags: { genrePrestige: 74, representation: 58, issueInsertion: 82, commercialEntertainment: 74, controversyRisk: 30, mediaFriendly: 82, audienceAcceptance: 82, monetizationPressure: 6, playerFreedom: 88, storyDriven: 86, studioRisk: 42 },
    politicalIndex: { representation: 58, canonFaithful: 72, adaptationFreedom: 82, issueInsertion: 82, controversyRisk: 30, mediaFriendly: 82, audienceSplit: 28 },
    ratings: { rawg: "4.0/5", metacritic: "82/100", steam: "Very Positive" },
  },
  {
    id: "warframe",
    title: "Warframe",
    originalTitle: "Warframe",
    year: 2013,
    steamAppId: 230410,
    synopsis: "長線營運、刷裝循環與社群共創支撐壽命，評價更多受更新節奏和商業模式影響。",
    tags: { genreSpectacle: 82, representation: 54, issueInsertion: 26, commercialEntertainment: 84, controversyRisk: 18, mediaFriendly: 76, audienceAcceptance: 86, monetizationPressure: 68, playerFreedom: 86, storyDriven: 48, studioRisk: 44 },
    politicalIndex: { representation: 54, canonFaithful: 72, adaptationFreedom: 76, issueInsertion: 26, controversyRisk: 18, mediaFriendly: 76, audienceSplit: 22 },
    ratings: { rawg: "3.8/5", metacritic: "69/100", steam: "Very Positive" },
  },
  {
    id: "destiny-2",
    title: "天命 2",
    originalTitle: "Destiny 2",
    year: 2017,
    steamAppId: 1085660,
    synopsis: "掠奪射擊、賽季制和大型社群構成長線服務型作品，內容品質與付費結構常拉扯評價。",
    tags: { genreSpectacle: 86, genrePrestige: 58, adaptation: 70, canonFaithful: 74, representation: 64, issueInsertion: 30, commercialEntertainment: 84, controversyRisk: 24, mediaFriendly: 64, audienceAcceptance: 66, monetizationPressure: 86, playerFreedom: 68, storyDriven: 58, studioRisk: 72 },
    politicalIndex: { representation: 64, canonFaithful: 74, adaptationFreedom: 68, issueInsertion: 30, controversyRisk: 24, mediaFriendly: 64, audienceSplit: 38 },
    ratings: { rawg: "3.7/5", metacritic: "83/100", steam: "Mixed" },
    youtubeId: "ZJLAJVmggt0",
  },
  {
    id: "valheim",
    title: "Valheim",
    originalTitle: "Valheim",
    year: 2021,
    steamAppId: 892970,
    synopsis: "維京生存、基地建造與合作探索形成低成本高擴散樣本，玩家自由度高且文化壓力很低。",
    tags: { genreSpectacle: 64, genrePrestige: 70, representation: 24, issueInsertion: 8, commercialEntertainment: 88, controversyRisk: 6, mediaFriendly: 86, audienceAcceptance: 94, monetizationPressure: 4, playerFreedom: 96, storyDriven: 18, studioRisk: 20 },
    politicalIndex: { representation: 24, canonFaithful: 72, adaptationFreedom: 86, issueInsertion: 8, controversyRisk: 6, mediaFriendly: 86, audienceSplit: 8 },
    ratings: { rawg: "4.2/5", metacritic: "86/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "nioh-2",
    title: "仁王 2 完全版",
    originalTitle: "Nioh 2 - The Complete Edition",
    year: 2021,
    steamAppId: 1325200,
    synopsis: "日本戰國、妖怪傳說與高難度動作 RPG 結合，文化辨識度高但評價核心仍是戰鬥深度。",
    tags: { genreSpectacle: 82, genrePrestige: 76, adaptation: 42, canonFaithful: 76, representation: 20, issueInsertion: 8, commercialEntertainment: 82, controversyRisk: 8, mediaFriendly: 84, audienceAcceptance: 86, monetizationPressure: 8, playerFreedom: 46, storyDriven: 62, studioRisk: 34 },
    politicalIndex: { representation: 20, canonFaithful: 76, adaptationFreedom: 66, issueInsertion: 8, controversyRisk: 8, mediaFriendly: 84, audienceSplit: 10 },
    ratings: { rawg: "4.1/5", metacritic: "86/100", steam: "Very Positive" },
  },
  {
    id: "wo-long-fallen-dynasty",
    title: "臥龍：蒼天隕落",
    originalTitle: "Wo Long: Fallen Dynasty",
    year: 2023,
    steamAppId: 1448440,
    synopsis: "三國奇幻、武俠動作與魂系節奏混合，非西方文化辨識強，但爭議多集中在技術與設計落差。",
    tags: { genreSpectacle: 84, genrePrestige: 66, adaptation: 58, canonFaithful: 74, representation: 24, issueInsertion: 10, commercialEntertainment: 78, controversyRisk: 18, mediaFriendly: 74, audienceAcceptance: 72, monetizationPressure: 10, playerFreedom: 50, storyDriven: 62, studioRisk: 54 },
    politicalIndex: { representation: 24, canonFaithful: 74, adaptationFreedom: 64, issueInsertion: 10, controversyRisk: 18, mediaFriendly: 74, audienceSplit: 30 },
    ratings: { rawg: "3.6/5", metacritic: "81/100", steam: "Mixed" },
  },
  {
    id: "naraka-bladepoint",
    title: "永劫無間",
    originalTitle: "NARAKA: BLADEPOINT",
    year: 2021,
    steamAppId: 1203220,
    synopsis: "武俠近戰大逃殺以東方美術、身法和競技營運形成辨識度，評價受平衡與商業模式牽動。",
    tags: { genreSpectacle: 88, representation: 28, issueInsertion: 8, commercialEntertainment: 86, controversyRisk: 16, mediaFriendly: 74, audienceAcceptance: 78, monetizationPressure: 72, playerFreedom: 70, storyDriven: 18, studioRisk: 46 },
    politicalIndex: { representation: 28, canonFaithful: 70, adaptationFreedom: 74, issueInsertion: 8, controversyRisk: 16, mediaFriendly: 74, audienceSplit: 22 },
    ratings: { rawg: "3.7/5", metacritic: "71/100", steam: "Mostly Positive" },
  },
  {
    id: "like-a-dragon-ishin",
    title: "人中之龍 維新！極",
    originalTitle: "Like a Dragon: Ishin!",
    year: 2023,
    steamAppId: 1805480,
    synopsis: "幕末歷史、系列明星臉與動作 RPG 重製結合，文化特色強，評價主要看粉絲服務和系統節奏。",
    tags: { genreSpectacle: 74, genrePrestige: 68, adaptation: 84, canonFaithful: 76, representation: 24, issueInsertion: 18, commercialEntertainment: 82, controversyRisk: 12, mediaFriendly: 82, audienceAcceptance: 84, monetizationPressure: 8, playerFreedom: 54, storyDriven: 82, studioRisk: 36 },
    politicalIndex: { representation: 24, canonFaithful: 76, adaptationFreedom: 58, issueInsertion: 18, controversyRisk: 12, mediaFriendly: 82, audienceSplit: 14 },
    ratings: { rawg: "3.9/5", metacritic: "81/100", steam: "Very Positive" },
  },
  {
    id: "sifu",
    title: "師父",
    originalTitle: "Sifu",
    year: 2022,
    steamAppId: 2138710,
    synopsis: "功夫電影語彙、復仇敘事與高壓動作系統結合，文化風格明顯但爭議低，重點是手感和難度。",
    tags: { genreSpectacle: 78, genrePrestige: 74, representation: 28, issueInsertion: 8, commercialEntertainment: 80, controversyRisk: 8, mediaFriendly: 86, audienceAcceptance: 84, monetizationPressure: 6, playerFreedom: 36, storyDriven: 54, studioRisk: 32 },
    politicalIndex: { representation: 28, canonFaithful: 72, adaptationFreedom: 68, issueInsertion: 8, controversyRisk: 8, mediaFriendly: 86, audienceSplit: 12 },
    ratings: { rawg: "4.1/5", metacritic: "81/100", steam: "Very Positive" },
  },
  {
    id: "trek-to-yomi",
    title: "黃泉之路",
    originalTitle: "Trek to Yomi",
    year: 2022,
    steamAppId: 1370050,
    synopsis: "黑白武士電影美學與線性動作冒險結合，文化風格強，完成度評價則比題材更關鍵。",
    tags: { genreSpectacle: 64, genrePrestige: 78, representation: 22, issueInsertion: 8, commercialEntertainment: 58, controversyRisk: 8, mediaFriendly: 80, audienceAcceptance: 66, monetizationPressure: 4, playerFreedom: 26, storyDriven: 72, studioRisk: 38 },
    politicalIndex: { representation: 22, canonFaithful: 72, adaptationFreedom: 70, issueInsertion: 8, controversyRisk: 8, mediaFriendly: 80, audienceSplit: 14 },
    ratings: { rawg: "3.4/5", metacritic: "71/100", steam: "Very Positive" },
  },
  {
    id: "dustborn",
    title: "塵路之旅",
    originalTitle: "Dustborn",
    year: 2024,
    steamAppId: 721180,
    synopsis: "以族群、身份政治、語言權力和旅途群像為核心，文化戰討論大幅壓過一般玩法評價。",
    tags: { genrePrestige: 58, representation: 96, genderPowerShift: 84, issueInsertion: 94, commercialEntertainment: 38, controversyRisk: 92, mediaFriendly: 38, audienceAcceptance: 22, playerFreedom: 42, storyDriven: 86, studioRisk: 82 },
    politicalIndex: { representation: 96, canonFaithful: 58, adaptationFreedom: 84, issueInsertion: 94, controversyRisk: 92, mediaFriendly: 38, audienceSplit: 94 },
    ratings: { rawg: "2.6/5", metacritic: "68/100", steam: "Mixed" },
    youtubeId: "1j7F84gG-vQ",
  },
  {
    id: "goodbye-volcano-high",
    title: "再見火山高校",
    originalTitle: "Goodbye Volcano High",
    year: 2023,
    steamAppId: 1310330,
    synopsis: "非二元角色、青春焦慮與末日寓言結合，宣傳階段曾引發文化戰式討論。",
    tags: { genrePrestige: 64, representation: 94, genderPowerShift: 76, issueInsertion: 76, commercialEntertainment: 42, controversyRisk: 72, mediaFriendly: 70, audienceAcceptance: 60, playerFreedom: 34, storyDriven: 92, studioRisk: 68 },
    politicalIndex: { representation: 94, canonFaithful: 66, adaptationFreedom: 78, issueInsertion: 76, controversyRisk: 72, mediaFriendly: 70, audienceSplit: 74 },
    ratings: { rawg: "3.3/5", metacritic: "72/100", steam: "Very Positive" },
  },
  {
    id: "life-is-strange-2",
    title: "奇異人生 2",
    originalTitle: "Life is Strange 2",
    year: 2018,
    steamAppId: 532210,
    synopsis: "拉丁裔兄弟逃亡敘事結合警暴、移民、家庭與青春創傷，議題濃度比系列前作更直接。",
    tags: { genrePrestige: 72, representation: 88, genderPowerShift: 54, issueInsertion: 90, commercialEntertainment: 50, controversyRisk: 46, mediaFriendly: 82, audienceAcceptance: 76, playerFreedom: 44, storyDriven: 96, studioRisk: 46 },
    politicalIndex: { representation: 88, canonFaithful: 74, adaptationFreedom: 72, issueInsertion: 90, controversyRisk: 46, mediaFriendly: 82, audienceSplit: 42 },
    ratings: { rawg: "4.0/5", metacritic: "78/100", steam: "Very Positive" },
  },
  {
    id: "gone-home",
    title: "回家",
    originalTitle: "Gone Home",
    year: 2013,
    steamAppId: 232430,
    synopsis: "以家庭空屋探索承載酷兒青春與家庭秘密，是小品敘事遊戲進入主流討論的早期樣本。",
    tags: { genrePrestige: 82, representation: 84, genderPowerShift: 58, issueInsertion: 76, commercialEntertainment: 34, controversyRisk: 36, mediaFriendly: 92, audienceAcceptance: 74, playerFreedom: 62, storyDriven: 86, studioRisk: 24 },
    politicalIndex: { representation: 84, canonFaithful: 70, adaptationFreedom: 76, issueInsertion: 76, controversyRisk: 36, mediaFriendly: 92, audienceSplit: 34 },
    ratings: { rawg: "3.7/5", metacritic: "86/100", steam: "Very Positive" },
  },
  {
    id: "tacoma",
    title: "塔科馬",
    originalTitle: "Tacoma",
    year: 2017,
    steamAppId: 343860,
    synopsis: "太空站調查把勞動壓迫、企業治理、多元角色關係與沉浸敘事綁在一起。",
    tags: { genrePrestige: 78, representation: 82, genderPowerShift: 64, issueInsertion: 84, commercialEntertainment: 42, controversyRisk: 24, mediaFriendly: 86, audienceAcceptance: 76, playerFreedom: 58, storyDriven: 88, studioRisk: 30 },
    politicalIndex: { representation: 82, canonFaithful: 70, adaptationFreedom: 78, issueInsertion: 84, controversyRisk: 24, mediaFriendly: 86, audienceSplit: 22 },
    ratings: { rawg: "3.5/5", metacritic: "76/100", steam: "Very Positive" },
  },
  {
    id: "dream-daddy",
    title: "夢幻老爹",
    originalTitle: "Dream Daddy: A Dad Dating Simulator",
    year: 2017,
    steamAppId: 654880,
    synopsis: "同志父親戀愛模擬把酷兒家庭和輕喜劇結合，代表性明確但語氣親民。",
    tags: { genrePrestige: 46, representation: 96, genderPowerShift: 62, issueInsertion: 52, commercialEntertainment: 72, controversyRisk: 20, mediaFriendly: 78, audienceAcceptance: 82, playerFreedom: 56, storyDriven: 70, studioRisk: 20 },
    politicalIndex: { representation: 96, canonFaithful: 70, adaptationFreedom: 78, issueInsertion: 52, controversyRisk: 20, mediaFriendly: 78, audienceSplit: 18 },
    ratings: { rawg: "3.8/5", metacritic: "72/100", steam: "Very Positive" },
  },
  {
    id: "thirsty-suitors",
    title: "渴愛情人",
    originalTitle: "Thirsty Suitors",
    year: 2023,
    steamAppId: 1617220,
    synopsis: "南亞家庭、酷兒情感、前任關係和滑板戰鬥混搭，代表性高且風格辨識強。",
    tags: { genreSpectacle: 62, genrePrestige: 70, representation: 94, genderPowerShift: 86, issueInsertion: 72, commercialEntertainment: 70, controversyRisk: 22, mediaFriendly: 86, audienceAcceptance: 78, playerFreedom: 52, storyDriven: 84, studioRisk: 34 },
    politicalIndex: { representation: 94, canonFaithful: 68, adaptationFreedom: 82, issueInsertion: 72, controversyRisk: 22, mediaFriendly: 86, audienceSplit: 22 },
    ratings: { rawg: "3.7/5", metacritic: "81/100", steam: "Very Positive" },
  },
  {
    id: "venba",
    title: "雯芭",
    originalTitle: "Venba",
    year: 2023,
    steamAppId: 1491670,
    synopsis: "南印度移民家庭以料理、語言和代間記憶講述文化保存，低爭議但 DEI 指向非常清楚。",
    tags: { genrePrestige: 82, representation: 94, genderPowerShift: 54, issueInsertion: 80, commercialEntertainment: 52, controversyRisk: 10, mediaFriendly: 92, audienceAcceptance: 86, playerFreedom: 24, storyDriven: 84, studioRisk: 18 },
    politicalIndex: { representation: 94, canonFaithful: 74, adaptationFreedom: 70, issueInsertion: 80, controversyRisk: 10, mediaFriendly: 92, audienceSplit: 10 },
    ratings: { rawg: "3.9/5", metacritic: "81/100", steam: "Very Positive" },
  },
  {
    id: "i-was-a-teenage-exocolonist",
    title: "我曾是殖民星球的少年",
    originalTitle: "I Was a Teenage Exocolonist",
    year: 2022,
    steamAppId: 1148760,
    synopsis: "青春、殖民、性別身份、戀愛與政治選擇交織，讓玩家自由度承載高密度價值分歧。",
    tags: { genrePrestige: 84, representation: 92, genderPowerShift: 76, issueInsertion: 86, commercialEntertainment: 62, controversyRisk: 18, mediaFriendly: 90, audienceAcceptance: 88, playerFreedom: 88, storyDriven: 92, studioRisk: 28 },
    politicalIndex: { representation: 92, canonFaithful: 72, adaptationFreedom: 86, issueInsertion: 86, controversyRisk: 18, mediaFriendly: 90, audienceSplit: 18 },
    ratings: { rawg: "4.3/5", metacritic: "89/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "boyfriend-dungeon",
    title: "男友地下城",
    originalTitle: "Boyfriend Dungeon",
    year: 2021,
    steamAppId: 674930,
    synopsis: "約會模擬和地下城動作混合，性別與戀愛對象高度開放，但安全提示和劇情處理曾引發討論。",
    tags: { genreSpectacle: 52, genrePrestige: 54, representation: 90, genderPowerShift: 72, issueInsertion: 56, commercialEntertainment: 68, controversyRisk: 44, mediaFriendly: 70, audienceAcceptance: 64, playerFreedom: 72, storyDriven: 70, studioRisk: 42 },
    politicalIndex: { representation: 90, canonFaithful: 68, adaptationFreedom: 80, issueInsertion: 56, controversyRisk: 44, mediaFriendly: 70, audienceSplit: 48 },
    ratings: { rawg: "3.5/5", metacritic: "70/100", steam: "Very Positive" },
  },
  {
    id: "cosmic-wheel-sisterhood",
    title: "宇宙之輪姐妹會",
    originalTitle: "The Cosmic Wheel Sisterhood",
    year: 2023,
    steamAppId: 1340480,
    synopsis: "女巫社群、身份、責任與政治選擇構成長篇互動敘事，代表性高且玩家選擇具重量。",
    tags: { genrePrestige: 86, representation: 94, genderPowerShift: 90, issueInsertion: 84, commercialEntertainment: 58, controversyRisk: 16, mediaFriendly: 92, audienceAcceptance: 88, playerFreedom: 74, storyDriven: 94, studioRisk: 26 },
    politicalIndex: { representation: 94, canonFaithful: 72, adaptationFreedom: 84, issueInsertion: 84, controversyRisk: 16, mediaFriendly: 92, audienceSplit: 16 },
    ratings: { rawg: "4.2/5", metacritic: "85/100", steam: "Very Positive" },
  },
  {
    id: "we-are-ofk",
    title: "我們是 OFK",
    originalTitle: "We Are OFK",
    year: 2022,
    steamAppId: 1490340,
    synopsis: "互動音樂劇集聚焦酷兒創作者、職場焦慮與洛杉磯創意圈，敘事與身份標籤高度綁定。",
    tags: { genrePrestige: 58, representation: 92, genderPowerShift: 76, issueInsertion: 66, commercialEntertainment: 48, controversyRisk: 28, mediaFriendly: 74, audienceAcceptance: 62, playerFreedom: 24, storyDriven: 88, studioRisk: 44 },
    politicalIndex: { representation: 92, canonFaithful: 68, adaptationFreedom: 76, issueInsertion: 66, controversyRisk: 28, mediaFriendly: 74, audienceSplit: 34 },
    ratings: { rawg: "3.4/5", metacritic: "72/100", steam: "Very Positive" },
  },
  {
    id: "resist-1000x",
    title: "1000xRESIST",
    originalTitle: "1000xRESIST",
    year: 2024,
    steamAppId: 1675830,
    synopsis: "亞裔離散、疾病政治、世代創傷與權力神話交織的高概念敘事遊戲，議題密度極高。",
    tags: { genrePrestige: 94, representation: 94, genderPowerShift: 82, issueInsertion: 96, commercialEntertainment: 48, controversyRisk: 24, mediaFriendly: 94, audienceAcceptance: 86, playerFreedom: 42, storyDriven: 98, studioRisk: 36 },
    politicalIndex: { representation: 94, canonFaithful: 72, adaptationFreedom: 84, issueInsertion: 96, controversyRisk: 24, mediaFriendly: 94, audienceSplit: 22 },
    ratings: { rawg: "4.3/5", metacritic: "90/100", steam: "Overwhelmingly Positive" },
  },
  {
    id: "read-only-memories-2064",
    title: "2064：唯讀記憶",
    originalTitle: "2064: Read Only Memories",
    year: 2015,
    steamAppId: 330820,
    synopsis: "賽博龐克推理以性別、酷兒社群、人工智慧與都市階級為核心，是早期明確 DEI 遊戲樣本。",
    tags: { genrePrestige: 76, representation: 92, genderPowerShift: 70, issueInsertion: 82, commercialEntertainment: 50, controversyRisk: 26, mediaFriendly: 84, audienceAcceptance: 72, playerFreedom: 54, storyDriven: 88, studioRisk: 24 },
    politicalIndex: { representation: 92, canonFaithful: 68, adaptationFreedom: 78, issueInsertion: 82, controversyRisk: 26, mediaFriendly: 84, audienceSplit: 26 },
    ratings: { rawg: "3.7/5", metacritic: "77/100", steam: "Mostly Positive" },
  },
  {
    id: "red-strings-club",
    title: "紅弦俱樂部",
    originalTitle: "The Red Strings Club",
    year: 2018,
    steamAppId: 589780,
    synopsis: "酒保對話、企業情緒控制、身體改造與性別身份選擇交織，議題尖銳且作者性強。",
    tags: { genrePrestige: 84, representation: 84, genderPowerShift: 72, issueInsertion: 90, commercialEntertainment: 44, controversyRisk: 38, mediaFriendly: 88, audienceAcceptance: 78, playerFreedom: 58, storyDriven: 90, studioRisk: 28 },
    politicalIndex: { representation: 84, canonFaithful: 68, adaptationFreedom: 80, issueInsertion: 90, controversyRisk: 38, mediaFriendly: 88, audienceSplit: 34 },
    ratings: { rawg: "4.1/5", metacritic: "80/100", steam: "Very Positive" },
  },
  {
    id: "assassins-creed-shadows",
    title: "刺客教條：暗影者",
    originalTitle: "Assassin's Creed Shadows",
    year: 2025,
    steamAppId: 3159330,
    synopsis: "大型歷史 IP 以黑人武士與日本女忍雙主角切入，代表性、史實想像與文化所有權爭議高度綁定。",
    tags: { genreSpectacle: 92, adaptation: 94, canonFaithful: 48, representation: 88, genderPowerShift: 72, issueInsertion: 58, commercialEntertainment: 86, controversyRisk: 86, mediaFriendly: 72, audienceAcceptance: 58, playerFreedom: 88, storyDriven: 72, studioRisk: 78 },
    politicalIndex: { representation: 88, canonFaithful: 48, adaptationFreedom: 84, issueInsertion: 58, controversyRisk: 86, mediaFriendly: 72, audienceSplit: 88 },
    ratings: { rawg: "3.7/5", metacritic: "81/100", steam: "Mostly Positive" },
    youtubeId: "v8C59gG62e8",
  },
  {
    id: "unknown-9-awakening",
    title: "未知 9：覺醒",
    originalTitle: "Unknown 9: Awakening",
    year: 2024,
    steamAppId: 1477940,
    synopsis: "南亞女性主角與跨媒體世界觀結合，代表性明確，但玩法完成度和宣傳期待造成評價落差。",
    tags: { genreSpectacle: 70, genrePrestige: 48, adaptation: 74, canonFaithful: 54, representation: 86, genderPowerShift: 76, issueInsertion: 54, commercialEntertainment: 48, controversyRisk: 52, mediaFriendly: 44, audienceAcceptance: 34, playerFreedom: 36, storyDriven: 74, studioRisk: 86 },
    politicalIndex: { representation: 86, canonFaithful: 54, adaptationFreedom: 78, issueInsertion: 54, controversyRisk: 52, mediaFriendly: 44, audienceSplit: 66 },
    ratings: { rawg: "2.8/5", metacritic: "59/100", steam: "Mixed" },
  },
  {
    id: "flintlock-siege-of-dawn",
    title: "燧石槍：黎明圍攻",
    originalTitle: "Flintlock: The Siege of Dawn",
    year: 2024,
    steamAppId: 1832040,
    synopsis: "黑人女性主角、反神權戰爭與魂系動作混合，文化代表性存在，但討論常被類型完成度拉走。",
    tags: { genreSpectacle: 78, genrePrestige: 58, representation: 82, genderPowerShift: 82, issueInsertion: 46, commercialEntertainment: 66, controversyRisk: 34, mediaFriendly: 66, audienceAcceptance: 62, playerFreedom: 52, storyDriven: 62, studioRisk: 58 },
    politicalIndex: { representation: 82, canonFaithful: 64, adaptationFreedom: 76, issueInsertion: 46, controversyRisk: 34, mediaFriendly: 66, audienceSplit: 42 },
    ratings: { rawg: "3.5/5", metacritic: "71/100", steam: "Mostly Positive" },
  },
  {
    id: "tales-of-kenzera-zau",
    title: "肯澤拉傳說：札烏",
    originalTitle: "Tales of Kenzera: ZAU",
    year: 2024,
    steamAppId: 2316580,
    synopsis: "非洲神話、哀悼父親與文化記憶構成動作平台敘事，代表性強但爭議主要來自市場與類型期待。",
    tags: { genreSpectacle: 72, genrePrestige: 74, representation: 90, genderPowerShift: 42, issueInsertion: 78, commercialEntertainment: 64, controversyRisk: 28, mediaFriendly: 84, audienceAcceptance: 76, playerFreedom: 46, storyDriven: 82, studioRisk: 54 },
    politicalIndex: { representation: 90, canonFaithful: 70, adaptationFreedom: 78, issueInsertion: 78, controversyRisk: 28, mediaFriendly: 84, audienceSplit: 30 },
    ratings: { rawg: "3.7/5", metacritic: "76/100", steam: "Mostly Positive" },
  },
];

const retiredWorkIds = new Set([
  "top-gun-maverick",
  "john-wick-4",
  "mission-impossible-dead-reckoning",
  "ford-v-ferrari",
  "gran-turismo",
  "sonic-the-hedgehog",
  "super-mario-bros-movie",
  "no-mans-sky",
  "palworld",
  "counter-strike-2",
  "dota-2",
  "valheim",
  "dave-the-diver",
  "monster-hunter-world",
  "nioh-2",
  "wo-long-fallen-dynasty",
  "naraka-bladepoint",
  "like-a-dragon-ishin",
  "trek-to-yomi",
  "doom-eternal",
  "portal-2",
  "resident-evil-4",
  "armored-core-vi",
  "suicide-squad",
  "gotham-knights",
  "saints-row",
]);

export const works: Work[] = [...filmSeeds.map(makeFilm), ...gameSeeds.map(makeGame)].filter(
  (work) => !retiredWorkIds.has(work.id),
);

