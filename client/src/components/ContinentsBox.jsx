import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./styles/ContinentsBox.module.css";
import { getContinents } from "../helpers";

export default function ContinentsBox(){
	const countries = useSelector(state => state.countries);

	useEffect(() => {
		const continents = document.getElementsByClassName(style.continents)[0];
		const selectList = continents.getElementsByClassName(style.select)[0];

		selectList.onclick = (e) => {
			e.preventDefault();

			if (continents.classList.contains(style.visible)){
				continents.classList.remove(style.visible);
			} else {
				continents.classList.add(style.visible);
			}
		}
	},[]);

	return (
		<div className={`${style.continents}`}>
			<span className={style.select}>Select Continents</span>
			<ul className={style.items}>
				{getContinents(countries).map(continent => {
					return <li key={continent}><input type="checkbox" /> {continent}</li>
				})}
			</ul>
		</div>
	)
}