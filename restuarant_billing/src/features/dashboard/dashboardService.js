import API from "../../services/api";

// Fetch Dashboard Cards

export const getDashboardCards = async () => {
  const response = await API.get("/dashboard/cards");

  return response.data.data;
};

export const getRecentSales = async (limit = 10) => {
  const response = await API.get(`/dashboard/recent-sales?limit=${limit}`);

  return response.data.data;
};
