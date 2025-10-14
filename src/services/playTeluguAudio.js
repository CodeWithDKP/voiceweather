// src/services/playTeluguAudio.js

export const teluguAudioMap = {
  today: {
    clear: "/audio/today_clear.m4a",
    rain: "/audio/today_rain.m4a",
    clouds: "/audio/today_clouds.m4a",
  },
  tomorrow: {
    clear: "/audio/tomorrow_clear.m4a",
    rain: "/audio/tomorrow_rain.m4a",
    clouds: "/audio/tomorrow_clouds.m4a",
  },
  dayafter: {
    clear: "/audio/dayafter_clear.m4a",
    rain: "/audio/dayafter_rain.m4a",
    clouds: "/audio/dayafter_clouds.m4a",
  },
};

/**
 * playTeluguWeather(day, desc, onFinish)
 * - day: "today" | "tomorrow" | "dayafter"
 * - desc: string from API (e.g., "Rain" or "Clouds")
 * - onFinish: callback triggered when audio ends
 */
export function playTeluguWeather(day, desc, onFinish = () => {}) {
  if (!desc) {
    onFinish();
    return;
  }

  desc = desc.toLowerCase();
  let key = "clear";
  if (desc.includes("rain") || desc.includes("drizzle")) key = "rain";
  else if (desc.includes("cloud")) key = "clouds";

  const audioPath = teluguAudioMap[day]?.[key];
  if (!audioPath) {
    onFinish();
    return;
  }

  const audio = new Audio(audioPath);

  audio.onended = () => {
    try { onFinish(); } catch (e) {}
  };

  // in some browsers the play returns a Promise; catch rejections
  audio.play().catch((err) => {
    console.warn("Audio play failed:", err);
    onFinish();
  });

  // Also timeout safety: if audio file doesn't fire onended, reset after 8s
  setTimeout(() => {
    if (!audio.paused) return; // it's still playing
    // if already ended, do nothing
  }, 9000);
}
