import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { unitService } from "./unitservice";

/* ==========================================================
   Fetch Units
========================================================== */

export const fetchUnits = createAsyncThunk(
  "unit/fetchUnits",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await unitService.getUnits(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch units",
      );
    }
  },
);

/* ==========================================================
   Search Units
========================================================== */

export const searchUnits = createAsyncThunk(
  "unit/searchUnits",
  async ({ keyword, restaurant = "" }, { rejectWithValue }) => {
    try {
      const response = await unitService.searchUnits(keyword, restaurant);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search units",
      );
    }
  },
);

/* ==========================================================
   Fetch Unit By ID
========================================================== */

export const fetchUnitById = createAsyncThunk(
  "unit/fetchUnitById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await unitService.getUnitById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch unit",
      );
    }
  },
);

/* ==========================================================
   Create Unit
========================================================== */

export const createUnit = createAsyncThunk(
  "unit/createUnit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await unitService.createUnit(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create unit",
      );
    }
  },
);

/* ==========================================================
   Update Unit
========================================================== */

export const updateUnit = createAsyncThunk(
  "unit/updateUnit",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await unitService.updateUnit(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update unit",
      );
    }
  },
);

/* ==========================================================
   Delete Unit
========================================================== */

export const deleteUnit = createAsyncThunk(
  "unit/deleteUnit",
  async (id, { rejectWithValue }) => {
    try {
      await unitService.deleteUnit(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete unit",
      );
    }
  },
);

/* ==========================================================
   Restore Unit
========================================================== */

export const restoreUnit = createAsyncThunk(
  "unit/restoreUnit",
  async (id, { rejectWithValue }) => {
    try {
      const response = await unitService.restoreUnit(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore unit",
      );
    }
  },
);

/* ==========================================================
   Activate Unit
========================================================== */

export const activateUnit = createAsyncThunk(
  "unit/activateUnit",
  async (id, { rejectWithValue }) => {
    try {
      const response = await unitService.activateUnit(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate unit",
      );
    }
  },
);

/* ==========================================================
   Deactivate Unit
========================================================== */

export const deactivateUnit = createAsyncThunk(
  "unit/deactivateUnit",
  async (id, { rejectWithValue }) => {
    try {
      const response = await unitService.deactivateUnit(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate unit",
      );
    }
  },
);

/* ==========================================================
   Fetch Restaurants
========================================================== */

export const fetchRestaurants = createAsyncThunk(
  "unit/fetchRestaurants",
  async (_, { rejectWithValue }) => {
    try {
      const response = await unitService.getRestaurants();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch restaurants",
      );
    }
  },
);

/* ==========================================================
   Initial State
========================================================== */

const initialState = {
  units: [],
  restaurants: [],

  loading: false,
  unitLoading: false,
  deleteLoading: false,
  restaurantLoading: false,

  error: null,
};

/* ==========================================================
   Slice
========================================================== */

const unitSlice = createSlice({
  name: "unit",

  initialState,

  reducers: {
    clearUnitError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ======================================================
         Fetch Units
      ====================================================== */

      .addCase(fetchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload || [];
      })

      .addCase(fetchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Search Units
      ====================================================== */

      .addCase(searchUnits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchUnits.fulfilled, (state, action) => {
        state.loading = false;
        state.units = action.payload || [];
      })

      .addCase(searchUnits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Get Unit By ID
      ====================================================== */

      .addCase(fetchUnitById.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ======================================================
         Create Unit
      ====================================================== */

      .addCase(createUnit.pending, (state) => {
        state.unitLoading = true;
        state.error = null;
      })

      .addCase(createUnit.fulfilled, (state) => {
        state.unitLoading = false;
      })

      .addCase(createUnit.rejected, (state, action) => {
        state.unitLoading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Update Unit
      ====================================================== */

      .addCase(updateUnit.pending, (state) => {
        state.unitLoading = true;
        state.error = null;
      })

      .addCase(updateUnit.fulfilled, (state) => {
        state.unitLoading = false;
      })

      .addCase(updateUnit.rejected, (state, action) => {
        state.unitLoading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Delete Unit
      ====================================================== */

      .addCase(deleteUnit.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteUnit.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.units = state.units.filter((unit) => unit._id !== action.payload);
      })

      .addCase(deleteUnit.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      /* ======================================================
         Restore
      ====================================================== */

      .addCase(restoreUnit.fulfilled, (state, action) => {
        const index = state.units.findIndex(
          (unit) => unit._id === action.payload?._id,
        );

        if (index !== -1) {
          state.units[index] = action.payload;
        }
      })

      .addCase(restoreUnit.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ======================================================
         Activate
      ====================================================== */

      .addCase(activateUnit.fulfilled, (state, action) => {
        const index = state.units.findIndex(
          (unit) => unit._id === action.payload?._id,
        );

        if (index !== -1) {
          state.units[index] = action.payload;
        }
      })

      .addCase(activateUnit.rejected, (state, action) => {
        state.error = action.payload;
      })

      /* ======================================================
         Deactivate
      ====================================================== */

      .addCase(deactivateUnit.fulfilled, (state, action) => {
        const index = state.units.findIndex(
          (unit) => unit._id === action.payload?._id,
        );

        if (index !== -1) {
          state.units[index] = action.payload;
        }
      })

      .addCase(deactivateUnit.rejected, (state, action) => {
        state.error = action.payload;
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
      });
  },
});

export const { clearUnitError } = unitSlice.actions;

export default unitSlice.reducer;
