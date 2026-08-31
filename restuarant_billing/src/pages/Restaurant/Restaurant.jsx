import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Restaurant.css";
import {
  fetchRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  toggleRestaurantStatus,
} from "../../features/restaurant/restaurantSlice";
import { fetchCompanies } from "../../features/company/companySlice";
import RestaurantForm from "./RestaurantForm";
import {
  EditButton,
  DeleteButton,
  AddButton,
} from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";

const emptyFormData = {
  companyId: "",

  restaurantCode: "",
  restaurantName: "",
  legalName: "",
  ownerName: "",

  email: "",
  phone: "",
  alternatePhone: "",

  gstNumber: "",
  fssaiNumber: "",
  panNumber: "",

  address: "",
  area: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",

  latitude: "",
  longitude: "",

  currency: "INR",
  currencySymbol: "₹",
  timezone: "Asia/Kolkata",

  invoicePrefix: "INV",
  kotPrefix: "KOT",
  orderPrefix: "ORD",
  purchasePrefix: "PUR",
  expensePrefix: "EXP",

  serviceChargePercentage: 0,

  gstEnabled: true,
  serviceChargeEnabled: false,
  loyaltyEnabled: true,
  onlineOrderEnabled: false,
  takeawayEnabled: true,
  dineInEnabled: true,
  deliveryEnabled: true,

  logo: "",
  bannerImage: "",

  status: "Active",
};

