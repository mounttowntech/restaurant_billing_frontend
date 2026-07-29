import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../../src/pages/Auth/Login/Login";
import Register from "../../src/pages/Auth/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
