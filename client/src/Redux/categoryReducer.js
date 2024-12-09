import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
} from "./categoryAction";

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
      case CREATE_CATEGORY_REQUEST:
      case UPDATE_CATEGORY_REQUEST:
      case DELETE_CATEGORY_REQUEST:
        return { ...state, loading: true };

      case FETCH_CATEGORIES_SUCCESS:
        return { ...state, categories: action.payload, loading: false };

      case CREATE_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: [action.payload, ...state.categories],
          loading: false,
        };

      case UPDATE_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: state.categories.map((category) =>
            category._id === action.payload._id ? action.payload : category
          ),
          loading: false,
        };

      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          categories: state.categories.filter(
            (category) => category._id !== action.payload._id
          ),
          loading: false,
        };

      case FETCH_CATEGORIES_FAILURE:
      case CREATE_CATEGORY_FAILURE:
      case UPDATE_CATEGORY_FAILURE:
      case DELETE_CATEGORY_FAILURE:
        return { ...state, error: action.payload, loading: false };

      default:
        return state;
    }
};
