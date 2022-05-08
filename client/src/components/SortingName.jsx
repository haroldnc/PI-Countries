import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./styles/SortingName.module.css";
import { setCountries } from "../redux/actions";
import { sortCountries } from "../helpers";

export default function SortingName(){
	const countries = useSelector(state => state.countries);
	const dispatch = useDispatch();

	const onChange = (e) => {
		e.preventDefault();
		const option = e.target.options[e.target.selectedIndex].value;

		dispatch(setCountries(sortCountries(countries, option)));
	}

	return (
		<div>
			<label htmlFor="sorting" className={style.label}>Sort: </label>
			<select name="sorting" className={style.sort} onChange={onChange} id="sort">
				<option value="none">none</option>
				<optgroup label="Sort by name">
					<option value="asc_name">ascending</option>
					<option value="desc_name">descending</option>
				</optgroup>
				<optgroup label="Sort by population">
					<option value="asc_population">ascending</option>
					<option value="desc_population">descending</option>
				</optgroup>
			</select>
		</div>
	)
}