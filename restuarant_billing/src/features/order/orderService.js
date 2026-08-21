import API from "../../services/api";

export const getOrders = async (filters = {}) => {
  const response = await API.get("/orders/all", {
    params: filters,
  });

  return response.data;
};

export const getTodayOrders = async () => {
  const response = await API.get("/orders/today");

  return response.data;
};

export const getKitchenQueue = async () => {
  const response = await API.get("/orders/kitchen-queue");

  return response.data;
};

export const getTableOrders = async (tableId) => {
  const response = await API.get(`/orders/table/${tableId}`);

  return response.data;
};

export const getOrderSummary = async () => {
  const response = await API.get("/orders/summary");

  return response.data;
};

export const getOrderById = async (id) => {
  const response = await API.get(`/orders/${id}`);

  return response.data;
};

export const createOrder = async (data) => {
  const response = await API.post("/orders/create", data);

  return response.data;
};

export const updateOrder = async (id, data) => {
  const response = await API.put(`/orders/update/${id}`, data);

  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await API.delete(`/orders/delete/${id}`);

  return response.data;
};

export const restoreOrder = async (id) => {
  const response = await API.put(`/orders/restore/${id}`);

  return response.data;
};

export const acceptOrder = async (id) => {
  const response = await API.put(`/orders/accept/${id}`);

  return response.data;
};

export const prepareOrder = async (id) => {
  const response = await API.put(`/orders/prepare/${id}`);

  return response.data;
};

export const readyOrder = async (id) => {
  const response = await API.put(`/orders/ready/${id}`);

  return response.data;
};

export const completeOrder = async (id) => {
  const response = await API.put(`/orders/complete/${id}`);

  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await API.put(`/orders/cancel/${id}`);

  return response.data;
};

export const markOrderPaid = async (id) => {
  const response = await API.put(`/orders/paid/${id}`);

  return response.data;
};

export const orderService = {
  getOrders,
  getTodayOrders,
  getKitchenQueue,
  getTableOrders,
  getOrderSummary,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  restoreOrder,
  acceptOrder,
  prepareOrder,
  readyOrder,
  completeOrder,
  cancelOrder,
  markOrderPaid,
};
