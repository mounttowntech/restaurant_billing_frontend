import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SaveButton, CancelButton } from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

import "./IngredientStockLedgerForm.css";

const transactionTypeOptions = [
  { label: "Opening Stock", value: "Opening Stock" },
  { label: "Purchase", value: "Purchase" },
  {
    label: "Purchase Return",
    value: "Purchase Return",
  },
  {
    label: "Recipe Consumption",
    value: "Recipe Consumption",
  },
  { label: "Production", value: "Production" },
  {
    label: "Stock Adjustment",
    value: "Stock Adjustment",
  },
  {
    label: "Stock Transfer In",
    value: "Stock Transfer In",
  },
  {
    label: "Stock Transfer Out",
    value: "Stock Transfer Out",
  },
  {
    label: "Supplier Return",
    value: "Supplier Return",
  },
  {
    label: "Customer Return",
    value: "Customer Return",
  },
  { label: "Wastage", value: "Wastage" },
  { label: "Damage", value: "Damage" },
  { label: "Expired", value: "Expired" },
  { label: "Manual Entry", value: "Manual Entry" },
];

const referenceModelOptions = [
  { label: "Purchase", value: "Purchase" },
  {
    label: "Purchase Return",
    value: "PurchaseReturn",
  },
  { label: "Recipe", value: "Recipe" },
  {
    label: "Sales Invoice",
    value: "SalesInvoice",
  },
  {
    label: "Stock Adjustment",
    value: "StockAdjustment",
  },
  {
    label: "Stock Transfer",
    value: "StockTransfer",
  },
  {
    label: "Opening Stock",
    value: "OpeningStock",
  },
  { label: "Manual", value: "Manual" },
];

const statusOptions = [
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
  { label: "Cancelled", value: "Cancelled" },
];

