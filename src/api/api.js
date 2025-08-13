/**
 * API service functions for the Coffee Shop application
 * Handles all HTTP requests to the backend server
 */
import axios from "axios";

// Backend API base URL - ensure backend server is running on this port
const API_URL = 'http://localhost:5001/api/menu';

/**
 * Fetches homepage data including featured menu items
 * @returns {Promise<Object>} Homepage data with bestSellingDrinks and bestSellingSnacks
 */
export const getHomePageData = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

/**
 * Fetches menu items filtered by category
 * @param {string} categoryName - Category name (coffee, non-coffee, snack, main-course)
 * @returns {Promise<Array>} Array of menu items in the specified category
 */
export const getMenuByCategory = async (categoryName) => {
  const response = await axios.get(`${API_URL}/category/${categoryName}`);
  return response.data;
};

/**
 * Alternative function name for getting menu by category
 * @param {string} categoryName - Category name
 * @returns {Promise<Array>} Array of menu items in the specified category
 */
export const getMenuCategory = async (categoryName) => {
  const response = await axios.get(`${API_URL}/category/${categoryName}`);
  return response.data;
};

/**
 * Searches menu items by query string
 * @param {string} query - Search query string
 * @returns {Promise<Array>} Array of matching menu items
 */
export const searchMenu = async (query) => {
  if(!query) return [];
  const response = await axios.get(`${API_URL}/search?q=${query}`);
  return response.data;
};

/**
 * Gets AI-powered menu recommendations based on user input
 * @param {string} userInput - User's request or preference
 * @returns {Promise<Object>} AI recommendation response
 */
export const getRecommendation = async (userInput) => {
  const response = await axios.post(`${API_URL}/recommend`, {userInput});
  return response.data;
}

/**
 * Fetches a specific menu item by its slug/identifier
 * @param {string} slug - Menu item slug or ID
 * @returns {Promise<Object>} Menu item details
 */
export const getMenuBySlug = async (slug) => {
  const response = await axios.get(`${API_URL}/${slug}`);
  return response.data;
}