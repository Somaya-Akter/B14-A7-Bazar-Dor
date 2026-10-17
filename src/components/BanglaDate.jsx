"use client";

import { useEffect, useRef } from "react";

export default function BanglaDate() {
  const dateRef = useRef(null);

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    if (dateRef.current) {
      dateRef.current.textContent = formattedDate;
    }
  }, []);

  return (
    <p
      ref={dateRef}
      className="mt-0.5 text-[11px] text-slate-500 sm:text-xs"
    >
      আজকের তারিখ
    </p>
  );
}