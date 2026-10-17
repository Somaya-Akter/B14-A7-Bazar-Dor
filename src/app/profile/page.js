import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "lucide-react";

import { auth } from "@/lib/auth";
import ProfileForm from "@/components/ProfileForm";

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
            আপনার অ্যাকাউন্টের তথ্য দেখুন এবং নাম আপডেট করুন।
          </p>
        </div>

        <ProfileForm user={session.user} />
      </div>
    </main>
  );
}