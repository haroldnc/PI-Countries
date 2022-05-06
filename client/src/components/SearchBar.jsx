import React from "react";
import style from "./styles/SearchBar.module.css";

export default function SearchBar() {
   return (
      <form className={style.search_bar}>
         <button className={style.btn_search} type="submit" value="" />
         <input className={style.input} type="search" placeholder="Buscar pais..." />
         <button className={style.btn_clear} >&times;</button>
      </form>
   );
}