import React from "react";

export default function DayButtons({ data, onClick, activeDay }) {
  const today = data[0];
  const tomorrow = data[1];
  const dayafter = data[2];

  const btnClass = (label) =>
    `day-btn ${activeDay === label ? "day-btn-active" : ""}`;

  return (
    <div className="d-flex justify-content-center gap-3 mt-3 day-buttons-row">
      <button
        className={btnClass("today")}
        onClick={() => onClick(today, "today")}
      >
        ఈ రోజు
      </button>

      <button
        className={btnClass("tomorrow")}
        onClick={() => onClick(tomorrow, "tomorrow")}
      >
        రేపు
      </button>

      <button
        className={btnClass("dayafter")}
        onClick={() => onClick(dayafter, "dayafter")}
      >
        నేటి తర్వాత
      </button>
    </div>
  );
}
