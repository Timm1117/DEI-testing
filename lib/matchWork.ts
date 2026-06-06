import { matchTagKeys, works, type MatchTag, type TagKey, type Work, type WorkType } from "@/data/works";

export type UserProfile = {
  type: WorkType;
  tags: Record<TagKey, number>;
  matchTags: Record<MatchTag, number>;
};

export type MatchResult = {
  work: Work;
  similarity: number;
};

export const tagKeys: TagKey[] = [
  "genreSpectacle",
  "genrePrestige",
  "adaptation",
  "canonFaithful",
  "representation",
  "genderPowerShift",
  "issueInsertion",
  "commercialEntertainment",
  "controversyRisk",
  "mediaFriendly",
  "audienceAcceptance",
  "monetizationPressure",
  "playerFreedom",
  "storyDriven",
  "studioRisk",
];

export const createEmptyProfile = (type: WorkType): UserProfile => ({
  type,
  tags: tagKeys.reduce(
    (acc, key) => {
      acc[key] = 50;
      return acc;
    },
    {} as Record<TagKey, number>,
  ),
  matchTags: matchTagKeys.reduce(
    (acc, key) => {
      acc[key] = 0;
      return acc;
    },
    {} as Record<MatchTag, number>,
  ),
});

export const applyEffects = (
  profile: UserProfile,
  effects: Partial<Record<TagKey, number>>,
  matchTags: Partial<Record<MatchTag, number>> = {},
): UserProfile => {
  const nextTags = { ...profile.tags };
  const nextMatchTags = {
    ...matchTagKeys.reduce(
      (acc, key) => {
        acc[key] = profile.matchTags?.[key] ?? 0;
        return acc;
      },
      {} as Record<MatchTag, number>,
    ),
  };

  for (const [key, value] of Object.entries(effects) as [TagKey, number][]) {
    nextTags[key] = Math.max(0, Math.min(100, nextTags[key] + value));
  }

  for (const [key, value] of Object.entries(matchTags) as [MatchTag, number][]) {
    nextMatchTags[key] = Math.max(0, Math.min(160, (nextMatchTags[key] ?? 0) + value));
  }

  return {
    ...profile,
    tags: nextTags,
    matchTags: nextMatchTags,
  };
};

export const normalizeProfile = (profile: UserProfile): UserProfile => ({
  ...profile,
  tags: tagKeys.reduce(
    (acc, key) => {
      acc[key] = Math.max(0, Math.min(100, profile.tags[key] ?? 50));
      return acc;
    },
    {} as Record<TagKey, number>,
  ),
  matchTags: matchTagKeys.reduce(
    (acc, key) => {
      acc[key] = Math.max(0, Math.min(160, profile.matchTags?.[key] ?? 0));
      return acc;
    },
    {} as Record<MatchTag, number>,
  ),
});

const distanceToSimilarity = (distance: number) => {
  const maxDistance = Math.sqrt(tagKeys.length * 100 ** 2);
  const rawSimilarity = Math.max(0, 1 - distance / maxDistance);
  return Math.round(rawSimilarity ** 0.72 * 100);
};

const createIdfWeights = (candidates: Work[]) =>
  matchTagKeys.reduce(
    (acc, key) => {
      const count = candidates.filter((work) => work.matchTags.includes(key)).length;
      acc[key] = Math.log((candidates.length + 1) / (count + 1)) + 0.75;
      return acc;
    },
    {} as Record<MatchTag, number>,
  );

const markerScore = (profile: UserProfile, work: Work, idfWeights: Record<MatchTag, number>) => {
  const workTagSet = new Set(work.matchTags);
  const activeTags = matchTagKeys
    .map((key) => ({ key, weight: profile.matchTags[key] ?? 0, idf: idfWeights[key] ?? 1 }))
    .filter(({ weight }) => weight > 0)
    .sort((a, b) => b.weight * b.idf - a.weight * a.idf)
    .slice(0, 8);

  const score = activeTags.reduce((sum, { key, weight, idf }) => {
    const adjustedWeight = weight * idf;

    if (workTagSet.has(key)) {
      return sum + adjustedWeight * 0.06;
    }

    if (weight >= 28) {
      return sum - adjustedWeight * 0.045;
    }

    return sum;
  }, 0);

  const generalistPenalty = Math.max(0, work.matchTags.length - 12) * 0.9;

  return score - generalistPenalty;
};

const profileHash = (profile: UserProfile) => {
  const text = [
    profile.type,
    tagKeys.map((key) => Math.round(profile.tags[key])).join(","),
    matchTagKeys.map((key) => Math.round(profile.matchTags[key] ?? 0)).join(","),
  ].join("|");

  let hash = 2166136261;

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0) / 4294967296;
};

type RankedCandidate = {
  work: Work;
  similarity: number;
  score: number;
  distance: number;
};

const pickStableCandidate = (profile: UserProfile, ranked: RankedCandidate[]) => {
  const topScore = ranked[0]?.score ?? 0;
  const pool = ranked.filter((candidate) => candidate.score >= topScore - 8).slice(0, 8);
  const temperature = 10;
  const weights = pool.map((candidate) => Math.exp((candidate.score - topScore) / temperature));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let cursor = profileHash(profile) * totalWeight;

  for (let index = 0; index < pool.length; index += 1) {
    cursor -= weights[index];

    if (cursor <= 0) {
      return pool[index];
    }
  }

  return pool.at(-1) ?? ranked[0];
};

export const matchWork = (profile: UserProfile): MatchResult => {
  const normalized = normalizeProfile(profile);
  const candidates = works.filter((work) => work.type === normalized.type);
  const idfWeights = createIdfWeights(candidates);

  const ranked = candidates
    .map((work) => {
      const distance = Math.sqrt(
        tagKeys.reduce((sum, key) => {
          const delta = normalized.tags[key] - work.tags[key];
          return sum + delta * delta;
        }, 0),
      );

      return {
        work,
        similarity: distanceToSimilarity(distance),
        score: distanceToSimilarity(distance) + markerScore(normalized, work, idfWeights),
        distance,
      };
    })
    .sort((a, b) => b.score - a.score || a.distance - b.distance);

  const selected = pickStableCandidate(normalized, ranked);

  return {
    work: selected.work,
    similarity: Math.max(0, Math.min(100, Math.round(selected.score))),
  };
};
