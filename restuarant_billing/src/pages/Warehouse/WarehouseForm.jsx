import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "./WarehouseForm.css";

import { CancelButton, SaveButton } from "../../components/Common/Button";

import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

const initialForm = {
  restaurant: "",
  store: "",

  warehouseCode: "",
  warehouseName: "",

  warehouseType: "General",

  manager: "",

  contactPerson: "",
  phone: "",
  email: "",

  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",

  capacity: 0,
  capacityUnit: "Piece",

  isDefault: false,
  isActive: true,

  description: "",
  remarks: "",
};

const WarehouseForm = ({
  editingWarehouse,
  onSubmit,
  warehouses = [],
  restaurants = [],
  stores = [],
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  const selectedRestaurant = watch("restaurant");

  // ==========================================================
  // EDIT WAREHOUSE
  // ==========================================================

  useEffect(() => {
    if (!editingWarehouse) {
      return;
    }

    const selectedWarehouse = warehouses.find(
      (warehouse) =>
        warehouse._id === editingWarehouse._id ||
        warehouse._id === editingWarehouse.id ||
        warehouse.warehouseCode === editingWarehouse.warehouseCode,
    );

    if (!selectedWarehouse) {
      return;
    }

    setValue(
      "restaurant",
      typeof selectedWarehouse.restaurant === "object"
        ? selectedWarehouse.restaurant?._id || ""
        : selectedWarehouse.restaurant || "",
    );

    setValue(
      "store",
      typeof selectedWarehouse.store === "object"
        ? selectedWarehouse.store?._id || ""
        : selectedWarehouse.store || "",
    );

    setValue("warehouseCode", selectedWarehouse.warehouseCode || "");

    setValue("warehouseName", selectedWarehouse.warehouseName || "");

    setValue("warehouseType", selectedWarehouse.warehouseType || "General");

    setValue(
      "manager",
      typeof selectedWarehouse.manager === "object"
        ? selectedWarehouse.manager?._id || ""
        : selectedWarehouse.manager || "",
    );

    setValue("contactPerson", selectedWarehouse.contactPerson || "");

    setValue("phone", selectedWarehouse.phone || "");

    setValue("email", selectedWarehouse.email || "");

    setValue("address", selectedWarehouse.address || "");

    setValue("city", selectedWarehouse.city || "");

    setValue("state", selectedWarehouse.state || "");

    setValue("country", selectedWarehouse.country || "India");

    setValue("pincode", selectedWarehouse.pincode || "");

    setValue("capacity", selectedWarehouse.capacity ?? 0);

    setValue("capacityUnit", selectedWarehouse.capacityUnit || "Piece");

    setValue("isDefault", selectedWarehouse.isDefault ?? false);

    setValue("isActive", selectedWarehouse.isActive ?? true);

    setValue("description", selectedWarehouse.description || "");

    setValue("remarks", selectedWarehouse.remarks || "");
  }, [editingWarehouse, warehouses, setValue]);

  // ==========================================================
  // WAREHOUSE OPTIONS
  // ==========================================================

  const warehouseOptions = warehouses.map((warehouse) => ({
    _id: warehouse._id,
    label:
      warehouse.warehouseName ||
      warehouse.name ||
      warehouse.displayName ||
      warehouse.warehouseCode ||
      warehouse.code ||
      warehouse._id,
  }));

  // ==========================================================
  // RESTAURANT OPTIONS
  // ==========================================================

  const restaurantOptions = restaurants.map((restaurant) => ({
    _id: restaurant._id,
    label:
      restaurant.restaurantName ||
      restaurant.name ||
      restaurant.displayName ||
      restaurant._id,
  }));

  // ==========================================================
  // STORE OPTIONS
  // ==========================================================

  const filteredStores = selectedRestaurant
    ? stores.filter((store) => {
        const restaurantId =
          typeof store.restaurant === "object"
            ? store.restaurant?._id
            : store.restaurant;

        return restaurantId?.toString() === selectedRestaurant?.toString();
      })
    : stores;

  const storeOptions = filteredStores.map((store) => ({
    _id: store._id,
    label:
      store.storeName ||
      store.name ||
      store.title ||
      store.storeCode ||
      store._id,
  }));

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const onFormSubmit = async (data) => {
    const payload = {
      restaurant: data.restaurant?.trim(),

      store: data.store?.trim(),

      warehouseCode: data.warehouseCode?.trim().toUpperCase(),

      warehouseName: data.warehouseName?.trim(),

      warehouseType: data.warehouseType,

      manager: data.manager?.trim() || null,

      contactPerson: data.contactPerson?.trim() || "",

      phone: data.phone?.trim() || "",

      email: data.email?.trim() || "",

      address: data.address?.trim() || "",

      city: data.city?.trim() || "",

      state: data.state?.trim() || "",

      country: data.country?.trim() || "India",

      pincode: data.pincode?.trim() || "",

      capacity: Number(data.capacity || 0),

      capacityUnit: data.capacityUnit,

      isDefault: Boolean(data.isDefault),

      isActive: Boolean(data.isActive),

      description: data.description?.trim() || "",

      remarks: data.remarks?.trim() || "",
    };

    console.log("WAREHOUSE FORM DATA:", data);
    console.log("WAREHOUSE PAYLOAD:", payload);

    await onSubmit(payload);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <form className="warehouse-form" onSubmit={handleSubmit(onFormSubmit)}>
      {/* ======================================================
          BASIC INFORMATION
      ====================================================== */}

      <div className="warehouse-form-section">
        <h3>Basic Information</h3>

        <div className="warehouse-form-grid">
          {/* RESTAURANT */}

          <div className="warehouse-field">
            <Select
              label="Restaurant"
              name="restaurant"
              register={register}
              error={errors.restaurant?.message}
              options={restaurantOptions}
            />
          </div>

          {/* STORE */}

          <div className="warehouse-field">
            <Select
              label="Store"
              name="store"
              register={register}
              error={errors.store?.message}
              options={storeOptions}
            />
          </div>

          {/* WAREHOUSE CODE */}

          <div className="warehouse-field">
            <Input
              label="Warehouse Code"
              name="warehouseCode"
              type="text"
              placeholder="WH001"
              register={register}
              error={errors.warehouseCode?.message}
            />
          </div>

          {/* WAREHOUSE NAME */}

          <div className="warehouse-field">
            <Input
              label="Warehouse Name"
              name="warehouseName"
              type="text"
              placeholder="Main Warehouse"
              register={register}
              error={errors.warehouseName?.message}
            />
          </div>

          {/* WAREHOUSE TYPE */}

          <div className="warehouse-field">
            <Select
              label="Warehouse Type"
              name="warehouseType"
              register={register}
              error={errors.warehouseType?.message}
              options={[
                {
                  _id: "Main",
                  label: "Main",
                },
                {
                  _id: "Raw Material",
                  label: "Raw Material",
                },
                {
                  _id: "Finished Goods",
                  label: "Finished Goods",
                },
                {
                  _id: "Cold Storage",
                  label: "Cold Storage",
                },
                {
                  _id: "Dry Storage",
                  label: "Dry Storage",
                },
                {
                  _id: "General",
                  label: "General",
                },
                {
                  _id: "Other",
                  label: "Other",
                },
              ]}
            />
          </div>

          {/* MANAGER */}

          <div className="warehouse-field">
            <Input
              label="Manager ID"
              name="manager"
              type="text"
              placeholder="Enter Manager ObjectId"
              register={register}
              error={errors.manager?.message}
            />
          </div>

          {/* CONTACT PERSON */}

          <div className="warehouse-field">
            <Input
              label="Contact Person"
              name="contactPerson"
              type="text"
              placeholder="Contact person"
              register={register}
              error={errors.contactPerson?.message}
            />
          </div>

          {/* PHONE */}

          <div className="warehouse-field">
            <Input
              label="Phone"
              name="phone"
              type="text"
              placeholder="Phone number"
              register={register}
              error={errors.phone?.message}
            />
          </div>

          {/* EMAIL */}

          <div className="warehouse-field">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="warehouse@example.com"
              register={register}
              error={errors.email?.message}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          CAPACITY
      ====================================================== */}

      <div className="warehouse-form-section">
        <h3>Capacity</h3>

        <div className="warehouse-form-grid">
          <div className="warehouse-field">
            <Input
              label="Capacity"
              name="capacity"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              register={register}
              error={errors.capacity?.message}
            />
          </div>

          <div className="warehouse-field">
            <Select
              label="Capacity Unit"
              name="capacityUnit"
              register={register}
              error={errors.capacityUnit?.message}
              options={[
                { _id: "Piece", label: "Piece" },
                { _id: "Kg", label: "Kg" },
                { _id: "Gram", label: "Gram" },
                { _id: "Liter", label: "Liter" },
                { _id: "ML", label: "ML" },
                { _id: "Box", label: "Box" },
                { _id: "Packet", label: "Packet" },
                { _id: "Pallet", label: "Pallet" },
                { _id: "Other", label: "Other" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          ADDRESS
      ====================================================== */}

      <div className="warehouse-form-section">
        <h3>Address Information</h3>

        <div className="warehouse-form-grid">
          <div className="warehouse-field">
            <Input
              label="City"
              name="city"
              type="text"
              placeholder="City"
              register={register}
              error={errors.city?.message}
            />
          </div>

          <div className="warehouse-field">
            <Input
              label="State"
              name="state"
              type="text"
              placeholder="State"
              register={register}
              error={errors.state?.message}
            />
          </div>

          <div className="warehouse-field">
            <Input
              label="Country"
              name="country"
              type="text"
              placeholder="Country"
              register={register}
              error={errors.country?.message}
            />
          </div>

          <div className="warehouse-field">
            <Input
              label="Pincode"
              name="pincode"
              type="text"
              placeholder="Pincode"
              register={register}
              error={errors.pincode?.message}
            />
          </div>

          <div className="warehouse-field warehouse-full-width">
            <Input
              label="Address"
              name="address"
              type="text"
              placeholder="Warehouse address"
              register={register}
              error={errors.address?.message}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          DESCRIPTION
      ====================================================== */}

      <div className="warehouse-form-section">
        <h3>Description & Remarks</h3>

        <div className="warehouse-form-grid">
          <div className="warehouse-field warehouse-full-width">
            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Warehouse description"
              register={register}
              error={errors.description?.message}
            />
          </div>

          <div className="warehouse-field warehouse-full-width">
            <Input
              label="Remarks"
              name="remarks"
              type="text"
              placeholder="Remarks"
              register={register}
              error={errors.remarks?.message}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          WAREHOUSE SETTINGS
      ====================================================== */}

      <div className="warehouse-form-section">
        <h3>Warehouse Settings</h3>

        <div className="warehouse-form-grid">
          <div className="warehouse-checkbox-field">
            <label>
              <input type="checkbox" {...register("isDefault")} />
              Set as Default Warehouse
            </label>
          </div>

          <div className="warehouse-checkbox-field">
            <label>
              <input type="checkbox" {...register("isActive")} />
              Active
            </label>
          </div>
        </div>
      </div>

      {/* ======================================================
          ACTIONS
      ====================================================== */}

      <div className="warehouse-form-actions">
        <CancelButton
          type="button"
          className="warehouse-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="warehouse-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingWarehouse
              ? "Update Warehouse"
              : "Create Warehouse"}
        </SaveButton>
      </div>
    </form>
  );
};

export default WarehouseForm;
