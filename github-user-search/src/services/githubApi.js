import axios from "axios";

const BASE_URL = "https://api.github.com";

// If a key is added later, Vite will load it automatically
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const searchGithubUser = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: {
        Authorization: GITHUB_API_KEY ? `token ${GITHUB_API_KEY}` : "",
      },
    });

    return response.data;
  } catch (error) {
    console.error("GitHub API Error:", error);
    return null;
  }
};
