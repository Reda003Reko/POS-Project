import { useEffect } from "react";
import OrderCashier from "../components/cashier/OrderCashier";
import SideBarCashier from "../components/cashier/SideBarCashier";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import TopBarCashier from "../components/cashier/TopBarCashier";
import { domain, useModal } from "../store/index";
import Modal from "../components/Modal";

export default function CashierLayout() {
  let navigate = useNavigate();
  useEffect(() => {
    let myToken = localStorage.getItem("token");
    if (myToken) {
      let endPoint = "/api/users/me";
      let url = domain + endPoint;
      axios
        .get(url, { headers: { Authorization: `Bearer ${myToken}` } })
        .then((res) => {
          if (res.data.system_role == "kitchen") {
            alert("ده مكان الكاشير يا حرامي");
            navigate("/");
          } else {
            sessionStorage.setItem("User", JSON.stringify(res.data));
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

  const { modal } = useModal();

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-white text-slate-900 md:flex-row">
      {/* sidebar cashier */}
      <SideBarCashier />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <TopBarCashier />
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>

      {/* order cashier */}
      <OrderCashier />
      {modal && <Modal />}
    </div>
  );
}
