import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as dashboardService from "./dashboardService";

// ================= Fetch Dashboard Cards =================

export const fetchDashboardCards = createAsyncThunk(
  "dashboard/fetchDashboardCards",
  async (_, { rejectWithValue }) => {
    try {
      return await dashboardService.getDashboardCards();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch dashboard data",
      );
    }
  },
);

// ================= Fetch Recent Sales =================

export const fetchRecentSales = createAsyncThunk(
  "dashboard/fetchRecentSales",
  async (limit = 10, { rejectWithValue }) => {
    try {
      return await dashboardService.getRecentSales(limit);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch recent sales",
      );
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    cards: {
      totalSales: 0,
      totalBills: 0,
      totalOrders: 0,
      totalCustomers: 0,
      lowStock: 0,
    },

    recentSales: [],

    loading: false,
    recentSalesLoading: false,

    error: null,
    recentSalesError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // =====================================================
      // FETCH DASHBOARD CARDS
      // =====================================================

      .addCase(fetchDashboardCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboardCards.fulfilled, (state, action) => {
        state.loading = false;

        state.cards = {
          totalSales: action.payload?.totalSales ?? 0,
          totalBills: action.payload?.totalBills ?? 0,
          totalOrders: action.payload?.totalOrders ?? 0,
          totalCustomers: action.payload?.totalCustomers ?? 0,
          lowStock: action.payload?.lowStock ?? 0,
        };
      })

      .addCase(fetchDashboardCards.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error.message ||
          "Failed to fetch dashboard data";
      })

      // =====================================================
      // FETCH RECENT SALES
      // =====================================================

      .addCase(fetchRecentSales.pending, (state) => {
        state.recentSalesLoading = true;
        state.recentSalesError = null;
      })

      .addCase(fetchRecentSales.fulfilled, (state, action) => {
        state.recentSalesLoading = false;

        state.recentSales = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(fetchRecentSales.rejected, (state, action) => {
        state.recentSalesLoading = false;

        state.recentSalesError =
          action.payload ||
          action.error.message ||
          "Failed to fetch recent sales";
      });
  },
});

export default dashboardSlice.reducer;
