import React from "react";
import { Link } from "react-router-dom";

export default function Description() {
   return (
      <div className="container main-desc">
         <h1>Paises del Mundo</h1>
         <p>Busca paises en un segundo y conoce algunos interesantes detalles</p>
         <Link className="btn" to="/home">Ingresar</Link>
      </div>
   );
}