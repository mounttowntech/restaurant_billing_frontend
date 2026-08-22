import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { warehouseService } from "./warehouseservice";

/* ==========================================================
   Fetch Warehouses
========================================================== */

export const fetchWarehouses = createAsyncThunk(
  "warehouse/fetchWarehouses",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await warehouseService.getWarehouses(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch warehouses",
      );
    }
  },
);

/* ==========================================================
   Search Warehouses
========================================================== */

export const searchWarehouses = createAsyncThunk(
  "warehouse/searchWarehouses",
  async (search, { rejectWithValue }) => {
    try {
      const response = await warehouseService.searchWarehouses(search);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search warehouses",
      );
    }
  },
);

/* ==========================================================
   Fetch Warehouse By ID
========================================================== */

export const fetchWarehouseById = createAsyncThunk(
  "warehouse/fetchWarehouseById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await warehouseService.getWarehouseById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch warehouse",
      );
    }
  },
);

/* ==========================================================
   Create Warehouse
========================================================== */

export const createWarehouse = createAsyncThunk(
  "warehouse/createWarehouse",
  async (data, { rejectWithValue }) => {
    try {
      const response = await warehouseService.createWarehouse(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create warehouse",
      );
    }
  },
);

/* ==========================================================
   Update Warehouse
========================================================== */

export const updateWarehouse = createAsyncThunk(
  "warehouse/updateWarehouse",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await warehouseService.updateWarehouse(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update warehouse",
      );
    }
  },
);

/* ==========================================================
   Delete Warehouse
========================================================== */

export const deleteWarehouse = createAsyncThunk(
  "warehouse/deleteWarehouse",
  async (id, { rejectWithValue }) => {
    try {
      await warehouseService.deleteWarehouse(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete warehouse",
      );
    }
  },
);

/* ==========================================================
   Restore Warehouse
========================================================== */

export const restoreWarehouse = createAsyncThunk(
  "warehouse/restoreWarehouse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await warehouseService.restoreWarehouse(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore warehouse",
      );
    }
  },
);

/* ==========================================================
   Set Default Warehouse
========================================================== */

export const setDefaultWarehouse = createAsyncThunk(
  "warehouse/setDefaultWarehouse",
  async (id, { rejectWithValue }) => {
    try {
      const response = await warehouseService.setDefaultWarehouse(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to set default warehouse",
      );
    }
  },
);

/* ==========================================================
   Get Default Warehouse
========================================================== */

export const fetchDefaultWarehouse = createAsyncThunk(
  "warehouse/fetchDefaultWarehouse",
  async (_, { rejectWithValue }) => {
    try {
      const response = await warehouseService.getDefaultWarehouse();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch default warehouse",
      );
    }
  },
);

/* ==========================================================
   Warehouse Summary
========================================================== */

export const fetchWarehouseSummary = createAsyncThunk(
  "warehouse/fetchWarehouseSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await warehouseService.getWarehouseSummary();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch warehouse summary",
      );
    }
  },
);

/* ==========================================================
   Fetch Restaurants
========================================================== */

export const fetchRestaurants = createAsyncThunk(
  "warehouse/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await warehouseService.getRestaurants();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurants",
      );
    }
  },
);

/* ==========================================================
   Fetch Stores
========================================================== */

export const fetchStores = createAsyncThunk(
  "warehouse/fetchStores",
  async (restaurant = "", { rejectWithValue }) => {
    try {
      const response = await warehouseService.getStores(restaurant);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stores",
      );
    }
  },
);

/* ==========================================================
   Fetch Users
========================================================== */

export const fetchUsers = createAsyncThunk(
  "warehouse/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await warehouseService.getUsers();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

/* ==========================================================
   Initial State
========================================================== */

const initialState = {
  warehouses: [],
  restaurants: [],
  stores: [],
  users: [],

  defaultWarehouse: null,
  summary: null,

  loading: false,
  warehouseLoading: false,
  deleteLoading: false,

  restaurantLoading: false,
  storeLoading: false,
  userLoading: false,

  error: null,
};

/* ==========================================================
   Slice
========================================================== */

const warehouseSlice = createSlice({
  name: "warehouse",

  initialState,

  reducers: {
    clearWarehouseError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ======================================================
         Fetch Warehouses
      ====================================================== */

      .addCase(fetchWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWarehouses.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = action.payload || [];
      })

      .addCase(fetchWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Search
      ====================================================== */

      .addCase(searchWarehouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchWarehouses.fulfilled, (state, action) => {
        state.loading = false;
        state.warehouses = action.payload || [];
      })

      .addCase(searchWarehouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Get By ID
      ====================================================== */

      .addCase(fetchWarehouseById.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ======================================================
         Create
      ====================================================== */

      .addCase(createWarehouse.pending, (state) => {
        state.warehouseLoading = true;
        state.error = null;
      })

      .addCase(createWarehouse.fulfilled, (state) => {
        state.warehouseLoading = false;
      })

      .addCase(createWarehouse.rejected, (state, action) => {
        state.warehouseLoading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Update
      ====================================================== */

      .addCase(updateWarehouse.pending, (state) => {
        state.warehouseLoading = true;
        state.error = null;
      })

      .addCase(updateWarehouse.fulfilled, (state) => {
        state.warehouseLoading = false;
      })

      .addCase(updateWarehouse.rejected, (state, action) => {
        state.warehouseLoading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Delete
      ====================================================== */

      .addCase(deleteWarehouse.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteWarehouse.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.warehouses = state.warehouses.filter(
          (warehouse) => warehouse._id !== action.payload,
        );
      })

      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Restore
      ====================================================== */

      .addCase(restoreWarehouse.fulfilled, (state, action) => {
        const index = state.warehouses.findIndex(
          (warehouse) => warehouse._id === action.payload?._id,
        );

        if (index !== -1) {
          state.warehouses[index] = action.payload;
        }
      })

      .addCase(restoreWarehouse.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ======================================================
         Set Default
      ====================================================== */

      .addCase(setDefaultWarehouse.fulfilled, (state, action) => {
        const updated = action.payload;

        if (updated?._id) {
          state.warehouses = state.warehouses.map((warehouse) => ({
            ...warehouse,
            isDefault: warehouse._id === updated._id,
          }));
        }
      })

      .addCase(setDefaultWarehouse.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ======================================================
         Default Warehouse
      ====================================================== */

      .addCase(fetchDefaultWarehouse.fulfilled, (state, action) => {
        state.defaultWarehouse = action.payload;
      })

      /* ======================================================
         Summary
      ====================================================== */

      .addCase(fetchWarehouseSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })

      /* ======================================================
         Restaurants
      ====================================================== */

      .addCase(fetchRestaurants.pending, (state) => {
        state.restaurantLoading = true;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurantLoading = false;
        state.restaurants = action.payload || [];
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.restaurantLoading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Stores
      ====================================================== */

      .addCase(fetchStores.pending, (state) => {
        state.storeLoading = true;
      })

      .addCase(fetchStores.fulfilled, (state, action) => {
        state.storeLoading = false;
        state.stores = action.payload || [];
      })

      .addCase(fetchStores.rejected, (state, action) => {
        state.storeLoading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Users
      ====================================================== */

      .addCase(fetchUsers.pending, (state) => {
        state.userLoading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = action.payload || [];
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWarehouseError } = warehouseSlice.actions;

export default warehouseSlice.reducer;
