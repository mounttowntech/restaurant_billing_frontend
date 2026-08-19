import { useEffect } from "react";
import { useForm } from "react-hook-form";

import "./CategoryForm.css";

import { CancelButton, SaveButton } from "../../components/Common/Button";

import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  restaurant: "",
  store: "",

  categoryCode: "",
  categoryName: "",

  parentCategory: "",

  description: "",

  image: "",
  icon: "",

  kitchenCategory: "Main Kitchen",

  displayOrder: 0,

  gstPercentage: 5,

  colorCode: "#2196F3",

  isVegCategory: false,

  isAvailable: true,

  isActive: true,
};

// =====================================================
// CATEGORY FORM
// =====================================================

const CategoryForm = ({
  editingCategory,
  onSubmit,
  categories = [],
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  const selectedCategoryCode = watch("categoryCode");
  const selectedRestaurant = watch("restaurant"); // NEW - drives conditional rendering

  useEffect(() => {
    // Only run this when EDITING
    if (!editingCategory) {
      return;
    }

    if (!selectedCategoryCode) {
      return;
    }

    const selectedCategory = categories.find(
      (category) => category.categoryCode === selectedCategoryCode,
    );

    if (!selectedCategory) {
      return;
    }

    setValue("categoryName", selectedCategory.categoryName || "");

    setValue(
      "parentCategory",
      typeof selectedCategory.parentCategory === "object"
        ? selectedCategory.parentCategory?._id || ""
        : selectedCategory.parentCategory || "",
    );

    setValue("description", selectedCategory.description || "");

    setValue(
      "restaurant",
      typeof selectedCategory.restaurant === "object"
        ? selectedCategory.restaurant?._id || ""
        : selectedCategory.restaurant || "",
    );

    setValue(
      "store",
      typeof selectedCategory.store === "object"
        ? selectedCategory.store?._id || null
        : selectedCategory.store || null,
    );

    setValue(
      "kitchenCategory",
      selectedCategory.kitchenCategory || "Main Kitchen",
    );

    setValue("displayOrder", selectedCategory.displayOrder ?? 0);

    setValue("gstPercentage", selectedCategory.gstPercentage ?? 5);

    setValue("colorCode", selectedCategory.colorCode || "#2196F3");

    setValue("isVegCategory", selectedCategory.isVegCategory ?? false);

    setValue("isAvailable", selectedCategory.isAvailable ?? true);

    setValue("isActive", selectedCategory.isActive ?? true);

    setValue("image", selectedCategory.image || "");

    setValue("icon", selectedCategory.icon || "");
  }, [selectedCategoryCode, categories, editingCategory, setValue]);

  const onFormSubmit = async (data) => {
    const payload = {
      restaurant: data.restaurant?.trim(),

      store: data.store?.trim(),

      categoryCode: data.categoryCode?.trim().toUpperCase(),

      categoryName: data.categoryName?.trim(),

      parentCategory: data.parentCategory?.trim() || null,

      description: data.description?.trim() || "",

      image: data.image?.trim() || "",

      icon: data.icon?.trim() || "",

      kitchenCategory: data.kitchenCategory,

      displayOrder: Number(data.displayOrder || 0),

      gstPercentage: Number(data.gstPercentage || 0),

      colorCode: data.colorCode?.trim() || "#2196F3",

      isVegCategory: Boolean(data.isVegCategory),

      isAvailable: Boolean(data.isAvailable),

      isActive: Boolean(data.isActive),
    };
    console.log("FORM DATA:", data);
    console.log("CATEGORY PAYLOAD:", payload);
    await onSubmit(payload);
  };

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <form className="category-form" onSubmit={handleSubmit(onFormSubmit)}>
      <div className="category-form-section">
        <h3>Basic Information</h3>

        <div className="category-form-section">
          <h4>Restaurant & Store</h4>

          <div className="category-form-grid">
            <div className="category-field">
              <Select
                label="Restaurant ID"
                name="restaurant"
                register={register}
                error={errors.restaurant?.message}
                options={[
                  ...[
                    ...new Map(
                      categories.map((category) => {
                        const restaurant =
                          typeof category.restaurant === "object"
                            ? category.restaurant
                            : {
                                _id: category.restaurant,
                                restaurantName: category.restaurant,
                              };

                        return [
                          restaurant?._id,
                          {
                            _id: restaurant?._id,
                            label:
                              restaurant?.restaurantName ||
                              restaurant?.name ||
                              restaurant?._id ||
                              "Unknown Restaurant",
                          },
                        ];
                      }),
                    ).values(),
                  ],
                ]}
              />
            </div>

            <div className="category-field">
              <Input
                label="Store ID"
                name="store"
                type="text"
                placeholder="Enter Store ObjectId"
                register={register}
                error={errors.store?.message}
                disabled={!!editingCategory}
              />
            </div>
          </div>
        </div>

        <div className="category-form-grid">
          {editingCategory ? (
            <Select
              label="Category Code"
              name="categoryCode"
              register={register}
              error={errors.categoryCode?.message}
              options={[
                ...categories
                  .filter((category) => {
                    const categoryRestaurant =
                      typeof category.restaurant === "object"
                        ? category.restaurant?._id
                        : category.restaurant;

                    return categoryRestaurant === selectedRestaurant;
                  })
                  .map((category) => ({
                    _id: category.categoryCode,
                    label: category.categoryCode,
                  })),
              ]}
            />
          ) : (
            <Input
              label="Category Code"
              name="categoryCode"
              type="text"
              placeholder="Enter Category Code"
              register={register}
              error={errors.categoryCode?.message}
            />
          )}

          {/* CATEGORY NAME */}

          <div className="category-field">
            <Input
              label="Category Name"
              name="categoryName"
              type="text"
              placeholder="Enter category name"
              register={register}
              error={errors.categoryName?.message}
            />
          </div>

          {/* KITCHEN CATEGORY */}

          <div className="category-field">
            <Select
              label="Kitchen Category"
              name="kitchenCategory"
              register={register}
              error={errors.kitchenCategory?.message}
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

          {/* PARENT CATEGORY */}

          <div className="category-field">
            <Input
              label="Parent Category ID"
              name="parentCategory"
              type="text"
              placeholder="Enter parent Category ObjectId (optional)"
              register={register}
              error={errors.parentCategory?.message}
            />
          </div>

          {/* DESCRIPTION */}

          <div className="category-field category-full-width">
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

      <div className="category-form-section">
        <h3>Display & Tax</h3>

        <div className="category-form-grid">
          {/* DISPLAY ORDER */}

          <div className="category-field">
            <Input
              label="Display Order"
              name="displayOrder"
              type="number"
              min="0"
              placeholder="0"
              register={register}
              error={errors.displayOrder?.message}
            />
          </div>

          {/* GST */}

          <div className="category-field">
            <Input
              label="GST Percentage"
              name="gstPercentage"
              type="number"
              min="0"
              step="0.01"
              placeholder="5"
              register={register}
              error={errors.gstPercentage?.message}
            />
          </div>

          {/* COLOR */}

          <div className="category-field">
            <Input
              label="Color Code"
              name="colorCode"
              type="text"
              placeholder="#2196F3"
              register={register}
              error={errors.colorCode?.message}
            />
          </div>

          {/* VEG */}

          <div className="category-field category-checkbox-field">
            <label>
              <input type="checkbox" {...register("isVegCategory")} />
              Veg Category
            </label>
          </div>
        </div>
      </div>

      {/* =================================================
          MEDIA
      ================================================= */}

      <div className="category-form-section">
        <h3>Media</h3>

        <div className="category-form-grid">
          {/* IMAGE */}

          <div className="category-field">
            <Input
              label="Image URL"
              name="image"
              type="text"
              placeholder="https://..."
              register={register}
              error={errors.image?.message}
            />
          </div>

          {/* ICON */}

          <div className="category-field">
            <Input
              label="Icon URL"
              name="icon"
              type="text"
              placeholder="https://..."
              register={register}
              error={errors.icon?.message}
            />
          </div>
        </div>
      </div>

      {/* =================================================
          CATEGORY SETTINGS
      ================================================= */}

      <div className="category-form-section">
        <h3>Category Settings</h3>

        <div className="category-form-grid">
          {/* AVAILABLE */}

          <div className="category-field category-checkbox-field">
            <label>
              <input type="checkbox" {...register("isAvailable")} />
              Available
            </label>
          </div>

          {/* ACTIVE */}

          <div className="category-field category-checkbox-field">
            <label>
              <input type="checkbox" {...register("isActive")} />
              Active
            </label>
          </div>
        </div>
      </div>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="category-form-actions">
        <CancelButton
          type="button"
          className="category-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="category-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingCategory
              ? "Update Category"
              : "Create Category"}
        </SaveButton>
      </div>
    </form>
  );
};

export default CategoryForm;
