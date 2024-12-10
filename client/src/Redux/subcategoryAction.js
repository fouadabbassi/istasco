import {
  createSubcategories,
  deleteSubcategories,
  fetchSubcategories,
  fetchSubcategoriesByCategories,
  updateSubcategories,
} from "../Apis/services/SubcategoryService";

// Actions Types
export const FETCH_SAMPLE_REQUEST = "FETCH_SAMPLE_REQUEST";
export const FETCH_SAMPLE_SUCCESS = "FETCH_SAMPLE_SUCCESS";
export const FETCH_SAMPLE_FAILURE = "FETCH_SAMPLE_FAILURE";

export const FETCH_SUBCATEGORIES_REQUEST = "FETCH_SUBCATEGORIES_REQUEST";
export const FETCH_SUBCATEGORIES_SUCCESS = "FETCH_SUBCATEGORIES_SUCCESS";
export const FETCH_SUBCATEGORIES_FAILURE = "FETCH_SUBCATEGORIES_FAILURE";

export const CREATE_SUBCATEGORY_REQUEST = "CREATE_SUBCATEGORY_REQUEST";
export const CREATE_SUBCATEGORY_SUCCESS = "CREATE_SUBCATEGORY_SUCCESS";
export const CREATE_SUBCATEGORY_FAILURE = "CREATE_SUBCATEGORY_FAILURE";

export const UPDATE_SUBCATEGORY_REQUEST = "UPDATE_SUBCATEGORY_REQUEST";
export const UPDATE_SUBCATEGORY_SUCCESS = "UPDATE_SUBCATEGORY_SUCCESS";
export const UPDATE_SUBCATEGORY_FAILURE = "UPDATE_SUBCATEGORY_FAILURE";

export const DELETE_SUBCATEGORY_REQUEST = "DELETE_SUBCATEGORY_REQUEST";
export const DELETE_SUBCATEGORY_SUCCESS = "DELETE_SUBCATEGORY_SUCCESS";
export const DELETE_SUBCATEGORY_FAILURE = "DELETE_SUBCATEGORY_FAILURE";

// Fetch Subcategories by Category
export const fetchSubcategoriesByCategory =
  (categoryId) => async (dispatch) => {
    dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });
    try {
      const data = await fetchSubcategoriesByCategories(categoryId);
      dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_SUBCATEGORIES_FAILURE,
        payload: error.message,
      });
    }
  };
export const fetchSubcategory = () => async (dispatch) => {
  dispatch({ type: FETCH_SAMPLE_REQUEST });
  try {
    const data = await fetchSubcategories();
    dispatch({ type: FETCH_SAMPLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SAMPLE_FAILURE,
      payload: error.message,
    });
  }
};

// Create Subcategory
export const createSubcategory = (subcategoryData) => async (dispatch) => {
  dispatch({ type: CREATE_SUBCATEGORY_REQUEST });
  try {
    const data = await createSubcategories(subcategoryData);
    dispatch({ type: CREATE_SUBCATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SUBCATEGORY_FAILURE, payload: error.message });
  }
};

// Update Subcategory
export const updateSubcategory =
  (subcategoryId, subcategoryData) => async (dispatch) => {
    dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });
    try {
      const data = await updateSubcategories(subcategoryId, subcategoryData);
      dispatch({ type: UPDATE_SUBCATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBCATEGORY_FAILURE,
        payload: error.message,
      });
    }
  };

// Delete Subcategory
export const deleteSubcategory = (subcategoryId) => async (dispatch) => {
  dispatch({ type: DELETE_SUBCATEGORY_REQUEST });
  try {
    await deleteSubcategories(subcategoryId);
    dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: subcategoryId });
  } catch (error) {
    dispatch({ type: DELETE_SUBCATEGORY_FAILURE, payload: error.message });
  }
};
