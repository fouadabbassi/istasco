import {
  createOrderApi,
  destroyOrder,
  fetchOrdersApi,
  fetchSingleOrderApi,
  fetchCustomerOrdersApi,
  updateOrderApi,
} from "../Apis/services/OrderService";

// أنواع الإجراءات
export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";

export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_FAILURE = "UPDATE_ORDER_FAILURE";

export const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_FAILURE = "DELETE_ORDER_FAILURE";

export const FETCH_SINGLE_ORDER_REQUEST = "FETCH_SINGLE_ORDER_REQUEST";
export const FETCH_SINGLE_ORDER_SUCCESS = "FETCH_SINGLE_ORDER_SUCCESS";
export const FETCH_SINGLE_ORDER_FAILURE = "FETCH_SINGLE_ORDER_FAILURE";

export const FETCH_CUSTOMER_ORDERS_REQUEST = "FETCH_CUSTOMER_ORDERS_REQUEST";
export const FETCH_CUSTOMER_ORDERS_SUCCESS = "FETCH_CUSTOMER_ORDERS_SUCCESS";
export const FETCH_CUSTOMER_ORDERS_FAILURE = "FETCH_CUSTOMER_ORDERS_FAILURE";

// جلب جميع الطلبات
export const fetchOrders =
  (userId = null) =>
  async (dispatch) => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    try {
      const data = await fetchOrdersApi(userId);
      dispatch({ type: FETCH_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: FETCH_ORDERS_FAILURE,
        payload: error.message || "Échec de la récupération des commandes",
      });
    }
  };

// إنشاء طلب جديد
export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const data = await createOrderApi(orderData);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message || "Échec de la création de la commande",
    });
  }
};

// تحديث طلب
export const updateOrder = (orderId, orderData) => async (dispatch) => {
  dispatch({ type: UPDATE_ORDER_REQUEST });
  try {
    const data = await updateOrderApi(orderId, orderData);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAILURE,
      payload: error.message || "Échec de la mise à jour de la commande",
    });
  }
};

// حذف طلب
export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST });
  try {
    const data = await destroyOrder(orderId);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.deletedOrder });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAILURE,
      payload: error.message || "Échec de la suppression de la commande",
    });
  }
};

// جلب تفاصيل طلب واحد
export const fetchSingleOrder = (id) => async (dispatch) => {
  dispatch({ type: FETCH_SINGLE_ORDER_REQUEST });
  try {
    const data = await fetchSingleOrderApi(id);
    dispatch({ type: FETCH_SINGLE_ORDER_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_ORDER_FAILURE,
      payload:
        error.message || "Échec de la récupération des détails de la commande",
    });
  }
};

// جلب طلبات عميل معين
export const fetchCustomerOrders = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_CUSTOMER_ORDERS_REQUEST });
  try {
    const data = await fetchCustomerOrdersApi(userId);
    dispatch({ type: FETCH_CUSTOMER_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: FETCH_CUSTOMER_ORDERS_FAILURE,
      payload:
        error.message || "Échec de la récupération des commandes du client",
    });
  }
};