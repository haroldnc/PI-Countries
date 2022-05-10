import React from "react";
import style from "./styles/CountryInfo.module.css";
import { firstToCap } from "../helpers";

export default function CountryInfo({ country, filter }){
	return (
		<div className={style.info}>
			<p className={style.data}><span className={style.field}>Name:</span> {country.name}</p>
			<p className={style.data}><span className={style.field}>Capital:</span> {country.capital}</p>
			{filter.length ? filter.map(field => {
				return <p key={field} className={style.data}><span className={style.field}>{firstToCap(field)}:</span> {country[field]}</p>
			}) : ["continent", "subregion", "population", "area"].map(field => {
				return <p key={field} className={style.data}><span className={style.field}>{firstToCap(field)}:</span> {country[field]}{field==='area'?' Km2':''}</p>
			})}
		</div>
	)
}