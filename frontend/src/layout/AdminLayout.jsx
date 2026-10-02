import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { domain } from "../store/index";
import SideBarAdmin from "../components/SideBarAdmin";

export default function AdminLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    let myToken = localStorage.getItem("token");
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
          if (res.data.system_role !== "admin") navigate("/");
        })
        .catch((err) => {
          localStorage.removeItem("token");
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="app-shell flex flex-col lg:flex-row">
      <SideBarAdmin />
      <main className="min-w-0 flex-1 overflow-auto p-4 sm:p-6 lg:p-9">
        <Outlet />
      </main>
    </div>
  );
}
