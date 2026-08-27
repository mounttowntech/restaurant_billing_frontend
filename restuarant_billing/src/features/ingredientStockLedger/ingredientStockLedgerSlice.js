import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { ingredientStockLedgerService } from "./ingredientStockLedgerService";

export const fetchIngredientStockLedgers = createAsyncThunk(
  "ingredientStockLedger/fetchIngredientStockLedgers",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.getIngredientStockLedgers(filters);

      return response;
    } catch (error) {
      console.error("Fetch stock ledgers error:", error);

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch stock ledgers",
      );
    }
  },
);

export const searchIngredientStockLedgers = createAsyncThunk(
  "ingredientStockLedger/searchIngredientStockLedgers",
  async (search, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.searchIngredientStockLedgers(search);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to search ingredient stock ledgers",
      );
    }
  },
);

export const fetchIngredientStockLedgerById = createAsyncThunk(
  "ingredientStockLedger/fetchIngredientStockLedgerById",
  async (id, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.getIngredientStockLedgerById(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch ingredient stock ledger",
      );
    }
  },
);

export const createIngredientStockLedger = createAsyncThunk(
  "ingredientStockLedger/createIngredientStockLedger",
  async (data, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.createIngredientStockLedger(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create ingredient stock ledger",
      );
    }
  },
);

export const updateIngredientStockLedger = createAsyncThunk(
  "ingredientStockLedger/updateIngredientStockLedger",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.updateIngredientStockLedger(
          id,
          data,
        );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update ingredient stock ledger",
      );
    }
  },
);

export const deleteIngredientStockLedger = createAsyncThunk(
  "ingredientStockLedger/deleteIngredientStockLedger",
  async (id, { rejectWithValue }) => {
    try {
      await ingredientStockLedgerService.deleteIngredientStockLedger(id);

      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete ingredient stock ledger",
      );
    }
  },
);

export const restoreIngredientStockLedger = createAsyncThunk(
  "ingredientStockLedger/restoreIngredientStockLedger",
  async (id, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.restoreIngredientStockLedger(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to restore ingredient stock ledger",
      );
    }
  },
);

export const fetchIngredientLedgerHistory = createAsyncThunk(
  "ingredientStockLedger/fetchIngredientLedgerHistory",
  async (ingredientId, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.getIngredientLedgerHistory(
          ingredientId,
        );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch ingredient ledger history",
      );
    }
  },
);

export const fetchStoreLedger = createAsyncThunk(
  "ingredientStockLedger/fetchStoreLedger",
  async ({ storeId, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await ingredientStockLedgerService.getStoreLedger(
        storeId,
        filters,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store ledger",
      );
    }
  },
);

export const fetchWarehouseLedger = createAsyncThunk(
  "ingredientStockLedger/fetchWarehouseLedger",
  async ({ warehouseId, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await ingredientStockLedgerService.getWarehouseLedger(
        warehouseId,
        filters,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch warehouse ledger",
      );
    }
  },
);

export const fetchTransactionTypeLedger = createAsyncThunk(
  "ingredientStockLedger/fetchTransactionTypeLedger",
  async (transactionType, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.getTransactionTypeLedger(
          transactionType,
        );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch transaction type ledger",
      );
    }
  },
);

export const fetchStockInReport = createAsyncThunk(
  "ingredientStockLedger/fetchStockInReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.getStockInReport(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stock in report",
      );
    }
  },
);

export const fetchStockOutReport = createAsyncThunk(
  "ingredientStockLedger/fetchStockOutReport",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.getStockOutReport(filters);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stock out report",
      );
    }
  },
);

export const fetchTodayTransactions = createAsyncThunk(
  "ingredientStockLedger/fetchTodayTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await ingredientStockLedgerService.getTodayTransactions();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch today's transactions",
      );
    }
  },
);

export const fetchStockSummary = createAsyncThunk(
  "ingredientStockLedger/fetchStockSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ingredientStockLedgerService.getStockSummary();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch stock summary",
      );
    }
  },
);

const ingredientStockLedgerSlice = createSlice({
  name: "ingredientStockLedger",

  initialState: {
    ingredientStockLedgers: [],
    ledger: null,
    history: [],
    storeLedger: [],
    warehouseLedger: [],
    transactionTypeLedger: [],
    stockInReport: [],
    stockOutReport: [],
    todayTransactions: [],
    stockSummary: [],

    loading: false,
    ingredientStockLedgerLoading: false,
    deleteLoading: false,

    error: null,
  },

  reducers: {
    clearIngredientStockLedgerError: (state) => {
      state.error = null;
    },

    clearIngredientStockLedger: (state) => {
      state.ledger = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchIngredientStockLedgers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchIngredientStockLedgers.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredientStockLedgers =
          action.payload?.data || action.payload || [];
      })

      .addCase(fetchIngredientStockLedgers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchIngredientStockLedgers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchIngredientStockLedgers.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredientStockLedgers = action.payload;
      })

      .addCase(searchIngredientStockLedgers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchIngredientStockLedgerById.fulfilled, (state, action) => {
        state.ledger = action.payload;
      })

      .addCase(fetchIngredientStockLedgerById.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(createIngredientStockLedger.pending, (state) => {
        state.ingredientStockLedgerLoading = true;
        state.error = null;
      })

      .addCase(createIngredientStockLedger.fulfilled, (state) => {
        state.ingredientStockLedgerLoading = false;
      })

      .addCase(createIngredientStockLedger.rejected, (state, action) => {
        state.ingredientStockLedgerLoading = false;
        state.error = action.payload;
      })

      .addCase(updateIngredientStockLedger.pending, (state) => {
        state.ingredientStockLedgerLoading = true;
        state.error = null;
      })

      .addCase(updateIngredientStockLedger.fulfilled, (state) => {
        state.ingredientStockLedgerLoading = false;
      })

      .addCase(updateIngredientStockLedger.rejected, (state, action) => {
        state.ingredientStockLedgerLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteIngredientStockLedger.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteIngredientStockLedger.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.ingredientStockLedgers = state.ingredientStockLedgers.filter(
          (ledger) => ledger._id !== action.payload,
        );
      })

      .addCase(deleteIngredientStockLedger.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      .addCase(restoreIngredientStockLedger.fulfilled, (state) => {
        state.error = null;
      })

      .addCase(restoreIngredientStockLedger.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchIngredientLedgerHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })

      .addCase(fetchIngredientLedgerHistory.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchStoreLedger.fulfilled, (state, action) => {
        state.storeLedger = action.payload;
      })

      .addCase(fetchStoreLedger.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchWarehouseLedger.fulfilled, (state, action) => {
        state.warehouseLedger = action.payload;
      })

      .addCase(fetchWarehouseLedger.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchTransactionTypeLedger.fulfilled, (state, action) => {
        state.transactionTypeLedger = action.payload;
      })

      .addCase(fetchTransactionTypeLedger.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchStockInReport.fulfilled, (state, action) => {
        state.stockInReport = action.payload;
      })

      .addCase(fetchStockInReport.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchStockOutReport.fulfilled, (state, action) => {
        state.stockOutReport = action.payload;
      })

      .addCase(fetchStockOutReport.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchTodayTransactions.fulfilled, (state, action) => {
        state.todayTransactions = action.payload;
      })

      .addCase(fetchTodayTransactions.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchStockSummary.fulfilled, (state, action) => {
        state.stockSummary = action.payload;
      })

      .addCase(fetchStockSummary.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearIngredientStockLedgerError, clearIngredientStockLedger } =
  ingredientStockLedgerSlice.actions;

export default ingredientStockLedgerSlice.reducer;
