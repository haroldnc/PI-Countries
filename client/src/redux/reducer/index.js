import {
   GET_COUNTRIES,
   SET_COUNTRIES,
   GET_ACTIVITIES,
   GET_COUNTRIES_BY_ID,
   SET_STATUS_LOADING,
   SET_CURRENT_PAGE,
   SET_SORT_MODE,
   ADD_CONTINENT_FILTER,
   ADD_ACTIVITY_FILTER,
   DEL_CONTINENT_FILTER,
   DEL_ACTIVITY_FILTER,
} from "../actions/actionsType";

const initialState = {
   countries: [],
   currentCountry: {},
   isLoading: false,
   currentPage: 1,
   sortMode: 'none',
   continents_filter: [],
   activities_filter: [],
   activities: []
}

export default function reducer(state=initialState, action){
   switch(action.type){
      case GET_COUNTRIES: return {
         ...state,
         countries: [...action.payload]
      }
      case SET_COUNTRIES: return {
         ...state,
         countries: [...action.payload]
      }
      case GET_ACTIVITIES: return {
         ...state,
         activities: [...action.payload]
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
      case SET_SORT_MODE: return {
         ...state,
         sortMode: action.payload
      }
      case ADD_CONTINENT_FILTER: return {
         ...state,
         continents_filter: [
            ...state.continents_filter,
            action.payload
         ]
      }
      case ADD_ACTIVITY_FILTER: return {
         ...state,
         activities_filter: [
            ...state.activities_filter,
            action.payload
         ]
      }
      case DEL_CONTINENT_FILTER: return {
         ...state,
         continents_filter: state.continents_filter.filter(continent => {
            return continent !== action.payload;
         })
      }
      case DEL_ACTIVITY_FILTER: return {
         ...state,
         activities_filter: state.activities_filter.filter(activity => {
            return activity !== action.payload;
         })
      }
      default: return state;
   }
}