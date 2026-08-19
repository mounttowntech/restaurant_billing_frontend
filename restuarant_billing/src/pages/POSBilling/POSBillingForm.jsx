import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPOSBill } from "../../features/posBilling/posBillingSlice";
import "./POSBilling.css";

const emptyItem = () => ({
  product: "",
  productName: "",
  quantity: 1,
  price: 0,
  discountPercentage: 0,
  taxPercentage: 0,
});

const POSBillingForm = ({ onCreated }) => {
  const dispatch = useDispatch();

  const { loading = false } = useSelector((state) => state.posBilling || {});

  // ==================================================
  // FORM STATE
  // ==================================================

  const [restaurant, setRestaurant] = useState("");
  const [store, setStore] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderType, setOrderType] = useState("DINE_IN");

  const [cgstPercentage, setCgstPercentage] = useState(0);
  const [sgstPercentage, setSgstPercentage] = useState(0);
  const [igstPercentage, setIgstPercentage] = useState(0);

  // ==================================================
  // ITEM STATE
  // ==================================================

  const [items, setItems] = useState([emptyItem()]);

  // ==================================================
  // ADD ITEM
  // ==================================================

  const addItem = () => {
    setItems((prev) => [...prev, emptyItem()]);
  };

  // ==================================================
  // REMOVE ITEM
  // ==================================================

  const removeItem = (index) => {
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  // ==================================================
  // UPDATE ITEM
  // ==================================================

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]:
                field === "quantity" ||
                field === "price" ||
                field === "discountPercentage" ||
                field === "taxPercentage"
                  ? Number(value)
                  : value,
            }
          : item,
      ),
    );
  };

  // ==================================================
  // RESET FORM
  // ==================================================

  const resetForm = () => {
    setItems([emptyItem()]);

    setCustomer("");
    setCustomerName("");
    setCustomerPhone("");

    setCgstPercentage(0);
    setSgstPercentage(0);
    setIgstPercentage(0);
  };

  // ==================================================
  // CREATE BILL
  // ==================================================

  const handleCreateBill = async (e) => {
    e.preventDefault();

    if (!restaurant) {
      alert("Restaurant ID is required");
      return;
    }

    if (!store) {
      alert("Store ID is required");
      return;
    }

    if (!items.length) {
      alert("Add at least one item");
      return;
    }

    const validItems = items.filter(
      (item) =>
        item.product &&
        item.productName.trim() &&
        Number(item.quantity) > 0 &&
        Number(item.price) >= 0,
    );

    if (!validItems.length) {
      alert("Please enter valid product and item details");
      return;
    }

    const payload = {
      restaurant,
      store,

      customer: customer.trim() || null,

      customerName: customerName.trim(),

      customerPhone: customerPhone.trim(),

      orderType,

      items: validItems.map((item) => ({
        product: item.product,
        productName: item.productName.trim(),
        quantity: Number(item.quantity),

        price: Number(item.price),

        discountPercentage: Number(item.discountPercentage || 0),

        taxPercentage: Number(item.taxPercentage || 0),
      })),

      cgstPercentage: Number(cgstPercentage || 0),

      sgstPercentage: Number(sgstPercentage || 0),

      igstPercentage: Number(igstPercentage || 0),
    };

    try {
      await dispatch(createPOSBill(payload)).unwrap();

      alert("POS bill created successfully");

      resetForm();

      onCreated?.();
    } catch (error) {
      console.error("Create POS Bill Error:", error);
    }
  };

  return (
    <form className="pos-billing-form" onSubmit={handleCreateBill}>
      <div className="pos-section-title">
        <h2>Create POS Bill</h2>
      </div>

      {/* ==================================================
          RESTAURANT / STORE
      ================================================== */}

      <div className="pos-form-grid">
        <div className="pos-form-group">
          <label>Restaurant ID *</label>

          <input
            type="text"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
            placeholder="Enter restaurant ID"
          />
        </div>

        <div className="pos-form-group">
          <label>Store ID *</label>

          <input
            type="text"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            placeholder="Enter store ID"
          />
        </div>

        <div className="pos-form-group">
          <label>Customer ID</label>

          <input
            type="text"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Optional customer ID"
          />
        </div>

        <div className="pos-form-group">
          <label>Customer Name</label>

          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Customer name"
          />
        </div>

        <div className="pos-form-group">
          <label>Customer Phone</label>

          <input
            type="text"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="Phone number"
          />
        </div>

        <div className="pos-form-group">
          <label>Order Type</label>

          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
          >
            <option value="DINE_IN">Dine In</option>

            <option value="TAKEAWAY">Take Away</option>

            <option value="DELIVERY">Delivery</option>
          </select>
        </div>
      </div>

      {/* ==================================================
          ITEMS
      ================================================== */}

      <div className="pos-items-section">
        <div className="pos-items-header">
          <h3>Items</h3>

          <button type="button" className="pos-add-button" onClick={addItem}>
            + Add Item
          </button>
        </div>

        {items.map((item, index) => (
          <div className="pos-item-row" key={index}>
            <div className="pos-form-group">
              <label>Product ID</label>

              <input
                type="text"
                value={item.product}
                onChange={(e) => updateItem(index, "product", e.target.value)}
                placeholder="Product ObjectId"
              />
            </div>

            <div className="pos-form-group">
              <label>Product Name</label>

              <input
                type="text"
                value={item.productName}
                onChange={(e) =>
                  updateItem(index, "productName", e.target.value)
                }
                placeholder="Product name"
              />
            </div>

            <div className="pos-form-group">
              <label>Quantity</label>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", e.target.value)}
              />
            </div>

            <div className="pos-form-group">
              <label>Price</label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
              />
            </div>

            <div className="pos-form-group">
              <label>Discount %</label>

              <input
                type="number"
                min="0"
                max="100"
                value={item.discountPercentage}
                onChange={(e) =>
                  updateItem(index, "discountPercentage", e.target.value)
                }
              />
            </div>

            <div className="pos-form-group">
              <label>Tax %</label>

              <input
                type="number"
                min="0"
                max="100"
                value={item.taxPercentage}
                onChange={(e) =>
                  updateItem(index, "taxPercentage", e.target.value)
                }
              />
            </div>

            {items.length > 1 && (
              <button
                type="button"
                className="pos-remove-button"
                onClick={() => removeItem(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ==================================================
          TAX
      ================================================== */}

      <div className="pos-tax-section">
        <h3>GST / Tax</h3>

        <div className="pos-form-grid">
          <div className="pos-form-group">
            <label>CGST %</label>

            <input
              type="number"
              min="0"
              value={cgstPercentage}
              onChange={(e) => setCgstPercentage(e.target.value)}
            />
          </div>

          <div className="pos-form-group">
            <label>SGST %</label>

            <input
              type="number"
              min="0"
              value={sgstPercentage}
              onChange={(e) => setSgstPercentage(e.target.value)}
            />
          </div>

          <div className="pos-form-group">
            <label>IGST %</label>

            <input
              type="number"
              min="0"
              value={igstPercentage}
              onChange={(e) => setIgstPercentage(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          CREATE BUTTON
      ================================================== */}

      <div className="pos-form-actions">
        <button type="submit" className="pos-create-button" disabled={loading}>
          {loading ? "Creating..." : "Create POS Bill"}
        </button>
      </div>
    </form>
  );
};

export default POSBillingForm;
