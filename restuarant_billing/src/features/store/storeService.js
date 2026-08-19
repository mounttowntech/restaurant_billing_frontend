import API from "../../services/api";

// ================= Fetch Stores =================

export const fetchStores = async ({ search = "", status = "" } = {}) => {
  const response = await API.get("/store/all", {
    params: {
      search,
      status,
    },
  });

  console.log("FETCH STORES API RESPONSE:", response.data);

  return response.data.data || [];
};

// ================= Get Store By ID =================

export const getStoreById = async (id) => {
  const response = await API.get(`/store/${id}`);

  return response.data.data;
};

// ================= Create Store =================

export const createStore = async (store) => {
  const response = await API.post("/store/create", store);

  return response.data.data;
};

// ================= Update Store =================

export const updateStore = async ({ id, store }) => {
  const response = await API.put(`/store/update/${id}`, store);

  return response.data.data;
};

// ================= Delete Store =================

export const deleteStore = async (id) => {
  const response = await API.delete(`/store/delete/${id}`);

  return response.data;
};

// ================= Restore Store =================

export const restoreStore = async (id) => {
  const response = await API.patch(`/store/restore/${id}`);

  return response.data.data;
};

// ================= Toggle Status =================

export const toggleStoreStatus = async (id) => {
  const response = await API.patch(`/store/toggle-status/${id}`);

  return response.data.data;
};
