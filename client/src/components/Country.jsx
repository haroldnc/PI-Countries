import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/Country.module.css";

export default function Country(props) {
   const url = `/country/${props.id}`

   return (
      <div className={style.country}>
         <div className={style.flag}>
            <img src={props.flag} alt={props.name} />
         </div>
         <div>
            <Link className={style.name} to={url}>{props.name}</Link>
            <p className={style.continent}>Continent: {props.continent}</p>
         </div>
      </div>
   );
}