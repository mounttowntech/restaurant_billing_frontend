import API from "../../services/api";

// =====================================================
// FETCH ALL COMPANIES
// =====================================================

export const getCompanies = async (filters = {}) => {
  const response = await API.get(`/companies/all`, {
    params: filters,
  });

  console.log("COMPANY API RESPONSE:", response.data);

  return response.data;
};

// =====================================================
// FETCH COMPANY BY ID
// =====================================================

export const getCompanyById = async (id) => {
  const response = await API.get(`/companies/${id}`);

  return response.data;
};

// =====================================================
// CREATE COMPANY
// =====================================================

export const createCompany = async (data) => {
  const response = await API.post(`/companies/create`, data);

  return response.data;
};

// =====================================================
// UPDATE COMPANY
// =====================================================

export const updateCompany = async (id, data) => {
  const response = await API.put(`/companies/update/${id}`, data);

  return response.data;
};

// =====================================================
// DELETE COMPANY
// =====================================================

export const deleteCompany = async (id) => {
  const response = await API.delete(`/companies/delete/${id}`);

  return response.data;
};

// =====================================================
// RESTORE COMPANY
// =====================================================

export const restoreCompany = async (id) => {
  const response = await API.patch(`/companies/restore/${id}`);

  return response.data;
};

// =====================================================
// TOGGLE COMPANY STATUS
// =====================================================

export const toggleCompanyStatus = async (id) => {
  const response = await API.patch(`/companies/toggle-status/${id}`);

  return response.data;
};

// =====================================================
// COMPANY SERVICE
// =====================================================

const companyService = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  restoreCompany,
  toggleCompanyStatus,
};

export { companyService };
