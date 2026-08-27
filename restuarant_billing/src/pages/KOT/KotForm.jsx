// KotForm.jsx
// CHANGES ONLY

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import "./KotForm.css";

import {
  AddButton,
  CancelButton,
  SaveButton,
} from "../../components/Common/Button";

import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";
import { fetchStores } from "../../features/store/storeSlice";
import { fetchCustomers } from "../../features/customer/customerSlice";
import { fetchOrders } from "../../features/order/orderSlice";
import { fetchMenuItems } from "../../features/menuItem/menuItemSlice";

// ==========================================================
// INITIAL FORM
// ==========================================================

const initialForm = {
  kotNo: "",
  restaurant: "",
  store: "",
  order: "",
  customer: "",
  reservation: "",
  table: "",
  waiter: "",
  chef: "",
  kotType: "Dine In",
  priority: "Normal",
  kotDate: "",
  remarks: "",

  items: [
    {
      orderItem: "",
      menuItem: "",
      recipe: "",
      menuCode: "",
      menuName: "",
      quantity: 1,
      preparedQuantity: 0,
      servedQuantity: 0,
      estimatedPreparationTime: 15,
      kitchenStatus: "Pending",
      chefRemarks: "",
      remarks: "",
    },
  ],
};

// ==========================================================
// HELPER
// ==========================================================

const getId = (value) => {
  if (!value) return "";

  if (typeof value === "object") {
    return value._id || value.id || "";
  }

  return value;
};

// ==========================================================
// COMPONENT
// ==========================================================

