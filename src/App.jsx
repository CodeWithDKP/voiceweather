import React, { useEffect, useState } from "react";
import { fetchWeather } from "./services/fetchWeather";
import { speakWeather } from "./services/speakWeather";
import { playTeluguWeather } from "./services/playTeluguAudio";
import LanguageSelect from "./components/LanguageSelect";
import DayButtons from "./components/DayButtons";
import WeatherCard from "./components/WeatherCard";
import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = useState([]);
  const [language, setLanguage] = useState("te");
  const [selectedWeather, setSelectedWeather] = useState(null);

  //useEffect(() => {
  // fetchWeather().then(setData);
  //}, []);
  useEffect(() => {
    const fetchData = () => {
      fetchWeather().then(setData);
    };

    fetchData(); // initial fetch
    const interval = setInterval(fetchData, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const handleClick = (weather, dayLabel) => {
    if (!weather) return;

    setSelectedWeather(weather);

    if (language === "te") {
      playTeluguWeather(dayLabel, weather.desc);
    } else {
      speakWeather(weather, language);
    }
  };

  if (!data.length) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container text-center mt-5">
      <h2>Bethapalli Weather</h2>
      <LanguageSelect setLanguage={setLanguage} />
      <DayButtons data={data} language={language} onClick={handleClick} />
      <WeatherCard weather={selectedWeather} language={language} />
      <p className="mt-3 text-muted">
        {language === "en"
          ? "Click a day to hear the weather report."
          : "వాతావరణం వినడానికి బటన్ నొక్కండి."}
      </p>
    </div>
  );
}

export default App;
