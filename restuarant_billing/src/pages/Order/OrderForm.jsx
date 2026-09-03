import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createOrder } from "../../features/order/orderSlice";

import API from "../../services/api";

import "./OrderForm.css";
import { AddButton, CancelButton } from "../../components/Common/Button";

const OrderForm = ({ editingOrder, onSubmit, onCancel, loading }) => {
  const dispatch = useDispatch();

  const { orderLoading, error } = useSelector((state) => state.order || {});

  const [restaurants, setRestaurants] = useState([]);
  const [stores, setStores] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [loadingData, setLoadingData] = useState(false);

  const [form, setForm] = useState({
    orderNo: `ORD-${Date.now()}`,

    restaurant: "",
    store: "",

    customer: "",
    table: "",
    waiter: "",

    orderType: "Dine In",

    paymentMethod: "Cash",
    paidAmount: 0,

    serviceCharge: 0,
    packingCharge: 0,
    deliveryCharge: 0,
    tipAmount: 0,
    roundOffAmount: 0,

    remarks: "",
  });

  const [items, setItems] = useState([]);

  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [itemDiscount, setItemDiscount] = useState(0);
  const [gstPercentage, setGstPercentage] = useState(5);

  // ==========================================================
  // LOAD MASTER DATA
  // ==========================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);

        const [
          restaurantResponse,
          storeResponse,
          customerResponse,
          tableResponse,
          menuResponse,
        ] = await Promise.all([
          API.get("/restaurants/all"),
          API.get("/store/all"),
          API.get("/customers/all"),
          API.get("/tables/all"),
          API.get("/menu-items/all"),
        ]);

        setRestaurants(
          restaurantResponse.data?.data || restaurantResponse.data || [],
        );

        setStores(storeResponse.data?.data || storeResponse.data || []);

        setCustomers(
          customerResponse.data?.data || customerResponse.data || [],
        );

        setTables(tableResponse.data?.data || tableResponse.data || []);

        setMenuItems(menuResponse.data?.data || menuResponse.data || []);
      } catch (err) {
        console.error("Failed to load order form data:", err);
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  // ==========================================================
  // HANDLE FORM
  // ==========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================================
  // SELECTED MENU ITEM
  // ==========================================================

  const selectedItem = useMemo(() => {
    return menuItems.find((item) => item._id === selectedMenuItem);
  }, [menuItems, selectedMenuItem]);

  // ==========================================================
  // ADD ITEM
  // ==========================================================

  const handleAddItem = () => {
    if (!selectedItem) {
      alert("Please select a menu item.");
      return;
    }

    const existingIndex = items.findIndex(
      (item) => item.menuItem === selectedItem._id,
    );

    if (existingIndex !== -1) {
      const updatedItems = [...items];

      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity:
          Number(updatedItems[existingIndex].quantity) + Number(quantity),
      };

      setItems(updatedItems);
      return;
    }

    const price = Number(
      selectedItem.sellingPrice ??
        selectedItem.price ??
        selectedItem.salePrice ??
        0,
    );

    const discountAmount =
      (price * Number(quantity) * Number(itemDiscount)) / 100;

    const taxableAmount = price * Number(quantity) - discountAmount;

    const gstAmount = (taxableAmount * Number(gstPercentage)) / 100;

    const cgstAmount = gstAmount / 2;
    const sgstAmount = gstAmount / 2;

    const newItem = {
      menuItem: selectedItem._id,

      menuCode: selectedItem.menuCode || selectedItem.code || "",

      menuName:
        selectedItem.name ||
        selectedItem.itemName ||
        selectedItem.menuName ||
        "Menu Item",

      quantity: Number(quantity),

      unitPrice: price,

      discountPercentage: Number(itemDiscount),

      discountAmount,

      taxableAmount,

      gstPercentage: Number(gstPercentage),

      cgstAmount,

      sgstAmount,

      igstAmount: 0,

      gstAmount,

      totalAmount: taxableAmount + gstAmount,

      remarks: "",
    };

    setItems((prev) => [...prev, newItem]);

    setSelectedMenuItem("");
    setQuantity(1);
    setItemDiscount(0);
    setGstPercentage(5);
  };

  // ==========================================================
  // REMOVE ITEM
  // ==========================================================

  const handleRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  // ==========================================================
  // CHANGE ITEM QUANTITY
  // ==========================================================

  const handleQuantityChange = (index, value) => {
    const newQuantity = Math.max(1, Number(value) || 1);

    setItems((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        const subtotal = Number(item.unitPrice) * newQuantity;

        const discountAmount =
          (subtotal * Number(item.discountPercentage || 0)) / 100;

        const taxableAmount = subtotal - discountAmount;

        const gstAmount =
          (taxableAmount * Number(item.gstPercentage || 0)) / 100;

        return {
          ...item,

          quantity: newQuantity,

          discountAmount,

          taxableAmount,

          cgstAmount: gstAmount / 2,

          sgstAmount: gstAmount / 2,

          gstAmount,

          totalAmount: taxableAmount + gstAmount,
        };
      }),
    );
  };

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const subTotal = useMemo(() => {
    return items.reduce(
      (sum, item) =>
        sum + Number(item.unitPrice || 0) * Number(item.quantity || 0),
      0,
    );
  }, [items]);

  const totalDiscount = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + Number(item.discountAmount || 0),
      0,
    );
  }, [items]);

  const taxableAmount = subTotal - totalDiscount;

  const totalGST = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.gstAmount || 0), 0);
  }, [items]);

  const grandTotal =
    taxableAmount +
    totalGST +
    Number(form.serviceCharge || 0) +
    Number(form.packingCharge || 0) +
    Number(form.deliveryCharge || 0) +
    Number(form.tipAmount || 0) +
    Number(form.roundOffAmount || 0);

  const dueAmount = grandTotal - Number(form.paidAmount || 0);

  // ==========================================================
  // CREATE ORDER
  // ==========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.restaurant) {
      alert("Please select restaurant.");
      return;
    }

    if (!form.store) {
      alert("Please select store.");
      return;
    }

    if (!form.orderNo.trim()) {
      alert("Please enter order number.");
      return;
    }

    if (!items.length) {
      alert("Please add at least one menu item.");
      return;
    }

    if (form.orderType === "Dine In" && !form.table) {
      alert("Please select a table for Dine In.");
      return;
    }

    const payload = {
      orderNo: form.orderNo.trim(),

      restaurant: form.restaurant,

      store: form.store,

      customer: form.customer || undefined,

      table: form.orderType === "Dine In" ? form.table || undefined : undefined,

      waiter: form.waiter || undefined,

      orderType: form.orderType,

      items,

      serviceCharge: Number(form.serviceCharge || 0),

      packingCharge: Number(form.packingCharge || 0),

      deliveryCharge: Number(form.deliveryCharge || 0),

      tipAmount: Number(form.tipAmount || 0),

      roundOffAmount: Number(form.roundOffAmount || 0),

      paymentMethod: form.paymentMethod,

      paidAmount: Number(form.paidAmount || 0),

      paymentStatus:
        Number(form.paidAmount || 0) >= grandTotal
          ? "Paid"
          : Number(form.paidAmount || 0) > 0
            ? "Partial"
            : "Pending",

      remarks: form.remarks,
    };

    try {
      const createdOrder = await dispatch(createOrder(payload)).unwrap();

      alert("Order created successfully.");

      if (onSuccess) {
        onSuccess(createdOrder);
      }
    } catch (err) {
      console.error("Create order failed:", err);

      alert(err || "Failed to create order.");
    }
  };

  // ==========================================================
  // FORMAT MONEY
  // ==========================================================

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="order-form-header">
        <div>
          <h2>Create Order</h2>

          <p>Create a restaurant order and send it to the order workflow.</p>
        </div>
      </div>

      {error && <div className="order-form-error">{error}</div>}

      {loadingData && (
        <div className="order-form-loading">Loading restaurant data...</div>
      )}

      {/* ======================================================
          BASIC INFORMATION
      ====================================================== */}

      <section className="order-form-section">
        <div className="order-form-section-title">
          <h3>Order Information</h3>
        </div>

        <div className="order-form-grid">
          <div className="order-form-field">
            <label>Order Number *</label>

            <input
              type="text"
              name="orderNo"
              value={form.orderNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="order-form-field">
            <label>Order Type *</label>

            <select
              name="orderType"
              value={form.orderType}
              onChange={handleChange}
            >
              <option value="Dine In">Dine In</option>
              <option value="Takeaway">Takeaway</option>

              <option value="Delivery">Delivery</option>

              <option value="Online">Online</option>

              <option value="QR Order">QR Order</option>
            </select>
          </div>

          <div className="order-form-field">
            <label>Restaurant *</label>

            <select
              name="restaurant"
              value={form.restaurant}
              onChange={handleChange}
              required
            >
              <option value="">Select Restaurant</option>

              {restaurants.map((restaurant) => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name || restaurant.restaurantName || "Restaurant"}
                </option>
              ))}
            </select>
          </div>

          <div className="order-form-field">
            <label>Store *</label>

            <select
              name="store"
              value={form.store}
              onChange={handleChange}
              required
            >
              <option value="">Select Store</option>

              {stores.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.name || store.storeName || "Store"}
                </option>
              ))}
            </select>
          </div>

          <div className="order-form-field">
            <label>Customer</label>

            <select
              name="customer"
              value={form.customer}
              onChange={handleChange}
            >
              <option value="">Walk-in Customer</option>

              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name ||
                    customer.customerName ||
                    customer.phone ||
                    "Customer"}
                </option>
              ))}
            </select>
          </div>

          {form.orderType === "Dine In" && (
            <div className="order-form-field">
              <label>Table *</label>

              <select
                name="table"
                value={form.table}
                onChange={handleChange}
                required
              >
                <option value="">Select Table</option>

                {tables.map((table) => (
                  <option key={table._id} value={table._id}>
                    {table.name ||
                      table.tableName ||
                      table.tableNumber ||
                      `Table ${table.number || ""}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          ADD ITEM
      ====================================================== */}

      <section className="order-form-section">
        <div className="order-form-section-title">
          <h3>Add Menu Item</h3>
        </div>

        <div className="order-item-add-grid">
          <div className="order-form-field">
            <label>Menu Item</label>

            <select
              value={selectedMenuItem}
              onChange={(e) => setSelectedMenuItem(e.target.value)}
            >
              <option value="">Select Menu Item</option>

              {menuItems.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name || item.itemName || item.menuName || "Menu Item"} -{" "}
                  {formatMoney(
                    item.sellingPrice ?? item.price ?? item.salePrice ?? 0,
                  )}
                </option>
              ))}
            </select>
          </div>

          <div className="order-form-field">
            <label>Quantity</label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="order-form-field">
            <label>Discount %</label>

            <input
              type="number"
              min="0"
              value={itemDiscount}
              onChange={(e) => setItemDiscount(e.target.value)}
            />
          </div>

          <div className="order-form-field">
            <label>GST %</label>

            <input
              type="number"
              min="0"
              value={gstPercentage}
              onChange={(e) => setGstPercentage(e.target.value)}
            />
          </div>

          <div className="order-form-add-button">
            <AddButton type="button" onClick={handleAddItem}>
              + Add Item
            </AddButton>
          </div>
        </div>
      </section>

      {/* ======================================================
          ITEMS
      ====================================================== */}

      <section className="order-form-section">
        <div className="order-form-section-title">
          <h3>Order Items</h3>

          <span>
            {items.length} item
            {items.length !== 1 ? "s" : ""}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="order-items-empty">No items added.</div>
        ) : (
          <div className="order-items-table-container">
            <table className="order-items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Discount</th>
                  <th>GST</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={`${item.menuItem}-${index}`}>
                    <td>
                      <strong>{item.menuName}</strong>
                    </td>

                    <td>{formatMoney(item.unitPrice)}</td>

                    <td>
                      <input
                        className="order-quantity-input"
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                    </td>

                    <td>{formatMoney(item.discountAmount)}</td>

                    <td>{formatMoney(item.gstAmount)}</td>

                    <td>
                      <strong>{formatMoney(item.totalAmount)}</strong>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="order-remove-button"
                        onClick={() => handleRemoveItem(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ======================================================
          CHARGES
      ====================================================== */}

      <section className="order-form-section">
        <div className="order-form-section-title">
          <h3>Additional Charges</h3>
        </div>

        <div className="order-form-grid">
          <div className="order-form-field">
            <label>Service Charge</label>

            <input
              type="number"
              min="0"
              name="serviceCharge"
              value={form.serviceCharge}
              onChange={handleChange}
            />
          </div>

          <div className="order-form-field">
            <label>Packing Charge</label>

            <input
              type="number"
              min="0"
              name="packingCharge"
              value={form.packingCharge}
              onChange={handleChange}
            />
          </div>

          <div className="order-form-field">
            <label>Delivery Charge</label>

            <input
              type="number"
              min="0"
              name="deliveryCharge"
              value={form.deliveryCharge}
              onChange={handleChange}
            />
          </div>

          <div className="order-form-field">
            <label>Tip</label>

            <input
              type="number"
              min="0"
              name="tipAmount"
              value={form.tipAmount}
              onChange={handleChange}
            />
          </div>

          <div className="order-form-field">
            <label>Round Off</label>

            <input
              type="number"
              name="roundOffAmount"
              value={form.roundOffAmount}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          PAYMENT
      ====================================================== */}

      <section className="order-form-section">
        <div className="order-form-section-title">
          <h3>Payment</h3>
        </div>

        <div className="order-form-grid">
          <div className="order-form-field">
            <label>Payment Method</label>

            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
            >
              <option value="Cash">Cash</option>

              <option value="Card">Card</option>

              <option value="UPI">UPI</option>

              <option value="Wallet">Wallet</option>

              <option value="Credit">Credit</option>

              <option value="Split">Split</option>
            </select>
          </div>

          <div className="order-form-field">
            <label>Paid Amount</label>

            <input
              type="number"
              min="0"
              name="paidAmount"
              value={form.paidAmount}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* ======================================================
          REMARKS
      ====================================================== */}

      <section className="order-form-section">
        <div className="order-form-field">
          <label>Remarks</label>

          <textarea
            name="remarks"
            rows="3"
            value={form.remarks}
            onChange={handleChange}
            placeholder="Add order remarks..."
          />
        </div>
      </section>

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <section className="order-form-summary">
        <div className="order-summary-row">
          <span>Subtotal</span>

          <strong>{formatMoney(subTotal)}</strong>
        </div>

        <div className="order-summary-row">
          <span>Discount</span>

          <strong>- {formatMoney(totalDiscount)}</strong>
        </div>

        <div className="order-summary-row">
          <span>Taxable Amount</span>

          <strong>{formatMoney(taxableAmount)}</strong>
        </div>

        <div className="order-summary-row">
          <span>GST</span>

          <strong>{formatMoney(totalGST)}</strong>
        </div>

        <div className="order-summary-row">
          <span>Additional Charges</span>

          <strong>
            {formatMoney(
              Number(form.serviceCharge || 0) +
                Number(form.packingCharge || 0) +
                Number(form.deliveryCharge || 0) +
                Number(form.tipAmount || 0) +
                Number(form.roundOffAmount || 0),
            )}
          </strong>
        </div>

        <div className="order-summary-row order-summary-total">
          <span>Grand Total</span>

          <strong>{formatMoney(grandTotal)}</strong>
        </div>

        <div className="order-summary-row">
          <span>Paid Amount</span>

          <strong>{formatMoney(form.paidAmount)}</strong>
        </div>

        <div className="order-summary-row order-summary-due">
          <span>Due Amount</span>

          <strong>{formatMoney(dueAmount)}</strong>
        </div>
      </section>

      <div className="order-form-actions">
        <CancelButton
          type="button"
          className="order-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <AddButton
          type="submit"
          className="order-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingOrder
              ? "Update Order"
              : "Create Order"}
        </AddButton>
      </div>
    </form>
  );
};

export default OrderForm;
