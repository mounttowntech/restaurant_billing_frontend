import API from "../../services/api";

// ==========================================================
// Sales Report
// ==========================================================

export const getSalesReport = async (filters = {}) => {
  const response = await API.get("/reports/sales", {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Purchase Report
// ==========================================================

export const getPurchaseReport = async (filters = {}) => {
  const response = await API.get("/reports/purchase", {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Expense Report
// ==========================================================

export const getExpenseReport = async (filters = {}) => {
  const response = await API.get("/reports/expense", {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Stock Report
// ==========================================================

export const getStockReport = async (filters = {}) => {
  const response = await API.get("/reports/stock", {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Tax Report
// ==========================================================

export const getTaxReport = async (filters = {}) => {
  const response = await API.get("/reports/tax", {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Payment Report
// ==========================================================

export const getPaymentReport = async (filters = {}) => {
  const response = await API.get("/reports/payment", {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Product Report
// ==========================================================

export const getProductReport = async (filters = {}) => {
  const response = await API.get("/reports/product", {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Profit & Loss Report
// ==========================================================

export const getProfitLossReport = async (filters = {}) => {
  const response = await API.get("/reports/profit-loss", {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Service Object
// ==========================================================

const reportService = {
  getSalesReport,
  getPurchaseReport,
  getExpenseReport,
  getStockReport,
  getTaxReport,
  getPaymentReport,
  getProductReport,
  getProfitLossReport,
};

export { reportService };
