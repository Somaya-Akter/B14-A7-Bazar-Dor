"use client";

import Image from "next/image";
import {
  ArrowDown,
  CalendarDays,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

export default function Hero() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const formattedDate =
      new Intl.DateTimeFormat("bn-BD", {
        timeZone: "Asia/Dhaka",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());

    setToday(formattedDate);
  }, []);

  function handleProductsClick() {
    const productsSection =
      document.getElementById("সব-পণ্য");

    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(
        null,
        "",
        "#সব-পণ্য"
      );
    }
  }

  return (
    <section className="bg-[#f7faf7]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#167c4b]/15 bg-white px-4 py-2 text-sm font-bold text-[#167c4b] shadow-sm">
            <CalendarDays size={16} />

            {today || "তারিখ লোড হচ্ছে..."}
          </div>

          <h1 className="text-4xl font-black leading-tight text-[#162019] sm:text-5xl lg:text-6xl">
            নিত্যপণ্যের দাম,
            <br />

            <span className="text-[#167c4b]">
              এখন এক নজরে
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস ও অন্যান্য
            নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এবং বাজারভেদে
            মূল্য পরিবর্তনের তথ্য সহজেই দেখুন।
          </p>

          <button
            type="button"
            onClick={handleProductsClick}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#167c4b] px-6 py-3 font-bold text-white transition hover:bg-[#0f6039]"
          >
            <ArrowDown size={18} />
            সব পণ্য দেখুন
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ঝুড়ি"
            width={520}
            height={420}
            priority
            className="h-auto w-full max-w-[430px] object-contain sm:max-w-[470px] lg:max-w-[500px]"
          />
        </div>
      </div>
    </section>
  );
}