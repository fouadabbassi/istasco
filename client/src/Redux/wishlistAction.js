import {
  fetchWishlistByUserId,
  addItemToWishlist,
  removeItemFromWishlist,
} from "../Apis/services/WishlistService";

// Action Types
export const FETCH_WISHLIST_REQUEST = "FETCH_WISHLIST_REQUEST";
export const FETCH_WISHLIST_SUCCESS = "FETCH_WISHLIST_SUCCESS";
export const FETCH_WISHLIST_FAILURE = "FETCH_WISHLIST_FAILURE";

export const ADD_ITEM_TO_WISHLIST_REQUEST = "ADD_ITEM_TO_WISHLIST_REQUEST";
export const ADD_ITEM_TO_WISHLIST_SUCCESS = "ADD_ITEM_TO_WISHLIST_SUCCESS";
export const ADD_ITEM_TO_WISHLIST_FAILURE = "ADD_ITEM_TO_WISHLIST_FAILURE";

export const REMOVE_ITEM_FROM_WISHLIST_REQUEST =
  "REMOVE_ITEM_FROM_WISHLIST_REQUEST";
export const REMOVE_ITEM_FROM_WISHLIST_SUCCESS =
  "REMOVE_ITEM_FROM_WISHLIST_SUCCESS";
export const REMOVE_ITEM_FROM_WISHLIST_FAILURE =
  "REMOVE_ITEM_FROM_WISHLIST_FAILURE";

// Action Types for Static Wishlist
export const ADD_ITEM_TO_WISHLIST_STATIC = "ADD_ITEM_TO_WISHLIST_STATIC";
export const REMOVE_ITEM_FROM_WISHLIST_STATIC =
  "REMOVE_ITEM_FROM_WISHLIST_STATIC";

// Fetch Wishlist by User ID
export const fetchWishlist = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_WISHLIST_REQUEST });
  try {
    const data = await fetchWishlistByUserId(userId);
    dispatch({ type: FETCH_WISHLIST_SUCCESS, payload: data.items });
  } catch (error) {
    dispatch({ type: FETCH_WISHLIST_FAILURE, payload: error });
  }
};

// Add Item to Wishlist (API)
export const addItem = (userId, item) => async (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_WISHLIST_REQUEST });
  try {
    const data = await addItemToWishlist(userId, item);
    dispatch({ type: ADD_ITEM_TO_WISHLIST_SUCCESS, payload: data.produit });
  } catch (error) {
    dispatch({ type: ADD_ITEM_TO_WISHLIST_FAILURE, payload: error });
  }
};

// Add Item to Wishlist (Static)
export const addItemStatic = (produit) => (dispatch) => {
  dispatch({ type: ADD_ITEM_TO_WISHLIST_STATIC, payload: produit });
};

// Remove Item from Wishlist (Static)
export const removeItemStatic = (produitId) => (dispatch) => {
  dispatch({ type: REMOVE_ITEM_FROM_WISHLIST_STATIC, payload: produitId });
};

// Remove Item from Wishlist (API)
export const removeItem = (userId, item) => async (dispatch) => {
  dispatch({ type: REMOVE_ITEM_FROM_WISHLIST_REQUEST });
  try {
    const data = await removeItemFromWishlist(userId, item);
    dispatch({ type: REMOVE_ITEM_FROM_WISHLIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FROM_WISHLIST_FAILURE,
      payload: error,
    });
  }
};
