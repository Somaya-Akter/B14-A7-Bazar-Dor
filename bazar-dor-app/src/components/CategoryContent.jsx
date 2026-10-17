"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Home, PackageSearch } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { parseNumericValue } from "@/lib/utils";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

export default function CategoryContent({ slug }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function loadCategoryProducts() {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}?category=${encodeURIComponent(slug)}`
        );

        if (!response.ok) {
          setProducts([]);
          return;
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadCategoryProducts();
  }, [slug]);

  const sortedProducts = useMemo(() => {
    const list = [...products];

    if (sortBy === "low") {
      return list.sort(
        (a, b) =>
          parseNumericValue(a.today) -
          parseNumericValue(b.today)
      );
    }

    if (sortBy === "high") {
      return list.sort(
        (a, b) =>
          parseNumericValue(b.today) -
          parseNumericValue(a.today)
      );
    }

    return list;
  }, [products, sortBy]);

  if (loading) {
    return (
      <main className="min-h-screen">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 h-10 w-52 animate-pulse rounded bg-slate-200" />
          <ProductSkeleton count={8} />
        </section>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="min-h-[70vh]">
        <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
          <PackageSearch
            size={62}
            className="text-slate-300"
          />

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#167c4b]">
            404
          </p>

          <h1 className="mt-2 text-3xl font-black text-[#162019] sm:text-4xl">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-4 max-w-md leading-7 text-slate-500">
            ক্যাটাগরিটি সঠিক নয় অথবা বর্তমানে এখানে কোনো
            পণ্যের তথ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#167c4b] px-6 py-3 font-bold text-white transition hover:bg-[#0f6039]"
          >
            <Home size={18} />
            হোম পেজে ফিরে যান
          </Link>
        </section>
      </main>
    );
  }

  const categoryName = products[0].categoryNameBn;
  const categoryIcon = products[0].categoryIcon;

  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-extrabold tracking-[0.16em] text-[#167c4b]">
              ক্যাটাগরি
            </p>

            <h1 className="mt-2 flex items-center gap-3 text-4xl font-black text-[#162019]">
              <span>{categoryIcon}</span>
              {categoryName}
            </h1>

            <p className="mt-3 text-slate-500">
              এই ক্যাটাগরির আজকের সর্বশেষ বাজারদর দেখুন।
            </p>
          </div>

          <div className="relative">
            <label
              htmlFor="sort-products"
              className="sr-only"
            >
              সাজান
            </label>

            <select
              id="sort-products"
              value={sortBy}
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="min-w-56 appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-11 text-sm font-bold text-slate-700 outline-none transition focus:border-[#167c4b]"
            >
              <option value="default">
                সাজান: ডিফল্ট
              </option>

              <option value="low">
                দাম: কম থেকে বেশি
              </option>

              <option value="high">
                দাম: বেশি থেকে কম
              </option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#167c4b]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}