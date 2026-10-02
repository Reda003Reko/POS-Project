import logoCashier from "../../icons/logo_cashier.svg";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { domain } from "../../store/index";

export default function SideBarCashier() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let endPoint = "/api/categories?populate=*";
    let url = domain + endPoint;

    axios(url)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <aside className="flex w-full shrink-0 items-center gap-3 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 md:h-full md:w-[86px] md:flex-col md:items-center md:overflow-hidden md:border-r md:border-b-0 md:px-0 md:py-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white shadow-lg shadow-amber-100">
          <img
            src={logoCashier}
            alt="Savor POS"
            className="w-full rounded-[10px] bg-brand-500 p-1"
          />
        </div>

        <nav className="flex min-w-max items-center gap-2 md:mt-7 md:min-h-0 md:w-full md:flex-1 md:flex-col md:gap-5 md:overflow-x-hidden md:overflow-y-auto md:pb-3">
          {categories.map((el) => {
            return (
              <NavLink
                end
                key={el.documentId}
                to={el.documentId}
                className={({ isActive }) =>
                  "flex h-12 min-w-16 flex-col items-center justify-center rounded-xl px-1 text-[9px] font-semibold transition md:w-14 md:min-w-0 " +
                  (isActive
                    ? "bg-brand-500 text-white shadow-md shadow-amber-100"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100")
                }
              >
                <img className="h-6 w-6 object-contain" src={domain + el.img?.url} alt="" />
                {el.name}
              </NavLink>
            );
          })}
        </nav>
      </aside>
  );
}
