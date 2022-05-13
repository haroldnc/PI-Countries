import axios from "axios";
import {
   GET_COUNTRIES,
   GET_COUNTRIES_BY_ID,
   SET_FILTERED_COUNTRIES,
   SET_STATUS_LOADING,
   SET_CURRENT_PAGE
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

export function setFilteredCountries(countries){
   return (dispatch) => {
      return dispatch({
         type: SET_FILTERED_COUNTRIES,
         payload: countries
      });
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