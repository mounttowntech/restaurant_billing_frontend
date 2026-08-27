import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "./StoreForm.css";

import { CancelButton, SaveButton } from "../../components/Common/Button";

import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

const initialForm = {
  restaurant: "",

  storeCode: "",
  storeName: "",
  branchName: "",
  managerName: "",

  email: "",
  phone: "",
  alternatePhone: "",

  gstNumber: "",
  fssaiNumber: "",

  address: "",
  area: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",

  latitude: "",
  longitude: "",

  openingTime: "09:00",
  closingTime: "23:00",

  totalTables: 0,
  totalSeats: 0,
  serviceChargePercentage: 0,

  gstEnabled: true,
  serviceChargeEnabled: false,
  dineInEnabled: true,
  takeawayEnabled: true,
  deliveryEnabled: true,
  onlineOrderEnabled: false,

  printerName: "",
  kitchenPrinter: "",
  billingPrinter: "",
  logo: "",

  status: "Active",
};

const StoreForm = ({
  editingStore,
  onSubmit,
  restaurants = [],
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  // =====================================================
  // LOAD EDIT DATA
  // =====================================================

  useEffect(() => {
    if (editingStore) {
      reset({
        restaurant:
          typeof editingStore.restaurant === "object"
            ? editingStore.restaurant?._id || ""
            : editingStore.restaurant || "",

        storeCode: editingStore.storeCode || "",

        storeName: editingStore.storeName || "",

        branchName: editingStore.branchName || "",

        managerName: editingStore.managerName || "",

        email: editingStore.email || "",

        phone: editingStore.phone || "",

        alternatePhone: editingStore.alternatePhone || "",

        gstNumber: editingStore.gstNumber || "",

        fssaiNumber: editingStore.fssaiNumber || "",

        address: editingStore.address || "",

        area: editingStore.area || "",

        city: editingStore.city || "",

        state: editingStore.state || "",

        country: editingStore.country || "India",

        pincode: editingStore.pincode || "",

        latitude: editingStore.latitude ?? "",

        longitude: editingStore.longitude ?? "",

        openingTime: editingStore.openingTime || "09:00",

        closingTime: editingStore.closingTime || "23:00",

        totalTables: editingStore.totalTables ?? 0,

        totalSeats: editingStore.totalSeats ?? 0,

        serviceChargePercentage: editingStore.serviceChargePercentage ?? 0,

        gstEnabled: editingStore.gstEnabled ?? true,

        serviceChargeEnabled: editingStore.serviceChargeEnabled ?? false,

        dineInEnabled: editingStore.dineInEnabled ?? true,

        takeawayEnabled: editingStore.takeawayEnabled ?? true,

        deliveryEnabled: editingStore.deliveryEnabled ?? true,

        onlineOrderEnabled: editingStore.onlineOrderEnabled ?? false,

        printerName: editingStore.printerName || "",

        kitchenPrinter: editingStore.kitchenPrinter || "",

        billingPrinter: editingStore.billingPrinter || "",

        logo: editingStore.logo || "",

        status: editingStore.status || "Active",
      });
    } else {
      reset(initialForm);
    }
  }, [editingStore, reset]);

  // =====================================================
  // SUBMIT
  // =====================================================

  const onFormSubmit = async (data) => {
    const payload = {
      restaurant: data.restaurant?.trim(),

      storeCode: data.storeCode?.trim(),

      storeName: data.storeName?.trim(),

      branchName: data.branchName?.trim() || "",

      managerName: data.managerName?.trim() || "",

      email: data.email?.trim() || "",

      phone: data.phone?.trim(),

      alternatePhone: data.alternatePhone?.trim() || "",

      gstNumber: data.gstNumber?.trim() || "",

      fssaiNumber: data.fssaiNumber?.trim() || "",

      address: data.address?.trim() || "",

      area: data.area?.trim() || "",

      city: data.city?.trim() || "",

      state: data.state?.trim() || "",

      country: data.country?.trim() || "India",

      pincode: data.pincode?.trim() || "",

      latitude: data.latitude === "" ? "" : Number(data.latitude),

      longitude: data.longitude === "" ? "" : Number(data.longitude),

      openingTime: data.openingTime || "09:00",

      closingTime: data.closingTime || "23:00",

      totalTables: Number(data.totalTables || 0),

      totalSeats: Number(data.totalSeats || 0),

      serviceChargePercentage: Number(data.serviceChargePercentage || 0),

      gstEnabled: Boolean(data.gstEnabled),

      serviceChargeEnabled: Boolean(data.serviceChargeEnabled),

      dineInEnabled: Boolean(data.dineInEnabled),

      takeawayEnabled: Boolean(data.takeawayEnabled),

      deliveryEnabled: Boolean(data.deliveryEnabled),

      onlineOrderEnabled: Boolean(data.onlineOrderEnabled),

      printerName: data.printerName?.trim() || "",

      kitchenPrinter: data.kitchenPrinter?.trim() || "",

      billingPrinter: data.billingPrinter?.trim() || "",

      logo: data.logo?.trim() || "",

      status: data.status || "Active",
    };

    await onSubmit(payload);
  };

  return (
    <form className="store-form" onSubmit={handleSubmit(onFormSubmit)}>
      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <div className="store-form-section">
        <h3 className="store-form-section-title">Basic Information</h3>

        <div className="store-form-grid">
          <div className="store-field">
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
          </div>

          <div className="store-field">
            <Input
              label="Store Code"
              name="storeCode"
              type="text"
              placeholder="STORE001"
              register={register}
              error={errors.storeCode?.message}
              disabled={!!editingStore}
            />

            {editingStore && <small>Store code cannot be changed</small>}
          </div>

          <div className="store-field">
            <Input
              label="Store Name"
              name="storeName"
              type="text"
              placeholder="Enter store name"
              register={register}
              error={errors.storeName?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Branch Name"
              name="branchName"
              type="text"
              placeholder="Enter branch name"
              register={register}
              error={errors.branchName?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Manager Name"
              name="managerName"
              type="text"
              placeholder="Manager name"
              register={register}
              error={errors.managerName?.message}
            />
          </div>

          <div className="store-field">
            <Select
              label="Status"
              name="status"
              register={register}
              error={errors.status?.message}
              options={[
                {
                  _id: "Active",
                  label: "Active",
                },
                {
                  _id: "Inactive",
                  label: "Inactive",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <div className="store-form-section">
        <h3 className="store-form-section-title">Contact Information</h3>

        <div className="store-form-grid">
          <div className="store-field">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="store@email.com"
              register={register}
              error={errors.email?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Phone"
              name="phone"
              type="text"
              maxLength={10}
              placeholder="9876543210"
              register={register}
              error={errors.phone?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Alternate Phone"
              name="alternatePhone"
              type="text"
              maxLength={10}
              placeholder="Alternate phone"
              register={register}
              error={errors.alternatePhone?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          TAX INFORMATION
      ===================================================== */}

      <div className="store-form-section">
        <h3 className="store-form-section-title">Tax Information</h3>

        <div className="store-form-grid">
          <div className="store-field">
            <Input
              label="GST Number"
              name="gstNumber"
              type="text"
              placeholder="GST number"
              register={register}
              error={errors.gstNumber?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="FSSAI Number"
              name="fssaiNumber"
              type="text"
              placeholder="FSSAI number"
              register={register}
              error={errors.fssaiNumber?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          ADDRESS
      ===================================================== */}

      <div className="store-form-section">
        <h3 className="store-form-section-title">Address</h3>

        <div className="store-form-grid">
          <div className="store-field store-full-width">
            <Input
              label="Address"
              name="address"
              type="text"
              placeholder="Enter address"
              register={register}
              error={errors.address?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Area"
              name="area"
              type="text"
              placeholder="Area"
              register={register}
              error={errors.area?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="City"
              name="city"
              type="text"
              placeholder="City"
              register={register}
              error={errors.city?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="State"
              name="state"
              type="text"
              placeholder="State"
              register={register}
              error={errors.state?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Country"
              name="country"
              type="text"
              placeholder="Country"
              register={register}
              error={errors.country?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Pincode"
              name="pincode"
              type="text"
              maxLength={6}
              placeholder="641001"
              register={register}
              error={errors.pincode?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Latitude"
              name="latitude"
              type="number"
              step="any"
              placeholder="11.0168"
              register={register}
              error={errors.latitude?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Longitude"
              name="longitude"
              type="number"
              step="any"
              placeholder="76.9558"
              register={register}
              error={errors.longitude?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          STORE SETTINGS
      ===================================================== */}

      <div className="store-form-section">
        <h3 className="store-form-section-title">Store Settings</h3>

        <div className="store-form-grid">
          <div className="store-field">
            <Input
              label="Opening Time"
              name="openingTime"
              type="time"
              register={register}
              error={errors.openingTime?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Closing Time"
              name="closingTime"
              type="time"
              register={register}
              error={errors.closingTime?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Total Tables"
              name="totalTables"
              type="number"
              min="0"
              placeholder="0"
              register={register}
              error={errors.totalTables?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Total Seats"
              name="totalSeats"
              type="number"
              min="0"
              placeholder="0"
              register={register}
              error={errors.totalSeats?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Service Charge %"
              name="serviceChargePercentage"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              register={register}
              error={errors.serviceChargePercentage?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <div className="store-form-section">
        <h3 className="store-form-section-title">Features</h3>

        <div className="store-checkbox-grid">
          <label className="store-checkbox">
            <input type="checkbox" {...register("gstEnabled")} />

            <span>GST Enabled</span>
          </label>

          <label className="store-checkbox">
            <input type="checkbox" {...register("serviceChargeEnabled")} />

            <span>Service Charge</span>
          </label>

          <label className="store-checkbox">
            <input type="checkbox" {...register("dineInEnabled")} />

            <span>Dine In</span>
          </label>

          <label className="store-checkbox">
            <input type="checkbox" {...register("takeawayEnabled")} />

            <span>Takeaway</span>
          </label>

          <label className="store-checkbox">
            <input type="checkbox" {...register("deliveryEnabled")} />

            <span>Delivery</span>
          </label>

          <label className="store-checkbox">
            <input type="checkbox" {...register("onlineOrderEnabled")} />

            <span>Online Orders</span>
          </label>
        </div>
      </div>

      {/* =====================================================
          PRINTER SETTINGS
      ===================================================== */}

      <div className="store-form-section">
        <h3 className="store-form-section-title">Printer Settings</h3>

        <div className="store-form-grid">
          <div className="store-field">
            <Input
              label="Printer Name"
              name="printerName"
              type="text"
              placeholder="Printer name"
              register={register}
              error={errors.printerName?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Kitchen Printer"
              name="kitchenPrinter"
              type="text"
              placeholder="Kitchen printer"
              register={register}
              error={errors.kitchenPrinter?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Billing Printer"
              name="billingPrinter"
              type="text"
              placeholder="Billing printer"
              register={register}
              error={errors.billingPrinter?.message}
            />
          </div>

          <div className="store-field">
            <Input
              label="Logo"
              name="logo"
              type="text"
              placeholder="Logo URL"
              register={register}
              error={errors.logo?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="store-form-actions">
        <CancelButton
          type="button"
          className="store-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="store-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingStore
              ? "Update Store"
              : "Create Store"}
        </SaveButton>
      </div>
    </form>
  );
};

export default StoreForm;
