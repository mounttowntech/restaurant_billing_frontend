import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { reportService } from "./reportService";

// ==========================================================
// SALES
// ==========================================================

export const fetchSalesReport = createAsyncThunk(
  "report/fetchSalesReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportService.getSalesReport(filters);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sales report",
      );
    }
  },
);

// ==========================================================
// PURCHASE
// ==========================================================

export const fetchPurchaseReport = createAsyncThunk(
  "report/fetchPurchaseReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportService.getPurchaseReport(filters);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch purchase report",
      );
    }
  },
);

// ==========================================================
// EXPENSE
// ==========================================================

export const fetchExpenseReport = createAsyncThunk(
  "report/fetchExpenseReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportService.getExpenseReport(filters);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch expense report",
      );
    }
  },
);

// ==========================================================
// STOCK
// ==========================================================

export const fetchStockReport = createAsyncThunk(
  "report/fetchStockReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportService.getStockReport(filters);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stock report",
      );
    }
  },
);

// ==========================================================
// TAX
// ==========================================================

export const fetchTaxReport = createAsyncThunk(
  "report/fetchTaxReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportService.getTaxReport(filters);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tax report",
      );
    }
  },
);

// ==========================================================
// PAYMENT
// ==========================================================

export const fetchPaymentReport = createAsyncThunk(
  "report/fetchPaymentReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportService.getPaymentReport(filters);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch payment report",
      );
    }
  },
);

// ==========================================================
// PRODUCT
// ==========================================================

export const fetchProductReport = createAsyncThunk(
  "report/fetchProductReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportService.getProductReport(filters);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product report",
      );
    }
  },
);

// ==========================================================
// PROFIT & LOSS
// ==========================================================

export const fetchProfitLossReport = createAsyncThunk(
  "report/fetchProfitLossReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await reportService.getProfitLossReport(filters);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profit & loss report",
      );
    }
  },
);

// ==========================================================
// SLICE
// ==========================================================

const reportSlice = createSlice({
  name: "report",

  initialState: {
    loading: false,
    error: null,
  },

  reducers: {
    clearReportError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================================
      // SALES
      // ======================================================

      .addCase(fetchSalesReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSalesReport.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchSalesReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // PURCHASE
      // ======================================================

      .addCase(fetchPurchaseReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPurchaseReport.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchPurchaseReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // EXPENSE
      // ======================================================

      .addCase(fetchExpenseReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchExpenseReport.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchExpenseReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // STOCK
      // ======================================================

      .addCase(fetchStockReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchStockReport.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchStockReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // TAX
      // ======================================================

      .addCase(fetchTaxReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTaxReport.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchTaxReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // PAYMENT
      // ======================================================

      .addCase(fetchPaymentReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPaymentReport.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchPaymentReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // PRODUCT
      // ======================================================

      .addCase(fetchProductReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductReport.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchProductReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // PROFIT LOSS
      // ======================================================

      .addCase(fetchProfitLossReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProfitLossReport.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchProfitLossReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReportError } = reportSlice.actions;

export default reportSlice.reducer;
