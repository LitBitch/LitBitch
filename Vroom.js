// 🧱 Global Overlay Variables
let _time_overlayMessage = "";
let _survival_recoveryMessage = "";
let _survival_statDeltaMessage = "";
let _survival_warningMessage = "";
let _emotion_warningMessage = "";
let _emotion_collapseMessage = "";
let _relationship_statusMessage = "";

// 🧱 StoryArcEngine Global Defaults
state.arcPrompt = "<< Write the next arc >>";
state.turnNum_SAE = 1;
state.attemptCounter = 0;
state.turnsPerAICall = 5;
state.attemptLimit = 3;
state.turnsPerElemRemoval = 10;
state.unlockFeedAIPrompt = false;
state.saveOutput = false;

// ===============================
// 🔧 GLOBAL LIMITS & DEFAULTS
// ===============================
const Defaults = {
  // 🕒 Time
  time_day: 1,
  time_hour: 8,
  time_minute: 0,
  time_year: new Date().getFullYear(),

  // 🌦️ Weather
  weather_type: "☀️ Clear",
  weather_temp: 70,
  weather_moon: "🌑 New Moon",
  weather_season: "Spring",

  // 🍽️ Survival
  survival_hunger: 100,
  survival_thirst: 100,
  survival_fatigue: 100,

  // 🧰 Inventory
  inventory_items: [],

  // 🩹 Injuries
  injury_status: {},

  // 🎭 Emotion
  emotion_joy: 50,
  emotion_fear: 50,
  emotion_anger: 50,
  emotion_sadness: 50,
  emotion_calm: 50,

  // ❤️ Relationship
  relationship_type: "Unknown",
  relationship_value: 50
};


// 🔧 Initialize default state values
function initializeDefaults() {
  state._time_day ??= Defaults.time_day;
  state._time_hour ??= Defaults.time_hour;
  state._time_minute ??= Defaults.time_minute;
  state._time_year ??= Defaults.time_year;

  state._weather_type ??= Defaults.weather_type;
  state._weather_temp ??= Defaults.weather_temp;
  state._weather_moon ??= Defaults.weather_moon;
  state._weather_season ??= Defaults.weather_season;

  state._survival_hunger ??= Defaults.survival_hunger;
  state._survival_thirst ??= Defaults.survival_thirst;
  state._survival_fatigue ??= Defaults.survival_fatigue;

  state._inventory_items ??= Defaults.inventory_items;
  state._injury_status ??= Defaults.injury_status;

  state._emotion_joy ??= Defaults.emotion_joy;
  state._emotion_fear ??= Defaults.emotion_fear;
  state._emotion_anger ??= Defaults.emotion_anger;
  state._emotion_sadness ??= Defaults.emotion_sadness;
  state._emotion_calm ??= Defaults.emotion_calm;

  state._relationship_type ??= Defaults.relationship_type;
  state._relationship_value ??= Defaults.relationship_value;
}

//✅ Card Registry (must be declared after CardTemplates)
function createScenarioCards() {
  console.log("🧱 createScenarioCards() called");
  const requiredCards = Object.values(CardTemplates);

  for (const card of requiredCards) {
    const exists = storyCards.find(c => c.title === card.title);
    if (!exists) {
      console.log(`📄 Creating card: "${card.title}"`);
      addStoryCard(card.keys, card.entry, card.type, card.title, card.description);
    }
  }
}
function AutoCards(stage, text) {
  console.log(`🔧 AutoCards("${stage}") called`);
  if (stage !== "input") return text;

  const requiredCards = Object.values(CardTemplates);

  for (const card of requiredCards) {
    const exists = storyCards.find(c => c.title === card.title);
    if (!exists) {
      console.log(`📄 AutoCards creating: "${card.title}"`);
      addStoryCard(card.keys, card.entry, card.type, card.title, card.description);
    }
  }
  return text;
}

