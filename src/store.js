import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productCreateReducers, productDeleteReducers, productDetailsReducers, productListReducers, productUpdateReducers  } from './reducers/productReducers';
import{  userLoginReducers,userSignupReducers,userListReducer,userDeleteReducer,userUpdateReducer,userDetailsReducer,userUpdateProfileReducer}from './reducers/userReducers';
import { cartReducers } from './reducers/cartReducers';
import { orderCreateReducer,orderDetailsReducer,orderDeliverReducer,orderListReducers,orderListMyReducer } from './reducers/orderReducers';


// Combine all reducers
const reducer = combineReducers({
  productsList: productListReducers,
  productDetails: productDetailsReducers,
  userSignup:userSignupReducers,
  userLogin:userLoginReducers,
  cart:cartReducers,
  orderCreate:orderCreateReducer,
  orderDetails:orderDetailsReducer,
  orderDeliver:orderDeliverReducer,

  productCreate:productCreateReducers,
  productUpdate:productUpdateReducers,
  productDelete:productDeleteReducers,
  orderList:orderListReducers,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
  orderMyList:orderListMyReducer,
});

const userInfoFromStorage=localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')):[]

const cartItemsFromStorage = localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[]

const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?
JSON.parse(localStorage.getItem('shippingAddress')):{}

// Initial state
const initialState = {
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
};

// Middleware
const middleware = [thunk];

// Create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;