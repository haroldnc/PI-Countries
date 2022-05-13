import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./styles/PaginationBar.module.css";
import { getListPages, getNumPages } from "../helpers";
import { setCurrentPage } from "../redux/actions";

export default function PaginationBar(){
	const dispatch = useDispatch();
	const currentPage = useSelector(state => state.currentPage);
	const size = useSelector(state => state.countriesFiltered.length);

	const onClickNumber = (e, n) => {
		e.preventDefault();
		dispatch(setCurrentPage(n));
	}

	const onFirst = (e) => {
		e.preventDefault();
		dispatch(setCurrentPage(1));
	}

	const onPrev = (e) => {
		e.preventDefault();

		if (currentPage > 1){
			dispatch(setCurrentPage(currentPage-1));
		}
	}

	const onNext = (e) => {
		e.preventDefault();
		const numPages = getNumPages(size);

		if (currentPage < numPages){
			dispatch(setCurrentPage(currentPage+1));
		}
	}

	const onLast = (e) => {
		e.preventDefault();
		dispatch(setCurrentPage(getNumPages(size)));
	}

	return (
		<div className={style.pagination}>
			<button className={style.first} onClick={onFirst}>First</button>
			<button className={style.prev} onClick={onPrev}>Prev</button>
			{getListPages(currentPage, getNumPages(size)).map(p => {
				return <button
					key={p.page}
					className={`${style.page}${p.active?' '+style.active:''}`}
					onClick={(e) => onClickNumber(e,p.page)}
					>{p.page}</button>
			})}
			<button className={style.next} onClick={onNext}>Next</button>
			<button className={style.last} onClick={onLast}>Last</button>
		</div>
	)
}