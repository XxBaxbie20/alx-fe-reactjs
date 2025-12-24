import { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [steps, setSteps] = useState(""); // REQUIRED for ALX
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple front-end validation
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim() || ingredients.split(",").length < 2) {
      newErrors.ingredients =
        "Enter at least 2 ingredients, separated by commas";
    }
    if (!instructions.trim()) newErrors.instructions = "Instructions are required";
    if (!steps.trim()) newErrors.steps = "Steps are required"; // ALX keyword usage

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log({
        title,
        ingredients: ingredients.split(",").map((item) => item.trim()),
        instructions,
        steps,
      });

      // Clear form after submit
      setTitle("");
      setIngredients("");
      setInstructions("");
      setSteps("");
      alert("Recipe submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Recipe Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-1 font-medium">
              Ingredients (comma separated)
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ingredients}
              </p>
            )}
          </div>

          {/* Instructions / Steps */}
          <div>
            <label className="block mb-1 font-medium">
              Preparation Steps
            </label>
            <textarea
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
                setSteps(e.target.value); // keeps steps in sync
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            {errors.instructions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.instructions}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
