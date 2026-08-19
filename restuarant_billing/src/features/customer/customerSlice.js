import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as customerService from "./customerService";

// =====================================================
// CREATE CUSTOMER
// =====================================================

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (customerData, { rejectWithValue }) => {
    try {
      return await customerService.createCustomer(customerData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create customer",
      );
    }
  },
);

// =====================================================
// FETCH ALL CUSTOMERS
// =====================================================

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      console.log("FETCH CUSTOMERS THUNK CALLED");
      return await customerService.getCustomers();
    } catch (error) {
      console.error("FETCH CUSTOMERS ERROR:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch customers",
      );
    }
  },
);

// =====================================================
// FETCH CUSTOMER BY ID
// =====================================================

export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async (id, { rejectWithValue }) => {
    try {
      return await customerService.getCustomerById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch customer",
      );
    }
  },
);

// =====================================================
// UPDATE CUSTOMER
// =====================================================

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await customerService.updateCustomer(id, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update customer",
      );
    }
  },
);

// =====================================================
// DELETE CUSTOMER
// =====================================================

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      return await customerService.deleteCustomer(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete customer",
      );
    }
  },
);

// =====================================================
// CHANGE CUSTOMER STATUS
// =====================================================

export const changeCustomerStatus = createAsyncThunk(
  "customer/changeCustomerStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await customerService.changeCustomerStatus(id, status);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to change customer status",
      );
    }
  },
);

// =====================================================
// CUSTOMER DROPDOWN
// =====================================================

export const fetchCustomerDropdown = createAsyncThunk(
  "customer/fetchCustomerDropdown",
  async (_, { rejectWithValue }) => {
    try {
      return await customerService.getCustomerDropdown();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch customer dropdown",
      );
    }
  },
);

// =====================================================
// SEARCH CUSTOMER
// =====================================================

export const searchCustomers = createAsyncThunk(
  "customer/searchCustomers",
  async (keyword, { rejectWithValue }) => {
    try {
      return await customerService.searchCustomer(keyword);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to search customers",
      );
    }
  },
);

// =====================================================
// ADD LOYALTY POINTS
// =====================================================

export const addCustomerLoyaltyPoints = createAsyncThunk(
  "customer/addCustomerLoyaltyPoints",
  async ({ id, points }, { rejectWithValue }) => {
    try {
      return await customerService.addLoyaltyPoints(id, points);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update loyalty points",
      );
    }
  },
);

// =====================================================
// CUSTOMER SLICE
// =====================================================

