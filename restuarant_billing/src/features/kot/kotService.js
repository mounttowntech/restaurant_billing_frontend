import API from "../../services/api";

// ==========================================================
// Get All KOT
// ==========================================================

export const getKOTs = async (filters = {}) => {
  const response = await API.get(`/kot/all`, {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Search KOT
// ==========================================================

export const searchKOT = async (keyword) => {
  const response = await API.get(`/kot/search`, {
    params: {
      keyword,
    },
  });

  return response.data;
};

// ==========================================================
// Get KOT By ID
// ==========================================================

export const getKOTById = async (id) => {
  const response = await API.get(`/kot/${id}`);

  return response.data;
};

// ==========================================================
// Create KOT
// ==========================================================

export const createKOT = async (data) => {
  const response = await API.post(`/kot/create`, data);

  return response.data;
};

// ==========================================================
// Update KOT
// ==========================================================

export const updateKOT = async (id, data) => {
  const response = await API.put(`/kot/update/${id}`, data);

  return response.data;
};

// ==========================================================
// Delete KOT
// ==========================================================

export const deleteKOT = async (id) => {
  const response = await API.delete(`/kot/delete/${id}`);

  return response.data;
};

// ==========================================================
// Restore KOT
// ==========================================================

export const restoreKOT = async (id) => {
  const response = await API.patch(`/kot/restore/${id}`);

  return response.data;
};

// ==========================================================
// Kitchen Queue
// ==========================================================

export const getKitchenQueue = async () => {
  const response = await API.get(`/kot/kitchen-queue`);

  return response.data;
};

// ==========================================================
// Pending KOT
// ==========================================================

export const getPendingKOTs = async () => {
  const response = await API.get(`/kot/pending`);

  return response.data;
};

// ==========================================================
// Today's KOT
// ==========================================================

export const getTodayKOTs = async () => {
  const response = await API.get(`/kot/today`);

  return response.data;
};

// ==========================================================
// Chef Orders
// ==========================================================

export const getChefOrders = async (chefId) => {
  const response = await API.get(`/kot/chef/${chefId}`);

  return response.data;
};

// ==========================================================
// Mark Preparing
// ==========================================================

export const markPreparing = async (id) => {
  const response = await API.patch(`/kot/${id}/preparing`);

  return response.data;
};

// ==========================================================
// Mark Ready
// ==========================================================

export const markReady = async (id) => {
  const response = await API.patch(`/kot/${id}/ready`);

  return response.data;
};

// ==========================================================
// Mark Served
// ==========================================================

export const markServed = async (id) => {
  const response = await API.patch(`/kot/${id}/served`);

  return response.data;
};

// ==========================================================
// Mark Printed
// ==========================================================

export const markPrinted = async (id) => {
  const response = await API.patch(`/kot/${id}/printed`);

  return response.data;
};

// ==========================================================
// Service Object
// ==========================================================

const kotService = {
  getKOTs,
  searchKOT,
  getKOTById,
  createKOT,
  updateKOT,
  deleteKOT,
  restoreKOT,
  getKitchenQueue,
  getPendingKOTs,
  getTodayKOTs,
  getChefOrders,
  markPreparing,
  markReady,
  markServed,
  markPrinted,
};

export { kotService };
