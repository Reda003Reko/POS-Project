const meals = [
  ["Classic burger", "Burgers", "$12.50", "Available"],
  ["Chicken pizza", "Pizza", "$14.00", "Available"],
  ["Creamy pasta", "Pasta", "$11.00", "Low stock"],
  ["Iced latte", "Drinks", "$4.50", "Available"],
];
export default function MenuPage() {
  return (
    <section className="mx-auto max-w-7xl">
      <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Menu editor
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage dishes, prices and availability for the cashier.
          </p>
        </div>
        <button className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-200">
          + New dish
        </button>
      </header>
      <div className="mb-5 flex flex-wrap gap-2">
        <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-white">
          All items
        </button>
        {["Burgers", "Pizza", "Pasta", "Drinks", "Desserts"].map((x) => (
          <button
            key={x}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-500 hover:border-brand-400 hover:text-brand-700"
          >
            {x}
          </button>
        ))}
      </div>
      <article className="soft-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-150 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3">Dish</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Availability</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {meals.map(([name, category, price, status], i) => (
                <tr key={name} className="border-t border-slate-100">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-lg">
                        {["🍔", "🍕", "🍝", "☕"][i]}
                      </span>
                      <span className="font-bold text-slate-700">{name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{category}</td>
                  <td className="px-5 py-4 font-bold">{price}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${status === "Available" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-bold text-brand-600">
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
}
