// src/components/recipeStore.js
import { create } from 'zustand';

const applyFilters = (recipes, searchTerm, filters) => {
  const normalizedTerm = searchTerm.trim().toLowerCase();
  const normalizedIngredient = filters.ingredient.trim().toLowerCase();
  const parsedMaxPrepTime = Number(filters.maxPrepTime);
  const hasPrepLimit =
    filters.maxPrepTime !== '' && !Number.isNaN(parsedMaxPrepTime);

  return recipes.filter((recipe) => {
    const titleMatch = recipe.title.toLowerCase().includes(normalizedTerm);
    const descriptionMatch = recipe.description
      ?.toLowerCase()
      .includes(normalizedTerm);
    const ingredientMatch = normalizedIngredient
      ? recipe.ingredients
          ?.toLowerCase()
          .includes(normalizedIngredient)
      : true;
    const prepTimeMatch =
      hasPrepLimit && recipe.prepTime !== undefined && recipe.prepTime !== ''
        ? Number(recipe.prepTime) <= parsedMaxPrepTime
        : true;

    return (
      (normalizedTerm ? titleMatch || descriptionMatch : true) &&
      ingredientMatch &&
      prepTimeMatch
    );
  });
};

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',
  filters: {
    ingredient: '',
    maxPrepTime: '',
  },

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      return {
        recipes,
        filteredRecipes: applyFilters(
          recipes,
          state.searchTerm,
          state.filters
        ),
      };
    }),

  // Initialize recipe list
  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: applyFilters(recipes, state.searchTerm, state.filters),
    })),

  // Update an existing recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const recipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return {
        recipes,
        filteredRecipes: applyFilters(
          recipes,
          state.searchTerm,
          state.filters
        ),
      };
    }),

  // Delete a recipe by id
  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      return {
        recipes,
        filteredRecipes: applyFilters(
          recipes,
          state.searchTerm,
          state.filters
        ),
      };
    }),

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },

  setFilter: (filter) => {
    set((state) => ({
      filters: { ...state.filters, ...filter },
    }));
    get().filterRecipes();
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: applyFilters(
        state.recipes,
        state.searchTerm,
        state.filters
      ),
    })),
}));
