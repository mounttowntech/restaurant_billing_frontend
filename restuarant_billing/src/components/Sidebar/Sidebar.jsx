import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import {
  FaStore,
  FaThLarge,
  FaCashRegister,
  FaBoxOpen,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUndoAlt,
  FaUsers,
  FaTruck,
  FaWarehouse,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaThLarge />,
      path: "/dashboard",
    },
    {
      name: "POS",
      icon: <FaCashRegister />,
      path: "/pos",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/products",
    },
    {
      name: "Purchase",
      icon: <FaShoppingCart />,
      path: "/purchase",
    },
    {
      name: "Sales",
      icon: <FaMoneyBillWave />,
      path: "/sales",
    },
    {
      name: "Returns",
      icon: <FaUndoAlt />,
      path: "/returns",
    },
    {
      name: "Customers",
      icon: <FaUsers />,
      path: "/customers",
    },
    {
      name: "Suppliers",
      icon: <FaTruck />,
      path: "/suppliers",
    },
    {
      name: "Stock",
      icon: <FaWarehouse />,
      path: "/stock",
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
    },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}

      <div className="sidebar-logo">
        <div className="logo-icon">
          <FaStore />
        </div>

        <div>
          <h2>BillingPro</h2>
          <p>Enterprise Edition</p>
        </div>
      </div>

      {/* Menu */}

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span className="menu-icon">{item.icon}</span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}

      <div className="sidebar-bottom">
        <NavLink to="/settings" className="menu-item">
          <span className="menu-icon">
            <FaCog />
          </span>

          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;