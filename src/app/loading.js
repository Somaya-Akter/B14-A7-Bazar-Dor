export default function Loading() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#f7f8f4] px-4">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#167c4b]/20 border-t-[#167c4b]" />

        <h2 className="mt-5 text-xl font-extrabold text-[#162019]">
          তথ্য লোড হচ্ছে...
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          অনুগ্রহ করে একটু অপেক্ষা করুন।
        </p>
      </div>
    </main>
  );
}