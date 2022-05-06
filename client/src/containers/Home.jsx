import React from "react";
import NavBar from "./NavBar";
import style from "./styles/Home.module.css";

export default function Home() {
   return (
      <div className={style.countries}>
         <NavBar />
      </div>
   );
}