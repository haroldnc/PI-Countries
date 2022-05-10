import React from "react";
import { useDispatch } from "react-redux";
import style from "./styles/SortingName.module.css";
import { setSortMode } from "../redux/actions";

export default function SortingName(){
	const dispatch = useDispatch();

	const onChange = (e) => {
		e.preventDefault();
		const option = e.target.options[e.target.selectedIndex].value;

		dispatch(setSortMode(option));
	}

	return (
		<div>
			<select className={style.sort} onChange={onChange} id="sort">
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