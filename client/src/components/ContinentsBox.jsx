import React from "react";
import { useDispatch } from "react-redux";
import style from "./styles/ContinentsBox.module.css";
import { addContinentFilter, delContinentFilter } from "../redux/actions";

export default function ContinentsBox(){
	const dispatch = useDispatch();

	const onClick = (e) => {
		e.preventDefault();
		const continents = document.getElementsByClassName(style.continents)[0];

		if (continents.classList.contains(style.visible)){
			continents.classList.remove(style.visible);
		} else {
			continents.classList.add(style.visible);
		}
	}

	const onClickChk = (e) => {
		if (e.target.checked) {
			dispatch(addContinentFilter(e.target.parentElement.innerText.trim()));
		} else {
			dispatch(delContinentFilter(e.target.parentElement.innerText.trim()));
		}
	}

	return (
		<div className={`${style.continents}`}>
			<span className={style.select} onClick={onClick}>Select Continents</span>
			<ul className={style.items}>
				<li><input type="checkbox" onClick={onClickChk}/> Africa</li>
				<li><input type="checkbox" onClick={onClickChk}/> Antarctica</li>
				<li><input type="checkbox" onClick={onClickChk}/> Asia</li>
				<li><input type="checkbox" onClick={onClickChk}/> Europe</li>
				<li><input type="checkbox" onClick={onClickChk}/> North America</li>
				<li><input type="checkbox" onClick={onClickChk}/> Oceania</li>
				<li><input type="checkbox" onClick={onClickChk}/> South America</li>
			</ul>
		</div>
	)
}