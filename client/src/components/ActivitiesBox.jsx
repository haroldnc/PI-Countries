import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./styles/ActivitiesBox.module.css";
import { addActivityFilter, delActivityFilter } from "../redux/actions";

export default function ActivitiesBox(){
	const activities = useSelector(state => state.activities);
	const dispatch = useDispatch();

	const onClick = (e) => {
		e.preventDefault();
		const activities = document.getElementsByClassName(style.activities)[0];

		if (activities.classList.contains(style.visible)){
			activities.classList.remove(style.visible);
		} else {
			activities.classList.add(style.visible);
		}
	}

	const onClickChk = (e) => {
		if (e.target.checked) {
			addActivityFilter(e.target.parentElement.innerText.trim())(dispatch);
		} else {
			delActivityFilter(e.target.parentElement.innerText.trim())(dispatch);
		}
	}

	return (
		<div className={`${style.activities}`}>
			<span className={style.select} onClick={onClick}>Select Activities</span>
			<ul className={style.items}>
				{activities.map(activity => {
					return <li key={`${activity.name}-${Math.random()}`}><input type="checkbox" onClick={onClickChk} /> {activity.name}</li>
				})}
			</ul>
		</div>
	)
}