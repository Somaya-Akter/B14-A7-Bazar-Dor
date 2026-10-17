import Image from "next/image";
import { ArrowDown, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="overflow-hidden border-b border-slate-200 bg-gradient-to-br from-[#eef8f1] via-[#f8fbf7] to-[#fff8e7]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#167c4b]/15 bg-white px-4 py-2 text-xs font-bold text-[#167c4b] shadow-sm">
            <TrendingUp size={15} />
            আজকের বাজারদর
          </div>

          <h2 className="mt-6 max-w-2xl text-4xl font-black leading-tight text-[#162019] sm:text-5xl lg:text-6xl">
            নিত্যপণ্যের দাম,
            <span className="block text-[#167c4b]">
              এখন এক নজরে
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস ও অন্যান্য
            নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এবং বাজারভেদে
            মূল্য পরিবর্তনের তথ্য সহজেই দেখুন।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#167c4b] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:-translate-y-0.5 hover:bg-[#0f6039]"
          >
            <ArrowDown size={18} />
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাংলাদেশের নিত্যপ্রয়োজনীয় বাজার পণ্য"
            width={650}
            height={520}
            priority
            className="h-auto w-full max-w-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}