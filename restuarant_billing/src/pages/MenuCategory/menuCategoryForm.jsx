import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./MenuCategoryForm.css";

import { CancelButton, SaveButton } from "../../components/Common/Button";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

const initialForm = {
  restaurant: "",
  store: "",

  categoryCode: "",
  categoryName: "",
  displayName: "",

  description: "",

  image: "",
  icon: "",

  parentCategory: "",

  kitchenSection: "Main Kitchen",

  foodType: "Both",

  serviceType: [],

  displayOrder: 0,

  colorCode: "#4CAF50",

  isPopular: false,
  isAvailable: true,
  isActive: true,
};

const MenuCategoryForm = ({
  editingMenuCategory,
  onSubmit,
  onCancel,
  loading = false,
  restaurants = [],
  stores = [],
  menuCategories = [],
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  /* =========================================================
     LOAD EDIT DATA
  ========================================================= */

  useEffect(() => {
    if (editingMenuCategory) {
      reset({
        restaurant:
          typeof editingMenuCategory.restaurant === "object"
            ? editingMenuCategory.restaurant?._id || ""
            : editingMenuCategory.restaurant || "",

        store:
          typeof editingMenuCategory.store === "object"
            ? editingMenuCategory.store?._id || ""
            : editingMenuCategory.store || "",

        categoryCode: editingMenuCategory.categoryCode || "",

        categoryName: editingMenuCategory.categoryName || "",

        displayName: editingMenuCategory.displayName || "",

        description: editingMenuCategory.description || "",

        image: editingMenuCategory.image || "",

        icon: editingMenuCategory.icon || "",

        parentCategory:
          typeof editingMenuCategory.parentCategory === "object"
            ? editingMenuCategory.parentCategory?._id || ""
            : editingMenuCategory.parentCategory || "",

        kitchenSection: editingMenuCategory.kitchenSection || "Main Kitchen",

        foodType: editingMenuCategory.foodType || "Both",

        serviceType: editingMenuCategory.serviceType || [],

        displayOrder: editingMenuCategory.displayOrder || 0,

        colorCode: editingMenuCategory.colorCode || "#4CAF50",

        isPopular:
          editingMenuCategory.isPopular !== undefined
            ? editingMenuCategory.isPopular
            : false,

        isAvailable:
          editingMenuCategory.isAvailable !== undefined
            ? editingMenuCategory.isAvailable
            : true,

        isActive:
          editingMenuCategory.isActive !== undefined
            ? editingMenuCategory.isActive
            : true,
      });
    } else {
      reset(initialForm);
    }
  }, [editingMenuCategory, reset]);

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onFormSubmit = async (data) => {
    const payload = {
      restaurant: data.restaurant?.trim() || undefined,

      store: data.store?.trim() || undefined,

      categoryCode: data.categoryCode.trim().toUpperCase(),

      categoryName: data.categoryName.trim(),

      displayName: data.displayName?.trim() || undefined,

      description: data.description?.trim() || undefined,

      image: data.image?.trim() || undefined,

      icon: data.icon?.trim() || undefined,

      parentCategory: data.parentCategory?.trim() || null,

      kitchenSection: data.kitchenSection,

      foodType: data.foodType,

      serviceType: Array.isArray(data.serviceType) ? data.serviceType : [],

      displayOrder: Number(data.displayOrder || 0),

      colorCode: data.colorCode?.trim() || "#4CAF50",

      isPopular: data.isPopular,

      isAvailable: data.isAvailable,

      isActive: data.isActive,
    };

    console.log("Menu Category payload:", payload);

    await onSubmit(payload);
  };

  return (
    <form className="menu-category-form" onSubmit={handleSubmit(onFormSubmit)}>
      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <div className="menu-category-form-section">
        <h3>Basic Information</h3>

        <div className="menu-category-form-grid">
          <div className="menu-category-field">
            <Input
              label="Category Code"
              name="categoryCode"
              type="text"
              placeholder="CAT001"
              register={register}
              error={errors.categoryCode?.message}
            />
          </div>
          <div className="menu-category-field">
            <Input
              label="Category Name"
              name="categoryName"
              type="text"
              placeholder="Main Course"
              register={register}
              error={errors.categoryName?.message}
            />
          </div>
          <div className="menu-category-field">
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
          <div className="menu-category-field">
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
          <div className="menu-category-field">
            <Input
              label="Display Name"
              name="displayName"
              type="text"
              placeholder="Main Course"
              register={register}
              error={errors.displayName?.message}
            />
          </div>

          <div className="menu-category-field">
            <Select
              label="Food Type"
              name="foodType"
              register={register}
              error={errors.foodType?.message}
              options={[
                {
                  _id: "Veg",
                  label: "Veg",
                },
                {
                  _id: "Non Veg",
                  label: "Non Veg",
                },
                {
                  _id: "Both",
                  label: "Both",
                },
              ]}
            />
          </div>

          <div className="menu-category-field menu-category-full-width">
            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Short category description"
              register={register}
              error={errors.description?.message}
            />
          </div>
        </div>
      </div>

      <div className="menu-category-form-section">
        <h3>Restaurant & Store</h3>

        <div className="menu-category-form-grid">
          <div className="menu-category-field">
            {editingMenuCategory ? (
              <Select
                label="Parent Category"
                name="parentCategory"
                register={register}
                error={errors.parentCategory?.message}
                options={[
                  {
                    _id: "",
                    label: "No Parent Category",
                  },

                  ...menuCategories
                    .filter(
                      (category) => category._id !== editingMenuCategory?._id,
                    )
                    .map((category) => ({
                      _id: category._id,
                      label:
                        category.displayName ||
                        category.categoryName ||
                        category.categoryCode ||
                        category._id,
                    })),
                ]}
              />
            ) : (
              <Input
                label="Parent Category ID"
                name="parentCategory"
                type="text"
                placeholder="Enter parent category ObjectId"
                register={register}
                error={errors.parentCategory?.message}
              />
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          KITCHEN
      ===================================================== */}

      <div className="menu-category-form-section">
        <h3>Kitchen</h3>

        <div className="menu-category-form-grid">
          <div className="menu-category-field">
            <Select
              label="Kitchen Section"
              name="kitchenSection"
              register={register}
              error={errors.kitchenSection?.message}
              options={[
                {
                  _id: "Main Kitchen",
                  label: "Main Kitchen",
                },
                {
                  _id: "Chinese",
                  label: "Chinese",
                },
                {
                  _id: "South Indian",
                  label: "South Indian",
                },
                {
                  _id: "North Indian",
                  label: "North Indian",
                },
                {
                  _id: "Tandoor",
                  label: "Tandoor",
                },
                {
                  _id: "Bakery",
                  label: "Bakery",
                },
                {
                  _id: "Dessert",
                  label: "Dessert",
                },
                {
                  _id: "Beverage",
                  label: "Beverage",
                },
                {
                  _id: "Bar",
                  label: "Bar",
                },
                {
                  _id: "Fast Food",
                  label: "Fast Food",
                },
              ]}
            />
          </div>

          <div className="menu-category-field">
            <Input
              label="Display Order"
              name="displayOrder"
              type="number"
              min="0"
              register={register}
              error={errors.displayOrder?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          SERVICE TYPES
      ===================================================== */}

      <div className="menu-category-form-section">
        <h3>Service Types</h3>

        <div className="menu-category-service-grid">
          <label className="menu-category-checkbox-label">
            <input
              type="checkbox"
              value="Dine In"
              {...register("serviceType")}
            />
            Dine In
          </label>

          <label className="menu-category-checkbox-label">
            <input
              type="checkbox"
              value="Take Away"
              {...register("serviceType")}
            />
            Take Away
          </label>

          <label className="menu-category-checkbox-label">
            <input
              type="checkbox"
              value="Delivery"
              {...register("serviceType")}
            />
            Delivery
          </label>

          <label className="menu-category-checkbox-label">
            <input
              type="checkbox"
              value="Drive Thru"
              {...register("serviceType")}
            />
            Drive Thru
          </label>
        </div>
      </div>

      {/* =====================================================
          MEDIA
      ===================================================== */}

      <div className="menu-category-form-section">
        <h3>Media</h3>

        <div className="menu-category-form-grid">
          <div className="menu-category-field">
            <Input
              label="Image URL"
              name="image"
              type="text"
              placeholder="https://..."
              register={register}
              error={errors.image?.message}
            />
          </div>

          <div className="menu-category-field">
            <Input
              label="Icon"
              name="icon"
              type="text"
              placeholder="Icon name or URL"
              register={register}
              error={errors.icon?.message}
            />
          </div>

          <div className="menu-category-field">
            <Input
              label="Color Code"
              name="colorCode"
              type="text"
              placeholder="#4CAF50"
              register={register}
              error={errors.colorCode?.message}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          CATEGORY SETTINGS
      ===================================================== */}

      <div className="menu-category-form-section">
        <h3>Category Settings</h3>

        <div className="menu-category-form-grid">
          <div className="menu-category-field menu-category-checkbox-field">
            <label>
              <input type="checkbox" {...register("isPopular")} />
              Popular Category
            </label>
          </div>

          <div className="menu-category-field menu-category-checkbox-field">
            <label>
              <input type="checkbox" {...register("isAvailable")} />
              Available
            </label>
          </div>

          <div className="menu-category-field menu-category-checkbox-field">
            <label>
              <input type="checkbox" {...register("isActive")} />
              Active
            </label>
          </div>
        </div>
      </div>

      {/* =====================================================
          ACTIONS
      ===================================================== */}

      <div className="menu-category-form-actions">
        <CancelButton
          type="button"
          className="menu-category-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="menu-category-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingMenuCategory
              ? "Update Menu Category"
              : "Create Menu Category"}
        </SaveButton>
      </div>
    </form>
  );
};

export default MenuCategoryForm;
