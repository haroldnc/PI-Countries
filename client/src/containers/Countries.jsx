import React from "react";
import { useSelector } from "react-redux";
import CountriesPage from "./CountriesPage";
import PaginationBar from "./PaginationBar";
import style from "./styles/Countries.module.css";

export default function Countries() {
   const currentPage = useSelector(state => state.currentPage);

   return (
      <main className={style.countries}>
         <CountriesPage page={currentPage} />
         <PaginationBar />
      </main>
   )
}
