import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_SINGLE_ORDER_FAILURE,
  FETCH_SINGLE_ORDER_REQUEST,
  FETCH_SINGLE_ORDER_SUCCESS,
  FETCH_CUSTOMER_ORDERS_FAILURE,
  FETCH_CUSTOMER_ORDERS_REQUEST,
  FETCH_CUSTOMER_ORDERS_SUCCESS,
  UPDATE_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "./orderAction";
const initialState = {
  orders: [],
  currentOrder: null,
  customerOrders: [],
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
    case CREATE_ORDER_REQUEST:
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
    case FETCH_SINGLE_ORDER_REQUEST:
    case FETCH_CUSTOMER_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, loading: false };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order._id !== action.payload._id
        ),
        loading: false,
      };
    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        loading: false,
      };
    case FETCH_SINGLE_ORDER_SUCCESS:
      return { ...state, loading: false, currentOrder: action.payload };

    case FETCH_CUSTOMER_ORDERS_SUCCESS:
      return { ...state, loading: false, customerOrders: action.payload };

    case FETCH_ORDERS_FAILURE:
    case CREATE_ORDER_FAILURE:
    case UPDATE_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
    case FETCH_SINGLE_ORDER_FAILURE:
    case FETCH_CUSTOMER_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
