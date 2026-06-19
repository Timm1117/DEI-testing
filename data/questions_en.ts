export type QuestionTranslation = {
  title: string;
  subtitle?: string;
  options: {
    label: string;
    description: string;
  }[];
};

export const questionsEn: Record<string, QuestionTranslation> = {
  genre: {
    title: "What kind of project are you serving up this time?",
    options: [
      {
        label: "High spectacle, hold the lectures",
        description: "Pacing and action first. Audiences buy tickets for entertainment, not a civics class.",
      },
      {
        label: "I'm making this for film festival judges",
        description: "Heavy themes, suffering characters. Applause isn't guaranteed, but critics will talk.",
      },
      {
        label: "Sit down old fans, I know what you're afraid of",
        description: "Prioritize familiarity. Keep the comment section from breaking into war first.",
      },
    ],
  },
  adaptation: {
    title: "Does this project carry a heavy IP legacy?",
    options: [
      {
        label: "Completely original, my own success or failure",
        description: "No old fans pointing fingers, but no nostalgia to buffer opening-week traffic either.",
      },
      {
        label: "Carve into a famous IP",
        description: "Comes with a built-in audience, but also a frame-by-frame jury. Changing a hair color triggers essays.",
      },
      {
        label: "Revive an obscure classic while memories are blurry",
        description: "Has a blueprint to build on, but more creative freedom. The complaints arrive much later.",
      },
    ],
  },
  canon: {
    title: "How closely will you stick to the source material?",
    options: [
      {
        label: "The source is sacred, hands off",
        description: "Keep characters, worldbuilding, and classic moments intact to lower fan blood pressure.",
      },
      {
        label: "Capture the spirit, rewrite the details",
        description: "Make it accessible to new audiences, and accept fans complaining you don't respect the source.",
      },
      {
        label: "In name only, rewrite everything else",
        description: "Use the IP as an entry ticket, then modernize it until it feels like a different work.",
      },
    ],
  },
  representation: {
    title: "How heavily will you push diverse representation?",
    options: [
      {
        label: "Integrate naturally, don't shout it through a megaphone",
        description: "Characters first, identities second. Let the audience feel it organically.",
      },
      {
        label: "Slap it right on the poster, that's the selling point",
        description: "Marketing, interviews, character arcs all state it upfront. Buzz is buzz.",
      },
      {
        label: "Stick to the classic formula, don't scare audiences away",
        description: "Avoid sensitive changes. Keep it in the safe zone for the box office and player base.",
      },
    ],
  },
  "gender-power": {
    title: "Will you flip the table on character power dynamics?",
    options: [
      {
        label: "Flip it, put formerly marginalized groups in the spotlight",
        description: "Whoever used to be background dressing now drives the plot forward.",
      },
      {
        label: "Ensemble balance, nobody is a mere tool",
        description: "Every character has agency and flaws, without relying on cheap slogans.",
      },
      {
        label: "Stick to classic configurations, avoid trouble",
        description: "Give genre audiences exactly what they want. Fewer meetings, fewer controversies.",
      },
    ],
  },
  issues: {
    title: "How packed will you stuff it with social issues?",
    options: [
      {
        label: "Use like seasoning, don't dump the whole bottle",
        description: "Let audiences sense it, but don't hold them down to lecture them.",
      },
      {
        label: "The issue is the characters' core conflict",
        description: "Conflict, choices, and failures are deeply tied to value systems.",
      },
      {
        label: "I'll say it loud and clear, sensitive souls can look away",
        description: "Take a clear stance. Haters will hate, but believers will get incredibly hyped.",
      },
    ],
  },
  entertainment: {
    title: "Where does entertainment value rank on your list?",
    options: [
      {
        label: "Priority #1, audiences are not here to suffer",
        description: "Humor, action, pacing, and climaxes must deliver on time.",
      },
      {
        label: "Both thrills and themes, adults don't choose",
        description: "Let the themes serve the experience, rather than flattening the experience into a slideshow.",
      },
      {
        label: "Refund if you don't get it, I want artistic expression",
        description: "The work can be sharp, hard to digest, or even intentionally uninviting.",
      },
    ],
  },
  risk: {
    title: "How far are you willing to let the comment section burn?",
    options: [
      {
        label: "Keep it cool, PR wants to go home too",
        description: "Avoid predictable culture war minefields. Play it safe before chasing hits.",
      },
      {
        label: "Constructive debate is fine, just stay off trending lists",
        description: "Exchange controversy for buzz, but leave room to steer the narrative back.",
      },
      {
        label: "Better to be bashed than forgotten",
        description: "Division itself is a brand. The louder the fight, the better the free promo.",
      },
    ],
  },
  press: {
    title: "How will you manage media relations?",
    options: [
      {
        label: "Spoon-feed them review buzzwords",
        description: "Give critics, columnists, and community accounts easy headlines to write.",
      },
      {
        label: "Let the work speak for itself, ease up on labeling",
        description: "Avoid pushing stances to minimize pre-release fatigue.",
      },
      {
        label: "Anti-mainstream play: more cynicism, more traffic",
        description: "Turn media skepticism into a rallying cry for your core audience.",
      },
    ],
  },
  audience: {
    title: "Which audience group do you want to please most?",
    options: [
      {
        label: "Core fans, keep them from raging first",
        description: "Respect source canon, traditional settings, and familiar emotional payoffs.",
      },
      {
        label: "New audience, who cares if old fans get it",
        description: "Lower the barrier of entry so anyone can jump in without knowing the lore.",
      },
      {
        label: "Critics and social media chatterboxes",
        description: "Make the work highly screenshotable, dissectable, quoteable, and debate-ready.",
      },
    ],
  },
  ending: {
    title: "How will you wrap up the ending?",
    options: [
      {
        label: "Satisfying resolution, everyone goes home happy",
        description: "Hope, reconciliation, victory. At least they won't leave swearing.",
      },
      {
        label: "Bitter reflection, make them argue for three days",
        description: "Don't give cheap answers. Extend the discussion long after the credits roll.",
      },
      {
        label: "Intentionally provocative, expectations are meant to be shattered",
        description: "Dismantle expectations in exchange for polarizing ratings and a lasting impression.",
      },
    ],
  },
  marketing: {
    title: "What will be your main marketing tagline?",
    options: [
      {
        label: "Stars, spectacles, pure fun, skip the talk",
        description: "Let them see the price is worth it first, details after they enter.",
      },
      {
        label: "Breakthroughs, values, generational impact",
        description: "Turn the work into a cultural event rather than just weekend entertainment.",
      },
      {
        label: "Nostalgia collection, faithful adaptation",
        description: "Show everyone we didn't butcher the source. Cool down the comment section.",
      },
    ],
  },
  budget: {
    title: "How large is the budget scale?",
    options: [
      {
        label: "Blockbuster size, failure means a spectacular crash",
        description: "Every choice is under a microscope. Burns money and sparks debate.",
      },
      {
        label: "Mid-tier surgical strike, no wasted budget",
        description: "Focus the budget on characters, pacing, and execution quality.",
      },
      {
        label: "Low-budget experimental, those who know will know",
        description: "Highly stylized, narrower audience, going viral depends entirely on luck.",
      },
    ],
  },
  "film-casting": {
    title: "What demographic background do you want for the lead?",
    subtitle: "This isn't about hierarchy, but about where you want the audience's primary focus to land.",
    options: [
      {
        label: "White lead, secure the traditional safety zone",
        description: "Least likely to be criticized for changing the formula, but easiest to call uninspired.",
      },
      {
        label: "Asian lead, capture the global market",
        description: "Increases cultural distinctiveness and marketing angles. Can't just be a token.",
      },
      {
        label: "Black lead, bring both buzz and magnifying glasses",
        description: "Can be highly impactful, but audiences will inspect if it's just a token race-swap.",
      },
      {
        label: "Latino lead, incorporate family, neighborhood, and cross-cultural themes",
        description: "Great for emotional connections, but risks turning into stereotypes if written flatly.",
      },
      {
        label: "Native American lead, don't touch it if you're afraid of history",
        description: "Ties land, trauma, and identity politics into the plot. Deep, but glaring if done poorly.",
      },
      {
        label: "Indigenous islander lead, expand the worldview beyond Western imagination",
        description: "Strong visual and cultural signature, requires rigorous research to avoid looking like a tourism ad.",
      },
      {
        label: "Alien lead, sidestep human identity politics entirely",
        description: "Use non-human allegories. The issues can run deep without triggering immediate backlash.",
      },
    ],
  },
  "film-tone": {
    title: "What tone will you set for this film?",
    options: [
      {
        label: "Lighthearted comedy, mask issues with humor",
        description: "Audiences swallow it with laughter, only realizing the message later.",
      },
      {
        label: "Dark realism, leave them in silence",
        description: "Max out social allegories, psychological tension, and morally gray choices.",
      },
      {
        label: "Spectacular adventure, blow things up first",
        description: "Wrap values inside genre thrills, keeping the audience locked in for the ride.",
      },
    ],
  },
  "film-awards": {
    title: "How much will you cater to the award season and critics?",
    options: [
      {
        label: "A lot, design the red carpet walk and speeches in advance",
        description: "Pacing, interviews, and thematic depth all serve the award campaign.",
      },
      {
        label: "Let it flow naturally, don't morph the film for trophies",
        description: "Word-of-mouth matters, but we won't let it dictate the entire production.",
      },
      {
        label: "Trophies aside, box office and online buzz are sweeter",
        description: "Who cares if judges don't buy it? Audience reactions are what's real.",
      },
    ],
  },
  "game-business": {
    title: "How will you monetize the game without getting review-bombed?",
    options: [
      {
        label: "Premium buy-to-play, clean experience",
        description: "Fewer monetization tricks. Players won't feel like ATM machines.",
      },
      {
        label: "Live service, keep them returning daily",
        description: "Updates can save a game, but it also maximizes commercial pressure.",
      },
      {
        label: "Deluxe editions, cosmetics, battle passes, earn what we can",
        description: "Avoid pay-to-win elements, but pricing and greed will definitely be discussed.",
      },
    ],
  },
  "game-freedom": {
    title: "How much freedom will you give the players?",
    options: [
      {
        label: "Maximum freedom, let players cause their own trouble",
        description: "Let players digest character paths and values through their own choices.",
      },
      {
        label: "Semi-open, don't let players break the story",
        description: "Keep choices, but critical plot developments remain under author control.",
      },
      {
        label: "Linear narrative, sit down and listen to my story",
        description: "Sacrifice freedom for tight control and stronger emotional impact.",
      },
    ],
  },
  "game-story": {
    title: "Should the story override gameplay?",
    options: [
      {
        label: "The story is the core, gameplay serves the emotion",
        description: "Character fates, thematic debates, and gut punches are the focus.",
      },
      {
        label: "Gameplay first, don't let the story block my actions",
        description: "Push narrative to the background; fun mechanics are what truly matters.",
      },
      {
        label: "I want it all, don't force a choice",
        description: "Keep narrative weight while giving players enough mechanical depth.",
      },
    ],
  },
  "game-character": {
    title: "What demographic background do you want for the player character?",
    subtitle: "Games add an immersion layer: players don't just watch the lead, they ask if they can inhabit them.",
    options: [
      {
        label: "White lead, go with the classic default template",
        description: "Resembles traditional blockbusters. Low friction, but also low novelty.",
      },
      {
        label: "Asian lead, give action, sci-fi, or urban genres a new face",
        description: "Highly visible globally, but characters can't just be hollow cultural symbols.",
      },
      {
        label: "Black lead, put the debate front and center",
        description: "High brand recognition. The community will scrutinize; merits and flaws get amplified.",
      },
      {
        label: "Latino lead, anchor them with family, language, and neighborhood vibes",
        description: "Perfect for open-world or narrative RPGs, but risks stereotyping if poorly done.",
      },
      {
        label: "Native American lead, make land and history more than background textures",
        description: "Raises the thematic weight. Players expect you to truly understand the culture.",
      },
      {
        label: "Indigenous islander lead, create an uncommon and highly visual setting",
        description: "Fits fantasy, ocean adventure, and tribal politics. Requires meticulous design.",
      },
      {
        label: "Alien lead, keep players from arguing about human categories",
        description: "Abstracts identity conflicts. Less controversy, but issues might get diluted.",
      },
    ],
  },
  "game-community": {
    title: "How will you manage the player community?",
    options: [
      {
        label: "Enable mods and fan creations, let players add content",
        description: "Relinquish control. The game's lifespan might be rescued by the community.",
      },
      {
        label: "Strict control, no unauthorized interpretations",
        description: "Preserves author intent, but player backlash might also remain locked in.",
      },
      {
        label: "Launch first, fix later, redeem ratings through updates",
        description: "Patches, DLCs, adjustments. Save what you can.",
      },
    ],
  },
  "film-distribution": {
    title: "What is your film distribution strategy?",
    options: [
      {
        label: "Theatrical release, let the box office speak",
        description: "Dare to hit the big screen, don't fear opening weekend public executions.",
      },
      {
        label: "Direct to streaming, prioritize buzz first",
        description: "Fewer box office pressures, more algorithm luck and social screenshot potential.",
      },
      {
        label: "Festival run first, let word-of-mouth spread",
        description: "Get critic endorsements first, then see if general audiences buy in.",
      },
    ],
  },
  "film-script-focus": {
    title: "Where will you focus the script?",
    options: [
      {
        label: "Character arcs, make the audience break down with them",
        description: "Write deep personalities. Make conflicts genuine, not just labels.",
      },
      {
        label: "Memeable quotes, prepare for TikTok and Reels edits",
        description: "Every ten minutes must have a quoteable line fit for social media.",
      },
      {
        label: "Set-pieces first, ignore plot logic for now",
        description: "Thrill the audience. Plot holes can be debated on second viewings.",
      },
    ],
  },
  "film-franchise": {
    title: "For a franchise, how far do you dare to reboot?",
    options: [
      {
        label: "Safe sequel, serve another plate of what they know",
        description: "No revolutions. Just don't ruin the brand name on your watch.",
      },
      {
        label: "Complete reboot, gamble on old and new fans alike",
        description: "Update characters, perspectives, themes. Win big or face public execution.",
      },
      {
        label: "Deconstruct classics, dismantle childhood memories directly",
        description: "Question the hero mythos. Old fans might break down on the spot.",
      },
    ],
  },
  "film-visual": {
    title: "Where will you push the visual style of the film?",
    options: [
      {
        label: "Practical effects and raw textures, less plastic feel",
        description: "Let audiences feel the money on screen, not in the VFX post-production black hole.",
      },
      {
        label: "Trendy aesthetics, make every frame a wallpaper",
        description: "Colors, fashion, camera work must have high social media recognition.",
      },
      {
        label: "Auteur style, it's normal if general audiences don't get it",
        description: "Composition and pacing serve expression, not popcorn buyers.",
      },
    ],
  },
  "game-difficulty": {
    title: "How will game difficulty challenge the players?",
    options: [
      {
        label: "Hardcore to the bone, get good",
        description: "Frustration is part of the experience. Failure is not the system's fault.",
      },
      {
        label: "Multiple difficulty settings, don't drive them away",
        description: "Challenge for those who want it, story mode so others aren't blocked.",
      },
      {
        label: "Story mode fully loaded, let everyone beat the game first",
        description: "Lower barriers, boost discussion, but hardcore gamers might call it spineless.",
      },
    ],
  },
  "game-liveops": {
    title: "How will you support the game post-launch?",
    options: [
      {
        label: "Launch a complete product, don't ask forgiveness with patches",
        description: "Playable on day one. Don't treat players as free QA testers.",
      },
      {
        label: "Max out seasonal updates, never let players finish",
        description: "Endless content, but chores, battle passes, and fatigue will follow.",
      },
      {
        label: "Release first, fix later, redeem ratings through updates",
        description: "May get trashed at launch, but if you fix it long enough, you can turn the tide.",
      },
    ],
  },
};