//🗂️ Card Creation Templates
// 🗂️ Card Creation Templates
const CardTemplates = {
  // 🌦️ Weather System
  weatherStats: {
    title: "Weather & Environment",
    keys: "Weather & Environment",
    type: "Environment",
    entry: `> Weather: ${Defaults.weather_type}
> Temperature: ${Defaults.weather_temp}°F
> Moon Phase: ${Defaults.weather_moon}
> Last Update: Day ${Defaults.time_day}
> Visual: 🌦️ [${Defaults.weather_type}] 🌡️ [${Defaults.weather_temp}°F] 🌙 [${Defaults.weather_moon}]`,
    description: `🌦️ Weather tracker
> Auto-updates with time/day
> Moon phase cycles every 29 days
> Seasonal logic optional
> Responds to prompt cues:
- "rain", "snow", "storm", "sunny", "cloudy"
- "full moon", "new moon"
- "spring", "summer", "fall", "winter"
> Visual overlay:
- Weather, temperature, and moon phase shown in overlay if enabled`
  },

  weatherSettings: {
    title: "Weather Settings",
    keys: "Weather Settings",
    type: "Settings",
    entry: "> Enabled: true\n> ShowWeather: true\n> SeasonalLogic: true\n> Overlay Style: both",
    description: `🛠️ Weather engine config
> Overlay Style options:
- "visual" → shows emoji overlay only
- "narrative" → suppresses overlay, uses prose
- "both" → shows overlay and allows narrative triggers
> Commands:
- /weather → refresh weather manually
- /moon → override moon phase
- /season → override seasonal logic`
  },

  // 🕒 Time System
  timeDay: {
    title: "Time & Day",
    keys: "Time & Day",
    type: "Time",
    entry: `> Year: ${Defaults.time_year}
> Day: ${Defaults.time_day}
> Hour: ${Defaults.time_hour}
> Minute: ${Defaults.time_minute}
> HourStr: ${String(Defaults.time_hour).padStart(2, "0")}
> MinuteStr: ${String(Defaults.time_minute).padStart(2, "0")}
> Phase: ${getPhase(Defaults.time_hour)}
> Last Action: 🕒 Initialized at ${String(Defaults.time_hour).padStart(2, "0")}:${String(Defaults.time_minute).padStart(2, "0")}, Day ${Defaults.time_day}`,
    description: `🕒 Time tracker
> Auto-advances based on player actions
> Phase logic updates based on hour
> Triggers:
- "sleep", "rest", "lie down" → Advance to next morning (08:00)
- "nap", "doze", "short rest" → Advance time by 4 hours
- Collapse → Advance to next morning
> Visual overlay:
- Year, time, phase, and day shown in overlay if enabled`
  },

  timeSettings: {
    title: "Time Settings",
    keys: "Time Settings",
    type: "Settings",
    entry: "> Enabled: true\n> Show Time: true\n> Show State Message: true\n> Minutes Per Action: 10\n> Phase Logic: true\n> LogicEnabled: true\n> Overlay Style: both",
    description: `🛠️ Time engine config
> Overlay Style options:
- "visual" → shows emoji overlay only
- "narrative" → suppresses overlay, uses prose
- "both" → shows overlay and allows narrative triggers
> Commands:
- /time → refresh time manually
- /phase → override phase logic
- /advance → manually advance time`
  },

  // 🍽️ Survival System
  survivalStats: {
    title: "Survival Stats",
    keys: "Survival Stats",
    type: "Survival",
    entry: `> Hunger: ${Defaults.survival_hunger}
> Thirst: ${Defaults.survival_thirst}
> Fatigue: ${Defaults.survival_fatigue}
> Last Action: 🍽️ Initialized at full stats`,
    description: `🍽️ Survival stat tracker
> Tracks hunger, thirst, and fatigue
> Stats decay with time and actions
> Collapse triggers when thresholds are breached
> Triggers:
- "snack", "bite", "nibble" → Hunger +3
- "meal", "lunch", "dinner" → Hunger +10
- "feast", "banquet" → Hunger +20
- "drink", "water", "sip" → Thirst +3
- "nap", "doze", "short rest" → Fatigue +10, Hunger -2, Thirst -2
- "sleep", "rest", "lie down" → Fatigue +20, Hunger -5, Thirst -5
> Commands:
- /stats → refresh survival stats
- /collapse → manually trigger collapse
- /recover → restore stats to safe thresholds`
  },

  survivalSettings: {
    title: "Survival Stats Settings",
    keys: "Survival Stats Settings",
    type: "Settings",
    entry: `> Decay Per Action: 2
> Collapse Hunger: 20
> Collapse Thirst: 20
> Collapse Fatigue: 100
> ShowSurvival: true
> ShowInventory: true
> ShowInjuries: true
> LogicEnabled: true
> Overlay Style: both`,
    description: `🛠️ Survival engine config
> Controls stat decay, collapse thresholds, and overlay visibility
> Overlay Style options:
- "visual" → emoji overlay only
- "narrative" → prose only
- "both" → overlay + prose
> Toggles:
- ShowSurvival → display hunger/thirst/fatigue
- ShowInventory → display inventory items
- ShowInjuries → display injury status
> Commands:
- /stats → refresh survival
- /collapse → trigger collapse
- /recover → restore safe thresholds`
  },

  inventoryCard: {
    title: "Inventory",
    keys: "Inventory",
    type: "Survival",
    entry: `> Inventory: ${Defaults.inventory_items.join(", ")}`,
    description: `🧰 Inventory tracker
> Items are added/removed via triggers or commands
> Triggers:
- "grab", "take", "collect" → adds item
- "drop", "discard", "lose" → removes item
> Commands:
- /inventory → refresh inventory
- /clear inventory → empty inventory`
  },

  injuryCard: {
    title: "Injuries",
    keys: "Injuries",
    type: "Survival",
    entry: `> Injuries: ${JSON.stringify(Defaults.injury_status)}`,
    description: `🩹 Injury tracker
> Tracks body part damage and severity
> Triggers:
- "hit", "stab", "fall", "burn" → adds injury
- "heal", "recover", "bandage" → reduces severity
> Commands:
- /injuries → refresh injury list
- /reset injuries → clear all injuries`
  },

  emotionRelationshipCard: {
    title: "Emotion & Relationship",
    keys: "Emotion & Relationship",
    type: "Story",
    entry: `> Joy: ${Defaults.emotion_joy}
> Fear: ${Defaults.emotion_fear}
> Anger: ${Defaults.emotion_anger}
> Sadness: ${Defaults.emotion_sadness}
> Calm: ${Defaults.emotion_calm}
> Relationship: ${Defaults.relationship_type} (${Defaults.relationship_value})`,
    description: `🎭 Emotional state + ❤️ Relationship tracker
> Emotions shift based on narrative and player actions
> Relationship evolves with story arc
> Triggers:
- "laugh", "smile", "celebrate" → Joy +10
- "threat", "danger", "fear" → Fear +10
- "argue", "fight", "rage" → Anger +10
- "loss", "cry", "grieve" → Sadness +10
- "meditate", "breathe", "relax" → Calm +10
> Commands:
- /emotion → refresh emotions
- /reset emotion → restore defaults
- /relationship → show current relationship`
  },

  emotionSettings: {
    title: "Emotion Settings",
    keys: "Emotion Settings",
    type: "Settings",
    entry: "> Collapse Enabled: true\n> Warning Threshold: 75\n> Overlay Style: both",
    description: `🛠️ Emotion engine config
> Collapse triggers when all emotions reach 100
> Warning messages appear when emotions exceed threshold
> Overlay Style options:
- "visual" → shows emoji overlay only
- "narrative" → suppresses overlay, uses prose
- "both" → shows overlay and allows narrative triggers
> Commands:
- /emotion → refresh emotion state
- /reset emotion → restore emotions to default`
  },

  // 🧠 Story Arc System
    storyArcSettings: {
    title: "Story Arc Settings",
    keys: "Story Arc Settings",
    type: "Settings",
    entry: `turnsPerAICall = ${state.turnsPerAICall}
attemptLimit = ${state.attemptLimit}
turnsPerElemRemoval = ${state.turnsPerElemRemoval}
arcPrompt = ${state.arcPrompt}`,
    description: `🛠️ Story Arc Engine config
> Auto-generates story arcs every X turns
> Removes old plot points every Y turns
> Commands:
- /redo arc → regenerate arc
- /stop → cancel arc generation
- /help sae → show help`
  },

  currentStoryArc: {
    title: "Current Story Arc",
    keys: "Current Story Arc",
    type: "Narrative",
    entry: "",
    description: `📖 Current story arc being fed to AI
> Auto-updates every ${state.turnsPerAICall} turns
> Old plot points removed every ${state.turnsPerElemRemoval} turns
> Visual overlay:
- Arc summary injected into Author's note if enabled`
  },

  debugLog: {
    title: "Debug Log",
    keys: "Debug Log",
    type: "System",
    entry: `> LoggingEnabled: true
> ShowDebugMessage: true`,
    description: `🪛 Debug log
> Records engine activity, system messages, and overlay feedback
> LoggingEnabled: true/false → controls whether debug messages are saved
> ShowDebugMessage: true/false → controls whether messages are printed to console
> Automatically trims to last 20 entries
> Commands:
- /log → view recent debug entries
- /clear log → reset debug history
- /toggle debug → enable/disable logging`
  }
};

// Card Creation hooks
// 🧩 Card Creation Hooks
const CardCreationHooks = {
  onInput: function (text) {
    console.log("🟢 CardCreationHooks.onInput called");
    createScenarioCards();
    return text;
  }
};



//🧰 Consolidated Shared Utilities
// ===============================
// 🔧 GLOBAL LIMITS & DEFAULTS
// ===============================

const MoonPhases = [
  "🌑 New Moon", "🌑", "🌑",
  "🌒 Waxing Crescent", "🌒", "🌒", "🌒",
  "🌓 First Quarter", "🌓", "🌓",
  "🌔 Waxing Gibbous", "🌔", "🌔", "🌔",
  "🌕 Full Moon", "🌕", "🌕",
  "🌖 Waning Gibbous", "🌖", "🌖", "🌖",
  "🌗 Last Quarter", "🌗", "🌗",
  "🌘 Waning Crescent", "🌘", "🌘", "🌘"
];

function getWeatherBySeason(season) {
  switch (season) {
    case "Spring": return ["☀️ Clear", "🌦️ Rain", "🌤️ Partly Cloudy", "🌧️ Showers"];
    case "Summer": return ["☀️ Clear", "🌤️ Partly Cloudy", "🌩️ Thunderstorm", "🔥 Heatwave"];
    case "Fall":   return ["🌫️ Fog", "🌧️ Showers", "☁️ Overcast", "🍂 Windy"];
    case "Winter": return ["❄️ Snow", "☁️ Overcast", "🌨️ Flurries", "🌬️ Cold"];
    default:       return ["☀️ Clear", "☁️ Overcast"];
  }
}

