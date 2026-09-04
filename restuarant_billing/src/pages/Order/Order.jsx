import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  fetchTodayOrders,
  fetchOrderSummary,
  acceptOrder,
  prepareOrder,
  readyOrder,
  completeOrder,
  cancelOrder,
  markOrderPaid,
} from "../../features/order/orderSlice";

import "./Order.css";
import OrderForm from "./OrderForm";
import {
  AddButton,
  CancelButton,
  DeleteButton,
  EditButton,
} from "../../components/Common/Button";
import Modal from "../../components/Common/Modal";
import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";
import { fetchStores } from "../../features/store/storeSlice";
import { fetchTables } from "../../features/table/tableSlice";
import { fetchCustomers } from "../../features/customer/customerSlice";
import { fetchMenuItems } from "../../features/menuItem/menuItemSlice";

const Order = () => {
  const dispatch = useDispatch();
  const [editingOrder, setEditingOrder] = useState(null);
  const {
    orders = [],
    todayOrders = [],
    summary = {},
    loading,
    actionLoading,
    error,
  } = useSelector((state) => state.order || {});
  const { restaurants = [] } = useSelector((state) => state.restaurants || {});
  const { stores = [] } = useSelector((state) => state.stores || {});
  const { tables = [] } = useSelector((state) => state.tables || {});
  const { customers = [] } = useSelector((state) => state.customer || {});
  const { menuItems = [] } = useSelector((state) => state.menuItem || {});

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("all");
  const [search, setSearch] = useState("");

  const loadOrders = () => {
    dispatch(fetchOrders());
    dispatch(fetchTodayOrders());
    dispatch(fetchOrderSummary());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const displayedOrders = view === "today" ? todayOrders : orders;

  const filteredOrders = displayedOrders.filter((order) => {
    const searchValue = search.toLowerCase();

    return (
      order.orderNo?.toLowerCase().includes(searchValue) ||
      order.customer?.name?.toLowerCase().includes(searchValue) ||
      order.orderType?.toLowerCase().includes(searchValue) ||
      order.paymentStatus?.toLowerCase().includes(searchValue)
    );
  });

  const handleAction = async (action, id, successMessage) => {
    try {
      await dispatch(action(id)).unwrap();

      if (successMessage) {
        alert(successMessage);
      }

      loadOrders();
    } catch (err) {
      alert(err || "Action failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteOrder(id)).unwrap();

      loadOrders();
    } catch (err) {
      alert(err || "Failed to delete order");
    }
  };

  const formatMoney = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const getCustomerName = (customer) => {
    if (!customer) {
      return "Walk-in";
    }

    return (
      customer.name || customer.customerName || customer.phone || "Customer"
    );
  };

  const getTableName = (table) => {
    if (!table) {
      return "-";
    }

    return (
      table.name || table.tableName || table.tableNumber || table.number || "-"
    );
  };

  const getStatusClass = (status) => {
    return status?.toLowerCase().replace(/\s+/g, "-") || "pending";
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleSubmitOrder = async (formData) => {
    try {
      if (editingOrder) {
        await dispatch(
          updateOrder({
            id: editingOrder._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createOrder(formData)).unwrap();
      }

      handleFormClose();
      dispatch(fetchOrders());
    } catch (error) {
      console.error("Order submit failed:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchStores());
    dispatch(fetchTables());
    dispatch(fetchCustomers());
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const restaurantOptions = restaurants.map((item) => ({
    label: item.restaurantName || item.restaurantCode || item.name || item._id,
    value: item._id,
  }));

  const storeOptions = stores.map((item) => ({
    label: item.storeName || item.name || item.storeCode || "Unnamed Store",
    value: item._id,
  }));

  const menuItemOptions = menuItems.map((item) => ({
    label:
      item.menuName ||
      item.itemName ||
      item.name ||
      item.menuCode ||
      "Unnamed Menu Item",

    value: item._id,
  }));

  const customerOptions = customers.map((item) => ({
    label:
      item.customerName ||
      item.name ||
      item.phone ||
      item.customerCode ||
      "Unnamed Customer",
    value: item._id,
  }));

  const tableOptions = tables.map((item) => ({
    label:
      item.tableName ||
      item.tableNumber ||
      item.name ||
      item.tableCode ||
      "Unnamed Table",
    value: item._id,
  }));

  return (
    <div className="orders-page">
      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="orders-page-header">
        <div>
          <h1>Orders</h1>

          <p>Manage restaurant orders and order workflow.</p>
        </div>

        <AddButton
          type="button"
          className="orders-add-btn"
          onClick={handleAddOrder}
        >
          + Add Order
        </AddButton>
      </div>

      {/* ====================================================
          ERROR
      ==================================================== */}

      {error && <div className="orders-error">{error}</div>}

      {/* ====================================================
          SUMMARY
      ==================================================== */}

      <div className="orders-summary-grid">
        <div className="orders-summary-card">
          <span>Total Orders</span>

          <strong>{summary.totalOrders || orders.length || 0}</strong>
        </div>

        <div className="orders-summary-card">
          <span>Total Sales</span>

          <strong>{formatMoney(summary.totalSales)}</strong>
        </div>

        <div className="orders-summary-card">
          <span>Paid Orders</span>

          <strong>{summary.paidOrders || 0}</strong>
        </div>

        <div className="orders-summary-card">
          <span>Today's Orders</span>

          <strong>{todayOrders.length}</strong>
        </div>
      </div>

      <div className="orders-toolbar">
        <div className="orders-tabs">
          <button
            className={view === "all" ? "orders-tab active" : "orders-tab"}
            onClick={() => setView("all")}
          >
            All Orders
          </button>

          <button
            className={view === "today" ? "orders-tab active" : "orders-tab"}
            onClick={() => setView("today")}
          >
            Today
          </button>
        </div>

        <div className="orders-toolbar-right">
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="orders-refresh-button" onClick={loadOrders}>
            Refresh
          </button>
        </div>
      </div>

      <div className="orders-table-card">
        <div className="orders-table-header">
          <div>
            <h2>{view === "today" ? "Today's Orders" : "All Orders"}</h2>

            <p>
              {filteredOrders.length} order
              {filteredOrders.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="orders-loading">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty">
            <h3>No Orders Found</h3>

            <p>Create an order to see it here.</p>
          </div>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order No</th>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Table</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <strong>{order.orderNo}</strong>
                    </td>

                    <td>{getCustomerName(order.customer)}</td>

                    <td>{order.orderType}</td>

                    <td>{getTableName(order.table)}</td>

                    <td>
                      {order.totalQuantity ||
                        order.items?.reduce(
                          (sum, item) => sum + Number(item.quantity || 0),
                          0,
                        ) ||
                        0}
                    </td>

                    <td>
                      <strong>{formatMoney(order.grandTotal)}</strong>
                    </td>

                    <td>
                      <span
                        className={`orders-status ${getStatusClass(
                          order.paymentStatus,
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`orders-status ${getStatusClass(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    <td>
                      <div className="modal-actions">
                        {order.orderStatus === "Pending" && (
                          <button
                            onClick={() =>
                              handleAction(
                                acceptOrder,
                                order._id,
                                "Order accepted",
                              )
                            }
                            disabled={actionLoading}
                          >
                            Accept
                          </button>
                        )}

                        {order.orderStatus === "Accepted" && (
                          <button
                            onClick={() =>
                              handleAction(
                                prepareOrder,
                                order._id,
                                "Order moved to preparing",
                              )
                            }
                            disabled={actionLoading}
                          >
                            Prepare
                          </button>
                        )}

                        {order.orderStatus === "Preparing" && (
                          <button
                            onClick={() =>
                              handleAction(
                                readyOrder,
                                order._id,
                                "Order marked ready",
                              )
                            }
                            disabled={actionLoading}
                          >
                            Ready
                          </button>
                        )}

                        {order.orderStatus === "Ready" && (
                          <button
                            onClick={() =>
                              handleAction(
                                completeOrder,
                                order._id,
                                "Order completed",
                              )
                            }
                            disabled={actionLoading}
                          >
                            Complete
                          </button>
                        )}
                        <EditButton
                          type="button"
                          onClick={() => handleEditOrder(order)}
                        >
                          Edit
                        </EditButton>
                        {order.paymentStatus !== "Paid" &&
                          order.orderStatus !== "Cancelled" && (
                            <button
                              onClick={() =>
                                handleAction(
                                  markOrderPaid,
                                  order._id,
                                  "Payment completed",
                                )
                              }
                              disabled={actionLoading}
                            >
                              Paid
                            </button>
                          )}

                        {order.orderStatus !== "Completed" &&
                          order.orderStatus !== "Cancelled" && (
                            <CancelButton
                              className="danger"
                              onClick={() =>
                                handleAction(
                                  cancelOrder,
                                  order._id,
                                  "Order cancelled",
                                )
                              }
                              disabled={actionLoading}
                            >
                              Cancel
                            </CancelButton>
                          )}

                        <DeleteButton
                          className="delete"
                          onClick={() => handleDelete(order._id)}
                          disabled={actionLoading}
                        >
                          Delete
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        open={showForm}
        title={editingOrder ? "Edit Order" : "Add Order"}
        onClose={handleFormClose}
        size="lg"
      >
        <OrderForm
          editingOrder={editingOrder}
          restaurantOptions={restaurantOptions}
          storeOptions={storeOptions}
          tableOptions={tableOptions}
          customerOptions={customerOptions}
          menuItemOptions={menuItemOptions}
          onSubmit={handleSubmitOrder}
          onCancel={handleFormClose}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Order;
