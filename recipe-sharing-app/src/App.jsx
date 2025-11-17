// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
        <h1>Recipe Sharing App</h1>
        <Routes>
          {/* Main page with list and add form */}
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <AddRecipeForm />
                <RecipeList />
                <FavoritesList />
                <RecommendationsList />
              </>
            }
          />

          {/* Recipe details page */}
          <Route path="/recipe/:id" element={<RecipeDetailsWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper component to get recipeId from route params
import { useParams } from 'react-router-dom';
const RecipeDetailsWrapper = () => {
  const { id } = useParams();
  return <RecipeDetails recipeId={Number(id)} />;
};

export default App;
