import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "../features/restaurant/restaurantSlice";

const store = configureStore({
  reducer: {
    restaurants: restaurantSlice,
  },
});

export default store;
