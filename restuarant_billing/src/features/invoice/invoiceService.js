import API from "../../services/api";

// ==========================================================
// Get All Invoices
// ==========================================================

const getInvoices = async () => {
  const response = await API.get("/invoices/all");

  return response.data;
};

// ==========================================================
// Get Invoice By ID
// ==========================================================

const getInvoiceById = async (id) => {
  const response = await API.get(`/invoices/${id}`);

  return response.data;
};

// ==========================================================
// Create Invoice
// ==========================================================

const createInvoice = async (data) => {
  const response = await API.post("/invoices/create", data);

  return response.data;
};

// ==========================================================
// Update Invoice
// ==========================================================

const updateInvoice = async (id, data) => {
  const response = await API.put(`/invoices/${id}`, data);

  return response.data;
};

// ==========================================================
// Delete Invoice
// ==========================================================

const deleteInvoice = async (id) => {
  const response = await API.delete(`/invoices/${id}`);

  return response.data;
};

// ==========================================================
// Mark Invoice Paid
// ==========================================================

const markInvoicePaid = async (id, data) => {
  const response = await API.put(`/invoices/${id}/mark-paid`, data);

  return response.data;
};

// ==========================================================
// Cancel Invoice
// ==========================================================

const cancelInvoice = async (id, data) => {
  const response = await API.put(`/invoices/${id}/cancel`, data);

  return response.data;
};

// ==========================================================
// Refund Invoice
// ==========================================================

const refundInvoice = async (id) => {
  const response = await API.put(`/invoices/${id}/refund`);

  return response.data;
};

// ==========================================================
// Restore Invoice
// ==========================================================

const restoreInvoice = async (id) => {
  const response = await API.put(`/invoices/${id}/restore`);

  return response.data;
};

// ==========================================================
// Today's Sales
// ==========================================================

const getTodaySales = async () => {
  const response = await API.get("/invoices/reports/today-sales");

  return response.data;
};

// ==========================================================
// Pending Invoices
// ==========================================================

const getPendingInvoices = async () => {
  const response = await API.get("/invoices/reports/pending");

  return response.data;
};

// ==========================================================
// Daily Collection
// ==========================================================

const getDailyCollection = async (date) => {
  const response = await API.get("/invoices/reports/daily-collection", {
    params: {
      date,
    },
  });

  return response.data;
};

// ==========================================================
// Store Sales
// ==========================================================

const getStoreSales = async (storeId) => {
  const response = await API.get(`/invoices/reports/store/${storeId}`);

  return response.data;
};

// ==========================================================
// Invoice Service Object
// ==========================================================

export const invoiceService = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  markInvoicePaid,
  cancelInvoice,
  refundInvoice,
  restoreInvoice,
  getTodaySales,
  getPendingInvoices,
  getDailyCollection,
  getStoreSales,
};
