import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./CustomerForm.css";
import { CancelButton, SaveButton } from "../../components/Common/Button";
import Input from "../../components/Common/Input";
import customerValidation from "../../validation/customerValidation";
import Select from "../../components/Common/Select";

const initialForm = {
  customerCode: "",
  customerName: "",
  restaurant: "",
  store: "",
  customerType: "Walk In",
  mobile: "",
  alternateMobile: "",
  email: "",
  gender: "",
  dob: "",
  anniversary: "",
  gstNumber: "",
  panNumber: "",
  companyName: "",

  addressType: "Home",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",

  loyaltyPoints: 0,
  creditLimit: 0,
  membershipType: "None",
  favoriteFood: "",
  notes: "",
  status: "Active",
};

const CustomerForm = ({
  editingCustomer,
  onSubmit,
  onCancel,
  restaurants = [],
  stores = [],
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerValidation),
    defaultValues: initialForm,
  });
  /* =========================================================
     LOAD EDIT DATA
  ========================================================= */

  useEffect(() => {
    if (editingCustomer) {
      const address = editingCustomer.addresses?.[0] || {};

      reset({
        customerCode: editingCustomer.customerCode || "",
        customerName: editingCustomer.customerName || "",

        restaurant:
          typeof editingCustomer.restaurant === "object"
            ? editingCustomer.restaurant?._id || ""
            : editingCustomer.restaurant || "",

        store:
          typeof editingCustomer.store === "object"
            ? editingCustomer.store?._id || ""
            : editingCustomer.store || "",

        customerType: editingCustomer.customerType || "Walk In",

        mobile: editingCustomer.mobile || "",
        alternateMobile: editingCustomer.alternateMobile || "",
        email: editingCustomer.email || "",

        gender: editingCustomer.gender || "",

        dob: editingCustomer.dob ? editingCustomer.dob.substring(0, 10) : "",

        anniversary: editingCustomer.anniversary
          ? editingCustomer.anniversary.substring(0, 10)
          : "",

        gstNumber: editingCustomer.gstNumber || "",
        panNumber: editingCustomer.panNumber || "",
        companyName: editingCustomer.companyName || "",

        addressType: address.addressType || "Home",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "India",
        pincode: address.pincode || "",

        loyaltyPoints: editingCustomer.loyaltyPoints || 0,
        creditLimit: editingCustomer.creditLimit || 0,

        membershipType: editingCustomer.membershipType || "None",

        favoriteFood: Array.isArray(editingCustomer.favoriteFood)
          ? editingCustomer.favoriteFood.join(", ")
          : "",

        notes: editingCustomer.notes || "",

        status: editingCustomer.status || "Active",
      });
    } else {
      reset(initialForm);
    }
  }, [editingCustomer, reset]);

  /* =========================================================
     SUBMIT
  ========================================================= */
  const onFormSubmit = async (data) => {
    const payload = {
      customerCode: data.customerCode.trim(),
      customerName: data.customerName.trim(),

      restaurant: data.restaurant.trim(),
      store: data.store.trim(),

      customerType: data.customerType,

      mobile: data.mobile.trim(),
      alternateMobile: data.alternateMobile?.trim() || undefined,

      email: data.email?.trim() || undefined,

      gender: data.gender || undefined,

      dob: data.dob || undefined,
      anniversary: data.anniversary || undefined,

      gstNumber: data.gstNumber?.trim() || undefined,
      panNumber: data.panNumber?.trim() || undefined,
      companyName: data.companyName?.trim() || undefined,

      addresses: [
        {
          addressType: data.addressType,
          addressLine1: data.addressLine1?.trim() || undefined,
          addressLine2: data.addressLine2?.trim() || undefined,
          landmark: data.landmark?.trim() || undefined,
          city: data.city?.trim() || undefined,
          state: data.state?.trim() || undefined,
          country: data.country?.trim() || "India",
          pincode: data.pincode?.trim() || undefined,
          isDefault: true,
        },
      ],

      loyaltyPoints: Number(data.loyaltyPoints || 0),
      creditLimit: Number(data.creditLimit || 0),

      membershipType: data.membershipType,

      favoriteFood: data.favoriteFood
        ? data.favoriteFood
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [],

      notes: data.notes?.trim() || undefined,

      status: data.status,
    };

    await onSubmit(payload);
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit(onFormSubmit)}>
      {" "}
      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}
      <div className="customer-form-section">
        <h3>Basic Information</h3>

        <div className="customer-form-grid">
          <div className="customer-field">
            <Input
              label="Customer Code"
              name="customerCode"
              type="text"
              placeholder="CUS001"
              register={register}
              error={errors.customerCode?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="Customer Name"
              name="customerName"
              type="text"
              placeholder="Enter customer name"
              register={register}
              error={errors.customerName?.message}
            />
          </div>

          <div className="customer-field">
            <Select
              label="Customer Type"
              name="customerType"
              register={register}
              error={errors.customerType?.message}
              options={[
                { _id: "Walk In", label: "Walk In" },
                { _id: "Regular", label: "Regular" },
                { _id: "Corporate", label: "Corporate" },
                { _id: "VIP", label: "VIP" },
                { _id: "Online", label: "Online" },
              ]}
            />
          </div>

          <div className="customer-field">
            <Select
              label="Gender"
              name="gender"
              register={register}
              error={errors.gender?.message}
              options={[
                { _id: "", label: "Select Gender" },
                { _id: "Male", label: "Male" },
                { _id: "Female", label: "Female" },
                { _id: "Other", label: "Other" },
              ]}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          RESTAURANT / STORE
      ===================================================== */}
      <div className="customer-form-section">
        <h3>Restaurant & Store</h3>

        <div className="customer-form-grid">
          <div className="customer-field">
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

          <div className="customer-field">
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
          CONTACT
      ===================================================== */}
      <div className="customer-form-section">
        <h3>Contact Information</h3>

        <div className="customer-form-grid">
          <div className="customer-field">
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

          <div className="customer-field">
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
          <div className="customer-field">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="customer@email.com"
              register={register}
              error={errors.email?.message}
            />
          </div>
          <div className="customer-field">
            <Input
              label="Company Name"
              name="companyName"
              type="text"
              placeholder="Company name"
              register={register}
              error={errors.companyName?.message}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}
      <div className="customer-form-section">
        <h3>Personal Information</h3>

        <div className="customer-form-grid">
          <div className="customer-field">
            <Input
              label="Date of Birth"
              name="dob"
              type="date"
              register={register}
              error={errors.dob?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="Anniversary"
              name="anniversary"
              type="date"
              register={register}
              error={errors.anniversary?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="GST Number"
              name="gstNumber"
              type="text"
              placeholder="GST number"
              register={register}
              error={errors.gstNumber?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="PAN Number"
              name="panNumber"
              type="text"
              placeholder="PAN number"
              register={register}
              error={errors.panNumber?.message}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          ADDRESS
      ===================================================== */}
      <div className="customer-form-section">
        <h3>Address</h3>

        <div className="customer-form-grid">
          <div className="customer-field">
            <Select
              label="Address Type"
              name="addressType"
              register={register}
              error={errors.addressType?.message}
              options={[
                { _id: "Home", label: "Home" },
                { _id: "Office", label: "Office" },
                { _id: "Other", label: "Other" },
              ]}
            />
          </div>

          <div className="customer-field">
            <Input
              label="Address Line 1"
              name="addressLine1"
              type="text"
              placeholder="Address line 1"
              register={register}
              error={errors.addressLine1?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="Address Line 2"
              name="addressLine2"
              type="text"
              placeholder="Address line 2"
              register={register}
              error={errors.addressLine2?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="Landmark"
              name="landmark"
              type="text"
              placeholder="Landmark"
              register={register}
              error={errors.landmark?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="City"
              name="city"
              type="text"
              placeholder="City"
              register={register}
              error={errors.city?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="State"
              name="state"
              type="text"
              placeholder="State"
              register={register}
              error={errors.state?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="Country"
              name="country"
              type="text"
              placeholder="Country"
              register={register}
              error={errors.country?.message}
            />
          </div>

          <div className="customer-field">
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
          CUSTOMER SETTINGS
      ===================================================== */}
      <div className="customer-form-section">
        <h3>Customer Settings</h3>

        <div className="customer-form-grid">
          <div className="customer-field">
            <Select
              label="Membership Type"
              name="membershipType"
              register={register}
              error={errors.membershipType?.message}
              options={[
                { _id: "None", label: "None" },
                { _id: "Silver", label: "Silver" },
                { _id: "Gold", label: "Gold" },
                { _id: "Platinum", label: "Platinum" },
              ]}
            />
          </div>

          <div className="customer-field">
            <Input
              label="Loyalty Points"
              name="loyaltyPoints"
              type="number"
              min="0"
              register={register}
              error={errors.loyaltyPoints?.message}
            />
          </div>

          <div className="customer-field">
            <Input
              label="Credit Limit"
              name="creditLimit"
              type="number"
              min="0"
              register={register}
              error={errors.creditLimit?.message}
            />
          </div>

          <div className="customer-field">
            <Select
              label="Status"
              name="status"
              register={register}
              error={errors.status?.message}
              options={[
                { _id: "Active", label: "Active" },
                { _id: "Inactive", label: "Inactive" },
                { _id: "Blocked", label: "Blocked" },
              ]}
            />
          </div>

          <div className="customer-field customer-full-width">
            <Input
              label="Favorite Food"
              name="favoriteFood"
              type="text"
              placeholder="Pizza, Burger, Pasta"
              register={register}
              error={errors.favoriteFood?.message}
            />
          </div>

          <div className="customer-field customer-full-width">
            <Input
              label="Notes"
              name="notes"
              type="text"
              placeholder="Customer notes"
              register={register}
              error={errors.notes?.message}
            />
          </div>
        </div>
      </div>
      {/* =====================================================
          ACTIONS
      ===================================================== */}
      <div className="customer-form-actions">
        <CancelButton
          type="button"
          className="customer-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="customer-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingCustomer
              ? "Update Customer"
              : "Create Customer"}
        </SaveButton>
      </div>
    </form>
  );
};

export default CustomerForm;
