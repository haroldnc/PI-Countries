import {
   GET_COUNTRIES_BY_NAME,
   GET_ALL_COUNTRIES
} from "../actions/actionsType";

const initialState = {
   countries: []
}

export default function reducer(state=initialState, action){
   switch(action.type){
      case GET_COUNTRIES_BY_NAME: return {
         ...state,
         countries: [...action.payload]
      }
      case GET_ALL_COUNTRIES: return {
         ...state,
         countries: [...action.payload]
      }
      default: return state;
   }
}