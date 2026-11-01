import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";

import {
  ChevronRight,
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

  if (!Array.isArray(products)) {
    return null;
  }

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

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  const minimumPrice =
    markets.length > 0
      ? Math.min(
          ...markets.map((market) =>
            Number(market.min)
          )
        )
      : Number(product.today || 0);

  const maximumPrice =
    markets.length > 0
      ? Math.max(
          ...markets.map((market) =>
            Number(market.max)
          )
        )
      : Number(product.today || 0);

  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) =>
              total +
              (Number(market.min) +
                Number(market.max)) /
                2,
            0
          ) / markets.length
        )
      : Number(product.today || 0);

  const isUp = product.change?.dir === "up";
  const isDown =
    product.change?.dir === "down";

  const changePercent = Math.abs(
    Number(product.change?.pct || 0)
  );

  return (
    <main className="min-h-screen bg-[#f7f8f4]">
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* BREADCRUMB */}
        <div className="mb-6 flex flex-wrap items-center gap-1 text-sm font-semibold text-slate-500">
          <Link
            href="/"
            className="transition hover:text-[#167c4b]"
          >
            হোম
          </Link>

          <ChevronRight size={15} />

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-[#167c4b]"
          >
            {product.categoryNameBn}
          </Link>

          <ChevronRight size={15} />

          <span className="text-[#162019]">
            {product.nameBn}
          </span>
        </div>

        {/* PRODUCT MAIN CARD */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col md:flex-row md:items-stretch">

            {/* LEFT */}
            <div className="flex flex-1 items-center gap-5 p-6 sm:p-7">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#eef8f1] text-5xl sm:h-24 sm:w-24 sm:text-6xl">
                {product.image}
              </div>

              <div className="min-w-0">
                <h1 className="text-3xl font-black text-[#162019] sm:text-4xl">
                  {product.nameBn}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-slate-500">
                    প্রতি{" "}
                    {getUnitLabel(product.unit)}
                  </span>

                  <span className="rounded-full bg-[#167c4b]/10 px-2.5 py-1 text-xs font-bold text-[#167c4b]">
                    {product.categoryIcon}{" "}
                    {product.categoryNameBn}
                  </span>
                </div>

                <p
                  className={`mt-3 text-sm font-semibold ${
                    isUp
                      ? "text-emerald-600"
                      : isDown
                      ? "text-red-600"
                      : "text-slate-500"
                  }`}
                >
                  {isUp
                    ? `গতকালের তুলনায় আজকের দাম বেড়েছে ${toBanglaNumber(
                        changePercent
                      )}%`
                    : isDown
                    ? `গতকালের তুলনায় আজকের দাম কমেছে ${toBanglaNumber(
                        changePercent
                      )}%`
                    : "গতকালের তুলনায় আজকের দামে কোনো পরিবর্তন নেই"}
                </p>
              </div>
            </div>

            {/* RIGHT CURRENT PRICE */}
            <div className="flex min-w-[220px] items-center justify-center border-t border-slate-200 bg-[#fbfcfa] p-6 text-center md:border-l md:border-t-0">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  আজকের মূল্য
                </p>

                <p className="mt-1 text-4xl font-black text-[#162019]">
                  {formatPrice(product.today)}
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  টাকা/
                  {getUnitLabel(product.unit)}
                </p>

                <div
                  className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                    isUp
                      ? "bg-emerald-100 text-emerald-700"
                      : isDown
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isUp && (
                    <TrendingUp size={14} />
                  )}

                  {isDown && (
                    <TrendingDown size={14} />
                  )}

                  <span>
                    {isUp
                      ? "▲"
                      : isDown
                      ? "▼"
                      : "—"}{" "}
                    {toBanglaNumber(
                      changePercent
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRICE SUMMARY */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-[#162019]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-5 grid grid-cols-1 divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

            <div className="py-4 sm:px-5 sm:py-2 sm:first:pl-0">
              <p className="text-sm font-semibold text-slate-500">
                সর্বনিম্ন মূল্য
              </p>

              <p className="mt-2 text-2xl font-black text-[#167c4b]">
                {formatPrice(minimumPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-slate-400">
                আজকের সর্বনিম্ন বাজারদর
              </p>
            </div>

            <div className="py-4 sm:px-5 sm:py-2">
              <p className="text-sm font-semibold text-slate-500">
                সর্বোচ্চ মূল্য
              </p>

              <p className="mt-2 text-2xl font-black text-red-600">
                {formatPrice(maximumPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-slate-400">
                আজকের সর্বোচ্চ বাজারদর
              </p>
            </div>

            <div className="py-4 sm:px-5 sm:py-2 sm:last:pr-0">
              <p className="text-sm font-semibold text-slate-500">
                গড় মূল্য
              </p>

              <p className="mt-2 text-2xl font-black text-[#167c4b]">
                {formatPrice(averagePrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-slate-400">
                আজকের গড় বাজারদর
              </p>
            </div>
          </div>
        </div>

        {/* MARKET TABLE */}
        <div className="mt-8">
          <h2 className="text-2xl font-black text-[#162019] sm:text-3xl">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            বিভিন্ন বিভাগ ও বাজারের সর্বনিম্ন এবং
            সর্বোচ্চ মূল্য।
          </p>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead className="border-b border-slate-200 bg-[#f8faf8] text-sm text-slate-600">
                  <tr>
                    <th className="px-5 py-4 font-bold">
                      বাজার
                    </th>

                    <th className="px-5 py-4 font-bold">
                      বিভাগ
                    </th>

                    <th className="px-5 py-4 font-bold">
                      সর্বনিম্ন
                    </th>

                    <th className="px-5 py-4 font-bold">
                      সর্বোচ্চ
                    </th>

                    <th className="px-5 py-4 font-bold">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map(
                    (market, index) => {
                      const marketAverage =
                        Math.round(
                          (Number(
                            market.min
                          ) +
                            Number(
                              market.max
                            )) /
                            2
                        );

                      return (
                        <tr
                          key={`${market.market}-${index}`}
                          className="border-b border-slate-100 last:border-b-0"
                        >
                          <td className="px-5 py-4 font-bold text-[#162019]">
                            {market.market}
                          </td>

                          <td className="px-5 py-4 text-slate-500">
                            {market.division}
                          </td>

                          <td className="px-5 py-4 font-semibold text-[#167c4b]">
                            {formatPrice(
                              market.min
                            )}{" "}
                            টাকা
                          </td>

                          <td className="px-5 py-4 font-semibold text-red-600">
                            {formatPrice(
                              market.max
                            )}{" "}
                            টাকা
                          </td>

                          <td className="px-5 py-4 font-semibold text-[#162019]">
                            {formatPrice(
                              marketAverage
                            )}{" "}
                            টাকা
                          </td>
                        </tr>
                      );
                    }
                  )}

                  {markets.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-10 text-center text-sm text-slate-500"
                      >
                        বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
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