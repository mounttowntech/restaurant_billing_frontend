import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { companyService } from "./companyservice";

// =====================================================
// FETCH COMPANIES
// =====================================================

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await companyService.getCompanies(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch companies",
      );
    }
  },
);

// =====================================================
// FETCH COMPANY BY ID
// =====================================================

export const fetchCompanyById = createAsyncThunk(
  "company/fetchCompanyById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await companyService.getCompanyById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch company",
      );
    }
  },
);

// =====================================================
// CREATE COMPANY
// =====================================================

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await companyService.createCompany(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create company",
      );
    }
  },
);

// =====================================================
// UPDATE COMPANY
// =====================================================

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await companyService.updateCompany(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update company",
      );
    }
  },
);

// =====================================================
// DELETE COMPANY
// =====================================================

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (id, { rejectWithValue }) => {
    try {
      await companyService.deleteCompany(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete company",
      );
    }
  },
);

// =====================================================
// RESTORE COMPANY
// =====================================================

export const restoreCompany = createAsyncThunk(
  "company/restoreCompany",
  async (id, { rejectWithValue }) => {
    try {
      const response = await companyService.restoreCompany(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore company",
      );
    }
  },
);

// =====================================================
// TOGGLE COMPANY STATUS
// =====================================================

export const toggleCompanyStatus = createAsyncThunk(
  "company/toggleCompanyStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await companyService.toggleCompanyStatus(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update company status",
      );
    }
  },
);

// =====================================================
// COMPANY SLICE
// =====================================================

const companySlice = createSlice({
  name: "company",

  initialState: {
    companies: [],
    selectedCompany: null,
    loading: false,
    companyLoading: false,
    deleteLoading: false,
    error: null,
  },

  reducers: {
    clearCompanyError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // FETCH COMPANIES
      // =================================================

      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })

      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // FETCH COMPANY BY ID
      // =================================================

      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompany = action.payload;
      })

      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // CREATE COMPANY
      // =================================================

      .addCase(createCompany.pending, (state) => {
        state.companyLoading = true;
        state.error = null;
      })

      .addCase(createCompany.fulfilled, (state) => {
        state.companyLoading = false;
      })

      .addCase(createCompany.rejected, (state, action) => {
        state.companyLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // UPDATE COMPANY
      // =================================================

      .addCase(updateCompany.pending, (state) => {
        state.companyLoading = true;
        state.error = null;
      })

      .addCase(updateCompany.fulfilled, (state) => {
        state.companyLoading = false;
      })

      .addCase(updateCompany.rejected, (state, action) => {
        state.companyLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // DELETE COMPANY
      // =================================================

      .addCase(deleteCompany.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.companies = state.companies.filter(
          (company) => company._id !== action.payload,
        );
      })

      .addCase(deleteCompany.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // RESTORE COMPANY
      // =================================================

      .addCase(restoreCompany.pending, (state) => {
        state.companyLoading = true;
        state.error = null;
      })

      .addCase(restoreCompany.fulfilled, (state, action) => {
        state.companyLoading = false;

        const index = state.companies.findIndex(
          (company) => company._id === action.payload._id,
        );

        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })

      .addCase(restoreCompany.rejected, (state, action) => {
        state.companyLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // TOGGLE COMPANY STATUS
      // =================================================

      .addCase(toggleCompanyStatus.pending, (state) => {
        state.companyLoading = true;
        state.error = null;
      })

      .addCase(toggleCompanyStatus.fulfilled, (state, action) => {
        state.companyLoading = false;

        const index = state.companies.findIndex(
          (company) => company._id === action.payload._id,
        );

        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })

      .addCase(toggleCompanyStatus.rejected, (state, action) => {
        state.companyLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCompanyError } = companySlice.actions;

export default companySlice.reducer;
