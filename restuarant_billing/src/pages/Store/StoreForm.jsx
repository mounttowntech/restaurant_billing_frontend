import { CancelButton, SaveButton } from "../../components/common/Button";

const StoreForm = ({
  editId,
  formData,
  loading,
  submitError,
  onChange,
  onSubmit,
  onClose,
}) => {
  const isEdit = !!editId;

  return (
    <form onSubmit={onSubmit}>
      {submitError && <div className="store-form-error">{submitError}</div>}

      {/* BASIC INFORMATION */}

      <h4>Basic Information</h4>

      <div className="form-grid">
        <div>
          <label>Restaurant ID *</label>

          <input
            name="restaurant"
            value={formData.restaurant}
            onChange={onChange}
            disabled={isEdit}
            placeholder="Enter restaurant ID"
          />

          {isEdit && <small>Restaurant cannot be changed</small>}
        </div>

        <div>
          <label>Store Code *</label>

          <input
            name="storeCode"
            value={formData.storeCode}
            onChange={onChange}
            disabled={isEdit}
            placeholder="Example: STORE-001"
          />

          {isEdit && <small>Store code cannot be changed</small>}
        </div>

        <div>
          <label>Store Name *</label>

          <input
            name="storeName"
            value={formData.storeName}
            onChange={onChange}
            placeholder="Enter store name"
          />
        </div>

        <div>
          <label>Branch Name</label>

          <input
            name="branchName"
            value={formData.branchName}
            onChange={onChange}
            placeholder="Enter branch name"
          />
        </div>

        <div>
          <label>Manager Name</label>

          <input
            name="managerName"
            value={formData.managerName}
            onChange={onChange}
            placeholder="Enter manager name"
          />
        </div>

        <div>
          <label>Status</label>

          <select name="status" value={formData.status} onChange={onChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* CONTACT */}

      <h4>Contact Information</h4>

      <div className="form-grid">
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label>Phone *</label>

          <input
            name="phone"
            value={formData.phone}
            onChange={onChange}
            placeholder="Enter phone"
          />
        </div>

        <div>
          <label>Alternate Phone</label>

          <input
            name="alternatePhone"
            value={formData.alternatePhone}
            onChange={onChange}
            placeholder="Enter alternate phone"
          />
        </div>
      </div>

      {/* TAX */}

      <h4>Tax Information</h4>

      <div className="form-grid">
        <div>
          <label>GST Number</label>

          <input
            name="gstNumber"
            value={formData.gstNumber}
            onChange={onChange}
            placeholder="Enter GST number"
          />
        </div>

        <div>
          <label>FSSAI Number</label>

          <input
            name="fssaiNumber"
            value={formData.fssaiNumber}
            onChange={onChange}
            placeholder="Enter FSSAI number"
          />
        </div>
      </div>

      {/* ADDRESS */}

      <h4>Address</h4>

      <div className="form-grid">
        <div className="full-width">
          <label>Address</label>

          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Enter address"
            rows="3"
          />
        </div>

        <div>
          <label>Area</label>

          <input name="area" value={formData.area} onChange={onChange} />
        </div>

        <div>
          <label>City</label>

          <input name="city" value={formData.city} onChange={onChange} />
        </div>

        <div>
          <label>State</label>

          <input name="state" value={formData.state} onChange={onChange} />
        </div>

        <div>
          <label>Country</label>

          <input name="country" value={formData.country} onChange={onChange} />
        </div>

        <div>
          <label>Pincode</label>

          <input name="pincode" value={formData.pincode} onChange={onChange} />
        </div>

        <div>
          <label>Latitude</label>

          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Longitude</label>

          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={onChange}
          />
        </div>
      </div>

      {/* STORE SETTINGS */}

      <h4>Store Settings</h4>

      <div className="form-grid">
        <div>
          <label>Opening Time</label>

          <input
            type="time"
            name="openingTime"
            value={formData.openingTime}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Closing Time</label>

          <input
            type="time"
            name="closingTime"
            value={formData.closingTime}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Total Tables</label>

          <input
            type="number"
            min="0"
            name="totalTables"
            value={formData.totalTables}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Total Seats</label>

          <input
            type="number"
            min="0"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Service Charge %</label>

          <input
            type="number"
            min="0"
            step="0.01"
            name="serviceChargePercentage"
            value={formData.serviceChargePercentage}
            onChange={onChange}
          />
        </div>
      </div>

      {/* FEATURES */}

      <h4>Features</h4>

      <div className="feature-grid">
        <label>
          <input
            type="checkbox"
            name="gstEnabled"
            checked={formData.gstEnabled}
            onChange={onChange}
          />
          GST Enabled
        </label>

        <label>
          <input
            type="checkbox"
            name="serviceChargeEnabled"
            checked={formData.serviceChargeEnabled}
            onChange={onChange}
          />
          Service Charge
        </label>

        <label>
          <input
            type="checkbox"
            name="dineInEnabled"
            checked={formData.dineInEnabled}
            onChange={onChange}
          />
          Dine In
        </label>

        <label>
          <input
            type="checkbox"
            name="takeawayEnabled"
            checked={formData.takeawayEnabled}
            onChange={onChange}
          />
          Takeaway
        </label>

        <label>
          <input
            type="checkbox"
            name="deliveryEnabled"
            checked={formData.deliveryEnabled}
            onChange={onChange}
          />
          Delivery
        </label>

        <label>
          <input
            type="checkbox"
            name="onlineOrderEnabled"
            checked={formData.onlineOrderEnabled}
            onChange={onChange}
          />
          Online Orders
        </label>
      </div>

      {/* PRINTER SETTINGS */}

      <h4>Printer Settings</h4>

      <div className="form-grid">
        <div>
          <label>Printer Name</label>

          <input
            name="printerName"
            value={formData.printerName}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Kitchen Printer</label>

          <input
            name="kitchenPrinter"
            value={formData.kitchenPrinter}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Billing Printer</label>

          <input
            name="billingPrinter"
            value={formData.billingPrinter}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Logo</label>

          <input
            name="logo"
            value={formData.logo}
            onChange={onChange}
            placeholder="Logo URL"
          />
        </div>
      </div>

      {/* BUTTONS */}

      <div className="modal-actions">
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>

        <SaveButton type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Store" : "Create Store"}
        </SaveButton>
      </div>
    </form>
  );
};

export default StoreForm;
