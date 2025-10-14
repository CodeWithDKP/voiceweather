import React, { useEffect, useState } from "react";
import { fetchWeather } from "./services/fetchWeather";
import { playTeluguWeather } from "./services/playTeluguAudio";
import DayButtons from "./components/DayButtons";
import WeatherCard from "./components/WeatherCard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [activeDay, setActiveDay] = useState(null); // "today" | "tomorrow" | "dayafter"

  useEffect(() => {
    const fetchData = () => fetchWeather().then(setData);
    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000); // refresh every 10 min
    return () => clearInterval(interval);
  }, []);

  // callback called when audio/video finished
  const onVoiceEnd = () => {
    setActiveDay(null);
  };

  const handleClick = (weather, dayLabel) => {
    if (!weather) return;
    setSelectedWeather(weather);
    setActiveDay(dayLabel);

    // playTeluguWeather will call onFinish() when audio ends
    playTeluguWeather(dayLabel, weather.desc, onVoiceEnd);
  };

  if (!data.length) return <p className="text-center mt-5">लोड होता आहे...</p>;

  return (
    <div className="app-root">
      <div className="container text-center main-container">
        <h2 className="app-title">బెతపల్లి వాతావరణం</h2>

        <DayButtons data={data} onClick={handleClick} activeDay={activeDay} />

        <WeatherCard weather={selectedWeather} />

        <p className="mt-3 text-muted telugu-note">
          వాతావరణం వినడానికి బటన్ నొక్కండి.
        </p>
      </div>
    </div>
  );
}

export default App;
