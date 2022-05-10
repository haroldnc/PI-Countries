import axios from "axios";
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
   DEL_ACTIVITY_FILTER
} from "./actionsType";

export function getCountries(name){
   return (dispatch) => {
      return axios.get("http://localhost:3001/countries?name=" + name)
         .then(result => dispatch({
               type: GET_COUNTRIES,
               payload: result.data
            }
         ))
         .catch(err => console.log(err.message));
   }
}

export function setCountries(countries){
   return (dispatch) => {
      return dispatch({
         type: SET_COUNTRIES,
         payload: [...countries]
      })
   }
}

export function getActivities(){
   return (dispatch) => {
      return axios.get("http://localhost:3001/activity")
         .then(result => dispatch({
            type: GET_ACTIVITIES,
            payload: result.data
         }))
         .catch(err => console.log(err.message));
   }
}

export function getCountriesById(id){
   return async (dispatch) => {
      return await axios.get("http://localhost:3001/countries/" + id)
         .then(result => dispatch({
               type: GET_COUNTRIES_BY_ID,
               payload: result.data
            }
         ))
         .catch(err => console.log(err.message));
   }
}

export function setStatusLoading(status){
   return (dispatch) => {
      return dispatch({
         type: SET_STATUS_LOADING,
         payload: status
      })
   }
}

export function setCurrentPage(page){
   return (dispatch) => {
      dispatch({
         type: SET_CURRENT_PAGE,
         payload: page
      })
   }
}

export function setSortMode(mode){
   return (dispatch) => {
      return dispatch({
         type: SET_SORT_MODE,
         payload: mode
      })
   }
}

export function addContinentFilter(continent){
   return (dispatch) => {
      return dispatch({
         type: ADD_CONTINENT_FILTER,
         payload: continent
      })
   }
}

export function addActivityFilter(activity) {
   return (dispatch) => {
      return dispatch({
         type: ADD_ACTIVITY_FILTER,
         payload: activity
      })
   }
}

export function delContinentFilter(continent){
   return (dispatch) => {
      dispatch({
         type: DEL_CONTINENT_FILTER,
         payload: continent
      })
   }
}

export function delActivityFilter(activity) {
   return (dispatch) => {
      dispatch({
         type: DEL_ACTIVITY_FILTER,
         payload: activity
      })
   }
}