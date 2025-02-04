import {
  FETCH_WISHLIST_REQUEST,
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAILURE,
  ADD_ITEM_TO_WISHLIST_REQUEST,
  ADD_ITEM_TO_WISHLIST_SUCCESS,
  ADD_ITEM_TO_WISHLIST_FAILURE,
  REMOVE_ITEM_FROM_WISHLIST_REQUEST,
  REMOVE_ITEM_FROM_WISHLIST_SUCCESS,
  REMOVE_ITEM_FROM_WISHLIST_FAILURE,
  REMOVE_ITEM_FROM_WISHLIST_STATIC,
  ADD_ITEM_TO_WISHLIST_STATIC,
} from "./wishlistAction";

const initialState = {
  wishlist: [],
  wishlistStatic: [], // Rename for clarity
  loading: false,
  error: null,
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_REQUEST:
    case ADD_ITEM_TO_WISHLIST_REQUEST:
    case REMOVE_ITEM_FROM_WISHLIST_REQUEST:
      return { ...state, loading: true };

    case FETCH_WISHLIST_SUCCESS:
      return { ...state, wishlist: action.payload, loading: false };

    case ADD_ITEM_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: [
          ...state.wishlist.filter(
            (produit) => produit.produitId._id !== action.payload.produitId._id
          ),
          action.payload,
        ],
        loading: false,
      };

    case REMOVE_ITEM_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item?.produitId?._id !== action.payload._id
        ),
        loading: false,
      };

    // Static wishlist actions
    case ADD_ITEM_TO_WISHLIST_STATIC:
      return {
        ...state,
        wishlistStatic: [...state.wishlistStatic, action.payload],
      };

    case REMOVE_ITEM_FROM_WISHLIST_STATIC:
      return {
        ...state,
        wishlistStatic: state.wishlistStatic.filter(
          (item) => item._id !== action.payload
        ),
      };

    case FETCH_WISHLIST_FAILURE:
    case ADD_ITEM_TO_WISHLIST_FAILURE:
    case REMOVE_ITEM_FROM_WISHLIST_FAILURE:
      return { ...state, error: action.payload.message, loading: false };

    default:
      return state;
  }
};
