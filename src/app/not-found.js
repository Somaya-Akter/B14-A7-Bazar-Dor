import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <SearchX
          size={70}
          className="mx-auto text-slate-300"
        />

        <p className="mt-6 text-sm font-black tracking-[0.25em] text-[#167c4b]">
          404 ERROR
        </p>

        <h1 className="mt-3 text-4xl font-black text-[#162019] sm:text-5xl">
          পেজটি পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-500">
          আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরানো
          হয়েছে।
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#167c4b] px-6 py-3 font-bold text-white transition hover:bg-[#0f6039]"
        >
          <Home size={18} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}