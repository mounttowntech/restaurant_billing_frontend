import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { menuItemService } from "./menuItemService";

// ==========================================================
// FETCH MENU ITEMS
// ==========================================================

export const fetchMenuItems = createAsyncThunk(
  "menuItem/fetchMenuItems",

  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await menuItemService.getMenuItems(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menu items",
      );
    }
  },
);

// ==========================================================
// SEARCH MENU ITEMS
// ==========================================================

export const searchMenuItems = createAsyncThunk(
  "menuItem/searchMenuItems",

  async (keyword, { rejectWithValue }) => {
    try {
      const response = await menuItemService.searchMenuItems(keyword);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search menu items",
      );
    }
  },
);

// ==========================================================
// FETCH MENU ITEM BY ID
// ==========================================================

export const fetchMenuItemById = createAsyncThunk(
  "menuItem/fetchMenuItemById",

  async (id, { rejectWithValue }) => {
    try {
      const response = await menuItemService.getMenuItemById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch menu item",
      );
    }
  },
);

// ==========================================================
// CREATE MENU ITEM
// ==========================================================

export const createMenuItem = createAsyncThunk(
  "menuItem/createMenuItem",

  async (data, { rejectWithValue }) => {
    try {
      const response = await menuItemService.createMenuItem(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create menu item",
      );
    }
  },
);

// ==========================================================
// UPDATE MENU ITEM
// ==========================================================

export const updateMenuItem = createAsyncThunk(
  "menuItem/updateMenuItem",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await menuItemService.updateMenuItem(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update menu item",
      );
    }
  },
);

// ==========================================================
// DELETE MENU ITEM
// ==========================================================

export const deleteMenuItem = createAsyncThunk(
  "menuItem/deleteMenuItem",

  async (id, { rejectWithValue }) => {
    try {
      await menuItemService.deleteMenuItem(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete menu item",
      );
    }
  },
);

// ==========================================================
// RESTORE MENU ITEM
// ==========================================================

export const restoreMenuItem = createAsyncThunk(
  "menuItem/restoreMenuItem",

  async (id, { rejectWithValue }) => {
    try {
      const response = await menuItemService.restoreMenuItem(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore menu item",
      );
    }
  },
);

// ==========================================================
// UPDATE AVAILABILITY
// ==========================================================

export const updateMenuItemAvailability = createAsyncThunk(
  "menuItem/updateMenuItemAvailability",

  async ({ id, isAvailable }, { rejectWithValue }) => {
    try {
      const response = await menuItemService.updateMenuItemAvailability(
        id,
        isAvailable,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update availability",
      );
    }
  },
);

// ==========================================================
// UPDATE STATUS
// ==========================================================

export const updateMenuItemStatus = createAsyncThunk(
  "menuItem/updateMenuItemStatus",

  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await menuItemService.updateMenuItemStatus(id, status);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);

// ==========================================================
// GET AVAILABLE MENU ITEMS
// ==========================================================

export const fetchAvailableMenuItems = createAsyncThunk(
  "menuItem/fetchAvailableMenuItems",

  async (_, { rejectWithValue }) => {
    try {
      const response = await menuItemService.getAvailableMenuItems();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch available menu items",
      );
    }
  },
);

// ==========================================================
// GET CATEGORY WISE MENU
// ==========================================================

export const fetchCategoryWiseMenu = createAsyncThunk(
  "menuItem/fetchCategoryWiseMenu",

  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await menuItemService.getCategoryWiseMenu(categoryId);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category menu",
      );
    }
  },
);

// ==========================================================
// SLICE
// ==========================================================

const menuItemSlice = createSlice({
  name: "menuItem",

  initialState: {
    menuItems: [],

    menuItem: null,

    loading: false,

    menuItemLoading: false,

    deleteLoading: false,

    actionLoading: false,

    error: null,
  },

  reducers: {
    clearMenuItemError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // FETCH
      // =====================================================

      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload;
      })

      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================================
      // SEARCH
      // =====================================================

      .addCase(searchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload;
      })

      .addCase(searchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================================
      // FETCH BY ID
      // =====================================================

      .addCase(fetchMenuItemById.pending, (state) => {
        state.menuItemLoading = true;
        state.error = null;
      })

      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.menuItemLoading = false;
        state.menuItem = action.payload;
      })

      .addCase(fetchMenuItemById.rejected, (state, action) => {
        state.menuItemLoading = false;
        state.error = action.payload;
      })

      // =====================================================
      // CREATE
      // =====================================================

      .addCase(createMenuItem.pending, (state) => {
        state.menuItemLoading = true;
        state.error = null;
      })

      .addCase(createMenuItem.fulfilled, (state) => {
        state.menuItemLoading = false;
      })

      .addCase(createMenuItem.rejected, (state, action) => {
        state.menuItemLoading = false;
        state.error = action.payload;
      })

      // =====================================================
      // UPDATE
      // =====================================================

      .addCase(updateMenuItem.pending, (state) => {
        state.menuItemLoading = true;
        state.error = null;
      })

      .addCase(updateMenuItem.fulfilled, (state) => {
        state.menuItemLoading = false;
      })

      .addCase(updateMenuItem.rejected, (state, action) => {
        state.menuItemLoading = false;
        state.error = action.payload;
      })

      // =====================================================
      // DELETE
      // =====================================================

      .addCase(deleteMenuItem.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.menuItems = state.menuItems.filter(
          (item) => item._id !== action.payload,
        );
      })

      .addCase(deleteMenuItem.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      // =====================================================
      // RESTORE
      // =====================================================

      .addCase(restoreMenuItem.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(restoreMenuItem.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.menuItems.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.menuItems[index] = action.payload;
        }
      })

      .addCase(restoreMenuItem.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // =====================================================
      // AVAILABILITY
      // =====================================================

      .addCase(updateMenuItemAvailability.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(updateMenuItemAvailability.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.menuItems.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.menuItems[index] = action.payload;
        }
      })

      .addCase(updateMenuItemAvailability.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // =====================================================
      // STATUS
      // =====================================================

      .addCase(updateMenuItemStatus.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(updateMenuItemStatus.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.menuItems.findIndex(
          (item) => item._id === action.payload._id,
        );

        if (index !== -1) {
          state.menuItems[index] = action.payload;
        }
      })

      .addCase(updateMenuItemStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // =====================================================
      // AVAILABLE MENU ITEMS
      // =====================================================

      .addCase(fetchAvailableMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAvailableMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload;
      })

      .addCase(fetchAvailableMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================================================
      // CATEGORY WISE
      // =====================================================

      .addCase(fetchCategoryWiseMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategoryWiseMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload;
      })

      .addCase(fetchCategoryWiseMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMenuItemError } = menuItemSlice.actions;

export default menuItemSlice.reducer;
