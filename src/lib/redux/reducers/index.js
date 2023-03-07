// import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';

// import combineReducers from '../reducers';
// import { composeWithDevTools } from "@redux-devtools/extension";
// import thunk from 'redux-thunk';
// import { applyMiddleware } from 'redux';

// const initialState = {};
// const middleware = [thunk];




function reducer(state = {items:[]}, action){
  switch (action.type) {

  case "ADD-TO-CART":
    return {
      
      items:[...state.items, 
      action.payload.item]
    }
  case "UPDATE-CART":
    return {
      
      items:state.items.map((item)=>{
        if (item.id===action.payload.id) {
          item.quantity=action.payload.quantity
          return item
          
        }
        return item
      })
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
export function updateCart(id, quantity){
    return{
type:"UPDATE-CART",
payload:{id, quantity},
    }
  }

  export const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
    