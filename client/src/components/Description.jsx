import React from "react";
import style from "./styles/Description.module.css";
import { Link } from "react-router-dom";

export default function Description() {
   return (
      <div className={style.home_desc}>
         <h1 className={style.title}>Country App</h1>
         <p className={style.description}>Search for countries in seconds and learn some interesting details</p>
         <Link className={style.btn} to="/home">Start</Link>
      </div>
   );
}