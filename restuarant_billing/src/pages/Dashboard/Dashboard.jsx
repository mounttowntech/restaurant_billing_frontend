import "./Dashboard.css";

import Sidebar from "../../../src/components/Sidebar/Sidebar";
import Header from "../../../src/components/Header/Header";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="dashboard-main">

        {/* Header */}

        <Header />

        {/* Page Content */}

        <div className="dashboard-content">

          {/* Dashboard Cards */}

          <div className="dashboard-cards">

          </div>

          {/* Recent Sales */}

          <div className="dashboard-table">

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;