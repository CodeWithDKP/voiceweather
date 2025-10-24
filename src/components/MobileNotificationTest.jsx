// MobileNotificationTest.jsx
import React, { useState } from "react";


const MobileNotificationTest = () => {
  const [permission, setPermission] = useState(Notification.permission);

  // Request browser notification permission
  const requestPermission = async () => {
    if (!("Notification" in window)) {
      alert("Your browser does not support notifications!");
      return;
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") alert("Notifications enabled!");
  };

  // Send notification and play audio
  const sendTestNotification = () => {
    if (permission !== "granted") {
      alert("Please allow notifications first!");
      return;
    }

    // 1️⃣ Show browser notification
    const notification = new Notification("Kurnool Weather Alert", {
      body: "Varsham pade avakasam undhi Eroju",
      icon: "/weather-icon.png", // optional
    });

    
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mobile Notification Test</h2>
      <p>Notification permission: {permission}</p>
      <button
        onClick={requestPermission}
        style={{ padding: "10px", margin: "10px" }}
      >
        Enable Notifications
      </button>
      <button
        onClick={sendTestNotification}
        style={{ padding: "10px", margin: "10px" }}
      >
        Send Test Notification
      </button>
    </div>
  );
};

export default MobileNotificationTest;
