import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const favorites = useRecipeStore((state) => state.favorites);
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  if (!recommendations.length) {
    return (
      <section>
        <h2>Recommended For You</h2>
        <p>Favorite a few recipes to unlock personalized suggestions.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Recommended For You</h2>
      {recommendations.map((recipe) => {
        const isFavorite = favorites.includes(recipe.id);
        return (
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
            <button type="button" onClick={() => toggleFavorite(recipe.id)}>
              {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
          </div>
        );
      })}
    </section>
  );
};

export default RecommendationsList;

