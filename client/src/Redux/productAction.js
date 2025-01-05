import { createProduit, deleteProduit, fetchProduitById, fetchProduits, updateProduit } from "../Apis/services/ProduitService";

export const CREATE_PRODUCT_REQUEST = "CREATE_PRODUCT_REQUEST";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_FAILURE = "CREATE_PRODUCT_FAILURE";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const FETCH_PRODUCT_REQUEST = "FETCH_PRODUCT_REQUEST";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_FAILURE = "FETCH_PRODUCT_FAILURE";

export const ADD_ID_CATEGORY = "ADD_ID_CATEGORY";
export const ADD_SEARCHING = "ADD_SEARCHING";
export const ADD_SEARCHINGTWO = "ADD_SEARCHINGTWO";

// Fetch Products
export const fetchProducts = (filters) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });
    try {
      const data = await fetchProduits(filters);
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
  };


// Create Product
export const createProduct = (productData , files) => async (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const data = await createProduit(productData , files);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Update Product
export const updateProduct = (productId, productData, files) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {
    const data = await updateProduit(productId, productData, files);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Delete Product
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    const data = await deleteProduit(productId);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};

// Fetch a single product by ID
export const fetchProductById = (productId) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  try {
    const data = await fetchProduitById(productId);
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data.produit });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message });
  }
};

export const addingIdCategoryFromNavbar = (id) =>(dispatch) => {
  dispatch({ type: ADD_ID_CATEGORY, payload: id });
}
export const addingSearchingFromNavbar = (searching) => (dispatch) => {
  dispatch({ type: ADD_SEARCHING, payload: searching });
};
export const addingSearchingFromLandingPage = (searching) => (dispatch) => {
  dispatch({ type: ADD_SEARCHINGTWO, payload: searching });
};