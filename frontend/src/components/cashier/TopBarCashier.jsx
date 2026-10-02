import { useSearch } from "../../store";

export default function TopBarCashier() {
  const { searchValue, setSearchValue } = useSearch();
  return (
    <section className="shrink-0 bg-white px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
      <header className="flex items-center gap-3 border-b border-slate-100 pb-2 sm:pb-3">
        <div className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 sm:max-w-[295px]">
          <span className="text-slate-400">⌕</span>
          <input
            onChange={(event) => setSearchValue(event.target.value)}
            className="w-full min-w-0 bg-transparent text-xs text-slate-600 focus:outline-none"
            placeholder="Search dishes..."
          />
        </div>

        <span className="hidden shrink-0 rounded-full bg-brand-50 px-3 py-2 text-[10px] font-bold tracking-wider text-brand-600 sm:inline">
          ● TABLE 12
        </span>

        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <div className="text-right">
            <p className="text-[11px] font-semibold">Ahmed mohammed</p>
            <p className="text-[8px] font-bold tracking-wider text-slate-400">
              CASHIER STATION
            </p>
          </div>
          <div className="h-8 w-8 rounded-full border border-slate-200 bg-white" />
        </div>
      </header>
    </section>
  );
}
