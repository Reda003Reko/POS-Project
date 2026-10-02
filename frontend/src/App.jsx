import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/admin/DashboardPage";
import StaffPage from "./pages/admin/StaffPage";
import MenuPage from "./pages/admin/MenuPage";
import SalesPage from "./pages/admin/SalesPage";
import AdminLayout from "./layout/AdminLayout";
import CashierLayout from "./layout/CashierLayout";
import KitchenLayout from "./layout/KitchenLayout";
import MainCashier from "./components/cashier/MainCashier";
import InsidePage from "./pages/kitchen/InsidePage";
import OutsidePage from "./pages/kitchen/OutsidePage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

        <Routes>
          {/* start website layout*/}
          <Route path="/">
            <Route index element=<LoginPage /> />
            <Route path="register" element=<RegisterPage /> />
          </Route>
          {/* admin layout*/}
          <Route path="/admin" element=<AdminLayout />>
            <Route index element=<DashboardPage /> />
            <Route path="staff" element=<StaffPage /> />
            <Route path="menu" element=<MenuPage /> />
            <Route path="sales" element=<SalesPage /> />
          </Route>
          {/* cashier layout*/}
          <Route path="/cashier" element={<CashierLayout />}>
            <Route index element={<div className="empty-state"><div><span className="text-6xl">🍽️</span><h2 className="mt-4">Choose a category</h2><p>Select a category from the menu to start building the order.</p></div></div>} />
            <Route path=":categories" element={<MainCashier />} />
          </Route>
          {/* Kitchen layout*/}
          <Route path="/kitchen" element={<KitchenLayout />} />
          <Route path="inside" element={<InsidePage />} />
          <Route path="outside" element={<OutsidePage />} />
          {/* </Route> */}

          {/* Error Route */}
          <Route path="*" element={<div className="empty-state"><div><h2>404</h2><p>The page you’re looking for does not exist.</p></div></div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
