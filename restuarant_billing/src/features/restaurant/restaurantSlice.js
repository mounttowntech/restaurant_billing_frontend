import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as restaurantService from "./restaurantService";

// ================= Fetch Restaurants =================

export const fetchRestaurants = createAsyncThunk(
  "all/fetchRestaurants",
  async () => {
    return await restaurantService.fetchRestaurants();
  },
);

// ================= Fetch Restaurant By ID =================

export const fetchRestaurantById = createAsyncThunk(
  "restaurants/fetchRestaurantById",
  async (id) => {
    return await restaurantService.getRestaurantById(id);
  },
);

// ================= Create Restaurant =================

export const createRestaurant = createAsyncThunk(
  "restaurants/createRestaurant",
  async (restaurant) => {
    return await restaurantService.createRestaurant(restaurant);
  },
);

// ================= Update Restaurant =================

export const updateRestaurant = createAsyncThunk(
  "restaurants/updateRestaurant",
  async ({ id, restaurant }) => {
    return await restaurantService.updateRestaurant({
      id,
      restaurant,
    });
  },
);

// ================= Delete Restaurant =================

export const deleteRestaurant = createAsyncThunk(
  "restaurants/deleteRestaurant",
  async (id) => {
    await restaurantService.deleteRestaurant(id);
    return id;
  },
);

// ================= Restore Restaurant =================

export const restoreRestaurant = createAsyncThunk(
  "restaurants/restoreRestaurant",
  async (id) => {
    return await restaurantService.restoreRestaurant(id);
  },
);

// ================= Toggle Restaurant Status =================

export const toggleRestaurantStatus = createAsyncThunk(
  "restaurants/toggleRestaurantStatus",
  async (id) => {
    return await restaurantService.toggleRestaurantStatus(id);
  },
);

const restaurantSlice = createSlice({
  name: "restaurants",

  initialState: {
    restaurants: [],
    restaurant: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= Fetch =================

      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;

        state.restaurants = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })

      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= Fetch By ID =================

      .addCase(fetchRestaurantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRestaurantById.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurant = action.payload;
      })

      .addCase(fetchRestaurantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= Create =================

      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants.push(action.payload);
      })

      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= Update =================

      .addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.loading = false;

        state.restaurants = state.restaurants.map((restaurant) =>
          restaurant._id === action.payload._id ? action.payload : restaurant,
        );
      })

      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= Delete =================

      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.loading = false;

        state.restaurants = state.restaurants.filter(
          (restaurant) => restaurant._id !== action.payload,
        );
      })

      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= Restore =================

      .addCase(restoreRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restoreRestaurant.fulfilled, (state, action) => {
        state.loading = false;

        const restoredRestaurant = action.payload;

        const index = state.restaurants.findIndex(
          (restaurant) => restaurant._id === restoredRestaurant._id,
        );

        if (index !== -1) {
          state.restaurants[index] = restoredRestaurant;
        } else {
          state.restaurants.push(restoredRestaurant);
        }
      })

      .addCase(restoreRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ================= Toggle Status =================

      .addCase(toggleRestaurantStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(toggleRestaurantStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.restaurants = state.restaurants.map((restaurant) =>
          restaurant._id === action.payload._id ? action.payload : restaurant,
        );
      })

      .addCase(toggleRestaurantStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default restaurantSlice.reducer;
