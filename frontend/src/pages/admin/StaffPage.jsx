const staff = [
  ["AM", "Ahmed Mohamed", "Cashier", "Morning shift", "Active"],
  ["SR", "Sara Reda", "Kitchen chef", "Evening shift", "Active"],
  ["MK", "Mohamed Karim", "Kitchen runner", "Evening shift", "Break"],
  ["LF", "Laila Fathy", "Cashier", "Morning shift", "Off duty"],
];
export default function StaffPage() {
  return (
    <section className="mx-auto max-w-7xl">
      <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Staff management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Keep shifts, roles, and availability in one place.
          </p>
        </div>
        <button className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-amber-200">
          + Add team member
        </button>
      </header>
      <article className="soft-card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold">
            Team directory{" "}
            <span className="ml-2 rounded-full bg-brand-50 px-2 py-1 text-xs text-brand-700">
              12 members
            </span>
          </p>
          <input
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-brand-400"
            placeholder="Search staff..."
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3">Member</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">Shift</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {staff.map(([initials, name, role, shift, status]) => (
                <tr key={name} className="border-t border-slate-100">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                        {initials}
                      </span>
                      <span className="font-bold text-slate-700">{name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{role}</td>
                  <td className="px-5 py-4 text-slate-500">{shift}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${status === "Active" ? "bg-emerald-100 text-emerald-700" : status === "Break" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-sm font-bold text-brand-600">
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
