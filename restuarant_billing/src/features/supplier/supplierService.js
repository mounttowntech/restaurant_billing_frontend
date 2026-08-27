import API from "../../services/api";

export const getSuppliers = async (filters = {}) => {
  const response = await API.get(`/suppliers/all`, {
    params: filters,
  });

  return response.data;
};

export const searchSuppliers = async (search) => {
  const response = await API.get(`/suppliers/reports/search`, {
    params: { keyword: search },
  });

  return response.data;
};

export const getSupplierById = async (id) => {
  const response = await API.get(`/suppliers/${id}`);

  return response.data;
};

export const createSupplier = async (data) => {
  const response = await API.post(`/suppliers/create`, data);

  return response.data;
};

export const updateSupplier = async (id, data) => {
  const response = await API.put(`/suppliers/update/${id}`, data);

  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await API.delete(`/suppliers/delete/${id}`);

  return response.data;
};

export const restoreSupplier = async (id) => {
  const response = await API.put(`/suppliers/restore/${id}`);

  return response.data;
};

export const changeSupplierStatus = async (id, isActive) => {
  const response = await API.put(`/suppliers/status/${id}`, {
    isActive,
  });

  return response.data;
};

export const markPreferredSupplier = async (id) => {
  const response = await API.put(`/suppliers/preferred/${id}`);

  return response.data;
};

export const removePreferredSupplier = async (id) => {
  const response = await API.put(`/suppliers/preferred/remove/${id}`);

  return response.data;
};

export const getSupplierSummary = async () => {
  const response = await API.get(`/suppliers/reports/summary`);

  return response.data;
};

export const getSupplierAnalytics = async () => {
  const response = await API.get(`/suppliers/reports/analytics`);

  return response.data;
};

const supplierService = {
  getSuppliers,
  searchSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  restoreSupplier,
  changeSupplierStatus,
  markPreferredSupplier,
  removePreferredSupplier,
  getSupplierSummary,
  getSupplierAnalytics,
};

export { supplierService };
