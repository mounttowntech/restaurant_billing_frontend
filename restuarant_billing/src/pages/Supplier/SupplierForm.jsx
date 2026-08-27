import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "./SupplierForm.css";

import { CancelButton, SaveButton } from "../../components/Common/Button";

import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

const initialForm = {
  restaurant: "",
  store: "",

  supplierCode: "",
  supplierName: "",
  companyName: "",
  contactPerson: "",

  mobile: "",
  alternateMobile: "",
  email: "",
  website: "",

  gstNumber: "",
  panNumber: "",
  licenseNumber: "",

  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",

  bankName: "",
  accountHolder: "",
  accountNumber: "",
  ifscCode: "",
  branch: "",
  upiId: "",

  paymentTerms: "Cash",
  creditLimit: 0,

  outstandingAmount: 0,
  totalPurchaseAmount: 0,
  totalOrders: 0,

  supplierType: "General",
  rating: 5,

  isPreferredSupplier: false,
  isActive: true,

  remarks: "",
};

const SupplierForm = ({
  editingSupplier,
  onSubmit,
  restaurants = [],
  stores = [],
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
    if (editingSupplier) {
      const address = editingSupplier.address || {};
      const bankDetails = editingSupplier.bankDetails || {};

      reset({
        restaurant:
          typeof editingSupplier.restaurant === "object"
            ? editingSupplier.restaurant?._id || ""
            : editingSupplier.restaurant || "",

        store:
          typeof editingSupplier.store === "object"
            ? editingSupplier.store?._id || ""
            : editingSupplier.store || "",

        supplierCode: editingSupplier.supplierCode || "",
        supplierName: editingSupplier.supplierName || "",
        companyName: editingSupplier.companyName || "",
        contactPerson: editingSupplier.contactPerson || "",

        mobile: editingSupplier.mobile || "",
        alternateMobile: editingSupplier.alternateMobile || "",
        email: editingSupplier.email || "",
        website: editingSupplier.website || "",

        gstNumber: editingSupplier.gstNumber || "",
        panNumber: editingSupplier.panNumber || "",
        licenseNumber: editingSupplier.licenseNumber || "",

        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "India",
        pincode: address.pincode || "",

        bankName: bankDetails.bankName || "",
        accountHolder: bankDetails.accountHolder || "",
        accountNumber: bankDetails.accountNumber || "",
        ifscCode: bankDetails.ifscCode || "",
        branch: bankDetails.branch || "",
        upiId: bankDetails.upiId || "",

        paymentTerms: editingSupplier.paymentTerms || "Cash",

        creditLimit: editingSupplier.creditLimit ?? 0,
        outstandingAmount: editingSupplier.outstandingAmount ?? 0,
        totalPurchaseAmount: editingSupplier.totalPurchaseAmount ?? 0,
        totalOrders: editingSupplier.totalOrders ?? 0,

        supplierType: editingSupplier.supplierType || "General",

        rating: editingSupplier.rating ?? 5,

        isPreferredSupplier: editingSupplier.isPreferredSupplier ?? false,

        isActive: editingSupplier.isActive ?? true,

        remarks: editingSupplier.remarks || "",
      });
    } else {
      reset(initialForm);
    }
  }, [editingSupplier, reset]);

  // =====================================================
  // SUBMIT
  // =====================================================

  const onFormSubmit = async (data) => {
    const payload = {
      restaurant: data.restaurant?.trim(),
      store: data.store?.trim(),

      supplierCode: data.supplierCode?.trim(),
      supplierName: data.supplierName?.trim(),

      companyName: data.companyName?.trim() || "",
      contactPerson: data.contactPerson?.trim() || "",

      mobile: data.mobile?.trim(),
      alternateMobile: data.alternateMobile?.trim() || "",

      email: data.email?.trim() || "",
      website: data.website?.trim() || "",

      gstNumber: data.gstNumber?.trim() || "",
      panNumber: data.panNumber?.trim() || "",
      licenseNumber: data.licenseNumber?.trim() || "",

      address: {
        addressLine1: data.addressLine1?.trim() || "",
        addressLine2: data.addressLine2?.trim() || "",
        city: data.city?.trim() || "",
        state: data.state?.trim() || "",
        country: data.country?.trim() || "India",
        pincode: data.pincode?.trim() || "",
      },

      bankDetails: {
        bankName: data.bankName?.trim() || "",
        accountHolder: data.accountHolder?.trim() || "",
        accountNumber: data.accountNumber?.trim() || "",
        ifscCode: data.ifscCode?.trim() || "",
        branch: data.branch?.trim() || "",
        upiId: data.upiId?.trim() || "",
      },

      paymentTerms: data.paymentTerms,

      creditLimit: Number(data.creditLimit || 0),

      outstandingAmount: Number(data.outstandingAmount || 0),

      totalPurchaseAmount: Number(data.totalPurchaseAmount || 0),

      totalOrders: Number(data.totalOrders || 0),

      supplierType: data.supplierType,

      rating: Number(data.rating || 0),

      isPreferredSupplier: Boolean(data.isPreferredSupplier),

      isActive: Boolean(data.isActive),

      remarks: data.remarks?.trim() || "",
    };

    await onSubmit(payload);
  };

  return (
    <form className="supplier-form" onSubmit={handleSubmit(onFormSubmit)}>
      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <div className="supplier-form-section">
        <h3 className="supplier-form-section-title">Basic Information</h3>

        <div className="supplier-form-grid">
          <div className="supplier-field">
            <Input
              label="Supplier Code"
              name="supplierCode"
              type="text"
              placeholder="SUP001"
              register={register}
              error={errors.supplierCode?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Supplier Name"
              name="supplierName"
              type="text"
              placeholder="Enter supplier name"
              register={register}
              error={errors.supplierName?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Company Name"
              name="companyName"
              type="text"
              placeholder="Enter company name"
              register={register}
              error={errors.companyName?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Contact Person"
              name="contactPerson"
              type="text"
              placeholder="Contact person name"
              register={register}
              error={errors.contactPerson?.message}
            />
          </div>

          <div className="supplier-field">
            <Select
              label="Supplier Type"
              name="supplierType"
              register={register}
              error={errors.supplierType?.message}
              options={[
                {
                  _id: "Vegetable",
                  label: "Vegetable",
                },
                {
                  _id: "Grocery",
                  label: "Grocery",
                },
                {
                  _id: "Meat",
                  label: "Meat",
                },
                {
                  _id: "Seafood",
                  label: "Seafood",
                },
                {
                  _id: "Beverage",
                  label: "Beverage",
                },
                {
                  _id: "Dairy",
                  label: "Dairy",
                },
                {
                  _id: "Bakery",
                  label: "Bakery",
                },
                {
                  _id: "Packaging",
                  label: "Packaging",
                },
                {
                  _id: "General",
                  label: "General",
                },
              ]}
            />
          </div>

          <div className="supplier-field">
            <Select
              label="Payment Terms"
              name="paymentTerms"
              register={register}
              error={errors.paymentTerms?.message}
              options={[
                {
                  _id: "Cash",
                  label: "Cash",
                },
                {
                  _id: "7 Days",
                  label: "7 Days",
                },
                {
                  _id: "15 Days",
                  label: "15 Days",
                },
                {
                  _id: "30 Days",
                  label: "30 Days",
                },
                {
                  _id: "45 Days",
                  label: "45 Days",
                },
                {
                  _id: "60 Days",
                  label: "60 Days",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          RESTAURANT / STORE
      ===================================================== */}

      <div className="supplier-form-section">
        <h3 className="supplier-form-section-title">Restaurant & Store</h3>

        <div className="supplier-form-grid">
          <div className="supplier-field">
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

          <div className="supplier-field">
            <Select
              label="Store"
              name="store"
              register={register}
              error={errors.store?.message}
              options={stores.map((store) => ({
                _id: store._id,
                label: store.storeName || store.name || store._id,
              }))}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <div className="supplier-form-section">
        <h3 className="supplier-form-section-title">Contact Information</h3>

        <div className="supplier-form-grid">
          <div className="supplier-field">
            <Input
              label="Mobile"
              name="mobile"
              type="text"
              maxLength={10}
              placeholder="9876543210"
              register={register}
              error={errors.mobile?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Alternate Mobile"
              name="alternateMobile"
              type="text"
              maxLength={10}
              placeholder="Alternate mobile"
              register={register}
              error={errors.alternateMobile?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="supplier@email.com"
              register={register}
              error={errors.email?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Website"
              name="website"
              type="text"
              placeholder="https://example.com"
              register={register}
              error={errors.website?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          TAX & LEGAL INFORMATION
      ===================================================== */}

      <div className="supplier-form-section">
        <h3 className="supplier-form-section-title">Tax & Legal Information</h3>

        <div className="supplier-form-grid">
          <div className="supplier-field">
            <Input
              label="GST Number"
              name="gstNumber"
              type="text"
              placeholder="GST number"
              register={register}
              error={errors.gstNumber?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="PAN Number"
              name="panNumber"
              type="text"
              placeholder="PAN number"
              register={register}
              error={errors.panNumber?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="License Number"
              name="licenseNumber"
              type="text"
              placeholder="License number"
              register={register}
              error={errors.licenseNumber?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          ADDRESS
      ===================================================== */}

      <div className="supplier-form-section">
        <h3 className="supplier-form-section-title">Address</h3>

        <div className="supplier-form-grid">
          <div className="supplier-field">
            <Input
              label="Address Line 1"
              name="addressLine1"
              type="text"
              placeholder="Address line 1"
              register={register}
              error={errors.addressLine1?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Address Line 2"
              name="addressLine2"
              type="text"
              placeholder="Address line 2"
              register={register}
              error={errors.addressLine2?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="City"
              name="city"
              type="text"
              placeholder="City"
              register={register}
              error={errors.city?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="State"
              name="state"
              type="text"
              placeholder="State"
              register={register}
              error={errors.state?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Country"
              name="country"
              type="text"
              placeholder="Country"
              register={register}
              error={errors.country?.message}
            />
          </div>

          <div className="supplier-field">
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
        </div>
      </div>

      {/* =====================================================
          BANK DETAILS
      ===================================================== */}

      <div className="supplier-form-section">
        <h3 className="supplier-form-section-title">Bank Details</h3>

        <div className="supplier-form-grid">
          <div className="supplier-field">
            <Input
              label="Bank Name"
              name="bankName"
              type="text"
              placeholder="Bank name"
              register={register}
              error={errors.bankName?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Account Holder"
              name="accountHolder"
              type="text"
              placeholder="Account holder name"
              register={register}
              error={errors.accountHolder?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Account Number"
              name="accountNumber"
              type="text"
              placeholder="Account number"
              register={register}
              error={errors.accountNumber?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="IFSC Code"
              name="ifscCode"
              type="text"
              placeholder="IFSC code"
              register={register}
              error={errors.ifscCode?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Branch"
              name="branch"
              type="text"
              placeholder="Branch"
              register={register}
              error={errors.branch?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="UPI ID"
              name="upiId"
              type="text"
              placeholder="supplier@upi"
              register={register}
              error={errors.upiId?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          FINANCIAL INFORMATION
      ===================================================== */}

      <div className="supplier-form-section">
        <h3 className="supplier-form-section-title">Financial Information</h3>

        <div className="supplier-form-grid">
          <div className="supplier-field">
            <Input
              label="Credit Limit"
              name="creditLimit"
              type="number"
              min="0"
              placeholder="0"
              register={register}
              error={errors.creditLimit?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Outstanding Amount"
              name="outstandingAmount"
              type="number"
              min="0"
              placeholder="0"
              register={register}
              error={errors.outstandingAmount?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Total Purchase Amount"
              name="totalPurchaseAmount"
              type="number"
              min="0"
              placeholder="0"
              register={register}
              error={errors.totalPurchaseAmount?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Total Orders"
              name="totalOrders"
              type="number"
              min="0"
              placeholder="0"
              register={register}
              error={errors.totalOrders?.message}
            />
          </div>

          <div className="supplier-field">
            <Input
              label="Rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="5"
              register={register}
              error={errors.rating?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          SUPPLIER SETTINGS
      ===================================================== */}

      <div className="supplier-form-section">
        <h3 className="supplier-form-section-title">Supplier Settings</h3>

        <div className="supplier-form-grid">
          <label className="supplier-checkbox">
            <input type="checkbox" {...register("isPreferredSupplier")} />

            <span>Preferred Supplier</span>
          </label>

          <label className="supplier-checkbox">
            <input type="checkbox" {...register("isActive")} />

            <span>Active Supplier</span>
          </label>

          <div className="supplier-field supplier-full-width">
            <Input
              label="Remarks"
              name="remarks"
              type="text"
              placeholder="Supplier remarks"
              register={register}
              error={errors.remarks?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="supplier-form-actions">
        <CancelButton
          type="button"
          className="supplier-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="supplier-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingSupplier
              ? "Update Supplier"
              : "Create Supplier"}
        </SaveButton>
      </div>
    </form>
  );
};

export default SupplierForm;
