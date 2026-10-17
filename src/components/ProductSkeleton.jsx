export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="h-40 animate-pulse bg-slate-200" />

          <div className="space-y-4 p-5">
            <div className="h-5 w-20 animate-pulse rounded bg-slate-200" />
            <div className="h-6 w-36 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

            <div className="border-t border-slate-100 pt-4">
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              <div className="mt-3 h-7 w-32 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}