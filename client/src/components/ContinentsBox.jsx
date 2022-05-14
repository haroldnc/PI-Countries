import React, { useRef } from "react";
import style from "./styles/ContinentsBox.module.css";

export default function ContinentsBox({ continents, setContinents }){
	const divContinents = useRef();

	const onClick = (e) => {
		e.preventDefault();

		if (divContinents.current.classList.contains(style.visible)){
			divContinents.current.classList.remove(style.visible);
		} else {
			divContinents.current.classList.add(style.visible);
		}
	}

	const onClickChk = (e) => {
		const c = e.target.parentElement.innerText.trim();

		if (e.target.checked) {
			setContinents([...continents, c]);
		} else {
			setContinents(continents.filter(cur => cur !== c));
		}
	}

	return (
		<div className={`${style.continents}`} ref={divContinents}>
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