// Your library 
//🔥 LitBitch — God Is Doing Everything
const LitBitchHooks = {
  onInput: function (text) {
    console.log("🧠 LitBitch called");

    // 🧹 Clear previous overlay messages
    for (const key in OverlayMessages) OverlayMessages[key] = "";

    // 🧠 Interpret and detect changes
    LitBitch_interpret(text);
    LitBitch_detectChanges();

    // 💀 Collapse check
    if (
      state._life_health <= Death.Resurrection.health ||
      state._life_fatigue <= Death.Resurrection.fatigue
    ) {
      Death.mirror("Life");
      OverlayMessages.collapse = `💀 Collapse triggered ${state._life_health}`;
    }

    // 🧬 Resurrection check
    if (Resurrection.status() === "pending") {
      Resurrection.recover("Life");
      OverlayMessages.recovery = `🧬 Resurrection complete`;
    }

    // 🍽️ Stat summary
    OverlayMessages.statDelta = `🍽️ Hunger: ${state._life_hunger} | Thirst: ${state._life_thirst} | Energy: ${state._life_fatigue}`;

    // 🌦️ Environment summary
    OverlayMessages.Topdown = `🌦️ ${state._topdown_type} | 🌡️ ${state._topdown_temp}°F | 🌙 ${state._topdown_moon} | 🍂 ${state._topdown_season}`;

    // 🕰️ Time summary
    OverlayMessages.PapaClock = `🕰️ ${state._papaclock_hour}:${state._papaclock_minute} | 📅 ${state._papaclock_day} ${state._papaclock_month} ${state._papaclock_year}`;

    // 🤕 Injury summary
    const injuries = Object.keys(state._booboo_status || {}).length ? "Active" : "None";
    OverlayMessages.booboo = `🤕 Injuries: ${injuries}`;

    // 💞 Relationship summary
    const relType = state._homiestolovers_type ?? "Unknown";
    const relVal = state._homiestolovers_value ?? "—";
    OverlayMessages.HomiesToLovers_update = `💞 Relationship: ${relType} (${relVal})`;

    // 🔥 LitBitch prompt
    OverlayMessages.Litbitch = `🔥 Awaiting mythic moment...`;

    // 🧾 Log feedback only
    console.log("🧾 Feedback:\n" + renderLitBitchOverlay());

    return text;
  },

  onContext: function (text) {
    console.log("🧠 LitBitch.onContext called");
    return LitBitchHooks.onInput(text);
  },

  onOutput: function (text) {
    console.log("🧠 LitBitch.onOutput called");

    // 🎨 Forge overlays for output phase
    AutoPocket("litbitch", "forge overlays");

    // 🧾 Log overlay and feedback
    console.log("🧾 Overlay:\n" + PocketFormatter());
    console.log("🧾 Feedback:\n" + renderLitBitchOverlay());

    // 🪄 Return enriched output
    return `${text}\n\n${PocketFormatter()}\n\n${renderLitBitchOverlay()}`;
 } 
    }


