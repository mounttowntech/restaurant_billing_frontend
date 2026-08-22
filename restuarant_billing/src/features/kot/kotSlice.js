import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { kotService } from "./kotService";

// ==========================================================
// Fetch All KOT
// ==========================================================

export const fetchKOTs = createAsyncThunk(
  "kot/fetchKOTs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await kotService.getKOTs();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ==========================================================
// Search KOT
// ==========================================================

export const searchKOT = createAsyncThunk(
  "kot/searchKOT",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await kotService.searchKOT(keyword);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search KOT",
      );
    }
  },
);

// ==========================================================
// Get KOT By ID
// ==========================================================

export const fetchKOTById = createAsyncThunk(
  "kot/fetchKOTById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await kotService.getKOTById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch KOT",
      );
    }
  },
);

// ==========================================================
// Create KOT
// ==========================================================

export const createKOT = createAsyncThunk(
  "kot/createKOT",
  async (data, { rejectWithValue }) => {
    try {
      const response = await kotService.createKOT(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create KOT",
      );
    }
  },
);

// ==========================================================
// Update KOT
// ==========================================================

export const updateKOT = createAsyncThunk(
  "kot/updateKOT",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await kotService.updateKOT(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update KOT",
      );
    }
  },
);

// ==========================================================
// Delete KOT
// ==========================================================

export const deleteKOT = createAsyncThunk(
  "kot/deleteKOT",
  async (id, { rejectWithValue }) => {
    try {
      await kotService.deleteKOT(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete KOT",
      );
    }
  },
);

// ==========================================================
// Restore KOT
// ==========================================================

export const restoreKOT = createAsyncThunk(
  "kot/restoreKOT",
  async (id, { rejectWithValue }) => {
    try {
      const response = await kotService.restoreKOT(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore KOT",
      );
    }
  },
);

// ==========================================================
// Kitchen Queue
// ==========================================================

export const fetchKitchenQueue = createAsyncThunk(
  "kot/fetchKitchenQueue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await kotService.getKitchenQueue();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch kitchen queue",
      );
    }
  },
);

// ==========================================================
// Pending KOTs
// ==========================================================

export const fetchPendingKOTs = createAsyncThunk(
  "kot/fetchPendingKOTs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await kotService.getPendingKOTs();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pending KOTs",
      );
    }
  },
);

// ==========================================================
// Today's KOTs
// ==========================================================

export const fetchTodayKOTs = createAsyncThunk(
  "kot/fetchTodayKOTs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await kotService.getTodayKOTs();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch today's KOTs",
      );
    }
  },
);

// ==========================================================
// Mark Preparing
// ==========================================================

export const markKOTPreparing = createAsyncThunk(
  "kot/markPreparing",
  async (id, { rejectWithValue }) => {
    try {
      const response = await kotService.markPreparing(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark KOT preparing",
      );
    }
  },
);

// ==========================================================
// Mark Ready
// ==========================================================

export const markKOTReady = createAsyncThunk(
  "kot/markReady",
  async (id, { rejectWithValue }) => {
    try {
      const response = await kotService.markReady(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark KOT ready",
      );
    }
  },
);

// ==========================================================
// Mark Served
// ==========================================================

export const markKOTServed = createAsyncThunk(
  "kot/markServed",
  async (id, { rejectWithValue }) => {
    try {
      const response = await kotService.markServed(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark KOT served",
      );
    }
  },
);

// ==========================================================
// Mark Printed
// ==========================================================

export const markKOTPrinted = createAsyncThunk(
  "kot/markPrinted",
  async (id, { rejectWithValue }) => {
    try {
      const response = await kotService.markPrinted(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark KOT printed",
      );
    }
  },
);

// ==========================================================
// Slice
// ==========================================================

