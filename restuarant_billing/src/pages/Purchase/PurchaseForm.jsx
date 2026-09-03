import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import "./PurchaseForm.css";

import { CancelButton, SaveButton } from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

const emptyItem = {
  ingredient: "",
  // batch: "",
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
  editingPurchase,
  onSubmit,
  supplierOptions = [],
  restaurantOptions = [],
  storeOptions = [],
  warehouseOptions = [],
  ingredientOptions = [],
  // batchOptions = [],
  unitOptions = [],
  purchaseUnitOptions = [],
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items") || [];
  const shippingCharge = watch("shippingCharge") || 0;
  const otherCharges = watch("otherCharges") || 0;
  const discountAmount = watch("discountAmount") || 0;
  const roundOffAmount = watch("roundOffAmount") || 0;
  const paidAmount = watch("paidAmount") || 0;

  useEffect(() => {
    if (editingPurchase) {
      reset({
        purchaseNo: editingPurchase.purchaseNo || "",

        purchaseDate: editingPurchase.purchaseDate
          ? editingPurchase.purchaseDate.substring(0, 10)
          : "",

        supplier:
          typeof editingPurchase.supplier === "object"
            ? editingPurchase.supplier?._id || ""
            : editingPurchase.supplier || "",

        restaurant:
          typeof editingPurchase.restaurant === "object"
            ? editingPurchase.restaurant?._id || ""
            : editingPurchase.restaurant || "",

        store:
          typeof editingPurchase.store === "object"
            ? editingPurchase.store?._id || ""
            : editingPurchase.store || "",

        warehouse:
          typeof editingPurchase.warehouse === "object"
            ? editingPurchase.warehouse?._id || ""
            : editingPurchase.warehouse || "",

        invoiceNumber: editingPurchase.invoiceNumber || "",

        invoiceDate: editingPurchase.invoiceDate
          ? editingPurchase.invoiceDate.substring(0, 10)
          : "",

        items:
          editingPurchase.items?.length > 0
            ? editingPurchase.items.map((item) => ({
                ingredient:
                  typeof item.ingredient === "object"
                    ? item.ingredient?._id || ""
                    : item.ingredient || "",

                // batch:
                //   typeof item.batch === "object"
                //     ? item.batch?._id || ""
                //     : item.batch || "",

                ingredientCode: item.ingredientCode || "",

                ingredientName: item.ingredientName || "",

                barcode: item.barcode || "",

                unit:
                  typeof item.unit === "object"
                    ? item.unit?._id || ""
                    : item.unit || "",

                purchaseUnit:
                  typeof item.purchaseUnit === "object"
                    ? item.purchaseUnit?._id || ""
                    : item.purchaseUnit || "",

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

        discountAmount: editingPurchase.discountAmount ?? 0,

        shippingCharge: editingPurchase.shippingCharge ?? 0,

        otherCharges: editingPurchase.otherCharges ?? 0,

        roundOffAmount: editingPurchase.roundOffAmount ?? 0,

        paidAmount: editingPurchase.paidAmount ?? 0,

        paymentMethod: editingPurchase.paymentMethod || "Cash",

        purchaseStatus: editingPurchase.purchaseStatus || "Received",

        remarks: editingPurchase.remarks || "",
      });
    } else {
      reset({
        ...initialForm,
        purchaseDate: new Date().toISOString().substring(0, 10),
      });
    }
  }, [editingPurchase, reset]);

  const handleIngredientChange = (index, ingredientId) => {
    const selectedIngredient = ingredientOptions.find(
      (ingredient) =>
        String(ingredient.value || ingredient._id) === String(ingredientId),
    );

    setValue(`items.${index}.ingredient`, ingredientId);

    if (selectedIngredient) {
      setValue(
        `items.${index}.ingredientName`,
        selectedIngredient.ingredientName ||
          selectedIngredient.name ||
          selectedIngredient.label ||
          "",
      );

      setValue(
        `items.${index}.ingredientCode`,
        selectedIngredient.ingredientCode || selectedIngredient.code || "",
      );

      setValue(`items.${index}.barcode`, selectedIngredient.barcode || "");

      if (selectedIngredient.unit) {
        setValue(
          `items.${index}.unit`,
          typeof selectedIngredient.unit === "object"
            ? selectedIngredient.unit._id
            : selectedIngredient.unit,
        );
      }

      if (selectedIngredient.purchaseUnit) {
        setValue(
          `items.${index}.purchaseUnit`,
          typeof selectedIngredient.purchaseUnit === "object"
            ? selectedIngredient.purchaseUnit._id
            : selectedIngredient.purchaseUnit,
        );
      }

      if (selectedIngredient.purchasePrice !== undefined) {
        setValue(
          `items.${index}.purchasePrice`,
          selectedIngredient.purchasePrice,
        );
      }

      if (selectedIngredient.sellingPrice !== undefined) {
        setValue(
          `items.${index}.sellingPrice`,
          selectedIngredient.sellingPrice,
        );
      }

      if (selectedIngredient.gstPercentage !== undefined) {
        setValue(
          `items.${index}.gstPercentage`,
          selectedIngredient.gstPercentage,
        );
      }
    }
  };

  const calculateItemTotal = (item) => {
    const quantity = Number(item?.quantity) || 0;
    const purchasePrice = Number(item?.purchasePrice) || 0;
    const discountPercentage = Number(item?.discountPercentage) || 0;
    const gstPercentage = Number(item?.gstPercentage) || 0;

    const gross = quantity * purchasePrice;
    const discount = (gross * discountPercentage) / 100;
    const taxable = gross - discount;
    const gst = (taxable * gstPercentage) / 100;

    return taxable + gst;
  };

  const calculateGrandTotal = () => {
    const itemsTotal = watchedItems.reduce(
      (sum, item) => sum + calculateItemTotal(item),
      0,
    );

    return (
      itemsTotal +
      Number(shippingCharge || 0) +
      Number(otherCharges || 0) -
      Number(discountAmount || 0) +
      Number(roundOffAmount || 0)
    );
  };

  const grandTotal = calculateGrandTotal();
  const dueAmount = grandTotal - Number(paidAmount || 0);

  const onFormSubmit = async (data) => {
    if (!data.restaurant || !String(data.restaurant).trim()) {
      console.log("Restaurant is missing:", data.restaurant);
      return;
    }

    if (!data.store || !String(data.store).trim()) {
      console.log("Store is missing:", data.store);
      return;
    }

    if (!data.supplier || !String(data.supplier).trim()) {
      console.log("Supplier is missing:", data.supplier);
      return;
    }

    const payload = {
      purchaseNo: data.purchaseNo?.trim(),

      purchaseDate: data.purchaseDate || undefined,

      supplier: String(data.supplier).trim(),

      restaurant: String(data.restaurant).trim(),

      store: String(data.store).trim(),

      warehouse: data.warehouse ? String(data.warehouse).trim() : undefined,

      invoiceNumber: data.invoiceNumber?.trim() || undefined,

      invoiceDate: data.invoiceDate || undefined,

      items: data.items.map((item) => ({
        ingredient: String(item.ingredient || "").trim(),

        // batch: item.batch ? String(item.batch).trim() : undefined,

        ingredientCode: item.ingredientCode?.trim() || undefined,

        ingredientName: item.ingredientName?.trim() || undefined,

        barcode: item.barcode?.trim() || undefined,

        unit: String(item.unit || "").trim(),

        purchaseUnit: item.purchaseUnit
          ? String(item.purchaseUnit).trim()
          : undefined,

        quantity: Number(item.quantity || 0),

        freeQuantity: Number(item.freeQuantity || 0),

        purchasePrice: Number(item.purchasePrice || 0),

        sellingPrice: Number(item.sellingPrice || 0),

        discountPercentage: Number(item.discountPercentage || 0),

        gstPercentage: Number(item.gstPercentage || 0),

        manufactureDate: item.manufactureDate || undefined,

        expiryDate: item.expiryDate || undefined,

        remarks: item.remarks?.trim() || undefined,
      })),

      discountAmount: Number(data.discountAmount || 0),

      shippingCharge: Number(data.shippingCharge || 0),

      otherCharges: Number(data.otherCharges || 0),

      roundOffAmount: Number(data.roundOffAmount || 0),

      paidAmount: Number(data.paidAmount || 0),

      paymentMethod: data.paymentMethod,

      purchaseStatus: data.purchaseStatus,

      remarks: data.remarks?.trim() || undefined,
    };

    console.log("FINAL UPDATE PURCHASE PAYLOAD:", payload);

    await onSubmit(payload);
  };

  return (
    <form className="purchase-form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="purchase-form-section">
        <h3>Purchase Information</h3>

        <div className="purchase-form-grid">
          <div className="form-group">
            <Input
              label="Purchase No"
              name="purchaseNo"
              type="text"
              placeholder="PUR001"
              register={register}
              error={errors.purchaseNo?.message}
              disabled={!!editingPurchase}
            />
          </div>

          <div className="form-group">
            <Input
              label="Purchase Date"
              name="purchaseDate"
              type="date"
              register={register}
              error={errors.purchaseDate?.message}
            />
          </div>

          <div className="form-group">
            <Select
              label="Supplier"
              name="supplier"
              register={register}
              error={errors.supplier?.message}
              options={supplierOptions}
              optionValue="value"
              optionLabel="label"
              required
            />
          </div>

          <div className="form-group">
            <Select
              label="Restaurant"
              name="restaurant"
              register={register}
              error={errors.restaurant?.message}
              options={restaurantOptions.map((restaurant) => ({
                _id: restaurant.value || restaurant._id,
                label:
                  restaurant.label ||
                  restaurant.value ||
                  restaurant.displayName ||
                  restaurant._id,
              }))}
            />
          </div>

          <div className="form-group">
            <Select
              label="Store"
              name="store"
              register={register}
              error={errors.store?.message}
              options={storeOptions}
              optionValue="value"
              optionLabel="label"
              required
            />
          </div>

          <div className="form-group">
            <Select
              label="Warehouse"
              name="warehouse"
              register={register}
              error={errors.warehouse?.message}
              options={warehouseOptions}
              optionValue="value"
              optionLabel="label"
            />
          </div>

          <div className="form-group">
            <Input
              label="Invoice Number"
              name="invoiceNumber"
              type="text"
              placeholder="INV001"
              register={register}
            />
          </div>

          <div className="form-group">
            <Input
              label="Invoice Date"
              name="invoiceDate"
              type="date"
              register={register}
            />
          </div>
        </div>
      </div>

      <div className="purchase-form-section">
        <div className="purchase-items-header">
          <h3>Purchase Items</h3>

          <button type="button" onClick={() => append({ ...emptyItem })}>
            + Add Item
          </button>
        </div>

        {fields.map((field, index) => (
          <div className="purchase-item-card" key={field.id}>
            <div className="purchase-item-title">
              <h4>Item {index + 1}</h4>

              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>

            <div className="purchase-form-grid">
              <div className="form-group">
                <Select
                  label="Ingredient"
                  name={`items.${index}.ingredient`}
                  register={register}
                  error={errors.items?.[index]?.ingredient?.message}
                  options={ingredientOptions}
                  optionValue="value"
                  optionLabel="label"
                  required
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <Input
                  label="Ingredient Name"
                  name={`items.${index}.ingredientName`}
                  type="text"
                  placeholder="Ingredient name"
                  register={register}
                />
              </div>

              <div className="form-group">
                <Input
                  label="Ingredient Code"
                  name={`items.${index}.ingredientCode`}
                  type="text"
                  placeholder="Code"
                  register={register}
                />
              </div>

              <div className="form-group">
                <Input
                  label="Barcode"
                  name={`items.${index}.barcode`}
                  type="text"
                  placeholder="Barcode"
                  register={register}
                />
              </div>

              <div className="form-group">
                <Select
                  label="Unit"
                  name={`items.${index}.unit`}
                  register={register}
                  error={errors.items?.[index]?.unit?.message}
                  options={unitOptions}
                  optionValue="value"
                  optionLabel="label"
                  required
                />
              </div>

              <div className="form-group">
                <Select
                  label="Purchase Unit"
                  name={`items.${index}.purchaseUnit`}
                  register={register}
                  options={purchaseUnitOptions}
                  optionValue="value"
                  optionLabel="label"
                />
              </div>

              {/* <div className="form-group">
                <Select
                  label="Batch"
                  name={`items.${index}.batch`}
                  register={register}
                  options={batchOptions}
                  optionValue="value"
                  optionLabel="label"
                />
              </div> */}

              <div className="form-group">
                <Input
                  label="Quantity"
                  name={`items.${index}.quantity`}
                  type="number"
                  min="0.0001"
                  step="0.0001"
                  register={register}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  label="Free Quantity"
                  name={`items.${index}.freeQuantity`}
                  type="number"
                  min="0"
                  register={register}
                />
              </div>

              <div className="form-group">
                <Input
                  label="Purchase Price"
                  name={`items.${index}.purchasePrice`}
                  type="number"
                  min="0"
                  step="0.01"
                  register={register}
                  required
                />
              </div>

              <div className="form-group">
                <Input
                  label="Selling Price"
                  name={`items.${index}.sellingPrice`}
                  type="number"
                  min="0"
                  step="0.01"
                  register={register}
                />
              </div>

              <div className="form-group">
                <Input
                  label="Discount Percentage"
                  name={`items.${index}.discountPercentage`}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  register={register}
                />
              </div>

              <div className="form-group">
                <Input
                  label="GST Percentage"
                  name={`items.${index}.gstPercentage`}
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  register={register}
                />
              </div>

              <div className="form-group">
                <Input
                  label="Manufacture Date"
                  name={`items.${index}.manufactureDate`}
                  type="date"
                  register={register}
                />
              </div>

              <div className="form-group">
                <Input
                  label="Expiry Date"
                  name={`items.${index}.expiryDate`}
                  type="date"
                  register={register}
                />
              </div>

              <div className="form-group full-width">
                <Input
                  label="Item Remarks"
                  name={`items.${index}.remarks`}
                  type="text"
                  placeholder="Item remarks"
                  register={register}
                />
              </div>
            </div>

            <div className="purchase-item-total">
              Item Total: ₹{calculateItemTotal(watchedItems[index]).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="purchase-form-section">
        <h3>Payment & Charges</h3>

        <div className="purchase-form-grid">
          <div className="form-group">
            <Input
              label="Discount Amount"
              name="discountAmount"
              type="number"
              min="0"
              step="0.01"
              register={register}
            />
          </div>

          <div className="form-group">
            <Input
              label="Shipping Charge"
              name="shippingCharge"
              type="number"
              min="0"
              step="0.01"
              register={register}
            />
          </div>

          <div className="form-group">
            <Input
              label="Other Charges"
              name="otherCharges"
              type="number"
              min="0"
              step="0.01"
              register={register}
            />
          </div>

          <div className="form-group">
            <Input
              label="Round Off"
              name="roundOffAmount"
              type="number"
              step="0.01"
              register={register}
            />
          </div>

          <div className="form-group">
            <Input
              label="Paid Amount"
              name="paidAmount"
              type="number"
              min="0"
              step="0.01"
              register={register}
            />
          </div>

          <div className="form-group">
            <Select
              label="Payment Method"
              name="paymentMethod"
              register={register}
              options={[
                { _id: "Cash", label: "Cash" },
                { _id: "Card", label: "Card" },
                { _id: "UPI", label: "UPI" },
                { _id: "Bank", label: "Bank" },
                { _id: "Cheque", label: "Cheque" },
                { _id: "Credit", label: "Credit" },
              ]}
            />
          </div>

          <div className="form-group">
            <Select
              label="Purchase Status"
              name="purchaseStatus"
              register={register}
              options={[
                { _id: "Draft", label: "Draft" },
                { _id: "Ordered", label: "Ordered" },
                { _id: "Received", label: "Received" },
                { _id: "Cancelled", label: "Cancelled" },
              ]}
            />
          </div>

          <div className="form-group full-width">
            <label>Remarks</label>

            <textarea
              {...register("remarks")}
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
          <strong>₹{Number(paidAmount || 0).toFixed(2)}</strong>
        </div>

        <div>
          <span>Due Amount</span>
          <strong>₹{dueAmount.toFixed(2)}</strong>
        </div>
      </div>

      <div className="purchase-form-actions">
        <CancelButton type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </CancelButton>

        <SaveButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingPurchase
              ? "Update Purchase"
              : "Create Purchase"}
        </SaveButton>
      </div>
    </form>
  );
};

export default PurchaseForm;
