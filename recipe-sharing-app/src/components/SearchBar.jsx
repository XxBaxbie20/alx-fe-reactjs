import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filters = useRecipeStore((state) => state.filters);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const setFilter = useRecipeStore((state) => state.setFilter);

  const handleClear = () => {
    setSearchTerm('');
    setFilter({ ingredient: '', maxPrepTime: '' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
      }}
    >
      <input
        type="text"
        placeholder="Search recipes by title or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Filter by ingredient"
          value={filters.ingredient}
          onChange={(e) => setFilter({ ingredient: e.target.value })}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <input
          type="number"
          min="0"
          placeholder="Max prep time (mins)"
          value={filters.maxPrepTime}
          onChange={(e) => setFilter({ maxPrepTime: e.target.value })}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

