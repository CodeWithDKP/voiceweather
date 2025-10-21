export async function fetchWeather(lat, lon) {
  const apiKey = "46eb0a3448985f2ad063e58c1b9e5286";

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  
  const grouped = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  const dates = Object.keys(grouped).slice(0, 3);
  return dates.map((date) => {
    const items = grouped[date];
    const noon = items.find((i) => i.dt_txt.includes("12:00:00")) || items[0];
    return {
      date,
      temp: noon.main.temp,
      desc: noon.weather[0].main,
      icon: noon.weather[0].icon,
    };
  });
}
