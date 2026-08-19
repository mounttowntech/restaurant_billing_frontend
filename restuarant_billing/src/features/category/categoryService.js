import API from "../../services/api";

// =====================================================
// GET ALL CATEGORIES
// =====================================================

const getCategories = async () => {
  const response = await API.get("/categories/all");

  return response.data;
};

// =====================================================
// GET CATEGORY BY ID
// =====================================================

const getCategoryById = async (id) => {
  const response = await API.get(`/categories/${id}`);

  return response.data;
};

// =====================================================
// CREATE CATEGORY
// =====================================================

const createCategory = async (data) => {
  const response = await API.post("/categories/create", data);

  return response.data;
};

// =====================================================
// UPDATE CATEGORY
// =====================================================

const updateCategory = async (id, data) => {
  const response = await API.put(`/categories/update/${id}`, data);

  return response.data;
};

// =====================================================
// DELETE CATEGORY
// =====================================================

const deleteCategory = async (id) => {
  const response = await API.delete(`/categories/delete/${id}`);

  return response.data;
};

// =====================================================
// CHANGE CATEGORY STATUS
// =====================================================

const changeCategoryStatus = async (id) => {
  const response = await API.patch(`/categories/status/${id}`);

  return response.data;
};

// =====================================================
// GET PARENT CATEGORIES
// =====================================================

const getParentCategories = async () => {
  const response = await API.get("/categories/parents");

  return response.data;
};

// =====================================================
// CATEGORY DROPDOWN
// =====================================================

const getCategoryDropdown = async () => {
  const response = await API.get("/categories/dropdown/list");

  return response.data;
};

// =====================================================
// EXPORT
// =====================================================

export const categoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  changeCategoryStatus,
  getParentCategories,
  getCategoryDropdown,
};
