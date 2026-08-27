import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { supplierService } from "./supplierService";

export const fetchSuppliers = createAsyncThunk(
  "supplier/fetchSuppliers",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await supplierService.getSuppliers(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch suppliers",
      );
    }
  },
);

export const searchSuppliers = createAsyncThunk(
  "supplier/searchSuppliers",
  async (search, { rejectWithValue }) => {
    try {
      const response = await supplierService.searchSuppliers(search);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search suppliers",
      );
    }
  },
);

export const fetchSupplierById = createAsyncThunk(
  "supplier/fetchSupplierById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await supplierService.getSupplierById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch supplier",
      );
    }
  },
);

export const createSupplier = createAsyncThunk(
  "supplier/createSupplier",
  async (data, { rejectWithValue }) => {
    try {
      const response = await supplierService.createSupplier(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create supplier",
      );
    }
  },
);

export const updateSupplier = createAsyncThunk(
  "supplier/updateSupplier",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await supplierService.updateSupplier(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update supplier",
      );
    }
  },
);

export const deleteSupplier = createAsyncThunk(
  "supplier/deleteSupplier",
  async (id, { rejectWithValue }) => {
    try {
      await supplierService.deleteSupplier(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete supplier",
      );
    }
  },
);

export const restoreSupplier = createAsyncThunk(
  "supplier/restoreSupplier",
  async (id, { rejectWithValue }) => {
    try {
      const response = await supplierService.restoreSupplier(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore supplier",
      );
    }
  },
);

export const changeSupplierStatus = createAsyncThunk(
  "supplier/changeSupplierStatus",
  async ({ id, isActive }, { rejectWithValue }) => {
    try {
      const response = await supplierService.changeSupplierStatus(id, isActive);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update supplier status",
      );
    }
  },
);

export const markPreferred = createAsyncThunk(
  "supplier/markPreferred",
  async (id, { rejectWithValue }) => {
    try {
      const response = await supplierService.markPreferredSupplier(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark supplier as preferred",
      );
    }
  },
);

export const removePreferred = createAsyncThunk(
  "supplier/removePreferred",
  async (id, { rejectWithValue }) => {
    try {
      const response = await supplierService.removePreferredSupplier(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove preferred supplier",
      );
    }
  },
);

export const fetchSupplierSummary = createAsyncThunk(
  "supplier/fetchSupplierSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await supplierService.getSupplierSummary();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch supplier summary",
      );
    }
  },
);

export const fetchSupplierAnalytics = createAsyncThunk(
  "supplier/fetchSupplierAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await supplierService.getSupplierAnalytics();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch supplier analytics",
      );
    }
  },
);

const supplierSlice = createSlice({
  name: "supplier",

  initialState: {
    suppliers: [],
    selectedSupplier: null,
    summary: null,
    analytics: null,
    loading: false,
    supplierLoading: false,
    deleteLoading: false,
    statusLoading: false,
    error: null,
  },

  reducers: {
    clearSupplierError: (state) => {
      state.error = null;
    },

    clearSelectedSupplier: (state) => {
      state.selectedSupplier = null;
    },

    resetSuppliers: (state) => {
      state.suppliers = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })

      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchSuppliers.fulfilled, (state, action) => {
        state.loading = false;
        state.suppliers = action.payload;
      })

      .addCase(searchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSupplierById.pending, (state) => {
        state.supplierLoading = true;
        state.error = null;
      })

      .addCase(fetchSupplierById.fulfilled, (state, action) => {
        state.supplierLoading = false;
        state.selectedSupplier = action.payload;
      })

      .addCase(fetchSupplierById.rejected, (state, action) => {
        state.supplierLoading = false;
        state.error = action.payload;
      })

      .addCase(createSupplier.pending, (state) => {
        state.supplierLoading = true;
        state.error = null;
      })

      .addCase(createSupplier.fulfilled, (state) => {
        state.supplierLoading = false;
      })

      .addCase(createSupplier.rejected, (state, action) => {
        state.supplierLoading = false;
        state.error = action.payload;
      })

      .addCase(updateSupplier.pending, (state) => {
        state.supplierLoading = true;
        state.error = null;
      })

      .addCase(updateSupplier.fulfilled, (state) => {
        state.supplierLoading = false;
      })

      .addCase(updateSupplier.rejected, (state, action) => {
        state.supplierLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteSupplier.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.suppliers = state.suppliers.filter(
          (supplier) => supplier._id !== action.payload,
        );
      })

      .addCase(deleteSupplier.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      .addCase(restoreSupplier.fulfilled, (state, action) => {
        const index = state.suppliers.findIndex(
          (supplier) => supplier._id === action.payload?._id,
        );

        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
      })

      .addCase(restoreSupplier.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(changeSupplierStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })

      .addCase(changeSupplierStatus.fulfilled, (state, action) => {
        state.statusLoading = false;

        const index = state.suppliers.findIndex(
          (supplier) => supplier._id === action.payload?._id,
        );

        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
      })

      .addCase(changeSupplierStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      })

      .addCase(markPreferred.fulfilled, (state, action) => {
        const index = state.suppliers.findIndex(
          (supplier) => supplier._id === action.payload?._id,
        );

        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
      })

      .addCase(markPreferred.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(removePreferred.fulfilled, (state, action) => {
        const index = state.suppliers.findIndex(
          (supplier) => supplier._id === action.payload?._id,
        );

        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
      })

      .addCase(removePreferred.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchSupplierSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })

      .addCase(fetchSupplierSummary.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchSupplierAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      })

      .addCase(fetchSupplierAnalytics.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearSupplierError, clearSelectedSupplier, resetSuppliers } =
  supplierSlice.actions;

export default supplierSlice.reducer;
