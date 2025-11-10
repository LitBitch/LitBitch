// INPUT
const modifier = (text) => {
  text = AutoCards("input", text);                      // 🧱 AutoCard system creates cards
  text = TimeWeatherEngineHooks.onInput(text);          // 🕒🌦️ Time & Weather
  text = SurvivalEmotionEngineHooks.onInput(text);      // 🍽️🎭 Survival & Emotion
  text = StoryArcEngineHooks.onInput(text);             // 🧠 Story Arc
  return { text };
};
modifier(text);

//CONTEXT
const modifier = (text) => {
 text = TimeWeatherEngineHooks.onContext(text);
  text = SurvivalEmotionEngineHooks.onContext(text);
  text = StoryArcEngineHooks.onContext(text);
  return { text };
};
modifier(text);

//OUTPUT
const modifier = (text) => {
  text = TimeWeatherEngineHooks.onOutput(text);
  text = SurvivalEmotionEngineHooks.onOutput(text);
  text = StoryArcEngineHooks.onOutput(text);
  return { text };
};
modifier(text);