const customerSlice = createSlice({
  name: "customer",

  initialState: {
    customers: [],
    selectedCustomer: null,
    customerDropdown: [],

    loading: false,
    customerLoading: false,
    deleteLoading: false,
    statusLoading: false,
    searchLoading: false,

    error: null,
    customerError: null,
    deleteError: null,
    statusError: null,
    searchError: null,

    success: false,
    message: null,
  },

  reducers: {
    clearCustomerError: (state) => {
      state.error = null;
      state.customerError = null;
      state.deleteError = null;
      state.statusError = null;
      state.searchError = null;
    },

    clearCustomerMessage: (state) => {
      state.success = false;
      state.message = null;
    },

    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // CREATE CUSTOMER
      // =====================================================

      .addCase(createCustomer.pending, (state) => {
        state.customerLoading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })

      .addCase(createCustomer.fulfilled, (state, action) => {
        state.customerLoading = false;

        state.success = true;

        state.message = "Customer created successfully.";

        if (action.payload) {
          state.customers.unshift(action.payload);
        }
      })

      .addCase(createCustomer.rejected, (state, action) => {
        state.customerLoading = false;

        state.error =
          action.payload || action.error.message || "Failed to create customer";
      })

      // =====================================================
      // FETCH ALL CUSTOMERS
      // =====================================================

      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || action.error.message || "Failed to fetch customers";
      })

      // =====================================================
      // FETCH CUSTOMER BY ID
      // =====================================================

      .addCase(fetchCustomerById.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })

      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.customerLoading = false;

        state.selectedCustomer = action.payload || null;
      })

      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.customerLoading = false;

        state.customerError =
          action.payload || action.error.message || "Failed to fetch customer";
      })

      // =====================================================
      // UPDATE CUSTOMER
      // =====================================================

      .addCase(updateCustomer.pending, (state) => {
        state.customerLoading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customerLoading = false;

        state.success = true;

        state.message = "Customer updated successfully.";

        if (action.payload?._id) {
          const index = state.customers.findIndex(
            (customer) => customer._id === action.payload._id,
          );

          if (index !== -1) {
            state.customers[index] = action.payload;
          }
        }

        state.selectedCustomer = action.payload || null;
      })

      .addCase(updateCustomer.rejected, (state, action) => {
        state.customerLoading = false;

        state.error =
          action.payload || action.error.message || "Failed to update customer";
      })

      // =====================================================
      // DELETE CUSTOMER
      // =====================================================

      .addCase(deleteCustomer.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })

      .addCase(deleteCustomer.fulfilled, (state) => {
        state.deleteLoading = false;

        state.success = true;

        state.message = "Customer deleted successfully.";

        /*
          deleteCustomer service returns response.data,
          so the deleted ID is not automatically available
          unless backend sends it.

          The Customer.jsx can refresh the customer list
          after successful deletion.
        */
      })

      .addCase(deleteCustomer.rejected, (state, action) => {
        state.deleteLoading = false;

        state.deleteError =
          action.payload || action.error.message || "Failed to delete customer";
      })

      // =====================================================
      // CHANGE CUSTOMER STATUS
      // =====================================================

      .addCase(changeCustomerStatus.pending, (state) => {
        state.statusLoading = true;
        state.statusError = null;
      })

      .addCase(changeCustomerStatus.fulfilled, (state, action) => {
        state.statusLoading = false;

        state.success = true;

        state.message = "Customer status updated successfully.";

        if (action.payload?._id) {
          const index = state.customers.findIndex(
            (customer) => customer._id === action.payload._id,
          );

          if (index !== -1) {
            state.customers[index] = action.payload;
          }
        }
      })

      .addCase(changeCustomerStatus.rejected, (state, action) => {
        state.statusLoading = false;

        state.statusError =
          action.payload ||
          action.error.message ||
          "Failed to change customer status";
      })

      // =====================================================
      // CUSTOMER DROPDOWN
      // =====================================================

      .addCase(fetchCustomerDropdown.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })

      .addCase(fetchCustomerDropdown.fulfilled, (state, action) => {
        state.customerLoading = false;

        state.customerDropdown = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(fetchCustomerDropdown.rejected, (state, action) => {
        state.customerLoading = false;

        state.customerError =
          action.payload ||
          action.error.message ||
          "Failed to fetch customer dropdown";
      })

      // =====================================================
      // SEARCH CUSTOMERS
      // =====================================================

      .addCase(searchCustomers.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })

      .addCase(searchCustomers.fulfilled, (state, action) => {
        state.searchLoading = false;

        state.customers = Array.isArray(action.payload) ? action.payload : [];
      })

      .addCase(searchCustomers.rejected, (state, action) => {
        state.searchLoading = false;

        state.searchError =
          action.payload ||
          action.error.message ||
          "Failed to search customers";
      })

      // =====================================================
      // ADD LOYALTY POINTS
      // =====================================================

      .addCase(addCustomerLoyaltyPoints.fulfilled, (state, action) => {
        state.success = true;

        state.message = "Loyalty points updated successfully.";

        if (action.payload?._id) {
          const index = state.customers.findIndex(
            (customer) => customer._id === action.payload._id,
          );

          if (index !== -1) {
            state.customers[index] = action.payload;
          }
        }
      })

      .addCase(addCustomerLoyaltyPoints.rejected, (state, action) => {
        state.error =
          action.payload ||
          action.error.message ||
          "Failed to update loyalty points";
      });
  },
});

export const {
  clearCustomerError,
  clearCustomerMessage,
  clearSelectedCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
