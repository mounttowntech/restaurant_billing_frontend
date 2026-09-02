// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createPOSBill } from "../../features/posBilling/posBillingSlice";
// import "./POSBilling.css";

// const emptyItem = () => ({
//   product: "",
//   productName: "",
//   quantity: 1,
//   price: 0,
//   discountPercentage: 0,
//   taxPercentage: 0,
// });

// const sampleItem = () => ({
//   menuItem: "",
//   menuCode: "",
//   menuName: "",

//   quantity: 0,

//   price: 0,

//   gstPercentage: 0,

//   discountPercentage: 0,

//   variant: null,

//   addons: [],

//   remarks: ""
// });

// const POSBillingForm = ({ onCreated }) => {
//   const dispatch = useDispatch();

//   const { loading = false } = useSelector((state) => state.posBilling || {});
//   const userDetailsFromLocalStorage = localStorage.getItem("user");
//   const storeDetails = userDetailsFromLocalStorage ? JSON.parse(userDetailsFromLocalStorage).store : null;
//   console.log("userDetailsFromLocalStorage", userDetailsFromLocalStorage);
//   console.log("storeDetails", storeDetails);

//   // ==================================================
//   // FORM STATE
//   // ==================================================

//   const [restaurant, setRestaurant] = useState(storeDetails?.restaurant || "");
//   const [store, setStore] = useState(storeDetails?.store || "");
//   const [customer, setCustomer] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [orderType, setOrderType] = useState("DINE_IN");

//   const [cgstPercentage, setCgstPercentage] = useState(0);
//   const [sgstPercentage, setSgstPercentage] = useState(0);
//   const [igstPercentage, setIgstPercentage] = useState(0);

//   // ==================================================
//   // ITEM STATE
//   // ==================================================

//   const [items, setItems] = useState([emptyItem()]);

//   // ==================================================
//   // ADD ITEM
//   // ==================================================

//   const addItem = () => {
//     setItems((prev) => [...prev, emptyItem()]);
//   };

//   // ==================================================
//   // REMOVE ITEM
//   // ==================================================

//   const removeItem = (index) => {
//     setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
//   };

//   // ==================================================
//   // UPDATE ITEM
//   // ==================================================

//   const updateItem = (index, field, value) => {
//     setItems((prev) =>
//       prev.map((item, itemIndex) =>
//         itemIndex === index
//           ? {
//               ...item,
//               [field]:
//                 field === "quantity" ||
//                 field === "price" ||
//                 field === "discountPercentage" ||
//                 field === "taxPercentage"
//                   ? Number(value)
//                   : value,
//             }
//           : item,
//       ),
//     );
//   };

//   // ==================================================
//   // RESET FORM
//   // ==================================================

//   const resetForm = () => {
//     setItems([emptyItem()]);

//     setCustomer("");
//     setCustomerName("");
//     setCustomerPhone("");

//     setCgstPercentage(0);
//     setSgstPercentage(0);
//     setIgstPercentage(0);
//   };

//   // ==================================================
//   // CREATE BILL
//   // ==================================================

//   const handleCreateBill = async (e) => {
//     e.preventDefault();

//     if (!restaurant) {
//       alert("Restaurant ID is required");
//       return;
//     }

//     if (!store) {
//       alert("Store ID is required");
//       return;
//     }

//     if (!items.length) {
//       alert("Add at least one item");
//       return;
//     }

//     const validItems = items.filter(
//       (item) =>
//         item.product &&
//         item.productName.trim() &&
//         Number(item.quantity) > 0 &&
//         Number(item.price) >= 0,
//     );

//     if (!validItems.length) {
//       alert("Please enter valid product and item details");
//       return;
//     }

//     const payload = {
//       restaurant,
//       store,

//       customer: customer.trim() || null,

//       customerName: customerName.trim(),

//       customerPhone: customerPhone.trim(),

//       orderType,

//       items: validItems.map((item) => ({
//         product: item.product,
//         productName: item.productName.trim(),
//         quantity: Number(item.quantity),

//         price: Number(item.price),

//         discountPercentage: Number(item.discountPercentage || 0),

//         taxPercentage: Number(item.taxPercentage || 0),
//       })),

//       cgstPercentage: Number(cgstPercentage || 0),

//       sgstPercentage: Number(sgstPercentage || 0),

//       igstPercentage: Number(igstPercentage || 0),
//     };

//     try {
//       await dispatch(createPOSBill(payload)).unwrap();

