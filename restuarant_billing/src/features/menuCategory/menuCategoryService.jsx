import API from "../../services/api";

// ==========================================================
// Get All Menu Categories
// ==========================================================

export const getMenuCategories = async (filters = {}) => {
  const response = await API.get(`/menuCategories/all`, {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Search Menu Categories
// ==========================================================

export const searchMenuCategories = async (search) => {
  const response = await API.get(`/menuCategories/search`, {
    params: { search },
  });

  return response.data;
};

// ==========================================================
// Get Menu Category By ID
// ==========================================================

export const getMenuCategoryById = async (id) => {
  const response = await API.get(`/menuCategories/${id}`);

  return response.data;
};

// ==========================================================
// Create Menu Category
// ==========================================================

export const createMenuCategory = async (data) => {
  const response = await API.post(`/menucategories/create`, data);

  return response.data;
};

// ==========================================================
// Update Menu Category
// ==========================================================

export const updateMenuCategory = async (id, data) => {
  const response = await API.put(`/menucategories/${id}`, data);

  return response.data;
};

// ==========================================================
// Delete Menu Category
// ==========================================================

export const deleteMenuCategory = async (id) => {
  const response = await API.delete(`/menucategories/delete/${id}`);

  return response.data;
};

// ==========================================================
// Toggle Availability
// ==========================================================

export const toggleMenuCategoryAvailability = async (id) => {
  const response = await API.patch(`/menucategories/toggle-availability/${id}`);

  return response.data;
};

// ==========================================================
// Toggle Active Status
// ==========================================================

export const toggleMenuCategoryActive = async (id) => {
  const response = await API.patch(`/menucategories/toggle-active/${id}`);

  return response.data;
};

// ==========================================================
// Service Object
// ==========================================================

const menuCategoryService = {
  getMenuCategories,
  searchMenuCategories,
  getMenuCategoryById,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  toggleMenuCategoryAvailability,
  toggleMenuCategoryActive,
};

export { menuCategoryService };
