import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";
import Restaurant from "../pages/restaurant/Restaurant";
import Sidebar from "../components/Layouts/Sidebar";
import POSBilling from "../pages/POSBilling/POSBilling";
import Store from "../pages/Store/Store";
import Customer from "../pages/Customer/Customer";
import Product from "../pages/Product/Product";
import Purchase from "../pages/Purchase/Purchase";
import Company from "../pages/Companies/Company";
import Invoice from "../pages/Invoice/Invoice";
import MenuItem from "../pages/Menu/MenuItem";
import MenuCategory from "../pages/MenuCategory/MenuCategory";
import Category from "../pages/Category/Category";
import Reports from "../pages/Reports/Reports";
import Order from "../pages/Order/Order";
import KOT from "../pages/KOT/KOT";
import Recipe from "../pages/Recipe/Recipe";
import IngredientStockLedger from "../pages/IngredientStockLedger/IngredientStockLedger";
import Unit from "../pages/Unit/Unit";
import Warehouse from "../pages/Warehouse/Warehouse";
import Ingredient from "../pages/Ingredient/Ingredient";
import Supplier from "../pages/Supplier/Supplier";
import Role from "../pages/Role/Role";
import Tables from "../pages/Table/Table";

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/pos-billing" element={<POSBilling />} />
          <Route path="/store" element={<Store />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/menu-categories" element={<MenuCategory />} />
          <Route path="/products" element={<Product />} />
          <Route path="/purchases" element={<Purchase />} />
          <Route path="/companies" element={<Company />} />
          <Route path="/invoices" element={<Invoice />} />
          <Route path="/menu-items" element={<MenuItem />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/kot" element={<KOT />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/units" element={<Unit />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/ingredient" element={<Ingredient />} />
          <Route path="/suppliers" element={<Supplier />} />
          <Route path="/roles" element={<Role />} />
          <Route path="/tables" element={<Tables />} />
          <Route
            path="/ingredient-stock-ledger"
            element={<IngredientStockLedger />}
          />
        </Routes>
      </main>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication pages */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/change-password" element={<ChangePassword />} />

        {/* Dashboard + Sidebar pages */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
