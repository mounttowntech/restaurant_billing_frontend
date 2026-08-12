import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createStore,
  updateStore,
  clearStoreError,
} from "../../features/store/storeSlice";

import "./Store.css";

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

const StoreForm = ({ editStore = null, onSuccess, onCancel }) => {
  const dispatch = useDispatch();

  const storeState = useSelector((state) => state.stores || {});

  const loading = storeState.loading || false;
  const error = storeState.error || null;

  const [formData, setFormData] = useState(initialForm);

  const [submitError, setSubmitError] = useState("");

  const isEdit = Boolean(editStore);

  // ==================================================
  // LOAD EDIT DATA
  // ==================================================

  useEffect(() => {
    if (editStore) {
      const restaurantId =
        typeof editStore.restaurant === "object"
          ? editStore.restaurant?._id
          : editStore.restaurant;

      setFormData({
        restaurant: restaurantId || "",

        storeCode: editStore.storeCode || "",

        storeName: editStore.storeName || "",

        branchName: editStore.branchName || "",

        managerName: editStore.managerName || "",

        email: editStore.email || "",

        phone: editStore.phone || "",

        alternatePhone: editStore.alternatePhone || "",

        gstNumber: editStore.gstNumber || "",

        fssaiNumber: editStore.fssaiNumber || "",

        address: editStore.address || "",

        area: editStore.area || "",

        city: editStore.city || "",

        state: editStore.state || "",

        country: editStore.country || "India",

        pincode: editStore.pincode || "",

        latitude: editStore.latitude ?? "",

        longitude: editStore.longitude ?? "",

        openingTime: editStore.openingTime || "09:00",

        closingTime: editStore.closingTime || "23:00",

        totalTables: editStore.totalTables ?? 0,

        totalSeats: editStore.totalSeats ?? 0,

        serviceChargePercentage: editStore.serviceChargePercentage ?? 0,

        gstEnabled: editStore.gstEnabled ?? true,

        serviceChargeEnabled: editStore.serviceChargeEnabled ?? false,

        dineInEnabled: editStore.dineInEnabled ?? true,

        takeawayEnabled: editStore.takeawayEnabled ?? true,

        deliveryEnabled: editStore.deliveryEnabled ?? true,

        onlineOrderEnabled: editStore.onlineOrderEnabled ?? false,

        printerName: editStore.printerName || "",

        kitchenPrinter: editStore.kitchenPrinter || "",

        billingPrinter: editStore.billingPrinter || "",

        logo: editStore.logo || "",

        status: editStore.status || "Active",
      });
    } else {
      setFormData({
        ...initialForm,
      });
    }

    setSubmitError("");

    if (clearStoreError) {
      dispatch(clearStoreError());
    }
  }, [editStore, dispatch]);

  // ==================================================
  // INPUT CHANGE
  // ==================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));

    setSubmitError("");
  };

  // ==================================================
  // VALIDATION
  // ==================================================

  const validateForm = () => {
    if (!isEdit && !formData.restaurant.trim()) {
      return "Restaurant ID is required";
    }

    if (!formData.storeCode.trim()) {
      return "Store code is required";
    }

    if (!formData.storeName.trim()) {
      return "Store name is required";
    }

    if (!formData.phone.trim()) {
      return "Phone is required";
    }

    return null;
  };

  // ==================================================
  // CREATE
  // ==================================================

  const handleCreate = async (payload) => {
    try {
      const result = await dispatch(createStore(payload)).unwrap();

      console.log("Store created successfully:", result);

      alert("Store created successfully");

      setFormData({
        ...initialForm,
      });

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      console.error("Create Store Error:", err);

      setSubmitError(
        typeof err === "string"
          ? err
          : err?.message || "Failed to create store",
      );
    }
  };

  // ==================================================
  // UPDATE
  // ==================================================

  const handleUpdate = async (payload) => {
    if (!editStore?._id) {
      setSubmitError("Store ID is missing. Cannot update store.");

      return;
    }

    try {
      const result = await dispatch(
        updateStore({
          id: editStore._id,

          store: payload,
        }),
      ).unwrap();

      console.log("Store updated successfully:", result);

      alert("Store updated successfully");

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      console.error("Update Store Error:", err);

      setSubmitError(
        typeof err === "string"
          ? err
          : err?.message || "Failed to update store",
      );
    }
  };

  // ==================================================
  // SUBMIT
  // ==================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError("");

    const validationError = validateForm();

    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    // ==================================================
    // CONVERT VALUES
    // ==================================================

    const payload = {
      ...formData,

      latitude: formData.latitude === "" ? null : Number(formData.latitude),

      longitude: formData.longitude === "" ? null : Number(formData.longitude),

      totalTables: Number(formData.totalTables) || 0,

      totalSeats: Number(formData.totalSeats) || 0,

      serviceChargePercentage: Number(formData.serviceChargePercentage) || 0,
    };

    // ==================================================
    // UPDATE
    // ==================================================

    if (isEdit) {
      /*
       * Backend does not allow restaurant
       * and storeCode to be changed during update.
       *
       * Therefore we remove them from update payload.
       */

      const { restaurant, storeCode, ...updatePayload } = payload;

      await handleUpdate(updatePayload);

      return;
    }

    // ==================================================
    // CREATE
    // ==================================================

    await handleCreate(payload);
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <div className="store-form-container">
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="store-form-header">
        <div>
          <h2>{isEdit ? "Update Store" : "Create Store"}</h2>

          <p>
            {isEdit
              ? "Update store information"
              : "Add a new store to your restaurant"}
          </p>
        </div>

        {onCancel && (
          <button type="button" className="store-close-btn" onClick={onCancel}>
            ×
          </button>
        )}
      </div>

      {/* ==================================================
          REDUX ERROR
      ================================================== */}

      {error && <div className="store-form-error">{error}</div>}

      {/* ==================================================
          FORM ERROR
      ================================================== */}

      {submitError && <div className="store-form-error">{submitError}</div>}

      <form onSubmit={handleSubmit}>
        {/* ==================================================
            BASIC INFORMATION
        ================================================== */}

        <div className="store-form-section">
          <h3>Basic Information</h3>

          <div className="store-form-grid">
            {/* RESTAURANT */}

            <div className="store-form-group">
              <label>Restaurant ID *</label>

              <input
                type="text"
                name="restaurant"
                value={formData.restaurant}
                onChange={handleChange}
                disabled={isEdit}
                placeholder="Enter restaurant ID"
              />

              {isEdit && <small>Restaurant cannot be changed</small>}
            </div>

            {/* STORE CODE */}

            <div className="store-form-group">
              <label>Store Code *</label>

              <input
                type="text"
                name="storeCode"
                value={formData.storeCode}
                onChange={handleChange}
                disabled={isEdit}
                placeholder="Example: STORE-001"
              />

              {isEdit && <small>Store code cannot be changed</small>}
            </div>

            {/* STORE NAME */}

            <div className="store-form-group">
              <label>Store Name *</label>

              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="Enter store name"
              />
            </div>

            {/* BRANCH */}

            <div className="store-form-group">
              <label>Branch Name</label>

              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                placeholder="Enter branch name"
              />
            </div>

            {/* MANAGER */}

            <div className="store-form-group">
              <label>Manager Name</label>

              <input
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                placeholder="Enter manager name"
              />
            </div>

            {/* STATUS */}

            <div className="store-form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* ==================================================
            CONTACT INFORMATION
        ================================================== */}

        <div className="store-form-section">
          <h3>Contact Information</h3>

          <div className="store-form-grid">
            <div className="store-form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

            <div className="store-form-group">
              <label>Phone *</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone"
              />
            </div>

            <div className="store-form-group">
              <label>Alternate Phone</label>

              <input
                type="text"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                placeholder="Enter alternate phone"
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            TAX INFORMATION
        ================================================== */}

        <div className="store-form-section">
          <h3>Tax Information</h3>

          <div className="store-form-grid">
            <div className="store-form-group">
              <label>GST Number</label>

              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                placeholder="Enter GST number"
              />
            </div>

            <div className="store-form-group">
              <label>FSSAI Number</label>

              <input
                type="text"
                name="fssaiNumber"
                value={formData.fssaiNumber}
                onChange={handleChange}
                placeholder="Enter FSSAI number"
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            ADDRESS
        ================================================== */}

        <div className="store-form-section">
          <h3>Address</h3>

          <div className="store-form-grid">
            <div className="store-form-group store-full-width">
              <label>Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                rows="3"
              />
            </div>

            <div className="store-form-group">
              <label>Area</label>

              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>City</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>State</label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Country</label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Pincode</label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Latitude</label>

              <input
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Longitude</label>

              <input
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            STORE SETTINGS
        ================================================== */}

        <div className="store-form-section">
          <h3>Store Settings</h3>

          <div className="store-form-grid">
            <div className="store-form-group">
              <label>Opening Time</label>

              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Closing Time</label>

              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Total Tables</label>

              <input
                type="number"
                min="0"
                name="totalTables"
                value={formData.totalTables}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Total Seats</label>

              <input
                type="number"
                min="0"
                name="totalSeats"
                value={formData.totalSeats}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Service Charge %</label>

              <input
                type="number"
                min="0"
                step="0.01"
                name="serviceChargePercentage"
                value={formData.serviceChargePercentage}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            FEATURES
        ================================================== */}

        <div className="store-form-section">
          <h3>Features</h3>

          <div className="store-checkbox-grid">
            <label className="store-checkbox">
              <input
                type="checkbox"
                name="gstEnabled"
                checked={formData.gstEnabled}
                onChange={handleChange}
              />

              <span>GST Enabled</span>
            </label>

            <label className="store-checkbox">
              <input
                type="checkbox"
                name="serviceChargeEnabled"
                checked={formData.serviceChargeEnabled}
                onChange={handleChange}
              />

              <span>Service Charge Enabled</span>
            </label>

            <label className="store-checkbox">
              <input
                type="checkbox"
                name="dineInEnabled"
                checked={formData.dineInEnabled}
                onChange={handleChange}
              />

              <span>Dine In</span>
            </label>

            <label className="store-checkbox">
              <input
                type="checkbox"
                name="takeawayEnabled"
                checked={formData.takeawayEnabled}
                onChange={handleChange}
              />

              <span>Takeaway</span>
            </label>

            <label className="store-checkbox">
              <input
                type="checkbox"
                name="deliveryEnabled"
                checked={formData.deliveryEnabled}
                onChange={handleChange}
              />

              <span>Delivery</span>
            </label>

            <label className="store-checkbox">
              <input
                type="checkbox"
                name="onlineOrderEnabled"
                checked={formData.onlineOrderEnabled}
                onChange={handleChange}
              />

              <span>Online Orders</span>
            </label>
          </div>
        </div>

        {/* ==================================================
            PRINTER SETTINGS
        ================================================== */}

        <div className="store-form-section">
          <h3>Printer Settings</h3>

          <div className="store-form-grid">
            <div className="store-form-group">
              <label>Printer Name</label>

              <input
                type="text"
                name="printerName"
                value={formData.printerName}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Kitchen Printer</label>

              <input
                type="text"
                name="kitchenPrinter"
                value={formData.kitchenPrinter}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Billing Printer</label>

              <input
                type="text"
                name="billingPrinter"
                value={formData.billingPrinter}
                onChange={handleChange}
              />
            </div>

            <div className="store-form-group">
              <label>Logo</label>

              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleChange}
                placeholder="Logo URL"
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            BUTTONS
        ================================================== */}

        <div className="store-form-actions">
          {onCancel && (
            <button
              type="button"
              className="store-cancel-btn"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}

          <button type="submit" className="store-submit-btn" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Update Store" : "Create Store"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;
