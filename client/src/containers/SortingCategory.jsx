import React from "react";
import style from "./styles/SortingCategory.module.css";
import SortingName from "../components/SortingName";
import ContinentsBox from "../components/ContinentsBox";
import ActivitiesBox from "../components/ActivitiesBox";

export default function SortingCategory(){
	return (
		<form className={style.box}>
			<SortingName />
			<ContinentsBox />
			<ActivitiesBox />
		</form>
	)
}