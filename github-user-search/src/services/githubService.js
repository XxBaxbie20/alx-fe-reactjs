import axios from "axios";

const BASE_URL = "https://api.github.com";

// Optional: Use token if defined
const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: GITHUB_API_KEY ? { Authorization: `token ${GITHUB_API_KEY}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    throw error;
  }
};

// Advanced search
export const searchAdvancedUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    let query = "";
    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos} `;

    const response = await axios.get(`${BASE_URL}/search/users`, {
      headers: GITHUB_API_KEY ? { Authorization: `token ${GITHUB_API_KEY}` } : {},
      params: {
        q: query.trim(),
        per_page: 10,
        page,
      },
    });

    // The search API returns an array in response.data.items
    return response.data.items;
  } catch (error) {
    console.error("Error performing advanced search:", error);
    throw error;
  }
};
