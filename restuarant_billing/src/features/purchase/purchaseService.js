import API from "../../services/api";

// ==========================================================
// CREATE
// ==========================================================

export const createPurchase = async (data) => {
  const response = await API.post(`/purchases/create`, data);

  return response.data;
};

// ==========================================================
// GET ALL
// ==========================================================

export const getPurchases = async (filters = {}) => {
  const response = await API.get(`/purchases/all`, {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// GET SINGLE
// ==========================================================

export const getPurchaseById = async (id) => {
  const response = await API.get(`/purchases/${id}`);

  return response.data;
};

// ==========================================================
// UPDATE
// ==========================================================

export const updatePurchase = async (id, data) => {
  const response = await API.put(`/purchases/update/${id}`, data);

  return response.data;
};

// ==========================================================
// DELETE
// ==========================================================

export const deletePurchase = async (id) => {
  const response = await API.delete(`/purchases/delete/${id}`);

  return response.data;
};

// ==========================================================
// RESTORE
// ==========================================================

export const restorePurchase = async (id) => {
  const response = await API.put(`/purchases/restore/${id}`);

  return response.data;
};

// ==========================================================
// RECEIVE
// ==========================================================

export const receivePurchase = async (id) => {
  const response = await API.put(`/purchases/receive/${id}`);

  return response.data;
};

// ==========================================================
// CANCEL
// ==========================================================

export const cancelPurchase = async (id) => {
  const response = await API.put(`/purchases/cancel/${id}`);

  return response.data;
};

// ==========================================================
// PAYMENT
// ==========================================================

export const updatePaymentStatus = async (id, data) => {
  const response = await API.put(`/purchases/payment/${id}`, data);

  return response.data;
};

// ==========================================================
// SEARCH
// ==========================================================

export const searchPurchase = async (search) => {
  const response = await API.get(`/purchases/search`, {
    params: {
      search,
    },
  });

  return response.data;
};

// ==========================================================
// TODAY
// ==========================================================

export const getTodayPurchases = async () => {
  const response = await API.get(`/purchases/today`);

  return response.data;
};

// ==========================================================
// SUPPLIER WISE
// ==========================================================

export const getSupplierWisePurchases = async (supplierId) => {
  const response = await API.get(`/purchases/supplier/${supplierId}`);

  return response.data;
};

// ==========================================================
// STORE WISE
// ==========================================================

export const getStoreWisePurchases = async (storeId) => {
  const response = await API.get(`/purchases/store/${storeId}`);

  return response.data;
};

// ==========================================================
// SUMMARY
// ==========================================================

export const getPurchaseSummary = async () => {
  const response = await API.get(`/purchases/summary`);

  return response.data;
};
