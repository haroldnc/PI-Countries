import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./styles/SearchBar.module.css";
import { getCountries, setCurrentPage } from "../redux/actions";

export default function SearchBar() {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const onSearch = (e) => {
      e.preventDefault();
      const inp = document.getElementsByClassName(style.input)[0];;

      if (!name){
         alert('Must enter a valid name.')
         inp.focus();
      } else {
         getCountries(name)(dispatch);
         dispatch(setCurrentPage(1));
      }
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