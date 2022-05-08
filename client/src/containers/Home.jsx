import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar";
import Countries from "./Countries";
import style from "./styles/Home.module.css";
import {
   getCountries,
   setStatusLoading
} from "../redux/actions";

export default function Home() {
   const dispatch = useDispatch();

   useEffect(() => {
      const loadCountries = async () => {
         dispatch(setStatusLoading(true));
         await getCountries('')(dispatch);
         dispatch(setStatusLoading(false));
      }

      loadCountries();
   },[dispatch]);

   return (
      <div className={style.countries}>
         <NavBar />
         <Countries />
      </div>
   );
}