import {
   GET_COUNTRIES,
   GET_COUNTRIES_BY_ID,
   SET_STATUS_LOADING,
   SET_CURRENT_PAGE
} from "../actions/actionsType";

const initialState = {
   countries: [],
   currentCountry: {},
   isLoading: false,
   currentPage: 1
}

export default function reducer(state=initialState, action){
   switch(action.type){
      case GET_COUNTRIES: return {
         ...state,
         countries: [...action.payload]
      }
      case GET_COUNTRIES_BY_ID: return {
         ...state,
         currentCountry: {...action.payload}
      }
      case SET_STATUS_LOADING: return {
         ...state,
         isLoading: action.payload
      }
      case SET_CURRENT_PAGE: return {
         ...state,
         currentPage: action.payload
      }
      default: return state;
   }
}