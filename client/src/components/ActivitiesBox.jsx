import React, { useRef } from "react";
import style from "./styles/ActivitiesBox.module.css";

export default function ActivitiesBox({ activities, setActivities }){
	const divActivities = useRef();

	const onClick = (e) => {
		e.preventDefault();

		if (divActivities.current.classList.contains(style.visible)){
			divActivities.current.classList.remove(style.visible);
		} else {
			divActivities.current.classList.add(style.visible);
		}
	}

	const onClickChk = (e) => {
		const act = e.target.parentElement.innerText.trim();

		if (e.target.checked) {
			setActivities([...activities, act]);
		} else {
			setActivities(activities.filter(cur => cur !== act));
		}
	}

	return (
		<div className={`${style.activities}`} ref={divActivities}>
			<span className={style.select} onClick={onClick}>Select Activities</span>
			<ul className={style.items}>
				{activities.map(activity => {
					return (
						<li key={`${activity}-${Math.random()}`}>
							<input type="checkbox" onClick={onClickChk} /> {activity}
						</li>
					)}
				)}
			</ul>
		</div>
	)
}