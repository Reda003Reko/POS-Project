import { NavLink } from "react-router-dom";
import adminLogo from "../icons/AdminLogo.svg";
import dashboardIcon from "../icons/nav_dash.svg";
import staffIcon from "../icons/nav_staff.svg";
import menuIcon from "../icons/nav_menu.svg";
import salesIcon from "../icons/nav_reports.svg";

export default function SideBarAdmin() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white px-4 py-4 lg:h-dvh lg:w-70 lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-brand-500 shadow-lg shadow-amber-200"><img src={adminLogo} alt="Restaurant POS" className="h-full w-full object-contain p-1" /></div>
        <div><p className="font-extrabold text-slate-800">Savor POS</p><p className="text-xs text-slate-400">Admin console</p></div>
      </div>
      <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {[{to:"/admin",label:"Dashboard",icon:dashboardIcon,end:true},{to:"/admin/staff",label:"Staff management",icon:staffIcon},{to:"/admin/menu",label:"Menu editor",icon:menuIcon},{to:"/admin/sales",label:"Sales reports",icon:salesIcon}].map(({to,label,icon,end}) => <NavLink key={to} to={to} end={end} className={({isActive}) => `flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-brand-50 text-brand-700 shadow-sm" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}><img src={icon} alt="" className="h-5 w-5" /><span>{label}</span></NavLink>)}
      </nav>
      <div className="mt-auto hidden rounded-2xl bg-slate-900 p-4 text-white lg:block"><p className="text-xs text-slate-300">Restaurant status</p><p className="mt-1 font-bold">● Open for orders</p></div>
    </aside>
  );
}
