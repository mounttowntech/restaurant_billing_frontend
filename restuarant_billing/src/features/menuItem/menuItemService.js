import API from "../../services/api";

// ==========================================================
// Get All Menu Items
// ==========================================================

export const getMenuItems = async (filters = {}) => {
  const response = await API.get(`/menu-items/all`, {
    params: filters,
  });

  return response.data;
};

// ==========================================================
// Search Menu Items
// ==========================================================

export const searchMenuItems = async (keyword) => {
  const response = await API.get(`/menu-items/search`, {
    params: { keyword },
  });

  return response.data;
};

// ==========================================================
// Get Menu Item By ID
// ==========================================================

export const getMenuItemById = async (id) => {
  const response = await API.get(`/menu-items/${id}`);

  return response.data;
};

// ==========================================================
// Create Menu Item
// ==========================================================

export const createMenuItem = async (data) => {
  const response = await API.post(`/menu-items/create`, data);

  return response.data;
};

// ==========================================================
// Update Menu Item
// ==========================================================

export const updateMenuItem = async (id, data) => {
  const response = await API.put(`/menu-items/update/${id}`, data);

  return response.data;
};

// ==========================================================
// Delete Menu Item
// ==========================================================

export const deleteMenuItem = async (id) => {
  const response = await API.delete(`/menu-items/delete/${id}`);

  return response.data;
};

// ==========================================================
// Restore Menu Item
// ==========================================================

export const restoreMenuItem = async (id) => {
  const response = await API.put(`/menu-items/restore/${id}`);

  return response.data;
};

// ==========================================================
// Get Available Menu Items
// ==========================================================

export const getAvailableMenuItems = async () => {
  const response = await API.get(`/menu-items/available`);

  return response.data;
};

// ==========================================================
// Get Category Wise Menu
// ==========================================================

export const getCategoryWiseMenu = async (categoryId) => {
  const response = await API.get(`/menu-items/category/${categoryId}`);

  return response.data;
};

// ==========================================================
// Update Availability
// ==========================================================

export const updateMenuItemAvailability = async (id, isAvailable) => {
  const response = await API.put(`/menu-items/availability/${id}`, {
    isAvailable,
  });

  return response.data;
};

// ==========================================================
// Update Status
// ==========================================================

export const updateMenuItemStatus = async (id, status) => {
  const response = await API.put(`/menu-items/status/${id}`, {
    status,
  });

  return response.data;
};

// ==========================================================
// Service Object
// ==========================================================

const menuItemService = {
  getMenuItems,
  searchMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  restoreMenuItem,
  getAvailableMenuItems,
  getCategoryWiseMenu,
  updateMenuItemAvailability,
  updateMenuItemStatus,
};

export { menuItemService };
