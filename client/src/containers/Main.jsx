import React from "react";
import Description from "../components/Description";
import worldImg from "../assets/world-countries.png";

export default function Main() {
   return (
      <main className="principal main">
         <img className="world-img" src={worldImg} alt="World Countries" />
         <Description />
      </main>
   );
}