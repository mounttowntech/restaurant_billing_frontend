import * as yup from "yup";

const customerValidation = yup.object().shape({
  // =====================================================
  // BASIC INFORMATION
  // =====================================================

  customerCode: yup
    .string()
    .trim()
    .required("Customer code is required.")
    .max(50, "Customer code must not exceed 50 characters."),

  customerName: yup
    .string()
    .trim()
    .required("Customer name is required.")
    .min(2, "Customer name must contain at least 2 characters.")
    .max(100, "Customer name must not exceed 100 characters."),

  customerType: yup
    .string()
    .oneOf(
      ["Walk In", "Regular", "Corporate", "VIP", "Online"],
      "Invalid customer type.",
    )
    .required("Customer type is required."),

  gender: yup
    .string()
    .oneOf(["", "Male", "Female", "Other"], "Invalid gender.")
    .nullable(),

  // =====================================================
  // RESTAURANT & STORE
  // =====================================================

  restaurant: yup.string().trim().required("Restaurant is required."),

  store: yup.string().trim().required("Store is required."),

  // =====================================================
  // CONTACT INFORMATION
  // =====================================================

  mobile: yup
    .string()
    .trim()
    .required("Mobile number is required.")
    .matches(/^[0-9]{10}$/, "Mobile number must contain exactly 10 digits."),

  alternateMobile: yup
    .string()
    .trim()
    .test(
      "alternate-mobile",
      "Alternate mobile number must contain exactly 10 digits.",
      (value) => {
        if (!value) {
          return true;
        }

        return /^[0-9]{10}$/.test(value);
      },
    ),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(150, "Email must not exceed 150 characters.")
    .nullable()
    .transform((value) => {
      return value === "" ? null : value;
    }),

  companyName: yup
    .string()
    .trim()
    .max(150, "Company name must not exceed 150 characters.")
    .nullable(),

  // =====================================================
  // PERSONAL INFORMATION
  // =====================================================

  dob: yup.string().nullable(),

  anniversary: yup.string().nullable(),

  gstNumber: yup
    .string()
    .trim()
    .max(20, "GST number must not exceed 20 characters.")
    .nullable(),

  panNumber: yup
    .string()
    .trim()
    .max(20, "PAN number must not exceed 20 characters.")
    .nullable(),

  // =====================================================
  // ADDRESS
  // =====================================================

  addressType: yup
    .string()
    .oneOf(["Home", "Office", "Other"], "Invalid address type.")
    .required("Address type is required."),

  addressLine1: yup
    .string()
    .trim()
    .max(200, "Address line 1 must not exceed 200 characters.")
    .nullable(),

  addressLine2: yup
    .string()
    .trim()
    .max(200, "Address line 2 must not exceed 200 characters.")
    .nullable(),

  landmark: yup
    .string()
    .trim()
    .max(100, "Landmark must not exceed 100 characters.")
    .nullable(),

  city: yup
    .string()
    .trim()
    .max(100, "City must not exceed 100 characters.")
    .nullable(),

  state: yup
    .string()
    .trim()
    .max(100, "State must not exceed 100 characters.")
    .nullable(),

  country: yup
    .string()
    .trim()
    .required("Country is required.")
    .max(100, "Country must not exceed 100 characters."),

  pincode: yup
    .string()
    .trim()
    .test("pincode", "Pincode must contain exactly 6 digits.", (value) => {
      if (!value) {
        return true;
      }

      return /^[0-9]{6}$/.test(value);
    }),

  // =====================================================
  // CUSTOMER SETTINGS
  // =====================================================

  loyaltyPoints: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? 0 : value;
    })
    .typeError("Loyalty points must be a number.")
    .min(0, "Loyalty points cannot be negative.")
    .default(0),

  creditLimit: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? 0 : value;
    })
    .typeError("Credit limit must be a number.")
    .min(0, "Credit limit cannot be negative.")
    .default(0),

  membershipType: yup
    .string()
    .oneOf(["None", "Silver", "Gold", "Platinum"], "Invalid membership type.")
    .required("Membership type is required."),

  favoriteFood: yup
    .string()
    .trim()
    .max(500, "Favorite food must not exceed 500 characters.")
    .nullable(),

  notes: yup
    .string()
    .trim()
    .max(1000, "Notes must not exceed 1000 characters.")
    .nullable(),

  status: yup
    .string()
    .oneOf(["Active", "Inactive", "Blocked"], "Invalid customer status.")
    .required("Status is required."),
});

export default customerValidation;
