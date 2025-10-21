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
  const [activeDay, setActiveDay] = useState(null);
  const [coords, setCoords] = useState(null); // Store lat/lon
  const [locationName, setLocationName] = useState(""); // Village/City
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Request user location
  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log(pos);
        
        setCoords({ lat: latitude, lon: longitude });
        setPermissionGranted(true);

        // Reverse geocode to get village/city/town
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          console.log(data);
          
          const { village, town, city, county, state, country } = data.address;
          setLocationName(village || town || city || county || state || country || "Unknown Location");
        } catch (err) {
          console.error("Reverse geocoding error:", err);
          setLocationName("Unknown Location");
        }
      },
      (err) => {
        console.error("Error getting location:", err);
        alert("Please allow location access to show your local weather.");
      }
    );
  };

  // Fetch weather whenever coords change
  useEffect(() => {
    if (!coords) return;
    const fetchData = async () => {
      const weatherData = await fetchWeather(coords.lat, coords.lon);
      setData(weatherData);
    };
    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000); // refresh every 10 min
    return () => clearInterval(interval);
  }, [coords]);

  const onVoiceEnd = () => setActiveDay(null);

  const handleClick = (weather, dayLabel) => {
    if (!weather) return;
    setSelectedWeather(weather);
    setActiveDay(dayLabel);
    playTeluguWeather(dayLabel, weather.desc, onVoiceEnd, locationName);
  };

  // Show custom location permission popup
  if (!permissionGranted)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
        <h3 className="text-center mb-3"> Enable Location Access</h3>
        <p className="text-muted text-center w-75">
          We’ll use your location to show accurate weather for your area.
        </p>
        <button className="btn btn-primary" onClick={requestLocation}>
          Allow Location Access
        </button>
      </div>
    );

  if (!data.length) return <p className="text-center mt-5">లోడ్ అవుతోంది...</p>;

  return (
    <div className="app-root">
      <div className="container text-center main-container">
        <h2 className="app-title">🌦️ {locationName} వాతావరణం</h2>

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