const IngredientStockLedgerForm = ({
  initialData,
  loading,
  onSubmit,
  onClose,
  ingredientOptions = [],
  batchOptions = [],
  unitOptions = [],
  restaurantOptions = [],
  storeOptions = [],
  warehouseOptions = [],
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ledgerNo: "",
      ingredient: "",
      batch: "",
      unit: "",
      restaurant: "",
      store: "",
      warehouse: "",
      transactionType: "Opening Stock",
      referenceModel: "Manual",
      referenceId: "",
      referenceNo: "",
      stockIn: 0,
      stockOut: 0,
      balanceStock: 0,
      purchasePrice: 0,
      remarks: "",
      transactionDate: "",
      status: "Completed",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ledgerNo: initialData.ledgerNo || "",

        ingredient:
          typeof initialData.ingredient === "object"
            ? initialData.ingredient?._id
            : initialData.ingredient || "",

        batch:
          typeof initialData.batch === "object"
            ? initialData.batch?._id
            : initialData.batch || "",

        unit:
          typeof initialData.unit === "object"
            ? initialData.unit?._id
            : initialData.unit || "",

        restaurant:
          typeof initialData.restaurant === "object"
            ? initialData.restaurant?._id
            : initialData.restaurant || "",

        store:
          typeof initialData.store === "object"
            ? initialData.store?._id
            : initialData.store || "",

        warehouse:
          typeof initialData.warehouse === "object"
            ? initialData.warehouse?._id
            : initialData.warehouse || "",

        transactionType: initialData.transactionType || "Opening Stock",

        referenceModel: initialData.referenceModel || "Manual",

        referenceId:
          typeof initialData.referenceId === "object"
            ? initialData.referenceId?._id
            : initialData.referenceId || "",

        referenceNo: initialData.referenceNo || "",

        stockIn: initialData.stockIn ?? 0,

        stockOut: initialData.stockOut ?? 0,

        balanceStock: initialData.balanceStock ?? 0,

        purchasePrice: initialData.purchasePrice ?? 0,

        remarks: initialData.remarks || "",

        transactionDate: initialData.transactionDate
          ? new Date(initialData.transactionDate).toISOString().slice(0, 16)
          : "",

        status: initialData.status || "Completed",
      });
    } else {
      reset({
        ledgerNo: "",
        ingredient: "",
        batch: "",
        unit: "",
        restaurant: "",
        store: "",
        warehouse: "",
        transactionType: "Opening Stock",
        referenceModel: "Manual",
        referenceId: "",
        referenceNo: "",
        stockIn: 0,
        stockOut: 0,
        balanceStock: 0,
        purchasePrice: 0,
        remarks: "",
        transactionDate: "",
        status: "Completed",
      });
    }
  }, [initialData, reset]);

  const stockIn = watch("stockIn");
  const stockOut = watch("stockOut");
  const balanceStock = watch("balanceStock");
  const purchasePrice = watch("purchasePrice");

  useEffect(() => {
    const inStock = Number(stockIn || 0);
    const outStock = Number(stockOut || 0);

    if (!initialData) {
      setValue("balanceStock", Math.max(inStock - outStock, 0));
    }
  }, [stockIn, stockOut, setValue, initialData]);

  const totalValue = Number(balanceStock || 0) * Number(purchasePrice || 0);

  const submitForm = (data) => {
    const payload = {
      ...data,

      stockIn: Number(data.stockIn || 0),
      stockOut: Number(data.stockOut || 0),
      balanceStock: Number(data.balanceStock || 0),
      purchasePrice: Number(data.purchasePrice || 0),

      batch: data.batch || null,
      warehouse: data.warehouse || null,
      referenceId: data.referenceId || null,

      transactionDate: data.transactionDate || undefined,
    };

    onSubmit(payload);
  };

  return (
    <form
      className="ingredient-stock-ledger-form"
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="ingredient-stock-ledger-form-grid">
        <Input
          label="Ledger No"
          name="ledgerNo"
          register={register}
          error={errors.ledgerNo?.message}
          placeholder="Enter ledger number"
          required
        />

        <Select
          label="Ingredient"
          name="ingredient"
          register={register}
          error={errors.ingredient?.message}
          options={ingredientOptions}
          required
        />

        <Select
          label="Batch"
          name="batch"
          register={register}
          error={errors.batch?.message}
          options={batchOptions}
        />

        <Select
          label="Unit"
          name="unit"
          register={register}
          error={errors.unit?.message}
          options={unitOptions}
          required
        />

        <Select
          label="Restaurant"
          name="restaurant"
          register={register}
          error={errors.restaurant?.message}
          options={restaurantOptions}
          required
        />

        <Select
          label="Store"
          name="store"
          register={register}
          error={errors.store?.message}
          options={storeOptions}
          required
        />

        <Select
          label="Warehouse"
          name="warehouse"
          register={register}
          error={errors.warehouse?.message}
          options={warehouseOptions}
        />

        <Select
          label="Transaction Type"
          name="transactionType"
          register={register}
          error={errors.transactionType?.message}
          options={transactionTypeOptions}
          required
        />

        <Select
          label="Reference Model"
          name="referenceModel"
          register={register}
          error={errors.referenceModel?.message}
          options={referenceModelOptions}
        />

        <Input
          label="Reference ID"
          name="referenceId"
          register={register}
          error={errors.referenceId?.message}
          placeholder="Enter reference ID"
        />

        <Input
          label="Reference No"
          name="referenceNo"
          register={register}
          error={errors.referenceNo?.message}
          placeholder="Enter reference number"
        />

        <Input
          label="Stock In"
          name="stockIn"
          type="number"
          register={register}
          error={errors.stockIn?.message}
          placeholder="0"
          min="0"
          step="0.01"
        />

        <Input
          label="Stock Out"
          name="stockOut"
          type="number"
          register={register}
          error={errors.stockOut?.message}
          placeholder="0"
          min="0"
          step="0.01"
        />

        <Input
          label="Balance Stock"
          name="balanceStock"
          type="number"
          register={register}
          error={errors.balanceStock?.message}
          placeholder="0"
          min="0"
          step="0.01"
        />

        <Input
          label="Purchase Price"
          name="purchasePrice"
          type="number"
          register={register}
          error={errors.purchasePrice?.message}
          placeholder="0.00"
          min="0"
          step="0.01"
        />

        <Input
          label="Total Value"
          name="totalValue"
          type="number"
          value={totalValue.toFixed(2)}
          readOnly
        />

        <Input
          label="Transaction Date"
          name="transactionDate"
          type="datetime-local"
          register={register}
          error={errors.transactionDate?.message}
        />

        <Select
          label="Status"
          name="status"
          register={register}
          error={errors.status?.message}
          options={statusOptions}
        />

        <div className="ingredient-stock-ledger-form-full">
          <Input
            label="Remarks"
            name="remarks"
            register={register}
            error={errors.remarks?.message}
            placeholder="Enter remarks"
          />
        </div>
      </div>

      <div className="ingredient-stock-ledger-form-actions">
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>

        <SaveButton type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update " : "Create "}
        </SaveButton>
      </div>
    </form>
  );
};

export default IngredientStockLedgerForm;
