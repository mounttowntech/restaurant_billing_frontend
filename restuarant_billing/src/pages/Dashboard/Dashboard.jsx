import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";

import {
  fetchDashboardCards,
  fetchRecentSales,
} from "../../features/dashboard/dashboardSlice";
import {
  PaymentsIcon,
  OrdersIcon,
  BillsIcon,
  LowStockIcon,
  CustomersIcon,
} from "../../components/Layouts/SidebarIcons";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    cards = {},
    recentSales = [],
    loading,
    recentSalesLoading,
    error,
    recentSalesError,
  } = useSelector((state) => state.dashboard || {});

  useEffect(() => {
    dispatch(fetchDashboardCards());
    dispatch(fetchRecentSales(10));
  }, [dispatch]);

  // ================= Format Date =================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================= Format Amount =================

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // ================= Payment Status =================

  const getPaymentStatus = (sale) => {
    const status = String(
      sale.paymentStatus || sale.status || "",
    ).toLowerCase();

    if (status === "paid" || status === "completed" || status === "success") {
      return "Paid";
    }

    if (
      status === "pending" ||
      status === "partial" ||
      status === "partially_paid"
    ) {
      return "Pending";
    }

    if (status === "overdue" || status === "failed" || status === "cancelled") {
      return "Overdue";
    }

    if (Number(sale.dueAmount || 0) > 0) {
      return "Pending";
    }

    return "Paid";
  };

  return (
    <div className="dashboard-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>Overview of your restaurant business</p>
        </div>
      </div>

      {/* =====================================================
          DASHBOARD ERROR
      ===================================================== */}

      {error && <div className="dashboard-error">{error}</div>}

      {/* =====================================================
          DASHBOARD CARDS
      ===================================================== */}

      {!loading && (
        <div className="dashboard-cards">
          {/* ================= Total Sales ================= */}

          <div className="dashboard-card">
            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Total Sales</span>

              <h2>₹{Number(cards.totalSales || 0).toLocaleString("en-IN")}</h2>

              <span className="dashboard-card-label">Total sales amount</span>
            </div>
            <div className="dashboard-card-icon customers-icon">
              <PaymentsIcon />
            </div>
          </div>

          {/* ================= Total Bills ================= */}

          <div className="dashboard-card">
            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Total Bills</span>

              <h2>{cards.totalBills || 0}</h2>

              <span className="dashboard-card-label">Total invoices</span>
            </div>
            <div className="dashboard-card-icon customers-icon">
              <BillsIcon />
            </div>
          </div>

          {/* ================= Total Orders ================= */}

          <div className="dashboard-card">
            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Total Orders</span>

              <h2>{cards.totalOrders || 0}</h2>

              <span className="dashboard-card-label">Total orders</span>
            </div>

            <div className="dashboard-card-icon orders-icon">
              <OrdersIcon />
            </div>
          </div>

          {/* ================= Total Customers ================= */}

          <div className="dashboard-card">
            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Total Customers</span>

              <h2>{cards.totalCustomers || 0}</h2>

              <span className="dashboard-card-label">Registered customers</span>
            </div>

            <div className="dashboard-card-icon customers-icon">
              {" "}
              <CustomersIcon />
            </div>
          </div>

          {/* ================= Low Stock ================= */}

          <div className="dashboard-card low-stock-card">
            <div className="dashboard-card-content">
              <span className="dashboard-card-title">Low Stock</span>

              <h2>{cards.lowStock || 0}</h2>

              <span className="dashboard-card-label">
                Ingredients need attention
              </span>
            </div>

            <div className="dashboard-card-icon stock-icon">
              {" "}
              <LowStockIcon />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          RECENT SALES
      ===================================================== */}

      <div className="recent-sales-box">
        {/* ================= Recent Sales Header ================= */}

        <div className="recent-sales-header">
          <div>
            <h2>Recent Sales</h2>

            <p>Monitoring your last 10 transactions</p>
          </div>
        </div>

        {/* ================= Error ================= */}

        {recentSalesError && (
          <div className="recent-sales-error">{recentSalesError}</div>
        )}

        {/* ================= Loading ================= */}

        {recentSalesLoading ? (
          <div className="recent-sales-loading">Loading recent sales...</div>
        ) : (
          <div className="recent-sales-table-wrapper">
            <table className="recent-sales-table">
              <thead>
                <tr>
                  <th>INVOICE</th>
                  <th>CUSTOMER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {recentSales.length > 0 ? (
                  recentSales.slice(0, 4).map((sale) => {
                    const paymentStatus = getPaymentStatus(sale);

                    return (
                      <tr key={sale._id || sale.invoiceNo || sale.orderNo}>
                        {/* Invoice */}

                        <td>
                          <div className="recent-invoice">
                            <div className="invoice-icon">▣</div>

                            <div>
                              <strong>
                                {sale.invoiceNo || sale.orderNo || "-"}
                              </strong>
                            </div>
                          </div>
                        </td>

                        {/* Customer */}

                        <td>
                          <span className="customer-name">
                            {sale.customer?.name || "Walk-in Customer"}
                          </span>
                        </td>

                        {/* Date */}

                        <td>{formatDate(sale.createdAt)}</td>

                        {/* Total */}

                        <td>
                          <strong className="sale-total">
                            {formatAmount(sale.grandTotal)}
                          </strong>
                        </td>

                        {/* Status */}

                        <td>
                          <span
                            className={`sale-status ${paymentStatus
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            <span className="status-dot"></span>

                            {paymentStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="no-sales">
                      No recent sales found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {recentSales.length > 0 && (
          <div className="recent-sales-footer">
            Showing {Math.min(recentSales.length, 4)} recent transaction
            {Math.min(recentSales.length, 4) !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
