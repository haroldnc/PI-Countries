import React from "react";
import style from "./styles/Country.module.css";

export default function Country(props) {
   return (
      <div className={style.country}>
         <div className={style.flag}>
            <img src={props.flag} alt={props.name} />
         </div>
         <div className={style.info}>
            <h2>{props.name}</h2>
            <h3>{props.continent}</h3>
         </div>
      </div>
   );
}