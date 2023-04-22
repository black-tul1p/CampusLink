import { Timer } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const Countdown = ({ timestamp, minutes, onEnd }) => {
  const isUnlimited = !minutes;
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date() - timestamp;
    const remainingTime = Math.max(0, minutes * 60 * 1000 - difference);
    let timeLeft = {};

    if (remainingTime > 0) {
      const remainingMinutes = Math.floor(remainingTime / 1000 / 60);
      const remainingSeconds = Math.floor((remainingTime / 1000) % 60);

      timeLeft = {
        hours: Math.floor(remainingMinutes / 60),
        minutes: remainingMinutes % 60,
        seconds: remainingSeconds,
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    if (!isUnlimited && minutesLeft === 0 && timeLeft.seconds === 0)
      onEnd(true, true);
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
      {isUnlimited ? (
        <Typography>Unlimited</Typography>
      ) : minutesLeft < 10 ? (
        <div>{`${timeLeft.minutes}m ${timeLeft.seconds}s`}</div>
      ) : (
        <div>{`${timeLeft.hours}h ${timeLeft.minutes}m`}</div>
      )}
    </div>
  );
};

export default Countdown;
