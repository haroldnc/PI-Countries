import React from "react";
import { useSelector } from "react-redux";
import Country from "../components/Country";
import style from "./styles/Countries.module.css";

export default function Countries() {
   const countries = useSelector(state => state.countries);

   if (countries.length) {
      return (
         <main className={style.countries}>
            {countries.map(country => <Country
               key={country.id}
               id={country.id}
               name={country.name}
               flag={country.flag}
               continent={country.continent}
            />)}
         </main>
      )
   } else {
      return (
         <main className={style.countries}>
            <div>No se encontró ningún país con ese nombre.</div>
         </main>
      )
   }
}
