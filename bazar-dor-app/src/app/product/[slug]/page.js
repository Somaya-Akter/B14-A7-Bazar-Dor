import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import {
  ArrowLeft,
  MapPin,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { auth } from "@/lib/auth";

import {
  formatPrice,
  getUnitLabel,
  toBanglaNumber,
} from "@/lib/utils";

export const instant = false;

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

async function getProduct(slug) {
  "use cache";

  const response = await fetch(API_URL);

  if (!response.ok) {
    return null;
  }

  const products = await response.json();

  return products.find(
    (product) => product.slug === slug
  );
}

export default async function ProductDetailsPage({
  params,
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { slug } = await params;

  if (!session?.user) {
    redirect(
      `/signin?callbackURL=${encodeURIComponent(
        `/product/${slug}`
      )}`
    );
  }

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const minimumPrice = Math.min(
    ...product.markets.map((market) =>
      Number(market.min)
    )
  );

  const maximumPrice = Math.max(
    ...product.markets.map((market) =>
      Number(market.max)
    )
  );

  const averagePrice = Math.round(
    product.markets.reduce(
      (total, market) =>
        total +
        (Number(market.min) +
          Number(market.max)) /
          2,
      0
    ) / product.markets.length
  );

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#167c4b]"
        >
          <ArrowLeft size={18} />
          হোম পেজে ফিরে যান
        </Link>

        <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-3xl bg-[#eef8f1] text-7xl">
              {product.image}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#167c4b]/10 px-3 py-1 text-xs font-bold text-[#167c4b]">
                  {product.categoryIcon}{" "}
                  {product.categoryNameBn}
                </span>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  প্রতি {getUnitLabel(product.unit)}
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-black text-[#162019] sm:text-5xl">
                {product.nameBn}
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-500">
                বাংলাদেশের বিভিন্ন বাজারে{" "}
                {product.nameBn}-এর আজকের সর্বনিম্ন,
                সর্বোচ্চ ও গড় মূল্য এক নজরে দেখুন।
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-black text-[#162019]">
                  {formatPrice(product.today)} টাকা
                </span>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${
                    isUp
                      ? "bg-emerald-100 text-emerald-700"
                      : isDown
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isUp && <TrendingUp size={16} />}
                  {isDown && (
                    <TrendingDown size={16} />
                  )}

                  {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                  {toBanglaNumber(
                    Math.abs(
                      Number(product.change?.pct || 0)
                    )
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              সর্বনিম্ন মূল্য
            </p>

            <p className="mt-2 text-3xl font-black text-[#167c4b]">
              {formatPrice(minimumPrice)} টাকা
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              সর্বোচ্চ মূল্য
            </p>

            <p className="mt-2 text-3xl font-black text-red-600">
              {formatPrice(maximumPrice)} টাকা
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-slate-500">
              গড় মূল্য
            </p>

            <p className="mt-2 text-3xl font-black text-[#162019]">
              {formatPrice(averagePrice)} টাকা
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-[#eef8f1] p-5">
            <p className="text-sm text-slate-500">
              গতকাল
            </p>

            <p className="mt-1 text-xl font-bold">
              {formatPrice(product.yesterday)} টাকা
            </p>
          </div>

          <div className="rounded-2xl bg-[#eef8f1] p-5">
            <p className="text-sm text-slate-500">
              গত সপ্তাহ
            </p>

            <p className="mt-1 text-xl font-bold">
              {formatPrice(product.lastWeek)} টাকা
            </p>
          </div>

          <div className="rounded-2xl bg-[#eef8f1] p-5">
            <p className="text-sm text-slate-500">
              গত মাস
            </p>

            <p className="mt-1 text-xl font-bold">
              {formatPrice(product.lastMonth)} টাকা
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-black text-[#162019]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-2 text-slate-500">
            বিভিন্ন বিভাগ ও বাজারের সর্বনিম্ন এবং
            সর্বোচ্চ মূল্য।
          </p>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead className="bg-[#123b28] text-left text-sm text-white">
                  <tr>
                    <th className="px-5 py-4">
                      বাজার
                    </th>
                    <th className="px-5 py-4">
                      বিভাগ
                    </th>
                    <th className="px-5 py-4">
                      সর্বনিম্ন
                    </th>
                    <th className="px-5 py-4">
                      সর্বোচ্চ
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map(
                    (market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-5 py-4 font-bold">
                          <span className="inline-flex items-center gap-2">
                            <MapPin
                              size={16}
                              className="text-[#167c4b]"
                            />
                            {market.market}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-500">
                          {market.division}
                        </td>

                        <td className="px-5 py-4 font-semibold text-[#167c4b]">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-5 py-4 font-semibold">
                          {formatPrice(market.max)} টাকা
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}