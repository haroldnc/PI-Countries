import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import style from "./styles/ActivitiesBox.module.css";
import { getActivities } from "../helpers";

export default function ContinentsBox(){
	const countries = useSelector(state => state.countries);

	useEffect(() => {
		const activities = document.getElementsByClassName(style.activities)[0];
		const selectList = activities.getElementsByClassName(style.select)[0];

		selectList.onclick = (e) => {
			e.preventDefault();

			if (activities.classList.contains(style.visible)){
				activities.classList.remove(style.visible);
			} else {
				activities.classList.add(style.visible);
			}
		}
	},[]);

	return (
		<div className={`${style.activities}`}>
			<span className={style.select}>Select Activities</span>
			<ul className={style.items}>
				{getActivities(countries).map(activity => {
					return <li key={activity}><input type="checkbox" /> {activity}</li>
				})}
			</ul>
		</div>
	)
}