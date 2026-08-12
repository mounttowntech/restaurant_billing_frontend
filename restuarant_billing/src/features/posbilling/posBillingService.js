import API from "../../services/api";

// ==================================================
// CREATE POS BILL
// ==================================================

export const createPOSBillApi = async (data) => {
  const response = await API.post("/pos-billing/create", data);

  return response.data.data;
};

// ==================================================
// GET ALL POS BILLS
// ==================================================

export const getPOSBillsApi = async (params = {}) => {
  const response = await API.get("/pos-billing/all", {
    params,
  });

  return response.data;
};

// ==================================================
// GET POS BILL BY ID
// ==================================================

export const getPOSBillByIdApi = async (id) => {
  const response = await API.get(`/pos-billing/${id}`);

  return response.data.data;
};

// ==================================================
// HOLD BILL
// ==================================================

export const holdBillApi = async (id) => {
  const response = await API.patch(`/pos-billing/hold/${id}`);

  return response.data.data;
};

// ==================================================
// RESUME BILL
// ==================================================

export const resumeBillApi = async (id) => {
  const response = await API.patch(`/pos-billing/resume/${id}`);

  return response.data.data;
};

// ==================================================
// APPLY DISCOUNT
// ==================================================

export const applyDiscountApi = async ({
  id,
  discountPercentage,
  discountAmount,
}) => {
  const response = await API.patch(`/pos-billing/discount/${id}`, {
    discountPercentage,
    discountAmount,
  });

  return response.data.data;
};

// ==================================================
// APPLY COUPON
// ==================================================

export const applyCouponApi = async ({ id, couponCode, couponDiscount }) => {
  const response = await API.patch(`/pos-billing/coupon/${id}`, {
    couponCode,
    couponDiscount,
  });

  return response.data.data;
};

// ==================================================
// CALCULATE TAX
// ==================================================

export const calculateTaxApi = async ({
  id,
  cgstPercentage,
  sgstPercentage,
  igstPercentage,
}) => {
  const response = await API.patch(`/pos-billing/tax/${id}`, {
    cgstPercentage,
    sgstPercentage,
    igstPercentage,
  });

  return response.data.data;
};

// ==================================================
// PAYMENT
// ==================================================

export const makePaymentApi = async ({ id, method, amount, referenceNo }) => {
  const response = await API.post(`/pos-billing/payment/${id}`, {
    method,
    amount,
    referenceNo,
  });

  return response.data.data;
};

// ==================================================
// PRINT BILL
// ==================================================

export const printBillApi = async (id) => {
  const response = await API.get(`/pos-billing/print/${id}`);

  return response.data.data;
};

// ==================================================
// CANCEL BILL
// ==================================================

export const cancelBillApi = async ({ id, cancelReason }) => {
  const response = await API.patch(`/pos-billing/cancel/${id}`, {
    cancelReason,
  });

  return response.data.data;
};
