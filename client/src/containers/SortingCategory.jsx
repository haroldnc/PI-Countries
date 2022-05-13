import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./styles/SortingCategory.module.css";
import SortingName from "../components/SortingName";
import ContinentsBox from "../components/ContinentsBox";
import ActivitiesBox from "../components/ActivitiesBox";
import { setFilteredCountries } from "../redux/actions";
import {
	sortCountries,
	filterByContinents,
	filterByActivities,
	getActivitiesName
} from "../helpers";

export default function SortingCategory(){
	const [ sortMode, setSortMode ] = useState('none');
	const [ continents, setContinents ] = useState([]);
	const [ activities, setActivities ] = useState([]);
	const countries = useSelector(state => state.countries);
	const dispatch = useDispatch();

	useEffect(() => {
		let r = setFilteredCountries(countries)(dispatch);
		r = setFilteredCountries(sortCountries(r.payload, sortMode))(dispatch);
		r = setFilteredCountries(filterByContinents(r.payload, continents))(dispatch);
		setFilteredCountries(filterByActivities(r.payload, activities))(dispatch);
	}, [dispatch, countries, sortMode, continents, activities]);

	return (
		<form className={style.box}>
			<SortingName setSortMode={setSortMode} />
			<ContinentsBox
				continents={continents}
				setContinents={setContinents}
			/>
			<ActivitiesBox
				activities={getActivitiesName(countries)}
				chkActivities={activities}
				setActivities={setActivities}
			/>
		</form>
	)
}