// Get the API base URL for images
const API_URL = process.env.REACT_APP_API_URL || '';

/**
 * Get the full URL for an image from the backend
 * @param {string} imagePath - The relative image path from API (e.g., "/images/phone.jpg")
 * @returns {string} - Full URL to the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Prepend the API URL to the relative path
  return `${API_URL}${imagePath}`;
};

export default getImageUrl;
