import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./InvoiceForm.css";
import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";
import { AddButton } from "../../components/Common/Button";
import { CancelButton, SaveButton } from "../../components/Common/Button";

const initialForm = {
  invoiceNo: "",
  restaurant: "",
  store: "",
  customer: "",
  customerName: "",
  customerMobile: "",
  customerGSTNo: "",
  order: "",
  table: "",
  billingType: "Dine In",
  paymentMethod: "Cash",
  paidAmount: 0,
  remarks: "",
};

const initialItem = {
  menuItem: "",
  menuName: "",
  menuCode: "",
  quantity: 1,
  unitPrice: 0,
  discountPercentage: 0,
  gstPercentage: 5,
  cgstPercentage: 2.5,
  sgstPercentage: 2.5,
  igstPercentage: 0,
  remarks: "",
};

const InvoiceForm = ({
  editingInvoice,
  onSubmit,
  restaurants = [],
  stores = [],
  customers = [],
  orders = [],
  menuItems = [],
  tables = [],
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  const [items, setItems] = useState([initialItem]);

  /* =========================================================
     LOAD EDIT DATA
  ========================================================= */

  useEffect(() => {
    console.log("Editing Invoice:", editingInvoice);
    if (editingInvoice) {
      reset({
        invoiceNo: editingInvoice.invoiceNo || "",

        restaurant:
          typeof editingInvoice.restaurant === "object"
            ? editingInvoice.restaurant?._id || ""
            : editingInvoice.restaurant || "",

        store:
          typeof editingInvoice.store === "object"
            ? editingInvoice.store?._id || ""
            : editingInvoice.store || "",

        customer:
          typeof editingInvoice.customer === "object"
            ? editingInvoice.customer?._id || ""
            : editingInvoice.customer || "",

        customerName: editingInvoice.customerName || "",

        customerMobile: editingInvoice.customerMobile || "",

        customerGSTNo: editingInvoice.customerGSTNo || "",

        order:
          typeof editingInvoice.order === "object"
            ? editingInvoice.order?._id || ""
            : editingInvoice.order || "",

        table:
          typeof editingInvoice.table === "object"
            ? editingInvoice.table?._id || ""
            : editingInvoice.table || "",

        billingType: editingInvoice.billingType || "Dine In",

        paymentMethod: editingInvoice.paymentMethod || "Cash",

        paidAmount: editingInvoice.paidAmount || 0,

        remarks: editingInvoice.remarks || "",
      });

      if (editingInvoice.items && editingInvoice.items.length > 0) {
        const formattedItems = editingInvoice.items.map((item, index) => {
          const menuItemId =
            typeof item.menuItem === "object"
              ? item.menuItem?._id || item.menuItem?.id || ""
              : item.menuItem || "";

          setValue(`menuItem-${index}`, menuItemId);

          return {
            menuItem: menuItemId,
            menuName: item.menuName || "",
            menuCode: item.menuCode || "",
            quantity: item.quantity || 1,
            unitPrice: item.unitPrice || 0,
            discountPercentage: item.discountPercentage || 0,
            gstPercentage: item.gstPercentage ?? 5,
            cgstPercentage: item.cgstPercentage ?? 2.5,
            sgstPercentage: item.sgstPercentage ?? 2.5,
            igstPercentage: item.igstPercentage ?? 0,
            remarks: item.remarks || "",
          };
        });

        setItems(formattedItems);
      } else {
        setItems([initialItem]);
      }
    } else {
      reset(initialForm);
      setItems([initialItem]);
    }
  }, [editingInvoice, reset, setValue]);

  /* =========================================================
     ITEM CHANGE
  ========================================================= */

  const handleItemChange = (index, field, value) => {
    setItems((previousItems) =>
      previousItems.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  /* =========================================================
     ADD ITEM
  ========================================================= */

  const addItem = () => {
    setItems((previousItems) => [
      ...previousItems,
      {
        ...initialItem,
      },
    ]);
  };

  /* =========================================================
     REMOVE ITEM
  ========================================================= */

  const removeItem = (index) => {
    if (items.length === 1) {
      return;
    }

    setItems((previousItems) =>
      previousItems.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onFormSubmit = async (data) => {
    console.log("Form Data:", data);
    console.log("Invoice Items:", items);
    const payload = {
      invoiceNo: data.invoiceNo.trim(),

      restaurant: data.restaurant,

      store: data.store,

      customer: data.customer || undefined,

      customerName: data.customerName?.trim() || undefined,

      customerMobile: data.customerMobile?.trim() || undefined,

      customerGSTNo: data.customerGSTNo?.trim() || undefined,

      order: data.order,

      table: data.table || undefined,

      billingType: data.billingType,

      paymentMethod: data.paymentMethod,

      paidAmount: Number(data.paidAmount || 0),

      remarks: data.remarks?.trim() || undefined,

      items: items.map((item, index) => ({
        // menuItem-0 get the menuItem value from the form data using the name `menuItem-${index}`. If not found, use the existing item.menuItem or default to an empty string.
        menuItem: item.menuItem || data[`menuItem-${index}`] || "",

        menuName: item.menuName,

        menuCode: item.menuCode?.trim() || undefined,

        quantity: Number(item.quantity || 1),

        unitPrice: Number(item.unitPrice || 0),

        discountPercentage: Number(item.discountPercentage || 0),

        gstPercentage: Number(item.gstPercentage || 0),

        cgstPercentage: Number(item.cgstPercentage || 0),

        sgstPercentage: Number(item.sgstPercentage || 0),

        igstPercentage: Number(item.igstPercentage || 0),

        remarks: item.remarks?.trim() || undefined,
      })),
    };

    await onSubmit(payload);
  };

  console.log("MENU ITEMS are :", menuItems);
  console.log("set ITEMS are :", items);
  console.log(
    "WATCH ITEMS are :",
    watch("menuItem-0"),
    watch("menuItem-1"),
    watch("menuItem-2"),
  );
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="modal-body">
        <div className="form-section">
          <div className="form-section-header">
            <h3>Invoice Details</h3>
          </div>

          <div className="form-grid">
            <Input
              label="Invoice No"
              name="invoiceNo"
              type="text"
              placeholder="INV001"
              register={register}
              error={errors.invoiceNo?.message}
            />

            <Select
              label="Restaurant"
              name="restaurant"
              register={register}
              error={errors.restaurant?.message}
              options={restaurants.map((restaurant) => ({
                _id: restaurant._id,
                label:
                  restaurant.restaurantName ||
                  restaurant.name ||
                  restaurant.displayName ||
                  restaurant._id,
              }))}
            />

            <Select
              label="Store"
              name="store"
              register={register}
              error={errors.store?.message}
              options={stores.map((store) => ({
                _id: store._id,
                label: store.storeName || store.name || store._id,
              }))}
            />

            <Select
              label="Order"
              name="order"
              register={register}
              error={errors.order?.message}
              options={orders.map((order) => ({
                _id: order._id,
                label: order.orderNo || order._id,
              }))}
            />

            <Select
              label="Table "
              name="table"
              register={register}
              error={errors.table?.message}
              options={tables.map((table) => ({
                _id: table._id,
                label: table.tableName || table.name || table._id,
              }))}
            />

            <Select
              label="Billing Type"
              name="billingType"
              register={register}
              error={errors.billingType?.message}
              options={[
                {
                  _id: "Dine In",
                  label: "Dine In",
                },
                {
                  _id: "Takeaway",
                  label: "Takeaway",
                },
                {
                  _id: "Delivery",
                  label: "Delivery",
                },
                {
                  _id: "Online",
                  label: "Online",
                },
                {
                  _id: "QR Order",
                  label: "QR Order",
                },
              ]}
            />
          </div>
        </div>

        {/* ===================================================
            CUSTOMER
        =================================================== */}

        <div className="form-section">
          <div className="form-section-header">
            <h3>Customer Information</h3>
          </div>

          <div className="form-grid">
            <Select
              label="Customer"
              name="customer"
              register={register}
              error={errors.customer?.message}
              options={customers.map((customer) => ({
                _id: customer._id,
                label:
                  customer.customerName ||
                  customer.name ||
                  customer.displayName ||
                  customer._id,
              }))}
            />

            <Input
              label="Customer Name"
              name="customerName"
              type="text"
              placeholder="Enter customer name"
              register={register}
              error={errors.customerName?.message}
            />

            <Input
              label="Mobile"
              name="customerMobile"
              type="text"
              placeholder="Enter mobile number"
              register={register}
              error={errors.customerMobile?.message}
            />

            <Input
              label="GST Number"
              name="customerGSTNo"
              type="text"
              placeholder="Enter GST number"
              register={register}
              error={errors.customerGSTNo?.message}
            />
          </div>
        </div>

        {/* ===================================================
            ITEMS
        =================================================== */}

        <div className="form-section">
          <div className="form-section-header">
            <h3 className="headings">Invoice Items</h3>

            <AddButton type="button" onClick={addItem}>
              + Add Item
            </AddButton>
          </div>

          {items.map((item, index) => (
            <div className="form-section" key={index}>
              <div className="form-section-header">
                <h4>Item {index + 1}</h4>

                {items.length > 1 && (
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-grid">
                <Select
                  label="Menu Item"
                  name={`menuItem-${index}`}
                  register={register}
                  error={errors[`menuItem-${index}`]?.message}
                  // value={
                  //   typeof item.menuItem === "object"
                  //     ? item.menuItem?._id || item.menuItem?.id || ""
                  //     : item.menuItem || ""
                  // }
                  options={menuItems.map((menuItem) => ({
                    _id: menuItem._id,
                    label:
                      menuItem.menuName ||
                      menuItem.name ||
                      menuItem.displayName ||
                      menuItem._id,
                  }))}
                />

                <Input
                  label="Menu Name"
                  name={`menuName-${index}`}
                  type="text"
                  placeholder="Chicken Biriyani"
                  value={item.menuName}
                  onChange={(e) =>
                    handleItemChange(index, "menuName", e.target.value)
                  }
                />

                <Input
                  label="Menu Code"
                  name={`menuCode-${index}`}
                  type="text"
                  placeholder="FOOD001"
                  value={item.menuCode}
                  onChange={(e) =>
                    handleItemChange(index, "menuCode", e.target.value)
                  }
                />

                <Input
                  label="Quantity"
                  name={`quantity-${index}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />

                <Input
                  label="Unit Price"
                  name={`unitPrice-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleItemChange(index, "unitPrice", e.target.value)
                  }
                />

                <Input
                  label="Discount %"
                  name={`discountPercentage-${index}`}
                  type="number"
                  min="0"
                  max="100"
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

                <Input
                  label="GST %"
                  name={`gstPercentage-${index}`}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={item.gstPercentage}
                  onChange={(e) =>
                    handleItemChange(index, "gstPercentage", e.target.value)
                  }
                />

                <Input
                  label="CGST %"
                  name={`cgstPercentage-${index}`}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={item.cgstPercentage}
                  onChange={(e) =>
                    handleItemChange(index, "cgstPercentage", e.target.value)
                  }
                />

                <Input
                  label="SGST %"
                  name={`sgstPercentage-${index}`}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={item.sgstPercentage}
                  onChange={(e) =>
                    handleItemChange(index, "sgstPercentage", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* ===================================================
            PAYMENT
        =================================================== */}

        <div className="form-section">
          <div className="form-section-header">
            <h3>Payment Information</h3>
          </div>

          <div className="form-grid">
            <Select
              label="Payment Method"
              name="paymentMethod"
              register={register}
              error={errors.paymentMethod?.message}
              options={[
                {
                  _id: "Cash",
                  label: "Cash",
                },
                {
                  _id: "Card",
                  label: "Card",
                },
                {
                  _id: "UPI",
                  label: "UPI",
                },
                {
                  _id: "Wallet",
                  label: "Wallet",
                },
                {
                  _id: "Net Banking",
                  label: "Net Banking",
                },
                {
                  _id: "Cheque",
                  label: "Cheque",
                },
                {
                  _id: "Split",
                  label: "Split",
                },
              ]}
            />

            <Input
              label="Paid Amount"
              name="paidAmount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              register={register}
              error={errors.paidAmount?.message}
            />

            <Input
              label="Remarks"
              name="remarks"
              type="text"
              placeholder="Enter remarks"
              register={register}
              error={errors.remarks?.message}
            />
          </div>
        </div>
      </div>

      <div className="invoice-form-actions">
        <CancelButton type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </CancelButton>

        <SaveButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingInvoice
              ? "Update Invoice"
              : "Create Invoice"}
        </SaveButton>
      </div>
    </form>
  );
};

export default InvoiceForm;
