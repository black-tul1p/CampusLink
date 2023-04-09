import { Timer } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

const CountdownTimer = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = timestamp - now;
      if (difference < 0) {
        clearInterval(interval);
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        justifyContent: "center",
        alignItems: "center",
        width: "8rem",
        padding: "0 1rem",
      }}
    >
      <Timer color="warning" />
      <div>
        {timeLeft.hours !== undefined && timeLeft.hours > 0
          ? `${timeLeft.hours.toString().padStart(2, "0")}:${timeLeft.minutes
              ?.toString()
              .padStart(2, "0")}`
          : `${timeLeft.minutes?.toString().padStart(2, "0")}:${timeLeft.seconds
              ?.toString()
              .padStart(2, "0")}`}
      </div>
    </div>
  );
};

export default CountdownTimer;
