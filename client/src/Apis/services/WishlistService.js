import Instance from "../axios";

// Get all wishlist items for a specific user by user ID
export const fetchWishlistByUserId = async (userId) => {
  try {
    const response = await Instance.get(`/wishlist/${userId}`);
    return response.data ; // Return the wishlist items
  } catch (error) {
    throw error.response?.data;
  }
};

// Add item to wishlist
export const addItemToWishlist = async (userId, productId) => {
  try {
    const response = await Instance.post(
      `/wishlist/additemtowishlist/${userId}`,
      { productId }
    );
    return response.data; // Return updated wishlist items
  } catch (error) {
    throw error.response?.data || "Error adding item to wishlist."; 
  }
};

// Remove item from wishlist
export const removeItemFromWishlist = async (userId, productId) => {
  try {
    const response = await Instance.post(
      `/wishlist/removeitemfromwishlist/${userId}`,
      { productId }
    );
    return response.data.removedProduct; // Return updated wishlist items
  } catch (error) { 
    throw error.response?.data || "Error removing item from wishlist.";
  }
};
