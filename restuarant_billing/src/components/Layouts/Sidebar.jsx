// ========================= Sidebar.jsx =========================

import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import {
  DashboardIcon,
  POSIcon,
  RestaurantIcon,
  ProductsIcon,
  CustomersIcon,
  PurchaseIcon,
  SuppliersIcon,
  PaymentsIcon,
  ReturnsIcon,
  StockIcon,
  ReportsIcon,
} from "./SidebarIcons";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: DashboardIcon,
    },
    {
      name: "POS",
      path: "/pos-billing",
      icon: POSIcon,
    },
    {
      name: "Restaurants",
      path: "/restaurants",
      icon: RestaurantIcon,
    },
    {
      name: "Products",
      path: "/products",
      icon: ProductsIcon,
    },
    {
      name: "Purchase",
      path: "/purchases",
      icon: PurchaseIcon,
    },
    {
      name: "Sales",
      path: "/sales",
      icon: PaymentsIcon,
    },
    {
      name: "Returns",
      path: "/sales-return",
      icon: ReturnsIcon,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: CustomersIcon,
    },
    {
      name: "Suppliers",
      path: "/suppliers",
      icon: SuppliersIcon,
    },
    {
      name: "Stock",
      path: "/stock",
      icon: StockIcon,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: ReportsIcon,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>Restaurant Billing</h2>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <span className="sidebar-icon">
                <Icon />
              </span>

              <span className="sidebar-text">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
