import API from "../../services/api";

export const getTables = async (filters = {}) => {
  const response = await API.get(`/tables/all`, {
    params: filters,
  });

  return response.data;
};

export const getTableById = async (id) => {
  const response = await API.get(`/tables/${id}`);

  return response.data;
};

export const createTable = async (data) => {
  const response = await API.post(`/tables/create`, data);

  return response.data;
};

export const updateTable = async (id, data) => {
  const response = await API.put(`/tables/update/${id}`, data);

  return response.data;
};

export const deleteTable = async (id) => {
  const response = await API.delete(`/tables/delete/${id}`);

  return response.data;
};

export const restoreTable = async (id) => {
  const response = await API.put(`/tables/restore/${id}`);

  return response.data;
};

export const activateTable = async (id) => {
  const response = await API.put(`/tables/activate/${id}`);

  return response.data;
};

export const deactivateTable = async (id) => {
  const response = await API.put(`/tables/deactivate/${id}`);

  return response.data;
};

export const updateTableStatus = async (id, status) => {
  const response = await API.put(`/tables/status/${id}`, {
    status,
  });

  return response.data;
};

export const assignWaiter = async (id, waiterId) => {
  const response = await API.put(`/tables/assign-waiter/${id}`, {
    waiterId,
  });

  return response.data;
};

export const removeWaiter = async (id) => {
  const response = await API.put(`/tables/remove-waiter/${id}`);

  return response.data;
};

export const reserveTable = async (id, reservationId) => {
  const response = await API.put(`/tables/reserve/${id}`, {
    reservationId,
  });

  return response.data;
};

export const releaseTable = async (id) => {
  const response = await API.put(`/tables/release/${id}`);

  return response.data;
};

export const occupyTable = async (id, orderId, waiterId) => {
  const response = await API.put(`/tables/occupy/${id}`, {
    orderId,
    waiterId,
  });

  return response.data;
};

export const cleanTable = async (id) => {
  const response = await API.put(`/tables/clean/${id}`);

  return response.data;
};

export const markOutOfService = async (id, notes = "") => {
  const response = await API.put(`/tables/out-of-service/${id}`, {
    notes,
  });

  return response.data;
};

export const mergeTables = async (id, mergedTables) => {
  const response = await API.put(`/tables/merge/${id}`, {
    mergedTables,
  });

  return response.data;
};

export const unmergeTables = async (id) => {
  const response = await API.put(`/tables/unmerge/${id}`);

  return response.data;
};

export const searchTables = async (search) => {
  const response = await API.get(`/tables/search/all`, {
    params: { keyword: search },
  });

  return response.data;
};

export const getAvailableTables = async (filters = {}) => {
  const response = await API.get(`/tables/available/all`, {
    params: filters,
  });

  return response.data;
};

export const getOccupiedTables = async (filters = {}) => {
  const response = await API.get(`/tables/occupied/all`, {
    params: filters,
  });

  return response.data;
};

export const getReservedTables = async (filters = {}) => {
  const response = await API.get(`/tables/reserved/all`, {
    params: filters,
  });

  return response.data;
};

export const getCleaningTables = async (filters = {}) => {
  const response = await API.get(`/tables/cleaning/all`, {
    params: filters,
  });

  return response.data;
};

export const getOutOfServiceTables = async (filters = {}) => {
  const response = await API.get(`/tables/out-of-service/all`, {
    params: filters,
  });

  return response.data;
};

export const getActiveTables = async (filters = {}) => {
  const response = await API.get(`/tables/active/all`, {
    params: filters,
  });

  return response.data;
};

export const getInactiveTables = async (filters = {}) => {
  const response = await API.get(`/tables/inactive/all`, {
    params: filters,
  });

  return response.data;
};

export const getDeletedTables = async (filters = {}) => {
  const response = await API.get(`/tables/deleted/all`, {
    params: filters,
  });

  return response.data;
};

export const getTableSummary = async (filters = {}) => {
  const response = await API.get(`/tables/summary/all`, {
    params: filters,
  });

  return response.data;
};

export const getTableAnalytics = async (filters = {}) => {
  const response = await API.get(`/tables/analytics/all`, {
    params: filters,
  });

  return response.data;
};

const tableService = {
  getTables,
  getTableById,
  createTable,
  updateTable,
  deleteTable,
  restoreTable,
  activateTable,
  deactivateTable,
  updateTableStatus,
  assignWaiter,
  removeWaiter,
  reserveTable,
  releaseTable,
  occupyTable,
  cleanTable,
  markOutOfService,
  mergeTables,
  unmergeTables,
  searchTables,
  getAvailableTables,
  getOccupiedTables,
  getReservedTables,
  getCleaningTables,
  getOutOfServiceTables,
  getActiveTables,
  getInactiveTables,
  getDeletedTables,
  getTableSummary,
  getTableAnalytics,
};

export { tableService };
