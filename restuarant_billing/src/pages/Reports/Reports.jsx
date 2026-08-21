import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSalesReport,
  fetchPurchaseReport,
  fetchExpenseReport,
  fetchStockReport,
  fetchTaxReport,
  fetchPaymentReport,
  fetchProductReport,
  fetchProfitLossReport,
} from "../../features/reports/reportSlice";

import "./Reports.css";

const Reports = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.report);

  const [reportType, setReportType] = useState("sales");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [reportSummary, setReportSummary] = useState(null);
  const [generatedReport, setGeneratedReport] = useState([]);
  const [generated, setGenerated] = useState(false);

  const reportOptions = [
    { value: "sales", label: "Sales Report" },
    { value: "purchase", label: "Purchase Report" },
    { value: "expense", label: "Expense Report" },
    { value: "stock", label: "Stock Report" },
    { value: "tax", label: "Tax Report" },
    { value: "payment", label: "Payment Report" },
    { value: "product", label: "Product Report" },
    { value: "profit-loss", label: "Profit & Loss" },
  ];

  // ==========================================================
  // GENERATE REPORT
  // ==========================================================

  const handleGenerateReport = async () => {
    const filters = {};

    if (fromDate) filters.fromDate = fromDate;
    if (toDate) filters.toDate = toDate;

    try {
      let response;

      switch (reportType) {
        case "sales":
          response = await dispatch(fetchSalesReport(filters)).unwrap();
          break;

        case "purchase":
          response = await dispatch(fetchPurchaseReport(filters)).unwrap();
          break;

        case "expense":
          response = await dispatch(fetchExpenseReport(filters)).unwrap();
          break;

        case "stock":
          response = await dispatch(fetchStockReport(filters)).unwrap();
          break;

        case "tax":
          response = await dispatch(fetchTaxReport(filters)).unwrap();
          break;

        case "payment":
          response = await dispatch(fetchPaymentReport(filters)).unwrap();
          break;

        case "product":
          response = await dispatch(fetchProductReport(filters)).unwrap();
          break;

        case "profit-loss":
          response = await dispatch(fetchProfitLossReport(filters)).unwrap();
          break;

        default:
          response = null;
      }

      console.log("REPORT RESPONSE:", response);

      const data = response?.data ?? response;

      /*
       * If API returns an array
       */
      if (Array.isArray(data)) {
        setGeneratedReport(data);
        setReportSummary(null);
      } else {
        /*
         * If API returns an object
         */
        setGeneratedReport([]);
        setReportSummary(data || {});
      }

      setGenerated(true);
    } catch (err) {
      console.error("Report generation failed:", err);

      setGeneratedReport([]);
      setReportSummary(null);
      setGenerated(true);
    }
  };

  // ==========================================================
  // REPORT CHANGE
  // ==========================================================

  const handleReportChange = (e) => {
    setReportType(e.target.value);
    setGenerated(false);
    setGeneratedReport([]);
    setReportSummary(null);
  };

  // ==========================================================
  // CLEAR
  // ==========================================================

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setGenerated(false);
    setGeneratedReport([]);
    setReportSummary(null);
  };

  // ==========================================================
  // FORMAT VALUE
  // ==========================================================

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return value;
  };

  // ==========================================================
  // FORMAT MONEY
  // ==========================================================

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (value) => {
    if (!value) return "-";

    return new Date(value).toLocaleDateString("en-IN");
  };

  // ==========================================================
  // SALES REPORT
  // ==========================================================

  const renderSalesReport = () => {
    const data = reportSummary || {};

    return (
      <div className="reports-details-grid">
        <ReportDetail label="Total Orders" value={data.totalOrders} />

        <ReportDetail
          label="Total Sales"
          value={formatMoney(data.totalSales)}
        />

        <ReportDetail label="Sub Total" value={formatMoney(data.subTotal)} />

        <ReportDetail label="Tax" value={formatMoney(data.tax)} />

        <ReportDetail label="Discount" value={formatMoney(data.discount)} />

        <ReportDetail
          label="Paid Amount"
          value={formatMoney(data.paidAmount)}
        />

        <ReportDetail
          label="Pending Amount"
          value={formatMoney(data.pendingAmount)}
        />

        <ReportDetail
          label="Average Order Value"
          value={formatMoney(data.averageOrderValue)}
        />
      </div>
    );
  };

  // ==========================================================
  // PURCHASE REPORT
  // ==========================================================

  const renderPurchaseReport = () => {
    const data = reportSummary || {};

    return (
      <div className="reports-details-grid">
        <ReportDetail
          label="Total Purchase Count"
          value={data.totalPurchaseCount}
        />

        <ReportDetail
          label="Total Purchases"
          value={formatMoney(data.totalPurchases)}
        />

        <ReportDetail
          label="Paid Amount"
          value={formatMoney(data.paidAmount)}
        />

        <ReportDetail
          label="Pending Amount"
          value={formatMoney(data.pendingAmount)}
        />

        <ReportDetail label="From Date" value={formatDate(data.period?.from)} />

        <ReportDetail label="To Date" value={formatDate(data.period?.to)} />
      </div>
    );
  };

  // ==========================================================
  // EXPENSE REPORT
  // ==========================================================

  const renderExpenseReport = () => {
    const data = reportSummary || {};

    return (
      <div className="reports-details-grid">
        <ReportDetail label="Expense Count" value={data.expenseCount} />

        <ReportDetail
          label="Total Expenses"
          value={formatMoney(data.totalExpenses)}
        />

        <ReportDetail label="From Date" value={formatDate(data.period?.from)} />

        <ReportDetail label="To Date" value={formatDate(data.period?.to)} />
      </div>
    );
  };

  // ==========================================================
  // STOCK REPORT
  // ==========================================================

  const renderStockReport = () => {
    const data = reportSummary || {};

    return (
      <>
        <div className="reports-details-grid">
          <ReportDetail label="Total Products" value={data.totalProducts} />

          <ReportDetail label="Total Quantity" value={data.totalQuantity} />

          <ReportDetail
            label="Total Stock Value"
            value={formatMoney(data.totalStockValue)}
          />

          <ReportDetail label="Low Stock Count" value={data.lowStockCount} />
        </div>

        <div className="reports-section">
          <h3>Products</h3>

          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock Quantity</th>
                  <th>Purchase Price</th>
                  <th>Selling Price</th>
                  <th>Stock Value</th>
                  <th>Low Stock</th>
                </tr>
              </thead>

              <tbody>
                {(data.products || []).map((item, index) => (
                  <tr key={item.productId || index}>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.stockQuantity}</td>
                    <td>{formatMoney(item.purchasePrice)}</td>
                    <td>{formatMoney(item.sellingPrice)}</td>
                    <td>{formatMoney(item.stockValue)}</td>
                    <td>{item.lowStock ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="reports-section">
          <h3>Low Stock Products</h3>

          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Purchase Price</th>
                  <th>Selling Price</th>
                  <th>Selling Value</th>
                  <th>Stock Value</th>
                </tr>
              </thead>

              <tbody>
                {(data.lowStockProducts || []).map((item, index) => (
                  <tr key={item.productId || index}>
                    <td>{item.productName}</td>
                    <td>{item.category}</td>
                    <td>{item.stockQuantity}</td>
                    <td>{formatMoney(item.purchasePrice)}</td>
                    <td>{formatMoney(item.sellingPrice)}</td>
                    <td>{formatMoney(item.sellingValue)}</td>
                    <td>{formatMoney(item.stockValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  // ==========================================================
  // TAX REPORT
  // ==========================================================

  const renderTaxReport = () => {
    const data = reportSummary || {};

    return (
      <div className="reports-details-grid">
        <ReportDetail label="Order Count" value={data.orderCount} />

        <ReportDetail
          label="Total Sales"
          value={formatMoney(data.totalSales)}
        />

        <ReportDetail
          label="Taxable Amount"
          value={formatMoney(data.taxableAmount)}
        />

        <ReportDetail label="Total Tax" value={formatMoney(data.totalTax)} />

        <ReportDetail label="From Date" value={formatDate(data.period?.from)} />

        <ReportDetail label="To Date" value={formatDate(data.period?.to)} />
      </div>
    );
  };

  // ==========================================================
  // PAYMENT REPORT
  // ==========================================================

  const renderPaymentReport = () => {
    const data = reportSummary || {};

    return (
      <>
        <div className="reports-details-grid">
          <ReportDetail
            label="Total Payment"
            value={formatMoney(data.totalPayment)}
          />

          <ReportDetail
            label="From Date"
            value={formatDate(data.period?.from)}
          />

          <ReportDetail label="To Date" value={formatDate(data.period?.to)} />
        </div>

        <div className="reports-section">
          <h3>Payment Methods</h3>

          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Count</th>
                </tr>
              </thead>

              <tbody>
                {(data.methods || []).map((item, index) => (
                  <tr key={index}>
                    <td>{item.paymentMethod}</td>
                    <td>{formatMoney(item.amount)}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  // ==========================================================
  // PRODUCT REPORT
  // ==========================================================

  const renderProductReport = () => {
    if (!generatedReport.length) {
      return (
        <div className="reports-empty">
          <h3>No Product Data</h3>
          <p>No product report data was returned by the API.</p>
        </div>
      );
    }

    return (
      <div className="reports-table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Sales</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {generatedReport.map((item, index) => (
              <tr key={item._id || index}>
                <td>{formatValue(item.product)}</td>
                <td>{formatValue(item.category)}</td>
                <td>{formatValue(item.quantity)}</td>
                <td>{formatValue(item.sales)}</td>
                <td>{formatMoney(item.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ==========================================================
  // PROFIT LOSS REPORT
  // ==========================================================

  const renderProfitLossReport = () => {
    const data = reportSummary || {};

    return (
      <div className="reports-details-grid">
        <ReportDetail
          label="Sales Revenue"
          value={formatMoney(data.revenue?.sales)}
        />

        <ReportDetail
          label="Purchases"
          value={formatMoney(data.cost?.purchases)}
        />

        <ReportDetail
          label="Expenses"
          value={formatMoney(data.cost?.expenses)}
        />

        <ReportDetail
          label="Gross Profit"
          value={formatMoney(data.grossProfit)}
        />

        <ReportDetail label="Net Profit" value={formatMoney(data.netProfit)} />

        <ReportDetail
          label="Profit Margin"
          value={`${data.profitMargin || 0}%`}
        />

        <ReportDetail label="From Date" value={formatDate(data.period?.from)} />

        <ReportDetail label="To Date" value={formatDate(data.period?.to)} />
      </div>
    );
  };

  // ==========================================================
  // RENDER CURRENT REPORT
  // ==========================================================

  const renderReport = () => {
    switch (reportType) {
      case "sales":
        return renderSalesReport();

      case "purchase":
        return renderPurchaseReport();

      case "expense":
        return renderExpenseReport();

      case "stock":
        return renderStockReport();

      case "tax":
        return renderTaxReport();

      case "payment":
        return renderPaymentReport();

      case "product":
        return renderProductReport();

      case "profit-loss":
        return renderProfitLossReport();

      default:
        return null;
    }
  };

  // ==========================================================
  // PRINT
  // ==========================================================

  const handlePrint = () => {
    window.print();
  };

  // ==========================================================
  // EXPORT
  // ==========================================================

  const handleExport = () => {
    if (!reportSummary && !generatedReport.length) return;

    const data = reportSummary || generatedReport;

    const csv = JSON.stringify(data, null, 2);

    const blob = new Blob([csv], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${reportType}-report.json`;

    link.click();

    URL.revokeObjectURL(url);
  };

  const currentReportLabel =
    reportOptions.find((report) => report.value === reportType)?.label ||
    "Report";

  return (
    <div className="reports-page">
      {/* HEADER */}

      <div className="reports-page-header">
        <div>
          <h1>Reports</h1>
          <p>View and analyze your business reports</p>
        </div>

        <div className="reports-header-actions">
          <button
            type="button"
            className="reports-print-btn"
            onClick={handlePrint}
            disabled={!generated}
          >
            Print
          </button>

          <button
            type="button"
            className="reports-export-btn"
            onClick={handleExport}
            disabled={!generated}
          >
            Export
          </button>
        </div>
      </div>

      {/* ERROR */}

      {error && <div className="reports-error">{error}</div>}

      {/* FILTER */}

      <div className="reports-filter-card">
        <div className="reports-filter-group">
          <label>Report Type</label>

          <select value={reportType} onChange={handleReportChange}>
            {reportOptions.map((report) => (
              <option key={report.value} value={report.value}>
                {report.label}
              </option>
            ))}
          </select>
        </div>

        <div className="reports-filter-group">
          <label>From Date</label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="reports-filter-group">
          <label>To Date</label>

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="reports-filter-actions">
          <button
            type="button"
            className="reports-clear-btn"
            onClick={handleClear}
          >
            Clear
          </button>

          <button
            type="button"
            className="reports-generate-btn"
            onClick={handleGenerateReport}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </div>

      {/* REPORT */}

      <div className="reports-table-card">
        <div className="reports-table-header">
          <div>
            <h2>{currentReportLabel}</h2>

            <p>
              {generated
                ? "Report data loaded successfully"
                : "Select filters and generate report"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="reports-loading">Loading report...</div>
        ) : !generated ? (
          <div className="reports-empty">
            <h3>No Report Generated</h3>

            <p>
              Select the report type and date range, then click Generate Report.
            </p>
          </div>
        ) : (
          <div className="reports-content">{renderReport()}</div>
        )}
      </div>
    </div>
  );
};

const ReportDetail = ({ label, value }) => {
  return (
    <div className="reports-detail-card">
      <span>{label}</span>
      <strong>{value ?? 0}</strong>
    </div>
  );
};

export default Reports;
