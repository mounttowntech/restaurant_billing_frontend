import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ingredientService } from "./ingredientService";

export const fetchIngredients = createAsyncThunk(
  "ingredient/fetchIngredients",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await ingredientService.getIngredients(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch ingredients",
      );
    }
  },
);

export const searchIngredients = createAsyncThunk(
  "ingredient/searchIngredients",
  async (search, { rejectWithValue }) => {
    try {
      const response = await ingredientService.searchIngredients(search);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search ingredients",
      );
    }
  },
);

export const fetchIngredientById = createAsyncThunk(
  "ingredient/fetchIngredientById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ingredientService.getIngredientById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch ingredient",
      );
    }
  },
);

export const createIngredient = createAsyncThunk(
  "ingredient/createIngredient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ingredientService.createIngredient(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create ingredient",
      );
    }
  },
);

export const updateIngredient = createAsyncThunk(
  "ingredient/updateIngredient",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ingredientService.updateIngredient(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update ingredient",
      );
    }
  },
);

export const deleteIngredient = createAsyncThunk(
  "ingredient/deleteIngredient",
  async (id, { rejectWithValue }) => {
    try {
      await ingredientService.deleteIngredient(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete ingredient",
      );
    }
  },
);

export const activateIngredient = createAsyncThunk(
  "ingredient/activateIngredient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ingredientService.activateIngredient(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate ingredient",
      );
    }
  },
);

export const deactivateIngredient = createAsyncThunk(
  "ingredient/deactivateIngredient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ingredientService.deactivateIngredient(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate ingredient",
      );
    }
  },
);

export const restoreIngredient = createAsyncThunk(
  "ingredient/restoreIngredient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await ingredientService.restoreIngredient(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore ingredient",
      );
    }
  },
);

export const addIngredientStock = createAsyncThunk(
  "ingredient/addIngredientStock",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ingredientService.addIngredientStock(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add ingredient stock",
      );
    }
  },
);

export const removeIngredientStock = createAsyncThunk(
  "ingredient/removeIngredientStock",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ingredientService.removeIngredientStock(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove ingredient stock",
      );
    }
  },
);

export const adjustIngredientStock = createAsyncThunk(
  "ingredient/adjustIngredientStock",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await ingredientService.adjustIngredientStock(id, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to adjust ingredient stock",
      );
    }
  },
);

export const fetchLowStockIngredients = createAsyncThunk(
  "ingredient/fetchLowStockIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ingredientService.getLowStockIngredients();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch low stock ingredients",
      );
    }
  },
);

export const fetchOutOfStockIngredients = createAsyncThunk(
  "ingredient/fetchOutOfStockIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ingredientService.getOutOfStockIngredients();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch out of stock ingredients",
      );
    }
  },
);

export const fetchAvailableIngredients = createAsyncThunk(
  "ingredient/fetchAvailableIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ingredientService.getAvailableIngredients();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch available ingredients",
      );
    }
  },
);

export const fetchIngredientSummary = createAsyncThunk(
  "ingredient/fetchIngredientSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ingredientService.getIngredientSummary();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch ingredient summary",
      );
    }
  },
);

const ingredientSlice = createSlice({
  name: "ingredient",

  initialState: {
    ingredients: [],
    lowStockIngredients: [],
    outOfStockIngredients: [],
    availableIngredients: [],
    summary: null,

    loading: false,
    ingredientLoading: false,
    deleteLoading: false,

    error: null,
  },

  reducers: {
    clearIngredientError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload || [];
      })

      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload || [];
      })

      .addCase(searchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createIngredient.pending, (state) => {
        state.ingredientLoading = true;
        state.error = null;
      })

      .addCase(createIngredient.fulfilled, (state) => {
        state.ingredientLoading = false;
      })

      .addCase(createIngredient.rejected, (state, action) => {
        state.ingredientLoading = false;
        state.error = action.payload;
      })

      .addCase(updateIngredient.pending, (state) => {
        state.ingredientLoading = true;
        state.error = null;
      })

      .addCase(updateIngredient.fulfilled, (state) => {
        state.ingredientLoading = false;
      })

      .addCase(updateIngredient.rejected, (state, action) => {
        state.ingredientLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteIngredient.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteIngredient.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.ingredients = state.ingredients.filter(
          (ingredient) => ingredient._id !== action.payload,
        );
      })

      .addCase(deleteIngredient.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      .addCase(activateIngredient.fulfilled, (state, action) => {
        const index = state.ingredients.findIndex(
          (ingredient) => ingredient._id === action.payload?._id,
        );

        if (index !== -1) {
          state.ingredients[index] = action.payload;
        }
      })

      .addCase(deactivateIngredient.fulfilled, (state, action) => {
        const index = state.ingredients.findIndex(
          (ingredient) => ingredient._id === action.payload?._id,
        );

        if (index !== -1) {
          state.ingredients[index] = action.payload;
        }
      })

      .addCase(restoreIngredient.fulfilled, (state, action) => {
        const index = state.ingredients.findIndex(
          (ingredient) => ingredient._id === action.payload?._id,
        );

        if (index !== -1) {
          state.ingredients[index] = action.payload;
        }
      })

      .addCase(addIngredientStock.fulfilled, (state, action) => {
        const index = state.ingredients.findIndex(
          (ingredient) => ingredient._id === action.payload?._id,
        );

        if (index !== -1) {
          state.ingredients[index] = action.payload;
        }
      })

      .addCase(removeIngredientStock.fulfilled, (state, action) => {
        const index = state.ingredients.findIndex(
          (ingredient) => ingredient._id === action.payload?._id,
        );

        if (index !== -1) {
          state.ingredients[index] = action.payload;
        }
      })

      .addCase(adjustIngredientStock.fulfilled, (state, action) => {
        const index = state.ingredients.findIndex(
          (ingredient) => ingredient._id === action.payload?._id,
        );

        if (index !== -1) {
          state.ingredients[index] = action.payload;
        }
      })

      .addCase(fetchLowStockIngredients.fulfilled, (state, action) => {
        state.lowStockIngredients = action.payload || [];
      })

      .addCase(fetchOutOfStockIngredients.fulfilled, (state, action) => {
        state.outOfStockIngredients = action.payload || [];
      })

      .addCase(fetchAvailableIngredients.fulfilled, (state, action) => {
        state.availableIngredients = action.payload || [];
      })

      .addCase(fetchIngredientSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("ingredient/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        },
      );
  },
});

export const { clearIngredientError } = ingredientSlice.actions;

export default ingredientSlice.reducer;
