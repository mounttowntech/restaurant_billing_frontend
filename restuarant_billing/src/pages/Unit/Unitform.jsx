import { useEffect, useMemo, useState } from "react";
import { CancelButton, SaveButton } from "../../components/Common/Button";
import "./UnitForm.css";

const initialForm = {
  restaurant: "",
  unitName: "",
  unitCode: "",
  description: "",
  unitType: "Quantity",
  conversionValue: 1,
  baseUnit: "",
  isActive: true,
};

const UnitForm = ({
  initialData = null,
  restaurants = [],
  units = [],
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialForm);

  /* ==========================================================
Edit Data
========================================================== */

  useEffect(() => {
    if (!initialData) {
      setFormData(initialForm);
      return;
    }

    setFormData({
      restaurant: initialData.restaurant?._id || initialData.restaurant || "",

      unitName: initialData.unitName || "",

      unitCode: initialData.unitCode || "",

      description: initialData.description || "",

      unitType: initialData.unitType || "Quantity",

      conversionValue: initialData.conversionValue ?? 1,

      baseUnit: initialData.baseUnit?._id || initialData.baseUnit || "",

      isActive: initialData.isActive ?? true,
    });
  }, [initialData]);

  /* ==========================================================
Base Units

 Only show units belonging to selected restaurant.

========================================================== */

  const baseUnits = useMemo(() => {
    if (!formData.restaurant) {
      return [];
    }

    return units.filter((unit) => {
      const restaurantId = unit.restaurant?._id || unit.restaurant;

      return restaurantId?.toString() === formData.restaurant?.toString();
    });
  }, [units, formData.restaurant]);

  /* ==========================================================
Change Handler
========================================================== */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ==========================================================
Restaurant Change

 Reset base unit when restaurant changes.

========================================================== */

  const handleRestaurantChange = (event) => {
    const restaurantId = event.target.value;

    setFormData((previous) => ({
      ...previous,
      restaurant: restaurantId,
      baseUnit: "",
    }));
  };

  /* ==========================================================
Submit
========================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      restaurant: formData.restaurant,

      unitName: formData.unitName.trim(),

      unitCode: formData.unitCode.trim().toUpperCase(),

      description: formData.description.trim(),

      unitType: formData.unitType,

      conversionValue: Number(formData.conversionValue),

      baseUnit: formData.baseUnit || null,

      isActive: formData.isActive,
    };

    onSubmit(payload);
  };

  return (
    <form className="unit-form" onSubmit={handleSubmit}>
      <div className="unit-form-grid">
        {/* ====================================================
Restaurant
==================================================== */}

        <div className="unit-form-group">
          <label>
            Restaurant <span>*</span>
          </label>

          <select
            name="restaurant"
            value={formData.restaurant}
            onChange={handleRestaurantChange}
            required
          >
            <option value="">Select Restaurant</option>

            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.restaurantName}
                {restaurant.restaurantCode
                  ? ` (${restaurant.restaurantCode})`
                  : ""}
              </option>
            ))}
          </select>
        </div>

        {/* ====================================================
        Unit Name
    ==================================================== */}

        <div className="unit-form-group">
          <label>
            Unit Name <span>*</span>
          </label>

          <input
            type="text"
            name="unitName"
            value={formData.unitName}
            onChange={handleChange}
            placeholder="Enter unit name"
            required
          />
        </div>

        {/* ====================================================
        Unit Code
    ==================================================== */}

        <div className="unit-form-group">
          <label>
            Unit Code <span>*</span>
          </label>

          <input
            type="text"
            name="unitCode"
            value={formData.unitCode}
            onChange={handleChange}
            placeholder="KG, GM, LTR, PCS"
            maxLength={10}
            required
          />
        </div>

        {/* ====================================================
        Unit Type
    ==================================================== */}

        <div className="unit-form-group">
          <label>
            Unit Type <span>*</span>
          </label>

          <select
            name="unitType"
            value={formData.unitType}
            onChange={handleChange}
            required
          >
            <option value="Quantity">Quantity</option>

            <option value="Weight">Weight</option>

            <option value="Volume">Volume</option>

            <option value="Length">Length</option>

            <option value="Other">Other</option>
          </select>
        </div>

        {/* ====================================================
        Conversion Value
    ==================================================== */}

        <div className="unit-form-group">
          <label>
            Conversion Value <span>*</span>
          </label>

          <input
            type="number"
            name="conversionValue"
            value={formData.conversionValue}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        {/* ====================================================
        Base Unit
    ==================================================== */}

        <div className="unit-form-group">
          <label>Base Unit</label>

          <select
            name="baseUnit"
            value={formData.baseUnit}
            onChange={handleChange}
            disabled={!formData.restaurant}
          >
            <option value="">No Base Unit</option>

            {baseUnits
              .filter((unit) => unit._id !== initialData?._id)
              .map((unit) => (
                <option key={unit._id} value={unit._id}>
                  {unit.unitName} ({unit.unitCode})
                </option>
              ))}
          </select>

          {!formData.restaurant && <small>Select a restaurant first.</small>}
        </div>

        {/* ====================================================
        Description
    ==================================================== */}

        <div className="unit-form-group unit-form-full">
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="3"
          />
        </div>

        {/* ====================================================
        Status
    ==================================================== */}

        <div className="unit-form-group unit-status-group">
          <label>Status</label>

          <label className="unit-switch">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />

            <span className="unit-slider"></span>

            <span className="unit-status-text">
              {formData.isActive ? "Active" : "Inactive"}
            </span>
          </label>
        </div>
      </div>

      {/* ======================================================
      Buttons
  ====================================================== */}

      <div className="unit-form-actions">
        <CancelButton
          type="button"
          className="unit-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="unit-submit-btn"
          disabled={loading}
        >
          {loading ? "Saving..." : initialData ? "Update Unit" : "Create Unit"}
        </SaveButton>
      </div>
    </form>
  );
};

export default UnitForm;
