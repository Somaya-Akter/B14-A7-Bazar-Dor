"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function ProfileForm({ user }) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(event) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(
          error.message || "তথ্য আপডেট করা যায়নি"
        );
        return;
      }

      toast.success("প্রোফাইল আপডেট হয়েছে");

      router.refresh();
    } catch {
      toast.error("কিছু সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleUpdate}
      className="mt-7 space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">
          নাম
        </label>

        <input
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#167c4b]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-slate-700">
          ইমেইল
        </label>

        <input
          value={user.email}
          disabled
          className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#167c4b] px-5 py-3.5 font-bold text-white transition hover:bg-[#0f6039] disabled:opacity-60"
      >
        <Save size={18} />

        {loading
          ? "আপডেট হচ্ছে..."
          : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}