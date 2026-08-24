import "./MainLayout.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

function MainLayout({ children }) {
  return (
    <div className="layout">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Side */}

      <div className="layout-right">

        <Header />

        <main className="layout-content">

          {children}

        </main>

      </div>

    </div>
  );
}

export default MainLayout;