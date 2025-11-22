import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    const data = await fetchUserData(username);

    if (!data) {
      setError("Looks like we cant find the user");
    } else {
      setUser(data);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "0.6rem",
            width: "260px",
            marginRight: "10px",
          }}
        />
        <button type="submit" style={{ padding: "0.6rem 1rem" }}>
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p style={{ color: "red" }}>Looks like we cant find the user</p>}

      {/* Successful User Result */}
      {user && (
        <div style={{ marginTop: "1.5rem" }}>
          <img
            src={user.avatar_url}
            alt="Profile"
            width="120"
            style={{ borderRadius: "50%" }}
          />

          <h2>{user.login}</h2>
          <p>{user.name || "No name provided"}</p>

          <p>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Search;
