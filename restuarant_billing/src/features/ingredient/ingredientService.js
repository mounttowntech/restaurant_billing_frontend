import API from "../../services/api";

export const getIngredients = async (filters = {}) => {
  const response = await API.get(`/ingradients/all`, {
    params: filters,
  });

  return response.data;
};

export const searchIngredients = async (search) => {
  const response = await API.get(`/ingradients/search`, {
    params: { keyword: search },
  });

  return response.data;
};

export const getIngredientById = async (id) => {
  const response = await API.get(`/ingradients/${id}`);

  return response.data;
};

export const createIngredient = async (data) => {
  const response = await API.post(`/ingradients/create`, data);

  return response.data;
};

export const updateIngredient = async (id, data) => {
  const response = await API.put(`/ingradients/update/${id}`, data);

  return response.data;
};

export const deleteIngredient = async (id) => {
  const response = await API.delete(`/ingradients/delete/${id}`);

  return response.data;
};

export const activateIngredient = async (id) => {
  const response = await API.put(`/ingradients/activate/${id}`);

  return response.data;
};

export const deactivateIngredient = async (id) => {
  const response = await API.put(`/ingradients/deactivate/${id}`);

  return response.data;
};

export const restoreIngredient = async (id) => {
  const response = await API.put(`/ingradients/restore/${id}`);

  return response.data;
};

export const addIngredientStock = async (id, data) => {
  const response = await API.put(`/ingradients/add-stock/${id}`, data);

  return response.data;
};

export const removeIngredientStock = async (id, data) => {
  const response = await API.put(`/ingradients/remove-stock/${id}`, data);

  return response.data;
};

export const adjustIngredientStock = async (id, data) => {
  const response = await API.put(`/ingradients/adjust-stock/${id}`, data);

  return response.data;
};

export const getLowStockIngredients = async () => {
  const response = await API.get(`/ingradients/low-stock`);

  return response.data;
};

export const getOutOfStockIngredients = async () => {
  const response = await API.get(`/ingradients/out-of-stock`);

  return response.data;
};

export const getAvailableIngredients = async () => {
  const response = await API.get(`/ingradients/available`);

  return response.data;
};

export const getIngredientSummary = async () => {
  const response = await API.get(`/ingradients/summary`);

  return response.data;
};

const ingredientService = {
  getIngredients,
  searchIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  activateIngredient,
  deactivateIngredient,
  restoreIngredient,
  addIngredientStock,
  removeIngredientStock,
  adjustIngredientStock,
  getLowStockIngredients,
  getOutOfStockIngredients,
  getAvailableIngredients,
  getIngredientSummary,
};

export { ingredientService };