const kotSlice = createSlice({
  name: "kot",

  initialState: {
    kots: [],
    selectedKOT: null,
    kitchenQueue: [],
    pendingKOTs: [],
    todayKOTs: [],

    loading: false,
    kotLoading: false,
    deleteLoading: false,
    actionLoading: false,

    error: null,
  },

  reducers: {
    clearKOTError: (state) => {
      state.error = null;
    },

    clearSelectedKOT: (state) => {
      state.selectedKOT = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================================
      // FETCH KOTS
      // ======================================================

      .addCase(fetchKOTs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchKOTs.fulfilled, (state, action) => {
        state.loading = false;

        state.kots = action.payload?.data || [];
      })

      .addCase(fetchKOTs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // SEARCH
      // ======================================================

      .addCase(searchKOT.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchKOT.fulfilled, (state, action) => {
        state.loading = false;
        state.kots = action.payload || [];
      })

      .addCase(searchKOT.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // GET BY ID
      // ======================================================

      .addCase(fetchKOTById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchKOTById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedKOT = action.payload;
      })

      .addCase(fetchKOTById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // CREATE
      // ======================================================

      .addCase(createKOT.pending, (state) => {
        state.kotLoading = true;
        state.error = null;
      })

      .addCase(createKOT.fulfilled, (state) => {
        state.kotLoading = false;
      })

      .addCase(createKOT.rejected, (state, action) => {
        state.kotLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // UPDATE
      // ======================================================

      .addCase(updateKOT.pending, (state) => {
        state.kotLoading = true;
        state.error = null;
      })

      .addCase(updateKOT.fulfilled, (state) => {
        state.kotLoading = false;
      })

      .addCase(updateKOT.rejected, (state, action) => {
        state.kotLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // DELETE
      // ======================================================

      .addCase(deleteKOT.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteKOT.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.kots = state.kots.filter((kot) => kot._id !== action.payload);
      })

      .addCase(deleteKOT.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // RESTORE
      // ======================================================

      .addCase(restoreKOT.fulfilled, (state) => {
        state.error = null;
      })

      .addCase(restoreKOT.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ======================================================
      // KITCHEN QUEUE
      // ======================================================

      .addCase(fetchKitchenQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchKitchenQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.kitchenQueue = action.payload || [];
      })

      .addCase(fetchKitchenQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================================
      // PENDING
      // ======================================================

      .addCase(fetchPendingKOTs.fulfilled, (state, action) => {
        state.pendingKOTs = action.payload || [];
      })

      .addCase(fetchPendingKOTs.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ======================================================
      // TODAY
      // ======================================================

      .addCase(fetchTodayKOTs.fulfilled, (state, action) => {
        state.todayKOTs = action.payload || [];
      })

      .addCase(fetchTodayKOTs.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ======================================================
      // PREPARING
      // ======================================================

      .addCase(markKOTPreparing.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(markKOTPreparing.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.kots.findIndex(
          (kot) => kot._id === action.payload._id,
        );

        if (index !== -1) {
          state.kots[index] = action.payload;
        }
      })

      .addCase(markKOTPreparing.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // READY
      // ======================================================

      .addCase(markKOTReady.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(markKOTReady.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.kots.findIndex(
          (kot) => kot._id === action.payload._id,
        );

        if (index !== -1) {
          state.kots[index] = action.payload;
        }
      })

      .addCase(markKOTReady.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // SERVED
      // ======================================================

      .addCase(markKOTServed.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(markKOTServed.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.kots.findIndex(
          (kot) => kot._id === action.payload._id,
        );

        if (index !== -1) {
          state.kots[index] = action.payload;
        }
      })

      .addCase(markKOTServed.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // ======================================================
      // PRINTED
      // ======================================================

      .addCase(markKOTPrinted.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(markKOTPrinted.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.kots.findIndex(
          (kot) => kot._id === action.payload._id,
        );

        if (index !== -1) {
          state.kots[index] = action.payload;
        }
      })

      .addCase(markKOTPrinted.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearKOTError, clearSelectedKOT } = kotSlice.actions;

export default kotSlice.reducer;
