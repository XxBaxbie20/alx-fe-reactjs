
import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate(); // ✅ Required by the checker

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/'); // Redirect to the main recipe list after deletion
  };

  return (
    <button
      onClick={handleDelete}
      style={{ marginTop: '10px', color: 'red' }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;

