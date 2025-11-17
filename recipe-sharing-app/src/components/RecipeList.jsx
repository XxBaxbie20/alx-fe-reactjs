// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filters = useRecipeStore((state) => state.filters);
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  const hasRecipes = filteredRecipes.length > 0;
  const hasFiltersApplied =
    searchTerm.trim() ||
    filters.ingredient.trim() ||
    (filters.maxPrepTime ?? '').toString().trim();

  return (
    <div>
      <h2>Recipe List</h2>
      {!hasRecipes && !hasFiltersApplied && <p>No recipes yet. Add one!</p>}
      {!hasRecipes && hasFiltersApplied && (
        <p>No recipes match the current search.</p>
      )}

      {filteredRecipes.map((recipe) => {
        const isFavorite = favorites.includes(recipe.id);
        return (
          <div key={recipe.id} style={{ marginBottom: '15px' }}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
            </Link>
            <p>{recipe.description}</p>
            {recipe.ingredients && (
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
            )}
            {recipe.prepTime !== undefined && recipe.prepTime !== '' && (
              <p>
                <strong>Prep time:</strong> {recipe.prepTime} mins
              </p>
            )}
            <button type="button" onClick={() => toggleFavorite(recipe.id)}>
              {isFavorite ? '★ Favorited' : '☆ Add to favorites'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeList;
