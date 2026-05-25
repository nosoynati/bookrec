// Mood tag slugs sourced from Hardcover API (tag_category_id = 4)
// Top tags by usage: adventurous(55k), emotional(54k), dark(50k), mysterious(43k),
// tense(39k), funny(33k), reflective(33k), lighthearted(27k), sad(25k), hopeful(23k),
// inspiring(17k), relaxing(8k), romantic(1k), scary(193), cozy(170), etc.

export type MoodKey =
  | 'happy'
  | 'sad'
  | 'melancholic'
  | 'anxious'
  | 'bored'
  | 'romantic'
  | 'angry'
  | 'curious'
  | 'dark'
  | 'adventurous'
  | 'reflective'
  | 'cozy'
  | 'tense'
  | 'inspired'
  | 'mischievous';

export interface Mood {
  key: MoodKey;
  label: string;
  emoji: string;
  message: string;
  // Actual Hardcover mood tag slugs (tag_category_id = 4)
  tags: string[];
}

const MOODS: Record<MoodKey, Omit<Mood, 'key'>> = {
  happy: {
    label: 'Happy',
    emoji: '😄',
    message: "You're in great spirits! Here are some uplifting reads to match your energy.",
    tags: ['funny', 'lighthearted', 'hopeful', 'heartwarming', 'happy'],
  },
  sad: {
    label: 'Sad',
    emoji: '🌧️',
    message: "Feeling a little blue. These emotionally rich books truly understand.",
    tags: ['emotional', 'sad', 'melancholy', 'reflective'],
  },
  melancholic: {
    label: 'Melancholic',
    emoji: '🌅',
    message: "A wistful, bittersweet mood. These books live in that feeling with you.",
    tags: ['melancholy', 'reflective', 'nostalgic', 'emotional', 'sad'],
  },
  anxious: {
    label: 'Anxious',
    emoji: '🍃',
    message: "Let's slow things down. These calming reads will ease the noise.",
    tags: ['relaxing', 'lighthearted', 'hopeful', 'cozy'],
  },
  bored: {
    label: 'Bored',
    emoji: '⚡',
    message: "Need a jolt? These exciting, fast-paced books will fix that.",
    tags: ['adventurous', 'exciting', 'funny','mysterious'],
  },
  romantic: {
    label: 'Romantic',
    emoji: '💕',
    message: "Feeling the love? These books are full of heart.",
    tags: ['romantic', 'emotional','heartwarming', 'lighthearted'],
  },
  angry: {
    label: 'Angry',
    emoji: '🔥',
    message: "Channeling some fire? These intense books match that energy.",
    tags: ['tense', 'dark',  'intense','challenging'],
  },
  curious: {
    label: 'Curious',
    emoji: '🔍',
    message: "Feed that curiosity. These thought-provoking reads will keep you hooked.",
    tags: ['mysterious', 'informative', 'challenging', 'reflective'],
  },
  dark: {
    label: 'Dark',
    emoji: '🌑',
    message: "In a dark place? These books go there with you.",
    tags: ['dark', 'scarty','mysterious', 'tense', 'depressing'],
  },
  adventurous: {
    label: 'Adventurous',
    emoji: '🗺️',
    message: "Feeling bold? Strap in — these epic reads are ready.",
    tags: ['adventurous', 'exciting', 'epic'],
  },
  reflective: {
    label: 'Reflective',
    emoji: '💭',
    message: "In a contemplative mood? These introspective reads will meet you there.",
    tags: ['reflective', 'introspective', 'emotional', 'challenging'],
  },
  cozy: {
    label: 'Cozy',
    emoji: '☕',
    message: "Craving comfort? These warm, gentle books are perfect company.",
    tags: ['relaxing', 'cozy', 'lighthearted', 'hopeful'],
  },
  tense: {
    label: 'Tense',
    emoji: '😬',
    message: "On edge? Channel it into these gripping, suspenseful reads.",
    tags: ['tense', 'suspenseful', 'scary', 'mysterious'],
  },
  inspired: {
    label: 'Inspired',
    emoji: '✨',
    message: "Riding high on motivation? These books will fuel that spark.",
    tags: ['inspiring', 'hopeful', 'emotional', 'reflective'],
  },
  mischievous: {
    label: 'Mischievous',
    emoji: '😈',
    message: "Feeling a little wicked? These cunning, darkly playful reads are just your speed.",
    tags: ['dark', 'mysterious', 'scary','tense'],
  },
};

