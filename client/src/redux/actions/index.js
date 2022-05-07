import axios from "axios";
import {
   GET_COUNTRIES
} from "./actionsType";

export function getCountries(name){
   return async (dispatch) => {
      return await axios.get("http://localhost:3001/countries?name=" + name)
         .then(result => dispatch({
               type: GET_COUNTRIES,
               payload: result.data
            }
         ))
         .catch(err => console.log(err.message));
   }
}