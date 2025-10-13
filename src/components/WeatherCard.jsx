import React from "react";

export default function WeatherCard({ weather, language }) {
  if (!weather) return null;

  return (
    <div className="card mt-3 mx-auto" style={{ maxWidth: "350px" }}>
      <div className="card-body">
        <h5 className="card-title">{language === "en" ? "Weather" : "వాతావరణం"}</h5>
        <p className="card-text">
          {language === "en"
            ? `${weather.desc}, Temp: ${Math.round(weather.temp)}°C`
            : `${weather.desc} గా ఉంది, ఉష్ణోగ్రత: ${Math.round(weather.temp)}°C`}
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.desc}
        />
      </div>
    </div>
  );
}