const KEYWORD_MAP: Record<string, MoodKey> = {
  // happy
  happy: 'happy', joy: 'happy', joyful: 'happy', great: 'happy', excited: 'happy',
  cheerful: 'happy', wonderful: 'happy', amazing: 'happy', fantastic: 'happy',
  elated: 'happy', thrilled: 'happy', ecstatic: 'happy', delighted: 'happy',
  giddy: 'happy', good: 'happy', awesome: 'happy', glad: 'happy',
  // sad
  sad: 'sad', depressed: 'sad', unhappy: 'sad', miserable: 'sad', blue: 'sad',
  gloomy: 'sad', sorrow: 'sad', grief: 'sad', crying: 'sad', tearful: 'sad',
  heartbroken: 'sad', down: 'sad', devastated: 'sad', hopeless: 'sad',
  // melancholic
  melancholic: 'melancholic', melancholy: 'melancholic', wistful: 'melancholic',
  nostalgic: 'melancholic', bittersweet: 'melancholic', longing: 'melancholic',
  reminiscing: 'melancholic', missing: 'melancholic', pensive: 'melancholic',
  // anxious
  anxious: 'anxious', anxiety: 'anxious', stressed: 'anxious', stress: 'anxious',
  nervous: 'anxious', worried: 'anxious', worry: 'anxious', overwhelmed: 'anxious',
  panicked: 'anxious', tense: 'tense', uneasy: 'anxious', scared: 'tense',
  // bored
  bored: 'bored', boring: 'bored', dull: 'bored', unmotivated: 'bored',
  apathetic: 'bored', meh: 'bored', restless: 'bored', listless: 'bored',
  // romantic
  romantic: 'romantic', love: 'romantic', loving: 'romantic', affectionate: 'romantic',
  dreamy: 'romantic', swooning: 'romantic', crush: 'romantic', smitten: 'romantic',
  infatuated: 'romantic', flirty: 'romantic',
  // angry
  angry: 'angry', frustrated: 'angry', mad: 'angry', rage: 'angry', irritated: 'angry',
  annoyed: 'angry', furious: 'angry', pissed: 'angry', livid: 'angry', fuming: 'angry',
  // curious
  curious: 'curious', wondering: 'curious', intrigued: 'curious', interested: 'curious',
  fascinated: 'curious', inquisitive: 'curious', questioning: 'curious',
  // dark
  dark: 'dark', darkness: 'dark', bleak: 'dark', nihilistic: 'dark', hollow: 'dark',
  empty: 'dark', numb: 'dark', lost: 'dark', broken: 'dark',
  // adventurous
  adventurous: 'adventurous', adventure: 'adventurous', bold: 'adventurous',
  daring: 'adventurous', brave: 'adventurous', energetic: 'adventurous', wild: 'adventurous',
  // reflective
  thoughtful: 'reflective', reflective: 'reflective', philosophical: 'reflective',
  contemplative: 'reflective', introspective: 'reflective', deep: 'reflective',
  // cozy
  cozy: 'cozy', calm: 'cozy', peaceful: 'cozy', relaxed: 'cozy', comfortable: 'cozy',
  quiet: 'cozy', serene: 'cozy', gentle: 'cozy',
  // tense
  tense2: 'tense', suspense: 'tense', thrilled2: 'tense', fearful: 'tense', horror: 'tense',
  // inspired
  inspired: 'inspired', inspiring: 'inspired', motivated: 'inspired', hopeful: 'inspired',
  optimistic: 'inspired', enthusiastic: 'inspired', determined: 'inspired',
  // mischievous
  evil: 'mischievous', mischievous: 'mischievous', wicked: 'mischievous', devious: 'mischievous',
  cunning: 'mischievous', villainous: 'mischievous', scheming: 'mischievous', sly: 'mischievous',
  naughty: 'mischievous', sneaky: 'mischievous', sinister: 'mischievous',
};

