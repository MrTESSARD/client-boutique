// import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';

// import combineReducers from '../reducers';
// import { composeWithDevTools } from "@redux-devtools/extension";
// import thunk from 'redux-thunk';
// import { applyMiddleware } from 'redux';

// const initialState = {};
// const middleware = [thunk];

const initialCartState = []


function reducer(state = {items:[]}, action){
  switch (action.type) {

  case "ADD-TO-CART":
    return {
      
      items:[...state.items, 
      action.payload.item]
    }

  default:
    return state
  }
}
export function addToCart(item){
    return{
type:"ADD-TO-CART",
payload:{item},
    }
  }

  export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
    