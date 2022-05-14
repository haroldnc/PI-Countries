import React from "react";
import style from "./styles/ListCountries.module.css";

export default function ListCountries({ currentList, setCountries }){

	const onClick = function(e) {
		e.preventDefault();
		const cur_country = e.target.parentElement.children[1].textContent;

		setCountries(currentList.filter(country => country !== cur_country));
	}

	return (
		<div className={style.list}>
			{currentList.map(country => {
				return <div key={country} className={style.country}>
					<button className={style.close} onClick={onClick}>&times;</button> <span className={style.name}>{country}</span>
				</div>
			})}
		</div>
	)
}