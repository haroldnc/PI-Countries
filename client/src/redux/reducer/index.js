import {
   GET_COUNTRIES
} from "../actions/actionsType";

const initialState = {
   countries: []
}

export default function reducer(state=initialState, action){
   switch(action.type){
      case GET_COUNTRIES: return {
         ...state,
         countries: [...action.payload]
      }
      default: return state;
   }
}