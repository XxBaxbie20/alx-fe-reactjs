import Search from "./components/Search";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold mb-2">GitHub User Search</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Search for GitHub users and explore their profiles
        </p>
      </header>

      {/* Main Search Component */}
      <main className="flex justify-center px-4">
        <Search />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 dark:text-gray-400">
        Built with React & Tailwind CSS
      </footer>
    </div>
  );
}

export default App;

