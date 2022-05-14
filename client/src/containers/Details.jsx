import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsNav from "../components/DetailsNav";
import CountryInfo from "../components/CountryInfo";
import Activities from "./Activities";
import FieldsBox from "../components/FieldsBox";
import style from "./styles/Details.module.css";
import axios from "axios";

export default function Details(){
	const { id } = useParams();
	const [filter, setFilter] = useState([]);
	const [country, setCountry] = useState({});

	useEffect(() => {
		const loadCountry = async () => {
			const c = await axios.get(`http://localhost:3001/countries/${id}`);
			setCountry({...c.data});
		}

		loadCountry();
	},[id]);

	return (
		<div className={style.details}>
			<DetailsNav setFilter={setFilter} />
			<h1 className={style.country}>{country.name}</h1>
			<img className={style.flag} src={country.flag} alt={country.name} />
			<FieldsBox fields={filter} setFields={setFilter} />
			<CountryInfo country={country} filter={filter} />
			<Activities activities={country.activities || []} />
		</div>
	)
}