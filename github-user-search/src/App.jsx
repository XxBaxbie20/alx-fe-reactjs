import { useState } from "react";
import { searchGithubUser } from "./services/githubApi";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    if (!username.trim()) return;

    const data = await searchGithubUser(username);
    setUserData(data);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>GitHub User Search</h1>

      <input
        type="text"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: "0.5rem",
          marginRight: "1rem",
          width: "250px",
        }}
      />

      <button onClick={handleSearch} style={{ padding: "0.6rem 1.2rem" }}>
        Search
      </button>

      {userData && (
        <div style={{ marginTop: "2rem" }}>
          <img
            src={userData.avatar_url}
            alt="Avatar"
            width="120"
            style={{ borderRadius: "50%" }}
          />

          <h2>{userData.login}</h2>

          <p>
            <strong>Name:</strong> {userData.name || "No name provided"}
          </p>

          <p>
            <a href={userData.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
