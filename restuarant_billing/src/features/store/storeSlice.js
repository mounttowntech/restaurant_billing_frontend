import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as storeService from "./storeService";

// ==================================================
// FETCH STORES
// ==================================================

export const fetchStores = createAsyncThunk(
  "stores/fetchStores",
  async ({ search = "", status = "" } = {}, thunkAPI) => {
    try {
      return await storeService.fetchStores({
        search,
        status,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch stores",
      );
    }
  },
);

// ==================================================
// GET STORE BY ID
// ==================================================

export const fetchStoreById = createAsyncThunk(
  "stores/fetchStoreById",
  async (id, thunkAPI) => {
    try {
      return await storeService.getStoreById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch store",
      );
    }
  },
);

// ==================================================
// CREATE STORE
// ==================================================

export const createStore = createAsyncThunk(
  "stores/createStore",
  async (store, thunkAPI) => {
    try {
      return await storeService.createStore(store);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create store",
      );
    }
  },
);

// ==================================================
// UPDATE STORE
// ==================================================

export const updateStore = createAsyncThunk(
  "stores/updateStore",
  async ({ id, store }, thunkAPI) => {
    try {
      return await storeService.updateStore({
        id,
        store,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update store",
      );
    }
  },
);

// ==================================================
// DELETE STORE
// ==================================================

export const deleteStore = createAsyncThunk(
  "stores/deleteStore",
  async (id, thunkAPI) => {
    try {
      await storeService.deleteStore(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete store",
      );
    }
  },
);

// ==================================================
// RESTORE STORE
// ==================================================

export const restoreStore = createAsyncThunk(
  "stores/restoreStore",
  async (id, thunkAPI) => {
    try {
      return await storeService.restoreStore(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to restore store",
      );
    }
  },
);

// ==================================================
// TOGGLE STORE STATUS
// ==================================================

export const toggleStoreStatus = createAsyncThunk(
  "stores/toggleStoreStatus",
  async (id, thunkAPI) => {
    try {
      return await storeService.toggleStoreStatus(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to change store status",
      );
    }
  },
);

// ==================================================
// SLICE
// ==================================================

const storeSlice = createSlice({
  name: "stores",

  initialState: {
    stores: [],
    store: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearStoreError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==================================================
      // FETCH
      // ==================================================

      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;

        console.log("REDUX STORE PAYLOAD:", action.payload);

        state.stores = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to fetch stores";
      })

      // ==================================================
      // GET BY ID
      // ==================================================

      .addCase(fetchStoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.store = action.payload;
      })

      .addCase(fetchStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to fetch store";
      })

      // ==================================================
      // CREATE
      // ==================================================

      .addCase(createStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createStore.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.stores.unshift(action.payload);
        }
      })

      .addCase(createStore.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to create store";
      })

      // ==================================================
      // UPDATE
      // ==================================================

      .addCase(updateStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateStore.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?._id) {
          state.stores = state.stores.map((store) =>
            store._id === action.payload._id ? action.payload : store,
          );
        }
      })

      .addCase(updateStore.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to update store";
      })

      // ==================================================
      // DELETE
      // ==================================================

      .addCase(deleteStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteStore.fulfilled, (state, action) => {
        state.loading = false;

        state.stores = state.stores.filter(
          (store) => store._id !== action.payload,
        );
      })

      .addCase(deleteStore.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to delete store";
      })

      // ==================================================
      // RESTORE
      // ==================================================

      .addCase(restoreStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restoreStore.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?._id) {
          const index = state.stores.findIndex(
            (store) => store._id === action.payload._id,
          );

          if (index !== -1) {
            state.stores[index] = action.payload;
          } else {
            state.stores.push(action.payload);
          }
        }
      })

      .addCase(restoreStore.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to restore store";
      })

      // ==================================================
      // TOGGLE STATUS
      // ==================================================

      .addCase(toggleStoreStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(toggleStoreStatus.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload?._id) {
          state.stores = state.stores.map((store) =>
            store._id === action.payload._id ? action.payload : store,
          );
        }
      })

      .addCase(toggleStoreStatus.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to change store status";
      });
  },
});

export const { clearStoreError } = storeSlice.actions;

export default storeSlice.reducer;
