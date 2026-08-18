import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "../features/restaurant/restaurantSlice";
import dashboardSlice from "../features/dashboard/dashboardSlice";
import posBillingSlice from "../features/posbilling/posBillingSlice";
import storeSlice from "../features/store/storeSlice";
import customerSlice from "../features/customer/customerSlice";
import productSlice from "../features/product/productSlice";
import purchaseSlice from "../features/purchase/purchaseSlice";
import companySlice from "../features/company/companySlice";
import invoiceSlice from "../features/invoice/invoiceSlice";
import menuItemSlice from "../features/menuItem/menuItemSlice";
import menuCategorySlice from "../features/menuItem/menuItemSlice";

const store = configureStore({
  reducer: {
    restaurants: restaurantSlice,
    dashboard: dashboardSlice,
    posBilling: posBillingSlice,
    stores: storeSlice,
    customer: customerSlice,
    product: productSlice,
    purchase: purchaseSlice,
    company: companySlice,
    invoice: invoiceSlice,
    menuItem: menuItemSlice,
    menuCategory: menuCategorySlice, // Assuming you have a separate slice for menu categories
  },
});

export default store;
