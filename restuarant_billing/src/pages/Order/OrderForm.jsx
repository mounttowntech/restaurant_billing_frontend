import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import "./OrderForm.css";

import {
  AddButton,
  CancelButton,
  SaveButton,
} from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

const initialForm = {
  orderNo: "",

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
};

const OrderForm = ({
  editingOrder,
  onSubmit,
  restaurantOptions = [],
  storeOptions = [],
  customerOptions = [],
  tableOptions = [],
  menuItemOptions = [],
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  const [items, setItems] = useState([]);

  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [itemDiscount, setItemDiscount] = useState(0);
  const [gstPercentage, setGstPercentage] = useState(5);

  const orderType = watch("orderType");

  useEffect(() => {
    if (editingOrder) {
      reset({
        orderNo: editingOrder.orderNo || "",

        restaurant:
          typeof editingOrder.restaurant === "object"
            ? editingOrder.restaurant?._id || ""
            : editingOrder.restaurant || "",

        store:
          typeof editingOrder.store === "object"
            ? editingOrder.store?._id || ""
            : editingOrder.store || "",

        customer:
          typeof editingOrder.customer === "object"
            ? editingOrder.customer?._id || ""
            : editingOrder.customer || "",

        table:
          typeof editingOrder.table === "object"
            ? editingOrder.table?._id || ""
            : editingOrder.table || "",

        waiter:
          typeof editingOrder.waiter === "object"
            ? editingOrder.waiter?._id || ""
            : editingOrder.waiter || "",

        orderType: editingOrder.orderType || "Dine In",

        paymentMethod: editingOrder.paymentMethod || "Cash",

        paidAmount: Number(editingOrder.paidAmount || 0),

        serviceCharge: Number(editingOrder.serviceCharge || 0),

        packingCharge: Number(editingOrder.packingCharge || 0),

        deliveryCharge: Number(editingOrder.deliveryCharge || 0),

        tipAmount: Number(editingOrder.tipAmount || 0),

        roundOffAmount: Number(editingOrder.roundOffAmount || 0),

        remarks: editingOrder.remarks || "",
      });

      setItems(
        (editingOrder.items || []).map((item) => ({
          menuItem:
            typeof item.menuItem === "object"
              ? item.menuItem?._id || ""
              : item.menuItem || "",

          menuCode: item.menuCode || "",

          menuName:
            item.menuName ||
            item.menuItem?.menuName ||
            item.menuItem?.name ||
            item.menuItem?.itemName ||
            "",

          quantity: Number(item.quantity || 1),

          unitPrice: Number(item.unitPrice || 0),

          discountPercentage: Number(item.discountPercentage || 0),

          discountAmount: Number(item.discountAmount || 0),

          taxableAmount: Number(item.taxableAmount || 0),

          gstPercentage: Number(item.gstPercentage || 0),

          cgstAmount: Number(item.cgstAmount || 0),

          sgstAmount: Number(item.sgstAmount || 0),

          igstAmount: Number(item.igstAmount || 0),

          gstAmount: Number(item.gstAmount || 0),

          totalAmount: Number(item.totalAmount || 0),

          remarks: item.remarks || "",
        })),
      );
    } else {
      reset({
        ...initialForm,
        orderNo: "",
      });

      setItems([]);
      setSelectedMenuItem("");
      setQuantity(1);
      setItemDiscount(0);
      setGstPercentage(5);
    }
  }, [editingOrder, reset]);

  const selectedItem = useMemo(() => {
    return menuItemOptions.find((item) => {
      const id = item.value || item._id;
      return id === selectedMenuItem;
    });
  }, [menuItemOptions, selectedMenuItem]);

  const getMenuItemPrice = (item) => {
    return Number(
      item?.dineInPrice ??
        item?.sellingPrice ??
        item?.price ??
        item?.salePrice ??
        0,
    );
  };

  const getMenuItemName = (item) => {
    return (
      item?.label ||
      item?.menuName ||
      item?.name ||
      item?.itemName ||
      "Menu Item"
    );
  };

  const calculateItem = (price, qty, discountPercentage, gstPercent) => {
    const subtotal = Number(price) * Number(qty);

    const discountAmount = (subtotal * Number(discountPercentage || 0)) / 100;

    const taxableAmount = subtotal - discountAmount;

    const gstAmount = (taxableAmount * Number(gstPercent || 0)) / 100;

    return {
      discountAmount,
      taxableAmount,
      cgstAmount: gstAmount / 2,
      sgstAmount: gstAmount / 2,
      igstAmount: 0,
      gstAmount,
      totalAmount: taxableAmount + gstAmount,
    };
  };

  const handleAddItem = () => {
    if (!selectedItem) {
      alert("Please select a menu item.");
      return;
    }

    const menuItemId = selectedItem.value || selectedItem._id;

    const existingIndex = items.findIndex(
      (item) => item.menuItem === menuItemId,
    );

    if (existingIndex !== -1) {
      setItems((prev) =>
        prev.map((item, index) => {
          if (index !== existingIndex) {
            return item;
          }

          const newQuantity = Number(item.quantity) + Number(quantity);

          const calculated = calculateItem(
            item.unitPrice,
            newQuantity,
            item.discountPercentage,
            item.gstPercentage,
          );

          return {
            ...item,
            quantity: newQuantity,
            ...calculated,
          };
        }),
      );

      setSelectedMenuItem("");
      setQuantity(1);
      setItemDiscount(0);
      setGstPercentage(5);

      return;
    }

    const price = getMenuItemPrice(selectedItem);

    const calculated = calculateItem(
      price,
      quantity,
      itemDiscount,
      gstPercentage,
    );

    const newItem = {
      menuItem: menuItemId,

      menuCode: selectedItem.menuCode || selectedItem.code || "",

      menuName: getMenuItemName(selectedItem),

      quantity: Number(quantity),

      unitPrice: price,

      discountPercentage: Number(itemDiscount),

      gstPercentage: Number(gstPercentage),

      remarks: "",

      ...calculated,
    };

    setItems((prev) => [...prev, newItem]);

    setSelectedMenuItem("");
    setQuantity(1);
    setItemDiscount(0);
    setGstPercentage(5);
  };

  const handleRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleQuantityChange = (index, value) => {
    const newQuantity = Math.max(1, Number(value) || 1);

    setItems((prev) =>
      prev.map((item, itemIndex) => {
        if (itemIndex !== index) {
          return item;
        }

        const calculated = calculateItem(
          item.unitPrice,
          newQuantity,
          item.discountPercentage,
          item.gstPercentage,
        );

        return {
          ...item,
          quantity: newQuantity,
          ...calculated,
        };
      }),
    );
  };

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

  const totalGST = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.gstAmount || 0), 0);
  }, [items]);

  const taxableAmount = subTotal - totalDiscount;

  const serviceCharge = Number(watch("serviceCharge") || 0);
  const packingCharge = Number(watch("packingCharge") || 0);
  const deliveryCharge = Number(watch("deliveryCharge") || 0);
  const tipAmount = Number(watch("tipAmount") || 0);
  const roundOffAmount = Number(watch("roundOffAmount") || 0);
  const paidAmount = Number(watch("paidAmount") || 0);

  const additionalCharges =
    serviceCharge + packingCharge + deliveryCharge + tipAmount + roundOffAmount;

  const grandTotal = taxableAmount + totalGST + additionalCharges;

  const dueAmount = grandTotal - paidAmount;

  const onFormSubmit = async (data) => {
    if (!data.restaurant?.trim()) {
      alert("Please select restaurant.");
      return;
    }

    if (!data.store?.trim()) {
      alert("Please select store.");
      return;
    }

    if (!data.orderNo?.trim()) {
      alert("Please enter order number.");
      return;
    }

    if (!items.length) {
      alert("Please add at least one menu item.");
      return;
    }

    if (data.orderType === "Dine In" && !data.table?.trim()) {
      alert("Please select a table.");
      return;
    }

    const payload = {
      orderNo: data.orderNo.trim(),

      restaurant: data.restaurant.trim(),

      store: data.store.trim(),

      customer: data.customer?.trim() || undefined,

      table:
        data.orderType === "Dine In"
          ? data.table?.trim() || undefined
          : undefined,

      waiter: data.waiter?.trim() || undefined,

      orderType: data.orderType,

      items: items.map((item) => ({
        menuItem: item.menuItem,

        menuCode: item.menuCode,

        menuName: item.menuName,

        quantity: Number(item.quantity),

        unitPrice: Number(item.unitPrice),

        discountPercentage: Number(item.discountPercentage || 0),

        discountAmount: Number(item.discountAmount || 0),

        taxableAmount: Number(item.taxableAmount || 0),

        gstPercentage: Number(item.gstPercentage || 0),

        cgstAmount: Number(item.cgstAmount || 0),

        sgstAmount: Number(item.sgstAmount || 0),

        igstAmount: Number(item.igstAmount || 0),

        gstAmount: Number(item.gstAmount || 0),

        totalAmount: Number(item.totalAmount || 0),

        remarks: item.remarks || "",
      })),

      serviceCharge: Number(data.serviceCharge || 0),

      packingCharge: Number(data.packingCharge || 0),

      deliveryCharge: Number(data.deliveryCharge || 0),

      tipAmount: Number(data.tipAmount || 0),

      roundOffAmount: Number(data.roundOffAmount || 0),

      paymentMethod: data.paymentMethod,

      paidAmount: Number(data.paidAmount || 0),

      paymentStatus:
        Number(data.paidAmount || 0) >= grandTotal
          ? "Paid"
          : Number(data.paidAmount || 0) > 0
            ? "Partial"
            : "Pending",

      remarks: data.remarks?.trim() || undefined,
    };

    await onSubmit(payload);
  };

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <form className="order-form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="order-form-section">
        <h3>Order Information</h3>

        <div className="order-form-grid">
          <div className="order-form-field">
            <Input
              label="Order Number"
              name="orderNo"
              type="text"
              placeholder="ORD001"
              register={register}
              error={errors.orderNo?.message}
            />
          </div>

          <div className="order-form-field">
            <Select
              label="Order Type"
              name="orderType"
              register={register}
              error={errors.orderType?.message}
              options={[
                { _id: "Dine In", label: "Dine In" },
                { _id: "Takeaway", label: "Takeaway" },
                { _id: "Delivery", label: "Delivery" },
                { _id: "Online", label: "Online" },
                { _id: "QR Order", label: "QR Order" },
              ]}
            />
          </div>

          <div className="order-form-field">
            <Select
              label="Restaurant"
              name="restaurant"
              register={register}
              error={errors.restaurant?.message}
              options={restaurantOptions}
              optionValue="value"
              optionLabel="label"
            />
          </div>

          <div className="order-form-field">
            <Select
              label="Store"
              name="store"
              register={register}
              error={errors.store?.message}
              options={storeOptions}
              optionValue="value"
              optionLabel="label"
            />
          </div>

          <div className="order-form-field">
            <Select
              label="Customer"
              name="customer"
              register={register}
              error={errors.customer?.message}
              options={customerOptions}
              optionValue="value"
              optionLabel="label"
            />
          </div>

          {orderType === "Dine In" && (
            <div className="order-form-field">
              <Select
                label="Table"
                name="table"
                register={register}
                error={errors.table?.message}
                options={tableOptions}
                optionValue="value"
                optionLabel="label"
              />
            </div>
          )}
        </div>
      </div>

      <div className="order-form-section">
        <h3>Add Menu Item</h3>

        <div className="order-item-add-grid">
          <div className="order-form-field">
            <label>Menu Item</label>

            <select
              value={selectedMenuItem}
              onChange={(e) => setSelectedMenuItem(e.target.value)}
            >
              <option value="">Select Menu Item</option>

              {menuItemOptions.map((item) => (
                <option
                  key={item.value || item._id}
                  value={item.value || item._id}
                >
                  {getMenuItemName(item)} -{" "}
                  {formatMoney(getMenuItemPrice(item))}
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
      </div>

      <div className="order-form-section">
        <h3>Order Items</h3>

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
                    <td>{item.menuName}</td>

                    <td>{formatMoney(item.unitPrice)}</td>

                    <td>
                      <input
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

                    <td>{formatMoney(item.totalAmount)}</td>

                    <td>
                      <button
                        type="button"
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
      </div>

      <div className="order-form-section">
        <h3>Additional Charges</h3>

        <div className="order-form-grid">
          <div className="order-form-field">
            <Input
              label="Service Charge"
              name="serviceCharge"
              type="number"
              min="0"
              register={register}
            />
          </div>

          <div className="order-form-field">
            <Input
              label="Packing Charge"
              name="packingCharge"
              type="number"
              min="0"
              register={register}
            />
          </div>

          <div className="order-form-field">
            <Input
              label="Delivery Charge"
              name="deliveryCharge"
              type="number"
              min="0"
              register={register}
            />
          </div>

          <div className="order-form-field">
            <Input
              label="Tip Amount"
              name="tipAmount"
              type="number"
              min="0"
              register={register}
            />
          </div>

          <div className="order-form-field">
            <Input
              label="Round Off"
              name="roundOffAmount"
              type="number"
              register={register}
            />
          </div>
        </div>
      </div>

      <div className="order-form-section">
        <h3>Payment</h3>

        <div className="order-form-grid">
          <div className="order-form-field">
            <Select
              label="Payment Method"
              name="paymentMethod"
              register={register}
              options={[
                { _id: "Cash", label: "Cash" },
                { _id: "Card", label: "Card" },
                { _id: "UPI", label: "UPI" },
                { _id: "Wallet", label: "Wallet" },
                { _id: "Credit", label: "Credit" },
                { _id: "Split", label: "Split" },
              ]}
            />
          </div>

          <div className="order-form-field">
            <Input
              label="Paid Amount"
              name="paidAmount"
              type="number"
              min="0"
              register={register}
            />
          </div>
        </div>
      </div>

      <div className="order-form-section">
        <h3>Remarks</h3>

        <div className="order-form-grid">
          <div className="order-form-field order-full-width">
            <textarea
              {...register("remarks")}
              rows="4"
              placeholder="Add order remarks..."
            />
          </div>
        </div>
      </div>

      <div className="order-form-summary">
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
          <strong>{formatMoney(additionalCharges)}</strong>
        </div>

        <div className="order-summary-row order-summary-total">
          <span>Grand Total</span>
          <strong>{formatMoney(grandTotal)}</strong>
        </div>

        <div className="order-summary-row">
          <span>Paid Amount</span>
          <strong>{formatMoney(paidAmount)}</strong>
        </div>

        <div className="order-summary-row order-summary-due">
          <span>Due Amount</span>
          <strong>{formatMoney(dueAmount)}</strong>
        </div>
      </div>

      <div className="order-form-actions">
        <CancelButton type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </CancelButton>

        <SaveButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingOrder
              ? "Update Order"
              : "Create Order"}
        </SaveButton>
      </div>
    </form>
  );
};

export default OrderForm;
