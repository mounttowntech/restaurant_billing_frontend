import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { productService } from "./productService";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await productService.getProducts(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (search, { rejectWithValue }) => {
    try {
      const response = await productService.searchProducts(search);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search products",
      );
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await productService.createProduct(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await productService.updateProduct(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product",
      );
    }
  },
);

export const toggleProductAvailability = createAsyncThunk(
  "product/toggleProductAvailability",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.toggleProductAvailability(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update availability",
      );
    }
  },
);

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    loading: false,
    productLoading: false,
    deleteLoading: false,
    error: null,
  },

  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProduct.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state) => {
        state.productLoading = false;
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state) => {
        state.productLoading = false;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteLoading = false;

        state.products = state.products.filter(
          (product) => product._id !== action.payload,
        );
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      })

      .addCase(toggleProductAvailability.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id,
        );

        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      .addCase(toggleProductAvailability.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearProductError } = productSlice.actions;

export default productSlice.reducer;
