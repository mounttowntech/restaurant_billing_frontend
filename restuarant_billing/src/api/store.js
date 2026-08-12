import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "../features/restaurant/restaurantSlice";
import dashboardSlice from "../features/dashboard/dashboardSlice";
import posBillingSlice from "../features/posbilling/posBillingSlice";
import storeSlice from "../features/store/storeSlice";

const store = configureStore({
  reducer: {
    restaurants: restaurantSlice,
    dashboard: dashboardSlice,
    posBilling: posBillingSlice,
    stores: storeSlice,
  },
});

export default store;
