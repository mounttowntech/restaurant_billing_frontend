import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { categoryService } from "./categoryService";

// =====================================================
// FETCH ALL CATEGORIES
// =====================================================

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getCategories();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

// =====================================================
// FETCH CATEGORY BY ID
// =====================================================

export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await categoryService.getCategoryById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category",
      );
    }
  },
);

// =====================================================
// CREATE CATEGORY
// =====================================================

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await categoryService.createCategory(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category",
      );
    }
  },
);

// =====================================================
// UPDATE CATEGORY
// =====================================================

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await categoryService.updateCategory(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category",
      );
    }
  },
);

// =====================================================
// DELETE CATEGORY
// =====================================================

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await categoryService.deleteCategory(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category",
      );
    }
  },
);

// =====================================================
// CHANGE CATEGORY STATUS
// =====================================================

export const changeCategoryStatus = createAsyncThunk(
  "category/changeCategoryStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await categoryService.changeCategoryStatus(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category status",
      );
    }
  },
);

// =====================================================
// FETCH PARENT CATEGORIES
// =====================================================

export const fetchParentCategories = createAsyncThunk(
  "category/fetchParentCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getParentCategories();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch parent categories",
      );
    }
  },
);

// =====================================================
// CATEGORY SLICE
// =====================================================

const categorySlice = createSlice({
  name: "category",

  initialState: {
    categories: [],
    parentCategories: [],

    selectedCategory: null,

    loading: false,
    categoryLoading: false,
    deleteLoading: false,

    parentLoading: false,

    error: null,
  },

  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =================================================
      // FETCH CATEGORIES
      // =================================================

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload || [];
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // FETCH CATEGORY BY ID
      // =================================================

      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })

      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =================================================
      // CREATE CATEGORY
      // =================================================

      .addCase(createCategory.pending, (state) => {
        state.categoryLoading = true;
        state.error = null;
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;

        if (action.payload) {
          state.categories.push(action.payload);
        }
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // UPDATE CATEGORY
      // =================================================

      .addCase(updateCategory.pending, (state) => {
        state.categoryLoading = true;
        state.error = null;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categoryLoading = false;

        const index = state.categories.findIndex(
          (category) => category._id === action.payload?._id,
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.categoryLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // DELETE CATEGORY
      // =================================================

      .addCase(deleteCategory.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.categories = state.categories.filter(
          (category) => category._id !== action.payload,
        );
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // =================================================
      // CHANGE STATUS
      // =================================================

      .addCase(changeCategoryStatus.pending, (state) => {
        state.error = null;
      })

      .addCase(changeCategoryStatus.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category._id === action.payload?._id,
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      .addCase(changeCategoryStatus.rejected, (state, action) => {
        state.error = action.payload;
      })

      // =================================================
      // PARENT CATEGORIES
      // =================================================

      .addCase(fetchParentCategories.pending, (state) => {
        state.parentLoading = true;
      })

      .addCase(fetchParentCategories.fulfilled, (state, action) => {
        state.parentLoading = false;
        state.parentCategories = action.payload || [];
      })

      .addCase(fetchParentCategories.rejected, (state, action) => {
        state.parentLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategoryError, clearSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
