
function mapDescToVideo(desc) {
  if (!desc) return null;
  const d = desc.toLowerCase();
  if (d.includes("rain") || d.includes("drizzle")) return "/videos/rain.mp4";
  if (d.includes("thunder") || d.includes("storm")) return "/videos/thunder.mp4";
  if (d.includes("cloud")) return "/videos/clouds.mp4";
  if (d.includes("fog") || d.includes("mist") || d.includes("haze")) return "/videos/fog.mp4";
  // default sunny/clear
  return "/videos/clear.mp4";
}

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  const videoSrc = mapDescToVideo(weather.desc);

  return (
    <div className="weather-card">
      {videoSrc && (
        <video
          className="bg-video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      <div className="weather-content">
        <h3 className="village-name">బెతపల్లి</h3>

        <div className="weather-main">
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.desc}
            className="weather-icon"
          />
          <div className="weather-text">
            <div className="weather-desc">{weather.desc} గా ఉంది</div>
            <div className="weather-temp">{Math.round(weather.temp)}°C</div>
          </div>
        </div>
      </div>
    </div>
  );
}
