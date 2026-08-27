import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "./TableForm.css";

import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

import { CancelButton, SaveButton } from "../../components/Common/Button";

const initialForm = {
  restaurant: "",
  store: "",
  tableCode: "",
  tableName: "",
  tableNumber: "",
  floor: "Ground Floor",
  section: "",
  capacity: 4,
  shape: "Square",
  qrCode: "",
  notes: "",
  statusColor: "#4CAF50",
};

const TableForm = ({
  editId,
  formData,
  loading,
  submitError,
  restaurants = [],
  stores = [],
  onSubmit,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  useEffect(() => {
    if (editId && formData) {
      reset({
        restaurant: formData.restaurant?._id || formData.restaurant || "",
        store: formData.store?._id || formData.store || "",
        tableCode: formData.tableCode || "",
        tableName: formData.tableName || "",
        tableNumber: formData.tableNumber || "",
        floor: formData.floor || "Ground Floor",
        section: formData.section || "",
        capacity: formData.capacity || 4,
        shape: formData.shape || "Square",
        qrCode: formData.qrCode || "",
        notes: formData.notes || "",
        statusColor: formData.statusColor || "#4CAF50",
      });
    } else {
      reset(initialForm);
    }
  }, [editId, formData, reset]);

  const restaurantOptions = restaurants.map((restaurant) => ({
    value: restaurant._id,
    label:
      restaurant.restaurantName || restaurant.name || restaurant.restaurantCode,
  }));

  const storeOptions = stores.map((store) => ({
    value: store._id,
    label: store.storeName || store.name || store.storeCode,
  }));

  const shapeOptions = [
    {
      value: "Square",
      label: "Square",
    },
    {
      value: "Rectangle",
      label: "Rectangle",
    },
    {
      value: "Round",
      label: "Round",
    },
  ];

  const submitHandler = (data) => {
    onSubmit({
      ...data,
      tableNumber: Number(data.tableNumber),
      capacity: Number(data.capacity),
    });
  };

  return (
    <form className="table-form" onSubmit={handleSubmit(submitHandler)}>
      <div className="table-form-section">
        <h3>Table Information</h3>

        <div className="table-form-grid">
          <div className="table-form-field">
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

          <div className="table-form-field">
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

          <div className="table-form-field">
            <Input
              label="Table Code"
              name="tableCode"
              register={register}
              required
              error={errors.tableCode?.message}
              placeholder="Enter table code"
            />
          </div>

          <div className="table-form-field">
            <Input
              label="Table Name"
              name="tableName"
              register={register}
              required
              error={errors.tableName?.message}
              placeholder="Enter table name"
            />
          </div>

          <div className="table-form-field">
            <Input
              label="Table Number"
              name="tableNumber"
              type="number"
              register={register}
              required
              error={errors.tableNumber?.message}
              placeholder="Enter table number"
            />
          </div>

          <div className="table-form-field">
            <Input
              label="Floor"
              name="floor"
              register={register}
              placeholder="Ground Floor"
            />
          </div>

          <div className="table-form-field">
            <Input
              label="Section"
              name="section"
              register={register}
              placeholder="Enter section"
            />
          </div>

          <div className="table-form-field">
            <Input
              label="Capacity"
              name="capacity"
              type="number"
              register={register}
              required
              placeholder="Number of seats"
            />
          </div>

          <div className="table-form-field">
            <Select
              label="Shape"
              name="shape"
              register={register}
              options={shapeOptions}
            />
          </div>

          <div className="table-form-field">
            <Input
              label="QR Code"
              name="qrCode"
              register={register}
              placeholder="Enter QR code"
            />
          </div>

          <div className="table-form-field">
            <Input
              label="Status Color"
              name="statusColor"
              type="color"
              register={register}
            />
          </div>
        </div>
      </div>

      <div className="table-form-section">
        <h3>Notes</h3>

        <div className="table-form-field table-form-full">
          <label>Notes</label>

          <textarea {...register("notes")} placeholder="Enter notes" rows="4" />
        </div>
      </div>

      {submitError && <div className="table-form-error">{submitError}</div>}

      <div className="table-form-actions">
        <CancelButton type="button" onClick={onClose}>
          Cancel
        </CancelButton>

        <SaveButton type="submit" disabled={loading}>
          {loading ? "Saving..." : editId ? "Update Table" : "Save Table"}
        </SaveButton>
      </div>
    </form>
  );
};

export default TableForm;
