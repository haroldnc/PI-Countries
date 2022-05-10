import React from "react";
import { Link } from "react-router-dom";
import style from "./styles/DetailsNav.module.css";

export default function DetailsNav(){
	return (
		<div className={style.nav}>
			<div className={style.links}>
				<Link className={style.home} to="/home">Home</Link>
				<Link className={style.create_activity} to="/createActivity">Create Activity</Link>
			</div>
			<ul className={style.menu}><li>Menu</li></ul>
		</div>
	)
}