const SeasonalTemperatureRanges = {
  Spring: { min: 55, max: 75 },
  Summer: { min: 70, max: 95 },
  Fall:   { min: 45, max: 65 },
  Winter: { min: 20, max: 40 }
};

const StatLimits = {
  Hunger: { min: 0, max: 100 },
  Thirst: { min: 0, max: 100 },
  Fatigue: { min: 0, max: 100 }
};

const EmotionLimits = {
  joy: { min: 0, max: 100 },
  fear: { min: 0, max: 100 },
  anger: { min: 0, max: 100 },
  sadness: { min: 0, max: 100 },
  calm: { min: 0, max: 100 }
};

const RelationshipLimits = {
  value: { min: 0, max: 100 },
  types: ["Unknown", "Friend", "Lover", "Family", "Associate"]
};

const InventoryLimits = {
  maxItems: 20
};

const InjuryLimits = {
  maxInjuries: 5,
  validParts: ["head", "arm", "leg", "torso", "hand", "foot"]
};

const TimeLimits = {
  hour: { min: 0, max: 23 },
  minute: { min: 0, max: 59 },
  day: { min: 1, max: 365 }
};

// ===============================
// 🔧 UTILITY HELPERS (ALL ENGINES)
// ===============================

function getCard(title) {
  console.log(`🔧 getCard("${title}") called`);
  return storyCards.find(c => c.title === title);
}
function getCardByKey(key) {
  console.log(`🔧 getCard("${key}") called`);
  return storyCards.find(c => c.title === key);
}
const getSurvivalStatsCard = () => getCardByKey("Survival Stats");
const getInventoryCard = () => getCardByKey("Inventory");
const getInjuryCard = () => getCardByKey("Injuries");
const getEmotionRelationshipCard = () => getCardByKey("Emotion & Relationship");
const getTimeCard = () => getCardByKey("Time & Day");
const getWeatherCard = () => getCardByKey("Weather & Environment");
const getSurvivalStatsSettingsCard = () => getCardByKey("Survival Stats Settings");
const getEmotionSettingsCard = () => getCardByKey("Emotion Settings");
const getTimeSettingsCard = () => getCardByKey("Time Settings");
const getWeatherSettingsCard = () => getCardByKey("Weather Settings");
const getStoryArcSettingsCard = () => getCardByKey("Story Arc Settings");
const getStoryArcCard = () => getCardByKey("Current Story Arc");
const getDebugLogCard = () => getCardByKey("Debug Log");

function readSetting(card, key, fallback) {
  const match = card?.entry?.match(new RegExp(`> ${key}: (.+)`));
  return match ? match[1].trim() : fallback;
}

function clampStat(stat, value) {
  const limits = StatLimits[stat] || { min: 0, max: 100 };
  return Math.max(limits.min, Math.min(limits.max, value));
}

function clampEmotion(stat, value) {
  const limits = EmotionLimits[stat] || { min: 0, max: 100 };
  return Math.max(limits.min, Math.min(limits.max, value));
}

function clampRelationship(value) {
  const limits = RelationshipLimits.value;
  return Math.max(limits.min, Math.min(limits.max, value));
}

