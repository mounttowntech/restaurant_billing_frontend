import API from "../../services/api";

/* ==========================================================
   Get All Units
========================================================== */

export const getUnits = async (filters = {}) => {
  const response = await API.get(`/unit/all`, {
    params: filters,
  });

  return response.data;
};

/* ==========================================================
   Search Units
========================================================== */

export const searchUnits = async (keyword, restaurant = "") => {
  const response = await API.get(`/unit/search`, {
    params: {
      keyword,
      ...(restaurant && { restaurant }),
    },
  });

  return response.data;
};

/* ==========================================================
   Get Unit By ID
========================================================== */

export const getUnitById = async (id) => {
  const response = await API.get(`/unit/${id}`);

  return response.data;
};

/* ==========================================================
   Create Unit
========================================================== */

export const createUnit = async (data) => {
  const response = await API.post(`/unit/create`, data);

  return response.data;
};

/* ==========================================================
   Update Unit
========================================================== */

export const updateUnit = async (id, data) => {
  const response = await API.put(`/unit/update/${id}`, data);

  return response.data;
};

/* ==========================================================
   Delete Unit
========================================================== */

export const deleteUnit = async (id) => {
  const response = await API.delete(`/unit/delete/${id}`);

  return response.data;
};

/* ==========================================================
   Restore Unit
========================================================== */

export const restoreUnit = async (id) => {
  const response = await API.put(`/unit/restore/${id}`);

  return response.data;
};

/* ==========================================================
   Activate Unit
========================================================== */

export const activateUnit = async (id) => {
  const response = await API.put(`/unit/activate/${id}`);

  return response.data;
};

/* ==========================================================
   Deactivate Unit
========================================================== */

export const deactivateUnit = async (id) => {
  const response = await API.put(`/unit/deactivate/${id}`);

  return response.data;
};

/* ==========================================================
   Get Restaurants
   Change this endpoint only if your restaurant route
   is different.
========================================================== */

export const getRestaurants = async () => {
  const response = await API.get(`/restaurants/all`);

  return response.data;
};

/* ==========================================================
   Service Object
========================================================== */

const unitService = {
  getUnits,
  searchUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
  restoreUnit,
  activateUnit,
  deactivateUnit,
  getRestaurants,
};

export { unitService };
