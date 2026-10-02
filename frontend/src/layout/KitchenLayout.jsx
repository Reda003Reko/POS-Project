import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { domain } from "../store/index";

export default function RestaurantLayout() {
  let navigate = useNavigate();
  useEffect(() => {
    let myToken = localStorage.getItem("token");
    console.log(myToken);
    if (myToken) {
      let endPoint = "/api/users/me";
      let url = domain + endPoint;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${myToken}`,
          },
        })
        .then((res) => {
          if (res.data.system_role == "cashier") {
            navigate("/");
            alert("ده مكان المطبخ يا حرامي");
          }
        })
        .catch((err) => {
          alert("انت جاي تستظرف");
          localStorage.clear();
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);

  const goInside = () => {
    navigate("/inside");
  };
  const goOutside = () => {
    navigate("/outside");
  };
  return <main className="min-h-dvh bg-slate-950 px-4 py-8 text-white sm:px-7"><div className="mx-auto max-w-6xl"><header className="mb-9 text-center"><span className="rounded-full border border-brand-400/40 bg-brand-500/10 px-3 py-1 text-xs font-bold tracking-widest text-brand-100">SAVOR POS · KITCHEN</span><h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Choose your kitchen station</h1><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">Keep every order moving—select the workflow assigned to your team.</p></header><div className="grid gap-5 md:grid-cols-2"><button onClick={goInside} className="group relative min-h-85 overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#d35a16,#8b210b)] p-7 text-left shadow-2xl transition hover:-translate-y-1 hover:shadow-orange-500/20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,216,130,.6),_transparent_32%)]"/><div className="relative flex h-full flex-col justify-between"><span className="text-5xl">🔥</span><div><p className="text-sm font-bold tracking-[.2em] text-orange-100">PREP & COOK</p><h2 className="mt-2 text-3xl font-extrabold">Inside kitchen</h2><p className="mt-2 max-w-sm text-sm text-orange-50">Start, prepare, and mark orders ready for the pass.</p><span className="mt-6 inline-block rounded-xl bg-white px-4 py-3 text-sm font-bold text-orange-800">Open inside station →</span></div></div></button><button onClick={goOutside} className="group relative min-h-85 overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#0c6d72,#06394a)] p-7 text-left shadow-2xl transition hover:-translate-y-1 hover:shadow-cyan-500/20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(110,231,255,.45),_transparent_32%)]"/><div className="relative flex h-full flex-col justify-between"><span className="text-5xl">🛎️</span><div><p className="text-sm font-bold tracking-[.2em] text-cyan-100">PASS & DELIVERY</p><h2 className="mt-2 text-3xl font-extrabold">Outside kitchen</h2><p className="mt-2 max-w-sm text-sm text-cyan-50">Manage ready dishes and hand orders to the service team.</p><span className="mt-6 inline-block rounded-xl bg-white px-4 py-3 text-sm font-bold text-cyan-900">Open outside station →</span></div></div></button></div></div></main>;
}
