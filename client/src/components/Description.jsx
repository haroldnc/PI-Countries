import React from "react";
import style from "./styles/Description.module.css";
import { Link } from "react-router-dom";

export default function Description() {
   return (
      <div className={style.home_desc}>
         <h1>Paises del Mundo</h1>
         <p>Busca paises en un segundo y conoce algunos interesantes detalles</p>
         <Link className={style.btn} to="/countries">Ingresar</Link>
      </div>
   );
}