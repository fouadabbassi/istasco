import {
    CREATE_SUBCATEGORY_FAILURE,
    CREATE_SUBCATEGORY_REQUEST,
    CREATE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAILURE,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    FETCH_SUBCATEGORIES_FAILURE,
    FETCH_SUBCATEGORIES_REQUEST,
    FETCH_SUBCATEGORIES_SUCCESS,
    UPDATE_SUBCATEGORY_FAILURE,
    UPDATE_SUBCATEGORY_REQUEST,
    UPDATE_SUBCATEGORY_SUCCESS,
    FETCH_SAMPLE_FAILURE,
    FETCH_SAMPLE_REQUEST,
    FETCH_SAMPLE_SUCCESS,
} from "./subcategoryAction";

const initialState = {
    subcategories: [],
    loading: false,
    error: null,
};

export const subcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SUBCATEGORIES_REQUEST:
      case CREATE_SUBCATEGORY_REQUEST:
      case UPDATE_SUBCATEGORY_REQUEST:
      case DELETE_SUBCATEGORY_REQUEST:
      case FETCH_SAMPLE_REQUEST:
        return { ...state, loading: true };

      case FETCH_SUBCATEGORIES_SUCCESS:
      case FETCH_SAMPLE_SUCCESS:
        return { ...state, subcategories: action.payload, loading: false };

      case CREATE_SUBCATEGORY_SUCCESS:
        return {
          ...state,
          subcategories: [action.payload, ...state.subcategories],
          loading: false,
        };

      case UPDATE_SUBCATEGORY_SUCCESS:
        return {
          ...state,
          subcategories: state.subcategories.map((subcategory) =>
            subcategory._id === action.payload._id
              ? action.payload
              : subcategory
          ),
          loading: false,
        };

      case DELETE_SUBCATEGORY_SUCCESS:
        return {
          ...state,
          subcategories: state.subcategories.filter(
            (subcategory) => subcategory._id !== action.payload
          ),
          loading: false,
        };

      case FETCH_SUBCATEGORIES_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
          subcategories: [],
        };

      case CREATE_SUBCATEGORY_FAILURE:
      case UPDATE_SUBCATEGORY_FAILURE:
      case DELETE_SUBCATEGORY_FAILURE:
        case FETCH_SAMPLE_FAILURE:
            return {
              ...state,
              error: action.payload,
              loading: false,
            };

      default:
        return state;
    }
};