//       alert("POS bill created successfully");

//       resetForm();

//       onCreated?.();
//     } catch (error) {
//       console.error("Create POS Bill Error:", error);
//     }
//   };

//   return (
//     <form className="pos-billing-form" onSubmit={handleCreateBill}>
//       <div className="pos-section-title">
//         <h2>Create POS Bill</h2>
//       </div>

//       {/* ==================================================
//           RESTAURANT / STORE
//       ================================================== */}

//       <div className="pos-form-grid">
//         {/* <div className="pos-form-group">
//           <label>Restaurant ID *</label>

//           <input
//             type="text"
//             value={restaurant}
//             onChange={(e) => setRestaurant(e.target.value)}
//             placeholder="Enter restaurant ID"
//           />
//         </div>

//         <div className="pos-form-group">
//           <label>Store ID *</label>

//           <input
//             type="text"
//             value={store}
//             onChange={(e) => setStore(e.target.value)}
//             placeholder="Enter store ID"
//           />
//         </div> */}

//         <div className="pos-form-group">
//           <label>Customer ID</label>

//           <input
//             type="text"
//             value={customer}
//             onChange={(e) => setCustomer(e.target.value)}
//             placeholder="Optional customer ID"
//           />
//         </div>

//         <div className="pos-form-group">
//           <label>Customer Name</label>

//           <input
//             type="text"
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             placeholder="Customer name"
//           />
//         </div>

//         <div className="pos-form-group">
//           <label>Customer Phone</label>

//           <input
//             type="text"
//             value={customerPhone}
//             onChange={(e) => setCustomerPhone(e.target.value)}
//             placeholder="Phone number"
//           />
//         </div>

//         <div className="pos-form-group">
//           <label>Order Type</label>

//           <select
//             value={orderType}
//             onChange={(e) => setOrderType(e.target.value)}
//           >
//             <option value="DINE_IN">Dine In</option>

//             <option value="TAKEAWAY">Take Away</option>

//             <option value="DELIVERY">Delivery</option>
//           </select>
//         </div>
//       </div>

//       {/* ==================================================
//           ITEMS
//       ================================================== */}

//       <div className="pos-items-section">
//         <div className="pos-items-header">
//           <h3>Items</h3>

//           <button type="button" className="pos-add-button" onClick={addItem}>
//             + Add Item
//           </button>
//         </div>

//         {items.map((item, index) => (
//           <div className="pos-item-row" key={index}>
//             <div className="pos-form-group">
//               <label>Product ID</label>

//               <input
//                 type="text"
//                 value={item.product}
//                 onChange={(e) => updateItem(index, "product", e.target.value)}
//                 placeholder="Product ObjectId"
//               />
//             </div>

//             <div className="pos-form-group">
//               <label>Product Name</label>

//               <input
//                 type="text"
//                 value={item.productName}
//                 onChange={(e) =>
//                   updateItem(index, "productName", e.target.value)
//                 }
//                 placeholder="Product name"
//               />
//             </div>

//             <div className="pos-form-group">
//               <label>Quantity</label>

//               <input
//                 type="number"
//                 min="1"
//                 value={item.quantity}
//                 onChange={(e) => updateItem(index, "quantity", e.target.value)}
//               />
//             </div>

//             <div className="pos-form-group">
//               <label>Price</label>

//               <input
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 value={item.price}
//                 onChange={(e) => updateItem(index, "price", e.target.value)}
//               />
//             </div>

//             <div className="pos-form-group">
//               <label>Discount %</label>

//               <input
//                 type="number"
//                 min="0"
//                 max="100"
//                 value={item.discountPercentage}
//                 onChange={(e) =>
//                   updateItem(index, "discountPercentage", e.target.value)
//                 }
//               />
//             </div>

//             <div className="pos-form-group">
//               <label>Tax %</label>

//               <input
//                 type="number"
//                 min="0"
//                 max="100"
//                 value={item.taxPercentage}
//                 onChange={(e) =>
//                   updateItem(index, "taxPercentage", e.target.value)
//                 }
//               />
//             </div>

//             {items.length > 1 && (
//               <button
//                 type="button"
//                 className="pos-remove-button"
//                 onClick={() => removeItem(index)}
//               >
//                 ×
//               </button>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* ==================================================
//           TAX
//       ================================================== */}

//       <div className="pos-tax-section">
//         <h3>GST / Tax</h3>

//         <div className="pos-form-grid">
//           <div className="pos-form-group">
//             <label>CGST %</label>

