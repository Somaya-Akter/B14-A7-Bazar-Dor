import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import {
  formatPrice,
  getChangeStyle,
  getUnitLabel,
  toBanglaNumber,
} from "@/lib/utils";

export default function ProductCard({ product }) {
  const change = getChangeStyle(product.change?.dir);

  const ChangeIcon =
    product.change?.dir === "up"
      ? ArrowUpRight
      : product.change?.dir === "down"
      ? ArrowDownRight
      : ArrowRight;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#167c4b]/30 hover:shadow-xl hover:shadow-slate-200/60"
    >
      <div className="flex min-h-40 items-center justify-center bg-gradient-to-br from-[#f3f8f3] to-[#fbfcf8]">
        <span
          role="img"
          aria-label={product.nameBn}
          className="text-7xl transition duration-300 group-hover:scale-110"
        >
          {product.image}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full bg-[#167c4b]/8 px-2.5 py-1 text-[11px] font-bold text-[#167c4b]">
              {product.categoryIcon} {product.categoryNameBn}
            </span>

            <h3 className="mt-3 text-xl font-extrabold text-[#162019]">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              প্রতি {getUnitLabel(product.unit)}
            </p>
          </div>

          <span className="text-2xl">🛒</span>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-500">
            আজকের দাম
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-2xl font-black text-[#162019]">
              {formatPrice(product.today)}{" "}
              <span className="text-sm font-bold text-slate-500">
                টাকা
              </span>
            </p>

            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${change.className}`}
            >
              <ChangeIcon size={14} />

              {change.symbol}{" "}
              {toBanglaNumber(
                Math.abs(Number(product.change?.pct || 0))
              )}
              %
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}