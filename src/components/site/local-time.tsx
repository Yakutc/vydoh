"use client";

import { useEffect, useState } from "react";
import { CITY, TIME_ZONE } from "@/lib/site";

export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: TIME_ZONE,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      {CITY}
      {time ? `, ${time}` : ""}
    </span>
  );
}
