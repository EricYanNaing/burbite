export function PageLoading() {
  return (
    <div className="animate-pulse space-y-5">
      <section className="overflow-hidden rounded-[28px] bg-card p-5 shadow-[0_22px_60px_rgba(96,45,18,0.08)] ring-1 ring-black/5">
        <div className="h-6 w-28 rounded-full bg-muted" />
        <div className="mt-6 h-10 w-44 rounded-2xl bg-muted" />
        <div className="mt-3 h-4 w-64 rounded-full bg-muted" />
        <div className="mt-2 h-4 w-48 rounded-full bg-muted" />
        <div className="mt-6 flex gap-3">
          <div className="h-10 w-32 rounded-full bg-muted" />
          <div className="h-10 w-28 rounded-full bg-muted" />
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[24px] bg-card p-5 ring-1 ring-black/5"
          >
            <div className="h-4 w-14 rounded-full bg-muted" />
            <div className="mt-4 h-8 w-20 rounded-2xl bg-muted" />
            <div className="mt-2 h-4 w-16 rounded-full bg-muted" />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[24px] bg-card p-5 ring-1 ring-black/5"
          >
            <div className="h-4 w-24 rounded-full bg-muted" />
            <div className="mt-4 h-6 w-48 rounded-full bg-muted" />
            <div className="mt-3 h-4 w-full rounded-full bg-muted" />
            <div className="mt-2 h-4 w-4/5 rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
