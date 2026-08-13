import API from "../../services/api";

// =====================================================
// CREATE CUSTOMER
// =====================================================

export const createCustomer = async (customerData) => {
  const response = await API.post("/customers/create", customerData);

  return response.data.data;
};

// =====================================================
// FETCH ALL CUSTOMERS
// =====================================================

export const getCustomers = async () => {
  const response = await API.get("/customers/all");
  console.log("CUSTOMER API RESPONSE:", response.data);
  return response.data.data;
};

// =====================================================
// FETCH CUSTOMER BY ID
// =====================================================

export const getCustomerById = async (id) => {
  const response = await API.get(`/customers/${id}`);

  return response.data.data;
};

// =====================================================
// UPDATE CUSTOMER
// =====================================================

export const updateCustomer = async (id, customerData) => {
  const response = await API.put(`/customers/update/${id}`, customerData);

  return response.data.data;
};

// =====================================================
// DELETE CUSTOMER
// =====================================================

export const deleteCustomer = async (id) => {
  const response = await API.delete(`/customers/delete/${id}`);

  return response.data;
};

// =====================================================
// CHANGE CUSTOMER STATUS
// =====================================================

export const changeCustomerStatus = async (id, status) => {
  const response = await API.patch(`/customers/status/${id}`, { status });

  return response.data.data;
};

// =====================================================
// CUSTOMER DROPDOWN
// =====================================================

export const getCustomerDropdown = async () => {
  const response = await API.get("/customers/dropdown/list");

  return response.data.data;
};

// =====================================================
// SEARCH CUSTOMER
// =====================================================

export const searchCustomer = async (keyword) => {
  const response = await API.get(
    `/customers/search?keyword=${encodeURIComponent(keyword)}`,
  );

  return response.data.data;
};

// =====================================================
// ADD LOYALTY POINTS
// =====================================================

export const addLoyaltyPoints = async (id, points) => {
  const response = await API.patch(`/customers/loyalty/${id}`, { points });

  return response.data.data;
};