const REASONS: Partial<Record<MoodKey, Partial<Record<string, string>>>> = {
  happy: {
    funny: "Laughter amplifies joy — readers say this one had them genuinely laughing out loud.",
    lighthearted: "Breezy, warm, and impossible to put down. A perfect companion for your bright mood.",
    hopeful: "Overflowing with optimism and heart. It'll keep the good vibes going.",
    heartwarming: "The kind of book that leaves you smiling long after the last page.",
    happy: "Pure, unfiltered joy. Readers say it's an instant mood-booster.",
  },
  sad: {
    emotional: "Sometimes the most healing thing is a book that truly feels what you feel.",
    sad: "A story that holds grief with honesty and grace — you won't feel alone in it.",
    melancholy: "Rich in quiet sorrow. Perfect for sitting with your feelings rather than rushing past them.",
    reflective: "Slow, thoughtful, and tender. Gives you space to process what you're carrying.",
  },
  melancholic: {
    melancholy: "Beautifully bittersweet — it captures that aching, nostalgic feeling better than words can.",
    reflective: "A contemplative read that turns looking back into something almost beautiful.",
    nostalgic: "Steeped in longing and memory. Exactly what nostalgia feels like on a page.",
    emotional: "Deeply felt and quietly devastating in the best way.",
    sad: "Honest about loss and time in a way that feels like a kindred spirit.",
  },
  anxious: {
    relaxing: "Slow-paced and soothing — the literary equivalent of a deep breath.",
    lighthearted: "Gentle, low-stakes, and calming. No cliffhangers, just comfort.",
    hopeful: "A reminder that things can get better. Readers found it genuinely reassuring.",
    cozy: "Warm and safe — the kind of world you want to stay in when the real one feels too loud.",
  },
  bored: {
    adventurous: "Fast, bold, and impossible to put down. No slow starts — it hooks you immediately.",
    exciting: "Readers describe it as genuinely thrilling. Your evening plans just changed.",
    tense: "The kind of book where you keep reading 'just one more chapter' at 2am.",
    funny: "If boredom is the disease, this book is a laugh-out-loud cure.",
  },
  romantic: {
    romantic: "Swoony, warm, and deeply satisfying. Readers called it their favourite love story.",
    emotional: "Love that hits deep — not just butterflies but real, felt connection.",
    lighthearted: "Charming and fun romance that leaves you glowing.",
    heartwarming: "The kind of love story that restores your faith in people.",
  },
  angry: {
    tense: "Matches your energy and channels it into something gripping.",
    dark: "Raw, unflinching, and cathartic. Sometimes anger needs a dark mirror.",
    challenging: "Intellectually demanding — channelling frustration into something meaningful.",
    intense: "Intense, propulsive, and satisfying in the way only a fierce read can be.",
  },
  curious: {
    mysterious: "Layers of mystery that reward every curious reader. You won't see the ending coming.",
    informative: "Genuinely fascinating — expands the way you see the world.",
    challenging: "Dense with ideas that will keep you thinking for days.",
    reflective: "Asks the questions you've been turning over, then answers them unexpectedly.",
  },
  dark: {
    dark: "Unflinching and atmospheric — it goes to the dark places without flinching.",
    mysterious: "A creeping sense of unease that builds into something unforgettable.",
    tense: "Taut and relentless. It matches the weight of where your head is right now.",
    depressing: "Honest about the hard parts of being human. Heavy, but never hollow.",
  },
  adventurous: {
    adventurous: "Big, bold, and sweeping — the kind of story that makes you want to go somewhere.",
    exciting: "Packed with momentum. You won't want to come up for air.",
    tense: "Every chapter raises the stakes. Exactly the thrill you're looking for.",
    epic: "A world so vast and alive it dwarfs everything around it.",
  },
  reflective: {
    reflective: "Quietly profound — it mirrors your contemplative mood and deepens it.",
    introspective: "A book that turns inward with you, asking the same questions you are.",
    emotional: "Honest and human in a way that makes reflection feel worthwhile.",
    challenging: "Demands your full attention and rewards it with genuine insight.",
  },
  cozy: {
    relaxing: "Unhurried and peaceful — the perfect book for a slow afternoon.",
    cozy: "Warm atmosphere, gentle stakes, and characters you'll miss when it ends.",
    lighthearted: "Light and pleasant — exactly what you want when you need to unwind.",
    hopeful: "Leaves you feeling gently better about things. The coziest kind of hopeful.",
  },
  tense: {
    tense: "Edge-of-your-seat tension from the first page. Match made in heaven.",
    suspenseful: "Readers say they couldn't breathe until the last chapter.",
    scary: "Genuinely unsettling in the best way — perfect for that tense, wired feeling.",
    mysterious: "Full of dread and intrigue. Leans right into the discomfort.",
  },
  inspired: {
    inspiring: "The kind of book that makes you want to do something with your life immediately.",
    hopeful: "Quietly powerful. Readers say it gave them back their sense of possibility.",
    emotional: "Moves you deeply, then leaves you energised rather than drained.",
    reflective: "Turns inward to find something uplifting — a rarer, more honest kind of inspiration.",
  },
  mischievous: {
    dark: "Deliciously dark and morally murky — perfect for when you're feeling a little villainous.",
    mysterious: "Full of schemes and secrets. The kind of book that makes you feel cleverly in on it.",
    funny: "Sharp, witty, and a little wicked. Exactly the right kind of trouble.",
    adventurous: "Bold and audacious — for when you want to root for the rogue.",
  },
};

