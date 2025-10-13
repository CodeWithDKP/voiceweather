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

export function playTeluguWeather(day, desc) {
  if (!desc) return;

  desc = desc.toLowerCase();
  let key = "clear";

  if (desc.includes("rain")) key = "rain";
  else if (desc.includes("cloud")) key = "clouds";

  const audioPath = teluguAudioMap[day]?.[key];
  if (!audioPath) return;

  const audio = new Audio(audioPath);
  audio.play();
}
