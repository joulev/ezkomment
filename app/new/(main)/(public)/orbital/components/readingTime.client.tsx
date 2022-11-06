"use client";

import { useState, useEffect } from "react";

export default function ReadingTime() {
  const [minutesToRead, setMinutesToRead] = useState(0);
  useEffect(() => {
    const wordCnt = document.getElementsByClassName("post")[0].textContent!.split(" ").length;
    setMinutesToRead(Math.round(wordCnt / 200));
  }, []);
  return (
    <>
      {minutesToRead} min{minutesToRead !== 1 && "s"} read
    </>
  );
}
