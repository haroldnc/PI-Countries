import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./styles/CreateActivity.module.css";
import ListCountries from "../components/ListCountries";
import SelectCountries from "../components/SelectCountries";
import { getCountryIds, createActivity, firstToCap } from "../helpers";

export default function CreateActivity(){
	const [name, setName] = useState('');
	const [difficulty, setDifficulty] = useState(1);
	const [duration, setDuration] = useState(1);
	const [season, setSeason] = useState('Fall');
	const [countries, setCountries] = useState([]);
	const ctry = useSelector(state => state.countries);


	const onChangeName = function(e) {
		setName(e.target.value);
	}

	const onChangeDifficulty = function(e) {
		setDifficulty(parseInt(e.target.value));
	}

	const onChangeDuration = function(e) {
		setDuration(parseInt(e.target.value));
	}

	const onChangeSeason = function(e) {
		setSeason(e.target.value);
	}

	const onSubmit = function(e) {
		e.preventDefault();

		const create = async function () {
			await createActivity({
				name: firstToCap(name),
				difficulty: difficulty,
				duration: duration,
				season: firstToCap(season)
			},
			getCountryIds(ctry, countries));

			document.getElementById('season').selectedIndex = 0;
			setCountries([]);
			setName('');
			setDifficulty(1);
			setDuration(1);
			setSeason('Fall');
		}

		if (name === ''){
			alert('Name is required');
		} else if (!/^[a-zA-Z]+$/.test(name)){
			alert('Name only acept letters');
		} else if (difficulty > 5 || difficulty < 1){
			console.log(difficulty);
			alert('Difficulty not is a valid number');
		} else if (duration > 30) {
			alert('Duration not is a valid number');
		} else if (!countries.length) {
			alert('Please, select countries');
		}
		else {
			create();
		}
	}

	useEffect(function() {
		document.getElementById("name").focus()
	})

	return (
		<div className={style.createpage}>
			<div className={style.menu}>
				<Link to="/home" className={style.link}>Home</Link>
			</div>
			<h1 className={style.title}>New Tourist Activity</h1>
			<form action="#" method="post">
				<div className={style.field}>
					<label htmlFor="name">Name: </label>
					<input type="text" name="name" id="name" onChange={onChangeName} value={name} placeholder="Activity Name" />
				</div>

				<div className={style.field}>
					<label htmlFor="difficulty">Difficulty: </label>
					<input className={style.difficulty} type="number" name="difficulty" id="difficulty"  min="1" max="5" onChange={onChangeDifficulty} value={difficulty} />
				</div>

				<div className={style.field}>
					<label htmlFor="duration">Duration: </label>
					<input className={style.duration} type="number" name="duration" id="duration" min="1" defaultValue="1" onChange={onChangeDuration} /><span>days</span>
				</div>

				<div className={style.field}>
					<label htmlFor="season">Season:</label>
					<select name="season" id="season" className={style.season} onChange={onChangeSeason}>
						<option value="fall">Fall</option>
						<option value="spring">Spring</option>
						<option value="summer">Summer</option>
						<option value="winter">Winter</option>
					</select>
				</div>

				<div className={`${style.field} ${style.countries}`}>
					<label htmlFor="countries">Countries:</label>
					<ListCountries currentList={countries} setCountries={setCountries} />
					<SelectCountries reference="countries" currentList={countries} setCountries={setCountries} />
				</div>

				<div className={style.submit}>
					<input type="submit" value="Create" onClick={onSubmit}/>
				</div>
			</form>
		</div>
	)
}