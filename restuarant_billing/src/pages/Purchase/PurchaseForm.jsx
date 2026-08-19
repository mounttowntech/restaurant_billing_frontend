import { useEffect, useState } from "react";
import "./PurchaseForm.css";
import { CancelButton, SaveButton } from "../../components/common/Button";
const emptyItem = {
  ingredient: "",
  batch: "",
  ingredientCode: "",
  ingredientName: "",
  barcode: "",
  unit: "",
  purchaseUnit: "",
  quantity: 1,
  freeQuantity: 0,
  purchasePrice: 0,
  sellingPrice: 0,
  discountPercentage: 0,
  gstPercentage: 0,
  manufactureDate: "",
  expiryDate: "",
  remarks: "",
};

const initialForm = {
  purchaseNo: "",
  purchaseDate: "",
  supplier: "",
  restaurant: "",
  store: "",
  warehouse: "",
  invoiceNumber: "",
  invoiceDate: "",
  items: [emptyItem],
  discountAmount: 0,
  shippingCharge: 0,
  otherCharges: 0,
  roundOffAmount: 0,
  paidAmount: 0,
  paymentMethod: "Cash",
  purchaseStatus: "Received",
  remarks: "",
};

const PurchaseForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        purchaseNo: initialData.purchaseNo || "",
        purchaseDate: initialData.purchaseDate
          ? initialData.purchaseDate.substring(0, 10)
          : "",
        supplier: initialData.supplier?._id || initialData.supplier || "",
        restaurant: initialData.restaurant?._id || initialData.restaurant || "",
        store: initialData.store?._id || initialData.store || "",
        warehouse: initialData.warehouse?._id || initialData.warehouse || "",
        invoiceNumber: initialData.invoiceNumber || "",
        invoiceDate: initialData.invoiceDate
          ? initialData.invoiceDate.substring(0, 10)
          : "",

        items:
          initialData.items?.length > 0
            ? initialData.items.map((item) => ({
                ingredient: item.ingredient?._id || item.ingredient || "",

                batch: item.batch?._id || item.batch || "",

                ingredientCode: item.ingredientCode || "",

                ingredientName: item.ingredientName || "",

                barcode: item.barcode || "",

                unit: item.unit?._id || item.unit || "",

                purchaseUnit: item.purchaseUnit?._id || item.purchaseUnit || "",

                quantity: item.quantity ?? 1,

                freeQuantity: item.freeQuantity ?? 0,

                purchasePrice: item.purchasePrice ?? 0,

                sellingPrice: item.sellingPrice ?? 0,

                discountPercentage: item.discountPercentage ?? 0,

                gstPercentage: item.gstPercentage ?? 0,

                manufactureDate: item.manufactureDate
                  ? item.manufactureDate.substring(0, 10)
                  : "",

                expiryDate: item.expiryDate
                  ? item.expiryDate.substring(0, 10)
                  : "",

                remarks: item.remarks || "",
              }))
            : [emptyItem],

        discountAmount: initialData.discountAmount ?? 0,

        shippingCharge: initialData.shippingCharge ?? 0,

        otherCharges: initialData.otherCharges ?? 0,

        roundOffAmount: initialData.roundOffAmount ?? 0,

        paidAmount: initialData.paidAmount ?? 0,

        paymentMethod: initialData.paymentMethod || "Cash",

        purchaseStatus: initialData.purchaseStatus || "Received",

        remarks: initialData.remarks || "",
      });
    } else {
      setFormData({
        ...initialForm,
        purchaseDate: new Date().toISOString().substring(0, 10),
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData((prev) => {
      const items = [...prev.items];

      items[index] = {
        ...items[index],
        [field]: value,
      };

      return {
        ...prev,
        items,
      };
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          ...emptyItem,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => {
      if (prev.items.length === 1) {
        return prev;
      }

      return {
        ...prev,
        items: prev.items.filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      purchaseNo: formData.purchaseNo.trim(),

      purchaseDate: formData.purchaseDate || undefined,

      supplier: formData.supplier,

      restaurant: formData.restaurant,

      store: formData.store,

      warehouse: formData.warehouse || null,

      invoiceNumber: formData.invoiceNumber.trim(),

      invoiceDate: formData.invoiceDate || null,

      items: formData.items.map((item) => ({
        ingredient: item.ingredient,

        batch: item.batch || null,

        ingredientCode: item.ingredientCode,

        ingredientName: item.ingredientName,

        barcode: item.barcode,

        unit: item.unit,

        purchaseUnit: item.purchaseUnit || null,

        quantity: Number(item.quantity),

        freeQuantity: Number(item.freeQuantity || 0),

        purchasePrice: Number(item.purchasePrice || 0),

        sellingPrice: Number(item.sellingPrice || 0),

        discountPercentage: Number(item.discountPercentage || 0),

        gstPercentage: Number(item.gstPercentage || 0),

        manufactureDate: item.manufactureDate || null,

        expiryDate: item.expiryDate || null,

        remarks: item.remarks || "",
      })),

      discountAmount: Number(formData.discountAmount || 0),

      shippingCharge: Number(formData.shippingCharge || 0),

      otherCharges: Number(formData.otherCharges || 0),

      roundOffAmount: Number(formData.roundOffAmount || 0),

      paidAmount: Number(formData.paidAmount || 0),

      paymentMethod: formData.paymentMethod,

      purchaseStatus: formData.purchaseStatus,

      remarks: formData.remarks,
    };

    onSubmit(payload);
  };

  const calculateItemTotal = (item) => {
    const quantity = Number(item.quantity) || 0;

    const purchasePrice = Number(item.purchasePrice) || 0;

    const discountPercentage = Number(item.discountPercentage || 0);

    const gstPercentage = Number(item.gstPercentage || 0);

    const gross = quantity * purchasePrice;

    const discount = (gross * discountPercentage) / 100;

    const taxable = gross - discount;

    const gst = (taxable * gstPercentage) / 100;

    return taxable + gst;
  };

  const calculateGrandTotal = () => {
    const itemsTotal = formData.items.reduce(
      (sum, item) => sum + calculateItemTotal(item),
      0,
    );

    return (
      itemsTotal +
      Number(formData.shippingCharge || 0) +
      Number(formData.otherCharges || 0) -
      Number(formData.discountAmount || 0) +
      Number(formData.roundOffAmount || 0)
    );
  };

  const grandTotal = calculateGrandTotal();

  const dueAmount = grandTotal - Number(formData.paidAmount || 0);

  return (
    <form className="purchase-form" onSubmit={handleSubmit}>
      <div className="purchase-form-section">
        <h3>Purchase Information</h3>

        <div className="purchase-form-grid">
          <div className="form-group">
            <label>Purchase No *</label>

            <input
              type="text"
              name="purchaseNo"
              value={formData.purchaseNo}
              onChange={handleChange}
              placeholder="Enter purchase number"
              required
              disabled={!!initialData}
            />
          </div>

          <div className="form-group">
            <label>Purchase Date</label>

            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Supplier ID *</label>

            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Enter supplier ObjectId"
              required
            />
          </div>

          <div className="form-group">
            <label>Restaurant ID *</label>

            <input
              type="text"
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
              placeholder="Enter restaurant ObjectId"
              required
            />
          </div>

          <div className="form-group">
            <label>Store ID *</label>

            <input
              type="text"
              name="store"
              value={formData.store}
              onChange={handleChange}
              placeholder="Enter store ObjectId"
              required
            />
          </div>

          <div className="form-group">
            <label>Warehouse ID</label>

            <input
              type="text"
              name="warehouse"
              value={formData.warehouse}
              onChange={handleChange}
              placeholder="Optional warehouse ObjectId"
            />
          </div>

          <div className="form-group">
            <label>Invoice Number</label>

            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              placeholder="Enter invoice number"
            />
          </div>

          <div className="form-group">
            <label>Invoice Date</label>

            <input
              type="date"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="purchase-form-section">
        <div className="purchase-items-header">
          <h3>Purchase Items</h3>

          <button type="button" onClick={addItem}>
            + Add Item
          </button>
        </div>

        {formData.items.map((item, index) => (
          <div className="purchase-item-card" key={index}>
            <div className="purchase-item-title">
              <h4>Item {index + 1}</h4>

              {formData.items.length > 1 && (
                <button type="button" onClick={() => removeItem(index)}>
                  Remove
                </button>
              )}
            </div>

            <div className="purchase-form-grid">
              <div className="form-group">
                <label>Ingredient ID *</label>

                <input
                  type="text"
                  value={item.ingredient}
                  onChange={(e) =>
                    handleItemChange(index, "ingredient", e.target.value)
                  }
                  placeholder="Ingredient ObjectId"
                  required
                />
              </div>

              <div className="form-group">
                <label>Ingredient Name *</label>

                <input
                  type="text"
                  value={item.ingredientName}
                  onChange={(e) =>
                    handleItemChange(index, "ingredientName", e.target.value)
                  }
                  placeholder="Ingredient name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Ingredient Code</label>

                <input
                  type="text"
                  value={item.ingredientCode}
                  onChange={(e) =>
                    handleItemChange(index, "ingredientCode", e.target.value)
                  }
                  placeholder="Code"
                />
              </div>

              <div className="form-group">
                <label>Barcode</label>

                <input
                  type="text"
                  value={item.barcode}
                  onChange={(e) =>
                    handleItemChange(index, "barcode", e.target.value)
                  }
                  placeholder="Barcode"
                />
              </div>

              <div className="form-group">
                <label>Unit ID *</label>

                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) =>
                    handleItemChange(index, "unit", e.target.value)
                  }
                  placeholder="Unit ObjectId"
                  required
                />
              </div>

              <div className="form-group">
                <label>Purchase Unit ID</label>

                <input
                  type="text"
                  value={item.purchaseUnit}
                  onChange={(e) =>
                    handleItemChange(index, "purchaseUnit", e.target.value)
                  }
                  placeholder="Optional"
                />
              </div>

              <div className="form-group">
                <label>Batch ID</label>

                <input
                  type="text"
                  value={item.batch}
                  onChange={(e) =>
                    handleItemChange(index, "batch", e.target.value)
                  }
                  placeholder="Optional"
                />
              </div>

              <div className="form-group">
                <label>Quantity *</label>

                <input
                  type="number"
                  min="0.0001"
                  step="0.0001"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Free Quantity</label>

                <input
                  type="number"
                  min="0"
                  value={item.freeQuantity}
                  onChange={(e) =>
                    handleItemChange(index, "freeQuantity", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Purchase Price *</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.purchasePrice}
                  onChange={(e) =>
                    handleItemChange(index, "purchasePrice", e.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Selling Price</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.sellingPrice}
                  onChange={(e) =>
                    handleItemChange(index, "sellingPrice", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Discount %</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.discountPercentage}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "discountPercentage",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div className="form-group">
                <label>GST %</label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.gstPercentage}
                  onChange={(e) =>
                    handleItemChange(index, "gstPercentage", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Manufacture Date</label>

                <input
                  type="date"
                  value={item.manufactureDate}
                  onChange={(e) =>
                    handleItemChange(index, "manufactureDate", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Expiry Date</label>

                <input
                  type="date"
                  value={item.expiryDate}
                  onChange={(e) =>
                    handleItemChange(index, "expiryDate", e.target.value)
                  }
                />
              </div>

              <div className="form-group full-width">
                <label>Item Remarks</label>

                <input
                  type="text"
                  value={item.remarks}
                  onChange={(e) =>
                    handleItemChange(index, "remarks", e.target.value)
                  }
                  placeholder="Item remarks"
                />
              </div>
            </div>

            <div className="purchase-item-total">
              Item Total: ₹{calculateItemTotal(item).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="purchase-form-section">
        <h3>Payment & Charges</h3>

        <div className="purchase-form-grid">
          <div className="form-group">
            <label>Discount Amount</label>

            <input
              type="number"
              min="0"
              step="0.01"
              name="discountAmount"
              value={formData.discountAmount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Shipping Charge</label>

            <input
              type="number"
              min="0"
              step="0.01"
              name="shippingCharge"
              value={formData.shippingCharge}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Other Charges</label>

            <input
              type="number"
              min="0"
              step="0.01"
              name="otherCharges"
              value={formData.otherCharges}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Round Off</label>

            <input
              type="number"
              step="0.01"
              name="roundOffAmount"
              value={formData.roundOffAmount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Paid Amount</label>

            <input
              type="number"
              min="0"
              step="0.01"
              name="paidAmount"
              value={formData.paidAmount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="Cash">Cash</option>

              <option value="Card">Card</option>

              <option value="UPI">UPI</option>

              <option value="Bank">Bank</option>

              <option value="Cheque">Cheque</option>

              <option value="Credit">Credit</option>
            </select>
          </div>

          <div className="form-group">
            <label>Purchase Status</label>

            <select
              name="purchaseStatus"
              value={formData.purchaseStatus}
              onChange={handleChange}
            >
              <option value="Draft">Draft</option>

              <option value="Ordered">Ordered</option>

              <option value="Received">Received</option>

              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Remarks</label>

            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Purchase remarks"
              rows="3"
            />
          </div>
        </div>
      </div>
      <div className="purchase-summary">
        <div>
          <span>Grand Total</span>

          <strong>₹{grandTotal.toFixed(2)}</strong>
        </div>

        <div>
          <span>Paid Amount</span>

          <strong>₹{Number(formData.paidAmount || 0).toFixed(2)}</strong>
        </div>

        <div>
          <span>Due Amount</span>

          <strong>₹{dueAmount.toFixed(2)}</strong>
        </div>
      </div>
      <div className="purchase-form-actions">
        {onCancel && (
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
        )}

        <SaveButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : initialData
              ? "Update Purchase"
              : "Create Purchase"}
        </SaveButton>
      </div>
    </form>
  );
};

export default PurchaseForm;
