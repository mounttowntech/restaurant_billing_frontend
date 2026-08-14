import * as yup from "yup";

const productValidation = yup.object().shape({
  productCode: yup.string().trim().required("Product code is required"),

  productName: yup.string().trim().required("Product name is required"),

  store: yup.string().trim().required("Store ID is required"),

  description: yup.string().trim(),

  category: yup.string().trim(),

  purchasePrice: yup
    .number()
    .typeError("Purchase price must be a number")
    .min(0, "Purchase price cannot be negative"),

  sellingPrice: yup
    .number()
    .typeError("Selling price must be a number")
    .min(0, "Selling price cannot be negative")
    .required("Selling price is required"),

  mrp: yup
    .number()
    .typeError("MRP must be a number")
    .min(0, "MRP cannot be negative"),

  taxPercentage: yup
    .number()
    .typeError("Tax percentage must be a number")
    .min(0, "Tax percentage cannot be negative")
    .max(100, "Tax percentage cannot exceed 100"),

  taxInclusive: yup.boolean(),

  unit: yup.string().trim(),

  openingStock: yup
    .number()
    .typeError("Opening stock must be a number")
    .min(0, "Opening stock cannot be negative"),

  currentStock: yup
    .number()
    .typeError("Current stock must be a number")
    .min(0, "Current stock cannot be negative"),

  minimumStock: yup
    .number()
    .typeError("Minimum stock must be a number")
    .min(0, "Minimum stock cannot be negative"),

  trackInventory: yup.boolean(),

  productType: yup
    .string()
    .oneOf(["Food", "Beverage", "Addon", "Raw Material", "Other"]),

  kitchenName: yup.string().trim(),

  preparationTime: yup
    .number()
    .typeError("Preparation time must be a number")
    .min(0, "Preparation time cannot be negative"),

  isAvailable: yup.boolean(),

  isActive: yup.boolean(),
});

export default productValidation;
