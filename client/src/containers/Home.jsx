import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "./NavBar";
import Countries from "./Countries";
import SortingCategory from "./SortingCategory";
import style from "./styles/Home.module.css";
import {
   getCountries,
   setStatusLoading,
   setFilteredCountries
} from "../redux/actions";

export default function Home() {
   const dispatch = useDispatch();

   useEffect(() => {
      const loadCountries = async () => {
         setStatusLoading(true)(dispatch);
         const r = await getCountries('')(dispatch);
         setFilteredCountries(r.payload)(dispatch);
         setStatusLoading(false)(dispatch);
      }

      loadCountries();
   }, [dispatch]);

   return (
      <div className={style.countries}>
         <NavBar />
         <SortingCategory />
         <Countries />
      </div>
   );
}