import { useEffect } from "react";

import { useForm } from "react-hook-form";

import "./MenuItemForm.css";

import { CancelButton, SaveButton } from "../../components/Common/Button";

import Input from "../../components/common/Input";

import Select from "../../components/common/Select";

const initialForm = {
  menuCode: "",
  menuName: "",
  shortName: "",

  restaurant: "",
  store: "",
  menuCategory: "",
  category: "",

  recipe: "",

  barcode: "",
  hsnCode: "",

  image: "",
  description: "",

  foodType: "Veg",
  spiceLevel: "Medium",

  dineInPrice: 0,
  takeawayPrice: 0,
  deliveryPrice: 0,
  costPrice: 0,

  gstPercentage: 5,
  discountPercentage: 0,

  preparationTime: 10,

  calories: 0,
  servingSize: "",

  isAvailable: true,
  isFeatured: false,
  isRecommended: false,

  displayOrder: 0,

  status: "Active",
};

const MenuItemForm = ({
  editingMenuItem,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  // =====================================================
  // LOAD EDIT DATA
  // =====================================================

  useEffect(() => {
    if (editingMenuItem) {
      console.log("========== EDIT MENU ITEM ==========");
      console.log("FULL OBJECT:", editingMenuItem);
      console.log("_id:", editingMenuItem._id);
      console.log("menuCode:", editingMenuItem.menuCode);
      console.log("restaurant:", editingMenuItem.restaurant);
      console.log("store:", editingMenuItem.store);
      console.log("menuCategory:", editingMenuItem.menuCategory);
      console.log("category:", editingMenuItem.category);
      console.log("recipe:", editingMenuItem.recipe);
      console.log("====================================");
      reset({
        menuCode: editingMenuItem.menuCode || "",

        menuName: editingMenuItem.menuName || "",

        shortName: editingMenuItem.shortName || "",

        restaurant:
          typeof editingMenuItem.restaurant === "object"
            ? editingMenuItem.restaurant?._id || ""
            : editingMenuItem.restaurant || "",

        store:
          typeof editingMenuItem.store === "object"
            ? editingMenuItem.store?._id || ""
            : editingMenuItem.store || "",

        menuCategory:
          editingMenuItem.menuCategory &&
          typeof editingMenuItem.menuCategory === "object"
            ? editingMenuItem.menuCategory._id || ""
            : editingMenuItem.menuCategory || "",

        category:
          typeof editingMenuItem.category === "object"
            ? editingMenuItem.category?._id || ""
            : editingMenuItem.category || "",

        recipe:
          typeof editingMenuItem.recipe === "object"
            ? editingMenuItem.recipe?._id || ""
            : editingMenuItem.recipe || "",

        barcode: editingMenuItem.barcode || "",

        hsnCode: editingMenuItem.hsnCode || "",

        image: editingMenuItem.image || "",

        description: editingMenuItem.description || "",

        foodType: editingMenuItem.foodType || "Veg",

        spiceLevel: editingMenuItem.spiceLevel || "Medium",

        dineInPrice: editingMenuItem.dineInPrice || 0,

        takeawayPrice: editingMenuItem.takeawayPrice || 0,

        deliveryPrice: editingMenuItem.deliveryPrice || 0,

        costPrice: editingMenuItem.costPrice || 0,

        gstPercentage: editingMenuItem.gstPercentage ?? 5,

        discountPercentage: editingMenuItem.discountPercentage || 0,

        preparationTime: editingMenuItem.preparationTime || 10,

        calories: editingMenuItem.calories || 0,

        servingSize: editingMenuItem.servingSize || "",

        isAvailable:
          editingMenuItem.isAvailable !== undefined
            ? editingMenuItem.isAvailable
            : true,

        isFeatured:
          editingMenuItem.isFeatured !== undefined
            ? editingMenuItem.isFeatured
            : false,

        isRecommended:
          editingMenuItem.isRecommended !== undefined
            ? editingMenuItem.isRecommended
            : false,

        displayOrder: editingMenuItem.displayOrder || 0,

        status: editingMenuItem.status || "Active",
      });
    } else {
      reset(initialForm);
    }
  }, [editingMenuItem, reset]);

  // =====================================================
  // SUBMIT
  // =====================================================

  const onFormSubmit = async (data) => {
    const payload = {
      menuCode: data.menuCode.trim().toUpperCase(),

      menuName: data.menuName.trim(),

      shortName: data.shortName?.trim() || undefined,

      restaurant: data.restaurant.trim(),

      store: data.store.trim(),

      menuCategory: data.menuCategory.trim(),

      category: data.category?.trim() || undefined,

      recipe: data.recipe?.trim() || undefined,

      barcode: data.barcode?.trim() || undefined,

      hsnCode: data.hsnCode?.trim() || undefined,

      image: data.image?.trim() || undefined,

      description: data.description?.trim() || undefined,

      foodType: data.foodType,

      spiceLevel: data.spiceLevel,

      dineInPrice: Number(data.dineInPrice || 0),

      takeawayPrice: Number(data.takeawayPrice || 0),

      deliveryPrice: Number(data.deliveryPrice || 0),

      costPrice: Number(data.costPrice || 0),

      gstPercentage: Number(data.gstPercentage || 0),

      discountPercentage: Number(data.discountPercentage || 0),

      preparationTime: Number(data.preparationTime || 0),

      calories: data.calories ? Number(data.calories) : undefined,

      servingSize: data.servingSize?.trim() || undefined,

      isAvailable: data.isAvailable,

      isFeatured: data.isFeatured,

      isRecommended: data.isRecommended,

      displayOrder: Number(data.displayOrder || 0),

      status: data.status,
    };

    console.log("Menu Item payload:", payload);

    await onSubmit(payload);
  };

  return (
    <form className="menu-item-form" onSubmit={handleSubmit(onFormSubmit)}>
      {/* =====================================================
          BASIC INFORMATION
      ===================================================== */}

      <div className="menu-item-form-section">
        <h3>Basic Information</h3>

        <div className="menu-item-form-grid">
          <div className="menu-item-field">
            <Input
              label="Menu Code"
              name="menuCode"
              type="text"
              placeholder="MENU001"
              register={register}
              error={errors.menuCode?.message}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Menu Name"
              name="menuName"
              type="text"
              placeholder="Chicken Biryani"
              register={register}
              error={errors.menuName?.message}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Short Name"
              name="shortName"
              type="text"
              placeholder="Biryani"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Select
              label="Food Type"
              name="foodType"
              register={register}
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
                  _id: "Egg",
                  label: "Egg",
                },
                {
                  _id: "Vegan",
                  label: "Vegan",
                },
                {
                  _id: "Jain",
                  label: "Jain",
                },
              ]}
            />
          </div>

          <div className="menu-item-field">
            <Select
              label="Spice Level"
              name="spiceLevel"
              register={register}
              options={[
                {
                  _id: "None",
                  label: "None",
                },
                {
                  _id: "Low",
                  label: "Low",
                },
                {
                  _id: "Medium",
                  label: "Medium",
                },
                {
                  _id: "High",
                  label: "High",
                },
                {
                  _id: "Extra Hot",
                  label: "Extra Hot",
                },
              ]}
            />
          </div>

          <div className="menu-item-field menu-item-full-width">
            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Short description"
              register={register}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          RESTAURANT / STORE / CATEGORY
      ===================================================== */}

      <div className="menu-item-form-section">
        <h3>Restaurant & Category</h3>

        <div className="menu-item-form-grid">
          <div className="menu-item-field">
            <Input
              label="Restaurant ID"
              name="restaurant"
              type="text"
              placeholder="Restaurant ObjectId"
              register={register}
              error={errors.restaurant?.message}
              disabled={!!editingMenuItem}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Store ID"
              name="store"
              type="text"
              placeholder="Store ObjectId"
              register={register}
              error={errors.store?.message}
              disabled={!!editingMenuItem}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Menu Category ID"
              name="menuCategory"
              type="text"
              placeholder="MenuCategory ObjectId"
              register={register}
              error={errors.menuCategory?.message}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Category ID"
              name="category"
              type="text"
              placeholder="Category ObjectId"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Recipe ID"
              name="recipe"
              type="text"
              placeholder="Recipe ObjectId"
              register={register}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          IDENTIFICATION
      ===================================================== */}

      <div className="menu-item-form-section">
        <h3>Identification</h3>

        <div className="menu-item-form-grid">
          <div className="menu-item-field">
            <Input
              label="Barcode"
              name="barcode"
              type="text"
              placeholder="Enter barcode"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="HSN Code"
              name="hsnCode"
              type="text"
              placeholder="Enter HSN code"
              register={register}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          PRICING & TAX
      ===================================================== */}

      <div className="menu-item-form-section">
        <h3>Pricing & Tax</h3>

        <div className="menu-item-form-grid">
          <div className="menu-item-field">
            <Input
              label="Dine In Price"
              name="dineInPrice"
              type="number"
              min="0"
              step="0.01"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Takeaway Price"
              name="takeawayPrice"
              type="number"
              min="0"
              step="0.01"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Delivery Price"
              name="deliveryPrice"
              type="number"
              min="0"
              step="0.01"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Cost Price"
              name="costPrice"
              type="number"
              min="0"
              step="0.01"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="GST Percentage"
              name="gstPercentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Discount Percentage"
              name="discountPercentage"
              type="number"
              min="0"
              max="100"
              step="0.01"
              register={register}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          PREPARATION
      ===================================================== */}

      <div className="menu-item-form-section">
        <h3>Preparation</h3>

        <div className="menu-item-form-grid">
          <div className="menu-item-field">
            <Input
              label="Preparation Time (mins)"
              name="preparationTime"
              type="number"
              min="0"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Calories"
              name="calories"
              type="number"
              min="0"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Input
              label="Serving Size"
              name="servingSize"
              type="text"
              placeholder="1 Plate"
              register={register}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          MEDIA
      ===================================================== */}

      <div className="menu-item-form-section">
        <h3>Media</h3>

        <div className="menu-item-form-grid">
          <div className="menu-item-field menu-item-full-width">
            <Input
              label="Image URL"
              name="image"
              type="text"
              placeholder="https://..."
              register={register}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          MENU SETTINGS
      ===================================================== */}

      <div className="menu-item-form-section">
        <h3>Menu Settings</h3>

        <div className="menu-item-form-grid">
          <div className="menu-item-field">
            <Input
              label="Display Order"
              name="displayOrder"
              type="number"
              min="0"
              register={register}
            />
          </div>

          <div className="menu-item-field">
            <Select
              label="Status"
              name="status"
              register={register}
              options={[
                {
                  _id: "Active",
                  label: "Active",
                },
                {
                  _id: "Inactive",
                  label: "Inactive",
                },
              ]}
            />
          </div>

          <div className="menu-item-field menu-item-checkbox-field">
            <label>
              <input type="checkbox" {...register("isAvailable")} />
              Available
            </label>
          </div>

          <div className="menu-item-field menu-item-checkbox-field">
            <label>
              <input type="checkbox" {...register("isFeatured")} />
              Featured
            </label>
          </div>

          <div className="menu-item-field menu-item-checkbox-field">
            <label>
              <input type="checkbox" {...register("isRecommended")} />
              Recommended
            </label>
          </div>
        </div>
      </div>

      <div className="menu-item-form-actions">
        <CancelButton type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </CancelButton>

        <SaveButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingMenuItem
              ? "Update Menu Item"
              : "Create Menu Item"}
        </SaveButton>
      </div>
    </form>
  );
};

export default MenuItemForm;
