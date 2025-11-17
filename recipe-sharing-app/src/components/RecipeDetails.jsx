
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
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
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;
