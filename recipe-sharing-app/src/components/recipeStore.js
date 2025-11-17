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

const extractKeywords = (text = '') =>
  text
    .split(/,|\s+/)
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 2);

const computeRecommendations = (recipes, favorites) => {
  if (!recipes.length || !favorites.length) return [];

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  if (!favoriteRecipes.length) return [];

  const keywordSet = new Set();
  favoriteRecipes.forEach((recipe) => {
    extractKeywords(recipe.ingredients).forEach((keyword) =>
      keywordSet.add(keyword)
    );
    extractKeywords(recipe.title).forEach((keyword) => keywordSet.add(keyword));
  });

  const candidates = recipes.filter(
    (recipe) => !favorites.includes(recipe.id)
  );

  if (!keywordSet.size) {
    return candidates.slice(0, 3);
  }

  const scored = candidates
    .map((recipe) => {
      let score = 0;
      const candidateKeywords = [
        ...extractKeywords(recipe.title),
        ...extractKeywords(recipe.ingredients),
      ];

      candidateKeywords.forEach((keyword) => {
        if (keywordSet.has(keyword)) score += 1;
      });

      return { recipe, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ recipe }) => recipe);

  return scored.slice(0, 3);
};

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  searchTerm: '',
  filters: {
    ingredient: '',
    maxPrepTime: '',
  },
  favorites: [],
  recommendations: [],

  // Add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => {
      const recipes = [...state.recipes, newRecipe];
      const recommendations = computeRecommendations(recipes, state.favorites);
      return {
        recipes,
        filteredRecipes: applyFilters(
          recipes,
          state.searchTerm,
          state.filters
        ),
        recommendations,
      };
    }),

  // Initialize recipe list
  setRecipes: (recipes) =>
    set((state) => ({
      recipes,
      filteredRecipes: applyFilters(recipes, state.searchTerm, state.filters),
      recommendations: computeRecommendations(recipes, state.favorites),
    })),

  // Update an existing recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const recipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      const recommendations = computeRecommendations(recipes, state.favorites);
      return {
        recipes,
        filteredRecipes: applyFilters(
          recipes,
          state.searchTerm,
          state.filters
        ),
        recommendations,
      };
    }),

  // Delete a recipe by id
  deleteRecipe: (id) =>
    set((state) => {
      const recipes = state.recipes.filter((r) => r.id !== id);
      const favorites = state.favorites.filter((favId) => favId !== id);
      const recommendations = computeRecommendations(recipes, favorites);
      return {
        recipes,
        favorites,
        filteredRecipes: applyFilters(
          recipes,
          state.searchTerm,
          state.filters
        ),
        recommendations,
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

  addFavorite: (recipeId) =>
    set((state) => {
      if (state.favorites.includes(recipeId)) return state;
      const favorites = [...state.favorites, recipeId];
      return {
        favorites,
        recommendations: computeRecommendations(state.recipes, favorites),
      };
    }),

  removeFavorite: (recipeId) =>
    set((state) => {
      const favorites = state.favorites.filter((id) => id !== recipeId);
      return {
        favorites,
        recommendations: computeRecommendations(state.recipes, favorites),
      };
    }),

  toggleFavorite: (recipeId) => {
    const hasFavorite = get().favorites.includes(recipeId);
    if (hasFavorite) {
      get().removeFavorite(recipeId);
    } else {
      get().addFavorite(recipeId);
    }
  },

  refreshRecommendations: () =>
    set((state) => ({
      recommendations: computeRecommendations(state.recipes, state.favorites),
    })),
}));
