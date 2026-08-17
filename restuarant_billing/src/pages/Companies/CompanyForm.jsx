import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createCompany,
  updateCompany,
} from "../../features/company/companySlice";

import "./CompanyForm.css";

const initialFormData = {
  companyCode: "",
  companyName: "",
  legalName: "",
  ownerName: "",
  email: "",
  phone: "",
  alternatePhone: "",
  gstNumber: "",
  panNumber: "",
  address: "",
  area: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  currency: "INR",
  currencySymbol: "₹",
  timezone: "Asia/Kolkata",
  logo: "",
  status: "Active",
};

const CompanyForm = ({ initialData = null, onSuccess, onCancel }) => {
  const dispatch = useDispatch();

  const { loading = false, error = null } = useSelector(
    (state) => state.company || {},
  );

  const [formData, setFormData] = useState(initialFormData);

  const isEditing = Boolean(initialData?._id);

  // =====================================================
  // LOAD EDIT DATA
  // =====================================================

  useEffect(() => {
    if (initialData) {
      setFormData({
        companyCode: initialData.companyCode || "",

        companyName: initialData.companyName || "",

        legalName: initialData.legalName || "",

        ownerName: initialData.ownerName || "",

        email: initialData.email || "",

        phone: initialData.phone || "",

        alternatePhone: initialData.alternatePhone || "",

        gstNumber: initialData.gstNumber || "",

        panNumber: initialData.panNumber || "",

        address: initialData.address || "",

        area: initialData.area || "",

        city: initialData.city || "",

        state: initialData.state || "",

        country: initialData.country || "India",

        pincode: initialData.pincode || "",

        currency: initialData.currency || "INR",

        currencySymbol: initialData.currencySymbol || "₹",

        timezone: initialData.timezone || "Asia/Kolkata",

        logo: initialData.logo || "",

        status: initialData.status || "Active",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [initialData]);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    if (!formData.companyCode.trim() && !isEditing) {
      alert("Company code is required");
      return;
    }

    if (!formData.companyName.trim()) {
      alert("Company name is required");
      return;
    }

    if (!formData.ownerName.trim()) {
      alert("Owner name is required");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Phone is required");
      return;
    }

    let result;

    if (isEditing) {
      // companyCode must not be sent during update
      const updateData = {
        companyName: formData.companyName,
        legalName: formData.legalName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        alternatePhone: formData.alternatePhone,
        gstNumber: formData.gstNumber,
        panNumber: formData.panNumber,
        address: formData.address,
        area: formData.area,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        currency: formData.currency,
        currencySymbol: formData.currencySymbol,
        timezone: formData.timezone,
        logo: formData.logo,
        status: formData.status,
      };

      result = await dispatch(
        updateCompany({
          id: initialData._id,
          data: updateData,
        }),
      );
    } else {
      result = await dispatch(
        createCompany({
          companyCode: formData.companyCode.trim(),

          companyName: formData.companyName.trim(),

          legalName: formData.legalName.trim(),

          ownerName: formData.ownerName.trim(),

          email: formData.email.trim(),

          phone: formData.phone.trim(),

          alternatePhone: formData.alternatePhone.trim(),

          gstNumber: formData.gstNumber.trim(),

          panNumber: formData.panNumber.trim(),

          address: formData.address.trim(),

          area: formData.area.trim(),

          city: formData.city.trim(),

          state: formData.state.trim(),

          country: formData.country.trim(),

          pincode: formData.pincode.trim(),

          currency: formData.currency,

          currencySymbol: formData.currencySymbol,

          timezone: formData.timezone,

          logo: formData.logo.trim(),

          status: formData.status,
        }),
      );
    }

    if (
      createCompany.fulfilled.match(result) ||
      updateCompany.fulfilled.match(result)
    ) {
      onSuccess();
    }
  };

  return (
    <form className="company-form" onSubmit={handleSubmit}>
      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <div className="company-form-section">
        <div className="company-form-section-title">
          <h4>Basic Information</h4>
        </div>

        <div className="company-form-grid">
          <div className="company-form-group">
            <label>
              Company Code
              {!isEditing && <span className="required">*</span>}
            </label>

            <input
              type="text"
              name="companyCode"
              value={formData.companyCode}
              onChange={handleChange}
              placeholder="Enter company code"
              disabled={isEditing}
            />
          </div>

          <div className="company-form-group">
            <label>
              Company Name
              <span className="required">*</span>
            </label>

            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </div>

          <div className="company-form-group">
            <label>Legal Name</label>

            <input
              type="text"
              name="legalName"
              value={formData.legalName}
              onChange={handleChange}
              placeholder="Enter legal name"
            />
          </div>

          <div className="company-form-group">
            <label>
              Owner Name
              <span className="required">*</span>
            </label>

            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter owner name"
            />
          </div>
        </div>
      </div>

      {/* =================================================
          CONTACT INFORMATION
      ================================================= */}

      <div className="company-form-section">
        <div className="company-form-section-title">
          <h4>Contact Information</h4>
        </div>

        <div className="company-form-grid">
          <div className="company-form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="company-form-group">
            <label>
              Phone
              <span className="required">*</span>
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="company-form-group">
            <label>Alternate Phone</label>

            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              placeholder="Enter alternate phone"
            />
          </div>
        </div>
      </div>

      {/* =================================================
          TAX INFORMATION
      ================================================= */}

      <div className="company-form-section">
        <div className="company-form-section-title">
          <h4>Tax Information</h4>
        </div>

        <div className="company-form-grid">
          <div className="company-form-group">
            <label>GST Number</label>

            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="Enter GST number"
            />
          </div>

          <div className="company-form-group">
            <label>PAN Number</label>

            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN number"
            />
          </div>
        </div>
      </div>

      {/* =================================================
          ADDRESS
      ================================================= */}

      <div className="company-form-section">
        <div className="company-form-section-title">
          <h4>Address</h4>
        </div>

        <div className="company-form-grid">
          <div className="company-form-group company-full-width">
            <label>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows="3"
            />
          </div>

          <div className="company-form-group">
            <label>Area</label>

            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Enter area"
            />
          </div>

          <div className="company-form-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="company-form-group">
            <label>State</label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
            />
          </div>

          <div className="company-form-group">
            <label>Country</label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>

          <div className="company-form-group">
            <label>Pincode</label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
            />
          </div>
        </div>
      </div>

      {/* =================================================
          REGIONAL SETTINGS
      ================================================= */}

      <div className="company-form-section">
        <div className="company-form-section-title">
          <h4>Regional Settings</h4>
        </div>

        <div className="company-form-grid">
          <div className="company-form-group">
            <label>Currency</label>

            <input
              type="text"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              placeholder="INR"
            />
          </div>

          <div className="company-form-group">
            <label>Currency Symbol</label>

            <input
              type="text"
              name="currencySymbol"
              value={formData.currencySymbol}
              onChange={handleChange}
              placeholder="₹"
            />
          </div>

          <div className="company-form-group">
            <label>Timezone</label>

            <input
              type="text"
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              placeholder="Asia/Kolkata"
            />
          </div>

          <div className="company-form-group">
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

      {/* =================================================
          LOGO
      ================================================= */}

      <div className="company-form-section">
        <div className="company-form-section-title">
          <h4>Logo</h4>
        </div>

        <div className="company-form-grid">
          <div className="company-form-group company-full-width">
            <label>Logo URL</label>

            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="Enter logo URL"
            />
          </div>
        </div>
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && <div className="company-form-error">{error}</div>}

      {/* =================================================
          FORM ACTIONS
      ================================================= */}

      <div className="company-form-actions">
        <button
          type="button"
          className="company-cancel-button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="company-submit-button"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Company"
              : "Create Company"}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