// 🎭 Emotion Words
const MammaDontSing = {
  overlayPrompts: {
    collapse: [
      "💀 Collapse looms. The system trembles...",
      "🧨 Threshold breached. Myth recoils..."
    ],
    recovery: [
      "🧬 Resurrection stirs beneath the surface...",
      "🌿 Healing begins in silence..."
    ],
    thefeels: {
      joy: ["🎉 Joy surges through the arc...", "😊 Lightness returns to the myth..."],
      anger: ["🔥 Rage ignites the path...", "💢 Tension crackles in the air..."],
      sadness: ["💧 Grief pools in the margins...", "😭 The myth mourns..."],
      fear: ["👻 Shadows lengthen. Fear takes root...", "😱 The unknown presses in..."],
      calm: ["🌿 Stillness settles...", "🧘 The arc breathes..."]
    },
    environment: {
      clear: ["☀️ The sky clears. Hope returns..."],
      storm: ["⛈️ Chaos brews above...", "⚡ The storm speaks..."],
      snow: ["❄️ Silence falls in flakes..."],
      fullMoon: ["🌕 The moon reveals all...", "🔮 Magic peaks under full light..."],
      newMoon: ["🌑 Secrets stir in darkness...", "🌘 The myth hides its face..."],
      Spring: ["🌸 New growth awakens...", "🐣 The arc begins again..."],
      Winter: ["❄️ Cold grips the tale...", "🕯️ Only embers remain..."]
    },
    temperature: {
      cold: ["🥶 The air bites. Collapse nears..."],
      hot: ["🔥 Heat distorts the arc..."],
      comfort: ["🌤️ Conditions are stable..."]
    },
    relationship: {
      Stranger: ["👁️ A new presence enters...", "🌀 Unknown paths converge..."],
      Friend: ["🤝 Bonds deepen...", "💬 Shared echoes resound..."],
      Lover: ["💞 Hearts align...", "🔥 Desire shapes the myth..."],
      Enemy: ["🗡️ Conflict sharpens...", "⚔️ The arc fractures..."]
    },
    inventory: {
      gain: ["📦 A new item joins the journey...", "🧳 Inventory expands..."],
      loss: ["🕳️ Something precious is gone...", "🗑️ An item fades from memory..."]
    },
    time: {
      dawn: ["🌅 A new cycle begins..."],
      dusk: ["🌇 The light wanes..."],
      midnight: ["🌌 The veil thins..."]
    }
  },

  emotion: {
    joy:     ["elated", "gleeful", "radiant", "ecstatic", "cheerful", "content", "euphoric", "uplifted", "grinning", "lighthearted"],
    sorrow:  ["grief", "mourning", "heartbroken", "melancholy", "numb", "despair", "regretful", "lonely", "dejected", "blue"],
    anger:   ["furious", "seething", "irate", "hostile", "resentful", "vengeful", "explosive", "snapped", "boiling", "rageful"],
    fear:    ["terrified", "anxious", "panicked", "dreadful", "uneasy", "apprehensive", "shaken", "startled", "nervous", "paralyzed"],
    calm:    ["serene", "peaceful", "tranquil", "still", "centered", "relaxed", "gentle", "quiet", "soft", "balanced"]
  },

  tone: {
    sarcastic: ["mocking", "dry", "biting", "snide", "wry", "ironic", "dismissive", "sharp", "cutting", "smirking"],
    pleading:  ["desperate", "fragile", "yearning", "imploring", "tearful", "vulnerable", "aching", "soft", "begging", "hopeful"],
    cold:      ["detached", "icy", "flat", "clinical", "stoic", "blank", "emotionless", "distant", "unmoved", "hollow"],
    warm:      ["gentle", "kind", "open", "inviting", "glowing", "friendly", "affectionate", "comforting", "tender", "caring"]
  },

  // 🧵 Arc Keywords — you can continue adding here

  arc: {
    awakening: ["epiphany", "realization", "clarity", "unlock", "shift", "vision", "awareness", "breakthrough", "spark", "truth"],
    betrayal:  ["deceived", "abandoned", "stabbed", "broken trust", "exposed", "manipulated", "forsaken", "lied to", "discarded", "used"],
    collapse:  ["ruin", "shatter", "lost", "crumble", "breakdown", "failure", "destruction", "void", "fall", "end"],
    rebirth:   ["renewal", "rise", "return", "reclaim", "resurge", "phoenix", "restart", "revival", "rebuild", "resurrect"]
  },

  // 🔨 Verbs: expressive actions, reactions, and triggers
  verbs: [
    "shatter", "embrace", "betray", "whisper", "scream", "tremble", "collapse", "ignite", "vanish", "reclaim",
    "wander", "strike", "heal", "hide", "confess", "defy", "grasp", "observe", "retreat", "advance",
    "crumble", "resist", "yield", "invoke", "protect", "destroy", "create", "search", "remember", "forget"
  ],

  // 🎨 Adjectives: mood, tone, and scene descriptors
  adjectives: [
    "fragile", "radiant", "hollow", "furious", "gentle", "twisted", "serene", "chaotic", "lonely", "vibrant",
    "ancient", "broken", "enchanted", "distant", "hopeful", "numb", "tense", "warm", "cold", "resolute",
    "shaken", "obsessed", "faithful", "bitter", "glowing", "stoic", "desperate", "unseen", "fading", "unspoken"
  ],

  // 🧱 Nouns: expressive anchors for scenes, arcs, and overlays
  nouns: [
    "truth", "memory", "shadow", "light", "rage", "grief", "hope", "storm", "echo", "flame",
    "path", "voice", "secret", "curse", "gift", "dream", "ruin", "bond", "veil", "pulse",
    "thread", "mirror", "mask", "key", "door", "blade", "wound", "scar", "signal", "spark"
  ],

  // 🌀 Adverbs: style, intensity, emotional shading
  adverbs: [
    "softly", "sharply", "quietly", "boldly", "nervously", "gently", "suddenly", "slowly", "reluctantly", "fiercely",
    "calmly", "desperately", "awkwardly", "warmly", "coldly", "angrily", "sadly", "hopefully", "anxiously", "intensely"
  ],

  // 💥 Interjections: expressive bursts, emotional punctuation
  interjections: [
    "ugh", "wow", "oh", "no", "yes", "damn", "ah", "whoa", "huh", "ouch",
    "eek", "yay", "oops", "phew", "gosh", "jeez", "whoops", "alas", "bravo", "hmm"
  ],

  // 🌆 Scene Descriptors: immersive environmental triggers
  scene: {
    nature:   ["forest", "river", "mountain", "valley", "storm", "sunrise", "twilight", "fog", "rain", "snow"],
    urban:    ["alley", "market", "tower", "street", "crowd", "neon", "train", "rooftop", "bar", "checkpoint"],
    magical:  ["portal", "rune", "spell", "crystal", "aura", "glyph", "sigil", "circle", "chant", "artifact"],
    emotional:["silence", "echo", "pulse", "shadow", "light", "heat", "cold", "breath", "heartbeat", "whisper"]
  },

  // 🗣️ Dialogue Verbs: expressive speech actions
  dialogue: [
    "whisper", "shout", "murmur", "growl", "snap", "plead", "declare", "confess", "lie", "tease",
    "mock", "laugh", "sob", "gasp", "sigh", "stammer", "yell", "chant", "curse", "promise"
  ],

  // 🧍 Body Language: physical cues and emotional signals
  body: [
    "tremble", "shiver", "flinch", "smile", "frown", "blink", "nod", "shrug", "clench", "pace",
    "freeze", "stiffen", "relax", "lean", "recoil", "gesture", "stare", "glance", "gaze", "collapse"
  ],

  // ⚔️ Conflict Triggers: tension, aggression, escalation
  conflict: [
    "challenge", "accuse", "threaten", "confront", "deny", "argue", "attack", "defend", "retaliate", "escalate",
    "intervene", "resist", "submit", "dominate", "betray", "expose", "humiliate", "intimidate", "mock", "deflect"
  ],

  // 💞 Relationship Verbs: emotional dynamics and shifts
  relationship: [
    "trust", "doubt", "cling", "withdraw", "embrace", "reject", "support", "distance", "connect", "detach",
    "protect", "betray", "comfort", "ignore", "rely", "resent", "admire", "envy", "commit", "hesitate"
  ],
  // 🌄 Scene Verbs: movement, setting, atmosphere
  sceneVerbs: [
    "drift", "linger", "fade", "loom", "settle", "echo", "glow", "dim", "ripple", "surge",
    "scatter", "gather", "descend", "rise", "twist", "unfold", "collapse", "expand", "shimmer", "pulse",
    "drizzle", "pour", "howl", "glimmer", "flicker", "flash", "darken", "brighten", "sway", "rush", "creep"
  ],

  // 🔮 Emotional Metaphors: poetic triggers for overlays and arcs
  metaphors: [
    "storm inside", "flickering hope", "cracked mask", "burning bridge", "frozen heart", "shattered trust",
    "echoing silence", "threadbare soul", "rising tide", "fractured light", "buried truth", "haunted memory",
    "fading spark", "unspoken weight", "hollow echo"
  ],

  // 👁️ Sensory Words: immersive input parsing
  sensory: {
    sight:  ["glow", "shadow", "blur", "sparkle", "flicker", "gloom", "radiance", "glimmer", "flash", "dim"],
    sound:  ["whisper", "echo", "scream", "hum", "chant", "growl", "snap", "sob", "gasp", "thunder"],
    touch:  ["warmth", "chill", "sting", "pressure", "tremble", "pulse", "scratch", "caress", "grip", "brush"],
    smell:  ["smoke", "scent", "rot", "perfume", "blood", "dust", "rain", "earth", "sweat", "flowers"],
    taste:  ["bitter", "sweet", "metallic", "dry", "sharp", "sour", "salt", "burn", "fresh", "foul"]
  },

  // 🧠 Internal Monologue Triggers: narrative introspection
  monologue: [
    "I shouldn't", "what if", "it's too late", "I can't", "why now", "this isn't real", "I remember", "I wish",
    "I hate this", "I need to", "they don't know", "I feel it", "I was wrong", "I want to", "I can't lose",
    "I have to try", "I never said", "I always knew"
  ],

  // 🔥 Emotion Intensifiers: amplify mood and tone
  intensifiers: [
    "deeply", "utterly", "completely", "barely", "overwhelmingly", "intensely", "profoundly", "slightly",
    "wildly", "painfully", "gently", "harshly", "quietly", "loudly", "visibly", "inwardly", "fully", "entirely", "subtly"
  ],

  // 💞 Relationship Modifiers: nuance emotional dynamics
  relationshipModifiers: [
    "unspoken", "fragile", "tense", "loyal", "strained", "devoted", "guarded", "volatile", "faithful", "distant",
    "obsessive", "casual", "intimate", "secret", "public", "forbidden", "trusted", "broken", "repaired", "growing"
  ],

  // 🌆 Scene Adjectives: environmental flavor and tone
  sceneAdjectives: [
    "foggy", "dim", "bright", "silent", "crowded", "empty", "chaotic", "peaceful", "ruined", "enchanted",
    "ancient", "modern", "twisted", "lush", "barren", "stormy", "sunlit", "cold", "warm", "gloomy"
  ],

  // 🧵 Narrative Verbs: story-driving actions and transitions
  narrativeVerbs: [
    "reveal", "hide", "change", "decide", "remember", "forget", "discover", "lose", "gain", "transform",
    "question", "accept", "deny", "escape", "return", "choose", "follow", "lead", "break", "build"
  ],

  // 🧙 Character Archetypes: narrative roles and emotional anchors
  archetypes: [
    "hero", "villain", "mentor", "trickster", "lover", "outcast", "orphan", "ruler", "sage", "rebel",
    "healer", "seeker", "guardian", "destroyer", "innocent", "warrior", "visionary", "caretaker", "shadow", "wanderer"
  ],

  // ⚖️ Emotional Contrasts: dualities for mood shifts and overlays
  contrasts: [
    ["hope", "despair"], ["love", "hate"], ["trust", "betrayal"], ["calm", "chaos"], ["joy", "grief"],
    ["clarity", "confusion"], ["strength", "weakness"], ["freedom", "control"], ["connection", "isolation"], ["truth", "deception"]
  ],

  // 🔄 Scene Transitions: narrative pacing and flow
  transitions: [
    "meanwhile", "suddenly", "afterward", "before long", "in the distance", "without warning", "as night fell",
    "at dawn", "in that moment", "as silence returned", "as the storm passed", "beneath the surface",
    "as shadows deepened", "as light broke", "in the stillness"
  ],

  // 🎙️ Dialogue Modifiers: tone and delivery cues
  modifiers: [
    "softly", "flatly", "with venom", "with warmth", "with hesitation", "with urgency", "with a smirk", "with a sigh",
    "with fire", "with sorrow", "with resolve", "with fear", "with longing", "with contempt", "with awe",
    "with disbelief", "with care", "with cruelty"
  ],

  // 🔥 Emotional Textures: metaphorical mood descriptors
  textures: [
    "burning", "aching", "glowing", "frozen", "cracked", "shattered", "flickering", "smothered", "raw", "numb",
    "vibrating", "echoing", "drenched", "sinking", "rising", "tangled", "frayed", "hollow", "sharp", "soft"
  ],

  // 🧵 Narrative Flags: turning points and story beats
  flags: [
    "turning point", "final straw", "moment of truth", "no going back", "crossroads", "breaking point",
    "awakening", "collapse", "rebirth", "betrayal", "confession", "decision", "sacrifice", "revelation", "arrival"
  ],

  // 🧠 Internal Shifts: emotional and cognitive transitions
  shifts: [
    "I see it now", "I can't go back", "I feel different", "this changes everything", "I was blind", "I understand",
    "I give up", "I won't forget", "I forgive you", "I need to know", "I’m not the same", "I choose this",
    "I let go", "I hold on", "I remember who I am"
  ],

  // 🔥 Emotional Verbs: actions that express or imply emotional states
  emotionalVerbs: [
    "tremble", "snap", "shiver", "sob", "sigh", "grin", "glare", "smirk", "frown", "gasp", "laugh", "cry",
    "scream", "whimper", "growl", "blush", "freeze", "clench", "collapse", "recoil", "pace", "stammer",
    "hesitate", "retreat", "lean", "cling", "withdraw", "reach", "flinch", "snarl"
  ],

  // 🎭 Dialogue Archetypes: expressive delivery styles and narrative tones
 dialogueArchetypes: {
  confessional: [
    "I never told anyone this", "I need to say it", "You deserve the truth", "I can't hide it anymore"
  ],
  accusatory: [
    "You always do this", "This is your fault", "You lied", "You knew and said nothing"
  ],
  evasive: [
    "That’s not important", "Let’s not talk about it", "I don’t remember", "Why does it matter"
  ],
  affectionate: [
    "I missed you", "You mean everything", "I care about you", "You're not alone"
  ],
  hostile: [
    "Back off", "Don’t touch me", "You’re dead to me", "I don’t owe you anything"
  ],
  resigned: [
    "It doesn’t matter anymore", "I give up", "Do what you want", "I’m tired of fighting"
  ],
  hopeful: [
    "We can fix this", "There’s still time", "I believe in us", "Don’t give up"
  ],
  cryptic: [
    "Not everything is what it seems", "You’ll understand soon", "It’s already begun", "The signs were always there"
  ],
magic: [
  "spell", "rune", "sigil", "aura", "mana", "chant", "incantation", "hex", "enchant", "invoke",
  "ward", "glyph", "circle", "ritual", "portal", "summon", "bind", "curse", "blessing", "elemental"
],
fantasy: [
  "dragon", "elf", "dwarf", "orc", "fae", "goblin", "troll", "griffin", "phoenix", "unicorn",
  "castle", "kingdom", "forest", "realm", "blade", "quest", "prophecy", "artifact", "sorcerer", "bard"
],
mythical: [
  "hydra", "minotaur", "centaur", "nymph", "djinn", "golem", "leviathan", "kraken", "cyclops", "chimera",
  "zeus", "odin", "isis", "hades", "gaia", "anubis", "thor", "hera", "apollo", "loki"
],
  bodyParts: ["head", "arm", "leg", "chest", "back"],
  injuryLevels: ["minor", "moderate", "severe", "critical"],
  weatherTypes: ["clear", "rain", "storm", "fog", "snow", "windy", "cloudy"],
  moonPhases: ["new", "waxing crescent", "first quarter", "waxing gibbous", "full", "waning gibbous", "last quarter", "waning crescent"],
  seasons: ["spring", "summer", "fall", "winter"],
  temperatureWords: ["hot", "warm", "cool", "cold"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  time: ["morning", "noon", "afternoon", "evening", "night"]
}};
 
  // 😭 Pretty Shit
const PrettyBitches = {
  emotion: {
    joy: ["😊", "😁", "😄", "🥳", "🎉", "✨", "🌈", "😆", "😃", "😺", "🤩", "😸"],
    anger: ["😡", "🤬", "🔥", "💢", "⚡", "😠", "👿", "🗯️", "😾"],
    sadness: ["😢", "😭", "💧", "😞", "🌧️", "😔", "😿", "🫥", "🫣"],
    fear: ["😱", "😨", "👻", "🫣", "🌫️", "😰", "😖", "🕷️", "🧟"],
    calm: ["😌", "🧘", "🌿", "🍃", "🕊️", "🌊", "😴", "🫶", "🪷"]
  },

  narrativePrompts: {
    moon: [
      "🌕 The moon reveals all...", "🔮 Magic peaks under full light...",
      "🌑 Secrets stir in darkness...", "🌘 The myth hides its face..."
    ],
    season: {
      Spring: ["🌸 New growth awakens...", "🐣 The arc begins again..."],
      Autumn: ["🍂 The myth turns inward...", "🦉 Wisdom falls with the leaves..."],
      Winter: ["❄️ Cold grips the tale...", "🕯️ Only embers remain..."]
    },
    relationship: {
      Stranger: ["👁️ A new presence enters...", "🌀 Unknown paths converge..."],
      Friend: ["🤝 Bonds deepen...", "💬 Shared echoes resound..."],
      Lover: ["💞 Hearts align...", "🔥 Desire shapes the myth..."],
      Enemy: ["🗡️ Conflict sharpens...", "⚔️ The arc fractures..."]
    }
  },

  tone: {
    sarcastic: ["😏", "🙄", "😒", "🫠", "😼", "😹"],
    pleading: ["🥺", "😢", "🙏", "💔", "🫶", "😖"],
    cold: ["🧊", "🥶", "😐", "⚫", "🫥", "🪨"],
    warm: ["😊", "❤️", "🌞", "🫶", "🔥", "💖"]
  },

  arc: {
    awakening: ["🌅", "✨", "💡", "🔓", "🌄", "🪄"],
    betrayal: ["🗡️", "💔", "😠", "🕷️", "🧨", "🫢"],
    collapse: ["💀", "⚰️", "🧨", "🕳️", "🫥", "🪦"],
    rebirth: ["🌿", "🔥", "🧬", "🕊️", "🌱", "🌈"]
  },

  relationship: {
    stranger: ["👁️", "🌀", "🫥", "🕵️", "👤"],
    friend: ["🤝", "😊", "🫂", "💬", "👯"],
    lover: ["💞", "😍", "💋", "❤️", "🥰", "💓"],
    enemy: ["🗡️", "😡", "⚔️", "👿", "💢"]
  },

  inventory: {
    gain: ["📦", "💎", "🧿", "🧳", "🎁", "📜"],
    loss: ["🕳️", "🗑️", "☠️", "💀", "🪦"]
  },

  environment: {
    weather: {
      clear: "☀️",
      rain: "🌧️",
      storm: "⛈️",
      fog: "🌫️",
      snow: "❄️",
      windy: "🌬️",
      cloudy: "☁️"
    },
    moon: {
      new: "🌑",
      "waxing crescent": "🌒",
      "first quarter": "🌓",
      "waxing gibbous": "🌔",
      full: "🌕",
      "waning gibbous": "🌖",
      "last quarter": "🌗",
      "waning crescent": "🌘"
    },
    season: {
      spring: "🌸",
      summer: "☀️",
      fall: "🍂",
      winter: "❄️"
    },
    temperature: {
      hot: "🔥",
      warm: "🌤️",
      cool: "🌬️",
      cold: "🥶"
    },
    time: {
      morning: "🌅",
      noon: "🌞",
      afternoon: "🌤️",
      evening: "🌇",
      night: "🌌"
    }
  },

  health: {
    minor: "🟩🟩🟩🟩🟩",
    moderate: "🟩🟩🟩⬜⬜",
    severe: "🟥⬜⬜⬜⬜",
    critical: "⚫⚫⚫⚫⚫"
  },

  keywords: {
    noun: {
      truth: "🧿", memory: "🧠", shadow: "🌑", light: "✨", rage: "🔥", grief: "💧", hope: "🌈",
      storm: "⛈️", echo: "🌫️", flame: "🔥", mask: "🎭", blade: "🗡️", wound: "💔", spark: "⚡",
      silence: "🤫", dream: "💭", mirror: "🪞", key: "🗝️", door: "🚪"
    },
    verb: {
      collapse: "💀", ignite: "🔥", vanish: "🌫️", reclaim: "🧬", whisper: "🫢", scream: "😱",
      tremble: "🫨", heal: "🌿", betray: "🗡️", protect: "🛡️", destroy: "💥", create: "✨",
      cry: "😭", run: "🏃", hide: "🙈", reveal: "🔦", rise: "🌄"
    },
    adjective: {
      fragile: "🫥", radiant: "🌟", hollow: "⚫", enchanted: "🔮", warm: "🌞", cold: "❄️",
      broken: "💔", glowing: "✨", twisted: "🌀", ancient: "🏺", vibrant: "🌈", numb: "🥶"
    },
    adverb: {
      softly: "🌫️", fiercely: "🔥", nervously: "😰", boldly: "⚡", gently: "🕊️", suddenly: "💥",
      slowly: "🐢", quickly: "⚡", silently: "🤫", loudly: "📢"
    },
    interjection: {
      wow: "😲", oh: "😮", no: "🙅", yes: "🙆", damn: "😤", ah: "😌", ouch: "😖", yay: "🥳",
      eek: "😱", phew: "😮‍💨", alas: "😔", hmm: "🤔"
    },
    archetype: {
      hero: "🦸", villain: "🦹", mentor: "🧙", trickster: "🃏", lover: "💞", outcast: "🫥",
      ruler: "👑", sage: "📜", rebel: "🔥", healer: "🌿", guardian: "🛡️", destroyer: "💀",
      seeker: "🧭", orphan: "🧒", warrior: "⚔️", visionary: "🔮"
    },
    contrast: {
      hope: "🌈", despair: "💧", love: "💞", hate: "💢", trust: "🤝", betrayal: "🗡️",
      calm: "🧘", chaos: "🌀", joy: "🎉", grief: "😭", clarity: "💡", confusion: "❓"
    },
    texture: {
      burning: "🔥", aching: "💔", glowing: "✨", frozen: "❄️", cracked: "🪨", shattered: "💥",
      flickering: "⚡", smothered: "🌫️", raw: "🩸", numb: "🥶", tangled: "🪢", frayed: "🧵"
    },
       magic: {
      spell: "🪄", rune: "🔣", sigil: "🔮", aura: "✨", mana: "💫", chant: "📜", incantation: "🧙",
      hex: "☠️", enchant: "🧚", invoke: "🌀", ward: "🛡️", glyph: "🔰", circle: "⭕",
      ritual: "🕯️", portal: "🌌", summon: "🧞", bind: "🔗", curse: "💀", blessing: "🕊️",
      elemental: "🌪️"
    },
    fantasy: {
      dragon: "🐉", elf: "🧝", dwarf: "🧔", orc: "👹", fae: "🧚", goblin: "👺", troll: "🧌",
      griffin: "🦅", phoenix: "🔥", unicorn: "🦄", castle: "🏰", kingdom: "👑", forest: "🌲",
      realm: "🌌", blade: "🗡️", quest: "🧭", prophecy: "📜", artifact: "🧿", sorcerer: "🧙", bard: "🎶"
    },
    mythical: {
      hydra: "🐉", minotaur: "🐂", centaur: "🏹", nymph: "🧝", djinn: "🧞", golem: "🪨",
      leviathan: "🌊", kraken: "🦑", cyclops: "👁️", chimera: "🐲", zeus: "⚡", odin: "🪓",
      isis: "🌺", hades: "💀", gaia: "🌍", anubis: "🐺", thor: "🔨", hera: "👑", apollo: "🌞", loki: "🃏"
    },
    body: {
      head: "🧠", arm: "💪", leg: "🦵", chest: "🫀", back: "🔙", eyes: "👀", hands: "👐", heart: "❤️"
    },
    injury: {
      minor: "🟩", moderate: "🟨", severe: "🟥", critical: "⚫", bleeding: "🩸", bruised: "🟪"
    },
    transition: {
      suddenly: "💥", meanwhile: "⏳", afterward: "🔁", atDawn: "🌅", inStillness: "🌫️", stormPassed: "🌈",
      beforeLong: "🕰️", asNightFell: "🌌", beneathSurface: "🌊"
    },
    flag: {
      turningPoint: "🔀", finalStraw: "🧨", momentOfTruth: "🧿", noGoingBack: "🚫", crossroads: "➗",
      breakingPoint: "💥", awakening: "🌅", collapse: "💀", rebirth: "🌿", betrayal: "🗡️",
      confession: "🫢", decision: "⚖️", sacrifice: "🕯️", revelation: "💡", arrival: "🚪"
    },
    shift: {
      realization: "💡", regret: "💧", forgiveness: "🕊️", resolve: "⚔️", identity: "🧿",
      transformation: "🧬", surrender: "🤲", clarity: "🔍", acceptance: "🤝"
    }
  }
};









const PocketVisualRegistry = {
  survival: () => {
    if (state._life_hunger != null && state._life_thirst != null && state._life_fatigue != null) {
      return `🍽️ Hunger ${state._life_hunger} | Thirst ${state._life_thirst} | Fatigue ${state._life_fatigue}`;
    }
    return null;
  },

  emotion: () => {
    const emotionBlock = ["joy", "anger"].map(f => {
      const val = state[`_thefeels_${f}`] ?? 0;
      const emoji = PrettyBitches.thefeels?.[f]?.[0] || "😶";
      return `${emoji} ${f.charAt(0).toUpperCase() + f.slice(1)} ${val}`;
    }).join(" | ");
    return `😭 Emotions → ${emotionBlock}`;
  },

  relationship: () => {
    const relType = state._homiestolovers_type ?? "Unknown";
    const relVal = state._homiestolovers_value ?? "—";
    return `💞 Relationship → ${relType} (${relVal})`;
  },

  topdown: () => {
    const hour   = state._papaclock_hour ?? "—";
    const minute = state._papaclock_minute ?? "—";
    const day    = state._papaclock_day ?? "—";
    const month  = state._papaclock_month ?? "—";
    const year   = state._papaclock_year ?? "—";
    const type   = state._topdown_type ?? "—";
    const temp   = state._topdown_temp ?? "—";
    const moon   = state._topdown_moon ?? "—";
    const season = state._topdown_season ?? "—";
    const emojiType   = PrettyBitches.environment?.type?.[type]     || "🌫️";
    const emojiTemp   = PrettyBitches.temperature?.[temp]           || "🌡️";
    const emojiMoon   = PrettyBitches.environment?.moon?.[moon]     || "🌙";
    const emojiSeason = PrettyBitches.environment?.season?.[season] || "🍂";
    return `🕰️ ${hour}:${minute} | 📅 Day ${day}, ${month} ${year} | ${emojiType} ${type} | ${emojiTemp} ${temp}°F | ${emojiMoon} ${moon} | ${emojiSeason} ${season}`;
  },

  gear: () => {
    const health = state._life_health ?? 0;
    let healthBar = PrettyBitches.healthBar?.empty;
    if (health >= 100) healthBar = PrettyBitches.healthBar?.full;
    else if (health >= 80) healthBar = PrettyBitches.healthBar?.high;
    else if (health >= 60) healthBar = PrettyBitches.healthBar?.mid;
    else if (health >= 40) healthBar = PrettyBitches.healthBar?.low;
    else if (health > 0)   healthBar = PrettyBitches.healthBar?.critical;

    const items = state._backpack_items ?? {};
    const inv = Object.entries(items).map(([slot, item]) => `${slot}: ${item || "—"}`).join(" | ");
    const injuries = Object.keys(state._booboo_status ?? {}).length ? "Active" : "None";
    return `🎒 Inventory → ${inv} | ❤️ Health ${health} ${healthBar} | 🩹 Injuries → ${injuries}`;
  }
};





// Shit breaks down with math
const Clamp = {
  life_hunger: {
    max: 100,
    collapse: 10,
    warning: 50,
    decayPerTurn: 2
  },
  life_thirst: {
    max: 100,
    collapse: 10,
    warning: 50,
    decayPerTurn: 3
  },
  life_fatigue: {
    max: 100,
    collapse: 1,
    warning: 25,
    decayPerTurn: 2
  },
  injury: {
    max: 100,
    collapse: 20,
    warning: 40,
    regenRate: 5
  },
  theFeels: {
    max: "key",
    warning: "key"
  },
  relationship: {
    min: 0,
    max: 100,
    warningLow: 50,
    warningHigh: 75
  },
  life_update: {
    levels: [
      "✅ none",
      "🩹 minor",
      "🤕 moderate",
      "🧠 severe",
      "💀 critical"
    ],
    collapseThreshold: "💀 critical"
  },
  topDown_temperature: {
    min: -30,
    max: 50,
    warningLow: 0,
    warningHigh: 35,
    comfortLow: 10,
    comfortHigh: 25,
    decayRate: 1,
    recoveryRate: 2,
    collapseCold: -20,
    collapseHeat: 45
  },
  papaclock: {
    hour:   { min: 0, max: 23, rollover: true },
    minute: { min: 0, max: 59, rollover: true },
    day:    { min: 1, max: 365, rollover: true },
    month:  { min: 1, max: 12, rollover: true },
    year:   { min: 0, max: 9999999, rollover: true },
    leapYearLogic: true,
    Papaclock_AdvanceMinutesPerTurn: 10
  },
  topdown_moon: {
    phase: [
      "🌑 new",
      "🌒 waxing crescent",
      "🌓 first quarter",
      "🌔 waxing gibbous",
      "🌕 full",
      "🌖 waning gibbous",
      "🌗 last quarter",
      "🌘 waning crescent"
    ],
    index: { min: 0, max: 7, rollover: true },
    cycleDays: 29,
    advancePerDay: 1 / 3.625 // ~0.276 per day
  },
  topdown_season: {
    logic: {
      12: "Winter", 1: "Winter", 2: "Winter",
      3: "Spring", 4: "Spring", 5: "Spring",
      6: "Summer", 7: "Summer", 8: "Summer",
      9: "Autumn", 10: "Autumn", 11: "Autumn"
    },
    emoji: {
      Winter: "❄️",
      Spring: "🌸",
      Summer: "☀️",
      Autumn: "🍂"
    }
  },
  topdown_weather: {
    types: ["clear", "cloudy", "rain", "storm", "snow"],
    seasonalBias: {
      Winter: ["snow", "cloudy"],
      Spring: ["rain", "clear"],
      Summer: ["clear", "storm"],
      Autumn: ["cloudy", "rain"]
    },
    moonBias: {
      "🌕 full": ["storm", "clear"],
      "🌑 new": ["cloudy", "rain"]
    },
    changeChance: 0.3 // 30% chance to shift per day
  }
};


// More Math

const GetWrecked = {
  Life_hunger: 100,
  Life_thirst: 100,
  Life_fatigue: 100,
  BooBoo: 100,

  Life_hungerClamp: Clamp.life_hunger,
  Life_thirstClamp: Clamp.life_thirst,
  Life_fatigueClamp: Clamp.life_fatigue,
  BooBooClamp: Clamp.injury,

  Life_hungerEmoji: "🍽️",
  Life_thirstEmoji: "💧",
  Life_fatigueEmoji: "😴",
  BooBooEmoji: "❤️",

  Life_hungerCollapseEffect: "You collapse from starvation.",
  Life_thirstCollapseEffect: "You collapse from dehydration.",
  Life_fatigueCollapseEffect: "You pass out from exhaustion.",
  Life_hungerWarningEffect: "You feel weak and dizzy.",
  Life_thirstWarningEffect: "Your lips crack and your head spins.",
  Life_fatigueWarningEffect: "Your limbs feel heavy and slow.",

  _booboo_status: {
    head: "✅ none",
    arm: "✅ none",
    leg: "✅ none",
    chest: "✅ none",
    back: "✅ none"
  },

  injuryEmoji: "🩹",
  injuryCollapseEffect: "Your wounds overwhelm you.",
  injuryWarningEffect: "Pain surges through your body.",

  _backpack_items: {},

  inventoryClamp: {
    maxItems: 100,
    maxPerType: 20,
    maxWeight: 100,
    clampOverflow: true
  },

  _homiestolovers_type: "💞 Unknown",
  _homiestolovers_value: 50,
  relationship: {
    friend: 50,
    lover: 100,
    rival: 0
  },
  relationshipClamp: Clamp.relationship,
  relationshipEmoji: "💞",
  relationshipWarningEffect: "Your bond feels strained.",

  death_type: "none",
  death_temp: "—",
  death_moon: "—",
  death_season: "—",
  _resurrection_status: "Your soul was reborn but you suffered greatly...",

  _papaclock_day: 1,
  _papaclock_hour: 8,
  _papaclock_minute: 0,
  _papaclock_month: "October",
  _papaclock_year: 2025,
  _papaclock_phase: "🌅 morning",
  PapaclockClamp: Clamp.papaclock,
  Papaclock_AdvanceMinutesPerTurn: 10,

  _topdown_type: "☀️ clear",
  _topdown_temp: 72,
  _topdown_moon: "🌑 new",
  _topdown_season: "🌸 spring",
  TopDownClamp: Clamp.topDown_temperature,
  TopDown_weatherEmoji: "🌦️",
  TopDown_moonEmoji: "🌙",
  TopDown_seasonEmoji: "🍂",

  litbitch_prompt: "Things happened what are they? Did it affect the player? ...",
  litbitch_counter: 0,
  litbitch_turns: 2,

  _environment_history: []
};

// 🔧 MasterPocketConfig
const PocketTemplateConfig = {
  MAX_POCKETS: 100,
  MAX_MEMORY_CHARS: 10000,
  MAX_TITLE_LEN: 100,
  MAX_CONTENT_LEN: 1000,
  MAX_TAGS: 5,
  DEFAULT_COLOR: "grey",
  COOLDOWN_MS: 3000,
  REDO_COOLDOWN_MS: 1000,
  REDO_LIMIT: 3
};

const PocketTemplates = {
  OutsidePocket: {
    title: "TopDown",
    keys: "Weather & Environment",
    type: "Pocket",
    emoji: "🌦️",
    color: "#88c0d0",
    content: `🌦️ Time + Weather + Moon + Season\nAuto-updates with player actions\nMoon cycles every 29 days\nSeasonal logic optional`,
    entry: () => `> Year: ${GetWrecked._papaclock_year}
> Month: ${GetWrecked._papaclock_month}
> Day: ${GetWrecked._papaclock_day}
> Time: ${String(GetWrecked._papaclock_hour).padStart(2, "0")}:${String(GetWrecked._papaclock_minute).padStart(2, "0")}
> Phase: ${GetWrecked._papaclock_phase}
> Weather: ${GetWrecked._topdown_type}
> Temp: ${GetWrecked._topdown_temp}°F
> Moon: ${GetWrecked._topdown_moon}
> Season: ${GetWrecked._topdown_season}
> Visual: 🕰️ ${GetWrecked._papaclock_hour}:${GetWrecked._papaclock_minute} | 🌦️ ${GetWrecked._topdown_type} | 🌡️ ${GetWrecked._topdown_temp}°F | 🌙 ${GetWrecked._topdown_moon} | 🍂 ${GetWrecked._topdown_season}`,
    description: `🌦️ PapaClock & TopDown Tracker
> Auto-updates with time/day
> Moon phase cycles every 29 days
> Seasonal logic optional
> Responds to prompt cues:
- "rain", "snow", "storm", "sunny", "cloudy"
- "full moon", "new moon"
- "spring", "summer", "fall", "winter"
> Visual overlay includes weather, temperature, moon phase, and season`,
    tags: ["time", "weather", "moon", "season"],
    keys: [
      "_papaclock_day", "_papaclock_hour", "_papaclock_minute", "_papaclock_month", "_papaclock_year", "_papaclock_phase",
      "_topdown_type", "_topdown_temp", "_topdown_moon", "_topdown_season"
    ]
  },

  InsidePocket: {
    title: "Life",
    keys: "Survival & Emotion",
    type: "Pocket",
    emoji: "🍽️",
    color: "#d08770",
    content: `🍽️ Tracks hunger, thirst, fatigue, injuries, and emotional state\nCollapse triggers when thresholds are breached`,
    entry: () => `> Hunger: ${GetWrecked.Life_hunger}
> Thirst: ${GetWrecked.Life_thirst}
> Fatigue: ${GetWrecked.Life_fatigue}
> Injuries: ${JSON.stringify(GetWrecked._booboo_status)}
> Phase: ${GetWrecked._papaclock_phase}
> Visual: 🍽️ ${GetWrecked.Life_hunger} | 💧 ${GetWrecked.Life_thirst} | 😴 ${GetWrecked.Life_fatigue} | 🩹 ${Object.keys(GetWrecked._booboo_status || {}).length}`,
    description: `🍽️ Life Tracker
> Monitors hunger, thirst, fatigue, and injuries
> Collapse triggers at thresholds
> Responds to prompt cues:
- "hungry", "thirsty", "tired", "injured"
- "collapse", "fatigue", "pain"
> Visual overlay includes survival stats and injury count`,
    tags: ["survival", "emotion", "injury"],
    keys: ["_life_hunger", "_life_thirst", "_life_fatigue", "_booboo_status", "_papaclock_phase"]
  },

  JastAPocket: {
    title: "Backpack",
    keys: "Inventory",
    type: "Pocket",
    emoji: "🎒",
    color: "#a3be8c",
    content: `🎒 Inventory tracker\nItems are added/removed via prompt cues or commands`,
    entry: () => {
      const inventory = Object.entries(GetWrecked._backpack_items || {})
        .map(([slot, data]) => `${data.emoji} ${slot.toUpperCase()}: ${data.count} → ${data.items.join(", ") || "—"}`)
        .join("\n");
      return `> Inventory:\n${inventory}
> Visual: 🎒 Slots ${Object.keys(GetWrecked._backpack_items || {}).length}`;
    },
    description: `🎒 Backpack Tracker
> Tracks inventory slots and item counts
> Responds to prompt cues:
- "add", "remove", "equip", "drop"
- "inventory", "bag", "backpack"
> Visual overlay shows slot count and item types`,
    tags: ["inventory", "items"],
    keys: ["_backpack_items"]
  },

  FeelsPocket: {
    title: "Homiestolovers",
    keys: "Relationship",
    type: "Pocket",
    emoji: "💞",
    color: "#b48ead",
    content: `💞 Relationship tracker\nEvolves with story arc and emotional cues`,
    entry: () => `> Relationship: ${GetWrecked._homiestolovers_type} (${GetWrecked._homiestolovers_value})
> Visual: 💞 ${GetWrecked._homiestolovers_type} | ❤️ ${GetWrecked._homiestolovers_value}`,
    description: `💞 Relationship Tracker
> Tracks emotional bond and arc progression
> Responds to prompt cues:
- "friend", "lover", "stranger", "enemy"
- "trust", "affection", "betrayal"
> Visual overlay shows relationship type and value`,
    tags: ["relationship", "bond"],
    keys: ["_homiestolovers_type", "_homiestolovers_value"]
  },

  MasterPocket: {
    title: "MasterPocket",
    keys: "Overlay Settings",
    type: "Pocket",
    emoji: "🔧",
    color: "#5e81ac",
    content: `🔧 Master control\nToggle overlay features and visibility\nCollapse, recovery, arc triggers`,
    entry: () => `> Overlay Enabled: ${GetWrecked.overlay_enabled ?? true}
> Style: ${GetWrecked.overlay_style || "both"}
> Collapse Allowed: ${GetWrecked.overlay_allowArcOverwrite ?? true}
> Recovery Allowed: ${GetWrecked.overlay_allowStaticOverwrite ?? true}
> Reset Limits: ${GetWrecked.overlay_resetLimits ?? false}
> Show Weather: ${GetWrecked.showWeather ?? true}
> Show Time: ${GetWrecked.showTime ?? true}
> Show Survival: ${GetWrecked.showSurvival ?? true}
> Show Inventory: ${GetWrecked.showInventory ?? true}
> Show Injuries: ${GetWrecked.showInjuries ?? true}
> Show Emotion: ${GetWrecked.showEmotion ?? true}
> Visual: 🔧 Style[${GetWrecked.overlay_style}] | Collapse[${GetWrecked.overlay_allowArcOverwrite}] | Recovery[${GetWrecked.overlay_allowStaticOverwrite}]`,
    description: `🔧 Overlay Settings
> Controls visibility and behavior of all overlay pockets
> Responds to prompt cues:
- "toggle overlay", "show/hide weather"
- "collapse", "recover", "reset"
> Visual overlay shows current style and toggle states`,
    tags: ["overlay", "control", "collapse", "recovery"],
    keys: [
      "_overlay_enabled", "_overlay_style", "_overlay_resetLimits",
      "_overlay_allowCollapse", "_overlay_allowRecovery", "_overlay_allowArc",
      "_showWeather", "_showTime", "_showSurvival", "_showInventory", "_showInjuries", "_showEmotion"
    ]
  },

  LitBitchPocket: {
    title: "LitBitch",
    keys: "Debug Log",
    type: "System",
    emoji: "🪛",
    color: "#ebcb8b",
    content: `🪛 LitBitch\nRecords engine activity, system messages, and overlay feedback`,
    entry: () => `> LoggingEnabled: true
> ShowDebugMessage: true
> Visual: 🪛 Logging[true] | Debug[true]`,
    description: `🪛 Debug Log
> Records system messages and overlay feedback
> Responds to prompt cues:
- "/log", "/clear log", "/toggle debug"
> Automatically trims to last 20 entries`,
    tags: ["system", "debug", "log"],
    keys: ["LitBitch"]
  }
};




// 🔨 Forge a pocket from a template
function forgePocketFromTemplate(templateKey, overrides = {}) {
  const base = PocketTemplates[templateKey];
  if (!base) {
    console.warn(`⚠️ Missing PocketTemplate: ${templateKey}`);
    return;
  }

  const forged = {
    ...base,
    ...overrides,
    id: templateKey,
    createdAt: Date.now(),
    title: base.title,
    keys: base.keys,
    type: base.type,
    description: base.description,
    emoji: base.emoji || PocketTemplateConfig.DEFAULT_COLOR,
    color: base.color || PocketTemplateConfig.DEFAULT_COLOR,
    entry: typeof base.entry === "function" ? base.entry() : base.entry
  };

  AutoPocketEngine.memoryBank.push(forged);
  updateStoryCardFromPocket(forged); // 🔥 Sync to storyCards
  console.log(`✅ Pocket forged: ${forged.title}`);
}

// 🧬 Auto-forge pockets based on queue or trigger
function AutoPocket(source = "input", text = "") {
  console.log(`🧬 AutoPocket() called from ${source} with text: ${text}`);

  const queue = AutoPocketEngine.pocketQueue;
  if (!Array.isArray(queue)) AutoPocketEngine.pocketQueue = [];

  if (text) queue.push(text);
  if (queue.length === 0) {
    console.log("📭 No items in pocketQueue");
    return;
  }

  while (queue.length) {
    const entry = queue.shift();
    console.log(`📥 Processing: ${entry}`);

    const forgedKeys = AutoPocketEngine.memoryBank.map(p => p.id);
    for (const key of Object.keys(PocketTemplates)) {
      if (!forgedKeys.includes(key)) {
        forgePocketFromTemplate(key);
      } else {
        console.log(`🛑 Pocket already exists: ${key}`);
      }
    }
  }

  console.log("✅ AutoPocket() complete");
  return "🧾 All pockets forged and ready";
}


// Remember shit
function updateStoryCardFromPocket(pocket) {
  if (!Array.isArray(storyCards)) return;

  const existing = storyCards.find(c => c.id === pocket.id);
  const entry = typeof pocket.entry === "function" ? pocket.entry() : pocket.entry;

  if (existing) {
    existing.entry = entry;
    existing.keys = pocket.keys?.join(", ") || "";
    existing.type = pocket.type || "Card";
    existing.title = pocket.title || "Untitled";
    existing.description = pocket.description || "";
  } else {
    storyCards.push({
      id: pocket.id,
      title: pocket.title || "Untitled",
      keys: pocket.keys?.join(", ") || "",
      entry,
      type: pocket.type || "Card",
      description: pocket.description || ""
    });
  }
}


// 🎨 Render memory bank into overlay cards
function createAutoPocket() {
  console.log("🎨 createPocket() called");

  const pockets = AutoPocketEngine.memoryBank;
  if (!pockets.length) {
    console.log("📭 No pockets in memoryBank");
    return ["🌀 No overlays available"];
  }

  return pockets.map(pocket => {
    const title = pocket.title || "🌀 Untitled";
    const content = pocket.content?.replace(/\n/g, " ") || "—";
    const tags = Array.isArray(pocket.tags) && pocket.tags.length ? pocket.tags.join(", ") : "—";
    const emoji = pocket.emoji || PocketTemplateConfig.DEFAULT_COLOR;
    const desc = pocket.description?.split("\n")[0] || "";
    return `${emoji} ${title} — ${content} [${tags}]${desc ? `\n📝 ${desc}` : ""}`;
  });
}


function PocketFormatter() {
  const domains = ["survival", "emotion", "relationship", "topdown", "gear"];
  const overlays = domains.map(key => {
    const render = PocketVisualRegistry[key];
    return typeof render === "function" ? render() : null;
  }).filter(Boolean);

  return overlays.join(" | ");
}




//show narrate
function renderLitBitchOverlay() {
  const log = state._litbitch_log?.slice(-20) || [];
  const parsed = log.some(entry => entry.domain === "narrative");

  if (!parsed) return "🔥 Awaiting mythic moment...";

  // 🌘 Moon phase
  const moon = state._topdown_moon ?? "Unknown";
  const moonPool = PrettyBitches.narrativePrompts?.moon ?? [];
  const moonPrompt = moonPool[Math.floor(Math.random() * moonPool.length)];

  // 🍂 Season
  const season = state._topdown_season ?? "Autumn";
  const seasonPool = PrettyBitches.narrativePrompts?.season?.[season] ?? [];
  const seasonPrompt = seasonPool[Math.floor(Math.random() * seasonPool.length)];

  // 💞 Relationship
  const relType = state._homiestolovers_type ?? "Stranger";
  const relPool = PrettyBitches.narrativePrompts?.relationship?.[relType] ?? [];
  const relPrompt = relPool[Math.floor(Math.random() * relPool.length)];

  // 🔥 Collapse or Recovery
  const collapsed = state._life_health <= Death.Resurrection.health || state._life_fatigue <= Death.Resurrection.fatigue;
  const recovering = Resurrection.status?.() === "pending";
  let arcPrompt = null;
  if (collapsed) {
    const collapsePool = MammaDontSing.overlayPrompts?.collapse ?? [];
    arcPrompt = collapsePool[Math.floor(Math.random() * collapsePool.length)];
  } else if (recovering) {
    const recoveryPool = MammaDontSing.overlayPrompts?.recovery ?? [];
    arcPrompt = recoveryPool[Math.floor(Math.random() * recoveryPool.length)];
  }

  // 🎭 Combine and pick one
  const pool = [moonPrompt, seasonPrompt, relPrompt, arcPrompt].filter(Boolean);
  const pick = pool[Math.floor(Math.random() * pool.length)];

  return `🔔 ${pick}`;
}




//🔥  Omniscient Observer
function LitBitch_detectChanges() {
  console.log("👁️ LitBitch_detectChanges() called");

  // 🌦️ TopDown
  TopDown_update(
    state._topdown_type,
    state._topdown_temp,
    state._topdown_moon,
    state._topdown_season
  );

  // 🕰️ Papaclock
  Papaclock_Advance();

  // 💀 Collapse
  if (
    state._life_health <= Death.Resurrection.health ||
    state._life_fatigue <= Death.Resurrection.fatigue
  ) {
    Death.mirror("Life");
  }

  // 🧬 Resurrection
  if (state._resurrection_status === "pending") {
    Resurrection_recover("Life");
  }

  // 🍽️ Life
  Life_update("hunger", state._life_hunger);
  Life_update("thirst", state._life_thirst);
  Life_update("fatigue", state._life_fatigue);

  // 🤕 Booboo
  for (const [part, severity] of Object.entries(state._booboo_status || {})) {
    Booboo_update(part, severity);
  }

  // 🎒 Backpack
  for (const slot of ["food", "drink", "tool", "misc", "key"]) {
    const item = state._backpack_items?.[slot];
    if (item) Backpack_update(slot, item);
  }

  // 😭 TheFeels
  for (const feel of ["joy", "fear", "anger", "sadness", "calm"]) {
    TheFeels_cycle(feel);
  }

  // 💞 HomiesToLovers
  for (const [name, data] of Object.entries(state._homiestolovers_registry || {})) {
    HomiesToLovers_update(name, data.type, data.value);
  }

  // 🌪️ Environment Snapshot
  ThereSheBlows_log();

  // 🔥 LitBitch Prompt Tracker
  state._litbitch_counter++;
  if (state._litbitch_counter % state._litbitch_turns === 0) {
    LitBitch_trigger(`🔥 LitBitch auto-triggered at turn ${state._litbitch_counter}`, "narrative");
  }
}
//🔥 Omniscient Listener
function LitBitch_parse(text) {
  const lower = text.toLowerCase();
  let changed = false;

  // 🎭 Emotion triggers
  for (const emotion in MammaDontSing.emotion) {
    const triggers = MammaDontSing.emotion[emotion];
    if (triggers.some(word => lower.includes(word))) {
      state[`_thefeels_${emotion}`] = Math.min(100, (state[`_thefeels_${emotion}`] ?? 0) + 5);
      LitBitch_trigger(`🎭 Emotion spike → ${emotion.toUpperCase()} +5`, "emotion");
      changed = true;
    }
  }

  // 💞 Relationship triggers
  for (const verb of MammaDontSing.relationship || []) {
    if (lower.includes(verb)) {
      LitBitch_trigger(`💞 Relationship cue: ${verb}`, "relationship");
      changed = true;
    }
  }

  // 🕒 Time triggers
  for (const word of MammaDontSing.time || []) {
    if (lower.includes(word)) {
      Papaclock.advance();
      LitBitch_trigger(`🕒 Time cue: ${word}`, "time");
      changed = true;
    }
  }

  for (const month of MammaDontSing.months || []) {
    if (lower.includes(month.toLowerCase())) {
      state._papaclock_month = month;
      LitBitch_trigger(`📅 Month cue: ${month}`, "time");
      changed = true;
    }
  }

  // 🌦️ Environment triggers
  for (const w of MammaDontSing.weatherTypes || []) {
    if (lower.includes(w)) {
      state._topdown_type = w;
      LitBitch_trigger(`🌦️ Weather cue: ${w}`, "environment");
      changed = true;
    }
  }

  for (const m of MammaDontSing.moonPhases || []) {
    if (lower.includes(m)) {
      state._topdown_moon = m;
      LitBitch_trigger(`🌙 Moon cue: ${m}`, "environment");
      changed = true;
    }
  }

  for (const s of MammaDontSing.seasons || []) {
    if (lower.includes(s)) {
      state._topdown_season = s;
      LitBitch_trigger(`🍂 Season cue: ${s}`, "environment");
      changed = true;
    }
  }

  for (const t of MammaDontSing.temperatureWords || []) {
    if (lower.includes(t)) {
      state._topdown_temp = PrettyBitches.temperature?.[t] || 72;
      LitBitch_trigger(`🌡️ Temperature cue: ${t}`, "environment");
      changed = true;
    }
  }

  // 👁️ Sensory triggers
  for (const sense in MammaDontSing.sensory) {
    const list = MammaDontSing.sensory[sense];
    if (list.some(w => lower.includes(w))) {
      LitBitch_trigger(`👁️ Sensory cue: ${sense}`, "environment");
      changed = true;
    }
  }

  // 🔮 Expressive categories (flat lists)
  const flatCategories = [
    "verbs", "nouns", "adjectives", "metaphors", "intensifiers", "modifiers",
    "textures", "shifts", "flags", "transitions", "monologue", "sceneVerbs", "archetypes"
  ];
  for (const category of flatCategories) {
    const words = MammaDontSing[category] || [];
    if (words.some(w => lower.includes(w))) {
      LitBitch_trigger(`🌀 ${category} cue detected`, "narrative");
      changed = true;
    }
  }

  // 🧵 Nested expressive categories
  const nestedCategories = [
    "scene", "dialogueArchetypes", "tone", "dialogue", "body", "conflict",
    "magic", "fantasy", "mythical"
  ];
  for (const category of nestedCategories) {
    const sub = MammaDontSing[category];
    if (typeof sub === "object") {
      for (const key in sub) {
        const list = sub[key];
        if (Array.isArray(list) && list.some(w => lower.includes(w))) {
          LitBitch_trigger(`✨ ${category} cue: ${key}`, "narrative");
          changed = true;
        }
      }
    }
  }

  return changed;
}

//🔧 LitBitch Module: Death
function Reaper_drain() {
  console.log("💀 Reaper_drain() called");

  const decayRate = 2;
  const collapseThresholds = {
   BooBoo: GetWrecked.BooBoo?.Ressurection_status ?? 0,
    Life_fatigue: GetWrecked.Life_fatigue?.collapse ?? 0,
   Life_hunger: GetWrecked.Life_hunger?.collapse ?? 0,
    Life_thirst: GetWrecked.Life_thirst?.collapse ?? 0
  };

  // 🍽️ Drain survival stats
  for (const stat of ["hunger", "thirst", "fatigue"]) {
    const key = `_life_${stat}`;
    const current = state[key] ?? 100;
    const next = current - decayRate;

    Life_update(stat, next);
    LitBitch_trigger(`💀 ${stat} drained: ${current} → ${state[key]}`, "life");

    // Collapse check
    if (state[key] <= RessurectionThresholds[stat]) {
      collapse(stat);
      break; // Stop further decay once collapse is triggered
    }
  }
}
//🔥 Resurrection Mythic Rebirth Engine
function Resurrection_recover(source = "Life") {
  console.log("🧬 Resurrection_recover() called");

  // 🔄 Restore survival stats
  state._life_health  = GetWrecked.BooBoo;
  state._life_fatigue = GetWrecked.Life_fatigue;
  state._life_hunger  = GetWrecked.Life_hunger;
  state._life_thirst  = GetWrecked.Life_thirst;

  // 🕰️ Advance time by one hour
  const timeClamp = Clamp.papaclock;
  const months = MammaDontSing.months || GetWrecked.months || [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  state._papaclock_hour = (state._papaclock_hour + 1) % (timeClamp.hour.max + 1);

  if (state._papaclock_hour === 0) {
    state._papaclock_day++;

    if (state._papaclock_day > timeClamp.day.max) {
      state._papaclock_day = timeClamp.day.min;

      const currentMonthIndex = months.indexOf(state._papaclock_month);
      const nextMonthIndex = (currentMonthIndex + 1) % months.length;
      state._papaclock_month = months[nextMonthIndex];

      if (nextMonthIndex === 0) {
        state._papaclock_year++;
      }

      LitBitch_trigger(`📅 Month advanced to ${state._papaclock_month}`, "time");
    }

    LitBitch_trigger(`📅 Day advanced to ${state._papaclock_day}`, "time");
  }

  LitBitch_trigger(`🕰️ Time advanced to ${state._papaclock_hour}:00`, "time");

  // 🧬 Set resurrection status and overlay
  state._resurrection_status = "restored";
  LitBitch_trigger(`🧬 You recovered from ${source} collapse`, "resurrection");
}
// Weather Shit
function ThereSheBlows_log() {
  const type   = state._topdown_type;
  const temp   = state._topdown_temp;
  const moon   = state._topdown_moon;
  const season = state._topdown_season;

  const emojiType   = PrettyBitches.environment?.type?.[type]   || "🌫️";
  const emojiSeason = PrettyBitches.environment?.season?.[season] || "🍂";
  const emojiMoon   = PrettyBitches.environment?.moon?.[moon]   || "🌙";
  const emojiTemp   = PrettyBitches.temperature?.[temp]         || "🌡️";

  const snapshot = `${emojiType} ${type} | ${emojiTemp} ${temp}°F | ${emojiMoon} ${moon} | ${emojiSeason} ${season}`;

  const history = state._environment_history || [];
  history.push(snapshot);
  state._environment_history = history.slice(-5);

  LitBitch_trigger(`🌪️ Environment updated: ${snapshot}`, "environment");
}
//💞 TheFeels_cycle Random
function TheFeels_cycle() {
  console.log("💞 TheFeels_cycle() called");

  const types = ["joy", "anger", "sadness", "fear", "surprise", "love"];
  const registry = state._thefeels_registry || {};
  const updated = [];

  for (const type of types) {
    const current = registry[type] || 0;
    const delta = Math.floor(Math.random() * 5) - 2; // random shift between -2 and +2
    const next = Math.max(0, current + delta);

    registry[type] = next;
    updated.push(`${type}: ${current} → ${next}`);
  }

  state._thefeels_registry = registry;

  const summary = updated.join(" | ");
  OverlayMessages.TheFeels = `💫 Emotional cycle: ${summary}`;

  LitBitch_trigger(`💞 Emotions cycled: ${summary}`, "emotion");
}
//💞 TheFeels_cycle Random
function TheFeels_randomize() {
  console.log("🎲 TheFeels_randomize() called");

  const types = ["joy", "anger", "sadness", "fear", "surprise", "love"];
  const registry = {};
  const updates = [];

  for (const type of types) {
    const value = Math.floor(Math.random() * 101); // 0–100 scale
    registry[type] = value;
    updates.push(`${type}: ${value}`);
  }

  state._thefeels_registry = registry;

  const summary = updates.join(" | ");
  OverlayMessages.TheFeels = `🎲 Emotions randomized: ${summary}`;

  LitBitch_trigger(`🎲 Emotional state randomized: ${summary}`, "emotion");
}

//🔧 LitBitch Module: HomiesToLovers
function HomiesToLovers_update(name, type, value) {
  const registry = state._homiestolovers_registry || {};
  const previous = registry[name]?.value || 0;
  const previousType = registry[name]?.type || "none";

  registry[name] = { type, value };
  state._homiestolovers_registry = registry;

  if (type !== previousType) {
    LitBitch_trigger(`💞 You and ${name} are now ${type}s`, "relationship");
  } else if (value !== previous) {
    LitBitch_trigger(`💞 Relationship with ${name} changed: ${previous} → ${value}`, "relationship");
  }
}
//🔧 LitBitch Module: TopDown
function TopDown_update(type, temp, moon, season) {
  const changed = [];

  if (state._topdown_type !== type) {
    state._topdown_type = type;
    changed.push(`🌦️ Weather → ${type}`);
  }
  if (state._topdown_temp !== temp) {
    state._topdown_temp = temp;
    changed.push(`🌡️ Temp → ${temp}°F`);
  }
  if (state._topdown_moon !== moon) {
    state._topdown_moon = moon;
    changed.push(`🌙 Moon → ${moon}`);
  }
  if (state._topdown_season !== season) {
    state._topdown_season = season;
    changed.push(`🍂 Season → ${season}`);
  }

  if (changed.length) {
    triggerLitBitch(changed.join(" | "), "weather");
  }
}
// Life Shit
// 🔧 LitBitch Module: Life
function Life_update(stat, value) {
  const clamp = GetWrecked[stat];
  if (!clamp) return;

  const key = `_life_${stat}`;
  const max = clamp.max ?? 100;
  const min = clamp.min ?? 0;

  state[key] = Math.max(min, Math.min(value, max));
  LitBitch_trigger(`🍽️ ${stat.charAt(0).toUpperCase() + stat.slice(1)} clamped to ${state[key]}`, "life");
}
//🔧 LitBitch Module: Life
function Booboo_getHealthBar(health) {
  if (health >= 80) return PrettyBitches.healthBar.full;
  if (health >= 60) return PrettyBitches.healthBar.high;
  if (health >= 40) return PrettyBitches.healthBar.mid;
  if (health >= 20) return PrettyBitches.healthBar.low;
  if (health > 0)   return PrettyBitches.healthBar.critical;
  return PrettyBitches.healthBar.empty;
}
// 🔧 LitBitch Module: Booboo (Injury Parser)
function Booboo_update(part, severity) {
  const key = `_injury_${part}`;
  const previous = state[key] || "none";

  state[key] = severity;

  if (severity !== previous) {
    LitBitch_trigger(`🩸 Injury updated: ${part} → ${severity}`, "injury");
  }
}
//🎒 Backpack_update
function Backpack_update(items = []) {
  console.log("🎒 Backpack_update() called");

  // Update state
  state._backpack_items = items;

  // Build overlay message
  const itemCount = items.length;
  const emoji = itemCount === 0 ? "🫙" : "🎁";
  const itemList = itemCount ? items.join(", ") : "Empty";

  OverlayMessages.Backpack = `${emoji} Inventory (${itemCount}): ${itemList}`;

  // Trigger overlay feedback
  LitBitch_trigger(`🎒 Backpack updated: ${itemList}`, "inventory");
}

//🔧 LitBitch Module: Papaclock
function Papaclock_Advance(Papaclock_AdvanceMinutesPerTurn = 10) {
  console.log("🕰️ Papaclock_Advance() called");

  const Clamp = GetWrecked.PapaclockClamp;
  const months = MammaDontSing.months || GetWrecked.months || [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Advance minutes
  state._papaclock_minute = (state._papaclock_minute ?? 0) + Papaclock_AdvanceMinutesPerTurn;

  // Handle minute rollover
  if (state._papaclock_minute >= Clamp.minute.max + 1) {
    state._papaclock_minute %= (Clamp.minute.max + 1);
    state._papaclock_hour = (state._papaclock_hour ?? 0) + 1;
  }

  // Handle hour rollover
  if (state._papaclock_hour >= Clamp.hour.max + 1) {
    state._papaclock_hour %= (Clamp.hour.max + 1);
    state._papaclock_day = (state._papaclock_day ?? 1) + 1;

    // Handle day rollover
    if (state._papaclock_day > Clamp.day.max) {
      state._papaclock_day = Clamp.day.min;

      const currentMonthIndex = months.indexOf(state._papaclock_month);
      const nextMonthIndex = (currentMonthIndex + 1) % months.length;
      state._papaclock_month = months[nextMonthIndex];

      // Handle year rollover
      if (nextMonthIndex === 0) {
        state._papaclock_year = (state._papaclock_year ?? 2025) + 1;
        LitBitch_trigger(`📅 Year advanced to ${state._papaclock_year}`, "time");
      }

      LitBitch_trigger(`📅 Month advanced to ${state._papaclock_month}`, "time");
    }

    LitBitch_trigger(`📅 Day advanced to ${state._papaclock_day}`, "time");
  }

  LitBitch_trigger(`🕰️ Time advanced to ${state._papaclock_hour}:${state._papaclock_minute}`, "time");
}
//🧠 LitBitch Mythic Orchestrator
function LitBitch_interpret(text) {
  if (!text || typeof text !== "string") {
    console.warn("⚠️ LitBitch_interpret called with invalid text");
    return false;
  }

  console.log("🧠 LitBitch_interpret() called");

  const interpretedSomething = LitBitch_parse(text);

  if (interpretedSomething) {
    LitBitch_trigger("🧠 Interpretation complete", "system");
  } else {
    LitBitch_trigger("🌀 No cues found — the myth sleeps for now", "narrative");
  }

  return interpretedSomething;
}
//narrate
function LitBitch_trigger(message, domain = "system") {
  console.log(`🔔 LitBitch_trigger [${domain}]: ${message}`);

  state._litbitch_log ??= [];
  state._litbitch_log.push({ domain, message, timestamp: Date.now() });

  if (state._litbitch_log.length > 20) {
    state._litbitch_log.shift();
  }

  if (GetWrecked.overlay_style === "visual" || GetWrecked.overlay_style === "both") {
    forgePocketFromTemplate("Pocket", {
      title: `LitBitch: ${domain}`,
      content: message,
      emoji: "🔥",
      tags: [domain, "feedback"]
    });
  }
}

//Globals
globalThis.LitBitch = {};
globalThis.GetWrecked = GetWrecked;
globalThis.Clamp = Clamp;
globalThis.PrettyBitches = PrettyBitches;
globalThis.MammaDontSing = MammaDontSing;
globalThis.PocketTemplates = PocketTemplates;

globalThis.AutoPocket = AutoPocket;
globalThis.createAutoPocket = createAutoPocket;
globalThis.Reaper_drain
globalThis.Life = {};
globalThis.Death = {};
globalThis.Resurrection = {};
globalThis.Papaclock = {};
globalThis.BooBoo = {};
globalThis.TopDown = {};
globalThis.Backpack = {};
globalThis.HomiesToLovers = {};
globalThis.TheFeels = {};

globalThis.AutoPocketEngine = globalThis.AutoPocketEngine || {
  memoryBank: [],
  pocketQueue: [],
  signalFlags: {
    autoPocketInput: true,
    autoPocketContext: true,
    autoPocketOutput: true
  }
};

globalThis.OverlayMessages = {
  OutsidePocket: "",
  ManifestPocket: "",
  Booboo_status: "",
  Mythic_events: "",
  Resurrection_recover: "",
  HomiestoloversPocket: "",
  Booboo_update: "",
  TopDown_update: "",
  Papaclock_Advance: "",
  collapse: "",
  recovery: "",
  statDelta: "",
  Topdown: "",
  PapaClock: "",
  booboo: "",
  HomiesToLovers_update: "",
  Litbitch: ""
};

 // 🌍 Mythic Globals
globalThis.LitBitch = {
  parse: LitBitch_parse,
  detectChanges: LitBitch_detectChanges,
  trigger: LitBitch_trigger,
  renderOverlay: PocketFormatter,
  renderFeedback: renderLitBitchOverlay,
  onInput: LitBitchHooks.onInput,
  onContext: LitBitchHooks.onContext,
  onOutput: LitBitchHooks.onOutput
};

globalThis.GetWrecked = GetWrecked;
globalThis.Clamp = Clamp;
globalThis.PrettyBitches = PrettyBitches;
globalThis.MammaDontSing = MammaDontSing;
globalThis.PocketTemplates = PocketTemplates;

globalThis.AutoPocket = AutoPocket;
globalThis.createAutoPocket = createAutoPocket;

globalThis.Life = {
  update: Life_update,
  hunger: () => state._life_hunger,
  thirst: () => state._life_thirst,
  fatigue: () => state._life_fatigue,
  health: () => state._life_health
};

globalThis.Death = {
  mirror: state.Booboo_status,
  Resurrection: {
    health: Clamp.injury?.collapse ?? 20,
    fatigue: Clamp.life_fatigue?.collapse ?? 1
  }
};

globalThis.Resurrection = {
  recover: Resurrection_recover,
  status: () => state._resurrection_status
};

globalThis.Papaclock = {
  advance: Papaclock_Advance,
  now: () => `${state._papaclock_hour}:${state._papaclock_minute}`,
  date: () => `${state._papaclock_day} ${state._papaclock_month} ${state._papaclock_year}`
};

globalThis.BooBoo = {
  update: Booboo_update,
  status: () => state._booboo_status
};

globalThis.TopDown = {
  type: () => state._topdown_type,
  temp: () => state._topdown_temp,
  moon: () => state._topdown_moon,
  season: () => state._topdown_season
};

globalThis.Backpack = {
  update: Backpack_update,
  items: () => state._backpack_items
};

globalThis.HomiesToLovers = {
  update: HomiesToLovers_update,
  registry: () => state._homiestolovers_registry
};

globalThis.TheFeels = {
  cycle: TheFeels_cycle,
  randomize: TheFeels_randomize,
  emoji: (type) => state[`_thefeels_${type}_emoji`] || PrettyBitches.thefeels?.[type]?.[0] || "😶"
};

globalThis.AutoPocketEngine = {
  memoryBank: [],
  pocketQueue: [],
  signalFlags: {
    autoPocketInput: true,
    autoPocketContext: true,
    autoPocketOutput: true
  }
};

globalThis.OverlayMessages = {
  OutsidePocket: "",
  ManifestPocket: "",
  Booboo_status: "",
  Mythic_events: "",
  Resurrection_recover: "",
  HomiestoloversPocket: "",
  Booboo_update: "",
  TopDown_update: "",
  Papaclock_Advance: "",
  collapse: "",
  recovery: "",
  statDelta: "",
  Topdown: "",
  PapaClock: "",
  booboo: "",
  HomiesToLovers_update: "",
  Litbitch: ""
};


// 🌩️ God — Mythic Loader
// 🌩️ God — Mythic Loader
function God() {
  console.log("🌩️ God() invoked — summoning the mythic overlay engine...");

  // 🧬 Load default state values
  function DefaultsLoader() {
    console.log("🧬 DefaultsLoader() called");

    const defaults = {
      _life_hunger: GetWrecked.Life_hunger,
      _life_thirst: GetWrecked.Life_thirst,
      _life_fatigue: GetWrecked.Life_fatigue,
      _life_health: GetWrecked.BooBoo,
      _booboo_status: GetWrecked._booboo_status,
      _backpack_items: GetWrecked._backpack_items,
      _homiestolovers_type: GetWrecked._homiestolovers_type,
      _homiestolovers_value: GetWrecked._homiestolovers_value,
      _papaclock_day: GetWrecked._papaclock_day,
      _papaclock_hour: GetWrecked._papaclock_hour,
      _papaclock_minute: GetWrecked._papaclock_minute,
      _papaclock_month: GetWrecked._papaclock_month,
      _papaclock_year: GetWrecked._papaclock_year,
      _topdown_type: GetWrecked._topdown_type,
      _topdown_temp: GetWrecked._topdown_temp,
      _topdown_moon: GetWrecked._topdown_moon,
      _topdown_season: GetWrecked._topdown_season,
      _resurrection_status: GetWrecked._resurrection_status
    };

    for (const key in defaults) {
      state[key] ??= defaults[key];
    }
  }

  // 🧬 Invoke default loader
  DefaultsLoader();

  globalThis.LitBitch = {
    parse: LitBitch_parse,
    detectChanges: LitBitch_detectChanges,
    trigger: LitBitch_trigger,
    renderOverlay: PocketFormatter,
    renderFeedback: renderLitBitchOverlay,
    onInput: LitBitchHooks.onInput,
    onContext: LitBitchHooks.onContext,
    onOutput: LitBitchHooks.onOutput
  };

  globalThis.GetWrecked = GetWrecked;
  globalThis.Clamp = Clamp;
  globalThis.PrettyBitches = PrettyBitches;
  globalThis.MammaDontSing = MammaDontSing;
  globalThis.PocketTemplates = PocketTemplates;

  globalThis.AutoPocket = AutoPocket;
  globalThis.createAutoPocket = createAutoPocket;

  globalThis.Life = {
    update: Life_update,
    hunger: () => state._life_hunger,
    thirst: () => state._life_thirst,
    fatigue: () => state._life_fatigue,
    health: () => state._life_health
  };

  globalThis.Death = {
    mirror: state.Booboo_status,
    Resurrection: {
      health: Clamp.injury?.collapse ?? 20,
      fatigue: Clamp.life_fatigue?.collapse ?? 1
    }
  };

  globalThis.Resurrection = {
    recover: Resurrection_recover,
    status: () => state._resurrection_status
  };

  globalThis.Papaclock = {
    advance: Papaclock_Advance,
    now: () => `${state._papaclock_hour}:${state._papaclock_minute}`,
    date: () => `${state._papaclock_day} ${state._papaclock_month} ${state._papaclock_year}`
  };

  globalThis.BooBoo = {
    update: Booboo_update,
    status: () => state._booboo_status
  };

  globalThis.TopDown = {
    type: () => state._topdown_type,
    temp: () => state._topdown_temp,
    moon: () => state._topdown_moon,
    season: () => state._topdown_season
  };

  globalThis.Backpack = {
    update: Backpack_update,
    items: () => state._backpack_items
  };

  globalThis.HomiesToLovers = {
    update: HomiesToLovers_update,
    registry: () => state._homiestolovers_registry
  };

  globalThis.TheFeels = {
    cycle: TheFeels_cycle,
    randomize: TheFeels_randomize,
    emoji: (type) => state[`_thefeels_${type}_emoji`] || PrettyBitches.thefeels?.[type]?.[0] || "😶"
  };

  globalThis.AutoPocketEngine = {
    memoryBank: [],
    pocketQueue: [],
    signalFlags: {
      autoPocketInput: true,
      autoPocketContext: true,
      autoPocketOutput: true
    }
  };

  globalThis.OverlayMessages = {
    OutsidePocket: "",
    ManifestPocket: "",
    Booboo_status: "",
    Mythic_events: "",
    Resurrection_recover: "",
    HomiestoloversPocket: "",
    Booboo_update: "",
    TopDown_update: "",
    Papaclock_Advance: "",
    collapse: "",
    recovery: "",
    statDelta: "",
    Topdown: "",
    PapaClock: "",
    booboo: "",
    HomiesToLovers_update: "",
    Litbitch: ""
  };

  console.log("✅ God() complete — the myth awakens.");
}

// 🔥 Invoke the mythic loader
God();


