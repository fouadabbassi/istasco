import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  ADD_ITEM_TO_CART_REQUEST,
  ADD_ITEM_TO_CART_SUCCESS,
  ADD_ITEM_TO_CART_FAILURE,
  REMOVE_ITEM_FROM_CART_REQUEST,
  REMOVE_ITEM_FROM_CART_SUCCESS,
  REMOVE_ITEM_FROM_CART_FAILURE,
  ADD_QUANTITY_TO_CART_REQUEST,
  ADD_QUANTITY_TO_CART_SUCCESS,
  ADD_QUANTITY_TO_CART_FAILURE,
  REMOVE_QUANTITY_FROM_CART_REQUEST,
  REMOVE_QUANTITY_FROM_CART_SUCCESS,
  REMOVE_QUANTITY_FROM_CART_FAILURE,
  ADD_ITEM_TO_CART_STATIC,
  REMOVE_ITEM_FROM_CART_STATIC,
  ADD_Q_TO_CART_STATIC,
  REMOVE_Q_FROM_CART_STATIC,
} from "./cartAction";

const initialState = {
  cart: [],
  cartStatic: [],
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_REQUEST:
    case ADD_ITEM_TO_CART_REQUEST:
    case REMOVE_ITEM_FROM_CART_REQUEST:
    case ADD_QUANTITY_TO_CART_REQUEST:
    case REMOVE_QUANTITY_FROM_CART_REQUEST:
      return { ...state, loading: true };

    case FETCH_CART_SUCCESS:
      return { ...state, cart: action.payload, loading: false };

    case ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        cart: [
          ...state.cart.filter(
            (produit) => produit.produitId._id !== action.payload.produitId._id
          ),
          action.payload,
        ],
        loading: false,
      };

    case REMOVE_ITEM_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: state.cart.filter(
          (item) => item?.produitId?._id !== action.payload._id
        ),
        loading: false,
      };

    case ADD_QUANTITY_TO_CART_SUCCESS:
    case REMOVE_QUANTITY_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.produitId._id === action.payload.produitId._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        loading: false,
      };

    case ADD_ITEM_TO_CART_STATIC:
      return { ...state, cartStatic: [...state.cartStatic, action.payload] };

    case REMOVE_ITEM_FROM_CART_STATIC:
      return {
        ...state,
        cartStatic: state.cartStatic.filter(
          (item) => item.produitId._id !== action.payload
        ),
      };

    case ADD_Q_TO_CART_STATIC:
      return {
        ...state,
        cartStatic: state.cartStatic.map((item) =>
          item.produitId._id === action.payload.product.produitId._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        ),
      };

    case REMOVE_Q_FROM_CART_STATIC:
      return {
        ...state,
        cartStatic: state.cartStatic.map((item) =>
          item.produitId._id === action.payload.product.produitId._id
            ? {
                ...item,
                quantity: Math.max(0, item.quantity - action.payload.quantity),
              }
            : item
        ),
      };

    case FETCH_CART_FAILURE:
    case ADD_ITEM_TO_CART_FAILURE:
    case REMOVE_ITEM_FROM_CART_FAILURE:
    case ADD_QUANTITY_TO_CART_FAILURE:
    case REMOVE_QUANTITY_FROM_CART_FAILURE:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
