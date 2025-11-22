import axios from "axios";

const USER_BASE_URL = "https://api.github.com/users/";
const SEARCH_BASE_URL = "https://api.github.com/search/users";

/**
 * Fetch a single GitHub user by username
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${USER_BASE_URL}${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    throw error;
  }
};

/**
 * Advanced search for GitHub users
 */
export const searchAdvancedUsers = async ({ username, location, minRepos, page = 1 }) => {
  try {
    let query = username ? `${username} in:login` : "";
    if (location) query += ` location:${location}`;
    if (minRepos) query += ` repos:>=${minRepos}`;

    const response = await axios.get(
      `${SEARCH_BASE_URL}?q=${encodeURIComponent(query)}&page=${page}&per_page=12`
    );

    const users = response.data.items || [];

    // Fetch full details for each user to get location & public_repos
    const detailedUsers = await Promise.all(users.map(user => fetchUserData(user.login)));

    return detailedUsers;
  } catch (error) {
    console.error("GitHub API Advanced Search Error:", error);
    return [];
  }
};
