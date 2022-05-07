import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./styles/SearchBar.module.css";
import { getCountriesByName } from "../redux/actions";

export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const onSearch = (e) => {
      e.preventDefault();
      getCountriesByName(name)(dispatch);
   }

   const onChange = (e) => {
      e.preventDefault();
      const inp = document.getElementsByClassName(style.input)[0];
      setName(inp.value);
   }

   return (
      <form className={style.search_bar}>
         <button className={style.btn_search} type="submit" value="" onClick={onSearch} />
         <input className={style.input} type="search" placeholder="Buscar pais..." onChange={onChange} />
         <button className={style.btn_clear} >&times;</button>
      </form>
   );
}