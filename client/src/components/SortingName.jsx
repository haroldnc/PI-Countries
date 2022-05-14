import React from "react";
import style from "./styles/SortingName.module.css";

export default function SortingName({ setSortMode }){
	const onChange = (e) => {
		e.preventDefault();
		const mode = e.target.options[e.target.selectedIndex].value;

		setSortMode(mode);
	}

	return (
		<div>
			<select className={style.sort} onChange={onChange} id="sort">
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