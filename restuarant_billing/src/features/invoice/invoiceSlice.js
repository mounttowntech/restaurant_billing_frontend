import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { invoiceService } from "./invoiceService";

// ==========================================================
// Get All Invoices
// ==========================================================

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await invoiceService.getInvoices();
        
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoices",
      );
    }
  },
);

// ==========================================================
// Get Invoice By ID
// ==========================================================

export const fetchInvoiceById = createAsyncThunk(
  "invoice/fetchInvoiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await invoiceService.getInvoiceById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch invoice",
      );
    }
  },
);

// ==========================================================
// Create Invoice
// ==========================================================

export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await invoiceService.createInvoice(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create invoice",
      );
    }
  },
);

// ==========================================================
// Update Invoice
// ==========================================================

export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await invoiceService.updateInvoice(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update invoice",
      );
    }
  },
);

// ==========================================================
// Delete Invoice
// ==========================================================

export const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
  async (id, { rejectWithValue }) => {
    try {
      await invoiceService.deleteInvoice(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete invoice",
      );
    }
  },
);

// ==========================================================
// Mark Invoice Paid
// ==========================================================

export const markInvoicePaid = createAsyncThunk(
  "invoice/markInvoicePaid",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await invoiceService.markInvoicePaid(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark invoice as paid",
      );
    }
  },
);

// ==========================================================
// Cancel Invoice
// ==========================================================

export const cancelInvoice = createAsyncThunk(
  "invoice/cancelInvoice",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await invoiceService.cancelInvoice(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel invoice",
      );
    }
  },
);

// ==========================================================
// Refund Invoice
// ==========================================================

export const refundInvoice = createAsyncThunk(
  "invoice/refundInvoice",
  async (id, { rejectWithValue }) => {
    try {
      const response = await invoiceService.refundInvoice(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to refund invoice",
      );
    }
  },
);

// ==========================================================
// Restore Invoice
// ==========================================================

export const restoreInvoice = createAsyncThunk(
  "invoice/restoreInvoice",
  async (id, { rejectWithValue }) => {
    try {
      const response = await invoiceService.restoreInvoice(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore invoice",
      );
    }
  },
);

// ==========================================================
// Today's Sales
// ==========================================================

export const fetchTodaySales = createAsyncThunk(
  "invoice/fetchTodaySales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await invoiceService.getTodaySales();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch today's sales",
      );
    }
  },
);

// ==========================================================
// Pending Invoices
// ==========================================================

export const fetchPendingInvoices = createAsyncThunk(
  "invoice/fetchPendingInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await invoiceService.getPendingInvoices();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pending invoices",
      );
    }
  },
);

// ==========================================================
// Daily Collection
// ==========================================================

export const fetchDailyCollection = createAsyncThunk(
  "invoice/fetchDailyCollection",
  async (date, { rejectWithValue }) => {
    try {
      const response = await invoiceService.getDailyCollection(date);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch daily collection",
      );
    }
  },
);

// ==========================================================
// Store Sales
// ==========================================================

export const fetchStoreSales = createAsyncThunk(
  "invoice/fetchStoreSales",
  async (storeId, { rejectWithValue }) => {
    try {
      const response = await invoiceService.getStoreSales(storeId);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store sales",
      );
    }
  },
);

// ==========================================================
// Initial State
// ==========================================================

const initialState = {
  invoices: [],
  selectedInvoice: null,

  todaySales: null,
  pendingInvoices: [],
  dailyCollection: null,
  storeSales: [],

  loading: false,
  invoiceLoading: false,
  deleteLoading: false,
  paymentLoading: false,
  actionLoading: false,

  error: null,
};

// ==========================================================
// Slice
// ==========================================================

