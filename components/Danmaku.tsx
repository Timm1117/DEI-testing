"use client";

const hashText = (text: string) => {
  let hash = 2166136261;

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const randomBetween = (seed: number, min: number, max: number) => min + (seed / 4294967295) * (max - min);

export function Danmaku({ comments }: { comments: string[] }) {
  const lines = Array.from(new Set(comments)).slice(0, 34);

  if (lines.length === 0) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {lines.map((comment, index) => (
        (() => {
          const seed = hashText(`${comment}-${index}`);
          const seedA = hashText(`${seed}-a`);
          const seedB = hashText(`${seed}-b`);
          const seedC = hashText(`${seed}-c`);
          const laneCount = 17;
          const lane = (index * 7 + (seed % laneCount)) % laneCount;
          const top = 4 + lane * 5.35 + randomBetween(seed, -0.7, 0.7);
          const duration = randomBetween(seedA, 46, 88);
          const delay = -((index * 5.8 + randomBetween(seedB, 0, 4)) % duration);
          const opacity = randomBetween(seedC, 0.54, 0.86);

          return (
            <div
              key={`${comment}-${index}`}
              className={`danmaku-line absolute whitespace-nowrap rounded-full border border-white/15 bg-black/[0.42] px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md md:px-4 md:py-2 md:text-sm ${index >= 8 ? "hidden md:block" : ""}`}
              style={{
                top: `${top}vh`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
                opacity,
              }}
            >
              {comment}
            </div>
          );
        })()
      ))}
    </div>
  );
}
