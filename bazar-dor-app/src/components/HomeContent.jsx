"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";

import ProductSection from "./ProductSection";
import ProductSkeleton from "./ProductSkeleton";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

export default function HomeContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const risers = useMemo(() => {
    return products
      .filter((product) => product.change?.dir === "up")
      .sort(
        (a, b) =>
          Number(b.change?.pct || 0) -
          Number(a.change?.pct || 0)
      )
      .slice(0, 6);
  }, [products]);

  const fallers = useMemo(() => {
    return products
      .filter((product) => product.change?.dir === "down")
      .sort(
        (a, b) =>
          Math.abs(Number(b.change?.pct || 0)) -
          Math.abs(Number(a.change?.pct || 0))
      )
      .slice(0, 6);
  }, [products]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-5 h-9 w-64 animate-pulse rounded bg-slate-200" />
        <ProductSkeleton count={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 text-center">
          <AlertCircle size={38} className="text-red-500" />

          <h2 className="mt-4 text-xl font-bold text-red-700">
            তথ্য লোড করা যায়নি
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ProductSection
        badge="দামের পরিবর্তন"
        title="আজ দাম বেড়েছে ▲"
        subtitle="আজকের বাজারে যেসব নিত্যপণ্যের দাম সবচেয়ে বেশি বেড়েছে।"
        products={risers}
      />

      <div className="border-t border-slate-200" />

      <ProductSection
        badge="দামের পরিবর্তন"
        title="আজ দাম কমেছে ▼"
        subtitle="আজকের বাজারে যেসব নিত্যপণ্যের দাম সবচেয়ে বেশি কমেছে।"
        products={fallers}
      />

      <div className="border-t border-slate-200" />

      <ProductSection
        id="সব-পণ্য"
        badge="সম্পূর্ণ বাজার তালিকা"
        title="সব পণ্য"
        subtitle="আজকের সর্বশেষ বাজারদর, আগের দিনের তুলনায় মূল্য পরিবর্তন এবং এককসহ সব নিত্যপ্রয়োজনীয় পণ্য দেখুন।"
        products={products}
      />
    </div>
  );
}