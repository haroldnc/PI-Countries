import React from "react";
import style from "./styles/Activities.module.css";
import { firstToCap } from "../helpers";

export default function Activities({ activities }){
	if (activities.length){
		return (
			<div className={style.activities}>
				<h2 className={style.title}>Tourist Activities</h2>
				<ol className={style.activitiesBox}>
					{activities.map(activity => {
						return <li key={activity.name+activity.difficulty} className={style.activity}>{firstToCap(activity.name)}
						<ul>
							<li className={style.property}>Difficulty: {activity.difficulty}/5</li>
							<li className={style.property}>Duration: {activity.duration} {activity.duration>1 ?'days':'day'}</li>
							<li className={style.property}>Season: {activity.season}</li>
						</ul>
					</li>
					})}
				</ol>
			</div>
		)
	} else {
		return (
			<div className={style.activities}>
				<h2 className={style.title}>Tourist Activities</h2>
				<p className={style.message}>No activities found</p>
			</div>
		)
	}
}