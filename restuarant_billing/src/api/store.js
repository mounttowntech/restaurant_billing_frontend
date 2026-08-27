import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "../features/restaurant/restaurantSlice";
import dashboardSlice from "../features/dashboard/dashboardSlice";
import posBillingSlice from "../features/posbilling/posBillingSlice";
import storeSlice from "../features/store/storeSlice";
import customerSlice from "../features/customer/customerSlice";
import productSlice from "../features/product/Productslice";
import purchaseSlice from "../features/purchase/purchaseSlice";
import companySlice from "../features/company/companySlice";
import invoiceSlice from "../features/invoice/invoiceSlice";
import menuItemSlice from "../features/menuItem/menuItemSlice";
import menuCategorySlice from "../features/menuCategory/menuCategorySlice";
import categorySlice from "../features/category/categorySlice";
import reportSlice from "../features/reports/reportSlice";
import orderSlice from "../features/order/orderSlice";
import kotSlice from "../features/kot/kotSlice";
import unitSlice from "../features/unit/unitSlice";
import warehouseSlice from "../features/warehouse/warehouseSlice";
import ingredientStockLedgerSlice from "../features/ingredientStockLedger/ingredientStockLedgerSlice";
import recipeSlice from "../features/recipe/recipeSlice";
import ingredientSlice from "../features/ingredient/ingredientSlice";
import supplierSlice from "../features/supplier/supplierSlice";

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
    menuCategory: menuCategorySlice,
    category: categorySlice,
    report: reportSlice,
    order: orderSlice,
    kot: kotSlice,
    unit: unitSlice,
    warehouse: warehouseSlice,
    ingredientStockLedger: ingredientStockLedgerSlice,
    recipe: recipeSlice,
    ingredient: ingredientSlice,
    supplier: supplierSlice,
  },
});

export default store;
