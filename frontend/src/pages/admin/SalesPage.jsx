const periods = [
  ["10:00", "$320"],
  ["12:00", "$680"],
  ["14:00", "$910"],
  ["16:00", "$540"],
  ["18:00", "$1,140"],
  ["20:00", "$690"],
];
export default function SalesPage() {
  return (
    <section className="mx-auto max-w-7xl">
      <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Sales reports
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            A clear snapshot of your restaurant’s performance.
          </p>
        </div>
        <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600">
          29 Sep 2026 ▾
        </button>
      </header>
      <div className="grid gap-4 sm:grid-cols-3">
        <article className="soft-card p-5">
          <p className="text-sm text-slate-500">Gross sales</p>
          <p className="mt-3 text-3xl font-extrabold">$4,280</p>
          <p className="mt-2 text-xs font-bold text-emerald-600">
            ↑ 12.5% from yesterday
          </p>
        </article>
        <article className="soft-card p-5">
          <p className="text-sm text-slate-500">Completed orders</p>
          <p className="mt-3 text-3xl font-extrabold">130</p>
          <p className="mt-2 text-xs font-bold text-emerald-600">
            ↑ 8.1% from yesterday
          </p>
        </article>
        <article className="soft-card p-5">
          <p className="text-sm text-slate-500">Refunds</p>
          <p className="mt-3 text-3xl font-extrabold">$65</p>
          <p className="mt-2 text-xs font-bold text-slate-400">
            2 refunded orders
          </p>
        </article>
      </div>
      <article className="soft-card mt-6 p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold">Hourly sales</h2>
            <p className="mt-1 text-xs text-slate-500">
              Sales total across all service channels
            </p>
          </div>
          <span className="rounded-lg bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            Today
          </span>
        </div>
        <div className="mt-10 flex h-52 items-end justify-between gap-3 sm:gap-6">
          {periods.map(([time, value], index) => (
            <div key={time} className="flex h-full flex-1 flex-col justify-end">
              <p className="mb-2 hidden text-center text-xs font-bold text-slate-600 sm:block">
                {value}
              </p>
              <div
                className="rounded-t-xl bg-brand-400 transition hover:bg-brand-500"
                style={{ height: `${[28, 55, 75, 44, 95, 58][index]}%` }}
              />
              <p className="mt-3 text-center text-xs text-slate-400">{time}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
