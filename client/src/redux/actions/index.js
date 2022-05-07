import axios from "axios";
import {
   GET_COUNTRIES_BY_NAME,
   GET_ALL_COUNTRIES
} from "./actionsType";

export function getCountriesByName(name){
   return async (dispatch) => {
      return await axios.get("http://localhost:3001/countries?name=" + (name || ''))
         .then(result => dispatch({
               type: GET_COUNTRIES_BY_NAME,
               payload: result.data
            }
         ))
         .catch(err => console.log(err.message));
   }
}

export function getAllCountries(){
   return (dispatch) => {
      return axios.get("http://localhost:3001/countries")
         .then(result => dispatch({
               type: GET_ALL_COUNTRIES,
               payload: result.data
            }
         ))
         .catch(err => console.log(err.message));
   }
}