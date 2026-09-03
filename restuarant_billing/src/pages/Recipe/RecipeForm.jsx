// ==========================================================
// RecipeForm.jsx
// ==========================================================

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import "./RecipeForm.css";

import {
  AddButton,
  CancelButton,
  SaveButton,
} from "../../components/Common/Button";

import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";

import { fetchMenuItems } from "../../features/menuItem/menuItemSlice";
import { fetchMenuCategories } from "../../features/menuCategory/menuCategorySlice";
import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";
import { fetchStores } from "../../features/store/storeSlice";
import { fetchIngredientStockLedgers } from "../../features/ingredientStockLedger/ingredientStockLedgerSlice";
import { fetchUnits } from "../../features/unit/unitSlice";

const initialForm = {
  recipeCode: "",
  recipeName: "",
  menuItem: "",
  menuCategory: "",
  restaurant: "",
  store: "",
  preparationTime: 0,
  servingSize: 1,
  sellingPrice: 0,
  instructions: "",
  notes: "",
  status: "Active",

  items: [
    {
      ingredient: "",
      unit: "",
      quantity: 1,
      wastagePercentage: 0,
      costPerUnit: 0,
      remarks: "",
    },
  ],
};

// HELPER

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

const RecipeForm = ({ editingRecipe, onSubmit, onCancel, loading = false }) => {
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
  // TO THIS

  const menuItems = useSelector(
    (state) => state.menuItem?.menuItems || state.menuItems?.menuItems || [],
  );

  const menuCategories = useSelector(
    (state) =>
      state.menuCategory?.menuCategories ||
      state.menuCategories?.menuCategories ||
      [],
  );
  const restaurants = useSelector(
    (state) => state.restaurants?.restaurants || [],
  );

  const stores = useSelector((state) => state.stores?.stores || []);

  const ingredients = useSelector(
    (state) => state.ingredient?.ingredients || [],
  );

  const units = useSelector((state) => state.unit?.units || []);

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

  const loadMenuItems = () => {
    dispatch(fetchMenuItems());
  };

  const loadMenuCategories = () => {
    dispatch(fetchMenuCategories());
  };

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

  const loadIngredients = () => {
    if (!ingredients.length) {
      dispatch(fetchIngredientStockLedgers());
    }
  };

  const loadUnits = () => {
    if (!units.length) {
      dispatch(fetchUnits());
    }
  };

  // ==========================================================
  // OPTIONS FROM BACKEND DATA
  // ==========================================================

  const menuItemOptions = menuItems.map((item) => ({
    _id: item._id,
    label:
      item.menuName || item.name || item.itemName || item.menuCode || item._id,
  }));

  const menuCategoryOptions = menuCategories.map((item) => ({
    _id: item._id,
    label: item.categoryName || item.name || item._id,
  }));

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

  const ingredientOptions = ingredients.map((item) => ({
    _id: item._id,
    label: item.ingredientName || item.name || item.ingredientCode || item._id,
  }));

  const unitOptions = units.map((item) => ({
    _id: item._id,
    label: item.unitName || item.name || item.unitCode || item._id,
  }));

  // ==========================================================
  // EDIT DATA
  // ==========================================================

  useEffect(() => {
    if (!editingRecipe) {
      reset(initialForm);
      return;
    }

    reset({
      recipeCode: editingRecipe.recipeCode || "",

      recipeName: editingRecipe.recipeName || "",

      menuItem: getId(editingRecipe.menuItem),

      menuCategory: getId(editingRecipe.menuCategory),

      restaurant: getId(editingRecipe.restaurant),

      store: getId(editingRecipe.store),

      preparationTime: Number(editingRecipe.preparationTime ?? 0),

      servingSize: Number(editingRecipe.servingSize ?? 1),

      sellingPrice: Number(editingRecipe.sellingPrice ?? 0),

      instructions: editingRecipe.instructions || "",

      notes: editingRecipe.notes || "",

      status: editingRecipe.status || "Active",

      items:
        editingRecipe.items?.length > 0
          ? editingRecipe.items.map((item) => ({
              ingredient: getId(item.ingredient),

              unit: getId(item.unit),

              quantity: Number(item.quantity ?? 1),

              wastagePercentage: Number(item.wastagePercentage ?? 0),

              costPerUnit: Number(item.costPerUnit ?? 0),

              remarks: item.remarks || "",
            }))
          : initialForm.items,
    });
  }, [editingRecipe, reset]);

  // ==========================================================
  // IMPORTANT:
  // LOAD OPTIONS WHEN EDITING
  // ==========================================================

  useEffect(() => {
    if (editingRecipe) {
      loadMenuItems();
      loadMenuCategories();
      loadRestaurants();
      loadStores();
      loadIngredients();
      loadUnits();
    }
  }, [editingRecipe]);

  // ==========================================================
  // ADD ITEM
  // ==========================================================

  const handleAddItem = () => {
    append({
      ingredient: "",
      unit: "",
      quantity: 1,
      wastagePercentage: 0,
      costPerUnit: 0,
      remarks: "",
    });
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const onFormSubmit = async (data) => {
    const payload = {
      recipeCode: data.recipeCode?.trim() || undefined,

      recipeName: data.recipeName?.trim() || undefined,

      menuItem: data.menuItem || undefined,

      menuCategory: data.menuCategory || undefined,

      restaurant: data.restaurant || undefined,

      store: data.store || undefined,

      preparationTime: Number(data.preparationTime || 0),

      servingSize: Number(data.servingSize || 1),

      sellingPrice: Number(data.sellingPrice || 0),

      instructions: data.instructions?.trim() || undefined,

      notes: data.notes?.trim() || undefined,

      status: data.status,

      items: data.items.map((item) => ({
        ingredient: item.ingredient || undefined,

        unit: item.unit || undefined,

        quantity: Number(item.quantity || 1),

        wastagePercentage: Number(item.wastagePercentage || 0),

        costPerUnit: Number(item.costPerUnit || 0),

        remarks: item.remarks?.trim() || undefined,
      })),
    };

    await onSubmit(payload);
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit(onFormSubmit)}>
      {/* ======================================================
          BASIC INFORMATION
      ====================================================== */}

      <div className="recipe-form-section">
        <h3>Basic Information</h3>

        <div className="recipe-form-grid">
          <div className="recipe-field">
            <Input
              label="Recipe Code"
              name="recipeCode"
              type="text"
              placeholder="RCP001"
              register={register}
              error={errors.recipeCode?.message}
            />
          </div>

          <div className="recipe-field">
            <Input
              label="Recipe Name"
              name="recipeName"
              type="text"
              placeholder="Chicken Biriyani"
              register={register}
              error={errors.recipeName?.message}
            />
          </div>

          {/* MENU ITEM */}

          <div className="recipe-field">
            <Select
              label="Menu Category"
              name="menuCategory"
              register={register}
              error={errors.menuCategory?.message}
              options={menuCategoryOptions}
              onClick={loadMenuCategories}
              onFocus={loadMenuCategories}
            />
          </div>

          {/* MENU CATEGORY */}

          <div className="recipe-field">
            <Select
              label="Menu Category"
              name="menuCategory"
              register={register}
              error={errors.menuCategory?.message}
              options={menuCategoryOptions}
              onClick={loadMenuCategories}
              onFocus={loadMenuCategories}
            />
          </div>

          {/* RESTAURANT */}

          <div className="recipe-field">
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

          <div>
            <Select
              label="Menu Item"
              name="menuItem"
              register={register}
              error={errors.menuItem?.message}
              options={menuItemOptions}
              onClick={loadMenuItems}
              onFocus={loadMenuItems}
            />
          </div>

          <div className="recipe-field">
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

          <div className="recipe-field">
            <Input
              label="Preparation Time (mins)"
              name="preparationTime"
              type="number"
              min="0"
              register={register}
              error={errors.preparationTime?.message}
            />
          </div>

          <div className="recipe-field">
            <Input
              label="Serving Size"
              name="servingSize"
              type="number"
              min="1"
              register={register}
              error={errors.servingSize?.message}
            />
          </div>

          <div className="recipe-field">
            <Input
              label="Selling Price"
              name="sellingPrice"
              type="number"
              min="0"
              step="0.01"
              register={register}
              error={errors.sellingPrice?.message}
            />
          </div>

          {/* STATUS */}

          <div className="recipe-field">
            <Select
              label="Status"
              name="status"
              register={register}
              error={errors.status?.message}
              options={[
                { _id: "Active", label: "Active" },
                { _id: "Inactive", label: "Inactive" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          RECIPE INGREDIENTS
      ====================================================== */}

      <div className="recipe-form-section">
        <div className="recipe-items-header">
          <div>
            <h3>Recipe Ingredients</h3>
            <p>Add ingredients required for this recipe.</p>
          </div>

          <AddButton
            type="button"
            className="recipe-add-item-btn"
            onClick={handleAddItem}
          >
            + Add Ingredient
          </AddButton>
        </div>

        <div className="recipe-items-container">
          {fields.map((field, index) => (
            <div className="recipe-item-card" key={field.id}>
              <div className="recipe-item-header">
                <h4>Ingredient {index + 1}</h4>

                {fields.length > 1 && (
                  <button
                    type="button"
                    className="recipe-remove-item-btn"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="recipe-form-grid">
                <div className="recipe-field">
                  <Select
                    label="Ingredient"
                    name={`items.${index}.ingredient`}
                    register={register}
                    error={errors.items?.[index]?.ingredient?.message}
                    options={ingredientOptions}
                    onClick={loadIngredients}
                    onFocus={loadIngredients}
                  />
                </div>

                <div className="recipe-field">
                  <Select
                    label="Unit"
                    name={`items.${index}.unit`}
                    register={register}
                    error={errors.items?.[index]?.unit?.message}
                    options={unitOptions}
                    onClick={loadUnits}
                    onFocus={loadUnits}
                  />
                </div>

                <div className="recipe-field">
                  <Input
                    label="Quantity"
                    name={`items.${index}.quantity`}
                    type="number"
                    min="0.001"
                    step="0.001"
                    register={register}
                    error={errors.items?.[index]?.quantity?.message}
                  />
                </div>

                <div className="recipe-field">
                  <Input
                    label="Wastage %"
                    name={`items.${index}.wastagePercentage`}
                    type="number"
                    min="0"
                    register={register}
                    error={errors.items?.[index]?.wastagePercentage?.message}
                  />
                </div>

                <div className="recipe-field">
                  <Input
                    label="Cost Per Unit"
                    name={`items.${index}.costPerUnit`}
                    type="number"
                    min="0"
                    step="0.01"
                    register={register}
                    error={errors.items?.[index]?.costPerUnit?.message}
                  />
                </div>

                <div className="recipe-field recipe-full-width">
                  <Input
                    label="Remarks"
                    name={`items.${index}.remarks`}
                    type="text"
                    placeholder="Ingredient remarks"
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
          NOTES
      ====================================================== */}

      <div className="recipe-form-section">
        <h3>Instructions & Notes</h3>

        <div className="recipe-form-grid">
          <div className="recipe-field recipe-full-width">
            <Input
              label="Instructions"
              name="instructions"
              type="text"
              placeholder="Cooking instructions"
              register={register}
              error={errors.instructions?.message}
            />
          </div>

          <div className="recipe-field recipe-full-width">
            <Input
              label="Notes"
              name="notes"
              type="text"
              placeholder="Additional notes"
              register={register}
              error={errors.notes?.message}
            />
          </div>
        </div>
      </div>

      {/* ======================================================
          ACTIONS
      ====================================================== */}

      <div className="recipe-form-actions">
        <CancelButton
          type="button"
          className="recipe-cancel-btn"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          className="recipe-submit-btn"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingRecipe
              ? "Update Recipe"
              : "Create Recipe"}
        </SaveButton>
      </div>
    </form>
  );
};

export default RecipeForm;
