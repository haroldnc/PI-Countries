import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./styles/SelectCountries.module.css";
import { getCountries } from "../redux/actions";
import { sortCountries } from "../helpers";

export default function ListCountries({ reference, currentList, setCountries }){
	const countries = useSelector(state => sortCountries(state.countries,'asc_name'));
	const dispatch = useDispatch();
	const list = useRef(null);

	const onClick = function(e) {
		e.preventDefault();
		setCountries([...currentList,list.current.value]);
	}

	useEffect(() => {
      const loadCountries = async () => {
         await getCountries('')(dispatch);
      }

      loadCountries();
   },[dispatch]);

	return (
		<div className={style.addcountry}>
			<select ref={list} name={reference} id={reference} className={style.countries}>
				{countries.filter(country => !currentList.includes(country.name)).map(country => {
					return <option key={country.id} value={country.name}>{country.name}</option>
				})}
			</select>
			<span className={style.plus} onClick={onClick}>+</span>
		</div>
	)
}