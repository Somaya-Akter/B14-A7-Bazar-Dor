"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  LogIn,
  UserPlus,
  User,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

import BanglaDate from "@/components/BanglaDate";
import {
  authClient,
  useSession,
} from "@/lib/auth-client";

import {
  formatPrice,
  getChangeStyle,
  getUnitLabel,
  toBanglaNumber,
} from "@/lib/utils";

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

function CategoryNavigation({ categories }) {
  const pathname = usePathname();

  return (
    <div className="border-t border-slate-100">
      <nav className="hide-scrollbar mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
            pathname === "/"
              ? "bg-[#167c4b] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          সব পণ্য
        </Link>

        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const active = pathname === href;

          return (
            <Link
              key={category.slug}
              href={href}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-[#167c4b] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span className="mr-1">
                {category.icon}
              </span>

              {category.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function CategoryFallback() {
  return (
    <div className="border-t border-slate-100">
      <div className="mx-auto h-[61px] max-w-7xl px-4 sm:px-6 lg:px-8" />
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();

  const { data: session, isPending } =
    useSession();

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) return;

        const data = await response.json();

        setProducts(data);
      } catch {
        setProducts([]);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          slug: product.category,
          name: product.categoryNameBn,
          icon: product.categoryIcon,
        });
      }
    });

    return Array.from(categoryMap.values());
  }, [products]);

  const tickerProducts = [
    ...products,
    ...products,
  ];

  async function handleLogout() {
    try {
      await authClient.signOut();

      toast.success("লগ আউট সফল হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("লগ আউট করা যায়নি");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/logo-icon.png"
            alt="বাজার দর লোগো"
            width={48}
            height={48}
            priority
            className="h-11 w-11 object-contain"
          />

          <div>
            <h1 className="text-xl font-extrabold text-[#167c4b] sm:text-2xl">
              বাজার দর
            </h1>

            <BanglaDate />
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {!isPending && session?.user ? (
            <>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-lg border border-[#167c4b]/25 px-3 py-2 text-xs font-bold text-[#167c4b] transition hover:bg-[#167c4b]/5 sm:px-4 sm:text-sm"
              >
                <User size={16} />

                <span className="hidden sm:inline">
                  {session.user.name ||
                    "প্রোফাইল"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 sm:px-4 sm:text-sm"
              >
                <LogOut size={16} />

                <span className="hidden sm:inline">
                  লগ আউট
                </span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#167c4b]/25 px-3 py-2 text-xs font-bold text-[#167c4b] transition hover:bg-[#167c4b]/5 sm:px-4 sm:text-sm"
              >
                <LogIn size={16} />

                <span className="hidden sm:inline">
                  সাইন ইন
                </span>
              </Link>

              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#167c4b] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0f6039] sm:px-4 sm:text-sm"
              >
                <UserPlus size={16} />

                <span className="hidden sm:inline">
                  সাইন আপ
                </span>
              </Link>
            </>
          )}
        </div>
      </div>

      <Suspense fallback={<CategoryFallback />}>
        <CategoryNavigation
          categories={categories}
        />
      </Suspense>

      {products.length > 0 && (
        <div className="overflow-hidden bg-[#123b28] py-2.5 text-white">
          <div className="ticker-track flex items-center">
            {tickerProducts.map(
              (product, index) => {
                const change = getChangeStyle(
                  product.change?.dir
                );

                return (
                  <Link
                    key={`${product.id}-${index}`}
                    href={`/product/${product.slug}`}
                    className="mx-5 flex shrink-0 items-center gap-2 text-xs sm:text-sm"
                  >
                    <span className="text-lg">
                      {product.image}
                    </span>

                    <span className="font-semibold">
                      {product.nameBn}
                    </span>

                    <span>
                      {formatPrice(
                        product.today
                      )}{" "}
                      টাকা/
                      {getUnitLabel(
                        product.unit
                      )}
                    </span>

                    <span
                      className={
                        product.change?.dir ===
                        "up"
                          ? "font-bold text-emerald-300"
                          : product.change
                              ?.dir === "down"
                          ? "font-bold text-red-300"
                          : "font-bold text-slate-300"
                      }
                    >
                      {change.symbol}{" "}
                      {toBanglaNumber(
                        Math.abs(
                          Number(
                            product.change
                              ?.pct || 0
                          )
                        )
                      )}
                      %
                    </span>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      )}
    </header>
  );
}