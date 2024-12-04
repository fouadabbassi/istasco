// src/redux/store.js

import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { userReducer } from "./userReducer";
import { categoryReducer } from "./categoryReducer";
import { subcategoryReducer } from "./subcategoryReducer";
import { productReducer } from "./productReducer";
import { messageReducer } from "./messageReducer";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";
import { orderReducer } from "./orderReducer";

// دمج المقتطعات
const rootReducer = combineReducers({
  auth: userReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  product: productReducer,
  message: messageReducer,
  wishlist: wishlistReducer,
  cart: cartReducer,
  order: orderReducer,
});

// إنشاء المتجر
const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
