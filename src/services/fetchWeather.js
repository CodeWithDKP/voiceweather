import { CONFIG } from "../config";

export async function fetchWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${CONFIG.lat}&lon=${CONFIG.lon}&appid=${CONFIG.apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  const grouped = {};
  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  const dates = Object.keys(grouped).slice(0, 3);
  return dates.map(date => {
    const items = grouped[date];
    const noon = items.find(i => i.dt_txt.includes("12:00:00")) || items[0];
    return {
      date,
      temp: noon.main.temp,
      desc: noon.weather[0].main, // 'Rain', 'Clear', etc.
      icon: noon.weather[0].icon
    };
  });
}
