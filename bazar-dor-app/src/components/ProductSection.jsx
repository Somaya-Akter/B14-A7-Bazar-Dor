import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  subtitle,
  products,
  id,
  badge,
}) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          {badge && (
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#167c4b]">
              {badge}
            </p>
          )}

          <h2 className="text-3xl font-black text-[#162019] sm:text-4xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}