import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import style from "./styles/NavBar.module.css";

export default function NavBar() {
   return (
      <nav className={style.nav_bar}>
         <Link className={style.home} to="/">Paises del Mundo</Link>
         <SearchBar />
      </nav>
   );
}