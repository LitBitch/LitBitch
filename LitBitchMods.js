//Drop This Bitch In Input!
const modifier = (text) => {
   text = LitBitchHooks.onInput(text);     // 🧠 Interpret + update entry
  return { text };
}
// Don't modify this part
modifier(text);

//Drop This Bitch In Context!
const modifier = (text) => {
   text = LitBitchHooks.onContext(text);   // 🧠 Interpret + update entry
  return { text };
}
// Don't modify this part
modifier(text);


//Drop This Bitch In OutPut!
const modifier = (text) => {
  text = LitBitchHooks.onOutput(text);    // 🧠 Update entry only
  return { text };
}
// Don't modify this part
modifier(text);
