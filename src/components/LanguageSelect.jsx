import React from "react";

export default function LanguageSelect({ setLanguage }) {
  return (
    <div className="my-3">
      <button className="btn btn-outline-primary mx-2" onClick={() => setLanguage("en")}>
        English
      </button>
      <button className="btn btn-outline-success mx-2" onClick={() => setLanguage("te")}>
        Telugu
      </button>
    </div>
  );
}
