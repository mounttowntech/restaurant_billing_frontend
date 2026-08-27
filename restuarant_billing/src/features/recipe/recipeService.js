// ==========================================================
// recipeService.js
// ==========================================================

import API from "../../services/api";

export const getRecipes = async (filters = {}) => {
  const response = await API.get(`/receipes/all`, {
    params: filters,
  });

  return response.data;
};

export const searchRecipes = async (keyword) => {
  const response = await API.get(`/receipes/search/list`, {
    params: { keyword },
  });

  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await API.get(`/receipes/${id}`);

  return response.data;
};

export const createRecipe = async (data) => {
  const response = await API.post(`/receipes/create`, data);

  return response.data;
};

export const updateRecipe = async (id, data) => {
  const response = await API.put(`/receipes/update/${id}`, data);

  return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await API.delete(`/receipes/delete/${id}`);

  return response.data;
};

export const restoreRecipe = async (id) => {
  const response = await API.patch(`/receipes/restore/${id}`);

  return response.data;
};

export const updateRecipeStatus = async (id, status) => {
  const response = await API.patch(`/receipes/status/${id}`, { status });

  return response.data;
};

export const getRecipeSummary = async () => {
  const response = await API.get(`/recipes/reports/summary`);

  return response.data;
};

export const getRecipeCostAnalysis = async () => {
  const response = await API.get(`/recipes/reports/cost-analysis`);

  return response.data;
};

const recipeService = {
  getRecipes,
  searchRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  restoreRecipe,
  updateRecipeStatus,
  getRecipeSummary,
  getRecipeCostAnalysis,
};

export { recipeService };
