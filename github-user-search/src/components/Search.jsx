import { useState } from "react";
import { fetchUserData, searchAdvancedUsers } from "../services/githubService";

export default function Search() {
  const [mode, setMode] = useState("simple"); // simple or advanced
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [userData, setUserData] = useState(null); // simple search
  const [users, setUsers] = useState([]); // advanced search
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  // Simple search
  const handleSimpleSearch = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(false);
    setUsers([]);
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch {
      setError(true);
      setUserData(null);
    }
    setLoading(false);
  };

  // Advanced search
  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    setError(false);
    try {
      const results = await searchAdvancedUsers({
        username,
        location,
        minRepos,
        page: pageNumber,
      });

      if (results.length === 0 && pageNumber === 1) setError(true);

      if (pageNumber === 1) setUsers(results);
      else setUsers((prev) => [...prev, ...results]);
    } catch {
      setError(true);
    }
    setLoading(false);
  };

  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(1);
    setUserData(null);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(nextPage);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${mode === "simple" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("simple")}
        >
          Simple Search
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "advanced" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setMode("advanced")}
        >
          Advanced Search
        </button>
      </div>

      {/* Simple Search Form */}
      {mode === "simple" && (
        <form className="flex justify-center gap-4 mb-6" onSubmit={handleSimpleSearch}>
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded w-64"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Search
          </button>
        </form>
      )}

      {/* Advanced Search Form */}
      {mode === "advanced" && (
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" onSubmit={handleAdvancedSearch}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Min Repos"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
            Search
          </button>
        </form>
      )}

      {/* Loading and Error */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-600 text-center">Looks like we cant find the user</p>}

      {/* Simple Search Result */}
      {userData && (
        <div className="user-card mx-auto mt-6 max-w-sm">
          <img src={userData.avatar_url} alt="Avatar" />
          <h2>{userData.login}</h2>
          <p><strong>Name:</strong> {userData.name || "No name provided"}</p>
          <p><strong>Location:</strong> {userData.location || "N/A"}</p>
          <p>
            Public Repos: <span className="repo-badge">{userData.public_repos}</span>
          </p>
          <p>
            <a href={userData.html_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              View GitHub Profile
            </a>
          </p>
        </div>
      )}

      {/* Advanced Search Results */}
      <div className="results-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <img src={user.avatar_url} alt={user.login} />
            <h2>{user.login}</h2>
            <p>Location: {user.location || "N/A"}</p>
            <p>
              Public Repos: <span className="repo-badge">{user.public_repos}</span>
            </p>
            <p>
              <a href={user.html_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                View Profile
              </a>
            </p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {users.length > 0 && !loading && (
        <div className="flex justify-center mt-6">
          <button onClick={loadMore} className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
