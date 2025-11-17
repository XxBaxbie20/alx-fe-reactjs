import { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const AddRecipeForm = () => {
    const addRecipe  = useRecipeStore((state) => state.addRecipe);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [prepTime, setPrepTime] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title.trim() || !description.trim()) return;

        addRecipe({
            id: Date.now(),
            title,
            description,
            ingredients,
            prepTime: prepTime ? Number(prepTime) : '',
        });

        setTitle('');
        setDescription('');
        setIngredients('');
        setPrepTime('');
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: '20px'}}>
            <h2>Add a Recipe</h2>

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

            <button type="submit">Add Recipe</button>
        </form>
    );
};

export default AddRecipeForm;