const FALLBACK_REASONS: Partial<Record<string, string>> = {
  adventurous: "A bold, thrilling pick that won't let you sit still.",
  emotional: "Deeply felt and human — the kind of read that stays with you.",
  dark: "Dark, atmospheric, and impossible to ignore.",
  mysterious: "Full of twists and shadows — keeps you guessing.",
  tense: "Relentlessly gripping from start to finish.",
  funny: "Genuinely funny — readers couldn't stop smiling.",
  reflective: "Quiet and thoughtful in the best possible way.",
  lighthearted: "Warm, breezy, and an easy joy to read.",
  sad: "Honest about sorrow without wallowing in it.",
  hopeful: "Leaves you with a quiet, lasting sense of possibility.",
  inspiring: "The kind of story that makes you want to be better.",
  relaxing: "Unhurried, gentle, and deeply soothing.",
  romantic: "A love story that earns its happy ending.",
  scary: "Unsettling in all the right ways.",
  cozy: "Like a warm drink on a cold day — comforting and hard to put down.",
};

export function getRecommendationReason(moodKey: MoodKey, matchedTag: string): string {
  return (
    REASONS[moodKey]?.[matchedTag] ??
    FALLBACK_REASONS[matchedTag] ??
    "Highly rated and beloved by readers who share your taste."
  );
}

export function detectMood(input: string): Mood {
  const words = input.toLowerCase().match(/\w+/g) ?? [];

  const scores: Partial<Record<MoodKey, number>> = {};
  for (const word of words) {
    const mood = KEYWORD_MAP[word];
    if (mood) scores[mood] = (scores[mood] ?? 0) + 1;
  }

  const best = (Object.entries(scores) as [MoodKey, number][]).sort((a, b) => b[1] - a[1])[0];
  const key: MoodKey = best?.[0] ?? '';

  return { key, ...MOODS[key] };
}
