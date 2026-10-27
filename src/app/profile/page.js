import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Mail, Pencil, User } from "lucide-react";

import { auth } from "@/lib/auth";

export const instant = false;

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f7f8f4] px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#167c4b]/10 text-[#167c4b]">
            <User size={30} />
          </div>

          <h1 className="mt-4 text-3xl font-black text-[#162019]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            আপনার অ্যাকাউন্টের তথ্য দেখুন।
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-500">নাম</p>

            <div className="mt-2 flex items-center gap-3">
              <User size={20} className="text-[#167c4b]" />

              <p className="font-semibold text-slate-900">
                {session.user.name || "নাম পাওয়া যায়নি"}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-500">ইমেইল</p>

            <div className="mt-2 flex items-center gap-3">
              <Mail size={20} className="text-[#167c4b]" />

              <p className="break-all font-medium text-slate-700">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/profile/update"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#167c4b] px-5 py-4 font-bold text-white transition hover:bg-[#10653c]"
        >
          <Pencil size={19} />
          তথ্য আপডেট করুন
        </Link>
      </div>
    </main>
  );
}