const invoiceSlice = createSlice({
  name: "invoice",

  initialState,

  reducers: {
    clearInvoiceError: (state) => {
      state.error = null;
    },

    clearSelectedInvoice: (state) => {
      state.selectedInvoice = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================================
      // Fetch Invoices
      // ======================================================

      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload || [];
      })

      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Fetch Invoice By ID
      // ======================================================

      .addCase(fetchInvoiceById.pending, (state) => {
        state.invoiceLoading = true;
        state.error = null;
      })

      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.invoiceLoading = false;
        state.selectedInvoice = action.payload;
      })

      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Create Invoice
      // ======================================================

      .addCase(createInvoice.pending, (state) => {
        state.invoiceLoading = true;
        state.error = null;
      })

      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoiceLoading = false;

        if (action.payload) {
          state.invoices.unshift(action.payload);
        }
      })

      .addCase(createInvoice.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Update Invoice
      // ======================================================

      .addCase(updateInvoice.pending, (state) => {
        state.invoiceLoading = true;
        state.error = null;
      })

      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.invoiceLoading = false;

        const updatedInvoice = action.payload;

        const index = state.invoices.findIndex(
          (invoice) => invoice._id === updatedInvoice?._id,
        );

        if (index !== -1) {
          state.invoices[index] = updatedInvoice;
        }

        state.selectedInvoice = updatedInvoice;
      })

      .addCase(updateInvoice.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Delete Invoice
      // ======================================================

      .addCase(deleteInvoice.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.invoices = state.invoices.filter(
          (invoice) => invoice._id !== action.payload,
        );
      })

      .addCase(deleteInvoice.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Mark Paid
      // ======================================================

      .addCase(markInvoicePaid.pending, (state) => {
        state.paymentLoading = true;
        state.error = null;
      })

      .addCase(markInvoicePaid.fulfilled, (state, action) => {
        state.paymentLoading = false;

        const updatedInvoice = action.payload;

        const index = state.invoices.findIndex(
          (invoice) => invoice._id === updatedInvoice?._id,
        );

        if (index !== -1) {
          state.invoices[index] = updatedInvoice;
        }

        state.selectedInvoice = updatedInvoice;
      })

      .addCase(markInvoicePaid.rejected, (state, action) => {
        state.paymentLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Cancel
      // ======================================================

      .addCase(cancelInvoice.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(cancelInvoice.fulfilled, (state, action) => {
        state.actionLoading = false;

        const updatedInvoice = action.payload;

        if (updatedInvoice?._id) {
          const index = state.invoices.findIndex(
            (invoice) => invoice._id === updatedInvoice._id,
          );

          if (index !== -1) {
            state.invoices[index] = updatedInvoice;
          }

          state.selectedInvoice = updatedInvoice;
        }
      })

      .addCase(cancelInvoice.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Refund
      // ======================================================

      .addCase(refundInvoice.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(refundInvoice.fulfilled, (state, action) => {
        state.actionLoading = false;

        const updatedInvoice = action.payload;

        if (updatedInvoice?._id) {
          const index = state.invoices.findIndex(
            (invoice) => invoice._id === updatedInvoice._id,
          );

          if (index !== -1) {
            state.invoices[index] = updatedInvoice;
          }

          state.selectedInvoice = updatedInvoice;
        }
      })

      .addCase(refundInvoice.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Restore
      // ======================================================

      .addCase(restoreInvoice.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(restoreInvoice.fulfilled, (state, action) => {
        state.actionLoading = false;

        const updatedInvoice = action.payload;

        if (updatedInvoice?._id) {
          const index = state.invoices.findIndex(
            (invoice) => invoice._id === updatedInvoice._id,
          );

          if (index !== -1) {
            state.invoices[index] = updatedInvoice;
          }

          state.selectedInvoice = updatedInvoice;
        }
      })

      .addCase(restoreInvoice.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Today's Sales
      // ======================================================

      .addCase(fetchTodaySales.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTodaySales.fulfilled, (state, action) => {
        state.loading = false;
        state.todaySales = action.payload;
      })

      .addCase(fetchTodaySales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // Pending Invoices
      // ======================================================

      .addCase(fetchPendingInvoices.fulfilled, (state, action) => {
        state.pendingInvoices = action.payload || [];
      })

      .addCase(fetchPendingInvoices.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ======================================================
      // Daily Collection
      // ======================================================

      .addCase(fetchDailyCollection.fulfilled, (state, action) => {
        state.dailyCollection = action.payload;
      })

      .addCase(fetchDailyCollection.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ======================================================
      // Store Sales
      // ======================================================

      .addCase(fetchStoreSales.fulfilled, (state, action) => {
        state.storeSales = action.payload || [];
      })

      .addCase(fetchStoreSales.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearInvoiceError, clearSelectedInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
