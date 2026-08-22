import API from "../../services/api";

/* ==========================================================
   Get All Warehouses
========================================================== */

export const getWarehouses = async (filters = {}) => {
  const response = await API.get(`/warehouse/all`, {
    params: filters,
  });

  return response.data;
};

/* ==========================================================
   Search Warehouses
========================================================== */

export const searchWarehouses = async (search) => {
  const response = await API.get(`/warehouse/search`, {
    params: { keyword: search },
  });

  return response.data;
};

/* ==========================================================
   Get Warehouse By ID
========================================================== */

export const getWarehouseById = async (id) => {
  const response = await API.get(`/warehouse/${id}`);

  return response.data;
};

/* ==========================================================
   Create Warehouse
========================================================== */

export const createWarehouse = async (data) => {
  const response = await API.post(`/warehouse/create`, data);

  return response.data;
};

/* ==========================================================
   Update Warehouse
========================================================== */

export const updateWarehouse = async (id, data) => {
  const response = await API.put(`/warehouse/update/${id}`, data);

  return response.data;
};

/* ==========================================================
   Delete Warehouse
========================================================== */

export const deleteWarehouse = async (id) => {
  const response = await API.delete(`/warehouse/delete/${id}`);

  return response.data;
};

/* ==========================================================
   Restore Warehouse
========================================================== */

export const restoreWarehouse = async (id) => {
  const response = await API.put(`/warehouse/restore/${id}`);

  return response.data;
};

/* ==========================================================
   Set Default Warehouse
========================================================== */

export const setDefaultWarehouse = async (id) => {
  const response = await API.put(`/warehouse/set-default/${id}`);

  return response.data;
};

/* ==========================================================
   Get Default Warehouse
========================================================== */

export const getDefaultWarehouse = async () => {
  const response = await API.get(`/warehouse/default`);

  return response.data;
};

/* ==========================================================
   Get Warehouse Summary
========================================================== */

export const getWarehouseSummary = async () => {
  const response = await API.get(`/warehouse/summary`);

  return response.data;
};

/* ==========================================================
   Get Restaurants
========================================================== */

export const getRestaurants = async () => {
  const response = await API.get(`/restaurants/all`);

  return response.data;
};

/* ==========================================================
   Get Stores
========================================================== */

export const getStores = async (restaurant = "") => {
  const response = await API.get(`/store/all`, {
    params: restaurant ? { restaurant } : {},
  });

  return response.data;
};

/* ==========================================================
   Get Users / Managers
========================================================== */

export const getUsers = async () => {
  const response = await API.get(`/users/all`);

  return response.data;
};

/* ==========================================================
   Service Object
========================================================== */

const warehouseService = {
  getWarehouses,
  searchWarehouses,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  restoreWarehouse,
  setDefaultWarehouse,
  getDefaultWarehouse,
  getWarehouseSummary,
  getRestaurants,
  getStores,
  getUsers,
};

export { warehouseService };
