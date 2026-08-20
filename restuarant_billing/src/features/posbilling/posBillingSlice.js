import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as posBillingService from "./posBillingService";

// ==================================================
// CREATE POS BILL
// ==================================================

export const createPOSBill = createAsyncThunk(
  "posBilling/createPOSBill",
  async (data, { rejectWithValue }) => {
    try {
      return await posBillingService.createPOSBillApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create POS bill",
      );
    }
  },
);

// ==================================================
// GET ALL POS BILLS
// ==================================================

export const getPOSBills = createAsyncThunk(
  "posBilling/getPOSBills",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await posBillingService.getPOSBills(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch POS bills",
      );
    }
  },
);

// ==================================================
// GET POS BILL BY ID
// ==================================================

export const getPOSBillById = createAsyncThunk(
  "posBilling/getPOSBillById",
  async (id, { rejectWithValue }) => {
    try {
      return await posBillingService.getPOSBillByIdApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch POS bill",
      );
    }
  },
);

// ==================================================
// HOLD BILL
// ==================================================

export const holdBill = createAsyncThunk(
  "posBilling/holdBill",
  async (id, { rejectWithValue }) => {
    try {
      return await posBillingService.holdBillApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to hold bill",
      );
    }
  },
);

// ==================================================
// RESUME BILL
// ==================================================

export const resumeBill = createAsyncThunk(
  "posBilling/resumeBill",
  async (id, { rejectWithValue }) => {
    try {
      return await posBillingService.resumeBillApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to resume bill",
      );
    }
  },
);

// ==================================================
// APPLY DISCOUNT
// ==================================================

export const applyDiscount = createAsyncThunk(
  "posBilling/applyDiscount",
  async (data, { rejectWithValue }) => {
    try {
      return await posBillingService.applyDiscountApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to apply discount",
      );
    }
  },
);

// ==================================================
// APPLY COUPON
// ==================================================

export const applyCoupon = createAsyncThunk(
  "posBilling/applyCoupon",
  async (data, { rejectWithValue }) => {
    try {
      return await posBillingService.applyCouponApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to apply coupon",
      );
    }
  },
);

// ==================================================
// CALCULATE TAX
// ==================================================

export const calculateTax = createAsyncThunk(
  "posBilling/calculateTax",
  async (data, { rejectWithValue }) => {
    try {
      return await posBillingService.calculateTaxApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to calculate tax",
      );
    }
  },
);

// ==================================================
// PAYMENT
// ==================================================

export const makePayment = createAsyncThunk(
  "posBilling/makePayment",
  async (data, { rejectWithValue }) => {
    try {
      return await posBillingService.makePaymentApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to make payment",
      );
    }
  },
);

// ==================================================
// PRINT BILL
// ==================================================

export const printBill = createAsyncThunk(
  "posBilling/printBill",
  async (id, { rejectWithValue }) => {
    try {
      return await posBillingService.printBillApi(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to print bill",
      );
    }
  },
);

// ==================================================
// CANCEL BILL
// ==================================================

export const cancelBill = createAsyncThunk(
  "posBilling/cancelBill",
  async (data, { rejectWithValue }) => {
    try {
      return await posBillingService.cancelBillApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to cancel bill",
      );
    }
  },
);

// ==================================================
// INITIAL STATE
// ==================================================

const initialState = {
  bills: [],
  bill: null,

  total: 0,
  page: 1,
  limit: 20,
  totalPages: 0,

  loading: false,
  error: null,

  actionLoading: false,
  actionError: null,
};

// ==================================================
// SLICE
// ==================================================

const posBillingSlice = createSlice({
  name: "posBilling",

  initialState,

  reducers: {
    clearPOSBill: (state) => {
      state.bill = null;
    },

    clearPOSBillingError: (state) => {
      state.error = null;
      state.actionError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // CREATE
      // ==================================================

      .addCase(createPOSBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPOSBill.fulfilled, (state, action) => {
        state.loading = false;

        state.bill = action.payload;

        if (action.payload) {
          state.bills.unshift(action.payload);
        }
      })

      .addCase(createPOSBill.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || action.error.message;
      })

      // ==================================================
      // GET ALL
      // ==================================================

      .addCase(getPOSBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getPOSBills.fulfilled, (state, action) => {
        state.loading = false;

        const payload = action.payload || {};

        state.bills = Array.isArray(payload.data) ? payload.data : [];

        state.total = payload.total || 0;

        state.page = payload.page || 1;

        state.limit = payload.limit || 20;

        state.totalPages = payload.totalPages || 0;
      })

      .addCase(getPOSBills.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || action.error.message;

        state.bills = [];
      })

      // ==================================================
      // GET BY ID
      // ==================================================

      .addCase(getPOSBillById.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(getPOSBillById.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bill = action.payload;
      })

      .addCase(getPOSBillById.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      })

      // ==================================================
      // HOLD
      // ==================================================

      .addCase(holdBill.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(holdBill.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bill = action.payload;

        state.bills = state.bills.map((bill) =>
          bill._id === action.payload._id ? action.payload : bill,
        );
      })

      .addCase(holdBill.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      })

      // ==================================================
      // RESUME
      // ==================================================

      .addCase(resumeBill.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(resumeBill.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bill = action.payload;

        state.bills = state.bills.map((bill) =>
          bill._id === action.payload._id ? action.payload : bill,
        );
      })

      .addCase(resumeBill.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      })

      // ==================================================
      // DISCOUNT
      // ==================================================

      .addCase(applyDiscount.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(applyDiscount.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bill = action.payload;

        state.bills = state.bills.map((bill) =>
          bill._id === action.payload._id ? action.payload : bill,
        );
      })

      .addCase(applyDiscount.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      })

      // ==================================================
      // COUPON
      // ==================================================

      .addCase(applyCoupon.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bill = action.payload;

        state.bills = state.bills.map((bill) =>
          bill._id === action.payload._id ? action.payload : bill,
        );
      })

      .addCase(applyCoupon.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      })

      // ==================================================
      // TAX
      // ==================================================

      .addCase(calculateTax.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(calculateTax.fulfilled, (state) => {
        state.actionLoading = false;
      })

      .addCase(calculateTax.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      })

      // ==================================================
      // PAYMENT
      // ==================================================

      .addCase(makePayment.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(makePayment.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bill = action.payload;

        state.bills = state.bills.map((bill) =>
          bill._id === action.payload._id ? action.payload : bill,
        );
      })

      .addCase(makePayment.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      })

      // ==================================================
      // PRINT
      // ==================================================

      .addCase(printBill.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(printBill.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bill = action.payload;
      })

      .addCase(printBill.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      })

      // ==================================================
      // CANCEL
      // ==================================================

      .addCase(cancelBill.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })

      .addCase(cancelBill.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bill = action.payload;

        state.bills = state.bills.map((bill) =>
          bill._id === action.payload._id ? action.payload : bill,
        );
      })

      .addCase(cancelBill.rejected, (state, action) => {
        state.actionLoading = false;

        state.actionError = action.payload || action.error.message;
      });
  },
});

export const { clearPOSBill, clearPOSBillingError } = posBillingSlice.actions;

export default posBillingSlice.reducer;
