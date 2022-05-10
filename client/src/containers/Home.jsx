import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import Countries from "./Countries";
import SortingCategory from "./SortingCategory";
import style from "./styles/Home.module.css";
import {
   sortCountries,
   filterByContinents,
   filterByActivities
} from "../helpers";
import {
   getCountries,
   getActivities,
   setStatusLoading,
   setCountries,
   setCurrentPage,
} from "../redux/actions";

export default function Home() {
   const sortMode = useSelector(state => state.sortMode);
   const continents = useSelector(state => state.continents_filter);
   const activities = useSelector(state => state.activities_filter);
   const dispatch = useDispatch();

   useEffect(() => {
      const loadData = async () => {
         let r;
         setStatusLoading(true)(dispatch);
         await getActivities()(dispatch);
         r = await getCountries('')(dispatch);
         r = setCountries(sortCountries(r.payload, sortMode))(dispatch);
         r = setCountries(filterByContinents(r.payload, continents))(dispatch);
         setCountries(filterByActivities(r.payload, activities))(dispatch);
         setStatusLoading(false)(dispatch);
         setCurrentPage(1)(dispatch);
      }

      loadData();
   },[dispatch, sortMode, continents, activities]);

   return (
      <div className={style.countries}>
         <NavBar />
         <SortingCategory />
         <Countries />
      </div>
   );
}