export function speakWeather({ temp, desc }, language) {
  if (language === "te") return; // skip for Telugu (use audio files)

  const text = `The weather is ${desc} with a temperature around ${Math.round(temp)} degrees Celsius.`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}
