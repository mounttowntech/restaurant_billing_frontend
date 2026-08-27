import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AddButton,
  DeleteButton,
  EditButton,
} from "../../components/Common/Button";

import Modal from "../../components/Common/Modal";

import IngredientForm from "./IngredientForm";
import { fetchStores } from "../../features/store/storeSlice";
import { fetchCategories } from "../../features/category/categorySlice";
// import { fetchSuppliers } from "../../features/supplier/supplierSlice";
import { fetchUnits } from "../../features/unit/unitSlice";
import {
  fetchIngredients,
  searchIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../../features/ingredient/ingredientSlice";

import "./Ingredient.css";

const Ingredient = () => {
  const dispatch = useDispatch();

  const {
    ingredients = [],
    loading,
    ingredientLoading,
    deleteLoading,
    error,
  } = useSelector((state) => state.ingredient);
  const { stores = [] } = useSelector((state) => state.stores);
  const { categories = [] } = useSelector((state) => state.category);
  // const { suppliers = [] } = useSelector((state) => state.supplier);
  const { units = [] } = useSelector((state) => state.unit);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchIngredients());

    dispatch(
      fetchStores({
        page: 1,
        limit: 1000,
      }),
    );

    dispatch(
      fetchCategories({
        page: 1,
        limit: 1000,
      }),
    );

    // dispatch(
    //   fetchSuppliers({
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
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        dispatch(searchIngredients(search.trim()));
      } else {
        dispatch(fetchIngredients());
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, dispatch]);

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (ingredient) => {
    setEditData(ingredient);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      setEditData(null);
    }, 0);
  };

  const storeOptions = stores.map((item) => ({
    label: item.storeName || item.name || item.storeCode || "Unnamed Store",
    value: item._id,
  }));

  const categoryOptions = categories.map((item) => ({
    label: item.categoryName || item.name || "Unnamed Category",
    value: item._id,
  }));

  // const supplierOptions = suppliers.map((item) => ({
  //   label: item.supplierName || item.name || "Unnamed Supplier",
  //   value: item._id,
  // }));

  const unitOptions = units.map((item) => ({
    label: item.unitName || item.name || item.unitCode || "Unnamed Unit",
    value: item._id,
  }));

  const handleSubmit = async (data) => {
    try {
      if (editData?._id) {
        await dispatch(
          updateIngredient({
            id: editData._id,
            data,
          }),
        ).unwrap();
      } else {
        await dispatch(createIngredient(data)).unwrap();
      }

      handleClose();
      dispatch(fetchIngredients());
    } catch (error) {
      console.error("Ingredient save error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ingredient?",
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteIngredient(id)).unwrap();
    } catch (error) {
      console.error("Delete ingredient error:", error);
    }
  };

  const getStoreName = (store) => {
    if (!store) return "-";

    if (typeof store === "object") {
      return store.storeName || store.name || store.storeCode || "-";
    }

    return store;
  };

  const getCategoryName = (category) => {
    if (!category) return "-";

    if (typeof category === "object") {
      return category.categoryName || category.name || "-";
    }

    return category;
  };

  const getSupplierName = (supplier) => {
    if (!supplier) return "-";

    if (typeof supplier === "object") {
      return supplier.supplierName || supplier.name || "-";
    }

    return supplier;
  };

  const getUnitName = (unit) => {
    if (!unit) return "-";

    if (typeof unit === "object") {
      return unit.unitName || unit.name || unit.unitCode || "-";
    }

    return unit;
  };

  return (
    <div className="ingredient-container">
      <div className="ingredient-header">
        <div>
          <h2 className="ingredient-title">Ingredients</h2>

          <p className="ingredient-subtitle">
            Manage restaurant ingredients and stock details
          </p>
        </div>

        <div className="ingredient-header-actions">
          <div className="ingredient-search">
            <input
              type="text"
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <AddButton onClick={handleAdd}>Add Ingredient</AddButton>
        </div>
      </div>

      {error && <div className="ingredient-error">{error}</div>}

      <div className="ingredient-table-container">
        {loading ? (
          <div className="ingredient-loading">Loading ingredients...</div>
        ) : ingredients.length === 0 ? (
          <div className="ingredient-empty">
            <h3>No Ingredients Found</h3>

            <p>Add an ingredient to get started.</p>
          </div>
        ) : (
          <table className="ingredient-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Ingredient</th>
                <th>Store</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Unit</th>
                <th>Current Stock</th>
                <th>Purchase Price</th>
                <th>Stock Value</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={ingredient._id}>
                  <td>
                    <span className="ingredient-code">
                      {ingredient.ingredientCode || "-"}
                    </span>
                  </td>

                  <td>
                    <span className="ingredient-name">
                      {ingredient.ingredientName || "-"}
                    </span>
                  </td>

                  <td>{getStoreName(ingredient.store)}</td>

                  <td>{getCategoryName(ingredient.category)}</td>

                  <td>{getSupplierName(ingredient.supplier)}</td>

                  <td>{getUnitName(ingredient.unit)}</td>

                  <td>{ingredient.currentStock ?? 0}</td>

                  <td>₹{Number(ingredient.purchasePrice || 0).toFixed(2)}</td>

                  <td>₹{Number(ingredient.stockValue || 0).toFixed(2)}</td>

                  <td>
                    <span
                      className={`ingredient-status ${String(
                        ingredient.stockStatus || "Available",
                      )
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {ingredient.stockStatus || "Available"}
                    </span>
                  </td>

                  <td>
                    <div className="modal-actions">
                      <EditButton onClick={() => handleEdit(ingredient)} />

                      <DeleteButton
                        onClick={() => handleDelete(ingredient._id)}
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
        title={editData ? "Edit Ingredient" : "Add Ingredient"}
      >
        {showModal && (
          <IngredientForm
            initialData={editData}
            loading={ingredientLoading}
            onSubmit={handleSubmit}
            storeOptions={storeOptions}
            categoryOptions={categoryOptions}
            // supplierOptions={supplierOptions}
            unitOptions={unitOptions}
          />
        )}
      </Modal>
    </div>
  );
};

export default Ingredient;
