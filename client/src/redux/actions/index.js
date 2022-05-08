import axios from "axios";
import {
   GET_COUNTRIES,
   SET_COUNTRIES,
   GET_COUNTRIES_BY_ID,
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

export function setCountries(countries){
   return {
      type: SET_COUNTRIES,
      payload: [...countries]
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
   return {
      type: SET_STATUS_LOADING,
      payload: status
   }
}

export function setCurrentPage(page){
   return {
      type: SET_CURRENT_PAGE,
      payload: page
   }
}