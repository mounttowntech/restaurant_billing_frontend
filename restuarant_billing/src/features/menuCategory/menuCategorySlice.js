import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { menuCategoryService } from "./menuCategoryService";

// Fetch Menu Categories

export const fetchMenuCategories = createAsyncThunk(
  "menuCategory/fetchMenuCategories",

  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await menuCategoryService.getMenuCategories(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menu categories",
      );
    }
  },
);

// Search Menu Categories

export const searchMenuCategories = createAsyncThunk(
  "menuCategory/searchMenuCategories",

  async (search, { rejectWithValue }) => {
    try {
      const response = await menuCategoryService.searchMenuCategories(search);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search menu categories",
      );
    }
  },
);

// Fetch Menu Category By ID

export const fetchMenuCategoryById = createAsyncThunk(
  "menuCategory/fetchMenuCategoryById",

  async (id, { rejectWithValue }) => {
    try {
      const response = await menuCategoryService.getMenuCategoryById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menu category",
      );
    }
  },
);

// Create Menu Category

export const createMenuCategory = createAsyncThunk(
  "menuCategory/createMenuCategory",

  async (data, { rejectWithValue }) => {
    try {
      const response = await menuCategoryService.createMenuCategory(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create menu category",
      );
    }
  },
);

// Update Menu Category

export const updateMenuCategory = createAsyncThunk(
  "menuCategory/updateMenuCategory",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await menuCategoryService.updateMenuCategory(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update menu category",
      );
    }
  },
);

// Delete Menu Category

export const deleteMenuCategory = createAsyncThunk(
  "menuCategory/deleteMenuCategory",

  async (id, { rejectWithValue }) => {
    try {
      await menuCategoryService.deleteMenuCategory(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete menu category",
      );
    }
  },
);

// Toggle Menu Category Availability

export const toggleMenuCategoryAvailability = createAsyncThunk(
  "menuCategory/toggleMenuCategoryAvailability",

  async (id, { rejectWithValue }) => {
    try {
      const response =
        await menuCategoryService.toggleMenuCategoryAvailability(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update availability",
      );
    }
  },
);

// Toggle Menu Category Active

export const toggleMenuCategoryActive = createAsyncThunk(
  "menuCategory/toggleMenuCategoryActive",

  async (id, { rejectWithValue }) => {
    try {
      const response = await menuCategoryService.toggleMenuCategoryActive(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update active status",
      );
    }
  },
);

// Slice

const menuCategorySlice = createSlice({
  name: "menuCategory",

  initialState: {
    menuCategories: [],

    menuCategory: null,

    loading: false,

    menuCategoryLoading: false,

    deleteLoading: false,

    actionLoading: false,

    error: null,
  },

  reducers: {
    clearMenuCategoryError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH MENU CATEGORIES

      .addCase(fetchMenuCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMenuCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.menuCategories = action.payload;
      })

      .addCase(fetchMenuCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SEARCH MENU CATEGORIES

      .addCase(searchMenuCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchMenuCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.menuCategories = action.payload;
      })

      .addCase(searchMenuCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH MENU CATEGORY BY ID

      .addCase(fetchMenuCategoryById.pending, (state) => {
        state.menuCategoryLoading = true;
        state.error = null;
      })

      .addCase(fetchMenuCategoryById.fulfilled, (state, action) => {
        state.menuCategoryLoading = false;
        state.menuCategory = action.payload;
      })

      .addCase(fetchMenuCategoryById.rejected, (state, action) => {
        state.menuCategoryLoading = false;
        state.error = action.payload;
      })

      // CREATE MENU CATEGORY

      .addCase(createMenuCategory.pending, (state) => {
        state.menuCategoryLoading = true;
        state.error = null;
      })

      .addCase(createMenuCategory.fulfilled, (state) => {
        state.menuCategoryLoading = false;
      })

      .addCase(createMenuCategory.rejected, (state, action) => {
        state.menuCategoryLoading = false;
        state.error = action.payload;
      })

      // UPDATE MENU CATEGORY

      .addCase(updateMenuCategory.pending, (state) => {
        state.menuCategoryLoading = true;
        state.error = null;
      })

      .addCase(updateMenuCategory.fulfilled, (state) => {
        state.menuCategoryLoading = false;
      })

      .addCase(updateMenuCategory.rejected, (state, action) => {
        state.menuCategoryLoading = false;
        state.error = action.payload;
      })

      // DELETE MENU CATEGORY

      .addCase(deleteMenuCategory.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteMenuCategory.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.menuCategories = state.menuCategories.filter(
          (category) => category._id !== action.payload,
        );
      })

      .addCase(deleteMenuCategory.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // TOGGLE AVAILABILITY

      .addCase(toggleMenuCategoryAvailability.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(toggleMenuCategoryAvailability.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.menuCategories.findIndex(
          (category) => category._id === action.payload._id,
        );

        if (index !== -1) {
          state.menuCategories[index] = action.payload;
        }
      })

      .addCase(toggleMenuCategoryAvailability.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // TOGGLE ACTIVE

      .addCase(toggleMenuCategoryActive.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(toggleMenuCategoryActive.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.menuCategories.findIndex(
          (category) => category._id === action.payload._id,
        );

        if (index !== -1) {
          state.menuCategories[index] = action.payload;
        }
      })

      .addCase(toggleMenuCategoryActive.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

// Actions

export const { clearMenuCategoryError } = menuCategorySlice.actions;

// Reducer

export default menuCategorySlice.reducer;
