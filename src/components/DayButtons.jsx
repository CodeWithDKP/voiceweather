import React from "react";

export default function DayButtons({ data, language, onClick }) {
  const today = data[0];
  const tomorrow = data[1];
  const dayafter = data[2];

  return (
    <div className="d-flex justify-content-center gap-2 mt-3">
      <button className="btn btn-primary" onClick={() => onClick(today, "today")}>
        {language === "en" ? "Today" : "ఈ రోజు"}
      </button>
      <button className="btn btn-primary" onClick={() => onClick(tomorrow, "tomorrow")}>
        {language === "en" ? "Tomorrow" : "రేపు"}
      </button>
      <button className="btn btn-primary" onClick={() => onClick(dayafter, "dayafter")}>
        {language === "en" ? "Day After" : "నేపటి తర్వాత"}
      </button>
    </div>
  );
}
