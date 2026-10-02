import { Link } from "react-router-dom";

const stats = [
  ["Today’s sales", "$ 4,280", "+12.5% vs yesterday", "↗"],
  ["Orders received", "148", "18 orders in progress", "◷"],
  ["Average order", "$ 28.92", "+4.2% vs yesterday", "◈"],
  ["Active staff", "12", "3 team members off", "◉"],
];
const orders = [
  ["#1048", "Table 12", "$42.50", "Preparing"],
  ["#1047", "Take away", "$18.00", "Ready"],
  ["#1046", "Table 04", "$76.30", "Delivered"],
  ["#1045", "Table 08", "$35.00", "Preparing"],
];

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-7xl">
      <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-brand-600">
            Tuesday, 29 September
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
            Restaurant overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here’s what’s happening across your restaurant today.
          </p>
        </div>
        <Link
          to="/admin/menu"
          className="rounded-xl bg-brand-500 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-amber-200 transition hover:bg-brand-600"
        >
          + Add menu item
        </Link>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, note, icon]) => (
          <article key={label} className="soft-card p-5">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-lg text-brand-600">
                {icon}
              </span>
            </div>
            <p className="mt-5 text-2xl font-extrabold text-slate-900">
              {value}
            </p>
            <p className="mt-2 text-xs font-medium text-emerald-600">{note}</p>
          </article>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <article className="soft-card overflow-hidden">
          <div className="flex items-center justify-between p-5">
            <div>
              <h2 className="font-bold text-slate-900">Recent orders</h2>
              <p className="mt-1 text-xs text-slate-500">
                Live view from the cashier stations
              </p>
            </div>
            <Link
              to="/admin/sales"
              className="text-sm font-bold text-brand-600"
            >
              View report →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-130 text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Type</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(([id, type, total, status]) => (
                  <tr key={id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-bold text-slate-700">{id}</td>
                    <td className="px-5 py-4 text-slate-500">{type}</td>
                    <td className="px-5 py-4 font-semibold">{total}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${status === "Preparing" ? "bg-amber-100 text-amber-700" : status === "Ready" ? "bg-sky-100 text-sky-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="soft-card p-5">
          <h2 className="font-bold text-slate-900">Top sellers</h2>
          <p className="mt-1 text-xs text-slate-500">
            Based on today’s completed orders
          </p>
          {[
            ["Classic burger", "42 sold", "84%"],
            ["Chicken pizza", "35 sold", "70%"],
            ["Iced latte", "29 sold", "58%"],
          ].map(([name, sold, percent]) => (
            <div key={name} className="mt-5">
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{name}</span>
                <span className="text-slate-400">{sold}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: percent }}
                />
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
