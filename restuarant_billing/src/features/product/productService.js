import API from "../../services/api";

export const getProducts = async (filters = {}) => {
  const response = await API.get(`/products/all`, {
    params: filters,
  });

  return response.data;
};

export const searchProducts = async (search) => {
  const response = await API.get(`/products/all`, {
    params: { search },
  });

  return response.data;
};

export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);

  return response.data;
};

export const createProduct = async (data) => {
  const response = await API.post(`/products/create`, data);

  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await API.put(`/products/update/${id}`, data);

  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/delete/${id}`);

  return response.data;
};

export const toggleProductAvailability = async (id) => {
  const response = await API.patch(`/products/toggle-availability/${id}`);

  return response.data;
};

const productService = {
  getProducts,
  searchProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductAvailability,
};

export { productService };
