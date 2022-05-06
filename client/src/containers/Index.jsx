import React from "react";
import Description from "../components/Description";
import style from "./styles/Index.module.css";
import worldImg from "../assets/world-countries.png";

export default function Index() {
   return (
      <main className={style.home}>
         <img className={style.world_img} src={worldImg} alt="World Countries" />
         <Description />
      </main>
   );
}