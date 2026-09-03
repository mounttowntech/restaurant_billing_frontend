// ========================= Sidebar.jsx =========================

import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import {
  DashboardIcon,
  POSIcon,
  RestaurantIcon,
  ProductsIcon,
  WarehouseIcon,
  RoleIcon,
  UnitIcon,
  TablesIcon,
  StoreIcon,
  CompaniesIcon,
  CustomersIcon,
  MenuCategoriesIcon,
  PurchaseIcon,
  IngredientStockLedgerIcon,
  RecipeIcon,
  KOTIcon,
  SuppliersIcon,
  IngredientIcon,
  OrderIcon,
  CategoryIcon,
  ReturnsIcon,
  menuItemIcon,
  ReportsIcon,
  AddonIcon,
} from "./SidebarIcons";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: DashboardIcon,
    },
    {
      name: "POS-Billing",
      path: "/pos-billing",
      icon: POSIcon,
    },
    {
      name: "Restaurants",
      path: "/restaurants",
      icon: RestaurantIcon,
    },
    {
      name: "Tables",
      path: "/tables",
      icon: TablesIcon,
    },
    {
      name: "Menu Categories",
      path: "/menu-categories",
      icon: MenuCategoriesIcon,
    },
    {
      name: "Roles",
      path: "/roles",
      icon: RoleIcon,
    },
    {
      name: "Ingredients",
      path: "/ingredient",
      icon: IngredientIcon,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: CategoryIcon,
    },
    {
      name: "Products",
      path: "/products",
      icon: ProductsIcon,
    },
    {
      name: "Ingredient-stock",
      path: "/ingredient-stock-ledger",
      icon: IngredientStockLedgerIcon,
    },
    {
      name: "Units",
      path: "/units",
      icon: UnitIcon,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: OrderIcon,
    },
    {
      name: "Warehouse",
      path: "/warehouse",
      icon: WarehouseIcon,
    },
    {
      name: "Kot",
      path: "/kot",
      icon: KOTIcon,
    },
    {
      name: "Recipe",
      path: "/recipe",
      icon: RecipeIcon,
    },
    {
      name: "Store",
      path: "/store",
      icon: StoreIcon,
    },
    {
      name: "Purchase",
      path: "/purchases",
      icon: PurchaseIcon,
    },
    {
      name: "Companies",
      path: "/companies",
      icon: CompaniesIcon,
    },
    {
      name: "Invoices",
      path: "/invoices",
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
      name: "Menu Items",
      path: "/menu-items",
      icon: menuItemIcon,
    },
    {
      name: "Add-ons",
      path: "/add-ons",
      icon: AddonIcon,
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
