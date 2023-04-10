import { Timer } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

const Countdown = ({ timestamp, minutes }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date() - timestamp;
    let timeLeft = {};

    if (difference > 0) {
      const remainingMinutes = Math.max(0, Math.floor(difference / 1000 / 60));
      const remainingSeconds = 60 - Math.floor((difference / 1000) % 60);
      const totalMinutes = Math.max(0, minutes - remainingMinutes);
      timeLeft = {
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
        seconds: remainingSeconds,
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const minutesLeft =
    timeLeft.hours > 0
      ? timeLeft.hours * 60 + timeLeft.minutes
      : timeLeft.minutes;

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
      {minutesLeft < 10 ? (
        <div>{`${minutesLeft}m ${timeLeft.seconds}s`}</div>
      ) : (
        <div>{`${timeLeft.hours}h ${timeLeft.minutes}m`}</div>
      )}
    </div>
  );
};

export default Countdown;
