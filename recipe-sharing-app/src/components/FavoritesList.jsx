import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const favoriteRecipes = favorites
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean);

  if (!favoriteRecipes.length) {
    return (
      <section>
        <h2>My Favorites</h2>
        <p>You haven&apos;t favorited any recipes yet.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>My Favorites</h2>
      {favoriteRecipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: '1px solid #eee',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>
          <p>{recipe.description}</p>
          <button type="button" onClick={() => removeFavorite(recipe.id)}>
            Remove Favorite
          </button>
        </div>
      ))}
    </section>
  );
};

export default FavoritesList;

