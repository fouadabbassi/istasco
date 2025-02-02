import { addItemToCart, addQuantityToCartItem, fetchCartByUserId, removeItemFromCart, removeQuantityFromCartItem } from "../Apis/services/CartService";

// Action Types
export const FETCH_CART_REQUEST = "FETCH_CART_REQUEST";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS";
export const FETCH_CART_FAILURE = "FETCH_CART_FAILURE";

export const ADD_ITEM_TO_CART_REQUEST = "ADD_ITEM_TO_CART_REQUEST";
export const ADD_ITEM_TO_CART_SUCCESS = "ADD_ITEM_TO_CART_SUCCESS";
export const ADD_ITEM_TO_CART_FAILURE = "ADD_ITEM_TO_CART_FAILURE";

export const REMOVE_ITEM_FROM_CART_REQUEST = "REMOVE_ITEM_FROM_CART_REQUEST";
export const REMOVE_ITEM_FROM_CART_SUCCESS = "REMOVE_ITEM_FROM_CART_SUCCESS";
export const REMOVE_ITEM_FROM_CART_FAILURE = "REMOVE_ITEM_FROM_CART_FAILURE";

export const ADD_QUANTITY_TO_CART_REQUEST = "ADD_QUANTITY_TO_CART_REQUEST";
export const ADD_QUANTITY_TO_CART_SUCCESS = "ADD_QUANTITY_TO_CART_SUCCESS";
export const ADD_QUANTITY_TO_CART_FAILURE = "ADD_QUANTITY_TO_CART_FAILURE";

export const REMOVE_QUANTITY_FROM_CART_REQUEST =
  "REMOVE_QUANTITY_FROM_CART_REQUEST";
export const REMOVE_QUANTITY_FROM_CART_SUCCESS =
  "REMOVE_QUANTITY_FROM_CART_SUCCESS";
export const REMOVE_QUANTITY_FROM_CART_FAILURE =
  "REMOVE_QUANTITY_FROM_CART_FAILURE";

// Static Action Types
export const ADD_ITEM_TO_CART_STATIC = "ADD_ITEM_TO_CART_STATIC";
export const REMOVE_ITEM_FROM_CART_STATIC = "REMOVE_ITEM_FROM_CART_STATIC";
export const ADD_Q_TO_CART_STATIC = "ADD_Q_TO_CART_STATIC";
export const REMOVE_Q_FROM_CART_STATIC = "REMOVE_Q_FROM_CART_STATIC";

// Fetch Cart
export const fetchCart = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_CART_REQUEST });
  try {
    const data = await fetchCartByUserId(userId);
    dispatch({ type: FETCH_CART_SUCCESS, payload: data.items });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
  }
};

// Add Item to Cart
export const addItemCart = (userId, productId, quantity) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
  try {
      const data = await addItemToCart(userId, productId, quantity);
    dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data.produit });
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.message });
  }
};

// Remove Item from Cart
export const removeItemCart = (userId, productId) => async (dispatch) => {
  dispatch({ type: REMOVE_ITEM_FROM_CART_REQUEST });
  try {
    const data = await removeItemFromCart(userId, productId);
    dispatch({ type: REMOVE_ITEM_FROM_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REMOVE_ITEM_FROM_CART_FAILURE, payload: error.message });
  }
};

// Add Quantity to Cart
export const addQuantity =
  (userId, productId, quantity) => async (dispatch) => {
    dispatch({ type: ADD_QUANTITY_TO_CART_REQUEST });
    try {
      const data = await addQuantityToCartItem(userId, productId, quantity);
      dispatch({ type: ADD_QUANTITY_TO_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADD_QUANTITY_TO_CART_FAILURE, payload: error.message });
    }
  };

// Remove Quantity from Cart
export const removeQuantity =
  (userId, productId, quantity) => async (dispatch) => {
    dispatch({ type: REMOVE_QUANTITY_FROM_CART_REQUEST });
    try {
      const data = await removeQuantityFromCartItem(userId, productId, quantity);
      dispatch({ type: REMOVE_QUANTITY_FROM_CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: REMOVE_QUANTITY_FROM_CART_FAILURE,
        payload: error.message,
      });
    }
  };

// Add Item to Cart static
export const addItemCartStatic = (product) => (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_CART_STATIC, payload: product });
};
// Remove Item from Cart static
export const removeItemCartStatic = (productId) => (dispatch) => {
  dispatch({ type: REMOVE_ITEM_FROM_CART_STATIC, payload: productId });
};
// Add Quantity to Static Cart
export const addQCartStatic = (product, quantity) => (dispatch) => {
  dispatch({ type: ADD_Q_TO_CART_STATIC, payload: { product, quantity } });
};

// Remove Quantity from Static Cart
export const removeQCartStatic = (product, quantity) => (dispatch) => {
  dispatch({ type: REMOVE_Q_FROM_CART_STATIC, payload: { product, quantity } });
};


