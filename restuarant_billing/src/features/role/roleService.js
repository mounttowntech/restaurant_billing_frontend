import API from "../../services/api";

// =====================================================
// GET ALL ROLES
// =====================================================

export const getRoles = async (filters = {}) => {
  const response = await API.get(`/roles/all`, {
    params: filters,
  });

  return response.data;
};

// =====================================================
// SEARCH ROLES
// =====================================================

export const searchRoles = async (keyword) => {
  const response = await API.get(`/roles/reports/search`, {
    params: {
      keyword,
    },
  });

  return response.data;
};

// =====================================================
// GET ROLE BY ID
// =====================================================

export const getRoleById = async (id) => {
  const response = await API.get(`/roles/${id}`);

  return response.data;
};

// =====================================================
// CREATE ROLE
// =====================================================

export const createRole = async (data) => {
  const response = await API.post(`/roles/create`, data);

  return response.data;
};

// =====================================================
// UPDATE ROLE
// =====================================================

export const updateRole = async (id, data) => {
  const response = await API.put(`/roles/update/${id}`, data);

  return response.data;
};

// =====================================================
// DELETE ROLE
// =====================================================

export const deleteRole = async (id) => {
  const response = await API.delete(`/roles/delete/${id}`);

  return response.data;
};

// =====================================================
// UPDATE ROLE STATUS
// =====================================================

export const updateRoleStatus = async (id, status) => {
  const response = await API.patch(`/roles/status/${id}`, {
    status,
  });

  return response.data;
};

// =====================================================
// ADD PERMISSION
// =====================================================

export const addPermission = async (id, data) => {
  const response = await API.post(`/roles/permissions/${id}`, data);

  return response.data;
};

// =====================================================
// UPDATE PERMISSION
// =====================================================

export const updatePermission = async (module, id, data) => {
  const response = await API.put(`/roles/permissions/${module}/${id}`, data);

  return response.data;
};

// =====================================================
// REMOVE PERMISSION
// =====================================================

export const removePermission = async (module, id) => {
  const response = await API.delete(`/roles/permissions/${module}/${id}`);

  return response.data;
};

// =====================================================
// GET ROLE PERMISSIONS
// =====================================================

export const getRolePermissions = async (id) => {
  const response = await API.get(`/roles/permissions/${id}`);

  return response.data;
};

// =====================================================
// ACTIVE ROLES
// =====================================================

export const getActiveRoles = async () => {
  const response = await API.get(`/roles/reports/active`);

  return response.data;
};

// =====================================================
// INACTIVE ROLES
// =====================================================

export const getInactiveRoles = async () => {
  const response = await API.get(`/roles/reports/inactive`);

  return response.data;
};

// =====================================================
// SERVICE OBJECT
// =====================================================

const roleService = {
  getRoles,
  searchRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  updateRoleStatus,
  addPermission,
  updatePermission,
  removePermission,
  getRolePermissions,
  getActiveRoles,
  getInactiveRoles,
};

export { roleService };
