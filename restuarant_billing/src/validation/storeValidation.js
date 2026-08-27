/**
 * Validates the store form data.
 * @param {object} formData
 * @param {boolean} isEdit - true when editing an existing store
 * @returns {string|null} an error message, or null when valid
 */
export const validateStoreForm = (formData, isEdit = false) => {
  console.log("formData:", formData, "isEdit:", isEdit);
  if (!isEdit && !String(formData.restaurant || "").trim()) {
    return "Restaurant ID is required";
  }

  if (!String(formData.storeCode || "").trim()) {
    return "Store code is required";
  }

  if (!String(formData.storeName || "").trim()) {
    return "Store name is required";
  }

  if (!String(formData.phone || "").trim()) {
    return "Phone is required";
  }

  return null;
};

/**
 * Converts raw form-state strings into the properly
 * typed payload the API expects (numbers, nulls, etc).
 * @param {object} formData
 * @returns {object} payload ready to send to the API
 */
export const buildStorePayload = (formData) => ({
  ...formData,

  latitude: formData.latitude === "" ? null : Number(formData.latitude),

  longitude: formData.longitude === "" ? null : Number(formData.longitude),

  totalTables: Number(formData.totalTables) || 0,

  totalSeats: Number(formData.totalSeats) || 0,

  serviceChargePercentage: Number(formData.serviceChargePercentage) || 0,
});

/**
 * Strips fields the backend refuses to update once a
 * store already exists (restaurant + storeCode are
 * locked after creation).
 * @param {object} payload
 * @returns {object} payload safe to send on update
 */
export const buildStoreUpdatePayload = (payload) => {
  const { restaurant, storeCode, ...updatePayload } = payload;
  return updatePayload;
};
