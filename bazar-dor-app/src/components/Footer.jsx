import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-[#123b28] text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={42}
            height={42}
            className="h-10 w-10 object-contain"
          />

          <p className="font-bold">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <p className="max-w-lg text-sm leading-6 text-green-100 sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}