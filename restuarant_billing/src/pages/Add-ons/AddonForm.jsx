import { useEffect } from "react";
import { useForm } from "react-hook-form";

// import Input from "../../../../components/common/Input";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";

import { CancelButton, SaveButton} from "../../components/common/Button";

import "./addon.css";

// =====================================================
// INITIAL FORM
// =====================================================

const initialForm = {
  addonCode: "",
  addonName: "",
  displayName: "",
  description: "",

  restaurant: "",
  store: "",
  category: "",

  image: "",

  foodType: "Both",

  addonType: "Extra",

  price: 0,

  gstPercentage: 5,

  kitchenSection: "Main Kitchen",

  applicableMenuItems: [],

  isMandatory: false,

  allowMultiple: false,

  maxQuantity: 1,

  displayOrder: 0,

  isAvailable: true,

  isActive: true,
};

// =====================================================
// COMPONENT
// =====================================================

const AddonForm = ({
  editingAddon,

  onSubmit,

  restaurantOptions = [],

  storeOptions = [],

  menuCategoryOptions = [],

  menuItemOptions = [],

  onCancel,

  loading = false,
}) => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialForm,
  });

  // =====================================================
  // LOAD EDIT DATA
  // =====================================================

  useEffect(() => {

    if (editingAddon) {

      const getId = (value) => {
        if (!value) {
          return "";
        }

        if (typeof value === "object") {
          return value._id || "";
        }

        return value;
      };

      const getIds = (values) => {

        if (!Array.isArray(values)) {
          return [];
        }

        return values
          .map((item) => {

            if (typeof item === "object") {
              return item._id || "";
            }

            return item;

          })
          .filter(Boolean);
      };

      reset({

        addonCode:
          editingAddon.addonCode || "",

        addonName:
          editingAddon.addonName || "",

        displayName:
          editingAddon.displayName || "",

        description:
          editingAddon.description || "",

        restaurant:
          getId(editingAddon.restaurant),

        store:
          getId(editingAddon.store),

        category:
          getId(editingAddon.category),

        image:
          editingAddon.image || "",

        foodType:
          editingAddon.foodType || "Both",

        addonType:
          editingAddon.addonType || "Extra",

        price:
          editingAddon.price ?? 0,

        gstPercentage:
          editingAddon.gstPercentage ?? 5,

        kitchenSection:
          editingAddon.kitchenSection ||
          "Main Kitchen",

        applicableMenuItems:
          getIds(
            editingAddon.applicableMenuItems,
          ),

        isMandatory:
          editingAddon.isMandatory !== undefined
            ? editingAddon.isMandatory
            : false,

        allowMultiple:
          editingAddon.allowMultiple !== undefined
            ? editingAddon.allowMultiple
            : false,

        maxQuantity:
          editingAddon.maxQuantity ?? 1,

        displayOrder:
          editingAddon.displayOrder ?? 0,

        isAvailable:
          editingAddon.isAvailable !== undefined
            ? editingAddon.isAvailable
            : true,

        isActive:
          editingAddon.isActive !== undefined
            ? editingAddon.isActive
            : true,

      });

    } else {

      reset(initialForm);

    }

  }, [editingAddon, reset]);

  // =====================================================
  // SUBMIT
  // =====================================================

  const onFormSubmit = async (data) => {

    const selectedMenuItems =
      Array.isArray(data.applicableMenuItems)
        ? data.applicableMenuItems
        : [];

    const payload = {

      addonCode:
        data.addonCode
          ?.trim()
          .toUpperCase(),

      addonName:
        data.addonName?.trim(),

      displayName:
        data.displayName?.trim() || "",

      description:
        data.description?.trim() || "",

      restaurant:
        data.restaurant?.trim(),

      store:
        data.store?.trim(),

      category:
        data.category?.trim() || undefined,

      image:
        data.image?.trim() || "",

      foodType:
        data.foodType,

      addonType:
        data.addonType,

      price:
        Number(data.price || 0),

      gstPercentage:
        Number(data.gstPercentage || 0),

      kitchenSection:
        data.kitchenSection,

      applicableMenuItems:
        selectedMenuItems,

      isMandatory:
        Boolean(data.isMandatory),

      allowMultiple:
        Boolean(data.allowMultiple),

      maxQuantity:
        Number(data.maxQuantity || 1),

      displayOrder:
        Number(data.displayOrder || 0),

      isAvailable:
        Boolean(data.isAvailable),

      isActive:
        Boolean(data.isActive),
    };

    console.log(
      "====================================",
    );

    console.log(
      "ADDON PAYLOAD:",
      payload,
    );

    console.log(
      "====================================",
    );

    await onSubmit(payload);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <form
      className="addon-form"
      onSubmit={handleSubmit(onFormSubmit)}
    >

      {/* =================================================
          BASIC INFORMATION
      ================================================= */}

      <div className="addon-form-section">

        <h3>
          Basic Information
        </h3>

        <div className="addon-form-grid">

          <div className="addon-field">

            <Input
              label="Add-on Code"
              name="addonCode"
              type="text"
              placeholder="ADDON001"
              register={register}
              error={
                errors.addonCode?.message
              }
            />

          </div>

          <div className="addon-field">

            <Input
              label="Add-on Name"
              name="addonName"
              type="text"
              placeholder="Extra Cheese"
              register={register}
              error={
                errors.addonName?.message
              }
            />

          </div>

          <div className="addon-field">

            <Input
              label="Display Name"
              name="displayName"
              type="text"
              placeholder="Extra Cheese"
              register={register}
            />

          </div>

          <div className="addon-field">

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
                  _id: "Both",
                  label: "Both",
                },
              ]}
            />

          </div>

          <div className="addon-field">

            <Select
              label="Add-on Type"
              name="addonType"
              register={register}
              options={[
                {
                  _id: "Ingredient",
                  label: "Ingredient",
                },
                {
                  _id: "Topping",
                  label: "Topping",
                },
                {
                  _id: "Side Dish",
                  label: "Side Dish",
                },
                {
                  _id: "Beverage",
                  label: "Beverage",
                },
                {
                  _id: "Dessert",
                  label: "Dessert",
                },
                {
                  _id: "Extra",
                  label: "Extra",
                },
                {
                  _id: "Protein",
                  label: "Protein",
                },
              ]}
            />

          </div>

          <div className="addon-field addon-full-width">

            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Extra cheese topping"
              register={register}
            />

          </div>

        </div>

      </div>

      {/* =================================================
          RESTAURANT / STORE / CATEGORY
      ================================================= */}

      <div className="addon-form-section">

        <h3>
          Restaurant & Category
        </h3>

        <div className="addon-form-grid">

          <div className="addon-field">

            <Select
              label="Restaurant *"
              name="restaurant"
              register={register}
              error={
                errors.restaurant?.message
              }
              options={restaurantOptions}
              optionValue="value"
              optionLabel="label"
              required
            />

          </div>

          <div className="addon-field">

            <Select
              label="Store"
              name="store"
              register={register}
              error={
                errors.store?.message
              }
              options={storeOptions}
              optionValue="value"
              optionLabel="label"
            />

          </div>

          <div className="addon-field">

            <Select
              label="Menu Category"
              name="category"
              register={register}
              error={
                errors.category?.message
              }
              options={menuCategoryOptions}
              optionValue="value"
              optionLabel="label"
            />

          </div>

        </div>

      </div>

      {/* =================================================
          APPLICABLE MENU ITEMS
      ================================================= */}

      <div className="addon-form-section">

        <h3>
          Applicable Menu Items
        </h3>

        <p className="addon-section-description">
          Select the menu items where this add-on
          should be available.
        </p>

        <div className="addon-menu-selection">

          <label>
            Menu Items
          </label>

          <select
            multiple
            className="addon-menu-multi-select"
            {...register(
              "applicableMenuItems",
            )}
          >

            {menuItemOptions.map((item) => (

              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>

            ))}

          </select>

          <small>
            Hold Ctrl and click to select
            multiple menu items.
          </small>

        </div>

      </div>

      {/* =================================================
          PRICING & TAX
      ================================================= */}

      <div className="addon-form-section">

        <h3>
          Pricing & Tax
        </h3>

        <div className="addon-form-grid">

          <div className="addon-field">

            <Input
              label="Price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              register={register}
              error={
                errors.price?.message
              }
            />

          </div>

          <div className="addon-field">

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

        </div>

      </div>

      {/* =================================================
          KITCHEN
      ================================================= */}

      <div className="addon-form-section">

        <h3>
          Kitchen
        </h3>

        <div className="addon-form-grid">

          <div className="addon-field">

            <Select
              label="Kitchen Section"
              name="kitchenSection"
              register={register}
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

        </div>

      </div>

      {/* =================================================
          ADDON RULES
      ================================================= */}

      <div className="addon-form-section">

        <h3>
          Add-on Rules
        </h3>

        <div className="addon-form-grid">

          <div className="addon-field">

            <Input
              label="Maximum Quantity"
              name="maxQuantity"
              type="number"
              min="1"
              register={register}
            />

          </div>

          <div className="addon-field">

            <Input
              label="Display Order"
              name="displayOrder"
              type="number"
              min="0"
              register={register}
            />

          </div>

          <div className="addon-checkbox-field">

            <label>

              <input
                type="checkbox"
                {...register(
                  "isMandatory",
                )}
              />

              Mandatory Add-on

            </label>

            <small>
              Customer must select this add-on.
            </small>

          </div>

          <div className="addon-checkbox-field">

            <label>

              <input
                type="checkbox"
                {...register(
                  "allowMultiple",
                )}
              />

              Allow Multiple

            </label>

            <small>
              Customer can add more than one.
            </small>

          </div>

        </div>

      </div>

      {/* =================================================
          MEDIA
      ================================================= */}

      <div className="addon-form-section">

        <h3>
          Media
        </h3>

        <div className="addon-form-grid">

          <div className="addon-field addon-full-width">

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

      {/* =================================================
          STATUS
      ================================================= */}

      <div className="addon-form-section">

        <h3>
          Settings
        </h3>

        <div className="addon-form-grid">

          <div className="addon-checkbox-field">

            <label>

              <input
                type="checkbox"
                {...register(
                  "isAvailable",
                )}
              />

              Available

            </label>

          </div>

          <div className="addon-checkbox-field">

            <label>

              <input
                type="checkbox"
                {...register(
                  "isActive",
                )}
              />

              Active

            </label>

          </div>

        </div>

      </div>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="addon-form-actions">

        <CancelButton
          type="button"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </CancelButton>

        <SaveButton
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingAddon
              ? "Update Add-on"
              : "Create Add-on"}
        </SaveButton>

      </div>

    </form>
  );
};

export default AddonForm;
