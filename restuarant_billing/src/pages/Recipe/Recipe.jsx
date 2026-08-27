import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Recipe.css";

import RecipeForm from "./RecipeForm";

import Modal from "../../components/Common/Modal";

import {
  fetchRecipes,
  searchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  clearRecipeError,
} from "../../features/recipe/recipeSlice";

import {
  AddButton,
  EditButton,
  DeleteButton,
} from "../../components/Common/Button";

const Recipe = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    recipes = [],
    loading = false,
    recipeLoading = false,
    deleteLoading = false,
    error = null,
  } = useSelector((state) => state.recipe || {});

  // =====================================================
  // FETCH RECIPES
  // =====================================================

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    if (!value.trim()) {
      dispatch(fetchRecipes());
      return;
    }

    dispatch(searchRecipes(value.trim()));
  };

  // =====================================================
  // ADD RECIPE
  // =====================================================

  const handleAddRecipe = () => {
    setEditingRecipe(null);
    setShowModal(true);
  };

  // =====================================================
  // EDIT RECIPE
  // =====================================================

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecipe(null);
    dispatch(clearRecipeError());
  };

  // =====================================================
  // CREATE / UPDATE
  // =====================================================

  const handleSubmitRecipe = async (formData) => {
    try {
      if (editingRecipe?._id) {
        await dispatch(
          updateRecipe({
            id: editingRecipe._id,
            data: formData,
          }),
        ).unwrap();
      } else {
        await dispatch(createRecipe(formData)).unwrap();
      }

      handleCloseModal();

      dispatch(fetchRecipes());
    } catch (error) {
      console.error("Recipe save failed:", error);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDeleteRecipe = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?",
    );

    if (!confirmed) return;

    try {
      await dispatch(deleteRecipe(id)).unwrap();

      dispatch(fetchRecipes());
    } catch (error) {
      console.error("Recipe delete failed:", error);
    }
  };

  return (
    <div className="recipe-page">
      {/* HEADER */}
      <div className="recipe-page-header">
        <div>
          <h2>Recipes</h2>

          <p>Manage your recipes and recipe details</p>
        </div>

        <AddButton type="button" onClick={handleAddRecipe}>
          + Add Recipe
        </AddButton>
      </div>

      {/* SEARCH */}
      <div className="recipe-search-bar">
        <input
          type="text"
          placeholder="Search by recipe code or name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* ERROR */}
      {error && <div className="recipe-error-banner">{error}</div>}

      {/* TABLE */}
      <div className="recipe-table-wrapper">
        {loading ? (
          <div className="recipe-loading">Loading recipes...</div>
        ) : recipes.length === 0 ? (
          <div className="recipe-empty">No recipes found.</div>
        ) : (
          <table className="recipe-table">
            <thead>
              <tr>
                <th>Recipe Code</th>
                <th>Recipe Name</th>
                <th>Menu Item</th>
                <th>Restaurant</th>
                <th>Store</th>
                <th>Selling Price</th>
                <th>Total Cost</th>
                <th>Profit %</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe._id}>
                  <td>{recipe.recipeCode || "-"}</td>

                  <td>{recipe.recipeName || "-"}</td>

                  <td>
                    {recipe.menuItem?.menuName ||
                      recipe.menuItem?.menuCode ||
                      "-"}
                  </td>

                  <td>{recipe.restaurant?.restaurantName || "-"}</td>

                  <td>{recipe.store?.storeName || "-"}</td>

                  <td>
                    {recipe.sellingPrice !== undefined
                      ? `₹${recipe.sellingPrice}`
                      : "-"}
                  </td>

                  <td>
                    {recipe.totalCost !== undefined
                      ? `₹${recipe.totalCost}`
                      : "-"}
                  </td>

                  <td>
                    {recipe.profitPercentage !== undefined
                      ? `${recipe.profitPercentage}%`
                      : "-"}
                  </td>

                  <td>{recipe.status || "-"}</td>

                  <td>
                    <div className="modal-actions">
                      <EditButton
                        type="button"
                        onClick={() => handleEditRecipe(recipe)}
                      >
                        Edit
                      </EditButton>

                      <DeleteButton
                        type="button"
                        onClick={() => handleDeleteRecipe(recipe._id)}
                        disabled={deleteLoading}
                      >
                        Delete
                      </DeleteButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* =====================================================
          RECIPE MODAL
      ===================================================== */}

      <Modal
        open={showModal}
        title={editingRecipe ? "Edit Recipe" : "Add Recipe"}
        onClose={handleCloseModal}
        size="lg"
      >
        <RecipeForm
          editingRecipe={editingRecipe}
          onSubmit={handleSubmitRecipe}
          onCancel={handleCloseModal}
          loading={recipeLoading}
        />
      </Modal>
    </div>
  );
};

export default Recipe;