//             <input
//               type="number"
//               min="0"
//               value={cgstPercentage}
//               onChange={(e) => setCgstPercentage(e.target.value)}
//             />
//           </div>

//           <div className="pos-form-group">
//             <label>SGST %</label>

//             <input
//               type="number"
//               min="0"
//               value={sgstPercentage}
//               onChange={(e) => setSgstPercentage(e.target.value)}
//             />
//           </div>

//           <div className="pos-form-group">
//             <label>IGST %</label>

//             <input
//               type="number"
//               min="0"
//               value={igstPercentage}
//               onChange={(e) => setIgstPercentage(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* ==================================================
//           CREATE BUTTON
//       ================================================== */}

//       <div className="pos-form-actions">
//         <button type="submit" className="pos-create-button" disabled={loading}>
//           {loading ? "Creating..." : "Create POS Bill"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default POSBillingForm;

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import {
//   getMenuItems,
//   getTables,
//   createPOSOrder,
// } from "../../../../services/menuService";


import "./POSBilling.css";
import { fetchMenuItems, createPOSOrder } from "../../features/menuItem/menuItemSlice";
import { fetchTables } from "../../features/table/tableSlice";

const ORDER_TYPES = [
  "Dine In",
  "Takeaway",
  "Delivery",
];

const emptyCart = [];

export default function POSBillingForm({
  restaurantId,
  storeId,
  onOrderCreated,
}) {
  const dispatch = useDispatch();
  const [orderType, setOrderType] =
    useState("Dine In");

  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);

  const [selectedTable, setSelectedTable] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [cart, setCart] =
    useState(emptyCart);

  const [customerName, setCustomerName] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [loadingMenu, setLoadingMenu] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ========================================================
     LOAD MENU
  ======================================================== */

  useEffect(() => {
    console.log("restaurantId, storeId", restaurantId, storeId);
    if (!restaurantId || !storeId) {
      return;
    }

    const loadMenu = async () => {
      try {
        setLoadingMenu(true);
        setError("");
        const filters = {
          restaurant: restaurantId,
          store: storeId,
        };

        const response = await dispatch(fetchMenuItems(filters));
console.log("response", response);
        setMenuItems(
          response?.payload || []
        );
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Failed to load menu"
        );
      } finally {
        setLoadingMenu(false);
      }
    };

    loadMenu();
  }, [restaurantId, storeId]);

  /* ========================================================
     LOAD TABLES
  ======================================================== */

  useEffect(() => {
    if (
      !restaurantId ||
      !storeId ||
      orderType !== "Dine In"
    ) {
      setTables([]);
      setSelectedTable("");
      return;
    }

    const loadTables = async () => {
      try {
        const response =          await dispatch(fetchTables({
            restaurant: restaurantId,
            store: storeId
          }));
console.log("table_response", response);
        const available =
          (response?.payload || []).filter(
            (table) =>
              table.status === "Available"
          );

        setTables(available);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Failed to load tables"
        );
      }
    };

    loadTables();
  }, [
    restaurantId,
    storeId,
    orderType,
  ]);

  /* ========================================================
     CATEGORIES
  ======================================================== */

  const categories = useMemo(() => {
    const map = new Map();

    menuItems.forEach((item) => {
      if (item.menuCategory?._id) {
        map.set(
          item.menuCategory._id,
          item.menuCategory
        );
      }
    });

    return Array.from(map.values());
  }, [menuItems]);

  /* ========================================================
     FILTERED MENU
  ======================================================== */

  const filteredMenu = useMemo(() => {
    if (
      selectedCategory === "All"
    ) {
      return menuItems;
    }

    return menuItems.filter(
      (item) =>
        item.menuCategory?._id ===
        selectedCategory
    );
  }, [
    menuItems,
    selectedCategory,
  ]);

  /* ========================================================
     PRICE
  ======================================================== */

  const getPrice = (item) => {
    switch (orderType) {
      case "Takeaway":
        return Number(
          item.takeawayPrice ||
            item.dineInPrice ||
            0
        );

      case "Delivery":
        return Number(
          item.deliveryPrice ||
            item.dineInPrice ||
            0
        );

      case "Dine In":
      default:
        return Number(
          item.dineInPrice || 0
        );
    }
  };

  /* ========================================================
     ADD TO CART
  ======================================================== */

  const addToCart = (menuItem) => {
    const price = getPrice(menuItem);

    setCart((currentCart) => {
      const existing =
        currentCart.find(
          (item) =>
            item.menuItem ===
            menuItem._id
        );

      if (existing) {
        return currentCart.map(
          (item) =>
            item.menuItem ===
            menuItem._id
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        );
      }

      return [
        ...currentCart,
        {
          menuItem:
            menuItem._id,

          menuCode:
            menuItem.menuCode,

          menuName:
            menuItem.menuName,

          quantity: 1,

          unitPrice: price,

          gstPercentage:
            Number(
              menuItem.gstPercentage || 0
            ),

          discountPercentage:
            Number(
              menuItem.discountPercentage ||
                0
            ),

          variant: null,

          addons: [],

          remarks: "",
        },
      ];
    });
  };

  /* ========================================================
     CHANGE QUANTITY
  ======================================================== */

  const updateQuantity = (
    menuItemId,
    quantity
  ) => {
    const newQuantity =
      Number(quantity);

    if (newQuantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }

    setCart((currentCart) =>
      currentCart.map(
        (item) =>
          item.menuItem ===
          menuItemId
            ? {
                ...item,
                quantity:
                  newQuantity,
              }
            : item
      )
    );
  };

  /* ========================================================
     REMOVE
  ======================================================== */

  const removeFromCart = (
    menuItemId
  ) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.menuItem !==
          menuItemId
      )
    );
  };

  /* ========================================================
     TOTALS
  ======================================================== */

  const totals = useMemo(() => {
    let subtotal = 0;
    let discount = 0;
    let taxable = 0;
    let gst = 0;

    cart.forEach((item) => {
      const gross =
        item.unitPrice *
        item.quantity;

      const discountAmount =
        (gross *
          item.discountPercentage) /
        100;

      const taxableAmount =
        gross - discountAmount;

      const gstAmount =
        (taxableAmount *
          item.gstPercentage) /
        100;

      subtotal += gross;
      discount += discountAmount;
      taxable += taxableAmount;
      gst += gstAmount;
    });

    const total =
      taxable + gst;

    return {
      subtotal,
      discount,
      taxable,
      gst,
      total,
    };
  }, [cart]);

  /* ========================================================
     SUBMIT
  ======================================================== */

  const handleCreateOrder =
    async () => {
      try {
        setError("");

        if (!restaurantId) {
          setError(
            "Restaurant is required"
          );
          return;
        }

        if (!storeId) {
          setError(
            "Store is required"
          );
          return;
        }

        if (
          orderType === "Dine In" &&
          !selectedTable
        ) {
          setError(
            "Please select a table"
          );
          return;
        }

        if (cart.length === 0) {
          setError(
            "Please add items to cart"
          );
          return;
        }

        setLoading(true);

        const payload = {
          restaurant:
            restaurantId,

          store:
            storeId,

          table:
            orderType === "Dine In"
              ? selectedTable
              : null,

          orderType,

          customer: null,

          items: cart.map(
            (item) => ({
              menuItem:
                item.menuItem,

              quantity:
                item.quantity,

              variant:
                item.variant,

              addons:
                item.addons,

              remarks:
                item.remarks,
            })
          ),

          remarks,
        };

        const response =
          await createPOSOrder(
            payload
          );

        if (!response?.success) {
          throw new Error(
            response?.message ||
              "Order creation failed"
          );
        }

        setCart([]);
        setSelectedTable("");
        setCustomerName("");
        setCustomerPhone("");
        setRemarks("");

        if (onOrderCreated) {
          onOrderCreated(
            response.data
          );
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to create order"
        );
      } finally {
        setLoading(false);
      }
    };

  /* ========================================================
     FORMAT
  ======================================================== */

  const money = (value) =>
    new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }
    ).format(value);

  return (
    <div className="pos-container">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="pos-header">
        <div>
          <h1>Restaurant POS</h1>
          <p>
            Create order and send KOT
          </p>
        </div>

        <div className="order-type-buttons">
          {ORDER_TYPES.map(
            (type) => (
              <button
                key={type}
                type="button"
                className={
                  orderType === type
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setOrderType(type)
                }
              >
                {type}
              </button>
            )
          )}
        </div>
      </div>

      {/* ====================================================
          ERROR
      ==================================================== */}

      {error && (
        <div className="pos-error">
          {error}
        </div>
      )}

      <div className="pos-layout">

        {/* ==================================================
            LEFT
        ================================================== */}

        <div className="pos-menu">

          {/* TABLE */}

          {orderType ===
            "Dine In" && (
            <div className="pos-table-section">
              <label>
                Select Table
              </label>

              <select
                value={
                  selectedTable
                }
                onChange={(e) =>
                  setSelectedTable(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Table
                </option>

                {tables.map(
                  (table) => (
                    <option
                      key={
                        table._id
                      }
                      value={
                        table._id
                      }
                    >
                      {table.tableName ||
                        table.tableNumber}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          {/* CATEGORIES */}

          <div className="category-list">

            <button
              type="button"
              className={
                selectedCategory ===
                "All"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(
                  "All"
                )
              }
            >
              All
            </button>

            {categories.map(
              (category) => (
                <button
                  type="button"
                  key={
                    category._id
                  }
                  className={
                    selectedCategory ===
                    category._id
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedCategory(
                      category._id
                    )
                  }
                >
                  {category.name ||
                    category.categoryName}
                </button>
              )
            )}
          </div>

          {/* MENU */}

          {loadingMenu ? (
            <div className="loading">
              Loading menu...
            </div>
          ) : (
            <div className="menu-grid">

              {filteredMenu.map(
                (item) => (
                  <button
                    type="button"
                    className="menu-card"
                    key={
                      item._id
                    }
                    onClick={() =>
                      addToCart(item)
                    }
                  >

                    {item.image ? (
                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.menuName
                        }
                      />
                    ) : (
                      <div className="menu-image-placeholder">
                        🍽️
                      </div>
                    )}

                    <div className="menu-card-body">

                      <h3>
                        {
                          item.menuName
                        }
                      </h3>

                      <span>
                        {
                          item.menuCode
                        }
                      </span>

                      <strong>
                        {money(
                          getPrice(
                            item
                          )
                        )}
                      </strong>

                    </div>
                  </button>
                )
              )}

            </div>
          )}
        </div>

        {/* ==================================================
            RIGHT CART
        ================================================== */}

        <div className="pos-cart">

          <div className="cart-header">
            <h2>
              Current Order
            </h2>

            <span>
              {cart.length} items
            </span>
          </div>

          {/* CART ITEMS */}

          <div className="cart-items">

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>
                  🛒
                </div>

                <p>
                  Cart is empty
                </p>

                <span>
                  Select menu items
                  to start
                </span>
              </div>
            ) : (
              cart.map(
                (item) => (
                  <div
                    className="cart-item"
                    key={
                      item.menuItem
                    }
                  >

                    <div className="cart-item-info">

                      <h4>
                        {
                          item.menuName
                        }
                      </h4>

                      <span>
                        {money(
                          item.unitPrice
                        )}
                      </span>

                    </div>

                    <div className="quantity-control">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.menuItem,
                            item.quantity -
                              1
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {
                          item.quantity
                        }
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.menuItem,
                            item.quantity +
                              1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <strong>
                      {money(
                        item.unitPrice *
                          item.quantity
                      )}
                    </strong>

                    <button
                      type="button"
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(
                          item.menuItem
                        )
                      }
                    >
                      ×
                    </button>

                  </div>
                )
              )
            )}

          </div>

          {/* CUSTOMER */}

          <div className="customer-section">

            <input
              type="text"
              placeholder="Customer name"
              value={
                customerName
              }
              onChange={(e) =>
                setCustomerName(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Customer phone"
              value={
                customerPhone
              }
              onChange={(e) =>
                setCustomerPhone(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Order remarks"
              value={remarks}
              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }
            />

          </div>

          {/* TOTAL */}

          <div className="cart-summary">

            <div>
              <span>
                Subtotal
              </span>

              <strong>
                {money(
                  totals.subtotal
                )}
              </strong>
            </div>

            <div>
              <span>
                Discount
              </span>

              <strong>
                -{" "}
                {money(
                  totals.discount
                )}
              </strong>
            </div>

            <div>
              <span>
                GST
              </span>

              <strong>
                {money(
                  totals.gst
                )}
              </strong>
            </div>

            <div className="grand-total">
              <span>
                Total
              </span>

              <strong>
                {money(
                  Math.round(
                    totals.total
                  )
                )}
              </strong>
            </div>

          </div>

          {/* ACTION */}

          <button
            type="button"
            className="kot-button"
            disabled={
              loading ||
              cart.length === 0
            }
            onClick={
              handleCreateOrder
            }
          >
            {loading
              ? "Creating Order..."
              : "SEND KOT"}
          </button>

        </div>
      </div>
    </div>
  );
}
