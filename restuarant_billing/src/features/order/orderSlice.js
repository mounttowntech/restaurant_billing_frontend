import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "./orderService";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrders(filters);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders",
      );
    }
  },
);

export const fetchTodayOrders = createAsyncThunk(
  "order/fetchTodayOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getTodayOrders();
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch today's orders",
      );
    }
  },
);

export const fetchKitchenQueue = createAsyncThunk(
  "order/fetchKitchenQueue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getKitchenQueue();
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch kitchen queue",
      );
    }
  },
);

export const fetchTableOrders = createAsyncThunk(
  "order/fetchTableOrders",
  async (tableId, { rejectWithValue }) => {
    try {
      const response = await orderService.getTableOrders(tableId);
      return response.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch table orders",
      );
    }
  },
);

export const fetchOrderSummary = createAsyncThunk(
  "order/fetchOrderSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderSummary();
      return response.data || {};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order summary",
      );
    }
  },
);

export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order",
      );
    }
  },
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order",
      );
    }
  },
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await orderService.updateOrder(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order",
      );
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await orderService.deleteOrder(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete order",
      );
    }
  },
);

export const restoreOrder = createAsyncThunk(
  "order/restoreOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.restoreOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to restore order",
      );
    }
  },
);

export const acceptOrder = createAsyncThunk(
  "order/acceptOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.acceptOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to accept order",
      );
    }
  },
);

export const prepareOrder = createAsyncThunk(
  "order/prepareOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.prepareOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to prepare order",
      );
    }
  },
);

export const readyOrder = createAsyncThunk(
  "order/readyOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.readyOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark order ready",
      );
    }
  },
);

export const completeOrder = createAsyncThunk(
  "order/completeOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.completeOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to complete order",
      );
    }
  },
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.cancelOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order",
      );
    }
  },
);

export const markOrderPaid = createAsyncThunk(
  "order/markOrderPaid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.markOrderPaid(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark order paid",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",

  initialState: {
    orders: [],
    todayOrders: [],
    kitchenQueue: [],
    tableOrders: [],
    selectedOrder: null,
    summary: {},

    loading: false,
    orderLoading: false,
    actionLoading: false,

    error: null,
  },

  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTodayOrders.fulfilled, (state, action) => {
        state.todayOrders = action.payload;
      })

      .addCase(fetchKitchenQueue.fulfilled, (state, action) => {
        state.kitchenQueue = action.payload;
      })

      .addCase(fetchTableOrders.fulfilled, (state, action) => {
        state.tableOrders = action.payload;
      })

      .addCase(fetchOrderSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })

      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
        state.error = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderLoading = false;

        state.orders.unshift(action.payload);
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        state.actionLoading = false;

        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );

        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      .addCase(updateOrder.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload,
        );
      })

      .addCase(restoreOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      })

      .addCase(acceptOrder.fulfilled, updateOrderInState)
      .addCase(prepareOrder.fulfilled, updateOrderInState)
      .addCase(readyOrder.fulfilled, updateOrderInState)
      .addCase(completeOrder.fulfilled, updateOrderInState)
      .addCase(cancelOrder.fulfilled, updateOrderInState)
      .addCase(markOrderPaid.fulfilled, updateOrderInState)

      .addMatcher(
        (action) =>
          action.type.startsWith("order/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        },
      );
  },
});

function updateOrderInState(state, action) {
  const index = state.orders.findIndex(
    (order) => order._id === action.payload._id,
  );

  if (index !== -1) {
    state.orders[index] = action.payload;
  }
}

export const { clearOrderError, clearSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;
