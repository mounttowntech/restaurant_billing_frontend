import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";
import { AddButton, CancelButton } from "../../components/Common/Button";

import "./IngredientForm.css";

const IngredientForm = ({
  onSubmit,
  initialData = null,
  loading = false,
  onClose,
  storeOptions = [],
  restaurantOptions = [],
  categoryOptions = [],
  supplierOptions = [],
  unitOptions = [],
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      restaurant: "",
      store: "",
      ingredientCode: "",
      ingredientName: "",
      displayName: "",
      category: "",
      supplier: "",
      unit: "",
      purchaseUnit: "",
      purchaseUnitConversion: 1,
      barcode: "",
      hsnCode: "",
      gstPercentage: 5,
      purchasePrice: 0,
      lastPurchasePrice: 0,
      averageCost: 0,
      sellingPrice: 0,
      currentStock: 0,
      minimumStock: 0,
      maximumStock: 0,
      reorderLevel: 0,
      storageLocation: "",
      expiryApplicable: false,
      shelfLifeDays: 0,
      isVeg: true,
      isPerishable: false,
      isAvailable: true,
      isActive: true,
      remarks: "",
    },
  });

  const expiryApplicable = watch("expiryApplicable");

  useEffect(() => {
    if (initialData) {
      reset({
        restaurant: initialData.restaurant?._id || initialData.restaurant || "",
        store: initialData.store?._id || initialData.store || "",
        ingredientCode: initialData.ingredientCode || "",
        ingredientName: initialData.ingredientName || "",
        displayName: initialData.displayName || "",
        category: initialData.category?._id || initialData.category || "",
        supplier: initialData.supplier?._id || initialData.supplier || "",
        unit: initialData.unit?._id || initialData.unit || "",
        purchaseUnit:
          initialData.purchaseUnit?._id || initialData.purchaseUnit || "",
        purchaseUnitConversion: initialData.purchaseUnitConversion ?? 1,
        barcode: initialData.barcode || "",
        hsnCode: initialData.hsnCode || "",
        gstPercentage: initialData.gstPercentage ?? 5,
        purchasePrice: initialData.purchasePrice ?? 0,
        lastPurchasePrice: initialData.lastPurchasePrice ?? 0,
        averageCost: initialData.averageCost ?? 0,
        sellingPrice: initialData.sellingPrice ?? 0,
        currentStock: initialData.currentStock ?? 0,
        minimumStock: initialData.minimumStock ?? 0,
        maximumStock: initialData.maximumStock ?? 0,
        reorderLevel: initialData.reorderLevel ?? 0,
        storageLocation: initialData.storageLocation || "",
        expiryApplicable: initialData.expiryApplicable ?? false,
        shelfLifeDays: initialData.shelfLifeDays ?? 0,
        isVeg: initialData.isVeg ?? true,
        isPerishable: initialData.isPerishable ?? false,
        isAvailable: initialData.isAvailable ?? true,
        isActive: initialData.isActive ?? true,
        remarks: initialData.remarks || "",
      });
    }
  }, [initialData, reset]);

  const submitHandler = (data) => {
    const payload = {
      ...data,
      restaurant: data.restaurant,

      unit: data.unit,

      purchaseUnit: data.purchaseUnit || null,

      category: data.category,

      supplier: data.supplier,

      purchaseUnitConversion: Number(data.purchaseUnitConversion || 1),

      gstPercentage: Number(data.gstPercentage || 0),

      purchasePrice: Number(data.purchasePrice || 0),

      lastPurchasePrice: Number(data.lastPurchasePrice || 0),

      averageCost: Number(data.averageCost || 0),

      sellingPrice: Number(data.sellingPrice || 0),

      currentStock: Number(data.currentStock || 0),

      minimumStock: Number(data.minimumStock || 0),

      maximumStock: Number(data.maximumStock || 0),

      reorderLevel: Number(data.reorderLevel || 0),

      shelfLifeDays: Number(data.shelfLifeDays || 0),

      expiryApplicable: Boolean(data.expiryApplicable),

      isVeg: Boolean(data.isVeg),

      isPerishable: Boolean(data.isPerishable),

      isAvailable: Boolean(data.isAvailable),

      isActive: Boolean(data.isActive),
    };

    onSubmit(payload);
  };

  return (
    <form className="ingredient-form" onSubmit={handleSubmit(submitHandler)}>
      <div className="ingredient-form-section">
        <h3 className="ingredient-form-section-title">Basic Information</h3>

        <div className="ingredient-form-grid">
          <Select
            label="Restaurant Code *"
            name="restaurant"
            register={register}
            error={errors.restaurant?.message}
            options={restaurantOptions}
            optionValue="value"
            optionLabel="label"
            required
          />

          <Select
            label="Store"
            name="store"
            register={register}
            error={errors.store?.message}
            options={storeOptions}
            optionValue="value"
            optionLabel="label"
          />

          <Input
            label="Ingredient Code"
            name="ingredientCode"
            register={register}
            error={errors.ingredientCode?.message}
            placeholder="Enter ingredient code"
          />

          <Input
            label="Ingredient Name"
            name="ingredientName"
            register={register}
            error={errors.ingredientName?.message}
            placeholder="Enter ingredient name"
          />

          <Input
            label="Display Name"
            name="displayName"
            register={register}
            error={errors.displayName?.message}
            placeholder="Enter display name"
          />

          <Select
            label="Category"
            name="category"
            register={register}
            error={errors.category?.message}
            options={categoryOptions}
            optionValue="value"
            optionLabel="label"
          />

          <Select
            label="Supplier"
            name="supplier"
            register={register}
            error={errors.supplier?.message}
            options={supplierOptions}
            optionValue="value"
            optionLabel="label"
          />
        </div>
      </div>

      <div className="ingredient-form-section">
        <h3 className="ingredient-form-section-title">Units</h3>

        <div className="ingredient-form-grid">
          <Select
            label="Stock Unit *"
            name="unit"
            register={register}
            error={errors.unit?.message}
            options={unitOptions}
            optionValue="value"
            optionLabel="label"
            required
          />

          <Select
            label="Purchase Unit"
            name="purchaseUnit"
            register={register}
            error={errors.purchaseUnit?.message}
            options={[
              {
                label: "Same as Stock Unit",
                value: "",
              },
              ...unitOptions,
            ]}
          />

          <Input
            label="Purchase Unit Conversion"
            name="purchaseUnitConversion"
            type="number"
            register={register}
            error={errors.purchaseUnitConversion?.message}
            placeholder="1"
          />
        </div>
      </div>

      <div className="ingredient-form-section">
        <h3 className="ingredient-form-section-title">Barcode & Tax</h3>

        <div className="ingredient-form-grid">
          <Input
            label="Barcode"
            name="barcode"
            register={register}
            error={errors.barcode?.message}
            placeholder="Enter barcode"
          />

          <Input
            label="HSN Code"
            name="hsnCode"
            register={register}
            error={errors.hsnCode?.message}
            placeholder="Enter HSN code"
          />

          <Input
            label="GST Percentage"
            name="gstPercentage"
            type="number"
            register={register}
            error={errors.gstPercentage?.message}
            placeholder="5"
          />
        </div>
      </div>

      <div className="ingredient-form-section">
        <h3 className="ingredient-form-section-title">Pricing</h3>

        <div className="ingredient-form-grid">
          <Input
            label="Purchase Price"
            name="purchasePrice"
            type="number"
            register={register}
            error={errors.purchasePrice?.message}
            placeholder="0"
          />

          <Input
            label="Last Purchase Price"
            name="lastPurchasePrice"
            type="number"
            register={register}
            error={errors.lastPurchasePrice?.message}
            placeholder="0"
          />

          <Input
            label="Average Cost"
            name="averageCost"
            type="number"
            register={register}
            error={errors.averageCost?.message}
            placeholder="0"
          />

          <Input
            label="Selling Price"
            name="sellingPrice"
            type="number"
            register={register}
            error={errors.sellingPrice?.message}
            placeholder="0"
          />
        </div>
      </div>

      <div className="ingredient-form-section">
        <h3 className="ingredient-form-section-title">Stock</h3>

        <div className="ingredient-form-grid">
          <Input
            label="Current Stock"
            name="currentStock"
            type="number"
            register={register}
            error={errors.currentStock?.message}
            placeholder="0"
          />

          <Input
            label="Minimum Stock"
            name="minimumStock"
            type="number"
            register={register}
            error={errors.minimumStock?.message}
            placeholder="0"
          />

          <Input
            label="Maximum Stock"
            name="maximumStock"
            type="number"
            register={register}
            error={errors.maximumStock?.message}
            placeholder="0"
          />

          <Input
            label="Reorder Level"
            name="reorderLevel"
            type="number"
            register={register}
            error={errors.reorderLevel?.message}
            placeholder="0"
          />

          <Input
            label="Storage Location"
            name="storageLocation"
            register={register}
            error={errors.storageLocation?.message}
            placeholder="Enter storage location"
          />
        </div>
      </div>

      <div className="ingredient-form-section">
        <h3 className="ingredient-form-section-title">
          Expiry & Food Information
        </h3>

        <div className="ingredient-form-grid">
          <label className="ingredient-checkbox">
            <input type="checkbox" {...register("expiryApplicable")} />
            <span>Expiry Applicable</span>
          </label>

          {expiryApplicable && (
            <Input
              label="Shelf Life Days"
              name="shelfLifeDays"
              type="number"
              register={register}
              error={errors.shelfLifeDays?.message}
              placeholder="0"
            />
          )}

          <label className="ingredient-checkbox">
            <input type="checkbox" {...register("isVeg")} />
            <span>Vegetarian</span>
          </label>

          <label className="ingredient-checkbox">
            <input type="checkbox" {...register("isPerishable")} />
            <span>Perishable</span>
          </label>

          <label className="ingredient-checkbox">
            <input type="checkbox" {...register("isAvailable")} />
            <span>Available</span>
          </label>

          <label className="ingredient-checkbox">
            <input type="checkbox" {...register("isActive")} />
            <span>Active</span>
          </label>
        </div>
      </div>

      <div className="ingredient-form-section">
        <h3 className="ingredient-form-section-title">Remarks</h3>

        <div className="ingredient-form-grid full">
          <Input
            label="Remarks"
            name="remarks"
            register={register}
            error={errors.remarks?.message}
            placeholder="Enter remarks"
          />
        </div>
      </div>

      <div className="ingredient-form-actions">
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>

        <AddButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save "}
        </AddButton>
      </div>
    </form>
  );
};

export default IngredientForm;