const KotForm = ({ editingKOT, onSubmit, onCancel, loading = false }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  // ==========================================================
  // REDUX DATA
  // ==========================================================

  const restaurants = useSelector(
    (state) => state.restaurants?.restaurants || [],
  );

  const stores = useSelector((state) => state.stores?.stores || []);

  const customers = useSelector((state) => state.customer?.customers || []);

  const orders = useSelector((state) => state.order?.orders || []);

  const menuItems = useSelector((state) => state.menuItem?.menuItems || []);

  // ==========================================================
  // FIELD ARRAY
  // ==========================================================

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // ==========================================================
  // DYNAMIC BACKEND FETCH
  // ==========================================================

  const loadRestaurants = () => {
    if (!restaurants.length) {
      dispatch(fetchRestaurants());
    }
  };

  const loadStores = () => {
    if (!stores.length) {
      dispatch(fetchStores());
    }
  };

  const loadCustomers = () => {
    if (!customers.length) {
      dispatch(fetchCustomers());
    }
  };

  const loadOrders = () => {
    if (!orders.length) {
      dispatch(fetchOrders());
    }
  };

  const loadMenuItems = () => {
    if (!menuItems.length) {
      dispatch(fetchMenuItems());
    }
  };

  // ==========================================================
  // OPTIONS FROM BACKEND DATA
  // ==========================================================

  const restaurantOptions = restaurants.map((item) => ({
    _id: item._id,
    label:
      item.name ||
      item.restaurantName ||
      item.code ||
      item.restaurantCode ||
      item._id,
  }));

  const storeOptions = stores.map((item) => ({
    _id: item._id,
    label:
      item.name || item.storeName || item.code || item.storeCode || item._id,
  }));

  const customerOptions = customers.map((item) => ({
    _id: item._id,
    label:
      item.name ||
      item.customerName ||
      `${item.firstName || ""} ${item.lastName || ""}`.trim() ||
      item.phone ||
      item._id,
  }));

  const orderOptions = orders.map((item) => ({
    _id: item._id,
    label: item.orderNo || item.orderNumber || item.invoiceNo || item._id,
  }));

  const menuItemOptions = menuItems.map((item) => ({
    _id: item._id,
    label:
      item.menuName || item.name || item.itemName || item.menuCode || item._id,
  }));

  // ==========================================================
  // EDIT DATA
  // ==========================================================

  useEffect(() => {
    if (!editingKOT) {
      reset(initialForm);
      return;
    }

    reset({
      kotNo: editingKOT.kotNo || "",

      restaurant: getId(editingKOT.restaurant),

      store: getId(editingKOT.store),

      order: getId(editingKOT.order),

      customer: getId(editingKOT.customer),

      reservation: getId(editingKOT.reservation),

      table: getId(editingKOT.table),

      waiter: getId(editingKOT.waiter),

      chef: getId(editingKOT.chef),

      kotType: editingKOT.kotType || "Dine In",

      priority: editingKOT.priority || "Normal",

      kotDate: editingKOT.kotDate
        ? new Date(editingKOT.kotDate).toISOString().slice(0, 16)
        : "",

      remarks: editingKOT.remarks || "",

      items:
        editingKOT.items?.length > 0
          ? editingKOT.items.map((item) => ({
              orderItem: getId(item.orderItem),

              menuItem: getId(item.menuItem),

              recipe: getId(item.recipe),

              menuCode: item.menuCode || "",

              menuName: item.menuName || "",

              quantity: Number(item.quantity ?? 1),

              preparedQuantity: Number(item.preparedQuantity ?? 0),

              servedQuantity: Number(item.servedQuantity ?? 0),

              estimatedPreparationTime: Number(
                item.estimatedPreparationTime ?? 15,
              ),

              kitchenStatus: item.kitchenStatus || "Pending",

              chefRemarks: item.chefRemarks || "",

              remarks: item.remarks || "",
            }))
          : initialForm.items,
    });
  }, [editingKOT, reset]);

  // ==========================================================
  // IMPORTANT:
  // LOAD OPTIONS WHEN EDITING
  // ==========================================================

  useEffect(() => {
    if (editingKOT) {
      loadRestaurants();
      loadStores();
      loadCustomers();
      loadOrders();
      loadMenuItems();
    }
  }, [editingKOT]);

  // ==========================================================
  // ADD ITEM
  // ==========================================================

  const handleAddItem = () => {
    append({
      orderItem: "",
      menuItem: "",
      recipe: "",
      menuCode: "",
      menuName: "",
      quantity: 1,
      preparedQuantity: 0,
      servedQuantity: 0,
      estimatedPreparationTime: 15,
      kitchenStatus: "Pending",
      chefRemarks: "",
      remarks: "",
    });
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const onFormSubmit = async (data) => {
    const payload = {
      kotNo: data.kotNo?.trim() || undefined,

      restaurant: data.restaurant || undefined,

      store: data.store || undefined,

      order: data.order || undefined,

      customer: data.customer || undefined,

      reservation: data.reservation || undefined,

      table: data.table || undefined,

      waiter: data.waiter || undefined,

      chef: data.chef || undefined,

      kotType: data.kotType,

      priority: data.priority,

      kotDate: data.kotDate ? new Date(data.kotDate) : undefined,

      remarks: data.remarks?.trim() || undefined,

      items: data.items.map((item) => ({
        orderItem: item.orderItem || undefined,

        menuItem: item.menuItem || undefined,

        recipe: item.recipe || undefined,

        menuCode: item.menuCode?.trim() || undefined,

        menuName: item.menuName?.trim() || undefined,

        quantity: Number(item.quantity || 1),

        preparedQuantity: Number(item.preparedQuantity || 0),

        servedQuantity: Number(item.servedQuantity || 0),

        estimatedPreparationTime: Number(item.estimatedPreparationTime || 15),

        kitchenStatus: item.kitchenStatus || "Pending",

        chefRemarks: item.chefRemarks?.trim() || undefined,

        remarks: item.remarks?.trim() || undefined,
      })),
    };

    await onSubmit(payload);
  };

  return (
    <form className="kot-form" onSubmit={handleSubmit(onFormSubmit)}>
      {/* ======================================================
          BASIC INFORMATION
      ====================================================== */}

      <div className="kot-form-section">
        <h3>Basic Information</h3>

        <div className="kot-form-grid">
          <div className="kot-field">
            <Input
              label="KOT Number"
              name="kotNo"
              type="text"
              placeholder="KOT001"
              register={register}
              error={errors.kotNo?.message}
            />
          </div>

          {/* RESTAURANT */}

          <div className="kot-field">
            <Select
              label="Restaurant"
              name="restaurant"
              register={register}
              error={errors.restaurant?.message}
              options={restaurantOptions}
              onClick={loadRestaurants}
              onFocus={loadRestaurants}
            />
          </div>

          {/* STORE */}

          <div className="kot-field">
            <Select
              label="Store"
              name="store"
              register={register}
              error={errors.store?.message}
              options={storeOptions}
              onClick={loadStores}
              onFocus={loadStores}
            />
          </div>

          {/* ORDER */}

          <div className="kot-field">
            <Select
              label="Order"
              name="order"
              register={register}
              error={errors.order?.message}
              options={orderOptions}
              onClick={loadOrders}
              onFocus={loadOrders}
            />
          </div>

          {/* KOT TYPE */}

          <div className="kot-field">
            <Select
              label="KOT Type"
              name="kotType"
              register={register}
              error={errors.kotType?.message}
              options={[
                { _id: "Dine In", label: "Dine In" },
                { _id: "Takeaway", label: "Takeaway" },
                { _id: "Delivery", label: "Delivery" },
                { _id: "Online", label: "Online" },
                { _id: "QR Order", label: "QR Order" },
              ]}
            />
          </div>

          {/* PRIORITY */}

          <div className="kot-field">
            <Select
              label="Priority"
              name="priority"
              register={register}
              error={errors.priority?.message}
              options={[
                { _id: "Low", label: "Low" },
                { _id: "Normal", label: "Normal" },
                { _id: "High", label: "High" },
                { _id: "Urgent", label: "Urgent" },
              ]}
            />
          </div>

          <div className="kot-field">
            <Input
              label="KOT Date"
              name="kotDate"
              type="datetime-local"
              register={register}
              error={errors.kotDate?.message}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          ORDER INFORMATION
      ====================================================== */}

      <div className="kot-form-section">
        <h3>Order Information</h3>

        <div className="kot-form-grid">
          {/* CUSTOMER */}

          <div className="kot-field">
            <Select
              label="Customer"
              name="customer"
              register={register}
              error={errors.customer?.message}
              options={customerOptions}
              onClick={loadCustomers}
              onFocus={loadCustomers}
            />
          </div>

          <div className="kot-field">
            <Input
              label="Reservation ID"
              name="reservation"
              type="text"
              placeholder="Reservation ObjectId"
              register={register}
              error={errors.reservation?.message}
            />
          </div>

          <div className="kot-field">
            <Input
              label="Table ID"
              name="table"
              type="text"
              placeholder="Table ObjectId"
              register={register}
              error={errors.table?.message}
            />
          </div>

          <div className="kot-field">
            <Input
              label="Waiter ID"
              name="waiter"
              type="text"
              placeholder="Waiter ObjectId"
              register={register}
              error={errors.waiter?.message}
            />
          </div>

          <div className="kot-field">
            <Input
              label="Chef ID"
              name="chef"
              type="text"
              placeholder="Chef ObjectId"
              register={register}
              error={errors.chef?.message}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          KOT ITEMS
      ====================================================== */}

      <div className="kot-form-section">
        <div className="kot-items-header">
          <div>
            <h3>KOT Items</h3>
            <p>Add menu items for this kitchen order.</p>
          </div>

          <AddButton
            type="button"
            className="kot-add-item-btn"
            onClick={handleAddItem}
          >
            + Add Item
          </AddButton>
        </div>

        <div className="kot-items-container">
          {fields.map((field, index) => (
            <div className="kot-item-card" key={field.id}>
              <div className="kot-item-header">
                <h4>Item {index + 1}</h4>

                {fields.length > 1 && (
                  <button
                    type="button"
                    className="kot-remove-item-btn"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="kot-form-grid">
                {/* ORDER ITEM */}

                <div className="kot-field">
                  <Input
                    label="Order Item ID"
                    name={`items.${index}.orderItem`}
                    type="text"
                    placeholder="Order Item ObjectId"
                    register={register}
                    error={errors.items?.[index]?.orderItem?.message}
                  />
                </div>

                {/* MENU ITEM */}

                <div className="kot-field">
                  <Select
                    label="Menu Item"
                    name={`items.${index}.menuItem`}
                    register={register}
                    error={errors.items?.[index]?.menuItem?.message}
                    options={menuItemOptions}
                    onClick={loadMenuItems}
                    onFocus={loadMenuItems}
                  />
                </div>

                {/* RECIPE */}

                <div className="kot-field">
                  <Input
                    label="Recipe ID"
                    name={`items.${index}.recipe`}
                    type="text"
                    placeholder="Recipe ObjectId"
                    register={register}
                    error={errors.items?.[index]?.recipe?.message}
                  />
                </div>

                <div className="kot-field">
                  <Input
                    label="Menu Code"
                    name={`items.${index}.menuCode`}
                    type="text"
                    placeholder="MENU001"
                    register={register}
                    error={errors.items?.[index]?.menuCode?.message}
                  />
                </div>

                <div className="kot-field">
                  <Input
                    label="Menu Name"
                    name={`items.${index}.menuName`}
                    type="text"
                    placeholder="Chicken Biriyani"
                    register={register}
                    error={errors.items?.[index]?.menuName?.message}
                  />
                </div>

                <div className="kot-field">
                  <Input
                    label="Quantity"
                    name={`items.${index}.quantity`}
                    type="number"
                    min="1"
                    register={register}
                    error={errors.items?.[index]?.quantity?.message}
                  />
                </div>

                <div className="kot-field">
                  <Input
                    label="Prepared Quantity"
                    name={`items.${index}.preparedQuantity`}
                    type="number"
                    min="0"
                    register={register}
                    error={errors.items?.[index]?.preparedQuantity?.message}
                  />
                </div>

                <div className="kot-field">
                  <Input
                    label="Served Quantity"
                    name={`items.${index}.servedQuantity`}
                    type="number"
                    min="0"
                    register={register}
                    error={errors.items?.[index]?.servedQuantity?.message}
                  />
                </div>

                <div className="kot-field">
                  <Input
                    label="Preparation Time (mins)"
                    name={`items.${index}.estimatedPreparationTime`}
                    type="number"
                    min="0"
                    register={register}
                    error={
                      errors.items?.[index]?.estimatedPreparationTime?.message
                    }
                  />
                </div>

                {/* KITCHEN STATUS */}

                <div className="kot-field">
                  <Select
                    label="Kitchen Status"
                    name={`items.${index}.kitchenStatus`}
                    register={register}
                    error={errors.items?.[index]?.kitchenStatus?.message}
                    options={[
                      { _id: "Pending", label: "Pending" },
                      { _id: "Preparing", label: "Preparing" },
                      { _id: "Ready", label: "Ready" },
                      { _id: "Served", label: "Served" },
                      { _id: "Cancelled", label: "Cancelled" },
                    ]}
                  />
                </div>

                <div className="kot-field kot-full-width">
                  <Input
                    label="Chef Remarks"
                    name={`items.${index}.chefRemarks`}
                    type="text"
                    placeholder="Chef instructions"
                    register={register}
                    error={errors.items?.[index]?.chefRemarks?.message}
                  />
                </div>

                <div className="kot-field kot-full-width">
                  <Input
                    label="Item Remarks"
                    name={`items.${index}.remarks`}
                    type="text"
                    placeholder="Item remarks"
                    register={register}
                    error={errors.items?.[index]?.remarks?.message}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================
          REMARKS
      ====================================================== */}

      <div className="kot-form-section">
        <h3>Remarks</h3>

        <div className="kot-form-grid">
          <div className="kot-field kot-full-width">
            <Input
              label="KOT Remarks"
              name="remarks"
              type="text"
              placeholder="Enter KOT remarks"
              register={register}
              error={errors.remarks?.message}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          ACTIONS
      ====================================================== */}

      <div className="kot-form-actions">
        <CancelButton
          type="button"
          className="kot-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton type="submit" className="kot-submit-btn" disabled={loading}>
          {loading ? "Saving..." : editingKOT ? "Update KOT" : "Create KOT"}
        </SaveButton>
      </div>
    </form>
  );
};

export default KotForm;
