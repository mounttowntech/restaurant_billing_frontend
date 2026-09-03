import API from "../../services/api";

// =====================================================
// GET ALL fetchAddons
// =====================================================

const getAddons = async () => {
  const response = await API.get("/addons/all");

  return response.data;
};


// =====================================================
// CREATE createAddon   
// =====================================================

const createAddon = async (data) => {
  const response = await API.post("/addons/create", data);

  return response.data;
};

// =====================================================
// UPDATE ADDON
// =====================================================

const updateAddon = async (id, data) => {
  const response = await API.put(`/addons/update/${id}`, data);

  return response.data;
};

// =====================================================
// DELETE deleteAddon
// =====================================================

const deleteAddon = async (id) => {
  const response = await API.delete(`/addons/delete/${id}`);

  return response.data;
};

// =====================================================
// restoreAddon
// =====================================================

const restoreAddon = async (id) => {
  const response = await API.patch(`/addons/restore/${id}`);

  return response.data;
};


// =====================================================
// EXPORT
// =====================================================

export const addonService = {
  getAddons,
  createAddon,
  updateAddon,
  deleteAddon,
  restoreAddon
};
