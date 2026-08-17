import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as purchaseService from "./purchaseService";

// ================= Fetch Purchases =================

export const fetchPurchases = createAsyncThunk(
  "purchases/fetchPurchases",
  async (filters = {}) => {
    return await purchaseService.getPurchases(filters);
  },
);

// ================= Fetch Purchase By ID =================

export const fetchPurchaseById = createAsyncThunk(
  "purchases/fetchPurchaseById",
  async (id) => {
    return await purchaseService.getPurchaseById(id);
  },
);

// ================= Create Purchase =================

export const createPurchase = createAsyncThunk(
  "purchases/createPurchase",
  async (purchase) => {
    return await purchaseService.createPurchase(purchase);
  },
);

// ================= Update Purchase =================

export const updatePurchase = createAsyncThunk(
  "purchases/updatePurchase",
  async ({ id, purchase }) => {
    return await purchaseService.updatePurchase(id, purchase);
  },
);

// ================= Delete Purchase =================

export const deletePurchase = createAsyncThunk(
  "purchases/deletePurchase",
  async (id) => {
    await purchaseService.deletePurchase(id);

    return id;
  },
);

// ================= Restore Purchase =================

export const restorePurchase = createAsyncThunk(
  "purchases/restorePurchase",
  async (id) => {
    return await purchaseService.restorePurchase(id);
  },
);

// ================= Receive Purchase =================

export const receivePurchase = createAsyncThunk(
  "purchases/receivePurchase",
  async (id) => {
    return await purchaseService.receivePurchase(id);
  },
);

// ================= Cancel Purchase =================

export const cancelPurchase = createAsyncThunk(
  "purchases/cancelPurchase",
  async (id) => {
    return await purchaseService.cancelPurchase(id);
  },
);

// ================= Update Payment Status =================

export const updatePaymentStatus = createAsyncThunk(
  "purchases/updatePaymentStatus",
  async ({ id, payment }) => {
    return await purchaseService.updatePaymentStatus(id, payment);
  },
);

// ================= Search Purchase =================

export const searchPurchase = createAsyncThunk(
  "purchases/searchPurchase",
  async (search) => {
    return await purchaseService.searchPurchase(search);
  },
);

// ================= Today's Purchases =================

export const fetchTodayPurchases = createAsyncThunk(
  "purchases/fetchTodayPurchases",
  async () => {
    return await purchaseService.getTodayPurchases();
  },
);

// ================= Supplier Wise Purchases =================

export const fetchSupplierWisePurchases = createAsyncThunk(
  "purchases/fetchSupplierWisePurchases",
  async (supplierId) => {
    return await purchaseService.getSupplierWisePurchases(supplierId);
  },
);

// ================= Store Wise Purchases =================

export const fetchStoreWisePurchases = createAsyncThunk(
  "purchases/fetchStoreWisePurchases",
  async (storeId) => {
    return await purchaseService.getStoreWisePurchases(storeId);
  },
);

// ================= Purchase Summary =================

export const fetchPurchaseSummary = createAsyncThunk(
  "purchases/fetchPurchaseSummary",
  async () => {
    return await purchaseService.getPurchaseSummary();
  },
);

