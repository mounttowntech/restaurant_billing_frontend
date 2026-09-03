import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addonService } from "./addOnsService";

// =====================================================
// FETCH ALL ADDONS
// =====================================================

export const fetchAddons = createAsyncThunk(
  "addon/fetchAddons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await addonService.getAddons();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addons",
      );
    }
  },
);

// =====================================================
// CREATE ADDON

// =====================================================

export const createAddon = createAsyncThunk(
  "addon/createAddon",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addonService.createAddon(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create addon",
      );
    }
  },
);

// =====================================================
// UPDATE ADDON
// =====================================================

export const updateAddon = createAsyncThunk(
  "addon/updateAddon",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await addonService.updateAddon(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update addon",
      );
    }
  },
);

// =====================================================
// DELETE ADDON
// =====================================================

export const deleteAddon = createAsyncThunk(
  "addon/deleteAddon",
  async (id, { rejectWithValue }) => {
    try {
      await addonService.deleteAddon(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete addon",
      );
    }
  },
);

// =====================================================
// restoreAddon
// =====================================================

export const restoreAddon = createAsyncThunk(
  "addon/restoreAddon",
  async (id, { rejectWithValue }) => {
    try {
      const response = await addonService.restoreAddon(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore addon",
      );
    }
  },
);

// =====================================================
// ADDON SLICE
// =====================================================

const addonSlice = createSlice({
  name: "addon",

  initialState: {
    addons: [],
    parentAddons: [],

    selectedAddon: null,

    loading: false,
    addonLoading: false,
    deleteLoading: false,

    parentLoading: false,

    error: null,
  },

  reducers: {
    clearAddonError: (state) => {
      state.error = null;
    },

    clearSelectedAddon: (state) => {
      state.selectedAddon = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // FETCH ALL ADDONS
      // =================================================

      .addCase(fetchAddons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAddons.fulfilled, (state, action) => {
        state.loading = false;
        state.addons = action.payload || [];
      })

      .addCase(fetchAddons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // CREATE ADDON
      // =================================================

      .addCase(createAddon.pending, (state) => {
        state.addonLoading = true;
        state.error = null;
      })

      .addCase(createAddon.fulfilled, (state, action) => {
        state.addonLoading = false;

        if (action.payload) {
          state.addons.push(action.payload);
        }
      })

      .addCase(createAddon.rejected, (state, action) => {
        state.addonLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // UPDATE ADDON
      // =================================================

      .addCase(updateAddon.pending, (state) => {
        state.addonLoading = true;
        state.error = null;
      })

      .addCase(updateAddon.fulfilled, (state, action) => {
        state.addonLoading = false;

        const index = state.addons.findIndex(
          (addon) => addon._id === action.payload?._id,
        );

        if (index !== -1) {
          state.addons[index] = action.payload;
        }
      })

      .addCase(updateAddon.rejected, (state, action) => {
        state.addonLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // DELETE ADDON
      // =================================================

      .addCase(deleteAddon.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteAddon.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.addons = state.addons.filter(
          (addon) => addon._id !== action.payload,
        );
      })

      .addCase(deleteAddon.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // restoreAddon
      // =================================================

      .addCase(restoreAddon.pending, (state) => {
        state.error = null;
      })

      .addCase(restoreAddon.fulfilled, (state, action) => {
        const index = state.addons.findIndex(
          (addon) => addon._id === action.payload?._id,
        );

        if (index !== -1) {
          state.addons[index] = action.payload;
        }
      })

      .addCase(restoreAddon.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export const { clearAddonError, clearSelectedAddon } =
  addonSlice.actions;

export default addonSlice.reducer;
