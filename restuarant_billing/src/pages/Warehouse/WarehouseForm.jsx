import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";
import { fetchStores } from "../../features/store/storeSlice";
// import { fetchUsers } from "../../features/user/userSlice";

import "./Warehouse.css";

const initialForm = {
  restaurant: "",
  store: "",
  warehouseCode: "",
  warehouseName: "",
  warehouseType: "General",
  manager: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",
  capacity: 0,
  capacityUnit: "Piece",
  isDefault: false,
  isActive: true,
  description: "",
  remarks: "",
};

const WarehouseForm = ({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialForm);

  // ==========================================================
  // REDUX DATA
  // ==========================================================

  const restaurantState = useSelector((state) => state.restaurant || {});

  const storeState = useSelector((state) => state.store || {});

  const restaurants = Array.isArray(restaurantState.restaurants)
    ? restaurantState.restaurants
    : [];

  const stores = Array.isArray(storeState.stores) ? storeState.stores : [];

  const restaurantLoading = restaurantState.loading || false;
  const storeLoading = storeState.loading || false;

  console.log("RESTAURANT are :", restaurants);
  console.log("STORES are :", stores);
  // const { users = [], loading: userLoading } = useSelector(
  //   (state) => state.user || {},
  // );

  // ==========================================================
  // FETCH DROPDOWN DATA
  // ==========================================================

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchStores());
    // dispatch(fetchUsers());
  }, [dispatch]);

  // ==========================================================
  // EDIT DATA
  // ==========================================================

  useEffect(() => {
    if (!initialData) {
      setFormData(initialForm);
      return;
    }

    setFormData({
      restaurant: initialData.restaurant?._id || initialData.restaurant || "",

      store: initialData.store?._id || initialData.store || "",

      warehouseCode: initialData.warehouseCode || "",

      warehouseName: initialData.warehouseName || "",

      warehouseType: initialData.warehouseType || "General",

      manager: initialData.manager?._id || initialData.manager || "",

      contactPerson: initialData.contactPerson || "",

      phone: initialData.phone || "",

      email: initialData.email || "",

      address: initialData.address || "",

      city: initialData.city || "",

      state: initialData.state || "",

      country: initialData.country || "India",

      pincode: initialData.pincode || "",

      capacity: initialData.capacity ?? 0,

      capacityUnit: initialData.capacityUnit || "Piece",

      isDefault: initialData.isDefault ?? false,

      isActive: initialData.isActive ?? true,

      description: initialData.description || "",

      remarks: initialData.remarks || "",
    });
  }, [initialData]);

  // ==========================================================
  // FILTER STORES BY RESTAURANT
  // ==========================================================

  const filteredStores = useMemo(() => {
    if (!formData.restaurant) {
      return stores;
    }

    return stores.filter((store) => {
      const restaurantId = store.restaurant?._id || store.restaurant;

      return restaurantId?.toString() === formData.restaurant?.toString();
    });
  }, [stores, formData.restaurant]);

  // ==========================================================
  // HANDLE CHANGE
  // ==========================================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================================
  // RESTAURANT CHANGE
  // ==========================================================

  const handleRestaurantChange = (event) => {
    const restaurantId = event.target.value;

    setFormData((previous) => ({
      ...previous,
      restaurant: restaurantId,
      store: "",
    }));
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      restaurant: formData.restaurant,

      store: formData.store,

      warehouseCode: formData.warehouseCode.trim().toUpperCase(),

      warehouseName: formData.warehouseName.trim(),

      warehouseType: formData.warehouseType,

      manager: formData.manager || null,

      contactPerson: formData.contactPerson.trim(),

      phone: formData.phone.trim(),

      email: formData.email.trim(),

      address: formData.address.trim(),

      city: formData.city.trim(),

      state: formData.state.trim(),

      country: formData.country.trim(),

      pincode: formData.pincode.trim(),

      capacity: Number(formData.capacity) || 0,

      capacityUnit: formData.capacityUnit,

      isDefault: formData.isDefault,

      isActive: formData.isActive,

      description: formData.description.trim(),

      remarks: formData.remarks.trim(),
    };

    onSubmit(payload);
  };

  const formLoading = loading || restaurantLoading || storeLoading; // || userLoading;
  return (
    <form className="warehouse-form" onSubmit={handleSubmit}>
      <div className="warehouse-form-grid">
        {/* RESTAURANT */}

        <div className="warehouse-form-group">
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
                {restaurant.restaurantName ||
                  restaurant.name ||
                  restaurant.title ||
                  "Restaurant"}
              </option>
            ))}
          </select>
        </div>

        {/* STORE */}

        <div className="warehouse-form-group">
          <label>
            Store <span>*</span>
          </label>

          <select
            name="store"
            value={formData.store}
            onChange={handleChange}
            required
            disabled={!formData.restaurant}
          >
            <option value="">Select Store</option>

            {filteredStores.map((store) => (
              <option key={store._id} value={store._id}>
                {store.storeName || store.name || store.title || "Store"}
              </option>
            ))}
          </select>
        </div>

        {/* WAREHOUSE CODE */}

        <div className="warehouse-form-group">
          <label>
            Warehouse Code <span>*</span>
          </label>

          <input
            type="text"
            name="warehouseCode"
            value={formData.warehouseCode}
            onChange={handleChange}
            placeholder="WH001"
            required
          />
        </div>

        {/* WAREHOUSE NAME */}

        <div className="warehouse-form-group">
          <label>
            Warehouse Name <span>*</span>
          </label>

          <input
            type="text"
            name="warehouseName"
            value={formData.warehouseName}
            onChange={handleChange}
            placeholder="Main Warehouse"
            required
          />
        </div>

        {/* TYPE */}

        <div className="warehouse-form-group">
          <label>Warehouse Type</label>

          <select
            name="warehouseType"
            value={formData.warehouseType}
            onChange={handleChange}
          >
            <option value="Main">Main</option>
            <option value="Raw Material">Raw Material</option>
            <option value="Finished Goods">Finished Goods</option>
            <option value="Cold Storage">Cold Storage</option>
            <option value="Dry Storage">Dry Storage</option>
            <option value="General">General</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* MANAGER */}

        {/* <div className="warehouse-form-group">
          <label>Manager</label>

          <select
            name="manager"
            value={formData.manager}
            onChange={handleChange}
          >
            <option value="">Select Manager</option>

            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name ||
                  user.fullName ||
                  user.username ||
                  user.email ||
                  "User"}
              </option>
            ))}
          </select>
        </div> */}

        {/* CONTACT PERSON */}

        <div className="warehouse-form-group">
          <label>Contact Person</label>

          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Contact person"
          />
        </div>

        {/* PHONE */}

        <div className="warehouse-form-group">
          <label>Phone</label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </div>

        {/* EMAIL */}

        <div className="warehouse-form-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="warehouse@example.com"
          />
        </div>

        {/* CAPACITY */}

        <div className="warehouse-form-group">
          <label>Capacity</label>

          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>

        {/* CAPACITY UNIT */}

        <div className="warehouse-form-group">
          <label>Capacity Unit</label>

          <select
            name="capacityUnit"
            value={formData.capacityUnit}
            onChange={handleChange}
          >
            <option value="Piece">Piece</option>
            <option value="Kg">Kg</option>
            <option value="Gram">Gram</option>
            <option value="Liter">Liter</option>
            <option value="ML">ML</option>
            <option value="Box">Box</option>
            <option value="Packet">Packet</option>
            <option value="Pallet">Pallet</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* CITY */}

        <div className="warehouse-form-group">
          <label>City</label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />
        </div>

        {/* STATE */}

        <div className="warehouse-form-group">
          <label>State</label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
          />
        </div>

        {/* COUNTRY */}

        <div className="warehouse-form-group">
          <label>Country</label>

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>

        {/* PINCODE */}

        <div className="warehouse-form-group">
          <label>Pincode</label>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
          />
        </div>

        {/* ADDRESS */}

        <div className="warehouse-form-group warehouse-form-full">
          <label>Address</label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Warehouse address"
            rows="3"
          />
        </div>

        {/* DESCRIPTION */}

        <div className="warehouse-form-group warehouse-form-full">
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Warehouse description"
            rows="3"
          />
        </div>

        {/* REMARKS */}

        <div className="warehouse-form-group warehouse-form-full">
          <label>Remarks</label>

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks"
            rows="3"
          />
        </div>

        {/* DEFAULT */}

        <div className="warehouse-checkbox-group">
          <label className="warehouse-checkbox-label">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />

            <span>Set as Default Warehouse</span>
          </label>
        </div>

        {/* ACTIVE */}

        <div className="warehouse-checkbox-group">
          <label className="warehouse-checkbox-label">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />

            <span>Active</span>
          </label>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="warehouse-form-actions">
        <button
          type="button"
          className="warehouse-cancel-btn"
          onClick={onCancel}
          disabled={formLoading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="warehouse-submit-btn"
          disabled={formLoading}
        >
          {formLoading
            ? "Saving..."
            : initialData
              ? "Update Warehouse"
              : "Create Warehouse"}
        </button>
      </div>
    </form>
  );
};

export default WarehouseForm;
