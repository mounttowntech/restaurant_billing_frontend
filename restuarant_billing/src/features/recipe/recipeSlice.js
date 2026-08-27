// ==========================================================
// recipeSlice.js
// ==========================================================

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { recipeService } from "./recipeService";

export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipes",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await recipeService.getRecipes(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recipes",
      );
    }
  },
);

export const searchRecipes = createAsyncThunk(
  "recipe/searchRecipes",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await recipeService.searchRecipes(keyword);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search recipes",
      );
    }
  },
);

export const fetchRecipeById = createAsyncThunk(
  "recipe/fetchRecipeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await recipeService.getRecipeById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch recipe",
      );
    }
  },
);

export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async (data, { rejectWithValue }) => {
    try {
      const response = await recipeService.createRecipe(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create recipe",
      );
    }
  },
);

export const updateRecipe = createAsyncThunk(
  "recipe/updateRecipe",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await recipeService.updateRecipe(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update recipe",
      );
    }
  },
);

export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async (id, { rejectWithValue }) => {
    try {
      await recipeService.deleteRecipe(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete recipe",
      );
    }
  },
);

export const restoreRecipe = createAsyncThunk(
  "recipe/restoreRecipe",
  async (id, { rejectWithValue }) => {
    try {
      const response = await recipeService.restoreRecipe(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore recipe",
      );
    }
  },
);

export const updateRecipeStatus = createAsyncThunk(
  "recipe/updateRecipeStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await recipeService.updateRecipeStatus(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update recipe status",
      );
    }
  },
);

const recipeSlice = createSlice({
  name: "recipe",

  initialState: {
    recipes: [],
    selectedRecipe: null,
    loading: false,
    recipeLoading: false,
    deleteLoading: false,
    error: null,
  },

  reducers: {
    clearRecipeError: (state) => {
      state.error = null;
    },

    clearSelectedRecipe: (state) => {
      state.selectedRecipe = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })

      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })

      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRecipeById.pending, (state) => {
        state.recipeLoading = true;
        state.error = null;
      })

      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.recipeLoading = false;
        state.selectedRecipe = action.payload;
      })

      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.recipeLoading = false;
        state.error = action.payload;
      })

      .addCase(createRecipe.pending, (state) => {
        state.recipeLoading = true;
        state.error = null;
      })

      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipeLoading = false;
        state.recipes.unshift(action.payload);
      })

      .addCase(createRecipe.rejected, (state, action) => {
        state.recipeLoading = false;
        state.error = action.payload;
      })

      .addCase(updateRecipe.pending, (state) => {
        state.recipeLoading = true;
        state.error = null;
      })

      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.recipeLoading = false;

        const index = state.recipes.findIndex(
          (recipe) => recipe._id === action.payload._id,
        );

        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      })

      .addCase(updateRecipe.rejected, (state, action) => {
        state.recipeLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteRecipe.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload,
        );
      })

      .addCase(deleteRecipe.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      .addCase(restoreRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
      })

      .addCase(restoreRecipe.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateRecipeStatus.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(
          (recipe) => recipe._id === action.payload._id,
        );

        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      })

      .addCase(updateRecipeStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearRecipeError, clearSelectedRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
