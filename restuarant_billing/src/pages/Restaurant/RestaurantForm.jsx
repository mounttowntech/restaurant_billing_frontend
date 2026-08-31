import "./RestaurantForm.css";
import { CancelButton, SaveButton } from "../../components/Common/Button";
import Select from "../../components/Common/Select";

const RestaurantForm = ({
  editId,
  formData,
  loading,
  onChange,
  companyOptions = [],
  onSubmit,
  onClose,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      companyId: formData?.companyId || "",
      restaurantCode: formData?.restaurantCode || "",
      restaurantName: formData?.restaurantName || "",
      legalName: formData?.legalName || "",
      ownerName: formData?.ownerName || "",
      phone: formData?.phone || "",
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h4>Basic Information</h4>

      <div className="form-grid">
        <div>
          <Select
            label="Company ID *"
            name="companyId"
            value={formData.companyId || ""}
            onChange={onChange}
            options={companyOptions}
            optionValue="value"
            optionLabel="label"
            placeholder="Select Company"
            required
          />
        </div>

        <div>
          <label>Restaurant Code *</label>
          <input
            type="text"
            name="restaurantCode"
            value={formData.restaurantCode || ""}
            onChange={onChange}
            placeholder="Enter restaurant code"
            required
          />
        </div>

        <div>
          <label>Restaurant Name *</label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName || ""}
            onChange={onChange}
            placeholder="Enter restaurant name"
            required
          />
        </div>

        <div>
          <label>Legal Name</label>
          <input
            type="text"
            name="legalName"
            value={formData.legalName || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Owner Name *</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName || ""}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <h4>Contact Information</h4>

      <div className="form-grid">
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label>Alternate Phone</label>
          <input
            type="text"
            name="alternatePhone"
            value={formData.alternatePhone || ""}
            onChange={onChange}
          />
        </div>
      </div>

      <h4>Tax Information</h4>

      <div className="form-grid">
        <div>
          <label>GST Number</label>
          <input
            name="gstNumber"
            value={formData.gstNumber || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>FSSAI Number</label>
          <input
            name="fssaiNumber"
            value={formData.fssaiNumber || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>PAN Number</label>
          <input
            name="panNumber"
            value={formData.panNumber || ""}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="full-width">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Area</label>
          <input name="area" value={formData.area || ""} onChange={onChange} />
        </div>

        <div>
          <label>City</label>
          <input name="city" value={formData.city || ""} onChange={onChange} />
        </div>

        <div>
          <label>State</label>
          <input
            name="state"
            value={formData.state || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Country</label>
          <input
            name="country"
            value={formData.country || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Pincode</label>
          <input
            name="pincode"
            value={formData.pincode || ""}
            onChange={onChange}
          />
        </div>
      </div>

      <h4>Billing Settings</h4>

      <div className="form-grid">
        <div>
          <label>Currency</label>
          <input
            name="currency"
            value={formData.currency || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Currency Symbol</label>
          <input
            name="currencySymbol"
            value={formData.currencySymbol || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Timezone</label>
          <input
            name="timezone"
            value={formData.timezone || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Service Charge %</label>
          <input
            type="number"
            name="serviceChargePercentage"
            value={formData.serviceChargePercentage ?? 0}
            onChange={onChange}
          />
        </div>
      </div>

      <h4>Prefix Settings</h4>

      <div className="form-grid">
        <div>
          <label>Invoice Prefix</label>
          <input
            name="invoicePrefix"
            value={formData.invoicePrefix || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>KOT Prefix</label>
          <input
            name="kotPrefix"
            value={formData.kotPrefix || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Order Prefix</label>
          <input
            name="orderPrefix"
            value={formData.orderPrefix || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Purchase Prefix</label>
          <input
            name="purchasePrefix"
            value={formData.purchasePrefix || ""}
            onChange={onChange}
          />
        </div>

        <div>
          <label>Expense Prefix</label>
          <input
            name="expensePrefix"
            value={formData.expensePrefix || ""}
            onChange={onChange}
          />
        </div>
      </div>

      <h4>Features</h4>

      <div className="feature-grid">
        <label>
          <input
            type="checkbox"
            name="gstEnabled"
            checked={!!formData.gstEnabled}
            onChange={onChange}
          />
          GST Enabled
        </label>

        <label>
          <input
            type="checkbox"
            name="serviceChargeEnabled"
            checked={!!formData.serviceChargeEnabled}
            onChange={onChange}
          />
          Service Charge
        </label>

        <label>
          <input
            type="checkbox"
            name="loyaltyEnabled"
            checked={!!formData.loyaltyEnabled}
            onChange={onChange}
          />
          Loyalty
        </label>

        <label>
          <input
            type="checkbox"
            name="onlineOrderEnabled"
            checked={!!formData.onlineOrderEnabled}
            onChange={onChange}
          />
          Online Order
        </label>

        <label>
          <input
            type="checkbox"
            name="takeawayEnabled"
            checked={!!formData.takeawayEnabled}
            onChange={onChange}
          />
          Takeaway
        </label>

        <label>
          <input
            type="checkbox"
            name="dineInEnabled"
            checked={!!formData.dineInEnabled}
            onChange={onChange}
          />
          Dine In
        </label>

        <label>
          <input
            type="checkbox"
            name="deliveryEnabled"
            checked={!!formData.deliveryEnabled}
            onChange={onChange}
          />
          Delivery
        </label>
      </div>

      <div className="restaurant-actions">
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>

        <SaveButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editId
              ? "Update Restaurant"
              : "Create Restaurant"}
        </SaveButton>
      </div>
    </form>
  );
};

export default RestaurantForm;
