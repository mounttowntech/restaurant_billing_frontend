import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AddButton,
  DeleteButton,
  EditButton,
} from "../../components/Common/Button";

import Modal from "../../components/Common/Modal";

import IngredientStockLedgerForm from "./IngredientStockLedgerForm";

import {
  fetchIngredientStockLedgers,
  searchIngredientStockLedgers,
  createIngredientStockLedger,
  updateIngredientStockLedger,
  deleteIngredientStockLedger,
} from "../../features/ingredientStockLedger/ingredientStockLedgerSlice";

import { fetchIngredients } from "../../features/ingredient/ingredientSlice";

// import { fetchBatches } from "../../features/batch/batchSlice";

import { fetchUnits } from "../../features/unit/unitSlice";

import { fetchRestaurants } from "../../features/restaurant/restaurantSlice";

import { fetchStores } from "../../features/store/storeSlice";

import { fetchWarehouses } from "../../features/warehouse/warehouseSlice";

import "./IngredientStockLedger.css";

const IngredientStockLedger = () => {
  const dispatch = useDispatch();

  const {
    ingredientStockLedgers = [],
    loading,
    ingredientStockLedgerLoading,
    deleteLoading,
    error,
  } = useSelector((state) => state.ingredientStockLedger);

  const { ingredients = [] } = useSelector((state) => state.ingredient);
  // const { batches = [] } = useSelector((state) => state.batch);
  const { units = [] } = useSelector((state) => state.unit);
  const { restaurants = [] } = useSelector((state) => state.restaurants);
  const { stores = [] } = useSelector((state) => state.stores);
  const { warehouses = [] } = useSelector((state) => state.warehouse);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(
      fetchIngredientStockLedgers({
        page: 1,
        limit: 1000,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        dispatch(searchIngredientStockLedgers(search.trim()));
      } else {
        dispatch(
          fetchIngredientStockLedgers({
            page: 1,
            limit: 1000,
          }),
        );
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(
      fetchIngredients({
        page: 1,
        limit: 1000,
      }),
    );

    // dispatch(
    //   fetchBatches({
    //     page: 1,
    //     limit: 1000,
    //   }),
    // );

    dispatch(
      fetchUnits({
        page: 1,
        limit: 1000,
      }),
    );

    dispatch(
      fetchRestaurants({
        page: 1,
        limit: 1000,
      }),
    );

    dispatch(
      fetchStores({
        page: 1,
        limit: 1000,
      }),
    );

    dispatch(
      fetchWarehouses({
        page: 1,
        limit: 1000,
      }),
    );
  }, [dispatch]);

  const ingredientOptions = ingredients.map((item) => ({
    label:
      item.ingredientName ||
      item.name ||
      item.ingredientCode ||
      "Unnamed Ingredient",
    value: item._id,
  }));

  // const batchOptions = batches.map((item) => ({
  //   label: item.batchNo || item.batchName || item.name || "Unnamed Batch",
  //   value: item._id,
  // }));

  const unitOptions = units.map((item) => ({
    label: item.unitName || item.name || item.unitCode || "Unnamed Unit",
    value: item._id,
  }));

  const restaurantOptions = restaurants.map((item) => ({
    label: item.restaurantName || item.name || "Unnamed Restaurant",
    value: item._id,
  }));

  const storeOptions = stores.map((item) => ({
    label: item.storeName || item.name || item.storeCode || "Unnamed Store",
    value: item._id,
  }));

  const warehouseOptions = warehouses.map((item) => ({
    label:
      item.warehouseName ||
      item.name ||
      item.warehouseCode ||
      "Unnamed Warehouse",
    value: item._id,
  }));

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (ledger) => {
    setEditData(ledger);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleSubmit = async (data) => {
    try {
      if (editData?._id) {
        await dispatch(
          updateIngredientStockLedger({
            id: editData._id,
            data,
          }),
        ).unwrap();
      } else {
        await dispatch(createIngredientStockLedger(data)).unwrap();
      }

      handleClose();

      dispatch(
        fetchIngredientStockLedgers({
          page: 1,
          limit: 1000,
        }),
      );
    } catch (error) {
      console.error("Ingredient stock ledger save error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stock ledger?",
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteIngredientStockLedger(id)).unwrap();
    } catch (error) {
      console.error("Delete ingredient stock ledger error:", error);
    }
  };

  const getName = (value, options, objectKeys = []) => {
    if (!value) return "-";

    if (typeof value === "object") {
      for (const key of objectKeys) {
        if (value[key]) return value[key];
      }

      return "-";
    }

    const found = options.find((item) => item.value === value);

    return found?.label || "-";
  };

  const getIngredientName = (ingredient) =>
    getName(ingredient, ingredientOptions, [
      "ingredientName",
      "name",
      "ingredientCode",
    ]);

  // const getBatchName = (batch) =>
  //   getName(batch, batchOptions, ["batchNo", "batchName", "name"]);

  const getUnitName = (unit) =>
    getName(unit, unitOptions, ["unitName", "name", "unitCode"]);

  const getStoreName = (store) =>
    getName(store, storeOptions, ["storeName", "name", "storeCode"]);

  const getWarehouseName = (warehouse) =>
    getName(warehouse, warehouseOptions, [
      "warehouseName",
      "name",
      "warehouseCode",
    ]);

  const filteredLedgers = useMemo(() => {
    return Array.isArray(ingredientStockLedgers) ? ingredientStockLedgers : [];
  }, [ingredientStockLedgers]);

  return (
    <div className="ingredient-stock-ledger-container">
      <div className="ingredient-stock-ledger-header">
        <div>
          <h2 className="ingredient-stock-ledger-title">
            Ingredient Stock Ledger
          </h2>

          <p className="ingredient-stock-ledger-subtitle">
            Manage ingredient stock transactions and inventory movements
          </p>
        </div>

        <div className="ingredient-stock-ledger-header-actions">
          <div className="ingredient-stock-ledger-search">
            <input
              type="text"
              placeholder="Search ledger..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <AddButton onClick={handleAdd}>Add Stock Ledger</AddButton>
        </div>
      </div>

      {error && <div className="ingredient-stock-ledger-error">{error}</div>}

      <div className="ingredient-stock-ledger-table-container">
        {loading ? (
          <div className="ingredient-stock-ledger-loading">
            Loading stock ledgers...
          </div>
        ) : filteredLedgers.length === 0 ? (
          <div className="ingredient-stock-ledger-empty">
            <h3>No Stock Ledgers Found</h3>

            <p>Add a stock transaction to get started.</p>
          </div>
        ) : (
          <table className="ingredient-stock-ledger-table">
            <thead>
              <tr>
                <th>Ledger No</th>
                <th>Ingredient</th>
                <th>Batch</th>
                <th>Unit</th>
                <th>Store</th>
                <th>Warehouse</th>
                <th>Transaction</th>
                <th>Stock In</th>
                <th>Stock Out</th>
                <th>Balance</th>
                <th>Price</th>
                <th>Total Value</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredLedgers.map((ledger) => (
                <tr key={ledger._id}>
                  <td>
                    <span className="ledger-code">{ledger.ledgerNo}</span>
                  </td>

                  <td>{getIngredientName(ledger.ingredient)}</td>

                  {/* <td>{getBatchName(ledger.batch)}</td> */}

                  <td>{getUnitName(ledger.unit)}</td>

                  <td>{getStoreName(ledger.store)}</td>

                  <td>{getWarehouseName(ledger.warehouse)}</td>

                  <td>
                    <span
                      className={`transaction-type ${String(
                        ledger.transactionType || "",
                      )
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {ledger.transactionType || "-"}
                    </span>
                  </td>

                  <td className="stock-in">
                    {Number(ledger.stockIn || 0).toFixed(2)}
                  </td>

                  <td className="stock-out">
                    {Number(ledger.stockOut || 0).toFixed(2)}
                  </td>

                  <td>{Number(ledger.balanceStock || 0).toFixed(2)}</td>

                  <td>₹{Number(ledger.purchasePrice || 0).toFixed(2)}</td>

                  <td>₹{Number(ledger.totalValue || 0).toFixed(2)}</td>

                  <td>
                    {ledger.transactionDate
                      ? new Date(ledger.transactionDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`ledger-status ${String(ledger.status || "")
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {ledger.status || "Completed"}
                    </span>
                  </td>

                  <td>
                    <div className="ingredient-stock-ledger-actions">
                      <EditButton onClick={() => handleEdit(ledger)} />

                      <DeleteButton
                        onClick={() => handleDelete(ledger._id)}
                        disabled={deleteLoading}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={showModal}
        onClose={handleClose}
        title={
          editData
            ? "Edit Ingredient Stock Ledger"
            : "Add Ingredient Stock Ledger"
        }
      >
        <IngredientStockLedgerForm
          initialData={editData}
          loading={ingredientStockLedgerLoading}
          onSubmit={handleSubmit}
          ingredientOptions={ingredientOptions}
          // batchOptions={batchOptions}
          unitOptions={unitOptions}
          restaurantOptions={restaurantOptions}
          storeOptions={storeOptions}
          warehouseOptions={warehouseOptions}
        />
      </Modal>
    </div>
  );
};

export default IngredientStockLedger;
