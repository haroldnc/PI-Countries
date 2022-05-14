import React from "react";
import style from "./styles/FieldsBox.module.css";

export default function FieldsBox({ fields, setFields }){
	const onClick = (e) => {
		e.preventDefault();
		const fields = document.getElementsByClassName(style.fields)[0];

		if (fields.classList.contains(style.visible)){
			fields.classList.remove(style.visible);
		} else {
			fields.classList.add(style.visible);
		}
	}

	const onClickChk = (e) => {
		if (e.target.checked) {
			setFields([...fields, e.target.parentElement.innerText.trim().toLowerCase()])
		} else {
			setFields(fields.filter(f => e.target.parentElement.innerText.trim().toLowerCase() !== f))
		}
	}

	return (
		<div className={`${style.fields}`}>
			<span className={style.select} onClick={onClick}>Select Fields</span>
			<ul className={style.items}>
				<li><input type="checkbox" onClick={onClickChk}/> Continent</li>
				<li><input type="checkbox" onClick={onClickChk}/> Subregion</li>
				<li><input type="checkbox" onClick={onClickChk}/> Population</li>
				<li><input type="checkbox" onClick={onClickChk}/> Area</li>
			</ul>
		</div>
	)
}