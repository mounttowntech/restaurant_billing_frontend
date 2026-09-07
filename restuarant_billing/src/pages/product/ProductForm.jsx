import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./ProductForm.css";
import { CancelButton, SaveButton } from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import productValidation from "../../validation/productValidation";
import Select from "../../components/Common/Select";

const initialForm = {
  productCode: "",
  companyId: "",
  productName: "",
  description: "",
  category: "",
  store: "",
  restaurant: "",
  purchasePrice: 0,
  sellingPrice: 0,
  mrp: 0,

  taxPercentage: 0,
  taxInclusive: false,

  unit: "PCS",

  openingStock: 0,
  currentStock: 0,
  minimumStock: 0,
  trackInventory: true,

  productType: "Food",
  kitchenName: "",
  preparationTime: 0,

  image: "",

  isAvailable: true,
  isActive: true,
};

const ProductForm = ({
  editingProduct,
  onSubmit,
  stores = [],
  companies = [],
  restaurants = [],
  categories = [],
  storedRestaurant,
  storedStore,
  storedCompany,
  onCancel,
  loading = false,
  disabled = true,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productValidation),
    defaultValues: initialForm,
  });

  /* =========================================================
     LOAD EDIT DATA
  ========================================================= */

  useEffect(() => {
    if (editingProduct) {
      reset({
        companyId:
          typeof editingProduct.companyId === "object"
            ? editingProduct.companyId?._id || ""
            : editingProduct.companyId || "",

        restaurant:
          typeof editingProduct.restaurant === "object"
            ? editingProduct.restaurant?._id || ""
            : editingProduct.restaurant || editingProduct.restaurantId || "",

        productCode: editingProduct.productCode || "",
        productName: editingProduct.productName || "",
        description: editingProduct.description || "",

        category:
          typeof editingProduct.category === "object"
            ? editingProduct.category?._id || ""
            : editingProduct.category || "",

        store:
          editingProduct.store?._id ||
          editingProduct.store ||
          editingProduct.storeId ||
          "",

        purchasePrice: editingProduct.purchasePrice || 0,
        sellingPrice: editingProduct.sellingPrice || 0,
        mrp: editingProduct.mrp || 0,

        taxPercentage: editingProduct.taxPercentage || 0,
        taxInclusive: editingProduct.taxInclusive || false,

        unit: editingProduct.unit || "PCS",

        openingStock: editingProduct.openingStock || 0,
        currentStock: editingProduct.currentStock || 0,
        minimumStock: editingProduct.minimumStock || 0,
        trackInventory:
          editingProduct.trackInventory !== undefined
            ? editingProduct.trackInventory
            : true,

        productType: editingProduct.productType || "Food",
        kitchenName: editingProduct.kitchenName || "",
        preparationTime: editingProduct.preparationTime || 0,

        image: editingProduct.image || "",

        isAvailable:
          editingProduct.isAvailable !== undefined
            ? editingProduct.isAvailable
            : true,

        isActive:
          editingProduct.isActive !== undefined
            ? editingProduct.isActive
            : true,
      });
    } else {
      reset({
        ...initialForm,
        restaurant:
          storedRestaurant?._id ||
          storedRestaurant?.id ||
          storedRestaurant ||
          "",
        store: storedStore?._id || storedStore?.id || storedStore || "",
        companyId:
          storedCompany?._id || storedCompany?.id || storedCompany || "",
      });
    }
  }, [editingProduct, reset, storedRestaurant, storedStore, storedCompany]);

  /* =========================================================
     SUBMIT
  ========================================================= */
  const onFormSubmit = async (data) => {
    const payload = {
      productCode: data.productCode.trim(),
      // companyId: data.companyId?.trim(),
      productName: data.productName.trim(),

      description: data.description?.trim() || undefined,
      category: data.category?.trim() || undefined,

      storeId: data.store.trim(),

      purchasePrice: Number(data.purchasePrice || 0),
      sellingPrice: Number(data.sellingPrice || 0),
      mrp: Number(data.mrp || 0),

      taxPercentage: Number(data.taxPercentage || 0),
      taxInclusive: data.taxInclusive,

      unit: data.unit?.trim() || "PCS",

      openingStock: Number(data.openingStock || 0),
      currentStock: Number(data.currentStock || 0),
      minimumStock: Number(data.minimumStock || 0),
      trackInventory: data.trackInventory,

      productType: data.productType,
      kitchenName: data.kitchenName?.trim() || undefined,
      preparationTime: Number(data.preparationTime || 0),

      image: data.image?.trim() || undefined,

      isAvailable: data.isAvailable,
      isActive: data.isActive,
    };

    await onSubmit(payload);
  };

  const companyOptions = companies.map((item) => ({
    _id: item._id,
    label:
      item.companyName ||
      item.name ||
      item.companyCode ||
      item.companyId ||
      item._id,
  }));

  const restaurantOptions = restaurants.map((restaurant) => ({
    _id: restaurant._id,
    label:
      restaurant.restaurantName ||
      restaurant.name ||
      restaurant.displayName ||
      restaurant._id,
  }));

  return (
    <form className="product-form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="product-form-section">
        <h3>Basic Information</h3>

        <div className="product-form-grid">
          <div className="product-field">
            <Input
              label="Product Code"
              name="productCode"
              register={register}
              type="text"
              placeholder="PRD001"
              error={errors.productCode?.message}
            />
          </div>

          <div className="warehouse-field">
            <Select
              label="Restaurant"
              name="restaurant"
              register={register}
              error={errors.restaurant?.message}
              options={restaurantOptions}
              disableFild={disabled}
            />
          </div>

          <div className="product-field">
            <Select
              label="Company ID *"
              name="companyId"
              register={register}
              error={errors.companyId?.message}
              options={companyOptions}
              disableFild={disabled}
            />
          </div>

          <div className="product-field">
            <Input
              label="Product Name"
              name="productName"
              type="text"
              placeholder="Enter product name"
              register={register}
              error={errors.productName?.message}
            />
          </div>

          <div className="product-field">
            <Select
              label="Product Type"
              name="productType"
              register={register}
              error={errors.productType?.message}
              options={[
                { _id: "Food", label: "Food" },
                { _id: "Beverage", label: "Beverage" },
                { _id: "Addon", label: "Addon" },
                { _id: "Raw Material", label: "Raw Material" },
                { _id: "Other", label: "Other" },
              ]}
            />
          </div>

          <div className="product-field">
            <Select
              label="Category ID"
              name="category"
              register={register}
              error={errors.category?.message}
              options={categories.map((item) => ({
                _id: item._id,
                label:
                  item.categoryName ||
                  item.name ||
                  item.categoryCode ||
                  item._id,
              }))}
            />
          </div>

          <div className="product-field product-full-width">
            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Short description"
              register={register}
              error={errors.description?.message}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          STORE
      ===================================================== */}
      <div className="product-form-section">
        <h3>Store</h3>

        <div className="product-form-grid">
          <div className="product-field">
            <Select
              label="Store"
              name="store"
              register={register}
              error={errors.store?.message}
              options={stores.map((store) => ({
                _id: store._id,
                label: store.storeName || store.name || store._id,
              }))}
              disableFild={disabled}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          PRICING & TAX
      ===================================================== */}
      <div className="product-form-section">
        <h3>Pricing & Tax</h3>

        <div className="product-form-grid">
          <div className="product-field">
            <Input
              label="Purchase Price"
              name="purchasePrice"
              type="number"
              min="0"
              step="0.01"
              register={register}
              error={errors.purchasePrice?.message}
            />
          </div>

          <div className="product-field">
            <Input
              label="Selling Price"
              name="sellingPrice"
              type="number"
              min="0"
              step="0.01"
              register={register}
              error={errors.sellingPrice?.message}
            />
          </div>

          <div className="product-field">
            <Input
              label="MRP"
              name="mrp"
              type="number"
              min="0"
              step="0.01"
              register={register}
              error={errors.mrp?.message}
            />
          </div>

          <div className="product-field">
            <Input
              label="Tax Percentage"
              name="taxPercentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              register={register}
              error={errors.taxPercentage?.message}
            />
          </div>

          <div className="product-field product-checkbox-field">
            <label>
              <input type="checkbox" {...register("taxInclusive")} />
              Tax Inclusive
            </label>
          </div>

          <div className="product-field">
            <Input
              label="Unit"
              name="unit"
              type="text"
              placeholder="PCS, KG, LTR..."
              register={register}
              error={errors.unit?.message}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          INVENTORY
      ===================================================== */}
      <div className="product-form-section">
        <h3>Inventory</h3>

        <div className="product-form-grid">
          <div className="product-field">
            <Input
              label="Opening Stock"
              name="openingStock"
              type="number"
              min="0"
              register={register}
              error={errors.openingStock?.message}
            />
          </div>

          <div className="product-field">
            <Input
              label="Current Stock"
              name="currentStock"
              type="number"
              min="0"
              register={register}
              error={errors.currentStock?.message}
            />
          </div>

          <div className="product-field">
            <Input
              label="Minimum Stock"
              name="minimumStock"
              type="number"
              min="0"
              register={register}
              error={errors.minimumStock?.message}
            />
          </div>

          <div className="product-field product-checkbox-field">
            <label>
              <input type="checkbox" {...register("trackInventory")} />
              Track Inventory
            </label>
          </div>
        </div>
      </div>
      {/* =====================================================
          KITCHEN
      ===================================================== */}
      <div className="product-form-section">
        <h3>Kitchen</h3>

        <div className="product-form-grid">
          <div className="product-field">
            <Input
              label="Kitchen Name"
              name="kitchenName"
              type="text"
              placeholder="Main Kitchen"
              register={register}
              error={errors.kitchenName?.message}
            />
          </div>

          <div className="product-field">
            <Input
              label="Preparation Time (mins)"
              name="preparationTime"
              type="number"
              min="0"
              register={register}
              error={errors.preparationTime?.message}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          MEDIA
      ===================================================== */}
      <div className="product-form-section">
        <h3>Media</h3>

        <div className="product-form-grid">
          <div className="product-field product-full-width">
            <Input
              label="Image URL"
              name="image"
              type="text"
              placeholder="https://..."
              register={register}
              error={errors.image?.message}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          PRODUCT SETTINGS
      ===================================================== */}
      <div className="product-form-section">
        <h3>Product Settings</h3>

        <div className="product-form-grid">
          <div className="product-field product-checkbox-field">
            <label>
              <input type="checkbox" {...register("isAvailable")} />
              Available for Sale
            </label>
          </div>

          <div className="product-field product-checkbox-field">
            <label>
              <input type="checkbox" {...register("isActive")} />
              Active
            </label>
          </div>
        </div>
      </div>
      {/* =====================================================
          ACTIONS
      ===================================================== */}
      <div className="product-form-actions">
        <CancelButton
          type="button"
          className="product-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="product-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingProduct
              ? "Update Product"
              : "Create Product"}
        </SaveButton>
      </div>
    </form>
  );
};

export default ProductForm;
