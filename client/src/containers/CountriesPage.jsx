import React from "react";
import { useSelector } from "react-redux";
import Country from "../components/Country";
import Loading from "../components/Loading";
import { getRange } from "../helpers";

export default function CountriesPage({ page }) {
   const countries = useSelector(state => state.countriesFiltered);
   const isLoading = useSelector(state => state.isLoading);

   if (isLoading) {
      return <Loading />
   } else if (!countries.length) {
      return <p>No se encontró ningún país con ese nombre.</p>
   }
   
   return (
         countries.slice(...getRange(page)).map(country => <Country
            key={country.id}
            id={country.id}
            name={country.name}
            flag={country.flag}
            continent={country.continent}
         />
      )
   )
}