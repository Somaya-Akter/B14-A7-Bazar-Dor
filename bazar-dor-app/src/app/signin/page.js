"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] =
    useState(false);
  const [googleLoading, setGoogleLoading] =
    useState(false);

  function getCallbackURL() {
    const params = new URLSearchParams(
      window.location.search
    );

    const requestedURL = params.get("callbackURL");

    return requestedURL &&
      requestedURL.startsWith("/")
      ? requestedURL
      : "/";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: getCallbackURL(),
        });

      if (error) {
        toast.error(
          error.message || "সাইন ইন করা যায়নি"
        );
      }
    } catch {
      toast.error(
        "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setGoogleLoading(true);

      const { error } =
        await authClient.signIn.social({
          provider: "google",
          callbackURL: getCallbackURL(),
        });

      if (error) {
        toast.error(
          error.message ||
            "Google দিয়ে সাইন ইন করা যায়নি"
        );

        setGoogleLoading(false);
      }
    } catch {
      toast.error(
        "Google Sign In-এ সমস্যা হয়েছে"
      );

      setGoogleLoading(false);
    }
  }

  async function handleGithubLogin() {
    try {
      setGithubLoading(true);

      const { error } =
        await authClient.signIn.social({
          provider: "github",
          callbackURL: getCallbackURL(),
        });

      if (error) {
        toast.error(
          error.message ||
            "GitHub দিয়ে সাইন ইন করা যায়নি"
        );

        setGithubLoading(false);
      }
    } catch {
      toast.error(
        "GitHub Sign In-এ সমস্যা হয়েছে"
      );

      setGithubLoading(false);
    }
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#f7f8f4] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#167c4b]/10 text-[#167c4b]">
            <LogIn size={28} />
          </div>

          <h1 className="mt-4 text-3xl font-black text-[#162019]">
            সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-7 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="example@email.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#167c4b]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="আপনার পাসওয়ার্ড"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#167c4b]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#167c4b] px-5 py-3.5 font-bold text-white transition hover:bg-[#0f6039] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "সাইন ইন হচ্ছে..."
              : "সাইন ইন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs font-semibold text-slate-400">
            অথবা
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-sm font-black">
              G
            </span>

            {googleLoading
              ? "Google-এ নেওয়া হচ্ছে..."
              : "Google দিয়ে সাইন ইন"}
          </button>

          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={githubLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#161b22] px-5 py-3.5 font-bold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-black">
              GH
            </span>

            {githubLoading
              ? "GitHub-এ নেওয়া হচ্ছে..."
              : "GitHub দিয়ে সাইন ইন"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-bold text-[#167c4b] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </main>
  );
}