const purchaseSlice = createSlice({
  name: "purchases",

  initialState: {
    purchases: [],
    purchase: null,

    todayPurchases: [],
    supplierWisePurchases: [],
    storeWisePurchases: [],

    summary: {
      count: 0,
      totalPurchase: 0,
      totalPaid: 0,
      totalDue: 0,
    },
    totalRecords: 0,
    currentPage: 1,
    totalPages: 0,
    count: 0,

    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ==================================================
      // FETCH PURCHASES
      // ==================================================

      .addCase(fetchPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPurchases.fulfilled, (state, action) => {
        state.loading = false;

        /*
          Backend response:
          {
            data: [],
            totalRecords,
            currentPage,
            totalPages,
            count
          }

          If your service returns response.data directly,
          action.payload will contain this object.
        */

        state.purchases = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
            ? action.payload
            : [];

        state.totalRecords = action.payload?.totalRecords || 0;

        state.currentPage = action.payload?.currentPage || 1;

        state.totalPages = action.payload?.totalPages || 0;

        state.count = action.payload?.count || 0;
      })

      .addCase(fetchPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // FETCH PURCHASE BY ID
      // ==================================================

      .addCase(fetchPurchaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPurchaseById.fulfilled, (state, action) => {
        state.loading = false;

        state.purchase = action.payload?.data || action.payload;
      })

      .addCase(fetchPurchaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // CREATE PURCHASE
      // ==================================================

      .addCase(createPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createPurchase.fulfilled, (state, action) => {
        state.loading = false;

        const newPurchase = action.payload?.data || action.payload;

        if (newPurchase) {
          state.purchases.push(newPurchase);
        }
      })

      .addCase(createPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // UPDATE PURCHASE
      // ==================================================

      .addCase(updatePurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePurchase.fulfilled, (state, action) => {
        state.loading = false;

        const updatedPurchase = action.payload?.data || action.payload;

        if (!updatedPurchase?._id) {
          return;
        }

        state.purchases = state.purchases.map((purchase) =>
          purchase._id === updatedPurchase._id ? updatedPurchase : purchase,
        );

        state.purchase = updatedPurchase;
      })

      .addCase(updatePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // DELETE PURCHASE
      // ==================================================

      .addCase(deletePurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deletePurchase.fulfilled, (state, action) => {
        state.loading = false;

        state.purchases = state.purchases.filter(
          (purchase) => purchase._id !== action.payload,
        );
      })

      .addCase(deletePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // RESTORE PURCHASE
      // ==================================================

      .addCase(restorePurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restorePurchase.fulfilled, (state, action) => {
        state.loading = false;

        const restoredPurchase = action.payload?.data || action.payload;

        if (!restoredPurchase?._id) {
          return;
        }

        const index = state.purchases.findIndex(
          (purchase) => purchase._id === restoredPurchase._id,
        );

        if (index !== -1) {
          state.purchases[index] = restoredPurchase;
        } else {
          state.purchases.push(restoredPurchase);
        }
      })

      .addCase(restorePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // RECEIVE PURCHASE
      // ==================================================

      .addCase(receivePurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(receivePurchase.fulfilled, (state, action) => {
        state.loading = false;

        const receivedPurchase = action.payload?.data || action.payload;

        if (!receivedPurchase?._id) {
          return;
        }

        state.purchases = state.purchases.map((purchase) =>
          purchase._id === receivedPurchase._id ? receivedPurchase : purchase,
        );

        state.purchase = receivedPurchase;
      })

      .addCase(receivePurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // CANCEL PURCHASE
      // ==================================================

      .addCase(cancelPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(cancelPurchase.fulfilled, (state, action) => {
        state.loading = false;

        const cancelledPurchase = action.payload?.data || action.payload;

        if (!cancelledPurchase?._id) {
          return;
        }

        state.purchases = state.purchases.map((purchase) =>
          purchase._id === cancelledPurchase._id ? cancelledPurchase : purchase,
        );

        state.purchase = cancelledPurchase;
      })

      .addCase(cancelPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // PAYMENT
      // ==================================================

      .addCase(updatePaymentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updatedPurchase = action.payload?.data || action.payload;

        if (!updatedPurchase?._id) {
          return;
        }

        state.purchases = state.purchases.map((purchase) =>
          purchase._id === updatedPurchase._id ? updatedPurchase : purchase,
        );

        state.purchase = updatedPurchase;
      })

      .addCase(updatePaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // SEARCH
      // ==================================================

      .addCase(searchPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchPurchase.fulfilled, (state, action) => {
        state.loading = false;

        state.purchases = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
            ? action.payload
            : [];

        state.count = action.payload?.count || 0;
      })

      .addCase(searchPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // TODAY PURCHASES
      // ==================================================

      .addCase(fetchTodayPurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTodayPurchases.fulfilled, (state, action) => {
        state.loading = false;

        state.todayPurchases = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
            ? action.payload
            : [];
      })

      .addCase(fetchTodayPurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // SUPPLIER WISE
      // ==================================================

      .addCase(fetchSupplierWisePurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSupplierWisePurchases.fulfilled, (state, action) => {
        state.loading = false;

        state.supplierWisePurchases = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
            ? action.payload
            : [];
      })

      .addCase(fetchSupplierWisePurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // STORE WISE
      // ==================================================

      .addCase(fetchStoreWisePurchases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchStoreWisePurchases.fulfilled, (state, action) => {
        state.loading = false;

        state.storeWisePurchases = Array.isArray(action.payload?.data)
          ? action.payload.data
          : Array.isArray(action.payload)
            ? action.payload
            : [];
      })

      .addCase(fetchStoreWisePurchases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ==================================================
      // PURCHASE SUMMARY
      // ==================================================

      .addCase(fetchPurchaseSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPurchaseSummary.fulfilled, (state, action) => {
        state.loading = false;

        state.summary = action.payload?.data || action.payload;
      })

      .addCase(fetchPurchaseSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default purchaseSlice.reducer;
