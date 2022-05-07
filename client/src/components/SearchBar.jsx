import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./styles/SearchBar.module.css";
import { getCountries } from "../redux/actions";

export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const onSearch = (e) => {
      e.preventDefault();
      getCountries(name)(dispatch);
   }

   const onChange = (e) => {
      e.preventDefault();
      const inp = document.getElementsByClassName(style.input)[0];
      setName(inp.value);
   }

   const onClear = (e) => {
      e.preventDefault();
      const inp = document.getElementsByClassName(style.input)[0];
      setName('')
      inp.focus();
   }

   return (
      <form className={style.search_bar}>
         <button className={style.btn_search} type="submit" value="" onClick={onSearch} />
         <input className={style.input} type="text" placeholder="Buscar pais..." onChange={onChange} value={name}/>
         <button className={style.btn_clear} onClick={onClear} >&times;</button>
      </form>
   );
}