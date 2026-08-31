import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tableService } from "./tableService";

export const fetchTables = createAsyncThunk(
  "table/fetchTables",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await tableService.getTables(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tables",
      );
    }
  },
);

export const fetchTableById = createAsyncThunk(
  "table/fetchTableById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await tableService.getTableById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch table",
      );
    }
  },
);

export const createTable = createAsyncThunk(
  "table/createTable",
  async (data, { rejectWithValue }) => {
    try {
      const response = await tableService.createTable(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create table",
      );
    }
  },
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await tableService.updateTable(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update table",
      );
    }
  },
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (id, { rejectWithValue }) => {
    try {
      await tableService.deleteTable(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete table",
      );
    }
  },
);

export const restoreTable = createAsyncThunk(
  "table/restoreTable",
  async (id, { rejectWithValue }) => {
    try {
      const response = await tableService.restoreTable(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore table",
      );
    }
  },
);

export const activateTable = createAsyncThunk(
  "table/activateTable",
  async (id, { rejectWithValue }) => {
    try {
      const response = await tableService.activateTable(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to activate table",
      );
    }
  },
);

export const deactivateTable = createAsyncThunk(
  "table/deactivateTable",
  async (id, { rejectWithValue }) => {
    try {
      const response = await tableService.deactivateTable(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to deactivate table",
      );
    }
  },
);

export const updateTableStatus = createAsyncThunk(
  "table/updateTableStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await tableService.updateTableStatus(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update table status",
      );
    }
  },
);

export const reserveTable = createAsyncThunk(
  "table/reserveTable",
  async ({ id, reservationId }, { rejectWithValue }) => {
    try {
      const response = await tableService.reserveTable(id, reservationId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reserve table",
      );
    }
  },
);

export const releaseTable = createAsyncThunk(
  "table/releaseTable",
  async (id, { rejectWithValue }) => {
    try {
      const response = await tableService.releaseTable(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to release table",
      );
    }
  },
);

export const occupyTable = createAsyncThunk(
  "table/occupyTable",
  async ({ id, orderId, waiterId }, { rejectWithValue }) => {
    try {
      const response = await tableService.occupyTable(id, orderId, waiterId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to occupy table",
      );
    }
  },
);

export const cleanTable = createAsyncThunk(
  "table/cleanTable",
  async (id, { rejectWithValue }) => {
    try {
      const response = await tableService.cleanTable(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clean table",
      );
    }
  },
);

export const markOutOfService = createAsyncThunk(
  "table/markOutOfService",
  async ({ id, notes }, { rejectWithValue }) => {
    try {
      const response = await tableService.markOutOfService(id, notes);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark table out of service",
      );
    }
  },
);

export const assignWaiter = createAsyncThunk(
  "table/assignWaiter",
  async ({ id, waiterId }, { rejectWithValue }) => {
    try {
      const response = await tableService.assignWaiter(id, waiterId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign waiter",
      );
    }
  },
);

export const removeWaiter = createAsyncThunk(
  "table/removeWaiter",
  async (id, { rejectWithValue }) => {
    try {
      const response = await tableService.removeWaiter(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove waiter",
      );
    }
  },
);

const initialState = {
  tables: [],
  selectedTable: null,
  summary: null,
  analytics: null,
  loading: false,
  tableLoading: false,
  deleteLoading: false,
  statusLoading: false,
  error: null,
};

const tableSlice = createSlice({
  name: "table",

  initialState,

  reducers: {
    clearTableError: (state) => {
      state.error = null;
    },

    clearSelectedTable: (state) => {
      state.selectedTable = null;
    },

    resetTables: (state) => {
      state.tables = [];
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })

      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTableById.pending, (state) => {
        state.tableLoading = true;
        state.error = null;
      })

      .addCase(fetchTableById.fulfilled, (state, action) => {
        state.tableLoading = false;
        state.selectedTable = action.payload;
      })

      .addCase(fetchTableById.rejected, (state, action) => {
        state.tableLoading = false;
        state.error = action.payload;
      })

      .addCase(createTable.pending, (state) => {
        state.tableLoading = true;
        state.error = null;
      })

      .addCase(createTable.fulfilled, (state) => {
        state.tableLoading = false;
      })

      .addCase(createTable.rejected, (state, action) => {
        state.tableLoading = false;
        state.error = action.payload;
      })

      .addCase(updateTable.pending, (state) => {
        state.tableLoading = true;
        state.error = null;
      })

      .addCase(updateTable.fulfilled, (state) => {
        state.tableLoading = false;
      })

      .addCase(updateTable.rejected, (state, action) => {
        state.tableLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteTable.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteTable.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.tables = state.tables.filter(
          (table) => table._id !== action.payload,
        );
      })

      .addCase(deleteTable.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      .addCase(restoreTable.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(restoreTable.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(activateTable.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })

      .addCase(activateTable.fulfilled, (state, action) => {
        state.statusLoading = false;

        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(activateTable.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      })

      .addCase(deactivateTable.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })

      .addCase(deactivateTable.fulfilled, (state, action) => {
        state.statusLoading = false;

        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(deactivateTable.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      })

      .addCase(updateTableStatus.pending, (state) => {
        state.statusLoading = true;
        state.error = null;
      })

      .addCase(updateTableStatus.fulfilled, (state, action) => {
        state.statusLoading = false;

        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(updateTableStatus.rejected, (state, action) => {
        state.statusLoading = false;
        state.error = action.payload;
      })

      .addCase(reserveTable.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(reserveTable.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(releaseTable.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(releaseTable.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(occupyTable.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(occupyTable.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(cleanTable.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(cleanTable.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(markOutOfService.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(markOutOfService.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(assignWaiter.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(assignWaiter.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(removeWaiter.fulfilled, (state, action) => {
        const index = state.tables.findIndex(
          (table) => table._id === action.payload?._id,
        );

        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })

      .addCase(removeWaiter.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearTableError, clearSelectedTable, resetTables } =
  tableSlice.actions;

export default tableSlice.reducer;
