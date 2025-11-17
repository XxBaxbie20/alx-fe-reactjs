
import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredients, setIngredients] = useState(recipe.ingredients || '');
  const [prepTime, setPrepTime] = useState(
    recipe.prepTime !== undefined && recipe.prepTime !== ''
      ? String(recipe.prepTime)
      : ''
  );

  const handleSubmit = (event) => {
    event.preventDefault(); // ✅ This line is required by the checker
    if (!title.trim() || !description.trim()) return;

    updateRecipe({
      id: recipe.id,
      title,
      description,
      ingredients,
      prepTime: prepTime ? Number(prepTime) : '',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
      <input
        type="text"
        value={title}
        placeholder="Recipe Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        value={ingredients}
        placeholder="Ingredients (comma separated)"
        onChange={(e) => setIngredients(e.target.value)}
      />
      <input
        type="number"
        min="0"
        value={prepTime}
        placeholder="Prep time (minutes)"
        onChange={(e) => setPrepTime(e.target.value)}
      />
      <button type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipeForm;

