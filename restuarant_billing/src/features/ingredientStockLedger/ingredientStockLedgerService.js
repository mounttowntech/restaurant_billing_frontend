import API from "../../services/api";

export const getIngredientStockLedgers = async (filters = {}) => {
  const response = await API.get(`/ingredientstock/all`, {
    params: filters,
  });

  return response.data;
};

export const searchIngredientStockLedgers = async (search) => {
  const response = await API.get(`/ingredientstock/all`, {
    params: { search },
  });

  return response.data;
};

export const getIngredientStockLedgerById = async (id) => {
  const response = await API.get(`/ingredientstock/${id}`);

  return response.data;
};

export const createIngredientStockLedger = async (data) => {
  const response = await API.post(`/ingredientstock/create`, data);

  return response.data;
};

export const updateIngredientStockLedger = async (id, data) => {
  const response = await API.put(`/ingredientstock/${id}`, data);

  return response.data;
};

export const deleteIngredientStockLedger = async (id) => {
  const response = await API.delete(`/ingredientstock/${id}`);

  return response.data;
};

export const restoreIngredientStockLedger = async (id) => {
  const response = await API.put(`/ingredientstock/restore/${id}`);

  return response.data;
};

export const getIngredientLedgerHistory = async (ingredientId) => {
  const response = await API.get(`/ingredientstock/ingredient/${ingredientId}`);

  return response.data;
};

export const getStoreLedger = async (storeId, filters = {}) => {
  const response = await API.get(`/ingredientstock/store/${storeId}`, {
    params: filters,
  });

  return response.data;
};

export const getWarehouseLedger = async (warehouseId, filters = {}) => {
  const response = await API.get(`/ingredientstock/warehouse/${warehouseId}`, {
    params: filters,
  });

  return response.data;
};

export const getTransactionTypeLedger = async (transactionType) => {
  const response = await API.get(
    `/ingredientstock/transaction/${encodeURIComponent(transactionType)}`,
  );

  return response.data;
};

export const getStockInReport = async (filters = {}) => {
  const response = await API.get(`/ingredientstock/reports/stock-in`, {
    params: filters,
  });

  return response.data;
};

export const getStockOutReport = async (filters = {}) => {
  const response = await API.get(`/ingredientstock/reports/stock-out`, {
    params: filters,
  });

  return response.data;
};

export const getTodayTransactions = async () => {
  const response = await API.get(`/ingredientstock/reports/today`);

  return response.data;
};

export const getStockSummary = async () => {
  const response = await API.get(`/ingredientstock/reports/summary`);

  return response.data;
};

const ingredientStockLedgerService = {
  getIngredientStockLedgers,
  searchIngredientStockLedgers,
  getIngredientStockLedgerById,
  createIngredientStockLedger,
  updateIngredientStockLedger,
  deleteIngredientStockLedger,
  restoreIngredientStockLedger,
  getIngredientLedgerHistory,
  getStoreLedger,
  getWarehouseLedger,
  getTransactionTypeLedger,
  getStockInReport,
  getStockOutReport,
  getTodayTransactions,
  getStockSummary,
};

export { ingredientStockLedgerService };