const Restaurant = () => {
  const dispatch = useDispatch();

  const {
    restaurants = [],
    loading,
    error,
  } = useSelector((state) => state.restaurants);
  const { companies = [] } = useSelector((state) => state.company);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState(emptyFormData);

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(
      fetchCompanies({
        page: 1,
        limit: 1000,
      }),
    );
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==========================================
  // OPEN ADD MODAL
  // ==========================================

  const handleAdd = () => {
    setEditId(null);
    setFormData(emptyFormData);
    setShowModal(true);
  };

  // ==========================================
  // EDIT
  // ==========================================

  const handleEdit = (restaurant) => {
    setEditId(restaurant._id);

    setFormData({
      companyId: restaurant.companyId?._id || restaurant.companyId || "",

      restaurantCode: restaurant.restaurantCode || "",

      restaurantName: restaurant.restaurantName || "",

      legalName: restaurant.legalName || "",

      ownerName: restaurant.ownerName || "",

      email: restaurant.email || "",

      phone: restaurant.phone || "",

      alternatePhone: restaurant.alternatePhone || "",

      gstNumber: restaurant.gstNumber || "",

      fssaiNumber: restaurant.fssaiNumber || "",

      panNumber: restaurant.panNumber || "",

      address: restaurant.address || "",

      area: restaurant.area || "",

      city: restaurant.city || "",

      state: restaurant.state || "",

      country: restaurant.country || "India",

      pincode: restaurant.pincode || "",

      latitude: restaurant.latitude ?? "",

      longitude: restaurant.longitude ?? "",

      currency: restaurant.currency || "INR",

      currencySymbol: restaurant.currencySymbol || "₹",

      timezone: restaurant.timezone || "Asia/Kolkata",

      invoicePrefix: restaurant.invoicePrefix || "INV",

      kotPrefix: restaurant.kotPrefix || "KOT",

      orderPrefix: restaurant.orderPrefix || "ORD",

      purchasePrefix: restaurant.purchasePrefix || "PUR",

      expensePrefix: restaurant.expensePrefix || "EXP",

      serviceChargePercentage: restaurant.serviceChargePercentage || 0,

      gstEnabled: restaurant.gstEnabled ?? true,

      serviceChargeEnabled: restaurant.serviceChargeEnabled ?? false,

      loyaltyEnabled: restaurant.loyaltyEnabled ?? true,

      onlineOrderEnabled: restaurant.onlineOrderEnabled ?? false,

      takeawayEnabled: restaurant.takeawayEnabled ?? true,

      dineInEnabled: restaurant.dineInEnabled ?? true,

      deliveryEnabled: restaurant.deliveryEnabled ?? true,

      logo: restaurant.logo || "",

      bannerImage: restaurant.bannerImage || "",

      status: restaurant.status || "Active",
    });

    setShowModal(true);
  };

  const handleSubmit = async (data) => {
    try {
      const payload = {
        ...formData,
        ...data,
        companyId: data?.companyId || formData?.companyId || "",
        restaurantCode: data?.restaurantCode || formData?.restaurantCode || "",
        restaurantName: data?.restaurantName || formData?.restaurantName || "",
        legalName: data?.legalName || formData?.legalName || "",
        ownerName: data?.ownerName || formData?.ownerName || "",
        phone: data?.phone || formData?.phone || "",
      };

      if (!payload.companyId) {
        console.error("Company ID is required");
        return;
      }

      if (!payload.restaurantCode) {
        console.error("Restaurant Code is required");
        return;
      }

      if (!payload.restaurantName) {
        console.error("Restaurant Name is required");
        return;
      }

      if (!payload.ownerName) {
        console.error("Owner Name is required");
        return;
      }

      if (!payload.phone) {
        console.error("Phone is required");
        return;
      }

      if (editId) {
        await dispatch(
          updateRestaurant({
            id: editId,
            data: payload,
          }),
        ).unwrap();
      } else {
        await dispatch(createRestaurant(payload)).unwrap();
      }

      setShowModal(false);
      setEditId(null);
      setFormData(emptyFormData);
      dispatch(fetchRestaurants());
    } catch (error) {
      console.error("Restaurant save error:", error);
    }
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      dispatch(deleteRestaurant(id));
    }
  };

  // ==========================================
  // TOGGLE STATUS
  // ==========================================

  const handleStatus = (id) => {
    dispatch(toggleRestaurantStatus(id));
  };

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.restaurantName?.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.restaurantCode?.toLowerCase().includes(search.toLowerCase()) ||
      restaurant.ownerName?.toLowerCase().includes(search.toLowerCase()),
  );

  const restaurantOptions = restaurants.map((item) => ({
    label:
      item.restaurantCode ||
      item.code ||
      item.restaurantName ||
      item.name ||
      item._id,
    value: item._id,
  }));

  const companyOptions = companies.map((item) => ({
    label:
      item.companyId ||
      item.companyCode ||
      item.name ||
      item.companyName ||
      item._id,
    value: item._id,
  }));

  return (
    <div className="restaurant-container-wrapper">
      {/* HEADER */}

      <div className="restaurant-header">
        <div>
          <h2>Restaurant Management</h2>
          <p>Manage your restaurants</p>
        </div>

        <AddButton className="add-restaurant-btn" onClick={handleAdd}>
          + Add Restaurant
        </AddButton>
      </div>

      {/* SEARCH */}
      <div className="restaurant-content-box">
        <div className="restaurant-search">
          <input
            type="text"
            placeholder="Search restaurant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* ERROR */}

        {error && <div className="restaurant-error">{error}</div>}

        {/* TABLE */}

        <div className="restaurant-table-wrapper">
          <table className="restaurant-table">
            <thead>
              <tr>
                <th>Restaurant Code</th>
                <th>Restaurant Name</th>
                <th>Owner</th>
                <th>Phone</th>
                <th>Email</th>
                <th>City</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8">Loading...</td>
                </tr>
              ) : filteredRestaurants.length === 0 ? (
                <tr>
                  <td colSpan="8">No restaurants found</td>
                </tr>
              ) : (
                filteredRestaurants.map((restaurant) => (
                  <tr key={restaurant._id}>
                    <td>{restaurant.restaurantCode}</td>

                    <td>{restaurant.restaurantName}</td>

                    <td>{restaurant.ownerName}</td>

                    <td>{restaurant.phone}</td>

                    <td>{restaurant.email || "-"}</td>

                    <td>{restaurant.city || "-"}</td>

                    <td>
                      <button
                        className={
                          restaurant.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }
                        onClick={() => handleStatus(restaurant._id)}
                      >
                        {restaurant.status}
                      </button>
                    </td>

                    <td>
                      <div className="modal-actions">
                        <EditButton onClick={() => handleEdit(restaurant)}>
                          Edit
                        </EditButton>

                        <DeleteButton
                          onClick={() => handleDelete(restaurant._id)}
                        >
                          Delete
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ADD / EDIT MODAL */}

        <Modal
          open={showModal}
          title={editId ? "Edit Restaurant" : "Add Restaurant"}
          size="lg"
          onClose={() => {
            setShowModal(false);
            setEditId(null);
          }}
        >
          <RestaurantForm
            editId={editId}
            formData={formData}
            loading={loading}
            restaurantOptions={restaurantOptions}
            companyOptions={companyOptions}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowModal(false);
              setEditId(null);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Restaurant;
