// import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';

// import combineReducers from '../reducers';
// import { composeWithDevTools } from "@redux-devtools/extension";
// import thunk from 'redux-thunk';
// import { applyMiddleware } from 'redux';

// const initialState = {};
// const middleware = [thunk];

function reducer(state = {item:[]}, action){
  switch (action.type) {

  case "ADD-TO-CART":
    return state

  default:
    return state
  }
}
export function addTocart(item){
    return{
type:"ADD-TO-CART",
payload:{item},
    }
  }

  export const store = createStore(reducer);
    