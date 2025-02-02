import Instance from "../axios";

// Get all cart items for a specific user by user ID
export const fetchCartByUserId = async (userId) => {
  try {
    const response = await Instance.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

// Add item to cart
export const addItemToCart = async (userId, productId, quantity) => {
  try {
    const response = await Instance.post(`/cart/additemtocart/${userId}`, {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

// Remove item from cart
export const removeItemFromCart = async (userId, productId) => {
  try {
    const response = await Instance.post(`/cart/removeitemfromcart/${userId}`, {
      productId,
    });
    return response.data.removedProduct ;
  } catch (error) {
    throw error?.response?.data;
  }
};

// Increase the quantity of an item in the cart
export const addQuantityToCartItem = async (userId, productId, quantity) => {
  try {
    const response = await Instance.post(
      `/cart/addquantityitemtocart/${userId}`,
      {
        productId,
        quantity,
      }
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

// Decrease the quantity of an item in the cart
export const removeQuantityFromCartItem = async (
  userId,
  productId,
  quantity
) => {
  try {
    const response = await Instance.post(
      `/cart/removequantityitemfromcart/${userId}`,
      {
        productId,
        quantity,
      }
    );
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};
