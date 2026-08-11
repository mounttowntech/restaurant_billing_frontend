import API from "../../services/api";

// ================= Fetch Restaurants =================

export const fetchRestaurants = async () => {
  const response = await API.get("/restaurants/all");
  return response.data.data;
};

// ================= Fetch Restaurant By ID =================

export const getRestaurantById = async (id) => {
  const response = await API.get(`/restaurants/${id}`);
  return response.data.data;
};

// ================= Create Restaurant =================

export const createRestaurant = async (data) => {
  const response = await API.post("/restaurants/create", data);

  return response.data.data;
};

// ================= Update Restaurant =================

export const updateRestaurant = async ({ id, restaurant }) => {
  const response = await API.put(`/restaurants/${id}`, restaurant);

  return response.data.data;
};

// ================= Delete Restaurant =================

export const deleteRestaurant = async (id) => {
  await API.delete(`/restaurants/${id}`);
  return id;
};

// ================= Restore Restaurant =================

export const restoreRestaurant = async (id) => {
  const response = await API.patch(`/restaurants/${id}/restore`);

  return response.data.data;
};

// ================= Toggle Restaurant Status =================

export const toggleRestaurantStatus = async (id) => {
  const response = await API.patch(`/restaurants/${id}/toggle-status`);

  return response.data.data;
};