function clampTime(hour, minute, day) {
  return {
    hour: Math.max(TimeLimits.hour.min, Math.min(TimeLimits.hour.max, hour)),
    minute: Math.max(TimeLimits.minute.min, Math.min(TimeLimits.minute.max, minute)),
    day: Math.max(TimeLimits.day.min, Math.min(TimeLimits.day.max, day))
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function logToDebugCard(message) {
  const card = getCard("Debug Log");
  if (!card) return;
  const loggingEnabled = readSetting(card, "LoggingEnabled", true);
  const showMessage = readSetting(card, "ShowDebugMessage", true);
  if (!loggingEnabled) return;
  const trimmed = card.description?.split("\n").slice(-20) || [];
  trimmed.push(`> ${message}`);
  card.description = trimmed.join("\n");
  if (showMessage) console.log(`🧠 ${message}`);
}

// ===============================
// 🔧 SURVIVAL ENGINE UTILITIES
// ===============================

function applyStatChange({ hunger = 0, thirst = 0, fatigue = 0 }) {
  state._survival_hunger = clampStat("Hunger", (state._survival_hunger ?? Defaults.survival_hunger) + hunger);
  state._survival_thirst = clampStat("Thirst", (state._survival_thirst ?? Defaults.survival_thirst) + thirst);
  state._survival_fatigue = clampStat("Fatigue", (state._survival_fatigue ?? Defaults.survival_fatigue) + fatigue);
}

function updateSurvivalDescription(msg) {
  const card = getSurvivalStatsCard();
  if (!card || !msg) return;
  const lines = card.entry?.split("\n") ?? [];
  const filtered = lines.filter(line => !line.startsWith("> Last Action:"));
  filtered.push(`> Last Action: ${msg}`);
  card.entry = filtered.join("\n");
}

function clampInventory() {
  const max = InventoryLimits.maxItems;
  if (state._inventory_items.length > max) {
    state._inventory_items = state._inventory_items.slice(0, max);
    logToDebugCard("⚠️ Inventory clamped to max size");
  }
}

function clampInjuries() {
  for (const [part, severity] of Object.entries(state._injury_status)) {
    const value = parseInt(severity);
    if (value <= 0) {
      triggerResurrection();
      return;
    }
    if (value > 100) state._injury_status[part] = 100;
  }
}

function triggerResurrection() {
  logToDebugCard("💀 You died from your injuries. Resurrecting...");
  state._survival_hunger = 50;
  state._survival_thirst = 50;
  state._survival_fatigue = 50;
  state._injury_status = {};
  state._inventory_items = state._inventory_items.slice(0, 3);
  _survival_recoveryMessage = "🕊️ You awaken, restored but weakened. Death is not the end.";
}

// ===============================
// 🔧 STORY ARC ENGINE UTILITIES
// ===============================
function bumpEmotion(stat, amount = 1) {
  const key = `_emotion_${stat}`;
  const current = state[key] ?? Defaults[`emotion_${stat}`];
  state[key] = clampEmotion(stat, current + amount);
}

function bumpRelationship(amount = 1) {
  const current = state._relationship_value ?? Defaults.relationship_value;
  state._relationship_value = clampRelationship(current + amount);
}

function setRelationshipType(type) {
  state._relationship_type = RelationshipLimits.types.includes(type) ? type : "Unknown";
}

function updateEmotionDescription(msg) {
  const card = getEmotionRelationshipCard();
  if (card) card.description = `Emotion Update:\n${msg}\n` + card.description;
}

// ===============================
// 🔧 TIME/WEATHER ENGINE UTILITIES
// ===============================
function normalizeTimeState() {
  const { hour, minute, day } = clampTime(
    state._time_hour ?? Defaults.time_hour,
    state._time_minute ?? Defaults.time_minute,
    state._time_day ?? Defaults.time_day
  );
  state._time_hour = hour;
  state._time_minute = minute;
  state._time_day = day;
}

function getSeason(day) {
  if (day >= 80 && day < 172) return "Spring";
  if (day >= 172 && day < 264) return "Summer";
  if (day >= 264 && day < 355) return "Fall";
  return "Winter";
}

function getPhase(hour) {
  if (hour >= 5 && hour < 8) return "🌅 Dawn";
  if (hour >= 8 && hour < 12) return "🌞 Morning";
  if (hour >= 12 && hour < 17) return "🌤️ Afternoon";
  if (hour >= 17 && hour < 20) return "🌇 Evening";
  if (hour >= 20 || hour < 5) return "🌙 Night";
  return "🕒 Unknown";
}

function advanceTimeBy(hours, minutes) {
  state._time_minute += minutes;
  state._time_hour += hours;

  while (state._time_minute >= 60) {
    state._time_minute -= 60;
    state._time_hour += 1;
  }
  while (state._time_hour >= 24) {
    state._time_hour -= 24;
    state._time_day += 1;
  }
  while (state._time_day > 365) {
    state._time_day -= 365;
    state._time_year = (state._time_year ?? Defaults.time_year) + 1;
  }
}

function updateTimeDescription(message) {
  const card = getTimeCard();
  if (!card || !message) return;

  const lines = card.entry?.split("\n") ?? [];
  const filtered = lines.filter(line => !line.startsWith("> Last Action:"));
  filtered.push(`> Last Action: ${message}`);
  card.entry = filtered.join("\n");
}

// ===============================
// 🔧 OVERLAY FORMATTERS (ALL ENGINES)
// ===============================
function formatTimeOverlay() {
  return `🕒 Day ${state._time_day}, ${String(state._time_hour).padStart(2, "0")}:${String(state._time_minute).padStart(2, "0")}`;
}

function formatWeatherOverlay() {
  return `${state._weather_type} | ${state._weather_temp}°F | ${state._weather_moon}`;
}

function formatSurvivalOverlay() {
  return `🍽️ ${state._survival_hunger} | 💧 ${state._survival_thirst} | 🛌 ${state._survival_fatigue}`;
}

function formatInventoryOverlay() {
  const items = state._inventory_items ?? [];
  return items.length
    ? items.map(item => `🧰 ${item}`).join("\n")
    : "🧰 Inventory: (empty)";
}

function formatInjuryOverlay() {
  const injuries = state._injury_status ?? {};
  return Object.keys(injuries).length
    ? Object.entries(injuries).map(([part, severity]) => `🩹 ${part}: ${severity}`).join("\n")
    : "🩹 Status: No injuries";
}

function formatEmotionOverlay() {
  return `😊 ${state._emotion_joy} | 😨 ${state._emotion_fear} | 😠 ${state._emotion_anger} | 😢 ${state._emotion_sadness} | 😌 ${state._emotion_calm}`;
}

function formatRelationshipOverlay() {
  return `❤️ ${state._relationship_type} (${state._relationship_value})`;
}

function formatEmotionBlock() {
  return `🎭 Emotions → ${formatEmotionOverlay()}`;
}

function formatRelationshipBlock() {
  return `❤️ Relationship → ${formatRelationshipOverlay()}`;
}

function formatTimeWeatherOverlay() {
  return `${formatTimeOverlay()}\n${formatWeatherOverlay()}`;
}

function getOverlay() {
  const messages = [
    _survival_recoveryMessage,
    _survival_statDeltaMessage,
    _survival_warningMessage,
    _time_overlayMessage,
    _emotion_warningMessage,
    _emotion_collapseMessage,
    _relationship_statusMessage
  ].filter(Boolean);

  const survivalSettings = getSurvivalStatsSettingsCard();
  const timeSettings = getTimeSettingsCard();
  const emotionSettings = getEmotionSettingsCard();
  const weatherSettings = getWeatherSettingsCard();

  const showSurvival = readSetting(survivalSettings, "ShowSurvival", true);
  const showInventory = readSetting(survivalSettings, "ShowInventory", true);
  const showInjuries = readSetting(survivalSettings, "ShowInjuries", true);
  const styleTime = readSetting(timeSettings, "Overlay Style", "both");
  const styleWeather = readSetting(weatherSettings, "Overlay Style", "both");
  const styleEmotion = readSetting(emotionSettings, "Overlay Style", "both");

  const allowOverlay = [styleTime, styleWeather, styleEmotion].some(style => style === "visual" || style === "both");

  const blocks = [];

  if (styleTime !== "narrative") blocks.push(formatTimeOverlay());
  if (styleWeather !== "narrative") blocks.push(formatWeatherOverlay());
  if (showSurvival) blocks.push(formatSurvivalOverlay());
  if (showInventory) blocks.push(formatInventoryOverlay());
  if (showInjuries) blocks.push(formatInjuryOverlay());
  if (styleEmotion !== "narrative") blocks.push(formatEmotionBlock());
  if (styleEmotion !== "narrative") blocks.push(formatRelationshipBlock());

  return allowOverlay && messages.length
    ? `🧭\n${messages.join("\n")}\n\n${blocks.join("\n")}\n🧭\n`
    : "";
}

/// ===============================
// 🔧 TIME COMMAND DEFINITIONS
// ===============================
const TimeCommands = {
  nap: {
    keywords: ["nap", "doze", "short rest"],
    advance: { hour: 4, minute: 0 },
    message: "🕒 You napped. Time advanced by 4 hours."
  },
  sleep: {
    keywords: ["sleep", "rest", "lie down"],
    advance: { hour: 8, minute: 0 },
    message: "🕒 You slept. Time advanced to next morning."
  }
};

// ===============================
// 🔧 RECOVERY TRIGGERS
// ===============================
const RecoveryTriggers = {
  heal: ["heal", "recover", "bandage", "treat", "patch"],
  rest: ["rest", "relax", "breathe", "meditate"]
};

// ===============================
// 🔧 PROMPT PARSERS & COMMANDS
// ===============================

// 🍽️ Survival Commands
const SurvivalCommands = {
  snack: { keywords: ["snack", "bite", "nibble"], hunger: +3, message: "🍽️ You had a snack. Hunger +3." },
  meal: { keywords: ["meal", "lunch", "dinner"], hunger: +10, message: "🍽️ You ate a meal. Hunger +10." },
  feast: { keywords: ["feast", "banquet"], hunger: +20, message: "🍽️ You feasted. Hunger +20." },
  drink: { keywords: ["drink", "water", "sip"], thirst: +3, message: "💧 You drank water. Thirst +3." },
  nap: { keywords: ["nap", "doze"], fatigue: +10, hunger: -2, thirst: -2, advanceTime: { hour: 4, minute: 0 }, message: "🛌 You took a nap." },
  sleep: { keywords: ["sleep", "rest"], fatigue: +20, hunger: -5, thirst: -5, advanceTime: { hour: 8, minute: 0 }, message: "🛌 You slept." }
};

// 🧠 Emotion & Relationship Parser
function parseEmotionFromPrompt(text) {
  const emotionMap = {
    joy: ["laugh", "smile", "cheer"],
    fear: ["panic", "hide", "tremble"],
    anger: ["shout", "rage", "fight"],
    sadness: ["cry", "weep", "mourn"],
    calm: ["breathe", "relax", "meditate"]
  };

  for (const [emotion, triggers] of Object.entries(emotionMap)) {
    if (triggers.some(word => text.toLowerCase().includes(word))) {
      bumpEmotion(emotion, 5);
      _emotion_warningMessage = `🎭 Emotion spike → ${emotion.toUpperCase()} +5`;
    }
  }

  const typeMatch = text.match(/\b(friend|lover|family|associate|enemy|mentor|rival)\b/i);
  const valueMatch = text.match(/\b(?:trust|affection|bond|respect)\s*(\d{1,3})\b/i);
  if (typeMatch) setRelationshipType(capitalize(typeMatch[1]));
  if (valueMatch) state._relationship_value = clampRelationship(parseInt(valueMatch[1]));
}

// ❤️ Relationship Parser
function parseRelationshipFromPrompt(text) {
  console.log("🔧 parseRelationshipFromPrompt() called");
  const lower = text?.toLowerCase?.() ?? "";

  const typeMatch = lower.match(/\b(friend|lover|family|associate|enemy|mentor|rival)\b/);
  if (typeMatch) {
    const type = capitalize(typeMatch[1]);
    setRelationshipType(type);
    logToDebugCard(`❤️ Relationship type set to: ${type}`);
  }

  const valueMatch = lower.match(/\b(?:trust|affection|bond|respect)\s*(\d{1,3})\b/);
  if (valueMatch) {
    const value = clampRelationship(parseInt(valueMatch[1]));
    state._relationship_value = value;
    logToDebugCard(`❤️ Relationship value set to: ${value}`);
  }

  const type = state._relationship_type ?? "Unknown";
  const value = state._relationship_value ?? 0;
  const relEmoji = {
    Friend: "🧑‍🤝‍🧑", Lover: "💕", Family: "👪", Unknown: "❔"
  }[type] || "❔";
  const status = value >= 75 ? "deep" : value >= 40 ? "growing" : value >= 10 ? "strained" : "distant";
  _relationship_statusMessage = `❤️ ${relEmoji} ${type} (${status})`;
}

// 🕒 Time Parser
function parseTimeFromPrompt(text) {
  console.log("🔧 parseTimeFromPrompt() called");
  const lower = text?.toLowerCase?.() ?? "";

  for (const key in TimeCommands) {
    const cmd = TimeCommands[key];
    if (cmd.keywords.some(k => lower.includes(k))) {
      logToDebugCard(cmd.message);
      _time_overlayMessage = cmd.message;
      updateTimeDescription(cmd.message);
      advanceTimeBy(cmd.advance.hour, cmd.advance.minute);
      TimeWeatherEngine.updateWeather();
    }
  }
}

// 🌦️ Weather Parser
function parseWeatherFromPrompt(text) {
  console.log("🔧 parseWeatherFromPrompt() called");
  const lower = text?.toLowerCase?.() ?? "";

  if (/\b(snow|blizzard|frost|cold)\b/.test(lower)) state._weather_type = "❄️ Snow";
  else if (/\b(rain|storm|wet|downpour)\b/.test(lower)) state._weather_type = "🌧️ Rain";
  else if (/\b(clear|sunny|bright)\b/.test(lower)) state._weather_type = "☀️ Clear";
  else if (/\b(cloudy|overcast|gray)\b/.test(lower)) state._weather_type = "☁️ Overcast";

  if (/\b(full moon|bright moon|lunar peak)\b/.test(lower)) state._weather_moon = "🌕 Full Moon";
  else if (/\b(new moon|dark moon|lunar void)\b/.test(lower)) state._weather_moon = "🌑 New Moon";

  if (/\b(spring|blossom|bloom)\b/.test(lower)) state._weather_season = "Spring";
  else if (/\b(summer|heat|sun)\b/.test(lower)) state._weather_season = "Summer";
  else if (/\b(fall|autumn|leaves)\b/.test(lower)) state._weather_season = "Fall";
  else if (/\b(winter|snow|cold)\b/.test(lower)) state._weather_season = "Winter";
}

// 🍽️ Survival Parser
function parseSurvivalFromPrompt(text) {
  const lower = text.toLowerCase();
  for (const key in SurvivalCommands) {
    const cmd = SurvivalCommands[key];
    if (cmd.keywords.some(k => lower.includes(k))) {
      applyStatChange(cmd);
      _survival_recoveryMessage = cmd.message;
      updateSurvivalDescription(cmd.message);
      logToDebugCard(cmd.message);
      if (cmd.advanceTime) {
        advanceTimeBy(cmd.advanceTime.hour, cmd.advanceTime.minute);
        TimeWeatherEngine.advance();
      }
    }
  }

  // 🔧 Recovery triggers
  SurvivalEngine.checkRecoveryTriggers(text);
}

// 🧰 Inventory Actions
function addInventoryItem(item) {
  const normalized = item.trim().toLowerCase();
  if (!state._inventory_items.some(i => i.toLowerCase() === normalized)) {
    state._inventory_items.push(item.trim());
    logToDebugCard(`🧳 Added item: ${item.trim()}`);
  }
}

function removeInventoryItem(item) {
  state._inventory_items = state._inventory_items.filter(i => i.toLowerCase() !== item.trim().toLowerCase());
  logToDebugCard(`🧹 Removed item: ${item.trim()}`);
}

// 🩹 Injury Actions
function addInjury(part, severity = 50) {
  const clamped = Math.max(1, Math.min(100, parseInt(severity)));
  state._injury_status[part] = clamped;
  logToDebugCard(`🩹 Injury added: ${part} → ${clamped}`);
}

function healInjury(part) {
  delete state._injury_status[part];
  logToDebugCard(`💊 Injury healed: ${part}`);
}


// 🍽️🧳🩹 SurvivalEngine Core
const SurvivalEngine = {
  // 🔧 Load survival stats, inventory, and injuries from cards
  load: function () {
    console.log("🍽️ SurvivalEngine.load() called");

    const statsCard = getSurvivalStatsCard?.();
    const inventoryCard = getInventoryCard?.();
    const injuryCard = getInjuryCard?.();

    state._survival_hunger = readSetting(statsCard, "Hunger", Defaults.survival_hunger);
    state._survival_thirst = readSetting(statsCard, "Thirst", Defaults.survival_thirst);
    state._survival_fatigue = readSetting(statsCard, "Fatigue", Defaults.survival_fatigue);

    const inventoryMatch = inventoryCard?.entry?.match(/> Inventory: (.+)/);
    state._inventory_items = inventoryMatch ? inventoryMatch[1].split(",").map(i => i.trim()) : [];

    const injuryMatch = injuryCard?.entry?.match(/> Injuries: (.+)/);
    try {
      state._injury_status = injuryMatch ? JSON.parse(injuryMatch[1]) : {};
    } catch {
      state._injury_status = {};
      logToDebugCard("⚠️ Failed to parse injury JSON");
    }
  },

  // 🔧 Save updated survival stats, inventory, and injuries to cards
  save: function () {
    console.log("🍽️ SurvivalEngine.save() called");

    validateSurvivalState(); // ✅ Ensure stats are not NaN before saving

    const statsCard = getSurvivalStatsCard?.();
    const inventoryCard = getInventoryCard?.();
    const injuryCard = getInjuryCard?.();

    if (statsCard) {
      statsCard.entry = `> Hunger: ${state._survival_hunger}
> Thirst: ${state._survival_thirst}
> Fatigue: ${state._survival_fatigue}
> Last Action: ${_survival_recoveryMessage || _survival_statDeltaMessage || "none"}`;
    }

    if (inventoryCard) {
      inventoryCard.entry = `> Inventory: ${state._inventory_items.join(", ")}`;
    }

    if (injuryCard) {
      injuryCard.entry = `> Injuries: ${JSON.stringify(state._injury_status)}`;
    }
  },

  // 🔧 Apply decay to survival stats
  decay: function () {
    const msg = "🍽️ SurvivalEngine.decay() called";
    console.log(msg);
    logToDebugCard(msg);

    const settings = getSurvivalStatsSettingsCard?.();
    const decay = readSetting(settings, "Decay Per Action", 2);
    logToDebugCard(`🍽️ Applying decay: -${decay} to all stats`);
    applyStatChange({ hunger: -decay, thirst: -decay, fatigue: -decay });
  },

  // 🔧 Check for collapse conditions and reset if needed
  collapseCheck: function () {
    console.log("🍽️ SurvivalEngine.collapseCheck() called");

    const settings = getSurvivalStatsSettingsCard?.();
    const collapseHunger = readSetting(settings, "Collapse Hunger", 10);
    const collapseThirst = readSetting(settings, "Collapse Thirst", 10);
    const collapseFatigue = readSetting(settings, "Collapse Fatigue", 10);

    if (
      state._survival_hunger <= 0 ||
      state._survival_thirst <= 0 ||
      state._survival_fatigue <= 0
    ) {
      console.log("⚠️ Collapse triggered — resetting stats and advancing time");
      applyStatChange({
        hunger: collapseHunger - state._survival_hunger,
        thirst: collapseThirst - state._survival_thirst,
        fatigue: collapseFatigue - state._survival_fatigue
      });
      state._time_hour = Defaults.time_hour;
      state._time_minute = Defaults.time_minute;
      state._time_day += 1;
      _survival_recoveryMessage = "😵 You collapsed and wake up the next morning.";
    }
  },

  // 🔧 Generate warning messages for low survival
  checkWarnings: function () {
    _survival_warningMessage = "";

    const warnings = [];

    function warn(stat, value, emoji) {
      if (value <= 25) return `${emoji} ${stat} is critically low!`;
      if (value <= 50) return `${emoji} ${stat} is dangerously low.`;
      if (value <= 75) return `${emoji} ${stat} is getting low.`;
      return null;
    }

    const hungerWarn = warn("Hunger", state._survival_hunger, "🍽️");
    const thirstWarn = warn("Thirst", state._survival_thirst, "💧");
    const fatigueWarn = warn("Fatigue", state._survival_fatigue, "🛌");

    [hungerWarn, thirstWarn, fatigueWarn].forEach(msg => {
      if (msg) warnings.push(`> ${msg}`);
    });

    _survival_warningMessage = warnings.join("\n");
  },

  // 🔧 Format survival status for overlay
  formatStatus: function ({ showSurvival = true, showInventory = true, showInjuries = true } = {}) {
    const hunger = state._survival_hunger ?? 0;
    const thirst = state._survival_thirst ?? 0;
    const fatigue = state._survival_fatigue ?? 0;

    const hungerEmoji = hunger >= 80 ? "🍽️" : hunger >= 50 ? "🥪" : "⚠️";
    const thirstEmoji = thirst >= 80 ? "💧" : thirst >= 50 ? "🥤" : "⚠️";
    const fatigueEmoji = fatigue >= 80 ? "🛌" : fatigue >= 50 ? "😴" : "⚠️";

    const blocks = [];

    if (showSurvival) {
      blocks.push(`> ${hungerEmoji} Hunger: ${hunger}  ${fatigueEmoji} Fatigue: ${fatigue}  ${thirstEmoji} Thirst: ${thirst}`);
    }

    if (showInventory) {
      const inventory = state._inventory_items?.length
        ? state._inventory_items.map(item => `🧰 ${item}`).join("\n")
        : "🧰 Inventory: (empty)";
      blocks.push(inventory);
    }

    if (showInjuries) {
      const injuries = Object.keys(state._injury_status ?? {}).length
        ? Object.entries(state._injury_status).map(([key, val]) => `🩹 ${key}: ${val}`).join("\n")
        : "🩹 Status: No injuries";
      blocks.push(injuries);
    }

    return blocks.join("\n");
  },

  // 🔧 Check for recovery triggers in prompt
  checkRecoveryTriggers: function (text) {
    console.log("🍽️ SurvivalEngine.checkRecoveryTriggers() called");
    const lower = text?.toLowerCase?.() ?? "";

    let healed = false;
    let rested = false;

    if (RecoveryTriggers.heal.some(k => lower.includes(k))) {
      const injuries = Object.keys(state._injury_status ?? {});
      if (injuries.length) {
        injuries.forEach(part => healInjury(part));
        healed = true;
      }
    }

    if (RecoveryTriggers.rest.some(k => lower.includes(k))) {
      applyStatChange({ hunger: +5, thirst: +5, fatigue: +15 });
      rested = true;
    }

    if (healed && rested) {
      _survival_recoveryMessage = "💊 You rested and treated your wounds.";
    } else if (healed) {
      _survival_recoveryMessage = "🩹 You treated your injuries.";
    } else if (rested) {
      _survival_recoveryMessage = "🛌 You took a moment to recover.";
    }
  }
};

// ✅ Validator outside the engine
function validateSurvivalState() {
  if (isNaN(state._survival_hunger)) state._survival_hunger = Defaults.survival_hunger;
  if (isNaN(state._survival_thirst)) state._survival_thirst = Defaults.survival_thirst;
  if (isNaN(state._survival_fatigue)) state._survival_fatigue = Defaults.survival_fatigue;
}

// 🍽️ SurvivalEngine Hooks
const SurvivalEmotionEngineHooks = {
  onInput: function (text) {
    console.log("🟢 SurvivalEmotionEngineHooks.onInput called");
    state._survival_lastInputText = text;

    parseSurvivalFromPrompt(text);
    parseEmotionFromPrompt(text);
    parseRelationshipFromPrompt?.(text);

    return text;
  },

  onContext: function (text) {
    console.log("🟡 SurvivalEmotionEngineHooks.onContext called");

    SurvivalEngine.load();

    _survival_recoveryMessage = "";
    _survival_statDeltaMessage = "";
    _survival_warningMessage = "";
    _emotion_warningMessage = "";
    _emotion_collapseMessage = "";
    state._survival_collapseMessage = "";

    const prevHunger = state._survival_hunger;

    const prevThirst = state._survival_thirst;
    const prevFatigue = state._survival_fatigue;

    SurvivalEngine.checkRecoveryTriggers(state._survival_lastInputText);
    SurvivalEngine.decay();
    const collapseMessage = SurvivalEngine.collapseCheck();
    SurvivalEngine.checkWarnings();
    SurvivalEngine.save();

    const dh = state._survival_hunger - prevHunger;
    const dt = state._survival_thirst - prevThirst;
    const df = state._survival_fatigue - prevFatigue;

    _survival_statDeltaMessage = `> 🍽️ Hunger: ${dh >= 0 ? "+" : ""}${dh}  🛌 Fatigue: ${df >= 0 ? "+" : ""}${df}  💧 Thirst: ${dt >= 0 ? "+" : ""}${dt}`;
    state._survival_collapseMessage = collapseMessage;

    // 🎭 Emotion collapse + warnings
    const emotionSettings = getEmotionSettingsCard();
    if (readSetting(emotionSettings, "Collapse Enabled", true)) {
      StoryArcEngine.checkEmotionCollapse();
    }
    StoryArcEngine.generateEmotionWarnings();

    return text;
  },

  onOutput: function (text) {
    console.log("🟣 SurvivalEmotionEngineHooks.onOutput called");

    const settings = getSurvivalStatsSettingsCard();
    const showSurvival = readSetting(settings, "ShowSurvival", true);
    const showInventory = readSetting(settings, "ShowInventory", true);
    const showInjuries = readSetting(settings, "ShowInjuries", true);

    const overlay = getOverlay(); // unified overlay block
    const collapseMessage = state._survival_collapseMessage || _emotion_collapseMessage || "";

    let statusBlock = "";

    if (showSurvival || showInventory || showInjuries) {
      statusBlock = SurvivalEngine.formatStatus({ showSurvival, showInventory, showInjuries });
    }

    return collapseMessage
      ? `${text}\n\n${collapseMessage}\n\n${overlay}${statusBlock}`
      : `${text}\n\n${overlay}${statusBlock}`;
  }
};

// 🕒🌦️ TimeWeatherEngine
// 🕒🌦️ TimeWeatherEngine
const TimeWeatherEngine = {
  // 🔧 Load time and weather state from card
  load: function () {
    console.log("🕒🌦️ TimeWeatherEngine.load() called");
    const card = getCard("Time & Day");

    state._time_year = parseInt(readSetting(card, "Year", Defaults.time_year)) || Defaults.time_year;
    state._time_day = parseInt(readSetting(card, "Day", Defaults.time_day)) || Defaults.time_day;
    state._time_hour = parseInt(readSetting(card, "Hour", Defaults.time_hour)) || Defaults.time_hour;
    state._time_minute = parseInt(readSetting(card, "Minute", Defaults.time_minute)) || Defaults.time_minute;

    state._weather_type = readSetting(card, "Weather", Defaults.weather_type);
    state._weather_temp = parseInt(readSetting(card, "Temperature", Defaults.weather_temp)) || Defaults.weather_temp;
    state._weather_moon = readSetting(card, "Moon Phase", Defaults.weather_moon);
    state._weather_season = readSetting(card, "Season", Defaults.weather_season);

    normalizeTimeState();
  },

  // 🔧 Save updated time/weather state and overlay to card
  save: function () {
    console.log("🕒🌦️ TimeWeatherEngine.save() called");
    const card = getCard("Time & Day");
    if (!card) return;

    card.entry = `> Year: ${state._time_year}
> Day: ${state._time_day}
> Hour: ${state._time_hour}
> Minute: ${state._time_minute}
> HourStr: ${String(state._time_hour).padStart(2, "0")}
> MinuteStr: ${String(state._time_minute).padStart(2, "0")}
> Phase: ${getPhase(state._time_hour)}
> Weather: ${state._weather_type}
> Temperature: ${state._weather_temp}°F
> Moon Phase: ${state._weather_moon}
> Season: ${state._weather_season}
> Last Action: ${_time_overlayMessage || "none"}
> Visual:\n${formatTimeWeatherOverlay()}`;

    updateTimeDescription?.(_time_overlayMessage || "none");
  },

  // 🔧 Advance time and handle rollover
  advance: function () {
    console.log("🕒🌦️ TimeWeatherEngine.advance() called");
    const settings = getCard("Time Settings");
    const minutes = parseInt(readSetting(settings, "Minutes Per Action", 10)) || 10;

    advanceTimeBy(0, minutes);
    TimeWeatherEngine.updateWeather();
  },

  // 🔧 Update weather and moon phase based on season and day
  updateWeather: function () {
    const settings = getCard("Weather Settings");
    if (!readSetting(settings, "Enabled", true)) return;

    const day = state._time_day;
    const seasonal = readSetting(settings, "SeasonalLogic", true);

    if (!state._weather_season) {
      state._weather_season = seasonal ? getSeason(day) : Defaults.weather_season;
    }

    const season = state._weather_season;
    const moonIndex = day % MoonPhases.length;
    state._weather_moon = MoonPhases[moonIndex];

    const weightedWeather = getWeatherBySeason(season);
    state._weather_type = weightedWeather[Math.floor(Math.random() * weightedWeather.length)];

    const baseTemps = SeasonalTemperatureRanges[season] || { min: 60, max: 80 };
    const fluctuation = Math.floor(Math.random() * 10) - 5;
    state._weather_temp = Math.max(baseTemps.min, Math.min(baseTemps.max, baseTemps.min + fluctuation));
  },

  // 🔧 Format time/weather status for overlay
  formatStatus: function () {
    const timeCard = getCard("Time & Day");
    const weatherCard = getCard("Weather & Environment");

    const time = timeCard?.entry.match(/> HourStr: (\d+)/)?.[1] ?? "??";
    const minute = timeCard?.entry.match(/> MinuteStr: (\d+)/)?.[1] ?? "??";
    const phase = timeCard?.entry.match(/> Phase: (.+)/)?.[1] ?? "Unknown";
    const day = timeCard?.entry.match(/> Day: (\d+)/)?.[1] ?? "?";

    const weather = weatherCard?.entry.match(/> Weather: (.+)/)?.[1] ?? "Unknown";
    const temp = weatherCard?.entry.match(/> Temperature: (.+)/)?.[1] ?? "??°F";
    const moon = weatherCard?.entry.match(/> Moon Phase: (.+)/)?.[1] ?? "🌑";

    return `> 🕒 Day ${day}, ${phase} ${time}:${minute}  🌡️ ${temp}  ${moon}  ${weather}`;
  },

  // 🔧 Trigger time reset from prompt cues
  checkTimeTriggers: function (text) {
    if (/\b(sleep|nap|rest|lie down)\b/i.test(text)) {
      logToDebugCard("🛌 Player slept. Advancing to next morning.");
      advanceTimeBy(8, 0);
      state._time_hour = Defaults.time_hour;
      state._time_minute = Defaults.time_minute;
      TimeWeatherEngine.updateWeather();
    }
  }
};


// 🕒🌦️ TimeWeatherEngine Hooks
const TimeWeatherEngineHooks = {
  onInput: function (text) {
    console.log("🟢 TimeWeatherEngineHooks.onInput called");
    state._time_lastInputText = text;

    parseTimeFromPrompt(text);
    parseWeatherFromPrompt(text);
    return text;
  },

  onContext: function (text) {
    console.log("🟡 TimeWeatherEngineHooks.onContext called");

    TimeWeatherEngine.load();
    _time_overlayMessage = ""; // reset overlay
    TimeWeatherEngine.checkTimeTriggers(state._time_lastInputText); // sleep/nap triggers
    TimeWeatherEngine.advance(); // advance time
    TimeWeatherEngine.updateWeather(); // refresh weather
    return text;
  },

 onOutput: function (text) {
  console.log("🟣 TimeWeatherEngineHooks.onOutput called");

  TimeWeatherEngine.save();

  const overlay = getOverlay(); // unified overlay block
  const statusBlock = TimeWeatherEngine.formatStatus(); // includes time, weather, moon

  return `${text}\n\n${overlay}${statusBlock}`;
}
}

// 🧠 StoryArcEngine
const StoryArcEngine = {
  load: function () {
    const settings = getStoryArcSettingsCard();
    const arc = getStoryArcCard();
    const emotionCard = getEmotionRelationshipCard();
    const emotionSettings = getEmotionSettingsCard();

    if (!settings || !arc || !emotionCard) {
      console.log("⚠️ Story Arc or Emotion cards not found during load");
      return;
    }

    const turnsMatch = settings.entry.match(/turnsPerAICall\s*=\s*(\d+)/);
    if (turnsMatch) state.turnsPerAICall = Number(turnsMatch[1]);

    const limitMatch = settings.entry.match(/attemptLimit\s*=\s*(\d+)/);
    if (limitMatch) state.attemptLimit = Number(limitMatch[1]);

    const removalMatch = settings.entry.match(/turnsPerElemRemoval\s*=\s*(\d+)/);
    if (removalMatch) state.turnsPerElemRemoval = Number(removalMatch[1]);

    const promptMatch = settings.entry.match(/arcPrompt\s*=\s*(<<[\s\S]*?>>)/);
    if (promptMatch) state.arcPrompt = promptMatch[1];

    state.storyArc = arc.entry;

    // 🎭 Emotion stats
    state._emotion_joy = parseInt(emotionCard.entry.match(/> Joy: (\d+)/)?.[1] ?? Defaults.emotion_joy);
    state._emotion_fear = parseInt(emotionCard.entry.match(/> Fear: (\d+)/)?.[1] ?? Defaults.emotion_fear);
    state._emotion_anger = parseInt(emotionCard.entry.match(/> Anger: (\d+)/)?.[1] ?? Defaults.emotion_anger);
    state._emotion_sadness = parseInt(emotionCard.entry.match(/> Sadness: (\d+)/)?.[1] ?? Defaults.emotion_sadness);
    state._emotion_calm = parseInt(emotionCard.entry.match(/> Calm: (\d+)/)?.[1] ?? Defaults.emotion_calm);

    // ❤️ Relationship
    state._relationship_type = emotionCard.entry.match(/> Relationship: (\w+)/)?.[1] ?? Defaults.relationship_type;
    state._relationship_value = parseInt(emotionCard.entry.match(/\((\d+)\)/)?.[1] ?? Defaults.relationship_value);

    // 🧠 Emotion settings
    state._emotion_overlayStyle = readSetting(emotionSettings, "Overlay Style", "both");
    state._emotion_collapseEnabled = readSetting(emotionSettings, "Collapse Enabled", true);
    state._emotion_warningThreshold = readSetting(emotionSettings, "Warning Threshold", 75);
  },

  checkEmotionCollapse: function () {
    if (
      state._emotion_joy >= 100 &&
      state._emotion_fear >= 100 &&
      state._emotion_anger >= 100 &&
      state._emotion_sadness >= 100 &&
      state._emotion_calm >= 100
    ) {
      state._emotion_joy = Defaults.emotion_joy;
      state._emotion_fear = Defaults.emotion_fear;
      state._emotion_anger = Defaults.emotion_anger;
      state._emotion_sadness = Defaults.emotion_sadness;
      state._emotion_calm = Defaults.emotion_calm;
      _emotion_collapseMessage = "🎭 Emotional overload! You reset to a neutral state.";
      updateEmotionDescription(_emotion_collapseMessage);
      logToDebugCard(_emotion_collapseMessage);
    } else {
      _emotion_collapseMessage = "";
    }
  },

  generateEmotionWarnings: function () {
    _emotion_warningMessage = "";

    function warn(stat, value, emoji) {
      if (value >= 90) return `${emoji} ${stat} is overwhelming!`;
      if (value >= 75) return `${emoji} ${stat} is intense.`;
      return null;
    }

    const warnings = [
      warn("Joy", state._emotion_joy, "😊"),
      warn("Fear", state._emotion_fear, "😨"),
      warn("Anger", state._emotion_anger, "😠"),
      warn("Sadness", state._emotion_sadness, "😢"),
      warn("Calm", state._emotion_calm, "😌")
    ].filter(Boolean).map(msg => `> ${msg}`);

    _emotion_warningMessage = warnings.join("\n");
  },

  feedPrompt: function (text) {
    if (state.unlockFeedAIPrompt) {
      state.unlockFeedAIPrompt = false;
      return `${state.arcPrompt}\n${text}`;
    }
    return text;
  },

  injectArc: function (text) {
    if (!state.saveOutput) {
      return text.replace(/\[Author's note:([\s\S]*?)]/,
        (_, noteContent) => `[Author's note:${noteContent}\n${state.storyArc}]`
      );
    }
    return text;
  },

  saveArc: function (text) {
    const arc = getStoryArcCard();
    if (!arc) return text;

    arc.entry = state.storyArc || "";
    return text;
  },

  callAITrigger: function (text) {
    if ((state.turnsSinceLastArc ?? 0) >= state.turnsPerAICall) {
      state.unlockFeedAIPrompt = true;
      state.turnsSinceLastArc = 0;
    }
    return text;
  },

  removeArcElement: function () {
    if ((state.turnsSinceLastPrune ?? 0) >= state.turnsPerElemRemoval) {
      // Placeholder for pruning logic
      state.turnsSinceLastPrune = 0;
    }
  },

  incrementTurn: function () {
    state.turnsSinceLastArc = (state.turnsSinceLastArc ?? 0) + 1;
    state.turnsSinceLastPrune = (state.turnsSinceLastPrune ?? 0) + 1;
  },

  // 🎭 Format emotion + ❤️ relationship overlay
  formatStatus: function () {
    const joy = state._emotion_joy ?? 0;
    const fear = state._emotion_fear ?? 0;
    const anger = state._emotion_anger ?? 0;
    const sadness = state._emotion_sadness ?? 0;
    const calm = state._emotion_calm ?? 0;

    const type = state._relationship_type ?? "Unknown";
    const value = state._relationship_value ?? 0;
    const emoji = {
      Friend: "🧑‍🤝‍🧑", Lover: "💕", Family: "👪", Enemy: "⚔️", Mentor: "🧙", Rival: "🔥"
    }[type] ?? "❔";

    return [
      `> 🎭 Emotions → 😊 Joy: ${joy}  😨 Fear: ${fear}  😠 Anger: ${anger}  😢 Sadness: ${sadness}  😌 Calm: ${calm}`,
      `> ❤️ Relationship: ${emoji} ${type} (${value})`
    ].join("\n");
  }
};

// 🧠 StoryArcEngine Hooks
const StoryArcEngineHooks = {
  onInput: function (text) {
    if (text.includes("/redo arc")) {
      state.unlockFeedAIPrompt = true;
      state.saveOutput = true;
      return "<< ➰ Regenerating Story Arc... >>";
    }

    parseEmotionFromPrompt(text);
    parseRelationshipFromPrompt(text);

    if (text === "/emotion") {
      _emotion_collapseMessage = formatEmotionOverlay();
      return "<< Emotion status displayed >>";
    }

    if (text === "/relationship") {
      _emotion_collapseMessage = formatRelationshipOverlay();
      return "<< Relationship status displayed >>";
    }

    return text;
  },

  onContext: function (text) {
    StoryArcEngine.load();

    const settings = getEmotionSettingsCard();

    if (readSetting(settings, "Collapse Enabled", true)) {
      StoryArcEngine.checkEmotionCollapse();
      StoryArcEngine.generateEmotionWarnings();
    }

    text = StoryArcEngine.feedPrompt(text);
    text = StoryArcEngine.injectArc(text);
    return text;
  },

  onOutput: function (text) {
    console.log("🟣 StoryArcEngineHooks.onOutput called");

    const settings = getEmotionSettingsCard();
    const style = readSetting(settings, "Overlay Style", "both");

    text = StoryArcEngine.saveArc(text);
    text = StoryArcEngine.callAITrigger(text);
    StoryArcEngine.removeArcElement();
    StoryArcEngine.incrementTurn();

    if (style === "visual" || style === "both") {
      const statusBlock = StoryArcEngine.formatStatus();
      return `${text}\n\n${statusBlock}`;
    }

    return text;
  }
};
